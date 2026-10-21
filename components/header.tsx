"use client"

import { WHATSAPP_URL, BOOKING_URL } from "@/lib/contact"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios Legales" },
  { href: "/agentes-ia", label: "Agentes IA" },
  { href: "/marketing", label: "Marketing Pro" },
  { href: "/ley-karin", label: "App Ley Karin" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="AboVirtual Logo"
              width={48}
              height={48}
              className="rounded"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-serif font-bold text-foreground">Abo</span>
              <span className="text-lg font-serif font-bold text-primary">Virtual</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="hidden sm:flex">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <CalendarDays className="w-4 h-4 mr-2" />
                Agendar
              </a>
            </Button>
            <Button asChild size="sm" className="hidden sm:flex">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button asChild variant="outline" className="mt-4">
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Agendar hora
                    </a>
                  </Button>
                  <Button asChild>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
