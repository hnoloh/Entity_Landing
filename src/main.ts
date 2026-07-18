import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <div class="header-left">
      <div class="logo-container">
        <h1>Entity</h1>
        <img src="/ghost_v2.png" alt="Entity Ghost" class="ghost-hero" />
      </div>
      <button class="btn">Inscríbete a la beta aquí</button>
    </div>
    <nav class="visual-nav">
      <span class="nav-item">Inicio</span>
      <span class="nav-item">Producto</span>
      <span class="nav-item">Beta</span>
      <span class="nav-item">GitHub</span>
    </nav>
  </header>
  <main>
    <section id="hero" class="region">
      <div class="hero-content">
        <h2 class="hero-headline">Headline Placeholder</h2>
        <p class="hero-supporting">Supporting copy placeholder for the hero section.</p>
        <button class="hero-cta btn">Call to Action</button>
      </div>
      <div class="hero-visual">
        <p>Visual Zone Placeholder</p>
      </div>
    </section>
    <section id="problema" class="region">
      <h2>Problema</h2>
      <p>Placeholder content</p>
    </section>
    <section id="vision" class="region">
      <h2>Visión</h2>
      <p>Placeholder content</p>
    </section>
    <section id="intro-entity" class="region">
      <h2>Introducción de Entity</h2>
      <p>Placeholder content</p>
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
    <section id="cta" class="region">
      <h2>¿Listo para el futuro?</h2>
      <p>Únete a la revolución y comienza a construir con Entity hoy mismo.</p>
      <button class="final-cta btn">Inscríbete ahora</button>
    </section>
  </main>
  <footer>
  </footer>
`;
