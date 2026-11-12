/*
 * AboVirtual México · formulario de contacto.
 * Arma el mensaje con los datos del formulario y lo abre en WhatsApp México,
 * con la etiqueta MX, el estado, el servicio y el origen (utm) para el CRM.
 * No guarda ni envía datos a ningún otro lugar.
 */
(() => {
  "use strict";
  const form = document.getElementById("contactForm");
  const M = window.ABV_MARKET;
  if (!form || !M) return;

  const err = document.getElementById("contactError");
  const ok = document.getElementById("contactOk");
  const clean = (v) => String(v || "").replace(/\s+/g, " ").trim();
  const utm = new URLSearchParams(location.search);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const nombre = clean(d.get("nombre"));
    const tel = clean(d.get("whatsapp")).replace(/[^\d+]/g, "");
    const faltan = [];
    if (!nombre) faltan.push("su nombre");
    if (tel.replace(/\D/g, "").length < 10) faltan.push("un WhatsApp de 10 dígitos");
    if (!d.get("estado")) faltan.push("su estado");
    if (!d.get("servicio")) faltan.push("el servicio");
    if (!d.get("acepto")) faltan.push("aceptar el aviso de privacidad");
    if (faltan.length) {
      err.textContent = "Para continuar falta " + faltan.join(", ") + ".";
      err.hidden = false;
      ok.hidden = true;
      return;
    }
    err.hidden = true;

    const lineas = [
      "Hola, quiero que un abogado de AboVirtual México me contacte.",
      "",
      "País: MX",
      "Nombre: " + nombre,
      "WhatsApp: " + tel,
    ];
    const correo = clean(d.get("correo"));
    if (correo) lineas.push("Correo: " + correo);
    lineas.push("Estado: " + clean(d.get("estado")));
    lineas.push("Servicio: " + clean(d.get("servicio")));
    const perfil = clean(d.get("perfil"));
    if (perfil) lineas.push("Perfil: " + perfil);
    const caso = clean(d.get("caso"));
    if (caso) lineas.push("Caso: " + caso);
    const origen = ["utm_source", "utm_campaign", "utm_content"].map((k) => utm.get(k)).filter(Boolean).join(" / ");
    if (origen) lineas.push("Origen: " + origen);

    const numero = M.whatsapp[0].number;
    window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(lineas.join("\n")), "_blank", "noopener");
    ok.textContent = "Gracias, " + nombre.split(" ")[0] + ". Se abrió WhatsApp con su mensaje listo: solo presione enviar y un abogado le responde.";
    ok.hidden = false;
  });
})();
