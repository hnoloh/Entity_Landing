import { describe, it, expect, beforeEach } from 'vitest';

describe('App Bootstrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render the identifiable root screen, global Shell, and apply base styles', async () => {
    await import('../src/main.js?t=' + Date.now()); // force reload module
    const app = document.querySelector('#app');
    
    // FIA-001 contract
    expect(app.innerHTML).toContain('Entity Landing');
    expect(app.innerHTML).toContain('Status: MVP Bootstrap');

    // FIA-002 contract
    expect(app.querySelector('header')).not.toBeNull();
    expect(app.querySelector('main')).not.toBeNull();
    expect(app.querySelector('footer')).not.toBeNull();
  });
});
