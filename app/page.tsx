import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { FeaturedModelsSection } from '@/components/landing/featured-models-section'
import { StatsSection } from '@/components/landing/stats-section'
import { CreatorsSection } from '@/components/landing/creators-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { CTASection } from '@/components/landing/cta-section'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeaturedModelsSection />
      <StatsSection />
      <HowItWorksSection />
      <CreatorsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
