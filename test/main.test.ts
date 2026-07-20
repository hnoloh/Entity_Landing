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
      return new Promise((resolve) => {
        setTimeout(() => {
          const body = JSON.parse(options.body || '{}');
          if (body.email === 'qa.error@entity.test') {
            resolve({
              ok: false,
              status: 500,
              json: async () => ({ error: 'Error del servidor' })
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

    vi.useRealTimers();
    vi.unstubAllGlobals();

    // Verificar evidencia interna de persistencia (FIA-048)
    const filePath = path.join(__dirname, '../registrations.json');
    expect(fs.existsSync(filePath)).toBe(true);
    const registrations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(registrations.length).toBe(1);
    expect(registrations[0].email).toBe('qa.success@entity.test');
    expect(registrations[0].status).toBe('Pending');
    expect(registrations[0].registeredAt).not.toBeNull();

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
});
