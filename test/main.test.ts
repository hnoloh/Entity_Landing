import { describe, it, expect, beforeEach } from 'vitest';

describe('App Bootstrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
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
    expect(supporting?.textContent).toBe('Entity es un Workspace de escritorio donde agentes especializados colaboran bajo tu control. Estamos preparando nuestra primera beta privada y buscamos a los primeros usuarios.');
    expect(hero?.querySelector('.hero-cta')).not.toBeNull();
    expect(hero?.querySelector('.hero-visual')).not.toBeNull();

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
    expect(tabs?.length).toBe(3);
    
    // Vista por defecto: Workspace activo
    expect(tabs?.[0].classList.contains('active')).toBe(true);
    expect(tabs?.[1].classList.contains('active')).toBe(false);
    expect(tabs?.[2].classList.contains('active')).toBe(false);
    expect(captureImg?.getAttribute('src')).toBe('/FIA-31_Implementar vista workspace.png');
    expect(captureImg?.getAttribute('alt')).toBe('Vista Workspace de Entity');
    
    // Clic en pestaña Entis
    tabs?.[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[0].classList.contains('active')).toBe(false);
    expect(tabs?.[1].classList.contains('active')).toBe(true);
    expect(tabs?.[2].classList.contains('active')).toBe(false);
    expect(captureImg?.getAttribute('src')).toBe('/FIA-32_Implementar vista entis.png');
    expect(captureImg?.getAttribute('alt')).toBe('Vista Entis de Entity');
    
    // Clic en pestaña Grupos Secuenciales
    tabs?.[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[0].classList.contains('active')).toBe(false);
    expect(tabs?.[1].classList.contains('active')).toBe(false);
    expect(tabs?.[2].classList.contains('active')).toBe(true);
    expect(captureImg?.getAttribute('src')).toBe('/FIA-33_Implementar vista secuencial grupos.png');
    expect(captureImg?.getAttribute('alt')).toBe('Vista de Sequential Groups de Entity');

    // specifications ribbon (agnostic local/cloud features)
    const specRibbon = app.querySelector('#especificaciones');
    expect(specRibbon).not.toBeNull();
    expect(specRibbon?.textContent).toContain('Hibridación Activa:');
    expect(specRibbon?.textContent).toContain('Modelos locales y cloud en un mismo grupo.');

    // FIA-011 contract
    const join = app.querySelector('#join');
    expect(join).not.toBeNull();
    expect(join?.querySelector('.join-cta')).not.toBeNull();


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
