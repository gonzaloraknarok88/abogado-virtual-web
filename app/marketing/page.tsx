import { WHATSAPP_URL } from "@/lib/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  Bot,
  Palette,
  Megaphone,
  CheckCircle,
  Globe,
  Users,
  BarChart,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketing Pro | AboVirtual",
  description: "Planes de marketing digital para estudios jurídicos. Avatares, agentes IA, creadores de contenido y videos. Desde $550.990.",
}

const plans = [
  {
    name: "Plan Básico",
    price: "$550.990",
    description: "Perfecto para iniciar tu presencia digital legal",
    icon: Palette,
    features: [
      "Avatares personalizados",
      "Agentes IA básicos",
      "Creadores de contenido",
      "Videos para empresas",
      "Plan de contenido mensual",
      "Contenido semanal",
      "Soporte por email",
    ],
    popular: false,
  },
  {
    name: "Plan Pro",
    price: "$850.990",
    description: "Mayor alcance y producción profesional",
    icon: Video,
    features: [
      "Todo del Plan Básico",
      "Más contenido semanal",
      "Agentes IA avanzados",
      "Producción ampliada",
      "Estrategia de marketing",
      "Reportes mensuales",
      "Soporte prioritario",
      "Campañas publicitarias",
    ],
    popular: true,
  },
  {
    name: "Plan Premium",
    price: "$1.290.000",
    description: "Producción completa y estrategia avanzada",
    icon: Megaphone,
    features: [
      "Todo del Plan Pro",
      "Producción completa",
      "Videos premium",
      "Estrategia avanzada",
      "IA aplicada a marca",
      "Soporte 24/7",
      "Consultoría personalizada",
      "Branding completo",
    ],
    popular: false,
  },
]

const webPack = {
  name: "Pack Web + Marketing",
  price: "$550.990",
  description: "Todo lo que necesita tu estudio jurídico para destacar online",
  features: [
    "Página web profesional",
    "Marketing pack completo",
    "2 videos semanales",
    "Contenido para redes",
    "SEO básico",
    "Hosting incluido",
  ],
}

const features = [
  {
    icon: Bot,
    title: "Avatares IA",
    description: "Representantes virtuales personalizados para tu marca legal.",
  },
  {
    icon: Video,
    title: "Producción de Video",
    description: "Videos profesionales para redes sociales y campañas.",
  },
  {
    icon: Users,
    title: "Creadores de Contenido",
    description: "Equipo dedicado a generar contenido legal de calidad.",
  },
  {
    icon: BarChart,
    title: "Estrategia Digital",
    description: "Planes personalizados para maximizar tu alcance.",
  },
]

export default function MarketingPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-0">
                Marketing Pro
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Marketing Digital para Abogados
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Avatares, agentes IA y creadores de contenido para tu estudio jurídico.
                Planes desde $550.990/mes.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-background border-border text-center">
                  <CardContent className="pt-6">
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary w-fit mx-auto mb-4">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                Planes de Marketing
              </h2>
              <p className="text-muted-foreground mt-2">
                Elige el plan que mejor se adapte a tus necesidades
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative bg-card ${
                    plan.popular ? "border-secondary shadow-lg shadow-secondary/20" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground">
                      Más Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary w-fit">
                      <plan.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-foreground">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full ${
                        plan.popular
                          ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        Contratar Plan
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Web Pack */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-background border-primary/30 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <CardHeader className="md:border-r border-border">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                      <Globe className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{webPack.name}</CardTitle>
                    <CardDescription className="text-base">{webPack.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold text-foreground">{webPack.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-foreground mb-4">Incluye:</h4>
                    <ul className="space-y-3">
                      {webPack.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-6">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        Contratar Pack
                      </a>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-secondary-foreground">
              ¿Listo para hacer crecer tu estudio?
            </h2>
            <p className="text-secondary-foreground/80 mt-4 max-w-2xl mx-auto">
              Contáctanos hoy y empieza a destacar en el mundo digital.
            </p>
            <Button size="lg" variant="outline" className="mt-8 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 bg-transparent" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Contactar Ahora
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
