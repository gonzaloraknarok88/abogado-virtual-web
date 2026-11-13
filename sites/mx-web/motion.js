/*
 * AboVirtual México · movimiento.
 * 1) Carrusel de video [data-cine]: avanza solo, barra de progreso, se pausa fuera de pantalla.
 * 2) Mapa interactivo [data-mapa]: 32 estados, rutas desde la oficina de CDMX, ficha por estado,
 *    filtros, recorrido automático hasta que la persona toca el mapa.
 * Sin dependencias ni scripts en línea (CSP). No guarda ni envía datos.
 */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const M = window.ABV_MARKET;
  const WA_NUM = (M && M.whatsapp && M.whatsapp[0] && M.whatsapp[0].number) || "525612133685";
  const NS = "http://www.w3.org/2000/svg";
  const ver = (el, fn, umbral) => {
    if (!("IntersectionObserver" in window)) { fn(true); return; }
    new IntersectionObserver((es) => es.forEach((e) => fn(e.isIntersecting)), { threshold: umbral || 0.3 }).observe(el);
  };

  /* ---------------- Globo de bienvenida del Concierge (como en Chile) ---------------- */
  (() => {
    const globo = document.getElementById("botTeaser");
    if (!globo) return;
    const KEY = "abv-mx-teaser";
    let visto = false;
    try { visto = sessionStorage.getItem(KEY) === "1"; } catch (e) { /* sin almacenamiento */ }
    if (visto) return;
    const marcar = () => { try { sessionStorage.setItem(KEY, "1"); } catch (e) { /* sin almacenamiento */ } };
    let encima = false, ocultar = 0;
    const cerrar = () => { globo.hidden = true; marcar(); clearTimeout(ocultar); };
    globo.addEventListener("pointerenter", () => { encima = true; });
    globo.addEventListener("pointerleave", () => { encima = false; });
    globo.addEventListener("focusin", () => { encima = true; });
    globo.querySelector("[data-teaser-close]").addEventListener("click", cerrar);
    globo.querySelector("[data-bot]").addEventListener("click", cerrar);
    document.getElementById("botBtn")?.addEventListener("click", cerrar);
    setTimeout(() => {
      if (document.body.classList.contains("bot-open")) return;
      globo.hidden = false;
      marcar();
      const auto = () => { if (encima) { ocultar = setTimeout(auto, 3000); return; } globo.hidden = true; };
      ocultar = setTimeout(auto, 12000);
    }, 3000);
  })();

  /* ---------------- Carrusel de video ---------------- */
  document.querySelectorAll("[data-cine]").forEach((root) => {
    const slides = Array.from(root.querySelectorAll(".cine__slide"));
    const track = root.querySelector(".cine__track");
    const nEl = root.querySelector("[data-cine-n]");
    const btnPausa = root.querySelector("[data-cine-pause]");
    const movil = () => window.matchMedia("(max-width: 760px)").matches;
    const DURA = 6200;
    let i = 0, visible = false, pausado = reduce, timer = 0, scrollAuto = 0;

    const video = (k) => slides[k].querySelector("video");
    const cargar = (v) => { if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src; };

    function correr() {
      clearTimeout(timer);
      slides.forEach((s, k) => { if (k !== i) { video(k).pause(); s.classList.remove("is-run"); } });
      const s = slides[i], v = video(i);
      s.classList.remove("is-run");
      void s.offsetWidth; // reinicia la barra
      if (!visible || pausado) { v.pause(); return; }
      cargar(v);
      try { v.currentTime = 0; } catch (e) { /* aún sin metadatos */ }
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
      s.classList.add("is-run");
      timer = setTimeout(() => ir(i + 1), DURA);
      // precarga el siguiente
      cargar(video((i + 1) % slides.length));
    }

    function ir(k, origen) {
      i = (k + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle("is-on", j === i));
      nEl.textContent = String(i + 1).padStart(2, "0");
      if (movil() && origen !== "scroll") {
        scrollAuto = Date.now();
        const s = slides[i];
        track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: reduce ? "auto" : "smooth" });
      }
      correr();
    }

    root.querySelector("[data-cine-prev]").addEventListener("click", () => ir(i - 1));
    root.querySelector("[data-cine-next]").addEventListener("click", () => ir(i + 1));
    btnPausa.addEventListener("click", () => {
      pausado = !pausado;
      root.classList.toggle("is-paused", pausado);
      btnPausa.textContent = pausado ? "▶" : "❚❚";
      btnPausa.setAttribute("aria-label", pausado ? "Reproducir" : "Pausar");
      correr();
    });
    if (pausado) { root.classList.add("is-paused"); btnPausa.textContent = "▶"; btnPausa.setAttribute("aria-label", "Reproducir"); }
    slides.forEach((s, k) => s.addEventListener("click", (e) => {
      if (k !== i && !e.target.closest("a,button")) ir(k);
    }));
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") ir(i + 1);
      if (e.key === "ArrowLeft") ir(i - 1);
    });
    // En celular, deslizar con el dedo también cambia el video activo.
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!movil() || !e.isIntersecting || Date.now() - scrollAuto < 900) return;
        const k = slides.indexOf(e.target);
        if (k !== i) ir(k, "scroll");
      }), { root: track, threshold: 0.7 });
      slides.forEach((s) => io.observe(s));
    }
    ver(root, (v) => { visible = v; correr(); }, 0.35);
  });

  /* ---------------- Mapa interactivo ---------------- */
  document.querySelectorAll("[data-mapa]").forEach((root) => {
    const svg = root.querySelector(".mapa__svg");
    const stage = root.querySelector(".mapa__stage");
    const tip = root.querySelector(".mapa__tip");
    const panel = root.querySelector(".mapa__panel");
    const sec = root.closest("section") || root;
    const paths = Array.from(root.querySelectorAll(".mapa__edo"));
    const chips = Array.from(sec.querySelectorAll("[data-chip]"));
    const filtros = Array.from(sec.querySelectorAll("[data-mapa-filtro]"));
    const porId = {};
    paths.forEach((p, k) => { porId[p.dataset.id] = p; p.id = "edo-" + p.dataset.id; p.style.setProperty("--i", k); });
    const $ = (s) => root.querySelector(s);
    const cuenta = $("[data-mapa-count]");
    const sede = porId.cmx;
    if (!sede) return;

    const centro = (p) => { const b = p.getBBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
    const el = (tag, attrs, padre) => {
      const n = document.createElementNS(NS, tag);
      Object.keys(attrs).forEach((a) => n.setAttribute(a, attrs[a]));
      if (padre) padre.appendChild(n);
      return n;
    };

    // Resalte del estado elegido, encima de todos (sin mover el trazo original ni su foco).
    const sel = el("use", { class: "mapa__sel", href: "#edo-cmx" }, svg);

    // Rutas doradas desde la oficina de CDMX hacia las zonas de foco.
    const c0 = centro(sede);
    const rutas = $(".mapa__rutas");
    const pins = $(".mapa__pins");
    paths.filter((p) => p.classList.contains("is-prio")).forEach((p, k) => {
      const c = centro(p);
      const dx = c.x - c0.x, dy = c.y - c0.y;
      const cx = c0.x + dx / 2 + dy * 0.28, cy = c0.y + dy / 2 - Math.abs(dx) * 0.28 - 18;
      const d = `M${c0.x.toFixed(1)} ${c0.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
      const r = el("path", { d, class: "mapa__ruta", pathLength: "1" }, rutas);
      r.style.setProperty("--k", k);
      el("path", { d, class: "mapa__flujo", pathLength: "1" }, rutas).style.setProperty("--k", k);
      if (!reduce) {
        const punto = el("circle", { r: "2.6", class: "mapa__punto" }, rutas);
        el("animateMotion", { dur: "3.4s", repeatCount: "indefinite", begin: (1.8 + k * 0.45).toFixed(2) + "s", path: d }, punto);
      }
      const g = el("g", { class: "mapa__pin", transform: `translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})` }, pins);
      g.style.setProperty("--k", k);
      el("circle", { r: "9", class: "mapa__onda" }, g);
      el("circle", { r: "3.4", class: "mapa__nucleo" }, g);
    });
    const gs = el("g", { class: "mapa__pin mapa__pin--sede", transform: `translate(${c0.x.toFixed(1)} ${c0.y.toFixed(1)})` }, pins);
    el("circle", { r: "34", fill: "url(#mapaHalo)", class: "mapa__halo" }, gs);
    el("circle", { r: "12", class: "mapa__onda" }, gs);
    el("circle", { r: "12", class: "mapa__onda mapa__onda--2" }, gs);
    el("circle", { r: "5", class: "mapa__nucleo" }, gs);

    // Ficha del estado
    const T = {
      tag: $("[data-mapa-tag]"), nombre: $("[data-mapa-nombre]"), zona: $("[data-mapa-zona]"),
      texto: $("[data-mapa-texto]"), modo: $("[data-mapa-modo]"), wa: $("[data-mapa-wa]"),
    };
    function elegir(id) {
      const p = porId[id];
      if (!p) return;
      const nombre = p.dataset.nombre, zona = p.dataset.zona || "";
      const tipo = id === "cmx" ? "sede" : zona ? "prio" : "nac";
      paths.forEach((x) => x.classList.toggle("is-sel", x === p));
      chips.forEach((c) => { const on = c.dataset.chip === id; c.classList.toggle("is-sel", on); c.setAttribute("aria-pressed", on ? "true" : "false"); });
      sel.setAttribute("href", "#edo-" + id);
      sel.setAttribute("class", "mapa__sel mapa__sel--" + tipo);
      panel.dataset.tipo = tipo;
      T.tag.textContent = tipo === "sede" ? "Sede · Oficina presencial" : tipo === "prio" ? "Zona de foco · Videollamada" : "Atención por videollamada";
      T.nombre.textContent = nombre;
      T.zona.textContent = zona || "Cobertura en todo el estado";
      T.texto.textContent = tipo === "sede"
        ? "Nuestra oficina está en Plaza Carso, Torre Frisko, piso 7. Reuniones presenciales con cita previa y videollamada de lunes a sábado."
        : tipo === "prio"
          ? `Atendemos ${nombre} por videollamada con un abogado dedicado, con especial foco en ${zona}. Si prefiere reunirse en persona, le recibimos en nuestra oficina de la CDMX.`
          : `Le atendemos en ${nombre} por videollamada, con el mismo abogado de principio a fin y precio publicado. Si prefiere reunirse en persona, le recibimos en nuestra oficina de la CDMX.`;
      T.modo.textContent = tipo === "sede" ? "Presencial y videollamada" : "Videollamada (Google Meet)";
      T.wa.href = "https://wa.me/" + WA_NUM + "?text=" + encodeURIComponent(`Hola, escribo desde ${nombre} y quiero hablar con un abogado de AboVirtual México.`);
      panel.classList.remove("is-swap");
      void panel.offsetWidth;
      panel.classList.add("is-swap");
    }

    // Recorrido automático por las zonas de foco hasta que la persona interactúa.
    const tour = ["cmx", "nle", "jal", "roo", "gro", "que"];
    let t = 0, tourTimer = 0, tocado = false, visto = false;
    const pararTour = () => { tocado = true; clearInterval(tourTimer); };
    function tourOn(v) {
      clearInterval(tourTimer);
      if (!v || tocado || reduce) return;
      tourTimer = setInterval(() => { t = (t + 1) % tour.length; elegir(tour[t]); }, 3800);
    }

    paths.forEach((p) => {
      p.addEventListener("click", () => { pararTour(); elegir(p.dataset.id); });
      p.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pararTour(); elegir(p.dataset.id); }
      });
      p.addEventListener("focus", () => { pararTour(); elegir(p.dataset.id); });
      p.addEventListener("pointermove", (e) => {
        const r = stage.getBoundingClientRect();
        tip.textContent = p.dataset.nombre;
        tip.style.transform = `translate(${Math.round(e.clientX - r.left + 14)}px, ${Math.round(e.clientY - r.top - 34)}px)`;
        tip.classList.add("is-on");
      });
      p.addEventListener("pointerleave", () => tip.classList.remove("is-on"));
    });
    chips.forEach((c) => c.addEventListener("click", () => {
      pararTour();
      elegir(c.dataset.chip);
      if (window.matchMedia("(max-width: 760px)").matches) stage.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }));

    // Contador animado
    let actual = 0;
    function contar(meta) {
      if (reduce) { cuenta.textContent = meta; actual = meta; return; }
      const desde = actual, t0 = performance.now(), dur = 1200;
      const paso = (ahora) => {
        const f = Math.min(1, (ahora - t0) / dur), e = 1 - Math.pow(1 - f, 3);
        actual = Math.round(desde + (meta - desde) * e);
        cuenta.textContent = actual;
        if (f < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    }
    filtros.forEach((b) => b.addEventListener("click", () => {
      const f = b.dataset.mapaFiltro;
      root.dataset.filtro = f;
      filtros.forEach((x) => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      chips.forEach((c) => c.parentElement.classList.toggle("is-dim",
        f === "prio" ? !(c.classList.contains("is-prio") || c.classList.contains("is-sede")) : f === "sede" ? !c.classList.contains("is-sede") : false));
      contar(f === "prio" ? 6 : f === "sede" ? 1 : 32);
      pararTour();
      if (f === "sede") elegir("cmx");
    }));

    elegir("cmx");
    cuenta.textContent = "0";
    ver(root, (v) => {
      if (v && !visto) { visto = true; root.classList.add("is-on"); contar(32); }
      tourOn(v);
    }, 0.25);
  });
})();
