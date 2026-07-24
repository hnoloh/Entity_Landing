/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

let cacheBuster = 0;

describe('Admin Dashboard XSS Security', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
  });

  it('should render malicious payload in email as text, not HTML', async () => {
    const mockData = [
      {
        email: '<script>alert("xss-email")</script>',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: '<img src="x" onerror="alert(1)">'
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 50));

    const contentDiv = document.getElementById('waitlist-content');
    expect(contentDiv).not.toBeNull();

    // Query the DOM to verify it was rendered as text
    const emailCode = contentDiv?.querySelector('.email-code');
    expect(emailCode?.textContent).toBe('<script>alert("xss-email")</script>');
    const sourceTag = contentDiv?.querySelector('.source-tag');
    expect(sourceTag?.textContent).toBe('<img src="x" onerror="alert(1)">');
    // Ensure no actual script or img nodes were injected
    expect(contentDiv?.querySelector('script')).toBeNull();
    expect(contentDiv?.querySelector('img')).toBeNull();
  });

  it('should render malicious error message from server safely', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: '<script>alert("xss-error")</script>' })
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 50));

    const contentDiv = document.getElementById('waitlist-content');
    expect(contentDiv).not.toBeNull();

    // Verify error is text
    const alertBox = contentDiv?.querySelector('.status-message.error');
    expect(alertBox?.textContent).toContain('<script>alert("xss-error")</script>');
    expect(contentDiv?.querySelector('script')).toBeNull();
  });

  it('should render malicious status safely', async () => {
    const mockData = [
      {
        email: 'test@example.com',
        status: '"><script>alert("xss-status")</script>',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Form'
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 50));

    const contentDiv = document.getElementById('waitlist-content');
    expect(contentDiv).not.toBeNull();

    // Verify status was safely injected into attribute and not rendered as HTML
    const select = contentDiv?.querySelector('.status-select');
    // Class name should contain the malicious payload safely
    expect(select?.className).toContain('"><script>alert("xss-status")</script>');
    expect(contentDiv?.querySelector('script')).toBeNull();
  });
});
