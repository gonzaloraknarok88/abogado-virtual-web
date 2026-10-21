export const whatsappNumbers = {
  primary: {
    number: "56954509331",
    display: "+56 9 5450 9331",
    href: "https://wa.me/56954509331",
    tel: "tel:+56954509331",
  },
  secondary: {
    number: "56923865953",
    display: "+56 9 2386 5953",
    href: "https://wa.me/56923865953",
    tel: "tel:+56923865953",
  },
}

export const WHATSAPP_URL = whatsappNumbers.primary.href

export function whatsappMessageUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const BOOKING_URL = "https://calendar.app.google/HrtUwuC47YpjmokJA"
// Google Calendar > Programa de citas > Compartir > "Insertar en sitio web" link; leave empty to show the booking button
export const BOOKING_EMBED_URL = ""

export const office = {
  address: "Almirante Zegers #764, Providencia",
  reference: "A pasos de Metro Salvador",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Almirante+Zegers+764+Providencia+Santiago",
  hours: "Lunes a Viernes, 10:00 a 18:30 hrs.",
}
