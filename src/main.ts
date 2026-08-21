import "./style.css";
declare global {
  interface Window {
    openLegalViewer: (index: number) => void;
    closeLegalViewer: () => void;
  }
}
import * as Sentry from "@sentry/browser";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: import.meta.env.VITE_APP_RELEASE || "unknown",
    environment: import.meta.env.VITE_APP_ENVIRONMENT || "development",
    sendDefaultPii: false,
  });
  Sentry.captureMessage("Sentry initialization verified post-release");
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
    <div class="header-left">
      <div class="logo-container">
        <h1>Entity</h1>
      </div>
    </div>
    <nav class="visual-nav">
      <span onclick="location.hash='#hero'" class="nav-item" style="cursor: pointer;">Inicio</span>
      <span onclick="location.hash='#filosofia'" class="nav-item" style="cursor: pointer;">Filosofía</span>
      <span onclick="location.hash='#producto'" class="nav-item" style="cursor: pointer;">Producto</span>
      <span onclick="location.hash='#como-funciona-pro'" class="nav-item" style="cursor: pointer;">Pro</span>
      <span onclick="location.hash='#precios'" class="nav-item" style="cursor: pointer;">Precios</span>

      <span onclick="location.hash='#download-free'" class="nav-item" style="cursor: pointer;">Descargar</span>
    </nav>
    <button class="mobile-menu-btn" aria-label="Menú" aria-expanded="false">☰</button>
    <div class="mobile-menu-drawer">
      <nav class="mobile-nav">
        <span onclick="location.hash='#hero'" class="mobile-nav-item" style="cursor: pointer;">Inicio</span>
        <span onclick="location.hash='#filosofia'" class="mobile-nav-item" style="cursor: pointer;">Filosofía</span>
        <span onclick="location.hash='#producto'" class="mobile-nav-item" style="cursor: pointer;">Producto</span>
        <span onclick="location.hash='#como-funciona-pro'" class="mobile-nav-item" style="cursor: pointer;">Pro</span>
        <span onclick="location.hash='#precios'" class="mobile-nav-item" style="cursor: pointer;">Precios</span>

        <span onclick="location.hash='#download-free'" class="mobile-nav-item" style="cursor: pointer;">Descargar</span>
      </nav>
    </div>
  </header>
  <main>
    <section id="hero" aria-labelledby="hero-headline">
      <div class="hero-content">
        <div class="hero-body-row">
          <div class="hero-left-col">
            <h1 class="hero-headline">Un único Workspace. Todos tus modelos de IA trabajando coordinados.</h1>
            <p class="hero-supporting">Construye agentes especializados con herramientas y contexto propio. Entity te permite orquestar flujos de trabajo híbridos combinando la privacidad de la IA local con la potencia de la nube, optimizando tu consumo de tokens desde tu propio escritorio.</p>
          </div>
          <div class="hero-visual">
            <img src="/hero-test-1.png" alt="Test Hero Image" class="hero-visual-img" />
          </div>
        </div>
        <div class="hero-trust-badges-inline">
          <div class="badge-item">
            <div class="badge-title"><span class="badge-dot"></span><strong>Híbrido</strong></div>
            <span class="badge-desc">Ollama local + Cloud BYOK</span>
          </div>
          <div class="badge-item">
            <div class="badge-title"><span class="badge-dot"></span><strong>Multimodelo</strong></div>
            <span class="badge-desc">OpenAI, Gemini, Anthropic, OpenRouter</span>
          </div>
          <div class="badge-item">
            <div class="badge-title"><span class="badge-dot"></span><strong>Tool Belt</strong></div>
            <span class="badge-desc">RAG, Terminal, Documentos</span>
          </div>
          <div class="badge-item">
            <div class="badge-title"><span class="badge-dot"></span><strong>Orquestación</strong></div>
            <span class="badge-desc">Grupos secuenciales, por turnos y en bucle</span>
          </div>
          <div class="badge-item">
            <div class="badge-title"><span class="badge-dot"></span><strong>Zero Friction</strong></div>
            <span class="badge-desc">Offline, sin registro</span>
          </div>
        </div>
      </div>
    </section>

    <section id="filosofia" class="region reveal-element" aria-labelledby="filosofia-title">
      <style>
        #filosofia {
          display: grid !important;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto;
          align-content: center;
          row-gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          min-height: calc(100vh - 65px) !important;
          padding-top: 2rem !important;
          padding-bottom: 2rem !important;
          padding-left: 2rem;
          padding-right: 2rem;
          box-sizing: border-box;
        }
        
        .filosofia-top-row {
          grid-row: 1 / 2;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        
        .filosofia-left-col {
          text-align: left;
        }

        .filosofia-left-col h2 {
          font-size: 2.2rem;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 1rem;
          margin-top: 0;
        }

        .filosofia-left-col p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.8rem;
        }

        .manual-card {
          background: linear-gradient(180deg, rgba(0, 229, 255, 0.08) 0%, rgba(13, 27, 38, 0.6) 100%);
          border: 1px solid var(--accent-color);
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.15), inset 0 0 20px rgba(0, 229, 255, 0.05);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
        }
        
        .manual-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
        }
        
        .manual-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }

        .manual-icon {
          background: rgba(0, 229, 255, 0.1);
          padding: 0.5rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .manual-header h4 {
          color: var(--text-primary);
          font-size: 1rem;
          margin: 0;
          font-weight: 500;
        }

        .manual-info p {
          color: var(--text-secondary);
          font-size: 0.75rem;
          line-height: 1.4;
          margin-bottom: 1.2rem;
          margin-top: 0;
        }

        .diagram-clean {
          grid-row: 2 / 3;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin-top: 0.5rem;
        }

        .diagram-node-primary {
          background: transparent;
          border: none;
          padding: 0.6rem 1.5rem;
          text-align: center;
          position: relative;
          z-index: 2;
          margin-bottom: 1.5rem;
        }

        .diagram-node-primary h4 {
          color: var(--accent-color);
          font-size: 1.1rem;
          margin: 0;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .diagram-4-cols {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        /* Connecting Lines */
        .diagram-lines {
          position: absolute;
          top: 2.2rem;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .diagram-lines::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 0.75rem;
          background: var(--accent-color);
          opacity: 0.3;
        }
        .diagram-lines::after {
          content: '';
          position: absolute;
          top: 0.75rem;
          left: 12.5%;
          right: 12.5%;
          height: 2px;
          background: var(--accent-color);
          opacity: 0.3;
        }
        
        .diagram-drop {
          position: absolute;
          top: 0.75rem;
          width: 2px;
          height: 0.75rem;
          background: var(--accent-color);
          opacity: 0.3;
        }
        .drop-1 { left: 12.5%; }
        .drop-2 { left: 37.5%; }
        .drop-3 { left: 62.5%; }
        .drop-4 { left: 87.5%; }

        .enti-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: left;
          background: transparent;
        }

        .micro-agent {
          width: 100%;
          background: transparent;
          border: none;
          padding: 0;
          text-align: center;
          margin-bottom: 0.8rem;
          box-sizing: border-box;
        }
        
        .micro-agent strong {
          display: block;
          color: var(--accent-color);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .enti-details {
          width: 100%;
        }
        .enti-details p {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.6rem;
        }
        .enti-details strong {
          color: var(--text-primary);
          font-weight: 500;
        }

        @media (max-width: 900px) {
          #filosofia {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            row-gap: 1.5rem;
          }
          .filosofia-top-row {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .filosofia-title-block, .filosofia-text-block, .diagram-clean {
            grid-column: 1 / 2;
          }
          .filosofia-text-block { grid-row: 2 / 3; }
          .diagram-clean { grid-row: 3 / 4; }
          .diagram-4-cols {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .diagram-lines { display: none; }
          .diagram-node-primary { margin-bottom: 1rem; }
          .enti-col { text-align: center; }
          .enti-details p { text-align: center; }
        }
      </style>

      <div class="filosofia-top-row">
        <!-- LEFT SIDE: Title and Text -->
        <div class="filosofia-left-col">
          <h2 id="filosofia-title">Atomiza tareas<br/>Controla tu consumo</h2>
          <p>No malgastes tokens en procesos mecánicos. Entity te permite asignar un <strong>Brain (modelo) distinto a cada microagente</strong> dentro de un mismo flujo.</p>
          <p>Divide un proyecto grande en microtareas y delega el trabajo de volumen a motores locales o gratuitos. Reserva la potencia (y el coste) de GPT-4o o Claude Opus únicamente para los nodos que exijan razonamiento avanzado.</p>
        </div>

        <!-- RIGHT SIDE: Manual Card -->
        <div class="filosofia-right-col">
          <div class="manual-card">
            <div class="manual-header">
              <div class="manual-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h4>Método Entity</h4>
            </div>
            <div class="manual-info">
              <p>Manual oficial de atomización de tareas (15 págs).</p>
            </div>
            <div style="margin-top: auto;">
              <a onclick="openManualViewer()" style="cursor: pointer; display: inline-flex; align-items: baseline; gap: 0.4rem; font-size: 0.9rem; font-weight: 500; color: var(--text-primary); transition: color 0.2s;" onmouseover="this.style.color='var(--accent-color)'" onmouseout="this.style.color='var(--text-primary)'">
                <span style="color: var(--accent-color);">→</span>
                <span class="text-glow-tier" style="font-size: 0.9rem;">Leer Método</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTENEDOR INDEPENDIENTE 3: DIAGRAMA -->
      <div class="diagram-clean">
        
        <div class="diagram-lines">
          <div class="diagram-drop drop-1"></div>
          <div class="diagram-drop drop-2"></div>
          <div class="diagram-drop drop-3"></div>
          <div class="diagram-drop drop-4"></div>
        </div>
        
        <div class="diagram-node-primary">
          <h4>Método Entity (Aplicado al desarrollo)</h4>
        </div>

        <div class="diagram-4-cols">
          
          <div class="enti-col">
            <div class="micro-agent">
              <strong>1. Enti Documentador</strong>
            </div>
            <div class="enti-details">
              <p><strong>Brain:</strong> Llama 3.1 8B (Local)</p>
              <p><strong>¿Por qué?:</strong> Tarea de lluvia de ideas y redacción creativa. Un modelo local ligero lo hace perfecto, a coste cero, y lo más importante: tu idea de negocio inicial se queda 100% privada en tu máquina.</p>
            </div>
          </div>

          <div class="enti-col">
            <div class="micro-agent">
              <strong>2. Enti Traductor Técnico</strong>
            </div>
            <div class="enti-details">
              <p><strong>Brain:</strong> Mistral / Qwen 2 (Local u OR)</p>
              <p><strong>¿Por qué?:</strong> Es una tarea mecánica de parseo y traducción de texto plano a formato técnico. No requiere un razonamiento profundo, solo buen formateo. Sigue siendo gratis.</p>
            </div>
          </div>

          <div class="enti-col">
            <div class="micro-agent">
              <strong>3. Enti Generador Specs</strong>
            </div>
            <div class="enti-details">
              <p><strong>Brain:</strong> GPT-4o Mini (API)</p>
              <p><strong>¿Por qué?:</strong> Aquí ya empezamos a requerir razonamiento arquitectónico, pero aún no estamos escribiendo código final. 4o Mini es ridículamente barato pero ultra-capaz para estructurar dependencias.</p>
            </div>
          </div>

          <div class="enti-col">
            <div class="micro-agent">
              <strong>4. Enti Implementador</strong>
            </div>
            <div class="enti-details">
              <p><strong>Brain:</strong> Claude 3.5 Sonnet (API)</p>
              <p><strong>¿Por qué?:</strong> Aquí es donde te juegas el dinero. Necesitas la máxima inteligencia del mercado para que el código compile a la primera. Inversión inteligente y enfocada.</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="producto" class="region reveal-element" aria-label="Producto">
      <div class="pf-selector" role="tablist" aria-label="Vistas del producto">
        <button class="pf-tab active" role="tab" aria-selected="true" data-target="agentes">Agentes</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="multichats">Multichats</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="herramientas">Herramientas</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="orquestacion">Orquestación</button>
      </div>

      <div class="producto-visual">
        <div class="product-frame" id="product-frame-container" tabindex="0" role="button" aria-label="Ampliar imagen">
          <img src="/v1_agentes.png" alt="Agentes de Entity" class="pf-capture" id="main-product-img" decoding="async" fetchpriority="high" />
        </div>
      </div>
    </section>
    <section id="como-funciona-pro" class="region reveal-element" aria-labelledby="como-funciona-pro-title">
      <style>
        #como-funciona-pro {
          display: grid !important;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto auto;
          align-content: center;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          min-height: calc(100vh - 65px) !important;
          padding-top: 2rem !important;
          padding-bottom: 2rem !important;
          padding-left: 2rem;
          padding-right: 2rem;
          box-sizing: border-box;
        }

        .privacy-text-block {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          align-self: start;
          text-align: left;
          padding-right: 2rem;
          transform: translateY(-40px);
        }

        .privacy-cards-block {
          grid-column: 2 / 3;
          grid-row: 1 / 3;
          align-self: center;
          display: flex;
          gap: 1rem;
        }

        .mini-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
        }
        .mini-card h3 {
          font-size: 1.1rem;
          color: var(--accent-color);
          margin-bottom: 0.8rem;
        }
        .mini-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .mini-card ul {
          margin: 0;
          padding-left: 1.2rem;
        }
        .mini-card li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
        }

        .privacy-timeline {
          grid-column: 1 / 3;
          grid-row: 3 / 4;
          align-self: start;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
          position: relative;
          margin-top: 4rem;
        }
        .privacy-timeline::before {
          content: '';
          position: absolute;
          top: 14px;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
          opacity: 0.4;
          z-index: 0;
        }
        .privacy-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .privacy-step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-dark, #0d0d12);
          border: 1px solid var(--accent-color);
          color: var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: bold;
          margin-bottom: 0.8rem;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.15);
        }

        @media (max-width: 900px) {
          #como-funciona-pro {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            gap: 3rem;
          }
          .privacy-text-block {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            padding-right: 0;
            transform: none;
          }
          .privacy-cards-block {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
            flex-direction: column;
          }
          .privacy-timeline {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-top: 4rem;
          }
          .privacy-timeline::before {
            display: none;
          }
        }
      </style>

      <!-- CONTENEDOR INDEPENDIENTE 1: Texto (Anclado Arriba Izquierda) -->
      <div class="privacy-text-block">
        <h2 id="como-funciona-pro-title" style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--text-primary); line-height: 1.2;">Privacidad por diseño.<br/>Sin cuentas,<br/>Sin registros.</h2>
        <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6;">Nuestra filosofía es innegociable: no traficamos con tus datos. No hay perfiles en la nube ni bases de datos personales. Incluso el pago está blindado.</p>
      </div>

      <!-- CONTENEDOR INDEPENDIENTE 2: Superpoderes Pro (Anclado Medio Derecha) -->
      <div class="privacy-cards-block">
        <style>
          .pro-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 0.5rem; }
          @media (max-width: 768px) { .pro-features-grid { grid-template-columns: 1fr; } }
        </style>
        <div class="mini-card" style="background: linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(13, 27, 38, 0.4) 100%); border-color: rgba(0, 229, 255, 0.2); justify-content: center; padding: 1rem;">
          <h3 style="font-size: 1.1rem; margin-bottom: 0.8rem;">¿Qué aporta la versión Pro?</h3>
          <div class="pro-features-grid">
            <!-- Consola -->
            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; text-align: left;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color);">
                <polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              <strong style="color: var(--text-primary); font-size: 0.85rem; margin-top: 0.2rem;">Consola</strong>
              <span style="color: var(--text-secondary); font-size: 0.75rem; line-height: 1.4;">Dale a tus Entis el poder de ejecutar comandos.</span>
            </div>
            
            <!-- RAG -->
            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; text-align: left;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color);">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <strong style="color: var(--text-primary); font-size: 0.85rem; margin-top: 0.2rem;">Conexión RAG</strong>
              <span style="color: var(--text-secondary); font-size: 0.75rem; line-height: 1.4;">Dale acceso a tus Entis a grandes fuentes de conocimiento.</span>
            </div>
            
            <!-- Grupos -->
            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; text-align: left;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color);">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>
              </svg>
              <strong style="color: var(--text-primary); font-size: 0.85rem; margin-top: 0.2rem;">Grupos</strong>
              <span style="color: var(--text-secondary); font-size: 0.75rem; line-height: 1.4;">Experimenta con nuevas secuencias para tus grupos de Entis.</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CONTENEDOR INDEPENDIENTE 3: Línea de Tiempo (Anclado Abajo) -->
      <div class="privacy-timeline">
        <div class="privacy-step">
          <div class="privacy-step-num">1</div>
          <h4 style="margin-bottom: 0.6rem; color: var(--text-primary); font-size: 0.9rem;">Descarga Directa</h4>
          <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
            La versión Free es el motor completo. Bájalo sin dar tu email ni rellenar formularios absurdos.
          </p>
        </div>
        
        <div class="privacy-step">
          <div class="privacy-step-num">2</div>
          <h4 style="margin-bottom: 0.6rem; color: var(--text-primary); font-size: 0.9rem;">Pago Externalizado</h4>
          <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
            Si decides hacer el upgrade, Lemon Squeezy procesa el pago. Nosotros nunca veremos tu tarjeta.
          </p>
        </div>

        <div class="privacy-step">
          <div class="privacy-step-num">3</div>
          <h4 style="margin-bottom: 0.6rem; color: var(--text-primary); font-size: 0.9rem;">Licencia Pura</h4>
          <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
            Recibes una clave segura. Cero creación de perfiles, cero contraseñas en nuestros servidores.
          </p>
        </div>

        <div class="privacy-step">
          <div class="privacy-step-num">4</div>
          <h4 style="margin-bottom: 0.6rem; color: var(--text-primary); font-size: 0.9rem;">Desbloqueo Local</h4>
          <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
            Pega la clave en tu app y el nivel Pro se activa localmente. Tu trabajo se queda en tu ordenador.
          </p>
        </div>
      </div>
    </section>

    <!-- FILOSOFÍA / CONTROL DE CONSUMO -->
    <section id="precios" class="region reveal-element" aria-label="Precios">

      <div style="display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap; max-width: 800px; width: 100%;">
        
        <!-- Tarjeta Free -->
        <div class="narrativa-card" style="flex: 1; min-width: 280px; padding: 1.5rem; display: flex; flex-direction: column;">
          <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--text-primary);">Entity Free</h3>
          <div style="font-size: 2rem; font-weight: 600; margin-bottom: 0.8rem; color: var(--text-primary);">0 €</div>
          <p style="color: var(--text-secondary); margin-bottom: 1.2rem; font-size: 0.85rem;">
            <span style="color: var(--accent-color);">Sin registro y sin tarjeta.</span> Descarga directa para empezar a organizar tu trabajo con IA.
          </p>
          <ul class="problema-bullets-mini" style="margin-bottom: 1.5rem; flex: 1;">
            <li><strong>Entis Ilimitados</strong></li>
            <li><strong>Grupos Secuenciales</strong></li>
            <li><strong>Chat Individual</strong></li>
            <li><strong>Ollama, Cloud y Open router</strong></li>
            <li><strong>Persistencia completa</strong></li>
            <li><strong>DOCX y PDF</strong></li>
          </ul>
          <a href="#download-free" class="text-link-premium">→ Free</a>
        </div>

        <!-- Tarjeta Pro -->
        <div class="narrativa-card pro-card" style="flex: 1; min-width: 280px; padding: 1.5rem; display: flex; flex-direction: column;">
          <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--accent-color);">Entity Pro</h3>
          
          <!-- Mensual / Anual Toggle -->
          <div class="pf-tabs billing-toggle" role="tablist" aria-label="Selección de cadencia" style="justify-content: center; margin-bottom: 0.8rem; width: fit-content; align-self: flex-start; min-height: unset; padding: 2px;">
            <button class="pf-tab active" role="tab" aria-selected="true" data-billing="monthly" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;">Mensual</button>
            <button class="pf-tab" role="tab" aria-selected="false" data-billing="annual" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;">Anual</button>
          </div>
          
          <div id="price-monthly" style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-primary); display: flex; flex-direction: column; gap: 0.2rem;">
            <div style="font-size: 2rem; font-weight: 600;">8.99 € <span style="font-size: 0.9rem; font-weight: normal; color: var(--text-secondary);">/ mes</span></div>
          </div>
          <div id="price-annual" style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-primary); display: none; flex-direction: column; gap: 0.2rem;">
            <div style="font-size: 2rem; font-weight: 600;">89 € <span style="font-size: 0.9rem; font-weight: normal; color: var(--text-secondary);">/ año</span></div>
          </div>
          
          <p style="color: var(--text-secondary); margin-bottom: 1.2rem; font-size: 0.85rem;">
            Sube de nivel a tus Entis y grupos con las funciones Pro
          </p>
          <ul class="problema-bullets-mini" style="margin-bottom: 1.5rem; flex: 1;">
            <li><strong>Todo lo incluido en Free</strong></li>
            <li><strong>Grupos en bucle</strong></li>
            <li><strong>Grupos por turnos</strong></li>
            <li><strong>Terminal</strong></li>
            <li><strong>RAG</strong></li>
            <li><strong>Máximo 2 dispositivos simultáneos</strong></li>
            <li><strong>Offline:</strong> Funciona sin red hasta 30 días seguidos</li>
          </ul>
          <a href="https://entity.lemonsqueezy.com/checkout/buy/6d4157a1-2d33-4db0-95f0-5d8689b6931a?enabled=2031256%2C2034570" id="checkout-pro" class="text-link-premium" target="_blank" rel="noopener noreferrer">→ Pro</a>
          <div id="checkout-error" style="display: none; color: var(--danger-color, #ff4d4d); margin-top: 0.5rem; font-size: 0.8rem; text-align: center;">El servicio de compra no está disponible en este momento. Inténtalo más tarde.</div>
        </div>

      </div>
      

    </section>

    <!-- CÓMO FUNCIONA PRO / PRIVACIDAD (FIA-W01.10 & 11) -->
    <section id="download-free" class="region reveal-element" aria-labelledby="download-title">
      <style>
        #download-free {
          display: flex !important;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          min-height: calc(100vh - 65px) !important;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem 2rem 0 2rem !important;
          border-bottom: 1px solid rgba(0, 229, 255, 0.1) !important;
          box-sizing: border-box;
        }
        .download-header {
          text-align: left;
          margin-bottom: 3.5rem;
          width: 100%;
        }
        .download-header h2 {
          margin-top: 0;
          font-size: 2.2rem;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .download-header p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 0.5rem 0;
          max-width: 100%;
        }
        .unified-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .free-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          text-align: left;
          width: 100%;
          margin-top: auto;
          margin-bottom: auto;
        }
        .feature-col h3 {
          color: var(--accent-color);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
          margin-top: 0;
        }
        .feature-col p {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
        @media (max-width: 900px) {
          .free-features {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .unified-actions {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      </style>

      <div class="download-header">
        <h2 id="download-title">Descarga Entity ahora</h2>
        <p>Comienza a utilizar el núcleo local-first de Entity de inmediato. <strong>Sin email. Sin cuenta. Sin tarjeta.</strong></p>
        <p style="margin-top: 0.5rem; margin-bottom: 0;">La versión Free no es una demo capada. Es una plataforma completa para diseñar líneas de trabajo serias a coste cero.</p>
        <div class="unified-actions download-container">
          <div class="pf-tabs download-os-tabs" role="tablist" aria-label="Selección de plataforma" style="margin: 0;">
            <button class="pf-tab active" role="tab" aria-selected="true" data-platform="windows">Windows</button>
            <button class="pf-tab" role="tab" aria-selected="false" data-platform="linux">Linux</button>
          </div>
          <a id="download-cta" href="https://github.com/hnoloh/Entity-Downloads/releases/download/v1.0.0/Entity_1.0.0_x64-setup.exe" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); background: transparent; padding: 0.6rem 0; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; text-shadow: 0 0 10px rgba(0, 229, 255, 0.4); transition: text-shadow 0.2s, opacity 0.2s;" onmouseover="this.style.opacity='0.8'; this.style.textShadow='0 0 15px rgba(0, 229, 255, 0.8)';" onmouseout="this.style.opacity='1'; this.style.textShadow='0 0 10px rgba(0, 229, 255, 0.4)';">
            Descargar
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
          <div id="download-error" style="display: none; color: var(--danger-color, #ff4d4d); margin-top: 0; font-size: 0.85rem; margin-left: 1rem;">El recurso de descarga no está disponible en este momento. Inténtalo más tarde.</div>
        </div>
      </div>

      <div class="free-features">
        <div class="feature-col">
          <div style="color: var(--accent-color); margin-bottom: 0.8rem; display: flex;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"></path></svg>
          </div>
          <h3>Entis Ilimitados</h3>
          <p>Crea todos los agentes especializados que necesites sin restricciones. Asigna roles únicos y construye un equipo local imparable adaptado a tu flujo de trabajo.</p>
        </div>
        <div class="feature-col">
          <div style="color: var(--accent-color); margin-bottom: 0.8rem; display: flex;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>
          </div>
          <h3>Brains a Medida</h3>
          <p>Conecta cada Enti al modelo ideal. Usa LLMs locales para privacidad total, o integra APIs como OpenAI y Anthropic para tareas exigentes.</p>
        </div>
        <div class="feature-col">
          <div style="color: var(--accent-color); margin-bottom: 0.8rem; display: flex;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </div>
          <h3>Grupos Secuenciales</h3>
          <p>Orquesta pipelines paso a paso. Haz que tus Entis colaboren pasándose el contexto, automatizando cadenas de tareas enteras de forma autónoma.</p>
        </div>
      </div>

      <!-- NUEVO FOOTER INTEGRADO (FAQ Y LEGAL) -->
      <div style="width: 100%; border-top: 1px solid rgba(0, 229, 255, 0.1); padding: 0.5rem 0; margin-top: auto; display: flex; justify-content: center; gap: 4rem;">
        <!-- FAQ Menu Container -->
        <div class="faq-menu-container" id="desktop-faq-container">
          <span class="nav-item" id="faq-menu-btn" style="cursor: pointer;">FAQ</span>
          <div class="faq-mega-menu" id="faq-mega-menu">
            <!-- JS will populate questions here -->
          </div>
          <!-- Bocadillo Tooltip -->
          <div id="faq-bocadillo" class="faq-bocadillo">
            <h4 id="faq-bocadillo-q"></h4>
            <p id="faq-bocadillo-a"></p>
          </div>
        </div>

        <!-- Legal Menu Container -->
        <div class="faq-menu-container" id="desktop-legal-container">
          <span class="nav-item" id="legal-menu-btn" style="cursor: pointer;">Legal</span>
          <div class="faq-mega-menu" id="legal-mega-menu" style="min-width: 200px;">
            <!-- JS will populate legal items here -->
          </div>
        </div>
      </div>
    </section>


    <div id="lightbox-modal" class="lightbox-modal" aria-hidden="true" role="dialog" aria-modal="true">
      <button id="lightbox-prev" class="lightbox-nav-btn lightbox-prev" aria-label="Imagen anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <img id="lightbox-img" class="lightbox-img" src="" alt="Captura ampliada" />
      <button id="lightbox-next" class="lightbox-nav-btn lightbox-next" aria-label="Siguiente imagen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>

    <!-- Legal Viewer Modal -->
    <div id="legal-modal" class="manual-overlay" style="display: none; align-items: center; justify-content: center; z-index: 10000; position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(5px);">
      <div class="manual-viewer" style="max-width: 800px; width: 90%; max-height: 85vh; background: var(--bg-color); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; display: flex; flex-direction: column; position: relative;">
        <div class="manual-controls" style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center; background: rgba(255,255,255,0.02); border-radius: 12px 12px 0 0; position: relative;">
          <button onclick="closeLegalViewer()" style="position: absolute; left: 1.5rem; background: transparent; border: none; color: var(--accent-color); font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; padding: 0; text-shadow: 0 0 5px rgba(0,229,255,0); transition: text-shadow 0.2s;" onmouseover="this.style.textShadow='0 0 10px rgba(0,229,255,0.6)'" onmouseout="this.style.textShadow='0 0 5px rgba(0,229,255,0)'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver
          </button>
          <h3 id="legal-modal-title" style="margin: 0; font-size: 1.2rem; color: var(--text-primary);">Aviso Legal</h3>
        </div>
        <div id="legal-modal-content" style="padding: 2.5rem 2rem; overflow-y: auto; text-align: left; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7;">
          <!-- JS injects text -->
        </div>
      </div>
    </div>
  </main>

  <!-- MANUAL VIEWER MODAL -->
  <style>
    .manual-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(10px);
      z-index: 9999;
      display: none; /* hidden by default, toggled via JS */
      justify-content: center;
      align-items: center;
    }
    
    .manual-viewer {
      width: 95%;
      max-width: 1200px;
      height: 95vh;
      background: var(--bg-dark, #0d0d12);
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 50px rgba(0, 229, 255, 0.1);
    }

    .manual-close-btn {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: var(--text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .manual-close-btn:hover { color: white; border-color: var(--accent-color); background: rgba(0,229,255,0.1); }

    .manual-controls {
      display: flex;
      justify-content: center;
      gap: 2rem;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .manual-nav-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.95rem;
    }
    .manual-nav-btn:hover:not(:disabled) {
      background: rgba(0, 229, 255, 0.1);
      border-color: var(--accent-color);
    }
    .manual-nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    #manual-page-indicator {
      color: var(--accent-color);
      font-size: 1rem;
      font-family: monospace;
      font-weight: bold;
      min-width: 120px;
      text-align: center;
    }

    .manual-page-container {
      flex: 1;
      overflow-y: auto;
      overflow-x: auto;
      text-align: center;
      padding: 2rem;
      /* Protect against download */
      user-select: none;
      -webkit-user-drag: none;
    }

    #manual-page-img {
      width: 100%;
      max-width: 500px; /* Default readable width */
      height: auto;
      margin: 0 auto;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      pointer-events: none; /* Block right-click entirely on the image */
      transition: max-width 0.2s ease;
    }
  </style>

  <div id="manual-modal" class="manual-overlay">
    <div class="manual-viewer">
      <button class="manual-close-btn" onclick="closeManualViewer()">×</button>
      <div class="manual-controls">
        <button class="manual-nav-btn" onclick="prevManualPage()" id="manual-prev-btn">← Anterior</button>
        <span id="manual-page-indicator">Página 1 / 15</span>
        <div style="display: flex; gap: 0.5rem;">
          <button class="manual-nav-btn" onclick="zoomManualPage(150)" title="Acercar (Zoom In)" style="padding: 0.4rem 0.8rem; display: flex; align-items: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button class="manual-nav-btn" onclick="zoomManualPage(-150)" title="Alejar (Zoom Out)" style="padding: 0.4rem 0.8rem; display: flex; align-items: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
        </div>
        <button class="manual-nav-btn" onclick="nextManualPage()" id="manual-next-btn">Siguiente →</button>
      </div>
      <div class="manual-page-container" oncontextmenu="return false;">
        <img id="manual-page-img" src="/manual/page-01.png" alt="Página del Método Entity" draggable="false" />
      </div>
    </div>
  </div>
`;

const mobileMenuBtn =
  document.querySelector<HTMLButtonElement>(".mobile-menu-btn");
const headerEl = document.querySelector<HTMLElement>("header");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-item");

// Toggle menu on button click
mobileMenuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
  headerEl?.classList.toggle("mobile-menu-open");
});

// Close menu when clicking a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
    headerEl?.classList.remove("mobile-menu-open");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (
    headerEl?.classList.contains("mobile-menu-open") &&
    !headerEl.contains(target)
  ) {
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
    headerEl.classList.remove("mobile-menu-open");
  }
});

// Demo Selector logic (FIA-034)
const pfTabs = document.querySelectorAll(
  "#producto .pf-tab, #casos-uso .pf-tab",
);
const pfCaptureImg = document.querySelector<HTMLImageElement>(".pf-capture");

const viewAssets: Record<string, { src: string; alt: string }> = {
  agentes: {
    src: "/v1_agentes.png",
    alt: "Agentes de Entity",
  },
  multichats: {
    src: "/v1_workspace.png",
    alt: "Multichats de Entity",
  },
  herramientas: {
    src: "/v1_herramientas.png",
    alt: "Herramientas de Entity",
  },
  orquestacion: {
    src: "/v1_orquestacion.png",
    alt: "Orquestación de Entis",
  },
};

// Preload assets for instant switching without lag (FIA-035 optimization)
Object.values(viewAssets).forEach((asset) => {
  const img = new Image();
  img.src = asset.src;
});

pfTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-target") || "agentes";

    // Update active tab styling
    pfTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    // Update image and text
    if (pfCaptureImg && viewAssets[target]) {
      pfCaptureImg.src = viewAssets[target].src;
      pfCaptureImg.alt = viewAssets[target].alt;

      // Trigger transition animation (FIA-067)
      pfCaptureImg.classList.remove("switching");
      void pfCaptureImg.offsetWidth; // Force reflow
      pfCaptureImg.classList.add("switching");
    }
  });
});

// Billing Toggle logic (FIA-W01.17)
const billingTabs = Array.from(
  document.querySelectorAll(".billing-toggle .pf-tab"),
) as HTMLButtonElement[];
billingTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    billingTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const billing = tab.getAttribute("data-billing");
    const priceMonthly = document.getElementById("price-monthly");
    const priceAnnual = document.getElementById("price-annual");
    const checkoutPro = document.getElementById("checkout-pro") as HTMLAnchorElement;

    if (billing === "monthly") {
      if (priceMonthly) priceMonthly.style.display = "flex";
      if (priceAnnual) priceAnnual.style.display = "none";
      if (checkoutPro) checkoutPro.href = "https://entity.lemonsqueezy.com/checkout/buy/6d4157a1-2d33-4db0-95f0-5d8689b6931a?enabled=2031256%2C2034570";
    } else if (billing === "annual") {
      if (priceMonthly) priceMonthly.style.display = "none";
      if (priceAnnual) priceAnnual.style.display = "flex";
      if (checkoutPro) checkoutPro.href = "https://entity.lemonsqueezy.com/checkout/buy/6d4157a1-2d33-4db0-95f0-5d8689b6931a?enabled=2031215%2C2031256";
    }
  });
});

// Download OS Tabs logic (FIA-W01.14)
const downloadOsTabs = Array.from(
  document.querySelectorAll(".download-os-tabs .pf-tab"),
) as HTMLButtonElement[];
downloadOsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    downloadOsTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const cta = document.getElementById("download-cta") as HTMLAnchorElement;
    const desc = document.getElementById(
      "download-desc",
    ) as HTMLParagraphElement;
    const platform = tab.getAttribute("data-platform");

    if (platform === "windows") {
      cta.href =
        "https://github.com/hnoloh/Entity-Downloads/releases/download/v1.0.0/Entity_1.0.0_x64-setup.exe";
      desc.innerHTML =
        'Descarga directa desde las releases oficiales en GitHub.<br/><span style="font-size: 0.75rem; opacity: 0.6; display: block; margin-top: 0.5rem; font-family: monospace;">sha256:765192c676498df622a81ce29900f63671c7c6d0ee0cbebea51fb81416f6643d | 5.89 MB</span>';
    } else if (platform === "linux") {
      cta.href =
        "https://github.com/hnoloh/Entity-Downloads/releases/download/v1.0.0/Entity_1.0.0_amd64.AppImage";
      desc.innerHTML =
        'Descarga directa desde las releases oficiales en GitHub.<br/><span style="font-size: 0.75rem; opacity: 0.6; display: block; margin-top: 0.5rem; font-family: monospace;">sha256:e78eca59cf20c9ef4e2dc579dd6f2b2332c08ee4736fc5e449a366ac711f8fcf | 84.8 MB</span>';
    }
  });
});

// Intersection Observer for scroll reveal (FIA-063)
if (typeof window !== "undefined" && window.IntersectionObserver) {
  const revealCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        // Unobserve after revealing to prevent re-animating when scrolling back up
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  });

  document.querySelectorAll(".reveal-element").forEach((el) => {
    revealObserver.observe(el);
  });

  // Scrollspy for Navigation Links
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (id) {
          navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("onclick")?.includes(id)) {
              item.classList.add("active");
            }
          });
        }
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px" });

  sections.forEach(section => {
    scrollSpyObserver.observe(section);
  });
}

// Lightbox functionality
const productContainer = document.getElementById("product-frame-container");
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img") as HTMLImageElement;
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

if (productContainer && lightboxModal && lightboxImg) {
  const mainImg = document.getElementById(
    "main-product-img",
  ) as HTMLImageElement;
  const tabs = Array.from(
    document.querySelectorAll(".pf-tab"),
  ) as HTMLButtonElement[];

  const openLightbox = (e?: MouseEvent) => {
    if (mainImg) {
      lightboxImg.src = (e?.target as HTMLImageElement)?.src || mainImg.src;
      lightboxModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction: 1 | -1) => {
    const activeIndex = tabs.findIndex((tab) =>
      tab.classList.contains("active"),
    );
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = tabs.length - 1;
    if (newIndex >= tabs.length) newIndex = 0;

    tabs[newIndex].click(); // Trigger the existing logic

    // Allow the dom to update the mainImg src before we copy it
    setTimeout(() => {
      lightboxImg.src = mainImg.src;
    }, 50);
  };

  productContainer.addEventListener("click", openLightbox);
  productContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox();
    }
  });

  if (lightboxPrev)
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  if (lightboxNext)
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });

  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  lightboxImg.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

// Pre-check para disponibilidad de enlaces de distribución (FIA-W01.29)
const downloadCta = document.getElementById("download-cta") as HTMLAnchorElement;
const downloadError = document.getElementById("download-error");
if (downloadCta) {
  downloadCta.addEventListener("click", async (e) => {
    e.preventDefault();
    if (downloadError) downloadError.style.display = "none";
    
    // Check contra la API pública de GitHub para el release oficial
    try {
      const response = await fetch("https://api.github.com/repos/hnoloh/Entity-Downloads/releases/tags/v1.0.0");
      if (!response.ok) {
        throw new Error("Release not found");
      }
      
      const newWin = window.open(downloadCta.href, "_blank");
      if (!newWin) {
        window.location.href = downloadCta.href;
      }
    } catch {
      if (downloadError) downloadError.style.display = "block";
    }
  });
}

const checkoutCta = document.getElementById("checkout-pro") as HTMLAnchorElement;
const checkoutError = document.getElementById("checkout-error");
if (checkoutCta) {
  checkoutCta.addEventListener("click", async (e) => {
    e.preventDefault();
    if (checkoutError) checkoutError.style.display = "none";
    
    try {
      await fetch(checkoutCta.href, { mode: 'no-cors' });
      const newWin = window.open(checkoutCta.href, "_blank");
      if (!newWin) {
        window.location.href = checkoutCta.href;
      }
    } catch {
      if (checkoutError) checkoutError.style.display = "block";
    }
  });
}

declare global {
  interface Window {
    openManualViewer: () => void;
    closeManualViewer: () => void;
    nextManualPage: () => void;
    prevManualPage: () => void;
    zoomManualPage: (amount: number) => void;
  }
}

// === MANUAL VIEWER LOGIC ===
let currentManualPage = 1;
const totalManualPages = 15;

window.openManualViewer = () => {
  const modal = document.getElementById('manual-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  updateManualPage();
};

window.closeManualViewer = () => {
  const modal = document.getElementById('manual-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

window.nextManualPage = () => {
  if (currentManualPage < totalManualPages) {
    currentManualPage++;
    updateManualPage();
  }
};

window.prevManualPage = () => {
  if (currentManualPage > 1) {
    currentManualPage--;
    updateManualPage();
  }
};

function updateManualPage() {
  const img = document.getElementById('manual-page-img') as HTMLImageElement;
  const indicator = document.getElementById('manual-page-indicator');
  const prevBtn = document.getElementById('manual-prev-btn') as HTMLButtonElement;
  const nextBtn = document.getElementById('manual-next-btn') as HTMLButtonElement;
  
  if (img) {
    const pageNumStr = currentManualPage.toString().padStart(2, '0');
    const container = img.parentElement;
    if (container) container.scrollTop = 0;
    
    img.src = `/manual/page-${pageNumStr}.png`;
  }
  if (indicator) {
    indicator.textContent = `Página ${currentManualPage} / ${totalManualPages}`;
  }
  if (prevBtn) {
    prevBtn.disabled = currentManualPage === 1;
  }
  if (nextBtn) {
    nextBtn.disabled = currentManualPage === totalManualPages;
  }
}

let currentManualWidth = 500;
window.zoomManualPage = (amount: number) => {
  currentManualWidth += amount;
  if (currentManualWidth < 400) currentManualWidth = 400; // Min zoom
  if (currentManualWidth > 3000) currentManualWidth = 3000; // Max zoom
  
  const img = document.getElementById('manual-page-img');
  if (img) {
    img.style.maxWidth = currentManualWidth + 'px';
  }
};


// === FAQ MEGA MENU LOGIC ===
const faqData = [
  { q: "¿Entity Free requiere una cuenta?", a: "No. Entity Free se puede utilizar sin registro y sin crear una cuenta." },
  { q: "¿Free es una prueba temporal?", a: "No, Entity Free no es una prueba temporal (trial). Es una versión gratuita de uso indefinido." },
  { q: "¿Necesito pagar una API?", a: "Si utilizas modelos locales (ej. Ollama), no necesitas pagar APIs. Si optas por modelos en la nube (BYOK), el coste dependerá de las tarifas de tu proveedor, no garantizamos APIs gratuitas." },
  { q: "¿Puedo utilizar modelos locales/Ollama?", a: "Sí, Entity ofrece soporte nativo para modelos locales mediante Ollama." },
  { q: "¿Qué incluye Entity Pro?", a: "Entity Pro incluye todo lo de Free, más Grupos Loop, Grupos No Secuenciales, y soporte de Terminal / Filesystem avanzado." },
  { q: "¿Tengo que descargar otra aplicación para Pro?", a: "No. Entity Free y Pro son exactamente la misma aplicación. No hay ejecutables separados." },
  { q: "¿Cómo activo Pro?", a: "Al adquirir Pro, recibes una License Key por correo. Solo tienes que introducirla en la aplicación para activar las capacidades Pro." },
  { q: "¿En cuántos ordenadores puedo utilizar Pro?", a: "Puedes utilizar tu suscripción Pro en un máximo de 2 dispositivos simultáneos." },
  { q: "¿Pro funciona sin Internet?", a: "Sí, Entity Pro funciona offline hasta 30 días seguidos antes de requerir conexión para validar la suscripción." },
  { q: "¿Qué ocurre si cancelo Pro?", a: "Puedes gestionar tu cancelación a través de Lemon Squeezy. Al finalizar el periodo facturado, la aplicación volverá al nivel Free." },
  { q: "¿Dónde se guardan mis datos?", a: "El almacenamiento principal de tus datos se realiza localmente en tu ordenador." }
];

const faqMenuBtn = document.getElementById('faq-menu-btn');
const faqMenuContainer = document.getElementById('desktop-faq-container');
const faqMegaMenu = document.getElementById('faq-mega-menu');
const faqBocadillo = document.getElementById('faq-bocadillo');
const faqBocadilloQ = document.getElementById('faq-bocadillo-q');
const faqBocadilloA = document.getElementById('faq-bocadillo-a');

if (faqMenuBtn && faqMenuContainer && faqMegaMenu) {
  // Toggle mega menu
  faqMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    faqMenuContainer.classList.toggle('open');
    if (!faqMenuContainer.classList.contains('open') && faqBocadillo) {
       faqBocadillo.classList.remove('show');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!faqMenuContainer.contains(e.target as Node)) {
      faqMenuContainer.classList.remove('open');
      if (faqBocadillo) faqBocadillo.classList.remove('show');
    }
  });

  // Populate questions
  faqData.forEach((item) => {
    const qEl = document.createElement('div');
    qEl.className = 'faq-q-item';
    qEl.textContent = item.q;
    qEl.title = item.q; // tooltip for long truncated text
    
    // Click interactions
    qEl.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.faq-q-item').forEach(el => el.classList.remove('active'));
      qEl.classList.add('active');
      
      if (faqBocadillo) {
        faqBocadillo.classList.add('show');
        if (faqBocadilloQ) faqBocadilloQ.textContent = item.q;
        if (faqBocadilloA) faqBocadilloA.textContent = item.a;
        
        // Align bubble with the item
        const itemTop = qEl.offsetTop - faqMegaMenu.scrollTop;
        faqBocadillo.style.top = (itemTop - 10) + 'px';
      }
    });

    faqMegaMenu.appendChild(qEl);
  });
}

// Mobile FAQ Logic
const mobileFaqBtn = document.getElementById('mobile-faq-btn');
const mobileFaqList = document.getElementById('mobile-faq-list');

if (mobileFaqBtn && mobileFaqList) {
  mobileFaqBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = mobileFaqList.style.display === 'flex';
    mobileFaqList.style.display = isExpanded ? 'none' : 'flex';
  });

  faqData.forEach((item) => {
    const qEl = document.createElement('div');
    qEl.innerHTML = `<h5 style="color:var(--accent-color); margin:0 0 0.2rem 0; font-size:0.95rem;">${item.q}</h5><p style="color:var(--text-secondary); margin:0; font-size:0.85rem;">${item.a}</p>`;
    mobileFaqList.appendChild(qEl);
  });
}

// =======================
// LEGAL MODAL & DROPDOWNS
// =======================
const legalDocs = [
  {
    title: "Política de Privacidad",
    content: "<h3>1. Almacenamiento Local First</h3><p>Entity está diseñado fundamentalmente para operar localmente. Todos tus datos, configuraciones, flujos de trabajo y prompts residen exclusivamente en tu ordenador por defecto. No recogemos métricas de uso ni almacenamos tu propiedad intelectual en nuestros servidores.</p><h3>2. Conexiones a APIs de terceros</h3><p>Cuando decides conectar Entity a un modelo externo (ej. OpenAI, Anthropic), debes saber que el envío de datos está sujeto a las políticas de privacidad de dicho proveedor de IA. Entity actúa como un mero puente para facilitar esta conexión y no almacena copias intermedias de estas peticiones.</p><h3>3. Información de facturación</h3><p>Las suscripciones a la versión Pro se procesan de forma segura a través de Lemon Squeezy, que actúa como Merchant of Record (MoR). Nosotros no tenemos acceso directo a tu información de pago ni a los detalles completos de tus tarjetas bancarias.</p>"
  },
  {
    title: "Términos y Condiciones",
    content: "<h3>1. Licencia de la versión Free</h3><p>La versión Free de Entity se distribuye de manera gratuita y permite un uso ilimitado de sus características base (Entis, Brains y Grupos). Está permitida su instalación y uso tanto en entornos personales como comerciales, pero sin garantías explícitas ni derecho a soporte técnico prioritario.</p><h3>2. Condiciones de la versión Pro</h3><p>El uso de la versión Pro está supeditado a una suscripción activa (mensual o anual). La suscripción te da acceso al modo autónomo (Auto-run), a configuraciones avanzadas de concurrencia y a un canal de soporte técnico dedicado. El reembolso es aplicable según las políticas estándar de Lemon Squeezy dentro de los primeros 14 días si no estás satisfecho con la plataforma.</p><h3>3. Limitación de Responsabilidad</h3><p>Entity proporciona la infraestructura de agentes locales, pero no se hace responsable del código emitido ni de las acciones ejecutadas de forma autónoma por los agentes en tu máquina. Utiliza la supervisión del modo manual siempre que tengas dudas sobre el flujo orquestado.</p>"
  },
  {
    title: "Política de Cookies",
    content: "<h3>1. Uso exclusivo de Cookies Técnicas</h3><p>Nuestra página web no despliega cookies de rastreo (trackers), ni cookies publicitarias de terceros (como Google Analytics, Meta Pixel, etc.). Nuestro objetivo es el diseño limpio y el respeto absoluto a tu huella digital.</p><h3>2. Cookies de sesión e idioma</h3><p>Únicamente se instalarán cookies necesarias (strict cookies) que gestionen preferencias muy básicas, como el estado de tu sesión en el panel de usuario o la moneda mostrada en los precios, facilitado por Lemon Squeezy en la pasarela de pago.</p><h3>3. Aceptación implícita</h3><p>Al utilizar esta página estás interactuando con una estructura sin rastreadores masivos. La navegación continua asume la aceptación del depósito de las mencionadas y exclusivas cookies técnicas.</p>"
  }
];

// Open / Close Global Functions
window.openLegalViewer = (index: number) => {
  const modal = document.getElementById('legal-modal');
  const titleEl = document.getElementById('legal-modal-title');
  const contentEl = document.getElementById('legal-modal-content');
  if (modal && titleEl && contentEl) {
    titleEl.textContent = legalDocs[index].title;
    contentEl.innerHTML = legalDocs[index].content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.closeLegalViewer = () => {
  const modal = document.getElementById('legal-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Desktop Legal Dropdown
const legalMenuBtn = document.getElementById('legal-menu-btn');
const legalMenuContainer = document.getElementById('desktop-legal-container');
const legalMegaMenu = document.getElementById('legal-mega-menu');

if (legalMenuBtn && legalMenuContainer && legalMegaMenu) {
  legalMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    legalMenuContainer.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!legalMenuContainer.contains(e.target as Node)) {
      legalMenuContainer.classList.remove('open');
    }
  });

  legalDocs.forEach((doc, index) => {
    const item = document.createElement('div');
    item.className = 'faq-q-item';
    item.textContent = doc.title;
    
    item.addEventListener('click', () => {
      window.openLegalViewer(index);
      legalMenuContainer.classList.remove('open');
    });
    legalMegaMenu.appendChild(item);
  });
}

// Mobile Legal Dropdown
const mobileLegalBtn = document.getElementById('mobile-legal-btn');
const mobileLegalList = document.getElementById('mobile-legal-list');

if (mobileLegalBtn && mobileLegalList) {
  mobileLegalBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = mobileLegalList.style.display === 'flex';
    mobileLegalList.style.display = isExpanded ? 'none' : 'flex';
  });

  legalDocs.forEach((doc, index) => {
    const item = document.createElement('div');
    item.style.padding = '0.5rem 0';
    item.innerHTML = `<span style="color: var(--text-primary); font-size: 0.9rem; cursor: pointer;">${doc.title}</span>`;
    item.addEventListener('click', () => {
      window.openLegalViewer(index);
    });
    mobileLegalList.appendChild(item);
  });
}
