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
    <section id="producto" class="region">
      <h2>Producto</h2>
      <p>Placeholder content</p>
    </section>
    <section id="join" class="region">
      <h2>Join the Beta</h2>
      <p>Placeholder content</p>
    </section>
    <section id="cta" class="region">
      <h2>CTA Final</h2>
      <p>Placeholder content</p>
    </section>
  </main>
  <footer>
  </footer>
`;
