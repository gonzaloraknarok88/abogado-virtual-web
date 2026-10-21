import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Video, MessageCircle, Clock, ArrowRight } from "lucide-react"
import { BOOKING_URL, BOOKING_EMBED_URL, office, whatsappNumbers } from "@/lib/contact"

const rules = [
  {
    icon: MapPin,
    title: "Atención Presencial (con reserva)",
    lines: [`${office.address} (${office.reference.replace("A pasos de ", "")}).`, office.hours],
  },
  {
    icon: Video,
    title: "Atención Online (Google Meet)",
    lines: ["Exclusivo para urgencias o fuera de horario (después de 18:30 hrs)."],
  },
]

export function BookingSection() {
  return (
    <section id="agendar" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">Reserva tu hora</Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Agenda tu consulta en minutos</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Elige día y hora en nuestro calendario. Te confirmamos por WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Rules */}
          <div className="lg:col-span-2 space-y-5">
            {rules.map((rule) => (
              <div
                key={rule.title}
                className="flex gap-4 rounded-2xl border border-border bg-background p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <rule.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{rule.title}</h3>
                  {rule.lines.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground mt-1">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-6 shadow-lg shadow-black/20">
              <p className="font-semibold text-foreground">¿Prefieres escribirnos?</p>
              <div className="mt-4 grid gap-3">
                {[
                  { label: "Línea Principal", contact: whatsappNumbers.primary },
                  { label: "Línea Secundaria", contact: whatsappNumbers.secondary },
                ].map(({ label, contact }) => (
                  <a
                    key={contact.number}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-background/60 px-4 py-3 transition-colors hover:bg-background"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white">
                      <MessageCircle className="w-4 h-4" />
                    </span>
                    <span className="text-sm">
                      <span className="block font-medium text-foreground">{label}</span>
                      <span className="block text-primary">{contact.display}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-3 rounded-2xl border border-primary/30 bg-background p-4 sm:p-6 shadow-2xl shadow-black/30">
            {BOOKING_EMBED_URL ? (
              <iframe
                src={BOOKING_EMBED_URL}
                title="Calendario de reservas AboVirtual"
                className="w-full h-[640px] rounded-xl border-0 bg-white"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center px-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary shadow-inner">
                  <CalendarDays className="w-10 h-10" />
                </div>
                <h3 className="mt-6 text-2xl font-serif font-semibold text-foreground">Calendario de reservas</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Revisa la disponibilidad en tiempo real y reserva tu hora presencial u online.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  {office.hours}
                </div>
                <Button asChild size="lg" className="mt-8 rounded-xl px-8 shadow-lg transition-shadow hover:shadow-xl group">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Reservar mi hora
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
