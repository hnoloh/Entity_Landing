import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <button class="btn">Comenzar</button>
    <h1>Entity</h1>
  </header>
  <main>
    <img src="/ghost_v2.png" alt="Entity Ghost" class="ghost-hero" />
  </main>
  <footer>
  </footer>
`;
