import './style.css';
import { getApiUrl } from './api/config';


const unsubscribeApp = document.querySelector<HTMLDivElement>('#unsubscribe-app');

if (unsubscribeApp) {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');

  unsubscribeApp.innerHTML = `
    <header class="header">
      <div class="logo-container">
        <h1>Entity</h1>
      </div>
    </header>
    <main class="main" style="min-height: 80vh; display: flex; align-items: center; justify-content: center;">
      <section class="region" style="width: 100%; padding-top: 0;">
        <div class="join-container" style="max-width: 500px; margin: 0 auto;">
          <h2>Baja de Comunicaciones</h2>
          <p class="join-subtitle">Gestión de preferencias de la Beta Privada de Entity.</p>
          
          <div class="join-box admin-box" id="unsubscribe-box" style="text-align: center; padding: 2.5rem 2rem;">
            ${email 
              ? `<p style="margin-bottom: 2rem; color: var(--text-secondary); font-size: 1.05rem;">¿Deseas dejar de recibir correos electrónicos en <strong style="color: var(--text-primary);">${escapeHtml(email)}</strong>?</p>
                 <button id="confirm-unsubscribe" class="hero-btn" style="width: 100%; border: none; cursor: pointer;">Confirmar Baja</button>
                 <div id="status-container" style="margin-top: 1.5rem;"></div>`
              : `<div class="status-message error" style="display: block;">No se ha proporcionado un correo válido en el enlace.</div>`
            }
          </div>
        </div>
      </section>
    </main>
    <footer class="footer">
      <div class="footer-bottom">
        <p>&copy; 2026 Entity. Todos los derechos reservados.</p>
      </div>
    </footer>
  `;

  if (email) {
    const confirmBtn = document.getElementById('confirm-unsubscribe') as HTMLButtonElement;
    const statusContainer = document.getElementById('status-container') as HTMLDivElement;

    confirmBtn?.addEventListener('click', async () => {
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Procesando...';
      statusContainer.innerHTML = '';

      try {
        const response = await fetch(getApiUrl('/api/registrations/unsubscribe'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json().catch(() => ({ error: 'Error inesperado del servidor.' }));

        if (!response.ok) {
          throw new Error(data.error || 'Error en respuesta HTTP.');
        }

        statusContainer.innerHTML = `
          <div class="status-message success" style="display: block;">
            <strong>${data.message || 'Te has dado de baja con éxito.'}</strong>
          </div>
        `;
        confirmBtn.style.display = 'none';
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error de conexión con el servidor.';
        statusContainer.innerHTML = `
          <div class="status-message error" style="display: block;">
            <strong>Error:</strong> ${message}
          </div>
        `;
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Reintentar Baja';
      }
    });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
