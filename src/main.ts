import "./style.css";
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
      <span class="slogan">Y si el código...<br />Ya no fuera el centro?</span>
    </div>
    <nav class="visual-nav">
      <a href="#producto" class="nav-item">Producto</a>
      <a href="#precios" class="nav-item">Precios</a>
      <div class="nav-item dropdown-container" tabindex="0">
        <span class="dropdown-trigger">Docs</span>
        <div class="dropdown-menu">
          <div class="dropdown-menu-inner">
            <a href="/docs/ENTITY_PRODUCT_BRIEF.pdf" target="_blank" class="dropdown-item">Product Brief</a>
          </div>
        </div>
      </div>
      <a href="#download-free" class="nav-item hero-btn" style="margin-left: 1rem;">Descargar</a>
    </nav>
    <button class="mobile-menu-btn" aria-label="Menú" aria-expanded="false">☰</button>
    <div class="mobile-menu-drawer">
      <nav class="mobile-nav">
        <a href="#producto" class="mobile-nav-item">Producto</a>
        <a href="#precios" class="mobile-nav-item">Precios</a>
        <div class="mobile-nav-item mobile-dropdown-container">
          <span class="mobile-dropdown-trigger">Docs</span>
          <div class="mobile-dropdown-menu">
            <a href="/docs/ENTITY_PRODUCT_BRIEF.pdf" target="_blank" class="mobile-dropdown-item">Product Brief</a>
          </div>
        </div>
        <a href="#download-free" class="mobile-nav-item hero-btn" style="margin-top: 1rem; width: 100%; justify-content: center;">Descargar</a>
      </nav>
    </div>
  </header>
  <main>
    <section id="hero" aria-labelledby="hero-headline">
      <div class="hero-content">
        <div class="hero-body-row">
          <div class="hero-left-col">
            <h1 id="hero-headline" class="hero-headline">Organiza el trabajo<br> con inteligencia artificial.</h1>
            <p class="hero-supporting">La IA necesita un Workspace. Entity es un entorno de escritorio donde los agentes especializados (Entis) pueden colaborar de manera conjunta y coordinada dentro de un grupo bajo tu control.</p>
            <div class="hero-cta" style="gap: 1rem; flex-wrap: wrap;">
              <a href="#download-free" class="join-cta" style="margin: 0;">Descargar Entity Free</a>
              <a href="#precios" class="hero-btn" style="margin: 0;">Ver Entity Pro</a>
            </div>
            <div style="margin-top: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); opacity: 0.85;">
              <span>✓ Free sin registro</span> <span style="margin: 0 0.5rem;">•</span> <span>✓ Local + Cloud BYOK</span>
            </div>
          </div>
          <div class="hero-visual">
            <img src="/hero-test-1.png" alt="Test Hero Image" class="hero-visual-img" />
          </div>
        </div>
        <div class="hero-trust-badges-inline">
          <div class="badge-item">
            <span class="badge-dot"></span>
            <span><strong>Híbrido</strong> (Local + Cloud)</span>
          </div>
          <div class="badge-item">
            <span class="badge-dot"></span>
            <span><strong>Agnóstico</strong> (Cualquier API)</span>
          </div>
          <div class="badge-item">
            <span class="badge-dot"></span>
            <span><strong>Privado</strong> (Modelos Offline)</span>
          </div>
        </div>
      </div>
    </section>
    <section id="narrativa" class="region reveal-element" aria-labelledby="narrativa-title">
      <div class="narrativa-header">
        <h2 id="narrativa-title">La IA necesita un Workspace.</h2>
        <p>Entity propone dejar atrás el caos de las conversaciones infinitas para estructurar tu flujo en un espacio organizado.</p>
      </div>
      <div class="narrativa-grid">
        <!-- Tarjeta Problema -->
        <div id="problema" class="narrativa-card">
          <h3>Trabajar con IA se ha vuelto caótico.</h3>
          <ul class="problema-bullets-mini">
            <li>Más modelos.</li>
            <li>Más chats.</li>
            <li>Más herramientas.</li>
            <li>Más desorden.</li>
          </ul>
          <p class="problema-conclusion-mini">
            La IA ha evolucionado. Nuestra forma de trabajar con ella todavía no.
          </p>
        </div>
        
        <!-- Tarjeta Visión -->
        <div id="vision" class="narrativa-card">
          <h3>La IA necesita un Workspace.</h3>
          <p class="vision-text-mini">
            Entity propone dejar atrás las conversaciones infinitas para trabajar dentro de un espacio organizado. Cada agente tiene un propósito específico, permitiéndote montar grupos o equipos de agentes, asegurando que cada decisión siga siempre en manos del usuario.
          </p>
        </div>
        
        <!-- Tarjeta Workspace -->
        <div id="intro-entity" class="narrativa-card">
          <h3>Un Ecosistema Avanzado.</h3>
          <ul class="problema-bullets-mini">
            <li><strong>Agentes:</strong> Entidades especializadas con propósito y contexto definido.</li>
            <li><strong>Herramientas:</strong> Capacidades de interacción con el entorno.</li>
            <li><strong>Conocimiento:</strong> Integración de documentos y fuentes de información.</li>
            <li><strong>Datos:</strong> Almacenamiento estructurado de la información.</li>
            <li><strong>Orquestación:</strong> Coordinación y control total del flujo de trabajo.</li>
          </ul>
        </div>
      </div>
    </section>
    <section id="producto" class="region reveal-element" aria-labelledby="producto-title">
      <h2 id="producto-title">Producto</h2>
      <div class="pf-selector" role="tablist" aria-label="Vistas del producto">
        <button class="pf-tab active" role="tab" aria-selected="true" data-target="agentes">Agentes</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="herramientas">Herramientas</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="conocimiento">Conocimiento</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="datos">Datos</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="orquestacion">Orquestación</button>
      </div>
      <p id="pf-description" style="color: var(--text-secondary); max-width: 600px; margin: 1.5rem auto 0; text-align: center; min-height: 3rem; font-size: 0.95rem;">
        Entis especializados con configuración a medida. Soporta modelos locales/cloud para trabajo individual.
      </p>
      <div class="producto-visual">
        <div class="product-frame" id="product-frame-container" tabindex="0" role="button" aria-label="Ampliar imagen">
          <img src="/v1_agentes.png" alt="Agentes de Entity" class="pf-capture" id="main-product-img" decoding="async" fetchpriority="high" />
        </div>
      </div>
    </section>
    <section id="precios" class="region reveal-element" aria-labelledby="precios-title">
      <div class="narrativa-header">
        <h2 id="precios-title">Precios</h2>
        <p>Un modelo transparente para usar Entity a tu manera.</p>
      </div>
      <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; max-width: 900px; width: 100%; margin-top: 2rem;">
        
        <!-- Tarjeta Free -->
        <div class="narrativa-card" style="flex: 1; min-width: 300px; border-color: var(--accent-color); box-shadow: 0 0 20px #00e5ff1a; display: flex; flex-direction: column;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-color);">Entity Free</h3>
          <div style="font-size: 2.5rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-primary);">0 €</div>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
            Sin registro y sin tarjeta. Descarga directa para empezar a organizar tu trabajo con IA.
          </p>
          <ul class="problema-bullets-mini" style="margin-bottom: 2rem; flex: 1;">
            <li><strong>Entis Ilimitados</strong></li>
            <li><strong>Grupos Secuenciales</strong></li>
            <li><strong>Chat Individual</strong></li>
            <li><strong>Ollama / Modelos locales & BYOK Cloud</strong></li>
            <li><strong>Persistencia completa</strong></li>
            <li><strong>Generación DOCX / PDF / HTML</strong></li>
          </ul>
          <a href="#download-free" class="join-cta hero-btn" style="width: 100%; justify-content: center; text-decoration: none;">Descargar Entity Free</a>
        </div>

        <!-- Tarjeta Pro -->
        <div class="narrativa-card" style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary);">Entity Pro</h3>
          
          <!-- Mensual / Anual Toggle -->
          <div class="pf-tabs billing-toggle" role="tablist" aria-label="Selección de cadencia" style="justify-content: center; margin-bottom: 1rem; width: fit-content; align-self: flex-start;">
            <button class="pf-tab active" role="tab" aria-selected="true" data-billing="monthly">Mensual</button>
            <button class="pf-tab" role="tab" aria-selected="false" data-billing="annual">Anual</button>
          </div>
          
          <div id="price-monthly" style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--text-primary); display: flex; flex-direction: column; gap: 0.2rem;">
            <div><strong>8.99 €</strong> <span style="font-size: 0.9rem; color: var(--text-secondary);">/ mes</span></div>
          </div>
          <div id="price-annual" style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--text-primary); display: none; flex-direction: column; gap: 0.2rem;">
            <div><strong>89 €</strong> <span style="font-size: 0.9rem; color: var(--text-secondary);">/ año</span></div>
          </div>
          
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
            Capacidades avanzadas para workflows complejos y automatización de alto nivel.
          </p>
          <ul class="problema-bullets-mini" style="margin-bottom: 2rem; flex: 1;">
            <li><strong>Todo lo incluido en Free</strong></li>
            <li><strong>Grupos Loop</strong></li>
            <li><strong>Grupos No Secuenciales</strong></li>
            <li><strong>Terminal / Filesystem avanzado</strong></li>
            <li><strong>Máximo 2 dispositivos simultáneos</strong></li>
            <li><strong>Offline:</strong> Funciona sin red hasta 30 días seguidos</li>
          </ul>
          <a href="https://entity.lemonsqueezy.com/checkout/buy/6d4157a1-2d33-4db0-95f0-5d8689b6931a?enabled=2031256%2C2034570" id="checkout-pro" class="join-cta hero-btn" target="_blank" rel="noopener noreferrer" style="width: 100%; justify-content: center; text-decoration: none;">Obtener Entity Pro</a>
        </div>

      </div>
      
      <div style="margin-top: 4rem; width: 100%; max-width: 900px; margin-left: auto; margin-right: auto; overflow-x: auto;">
        <h3 style="text-align: center; margin-bottom: 2rem; color: var(--text-primary);">Comparativa detallada</h3>
        <table class="comparativa-table" style="width: 100%; border-collapse: collapse;" id="comparativa-matrix">
          <thead>
            <tr>
              <th style="text-align: left; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">Capacidad</th>
              <th style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-primary);">Entity Free</th>
              <th style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--accent-color);">Entity Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Entis</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Ilimitados</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Ilimitados</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Grupos secuenciales</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Sí</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sí</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Grupos Loop</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--text-secondary);">No</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sí</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Grupos No Secuenciales</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--text-secondary);">No</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sí</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Chat individual</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Completo</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Completo</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Ollama / modelos locales</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Sí</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sí</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">BYOK cloud</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Sí</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sí</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Persistencia</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Completa</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Completa</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Generación DOCX / PDF / HTML</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Completa</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Completa</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Terminal / filesystem avanzado</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--text-secondary);">No</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sí</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Integrantes por Grupo</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Sin límite comercial</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sin límite comercial</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Workflows / presets avanzados futuros</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--text-secondary);">No, salvo decisión expresa posterior</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Sí cuando formen parte del producto</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Nuevas capacidades power-user</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--text-secondary);">Sólo las declaradas Free</td>
              <td style="text-align: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--accent-color);">Las declaradas Pro</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CÓMO FUNCIONA PRO (FIA-W01.10) -->
    <section id="como-funciona-pro" class="region reveal-element" aria-labelledby="como-funciona-pro-title">
      <div class="narrativa-header">
        <h2 id="como-funciona-pro-title">Cómo funciona Pro</h2>
        <p>Un proceso local-first. Pásate a Pro sin cuentas en la nube ni migraciones.</p>
      </div>
      <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; max-width: 1000px; width: 100%; margin-top: 2rem; margin-left: auto; margin-right: auto;">
        
        <!-- Step 1 -->
        <div class="narrativa-card" style="flex: 1; min-width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div style="font-size: 2.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 1rem; opacity: 0.8;">1</div>
          <h4 style="margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.2rem;">Download</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            Descarga Entity Free. Es la <strong>misma app</strong>, sin ejecutables ni builds separados.
          </p>
        </div>
        
        <!-- Step 2 -->
        <div class="narrativa-card" style="flex: 1; min-width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div style="font-size: 2.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 1rem; opacity: 0.8;">2</div>
          <h4 style="margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.2rem;">Buy</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            Adquiere tu suscripción comercial <strong>sin crear cuenta Entity</strong>.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="narrativa-card" style="flex: 1; min-width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div style="font-size: 2.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 1rem; opacity: 0.8;">3</div>
          <h4 style="margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.2rem;">License key</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            Recibe tu clave por email de forma segura. <strong>Sin migración del workspace</strong>.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="narrativa-card" style="flex: 1; min-width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div style="font-size: 2.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 1rem; opacity: 0.8;">4</div>
          <h4 style="margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.2rem;">Activate Pro</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            Introduce la clave en la app y desbloquea el nivel avanzado <strong>sin reinstalación</strong>.
          </p>
        </div>

      </div>
    </section>

    <!-- CONTROL / LOCAL-FIRST (FIA-W01.11) -->
    <section id="control-local-first" class="region reveal-element" aria-labelledby="control-title">
      <div class="narrativa-header">
        <h2 id="control-title">Control total sobre tus datos</h2>
        <p>El tratamiento depende del camino que elijas. Entity funciona <strong>sin cuenta Entity</strong>.</p>
      </div>
      <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; max-width: 1000px; width: 100%; margin-top: 2rem; margin-left: auto; margin-right: auto;">
        
        <!-- Local Path -->
        <div class="narrativa-card" style="flex: 1; min-width: 300px;">
          <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Camino Local</h3>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Soporte nativo para <strong>modelos locales</strong>. Si optas por emplear motores ejecutados en tu propio hardware, el procesamiento ocurre en tu máquina.
          </p>
          <ul class="problema-bullets-mini">
            <li>Ejecución contenida en tu dispositivo</li>
            <li>Tú decides qué entra y qué sale</li>
          </ul>
        </div>

        <!-- Cloud BYOK Path -->
        <div class="narrativa-card" style="flex: 1; min-width: 300px;">
          <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Camino Cloud (BYOK)</h3>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Soporte para integraciones en la nube mediante <strong>BYOK (Bring Your Own Key)</strong>. Al utilizar APIs externas, el procesamiento involucra al proveedor seleccionado.
          </p>
          <ul class="problema-bullets-mini">
            <li>Gestión y rotación de tus propias claves</li>
            <li>Sujeto exclusivamente a las políticas de tu proveedor</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- CASOS DE USO (FIA-W01.12) -->
    <section id="casos-uso" class="region reveal-element" aria-labelledby="casos-title">
      <div class="narrativa-header">
        <h2 id="casos-title">Casos de uso</h2>
        <p>Escalabilidad adaptable a cualquier necesidad funcional.</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1000px; margin: 2rem auto 0; padding: 0 1rem;">
        
        <!-- 1. Desarrollo y producto -->
        <div class="narrativa-card">
          <h4 style="color: var(--accent-color); margin-bottom: 0.5rem; font-size: 1.2rem;">Desarrollo y producto</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
            Emplea <strong>Grupos secuenciales</strong> para flujos de revisión de código, o asigna un Enti al <strong>Terminal / filesystem avanzado</strong> para operar sobre tu base de código y gestionar refactorizaciones locales.
          </p>
        </div>

        <!-- 2. Investigación y conocimiento -->
        <div class="narrativa-card">
          <h4 style="color: var(--accent-color); margin-bottom: 0.5rem; font-size: 1.2rem;">Investigación y conocimiento</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
            Combina <strong>BYOK y modelos locales</strong> para debatir ideas en <strong>Chat individual</strong>, y conserva tus hallazgos organizados de forma indefinida gracias a la <strong>Persistencia completa</strong>.
          </p>
        </div>

        <!-- 3. Operaciones y empresa -->
        <div class="narrativa-card">
          <h4 style="color: var(--accent-color); margin-bottom: 0.5rem; font-size: 1.2rem;">Operaciones y empresa</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
            Configura <strong>Grupos No Secuenciales</strong> donde diferentes perfiles procesan la información en paralelo, consolidando las salidas con la <strong>Generación DOCX / PDF / HTML</strong> nativa.
          </p>
        </div>

        <!-- 4. Creación y workflows complejos -->
        <div class="narrativa-card">
          <h4 style="color: var(--accent-color); margin-bottom: 0.5rem; font-size: 1.2rem;">Creación y workflows complejos</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
            Diseña topologías en <strong>Grupos Loop</strong> para procesos iterativos (como revisión de contenidos), donde los Entis corrigen y refinan sus propias salidas cíclicamente.
          </p>
        </div>

      </div>
    </section>

    <section id="faq" class="region reveal-element" aria-labelledby="faq-title">
      <div class="narrativa-header">
        <h2 id="faq-title">Preguntas Frecuentes</h2>
        <p>Resolvemos tus dudas sobre Entity.</p>
      </div>
      <div class="faq-container" style="max-width: 800px; margin: 2rem auto; display: flex; flex-direction: column; gap: 1rem;">
        
        <details class="faq-item">
          <summary>¿Entity Free requiere una cuenta?</summary>
          <div class="faq-content">No. Entity Free se puede utilizar sin registro y sin crear una cuenta.</div>
        </details>

        <details class="faq-item">
          <summary>¿Free es una prueba temporal?</summary>
          <div class="faq-content">No, Entity Free no es una prueba temporal (trial). Es una versión gratuita de uso indefinido.</div>
        </details>

        <details class="faq-item">
          <summary>¿Necesito pagar una API?</summary>
          <div class="faq-content">Si utilizas modelos locales (ej. Ollama), no necesitas pagar APIs. Si optas por modelos en la nube (BYOK), el coste dependerá de las tarifas de tu proveedor, no garantizamos APIs gratuitas.</div>
        </details>

        <details class="faq-item">
          <summary>¿Puedo utilizar modelos locales/Ollama?</summary>
          <div class="faq-content">Sí, Entity ofrece soporte nativo para modelos locales mediante Ollama, según las capacidades aprobadas.</div>
        </details>

        <details class="faq-item">
          <summary>¿Qué incluye Entity Pro?</summary>
          <div class="faq-content">Entity Pro incluye todo lo de Free, más Grupos Loop, Grupos No Secuenciales, y soporte de Terminal / Filesystem avanzado.</div>
        </details>

        <details class="faq-item">
          <summary>¿Tengo que descargar otra aplicación para Pro?</summary>
          <div class="faq-content">No. Entity Free y Pro son exactamente la misma aplicación. No hay ejecutables separados.</div>
        </details>

        <details class="faq-item">
          <summary>¿Cómo activo Pro?</summary>
          <div class="faq-content">Al adquirir Pro, recibes una License Key por correo. Solo tienes que introducirla en la aplicación para activar las capacidades Pro.</div>
        </details>

        <details class="faq-item">
          <summary>¿En cuántos ordenadores puedo utilizar Pro?</summary>
          <div class="faq-content">Puedes utilizar tu suscripción Pro en un máximo de 2 dispositivos simultáneos.</div>
        </details>

        <details class="faq-item">
          <summary>¿Pro funciona sin Internet?</summary>
          <div class="faq-content">Sí, Entity Pro funciona offline hasta 30 días seguidos antes de requerir conexión para validar la suscripción.</div>
        </details>

        <details class="faq-item">
          <summary>¿Qué ocurre si cancelo Pro?</summary>
          <div class="faq-content">Puedes gestionar tu cancelación a través del Customer Portal externo (Lemon Squeezy). Al cancelar y finalizar el periodo facturado, la aplicación volverá al nivel Free.</div>
        </details>

        <details class="faq-item">
          <summary>¿Pierdo mis datos si vuelvo a Free?</summary>
          <div class="faq-content">Los datos creados permanecerán en tu dispositivo, pero las configuraciones que utilicen capacidades exclusivas de Pro no podrán ejecutarse.</div>
        </details>

        <details class="faq-item">
          <summary>¿Dónde se guardan/procesan mis datos?</summary>
          <div class="faq-content">El almacenamiento principal de tus datos se realiza localmente. El procesamiento de información dependerá de si eliges ejecutar modelos locales o si envías datos a través de APIs de proveedores en la nube.</div>
        </details>

      </div>
    </section>

    <section id="download-free" class="region reveal-element" aria-labelledby="download-title">
      <div class="narrativa-header">
        <h2 id="download-title">Descarga Entity ahora</h2>
        <p>Comienza a utilizar el núcleo local-first de Entity de inmediato. <strong>Sin email. Sin cuenta. Sin tarjeta.</strong></p>
      </div>
      <div class="download-container" style="max-width: 600px; margin: 2rem auto; text-align: center; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 12px;">
        <h3 style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--text-secondary);">Plataformas soportadas</h3>
        <div class="pf-tabs download-os-tabs" role="tablist" aria-label="Selección de plataforma" style="justify-content: center; margin-bottom: 2rem;">
          <button class="pf-tab active" role="tab" aria-selected="true" data-platform="windows">Windows</button>
          <button class="pf-tab" role="tab" aria-selected="false" data-platform="linux">Linux</button>
        </div>
        <div style="display: flex; justify-content: center;">
          <a id="download-cta" href="https://github.com/hnoloh/Entity-Downloads/releases/download/v1.0.0/Entity_1.0.0_x64-setup.exe" target="_blank" rel="noopener noreferrer" class="join-cta hero-btn" style="text-decoration: none; padding: 1rem 3rem; font-size: 1.2rem; justify-content: center; width: 100%;">Descargar Entity Free</a>
        </div>
        <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary); opacity: 0.8;">
          <p id="download-desc">Descarga directa desde las releases oficiales en GitHub.<br/><span style="font-size: 0.75rem; opacity: 0.6; display: block; margin-top: 0.5rem; font-family: monospace;">sha256:765192c676498df622a81ce29900f63671c7c6d0ee0cbebea51fb81416f6643d | 5.89 MB</span></p>
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
  </main>
  <footer class="footer reveal-element" style="padding: 4rem 2rem 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
    <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto 3rem; text-align: left;">
      <div class="footer-col">
        <h4 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1.1rem;">Producto</h4>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <a href="#producto" class="footer-link">Características</a>
          <a href="#precios" class="footer-link">Precios</a>
          <a href="#faq" class="footer-link">FAQ</a>
          <a href="https://entity.lemonsqueezy.com/billing" class="footer-link" target="_blank" rel="noopener noreferrer">Gestionar suscripción</a>
        </div>
      </div>
      <div class="footer-col">
        <h4 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1.1rem;">Recursos</h4>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <a href="/docs/METODO%20Entity.pdf" target="_blank" class="footer-link">Método Entity</a>
          <a href="https://github.com/hnoloh/Entity" target="_blank" class="footer-link">GitHub</a>
        </div>
      </div>
      <div class="footer-col">
        <h4 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1.1rem;">Legal</h4>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <a href="/docs/entity-privacy-policy-3.pdf" target="_blank" class="footer-link">Privacidad</a>
          <a href="/docs/entity-terms-of-use-3.pdf" target="_blank" class="footer-link">Términos</a>
          <a href="/docs/entity-eula-2.pdf" target="_blank" class="footer-link">EULA</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; display: flex; justify-content: center; align-items: center;">
      <p style="color: var(--text-secondary); font-size: 0.9rem;">&copy; 2026 Entity. Todos los derechos reservados.</p>
    </div>
  </footer>
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

const viewAssets: Record<string, { src: string; alt: string; desc: string }> = {
  agentes: {
    src: "/v1_agentes.png",
    alt: "Agentes de Entity",
    desc: "Entis especializados con configuración a medida. Soporta modelos locales/cloud para trabajo individual.",
  },
  herramientas: {
    src: "/v1_herramientas.png",
    alt: "Herramientas de Entity",
    desc: "Tool Belt integrado para potenciar a los Entis, permitiéndoles interactuar y actuar sobre su entorno.",
  },
  conocimiento: {
    src: "/v1_workspace.png",
    alt: "Conocimiento estructural",
    desc: "",
  },
  datos: {
    src: "/v1_workspace.png",
    alt: "Datos estructural",
    desc: "",
  },
  orquestacion: {
    src: "/v1_orquestacion.png",
    alt: "Orquestación de Entis",
    desc: "Grupos secuenciales. Estructura logística que ordena la participación de Entis especializados bajo control humano.",
  },
};

// Preload assets for instant switching without lag (FIA-035 optimization)
Object.values(viewAssets).forEach((asset) => {
  const img = new Image();
  img.src = asset.src;
});

const pfDesc = document.getElementById("pf-description");

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

      if (pfDesc) {
        pfDesc.textContent = viewAssets[target].desc;
      }

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

  const openLightbox = () => {
    if (mainImg) {
      lightboxImg.src = mainImg.src;
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
