import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>Entity</h1>
  </header>
  <main>
    <div class="container diagnostic-view">
      <div class="section">
        <h2>System Diagnostics</h2>
        <p>Status: MVP Bootstrap</p>
      </div>
      <div class="section">
        <button class="btn">Diagnostic Button</button>
      </div>
    </div>
  </main>
  <footer>
  </footer>
`;
