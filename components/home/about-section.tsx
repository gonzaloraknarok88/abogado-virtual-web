"use client"

import Image from "next/image"
import Link from "next/link"
import { BOOKING_URL } from "@/lib/contact"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Calendar, Tv, ArrowRight, Quote } from "lucide-react"

const achievements = [
  {
    icon: Award,
    title: "Abogada Titulada",
    description: "Universidad de Chile",
  },
  {
    icon: Users,
    title: "500+ Clientes",
    description: "Atendidos virtualmente",
  },
  {
    icon: Calendar,
    title: "10+ Años",
    description: "De experiencia legal",
  },
  {
    icon: Tv,
    title: "TVR Chile",
    description: "Apariciones en TV",
  },
]

export function AboutSection() {
  return (
    <section className="py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Main photo */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/abogada.jpg"
                  alt="Abogada Rayén Araya - Fundadora de AboVirtual"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <Card className="absolute -bottom-6 -right-6 lg:-right-12 bg-card border-primary/20 shadow-xl max-w-[200px]">
                <CardContent className="p-4">
                  <Quote className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-foreground font-medium">
                    "La justicia debe ser accesible para todos"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    - Abogada Rayén Araya
                  </p>
                </CardContent>
              </Card>

              {/* TV Badge */}
              <div className="absolute -top-4 -left-4 lg:-left-8">
                <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <Tv className="w-4 h-4" />
                  <span className="text-sm font-medium">TVR Chile</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 -left-8 w-full h-full border-2 border-primary/20 rounded-2xl" />
              <div className="absolute -z-10 top-4 -left-4 w-full h-full border-2 border-secondary/20 rounded-2xl" />
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                Sobre Nosotros
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Conoce a tu Abogada
              </h2>
              <h3 className="text-xl text-primary font-semibold mt-2">
                Rayén Araya - Fundadora de AboVirtual
              </h3>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Con más de 10 años de experiencia en derecho, fundé AboVirtual con la misión 
                de democratizar el acceso a servicios legales de calidad en Chile.
              </p>
              <p>
                Especializada en derecho laboral, familia, herencias y Ley Karin, combino 
                la experiencia tradicional con tecnología de vanguardia para ofrecer 
                atención legal virtual eficiente y accesible.
              </p>
              <p>
                Como pionera en servicios legales virtuales, he sido invitada a participar 
                en programas de televisión nacional para hablar sobre derechos laborales 
                y la nueva Ley Karin.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Agendar Consulta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/portafolio">
                  Ver Portafolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
