import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html')
      }
    }
  },
  plugins: [
    {
      name: 'api-register-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/register' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
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

                // Persistir solicitud de beta (FIA-048)
                const filePath = path.join(__dirname, 'registrations.json');
                let registrations = [];
                if (fs.existsSync(filePath)) {
                  try {
                    registrations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                  } catch {
                    registrations = [];
                  }
                }

                // Detección de email duplicado (FIA-049)
                const exists = registrations.some((r: { email: string }) => r.email === email);
                if (exists) {
                  res.statusCode = 409;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Este correo electrónico ya está registrado.' }));
                  return;
                }

                registrations.push({
                  email,
                  status: 'Pending',
                  registeredAt: new Date().toISOString(),
                  origen: 'Landing Beta Form' // (FIA-052)
                });
                fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2), 'utf-8');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: '¡Solicitud enviada con éxito! Te hemos añadido a la lista de espera.' }));
              } catch {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
                    } else if (req.url === '/api/registrations' && req.method === 'GET') {
            // Obtener listado de la waitlist (FIA-052)
            try {
              const filePath = path.join(__dirname, 'registrations.json');
              let registrations = [];
              if (fs.existsSync(filePath)) {
                registrations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(registrations));
            } catch {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Error al leer los registros de la waitlist.' }));
            }
          } else if (req.url === '/api/registrations/status' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
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

                const filePath = path.join(__dirname, 'registrations.json');
                if (!fs.existsSync(filePath)) {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Registro inexistente.' }));
                  return;
                }

                let registrations = [];
                try {
                  registrations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                } catch {
                  registrations = [];
                }

                const index = registrations.findIndex((r: { email: string }) => r.email === email);
                if (index === -1) {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Registro inexistente.' }));
                  return;
                }

                registrations[index].status = status;
                fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2), 'utf-8');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Estado actualizado con éxito.', registration: registrations[index] }));
              } catch {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ]
});
