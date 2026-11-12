/*
 * AboVirtual México · calendario de agendamiento.
 * Muestra los horarios disponibles según las reglas de la firma (hora del centro, CDMX):
 *   lunes a viernes presencial 10:00–17:30 y videollamada 17:30–20:00,
 *   sábado 10:00–14:00, domingo cerrado. Citas de 45 min más 15 de descanso.
 * Al confirmar abre WhatsApp con la solicitud lista y ofrece agregar la cita a
 * Google Calendar o descargarla (.ics). El equipo confirma la cita por WhatsApp.
 * No guarda ni envía datos a ningún otro lugar.
 */
(() => {
  "use strict";
  const M = window.ABV_MARKET;
  const roots = document.querySelectorAll("[data-agenda]");
  if (!M || !roots.length) return;

  const TZ = "America/Mexico_City";
  const DIAS = 21;          // días hacia adelante que se muestran
  const DURACION = 45;      // minutos de cita
  const numero = M.whatsapp[0].number;
  const oficina = M.office || "Ciudad de México";
  const MODOS = {
    presencial: { label: "Presencial · Plaza Carso, CDMX", corto: "Presencial en oficina" },
    online: { label: "Videollamada · Google Meet", corto: "Videollamada" },
  };

  // Horarios de inicio (HH:MM) por día de la semana y modalidad. 0 = domingo.
  const horarios = (dow, modo) => {
    if (dow === 0) return [];
    if (dow === 6) return ["10:00", "11:00", "12:00", "13:00"];
    if (modo === "presencial") return ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
    return ["17:30", "18:30"];
  };

  // Fecha y hora actuales en CDMX, sin depender de la zona del visitante.
  const ahoraCdmx = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { y: +p.year, m: +p.month, d: +p.day, min: +p.hour * 60 + +p.minute };
  };
  const pad = (n) => String(n).padStart(2, "0");
  const fmtDia = new Intl.DateTimeFormat("es-MX", { weekday: "short", timeZone: "UTC" });
  const fmtNum = new Intl.DateTimeFormat("es-MX", { day: "numeric", timeZone: "UTC" });
  const fmtMes = new Intl.DateTimeFormat("es-MX", { month: "short", timeZone: "UTC" });
  const fmtLargo = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

  const dias = () => {
    const h = ahoraCdmx();
    const base = Date.UTC(h.y, h.m - 1, h.d);
    const out = [];
    for (let i = 0; i < DIAS; i++) {
      const f = new Date(base + i * 864e5);
      out.push({ f, hoy: i === 0, ahoraMin: h.min, key: `${f.getUTCFullYear()}-${pad(f.getUTCMonth() + 1)}-${pad(f.getUTCDate())}` });
    }
    return out;
  };
  const libres = (dia, modo) => horarios(dia.f.getUTCDay(), modo).filter((t) => {
    if (!dia.hoy) return true;
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm > dia.ahoraMin + 90; // al menos 90 min de anticipación
  });

  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "text") n.textContent = v;
      else n.setAttribute(k, v === true ? "" : v);
    }
    kids.flat().forEach((k) => k != null && n.append(k));
    return n;
  };
  const clean = (v) => String(v || "").replace(/\s+/g, " ").trim();
  const sello = (key, t, plus = 0) => {
    const [y, m, d] = key.split("-").map(Number);
    const [hh, mm] = t.split(":").map(Number);
    const x = new Date(Date.UTC(y, m - 1, d, hh, mm + plus));
    return `${x.getUTCFullYear()}${pad(x.getUTCMonth() + 1)}${pad(x.getUTCDate())}T${pad(x.getUTCHours())}${pad(x.getUTCMinutes())}00`;
  };
  const icsEsc = (s) => s.replace(/[\\,;]/g, (c) => "\\" + c).replace(/\n/g, "\\n");

  roots.forEach((root, idx) => {
    const preServicio = new URLSearchParams(location.search).get("servicio") || "";
    const st = { modo: "", dia: null, hora: "" };
    const uid = "ag" + idx;

    // Paso 1 · modalidad
    const modos = el("div", { class: "agenda__modes", role: "radiogroup", "aria-label": "Modalidad" },
      Object.entries(MODOS).map(([id, m]) => el("button", { type: "button", class: "agenda__mode", "data-modo": id, "aria-pressed": "false" },
        el("b", { text: m.label }),
        el("small", { text: id === "presencial" ? "Lunes a viernes 10:00–17:30 · sábado 10:00–14:00" : "Lunes a viernes 17:30–20:00 · sábado 10:00–14:00" }))));

    // Paso 2 · asunto
    const sel = el("select", { name: "servicio", id: uid + "-svc" }, el("option", { value: "", text: "Elija el asunto…" }));
    (M.areas || []).forEach((a) => {
      const g = el("optgroup", { label: a.name });
      (M.services || []).filter((s) => s.area === a.id).forEach((s) => g.append(el("option", { value: s.id, text: s.name })));
      sel.append(g);
    });
    sel.append(el("option", { value: "otro", text: "Otro asunto" }));
    if (preServicio && sel.querySelector(`option[value="${CSS.escape(preServicio)}"]`)) sel.value = preServicio;

    // Paso 3 · día y hora
    const diasBox = el("div", { class: "agenda__days", role: "group", "aria-label": "Día" });
    const horasBox = el("div", { class: "agenda__slots", role: "group", "aria-label": "Hora", "aria-live": "polite" });
    const ayuda = el("p", { class: "agenda__hint", text: "Elija primero la modalidad." });

    // Paso 4 · datos
    const campos = el("div", { class: "fields" },
      el("label", {}, "Nombre", el("input", { name: "nombre", autocomplete: "name", maxlength: "80", required: true })),
      el("label", {}, "WhatsApp", el("input", { name: "whatsapp", type: "tel", inputmode: "tel", autocomplete: "tel", maxlength: "20", placeholder: "55 1234 5678", required: true })),
      el("label", { class: "full" }, "Correo (opcional, para la invitación)", el("input", { name: "correo", type: "email", autocomplete: "email", maxlength: "120" })),
      el("label", { class: "full consent" }, el("input", { type: "checkbox", name: "acepto", value: "si" }), el("span", { text: "Acepto el aviso de privacidad y que me contacten por WhatsApp." })));

    const resumen = el("p", { class: "agenda__sum", "aria-live": "polite", text: "Sin horario elegido." });
    const error = el("p", { class: "form-error", role: "alert", hidden: true });
    const enviar = el("button", { type: "submit", class: "btn btn--gold agenda__go" }, "Solicitar esta cita");
    const listo = el("div", { class: "agenda__ok", hidden: true });

    const form = el("form", { class: "agenda__form", novalidate: true },
      el("div", { class: "agenda__step" }, el("p", { class: "agenda__label" }, el("span", { text: "1" }), "Modalidad"), modos),
      el("div", { class: "agenda__step" }, el("p", { class: "agenda__label" }, el("span", { text: "2" }), el("label", { for: uid + "-svc", text: "Asunto" })), sel),
      el("div", { class: "agenda__step" }, el("p", { class: "agenda__label" }, el("span", { text: "3" }), "Día y hora (hora del centro)"), diasBox, ayuda, horasBox),
      el("div", { class: "agenda__step" }, el("p", { class: "agenda__label" }, el("span", { text: "4" }), "Sus datos"), campos),
      el("div", { class: "agenda__foot" }, resumen, error, enviar),
      listo);
    root.replaceChildren(form);

    const pintarResumen = () => {
      if (!st.modo || !st.dia || !st.hora) { resumen.textContent = "Sin horario elegido."; return; }
      resumen.replaceChildren("Su cita: ", el("b", { text: `${fmtLargo.format(st.dia.f)}, ${st.hora} h` }), ` · ${MODOS[st.modo].corto}`);
    };
    const pintarHoras = () => {
      horasBox.replaceChildren();
      if (!st.modo) { ayuda.textContent = "Elija primero la modalidad."; return; }
      if (!st.dia) { ayuda.textContent = "Elija un día."; return; }
      const hs = libres(st.dia, st.modo);
      ayuda.textContent = hs.length ? `Horarios disponibles el ${fmtLargo.format(st.dia.f)}:` : "Ese día no hay horarios para esta modalidad. Elija otro.";
      hs.forEach((t) => {
        const b = el("button", { type: "button", class: "agenda__slot", "aria-pressed": String(t === st.hora), text: t });
        b.addEventListener("click", () => { st.hora = t; pintarHoras(); pintarResumen(); });
        horasBox.append(b);
      });
    };
    const pintarDias = () => {
      diasBox.replaceChildren();
      dias().forEach((d) => {
        const n = st.modo ? libres(d, st.modo).length : horarios(d.f.getUTCDay(), "presencial").length;
        const on = st.dia && st.dia.key === d.key;
        const b = el("button", { type: "button", class: "agenda__day", "aria-pressed": String(!!on), disabled: n === 0 },
          el("small", { text: fmtDia.format(d.f).replace(".", "") }), el("b", { text: fmtNum.format(d.f) }), el("small", { text: fmtMes.format(d.f).replace(".", "") }));
        b.addEventListener("click", () => { st.dia = d; st.hora = ""; pintarDias(); pintarHoras(); pintarResumen(); });
        diasBox.append(b);
      });
    };
    modos.querySelectorAll("[data-modo]").forEach((b) => b.addEventListener("click", () => {
      st.modo = b.dataset.modo; st.hora = "";
      modos.querySelectorAll("[data-modo]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      if (st.dia && !libres(st.dia, st.modo).length) st.dia = null;
      pintarDias(); pintarHoras(); pintarResumen();
    }));
    pintarDias();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const nombre = clean(d.get("nombre"));
      const tel = clean(d.get("whatsapp")).replace(/[^\d+]/g, "");
      const falta = [];
      if (!st.modo) falta.push("la modalidad");
      if (!st.dia || !st.hora) falta.push("el día y la hora");
      if (!sel.value) falta.push("el asunto");
      if (!nombre) falta.push("su nombre");
      if (tel.replace(/\D/g, "").length < 10) falta.push("un WhatsApp de 10 dígitos");
      if (!d.get("acepto")) falta.push("aceptar el aviso de privacidad");
      if (falta.length) { error.textContent = "Para agendar falta " + falta.join(", ") + "."; error.hidden = false; return; }
      error.hidden = true;

      const servicio = sel.value === "otro" ? "Otro asunto" : (M.services.find((s) => s.id === sel.value) || {}).name || sel.value;
      const cuando = `${fmtLargo.format(st.dia.f)}, ${st.hora} h (hora del centro)`;
      const lugar = st.modo === "presencial" ? oficina : "Videollamada por Google Meet (le enviamos el enlace)";
      const correo = clean(d.get("correo"));
      const lineas = [
        "Hola, quiero agendar una cita con AboVirtual México.", "",
        "Fecha: " + cuando, "Modalidad: " + MODOS[st.modo].corto, "Asunto: " + servicio,
        "Nombre: " + nombre, "WhatsApp: " + tel,
      ];
      if (correo) lineas.push("Correo: " + correo);
      const utm = new URLSearchParams(location.search);
      const origen = ["utm_source", "utm_campaign", "utm_content"].map((k) => utm.get(k)).filter(Boolean).join(" / ");
      lineas.push("Origen: " + (origen || location.hostname));
      window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(lineas.join("\n")), "_blank", "noopener");

      const titulo = `AboVirtual México · ${servicio}`;
      const detalle = `Cita ${MODOS[st.modo].corto.toLowerCase()} con AboVirtual México. Asunto: ${servicio}. Confirmación por WhatsApp +${numero}.`;
      const ini = sello(st.dia.key, st.hora), fin = sello(st.dia.key, st.hora, DURACION);
      const gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE"
        + "&text=" + encodeURIComponent(titulo) + "&dates=" + ini + "/" + fin + "&ctz=" + encodeURIComponent(TZ)
        + "&details=" + encodeURIComponent(detalle) + "&location=" + encodeURIComponent(lugar);
      const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AboVirtual Mexico//Agenda//ES", "BEGIN:VEVENT",
        "UID:" + ini + "-" + Math.random().toString(36).slice(2) + "@abovirtual-mx",
        "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z",
        "DTSTART;TZID=" + TZ + ":" + ini, "DTEND;TZID=" + TZ + ":" + fin,
        "SUMMARY:" + icsEsc(titulo), "DESCRIPTION:" + icsEsc(detalle), "LOCATION:" + icsEsc(lugar),
        "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      const icsUrl = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));

      listo.replaceChildren(
        el("p", { class: "agenda__ok-title", text: `Listo, ${nombre.split(" ")[0]}. Su solicitud está en WhatsApp.` }),
        el("p", { text: `${cuando} · ${MODOS[st.modo].corto}. Presione enviar en WhatsApp y un abogado le confirma la cita.` }),
        el("div", { class: "agenda__ok-actions" },
          el("a", { class: "btn btn--line", href: gcal, target: "_blank", rel: "noopener noreferrer", text: "Agregar a Google Calendar" }),
          el("a", { class: "btn btn--line", href: icsUrl, download: "cita-abovirtual-mexico.ics", text: "Descargar invitación (.ics)" })));
      listo.hidden = false;
      listo.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
})();
