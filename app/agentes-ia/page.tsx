import { WHATSAPP_URL } from "@/lib/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Bot,
  FileSignature,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Zap,
  Shield,
  Clock,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agentes Jurídicos IA | AboVirtual",
  description: "Inteligencia artificial aplicada a casos legales. Agentes IA especializados en Ley Karin, contratos, denuncias y consultas rápidas. Desde $250.000.",
}

const agents = [
  {
    icon: Bot,
    title: "IA Ley Karin",
    description: "Asistente especializado en normativa de acoso laboral y sexual. Analiza casos, genera denuncias y hace seguimiento.",
    price: "$250.000",
    features: [
      "Análisis de casos en tiempo real",
      "Generación automática de denuncias",
      "Seguimiento de plazos legales",
      "Base de datos de jurisprudencia",
      "Reportes automatizados",
      "Integración con canal de denuncias",
    ],
  },
  {
    icon: FileSignature,
    title: "IA para Contratos",
    description: "Revisión y generación de contratos legales con inteligencia artificial. Detecta cláusulas abusivas y sugiere mejoras.",
    price: "$280.000",
    features: [
      "Generación de contratos",
      "Revisión automática",
      "Detección de cláusulas abusivas",
      "Contratos laborales",
      "Arrendamiento",
      "Compraventa y más",
    ],
  },
  {
    icon: AlertTriangle,
    title: "IA para Denuncias",
    description: "Redacción y gestión de denuncias legales con formato correcto, pruebas sugeridas y control de plazos.",
    price: "$220.000",
    features: [
      "Redacción asistida",
      "Formato legal correcto",
      "Sugerencia de pruebas",
      "Control de plazos",
      "Seguimiento de estado",
      "Notificaciones automáticas",
    ],
  },
  {
    icon: MessageSquare,
    title: "IA Consultas Rápidas",
    description: "Respuestas inmediatas a dudas legales básicas. Disponible 24/7 con orientación profesional.",
    price: "$150.000",
    features: [
      "Disponible 24/7",
      "Respuestas inmediatas",
      "Orientación legal básica",
      "Derivación a abogado",
      "Historial de consultas",
      "Base de conocimiento legal",
    ],
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Respuesta Inmediata",
    description: "Obtén respuestas y documentos en segundos, no días.",
  },
  {
    icon: Shield,
    title: "Precisión Legal",
    description: "Entrenados con la legislación chilena actualizada.",
  },
  {
    icon: Clock,
    title: "24/7 Disponible",
    description: "Acceso continuo sin horarios de oficina.",
  },
]

export default function AgentesIAPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <Badge className="bg-accent/10 text-accent border-0">
                  Tecnología Legal
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Agentes Jurídicos IA
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Inteligencia artificial aplicada a tus casos legales.
                Suscripciones desde $250.000/mes.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="bg-card/50 border-accent/20 text-center">
                  <CardContent className="pt-6">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mx-auto mb-4">
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

        {/* Agents Grid */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {agents.map((agent) => (
                <Card
                  key={agent.title}
                  className="bg-background border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-4 rounded-xl bg-accent/10 text-accent">
                        <agent.icon className="w-8 h-8" />
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                        IA Pro
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-foreground">{agent.title}</CardTitle>
                    <CardDescription className="text-base">{agent.description}</CardDescription>
                    <div className="pt-2">
                      <span className="text-2xl font-bold text-foreground">{agent.price}</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {agent.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        Contratar Agente
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gamer Section */}
        <section className="py-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/10 text-accent border-0">
                Abogado Virtual Gamer
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Tecnología de Vanguardia
              </h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                Experimenta el futuro de los servicios legales con nuestra plataforma 
                de inteligencia artificial. Avatares animados, efectos visuales y 
                asistencia legal en tiempo real.
              </p>
              
              <div className="mt-8">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contacto">
                    Probar IA Legal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-accent-foreground">
              ¿Listo para automatizar tu gestión legal?
            </h2>
            <p className="text-accent-foreground/80 mt-4 max-w-2xl mx-auto">
              Contrata tu agente IA hoy y transforma la manera en que manejas tus casos legales.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Contratar Agente IA
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
