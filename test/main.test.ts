import { describe, it, expect, beforeEach, vi } from 'vitest';
// @ts-expect-error: fs is not typed in browser-only landing page compiler target
import fs from 'fs';
// @ts-expect-error: path is not typed in browser-only landing page compiler target
import path from 'path';

declare const __dirname: string;

describe('App Bootstrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    
    // Clean up registrations.json before each test run
    const filePath = path.join(__dirname, '../registrations.json');
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        void err;
      }
    }
  });

  it('should render the identifiable root screen, global Shell, and apply base styles', async () => {
    await import('../src/main.ts?t=' + Date.now()); // force reload module
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    // FIA-001 contract updated AS-BUILT
    expect(app.innerHTML).toContain('Entity');

    // FIA-002 contract
    expect(app.querySelector('header')).not.toBeNull();
    expect(app.querySelector('main')).not.toBeNull();
    expect(app.querySelector('footer')).not.toBeNull();

    // FIA-004 AS-BUILT contract
    expect(app.querySelector('header .logo-container .ghost-hero')).not.toBeNull();
    expect(app.querySelector('header .header-left .slogan')).not.toBeNull();

    // FIA-006 contract
    expect(app.querySelector('#problema')).not.toBeNull();
    expect(app.querySelector('#vision')).not.toBeNull();
    expect(app.querySelector('#producto')).not.toBeNull();
    expect(app.querySelector('#join')).not.toBeNull();

    // FIA-007 contract updated in FIA-015
    const nav = app.querySelector('header nav');
    expect(nav).not.toBeNull();
    
    const navLinks = nav?.querySelectorAll('a.nav-item');
    expect(navLinks?.length).toBe(4);
    
    expect(navLinks?.[0].getAttribute('href')).toBe('#hero');
    expect(navLinks?.[0].textContent).toBe('Inicio');
    
    expect(navLinks?.[1].getAttribute('href')).toBe('#producto');
    expect(navLinks?.[1].textContent).toBe('Producto');
    
    expect(navLinks?.[2].getAttribute('href')).toBe('#join');
    expect(navLinks?.[2].textContent).toBe('Beta');
    
    expect(navLinks?.[3].getAttribute('href')).toBe('#github');
    expect(navLinks?.[3].textContent).toBe('GitHub');

    // FIA-008 contract
    const hero = app.querySelector('#hero');
    expect(hero).not.toBeNull();
    const headline = hero?.querySelector('.hero-headline');
    expect(headline).not.toBeNull();
    expect(headline?.textContent).toBe('Organiza el trabajo con inteligencia artificial.');
    const supporting = hero?.querySelector('.hero-supporting');
    expect(supporting).not.toBeNull();
    expect(supporting?.textContent).toBe('Entity es un Workspace de escritorio donde los agentes especializados (Entis) pueden colaborar de manera conjunta y coordinada dentro de un grupo bajo tu control. Estamos preparando nuestra primera beta privada y buscamos a los primeros usuarios.');

    expect(hero?.querySelector('.hero-visual')).not.toBeNull();
    const heroCtaLink = hero?.querySelector('.hero-cta a');
    expect(heroCtaLink).not.toBeNull();
    expect(heroCtaLink?.getAttribute('href')).toBe('#join');

    // FIA-009 / FIA-026 contract
    const introEntity = app.querySelector('#intro-entity');
    expect(introEntity).not.toBeNull();
    expect(introEntity?.textContent).toContain('Todo ocurre en un único lugar.');
    expect(introEntity?.textContent).toContain('Configuración, conversaciones, Entis, grupos secuenciales e historial dentro de un mismo Workspace.');

    // FIA-024 contract
    const problema = app.querySelector('#problema');
    expect(problema).not.toBeNull();
    expect(problema?.textContent).toContain('Trabajar con IA se ha vuelto caótico.');
    expect(problema?.textContent).toContain('Más modelos.');
    expect(problema?.textContent).toContain('Más chats.');
    expect(problema?.textContent).toContain('Más herramientas.');
    expect(problema?.textContent).toContain('Más desorden.');
    expect(problema?.textContent).toContain('La IA ha evolucionado.');
    expect(problema?.textContent).toContain('Nuestra forma de trabajar con ella todavía no.');

    // FIA-025 contract
    const vision = app.querySelector('#vision');
    expect(vision).not.toBeNull();
    expect(vision?.textContent).toContain('La IA necesita un Workspace.');
    expect(vision?.textContent).toContain('Entity propone dejar atrás las conversaciones infinitas para trabajar dentro de un espacio organizado donde cada agente tiene un propósito y cada decisión sigue estando en manos del usuario.');

    // FIA-010 contract
    const producto = app.querySelector('#producto');
    expect(producto).not.toBeNull();
    const productVisual = producto?.querySelector('.producto-visual');
    expect(productVisual).not.toBeNull();

    // FIA-029/030/031/034 contract (Product Frame with interactive selector)
    const productFrame = productVisual?.querySelector('.product-frame');
    expect(productFrame).not.toBeNull();
    
    const captureImg = productFrame?.querySelector('img.pf-capture');
    expect(captureImg).not.toBeNull();
    
    // FIA-035: Optimización de assets presente
    expect(captureImg?.getAttribute('decoding')).toBe('async');
    expect(captureImg?.getAttribute('fetchpriority')).toBe('high');

    // FIA-034: Selector de demostración presente
    const selector = app.querySelector('.pf-selector');
    expect(selector).not.toBeNull();
    
    const tabs = selector?.querySelectorAll('.pf-tab');
    expect(tabs?.length).toBe(4);
    
    // Vista por defecto: Workspace activo
    expect(tabs?.[0].classList.contains('active')).toBe(true);
    expect(tabs?.[1].classList.contains('active')).toBe(false);
    expect(tabs?.[2].classList.contains('active')).toBe(false);
    expect(tabs?.[3].classList.contains('active')).toBe(false);
    expect(captureImg?.getAttribute('src')).toBe('/FIA-31_Implementar vista workspace.png');
    expect(captureImg?.getAttribute('alt')).toBe('Vista Workspace de Entity');
    
    // Clic en pestaña Entis
    tabs?.[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[0].classList.contains('active')).toBe(false);
    expect(tabs?.[1].classList.contains('active')).toBe(true);
    expect(tabs?.[2].classList.contains('active')).toBe(false);
    expect(tabs?.[3].classList.contains('active')).toBe(false);
    expect(captureImg?.getAttribute('src')).toBe('/FIA-32_Implementar vista entis.png');
    expect(captureImg?.getAttribute('alt')).toBe('Vista Entis de Entity');
    
    // Clic en pestaña Grupos Secuenciales
    tabs?.[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[0].classList.contains('active')).toBe(false);
    expect(tabs?.[1].classList.contains('active')).toBe(false);
    expect(tabs?.[2].classList.contains('active')).toBe(true);
    expect(tabs?.[3].classList.contains('active')).toBe(false);
    expect(captureImg?.getAttribute('src')).toBe('/FIA-33_Implementar vista secuencial grupos.png');
    expect(captureImg?.getAttribute('alt')).toBe('Vista de Sequential Groups de Entity');

    // Clic en pestaña Chat Desacoplado
    tabs?.[3].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[0].classList.contains('active')).toBe(false);
    expect(tabs?.[1].classList.contains('active')).toBe(false);
    expect(tabs?.[2].classList.contains('active')).toBe(false);
    expect(tabs?.[3].classList.contains('active')).toBe(true);
    expect(captureImg?.getAttribute('src')).toBe('/Floating Chat.png');
    expect(captureImg?.getAttribute('alt')).toBe('Vista de Chat Desacoplado de Entity');

    // specifications trust badges in Hero (agnostic local/cloud features)
    const trustBadgesList = hero?.querySelector('.hero-trust-badges-inline');
    expect(trustBadgesList).not.toBeNull();
    expect(trustBadgesList?.textContent).toContain('Híbrido');
    expect(trustBadgesList?.textContent).toContain('Agnóstico');
    expect(trustBadgesList?.textContent).toContain('Privado');

    // FIA-041 contract (Formulario Beta visible y accesible)
    const join = app.querySelector('#join');
    expect(join).not.toBeNull();
    const form = join?.querySelector('form');
    expect(form).not.toBeNull();

    const emailInput = form?.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
    expect(emailInput?.getAttribute('required')).not.toBeNull();
    expect(emailInput?.getAttribute('id')).toBe('beta-email');

    const label = form?.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.getAttribute('for')).toBe('beta-email');

    const ctaButton = form?.querySelector('.join-cta');
    expect(ctaButton).not.toBeNull();

    // FIA-042 & FIA-043 contracts (Validación de email obligatorio y formato)
    const errorSpan = form?.querySelector('#email-error');
    expect(errorSpan).not.toBeNull();

    // 1. Submit vacío (obligatorio) - no debe activar loading
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(emailInput?.getAttribute('aria-invalid')).toBe('true');
    expect(errorSpan?.textContent).toBe('El correo electrónico es obligatorio.');
    expect(form?.classList.contains('is-submitting')).toBe(false);

    // 2. Limpieza al escribir
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'a';
      emailInput.dispatchEvent(new window.Event('input', { bubbles: true }));
    }
    expect(emailInput?.getAttribute('aria-invalid')).toBeNull();
    expect(errorSpan?.textContent).toBe('');

    // 3. Submit con formato incorrecto - no debe activar loading
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'correo-invalido';
    }
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(emailInput?.getAttribute('aria-invalid')).toBe('true');
    expect(errorSpan?.textContent).toBe('El formato del correo electrónico no es válido.');
    expect(form?.classList.contains('is-submitting')).toBe(false);

    // 4. Limpieza al escribir tras error de formato
    if (emailInput) {
      emailInput.dispatchEvent(new window.Event('input', { bubbles: true }));
    }
    expect(emailInput?.getAttribute('aria-invalid')).toBeNull();
    expect(errorSpan?.textContent).toBe('');

    // 5. Submit con formato incorrecto y limpiar en focus
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'correo-invalido';
    }
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(emailInput?.getAttribute('aria-invalid')).toBe('true');
    expect(errorSpan?.textContent).toBe('El formato del correo electrónico no es válido.');
    expect(form?.classList.contains('is-submitting')).toBe(false);

    emailInput?.dispatchEvent(new window.Event('focus', { bubbles: true }));
    expect(emailInput?.getAttribute('aria-invalid')).toBeNull();
    expect(errorSpan?.textContent).toBe('');

    // 6. Submit con formato incorrecto y limpiar al clicar fuera
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(emailInput?.getAttribute('aria-invalid')).toBe('true');
    expect(errorSpan?.textContent).toBe('El formato del correo electrónico no es válido.');
    expect(form?.classList.contains('is-submitting')).toBe(false);

    document.dispatchEvent(new window.Event('click', { bubbles: true }));
    expect(emailInput?.getAttribute('aria-invalid')).toBeNull();
    expect(errorSpan?.textContent).toBe('');

    // 7. Submit con formato correcto - Escenario de Error (qa.error@entity.test) (FIA-047)
    const fetchMock = vi.fn().mockImplementation((_url, options) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const body = JSON.parse(options.body || '{}');
          if (body.email === 'qa.network@entity.test') {
            reject(new TypeError('Failed to fetch'));
            return;
          }
          if (body.email === 'qa.error@entity.test') {
            resolve({
              ok: false,
              status: 500,
              json: async () => ({ error: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.' })
            });
          } else {
            // Persistir solicitud de beta en el mock de test (FIA-048)
            const filePath = path.join(__dirname, '../registrations.json');
            let registrations = [];
            if (fs.existsSync(filePath)) {
              try {
                registrations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
              } catch {
                registrations = [];
              }
            }

            // Detección de email duplicado (FIA-049)
            const exists = registrations.some((r: { email: string }) => r.email === body.email);
            if (exists) {
              resolve({
                ok: false,
                status: 409,
                json: async () => ({ error: 'Este correo electrónico ya está registrado.' })
              });
              return;
            }

            registrations.push({
              email: body.email,
              status: 'Pending',
              registeredAt: new Date().toISOString()
            });
            fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2), 'utf-8');

            resolve({
              ok: true,
              status: 200,
              json: async () => ({ message: '¡Solicitud enviada con éxito! Te hemos añadido a la lista de espera.' })
            });
          }
        }, 1000);
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    vi.useFakeTimers();
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'qa.error@entity.test';
    }
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(emailInput?.getAttribute('aria-invalid')).toBeNull();
    expect(errorSpan?.textContent).toBe('');
    expect(fetchMock).toHaveBeenCalledWith('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'qa.error@entity.test' })
    });

    // Comprobar estado de envío (loading)
    expect(form?.classList.contains('is-submitting')).toBe(true);
    expect(emailInput?.getAttribute('disabled')).not.toBeNull();
    
    const submitBtn = form?.querySelector('.join-cta') as HTMLButtonElement;
    expect(submitBtn?.getAttribute('disabled')).not.toBeNull();
    expect(submitBtn?.textContent).toBe('Enviando...');
    
    const statusSpan = form?.querySelector('#form-status');
    expect(statusSpan).not.toBeNull();
    expect(statusSpan?.textContent).toBe('Enviando solicitud...');

    // Intentar un segundo submit mientras está cargando (no debe hacer nada)
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(form?.classList.contains('is-submitting')).toBe(true);

    // Completar el estado de envío (avanzar timers)
    vi.advanceTimersByTime(1000);
    for (let i = 0; i < 6; i++) {
      await vi.runAllTicks();
    }

    // Comprobar estado de error simulado
    expect(form?.classList.contains('is-submitting')).toBe(false);
    expect(form?.classList.contains('is-submitted')).toBe(false);
    expect(statusSpan?.textContent).toBe('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    expect(statusSpan?.classList.contains('error')).toBe(true);
    
    // Inputs y botones deben volver a estar habilitados y conservar el email
    expect(emailInput?.getAttribute('disabled')).toBeNull();
    expect(submitBtn?.getAttribute('disabled')).toBeNull();
    expect(submitBtn?.textContent).toBe('Solicitar acceso a la Beta');
    expect((emailInput as HTMLInputElement).value).toBe('qa.error@entity.test');

    // --- ESCENARIO DE FALLO DE RED (FIA-051) ---
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'qa.network@entity.test';
    }
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(form?.classList.contains('is-submitting')).toBe(true);

    vi.advanceTimersByTime(1000);
    for (let i = 0; i < 6; i++) {
      await vi.runAllTicks();
    }

    // Verificar respuesta de fallo de red
    expect(form?.classList.contains('is-submitting')).toBe(false);
    expect(form?.classList.contains('is-submitted')).toBe(false);
    expect(statusSpan?.textContent).toBe('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    expect(statusSpan?.classList.contains('error')).toBe(true);

    // Formulario recuperable conservando el email
    expect(emailInput?.getAttribute('disabled')).toBeNull();
    expect(submitBtn?.getAttribute('disabled')).toBeNull();
    expect((emailInput as HTMLInputElement).value).toBe('qa.network@entity.test');

    // 8. Reintento con formato correcto - Escenario de Éxito (qa.success@entity.test)
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'qa.success@entity.test';
    }
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(form?.classList.contains('is-submitting')).toBe(true);
    expect(statusSpan?.textContent).toBe('Enviando solicitud...');
    expect(statusSpan?.classList.contains('error')).toBe(false);

    vi.advanceTimersByTime(1000);
    for (let i = 0; i < 6; i++) {
      await vi.runAllTicks();
    }

    // Comprobar estado de confirmación simulada (éxito permanente)
    expect(form?.classList.contains('is-submitting')).toBe(false);
    expect(form?.classList.contains('is-submitted')).toBe(true);
    expect(statusSpan?.textContent).toBe('¡Solicitud enviada con éxito! Te hemos añadido a la lista de espera.');
    expect(statusSpan?.classList.contains('error')).toBe(false);
    
    expect(emailInput?.getAttribute('disabled')).not.toBeNull();
    expect(submitBtn?.getAttribute('disabled')).not.toBeNull();
    expect(submitBtn?.textContent).toBe('Solicitud Enviada');

    // --- ESCENARIO DE DUPLICADO (FIA-049) ---
    // 9. Reset temporal del estado del formulario para intentar duplicar
    form?.classList.remove('is-submitted');
    if (emailInput) {
      (emailInput as HTMLInputElement).disabled = false;
      (emailInput as HTMLInputElement).value = 'qa.success@entity.test';
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Solicitar acceso a la Beta';
    }

    // Intentar segundo envío del mismo email
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(form?.classList.contains('is-submitting')).toBe(true);

    vi.advanceTimersByTime(1000);
    for (let i = 0; i < 6; i++) {
      await vi.runAllTicks();
    }

    // Verificar respuesta de duplicado
    expect(form?.classList.contains('is-submitting')).toBe(false);
    expect(form?.classList.contains('is-submitted')).toBe(false);
    expect(statusSpan?.textContent).toBe('Este correo electrónico ya está registrado.');
    expect(statusSpan?.classList.contains('error')).toBe(true);

    // Formulario debe estar recuperable
    expect(emailInput?.getAttribute('disabled')).toBeNull();
    expect(submitBtn?.getAttribute('disabled')).toBeNull();

    // 10. Corregir y reenviar un email no duplicado
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'qa.another@entity.test';
    }
    form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    expect(form?.classList.contains('is-submitting')).toBe(true);

    vi.advanceTimersByTime(1000);
    for (let i = 0; i < 6; i++) {
      await vi.runAllTicks();
    }

    // Comprobar éxito de la segunda dirección
    expect(form?.classList.contains('is-submitting')).toBe(false);
    expect(form?.classList.contains('is-submitted')).toBe(true);
    expect(statusSpan?.textContent).toBe('¡Solicitud enviada con éxito! Te hemos añadido a la lista de espera.');

    vi.useRealTimers();
    vi.unstubAllGlobals();

    // Verificar evidencia interna de persistencia (FIA-049)
    const filePath = path.join(__dirname, '../registrations.json');
    expect(fs.existsSync(filePath)).toBe(true);
    const registrations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(registrations.length).toBe(2);
    expect(registrations[0].email).toBe('qa.success@entity.test');
    expect(registrations[0].status).toBe('Pending');
    expect(registrations[1].email).toBe('qa.another@entity.test');
    expect(registrations[1].status).toBe('Pending');

    // Eliminar archivo de prueba tras verificar persistencia
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      void err;
    }

    expect(join?.textContent).toContain('MVP');
    expect(join?.textContent).toContain('beta privada');
    expect(join?.textContent).toContain('acceso anticipado');


    // FIA-013 contract
    const footer = app.querySelector('.footer');
    expect(footer).not.toBeNull();
    expect(footer?.querySelector('.footer-brand')).not.toBeNull();
    expect(footer?.querySelector('.footer-links')).not.toBeNull();
    expect(footer?.querySelector('.footer-bottom')).not.toBeNull();

    // FIA-017 contract
    const mobileBtn = app.querySelector('header .mobile-menu-btn');
    expect(mobileBtn).not.toBeNull();

    // FIA-018 contract
    expect(mobileBtn?.getAttribute('aria-expanded')).toBe('false');
    const drawer = app.querySelector('header .mobile-menu-drawer');
    expect(drawer).not.toBeNull();
    
    // Links inside mobile menu drawer
    const drawerLinks = drawer?.querySelectorAll('a.mobile-nav-item');
    expect(drawerLinks?.length).toBe(4);
    expect(drawerLinks?.[0].getAttribute('href')).toBe('#hero');
    expect(drawerLinks?.[1].getAttribute('href')).toBe('#producto');
    expect(drawerLinks?.[2].getAttribute('href')).toBe('#join');
    expect(drawerLinks?.[3].getAttribute('href')).toBe('#github');

    // Simulate click on mobile menu button (Open)
    const headerEl = app.querySelector('header');
    expect(headerEl?.classList.contains('mobile-menu-open')).toBe(false);
    
    mobileBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    expect(mobileBtn?.getAttribute('aria-expanded')).toBe('true');
    expect(headerEl?.classList.contains('mobile-menu-open')).toBe(true);

    // Simulate click on mobile menu button again (Close)
    mobileBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mobileBtn?.getAttribute('aria-expanded')).toBe('false');
    expect(headerEl?.classList.contains('mobile-menu-open')).toBe(false);

    // Open again to test closing on option click
    mobileBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(headerEl?.classList.contains('mobile-menu-open')).toBe(true);

    // Click on a mobile nav link (should close the menu)
    drawerLinks?.[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mobileBtn?.getAttribute('aria-expanded')).toBe('false');
    expect(headerEl?.classList.contains('mobile-menu-open')).toBe(false);

    // FIA-020 contract
    // Verify that the controls can be focused natively
    (navLinks?.[0] as HTMLElement).focus();
    expect(document.activeElement).toBe(navLinks?.[0]);

    (mobileBtn as HTMLElement).focus();
    expect(document.activeElement).toBe(mobileBtn);

    (drawerLinks?.[0] as HTMLElement).focus();
    expect(document.activeElement).toBe(drawerLinks?.[0]);
  });

  it('should not expose waitlist data, admin table or links to admin page on public URL root (FIA-054)', async () => {
    await import('../src/main.ts?t=' + Date.now());
    const app = document.querySelector<HTMLDivElement>('#app')!;

    // Verify no waitlist table is rendered
    expect(app.querySelector('.waitlist-table')).toBeNull();
    expect(app.querySelector('.status-select')).toBeNull();
    expect(app.innerHTML).not.toContain('admin.html');

    // Verify no admin links are visible
    const links = app.querySelectorAll('a');
    links.forEach(link => {
      expect(link.getAttribute('href') || '').not.toContain('admin.html');
    });
  });

  it('should not consume internal/administrative endpoints on public page load (FIA-054)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/main.ts?t=' + Date.now());
    
    // Public landing should not call admin endpoints
    expect(fetchMock).not.toHaveBeenCalledWith('/api/registrations');
    expect(fetchMock).not.toHaveBeenCalledWith('/api/registrations/status');

    vi.unstubAllGlobals();
  });
});

describe('Admin Waitlist Dashboard', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';
    
    // Clean up registrations.json
    const filePath = path.join(__dirname, '../registrations.json');
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        void err;
      }
    }
  });

  it('should display empty waitlist state (FIA-052)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now()); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.body.innerHTML).toContain('No hay registros en la lista de espera actualmente.');
    vi.unstubAllGlobals();
  });

  it('should display loaded waitlist registrations with correct columns (FIA-052)', async () => {
    const mockData = [
      {
        email: 'admin.test@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form'
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now()); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));


    const table = document.querySelector('table.waitlist-table');
    expect(table).not.toBeNull();

    const headers = table?.querySelectorAll('th');
    expect(headers?.length).toBe(4);
    expect(headers?.[0].textContent).toBe('Correo Electrónico');
    expect(headers?.[1].textContent).toBe('Fecha de Registro');
    expect(headers?.[2].textContent).toBe('Origen');
    expect(headers?.[3].textContent).toBe('Estado');

    const cells = table?.querySelectorAll('tbody td');
    expect(cells?.[0].textContent).toBe('admin.test@entity.test');
    expect(cells?.[2].textContent).toBe('Landing Beta Form');
    expect(cells?.[3].querySelector('select')?.value).toBe('Pending');

    vi.unstubAllGlobals();
  });

  it('should display error loading waitlist message (FIA-052)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Error al conectar con la base de datos local.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now()); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.body.innerHTML).toContain('Error al cargar la waitlist:');
    expect(document.body.innerHTML).toContain('Error al conectar con la base de datos local.');
    vi.unstubAllGlobals();
  });

  it('should successfully update registration status to Approved (FIA-053)', async () => {
    const mockData = [
      {
        email: 'update.test@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form'
      }
    ];

    const fetchMock = vi.fn().mockImplementation((url, options) => {
      if (url === '/api/registrations' && (!options || options.method === 'GET')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockData
        });
      }
      if (url === '/api/registrations/status' && options && options.method === 'POST') {
        const body = JSON.parse(options.body);
        if (body.email === 'update.test@entity.test') {
          mockData[0].status = body.status;
          return Promise.resolve({
            ok: true,
            json: async () => ({ message: 'Estado actualizado con éxito.', registration: mockData[0] })
          });
        }
      }
      return Promise.reject(new Error('Unknown request'));
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now());
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>('.status-select');
    expect(select).not.toBeNull();
    expect(select?.value).toBe('Pending');

    // Trigger change
    select!.value = 'Approved';
    select!.dispatchEvent(new window.Event('change', { bubbles: true }));

    // Wait for the async flow to complete (fetch update then fetch reload)
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(fetchMock).toHaveBeenCalledWith('/api/registrations/status', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'update.test@entity.test', status: 'Approved' })
    }));

    const updatedSelect = document.querySelector<HTMLSelectElement>('.status-select');
    expect(updatedSelect?.value).toBe('Approved');
    expect(updatedSelect?.classList.contains('approved')).toBe(true);

    vi.unstubAllGlobals();
  });

  it('should show error and revert on invalid status change (FIA-053)', async () => {
    const mockData = [
      {
        email: 'invalid.status@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form'
      }
    ];

    const fetchMock = vi.fn().mockImplementation((url) => {
      if (url === '/api/registrations') {
        return Promise.resolve({
          ok: true,
          json: async () => mockData
        });
      }
      if (url === '/api/registrations/status') {
        return Promise.resolve({
          ok: false,
          status: 400,
          json: async () => ({ error: 'Estado inválido.' })
        });
      }
      return Promise.reject(new Error('Unknown request'));
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now());
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>('.status-select');
    select!.value = 'Approved';
    select!.dispatchEvent(new window.Event('change', { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 50));

    const errorContainer = document.getElementById('admin-status-container');
    expect(errorContainer?.textContent).toContain('Error al actualizar el estado: Estado inválido.');
    
    // Select should reload back to Pending
    const reloadedSelect = document.querySelector<HTMLSelectElement>('.status-select');
    expect(reloadedSelect?.value).toBe('Pending');

    vi.unstubAllGlobals();
  });

  it('should show error when updating non-existent registration (FIA-053)', async () => {
    const mockData = [
      {
        email: 'nonexistent@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form'
      }
    ];

    const fetchMock = vi.fn().mockImplementation((url) => {
      if (url === '/api/registrations') {
        return Promise.resolve({
          ok: true,
          json: async () => mockData
        });
      }
      if (url === '/api/registrations/status') {
        return Promise.resolve({
          ok: false,
          status: 404,
          json: async () => ({ error: 'Registro inexistente.' })
        });
      }
      return Promise.reject(new Error('Unknown request'));
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now());
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>('.status-select');
    select!.value = 'Rejected';
    select!.dispatchEvent(new window.Event('change', { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 50));

    const errorContainer = document.getElementById('admin-status-container');
    expect(errorContainer?.textContent).toContain('Error al actualizar el estado: Registro inexistente.');

    vi.unstubAllGlobals();
  });

  it('should persist registration status across dashboard reload (FIA-053)', async () => {
    const mockData = [
      {
        email: 'persist.test@entity.test',
        status: 'Rejected',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form'
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now());
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>('.status-select');
    expect(select?.value).toBe('Rejected');
    expect(select?.classList.contains('rejected')).toBe(true);

    vi.unstubAllGlobals();
  });

  it('should render the email confirmation preview correctly in admin view (FIA-055)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now()); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));

    const previewRegion = document.getElementById('email-preview-region');
    expect(previewRegion).not.toBeNull();

    // Verify presence of Subject, Preheader, Body, CTA and Footer
    const subject = document.getElementById('preview-subject');
    expect(subject).not.toBeNull();
    expect(subject?.textContent).toContain('¡Te damos la bienvenida a la Beta Privada de Entity!');

    const preheader = document.getElementById('preview-preheader');
    expect(preheader).not.toBeNull();
    expect(preheader?.textContent).toContain('Tu acceso exclusivo al Workspace inteligente de Entity está listo.');

    const body = document.getElementById('preview-body');
    expect(body).not.toBeNull();
    expect(body?.textContent).toContain('Workspace de escritorio inteligente');

    const cta = document.getElementById('preview-cta');
    expect(cta).not.toBeNull();
    expect(cta?.textContent).toContain('Descargar Entity para Escritorio');

    const footer = document.getElementById('preview-footer');
    expect(footer).not.toBeNull();
    expect(footer?.textContent).toContain('waitlist privada de Entity. © 2026 Entity');

    vi.unstubAllGlobals();
  });

  it('should verify email preview is purely visual, does not trigger mail delivery or modify registrations.json (FIA-055)', async () => {
    const filePath = path.join(__dirname, '../registrations.json');
    const beforeExists = fs.existsSync(filePath);
    let beforeContent = '';
    if (beforeExists) {
      beforeContent = fs.readFileSync(filePath, 'utf-8');
    }

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + Date.now());
    await new Promise((resolve) => setTimeout(resolve, 20));

    // Verify registrations.json hasn't been altered or created
    if (beforeExists) {
      expect(fs.readFileSync(filePath, 'utf-8')).toBe(beforeContent);
    } else {
      expect(fs.existsSync(filePath)).toBe(false);
    }

    // Verify no email sender fetch was triggered (only /api/registrations)
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/registrations');

    vi.unstubAllGlobals();
  });

  it('should not expose email preview on the public landing page (FIA-055)', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import('../src/main.ts?t=' + Date.now());
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    expect(app.querySelector('#email-preview-region')).toBeNull();
    expect(app.querySelector('#preview-subject')).toBeNull();
  });
});
