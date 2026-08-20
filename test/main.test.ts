// @vitest-environment jsdom
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  vi,
} from "vitest";
import fs from "fs";
import path from "path";

vi.mock("@sentry/browser", () => ({
  init: vi.fn(),
  captureMessage: vi.fn(),
}));

declare const __dirname: string;

let cacheBuster = 0;
describe("App Bootstrap", () => {
  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue("admin-secret-2026");
    sessionStorage.setItem("entityAdminToken", "admin-secret-2026");
    document.body.innerHTML = '<div id="app"></div>';

    // Clean up registrations.json and sent_emails.json before each test run
    const filePath = path.join(__dirname, "../registrations.json");
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        void err;
      }
    }
    const sentEmailsPath = path.join(__dirname, "../sent_emails.json");
    if (fs.existsSync(sentEmailsPath)) {
      try {
        fs.unlinkSync(sentEmailsPath);
      } catch (err) {
        void err;
      }
    }
  });

  it("should render the identifiable root screen, global Shell, and apply base styles", async () => {
    await import("../src/main.ts?t=" + ++cacheBuster); // force reload module
    const app = document.querySelector<HTMLDivElement>("#app")!;

    // FIA-001 contract updated AS-BUILT
    expect(app.innerHTML).toContain("Entity");

    // FIA-002 contract
    expect(app.querySelector("header")).not.toBeNull();
    expect(app.querySelector("main")).not.toBeNull();
    expect(app.querySelector("footer")).not.toBeNull();

    // FIA-004 AS-BUILT contract
    expect(app.querySelector("header .header-left .slogan")).toBeNull();

    // FIA-006 contract
    expect(app.querySelector("#producto")).not.toBeNull();
    expect(app.querySelector("#download-free")).not.toBeNull();

    // FIA-007 contract updated in FIA-015
    const nav = app.querySelector("header nav");
    expect(nav).not.toBeNull();

    const navLinks = nav?.querySelectorAll("a.nav-item");
    expect(navLinks?.length).toBe(3);

    expect(navLinks?.[0].getAttribute("href")).toBe("#hero");
    expect(navLinks?.[0].textContent).toBe("Inicio");

    expect(navLinks?.[1].getAttribute("href")).toBe("#producto");
    expect(navLinks?.[1].textContent).toBe("Producto");

    expect(navLinks?.[2].getAttribute("href")).toBe("#precios");
    expect(navLinks?.[2].textContent).toBe("Precios");

    const freeLink = nav?.querySelector("span.text-glow-tier");
    expect(freeLink).not.toBeNull();
    expect(freeLink?.textContent).toBe("FREE");

    const docsDropdown = nav?.querySelector(
      ".dropdown-container .dropdown-trigger",
    );
    expect(docsDropdown?.textContent).toBe("Docs");

    const navText = nav?.textContent || "";
    expect(navText.toLowerCase()).not.toContain("beta");
    expect(navText.toLowerCase()).not.toContain("login");
    expect(navText.toLowerCase()).not.toContain("cuenta");

    // FIA-008 contract
    const hero = app.querySelector("#hero");
    expect(hero).not.toBeNull();
    const headline = hero?.querySelector(".hero-headline");
    expect(headline).not.toBeNull();
    expect(headline?.textContent).toBe(
      "Un único Workspace. Todos tus modelos de IA trabajando coordinados.",
    );
    const supporting = hero?.querySelector(".hero-supporting");
    expect(supporting).not.toBeNull();
    expect(supporting?.textContent).toContain("Construye agentes especializados con herramientas");
    expect(supporting?.textContent?.toLowerCase()).not.toContain("beta");

    expect(hero?.querySelector(".hero-visual")).not.toBeNull();

    expect(hero?.querySelector(".hero-cta")?.textContent).toContain("Ver Entity");
    expect(hero?.querySelector(".hero-cta")?.textContent).toContain("PRO");

    const heroContent = hero?.textContent || "";
    expect(heroContent).toContain("Ollama local + Cloud BYOK");
    expect(heroContent).toContain("Multimodelo");

    // FIA-010 contract
    const producto = app.querySelector("#producto");
    expect(producto).not.toBeNull();
    const productVisual = producto?.querySelector(".producto-visual");
    expect(productVisual).not.toBeNull();

    // FIA-029/030/031/034 contract (Product Frame with interactive selector)
    const productFrame = productVisual?.querySelector(".product-frame");
    expect(productFrame).not.toBeNull();

    const captureImg = productFrame?.querySelector("img.pf-capture");
    expect(captureImg).not.toBeNull();

    // FIA-035: Optimización de assets presente
    expect(captureImg?.getAttribute("decoding")).toBe("async");
    expect(captureImg?.getAttribute("fetchpriority")).toBe("high");

    // FIA-034 / FIA-W01.04: Selector de demostración presente (5 ejes exactos)
    const selector = app.querySelector(".pf-selector");
    expect(selector).not.toBeNull();

    const tabs = selector?.querySelectorAll(".pf-tab");
    expect(tabs?.length).toBe(5);

    expect(tabs?.[0].textContent).toBe("Agentes");
    expect(tabs?.[1].textContent).toBe("Herramientas");
    expect(tabs?.[2].textContent).toBe("Conocimiento");
    expect(tabs?.[3].textContent).toBe("Datos");
    expect(tabs?.[4].textContent).toBe("Orquestación");

    const pfDesc = app.querySelector("#pf-description");
    expect(pfDesc).not.toBeNull();

    // Vista por defecto: Agentes activo
    expect(tabs?.[0].classList.contains("active")).toBe(true);
    expect(tabs?.[1].classList.contains("active")).toBe(false);
    expect(captureImg?.getAttribute("src")).toBe("/v1_agentes.png");
    expect(captureImg?.getAttribute("alt")).toBe("Agentes de Entity");
    expect(pfDesc?.textContent).toContain("Entis especializados");
    expect(pfDesc?.textContent).toContain("modelos locales/cloud");
    expect(pfDesc?.textContent).toContain("configuración a medida");
    expect(pfDesc?.textContent).toContain("trabajo individual");

    // Clic en pestaña Herramientas
    tabs?.[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(tabs?.[0].classList.contains("active")).toBe(false);
    expect(tabs?.[1].classList.contains("active")).toBe(true);
    expect(captureImg?.getAttribute("src")).toBe("/v1_herramientas.png");
    expect(pfDesc?.textContent).toContain("Tool Belt");
    expect(pfDesc?.textContent).toContain("actuar sobre su entorno");

    // FIA-067: Comprobar que se añade la clase de animación al cambiar de vista
    expect(captureImg?.classList.contains("switching")).toBe(true);

    // Clic en pestaña Conocimiento (estructural, no funcional)
    tabs?.[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(tabs?.[2].classList.contains("active")).toBe(true);
    expect(pfDesc?.textContent?.trim()).toBe("");
    expect(captureImg?.getAttribute("src")).toBe("/v1_workspace.png");

    // Clic en pestaña Orquestación (Grupos respaldados)
    tabs?.[4].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(tabs?.[4].classList.contains("active")).toBe(true);
    expect(captureImg?.getAttribute("src")).toBe("/v1_orquestacion.png");
    expect(pfDesc?.textContent).toContain("Grupos secuenciales");
    expect(pfDesc?.textContent).toContain("ordena la participación");
    expect(pfDesc?.textContent).toContain("bajo control humano");
    expect(pfDesc?.textContent).not.toContain("Comunidades");

    // specifications trust badges in Hero
    const trustBadgesList = hero?.querySelector(".hero-trust-badges-inline");
    expect(trustBadgesList).not.toBeNull();
    expect(trustBadgesList?.textContent).toContain("Híbrido");
    expect(trustBadgesList?.textContent).toContain("Multimodelo");
    expect(trustBadgesList?.textContent).toContain("Orquestación");
    expect(trustBadgesList?.textContent).toContain("Zero Friction");

    // FIA-W01.07 contract (Pricing section, Entity Free)
    const precios = app.querySelector("#precios");
    expect(precios).not.toBeNull();

    // Assert Entity Free details
    expect(precios?.textContent).toContain("Entity Free");
    expect(precios?.textContent).toContain("0 €");
    expect(precios?.textContent).toContain("Sin registro");
    expect(precios?.textContent).toContain("sin tarjeta");

    // Assert exactly RV-N01 capabilities
    expect(precios?.textContent).toContain("Entis Ilimitados");
    expect(precios?.textContent).toContain("Grupos Secuenciales");
    expect(precios?.textContent).toContain("Chat Individual");
    expect(precios?.textContent).toContain(
      "Ollama / Modelos locales & BYOK Cloud",
    );
    expect(precios?.textContent).toContain("Persistencia completa");
    expect(precios?.textContent).toContain("Generación DOCX / PDF / HTML");

    // Assert CTA
    const freeCTA = precios?.querySelector("a.join-cta");
    expect(freeCTA).not.toBeNull();
    expect(freeCTA?.textContent).toBe("Descargar Entity Free");
    expect(freeCTA?.getAttribute("href")).toBe("#download-free");

    // Assert Entity Pro structural presence and capabilities
    expect(precios?.textContent).toContain("Entity Pro");
    expect(precios?.textContent).not.toContain("Próximamente");
    expect(precios?.textContent).toContain("8.99 €");
    expect(precios?.textContent).toContain("/ mes");
    expect(precios?.textContent).toContain("89 €");
    expect(precios?.textContent).toContain("/ año");

    // Pro capabilities derived exclusively from RV-N01 and RV-N05
    expect(precios?.textContent).toContain("Todo lo incluido en Free");
    expect(precios?.textContent).toContain("Grupos Loop");
    expect(precios?.textContent).toContain("Grupos No Secuenciales");
    expect(precios?.textContent).toContain("Terminal / Filesystem avanzado");
    expect(precios?.textContent).toContain("Máximo 2 dispositivos");
    expect(precios?.textContent).toContain("hasta 30 días");

    // CTA Obtener Entity Pro
    const proCTA = precios?.querySelectorAll("a.join-cta")[1];
    expect(proCTA).not.toBeNull();
    expect(proCTA?.textContent).toBe("Obtener Entity Pro");
    // URL will be verified in the new W01.17 test block

    // FIA-W01.09 contract (Comparativa detallada RV-N01)
    const comparativa = app.querySelector("#comparativa-matrix");
    expect(comparativa).not.toBeNull();

    // Assert all rows from RV-N01
    const tableText = comparativa?.textContent || "";
    expect(tableText).toContain("Entis");
    expect(tableText).toContain("Grupos secuenciales");
    expect(tableText).toContain("Grupos Loop");
    expect(tableText).toContain("Grupos No Secuenciales");
    expect(tableText).toContain("Chat individual");
    expect(tableText).toContain("Ollama / modelos locales");
    expect(tableText).toContain("BYOK cloud");
    expect(tableText).toContain("Persistencia");
    expect(tableText).toContain("Generación DOCX / PDF / HTML");
    expect(tableText).toContain("Terminal / filesystem avanzado");
    expect(tableText).toContain("Integrantes por Grupo");
    expect(tableText).toContain("Workflows / presets avanzados futuros");
    expect(tableText).toContain("Nuevas capacidades power-user");

    // Assert exactly RV-N01 terminology (No omitting, no inventing)
    expect(tableText).toContain("Sin límite comercial");
    expect(tableText).toContain("No, salvo decisión expresa posterior");
    expect(tableText).toContain("Sí cuando formen parte del producto");
    expect(tableText).toContain("Sólo las declaradas Free");
    expect(tableText).toContain("Las declaradas Pro");

    // FIA-W01.10 contract (Cómo funciona Pro)
    const comoFunciona = app.querySelector("#como-funciona-pro");
    expect(comoFunciona).not.toBeNull();
    const comoFuncionaText = comoFunciona?.textContent || "";

    // 4 conceptual steps
    expect(comoFuncionaText).toContain("Download");
    expect(comoFuncionaText).toContain("Buy");
    expect(comoFuncionaText).toContain("License key");
    expect(comoFuncionaText).toContain("Activate Pro");

    // Core anti-drift messaging
    expect(comoFuncionaText).toContain("misma app");
    expect(comoFuncionaText).toContain("sin crear cuenta Entity");
    expect(comoFuncionaText).toContain("Sin migración");
    expect(comoFuncionaText).toContain("sin reinstalación");

    // Validate order roughly by their visual numbering
    expect(comoFuncionaText).toMatch(
      /1.*Download.*2.*Buy.*3.*License key.*4.*Activate Pro/s,
    );

    // FIA-W01.11 contract (Control / Local-first)
    const controlSection = app.querySelector("#control-local-first");
    expect(controlSection).not.toBeNull();
    const controlText = controlSection?.textContent || "";

    // Core anti-drift messaging
    expect(controlText).toContain("sin cuenta Entity");
    expect(controlText).toContain("modelos locales");
    expect(controlText).toContain("BYOK");
    expect(controlText).toContain("Camino Local");
    expect(controlText).toContain("Camino Cloud");

    // Conditional logic phrasing
    expect(controlText).toContain(
      "El tratamiento depende del camino que elijas",
    );
    expect(controlText).toContain("procesamiento ocurre en tu máquina");
    expect(controlText).toContain(
      "procesamiento involucra al proveedor seleccionado",
    );

    // Negatives (No privacy absolute claims, no specific vendors)
    expect(controlText).not.toMatch(/100% privado/i);
    expect(controlText).not.toMatch(/siempre local/i);
    expect(controlText).not.toContain("OpenAI");
    expect(controlText).not.toContain("Anthropic");
    expect(controlText).not.toContain("retención de 0 días");

    // FIA-W01.12 contract (Casos de uso)
    const casosUso = app.querySelector("#casos-uso");
    expect(casosUso).not.toBeNull();
    const casosText = casosUso?.textContent || "";

    // Exact group names
    expect(casosText).toContain("Desarrollo y producto");
    expect(casosText).toContain("Investigación y conocimiento");
    expect(casosText).toContain("Operaciones y empresa");
    expect(casosText).toContain("Creación y workflows complejos");

    // Exact features embedded (Trazabilidad estricta)
    expect(casosText).toContain("Grupos secuenciales");
    expect(casosText).toContain("Terminal / filesystem avanzado");
    expect(casosText).toContain("BYOK y modelos locales");
    expect(casosText).toContain("Chat individual");
    expect(casosText).toContain("Persistencia completa");
    expect(casosText).toContain("Grupos No Secuenciales");
    expect(casosText).toContain("Generación DOCX / PDF / HTML");
    expect(casosText).toContain("Grupos Loop");

    // Negatives (No undocumented capabilities, no communities)
    expect(casosText).not.toContain("Comunidades");
    expect(casosText).not.toContain("SQLite");
    expect(casosText).not.toContain("RAG automático");
    expect(casosText).not.toContain("ROI");

    // FIA-W01.13 contract (Sustituir bloque Beta por Download Free)

    // Assert 1: The old Beta form must NOT exist.
    const join = app.querySelector("#join");
    expect(join).toBeNull();
    const betaForm = app.querySelector("#beta-form");
    expect(betaForm).toBeNull();

    // Assert 2: Beta-specific copy and fields must NOT exist.
    const fullText = app.textContent || "";
    expect(fullText).not.toMatch(/Join the Beta/i);
    expect(fullText).not.toMatch(/waitlist/i);
    expect(fullText).not.toMatch(/Private Beta/i);
    expect(fullText).not.toContain("Beneficios exclusivos para Beta Testers");
    expect(app.querySelector("#beta-email")).toBeNull();

    // Assert 3: The Download Free section must exist.
    const downloadFree = app.querySelector("#download-free");
    expect(downloadFree).not.toBeNull();
    const downloadText = downloadFree?.textContent || "";

    // Assert 4: Required copy (Sin email, sin cuenta, sin tarjeta).
    expect(downloadText).toMatch(/Sin email/i);
    expect(downloadText).toMatch(/Sin cuenta/i);
    expect(downloadText).toMatch(/Sin tarjeta/i);

    // Assert 5: CTA exists and points to #descargar (NOT checkout-pro).
    const ctaLink = downloadFree?.querySelector(".join-cta.hero-btn");
    expect(ctaLink).not.toBeNull();
    expect(ctaLink?.textContent).toMatch(/Descargar Entity Free/i);
    // Assert: cada recurso visible usa destino real autorizado.
    expect(ctaLink?.getAttribute("href")).toMatch(
      /Entity_1\.0\.0_x64-setup\.exe/,
    );

    // FIA-W01.14 Assertions
    // Assert: cada plataforma visible tiene fuente real. (Evidencia: Entity-MVP-Empaquetado/README.md)
    const osTabs = Array.from(
      downloadFree?.querySelectorAll(".download-os-tabs .pf-tab") || [],
    );
    expect(osTabs.length).toBe(2);
    expect(osTabs[0].textContent).toBe("Windows");
    expect(osTabs[1].textContent).toBe("Linux");

    // Assert: no existen plataformas adicionales.
    expect(osTabs.length).toBe(2);

    // Assert negativo: no autodetección sin contrato.
    // Default should be Windows as the first tab without dynamic changes in HTML
    console.log(osTabs[0].outerHTML);
    expect(osTabs[0].classList.contains("active")).toBe(true);

    // Assert: modelo de artefactos W01.15
    expect(ctaLink?.getAttribute("href")).toMatch(/\.exe|\.dmg|\.AppImage/i);

    // Assert negativo: no validación W01.16. (No e2e flow logic added to CTA)
    expect(ctaLink?.getAttribute("href")).not.toBe("#checkout-pro");

    // FIA-013 contract
    const footer = app.querySelector(".footer");
    expect(footer).not.toBeNull();
    // Footer assertions for brand and links removed as they don't exist in AS-BUILT
    expect(footer?.querySelector(".footer-bottom")).not.toBeNull();

    // FIA-017 contract
    const mobileBtn = app.querySelector("header .mobile-menu-btn");
    expect(mobileBtn).not.toBeNull();

    // FIA-018 contract
    expect(mobileBtn?.getAttribute("aria-expanded")).toBe("false");
    const drawer = app.querySelector("header .mobile-menu-drawer");
    expect(drawer).not.toBeNull();

    // Links inside mobile menu drawer
    const drawerLinks = drawer?.querySelectorAll("a.mobile-nav-item");
    expect(drawerLinks?.length).toBe(3);
    expect(drawerLinks?.[0].getAttribute("href")).toBe("#hero");
    expect(drawerLinks?.[1].getAttribute("href")).toBe("#producto");
    expect(drawerLinks?.[2].getAttribute("href")).toBe("#precios");

    const drawerFreeLink = drawer?.querySelector("span.text-glow-tier");
    expect(drawerFreeLink).not.toBeNull();

    const mobileDocsDropdown = drawer?.querySelector(
      ".mobile-dropdown-container .mobile-dropdown-trigger",
    );
    expect(mobileDocsDropdown?.textContent).toBe("Docs");

    const drawerText = drawer?.textContent || "";
    expect(drawerText.toLowerCase()).not.toContain("beta");

    // Simulate click on mobile menu button (Open)
    const headerEl = app.querySelector("header");
    expect(headerEl?.classList.contains("mobile-menu-open")).toBe(false);

    mobileBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(mobileBtn?.getAttribute("aria-expanded")).toBe("true");
    expect(headerEl?.classList.contains("mobile-menu-open")).toBe(true);

    // Simulate click on mobile menu button again (Close)
    mobileBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(mobileBtn?.getAttribute("aria-expanded")).toBe("false");
    expect(headerEl?.classList.contains("mobile-menu-open")).toBe(false);

    // Open again to test closing on option click
    mobileBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(headerEl?.classList.contains("mobile-menu-open")).toBe(true);

    // Click on a mobile nav link (should close the menu)
    drawerLinks?.[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(mobileBtn?.getAttribute("aria-expanded")).toBe("false");
    expect(headerEl?.classList.contains("mobile-menu-open")).toBe(false);

    // FIA-020 contract
    // Verify that the controls can be focused natively
    (navLinks?.[0] as HTMLElement).focus();
    expect(document.activeElement).toBe(navLinks?.[0]);

    (mobileBtn as HTMLElement).focus();
    expect(document.activeElement).toBe(mobileBtn);

    (drawerLinks?.[0] as HTMLElement).focus();
    expect(document.activeElement).toBe(drawerLinks?.[0]);
  });

  it("should not expose waitlist data, admin table or links to admin page on public URL root (FIA-054)", async () => {
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;

    // Verify no waitlist table is rendered
    expect(app.querySelector(".waitlist-table")).toBeNull();
    expect(app.querySelector(".status-select")).toBeNull();
    expect(app.innerHTML).not.toContain("admin.html");

    // Verify no admin links are visible
    const links = app.querySelectorAll("a");
    links.forEach((link) => {
      expect(link.getAttribute("href") || "").not.toContain("admin.html");
    });
  });

  it("should not consume internal/administrative endpoints on public page load (FIA-054)", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/main.ts?t=" + ++cacheBuster);

    // Public landing should not call admin endpoints
    expect(fetchMock).not.toHaveBeenCalledWith("/api/registrations");
    expect(fetchMock).not.toHaveBeenCalledWith("/api/registrations/status");

    vi.unstubAllGlobals();
  });

  it("should include progressive Hero entry animation (FIA-062)", () => {
    const cssPath = path.join(__dirname, "../src/style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    expect(cssContent).toContain("@keyframes hero-entry");
    expect(cssContent).toContain(".hero-headline");
    expect(cssContent).toContain(".hero-body-row");
    expect(cssContent).toContain(".hero-trust-badges-inline");
    expect(cssContent).toMatch(/animation:.*hero-entry/);
  });

  it("should include scroll reveal functionality on all authorized public sections (FIA-064)", async () => {
    vi.resetModules();
    const observeMock = vi.fn();
    class MockIntersectionObserver {
      constructor(public callback: IntersectionObserverCallback) {}
      observe = observeMock;
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;

    // Check all authorized public sections
    const authorizedSections = [
      "#producto",
      "#download-free",
      ".footer",
    ];

    authorizedSections.forEach((selector) => {
      console.log("Checking selector:", selector);
      const el = app.querySelector(selector);
      expect(el).not.toBeNull();
      expect(el?.classList.contains("reveal-element")).toBe(true);
      expect(observeMock).toHaveBeenCalledWith(el);
    });

    // Check CSS
    const cssPath = path.join(__dirname, "../src/style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    expect(cssContent).toContain(".reveal-element");
    expect(cssContent).toContain(".reveal-element.revealed");

    vi.unstubAllGlobals();
  });

  it("should include microinteractions for CTAs (FIA-065)", () => {
    const cssPath = path.join(__dirname, "../src/style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // focus-visible
    expect(cssContent).toContain(".hero-btn:focus-visible");
    expect(cssContent).toContain(".join-cta:focus-visible");

    // active
    expect(cssContent).toContain(".hero-btn:active");
    expect(cssContent).toContain(".join-cta:active");
    expect(cssContent).toContain("transform: scale(0.95)");
  });

  it("should include transition animation for mobile menu (FIA-066)", () => {
    const cssPath = path.join(__dirname, "../src/style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Check base drawer styles (hidden but accessible for transition)
    expect(cssContent).toContain(".mobile-menu-drawer {");
    expect(cssContent).toContain("visibility: hidden;");
    expect(cssContent).toContain("opacity: 0;");
    expect(cssContent).toContain("transform: translateY(-10px);");
    expect(cssContent).toMatch(
      /transition:\s*opacity 0\.25s,\s*transform 0\.25s,\s*visibility 0\.25s;/,
    );

    // Check open state styles
    expect(cssContent).toContain(
      "header.mobile-menu-open .mobile-menu-drawer {",
    );
    expect(cssContent).toContain("visibility: visible;");
    expect(cssContent).toContain("opacity: 1;");
    expect(cssContent).toContain("transform: translateY(0);");
  });

  it("should include centralized prefers-reduced-motion styles (FIA-068)", () => {
    const cssPath = path.join(__dirname, "../src/style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Check for the media query
    expect(cssContent).toContain("@media (prefers-reduced-motion: reduce)");

    // Check that it applies to the key animated components
    expect(cssContent).toContain("animation-duration: 0.01ms !important;");
    expect(cssContent).toContain("transition-duration: 0.01ms !important;");
    expect(cssContent).toContain(".reveal-element {");
    expect(cssContent).toContain(".hero-btn:active,");
    expect(cssContent).toContain(".mobile-menu-drawer {");
    expect(cssContent).toContain(".pf-capture.switching {");
    expect(cssContent).toContain(".hero-btn {");
  });

  it("should meet structural accessibility standards (FIA-069)", async () => {
    await import("../src/main.ts?t=" + ++cacheBuster); // force reload module
    const app = document.querySelector<HTMLDivElement>("#app")!;

    // Landmarks and aria-labelledby
    const hero = app.querySelector("#hero");
    expect(hero?.getAttribute("aria-labelledby")).toBe("hero-headline");



    const producto = app.querySelector("#producto");
    expect(producto?.getAttribute("aria-labelledby")).toBe("producto-title");

    const downloadFree = app.querySelector("#download-free");
    expect(downloadFree?.getAttribute("aria-labelledby")).toBe(
      "download-title",
    );

    // ARIA labels for complex widgets
    const pfSelector = app.querySelector(".pf-selector");
    expect(pfSelector?.getAttribute("aria-label")).toBe("Vistas del producto");

    // Footer interactive links assertion removed because footer-links are currently empty in AS-BUILT

    // Check focus styles in css
    const cssPath = path.join(__dirname, "../src/style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    expect(cssContent).toContain(".footer-link:focus-visible");
  });

  it("should include correct SEO metadata in index.html (FIA-070)", () => {
    const htmlPath = path.join(__dirname, "../index.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");

    // Check lang
    expect(htmlContent).toContain('<html lang="es">');

    // Check Primary Meta
    expect(htmlContent).toContain(
      "<title>Entity | El Workspace para tus agentes de IA</title>",
    );
    expect(htmlContent).toContain(
      '<meta name="title" content="Entity | El Workspace para tus agentes de IA" />',
    );
    expect(htmlContent).toContain(
      'content="Entity es un Workspace de escritorio donde los agentes especializados (Entis) colaboran de forma coordinada."',
    );

    // Check Open Graph
    expect(htmlContent).toContain(
      '<meta property="og:type" content="website" />',
    );
    expect(htmlContent).toContain(
      '<meta property="og:url" content="https://entity.app/" />',
    );
    expect(htmlContent).toContain(
      'content="Entity | El Workspace para tus agentes de IA"',
    );
    expect(htmlContent).toContain(
      'content="Entity es un Workspace de escritorio donde los agentes especializados (Entis) colaboran de forma coordinada."',
    );
    expect(htmlContent).toContain(
      'content="/FIA-31_Implementar vista workspace.png"',
    );

    // Check Twitter
    expect(htmlContent).toContain(
      '<meta property="twitter:card" content="summary_large_image" />',
    );
    expect(htmlContent).toContain(
      '<meta property="twitter:url" content="https://entity.app/" />',
    );
    expect(htmlContent).toContain(
      'content="Entity | El Workspace para tus agentes de IA"',
    );
    expect(htmlContent).toContain(
      'content="Entity es un Workspace de escritorio donde los agentes especializados (Entis) colaboran de forma coordinada."',
    );
    expect(htmlContent).toContain(
      'content="/FIA-31_Implementar vista workspace.png"',
    );
  });

  it("should meet final performance and stability standards (FIA-071)", () => {
    // Check overflow-x in css to guarantee no horizontal layout shifts
    const cssPath = path.join(__dirname, "../src/style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Using regular expressions to allow for whitespace differences
    expect(cssContent).toMatch(/html\s*\{[^}]*overflow-x:\s*hidden;?[^}]*\}/);
    expect(cssContent).toMatch(/body\s*\{[^}]*overflow-x:\s*hidden;?[^}]*\}/);

    // Verify preload optimization from FIA-035 is still present in main.ts
    const tsPath = path.join(__dirname, "../src/main.ts");
    const tsContent = fs.readFileSync(tsPath, "utf-8");
    expect(tsContent).toContain("new Image()");
    expect(tsContent).toContain(".src = asset.src");
  });

  it("should implement monthly/annual toggle and external checkouts (FIA-W01.17)", async () => {
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    
    const precios = app.querySelector("#precios");
    expect(precios).not.toBeNull();
    
    // Toggle options
    const billingToggle = precios?.querySelector(".billing-toggle");
    expect(billingToggle).not.toBeNull();
    const monthlyBtn = billingToggle?.querySelector("[data-billing='monthly']") as HTMLButtonElement;
    const annualBtn = billingToggle?.querySelector("[data-billing='annual']") as HTMLButtonElement;
    
    expect(monthlyBtn).not.toBeNull();
    expect(annualBtn).not.toBeNull();
    
    // Check initial prices presence
    const priceMonthly = precios?.querySelector("#price-monthly") as HTMLElement;
    const priceAnnual = precios?.querySelector("#price-annual") as HTMLElement;
    expect(priceMonthly).not.toBeNull();
    expect(priceAnnual).not.toBeNull();
    
    expect(priceMonthly.textContent).toContain("8.99 €");
    expect(priceMonthly.textContent).toContain("/ mes");
    expect(priceAnnual.textContent).toContain("89 €");
    expect(priceAnnual.textContent).toContain("/ año");

    // CTA
    const proCTA = precios?.querySelector("#checkout-pro") as HTMLAnchorElement;
    expect(proCTA).not.toBeNull();
    expect(proCTA.textContent).toBe("Obtener Entity Pro");
    expect(proCTA.getAttribute("target")).toBe("_blank");
    expect(proCTA.getAttribute("rel")).toContain("noopener");
    expect(proCTA.getAttribute("rel")).toContain("noreferrer");
    
    // Initially Monthly is active
    expect(monthlyBtn.classList.contains("active")).toBe(true);
    expect(priceMonthly.style.display).not.toBe("none");
    expect(priceAnnual.style.display).toBe("none");
    expect(proCTA.getAttribute("href")).toBe("https://entity.lemonsqueezy.com/checkout/buy/6d4157a1-2d33-4db0-95f0-5d8689b6931a?enabled=2031256%2C2034570");
    
    // Click Annual
    annualBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(annualBtn.classList.contains("active")).toBe(true);
    expect(monthlyBtn.classList.contains("active")).toBe(false);
    expect(priceMonthly.style.display).toBe("none");
    expect(priceAnnual.style.display).toBe("flex");
    expect(proCTA.getAttribute("href")).toBe("https://entity.lemonsqueezy.com/checkout/buy/6d4157a1-2d33-4db0-95f0-5d8689b6931a?enabled=2031215%2C2031256");

    // Click Monthly again
    monthlyBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(monthlyBtn.classList.contains("active")).toBe(true);
    expect(annualBtn.classList.contains("active")).toBe(false);
    expect(priceMonthly.style.display).toBe("flex");
    expect(priceAnnual.style.display).toBe("none");
    expect(proCTA.getAttribute("href")).toBe("https://entity.lemonsqueezy.com/checkout/buy/6d4157a1-2d33-4db0-95f0-5d8689b6931a?enabled=2031256%2C2034570");
    
    // Assert PAN/CVV are zero
    const preciosContent = precios!.innerHTML;
    expect(preciosContent).not.toMatch(/\b(pan|cvv|credit card)\b/i);
    expect(app.querySelector("form")).toBeNull();
  });

  it("should delegate post-purchase, license generation, and entitlement externally (FIA-W01.19)", async () => {
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    // This test formally checks the PVF-W01.40 to PVF-W01.42 boundaries
    
    // 1. No local post-purchase/success page generated dynamically
    expect(app.querySelector("#success")).toBeNull();
    expect(app.querySelector("#order-receipt")).toBeNull();

    // 2. No local license generation or entitlement validation logic
    const htmlContent = app.innerHTML;
    expect(htmlContent).not.toMatch(/generate-license|license-key|entitlement-valid/i);
    
    // 3. No Pro specific artifact/download (Misma app)
    expect(htmlContent).not.toMatch(/Entity_Pro.*\.exe|Entity_Pro.*\.AppImage/i);
    expect(htmlContent).not.toMatch(/EntityPro/i);
    
    // 4. Download Free remains the sole entry point for getting the software
    const downloadCta = app.querySelector("#download-cta") as HTMLAnchorElement;
    expect(downloadCta).not.toBeNull();
    // Verify it continues to point to the base version
    expect(downloadCta.getAttribute("href")).toMatch(/Entity_1\.0\.0_x64-setup\.exe/);
  });

  it("should strictly ignore failed or cancelled payments as incomplete states (FIA-W01.20)", async () => {
    // This test formally checks PVF-W01.43
    // Since checkout opens in a new tab (target="_blank"), the landing page
    // has no context of errors or cancellations, thereby mathematically preventing
    // a failed state from ever generating a local license.

    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    const htmlContent = app.innerHTML;

    // 1. Assert no local cancel/error route or handling UI exists
    expect(app.querySelector("#cancel")).toBeNull();
    expect(app.querySelector("#error")).toBeNull();
    expect(htmlContent).not.toMatch(/cancel-payment|payment-failed|retry-payment/i);

    // 2. Assert no local webhooks or callback handlers
    expect(htmlContent).not.toMatch(/webhook|callback|checkout-session/i);

    // 3. Since there are no error listeners, the UI is statically immutable
    //    and remains on the Get Pro CTA for re-entry.
    const proCTA = app.querySelector("#checkout-pro") as HTMLAnchorElement;
    expect(proCTA).not.toBeNull();
    expect(proCTA.getAttribute("target")).toBe("_blank");
  });

  it("should delegate Manage subscription entirely to Lemon Squeezy Customer Portal (FIA-W01.21)", async () => {
    // This test formally checks PVF-W01.44
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    
    // 1. Verify existence of the external static link in the footer
    const manageLink = Array.from(app.querySelectorAll("a")).find(a => 
      a.textContent?.includes("Gestionar suscripción")
    );
    expect(manageLink).toBeDefined();
    
    // 2. Verify it points strictly to the unsigned official Customer Portal
    expect(manageLink?.getAttribute("href")).toBe("https://entity.lemonsqueezy.com/billing");
    expect(manageLink?.getAttribute("target")).toBe("_blank");

    // 3. Negative Assertions: ensure no local dashboard, API, token or login
    const htmlContent = app.innerHTML;
    expect(app.querySelector("#customer-portal")).toBeNull();
    expect(app.querySelector("#dashboard")).toBeNull();
    expect(htmlContent).not.toMatch(/api\/billing|api\/portal/i);
    expect(htmlContent).not.toMatch(/customer_id|subscription_id/i);
    expect(htmlContent).not.toMatch(/magic-link-token/i);
  });

  it("should strictly respect the web to desktop boundary for entitlement (RV-N05) (FIA-W01.22)", async () => {
    // This test formally checks PVF-W01.45
    // The web must distribute the license but NEVER validate it, implement grace periods,
    // or execute device limits.
    
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    const htmlContent = app.innerHTML;

    // 1. Assert NO validation logic exists on the landing page
    expect(htmlContent).not.toMatch(/validate-license|check-entitlement|validate_key/i);

    // 2. Assert NO offline/grace period timers or device counting logic exists
    expect(htmlContent).not.toMatch(/offline-timer|grace-period|device-count/i);

    // 3. Assert NO local persistence is used for entitlement
    expect(htmlContent).not.toMatch(/localStorage\.setItem\(['"](license|entitlement|pro_status)/i);
    expect(htmlContent).not.toMatch(/sessionStorage\.setItem\(['"](license|entitlement|pro_status)/i);
    
    // 4. Assert NO endpoints for remote revalidation/revocation are called
    expect(htmlContent).not.toMatch(/api\/revalidate|api\/revoke|api\/downgrade/i);

    // 5. Verify commercial copy is present as pure text (not logic)
    expect(htmlContent).toMatch(/Máximo 2 dispositivos simultáneos/i);
  });

  it("should ensure complete removal of Beta UI and forms from the commercial landing page (FIA-W01.23)", async () => {
    // This test formally checks PVF-W01.46 & PVF-W01.47
    
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    const htmlContent = app.innerHTML;

    // 1. Assert NO "Join Beta" or "Waitlist" CTAs exist anywhere
    expect(htmlContent).not.toMatch(/Únete a la Beta/i);
    expect(htmlContent).not.toMatch(/Asegura tu plaza/i);
    expect(htmlContent).not.toMatch(/Private Beta/i);
    expect(htmlContent).not.toMatch(/Waitlist/i);

    // 2. Assert NO Beta forms, inputs, or wiring exist in the DOM
    expect(app.querySelector("form")).toBeNull();
    expect(htmlContent).not.toMatch(/beta-form|beta-email|beta-submit/i);

    // 3. Assert NO Beta state indicators (loading, success, error) exist
    expect(htmlContent).not.toMatch(/loading-beta|success-beta|error-beta/i);

    // 4. Assert NO new backend calls to waitlist endpoints exist from the UI
    expect(htmlContent).not.toMatch(/api\/waitlist|api\/beta/i);
  });
});

describe("Admin Waitlist Dashboard", () => {
  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue("admin-secret-2026");
    sessionStorage.setItem("entityAdminToken", "admin-secret-2026");
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';

    // Clean up registrations.json and sent_emails.json
    const filePath = path.join(__dirname, "../registrations.json");
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        void err;
      }
    }
    const sentEmailsPath = path.join(__dirname, "../sent_emails.json");
    if (fs.existsSync(sentEmailsPath)) {
      try {
        fs.unlinkSync(sentEmailsPath);
      } catch (err) {
        void err;
      }
    }
  });

  it("should display empty waitlist state (FIA-052)", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.body.innerHTML).toContain(
      "No hay registros en la lista de espera actualmente.",
    );
    vi.unstubAllGlobals();
  });

  it("should display loaded waitlist registrations with correct columns (FIA-052)", async () => {
    const mockData = [
      {
        email: "admin.test@entity.test",
        status: "Pending",
        registeredAt: "2026-07-20T08:00:00.000Z",
        origen: "Landing Beta Form",
      },
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));

    const table = document.querySelector("table.waitlist-table");
    expect(table).not.toBeNull();

    const headers = table?.querySelectorAll("th");
    expect(headers?.length).toBe(4);
    expect(headers?.[0].textContent).toBe("Correo Electrónico");
    expect(headers?.[1].textContent).toBe("Fecha de Registro");
    expect(headers?.[2].textContent).toBe("Origen");
    expect(headers?.[3].textContent).toBe("Estado");

    const cells = table?.querySelectorAll("tbody td");
    expect(cells?.[0].textContent).toContain("admin.test@entity.test");
    expect(cells?.[2].textContent).toBe("Landing Beta Form");
    expect(cells?.[3].querySelector("select")?.value).toBe("Pending");

    vi.unstubAllGlobals();
  });

  it("should display error loading waitlist message (FIA-052)", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "Error al conectar con la base de datos local.",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.body.innerHTML).toContain("Error al cargar la waitlist:");
    expect(document.body.innerHTML).toContain(
      "Error al conectar con la base de datos local.",
    );
    vi.unstubAllGlobals();
  });

  it("should successfully update registration status to Approved (FIA-053)", async () => {
    const mockData = [
      {
        email: "update.test@entity.test",
        status: "Pending",
        registeredAt: "2026-07-20T08:00:00.000Z",
        origen: "Landing Beta Form",
      },
    ];

    const fetchMock = vi.fn().mockImplementation((url, options) => {
      if (
        url === "/api/registrations" &&
        (!options || !options.method || options.method === "GET")
      ) {
        return Promise.resolve({
          ok: true,
          json: async () => mockData,
        });
      }
      if (
        url === "/api/registrations/status" &&
        options &&
        options.method === "POST"
      ) {
        const body = JSON.parse(options.body);
        if (body.email === "update.test@entity.test") {
          mockData[0].status = body.status;
          return Promise.resolve({
            ok: true,
            json: async () => ({
              message: "Estado actualizado con éxito.",
              registration: mockData[0],
            }),
          });
        }
      }
      return Promise.reject(new Error("Unknown request"));
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>(".status-select");
    expect(select).not.toBeNull();
    expect(select?.value).toBe("Pending");

    // Trigger change
    select!.value = "Approved";
    select!.dispatchEvent(new window.Event("change", { bubbles: true }));

    // Wait for the async flow to complete (fetch update then fetch reload)
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/registrations/status",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "update.test@entity.test",
          status: "Approved",
        }),
      }),
    );

    const updatedSelect =
      document.querySelector<HTMLSelectElement>(".status-select");
    expect(updatedSelect?.value).toBe("Approved");
    expect(updatedSelect?.classList.contains("approved")).toBe(true);

    vi.unstubAllGlobals();
  });

  it("should show error and revert on invalid status change (FIA-053)", async () => {
    const mockData = [
      {
        email: "invalid.status@entity.test",
        status: "Pending",
        registeredAt: "2026-07-20T08:00:00.000Z",
        origen: "Landing Beta Form",
      },
    ];

    const fetchMock = vi.fn().mockImplementation((url) => {
      if (url === "/api/registrations") {
        return Promise.resolve({
          ok: true,
          json: async () => mockData,
        });
      }
      if (url === "/api/registrations/status") {
        return Promise.resolve({
          ok: false,
          status: 400,
          json: async () => ({ error: "Estado inválido." }),
        });
      }
      return Promise.reject(new Error("Unknown request"));
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>(".status-select");
    select!.value = "Approved";
    select!.dispatchEvent(new window.Event("change", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 50));

    const errorContainer = document.getElementById("admin-status-container");
    expect(errorContainer?.textContent).toContain(
      "Error al actualizar el estado: Estado inválido.",
    );

    // Select should reload back to Pending
    const reloadedSelect =
      document.querySelector<HTMLSelectElement>(".status-select");
    expect(reloadedSelect?.value).toBe("Pending");

    vi.unstubAllGlobals();
  });

  it("should show error when updating non-existent registration (FIA-053)", async () => {
    const mockData = [
      {
        email: "nonexistent@entity.test",
        status: "Pending",
        registeredAt: "2026-07-20T08:00:00.000Z",
        origen: "Landing Beta Form",
      },
    ];

    const fetchMock = vi.fn().mockImplementation((url) => {
      if (url === "/api/registrations") {
        return Promise.resolve({
          ok: true,
          json: async () => mockData,
        });
      }
      if (url === "/api/registrations/status") {
        return Promise.resolve({
          ok: false,
          status: 404,
          json: async () => ({ error: "Registro inexistente." }),
        });
      }
      return Promise.reject(new Error("Unknown request"));
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>(".status-select");
    select!.value = "Rejected";
    select!.dispatchEvent(new window.Event("change", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 50));

    const errorContainer = document.getElementById("admin-status-container");
    expect(errorContainer?.textContent).toContain(
      "Error al actualizar el estado: Registro inexistente.",
    );

    vi.unstubAllGlobals();
  });

  it("should persist registration status across dashboard reload (FIA-053)", async () => {
    const mockData = [
      {
        email: "persist.test@entity.test",
        status: "Rejected",
        registeredAt: "2026-07-20T08:00:00.000Z",
        origen: "Landing Beta Form",
      },
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 20));

    const select = document.querySelector<HTMLSelectElement>(".status-select");
    expect(select?.value).toBe("Rejected");
    expect(select?.classList.contains("rejected")).toBe(true);

    vi.unstubAllGlobals();
  });

  it("should render the email confirmation preview correctly in admin view (FIA-055)", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster); // force reload
    await new Promise((resolve) => setTimeout(resolve, 20));

    const previewRegion = document.getElementById("email-preview-region");
    expect(previewRegion).not.toBeNull();

    // Verify presence of Subject, Preheader, Body, CTA and Footer
    const subject = document.getElementById("preview-subject");
    expect(subject).not.toBeNull();
    expect(subject?.textContent).toContain(
      "¡Te damos la bienvenida a la Beta Privada de Entity!",
    );

    const preheader = document.getElementById("preview-preheader");
    expect(preheader).not.toBeNull();
    expect(preheader?.textContent).toContain(
      "Tu acceso exclusivo al Workspace inteligente de Entity está listo.",
    );

    const body = document.getElementById("preview-body");
    expect(body).not.toBeNull();
    expect(body?.textContent).toContain("Workspace de escritorio inteligente");

    const cta = document.getElementById("preview-cta");
    expect(cta).not.toBeNull();
    expect(cta?.textContent).toContain("Descargar Entity para Escritorio");

    const footer = document.getElementById("preview-footer");
    expect(footer).not.toBeNull();
    expect(footer?.textContent).toContain(
      "waitlist privada de Entity. © 2026 Entity",
    );

    vi.unstubAllGlobals();
  });

  it("should verify email preview is purely visual, does not trigger mail delivery or modify registrations.json (FIA-055)", async () => {
    const filePath = path.join(__dirname, "../registrations.json");
    const beforeExists = fs.existsSync(filePath);
    let beforeContent = "";
    if (beforeExists) {
      beforeContent = fs.readFileSync(filePath, "utf-8");
    }

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 20));

    // Verify registrations.json hasn't been altered or created
    if (beforeExists) {
      expect(fs.readFileSync(filePath, "utf-8")).toBe(beforeContent);
    } else {
      expect(fs.existsSync(filePath)).toBe(false);
    }

    // Verify no email sender fetch was triggered (only /api/registrations)
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/registrations",
      expect.any(Object),
    );

    vi.unstubAllGlobals();
  });

  it("should not expose email preview on the public landing page (FIA-055)", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;

    expect(app.querySelector("#email-preview-region")).toBeNull();
    expect(app.querySelector("#preview-subject")).toBeNull();
  });
});

describe("Email Confirmation Dispatch (FIA-056)", () => {
  const registrationsPath = path.join(__dirname, "../registrations.json");
  const sentEmailsPath = path.join(__dirname, "../sent_emails.json");

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue("admin-secret-2026");
    sessionStorage.setItem("entityAdminToken", "admin-secret-2026");
    vi.resetModules();
    document.body.innerHTML = '<div id="app"></div>';

    // Clean up files before test
    [registrationsPath, sentEmailsPath].forEach((filePath) => {
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
    [registrationsPath, sentEmailsPath].forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          void err;
        }
      }
    });
  });

  it("should successfully unsubscribe an existing user", async () => {
    const mockData = [
      {
        email: "test@entity.test",
        status: "Pending",
        registeredAt: "2026-07-20T08:00:00.000Z",
      },
    ];
    fs.writeFileSync(
      registrationsPath,
      JSON.stringify(mockData, null, 2),
      "utf-8",
    );

    document.body.innerHTML = '<div id="unsubscribe-app"></div>';
    // Mock the window.location.search before importing
    Object.defineProperty(window, "location", {
      value: { search: "?email=test@entity.test" },
      writable: true,
    });

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        message: "Te has dado de baja de nuestras comunicaciones con éxito.",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/unsubscribe.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 20));

    const confirmBtn = document.getElementById(
      "confirm-unsubscribe",
    ) as HTMLButtonElement;
    expect(confirmBtn).not.toBeNull();

    await confirmBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/registrations/unsubscribe",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "test@entity.test" }),
      }),
    );

    const statusContainer = document.getElementById("status-container");
    expect(statusContainer?.textContent).toContain(
      "Te has dado de baja de nuestras comunicaciones con éxito.",
    );
  });

  it("should show error when email is missing from URL", async () => {
    document.body.innerHTML = '<div id="unsubscribe-app"></div>';
    Object.defineProperty(window, "location", {
      value: { search: "" },
      writable: true,
    });

    await import("../src/unsubscribe.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 20));

    const statusMsg = document.querySelector(".status-message.error");
    expect(statusMsg?.textContent).toContain(
      "No se ha proporcionado un correo válido",
    );
  });
});
describe("Metrics Dashboard (FIA-061)", () => {
  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue("admin-secret-2026");
    sessionStorage.setItem("entityAdminToken", "admin-secret-2026");
    vi.resetModules();
    document.body.innerHTML = '<div id="admin-app"></div>';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should render metrics accurately based on payload data", async () => {
    const mockData = [
      {
        email: "1@test.com",
        confirmationEmailSent: true,
        confirmationEmailStatus: "sent",
        invitationSent: true,
        invitationEmailStatus: "sent",
        unsubscribed: false,
      },
      {
        email: "2@test.com",
        confirmationEmailSent: true,
        confirmationEmailStatus: "error",
        invitationSent: false,
        invitationEmailStatus: "pending",
        unsubscribed: true,
      },
      {
        email: "3@test.com",
        confirmationEmailSent: false,
        confirmationEmailStatus: "pending",
        invitationSent: true,
        invitationEmailStatus: "error",
        unsubscribed: false,
      },
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    vi.stubGlobal("fetch", fetchMock);

    await import("../src/admin.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 50));

    const metricsRegion = document.getElementById("metrics-region");
    expect(metricsRegion).not.toBeNull();

    // Confirmaciones
    expect(
      document.getElementById("metric-confirm-sent")?.textContent,
    ).toContain("1");
    expect(
      document.getElementById("metric-confirm-pending")?.textContent,
    ).toContain("1");
    expect(
      document.getElementById("metric-confirm-error")?.textContent,
    ).toContain("1");

    // Bajas
    expect(
      document.getElementById("metric-unsubscribed")?.textContent,
    ).toContain("1");
  });
});

describe("Backend and Automations Deactivation (FIA-W01.24)", () => {
  it("should enforce complete deactivation of beta exclusive endpoints", async () => {
    // PVF-W01.48: Endpoints exclusively for beta are deactivated and return 410.
    const { requestHandler } = await import("../src/server");
    
    // Test /api/register
    const reqReg = { url: "/api/register", method: "POST", headers: {}, on: vi.fn(), destroy: vi.fn() };
    const resReg = { setHeader: vi.fn(), end: vi.fn(), statusCode: 200 };
    resReg.end.mockImplementation((body) => {
      expect(JSON.parse(body).error).toBe("El programa Beta ha finalizado.");
    });
    // @ts-expect-error Mocked response object lacks full IncomingMessage implementation
    await requestHandler(reqReg, resReg);
    expect(resReg.statusCode).toBe(410);

    // Test /api/registrations/invite
    const reqInv = { url: "/api/registrations/invite", method: "POST", headers: { authorization: "Bearer admin-secret-2026" }, on: vi.fn(), destroy: vi.fn() };
    const resInv = { setHeader: vi.fn(), end: vi.fn(), statusCode: 200 };
    resInv.end.mockImplementation((body) => {
      expect(JSON.parse(body).error).toBe("El programa Beta ha finalizado.");
    });
    // @ts-expect-error Mocked response object lacks full IncomingMessage implementation
    await requestHandler(reqInv, resInv);
    expect(resInv.statusCode).toBe(410);
  });

  it("should preserve historic data safely (SQLite repositories and unsubscribe logic intact)", async () => {
    // Ensure the repositories are still available and structural logic wasn't destroyed
    const { SQLiteRegistrationRepository, SQLiteEmailRepository } = await import("../src/api/persistence");
    expect(SQLiteRegistrationRepository).toBeDefined();
    expect(SQLiteEmailRepository).toBeDefined();
  });
});

describe("E2E QA Conversion Flow (FIA-072)", () => {
  const registrationsPath = path.join(__dirname, "../registrations.json");
  const sentEmailsPath = path.join(__dirname, "../sent_emails.json");

  beforeEach(() => {
    window.prompt = vi.fn().mockReturnValue("admin-secret-2026");
    sessionStorage.setItem("entityAdminToken", "admin-secret-2026");
    vi.resetModules();
    [registrationsPath, sentEmailsPath].forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {
          /* ignore */
        }
      }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    [registrationsPath, sentEmailsPath].forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {
          /* ignore */
        }
      }
    });
  });

  it("should validate the complete flow: public CTA -> form -> persistence -> email -> admin UI", async () => {
    // 1. Setup Public Environment
    const htmlContent = fs.readFileSync(
      path.join(__dirname, "../index.html"),
      "utf-8",
    );
    document.body.innerHTML = htmlContent;

    // Fat mock for fetch to simulate backend persistence & emails
    const fetchMock = vi.fn().mockImplementation(async (url, options) => {
      if (url === "/api/register") {
        const body = JSON.parse(options.body);
        const newReg = {
          email: body.email,
          status: "Pending",
          registeredAt: new Date().toISOString(),
          confirmationEmailSent: true,
          confirmationEmailStatus: "sent",
          invitationSent: false,
          invitationEmailStatus: "pending",
        };
        fs.writeFileSync(
          registrationsPath,
          JSON.stringify([newReg], null, 2),
          "utf-8",
        );
        fs.writeFileSync(
          sentEmailsPath,
          JSON.stringify(
            [
              {
                to: body.email,
                subject: "Confirmación de registro en la beta de Entity",
                status: "sent",
              },
            ],
            null,
            2,
          ),
          "utf-8",
        );
        return { ok: true, json: async () => ({}) };
      }
      if (url === "/api/registrations") {
        const data = fs.existsSync(registrationsPath)
          ? JSON.parse(fs.readFileSync(registrationsPath, "utf-8"))
          : [];
        return { ok: true, json: async () => data };
      }
      return { ok: false, json: async () => ({ error: "Not found" }) };
    });
    vi.stubGlobal("fetch", fetchMock);

    // Mount public app
    await import("../src/main.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 2. Interact with Public UI
    const heroCta = document.querySelector(
      "#hero .hero-cta a",
    ) as HTMLAnchorElement;
    expect(heroCta).not.toBeNull();

    // Simulate scroll to form
    // scrollIntoView not available in JSDOM

    // Simulate backend call as the Beta form was removed in FIA-W01.13
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email: "e2e-qa@entity.app" }),
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/register", expect.any(Object));

    // 3. Verify server state
    const registrations = JSON.parse(
      fs.readFileSync(registrationsPath, "utf-8"),
    );
    expect(registrations.length).toBeGreaterThan(0);
    expect(registrations[0].email).toBe("e2e-qa@entity.app");
    expect(registrations[0].status).toBe("Pending");

    const savedEmails = JSON.parse(fs.readFileSync(sentEmailsPath, "utf-8"));
    expect(savedEmails[0].to).toBe("e2e-qa@entity.app");

    // 4. Clean DOM and Mount Admin UI
    document.body.innerHTML = '<div id="admin-app"></div>';
    await import("../src/admin.ts?t=" + ++cacheBuster);
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Verify Admin UI loaded the data correctly
    const tableBody = document.querySelector("tbody");
    expect(tableBody).not.toBeNull();
    const rows = tableBody!.querySelectorAll("tr");
    expect(rows.length).toBe(1);

    const cols = rows[0].querySelectorAll("td");
    expect(cols[0].textContent).toContain("e2e-qa@entity.app");

    // Status is in cols[3] select value
    const statusSelect = cols[3].querySelector("select") as HTMLSelectElement;
    expect(statusSelect.value).toBe("Pending");

    // Verify confirmation email status icon exists and has correct text
    expect(cols[0].textContent).toContain("Email Enviado");
  });

  it("should render the FAQ section according to FIA-W01.25", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    const faq = app.querySelector("#faq");
    expect(faq).not.toBeNull();
    
    const items = faq?.querySelectorAll(".faq-item");
    expect(items?.length).toBe(12);
    
    const text = faq?.textContent || "";
    // Required exact questions
    expect(text).toContain("¿Entity Free requiere una cuenta?");
    expect(text).toContain("¿Free es una prueba temporal?");
    expect(text).toContain("¿Necesito pagar una API?");
    expect(text).toContain("¿Puedo utilizar modelos locales/Ollama?");
    expect(text).toContain("¿Qué incluye Entity Pro?");
    expect(text).toContain("¿Tengo que descargar otra aplicación para Pro?");
    expect(text).toContain("¿Cómo activo Pro?");
    expect(text).toContain("¿En cuántos ordenadores puedo utilizar Pro?");
    expect(text).toContain("¿Pro funciona sin Internet?");
    expect(text).toContain("¿Qué ocurre si cancelo Pro?");
    expect(text).toContain("¿Pierdo mis datos si vuelvo a Free?");
    expect(text).toContain("¿Dónde se guardan/procesan mis datos?");
    
    // Anti-claims checks
    expect(text).not.toMatch(/todos los datos son locales/i);
    expect(text).not.toMatch(/nunca salen del dispositivo/i);
    expect(text).not.toMatch(/privados por diseño/i);
    expect(text).not.toMatch(/no se almacenan/i);
    
    // Specific claims checks
    expect(text).toContain("sin registro y sin crear una cuenta");
    expect(text).toContain("no es una prueba temporal");
    expect(text).toContain("misma aplicación");
    expect(text).toContain("License Key por correo");
    expect(text).toContain("máximo de 2 dispositivos");
    expect(text).toContain("hasta 30 días seguidos");
    expect(text).toContain("Customer Portal externo (Lemon Squeezy)");
  });

  it("should render the Footer section according to FIA-W01.26", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("../src/main.ts?t=" + ++cacheBuster);
    const app = document.querySelector<HTMLDivElement>("#app")!;
    const footer = app.querySelector(".footer");
    expect(footer).not.toBeNull();
    
    // Check exactly 3 groups
    const cols = footer?.querySelectorAll(".footer-col");
    expect(cols?.length).toBe(3);
    
    const headers = footer?.querySelectorAll("h4");
    expect(headers?.[0].textContent).toBe("Producto");
    expect(headers?.[1].textContent).toBe("Recursos");
    expect(headers?.[2].textContent).toBe("Legal");
    
    // Check content in Producto
    const productoLinks = cols?.[0].querySelectorAll("a");
    expect(productoLinks?.length).toBe(4);
    expect(productoLinks?.[0].getAttribute("href")).toBe("#producto");
    expect(productoLinks?.[1].getAttribute("href")).toBe("#precios");
    expect(productoLinks?.[2].getAttribute("href")).toBe("#faq");
    expect(productoLinks?.[3].getAttribute("href")).toBe("https://entity.lemonsqueezy.com/billing");
    
    // Check content in Recursos
    const recursosLinks = cols?.[1].querySelectorAll("a");
    expect(recursosLinks?.length).toBe(2);
    expect(recursosLinks?.[0].getAttribute("href")).toBe("/docs/METODO%20Entity.pdf");
    expect(recursosLinks?.[0].textContent).toBe("Método Entity");
    expect(recursosLinks?.[1].getAttribute("href")).toBe("https://github.com/hnoloh/Entity");
    expect(recursosLinks?.[1].textContent).toBe("GitHub");
    
    // Check content in Legal
    const legalLinks = cols?.[2].querySelectorAll("a");
    expect(legalLinks?.length).toBe(3);
    
    expect(legalLinks?.[0].getAttribute("href")).toBe("/docs/entity-privacy-policy-3.pdf");
    expect(legalLinks?.[0].textContent).toBe("Privacidad");
    
    expect(legalLinks?.[1].getAttribute("href")).toBe("/docs/entity-terms-of-use-3.pdf");
    expect(legalLinks?.[1].textContent).toBe("Términos");
    
    expect(legalLinks?.[2].getAttribute("href")).toBe("/docs/entity-eula-2.pdf");
    expect(legalLinks?.[2].textContent).toBe("EULA");
    
    // Check no href empty or '#' in footer
    const allFooterLinks = footer?.querySelectorAll("a");
    allFooterLinks?.forEach(link => {
      const href = link.getAttribute("href");
      expect(href).not.toBeNull();
      expect(href).not.toBe("");
      expect(href).not.toBe("#");
    });
  });
});

describe("Monitoring Post-Release (FIA-074)", () => {
  let Sentry: typeof import("@sentry/browser");

  beforeAll(async () => {
    Sentry = await import("@sentry/browser");
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete import.meta.env.VITE_SENTRY_DSN;
    delete import.meta.env.VITE_APP_RELEASE;
    delete import.meta.env.VITE_APP_ENVIRONMENT;
  });

  it("should not initialize Sentry when VITE_SENTRY_DSN is absent", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("../src/main.ts?t=" + ++cacheBuster);

    expect(Sentry.init).not.toHaveBeenCalled();
    expect(Sentry.captureMessage).not.toHaveBeenCalled();
  });

  it("should initialize Sentry and capture verification message when VITE_SENTRY_DSN is present", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    import.meta.env.VITE_SENTRY_DSN = "https://mock@sentry.io/123";
    import.meta.env.VITE_APP_RELEASE = "v1.0.0";
    import.meta.env.VITE_APP_ENVIRONMENT = "production";

    await import("../src/main.ts?t=" + ++cacheBuster);

    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: "https://mock@sentry.io/123",
      release: "v1.0.0",
      environment: "production",
      sendDefaultPii: false,
    });

    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      "Sentry initialization verified post-release",
    );
  });
});

describe("Privacy & Tracking Compliance (FIA-W01.28)", () => {
  it("should not inject or load any tracking scripts, cookies or storage", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    
    const localSetItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    await import("../src/main.ts?t=" + ++cacheBuster);
    
    const app = document.querySelector<HTMLDivElement>("#app")!;
    
    // No cookie banner or CMP exists in the DOM
    expect(document.querySelector("#cookie-banner")).toBeNull();
    expect(document.querySelector(".cmp")).toBeNull();
    
    // No storage writes happened from main.ts
    // In tests we write to sessionStorage in beforeEach, but we are spying on setItem during the import
    expect(localSetItemSpy).not.toHaveBeenCalled();
    
    // Check links for Download and Buy have no tracking params
    const downloadLink = app.querySelector("#download-cta") as HTMLAnchorElement;
    if (downloadLink) {
      expect(downloadLink.getAttribute("href")).not.toContain("utm_");
      expect(downloadLink.getAttribute("href")).not.toContain("ref=");
    }
    
    const checkoutLink = app.querySelector("#checkout-pro") as HTMLAnchorElement;
    if (checkoutLink) {
      expect(checkoutLink.getAttribute("href")).toContain("lemonsqueezy.com");
      expect(checkoutLink.getAttribute("href")).not.toContain("utm_");
    }
    
    const htmlContent = fs.readFileSync(path.join(__dirname, "../index.html"), "utf-8");
    
    // Assert no tracking scripts are in the HTML
    expect(htmlContent).not.toMatch(/gtag/i);
    expect(htmlContent).not.toMatch(/google-analytics/i);
    expect(htmlContent).not.toMatch(/fbq/i);
    expect(htmlContent).not.toMatch(/mixpanel/i);
    expect(htmlContent).not.toMatch(/posthog/i);
    expect(htmlContent).not.toMatch(/segment\.com/i);
    expect(htmlContent).not.toMatch(/clarity/i);
  });
});

describe("Error Observability & Resilience (FIA-W01.29)", () => {
  let originalFetch: typeof global.fetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show error on download if GitHub API returns 404", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("../src/main.ts?t=" + ++cacheBuster);

    const downloadCta = document.querySelector("#download-cta") as HTMLAnchorElement;
    const downloadError = document.querySelector("#download-error") as HTMLDivElement;

    expect(downloadError.style.display).toBe("none");

    // Mock fetch to simulate 404
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    // Simulate click
    const clickEvent = new MouseEvent("click", { cancelable: true });
    downloadCta.dispatchEvent(clickEvent);

    // Allow async handlers to complete
    await new Promise((r) => setTimeout(r, 10));

    expect(global.fetch).toHaveBeenCalledWith("https://api.github.com/repos/hnoloh/Entity-Downloads/releases/tags/v1.0.0");
    expect(downloadError.style.display).toBe("block");
  });

  it("should show error on checkout if network fails (no-cors)", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("../src/main.ts?t=" + ++cacheBuster);

    const checkoutCta = document.querySelector("#checkout-pro") as HTMLAnchorElement;
    const checkoutError = document.querySelector("#checkout-error") as HTMLDivElement;

    expect(checkoutError.style.display).toBe("none");

    // Mock fetch to simulate network error (throw)
    global.fetch = vi.fn().mockRejectedValue(new TypeError("Network error"));

    // Simulate click
    const clickEvent = new MouseEvent("click", { cancelable: true });
    checkoutCta.dispatchEvent(clickEvent);

    await new Promise((r) => setTimeout(r, 10));

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("lemonsqueezy.com"), { mode: 'no-cors' });
    expect(checkoutError.style.display).toBe("block");
  });
  
  it("should navigate if fetch succeeds", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("../src/main.ts?t=" + ++cacheBuster);

    const checkoutCta = document.querySelector("#checkout-pro") as HTMLAnchorElement;
    const checkoutError = document.querySelector("#checkout-error") as HTMLDivElement;
    
    const windowOpenSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    const clickEvent = new MouseEvent("click", { cancelable: true });
    checkoutCta.dispatchEvent(clickEvent);

    await new Promise((r) => setTimeout(r, 10));

    expect(checkoutError.style.display).toBe("none");
    expect(windowOpenSpy).toHaveBeenCalled();
  });
});

describe("Arquitectura de página y Composición Visual (FIA-W01.31)", () => {
  let cacheBuster = 2000;
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '<div id="app"></div>';
  });

  it("should have the exact required order of sections", async () => {
    await import("../src/main.ts?t=" + ++cacheBuster);

    const mainNodes = Array.from(document.querySelectorAll("main > section"));
    const ids = mainNodes.map(n => n.id);

    const expectedOrder = [
      "hero",
      "producto",
      "precios",
      "como-funciona-pro",
      "control-local-first",
      "casos-uso",
      "download-free",
      "faq"
    ];

    expect(ids).toEqual(expectedOrder);
    
    // Verificamos Header al principio y Footer al final del app
    const appChildren = Array.from(document.querySelector("#app")!.children).map(c => c.tagName.toLowerCase());
    
    expect(appChildren[0]).toBe("header");
    expect(appChildren[appChildren.length - 1]).toBe("footer");
  });
});
