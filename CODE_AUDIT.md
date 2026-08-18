# Auditoría Exhaustiva de Código - Entity Landing (MVP)

## 1. Resumen Ejecutivo

El proyecto es una **Landing Page interactiva y un Dashboard Administrativo (MVP)** desarrollado bajo fuertes restricciones de infraestructura. Su mayor fortaleza es la fidelidad visual, su rendimiento local sin dependencias pesadas y su robusto conjunto de pruebas unitarias/integración (Vitest). Su principal debilidad arquitectónica radica en el diseño estático de las APIs (mockeadas en Vite), lo cual es intencional por ahora, pero crítico de cara a un despliegue en producción.

## 2. Evaluación Arquitectónica y Frontend

### Fortalezas

- **Sin frameworks pesados:** El uso de TypeScript puro (Vanilla TS) sin React o Vue ha mantenido el tamaño del bundle extremadamente ligero, lo cual favorece un tiempo de carga (TTI) casi instantáneo.
- **Rendimiento Visual:** Se aplican técnicas de pre-carga de imágenes (`new Image().src = ...`) en `main.ts` para que el componente "Product Frame" interaccione sin _lag_ (FIA-035).
- **Semántica y Accesibilidad (a11y):** Se emplean correctamente atributos como `aria-expanded`, `aria-selected`, `aria-describedby` y `role="tab"`, lo que indica un código maduro e inclusivo.
- **Organización de Código:** Existe una buena separación de contextos: `main.ts` (landing pública), `admin.ts` (dashboard administrativo) y `unsubscribe.ts` (baja).

### Oportunidades de Mejora (Frontend)

- **CSS Monolítico:** Todo el CSS parece estar concentrado en `style.css`. A medida que el proyecto escale, esto podría volverse inmanejable.
  _Recomendación:_ Migrar a un sistema modular (ej. CSS Modules, SASS o PostCSS) para separar variables, mixins, y estilos de componentes individuales.
- **Manejo del DOM:** Las interacciones del DOM (ej. en `main.ts`) utilizan selectores globales múltiples veces.
  _Recomendación:_ Se podría implementar un pequeño patrón de controlador o clases para encapsular mejor los eventos de UI y no dejar variables globales colgando en el ámbito global.

## 3. Evaluación Backend (Vite Middleware)

### Análisis del `vite.config.ts`

El servidor usa el hook `configureServer` de Vite para mockear endpoints (`/api/register`, `/api/registrations`, etc.).

**Riesgos y Limitaciones actuales:**

- **Inviabilidad en Producción (Bloqueante):** Como se discutió previamente, este código no se empaqueta para producción al hacer `npm run build`. Si se sirve el `dist` estático, todos los endpoints devolverán `404`.
- **Condiciones de Carrera (Race Conditions):** El sistema de archivos usa `fs.readFileSync` y `fs.writeFileSync` sincronizados. Si dos usuarios se registran simultáneamente, uno podría sobreescribir el archivo `registrations.json` del otro.
  _Recomendación (para producción):_ Migrar a una base de datos real (PostgreSQL, MongoDB o un BaaS como Supabase/Firebase) utilizando transacciones, o al menos usar Mutex/Locks si se mantiene un archivo.
- **Acumulación de Memoria (Body parsing):** El parseo de los chunks (`req.on('data')`) es básico. Un usuario malintencionado podría enviar un payload gigantesco (ataque DDoS L7) y tirar el proceso de Node.js por falta de memoria al concatenar un string infinito en `body += chunk`.
  _Recomendación:_ Añadir un límite de tamaño (ej. truncar a 10kb) para evitar buffers infinitos.

## 4. Auditoría de Seguridad

- **Seguridad en Correos:** La integración de `nodemailer` (FIA-061B) está bien aislada. Solo extrae secretos de las variables de entorno (`process.env.SMTP_PASS`), sin exponerlos en el frontend.
- **XSS (Cross-Site Scripting):** La tabla del panel de administración renderiza emails directamente. Si un usuario malintencionado se registra con un email tipo `<script>alert(1)</script>@test.com`, y la vista de admin (`admin.ts`) usa `innerHTML` para pintar el correo en la tabla, el código se ejecutará.
  _Recomendación:_ Verificar que `admin.ts` utilice `textContent` o sanitize el HTML (por ejemplo, con DOMPurify) al renderizar datos inyectados por el usuario.
- **Endpoints no protegidos:** La ruta `/api/registrations` y `/api/registrations/status` (usada por el panel de admin) no requiere autenticación en el backend. Cualquiera con acceso de red (o si esto estuviera expuesto) podría consultarla.
  _Recomendación:_ Implementar un esquema básico de autenticación (JWT o sesiones) en las próximas fases, así como proteger `admin.html` detrás de una barrera de login.

## 5. Auditoría de Testing

- **Calidad de Vitest:** Excelente. 32 tests verificando todos los flujos principales (incluido el rechazo de envíos duplicados y comportamiento de UI).
- **Aislamiento:** El entorno jsdom simula el navegador permitiendo evaluar transiciones visuales, lo cual es muy valioso para evitar regresiones de UI.

## 6. Conclusión y Roadmap Sugerido

El código fuente cumple maravillosamente con el alcance actual del MVP bajo las restricciones fijadas (sin frameworks UI, persistencia local simulada). Para llevar el producto al siguiente nivel (Producción real o Beta Pública), se requiere:

1. **Migración de Backend:** Trasladar la lógica de `vite.config.ts` a un entorno backend real (Express.js o Serverless API).
2. **Autenticación Admin:** Blindar el panel de administración contra acceso anónimo.
3. **Persistencia Real:** Cambiar `registrations.json` por una Base de Datos concurrente y segura.
4. **Sanitización (XSS):** Asegurarse de que en `admin.ts` se escapen correctamente los textos provenientes de la lista de espera.
