// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawn, ChildProcess } from "child_process";
import { execSync } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let backendProcess: ChildProcess;
let frontendServer: http.Server;
const BACKEND_PORT = 3123;
const FRONTEND_PORT = 5123;

interface WaitlistRegistration {
  email: string;
  status: string;
  confirmationEmailSent: boolean;
  unsubscribed?: boolean;
}

describe("Build + Deploy Smoke Test", () => {
  beforeAll(async () => {
    // 1. Limpiar BD
    const dbPath = path.join(__dirname, "..", "entity.db");
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

    // 2. Preparar el build con VITE_API_BASE_URL apuntando al backend real
    execSync("npm run build", {
      cwd: path.join(__dirname, ".."),
      env: {
        ...process.env,
        VITE_API_BASE_URL: `http://127.0.0.1:${BACKEND_PORT}`,
      },
      stdio: "inherit",
    });

    // 3. Arrancar el backend runtime de forma independiente como proceso
    backendProcess = spawn("npx", ["tsx", "src/server.ts"], {
      cwd: path.join(__dirname, ".."),
      env: {
        ...process.env,
        PORT: BACKEND_PORT.toString(),
        VITE_ADMIN_SECRET: "admin-secret-2026",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    await new Promise<void>((resolve, reject) => {
      let ready = false;
      let stderrOutput = "";
      backendProcess.stdout?.on("data", (data) => {
        if (data.toString().includes("Backend server running")) {
          ready = true;
          resolve();
        }
      });
      backendProcess.stderr?.on("data", (data) => {
        stderrOutput += data.toString();
        console.error("BACKEND STDERR:", data.toString());
      });
      backendProcess.on("error", reject);
      backendProcess.on("close", (code) => {
        if (!ready)
          reject(
            new Error(
              `Backend exit with code ${code} before ready. Stderr: ${stderrOutput}`,
            ),
          );
      });
      setTimeout(() => {
        if (!ready) reject(new Error("Timeout waiting for backend"));
      }, 5000);
    });

    // 4. Servir el frontend compilado en un servidor HTTP mínimo independiente
    frontendServer = http.createServer((req, res) => {
      const reqPath = req.url === "/" || !req.url ? "/index.html" : req.url;
      const filePath = path.join(__dirname, "../dist", reqPath.split("?")[0]);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        if (ext === ".js")
          res.setHeader("Content-Type", "application/javascript");
        if (ext === ".css") res.setHeader("Content-Type", "text/css");
        if (ext === ".html") res.setHeader("Content-Type", "text/html");
        res.end(fs.readFileSync(filePath));
      } else {
        res.statusCode = 404;
        res.end();
      }
    });

    await new Promise<void>((resolve) => {
      frontendServer.listen(FRONTEND_PORT, "127.0.0.1", () => resolve());
    });
  }, 30000); // Dar algo más de tiempo para el build y spawn

  afterAll(() => {
    frontendServer?.close();
    if (backendProcess) {
      backendProcess.kill();
    }
    // Restaurar el build para que los tests e2e normales no usen la ruta absoluta
    execSync("npm run build", {
      cwd: path.join(__dirname, ".."),
      stdio: "inherit",
    });
  }, 30000);

  it("Smoke Test: Frontend desplegado y Backend runtime conectado", async () => {
    // 1. Verificar conectividad base frontend
    const frontRes = await fetch(
      `http://127.0.0.1:${FRONTEND_PORT}/index.html`,
    );
    expect(frontRes.status).toBe(200);

    // 2. Ejecutar entorno simulado del navegador sobre los archivos de frontend compilados
    document.body.innerHTML = '<div id="app"></div>';

    const assetsDir = path.join(__dirname, "../dist/assets");
    const files = fs.readdirSync(assetsDir);
    const mainJs = files.find(
      (f) => f.startsWith("main-") && f.endsWith(".js"),
    );

    if (!mainJs) throw new Error("No se encontró el bundle principal.");

    // Configurar proxy de fetch explícito para JSDOM para que la API apunte al puerto 3000
    // y otros resources apunten al 5000.
    const originalFetch = globalThis.fetch;
    window.fetch = async (input, init) => {
      return originalFetch.call(globalThis, input, init);
    };

    // Importar la SPA
    await import(path.join(assetsDir, mainJs));
    await new Promise((r) => setTimeout(r, 100)); // Esperar DOM renderizado

    // 3. Smoke Test Registro Beta
    const downloadFree = document.getElementById("download-free");
    const downloadCta = document.getElementById("download-cta");
    expect(downloadFree).not.toBeNull();
    expect(downloadCta).not.toBeNull();

    const testEmail = "smoke.test@entity.test";
    const regRes = await globalThis.fetch(
      `http://127.0.0.1:${BACKEND_PORT}/api/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      },
    );
    expect(regRes.status).toBe(410);

    // 4. Validar backend: admin autorizado (Verificar SQLite)
    const adminRes = await originalFetch(
      `http://127.0.0.1:${BACKEND_PORT}/api/registrations`,
      {
        headers: { Authorization: "Bearer admin-secret-2026" },
      },
    );
    expect(adminRes.status).toBe(200);
    const registrations = (await adminRes.json()) as WaitlistRegistration[];

    // No new registrations should be possible
    expect(registrations.find((r) => r.email === testEmail)).toBeUndefined();

    // 5. Validar admin no autorizado
    const adminResNoToken = await originalFetch(
      `http://127.0.0.1:${BACKEND_PORT}/api/registrations`,
    );
    expect(adminResNoToken.status).toBe(401);

    // 6. Smoke Test Baja
    // Seed historic record to test unsubscribe
    const { SQLiteRegistrationRepository } = await import("../src/api/persistence");
    const dbPath = path.join(__dirname, "..", "entity.db");
    const regRepo = new SQLiteRegistrationRepository(dbPath);
    regRepo.create({
      email: testEmail,
      status: "Pending",
      registeredAt: new Date().toISOString(),
      origen: "Landing Beta Form",
      confirmationEmailSent: true,
    });

    const unsubRes = await originalFetch(
      `http://127.0.0.1:${BACKEND_PORT}/api/registrations/unsubscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      },
    );
    expect(unsubRes.status).toBe(200);

    const adminResAfter = await originalFetch(
      `http://127.0.0.1:${BACKEND_PORT}/api/registrations`,
      {
        headers: { Authorization: "Bearer admin-secret-2026" },
      },
    );
    const regsAfter = (await adminResAfter.json()) as WaitlistRegistration[];
    const insertedAfter = regsAfter.find((r) => r.email === testEmail);
    expect(insertedAfter?.unsubscribed).toBe(true);
  });
});
