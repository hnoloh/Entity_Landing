import { describe, it, expect } from "vitest";
import { requestHandler } from "../src/server";
import http from "http";

describe("Admin Authorization", () => {
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

    // Override the on method to simulate data events
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

    await new Promise((resolve) => setTimeout(resolve, 50));

    return { statusCode, headers: headersSet, body: responseData };
  };

  it("Unit - ausencia de autorización", async () => {
    const res = await simulateRequest("/api/registrations", "GET", {});
    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res.body).error).toBe("No autorizado");
  });

  it("Unit - autorización inválida", async () => {
    const res = await simulateRequest("/api/registrations", "GET", {
      authorization: "Bearer invalid-token",
    });
    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res.body).error).toBe("No autorizado");
  });

  it("Unit - autorización válida", async () => {
    const token = process.env.VITE_ADMIN_SECRET || "admin-secret-2026";
    const res = await simulateRequest("/api/registrations", "GET", {
      authorization: `Bearer ${token}`,
    });
    expect(res.statusCode).toBe(200);
  });

  it("Integration - modificación autorizada", async () => {
    const token = process.env.VITE_ADMIN_SECRET || "admin-secret-2026";
    const res = await simulateRequest(
      "/api/registrations/status",
      "POST",
      { authorization: `Bearer ${token}` },
      { email: "nonexistent@test.com", status: "Approved" },
    );
    expect(res.statusCode).toBe(404);
  });

  it("Integration - modificación denegada", async () => {
    const res = await simulateRequest(
      "/api/registrations/status",
      "POST",
      { authorization: "Bearer fake" },
      { email: "test", status: "Approved" },
    );
    expect(res.statusCode).toBe(401);
  });

  it("Integration - registro publico inalterado sin auth", async () => {
    const res = await simulateRequest(
      "/api/register",
      "POST",
      {},
      {
        email:
          "new-auth-test-" + Date.now() + "-" + Math.random() + "@test.com",
      },
    );
    if (res.statusCode !== 410) {
      console.log("UNEXPECTED STATUS:", res.statusCode, "BODY:", res.body);
    }
    expect(res.statusCode).toBe(410);
  });
});
