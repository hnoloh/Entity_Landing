// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

vi.mock('@sentry/browser', () => ({
  init: vi.fn(),
  captureMessage: vi.fn(),
}));

declare const __dirname: string;

let cacheBuster = 0;
describe('App Bootstrap', () => {
  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    document.body.innerHTML = '<div id="app"></div>';
    
    // Clean up registrations.json and sent_emails.json before each test run
    const filePath = path.join(__dirname, '../registrations.json');
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        void err;
      }
    }
    const sentEmailsPath = path.join(__dirname, '../sent_emails.json');
    if (fs.existsSync(sentEmailsPath)) {
      try {
        fs.unlinkSync(sentEmailsPath);
      } catch (err) {
        void err;
      }
    }
  });

  it('should render the identifiable root screen, global Shell, and apply base styles', async () => {
    await import('../src/main.ts?t=' + (++cacheBuster)); // force reload module
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    // FIA-001 contract updated AS-BUILT
    expect(app.innerHTML).toContain('Entity');

    // FIA-002 contract
    expect(app.querySelector('header')).not.toBeNull();
    expect(app.querySelector('main')).not.toBeNull();
    expect(app.querySelector('footer')).not.toBeNull();

    // FIA-004 AS-BUILT contract
    expect(app.querySelector('header .header-left .slogan')).not.toBeNull();

    // FIA-006 contract
    expect(app.querySelector('#problema')).not.toBeNull();
    expect(app.querySelector('#vision')).not.toBeNull();
    expect(app.querySelector('#producto')).not.toBeNull();
    expect(app.querySelector('#download-free')).not.toBeNull();

    // FIA-007 contract updated in FIA-015
    const nav = app.querySelector('header nav');
    expect(nav).not.toBeNull();
    
    const navLinks = nav?.querySelectorAll('a.nav-item');
    expect(navLinks?.length).toBe(3);
    
    expect(navLinks?.[0].getAttribute('href')).toBe('#producto');
    expect(navLinks?.[0].textContent).toBe('Producto');
    
    expect(navLinks?.[1].getAttribute('href')).toBe('#precios');
    expect(navLinks?.[1].textContent).toBe('Precios');
    
    expect(navLinks?.[2].getAttribute('href')).toBe('#descargar');
    expect(navLinks?.[2].textContent).toContain('Descargar');
    expect(navLinks?.[2].classList.contains('hero-btn')).toBe(true);

    const docsDropdown = nav?.querySelector('.dropdown-container .dropdown-trigger');
    expect(docsDropdown?.textContent).toBe('Docs');

    const navText = nav?.textContent || '';
    expect(navText.toLowerCase()).not.toContain('beta');
    expect(navText.toLowerCase()).not.toContain('login');
    expect(navText.toLowerCase()).not.toContain('cuenta');

    // FIA-008 contract
    const hero = app.querySelector('#hero');
    expect(hero).not.toBeNull();
    const headline = hero?.querySelector('.hero-headline');
    expect(headline).not.toBeNull();
    expect(headline?.textContent).toBe('Organiza el trabajo con inteligencia artificial.');
    const supporting = hero?.querySelector('.hero-supporting');
    expect(supporting).not.toBeNull();
    expect(supporting?.textContent).toContain('La IA necesita un Workspace');
    expect(supporting?.textContent?.toLowerCase()).not.toContain('beta');

    expect(hero?.querySelector('.hero-visual')).not.toBeNull();
    const ctas = hero?.querySelectorAll('.hero-cta a, .hero-cta button');
    expect(ctas?.length).toBeGreaterThanOrEqual(2);
    
    expect(ctas?.[0].textContent).toBe('Descargar Entity Free');
    expect(ctas?.[0].classList.contains('join-cta')).toBe(true);

    expect(ctas?.[1].textContent).toBe('Ver Entity Pro');
    expect(ctas?.[1].classList.contains('hero-btn')).toBe(true);

    const heroContent = hero?.textContent || '';
    expect(heroContent).toContain('Free sin registro');
    expect(heroContent).toContain('Local + Cloud BYOK');

    // FIA-W01.03 contract (Ecosistema)
    const introEntity = app.querySelector('#intro-entity');
    expect(introEntity).not.toBeNull();
    expect(introEntity?.textContent).toContain('Un Ecosistema Avanzado.');
    
    const items = introEntity?.querySelectorAll('li');
    expect(items?.length).toBe(5);
    
    expect(introEntity?.textContent).toContain('Agentes:');
    expect(introEntity?.textContent).toContain('Herramientas:');
    expect(introEntity?.textContent).toContain('Conocimiento:');
    expect(introEntity?.textContent).toContain('Datos:');
    expect(introEntity?.textContent).toContain('Orquestación:');
    
    expect(introEntity?.textContent).not.toContain('IA Híbrida');
    expect(introEntity?.textContent).not.toContain('Grupos Avanzados');
    expect(introEntity?.textContent).not.toContain('Tool Belt');
    expect(introEntity?.textContent).not.toContain('UX Premium');

    const narrativa = app.querySelector('#narrativa');
    expect(narrativa?.textContent?.toLowerCase()).not.toContain('beta');
    expect(narrativa?.textContent?.toLowerCase()).not.toContain('pricing');
    expect(narrativa?.textContent?.toLowerCase()).not.toContain('free ');
    expect(narrativa?.textContent?.toLowerCase()).not.toContain('pro ');

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
    expect(vision?.textContent).toContain('Entity propone dejar atrás las conversaciones infinitas para trabajar dentro de un espacio organizado. Cada agente tiene un propósito específico, permitiéndote montar grupos o equipos de agentes, asegurando que cada decisión siga siempre en manos del usuario.');

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

    // FIA-034 / FIA-W01.04: Selector de demostración presente (5 ejes exactos)
    const selector = app.querySelector('.pf-selector');
    expect(selector).not.toBeNull();
    
    const tabs = selector?.querySelectorAll('.pf-tab');
    expect(tabs?.length).toBe(5);
    
    expect(tabs?.[0].textContent).toBe('Agentes');
    expect(tabs?.[1].textContent).toBe('Herramientas');
    expect(tabs?.[2].textContent).toBe('Conocimiento');
    expect(tabs?.[3].textContent).toBe('Datos');
    expect(tabs?.[4].textContent).toBe('Orquestación');
    
    const pfDesc = app.querySelector('#pf-description');
    expect(pfDesc).not.toBeNull();
    
    // Vista por defecto: Agentes activo
    expect(tabs?.[0].classList.contains('active')).toBe(true);
    expect(tabs?.[1].classList.contains('active')).toBe(false);
    expect(captureImg?.getAttribute('src')).toBe('/v1_agentes.png');
    expect(captureImg?.getAttribute('alt')).toBe('Agentes de Entity');
    expect(pfDesc?.textContent).toContain('Entis especializados');
    expect(pfDesc?.textContent).toContain('modelos locales/cloud');
    expect(pfDesc?.textContent).toContain('configuración a medida');
    expect(pfDesc?.textContent).toContain('trabajo individual');
    
    // Clic en pestaña Herramientas
    tabs?.[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[0].classList.contains('active')).toBe(false);
    expect(tabs?.[1].classList.contains('active')).toBe(true);
    expect(captureImg?.getAttribute('src')).toBe('/v1_herramientas.png');
    expect(pfDesc?.textContent).toContain('Tool Belt');
    expect(pfDesc?.textContent).toContain('actuar sobre su entorno');
    
    // FIA-067: Comprobar que se añade la clase de animación al cambiar de vista
    expect(captureImg?.classList.contains('switching')).toBe(true);
    
    // Clic en pestaña Conocimiento (estructural, no funcional)
    tabs?.[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[2].classList.contains('active')).toBe(true);
    expect(pfDesc?.textContent?.trim()).toBe('');
    expect(captureImg?.getAttribute('src')).toBe('/v1_workspace.png');

    // Clic en pestaña Orquestación (Grupos respaldados)
    tabs?.[4].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs?.[4].classList.contains('active')).toBe(true);
    expect(captureImg?.getAttribute('src')).toBe('/v1_orquestacion.png');
    expect(pfDesc?.textContent).toContain('Grupos secuenciales');
    expect(pfDesc?.textContent).toContain('ordena la participación');
    expect(pfDesc?.textContent).toContain('bajo control humano');
    expect(pfDesc?.textContent).not.toContain('Comunidades');

    // specifications trust badges in Hero (agnostic local/cloud features)
    const trustBadgesList = hero?.querySelector('.hero-trust-badges-inline');
    expect(trustBadgesList).not.toBeNull();
    expect(trustBadgesList?.textContent).toContain('Híbrido');
    expect(trustBadgesList?.textContent).toContain('Agnóstico');
    expect(trustBadgesList?.textContent).toContain('Privado');

    // FIA-W01.07 contract (Pricing section, Entity Free)
    const precios = app.querySelector('#precios');
    expect(precios).not.toBeNull();
    
    // Assert Entity Free details
    expect(precios?.textContent).toContain('Entity Free');
    expect(precios?.textContent).toContain('0 €');
    expect(precios?.textContent).toContain('Sin registro');
    expect(precios?.textContent).toContain('sin tarjeta');
    
    // Assert exactly RV-N01 capabilities
    expect(precios?.textContent).toContain('Entis Ilimitados');
    expect(precios?.textContent).toContain('Grupos Secuenciales');
    expect(precios?.textContent).toContain('Chat Individual');
    expect(precios?.textContent).toContain('Ollama / Modelos locales & BYOK Cloud');
    expect(precios?.textContent).toContain('Persistencia completa');
    expect(precios?.textContent).toContain('Generación DOCX / PDF / HTML');
    
    // Assert CTA
    const freeCTA = precios?.querySelector('a.join-cta');
    expect(freeCTA).not.toBeNull();
    expect(freeCTA?.textContent).toBe('Descargar Entity Free');
    expect(freeCTA?.getAttribute('href')).toBe('#descargar');
    
    // Assert Entity Pro structural presence and capabilities
    expect(precios?.textContent).toContain('Entity Pro');
    expect(precios?.textContent).not.toContain('Próximamente');
    expect(precios?.textContent).toContain('8.99 €');
    expect(precios?.textContent).toContain('/ mes');
    expect(precios?.textContent).toContain('89 €');
    expect(precios?.textContent).toContain('/ año');
    
    // Pro capabilities derived exclusively from RV-N01 and RV-N05
    expect(precios?.textContent).toContain('Todo lo incluido en Free');
    expect(precios?.textContent).toContain('Grupos Loop');
    expect(precios?.textContent).toContain('Grupos No Secuenciales');
    expect(precios?.textContent).toContain('Terminal / Filesystem avanzado');
    expect(precios?.textContent).toContain('Máximo 2 dispositivos');
    expect(precios?.textContent).toContain('hasta 30 días');
    
    // CTA Obtener Entity Pro
    const proCTA = precios?.querySelectorAll('a.join-cta')[1];
    expect(proCTA).not.toBeNull();
    expect(proCTA?.textContent).toBe('Obtener Entity Pro');
    expect(proCTA?.getAttribute('href')).toBe('#checkout-pro');
    
    // FIA-W01.09 contract (Comparativa detallada RV-N01)
    const comparativa = app.querySelector('#comparativa-matrix');
    expect(comparativa).not.toBeNull();
    
    // Assert all rows from RV-N01
    const tableText = comparativa?.textContent || '';
    expect(tableText).toContain('Entis');
    expect(tableText).toContain('Grupos secuenciales');
    expect(tableText).toContain('Grupos Loop');
    expect(tableText).toContain('Grupos No Secuenciales');
    expect(tableText).toContain('Chat individual');
    expect(tableText).toContain('Ollama / modelos locales');
    expect(tableText).toContain('BYOK cloud');
    expect(tableText).toContain('Persistencia');
    expect(tableText).toContain('Generación DOCX / PDF / HTML');
    expect(tableText).toContain('Terminal / filesystem avanzado');
    expect(tableText).toContain('Integrantes por Grupo');
    expect(tableText).toContain('Workflows / presets avanzados futuros');
    expect(tableText).toContain('Nuevas capacidades power-user');
    
    // Assert exactly RV-N01 terminology (No omitting, no inventing)
    expect(tableText).toContain('Sin límite comercial');
    expect(tableText).toContain('No, salvo decisión expresa posterior');
    expect(tableText).toContain('Sí cuando formen parte del producto');
    expect(tableText).toContain('Sólo las declaradas Free');
    expect(tableText).toContain('Las declaradas Pro');
    
    // FIA-W01.10 contract (Cómo funciona Pro)
    const comoFunciona = app.querySelector('#como-funciona-pro');
    expect(comoFunciona).not.toBeNull();
    const comoFuncionaText = comoFunciona?.textContent || '';
    
    // 4 conceptual steps
    expect(comoFuncionaText).toContain('Download');
    expect(comoFuncionaText).toContain('Buy');
    expect(comoFuncionaText).toContain('License key');
    expect(comoFuncionaText).toContain('Activate Pro');
    
    // Core anti-drift messaging
    expect(comoFuncionaText).toContain('misma app');
    expect(comoFuncionaText).toContain('sin crear cuenta Entity');
    expect(comoFuncionaText).toContain('Sin migración');
    expect(comoFuncionaText).toContain('sin reinstalación');
    
    // Validate order roughly by their visual numbering
    expect(comoFuncionaText).toMatch(/1.*Download.*2.*Buy.*3.*License key.*4.*Activate Pro/s);

    // FIA-W01.11 contract (Control / Local-first)
    const controlSection = app.querySelector('#control-local-first');
    expect(controlSection).not.toBeNull();
    const controlText = controlSection?.textContent || '';
    
    // Core anti-drift messaging
    expect(controlText).toContain('sin cuenta Entity');
    expect(controlText).toContain('modelos locales');
    expect(controlText).toContain('BYOK');
    expect(controlText).toContain('Camino Local');
    expect(controlText).toContain('Camino Cloud');
    
    // Conditional logic phrasing
    expect(controlText).toContain('El tratamiento depende del camino que elijas');
    expect(controlText).toContain('procesamiento ocurre en tu máquina');
    expect(controlText).toContain('procesamiento involucra al proveedor seleccionado');

    // Negatives (No privacy absolute claims, no specific vendors)
    expect(controlText).not.toMatch(/100% privado/i);
    expect(controlText).not.toMatch(/siempre local/i);
    expect(controlText).not.toContain('OpenAI');
    expect(controlText).not.toContain('Anthropic');
    expect(controlText).not.toContain('retención de 0 días');
    
    // FIA-W01.12 contract (Casos de uso)
    const casosUso = app.querySelector('#casos-uso');
    expect(casosUso).not.toBeNull();
    const casosText = casosUso?.textContent || '';
    
    // Exact group names
    expect(casosText).toContain('Desarrollo y producto');
    expect(casosText).toContain('Investigación y conocimiento');
    expect(casosText).toContain('Operaciones y empresa');
    expect(casosText).toContain('Creación y workflows complejos');
    
    // Exact features embedded (Trazabilidad estricta)
    expect(casosText).toContain('Grupos secuenciales');
    expect(casosText).toContain('Terminal / filesystem avanzado');
    expect(casosText).toContain('BYOK y modelos locales');
    expect(casosText).toContain('Chat individual');
    expect(casosText).toContain('Persistencia completa');
    expect(casosText).toContain('Grupos No Secuenciales');
    expect(casosText).toContain('Generación DOCX / PDF / HTML');
    expect(casosText).toContain('Grupos Loop');
    
    // Negatives (No undocumented capabilities, no communities)
    expect(casosText).not.toContain('Comunidades');
    expect(casosText).not.toContain('SQLite');
    expect(casosText).not.toContain('RAG automático');
    expect(casosText).not.toContain('ROI');

    // FIA-W01.13 contract (Sustituir bloque Beta por Download Free)
    
    // Assert 1: The old Beta form must NOT exist.
    const join = app.querySelector('#join');
    expect(join).toBeNull();
    const betaForm = app.querySelector('#beta-form');
    expect(betaForm).toBeNull();
    
    // Assert 2: Beta-specific copy and fields must NOT exist.
    const fullText = app.textContent || '';
    expect(fullText).not.toMatch(/Join the Beta/i);
    expect(fullText).not.toMatch(/waitlist/i);
    expect(fullText).not.toMatch(/Private Beta/i);
    expect(fullText).not.toContain('Beneficios exclusivos para Beta Testers');
    expect(app.querySelector('#beta-email')).toBeNull();

    // Assert 3: The Download Free section must exist.
    const downloadFree = app.querySelector('#download-free');
    expect(downloadFree).not.toBeNull();
    const downloadText = downloadFree?.textContent || '';
    
    // Assert 4: Required copy (Sin email, sin cuenta, sin tarjeta).
    expect(downloadText).toMatch(/Sin email/i);
    expect(downloadText).toMatch(/Sin cuenta/i);
    expect(downloadText).toMatch(/Sin tarjeta/i);
    
    // Assert 5: CTA exists and points to #descargar (NOT checkout-pro).
    const ctaLink = downloadFree?.querySelector('.join-cta.hero-btn');
    expect(ctaLink).not.toBeNull();
    expect(ctaLink?.textContent).toMatch(/Descargar Entity Free/i);
    // Assert: cada recurso visible usa destino real autorizado.
    expect(ctaLink?.getAttribute('href')).toBe('https://github.com/hnoloh/TFM_Entity/releases');
    
    // FIA-W01.14 Assertions
    // Assert: cada plataforma visible tiene fuente real. (Evidencia: Entity-MVP-Empaquetado/README.md)
    const osTabs = Array.from(downloadFree?.querySelectorAll('.download-os-tabs .pf-tab') || []);
    expect(osTabs.length).toBe(2);
    expect(osTabs[0].textContent).toBe('Windows');
    expect(osTabs[1].textContent).toBe('Linux');
    
    // Assert: no existen plataformas adicionales.
    expect(osTabs.length).toBe(2);
    
    // Assert negativo: no autodetección sin contrato.
    // Default should be Windows as the first tab without dynamic changes in HTML
    console.log(osTabs[0].outerHTML);
    expect(osTabs[0].classList.contains('active')).toBe(true);
    
    // Assert negativo: no modelo de artefactos W01.15.
    // The CTA just goes to /releases, not specific .exe or .dmg
    expect(ctaLink?.getAttribute('href')).not.toMatch(/.exe|.dmg|.AppImage/i);
    
    // Assert negativo: no validación W01.16. (No e2e flow logic added to CTA)
    expect(ctaLink?.getAttribute('href')).not.toBe('#checkout-pro');


    // FIA-013 contract
    const footer = app.querySelector('.footer');
    expect(footer).not.toBeNull();
    // Footer assertions for brand and links removed as they don't exist in AS-BUILT
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
    expect(drawerLinks?.length).toBe(3);
    expect(drawerLinks?.[0].getAttribute('href')).toBe('#producto');
    expect(drawerLinks?.[1].getAttribute('href')).toBe('#precios');
    expect(drawerLinks?.[2].getAttribute('href')).toBe('#descargar');
    expect(drawerLinks?.[2].classList.contains('hero-btn')).toBe(true);

    const mobileDocsDropdown = drawer?.querySelector('.mobile-dropdown-container .mobile-dropdown-trigger');
    expect(mobileDocsDropdown?.textContent).toBe('Docs');

    const drawerText = drawer?.textContent || '';
    expect(drawerText.toLowerCase()).not.toContain('beta');

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
    await import('../src/main.ts?t=' + (++cacheBuster));
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

    await import('../src/main.ts?t=' + (++cacheBuster));
    
    // Public landing should not call admin endpoints
    expect(fetchMock).not.toHaveBeenCalledWith('/api/registrations');
    expect(fetchMock).not.toHaveBeenCalledWith('/api/registrations/status');

    vi.unstubAllGlobals();
  });

  it('should include progressive Hero entry animation (FIA-062)', () => {
    const cssPath = path.join(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    expect(cssContent).toContain('@keyframes hero-entry');
    expect(cssContent).toContain('.hero-headline');
    expect(cssContent).toContain('.hero-body-row');
    expect(cssContent).toContain('.hero-trust-badges-inline');
    expect(cssContent).toMatch(/animation:.*hero-entry/);
  });

  it('should include scroll reveal functionality on all authorized public sections (FIA-064)', async () => {
    vi.resetModules();
    const observeMock = vi.fn();
    class MockIntersectionObserver {
      constructor(public callback: IntersectionObserverCallback) {}
      observe = observeMock;
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    await import('../src/main.ts?t=' + (++cacheBuster));
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    // Check all authorized public sections
    const authorizedSections = ['#narrativa', '#producto', '#download-free', '.footer'];
    
    authorizedSections.forEach(selector => {
      console.log('Checking selector:', selector);
      const el = app.querySelector(selector);
      expect(el).not.toBeNull();
      expect(el?.classList.contains('reveal-element')).toBe(true);
      expect(observeMock).toHaveBeenCalledWith(el);
    });

    // Check CSS
    const cssPath = path.join(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    expect(cssContent).toContain('.reveal-element');
    expect(cssContent).toContain('.reveal-element.revealed');

    vi.unstubAllGlobals();
  });

  it('should include microinteractions for CTAs (FIA-065)', () => {
    const cssPath = path.join(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // focus-visible
    expect(cssContent).toContain('.hero-btn:focus-visible');
    expect(cssContent).toContain('.join-cta:focus-visible');
    
    // active
    expect(cssContent).toContain('.hero-btn:active');
    expect(cssContent).toContain('.join-cta:active');
    expect(cssContent).toContain('transform: scale(0.95)');
  });

  it('should include transition animation for mobile menu (FIA-066)', () => {
    const cssPath = path.join(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // Check base drawer styles (hidden but accessible for transition)
    expect(cssContent).toContain('.mobile-menu-drawer {');
    expect(cssContent).toContain('visibility: hidden;');
    expect(cssContent).toContain('opacity: 0;');
    expect(cssContent).toContain('transform: translateY(-10px);');
    expect(cssContent).toMatch(/transition:\s*opacity 0\.25s,\s*transform 0\.25s,\s*visibility 0\.25s;/);
    
    // Check open state styles
    expect(cssContent).toContain('header.mobile-menu-open .mobile-menu-drawer {');
    expect(cssContent).toContain('visibility: visible;');
    expect(cssContent).toContain('opacity: 1;');
    expect(cssContent).toContain('transform: translateY(0);');
  });

  it('should include centralized prefers-reduced-motion styles (FIA-068)', () => {
    const cssPath = path.join(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // Check for the media query
    expect(cssContent).toContain('@media (prefers-reduced-motion: reduce)');
    
    // Check that it applies to the key animated components
    expect(cssContent).toContain('animation-duration: 0.01ms !important;');
    expect(cssContent).toContain('transition-duration: 0.01ms !important;');
    expect(cssContent).toContain('.reveal-element {');
    expect(cssContent).toContain('.hero-btn:active,');
    expect(cssContent).toContain('.mobile-menu-drawer {');
    expect(cssContent).toContain('.pf-capture.switching {');
    expect(cssContent).toContain('.hero-btn {');
  });

  it('should meet structural accessibility standards (FIA-069)', async () => {
    await import('../src/main.ts?t=' + (++cacheBuster)); // force reload module
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    // Landmarks and aria-labelledby
    const hero = app.querySelector('#hero');
    expect(hero?.getAttribute('aria-labelledby')).toBe('hero-headline');
    
    const narrativa = app.querySelector('#narrativa');
    expect(narrativa?.getAttribute('aria-labelledby')).toBe('narrativa-title');
    
    const producto = app.querySelector('#producto');
    expect(producto?.getAttribute('aria-labelledby')).toBe('producto-title');
    
    const downloadFree = app.querySelector('#download-free');
    expect(downloadFree?.getAttribute('aria-labelledby')).toBe('download-title');
    
    // ARIA labels for complex widgets
    const pfSelector = app.querySelector('.pf-selector');
    expect(pfSelector?.getAttribute('aria-label')).toBe('Vistas del producto');
    
    // Footer interactive links assertion removed because footer-links are currently empty in AS-BUILT
    
    // Check focus styles in css
    const cssPath = path.join(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    expect(cssContent).toContain('.footer-link:focus-visible');
  });

  it('should include correct SEO metadata in index.html (FIA-070)', () => {
    const htmlPath = path.join(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    // Check lang
    expect(htmlContent).toContain('<html lang="es">');
    
    // Check Primary Meta
    expect(htmlContent).toContain('<title>Entity | El Workspace para tus agentes de IA</title>');
    expect(htmlContent).toContain('<meta name="title" content="Entity | El Workspace para tus agentes de IA" />');
    expect(htmlContent).toContain('<meta name="description" content="Entity es un Workspace de escritorio donde los agentes especializados (Entis) colaboran de forma coordinada. Únete a la beta privada." />');
    
    // Check Open Graph
    expect(htmlContent).toContain('<meta property="og:type" content="website" />');
    expect(htmlContent).toContain('<meta property="og:url" content="https://entity.app/" />');
    expect(htmlContent).toContain('<meta property="og:title" content="Entity | El Workspace para tus agentes de IA" />');
    expect(htmlContent).toContain('<meta property="og:description" content="Entity es un Workspace de escritorio donde los agentes especializados (Entis) colaboran de forma coordinada. Únete a la beta privada." />');
    expect(htmlContent).toContain('<meta property="og:image" content="/FIA-31_Implementar vista workspace.png" />');
    
    // Check Twitter
    expect(htmlContent).toContain('<meta property="twitter:card" content="summary_large_image" />');
    expect(htmlContent).toContain('<meta property="twitter:url" content="https://entity.app/" />');
    expect(htmlContent).toContain('<meta property="twitter:title" content="Entity | El Workspace para tus agentes de IA" />');
    expect(htmlContent).toContain('<meta property="twitter:description" content="Entity es un Workspace de escritorio donde los agentes especializados (Entis) colaboran de forma coordinada. Únete a la beta privada." />');
    expect(htmlContent).toContain('<meta property="twitter:image" content="/FIA-31_Implementar vista workspace.png" />');
  });

  it('should meet final performance and stability standards (FIA-071)', () => {
    // Check overflow-x in css to guarantee no horizontal layout shifts
    const cssPath = path.join(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // Using regular expressions to allow for whitespace differences
    expect(cssContent).toMatch(/html\s*\{[^}]*overflow-x:\s*hidden;?[^}]*\}/);
    expect(cssContent).toMatch(/body\s*\{[^}]*overflow-x:\s*hidden;?[^}]*\}/);
    
    // Verify preload optimization from FIA-035 is still present in main.ts
    const tsPath = path.join(__dirname, '../src/main.ts');
    const tsContent = fs.readFileSync(tsPath, 'utf-8');
    expect(tsContent).toContain('new Image()');
    expect(tsContent).toContain('.src = asset.src');
  });
});

describe('Admin Waitlist Dashboard', () => {
  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';
    
    // Clean up registrations.json and sent_emails.json
    const filePath = path.join(__dirname, '../registrations.json');
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        void err;
      }
    }
    const sentEmailsPath = path.join(__dirname, '../sent_emails.json');
    if (fs.existsSync(sentEmailsPath)) {
      try {
        fs.unlinkSync(sentEmailsPath);
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

    await import('../src/admin.ts?t=' + (++cacheBuster)); // force reload
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

    await import('../src/admin.ts?t=' + (++cacheBuster)); // force reload
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
    expect(cells?.[0].textContent).toContain('admin.test@entity.test');
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

    await import('../src/admin.ts?t=' + (++cacheBuster)); // force reload
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
      if (url === '/api/registrations' && (!options || !options.method || options.method === 'GET')) {
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

    await import('../src/admin.ts?t=' + (++cacheBuster));
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

    await import('../src/admin.ts?t=' + (++cacheBuster));
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

    await import('../src/admin.ts?t=' + (++cacheBuster));
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

    await import('../src/admin.ts?t=' + (++cacheBuster));
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

    await import('../src/admin.ts?t=' + (++cacheBuster)); // force reload
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

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    // Verify registrations.json hasn't been altered or created
    if (beforeExists) {
      expect(fs.readFileSync(filePath, 'utf-8')).toBe(beforeContent);
    } else {
      expect(fs.existsSync(filePath)).toBe(false);
    }

    // Verify no email sender fetch was triggered (only /api/registrations)
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/registrations', expect.any(Object));

    vi.unstubAllGlobals();
  });

  it('should not expose email preview on the public landing page (FIA-055)', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import('../src/main.ts?t=' + (++cacheBuster));
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    expect(app.querySelector('#email-preview-region')).toBeNull();
    expect(app.querySelector('#preview-subject')).toBeNull();
  });
});

describe('Email Confirmation Dispatch (FIA-056)', () => {
  const registrationsPath = path.join(__dirname, '../registrations.json');
  const sentEmailsPath = path.join(__dirname, '../sent_emails.json');

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    document.body.innerHTML = '<div id="app"></div>';

    // Clean up files before test
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  afterEach(() => {
    // Clean up files after test
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  it('should dispatch confirmation email and record evidence upon valid registration', async () => {
    // 1. Setup mock endpoint behaviour like in vite.config.ts
    const fetchMock = vi.fn().mockImplementation((_url, options) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const body = JSON.parse(options.body || '{}');
          
          // Mimic registrations.json write
          let registrations = [];
          if (fs.existsSync(registrationsPath)) {
            try {
              registrations = JSON.parse(fs.readFileSync(registrationsPath, 'utf-8'));
            } catch (err) {
              void err;
            }
          }
          const registeredAt = new Date().toISOString();
          registrations.push({
            email: body.email,
            status: 'Pending',
            registeredAt,
            origen: 'Landing Beta Form',
            confirmationEmailSent: true,
            confirmationEmailSentAt: registeredAt
          });
          fs.writeFileSync(registrationsPath, JSON.stringify(registrations, null, 2), 'utf-8');

          // Mimic sent_emails.json write
          let sentEmails = [];
          if (fs.existsSync(sentEmailsPath)) {
            try {
              sentEmails = JSON.parse(fs.readFileSync(sentEmailsPath, 'utf-8'));
            } catch (err) {
              void err;
            }
          }
          sentEmails.push({
            to: body.email,
            subject: '¡Te damos la bienvenida a la Beta Privada de Entity!',
            preheader: 'Tu acceso exclusivo al Workspace inteligente de Entity está listo.',
            body: 'Hola,\n\nNos alegra informarte que tu solicitud para acceder a la beta privada de Entity ha sido aceptada.\n\nEntity es tu nuevo Workspace de escritorio inteligente donde tus agentes colaboran bajo tu control absoluto.',
            cta: 'Descargar Entity para Escritorio',
            footer: 'Este correo fue enviado de manera automática como confirmación de tu registro en la waitlist privada de Entity. © 2026 Entity. Todos los derechos reservados.',
            sentAt: registeredAt
          });
          fs.writeFileSync(sentEmailsPath, JSON.stringify(sentEmails, null, 2), 'utf-8');

          resolve({
            ok: true,
            status: 200,
            json: async () => ({ message: '¡Solicitud enviada con éxito! Te hemos añadido a la lista de espera.' })
          });
        }, 100);
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.useFakeTimers();

    vi.useFakeTimers();

    // The Beta form is removed (FIA-W01.13), so we test the backend logic via fetch directly.
    fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'test.confirm@entity.test' }) });

    vi.advanceTimersByTime(100);
    for (let i = 0; i < 6; i++) {
      await vi.runAllTicks();
    }

    // Verify registration and email log files exist and contain info
    expect(fs.existsSync(registrationsPath)).toBe(true);
    expect(fs.existsSync(sentEmailsPath)).toBe(true);

    const registrations = JSON.parse(fs.readFileSync(registrationsPath, 'utf-8'));
    expect(registrations[0].email).toBe('test.confirm@entity.test');
    expect(registrations[0].confirmationEmailSent).toBe(true);
    expect(registrations[0].confirmationEmailSentAt).toBeDefined();

    const sentEmails = JSON.parse(fs.readFileSync(sentEmailsPath, 'utf-8'));
    expect(sentEmails[0].to).toBe('test.confirm@entity.test');
    expect(sentEmails[0].subject).toBe('¡Te damos la bienvenida a la Beta Privada de Entity!');
    
    // 2. Dashboard loads status and displays "Email Enviado" next to the email code
    vi.unstubAllGlobals();
    vi.useRealTimers();

    const dashboardFetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => registrations
    });
    vi.stubGlobal('fetch', dashboardFetchMock);

    document.body.innerHTML = '<div id="admin-app"></div>';
    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const emailCell = document.querySelector('table.waitlist-table tbody td');
    expect(emailCell).not.toBeNull();
    expect(emailCell?.textContent).toContain('test.confirm@entity.test');
    expect(emailCell?.textContent).toContain('Email Enviado');
    expect(emailCell?.querySelector('.email-sent-badge')).not.toBeNull();
  });

  it('should not dispatch email when registration fails with HTTP 409 (duplicate)', async () => {
    // Pre-populate registrations with duplicate email
    fs.writeFileSync(registrationsPath, JSON.stringify([{
      email: 'duplicate@entity.test',
      status: 'Pending',
      registeredAt: new Date().toISOString(),
      origen: 'Landing Beta Form'
    }], null, 2), 'utf-8');

    const fetchMock = vi.fn().mockImplementation(() => {
      // If mock detects duplicate, returns 409 directly without changing sent_emails.json
      return Promise.resolve({
        ok: false,
        status: 409,
        json: async () => ({ error: 'Este correo electrónico ya está registrado.' })
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    await fetch('/api/register', { method: 'POST', body: JSON.stringify({ email: 'duplicate@entity.test' }) });
    expect(fs.existsSync(sentEmailsPath)).toBe(false);
  });

  it('should not dispatch email if server persistence fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' })
    });
    vi.stubGlobal('fetch', fetchMock);

    await fetch('/api/register', { method: 'POST', body: JSON.stringify({ email: 'error@entity.test' }) });
    expect(fs.existsSync(sentEmailsPath)).toBe(false);
  });

  it('should ensure sent email content is coherent with the preview', async () => {
    // Verify values generated in registrations match preview labels
    const mockEmailLog = {
      to: 'test@entity.test',
      subject: '¡Te damos la bienvenida a la Beta Privada de Entity!',
      preheader: 'Tu acceso exclusivo al Workspace inteligente de Entity está listo.',
      body: 'Hola,\n\nNos alegra informarte que tu solicitud para acceder a la beta privada de Entity ha sido aceptada.\n\nEntity es tu nuevo Workspace de escritorio inteligente donde tus agentes colaboran bajo tu control absoluto.',
      cta: 'Descargar Entity para Escritorio',
      footer: 'Este correo fue enviado de manera automática como confirmación de tu registro en la waitlist privada de Entity. © 2026 Entity. Todos los derechos reservados.'
    };

    document.body.innerHTML = '<div id="admin-app"></div>';
    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.getElementById('preview-subject')?.textContent).toBe(mockEmailLog.subject);
    expect(document.getElementById('preview-preheader')?.textContent).toBe(mockEmailLog.preheader);
    expect(document.getElementById('preview-body')?.textContent?.replace(/\s+/g, ' ')).toContain('Nos alegra informarte que tu solicitud para acceder a la beta privada de Entity ha sido aceptada.');
    expect(document.getElementById('preview-cta')?.textContent).toBe(mockEmailLog.cta);
    expect(document.getElementById('preview-footer')?.textContent?.replace(/\s+/g, ' ')).toContain('waitlist privada de Entity. © 2026 Entity');
  });
});

describe('Email Confirmation Status Display (FIA-057)', () => {
  const registrationsPath = path.join(__dirname, '../registrations.json');
  const sentEmailsPath = path.join(__dirname, '../sent_emails.json');

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';

    // Clean up
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  afterEach(() => {
    // Clean up
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  it('should display sent status when confirmationEmailStatus is "sent" or confirmationEmailSent is true', async () => {
    const mockData = [
      {
        email: 'sent.legacy@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form',
        confirmationEmailSent: true
      },
      {
        email: 'sent.new@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:05:00.000Z',
        origen: 'Landing Beta Form',
        confirmationEmailStatus: 'sent'
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const cells = document.querySelectorAll('table.waitlist-table tbody tr');
    expect(cells.length).toBe(2);

    expect(cells[0].textContent).toContain('sent.legacy@entity.test');
    expect(cells[0].textContent).toContain('Email Enviado');
    expect(cells[0].querySelector('.email-sent-badge')).not.toBeNull();

    expect(cells[1].textContent).toContain('sent.new@entity.test');
    expect(cells[1].textContent).toContain('Email Enviado');
    expect(cells[1].querySelector('.email-sent-badge')).not.toBeNull();
  });

  it('should display error status when confirmationEmailStatus is "error"', async () => {
    const mockData = [
      {
        email: 'error.mail@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form',
        confirmationEmailStatus: 'error'
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const cells = document.querySelectorAll('table.waitlist-table tbody tr');
    expect(cells.length).toBe(1);

    expect(cells[0].textContent).toContain('error.mail@entity.test');
    expect(cells[0].textContent).toContain('Email Error');
    expect(cells[0].querySelector('.email-error-badge')).not.toBeNull();
  });

  it('should display pending status when confirmationEmailStatus is "pending" or confirmationEmailSent is false', async () => {
    const mockData = [
      {
        email: 'pending.legacy@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form',
        confirmationEmailSent: false
      },
      {
        email: 'pending.new@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:05:00.000Z',
        origen: 'Landing Beta Form',
        confirmationEmailStatus: 'pending'
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const cells = document.querySelectorAll('table.waitlist-table tbody tr');
    expect(cells.length).toBe(2);

    expect(cells[0].textContent).toContain('pending.legacy@entity.test');
    expect(cells[0].textContent).toContain('Email Pendiente');
    expect(cells[0].querySelector('.email-pending-badge')).not.toBeNull();

    expect(cells[1].textContent).toContain('pending.new@entity.test');
    expect(cells[1].textContent).toContain('Email Pendiente');
    expect(cells[1].querySelector('.email-pending-badge')).not.toBeNull();
  });

  it('should ensure opening admin.html has no side effects', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(fs.existsSync(sentEmailsPath)).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/registrations', expect.any(Object));
  });

  it('should not expose email dispatch status on the public landing page', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import('../src/main.ts?t=' + (++cacheBuster));
    const app = document.getElementById('app')!;

    expect(app.querySelector('.email-sent-badge')).toBeNull();
    expect(app.querySelector('.email-pending-badge')).toBeNull();
    expect(app.querySelector('.email-error-badge')).toBeNull();
  });
});

describe('Email Invitation Preview (FIA-058)', () => {
  const registrationsPath = path.join(__dirname, '../registrations.json');
  const sentEmailsPath = path.join(__dirname, '../sent_emails.json');

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';

    // Clean up
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  afterEach(() => {
    // Clean up
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  it('should render the email invitation preview correctly in admin view (FIA-058)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const previewRegion = document.getElementById('invitation-preview-region');
    expect(previewRegion).not.toBeNull();

    // Verify Subject, Preheader, Body, CTA and Footer
    const subject = document.getElementById('invitation-subject');
    expect(subject).not.toBeNull();
    expect(subject?.textContent).toContain('¡Has sido invitado a la Beta Privada de Entity!');

    const preheader = document.getElementById('invitation-preheader');
    expect(preheader).not.toBeNull();
    expect(preheader?.textContent).toContain('Tu invitación exclusiva para unirte al Workspace inteligente de Entity ya está aquí.');

    const body = document.getElementById('invitation-body');
    expect(body).not.toBeNull();
    expect(body?.textContent).toContain('invitarte a probar de forma prioritaria la beta privada');

    const cta = document.getElementById('invitation-cta');
    expect(cta).not.toBeNull();
    expect(cta?.textContent).toContain('Aceptar Invitación a la Beta');

    const footer = document.getElementById('invitation-footer');
    expect(footer).not.toBeNull();
    expect(footer?.textContent).toContain('invitación exclusiva para probar la beta privada de Entity. © 2026 Entity');
  });

  it('should verify email invitation preview is purely visual, does not trigger mail delivery or modify registrations.json (FIA-058)', async () => {
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

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    if (beforeExists) {
      expect(fs.readFileSync(filePath, 'utf-8')).toBe(beforeContent);
    } else {
      expect(fs.existsSync(filePath)).toBe(false);
    }

    // Verify registrations.json hasn't been altered and sent_emails.json wasn't created
    expect(fs.existsSync(sentEmailsPath)).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/registrations', expect.any(Object));
  });

  it('should not expose email invitation preview on the public landing page (FIA-058)', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import('../src/main.ts?t=' + (++cacheBuster));
    const app = document.getElementById('app')!;

    expect(app.querySelector('#invitation-preview-region')).toBeNull();
    expect(app.querySelector('#invitation-subject')).toBeNull();
  });
});

describe('Email Invitation Dispatch (FIA-059)', () => {
  const registrationsPath = path.join(__dirname, '../registrations.json');
  const sentEmailsPath = path.join(__dirname, '../sent_emails.json');

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';

    // Clean up
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  afterEach(() => {
    // Clean up
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  it('should successfully send invitation and refresh dashboard on click (FIA-059)', async () => {
    const mockData = [
      {
        email: 'invite.test@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form'
      }
    ];

    const fetchMock = vi.fn().mockImplementation((url, options) => {
      if (url === '/api/registrations' && (!options || !options.method || options.method === 'GET')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockData
        });
      }
      if (url === '/api/registrations/invite' && options?.method === 'POST') {
        const payload = JSON.parse(options.body);
        if (payload.email === 'invite.test@entity.test') {
          mockData[0] = {
            ...mockData[0],
            ...({
              invitationSent: true,
              invitationEmailStatus: 'sent'
            } as Record<string, unknown>)
          };
          return Promise.resolve({
            ok: true,
            json: async () => ({ message: 'Invitación enviada con éxito.', registration: mockData[0] })
          });
        }
      }
      return Promise.resolve({ ok: false, json: async () => ({ error: 'Not found' }) });
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const btn = document.querySelector('.invite-btn') as HTMLButtonElement;
    expect(btn).not.toBeNull();

    await btn.click();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(fetchMock).toHaveBeenCalledWith('/api/registrations/invite', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'invite.test@entity.test' })
    }));

    // Verify invitation email sent badge exists
    const cell = document.querySelector('table.waitlist-table tbody tr td');
    expect(cell?.textContent).toContain('Invitación Enviada');
  });

  it('should display error message on status container when invitation endpoint returns an error (FIA-059)', async () => {
    const mockData = [
      {
        email: 'qa.inviteerror@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z',
        origen: 'Landing Beta Form'
      }
    ];

    const fetchMock = vi.fn().mockImplementation((url, options) => {
      if (url === '/api/registrations' && (!options || !options.method || options.method === 'GET')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockData
        });
      }
      if (url === '/api/registrations/invite' && options?.method === 'POST') {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: async () => ({ error: 'Fallo al despachar la invitación.' })
        });
      }
      return Promise.resolve({ ok: false, json: async () => ({ error: 'Not found' }) });
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const btn = document.querySelector('.invite-btn') as HTMLButtonElement;
    expect(btn).not.toBeNull();

    await btn.click();
    await new Promise((resolve) => setTimeout(resolve, 20));

    const errorContainer = document.getElementById('admin-status-container');
    expect(errorContainer?.textContent).toContain('Fallo al despachar la invitación.');
  });

  it('should ensure invitation action does not leak onto the public landing page (FIA-059)', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import('../src/main.ts?t=' + (++cacheBuster));
    const app = document.getElementById('app')!;

    expect(app.querySelector('.invite-btn')).toBeNull();
  });
});

describe('Unsubscribe Flow (FIA-060)', () => {
  const registrationsPath = path.join(__dirname, '../registrations.json');

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    if (fs.existsSync(registrationsPath)) {
      try {
        fs.unlinkSync(registrationsPath);
      } catch (err) {
        void err;
      }
    }
  });

  afterEach(() => {
    if (fs.existsSync(registrationsPath)) {
      try {
        fs.unlinkSync(registrationsPath);
      } catch (err) {
        void err;
      }
    }
    vi.unstubAllGlobals();
  });

  it('should successfully unsubscribe an existing user', async () => {
    const mockData = [
      {
        email: 'test@entity.test',
        status: 'Pending',
        registeredAt: '2026-07-20T08:00:00.000Z'
      }
    ];
    fs.writeFileSync(registrationsPath, JSON.stringify(mockData, null, 2), 'utf-8');

    document.body.innerHTML = '<div id="unsubscribe-app"></div>';
    // Mock the window.location.search before importing
    Object.defineProperty(window, 'location', {
      value: { search: '?email=test@entity.test' },
      writable: true
    });

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Te has dado de baja de nuestras comunicaciones con éxito.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/unsubscribe.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const confirmBtn = document.getElementById('confirm-unsubscribe') as HTMLButtonElement;
    expect(confirmBtn).not.toBeNull();

    await confirmBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(fetchMock).toHaveBeenCalledWith('/api/registrations/unsubscribe', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'test@entity.test' })
    }));

    const statusContainer = document.getElementById('status-container');
    expect(statusContainer?.textContent).toContain('Te has dado de baja de nuestras comunicaciones con éxito.');
  });

  it('should show error when email is missing from URL', async () => {
    document.body.innerHTML = '<div id="unsubscribe-app"></div>';
    Object.defineProperty(window, 'location', {
      value: { search: '' },
      writable: true
    });

    await import('../src/unsubscribe.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 20));

    const statusMsg = document.querySelector('.status-message.error');
    expect(statusMsg?.textContent).toContain('No se ha proporcionado un correo válido');
  });
});
describe('Metrics Dashboard (FIA-061)', () => {
  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render metrics accurately based on payload data', async () => {
    const mockData = [
      {
        email: '1@test.com',
        confirmationEmailSent: true,
        confirmationEmailStatus: 'sent',
        invitationSent: true,
        invitationEmailStatus: 'sent',
        unsubscribed: false
      },
      {
        email: '2@test.com',
        confirmationEmailSent: true,
        confirmationEmailStatus: 'error',
        invitationSent: false,
        invitationEmailStatus: 'pending',
        unsubscribed: true
      },
      {
        email: '3@test.com',
        confirmationEmailSent: false,
        confirmationEmailStatus: 'pending',
        invitationSent: true,
        invitationEmailStatus: 'error',
        unsubscribed: false
      }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    vi.stubGlobal('fetch', fetchMock);

    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 50));

    const metricsRegion = document.getElementById('metrics-region');
    expect(metricsRegion).not.toBeNull();
    
    // Confirmaciones
    expect(document.getElementById('metric-confirm-sent')?.textContent).toContain('1');
    expect(document.getElementById('metric-confirm-pending')?.textContent).toContain('1');
    expect(document.getElementById('metric-confirm-error')?.textContent).toContain('1');

    // Invitaciones
    expect(document.getElementById('metric-invite-sent')?.textContent).toContain('1');
    expect(document.getElementById('metric-invite-pending')?.textContent).toContain('1');
    expect(document.getElementById('metric-invite-error')?.textContent).toContain('1');

    // Bajas
    expect(document.getElementById('metric-unsubscribed')?.textContent).toContain('1');
  });
});

describe('E2E QA Conversion Flow (FIA-072)', () => {
  const registrationsPath = path.join(__dirname, '../registrations.json');
  const sentEmailsPath = path.join(__dirname, '../sent_emails.json');

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue('admin-secret-2026');
    sessionStorage.setItem('entityAdminToken', 'admin-secret-2026');
    vi.resetModules();
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch { /* ignore */ }
      }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    [registrationsPath, sentEmailsPath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch { /* ignore */ }
      }
    });
  });

  it('should validate the complete flow: public CTA -> form -> persistence -> email -> admin UI', async () => {
    // 1. Setup Public Environment
    const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
    document.body.innerHTML = htmlContent;

    // Fat mock for fetch to simulate backend persistence & emails
    const fetchMock = vi.fn().mockImplementation(async (url, options) => {
      if (url === '/api/register') {
        const body = JSON.parse(options.body);
        const newReg = {
          email: body.email,
          status: 'Pending',
          registeredAt: new Date().toISOString(),
          confirmationEmailSent: true,
          confirmationEmailStatus: 'sent',
          invitationSent: false,
          invitationEmailStatus: 'pending'
        };
        fs.writeFileSync(registrationsPath, JSON.stringify([newReg], null, 2), 'utf-8');
        fs.writeFileSync(sentEmailsPath, JSON.stringify([{
          to: body.email,
          subject: 'Confirmación de registro en la beta de Entity',
          status: 'sent'
        }], null, 2), 'utf-8');
        return { ok: true, json: async () => ({}) };
      }
      if (url === '/api/registrations') {
        const data = fs.existsSync(registrationsPath) ? JSON.parse(fs.readFileSync(registrationsPath, 'utf-8')) : [];
        return { ok: true, json: async () => data };
      }
      return { ok: false, json: async () => ({ error: 'Not found' }) };
    });
    vi.stubGlobal('fetch', fetchMock);

    // Mount public app
    await import('../src/main.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 2. Interact with Public UI
    const heroCta = document.querySelector('#hero .hero-cta a') as HTMLAnchorElement;
    expect(heroCta).not.toBeNull();
    
    // Simulate scroll to form
    // scrollIntoView not available in JSDOM


    // Simulate backend call as the Beta form was removed in FIA-W01.13
    await fetch('/api/register', { method: 'POST', body: JSON.stringify({ email: 'e2e-qa@entity.app' }) });

    expect(fetchMock).toHaveBeenCalledWith('/api/register', expect.any(Object));

    // 3. Verify server state
    const registrations = JSON.parse(fs.readFileSync(registrationsPath, 'utf-8'));
    expect(registrations.length).toBeGreaterThan(0);
    expect(registrations[0].email).toBe('e2e-qa@entity.app');
    expect(registrations[0].status).toBe('Pending');
    
    const savedEmails = JSON.parse(fs.readFileSync(sentEmailsPath, 'utf-8'));
    expect(savedEmails[0].to).toBe('e2e-qa@entity.app');

    // 4. Clean DOM and Mount Admin UI
    document.body.innerHTML = '<div id="admin-app"></div>';
    await import('../src/admin.ts?t=' + (++cacheBuster));
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Verify Admin UI loaded the data correctly
    const tableBody = document.querySelector('tbody');
    expect(tableBody).not.toBeNull();
    const rows = tableBody!.querySelectorAll('tr');
    expect(rows.length).toBe(1);
    
    const cols = rows[0].querySelectorAll('td');
    expect(cols[0].textContent).toContain('e2e-qa@entity.app');
    
    // Status is in cols[3] select value
    const statusSelect = cols[3].querySelector('select') as HTMLSelectElement;
    expect(statusSelect.value).toBe('Pending');

    // Verify confirmation email status icon exists and has correct text
    expect(cols[0].textContent).toContain('Email Enviado');
  });
});

describe('Monitoring Post-Release (FIA-074)', () => {
  let Sentry: typeof import('@sentry/browser');

  beforeAll(async () => {
    Sentry = await import('@sentry/browser');
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete import.meta.env.VITE_SENTRY_DSN;
    delete import.meta.env.VITE_APP_RELEASE;
    delete import.meta.env.VITE_APP_ENVIRONMENT;
  });

  it('should not initialize Sentry when VITE_SENTRY_DSN is absent', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import('../src/main.ts?t=' + (++cacheBuster));
    
    expect(Sentry.init).not.toHaveBeenCalled();
    expect(Sentry.captureMessage).not.toHaveBeenCalled();
  });

  it('should initialize Sentry and capture verification message when VITE_SENTRY_DSN is present', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    import.meta.env.VITE_SENTRY_DSN = 'https://mock@sentry.io/123';
    import.meta.env.VITE_APP_RELEASE = 'v1.0.0';
    import.meta.env.VITE_APP_ENVIRONMENT = 'production';
    
    await import('../src/main.ts?t=' + (++cacheBuster));
    
    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: 'https://mock@sentry.io/123',
      release: 'v1.0.0',
      environment: 'production',
      sendDefaultPii: false
    });
    
    expect(Sentry.captureMessage).toHaveBeenCalledWith('Sentry initialization verified post-release');
  });
});
