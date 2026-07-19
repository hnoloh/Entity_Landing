# Entity Landing

Landing page para **Entity Workspace**, un espacio de trabajo de escritorio donde agentes de inteligencia artificial especializados colaboran de forma organizada y estructurada bajo el control del usuario.

## 🚀 Características Implementadas

- **Navegación Fluida (HUD Shell):** Layout responsivo en formato HUD premium, con logotipo, eslogan y enlaces de anclaje internos para Inicio, Producto y Beta.
- **Menú Móvil Funcional:** Botón de menú responsive con soporte de navegación mediante teclado (`:focus-visible`), drawer de navegación lateral y cierre automático al hacer clic en enlaces o fuera del panel.
- **Estructura Narrativa Unificada:** Sección de valor y visión unificada mediante un grid responsivo de 3 columnas:
  - **El Problema:** El caos actual de trabajar con IA (múltiples modelos y desorden).
  - **La Visión:** La necesidad de estructurar la interacción en un espacio de trabajo real.
  - **El Workspace:** Resumen de que todo ocurre en un único lugar (configuración, conversaciones, entis y grupos secuenciales).
- **Selector de Demostración Interactivo:** Permite alternar instantáneamente entre tres capturas reales del producto dentro del *Product Frame* sin retardos visuales gracias al preloading en caché:
  - **Workspace**
  - **Entis**
  - **Grupos Secuenciales**
- **Optimización de Recursos:** Carga asíncrona de imágenes (`decoding="async"`) y prioridad alta de renderizado (`fetchpriority="high"`).

## 🛠️ Tecnologías y Configuración

- **Vite & TypeScript:** Entorno de desarrollo ágil y tipado estático robusto.
- **Vanilla CSS:** Layouts fluidos usando Flexbox y Grid sin librerías externas de terceros.
- **Vitest & JSDOM:** Suite de tests unitarios y de integración para garantizar que todos los contratos y criterios de aceptación se cumplan tras cada refactorización.
- **ESLint:** Control de calidad de código y linteo estricto.

## 💻 Desarrollo Local

Para iniciar el servidor de desarrollo local:

```bash
npm run dev
```

## 🧪 Pruebas y Calidad de Código

Para ejecutar la suite completa de tests de integración:

```bash
npx vitest run --environment jsdom
```

Para verificar tipos de TypeScript y estilo del código:

```bash
npm run typecheck && npm run lint
```
