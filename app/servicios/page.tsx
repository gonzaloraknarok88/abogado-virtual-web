import { WHATSAPP_URL, BOOKING_URL } from "@/lib/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PricingCatalog } from "@/components/pricing-catalog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Scale,
  FileText,
  Home,
  ScrollText,
  Users,
  Plane,
  ShieldAlert,
  Briefcase,
  Gavel,
  MessageCircle,
  Calendar,
  CheckCircle,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios Legales | AboVirtual",
  description: "Consultas legales desde $20.000. Herencias, trámites legales, escrituras, testamentos, familia, inmigración, acoso laboral, derecho laboral y Ley Karin.",
}

const services = [
  {
    icon: Scale,
    title: "Herencias",
    description: "Gestión completa de posesión efectiva, partición de bienes y resolución de conflictos hereditarios.",
    details: [
      "Posesión efectiva",
      "Partición de bienes",
      "Testamentos impugnados",
      "Herencias intestadas",
    ],
  },
  {
    icon: FileText,
    title: "Trámites Legales",
    description: "Gestión y representación en todo tipo de trámites ante organismos públicos y privados.",
    details: [
      "Certificados",
      "Inscripciones",
      "Notificaciones",
      "Representación legal",
    ],
  },
  {
    icon: Home,
    title: "Escrituras",
    description: "Redacción y revisión de escrituras públicas para compraventa e inscripciones.",
    details: [
      "Compraventa inmuebles",
      "Hipotecas",
      "Servidumbres",
      "Inscripciones CBR",
    ],
  },
  {
    icon: ScrollText,
    title: "Testamentos",
    description: "Redacción, modificación y validación de testamentos conforme a la ley chilena.",
    details: [
      "Testamento abierto",
      "Testamento cerrado",
      "Modificaciones",
      "Asesoría sucesorial",
    ],
  },
  {
    icon: Users,
    title: "Derecho de Familia",
    description: "Asesoría y representación en divorcios, tuiciones, pensiones y relación directa y regular.",
    details: [
      "Divorcios",
      "Tuición / Cuidado personal",
      "Pensión de alimentos",
      "Relación directa y regular",
    ],
  },
  {
    icon: Plane,
    title: "Inmigración",
    description: "Gestión de visas, permisos de residencia y asesoría migratoria integral.",
    details: [
      "Visa temporaria",
      "Residencia definitiva",
      "Recursos administrativos",
      "Naturalización",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Acoso Laboral",
    description: "Defensa y asesoría en casos de acoso laboral y mobbing en el trabajo.",
    details: [
      "Denuncias internas",
      "Denuncia Inspección",
      "Demanda judicial",
      "Indemnizaciones",
    ],
  },
  {
    icon: Briefcase,
    title: "Derecho Laboral",
    description: "Asesoría completa en despidos, finiquitos, contratos y conflictos laborales.",
    details: [
      "Despidos injustificados",
      "Finiquitos",
      "Contratos laborales",
      "Tutela laboral",
    ],
  },
  {
    icon: Gavel,
    title: "Ley Karin",
    description: "Implementación del protocolo y cumplimiento de la Ley Karin en empresas.",
    details: [
      "Protocolo empresarial",
      "Capacitaciones",
      "Canal de denuncias",
      "Cumplimiento normativo",
    ],
  },
]

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                Servicios Legales
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Áreas de Práctica Legal
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Consultas desde $20.000. Atención virtual y presencial en toda Chile.
                Agenda tu consulta hoy.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button asChild size="lg">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Consulta
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <PricingCatalog />

        {/* Services Grid */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card
                  key={service.title}
                  className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="p-4 rounded-xl bg-primary/10 text-primary w-fit mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-primary-foreground">
              ¿Necesitas asesoría legal?
            </h2>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
              Agenda tu consulta virtual desde $20.000. Atención inmediata por WhatsApp.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Agendar Ahora
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
