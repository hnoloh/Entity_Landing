import { describe, it, expect } from "vitest";
import { requestHandler } from "../src/server";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { SQLiteRegistrationRepository } from "../src/api/persistence";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "entity.db");
const regRepo = new SQLiteRegistrationRepository(dbPath);

describe("Metrics in Backend Runtime", () => {
  const simulateRequest = async (
    url: string,
    method: string,
    headers: Record<string, string>,
    body?: unknown,
  ) => {
    let statusCode = 200;
    let responseData = "";
    const headersSet: Record<string, string> = {};

    const req = Object.assign(
      new http.IncomingMessage(null as unknown as import("net").Socket),
      {
        url,
        method,
        headers,
        destroy: () => {},
      },
    );

    const listeners: Record<string, ((...args: unknown[]) => void)[]> = {};
    req.on = (event: string, callback: (...args: unknown[]) => void) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
      return req;
    };

    setTimeout(() => {
      if (body && listeners["data"]) {
        listeners["data"].forEach((cb) =>
          cb(Buffer.from(JSON.stringify(body))),
        );
      }
      if (listeners["end"]) {
        listeners["end"].forEach((cb) => cb());
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
      },
    });

    Object.defineProperty(res, "statusCode", {
      get() {
        return statusCode;
      },
      set(val) {
        statusCode = val;
      },
    });

    await requestHandler(req, res);
    await new Promise<void>((resolve) => {
      const origEnd = res.end;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.end = function (...args: any[]): any {
        origEnd.call(res, args[0]);
        resolve();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return res as any;
      };
      // fallback in case it ends synchronously or errors
      setTimeout(resolve, 1500);
    });
    return { statusCode, headers: headersSet, body: responseData };
  };

  it("rechazo de métricas sin Authorization Bearer", async () => {
    const res = await simulateRequest("/api/registrations", "GET", {});
    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res.body).error).toBe("No autorizado");

    const res2 = await simulateRequest("/api/registrations", "GET", {
      authorization: "Bearer bad-token",
    });
    expect(res2.statusCode).toBe(401);
    expect(JSON.parse(res2.body).error).toBe("No autorizado");
  });

  it("métricas calculadas desde SQLite (obtención autorizada)", async () => {
    const timestamp = Date.now();
    const email1 = `metric1-${timestamp}@test.com`;
    const email2 = `metric2-${timestamp}@test.com`;

    // 1. Insert records to SQLite via repository
    regRepo.create({
      email: email1,
      status: "Pending",
      registeredAt: new Date().toISOString(),
      origen: "Landing Beta Form",
    });
    regRepo.create({
      email: email2,
      status: "Pending",
      registeredAt: new Date().toISOString(),
      origen: "Landing Beta Form",
    });

    // 2. Fetch metrics
    const token = process.env.VITE_ADMIN_SECRET || "admin-secret-2026";
    const res = await simulateRequest("/api/registrations", "GET", {
      authorization: `Bearer ${token}`,
    });

    expect(res.statusCode).toBe(200);
    const records = JSON.parse(res.body);

    expect(Array.isArray(records)).toBe(true);
    const found1 = records.find((r: { email: string }) => r.email === email1);
    const found2 = records.find((r: { email: string }) => r.email === email2);
    expect(found1).toBeDefined();
    expect(found2).toBeDefined();
  });
});
