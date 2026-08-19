import http from "http";
import dotenv from "dotenv";
dotenv.config();
import url from "url";
// nodemailer removed
import {
  SQLiteRegistrationRepository,
} from "./api/persistence";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "entity.db");
const regRepo = new SQLiteRegistrationRepository(dbPath);
// emailRepo removed in FIA-W01.24

// dispatchEmail function removed in FIA-W01.24

export const requestHandler = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = req.url ? url.parse(req.url).pathname : "";
  console.log("Incoming reqUrl:", reqUrl, req.method);

  const adminToken = process.env.VITE_ADMIN_SECRET || "admin-secret-2026";
  const isAdminEndpoint =
    reqUrl === "/api/registrations" ||
    reqUrl === "/api/registrations/status" ||
    reqUrl === "/api/registrations/invite";

  if (isAdminEndpoint) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "No autorizado" }));
      return;
    }
  }

  if (reqUrl === "/api/register" && req.method === "POST") {
    // FIA-W01.24: Beta endpoints deactivated
    res.statusCode = 410;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "El programa Beta ha finalizado." }));
    return;
  } else if (reqUrl === "/api/registrations" && req.method === "GET") {
    try {
      const registrations = regRepo.findAll();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(registrations));
    } catch {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "Error al leer los registros de la waitlist.",
        }),
      );
    }
  } else if (reqUrl === "/api/registrations/status" && req.method === "POST") {
    let body = "";
    let tooLarge = false;
    req.on("data", (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 10240) {
        tooLarge = true;
        res.statusCode = 413;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Payload too large." }));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (tooLarge) return;
      try {
        const data = JSON.parse(body);
        const { email, status } = data;
        if (!email || !status) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: "El correo y el estado son obligatorios.",
            }),
          );
          return;
        }
        const allowedStatuses = ["Pending", "Approved", "Rejected"];
        if (!allowedStatuses.includes(status)) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Estado inválido." }));
          return;
        }

        const registration = regRepo.findByEmail(email);
        if (!registration) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Registro inexistente." }));
          return;
        }

        registration.status = status;
        regRepo.update(registration);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "Estado actualizado con éxito.",
            registration,
          }),
        );
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else if (reqUrl === "/api/registrations/invite" && req.method === "POST") {
    // FIA-W01.24: Beta endpoints deactivated
    res.statusCode = 410;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "El programa Beta ha finalizado." }));
    return;
  } else if (
    reqUrl === "/api/registrations/unsubscribe" &&
    req.method === "POST"
  ) {
    let body = "";
    let tooLarge = false;
    req.on("data", (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 10240) {
        tooLarge = true;
        res.statusCode = 413;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Payload too large." }));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (tooLarge) return;
      try {
        const data = JSON.parse(body);
        const { email } = data;
        if (!email) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({ error: "El correo electrónico es obligatorio." }),
          );
          return;
        }

        const registration = regRepo.findByEmail(email);
        if (!registration) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Registro inexistente." }));
          return;
        }

        if (registration.unsubscribed) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({ message: "El usuario ya estaba dado de baja." }),
          );
          return;
        }

        registration.unsubscribed = true;
        registration.unsubscribedAt = new Date().toISOString();

        regRepo.update(registration);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message:
              "Te has dado de baja de nuestras comunicaciones con éxito.",
          }),
        );
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else if (reqUrl === "/api/health" && req.method === "GET") {
    try {
      if (req.headers["x-simulate-error"]) {
        throw new Error("Simulated internal error with secret: S3CR3T_TOKEN");
      }
      const dbConnected = regRepo.checkConnection();
      if (dbConnected) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "ok", database: "connected" }));
      } else {
        res.statusCode = 503;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "error", database: "disconnected" }));
      }
    } catch {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not found" }));
  }
};

const server = http.createServer(requestHandler);

if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}
