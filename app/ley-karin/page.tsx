import { WHATSAPP_URL } from "@/lib/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Shield,
  FileCheck,
  Bot,
  Video,
  BarChart,
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  GraduationCap,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "App Ley Karin para Empresas | AboVirtual",
  description: "Cumple con la Ley Karin en tu empresa. Software adaptado, IA aplicada, contenido y cumplimiento normativo. Suscripciones desde $650.990.",
}

const features = [
  {
    icon: FileCheck,
    title: "Adaptación de Software",
    description: "Sistema personalizado para tu empresa con canal de denuncias integrado.",
  },
  {
    icon: Bot,
    title: "IA Aplicada",
    description: "Inteligencia artificial para análisis de casos y gestión automatizada.",
  },
  {
    icon: Video,
    title: "Contenido y Anuncios",
    description: "Material de capacitación y difusión para tu equipo.",
  },
  {
    icon: BarChart,
    title: "Cumplimiento Normativo",
    description: "Garantía de cumplimiento con la legislación vigente.",
  },
  {
    icon: GraduationCap,
    title: "Capacitaciones",
    description: "Formación para colaboradores y equipos de RR.HH.",
  },
  {
    icon: Users,
    title: "Canal de Denuncias",
    description: "Plataforma segura y anónima para reportes.",
  },
]

const plans = [
  {
    name: "Plan Empresarial",
    price: "$650.990",
    description: "Para empresas medianas",
    employees: "Hasta 100 empleados",
    features: [
      "Adaptación de software",
      "IA aplicada básica",
      "Canal de denuncias",
      "Capacitación inicial",
      "Soporte por email",
      "Reportes mensuales",
    ],
  },
  {
    name: "Plan Corporativo",
    price: "$990.990",
    description: "Para grandes empresas",
    employees: "Hasta 500 empleados",
    features: [
      "Todo del Plan Empresarial",
      "IA aplicada avanzada",
      "Capacitaciones trimestrales",
      "Contenido personalizado",
      "Soporte prioritario",
      "Consultoría legal incluida",
    ],
    popular: true,
  },
  {
    name: "Plan Enterprise",
    price: "Personalizado",
    description: "Solución a medida",
    employees: "Empleados ilimitados",
    features: [
      "Todo del Plan Corporativo",
      "Desarrollo a medida",
      "Integración con sistemas",
      "Capacitaciones ilimitadas",
      "Soporte 24/7",
      "Account manager dedicado",
    ],
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Protección Legal",
    description: "Evita multas y sanciones por incumplimiento.",
  },
  {
    icon: Building,
    title: "Ambiente Laboral Sano",
    description: "Promueve un espacio de trabajo seguro.",
  },
  {
    icon: AlertTriangle,
    title: "Prevención",
    description: "Detecta y previene situaciones de riesgo.",
  },
]

export default function LeyKarinPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-secondary/5 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-secondary" />
                <Badge className="bg-secondary/10 text-secondary border-0">
                  Para Empresas
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                App Ley Karin
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Cumple con la normativa de prevención de acoso laboral y sexual 
                en tu empresa. Suscripciones desde $650.990/mes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Solicitar Demo
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacto">
                    Contratar App
                  </Link>
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="bg-card/50 border-secondary/20 text-center">
                  <CardContent className="pt-6">
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary w-fit mx-auto mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                ¿Qué incluye la App?
              </h2>
              <p className="text-muted-foreground mt-2">
                Solución integral para el cumplimiento de la Ley Karin
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-background border-border hover:border-secondary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary w-fit mb-4">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                Planes para Empresas
              </h2>
              <p className="text-muted-foreground mt-2">
                Elige el plan que mejor se adapte al tamaño de tu empresa
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
                      Recomendado
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-foreground">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <Badge variant="outline" className="w-fit mt-2">
                      {plan.employees}
                    </Badge>
                    <div className="pt-4">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      {plan.price !== "Personalizado" && (
                        <span className="text-muted-foreground">/mes</span>
                      )}
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
                        {plan.price === "Personalizado" ? "Solicitar Cotización" : "Contratar Plan"}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-secondary-foreground">
              ¿Tu empresa cumple con la Ley Karin?
            </h2>
            <p className="text-secondary-foreground/80 mt-4 max-w-2xl mx-auto">
              Solicita una demo gratuita y conoce cómo nuestra app puede ayudarte 
              a cumplir con la normativa.
            </p>
            <Button size="lg" variant="outline" className="mt-8 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 bg-transparent" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Solicitar Demo Gratuita
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
