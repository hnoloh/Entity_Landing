import './style.css';
import * as Sentry from '@sentry/browser';

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: import.meta.env.VITE_APP_RELEASE || 'unknown',
    environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
    sendDefaultPii: false,
  });
  Sentry.captureMessage("Sentry initialization verified post-release");
}


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <div class="header-left">
      <div class="logo-container">
        <h1>Entity</h1>
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
    <section id="hero" aria-labelledby="hero-headline">
      <div class="hero-content">
        <div class="hero-body-row">
          <div class="hero-left-col">
            <h1 id="hero-headline" class="hero-headline">Organiza el trabajo<br> con inteligencia artificial.</h1>
            <p class="hero-supporting">Entity es un Workspace de escritorio donde los agentes especializados (Entis) pueden colaborar de manera conjunta y coordinada dentro de un grupo bajo tu control. Estamos preparando nuestra primera beta privada y buscamos a los primeros usuarios.</p>
          </div>
          <div class="hero-visual">
            <img src="/hero-test-1.png" alt="Test Hero Image" class="hero-visual-img" />
          </div>
        </div>
        <div class="hero-trust-badges-inline">
          <div class="badge-item">
            <span class="badge-dot"></span>
            <span><strong>Híbrido</strong> (Local + Cloud)</span>
          </div>
          <div class="badge-item">
            <span class="badge-dot"></span>
            <span><strong>Agnóstico</strong> (Cualquier API)</span>
          </div>
          <div class="badge-item">
            <span class="badge-dot"></span>
            <span><strong>Privado</strong> (Modelos Offline)</span>
          </div>
        </div>
      </div>
    </section>
    <section id="narrativa" class="region reveal-element" aria-labelledby="narrativa-title">
      <div class="narrativa-header">
        <h2 id="narrativa-title">La IA necesita un Workspace.</h2>
        <p>Entity propone dejar atrás el caos de las conversaciones infinitas para estructurar tu flujo en un espacio organizado.</p>
      </div>
      <div class="narrativa-grid">
        <!-- Tarjeta Problema -->
        <div id="problema" class="narrativa-card">
          <h3>Trabajar con IA se ha vuelto caótico.</h3>
          <ul class="problema-bullets-mini">
            <li>Más modelos.</li>
            <li>Más chats.</li>
            <li>Más herramientas.</li>
            <li>Más desorden.</li>
          </ul>
          <p class="problema-conclusion-mini">
            La IA ha evolucionado. Nuestra forma de trabajar con ella todavía no.
          </p>
        </div>
        
        <!-- Tarjeta Visión -->
        <div id="vision" class="narrativa-card">
          <h3>La IA necesita un Workspace.</h3>
          <p class="vision-text-mini">
            Entity propone dejar atrás las conversaciones infinitas para trabajar dentro de un espacio organizado. Cada agente tiene un propósito específico, permitiéndote montar grupos o equipos de agentes, asegurando que cada decisión siga siempre en manos del usuario.
          </p>
        </div>
        
        <!-- Tarjeta Workspace -->
        <div id="intro-entity" class="narrativa-card">
          <h3>Todo ocurre en un único lugar.</h3>
          <p class="intro-text-mini">
            Configuración, conversaciones, Entis, grupos secuenciales e historial dentro de un mismo Workspace.
          </p>
        </div>
      </div>
    </section>
    <section id="producto" class="region reveal-element" aria-labelledby="producto-title">
      <h2 id="producto-title">Producto</h2>
      <div class="pf-selector" role="tablist" aria-label="Vistas del producto">
        <button class="pf-tab active" role="tab" aria-selected="true" data-target="workspace">Workspace</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="entis">Entis</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="sequential">Grupos Secuenciales</button>
        <button class="pf-tab" role="tab" aria-selected="false" data-target="chat">Chat Desacoplado</button>
      </div>
      <div class="producto-visual">
        <div class="product-frame" id="product-frame-container" tabindex="0" role="button" aria-label="Ampliar imagen">
          <img src="/FIA-31_Implementar vista workspace.png" alt="Vista Workspace de Entity" class="pf-capture" id="main-product-img" decoding="async" fetchpriority="high" />
        </div>
      </div>
    </section>
    <section id="join" class="region reveal-element" aria-labelledby="join-title">
      <div class="join-container">
        <h2 id="join-title">Únete a la Beta</h2>
        <p class="join-subtitle">
          Entity se encuentra actualmente en fase de <strong>MVP y desarrollo activo</strong>. Estamos preparando nuestra primera <strong>beta privada</strong> con <strong>acceso anticipado</strong> limitado para dar forma al futuro del trabajo con inteligencia artificial.
        </p>
        <div class="join-box">
          <p class="join-description">
            Si deseas experimentar cómo los agentes especializados colaboran de manera conjunta y coordinada bajo tu control directo en un entorno de escritorio, solicita tu plaza en nuestra lista de espera.
          </p>
          <form id="beta-form" class="beta-form" aria-label="Formulario de registro para la beta" onsubmit="event.preventDefault();" novalidate>
            <div class="form-group">
              <label for="beta-email" class="form-label">Correo Electrónico</label>
              <input type="email" id="beta-email" class="form-input" required placeholder="tu@email.com" aria-describedby="email-error" />
              <span id="email-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
            <button type="submit" class="join-cta btn">Solicitar acceso a la Beta</button>
            <span id="form-status" class="status-message" role="status" aria-live="polite"></span>
          </form>
        </div>
      </div>
    </section>

    <div id="lightbox-modal" class="lightbox-modal" aria-hidden="true" role="dialog" aria-modal="true">
      <button id="lightbox-prev" class="lightbox-nav-btn lightbox-prev" aria-label="Imagen anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <img id="lightbox-img" class="lightbox-img" src="" alt="Captura ampliada" />
      <button id="lightbox-next" class="lightbox-nav-btn lightbox-next" aria-label="Siguiente imagen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  </main>
  <footer class="footer reveal-element">
    <div class="footer-content">
      <div class="footer-brand">
        <h3>Entity</h3>
        <p>Y si el código ya no fuera el centro?</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Producto</h4>
          <a href="#" class="footer-link">Características</a>
          <a href="#" class="footer-link">Roadmap</a>
          <a href="#" class="footer-link">Precios</a>
        </div>
        <div class="footer-col">
          <h4>Comunidad</h4>
          <a href="#" class="footer-link">Discord</a>
          <a href="#" class="footer-link">GitHub</a>
          <a href="#" class="footer-link">Twitter</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="#" class="footer-link">Privacidad</a>
          <a href="#" class="footer-link">Términos</a>
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

// Demo Selector logic (FIA-034)
const pfTabs = document.querySelectorAll('.pf-tab');
const pfCaptureImg = document.querySelector<HTMLImageElement>('.pf-capture');

const viewAssets: Record<string, { src: string; alt: string }> = {
  workspace: {
    src: '/FIA-31_Implementar vista workspace.png',
    alt: 'Vista Workspace de Entity'
  },
  entis: {
    src: '/FIA-32_Implementar vista entis.png',
    alt: 'Vista Entis de Entity'
  },
  sequential: {
    src: '/FIA-33_Implementar vista secuencial grupos.png',
    alt: 'Vista de Sequential Groups de Entity'
  },
  chat: {
    src: '/Floating Chat.png',
    alt: 'Vista de Chat Desacoplado de Entity'
  }
};

// Preload assets for instant switching without lag (FIA-035 optimization)
Object.values(viewAssets).forEach(asset => {
  const img = new Image();
  img.src = asset.src;
});

pfTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-target') || 'workspace';
    
    // Update active tab styling
    pfTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    
    // Update image
    if (pfCaptureImg && viewAssets[target]) {
      pfCaptureImg.src = viewAssets[target].src;
      pfCaptureImg.alt = viewAssets[target].alt;
      
      // Trigger transition animation (FIA-067)
      pfCaptureImg.classList.remove('switching');
      void pfCaptureImg.offsetWidth; // Force reflow
      pfCaptureImg.classList.add('switching');
    }
  });
});

// Beta Form validation logic (FIA-042)
const betaForm = document.getElementById('beta-form');
const betaEmailInput = document.getElementById('beta-email') as HTMLInputElement | null;
const emailErrorSpan = document.getElementById('email-error');
const formStatusSpan = document.getElementById('form-status');

if (betaForm && betaEmailInput && emailErrorSpan) {
  betaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Prevent double submit
    if (betaForm.classList.contains('is-submitting')) {
      return;
    }
    
    const value = betaEmailInput.value.trim();
    if (!value) {
      betaEmailInput.classList.add('invalid');
      betaEmailInput.setAttribute('aria-invalid', 'true');
      emailErrorSpan.textContent = 'El correo electrónico es obligatorio.';
      emailErrorSpan.style.display = 'block';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      betaEmailInput.classList.add('invalid');
      betaEmailInput.setAttribute('aria-invalid', 'true');
      emailErrorSpan.textContent = 'El formato del correo electrónico no es válido.';
      emailErrorSpan.style.display = 'block';
    } else {
      betaEmailInput.classList.remove('invalid');
      betaEmailInput.removeAttribute('aria-invalid');
      emailErrorSpan.textContent = '';
      emailErrorSpan.style.display = 'none';
      
      // Activar estado de envío local y accesible (FIA-044)
      betaForm.classList.add('is-submitting');
      betaForm.setAttribute('aria-busy', 'true');
      betaEmailInput.disabled = true;
      
      const submitBtn = betaForm.querySelector('.join-cta') as HTMLButtonElement | null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
      
      if (formStatusSpan) {
        formStatusSpan.classList.remove('error');
        formStatusSpan.textContent = 'Enviando solicitud...';
        formStatusSpan.style.display = 'block';
      }

      // Enviar petición HTTP real (FIA-047)
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: value })
      })
      .then(response => {
        betaForm.removeAttribute('aria-busy');
        
        if (!response.ok) {
          return response.json()
            .catch(() => {
              return { error: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.' };
            })
            .then(errData => {
              throw new Error(errData.error || 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
            });
        }
        return response.json();
      })
      .then(data => {
        betaForm.classList.remove('is-submitting');
        betaForm.classList.add('is-submitted');
        
        if (submitBtn) {
          submitBtn.textContent = 'Solicitud Enviada';
        }
        
        if (formStatusSpan) {
          formStatusSpan.textContent = data.message || '¡Solicitud enviada con éxito! Te hemos añadido a la lista de espera.';
        }
      })
      .catch((err) => {
        betaForm.classList.remove('is-submitting');
        betaEmailInput.disabled = false;
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Solicitar acceso a la Beta';
        }
        
        if (formStatusSpan) {
          formStatusSpan.classList.add('error');
          // Mostrar mensaje de error amigable si es fallo de red (Failed to fetch)
          const msg = (err instanceof Error && err.message && err.message !== 'Failed to fetch')
            ? err.message
            : 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.';
          formStatusSpan.textContent = msg;
        }
      });
    }
  });

  const clearError = () => {
    // No limpiar si ya se está enviando o ya se envió
    if (betaForm.classList.contains('is-submitting') || betaForm.classList.contains('is-submitted')) {
      return;
    }
    betaEmailInput.classList.remove('invalid');
    betaEmailInput.removeAttribute('aria-invalid');
    emailErrorSpan.textContent = '';
    emailErrorSpan.style.display = 'none';
    
    if (formStatusSpan) {
      formStatusSpan.textContent = '';
      formStatusSpan.style.display = 'none';
      formStatusSpan.classList.remove('error');
    }
  };

  // Clear error on input
  betaEmailInput.addEventListener('input', clearError);

  // Clear error on focus (when user clicks back on the writing field)
  betaEmailInput.addEventListener('focus', clearError);

  // Clear error on click/mousedown (for click triggers even if already focused)
  betaEmailInput.addEventListener('click', clearError);
  betaEmailInput.addEventListener('mousedown', clearError);

  // Clear error when clicking anywhere else on the document
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (betaForm && !betaForm.contains(target)) {
      clearError();
    }
  });

  // Intersection Observer for scroll reveal (FIA-063)
  if (typeof window !== 'undefined' && window.IntersectionObserver) {
    const revealCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after revealing to prevent re-animating when scrolling back up
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-element').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Lightbox functionality
  const productContainer = document.getElementById('product-frame-container');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (productContainer && lightboxModal && lightboxImg) {
    const mainImg = document.getElementById('main-product-img') as HTMLImageElement;
    const tabs = Array.from(document.querySelectorAll('.pf-tab')) as HTMLButtonElement[];
    
    const openLightbox = () => {
      if (mainImg) {
        lightboxImg.src = mainImg.src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    const navigateLightbox = (direction: 1 | -1) => {
      const activeIndex = tabs.findIndex(tab => tab.classList.contains('active'));
      let newIndex = activeIndex + direction;
      if (newIndex < 0) newIndex = tabs.length - 1;
      if (newIndex >= tabs.length) newIndex = 0;
      
      tabs[newIndex].click(); // Trigger the existing logic
      
      // Allow the dom to update the mainImg src before we copy it
      setTimeout(() => {
        lightboxImg.src = mainImg.src;
      }, 50);
    };

    productContainer.addEventListener('click', openLightbox);
    productContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });

    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target === lightboxImg) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }
}
