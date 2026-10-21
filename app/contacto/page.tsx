"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { BookingSection } from "@/components/booking-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CalendarDays,
  Clock,
  Send,
  Video,
} from "lucide-react"
import { whatsappNumbers, whatsappMessageUrl, office, BOOKING_URL } from "@/lib/contact"

const consultationTypes = [
  "Familia (divorcios, visitas, pensión de alimentos)",
  "Empresas y Pymes (sociedades, marcas, contratos)",
  "Ley Karin (protocolos)",
  "Revisión de Finiquito (gratis)",
  "Derecho Laboral (despidos, autodespidos, tutelas)",
  "Herencias (posesión efectiva, partición)",
  "Inmobiliario (arriendos, desalojos)",
  "Trámites Legales",
  "Escrituras",
  "Testamentos",
  "Inmigración",
  "Acoso Laboral",
  "Agentes IA",
  "Marketing Pro",
  "Otro",
]

const modalities = [
  "Presencial (Providencia, solo con agendamiento previo)",
  "Online por Google Meet (urgencias o fuera de horario)",
]

const timeSlots = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "18:30+",
]

export default function ContactoPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "",
    modalidad: "",
    hora: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // The secondary button sends the same booking to the second number
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    const number = submitter?.dataset.number ?? whatsappNumbers.primary.number
    // Create WhatsApp message
    const message = `Hola, me gustaría agendar una consulta:\n\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nTipo de consulta: ${formData.tipo}\nModalidad: ${formData.modalidad}\nFecha preferida: ${date ? date.toLocaleDateString("es-CL") : "Por definir"}\nHora: ${formData.hora}\n\nMensaje: ${formData.mensaje}`
    
    window.open(whatsappMessageUrl(number, message), "_blank")
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                Contacto
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Agenda tu Consulta
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Reserva tu hora directamente en nuestro calendario, o envíanos tu solicitud por WhatsApp.
              </p>
              <Button asChild size="lg" className="mt-8">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Reservar hora en Google Calendar
                </a>
              </Button>
            </div>
          </div>
        </section>

        <BookingSection />

        {/* Contact Form & Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Información de Contacto</CardTitle>
                    <CardDescription>Contáctanos por cualquier medio</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[whatsappNumbers.primary, whatsappNumbers.secondary].map((contact, index) => (
                      <a
                        key={contact.number}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
                      >
                        <div className="p-2 rounded-full bg-[#25D366] text-white">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{index === 0 ? "Línea Principal" : "Línea Secundaria"}</p>
                          <p className="text-sm text-muted-foreground">{contact.display}</p>
                        </div>
                      </a>
                    ))}

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                      <div className="p-2 rounded-full bg-primary text-primary-foreground">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Teléfono</p>
                        {[whatsappNumbers.primary, whatsappNumbers.secondary].map((contact) => (
                          <a
                            key={contact.number}
                            href={contact.tel}
                            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {contact.display}
                          </a>
                        ))}
                      </div>
                    </div>

                    <a
                      href="mailto:abogadarayenaraya@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-sm text-muted-foreground">abogadarayenaraya@gmail.com</p>
                      </div>
                    </a>

                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-muted-foreground/20 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Oficina</p>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                        <p className="text-xs text-muted-foreground">{office.reference}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Horario de Atención</h3>
                    <div className="space-y-4 text-sm text-primary-foreground/80">
                      <div className="flex gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-primary-foreground">Atención Presencial</p>
                          <p>Solo con agendamiento previo.</p>
                          <p>{office.address} ({office.reference}).</p>
                          <p>{office.hours}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Video className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-primary-foreground">Atención Online</p>
                          <p>Vía Google Meet. Exclusivo para urgencias o fuera de horario (después de las 18:30 hrs.).</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-primary" />
                      Agendar Consulta
                    </CardTitle>
                    <CardDescription>
                      ¿Prefieres WhatsApp? Completa el formulario y te contactaremos para confirmar. También puedes{" "}
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                        reservar directo en el calendario
                      </a>
                      .
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre completo *</Label>
                          <Input
                            id="nombre"
                            placeholder="Tu nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input
                            id="telefono"
                            type="tel"
                            placeholder="+56 9 XXXX XXXX"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo de consulta *</Label>
                          <Select
                            value={formData.tipo}
                            onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                            <SelectContent>
                              {consultationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Modalidad *</Label>
                        <Select
                          value={formData.modalidad}
                          onValueChange={(value) => setFormData({ ...formData, modalidad: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Presencial u online" />
                          </SelectTrigger>
                          <SelectContent>
                            {modalities.map((modality) => (
                              <SelectItem key={modality} value={modality}>
                                {modality}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Presencial: {office.hours} Online: urgencias o después de las 18:30 hrs.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Fecha preferida</Label>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            disabled={(date) =>
                              date < new Date() ||
                              (formData.modalidad.startsWith("Presencial")
                                ? date.getDay() === 0 || date.getDay() === 6
                                : date.getDay() === 0)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hora preferida</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={formData.hora === time ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFormData({ ...formData, hora: time })}
                                className="w-full"
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensaje">Mensaje (opcional)</Label>
                        <Textarea
                          id="mensaje"
                          placeholder="Describe brevemente tu caso o consulta..."
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full" data-number={whatsappNumbers.primary.number}>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Solicitud
                      </Button>
                      <Button
                        type="submit"
                        variant="link"
                        className="w-full"
                        data-number={whatsappNumbers.secondary.number}
                      >
                        o enviar al WhatsApp {whatsappNumbers.secondary.display}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
