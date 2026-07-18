import { describe, it, expect, beforeEach } from 'vitest';

describe('App Bootstrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render the identifiable root screen', async () => {
    await import('../src/main.js?t=' + Date.now()); // force reload module
    const app = document.querySelector('#app');
    expect(app.innerHTML).toContain('Entity Landing');
    expect(app.innerHTML).toContain('Status: MVP Bootstrap');
  });
});
