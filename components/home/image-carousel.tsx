"use client"

import { whatsappNumbers } from "@/lib/contact"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "/images/logo.jpg",
    alt: "AboVirtual - Abogados Siempre Conectados",
    title: "AboVirtual",
    subtitle: "Abogados Siempre Conectados",
  },
  {
    src: "/images/abogada.jpg",
    alt: "Abogada Rayén Araya",
    title: "Abogada Rayén Araya",
    subtitle: "Fundadora de AboVirtual",
  },
  {
    src: "/images/contact.jpg",
    alt: "Contacto AboVirtual",
    title: "Contáctanos",
    subtitle: `${whatsappNumbers.primary.display} / ${whatsappNumbers.secondary.display}`,
  },
  {
    src: "/images/logo-alt.jpg",
    alt: "AboVirtual Logo Alternativo",
    title: "Servicios Legales Virtuales",
    subtitle: "Tecnología al servicio de la justicia",
  },
]

export function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="py-16 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Galería
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
            Conoce AboVirtual
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {images.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === current
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-contain bg-background"
                  priority={index === 0}
                />
                {/* Overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div
                    className={`transform transition-all duration-500 delay-200 ${
                      index === current
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mt-2">
                      {image.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground z-10"
            onClick={prev}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground z-10"
            onClick={next}
          >
            <ChevronRight className="w-5 h-5" />
            <span className="sr-only">Siguiente</span>
          </Button>

          {/* Thumbnails */}
          <div className="flex justify-center gap-4 mt-6">
            {images.map((image, index) => (
              <button
                key={image.src}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    setCurrent(index)
                    setTimeout(() => setIsAnimating(false), 500)
                  }
                }}
                className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === current
                    ? "ring-2 ring-primary scale-110"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    setCurrent(index)
                    setTimeout(() => setIsAnimating(false), 500)
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
