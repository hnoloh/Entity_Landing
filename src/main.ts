import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <div class="header-left">
      <div class="logo-container">
        <h1>Entity</h1>
        <img src="/ghost_v2.png" alt="Entity Ghost" class="ghost-hero" />
      </div>
      <span class="slogan">Y si el código...<br />Ya no fuera el centro?</span>
    </div>
    <nav class="visual-nav">
      <a href="#hero" class="nav-item">Inicio</a>
      <a href="#producto" class="nav-item">Producto</a>
      <a href="#join" class="nav-item">Beta</a>
      <a href="#github" class="nav-item">GitHub</a>
    </nav>
    <button class="mobile-menu-btn" aria-label="Menú" aria-expanded="false">☰</button>
    <div class="mobile-menu-drawer">
      <nav class="mobile-nav">
        <a href="#hero" class="mobile-nav-item">Inicio</a>
        <a href="#producto" class="mobile-nav-item">Producto</a>
        <a href="#join" class="mobile-nav-item">Beta</a>
        <a href="#github" class="mobile-nav-item">GitHub</a>
      </nav>
    </div>
  </header>
  <main>
    <section id="hero">
      <div class="hero-content">
        <h1 class="hero-headline">Organiza el trabajo<br> con inteligencia artificial.</h1>
        <div class="hero-body-row">
          <div class="hero-left-col">
            <p class="hero-supporting">Entity es un Workspace de escritorio donde los agentes especializados (Entis) pueden colaborar de manera conjunta y coordinada dentro de un grupo bajo tu control. Estamos preparando nuestra primera beta privada y buscamos a los primeros usuarios.</p>
            <div class="hero-cta">
              <a href="#join" class="hero-btn">Únete a la Beta</a>
            </div>
          </div>
          <div class="hero-visual">
            <p>Visual Zone Placeholder</p>
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
    <section id="narrativa" class="region">
      <div class="narrativa-header">
        <h2>La IA necesita un Workspace.</h2>
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
            Entity propone dejar atrás las conversaciones infinitas para trabajar dentro de un espacio organizado donde cada agente tiene un propósito y cada decisión sigue estando en manos del usuario.
          </p>
        </div>
        
        <!-- Tarjeta Workspace -->
        <div id="intro-entity" class="narrativa-card">
          <h3>Todo ocurre en un único lugar.</h3>
          <p class="intro-text-mini">
            Configuración, conversaciones, Entis, grupos secuenciales e historial dentro de un mismo Workspace.
          </p>
        </div>
      </div>
    </section>
    <section id="producto" class="region">
      <h2>Producto</h2>
      <div class="pf-selector" role="tablist">
        <button class="pf-tab active" role="tab" aria-selected="true" data-target="workspace">Workspace</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="entis">Entis</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="sequential">Grupos Secuenciales</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="chat">Chat Desacoplado</button>
      </div>
      <div class="producto-visual">
        <div class="product-frame">
          <img src="/FIA-31_Implementar vista workspace.png" alt="Vista Workspace de Entity" class="pf-capture" decoding="async" fetchpriority="high" />
        </div>
      </div>
    </section>
    <section id="join" class="region">
      <div class="join-container">
        <h2>Únete a la Beta</h2>
        <p class="join-subtitle">
          Entity se encuentra actualmente en fase de <strong>MVP y desarrollo activo</strong>. Estamos preparando nuestra primera <strong>beta privada</strong> con <strong>acceso anticipado</strong> limitado para dar forma al futuro del trabajo con inteligencia artificial.
        </p>
        <div class="join-box">
          <p class="join-description">
            Si deseas experimentar cómo los agentes especializados colaboran de manera conjunta y coordinada bajo tu control directo en un entorno de escritorio, solicita tu plaza en nuestra lista de espera.
          </p>
          <form id="beta-form" class="beta-form" onsubmit="event.preventDefault();" novalidate>
            <div class="form-group">
              <label for="beta-email" class="form-label">Correo Electrónico</label>
              <input type="email" id="beta-email" class="form-input" required placeholder="tu@email.com" aria-describedby="email-error" />
              <span id="email-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
            <button type="submit" class="join-cta btn">Solicitar acceso a la Beta</button>
          </form>
        </div>
      </div>
    </section>

  </main>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <h3>Entity</h3>
        <p>Y si el código ya no fuera el centro?</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Producto</h4>
          <span>Características</span>
          <span>Roadmap</span>
          <span>Precios</span>
        </div>
        <div class="footer-col">
          <h4>Comunidad</h4>
          <span>Discord</span>
          <span>GitHub</span>
          <span>Twitter</span>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <span>Privacidad</span>
          <span>Términos</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Entity. Todos los derechos reservados.</p>
    </div>
  </footer>
`;

const mobileMenuBtn = document.querySelector<HTMLButtonElement>('.mobile-menu-btn');
const headerEl = document.querySelector<HTMLElement>('header');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

// Toggle menu on button click
mobileMenuBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  mobileMenuBtn.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
  headerEl?.classList.toggle('mobile-menu-open');
});

// Close menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    headerEl?.classList.remove('mobile-menu-open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (headerEl?.classList.contains('mobile-menu-open') && !headerEl.contains(target)) {
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    headerEl.classList.remove('mobile-menu-open');
  }
});

// Demo Selector logic (FIA-034)
const pfTabs = document.querySelectorAll('.pf-tab');
const pfCaptureImg = document.querySelector<HTMLImageElement>('.pf-capture');

const viewAssets: Record<string, { src: string; alt: string }> = {
  workspace: {
    src: '/FIA-31_Implementar vista workspace.png',
    alt: 'Vista Workspace de Entity'
  },
  entis: {
    src: '/FIA-32_Implementar vista entis.png',
    alt: 'Vista Entis de Entity'
  },
  sequential: {
    src: '/FIA-33_Implementar vista secuencial grupos.png',
    alt: 'Vista de Sequential Groups de Entity'
  },
  chat: {
    src: '/Floating Chat.png',
    alt: 'Vista de Chat Desacoplado de Entity'
  }
};

// Preload assets for instant switching without lag (FIA-035 optimization)
Object.values(viewAssets).forEach(asset => {
  const img = new Image();
  img.src = asset.src;
});

pfTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-target') || 'workspace';
    
    // Update active tab styling
    pfTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    
    // Update image
    if (pfCaptureImg && viewAssets[target]) {
      pfCaptureImg.src = viewAssets[target].src;
      pfCaptureImg.alt = viewAssets[target].alt;
    }
  });
});

// Beta Form validation logic (FIA-042)
const betaForm = document.getElementById('beta-form');
const betaEmailInput = document.getElementById('beta-email') as HTMLInputElement | null;
const emailErrorSpan = document.getElementById('email-error');

if (betaForm && betaEmailInput && emailErrorSpan) {
  betaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const value = betaEmailInput.value.trim();
    if (!value) {
      betaEmailInput.classList.add('invalid');
      betaEmailInput.setAttribute('aria-invalid', 'true');
      emailErrorSpan.textContent = 'El correo electrónico es obligatorio.';
      emailErrorSpan.style.display = 'block';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      betaEmailInput.classList.add('invalid');
      betaEmailInput.setAttribute('aria-invalid', 'true');
      emailErrorSpan.textContent = 'El formato del correo electrónico no es válido.';
      emailErrorSpan.style.display = 'block';
    } else {
      betaEmailInput.classList.remove('invalid');
      betaEmailInput.removeAttribute('aria-invalid');
      emailErrorSpan.textContent = '';
      emailErrorSpan.style.display = 'none';
    }
  });

  const clearError = () => {
    betaEmailInput.classList.remove('invalid');
    betaEmailInput.removeAttribute('aria-invalid');
    emailErrorSpan.textContent = '';
    emailErrorSpan.style.display = 'none';
  };

  // Clear error on input
  betaEmailInput.addEventListener('input', clearError);

  // Clear error on focus (when user clicks back on the writing field)
  betaEmailInput.addEventListener('focus', clearError);

  // Clear error on click/mousedown (for click triggers even if already focused)
  betaEmailInput.addEventListener('click', clearError);
  betaEmailInput.addEventListener('mousedown', clearError);

  // Clear error when clicking anywhere else on the document
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (betaForm && !betaForm.contains(target)) {
      clearError();
    }
  });
}
