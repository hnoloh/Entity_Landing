import './style.css';

interface Registration {
  email: string;
  status: string;
  registeredAt: string;
  origen?: string;
  confirmationEmailSent?: boolean;
  confirmationEmailSentAt?: string;
  confirmationEmailStatus?: 'pending' | 'sent' | 'error';
  confirmationEmailError?: string;
  invitationSent?: boolean;
  invitationSentAt?: string;
  invitationEmailStatus?: 'pending' | 'sent' | 'error';
  invitationEmailError?: string;
  unsubscribed?: boolean;
  unsubscribedAt?: string;
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
      <section class="region" id="metrics-region" style="margin-bottom: 3rem;">
        <div class="join-container">
          <h2>Métricas de Comunicación</h2>
          <p class="join-subtitle">Resumen agregado de los envíos, invitaciones y bajas.</p>
          <div class="join-box admin-box" id="metrics-content">
            <p class="status-message">Calculando métricas...</p>
          </div>
        </div>
      </section>
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
      <section class="region" id="email-preview-region" style="margin-top: 3rem;">
        <div class="join-container">
          <h2>Vista Previa del Email de Confirmación</h2>
          <p class="join-subtitle">Previsualización del correo electrónico que recibirán los usuarios aceptados.</p>
          
          <div class="join-box admin-box email-preview-box">
            <div class="email-preview-header" style="display: flex; flex-direction: column; gap: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; margin-bottom: 1rem;">
              <div class="email-field"><strong>Asunto:</strong> <span id="preview-subject" style="color: var(--accent-cyan, #00e5ff);">¡Te damos la bienvenida a la Beta Privada de Entity!</span></div>
              <div class="email-field"><strong>Preheader:</strong> <span id="preview-preheader" style="color: var(--text-secondary);">Tu acceso exclusivo al Workspace inteligente de Entity está listo.</span></div>
            </div>
            <div class="email-preview-body-container" style="background: rgba(0, 0, 0, 0.2); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); color: var(--text-primary);">
              <div class="email-preview-body" id="preview-body" style="line-height: 1.6;">
                <p>Hola,</p>
                <p>Nos alegra informarte que tu solicitud para acceder a la beta privada de <strong>Entity</strong> ha sido aceptada.</p>
                <p>Entity es tu nuevo Workspace de escritorio inteligente donde tus agentes colaboran bajo tu control absoluto.</p>
              </div>
              <div class="email-preview-cta" style="margin: 1.5rem 0; text-align: center;">
                <a href="#download" class="status-badge approved" style="text-decoration: none; padding: 0.6rem 1.2rem; font-size: 0.9rem; border-radius: 4px; text-transform: none; display: inline-block;" id="preview-cta">Descargar Entity para Escritorio</a>
              </div>
              <div class="email-preview-footer" id="preview-footer" style="font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; margin-top: 1.5rem;">
                Este correo fue enviado de manera automática como confirmación de tu registro en la waitlist privada de Entity. © 2026 Entity. Todos los derechos reservados.<br><br>Para darte de baja de nuestras comunicaciones, visita: /unsubscribe.html?email=[email]
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="region" id="invitation-preview-region" style="margin-top: 3rem;">
        <div class="join-container">
          <h2>Vista Previa del Email de Invitación</h2>
          <p class="join-subtitle">Previsualización del correo electrónico para invitar a los usuarios registrados a probar la beta.</p>
          
          <div class="join-box admin-box email-preview-box">
            <div class="email-preview-header" style="display: flex; flex-direction: column; gap: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; margin-bottom: 1rem;">
              <div class="email-field"><strong>Asunto:</strong> <span id="invitation-subject" style="color: var(--accent-cyan, #00e5ff);">¡Has sido invitado a la Beta Privada de Entity!</span></div>
              <div class="email-field"><strong>Preheader:</strong> <span id="invitation-preheader" style="color: var(--text-secondary);">Tu invitación exclusiva para unirte al Workspace inteligente de Entity ya está aquí.</span></div>
            </div>
            <div class="email-preview-body-container" style="background: rgba(0, 0, 0, 0.2); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); color: var(--text-primary);">
              <div class="email-preview-body" id="invitation-body" style="line-height: 1.6;">
                <p>Hola,</p>
                <p>Te escribimos porque te registraste en nuestra lista de espera. Nos complace invitarte a probar de forma prioritaria la beta privada de <strong>Entity</strong>.</p>
                <p>Usa tu enlace de acceso exclusivo para descargar la aplicación y comenzar a colaborar con tus agentes.</p>
              </div>
              <div class="email-preview-cta" style="margin: 1.5rem 0; text-align: center;">
                <a href="#invite" class="status-badge approved" style="text-decoration: none; padding: 0.6rem 1.2rem; font-size: 0.9rem; border-radius: 4px; text-transform: none; display: inline-block;" id="invitation-cta">Aceptar Invitación a la Beta</a>
              </div>
              <div class="email-preview-footer" id="invitation-footer" style="font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; margin-top: 1.5rem;">
                Este correo fue enviado de manera automática como invitación exclusiva para probar la beta privada de Entity. © 2026 Entity. Todos los derechos reservados.<br><br>Para darte de baja de nuestras comunicaciones, visita: /unsubscribe.html?email=[email]
              </div>
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

  const renderMetrics = (registrations: Registration[]) => {
    const metricsContent = document.getElementById('metrics-content');
    if (!metricsContent) return;

    let confirmSent = 0;
    let confirmError = 0;
    let confirmPending = 0;

    let inviteSent = 0;
    let inviteError = 0;
    let invitePending = 0;

    let unsubscribed = 0;

    registrations.forEach(r => {
      const cStatus = r.confirmationEmailStatus || (r.confirmationEmailSent ? 'sent' : 'pending');
      if (cStatus === 'sent') confirmSent++;
      else if (cStatus === 'error') confirmError++;
      else confirmPending++;

      const iStatus = r.invitationEmailStatus || (r.invitationSent ? 'sent' : 'pending');
      if (iStatus === 'sent') inviteSent++;
      else if (iStatus === 'error') inviteError++;
      else invitePending++;

      if (r.unsubscribed) unsubscribed++;
    });

    metricsContent.innerHTML = `
      <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; text-align: center;">
        <div class="metric-card" style="background: rgba(0, 0, 0, 0.2); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <h3 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Confirmaciones</h3>
          <p style="font-size: 2rem; font-weight: 700; color: var(--text-primary); margin: 0;" id="metric-confirm-sent">${confirmSent} <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">Enviadas</span></p>
          <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; font-size: 0.85rem;">
            <span style="color: var(--accent-orange);" id="metric-confirm-pending">${confirmPending} pdte.</span>
            <span style="color: #f44336;" id="metric-confirm-error">${confirmError} error</span>
          </div>
        </div>
        <div class="metric-card" style="background: rgba(0, 0, 0, 0.2); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <h3 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Invitaciones</h3>
          <p style="font-size: 2rem; font-weight: 700; color: var(--text-primary); margin: 0;" id="metric-invite-sent">${inviteSent} <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">Enviadas</span></p>
          <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; font-size: 0.85rem;">
            <span style="color: var(--accent-orange);" id="metric-invite-pending">${invitePending} pdte.</span>
            <span style="color: #f44336;" id="metric-invite-error">${inviteError} error</span>
          </div>
        </div>
        <div class="metric-card" style="background: rgba(0, 0, 0, 0.2); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <h3 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Bajas</h3>
          <p style="font-size: 2rem; font-weight: 700; color: #f44336; margin: 0;" id="metric-unsubscribed">${unsubscribed} <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">Usuarios</span></p>
          <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; font-size: 0.85rem;">
            <span style="color: var(--text-muted);">Desuscritos</span>
          </div>
        </div>
      </div>
    `;
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
          <td><code class="email-code">${escapeHtml(r.email)}</code>${(() => {
            const status = r.confirmationEmailStatus || (r.confirmationEmailSent ? 'sent' : 'pending');
            if (status === 'sent') {
              return ' <span class="status-badge approved email-sent-badge" style="margin-left: 0.5rem; font-size: 0.7rem; text-transform: none; padding: 0.1rem 0.3rem; vertical-align: middle;">Email Enviado</span>';
            } else if (status === 'error') {
              return ' <span class="status-badge rejected email-error-badge" style="margin-left: 0.5rem; font-size: 0.7rem; text-transform: none; padding: 0.1rem 0.3rem; vertical-align: middle;">Email Error</span>';
            } else {
              return ' <span class="status-badge pending email-pending-badge" style="margin-left: 0.5rem; font-size: 0.7rem; text-transform: none; padding: 0.1rem 0.3rem; vertical-align: middle;">Email Pendiente</span>';
            }
          })()}${(() => {
            const status = r.invitationEmailStatus || (r.invitationSent ? 'sent' : 'pending');
            if (status === 'sent') {
              return ' <span class="status-badge approved invitation-sent-badge" style="margin-left: 0.5rem; font-size: 0.7rem; text-transform: none; padding: 0.1rem 0.3rem; vertical-align: middle;">Invitación Enviada</span>';
            } else if (status === 'error') {
              return ' <span class="status-badge rejected invitation-error-badge" style="margin-left: 0.5rem; font-size: 0.7rem; text-transform: none; padding: 0.1rem 0.3rem; vertical-align: middle;">Invitación Error</span>';
            } else {
              return ' <span class="status-badge pending invitation-pending-badge" style="margin-left: 0.5rem; font-size: 0.7rem; text-transform: none; padding: 0.1rem 0.3rem; vertical-align: middle;">Invitación Pendiente</span>';
            }
          })()}</td>
          <td>${formatDate(r.registeredAt)}</td>
          <td><span class="source-tag">${escapeHtml(r.origen || 'Landing Beta Form')}</span></td>
          <td>
            <select class="status-select status-badge ${r.status.toLowerCase()}" data-email="${escapeHtml(r.email)}">
              <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Approved" ${r.status === 'Approved' ? 'selected' : ''}>Approved</option>
              <option value="Rejected" ${r.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
            ${r.unsubscribed
              ? '<span class="status-badge rejected unsubscribed-badge" style="margin-left: 0.5rem; font-size: 0.8rem; padding: 0.2rem 0.4rem; vertical-align: middle;">Baja</span>'
              : `<button class="invite-btn" data-email="${escapeHtml(r.email)}" style="margin-left: 0.5rem; font-size: 0.8rem; padding: 0.2rem 0.4rem; border-radius: 4px; background: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.2); color: var(--accent-cyan); cursor: pointer; transition: all 0.3s ease;">Enviar Invitación</button>`
            }
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

      // Attach click listeners to invite buttons
      const inviteBtns = contentDiv.querySelectorAll<HTMLButtonElement>('.invite-btn');
      inviteBtns.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const email = btn.getAttribute('data-email');
          if (!email) return;

          btn.disabled = true;
          clearUpdateError();

          try {
            const response = await fetch('/api/registrations/invite', {
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
        } else {
          renderMetrics(data);
          if (data.length === 0) {
            renderEmpty();
          } else {
            renderTable(data);
          }
        }
      })
      .catch((err) => {
        renderError(err.message || 'Error de conexión con el servidor.');
      });
  };

  // Initial fetch
  fetchAndRender();
}
