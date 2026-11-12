# AboVirtual México · catálogo (CDMX)

Sitio estático (HTML + CSS + JS, sin build) del catálogo de AboVirtual México.
Replica el catálogo "maison" de Chile adaptado a CDMX: precios en MXN con IVA incluido,
WhatsApp +52 56 1213 3685, asistente con opciones y cotizador por WhatsApp.

## Estructura multi-país
- `/` → selector de país. En Vercel, quien entra desde México va directo a `/mx` y desde Chile a abogadovirtualchile.cl (`vercel.json`).
- `/mx/` → catálogo México. **Precios, cuotas, WhatsApp y textos del asistente están en `mx/market.js`.**
- `/assets/catalog.js` → motor común (sin datos de ningún país). `/assets/styles.css` → diseño común.
- Para abrir otro país (España `/es`, Estados Unidos `/us`, Brasil `/br`): copia `mx/`, edita `market.js` (locale, moneda, precios, WhatsApp) y los textos del `index.html`, y agrega su `hreflang`.

## Reglas
- Precios en Cinzel dorado; los precios del HTML se rellenan desde `market.js` (`data-price`).
- El cotizador no guarda datos: arma un mensaje de WhatsApp. Aviso de privacidad en `/mx/aviso-de-privacidad`.
- Sin dependencias ni build: en Vercel, framework "Other", sin comando de build.
