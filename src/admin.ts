import './style.css';

interface Registration {
  email: string;
  status: string;
  registeredAt: string;
  origen?: string;
}

const adminApp = document.querySelector<HTMLDivElement>('#admin-app');

if (adminApp) {
  adminApp.innerHTML = `
    <header class="admin-header">
      <div class="header-left">
        <div class="logo-container">
          <h1>Entity</h1>
          <span class="admin-badge">Admin</span>
        </div>
        <span class="slogan">Vista Interna de Waitlist (Solo Lectura)</span>
      </div>
      <nav class="visual-nav">
        <a href="/" class="nav-item">Volver a la Landing</a>
      </nav>
    </header>
    <main class="admin-main">
      <section class="region">
        <div class="join-container">
          <h2>Lista de Espera Anticipada</h2>
          <p class="join-subtitle">Registros persistidos en el sistema local.</p>
          
          <div class="join-box admin-box">
            <div id="admin-status-container"></div>
            <div id="waitlist-content">
              <p class="status-message">Cargando solicitudes de la beta...</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="footer">
      <div class="footer-bottom">
        <p>&copy; 2026 Entity Admin Dashboard. Todos los derechos reservados.</p>
      </div>
    </footer>
  `;

  const contentDiv = document.getElementById('waitlist-content');
  const statusContainer = document.getElementById('admin-status-container');

  const renderError = (message: string) => {
    if (contentDiv) {
      contentDiv.innerHTML = `
        <div class="status-message error" role="alert" style="display: block;">
          <strong>Error al cargar la waitlist:</strong> ${message}
        </div>
      `;
    }
  };

  const renderEmpty = () => {
    if (contentDiv) {
      contentDiv.innerHTML = `
        <p class="status-message info" style="text-align: center; color: var(--text-muted); font-size: 1.1rem; padding: 2rem 0;">
          No hay registros en la lista de espera actualmente.
        </p>
      `;
    }
  };

  const showUpdateError = (message: string) => {
    if (statusContainer) {
      statusContainer.innerHTML = `
        <div class="status-message error" role="alert" style="display: block; margin-bottom: 1rem;">
          <strong>Error al actualizar el estado:</strong> ${message}
        </div>
      `;
    }
  };

  const clearUpdateError = () => {
    if (statusContainer) {
      statusContainer.innerHTML = '';
    }
  };

  const renderTable = (registrations: Registration[]) => {
    if (contentDiv) {
      const rows = registrations
        .map(
          (r) => `
        <tr>
          <td><code class="email-code">${escapeHtml(r.email)}</code></td>
          <td>${formatDate(r.registeredAt)}</td>
          <td><span class="source-tag">${escapeHtml(r.origen || 'Landing Beta Form')}</span></td>
          <td>
            <select class="status-select status-badge ${r.status.toLowerCase()}" data-email="${escapeHtml(r.email)}">
              <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Approved" ${r.status === 'Approved' ? 'selected' : ''}>Approved</option>
              <option value="Rejected" ${r.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </td>
        </tr>
      `
        )
        .join('');

      contentDiv.innerHTML = `
        <div class="table-responsive">
          <table class="waitlist-table">
            <thead>
              <tr>
                <th>Correo Electrónico</th>
                <th>Fecha de Registro</th>
                <th>Origen</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;

      // Attach change listeners to select elements
      const selects = contentDiv.querySelectorAll<HTMLSelectElement>('.status-select');
      selects.forEach((select) => {
        select.addEventListener('change', async () => {
          const email = select.getAttribute('data-email');
          const newStatus = select.value;
          if (!email) return;

          select.disabled = true;
          clearUpdateError();

          try {
            const response = await fetch('/api/registrations/status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, status: newStatus })
            });

            const data = await response.json().catch(() => ({ error: 'Error inesperado del servidor.' }));

            if (!response.ok) {
              throw new Error(data.error || 'Error en respuesta HTTP.');
            }

            // Reload data to reflect state
            fetchAndRender();
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Error de conexión con el servidor.';
            showUpdateError(message);
            fetchAndRender();
          }
        });
      });
    }
  };

  // Helper functions
  const escapeHtml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const formatDate = (isoStr: string): string => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  // Encapuslate fetch logic so it can be called repeatedly
  const fetchAndRender = () => {
    fetch('/api/registrations')
      .then((response) => {
        if (!response.ok) {
          return response.json()
            .catch(() => ({ error: 'Fallo inesperado del servidor.' }))
            .then((err) => {
              throw new Error(err.error || 'Error en respuesta HTTP.');
            });
        }
        return response.json();
      })
      .then((data: Registration[]) => {
        if (!Array.isArray(data)) {
          renderError('El formato de datos devuelto es incorrecto.');
        } else if (data.length === 0) {
          renderEmpty();
        } else {
          renderTable(data);
        }
      })
      .catch((err) => {
        renderError(err.message || 'Error de conexión con el servidor.');
      });
  };

  // Initial fetch
  fetchAndRender();
}
