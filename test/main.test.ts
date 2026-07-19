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
    expect(app.querySelector('#cta')).not.toBeNull();

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
    expect(hero?.querySelector('.hero-headline')).not.toBeNull();
    expect(hero?.querySelector('.hero-supporting')).not.toBeNull();
    expect(hero?.querySelector('.hero-cta')).not.toBeNull();
    expect(hero?.querySelector('.hero-visual')).not.toBeNull();

    // FIA-009 contract
    expect(app.querySelector('#intro-entity')).not.toBeNull();

    // FIA-010 contract
    const producto = app.querySelector('#producto');
    expect(producto).not.toBeNull();
    expect(producto?.querySelector('.producto-visual')).not.toBeNull();

    // FIA-011 contract
    const join = app.querySelector('#join');
    expect(join).not.toBeNull();
    expect(join?.querySelector('.join-cta')).not.toBeNull();

    // FIA-012 contract
    const ctaRegion = app.querySelector('#cta');
    expect(ctaRegion).not.toBeNull();
    expect(ctaRegion?.querySelector('.final-cta')).not.toBeNull();

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
  });
});
