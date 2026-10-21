import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building2, Briefcase, Home, CheckCircle, CalendarDays, Sparkles } from "lucide-react"
import { BOOKING_URL } from "@/lib/contact"

type Offer = {
  name: string
  price?: string
  priceNote?: string
  payment?: string
  features?: string[]
  featured?: boolean
}

const areas: { icon: typeof Users; emoji: string; area: string; offers: Offer[] }[] = [
  {
    icon: Users,
    emoji: "👨‍👩‍👧",
    area: "Área Familia",
    offers: [
      { name: "Divorcio Mutuo Acuerdo", price: "$99.990", payment: "Pago único" },
      { name: "Divorcio Unilateral / Visitas", price: "$199.990", payment: "Pago en 2 cuotas", featured: true },
      { name: "Pensión de Alimentos", price: "$359.990", payment: "Pago en 3 cuotas" },
    ],
  },
  {
    icon: Building2,
    emoji: "🏢",
    area: "Empresas y Pymes",
    offers: [
      {
        name: "Ley Karin",
        priceNote: "Desde",
        price: "$99.990",
        features: ["Implementación de protocolos"],
      },
      {
        name: "Sociedades",
        priceNote: "Desde",
        price: "$250.000",
        payment: "50% al inicio / 50% al finalizar",
        features: ["Constitución de sociedades"],
      },
    ],
  },
  {
    icon: Briefcase,
    emoji: "💼",
    area: "Área Laboral",
    offers: [
      { name: "Revisión de Finiquito", price: "GRATIS", featured: true },
      { name: "Defensa Laboral", features: ["Defensa por despido injustificado"] },
    ],
  },
  {
    icon: Home,
    emoji: "🏠",
    area: "Área Civil",
    offers: [
      { name: "Posesión Efectiva", features: ["Posesión Efectiva exprés"] },
      { name: "Arriendos y Desalojos", features: ["Arriendos blindados", "Desalojos"] },
    ],
  },
]

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 ${
        offer.featured ? "border-primary/60 ring-1 ring-primary/30" : "border-border hover:border-primary/40"
      }`}
    >
      {offer.featured && (
        <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground shadow-md">
          <Sparkles className="w-3 h-3" />
          Destacado
        </span>
      )}
      <h4 className="text-lg font-semibold text-foreground">{offer.name}</h4>
      {offer.price && (
        <div className="mt-4 flex items-baseline gap-2">
          {offer.priceNote && <span className="text-sm text-muted-foreground">{offer.priceNote}</span>}
          <span className="text-4xl font-serif font-bold text-primary">{offer.price}</span>
        </div>
      )}
      {offer.payment && (
        <span className="mt-3 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {offer.payment}
        </span>
      )}
      <ul className="mt-5 space-y-2 flex-1">
        {offer.features?.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground/90">
            <CheckCircle className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button asChild size="lg" className="mt-6 w-full rounded-xl shadow-md transition-shadow hover:shadow-lg">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          <CalendarDays className="w-5 h-5 mr-2" />
          Agendar Ahora
        </a>
      </Button>
    </div>
  )
}

export function PricingCatalog() {
  return (
    <section id="valores" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">Catálogo de Ofertas</Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Servicios, valores y facilidades de pago
          </h2>
        </div>

        <div className="space-y-14 max-w-6xl mx-auto">
          {areas.map((group) => (
            <div key={group.area}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <group.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-foreground">
                  <span aria-hidden="true">{group.emoji} </span>
                  {group.area}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.offers.map((offer) => (
                  <OfferCard key={offer.name} offer={offer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
