import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "http";
import { requestHandler } from "../src/server";

const PORT = 3456;
let server: http.Server;

describe("Monitorización Productiva (FIA-084)", () => {
  beforeAll(async () => {
    server = http.createServer(requestHandler);
    await new Promise<void>((resolve) => {
      server.listen(PORT, "127.0.0.1", resolve);
    });
  });

  afterAll(() => {
    if (server) server.close();
  });

  it("health check con backend operativo y SQLite disponible", async () => {
    const res = await fetch(`http://127.0.0.1:${PORT}/api/health`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe("ok");
    expect(data.database).toBe("connected");
  });

  it("error controlado sin fuga de datos y comprobación de ausencia de secretos", async () => {
    const res = await fetch(`http://127.0.0.1:${PORT}/api/health`, {
      headers: {
        "x-simulate-error": "true",
      },
    });
    expect(res.status).toBe(500);
    const text = await res.text();
    // Validate we don't leak the error details or secrets
    expect(text).not.toContain("S3CR3T_TOKEN");
    const data = JSON.parse(text);
    expect(data.error).toBe("Internal Server Error");
  });

  it("comprobación de ausencia de emails y registros en el health check", async () => {
    const res = await fetch(`http://127.0.0.1:${PORT}/api/health`);
    const text = await res.text();
    expect(text).not.toContain("@"); // Check no email exposed
    const data = JSON.parse(text);
    // There shouldn't be any arrays or user data returned
    expect(Object.keys(data)).toEqual(["status", "database"]);
  });
});
