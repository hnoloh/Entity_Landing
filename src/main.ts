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
    <section id="hero" class="region">
      <div class="hero-content">
        <h2 class="hero-headline">Organiza el trabajo con inteligencia artificial.</h2>
        <p class="hero-supporting">Entity es un Workspace de escritorio donde agentes especializados colaboran bajo tu control. Estamos preparando nuestra primera beta privada y buscamos a los primeros usuarios.</p>
        <button class="hero-cta btn">Call to Action</button>
      </div>
      <div class="hero-visual">
        <p>Visual Zone Placeholder</p>
      </div>
    </section>
    <section id="problema" class="region">
      <h2>Problema</h2>
      <div class="problema-content">
        <h3>Trabajar con IA se ha vuelto caótico.</h3>
        <ul class="problema-bullets">
          <li>Más modelos.</li>
          <li>Más chats.</li>
          <li>Más herramientas.</li>
          <li>Más desorden.</li>
        </ul>
        <p class="problema-conclusion">
          La IA ha evolucionado.<br />
          Nuestra forma de trabajar con ella todavía no.
        </p>
      </div>
    </section>
    <section id="vision" class="region">
      <h2>Visión</h2>
      <div class="vision-card">
        <h3>La IA necesita un Workspace.</h3>
        <p class="vision-text">
          Entity propone dejar atrás las conversaciones infinitas para trabajar dentro de un espacio organizado donde cada agente tiene un propósito y cada decisión sigue estando en manos del usuario.
        </p>
      </div>
    </section>
    <section id="intro-entity" class="region">
      <h2>Workspace</h2>
      <div class="intro-card">
        <h3>Todo ocurre en un único lugar.</h3>
        <p class="intro-text">
          Configuración, conversaciones, Entis, Sequential Groups e historial dentro de un mismo Workspace.
        </p>
      </div>
    </section>
    <section id="producto" class="region">
      <h2>Producto</h2>
      <p>Placeholder content for the product features and capabilities.</p>
      <div class="producto-visual">
        <p>Product Area Placeholder</p>
      </div>
    </section>
    <section id="join" class="region">
      <h2>Join the Beta</h2>
      <p>Sé uno de los primeros en experimentar el poder de Entity. Únete a nuestra lista de espera.</p>
      <button class="join-cta">Solicitar acceso</button>
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
