import { WHATSAPP_URL } from "@/lib/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  Scale,
  Bot,
  Shield,
  FileText,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  Video,
  Download,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog y Recursos | AboVirtual",
  description: "Artículos legales, guías sobre IA jurídica, videos educativos y recursos para entender tus derechos. AboVirtual - Abogados Siempre Conectados.",
}

const categories = [
  { id: "all", label: "Todos", icon: BookOpen },
  { id: "legal", label: "Artículos Legales", icon: Scale },
  { id: "ia", label: "IA Jurídica", icon: Bot },
  { id: "ley-karin", label: "Ley Karin", icon: Shield },
  { id: "guias", label: "Guías", icon: FileText },
  { id: "videos", label: "Videos", icon: Video },
]

const blogPosts = [
  {
    category: "ley-karin",
    title: "Todo lo que debes saber sobre la Ley Karin",
    description: "Guía completa sobre la Ley 21.643 de prevención del acoso laboral y sexual en Chile. Conoce tus derechos y obligaciones.",
    icon: Shield,
    date: "15 Ene 2026",
    readTime: "8 min",
    featured: true,
  },
  {
    category: "legal",
    title: "¿Cómo calcular tu indemnización por despido?",
    description: "Aprende a calcular correctamente tu indemnización por años de servicio y otros beneficios laborales.",
    icon: Scale,
    date: "12 Ene 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    category: "ia",
    title: "Inteligencia Artificial en el Derecho: El Futuro es Hoy",
    description: "Cómo la IA está transformando la práctica legal y qué significa para abogados y clientes.",
    icon: Bot,
    date: "10 Ene 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    category: "guias",
    title: "Guía de Posesión Efectiva 2026",
    description: "Paso a paso para tramitar la posesión efectiva de herencia en Chile. Requisitos y plazos actualizados.",
    icon: FileText,
    date: "8 Ene 2026",
    readTime: "10 min",
    featured: false,
  },
  {
    category: "legal",
    title: "Derechos del Trabajador: Lo que No Puedes Ignorar",
    description: "Conoce los derechos fundamentales que todo trabajador en Chile debe conocer y exigir.",
    icon: Users,
    date: "5 Ene 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    category: "ley-karin",
    title: "Implementando la Ley Karin en tu Empresa",
    description: "Guía práctica para empleadores sobre cómo cumplir con los requisitos de la Ley Karin.",
    icon: Shield,
    date: "3 Ene 2026",
    readTime: "9 min",
    featured: false,
  },
]

const resources = [
  {
    title: "Modelo de Denuncia Ley Karin",
    description: "Plantilla descargable para denuncias de acoso laboral",
    icon: Download,
    type: "PDF",
  },
  {
    title: "Checklist Posesión Efectiva",
    description: "Lista de documentos necesarios para el trámite",
    icon: Download,
    type: "PDF",
  },
  {
    title: "Video: Derechos Laborales Básicos",
    description: "Explicación en video de tus derechos como trabajador",
    icon: Video,
    type: "Video",
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                Blog y Recursos
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Conocimiento Legal
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Artículos, guías y recursos para entender tus derechos.
                Información legal clara y accesible.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto mt-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={cat.id === "all" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <cat.icon className="w-3 h-3 mr-1" />
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {blogPosts.filter(p => p.featured).map((post) => (
                <Card key={post.title} className="bg-card border-primary/30 overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-primary/5 p-8 flex items-center justify-center">
                      <div className="p-8 rounded-full bg-primary/10">
                        <post.icon className="w-24 h-24 text-primary" />
                      </div>
                    </div>
                    <CardHeader className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-secondary text-secondary-foreground">
                          Destacado
                        </Badge>
                        <Badge variant="outline">Ley Karin</Badge>
                      </div>
                      <CardTitle className="text-2xl text-foreground">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {post.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <Button className="w-fit mt-4">
                        Leer Artículo
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
                Artículos Recientes
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.filter(p => !p.featured).map((post, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
                  >
                    <CardHeader>
                      <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <post.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg text-foreground line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.readTime}
                      </Badge>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline">
                  Ver más artículos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-foreground">
                  Recursos Descargables
                </h2>
                <p className="text-muted-foreground mt-2">
                  Plantillas, guías y materiales útiles para tus trámites
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <Card key={resource.title} className="bg-background border-border hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6 text-center">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                        <resource.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {resource.description}
                      </p>
                      <Badge variant="outline" className="mt-3 text-xs">
                        {resource.type}
                      </Badge>
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
              ¿Tienes dudas sobre tu caso?
            </h2>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
              Agenda una consulta personalizada y resuelve todas tus dudas legales.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Consultar Ahora
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
