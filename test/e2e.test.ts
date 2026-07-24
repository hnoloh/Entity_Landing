// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server: http.Server;
let baseUrl: string;
let originalFetch: typeof globalThis.fetch;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let requestHandler: Function;

interface WaitlistRegistration {
  email: string;
  status: string;
  confirmationEmailSent: boolean;
  unsubscribed?: boolean;
}

describe('QA E2E Productivo', () => {
  beforeAll(async () => {
    const dbPath = path.join(__dirname, '..', 'entity.db');
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

    const serverModule = await import('../src/server');
    requestHandler = serverModule.requestHandler;

    server = http.createServer((req, res) => requestHandler(req, res));

    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => resolve());
    });
    
    const address = server.address() as import('net').AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;

    originalFetch = globalThis.fetch;
    globalThis.fetch = async (input, init) => {
      const urlStr = typeof input === 'string' ? input : (input instanceof Request ? input.url : input.toString());
      if (urlStr.startsWith('/')) {
        return originalFetch.call(globalThis, baseUrl + urlStr, init);
      }
      if (urlStr.startsWith('http://127.0.0.1:3000')) {
        return originalFetch.call(globalThis, urlStr.replace('http://127.0.0.1:3000', baseUrl), init);
      }
      return originalFetch.call(globalThis, input, init);
    };
  });

  afterAll(() => {
    server.close();
    globalThis.fetch = originalFetch;
  });

  it('Debe ejecutar el flujo completo E2E integrado sin mocks', async () => {
    // 1. Preparar DOM base
    document.body.innerHTML = '<div id="app"></div>';

    // 2. Importar el build productivo de la landing pública
    const assetsDir = path.join(__dirname, '../dist/assets');
    const files = fs.readdirSync(assetsDir);
    const mainJs = files.find(f => f.startsWith('main-') && f.endsWith('.js'));
    
    if (!mainJs) throw new Error('No se encontró el bundle principal en dist/assets. ¿Se ejecutó npm run build?');
    
    await import(path.join(assetsDir, mainJs));
    await new Promise(r => setTimeout(r, 100)); // allow DOM to settle

    const betaEmailInput = document.getElementById('beta-email') as HTMLInputElement;
    const betaForm = document.getElementById('beta-form') as HTMLFormElement;
    expect(betaEmailInput).not.toBeNull();
    expect(betaForm).not.toBeNull();

    // 3. Registro de Beta
    const testEmail = 'e2e.test@entity.test';
    betaEmailInput.value = testEmail;
    betaForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

    // Esperar respuesta real del backend
    await new Promise(r => setTimeout(r, 800));

    const statusSpan = document.getElementById('form-status');
    expect(statusSpan?.textContent).toContain('¡Solicitud enviada con éxito!');
    expect(betaForm.classList.contains('is-submitted')).toBe(true);

    // 4. Validar estado de Authorization Bearer (Admin sin token => 401)
    const adminResNoToken = await globalThis.fetch(`/api/registrations`);
    expect(adminResNoToken.status).toBe(401);

    // 5. Validar estado de Authorization Bearer (Admin con token => 200) y Métricas
    const adminRes = await globalThis.fetch(`/api/registrations`, {
      headers: { 'Authorization': 'Bearer admin-secret-2026' }
    });
    expect(adminRes.status).toBe(200);
    const registrations = await adminRes.json() as WaitlistRegistration[];
    
    expect(registrations.length).toBeGreaterThan(0);
    const inserted = registrations.find(r => r.email === testEmail);
    expect(inserted).toBeDefined();
    expect(inserted?.status).toBe('Pending');
    expect(inserted?.confirmationEmailSent).toBe(true);
    expect(inserted?.unsubscribed).toBeFalsy();

    // 6. Validar Baja pública a través de API
    const unsubRes = await globalThis.fetch(`/api/registrations/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail })
    });
    expect(unsubRes.status).toBe(200);
    const unsubBody = (await unsubRes.json()) as { message: string };
    expect(unsubBody.message).toContain('baja');

    // 7. Verificar Baja en Métricas (SQLite)
    const adminResAfter = await globalThis.fetch(`/api/registrations`, {
      headers: { 'Authorization': 'Bearer admin-secret-2026' }
    });
    const regsAfter = await adminResAfter.json() as WaitlistRegistration[];
    const insertedAfter = regsAfter.find(r => r.email === testEmail);
    expect(insertedAfter?.unsubscribed).toBe(true);
    
    // 8. Renderizado seguro del panel admin
    document.body.innerHTML = '<div id="admin-app"></div>';
    window.prompt = () => 'admin-secret-2026'; // Auto-login para el admin

    const adminJs = files.find(f => f.startsWith('admin-') && f.endsWith('.js'));
    if (!adminJs) throw new Error('No se encontró el bundle admin en dist/assets.');

    // Importar bundle admin built
    await import(path.join(assetsDir, adminJs));
    await new Promise(r => setTimeout(r, 800)); // Esperar fetch
    
    const bodyText = document.body.textContent || '';
    // Verificar que el correo insertado se muestra en el panel admin renderizado desde el build
    expect(bodyText).toContain(testEmail);
  });
});
