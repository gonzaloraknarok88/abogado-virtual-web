/*
 * AboVirtual México · medición (Google Analytics 4 y Meta Pixel).
 * Se activa sola cuando market.js tiene los IDs en `analytics`. Con los IDs vacíos no carga nada.
 * Los eventos del sitio (WhatsApp, Concierge, cotizador, agenda) ya se envían con gtag/dataLayer
 * desde assets/catalog.js; aquí se agregan las vistas de página y el evento de cita solicitada.
 */
(() => {
  "use strict";
  const M = window.ABV_MARKET || {};
  const cfg = M.analytics || {};
  const cargar = (src) => { const s = document.createElement("script"); s.async = true; s.src = src; document.head.append(s); };

  if (/^G-[A-Z0-9]+$/.test(cfg.ga4 || "")) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", cfg.ga4, { anonymize_ip: true });
    cargar("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga4));
  }

  if (/^\d{8,20}$/.test(cfg.metaPixel || "")) {
    const q = [];
    const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : q.push(arguments); };
    fbq.queue = q; fbq.loaded = true; fbq.version = "2.0"; fbq.push = fbq;
    window.fbq = window._fbq = fbq;
    cargar("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", cfg.metaPixel);
    fbq("track", "PageView");
  }

  // Clics a WhatsApp y citas solicitadas como conversiones.
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href*="wa.me/"]');
    if (a && window.fbq) window.fbq("track", "Contact");
  });
  document.addEventListener("abv:cita", (e) => {
    if (window.gtag) window.gtag("event", "cita_solicitada", { modalidad: e.detail && e.detail.modo, market: "mx" });
    if (window.fbq) window.fbq("track", "Schedule");
  });
})();
