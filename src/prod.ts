import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestHandler } from './server.js';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enrutador para la API (reutilizamos la lógica del server.ts)
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    requestHandler(req, res);
  } else {
    next();
  }
});

// Servimos los archivos estáticos de la carpeta dist generada por Vite
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Cualquier otra ruta la redirigimos a index.html (modo SPA)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Production Server] Entity Landing corriendo en el puerto ${PORT}`);
});
