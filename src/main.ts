import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>Entity</h1>
    <button class="btn">Comenzar</button>
  </header>
  <main>
    <section id="hero" class="region">
      <img src="/ghost_v2.png" alt="Entity Ghost" class="ghost-hero" />
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
