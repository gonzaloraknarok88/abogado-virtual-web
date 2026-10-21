import { WHATSAPP_URL } from "@/lib/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Scale,
  Video,
  Users,
  Building,
  Award,
  ExternalLink,
  Play,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portafolio | AboVirtual",
  description: "Conoce nuestros casos de éxito, proyectos y campañas. AboVirtual - Abogados Siempre Conectados.",
}

const categories = [
  { id: "all", label: "Todos" },
  { id: "casos", label: "Casos" },
  { id: "proyectos", label: "Proyectos" },
  { id: "campanas", label: "Campañas" },
  { id: "videos", label: "Videos" },
]

const portfolioItems = [
  {
    category: "casos",
    title: "Defensa Laboral Exitosa",
    description: "Caso de despido injustificado con indemnización completa para el trabajador.",
    icon: Scale,
    stats: "Indemnización 100%",
    tags: ["Derecho Laboral", "Despido"],
  },
  {
    category: "casos",
    title: "Herencia Compleja",
    description: "Resolución de partición de bienes entre múltiples herederos.",
    icon: Scale,
    stats: "5 herederos",
    tags: ["Herencias", "Familia"],
  },
  {
    category: "proyectos",
    title: "Implementación Ley Karin",
    description: "Implementación completa del protocolo Ley Karin en empresa de 200 empleados.",
    icon: Building,
    stats: "200 empleados",
    tags: ["Ley Karin", "Empresas"],
  },
  {
    category: "proyectos",
    title: "Sistema de Denuncias",
    description: "Desarrollo de canal de denuncias con IA para corporación multinacional.",
    icon: Building,
    stats: "3 países",
    tags: ["IA", "Ley Karin"],
  },
  {
    category: "campanas",
    title: "Campaña Educativa",
    description: "Campaña de concientización sobre acoso laboral en redes sociales.",
    icon: Users,
    stats: "50K alcance",
    tags: ["Marketing", "Ley Karin"],
  },
  {
    category: "campanas",
    title: "Lanzamiento AboVirtual",
    description: "Estrategia de lanzamiento de marca y posicionamiento digital.",
    icon: Users,
    stats: "10K seguidores",
    tags: ["Marketing", "Branding"],
  },
  {
    category: "videos",
    title: "Serie Educativa Ley Karin",
    description: "Serie de videos explicativos sobre la Ley Karin para empresas.",
    icon: Video,
    stats: "12 videos",
    tags: ["Video", "Educación"],
  },
  {
    category: "videos",
    title: "Testimonios de Clientes",
    description: "Videos testimoniales de clientes satisfechos con nuestros servicios.",
    icon: Video,
    stats: "8 testimonios",
    tags: ["Video", "Testimonios"],
  },
]

const achievements = [
  { number: "500+", label: "Casos resueltos" },
  { number: "50+", label: "Empresas asesoradas" },
  { number: "98%", label: "Satisfacción" },
  { number: "5", label: "Años de experiencia" },
]

export default function PortafolioPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                Portafolio
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Nuestro Trabajo
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Conoce nuestros casos de éxito, proyectos y campañas.
                Resultados que hablan por sí mismos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {achievements.map((stat) => (
                <Card key={stat.label} className="bg-background border-border text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-primary">{stat.number}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Featured Card */}
              <Card className="bg-card border-primary/30 overflow-hidden mb-12">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto">
                    <Image
                      src="/images/abogada.jpg"
                      alt="Abogada Rayén Araya en TVR"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 md:hidden" />
                  </div>
                  <CardHeader className="flex flex-col justify-center">
                    <Badge className="w-fit bg-primary/10 text-primary border-0 mb-2">
                      <Award className="w-3 h-3 mr-1" />
                      Destacado
                    </Badge>
                    <CardTitle className="text-2xl text-foreground">
                      Presencia en Medios
                    </CardTitle>
                    <CardDescription className="text-base">
                      Abogada Rayén Araya en TVR - Televisión Regional de Chile, 
                      compartiendo conocimientos sobre derechos laborales y la Ley Karin 
                      con la audiencia nacional.
                    </CardDescription>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline">TV</Badge>
                      <Badge variant="outline">Ley Karin</Badge>
                      <Badge variant="outline">Educación</Badge>
                    </div>
                  </CardHeader>
                </div>
              </Card>

              {/* Portfolio Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.stats}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-primary-foreground">
              ¿Quieres ser parte de nuestros casos de éxito?
            </h2>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
              Agenda tu consulta hoy y deja tu caso en manos de profesionales.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
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
