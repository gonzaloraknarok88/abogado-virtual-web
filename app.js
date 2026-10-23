(() => {
  "use strict";

  const BOOKING_URL = "https://calendar.app.google/HrtUwuC47YpjmokJA";
  const WA = { primary: "56954509331", secondary: "56923865953" };
  const WA_LINES = [
    { key: "primary", label: "Línea principal", display: "+56 9 5450 9331" },
    { key: "secondary", label: "Línea secundaria", display: "+56 9 2386 5953" },
  ];

  const AREAS = [
    { id: "familia", name: "Familia" },
    { id: "empresas", name: "Empresas y pymes" },
    { id: "laboral", name: "Laboral" },
    { id: "civil", name: "Civil" },
    { id: "ciber", name: "Ciberseguridad y digital" },
  ];

  // Catálogo oficial (octubre 2026). price: null = valor según evaluación.
  const SERVICES = [
    { id: "divorcio-mutuo", area: "familia", name: "Divorcio de mutuo acuerdo",
      desc: "Cuando ambos están de acuerdo. Redactamos el acuerdo completo y te acompañamos hasta la sentencia.",
      price: 99990, from: false, pay: "Pago único", tag: "Precio único" },
    { id: "divorcio-unilateral", area: "familia", name: "Divorcio unilateral o régimen de visitas",
      desc: "Cuando no hay acuerdo, o necesitas regular la relación directa y regular con tus hijos.",
      price: 199990, from: false, pay: "En 2 cuotas", tag: "Más solicitado" },
    { id: "pension", area: "familia", name: "Pensión de alimentos",
      desc: "Demanda, aumento, rebaja o cese de pensión, incluida la mediación previa.",
      price: 359990, from: false, pay: "En 3 cuotas" },
    { id: "ley-karin", area: "empresas", name: "Protocolo Ley Karin",
      desc: "Protocolo de prevención del acoso laboral, sexual y la violencia en el trabajo (Ley 21.643), a la medida de tu empresa.",
      price: 99990, from: true, pay: "Según tamaño de la empresa" },
    { id: "sociedades", area: "empresas", name: "Constitución de sociedades",
      desc: "Creamos tu empresa con la estructura correcta desde el inicio.",
      price: 250000, from: true, pay: "50% al inicio · 50% al finalizar" },
    { id: "finiquito", area: "laboral", name: "Revisión de finiquito",
      desc: "Antes de firmar, revisamos que tu finiquito incluya todo lo que te corresponde.",
      price: 0, from: false, pay: "Sin costo", tag: "Gratis" },
    { id: "defensa-laboral", area: "laboral", name: "Defensa laboral",
      desc: "Despido injustificado, autodespido, tutela de derechos y cobro de prestaciones.",
      price: null, pay: "Valor según el caso" },
    { id: "posesion", area: "civil", name: "Posesión efectiva exprés",
      desc: "Tramitamos la herencia para que puedas disponer de los bienes sin vueltas.",
      price: null, pay: "Valor según el caso" },
    { id: "arriendos", area: "civil", name: "Arriendos blindados y desalojos",
      desc: "Contratos que te protegen y procesos de desalojo y cobro de rentas.",
      price: null, pay: "Valor según el caso" },
    { id: "fraudes", area: "ciber", name: "Fraudes y estafas",
      desc: "Estafas bancarias, compras falsas o suplantación: te asesoramos en el reclamo al banco, la denuncia y la querella.",
      price: null, pay: "Valor según el caso", tag: "Nuevo" },
    { id: "delitos-informaticos", area: "ciber", name: "Delitos informáticos y ciberacoso",
      desc: "Hackeo de cuentas, robo de identidad, filtración de datos o acoso en redes, según la Ley 21.459 de delitos informáticos.",
      price: null, pay: "Valor según el caso", tag: "Nuevo" },
    { id: "ciber-empresas", area: "ciber", name: "Ciberseguridad para empresas",
      desc: "Diagnóstico de riesgos, políticas internas y respuesta ante incidentes, con un equipo que te asesora 24/7.",
      price: null, pay: "Plan a la medida", tag: "24/7" },
    { id: "seo", area: "ciber", name: "SEO optimizado y presencia digital",
      desc: "Posicionamos tu empresa en Google con SEO optimizado y el acompañamiento continuo de nuestro equipo 24/7.",
      price: null, pay: "Plan a la medida", tag: "24/7" },
  ];

  const byId = (id) => SERVICES.find((s) => s.id === id);
  const areaName = (id) => (AREAS.find((a) => a.id === id) || {}).name || "";
  const clp = (n) => "$" + n.toLocaleString("es-CL");
  const priceLabel = (s) => (s.price === null ? "A evaluar" : s.price === 0 ? "Gratis" : clp(s.price));
  const fullPrice = (s) => (s.from ? "desde " : "") + priceLabel(s);
  const num = (i) => String(i + 1).padStart(2, "0");
  const waUrl = (number, text) => "https://wa.me/" + number + "?text=" + encodeURIComponent(text);

  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    }
    for (const c of children) if (c) node.append(c);
    return node;
  };
  const ext = { target: "_blank", rel: "noopener noreferrer" };

  const track = (name) => {
    try {
      if (typeof window.gtag === "function") window.gtag("event", name);
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name });
    } catch (_) { /* sin analítica */ }
  };

  // ---------- Colección ----------
  const grid = document.getElementById("lista");
  const checks = document.getElementById("checks");
  const selected = new Set();

  SERVICES.forEach((s, i) => {
    const card = el("li", { class: "card" + (s.area === "ciber" ? " card--dark" : ""), "data-area": s.area, id: "srv-" + s.id },
      el("div", { class: "card__top" },
        el("span", { class: "card__no", text: "N°" + num(i) }),
        el("span", { class: "card__area", text: areaName(s.area) })
      ),
      el("h3", { text: s.name }),
      s.tag ? el("span", { class: "tag", text: s.tag }) : null,
      el("p", { class: "card__desc", text: s.desc }),
      el("div", { class: "card__price" },
        s.from ? el("small", { text: "Desde" }) : null,
        el("strong", { text: priceLabel(s) }),
        el("span", { text: s.pay })
      ),
      el("div", { class: "card__actions" },
        el("button", { type: "button", class: "chip chip--solid", "data-bot": "svc:" + s.id }, "Lo quiero"),
        el("button", { type: "button", class: "chip", "data-add": s.id, "aria-pressed": "false" }, "+ Cotización"),
        el("a", { class: "chip", href: BOOKING_URL, ...ext, "data-track": "agendar_" + s.id }, "Agendar")
      )
    );
    grid.append(card);
  });

  AREAS.forEach((a) => {
    const group = el("div", { class: "checks__group" }, el("p", { class: "checks__title", text: a.name }));
    SERVICES.filter((s) => s.area === a.id).forEach((s) => {
      const box = el("input", { type: "checkbox", name: "servicio", value: s.id, id: "chk-" + s.id });
      group.append(el("label", { class: "check", for: "chk-" + s.id }, box,
        el("span", { class: "check__name", text: s.name }),
        el("span", { class: "check__price", text: fullPrice(s) })
      ));
    });
    checks.append(group);
  });

  // ---------- Filtros ----------
  const tabs = document.querySelectorAll(".tab");
  const applyFilter = (f) => {
    tabs.forEach((t) => { const on = t.dataset.filter === f; t.classList.toggle("is-on", on); t.setAttribute("aria-pressed", String(on)); });
    grid.querySelectorAll(".card").forEach((c) => { c.hidden = f !== "todo" && c.dataset.area !== f; });
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => applyFilter(tab.dataset.filter)));
  document.querySelectorAll("[data-filter-go]").forEach((a) => a.addEventListener("click", () => applyFilter(a.dataset.filterGo)));

  // ---------- Cotizador ----------
  const sumCount = document.getElementById("sumCount");
  const sumTotal = document.getElementById("sumTotal");
  const sumNote = document.getElementById("sumNote");
  const formError = document.getElementById("formError");

  function setSelected(id, on) {
    on ? selected.add(id) : selected.delete(id);
    const box = document.getElementById("chk-" + id);
    if (box) box.checked = on;
    const btn = grid.querySelector(`[data-add="${id}"]`);
    if (btn) {
      btn.setAttribute("aria-pressed", String(on));
      btn.textContent = on ? "✓ En cotización" : "+ Cotización";
    }
    refresh();
  }

  function refresh() {
    const chosen = SERVICES.filter((s) => selected.has(s.id));
    const total = chosen.reduce((a, s) => a + (s.price || 0), 0);
    const anyFrom = chosen.some((s) => s.from);
    const anyQuote = chosen.some((s) => s.price === null);
    sumCount.textContent = String(chosen.length);
    sumTotal.textContent = (anyFrom ? "desde " : "") + clp(total);
    sumNote.textContent = !chosen.length
      ? "Elige al menos un servicio."
      : anyQuote
        ? "Incluye servicios con valor según evaluación; te enviaremos el total final."
        : "Total referencial en honorarios. Te confirmamos la propuesta final por WhatsApp.";
    document.querySelector(".quote-pill")?.remove();
    if (chosen.length) {
      document.body.append(el("a", { class: "quote-pill", href: "#cotizar" }, `Cotización (${chosen.length}) · ${sumTotal.textContent}`));
    }
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const id = btn.dataset.add;
    setSelected(id, !selected.has(id));
    track("cotizacion_agregar_" + id);
  });
  checks.addEventListener("change", (e) => {
    if (e.target.name === "servicio") setSelected(e.target.value, e.target.checked);
  });

  const form = document.getElementById("quoteForm");
  let line = "primary";
  form.querySelectorAll("button[type=submit]").forEach((b) =>
    b.addEventListener("click", () => { line = b.dataset.line || "primary"; })
  );
  const clean = (v) => String(v || "").replace(/\s+/g, " ").trim();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = clean(data.get("nombre"));
    const chosen = SERVICES.filter((s) => selected.has(s.id));
    const errors = [];
    if (!chosen.length) errors.push("elige al menos un servicio");
    if (!nombre) errors.push("escribe tu nombre");
    if (errors.length) {
      formError.textContent = "Para enviar, " + errors.join(" y ") + ".";
      formError.hidden = false;
      return;
    }
    formError.hidden = true;

    const total = chosen.reduce((a, s) => a + (s.price || 0), 0);
    const lines = [
      "Hola, quiero cotizar estos servicios de AboVirtual:",
      ...chosen.map((s) => `• ${s.name}: ${fullPrice(s)} (${s.pay})`),
      `Total referencial: ${(chosen.some((s) => s.from) ? "desde " : "") + clp(total)}`,
      "",
      `Nombre: ${nombre}`,
    ];
    const comuna = clean(data.get("comuna"));
    if (comuna) lines.push(`Comuna/ciudad: ${comuna}`);
    lines.push(`Modalidad: ${clean(data.get("modalidad"))}`);
    const caso = clean(data.get("caso"));
    if (caso) lines.push(`Mi caso: ${caso}`);

    track("cotizacion_enviada_" + line);
    window.open(waUrl(WA[line] || WA.primary, lines.join("\n")), "_blank", "noopener");
  });

  // ---------- Asistente (bot con opciones) ----------
  const bot = document.getElementById("bot");
  const botLog = document.getElementById("botLog");
  const botOpts = document.getElementById("botOpts");
  const botBtn = document.getElementById("botBtn");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = { service: null, mode: null };
  let timer = null;

  const say = (text, who = "bot") => {
    botLog.append(el("div", { class: "msg msg--" + who }, el("p", { text })));
    botLog.scrollTop = botLog.scrollHeight;
  };

  // opts: [{ label, go } | { label, href, track }]
  const ask = (texts, opts) => {
    clearTimeout(timer);
    botOpts.replaceChildren();
    const typing = el("div", { class: "msg msg--bot msg--typing", "aria-hidden": "true" }, el("span"), el("span"), el("span"));
    botLog.append(typing);
    botLog.scrollTop = botLog.scrollHeight;
    timer = setTimeout(() => {
      typing.remove();
      [].concat(texts).forEach((t) => say(t));
      opts.forEach((o) => {
        const node = o.href
          ? el("a", { class: "opt opt--link", href: o.href, ...ext, "data-track": o.track }, o.label)
          : el("button", { type: "button", class: "opt" }, o.label);
        if (!o.href) node.addEventListener("click", () => { say(o.label, "me"); o.go(); });
        botOpts.append(node);
      });
      botLog.scrollTop = botLog.scrollHeight;
    }, reduced ? 0 : 420);
  };

  const context = () => {
    const parts = ["Hola, vi el catálogo de AboVirtual."];
    if (ctx.service) parts.push(`Me interesa: ${ctx.service.name} (${fullPrice(ctx.service)}).`);
    if (ctx.mode) parts.push(`Prefiero atención ${ctx.mode}.`);
    if (!ctx.service && !ctx.mode) parts.push("Quiero hacer una consulta.");
    return parts.join(" ");
  };

  const home = { label: "Volver al inicio", go: () => start(true) };

  const flows = {
    areas() {
      ask("¿Qué área necesitas?", [
        ...AREAS.map((a) => ({ label: a.name, go: () => flows.area(a.id) })),
        home,
      ]);
    },
    area(id) {
      ask(`Estos son nuestros servicios de ${areaName(id).toLowerCase()}:`, [
        ...SERVICES.filter((s) => s.area === id).map((s) => ({ label: `${s.name} · ${fullPrice(s)}`, go: () => flows.service(s.id) })),
        { label: "Ver otras áreas", go: flows.areas },
      ]);
    },
    service(id) {
      const s = byId(id);
      ctx.service = s;
      ask([
        `${s.name}: ${fullPrice(s)} (${s.pay.toLowerCase()}).`,
        s.desc,
        "¿Cómo quieres seguir?",
      ], [
        { label: "Agendar una hora", go: flows.agenda },
        { label: "Cotizar por WhatsApp", go: flows.wa },
        { label: selected.has(id) ? "Ya está en mi cotización" : "Agregar a mi cotización", go: () => flows.add(id) },
        { label: "Ver otros servicios", go: flows.areas },
      ]);
    },
    add(id) {
      setSelected(id, true);
      ask("Listo, lo agregué a tu cotización. Puedes sumar más servicios o enviarla ahora.", [
        { label: "Sumar otro servicio", go: flows.areas },
        { label: "Enviar mi cotización", go: () => { closeBot(); location.hash = "cotizar"; } },
      ]);
    },
    agenda() {
      ask("¿Cómo prefieres tu atención?", [
        { label: "Presencial en Providencia", go: () => flows.mode("presencial") },
        { label: "Online por Google Meet", go: () => flows.mode("online") },
        home,
      ]);
    },
    mode(m) {
      ctx.mode = m === "presencial" ? "presencial en Providencia" : "online por Google Meet";
      const info = m === "presencial"
        ? "Atención presencial de lunes a viernes, de 10:00 a 18:30, en Almirante Zegers #764, Providencia (Metro Salvador). Solo con hora agendada."
        : "Atención online por Google Meet, para urgencias o después de las 18:30.";
      ask([info, "Elige tu hora en el calendario y te confirmamos por WhatsApp."], [
        { label: "Abrir calendario y elegir hora", href: BOOKING_URL, track: "bot_agendar_" + m },
        { label: "Prefiero confirmar por WhatsApp", go: flows.wa },
        home,
      ]);
    },
    wa() {
      ask("¿A qué línea de WhatsApp prefieres escribir?", [
        ...WA_LINES.map((l) => ({ label: `${l.label} · ${l.display}`, href: waUrl(WA[l.key], context()), track: "bot_wa_" + l.key })),
        home,
      ]);
    },
    urgent() {
      ctx.service = null;
      ask([
        "Lamentamos lo que pasó. Si fue una estafa bancaria, avisa de inmediato a tu banco para bloquear tus productos.",
        "Luego conversemos tu caso. ¿Qué te pasó?",
      ], [
        ...SERVICES.filter((s) => s.area === "ciber").map((s) => ({ label: s.name, go: () => flows.service(s.id) })),
        { label: "Hablar ahora por WhatsApp", go: flows.wa },
      ]);
    },
  };

  function start(again) {
    ctx.service = null;
    ctx.mode = null;
    ask(again ? "¿En qué más te puedo ayudar?" : ["Hola, soy el asistente de AboVirtual.", "¿En qué te puedo ayudar hoy?"], [
      { label: "Ver servicios y valores", go: flows.areas },
      { label: "Agendar una hora", go: flows.agenda },
      { label: "Fui víctima de fraude o estafa", go: flows.urgent },
      { label: "Ciberseguridad o SEO para mi empresa", go: () => flows.area("ciber") },
      { label: "Hablar por WhatsApp", go: flows.wa },
    ]);
  }

  let started = false;
  function openBot(entry) {
    bot.hidden = false;
    botBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("bot-open");
    if (entry && entry.startsWith("svc:")) {
      const s = byId(entry.slice(4));
      if (s) { started = true; say(`Me interesa: ${s.name}`, "me"); flows.service(s.id); }
    } else if (entry === "agenda") {
      started = true; say("Quiero agendar una hora", "me"); flows.agenda();
    } else if (entry === "urgente") {
      started = true; say("Fui víctima de fraude o estafa", "me"); flows.urgent();
    } else if (entry === "wa") {
      started = true; flows.wa();
    } else if (!started) {
      started = true; start(false);
    }
    setTimeout(() => document.getElementById("botClose").focus(), 50);
    track("bot_abrir_" + (entry || "boton"));
  }
  function closeBot() {
    bot.hidden = true;
    botBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("bot-open");
  }

  botBtn.addEventListener("click", () => (bot.hidden ? openBot() : closeBot()));
  document.getElementById("botClose").addEventListener("click", () => { closeBot(); botBtn.focus(); });
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-bot]");
    if (t) { e.preventDefault(); openBot(t.dataset.bot); }
  });

  // ---------- WhatsApp flotante (como en la web) ----------
  const waBtn = document.getElementById("waBtn");
  const waMenu = document.getElementById("waMenu");
  const toggleWa = (open) => { waMenu.hidden = !open; waBtn.setAttribute("aria-expanded", String(open)); };
  waBtn.addEventListener("click", () => toggleWa(waMenu.hidden));
  document.addEventListener("click", (e) => { if (!e.target.closest(".wa")) toggleWa(false); });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    toggleWa(false);
    if (!bot.hidden) { closeBot(); botBtn.focus(); }
  });

  // ---------- Analítica de clics ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-track]");
    if (a) track(a.dataset.track);
  });

  refresh();
})();

// Videos de historias: se reproducen solo cuando están en pantalla
(() => {
  const vids = document.querySelectorAll(".story video");
  if (!vids.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { v.play().catch(() => {}); } else { v.pause(); }
    });
  }, { threshold: 0.35 });
  vids.forEach((v) => io.observe(v));
})();
