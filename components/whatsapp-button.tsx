"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { whatsappNumbers } from "@/lib/contact"

const lines = [
  { label: "Línea Principal", contact: whatsappNumbers.primary },
  { label: "Línea Secundaria", contact: whatsappNumbers.secondary },
]

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const open = hovered || pinned

  const toggle = () => {
    if (open) {
      setPinned(false)
      setHovered(false)
    } else {
      setPinned(true)
    }
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Line picker */}
      <div
        className={`w-72 origin-bottom-right rounded-2xl border border-primary/30 bg-card/95 backdrop-blur shadow-2xl transition-all duration-300 ${
          open ? "pointer-events-auto opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 translate-y-2"
        }`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <p className="font-serif font-semibold text-foreground">¿Con quién quieres hablar?</p>
          <p className="text-xs text-muted-foreground mt-0.5">Elige una línea de WhatsApp</p>
        </div>
        <div className="p-2">
          {lines.map(({ label, contact }) => (
            <a
              key={contact.number}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              tabIndex={open ? 0 : -1}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-primary/10"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white shadow-md">
                <MessageCircle className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{label}</span>
                <span className="block text-sm text-primary">{contact.display}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={toggle}
        className="pointer-events-auto flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-xl ring-4 ring-[#25D366]/20 hover:scale-105 transition-transform duration-200"
        aria-label="Contactar por WhatsApp"
        aria-expanded={open}
      >
        {open ? <X className="w-7 h-7" /> : <MessageCircle className="w-8 h-8" />}
      </button>
    </div>
  )
}
