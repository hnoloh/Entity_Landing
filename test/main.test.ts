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
    expect(app.querySelector('header .btn')).not.toBeNull();
    expect(app.querySelector('header .logo-container .ghost-hero')).not.toBeNull();

    // FIA-006 contract
    expect(app.querySelector('#problema')).not.toBeNull();
    expect(app.querySelector('#vision')).not.toBeNull();
    expect(app.querySelector('#producto')).not.toBeNull();
    expect(app.querySelector('#join')).not.toBeNull();
    expect(app.querySelector('#cta')).not.toBeNull();

    // FIA-007 contract
    const nav = app.querySelector('header nav');
    expect(nav).not.toBeNull();
    expect(nav?.textContent).toContain('Inicio');
    expect(nav?.textContent).toContain('Producto');
    expect(nav?.textContent).toContain('Beta');
    expect(nav?.textContent).toContain('GitHub');

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
  });
});
