"""Genera las páginas del sitio AboVirtual México (/mx) con encabezado, pie y Concierge comunes.

Uso (desde la raíz del repo):
    python3 tools/build_mx.py

Edita los textos aquí y vuelve a correrlo. Los precios NO van aquí: salen de mx/market.js
(los spans con data-price / data-pay se rellenan solos en el navegador; el texto de este
archivo es solo el respaldo sin JavaScript).
"""
from __future__ import annotations

import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "mx"
WA = "https://wa.me/525612133685"
FONTS = ("https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700"
         "&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Montserrat:wght@300;400;500;600&display=swap")

AREAS = [
    ("familia", "Familia y patrimonio", "Divorcios, pensión, custodia y capitulaciones"),
    ("empresas", "Empresas y corporativos", "Laboral, NOM-035, sociedades, contratos e iguala"),
    ("patrimonio", "Patrimonio 360", "Inmobiliario, inversiones y fideicomisos"),
    ("ciber", "Ciber y tecnología", "Fraudes, ciberseguridad, SEO y software"),
]
NAV = [("catalogo", "Catálogo"), ("firma", "La firma"), ("metodo", "Método"), ("contacto", "Contacto")]

# Respaldo de precios sin JavaScript (deben coincidir con market.js).
PRECIO = {
    "divorcio-voluntario": "$5,190 MXN", "divorcio-incausado": "$10,390 MXN", "familia-integral": "$18,590 MXN",
    "nom-035": "$5,190 MXN", "sociedades": "$12,990 MXN", "finiquito": "Sin costo",
}
PAGO = {"divorcio-incausado": "2 cuotas de $5,195 MXN", "familia-integral": "En 3 cuotas mensuales"}


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def head(slug: str, titulo: str, desc: str, extra_ld: dict | None = None) -> str:
    url = "/mx/" if slug == "index" else f"/mx/{slug}"
    ld = {
        "@context": "https://schema.org", "@type": "LegalService", "name": "AboVirtual México",
        "url": "https://abovirtual-mexico.vercel.app/mx/", "image": "/mx/monograma.svg",
        "telephone": "+525612133685", "priceRange": "$$$",
        "areaServed": [{"@type": "City", "name": c} for c in (
            "Ciudad de México", "Monterrey", "San Pedro Garza García", "Guadalajara", "Zapopan",
            "Cancún", "Playa del Carmen", "Acapulco", "Querétaro")],
        "address": {"@type": "PostalAddress", "addressLocality": "Ciudad de México", "addressCountry": "MX"},
    }
    lds = [ld] + ([extra_ld] if extra_ld else [])
    ld_html = "\n".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in lds)
    return f"""<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="theme-color" content="#800020">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="es-MX" href="{url}">
<link rel="alternate" hreflang="es-CL" href="https://www.abogadovirtualchile.cl/">
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(titulo)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="/mx/monograma.svg">
<meta property="og:locale" content="es_MX">
<link rel="icon" href="/mx/monograma.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{FONTS}" rel="stylesheet">
<link rel="stylesheet" href="/mx/mx.css">
{ld_html}
<script src="/mx/market.js" defer></script>
<script src="/assets/catalog.js" defer></script>
<script src="/mx/site.js" defer></script>
</head>
"""


def header(activo: str) -> str:
    cur = lambda s: ' aria-current="page"' if s == activo else ""
    drop = "".join(f'<a href="/mx/{s}"{cur(s)}>{n}<small>{d}</small></a>' for s, n, d in AREAS)
    nav = "".join(f'<a href="/mx/{s}"{cur(s)}>{n}</a>' for s, n in NAV)
    mob = "".join(f'<a class="sub" href="/mx/{s}">{n}</a>' for s, n, _ in AREAS)
    mob_nav = "".join(f'<a href="/mx/{s}">{n}</a>' for s, n in NAV)
    area_on = ' aria-current="page"' if activo in [a[0] for a in AREAS] else ""
    return f"""<body class="page-{activo}">
<a class="skip" href="#main">Saltar al contenido</a>
<div class="flag" aria-hidden="true"></div>
<div class="topbar"><div class="wrap topbar__in">
  <span><b>México</b> · CDMX · Monterrey · Guadalajara · Cancún · Acapulco · Querétaro</span>
  <span><a data-wa="mx" href="{WA}" target="_blank" rel="noopener noreferrer">WhatsApp +52 56 1213 3685</a></span>
</div></div>
<header class="header" id="top">
  <div class="wrap header__in">
    <a href="/mx/" class="logo" aria-label="AboVirtual México, inicio">
      <img class="logo__mono" src="/mx/monograma.svg" alt="" width="44" height="44">
      <span class="logo__word"><span class="logo__name">ABOVIRTUAL</span><span class="logo__tag">México · Legal &amp; Patrimonio</span></span>
    </a>
    <nav class="menu" aria-label="Principal">
      <div class="menu__item"><a href="/mx/#areas"{area_on}>Áreas</a><div class="menu__drop">{drop}</div></div>
      {nav}
      <details class="mnav"><summary>Menú</summary><div class="mnav__panel"><a href="/mx/">Inicio</a><a href="/mx/#areas">Áreas</a>{mob}{mob_nav}</div></details>
      <button type="button" class="menu__cta" data-bot="start">Concierge</button>
    </nav>
  </div>
</header>
<main id="main">
"""


FOOTER = f"""</main>

<footer class="footer">
  <div class="wrap">
    <div class="footer__in">
      <div>
        <a href="/mx/" class="logo" aria-label="AboVirtual México, inicio">
          <img class="logo__mono" src="/mx/monograma.svg" alt="" width="44" height="44" loading="lazy">
          <span class="logo__word"><span class="logo__name">ABOVIRTUAL</span><span class="logo__tag">México · Legal &amp; Patrimonio</span></span>
        </a>
        <p style="margin-top:22px">Firma legal e inmobiliaria para empresarios, ejecutivos y familias de patrimonio. Parte del Holding Merlink Mastery, con operación en México y Chile.</p>
      </div>
      <div>
        <h4>Áreas</h4>
        <ul>{"".join(f'<li><a href="/mx/{s}">{n}</a></li>' for s, n, _ in AREAS)}<li><a href="/mx/catalogo">Catálogo y precios</a></li></ul>
      </div>
      <div>
        <h4>La firma</h4>
        <ul>
          <li><a href="/mx/firma">Quiénes somos</a></li>
          <li><a href="/mx/metodo">Método y pagos</a></li>
          <li><a href="/mx/contacto">Contacto</a></li>
          <li><a data-wa="mx" href="{WA}" target="_blank" rel="noopener noreferrer">WhatsApp +52 56 1213 3685</a></li>
          <li><a href="/mx/aviso-de-privacidad">Aviso de privacidad</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__legal">
      <span>© 2026 AboVirtual México</span>
      <span>Precios en MXN con IVA incluido, vigentes a noviembre de 2026. Esta información no constituye asesoría legal.</span>
    </div>
  </div>
</footer>

<section class="bot" id="bot" role="dialog" aria-label="Concierge AboVirtual México" hidden>
  <header class="bot__head">
    <img class="bot__avatar" src="/mx/monograma.svg" alt="" width="42" height="42">
    <div><p class="bot__name">Concierge AboVirtual</p><p class="bot__status">En línea · México</p></div>
    <button type="button" class="bot__close" id="botClose" aria-label="Cerrar Concierge">×</button>
  </header>
  <div class="bot__log" id="botLog" aria-live="polite"></div>
  <div class="bot__opts" id="botOpts"></div>
</section>

<div class="float">
  <div class="wa">
    <div class="wa__menu" id="waMenu" hidden>
      <p class="wa__title">¿Platicamos?</p>
      <p class="wa__sub">Consulta privada por WhatsApp</p>
      <a data-wa="mx" href="{WA}" target="_blank" rel="noopener noreferrer" data-track="float_wa"><i aria-hidden="true"></i><span><b>WhatsApp México</b>+52 56 1213 3685</span></a>
    </div>
    <button class="wa__btn" id="waBtn" aria-expanded="false" aria-controls="waMenu" aria-label="Contactar por WhatsApp">
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>
    </button>
  </div>
  <button class="bot__btn" id="botBtn" aria-expanded="false" aria-controls="bot"><span class="bot__dot" aria-hidden="true"></span>Concierge</button>
</div>
</body>
</html>
"""


def wa(texto: str, etiqueta: str, clase: str = "btn btn--gold", track: str = "") -> str:
    return (f'<a class="{clase}" data-wa="mx" data-wa-text="{esc(texto)}" href="{WA}" target="_blank" '
            f'rel="noopener noreferrer" data-track="{track or "wa"}">{etiqueta}</a>')


def phero(crumb: str, eyebrow: str, h1: str, em: str, lead: str, img: str, acciones: str) -> str:
    return f"""<section class="phero"><div class="wrap phero__in">
  <div>
    <p class="crumbs"><a href="/mx/">Inicio</a><span>/</span>{crumb}</p>
    <p class="eyebrow">{eyebrow}</p>
    <h1>{h1}<em>{em}</em></h1>
    <p class="phero__lead">{lead}</p>
    <div class="actions">{acciones}</div>
  </div>
  <div class="phero__media"><img src="{img}" alt="" width="800" height="1000" loading="eager"></div>
</div></section>
"""


def head_block(eyebrow: str, h2: str, p: str = "", centro: bool = False) -> str:
    cls = "head head--center" if centro else "head"
    return (f'<header class="{cls}"><p class="eyebrow">{eyebrow}</p><h2>{h2}</h2>'
            f'<div class="flag flag--thin" aria-hidden="true"></div>{f"<p>{p}</p>" if p else ""}</header>')


def svc(sid: str, titulo: str, texto: str, puntos: list[str], desde: bool = False, cta: str = "Quiero este servicio") -> str:
    precio = PRECIO.get(sid, "A evaluar")
    pago = PAGO.get(sid, "")
    lis = "".join(f"<li>{p}</li>" for p in puntos)
    return f"""<li class="svc" id="{sid}">
  <div><h3>{titulo}</h3><p>{texto}</p><ul>{lis}</ul></div>
  <div class="svc__side">
    {'<span class="svc__from">Desde</span>' if desde else ''}
    <span class="svc__price" data-price="{sid}">{precio}</span>
    <span class="svc__pay" data-pay="{sid}">{pago}</span>
    <button type="button" class="btn btn--ink" data-bot="svc:{sid}">{cta}</button>
  </div>
</li>"""


def band(h2: str, p: str, texto_wa: str) -> str:
    return f"""<section class="band"><div class="wrap band__in">
  <div><h2>{h2}</h2><p>{p}</p></div>
  <div class="actions" style="margin:0">{wa(texto_wa, "Hablar por WhatsApp", "btn btn--gold", "band_wa")}<a class="btn btn--white" href="/mx/contacto">Agendar reunión privada</a></div>
</div></section>
"""


def faq(items: list[tuple[str, str]]) -> str:
    return '<div class="faq">' + "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in items) + "</div>"


CIUDADES = [
    ("Ciudad de México", "Polanco · Lomas · Santa Fe · Pedregal"), ("Nuevo León", "San Pedro Garza García · Monterrey"),
    ("Jalisco", "Guadalajara · Zapopan"), ("Quintana Roo", "Cancún · Playa del Carmen · Tulum"),
    ("Guerrero", "Acapulco Diamante"), ("Querétaro", "Juriquilla · Centro Sur"),
    ("Todo México", "Atención en línea por videollamada"), ("Internacional", "Chile · próximamente EE. UU."),
]


def ciudades() -> str:
    return '<ul class="cities">' + "".join(f"<li><b>{c}</b><span>{z}</span></li>" for c, z in CIUDADES) + "</ul>"


# ============================ PÁGINAS ============================

def inicio() -> str:
    pains = [
        ("Riesgo patrimonial", "Empresa, acciones y propiedades expuestas en una separación o una herencia mal llevada."),
        ("Embargos", "Deudas de pensión o demandas laborales que congelan cuentas, sueldos y bienes."),
        ("Estrés corporativo", "Usted dirige una empresa. No tiene horas para perseguir a su abogado."),
        ("Juicios largos", "Cada mes en pausa es dinero, energía y reputación."),
    ]
    imgs = {"familia": "/media/hf1.webp", "empresas": "/media/hf2.webp", "patrimonio": "/media/hf3.webp", "ciber": "/media/hf4.webp"}
    textos = {
        "familia": "Divorcio por mutuo acuerdo o unilateral, pensión, guarda y custodia, y acuerdos que protegen su patrimonio.",
        "empresas": "Su área legal externa: laboral, NOM-035, sociedades, contratos, empresa familiar e iguala mensual.",
        "patrimonio": "Compra, venta, renta e inversión inmobiliaria con respaldo legal, fideicomisos y Smart Property.",
        "ciber": "Fraudes bancarios, delitos informáticos, ciberseguridad empresarial, SEO y software con CRM.",
    }
    areas = "".join(
        f'<li><a class="area" href="/mx/{s}"><div class="area__img"><img src="{imgs[s]}" alt="" loading="lazy" width="640" height="400"></div>'
        f'<div class="area__body"><span class="area__no">{["I","II","III","IV"][i]}</span><h3>{n}</h3><p>{textos[s]}</p>'
        f'<span class="area__go">Conocer el área →</span></div></a></li>'
        for i, (s, n, _) in enumerate(AREAS))
    areas += ('<li><a class="area area--text" href="/mx/catalogo"><div class="area__body"><span class="area__no">V</span>'
              '<h3>Catálogo completo</h3><p>Los 24 servicios de la firma con precio publicado, cuotas y cotizador en línea.</p>'
              '<span class="area__go">Ver el catálogo →</span></div></a></li>'
              '<li><a class="area area--text" href="/mx/firma"><div class="area__body"><span class="area__no">VI</span>'
              '<h3>La firma</h3><p>Abogados mexicanos con cédula, control de calidad central y un holding con operación internacional.</p>'
              '<span class="area__go">Conocer la firma →</span></div></a></li>')
    reasons = [
        ("Discreción total", "Su vida privada y su empresa se quedan fuera de los reflectores."),
        ("Precio por escrito", "Honorarios publicados con IVA incluido. Sin cobros sorpresa."),
        ("Abogado dedicado", "Una sola persona responde por su caso, de principio a fin."),
        ("Visión patrimonial", "Lo jurídico y lo inmobiliario en una sola firma."),
        ("Holding internacional", "Operación en México y Chile, en expansión a EE. UU."),
    ]
    rates = [
        ("I", "Familia", "Pago único", "Divorcio por mutuo acuerdo", "Ya lo decidieron. Lo resolvemos en línea, rápido y con total discreción.", "divorcio-voluntario", False),
        ("II", "Familia", "2 cuotas", "Divorcio unilateral", "Su pareja no quiere firmar. La ley le permite divorciarse igual.", "divorcio-incausado", False),
        ("III", "Familia", "3 cuotas", "Pensión, guarda y custodia", "Una estrategia que protege a sus hijos y su patrimonio.", "familia-integral", False),
        ("IV", "Empresas", "Corporativo", "Empresas y PYMES", "Laboral, NOM-035, contratos, sociedades e iguala mensual.", "nom-035", True),
    ]
    rate_html = "".join(f"""<li class="rate"><span class="rate__no">{n}</span>
  <div><span class="rate__area">{a} <i class="rate__badge rate__badge--gold">{b}</i></span><h3>{t}</h3></div>
  <p class="rate__note">{d}</p>
  <div><p class="rate__price">{'<small>desde</small>' if desde else ''}<span data-price="{sid}">{PRECIO[sid]}</span></p>
  <div class="rate__cta"><button type="button" class="btn {'btn--gold' if n == 'I' else 'btn--line'}" data-bot="svc:{sid}">Quiero este servicio</button></div></div></li>"""
        for n, a, b, t, d, sid, desde in rates)
    pasos = [("01", "Escríbanos por WhatsApp", "Un abogado revisa su caso con total confidencialidad."),
             ("02", "Reunión privada", "Por videollamada, en su horario, desde su oficina o su casa. O con cita en la CDMX."),
             ("03", "Nos encargamos de todo", "Le reportamos cada avance. Usted no persigue a nadie.")]
    return head("index", "AboVirtual México · Abogados para empresarios, ejecutivos y familias de patrimonio",
                "Firma legal e inmobiliaria en México: divorcios desde $5,190 MXN, familia, empresas, patrimonio e inversiones. "
                "Precio claro, total discreción y atención en CDMX, Monterrey, Guadalajara, Cancún, Acapulco y Querétaro.") + header("index") + f"""
<section class="hero">
  <video class="hero__bg" src="/media/hf3.mp4" poster="/media/hf3.webp" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>
  <div class="wrap hero__in">
    <p class="eyebrow">AboVirtual · México</p>
    <h1>Su tiempo vale demasiado <span>para un juicio largo.</span></h1>
    <p class="hero__lead">Abogados para empresarios, ejecutivos y familias de patrimonio. Divorcios, familia, empresas e inmobiliario con precio claro, total discreción y atención en línea en todo México.</p>
    <div class="actions">
      {wa("Hola, quiero hablar con un abogado de AboVirtual México.", "Hablar con un abogado por WhatsApp", "btn btn--gold", "hero_wa")}
      <a class="btn btn--line" href="/mx/catalogo">Ver servicios y precios</a>
    </div>
    <ul class="stats" aria-label="La firma en cifras">
      <li><b>24</b><span>servicios con precio publicado</span></li>
      <li><b>IVA</b><span>incluido en cada precio</span></li>
      <li><b>6</b><span>estados de atención prioritaria</span></li>
      <li><b>24/7</b><span>Concierge digital</span></li>
    </ul>
  </div>
</section>

<section class="section"><div class="wrap">
  {head_block("Lo que está en juego", 'Lo que <span class="pain">no se puede perder</span>', "Cuando un asunto legal se complica, el costo real no son los honorarios: es el patrimonio, el tiempo y la reputación.")}
  <ul class="pains">{"".join(f"<li><b>{t}</b><p>{p}</p></li>" for t, p in pains)}</ul>
  <p class="remate">Nosotros resolvemos. <b>Usted sigue dirigiendo.</b></p>
</div></section>

<section class="section section--onyx" id="areas"><div class="wrap">
  {head_block("Áreas de práctica", "Una firma, todo su mundo legal", "Familia, empresa, patrimonio y tecnología, con el mismo estándar y un solo equipo.")}
  <ul class="areas">{areas}</ul>
</div></section>

<section class="section" id="tarifas"><div class="wrap">
  {head_block("Honorarios destacados", "Precio claro desde el primer día", "Honorarios con IVA incluido. Si su caso requiere gastos externos, se los decimos antes de empezar.")}
  <ol class="rates">{rate_html}</ol>
  <div class="actions"><a class="btn btn--line" href="/mx/catalogo">Ver los 24 servicios del catálogo</a></div>
</div></section>

<section class="section section--bone"><div class="wrap">
  {head_block("Cómo trabajamos", "Tres pasos. Cero persecuciones.", "", True)}
  <ol class="steps" style="margin-top:0">{"".join(f"<li><span>{n}</span><h3>{t}</h3><p>{p}</p></li>" for n, t, p in pasos)}</ol>
  <div class="actions actions--center"><a class="btn btn--ink" href="/mx/metodo">Conocer el método completo</a></div>
</div></section>

<section class="section"><div class="wrap">
  {head_block("Por qué AboVirtual", "El estándar de una firma internacional")}
  <ul class="reasons">{"".join(f"<li><b>{t}</b><p>{p}</p></li>" for t, p in reasons)}</ul>
</div></section>

<section class="section section--onyx"><div class="wrap center">
  {head_block("Para quién trabajamos", "Donde está el patrimonio de México", "", True)}
  <ul class="who"><li>Empresarios</li><li>Directores y ejecutivos</li><li>Médicos especialistas</li><li>Arquitectos</li><li>Inversionistas</li><li>Hoteleros</li><li>Industriales</li><li>Familias de patrimonio</li></ul>
  {ciudades()}
</div></section>

{band("Compre tiempo. Compre tranquilidad.", "Una reunión privada basta para saber exactamente qué hacer y cuánto cuesta.", "Hola, quiero agendar una reunión privada con AboVirtual México.")}
""" + FOOTER


def familia() -> str:
    ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": "¿Puedo divorciarme si mi pareja no quiere?",
         "acceptedAnswer": {"@type": "Answer", "text": "Sí. La ley mexicana permite el divorcio sin el consentimiento de la otra persona (divorcio incausado o unilateral)."}}]}
    servicios = "".join([
        svc("divorcio-voluntario", "Divorcio por mutuo acuerdo", "Ya lo decidieron juntos. Redactamos el convenio completo y lo llevamos hasta la sentencia, en línea y con total discreción.",
            ["Convenio de bienes, hijos y alimentos", "Demanda y seguimiento hasta la sentencia", "Sin que usted tenga que ir a oficinas"]),
        svc("divorcio-incausado", "Divorcio unilateral (incausado)", "Su pareja no quiere firmar. La ley le permite divorciarse igual: lo llevamos de principio a fin y cuidamos lo que construyó.",
            ["No necesita expresar causa", "Propuesta de convenio que protege su patrimonio", "Régimen de convivencias con sus hijos"]),
        svc("familia-integral", "Pensión, guarda y custodia", "Demanda, aumento, reducción o cancelación de pensión alimenticia, guarda y custodia y convivencias, con negociación previa.",
            ["Estrategia centrada en sus hijos", 'Defensa ante <span class="pain">embargos</span> y medidas de apremio', "Negociación antes de litigar"]),
        svc("capitulaciones", "Capitulaciones y acuerdos prenupciales", "Régimen de bienes y acuerdos antes o durante el matrimonio para proteger empresa, acciones y propiedades.",
            ["Separación de bienes o sociedad conyugal a la medida", "Protección de acciones y empresa familiar", "Revisión de acuerdos existentes"]),
        svc("planeacion-patrimonial", "Planeación patrimonial y sucesoria", "Testamento, donaciones en vida y estructura de bienes para que su patrimonio pase a su familia sin juicios.",
            ["Testamento y designación de tutores", "Orden de bienes en México y el extranjero", "Coordinación con su notario"]),
        svc("sucesiones", "Juicio sucesorio", "Sucesión testamentaria o intestamentaria para que los herederos reciban lo que les corresponde.",
            ["Trámite notarial o judicial", "Inventario y partición de bienes", "Acuerdos entre herederos"]),
    ])
    preguntas = [
        ("¿Puedo divorciarme si mi pareja no quiere?", "Sí. La ley mexicana permite el divorcio sin el consentimiento de la otra persona. Le acompañamos de principio a fin."),
        ("¿El precio incluye todo?", "Incluye los honorarios del servicio con IVA. Si su caso requiere algún gasto externo, como copias certificadas, se lo decimos antes de empezar."),
        ("¿Tengo que ir al juzgado?", "Solo si la ley lo exige, y siempre le acompañamos. El resto se coordina en línea."),
        ("¿Qué pasa con la empresa o las propiedades?", "Las protegemos desde el convenio. Si hay acciones, inmuebles o bienes en otros estados, lo planeamos con el área de patrimonio."),
        ("¿Una pensión sin pagar puede terminar en arresto?", "Puede generar medidas de apremio, embargos e incluso arresto. Actuar a tiempo cambia el resultado."),
        ("¿Atienden fuera de la CDMX?", "Sí. Atendemos en línea en todo México y coordinamos los trámites en cada estado."),
    ]
    return head("familia", "Divorcio y derecho familiar · AboVirtual México",
                "Divorcio por mutuo acuerdo $5,190 MXN, divorcio unilateral $10,390 MXN en 2 cuotas, pensión, guarda y custodia $18,590 MXN en 3 cuotas. Capitulaciones y planeación patrimonial.", ld) + header("familia") + phero(
        "Familia y patrimonio", "Área I · Familia y patrimonio", "Proteja a su familia.", "Y lo que construyó.",
        'Divorcios, pensión, custodia y planeación patrimonial con estrategia, discreción y precio por escrito. Sin <span class="pain">juicios eternos</span> ni <span class="pain">embargos</span> sorpresa.',
        "/media/hf1.webp", wa("Hola, quiero orientación sobre un asunto de familia.", "Hablar con un abogado", "btn btn--gold", "familia_wa") + '<a class="btn btn--line" href="#servicios">Ver servicios y precios</a>') + f"""
<section class="section" id="servicios"><div class="wrap">
  {head_block("Servicios y honorarios", "Familia, con precio claro", "Honorarios con IVA incluido. Los servicios a evaluar se cotizan por escrito después de la primera reunión.")}
  <ul class="svcs">{servicios}</ul>
</div></section>

<section class="section section--onyx"><div class="wrap">
  {head_block("Preguntas frecuentes", "Lo que nos preguntan antes de empezar")}
  {faq(preguntas)}
</div></section>
{band("Una conversación privada cambia el resultado.", "Cuéntenos su caso por WhatsApp. Un abogado le responde con total confidencialidad.", "Hola, necesito orientación sobre un divorcio o un asunto de familia.")}
""" + FOOTER


def empresas() -> str:
    servicios = "".join([
        svc("nom-035", "NOM-035 y protocolo contra el acoso", "Política de riesgos psicosociales y protocolo contra el hostigamiento y acoso laboral, a la medida de su plantilla.",
            ["Diagnóstico y política obligatoria", "Protocolo y canal de denuncias", "Capacitación a mandos"], desde=True, cta="Agendar reunión corporativa"),
        svc("sociedades", "Constitución de sociedades", "S.A. de C.V., S. de R.L. o S.A.S. con la estructura correcta desde el inicio.",
            ["Estatutos y acuerdos entre socios", "Poderes y libros corporativos", "Inscripción y alta fiscal coordinada"], desde=True),
        svc("asesoria-pymes", "Iguala mensual · área legal externa", "Contratos, cobranza, relaciones laborales y cumplimiento con un equipo que ya conoce su empresa.",
            ["Abogado asignado y tiempos de respuesta", "Revisión de contratos ilimitada según plan", "Reporte mensual a dirección"], cta="Solicitar propuesta"),
        svc("empresa-familiar", "Empresa familiar y protocolo de sucesión", "Gobierno corporativo y reglas claras para que la empresa sobreviva a la siguiente generación.",
            ["Protocolo familiar y consejo", "Reglas de entrada y salida de familiares", "Sucesión de acciones"], cta="Solicitar propuesta"),
        svc("contratos", "Contratos mercantiles y corporativos", "Compraventa, distribución, servicios, confidencialidad y acuerdos entre socios.",
            ["Redacción y revisión", "Negociación con contrapartes", "Contratos en inglés para operaciones con EE. UU."], cta="Solicitar propuesta"),
        svc("defensa-laboral", "Defensa laboral para empresas", 'Conciliación prejudicial y defensa ante tribunales laborales, antes de que una demanda <span class="pain">congele cuentas</span>.',
            ["Auditoría de contratos y finiquitos", "Conciliación ante el Centro de Conciliación", "Juicio laboral"], cta="Solicitar propuesta"),
        svc("capacitaciones", "Capacitaciones in company", "Talleres para equipos y directivos: NOM-035, acoso laboral, protección de datos y ciberseguridad.",
            ["Presencial o en línea", "Material y constancias", "Programas para hotelería e industria"], cta="Solicitar propuesta"),
    ])
    sectores = [("Corporativos", "Santa Fe, Polanco, San Pedro"), ("Industria", "Monterrey, Querétaro, Guadalajara"),
                ("Hotelería y turismo", "Cancún, Riviera Maya, Acapulco"), ("Comercio y servicios", "Todo México")]
    return head("empresas", "Abogados para empresas y corporativos · AboVirtual México",
                "NOM-035 desde $5,190 MXN, constitución de sociedades desde $12,990 MXN, iguala mensual, empresa familiar, contratos y defensa laboral para corporativos, industria y hotelería.") + header("empresas") + phero(
        "Empresas y corporativos", "Área II · Empresas y corporativos", "Su área legal externa.", "Sin nómina extra.",
        'Laboral, NOM-035, sociedades, contratos y empresa familiar para corporativos, industria y hotelería. Menos <span class="pain">demandas</span>, menos <span class="pain">estrés corporativo</span>, más tiempo para dirigir.',
        "/media/hf2.webp", wa("Hola, quiero una reunión corporativa con AboVirtual México.", "Agendar reunión corporativa", "btn btn--gold", "empresas_wa") + '<a class="btn btn--line" href="#servicios">Ver servicios</a>') + f"""
<section class="section" id="servicios"><div class="wrap">
  {head_block("Servicios corporativos", "Cumplimiento, contratos y defensa", "Honorarios con IVA incluido. Para iguala, contratos y litigio enviamos una propuesta por escrito.")}
  <ul class="svcs">{servicios}</ul>
</div></section>

<section class="section section--onyx"><div class="wrap">
  {head_block("Sectores", "Trabajamos con empresas de todo el país")}
  <ul class="cities">{"".join(f"<li><b>{a}</b><span>{b}</span></li>" for a, b in sectores)}</ul>
</div></section>
{band("Dirija su empresa. Nosotros cuidamos el frente legal.", "Reunión corporativa por videollamada en su horario.", "Hola, quiero una propuesta legal para mi empresa.")}
""" + FOOTER


def patrimonio() -> str:
    servicios = "".join([
        svc("due-diligence", "Revisión legal de inmuebles", "Antes de comprar o invertir: escrituras, gravámenes, predial, uso de suelo y situación del vendedor.",
            ["Certificado de libertad de gravámenes", "Revisión de uso de suelo y licencias", "Dictamen por escrito"]),
        svc("compraventa", "Compraventa y escrituración", "Le acompañamos en la promesa, la negociación y la firma ante notario.",
            ["Contrato de promesa", "Coordinación con notaría", "Cierre y entrega"]),
        svc("arrendamiento", "Arrendamiento blindado y desalojos", "Contratos que le protegen, cobro de rentas y juicios de desocupación.",
            ["Contrato y póliza jurídica", "Cobranza de rentas", "Juicio especial de desahucio"]),
        svc("fideicomiso", "Fideicomiso y régimen de condominio", "Fideicomiso en zona restringida para compradores extranjeros y estructura legal de desarrollos turísticos.",
            ["Cancún, Riviera Maya y Acapulco", "Régimen de condominio y reglamentos", "Compradores de EE. UU. y Canadá"]),
        svc("inversiones", "Bienes raíces e inversiones 360", "Con Smart Property Inversiones: búsqueda, rentabilidad, compra, mejoras y administración de rentas.",
            ["Análisis de rentabilidad por escrito", "Smart Upgrades para revalorizar", "Gestión de rentas y reportes"], cta="Solicitar plan"),
    ])
    ciclo = [("01", "Buscar", "Propiedades seleccionadas según su objetivo de renta o plusvalía."),
             ("02", "Revisar", "Dictamen legal antes de firmar o pagar un anticipo."),
             ("03", "Comprar", "Promesa, notaría y escrituración, con su abogado presente."),
             ("04", "Rentabilizar", "Mejoras, renta y administración con reporte periódico.")]
    return head("patrimonio", "Patrimonio 360 · Inmobiliario e inversiones · AboVirtual México",
                "Revisión legal de inmuebles, compraventa, arrendamiento blindado, fideicomiso en zona restringida e inversiones inmobiliarias 360 en CDMX, Monterrey, Guadalajara, Cancún y Acapulco.") + header("patrimonio") + phero(
        "Patrimonio 360", "Área III · Patrimonio 360", "Invierta con abogado.", "No con suerte.",
        'Compra, venta, renta e inversión inmobiliaria con respaldo legal en cada paso. Evite <span class="pain">gravámenes ocultos</span>, <span class="pain">inquilinos morosos</span> y operaciones que no se pueden escriturar.',
        "/media/hf3.webp", wa("Hola, quiero asesoría inmobiliaria o de inversión con AboVirtual México.", "Hablar con un asesor", "btn btn--gold", "patrimonio_wa") + '<a class="btn btn--line" href="#servicios">Ver servicios</a>') + f"""
<section class="section"><div class="wrap">
  {head_block("El ciclo 360", "De la búsqueda a la renta, en una sola firma")}
  <ol class="steps steps--4" style="margin-top:0">{"".join(f"<li><span>{n}</span><h3>{t}</h3><p>{p}</p></li>" for n, t, p in ciclo)}</ol>
</div></section>

<section class="section section--onyx" id="servicios"><div class="wrap">
  {head_block("Servicios", "Patrimonio inmobiliario, protegido", "Cada operación se cotiza por escrito según el inmueble y el monto.")}
  <ul class="svcs">{servicios}</ul>
</div></section>

<section class="section"><div class="wrap">
  {head_block("Plazas", "Donde invertimos con usted")}
  {ciudades()}
</div></section>
{band("Su patrimonio merece un plan, no una corazonada.", "Agende una reunión para revisar su operación o su portafolio.", "Hola, quiero revisar una operación inmobiliaria o un plan de inversión.")}
""" + FOOTER


def ciber() -> str:
    servicios = "".join([
        svc("fraudes", "Fraudes y estafas", "Cargos no reconocidos, compras falsas o suplantación: reclamación al banco, queja ante CONDUSEF y denuncia.",
            ["Reclamación bancaria", "Queja ante CONDUSEF", "Denuncia ante el Ministerio Público"]),
        svc("delitos-informaticos", "Delitos informáticos y ciberacoso", "Hackeo de cuentas, robo de identidad, filtración de datos o acoso en redes.",
            ["Preservación de evidencia digital", "Denuncia y seguimiento", "Retiro de contenidos"]),
        svc("ciber-empresas", "Ciberseguridad para empresas", "Diagnóstico de riesgos, aviso de privacidad, políticas internas y respuesta ante incidentes.",
            ["Cumplimiento LFPDPPP", "Plan de respuesta a incidentes", "Acompañamiento 24/7"], cta="Solicitar plan"),
        svc("seo", "SEO y posicionamiento en Google", "Su empresa visible en Google con SEO técnico y de contenido.",
            ["Auditoría y plan de palabras clave", "Contenido y fichas de Google", "Reporte mensual"], cta="Solicitar plan"),
        svc("software-crm", "Software, CRM y automatización", "CRM, bots de WhatsApp y agenda en línea para que no se le escape ningún cliente.",
            ["CRM a la medida", "Bot de WhatsApp y web", "Agenda y recordatorios automáticos"], cta="Solicitar plan"),
    ])
    return head("ciber", "Fraudes, ciberseguridad y tecnología · AboVirtual México",
                "Abogados para fraudes bancarios, delitos informáticos y ciberacoso. Ciberseguridad empresarial, SEO, software y CRM para empresas en México.") + header("ciber") + phero(
        "Ciber y tecnología", "Área IV · Ciber y tecnología", "Si le robaron en línea,", "cada hora cuenta.",
        'Fraudes bancarios, <span class="pain">robo de identidad</span> y <span class="pain">hackeo de cuentas</span>: actuamos rápido con el banco, la CONDUSEF y la autoridad. Y para empresas, ciberseguridad, SEO y software.',
        "/media/hf4.webp", wa("Hola, fui víctima de un fraude o un delito informático y necesito ayuda urgente.", "Ayuda urgente por WhatsApp", "btn btn--gold", "ciber_wa") + '<a class="btn btn--line" href="#servicios">Ver servicios</a>') + f"""
<section class="section"><div class="wrap">
  <div class="alert-band"><b>¿Le acaban de robar?</b> Llame a su banco para bloquear tarjetas y cuentas, no borre mensajes ni correos y escríbanos con capturas. En emergencias, marque 911.</div>
</div></section>
<section class="section section--onyx" id="servicios" style="padding-top:60px"><div class="wrap">
  {head_block("Servicios", "Legal y tecnología, en un solo equipo")}
  <ul class="svcs">{servicios}</ul>
</div></section>
{band("No deje pasar el tiempo.", "Los plazos para reclamar al banco son cortos. Escríbanos hoy.", "Hola, necesito ayuda con un fraude o un tema de ciberseguridad.")}
""" + FOOTER


def firma() -> str:
    equipo = [
        ("D", "Dirección de la firma", "Estrategia y calidad", "Define la estrategia de cada área, revisa los casos complejos y responde por el estándar de la firma en México."),
        ("A", "Abogados asociados en México", "Cédula profesional vigente", "Abogados mexicanos con cédula que llevan su caso de principio a fin y le reportan cada avance."),
        ("G", "Gerencia México", "Operación y clientes", "Coordina agenda, seguimiento y atención a clientes corporativos y familias en cada estado."),
        ("P", "Smart Property Inversiones", "Patrimonio e inversión", "Equipo inmobiliario para búsqueda, análisis, mejoras y gestión de rentas, con respaldo legal."),
        ("T", "Tecnología y ciberseguridad", "Merlink Mastery", "SEO, CRM, automatización y ciberseguridad para empresas, del mismo holding."),
        ("C", "Concierge AboVirtual", "Atención 24/7", "Asistente digital que le orienta, le muestra precios y agenda su reunión a cualquier hora."),
    ]
    pilares = [("I", "Cédula profesional", "Cada caso lo lleva un abogado con cédula vigente en México. Siempre sabe quién es su abogado."),
               ("II", "Control de calidad", "Un equipo central revisa plazos, escritos y comunicación. Usted habla con una sola persona."),
               ("III", "Discreción total", "Sus datos se tratan conforme a la LFPDPPP y a nuestro aviso de privacidad.")]
    return head("firma", "La firma · AboVirtual México",
                "AboVirtual México: abogados mexicanos con cédula, control de calidad central y un holding con operación en México y Chile, en expansión a Estados Unidos.") + header("firma") + phero(
        "La firma", "La firma", "Abogados mexicanos.", "Estándar internacional.",
        "AboVirtual México es una empresa independiente del Holding Merlink Mastery. Combina abogados locales con un método probado de precios publicados, atención digital y control de calidad central.",
        "/media/hf3.webp", '<a class="btn btn--gold" href="/mx/contacto">Agendar reunión privada</a><a class="btn btn--line" href="/mx/metodo">Conocer el método</a>') + f"""
<section class="section"><div class="wrap">
  {head_block("Nuestros pilares", "Lo que no negociamos")}
  <ul class="pillars">{"".join(f"<li><b>{n}</b><h3>{t}</h3><p>{p}</p></li>" for n, t, p in pilares)}</ul>
</div></section>

<section class="section section--onyx"><div class="wrap">
  {head_block("El equipo", "Un equipo para cada parte de su vida", "Su caso lo lleva un abogado asignado, con el respaldo de todo el holding.")}
  <ul class="team">{"".join(f'<li><div class="team__mono" aria-hidden="true">{m}</div><h3>{t}</h3><p class="team__role">{r}</p><p>{p}</p></li>' for m, t, r, p in equipo)}</ul>
</div></section>

<section class="section"><div class="wrap">
  {head_block("Holding Merlink Mastery", "Una firma con alcance internacional")}
  <div class="firm-note" style="margin-top:0"><img class="logo__mono" src="/mx/monograma.svg" alt="" width="64" height="64"><p>Operación en México y Chile, con expansión a Estados Unidos, España y Brasil. AboVirtual (legal), Smart Property Inversiones (inmobiliario) y Merlink Mastery (tecnología y marketing) trabajan como un solo equipo para usted.</p></div>
</div></section>

<section class="section section--onyx"><div class="wrap">
  {head_block("Cobertura", "Atención en todo México", "Reunión presencial en la CDMX con cita previa. En el resto del país, por videollamada, y coordinamos los trámites en cada estado.")}
  {ciudades()}
</div></section>
{band("Conozca a su abogado antes de decidir.", "La primera reunión es privada y sin compromiso de contratación.", "Hola, quiero conocer a AboVirtual México y agendar una reunión.")}
""" + FOOTER


def metodo() -> str:
    pasos = [("01", "Primer contacto", "Por WhatsApp, el Concierge o el formulario. Le respondemos en horario hábil el mismo día."),
             ("02", "Reunión privada", "Videollamada o cita en la CDMX. Entendemos su caso y le damos una estrategia."),
             ("03", "Propuesta por escrito", "Precio, cuotas, alcance y tiempos estimados. Sin letras chiquitas."),
             ("04", "Ejecución", "Su abogado asignado se encarga de todo y le reporta cada avance."),
             ("05", "Cierre", "Le entregamos resoluciones, documentos y siguientes pasos para proteger lo logrado.")]
    pagos = [("Pago único", "Divorcio por mutuo acuerdo y servicios de alcance definido."),
             ("Cuotas mensuales", "Divorcio unilateral en 2 cuotas y área de familia en 3 cuotas."),
             ("Iguala o proyecto", "Empresas, patrimonio y tecnología con propuesta por escrito.")]
    preguntas = [
        ("¿El precio incluye todo?", "Incluye los honorarios del servicio con IVA. Si su caso requiere algún gasto externo, se lo decimos antes de empezar."),
        ("¿Tengo que ir a una oficina?", "No. Todo se coordina en línea. Solo acudirá al juzgado si la ley lo exige, y le acompañamos."),
        ("¿Mi caso será confidencial?", "Sí. Manejamos cada expediente con estricta confidencialidad y conforme a la LFPDPPP."),
        ("¿Cuánto tarda?", "Depende del juzgado y de cada caso. En la primera reunión le damos un estimado honesto."),
        ("¿Atienden empresas fuera de la Ciudad de México?", "Sí: corporativos, industria, hotelería y comercio en las principales ciudades del país."),
        ("¿Cómo pago?", "Por transferencia o depósito, con factura. Las cuotas se pagan mes a mes según su propuesta."),
        ("¿Quién lleva mi caso?", "Un abogado mexicano con cédula profesional, asignado desde el inicio, con el respaldo del equipo central."),
        ("¿Puedo hablar en inglés?", "Sí. Atendemos a clientes y compradores extranjeros, sobre todo en Cancún, Riviera Maya y Acapulco."),
    ]
    return head("metodo", "Método, pagos y preguntas frecuentes · AboVirtual México",
                "Cómo trabajamos en AboVirtual México: reunión privada, propuesta por escrito, abogado asignado y pagos en cuotas. Preguntas frecuentes.") + header("metodo") + phero(
        "Método", "El método AboVirtual", "Usted decide.", "Nosotros ejecutamos.",
        "Cinco pasos claros, una propuesta por escrito y un abogado que le reporta. Así se evita lo que más cansa de un asunto legal: no saber en qué va.",
        "/media/hf2.webp", '<a class="btn btn--gold" href="/mx/contacto">Agendar reunión privada</a>') + f"""
<section class="section"><div class="wrap">
  {head_block("Paso a paso", "Del primer mensaje al cierre")}
  <ol class="steps steps--5" style="margin-top:0">{"".join(f"<li><span>{n}</span><h3>{t}</h3><p>{p}</p></li>" for n, t, p in pasos)}</ol>
</div></section>

<section class="section section--onyx"><div class="wrap">
  {head_block("Formas de pago", "Precio claro, pagos a su ritmo")}
  <ul class="payments">{"".join(f"<li><b>{t}</b><p>{p}</p></li>" for t, p in pagos)}</ul>
</div></section>

<section class="section"><div class="wrap">
  {head_block("Preguntas frecuentes", "Respuestas directas")}
  {faq(preguntas)}
</div></section>
{band("¿Listo para empezar?", "Escríbanos y agende su reunión privada.", "Hola, quiero agendar una reunión privada con AboVirtual México.")}
""" + FOOTER


def contacto() -> str:
    estados = ["Ciudad de México", "Nuevo León", "Jalisco", "Quintana Roo", "Guerrero", "Querétaro", "Estado de México", "Otro"]
    servicios = ["Divorcio por mutuo acuerdo", "Divorcio unilateral", "Pensión, guarda y custodia", "Planeación patrimonial",
                 "Empresas y corporativos", "Inmobiliario e inversiones", "Fraude o ciberseguridad", "SEO, software o CRM", "Otro"]
    perfiles = ["Dueño de empresa", "Director o ejecutivo", "Profesional independiente", "Inversionista", "Otro"]
    opts = lambda xs: "".join(f"<option>{x}</option>" for x in xs)
    return head("contacto", "Contacto · Agende una reunión privada · AboVirtual México",
                "Agende una reunión privada con AboVirtual México por WhatsApp +52 56 1213 3685, videollamada o cita en la CDMX.") + header("contacto") + phero(
        "Contacto", "Contacto", "Agende una", "reunión privada.",
        "Déjenos sus datos y un abogado le escribe por WhatsApp. Si prefiere adelantar, escríbanos directo.",
        "/media/hf3.webp", wa("Hola, quiero agendar una reunión privada con AboVirtual México.", "WhatsApp +52 56 1213 3685", "btn btn--gold", "contacto_wa")) + f"""
<section class="section section--bone"><div class="wrap contact">
  <div class="contact__info">
    <div><h3>WhatsApp</h3><p><a data-wa="mx" href="{WA}" target="_blank" rel="noopener noreferrer">+52 56 1213 3685</a></p></div>
    <div><h3>Reunión presencial</h3><p>Ciudad de México, con cita previa.</p></div>
    <div><h3>Videollamada</h3><p>Google Meet desde cualquier estado de México, en hora del centro.</p></div>
    <div><h3>Horario</h3><p>Lunes a viernes, 9:00 a 19:00 · Sábado, 10:00 a 14:00. El Concierge responde 24/7.</p></div>
    <div><h3>Confidencialidad</h3><p>Su información se trata conforme a la LFPDPPP y a nuestro <a href="/mx/aviso-de-privacidad">aviso de privacidad</a>.</p></div>
  </div>
  <form class="quote__form" id="contactForm" novalidate>
    <fieldset>
      <legend>Sus datos</legend>
      <div class="fields">
        <label>Nombre<input name="nombre" autocomplete="name" maxlength="80" required></label>
        <label>WhatsApp<input name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" placeholder="55 1234 5678" required></label>
        <label class="full">Correo (opcional)<input name="correo" type="email" autocomplete="email" maxlength="120"></label>
        <label>Estado<select name="estado" required><option value="">Elija…</option>{opts(estados)}</select></label>
        <label>Servicio<select name="servicio" required><option value="">Elija…</option>{opts(servicios)}</select></label>
        <label class="full">Perfil (opcional)<select name="perfil"><option value="">Elija…</option>{opts(perfiles)}</select></label>
        <label class="full">Cuéntenos brevemente su caso<textarea name="caso" rows="4" maxlength="800"></textarea></label>
        <label class="full consent"><input type="checkbox" name="acepto" value="si" required><span>Acepto el <a href="/mx/aviso-de-privacidad">aviso de privacidad</a>.</span></label>
      </div>
    </fieldset>
    <p class="form-error" id="contactError" role="alert" hidden></p>
    <p class="form-ok" id="contactOk" role="status" hidden></p>
    <div class="quote__actions"><button type="submit" class="btn btn--ink">Quiero que un abogado me contacte</button></div>
    <p class="small soft" style="margin-top:14px">Información confidencial, tratada conforme a la LFPDPPP.</p>
  </form>
</div></section>
""" + FOOTER


def catalogo() -> str:
    capitulos = [("I", "familia", "Familia", "Divorcios, pensión, capitulaciones"), ("II", "empresas", "Empresas y PYMES", "Corporativo, contratos, NOM-035"),
                 ("III", "inmobiliario", "Inmobiliario e inversiones", "Compra, renta, fideicomiso, 360"), ("IV", "laboral", "Laboral", "Finiquitos y defensa"),
                 ("V", "civil", "Civil y sucesiones", "Planeación patrimonial y herencias"), ("VI", "digital", "Ciber, SEO y software", "Fraudes, ciberseguridad, CRM")]
    tabs = [("todo", "Toda la colección")] + [(a, n) for _, a, n, _ in capitulos]
    conds = [("Honorarios", "Con IVA incluido. Precios en MXN vigentes a noviembre de 2026."),
             ("Cuotas", "El total de las cuotas siempre es igual al precio publicado."),
             ("A evaluar", "Se cotiza por escrito después de la primera reunión, sin compromiso."),
             ("Gastos externos", "Copias certificadas, peritos o derechos se informan antes de empezar.")]
    return head("catalogo", "Catálogo y honorarios · La Colección · AboVirtual México",
                "Catálogo completo de AboVirtual México: 24 servicios legales, inmobiliarios y de tecnología con precio en MXN, cuotas y cotizador en línea.") + header("catalogo") + f"""
<section class="maison"><div class="wrap">
  <img class="maison__seal" src="/mx/monograma.svg" alt="" width="92" height="92">
  <p class="eyebrow" style="justify-content:center">AboVirtual México · Edición 2026</p>
  <h1>La Colección<em>Catálogo de servicios y honorarios</em></h1>
  <p>Veinticuatro servicios legales, inmobiliarios y de tecnología, con precio publicado, cuotas y un cotizador para armar su propuesta en minutos.</p>
  <div class="actions actions--center"><a class="btn btn--ink" href="#coleccion">Explorar la colección</a><a class="btn btn--line" href="#cotizar">Armar mi cotización</a></div>
</div></section>

<section class="section" style="padding-bottom:40px"><div class="wrap">
  {head_block("Capítulos", "Seis colecciones, un mismo estándar")}
  <ul class="chapters">{"".join(f'<li><a href="#coleccion" data-filter-go="{a}"><span>{n}</span><b>{t}</b><small>{d}</small></a></li>' for n, a, t, d in capitulos)}</ul>
</div></section>

<section class="section" id="coleccion" style="padding-top:60px"><div class="wrap">
  <div class="sticky-tabs"><div class="tabs" role="group" aria-label="Filtrar por área">{"".join(f'<button type="button" class="tab{" is-on" if a == "todo" else ""}" data-filter="{a}" aria-pressed="{"true" if a == "todo" else "false"}">{n}</button>' for a, n in tabs)}</div></div>
  <ul class="cards" id="lista"></ul>
  <div class="conds">{"".join(f"<div><b>{t}</b><p>{p}</p></div>" for t, p in conds)}</div>
</div></section>

<section class="section section--bone" id="cotizar"><div class="wrap quote">
  <div class="quote__intro">
    <p class="eyebrow">Cotizador</p>
    <h2>Arme su propuesta</h2>
    <div class="flag flag--thin" aria-hidden="true"></div>
    <p>Elija uno o varios servicios, deje sus datos y le enviamos la propuesta por WhatsApp. Sin compromiso.</p>
    <p class="small">¿Dudas? <a data-wa="mx" href="{WA}" target="_blank" rel="noopener noreferrer">Escríbanos al +52 56 1213 3685</a>.</p>
  </div>
  <form class="quote__form" id="quoteForm" novalidate>
    <fieldset><legend>Servicios</legend><div id="checks"></div></fieldset>
    <fieldset>
      <legend>Sus datos</legend>
      <div class="fields">
        <label>Nombre<input name="nombre" autocomplete="name" maxlength="80"></label>
        <label>Ciudad y colonia<input name="zona" autocomplete="address-level2" maxlength="60" placeholder="Ej. San Pedro Garza García"></label>
        <label class="full">Modalidad<select name="modalidad"><option>Videollamada (Google Meet)</option><option>Presencial en CDMX (con cita)</option></select></label>
        <label class="full">Su caso (opcional)<textarea name="caso" rows="3" maxlength="600"></textarea></label>
      </div>
    </fieldset>
    <div class="summary" aria-live="polite">
      <div class="summary__row"><span>Servicios elegidos</span><b id="sumCount">0</b></div>
      <div class="summary__row summary__total"><span>Total referencial</span><b id="sumTotal">$0 MXN</b></div>
      <p class="small" id="sumNote">Elija al menos un servicio.</p>
    </div>
    <p class="form-error" id="formError" role="alert" hidden></p>
    <div class="quote__actions"><button type="submit" class="btn btn--ink" data-line="mx">Enviar por WhatsApp · +52 56 1213 3685</button></div>
  </form>
</div></section>
{band("¿No encuentra su caso?", "Cada asunto es distinto. Cuéntenos el suyo y le proponemos un plan.", "Hola, tengo un caso que no aparece en el catálogo.")}
""" + FOOTER


PAGINAS = {"index": inicio, "familia": familia, "empresas": empresas, "patrimonio": patrimonio, "ciber": ciber,
           "firma": firma, "metodo": metodo, "contacto": contacto, "catalogo": catalogo}

if __name__ == "__main__":
    for nombre, fn in PAGINAS.items():
        (RAIZ / f"{nombre}.html").write_text(fn(), encoding="utf-8")
        print("ok", nombre)
