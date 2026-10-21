import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSearch } from "@/components/home/services-search"
import { AboutSection } from "@/components/home/about-section"
import { ImageCarousel } from "@/components/home/image-carousel"
import { ServicesPreview } from "@/components/home/services-preview"
import { AIAgentsPreview } from "@/components/home/ai-agents-preview"
import { MarketingPreview } from "@/components/home/marketing-preview"
import { LeyKarinPreview } from "@/components/home/ley-karin-preview"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"
import { PricingCatalog } from "@/components/pricing-catalog"
import { BookingSection } from "@/components/booking-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PricingCatalog />
        <BookingSection />
        <ServicesSearch />
        <AboutSection />
        <ImageCarousel />
        <ServicesPreview />
        <AIAgentsPreview />
        <MarketingPreview />
        <LeyKarinPreview />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
