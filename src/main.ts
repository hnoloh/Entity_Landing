import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>Entity</h1>
    <button class="btn">Comenzar</button>
  </header>
  <main>
    <img src="/ghost_v2.png" alt="Entity Ghost" class="ghost-hero" />
  </main>
  <footer>
  </footer>
`;
