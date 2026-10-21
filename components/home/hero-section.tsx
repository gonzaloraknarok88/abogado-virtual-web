"use client"

import { WHATSAPP_URL, whatsappNumbers, BOOKING_URL } from "@/lib/contact"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageCircle, Scale, Shield, Zap, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const carouselSlides = [
  {
    title: "Abogados Siempre Conectados",
    subtitle: "Servicios legales virtuales en Chile con atención personalizada",
    icon: Scale,
    image: "/images/logo.jpg",
    badge: "AboVirtual",
  },
  {
    title: "Consultas desde $20.000",
    subtitle: "Atención inmediata por WhatsApp. Respuesta en menos de 24 horas",
    icon: MessageCircle,
    image: "/images/abogada.jpg",
    badge: "Consultas",
  },
  {
    title: "Agentes Jurídicos IA",
    subtitle: "Tecnología de punta al servicio de tu caso legal",
    icon: Zap,
    image: "/images/logo-alt.jpg",
    badge: "Tecnología",
  },
  {
    title: "Ley Karin para Empresas",
    subtitle: "Cumplimiento normativo garantizado. Protege tu empresa",
    icon: Shield,
    image: "/images/contact.jpg",
    badge: "Empresas",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [])

  const CurrentIcon = carouselSlides[currentSlide].icon

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f10_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {carouselSlides[currentSlide].badge}
              </Badge>
            </div>

            {/* Animated Carousel Text */}
            <div className="min-h-[180px]">
              <div
                key={currentSlide}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 text-primary animate-in zoom-in duration-300">
                    <CurrentIcon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    AboVirtual
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance">
                  {carouselSlides[currentSlide].title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mt-4">
                  {carouselSlides[currentSlide].subtitle}
                </p>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true)
                        setCurrentSlide(index)
                        setTimeout(() => setIsAnimating(false), 600)
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild className="group">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Agendar Consulta
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="group bg-transparent">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  WhatsApp Directo
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="group">
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform inline-block">9+</p>
                <p className="text-sm text-muted-foreground">Áreas legales</p>
              </div>
              <div className="group">
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform inline-block">24/7</p>
                <p className="text-sm text-muted-foreground">Disponibilidad</p>
              </div>
              <div className="group">
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform inline-block">$20K</p>
                <p className="text-sm text-muted-foreground">Desde</p>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Image Carousel */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative rotating rings */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 border border-dashed border-accent/20 rounded-full animate-[spin_25s_linear_infinite]" />
              
              {/* Main Image Container */}
              <div className="absolute inset-12 rounded-2xl overflow-hidden shadow-2xl">
                {carouselSlides.map((slide, index) => (
                  <div
                    key={slide.image}
                    className={`absolute inset-0 transition-all duration-600 ease-out ${
                      index === currentSlide
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-95 rotate-3"
                    }`}
                  >
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      fill
                      className="object-contain bg-card"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                ))}
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
                Consultas Online
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
                {whatsappNumbers.primary.display} / {whatsappNumbers.secondary.display}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
