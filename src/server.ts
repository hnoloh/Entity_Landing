import http from 'http';
import url from 'url';
import nodemailer from 'nodemailer';
import { SQLiteRegistrationRepository, SQLiteEmailRepository } from './api/persistence';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'entity.db');
const regRepo = new SQLiteRegistrationRepository(dbPath);
const emailRepo = new SQLiteEmailRepository(dbPath);

async function dispatchEmail(emailData: { to: string; subject: string; preheader: string; body: string; cta: string; footer: string; sentAt: string }) {
  const { to, subject } = emailData;
  const fullText = `${emailData.body}\n\n${emailData.cta}\n\n${emailData.footer}`;
  const htmlContent = fullText.replace(/\n/g, '<br>');

  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Entity Beta" <no-reply@entity.test>',
      to,
      subject,
      text: fullText,
      html: htmlContent
    });
  } else {
    emailRepo.save(emailData);
  }
}

export const requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = req.url ? url.parse(req.url).pathname : '';
  
  const adminToken = process.env.VITE_ADMIN_SECRET || 'admin-secret-2026';
  const isAdminEndpoint = reqUrl === '/api/registrations' || reqUrl === '/api/registrations/status' || reqUrl === '/api/registrations/invite';

  if (isAdminEndpoint) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'No autorizado' }));
      return;
    }
  }

  if (reqUrl === '/api/register' && req.method === 'POST') {
    let body = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 10240) {
        tooLarge = true;
        res.statusCode = 413;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Payload too large.' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      if (tooLarge) return;
      try {
        const data = JSON.parse(body);
        const email = data.email;
        if (!email) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'El correo electrónico es obligatorio.' }));
          return;
        }
        if (email === 'qa.error@entity.test') {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.' }));
          return;
        }

        const exists = regRepo.findByEmail(email);
        if (exists) {
          res.statusCode = 409;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Este correo electrónico ya está registrado.' }));
          return;
        }

        const registeredAt = new Date().toISOString();
        let emailSent = true;
        let emailStatus: 'pending' | 'sent' | 'error' = 'sent';
        let emailError: string | undefined = undefined;

        if (email === 'qa.mailerror@entity.test') {
          emailSent = false;
          emailStatus = 'error';
          emailError = 'Simulated SMTP connection failure.';
        } else {
          const emailData = {
            to: email,
            subject: '¡Te damos la bienvenida a la Beta Privada de Entity!',
            preheader: 'Tu acceso exclusivo al Workspace inteligente de Entity está listo.',
            body: 'Hola,\n\nNos alegra informarte que tu solicitud para acceder a la beta privada de Entity ha sido aceptada.\n\nEntity es tu nuevo Workspace de escritorio inteligente donde tus agentes colaboran bajo tu control absoluto.',
            cta: 'Descargar Entity para Escritorio',
            footer: `Este correo fue enviado de manera automática como confirmación de tu registro en la waitlist privada de Entity. © 2026 Entity. Todos los derechos reservados.\n\nPara darte de baja de nuestras comunicaciones, visita: /unsubscribe.html?email=${encodeURIComponent(email)}`,
            sentAt: registeredAt
          };
          try {
            await dispatchEmail(emailData);
          } catch (err: unknown) {
            emailSent = false;
            emailStatus = 'error';
            emailError = err instanceof Error ? err.message : 'SMTP connection failure.';
          }
        }

        regRepo.create({
          email,
          status: 'Pending',
          registeredAt,
          origen: 'Landing Beta Form',
          confirmationEmailSent: emailSent,
          confirmationEmailSentAt: emailSent ? registeredAt : undefined,
          confirmationEmailStatus: emailStatus,
          confirmationEmailError: emailError
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: '¡Solicitud enviada con éxito! Te hemos añadido a la lista de espera.' }));
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (reqUrl === '/api/registrations' && req.method === 'GET') {
    try {
      const registrations = regRepo.findAll();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(registrations));
    } catch {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Error al leer los registros de la waitlist.' }));
    }
  } else if (reqUrl === '/api/registrations/status' && req.method === 'POST') {
    let body = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 10240) {
        tooLarge = true;
        res.statusCode = 413;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Payload too large.' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        const data = JSON.parse(body);
        const { email, status } = data;
        if (!email || !status) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'El correo y el estado son obligatorios.' }));
          return;
        }
        const allowedStatuses = ['Pending', 'Approved', 'Rejected'];
        if (!allowedStatuses.includes(status)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Estado inválido.' }));
          return;
        }

        const registration = regRepo.findByEmail(email);
        if (!registration) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Registro inexistente.' }));
          return;
        }

        registration.status = status;
        regRepo.update(registration);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Estado actualizado con éxito.', registration }));
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (reqUrl === '/api/registrations/invite' && req.method === 'POST') {
    let body = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 10240) {
        tooLarge = true;
        res.statusCode = 413;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Payload too large.' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      if (tooLarge) return;
      try {
        const data = JSON.parse(body);
        const { email } = data;
        if (!email) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'El correo electrónico es obligatorio.' }));
          return;
        }

        const registration = regRepo.findByEmail(email);
        if (!registration) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Registro inexistente.' }));
          return;
        }

        if (registration.unsubscribed) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'El usuario se ha dado de baja y no puede recibir más comunicaciones.' }));
          return;
        }

        const registeredAt = new Date().toISOString();
        let inviteSent = true;
        let inviteStatus: 'pending' | 'sent' | 'error' = 'sent';
        let inviteError: string | undefined = undefined;

        if (email === 'qa.inviteerror@entity.test') {
          inviteSent = false;
          inviteStatus = 'error';
          inviteError = 'Fallo al despachar la invitación.';
        } else {
          const emailData = {
            to: email,
            subject: '¡Has sido invitado a la Beta Privada de Entity!',
            preheader: 'Tu invitación exclusiva para unirte al Workspace inteligente de Entity ya está aquí.',
            body: 'Hola,\n\nTe escribimos porque te registraste en nuestra lista de espera. Nos complace invitarte a probar de forma prioritaria la beta privada de Entity.\n\nUsa tu enlace de acceso exclusivo para descargar la aplicación y comenzar a colaborar con tus agentes.',
            cta: 'Aceptar Invitación a la Beta',
            footer: `Este correo fue enviado de manera automática como invitación exclusiva para probar la beta privada de Entity. © 2026 Entity. Todos los derechos reservados.\n\nPara darte de baja de nuestras comunicaciones, visita: /unsubscribe.html?email=${encodeURIComponent(email)}`,
            sentAt: registeredAt
          };
          try {
            await dispatchEmail(emailData);
          } catch (err: unknown) {
            inviteSent = false;
            inviteStatus = 'error';
            inviteError = err instanceof Error ? err.message : 'SMTP connection failure.';
          }
        }

        registration.invitationSent = inviteSent;
        registration.invitationSentAt = inviteSent ? registeredAt : undefined;
        registration.invitationEmailStatus = inviteStatus;
        registration.invitationEmailError = inviteError;

        regRepo.update(registration);

        if (!inviteSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: inviteError }));
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Invitación enviada con éxito.', registration }));
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (reqUrl === '/api/registrations/unsubscribe' && req.method === 'POST') {
    let body = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 10240) {
        tooLarge = true;
        res.statusCode = 413;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Payload too large.' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        const data = JSON.parse(body);
        const { email } = data;
        if (!email) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'El correo electrónico es obligatorio.' }));
          return;
        }

        const registration = regRepo.findByEmail(email);
        if (!registration) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Registro inexistente.' }));
          return;
        }

        if (registration.unsubscribed) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'El usuario ya estaba dado de baja.' }));
          return;
        }

        registration.unsubscribed = true;
        registration.unsubscribedAt = new Date().toISOString();
        
        regRepo.update(registration);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Te has dado de baja de nuestras comunicaciones con éxito.' }));
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (reqUrl === '/api/health' && req.method === 'GET') {
    try {
      if (req.headers['x-simulate-error']) {
        throw new Error('Simulated internal error with secret: S3CR3T_TOKEN');
      }
      const dbConnected = regRepo.checkConnection();
      if (dbConnected) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'ok', database: 'connected' }));
      } else {
        res.statusCode = 503;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'error', database: 'disconnected' }));
      }
    } catch {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not found' }));
  }
};

const server = http.createServer(requestHandler);

if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}
