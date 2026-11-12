/*
 * AboVirtual · motor del catálogo (multi-país)
 * Cada país define window.ABV_MARKET en su propio /<pais>/market.js
 * (precios, moneda, WhatsApp, agenda, textos del asistente). Este archivo
 * no tiene datos de ningún país: solo dibuja el catálogo, el cotizador y el asistente.
 */
(() => {
  "use strict";

  const M = window.ABV_MARKET;
  if (!M) return;
  const T = M.text;

  const BOOKING_URL = M.bookingUrl || "";
  const WA_LINES = M.whatsapp; // [{ key, label, number, display }]
  const WA = Object.fromEntries(WA_LINES.map((l) => [l.key, l.number]));
  const AREAS = M.areas;
  const SERVICES = M.services;

  const byId = (id) => SERVICES.find((s) => s.id === id);
  const areaName = (id) => (AREAS.find((a) => a.id === id) || {}).name || "";
  const money = (n) => new Intl.NumberFormat(M.locale, {
    style: "currency", currency: M.currency, maximumFractionDigits: 0, minimumFractionDigits: 0,
  }).format(n) + (M.currencySuffix ? " " + M.currencySuffix : "");
  const priceLabel = (s) => (s.price === null ? T.priceQuote : s.price === 0 ? T.priceFree : money(s.price));
  const fullPrice = (s) => (s.from ? T.from + " " : "") + priceLabel(s);
  // Cuotas exactas: la suma de las cuotas siempre es igual al precio publicado
  const installments = (s) => {
    if (!s.installments || !s.price) return null;
    const n = s.installments;
    const base = Math.floor(s.price / n);
    const rest = s.price - base * n;
    return { n, base, last: base + rest };
  };
  const payLabel = (s) => {
    const c = installments(s);
    if (!c) return s.pay;
    return c.base === c.last
      ? `${c.n} ${T.installmentsOf} ${money(c.base)}`
      : `${c.n - 1} ${T.installmentsOf} ${money(c.base)} + 1 ${T.installmentOf} ${money(c.last)}`;
  };
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
      if (typeof window.gtag === "function") window.gtag("event", name, { market: M.id });
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, market: M.id });
    } catch (_) { /* sin analítica */ }
  };

  // Precios que el HTML marca con data-price="<id>" se rellenan desde market.js,
  // así un cambio de precio se hace en un solo lugar.
  document.querySelectorAll("[data-price]").forEach((n) => {
    const s = byId(n.dataset.price);
    if (s) n.textContent = priceLabel(s);
  });
  document.querySelectorAll("[data-pay]").forEach((n) => {
    const s = byId(n.dataset.pay);
    if (s) n.textContent = payLabel(s);
  });
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const line = WA_LINES.find((l) => l.key === a.dataset.wa) || WA_LINES[0];
    a.href = waUrl(line.number, a.dataset.waText || T.waHello);
  });
  document.querySelectorAll("[data-booking]").forEach((a) => {
    if (BOOKING_URL) { a.href = BOOKING_URL; Object.assign(a, ext); a.target = "_blank"; a.rel = "noopener noreferrer"; }
    else { a.removeAttribute("href"); a.setAttribute("role", "button"); a.dataset.bot = "agenda"; }
  });

  // ---------- Colección ----------
  const grid = document.getElementById("lista");
  const checks = document.getElementById("checks");
  const selected = new Set();

  SERVICES.forEach((s, i) => {
    const dark = AREAS.find((a) => a.id === s.area)?.dark;
    const card = el("li", { class: "card" + (dark ? " card--dark" : ""), "data-area": s.area, id: "srv-" + s.id },
      el("div", { class: "card__top" },
        el("span", { class: "card__no", text: "N°" + num(i) }),
        el("span", { class: "card__area", text: areaName(s.area) })
      ),
      el("h3", { text: s.name }),
      s.tag ? el("span", { class: "tag", text: s.tag }) : null,
      el("p", { class: "card__desc", text: s.desc }),
      el("div", { class: "card__price" },
        s.from ? el("small", { text: T.fromCap }) : null,
        el("strong", { text: priceLabel(s) }),
        el("span", { text: payLabel(s) })
      ),
      el("div", { class: "card__actions" },
        el("button", { type: "button", class: "chip chip--solid", "data-bot": "svc:" + s.id }, T.want),
        el("button", { type: "button", class: "chip", "data-add": s.id, "aria-pressed": "false" }, T.addQuote),
        BOOKING_URL
          ? el("a", { class: "chip", href: BOOKING_URL, ...ext, "data-track": "agendar_" + s.id }, T.book)
          : el("button", { type: "button", class: "chip", "data-bot": "agenda" }, T.book)
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
      btn.textContent = on ? T.inQuote : T.addQuote;
    }
    refresh();
  }

  function refresh() {
    const chosen = SERVICES.filter((s) => selected.has(s.id));
    const total = chosen.reduce((a, s) => a + (s.price || 0), 0);
    const anyFrom = chosen.some((s) => s.from);
    const anyQuote = chosen.some((s) => s.price === null);
    sumCount.textContent = String(chosen.length);
    sumTotal.textContent = (anyFrom ? T.from + " " : "") + money(total);
    sumNote.textContent = !chosen.length ? T.noteEmpty : anyQuote ? T.noteQuote : T.noteTotal;
    document.querySelector(".quote-pill")?.remove();
    if (chosen.length) {
      document.body.append(el("a", { class: "quote-pill", href: "#cotizar" }, `${T.quotePill} (${chosen.length}) · ${sumTotal.textContent}`));
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
  let line = WA_LINES[0].key;
  form.querySelectorAll("button[type=submit]").forEach((b) =>
    b.addEventListener("click", () => { line = b.dataset.line || WA_LINES[0].key; })
  );
  const clean = (v) => String(v || "").replace(/\s+/g, " ").trim();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = clean(data.get("nombre"));
    const chosen = SERVICES.filter((s) => selected.has(s.id));
    const errors = [];
    if (!chosen.length) errors.push(T.errService);
    if (!nombre) errors.push(T.errName);
    if (errors.length) {
      formError.textContent = T.errPrefix + " " + errors.join(" " + T.and + " ") + ".";
      formError.hidden = false;
      return;
    }
    formError.hidden = true;

    const total = chosen.reduce((a, s) => a + (s.price || 0), 0);
    const lines = [
      T.quoteMsgHead,
      ...chosen.map((s) => `• ${s.name}: ${fullPrice(s)} (${payLabel(s)})`),
      `${T.quoteMsgTotal}: ${(chosen.some((s) => s.from) ? T.from + " " : "") + money(total)}`,
      "",
      `${T.fieldName}: ${nombre}`,
    ];
    const zona = clean(data.get("zona"));
    if (zona) lines.push(`${T.fieldZone}: ${zona}`);
    lines.push(`${T.fieldMode}: ${clean(data.get("modalidad"))}`);
    const caso = clean(data.get("caso"));
    if (caso) lines.push(`${T.fieldCase}: ${caso}`);

    track("cotizacion_enviada_" + line);
    window.open(waUrl(WA[line] || WA_LINES[0].number, lines.join("\n")), "_blank", "noopener");
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
    const parts = [T.ctxHello];
    if (ctx.service) parts.push(`${T.ctxWant}: ${ctx.service.name} (${fullPrice(ctx.service)}).`);
    if (ctx.mode) parts.push(`${T.ctxMode} ${ctx.mode}.`);
    if (!ctx.service && !ctx.mode) parts.push(T.ctxGeneric);
    return parts.join(" ");
  };

  const home = { label: T.botHome, go: () => start(true) };

  const flows = {
    areas() {
      ask(T.botWhichArea, [...AREAS.map((a) => ({ label: a.name, go: () => flows.area(a.id) })), home]);
    },
    area(id) {
      ask(`${T.botAreaList} ${areaName(id).toLowerCase()}:`, [
        ...SERVICES.filter((s) => s.area === id).map((s) => ({ label: `${s.name} · ${fullPrice(s)}`, go: () => flows.service(s.id) })),
        { label: T.botOtherAreas, go: flows.areas },
      ]);
    },
    service(id) {
      const s = byId(id);
      ctx.service = s;
      ask([`${s.name}: ${fullPrice(s)} (${payLabel(s).toLowerCase()}).`, s.desc, T.botHowNext], [
        { label: T.botBook, go: flows.agenda },
        { label: T.botQuoteWa, go: flows.wa },
        { label: selected.has(id) ? T.botAlready : T.botAdd, go: () => flows.add(id) },
        { label: T.botOtherServices, go: flows.areas },
      ]);
    },
    add(id) {
      setSelected(id, true);
      ask(T.botAdded, [
        { label: T.botAddMore, go: flows.areas },
        { label: T.botSendQuote, go: () => { closeBot(); location.hash = "cotizar"; } },
      ]);
    },
    agenda() {
      ask(T.botWhichMode, [...M.modes.map((m) => ({ label: m.label, go: () => flows.mode(m) })), home]);
    },
    mode(m) {
      ctx.mode = m.ctx;
      const opts = [];
      if (BOOKING_URL) opts.push({ label: T.botOpenCalendar, href: BOOKING_URL, track: "bot_agendar_" + m.id });
      opts.push({ label: BOOKING_URL ? T.botConfirmWa : T.botBookWa, go: flows.wa }, home);
      ask([m.info, BOOKING_URL ? T.botPickTime : T.botWeConfirm], opts);
    },
    wa() {
      ask(T.botWhichLine, [
        ...WA_LINES.map((l) => ({ label: `${l.label} · ${l.display}`, href: waUrl(l.number, context()), track: "bot_wa_" + l.key })),
        home,
      ]);
    },
    urgent() {
      ctx.service = null;
      ask(T.botUrgent, [
        ...SERVICES.filter((s) => s.area === M.urgentArea).map((s) => ({ label: s.name, go: () => flows.service(s.id) })),
        { label: T.botTalkNow, go: flows.wa },
      ]);
    },
  };

  function start(again) {
    ctx.service = null;
    ctx.mode = null;
    const opts = [
      { label: T.botSeeServices, go: flows.areas },
      { label: T.botBook, go: flows.agenda },
    ];
    if (M.urgentArea) opts.push({ label: T.botVictim, go: flows.urgent });
    (M.botShortcuts || []).forEach((sc) => opts.push({ label: sc.label, go: () => flows.area(sc.area) }));
    opts.push({ label: T.botTalkWa, go: flows.wa });
    ask(again ? T.botAgain : T.botHello, opts);
  }

  let started = false;
  function openBot(entry) {
    bot.hidden = false;
    botBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("bot-open");
    if (entry && entry.startsWith("svc:")) {
      const s = byId(entry.slice(4));
      if (s) { started = true; say(`${T.ctxWant}: ${s.name}`, "me"); flows.service(s.id); }
    } else if (entry && entry.startsWith("area:")) {
      started = true; flows.area(entry.slice(5));
    } else if (entry === "agenda") {
      started = true; say(T.meBook, "me"); flows.agenda();
    } else if (entry === "urgente") {
      started = true; say(T.botVictim, "me"); flows.urgent();
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

  // ---------- WhatsApp flotante ----------
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
