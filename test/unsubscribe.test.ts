import { describe, it, expect } from 'vitest';
import { requestHandler } from '../src/server';
import http from 'http';

describe('Unsubscribe Flow in Backend Runtime', () => {

  const simulateRequest = async (url: string, method: string, headers: Record<string, string>, body?: unknown) => {
    let statusCode = 200;
    let responseData = '';
    const headersSet: Record<string, string> = {};

    const req = Object.assign(new http.IncomingMessage(null as unknown as import('net').Socket), {
      url,
      method,
      headers,
      destroy: () => {}
    });

    const listeners: Record<string, ((...args: unknown[]) => void)[]> = {};
    req.on = (event: string, callback: (...args: unknown[]) => void) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
      return req;
    };

    setTimeout(() => {
      if (body && listeners['data']) {
        listeners['data'].forEach(cb => cb(Buffer.from(JSON.stringify(body))));
      }
      if (listeners['end']) {
        listeners['end'].forEach(cb => cb());
      }
    }, 0);

    const res = Object.assign(new http.ServerResponse(req), {
      setHeader: (key: string, value: string) => {
        headersSet[key] = value;
      },
      end: (data: string) => {
        if (data) responseData = data.toString();
      },
      writeHead: (code: number, headers?: Record<string, string>) => {
        statusCode = code;
        if (headers) {
          Object.assign(headersSet, headers);
        }
      }
    });

    Object.defineProperty(res, 'statusCode', {
      get() { return statusCode; },
      set(val) { statusCode = val; }
    });

    await requestHandler(req, res);
    await new Promise(resolve => setTimeout(resolve, 50));
    return { statusCode, headers: headersSet, body: responseData };
  };

  it('baja correcta persistida en SQLite', async () => {
    const email = `unsub-${Date.now()}@test.com`;
    // 1. Create a registration
    await simulateRequest('/api/register', 'POST', {}, { email });

    // 2. Unsubscribe
    const res = await simulateRequest('/api/registrations/unsubscribe', 'POST', {}, { email });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.message).toBe('Te has dado de baja de nuestras comunicaciones con éxito.');

    // 3. Verify in SQLite via metrics endpoint
    const token = process.env.VITE_ADMIN_SECRET || 'admin-secret-2026';
    const metricsRes = await simulateRequest('/api/registrations', 'GET', { authorization: `Bearer ${token}` });
    const records = JSON.parse(metricsRes.body);
    const user = records.find((r: { email: string; unsubscribed: boolean; unsubscribedAt: string }) => r.email === email);
    expect(user.unsubscribed).toBe(true);
    expect(user.unsubscribedAt).toBeDefined();
  });

  it('baja sobre registro inexistente', async () => {
    const res = await simulateRequest('/api/registrations/unsubscribe', 'POST', {}, { email: 'nobody@test.com' });
    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.body);
    expect(body.error).toBe('Registro inexistente.');
  });

  it('baja repetida cuando el contrato lo contemple', async () => {
    const email = `unsub-twice-${Date.now()}@test.com`;
    // 1. Create a registration
    await simulateRequest('/api/register', 'POST', {}, { email });

    // 2. First unsubscribe
    await simulateRequest('/api/registrations/unsubscribe', 'POST', {}, { email });

    // 3. Second unsubscribe
    const res = await simulateRequest('/api/registrations/unsubscribe', 'POST', {}, { email });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.message).toBe('El usuario ya estaba dado de baja.');
  });
});
