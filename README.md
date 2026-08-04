# Entity Landing

Web Oficial para **Entity Workspace**, la aplicación desktop híbrida definitiva donde tus agentes de inteligencia artificial (Entis) colaboran mediante herramientas y arquitecturas avanzadas bajo tu control. Esta web representa el frontend de la Release Candidate del TFM.

## 🚀 Características Avanzadas (Web y App)

- **Navegación Fluida (HUD Shell):** Layout responsivo en formato HUD premium, con preloading de imágenes y navegación optimizada.
- **Backend Real (Node.js & SQLite):** El backend de esta landing opera con un sistema Node real, utilizando SQLite para persistencia concurrente segura y un middleware blindado contra ataques (límite de payload de 10KB).
- **Seguridad Garantizada:** Panel de administración protegido por Token estricto y sanitización XSS incorporada (`escapeHtml`) en el renderizado de datos.
- **Estructura Narrativa Unificada:** Exposición del ecosistema avanzado de Entity (Grupos Loop, Topologías No Secuenciales, Modelos Híbridos Locales/Cloud y el nuevo Tool Belt).
- **Selector de Demostración Interactivo:** Renderizado ultra-rápido de las vistas del Workspace, Entis, Grupos y Chat Desacoplado.

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
