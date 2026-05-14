'use client'

import { ModelCard } from '@/components/ui/model-card'
import { GradientText } from '@/components/ui/gradient-text'
import { GlowButton } from '@/components/ui/glow-card'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { mockModels } from '@/lib/mock-data'
import { ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function FeaturedModelsSection() {
  const featuredModels = mockModels.filter(m => m.featured || m.trending).slice(0, 6)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContainer className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Trending Now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Featured{' '}
              <GradientText variant="blue-cyan">AI Models</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover the most popular and cutting-edge AI models deployed by top creators on NexusAI.
            </p>
          </div>
          <Link href="/marketplace">
            <GlowButton variant="outline" className="group whitespace-nowrap">
              View All Models
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </GlowButton>
          </Link>
        </AnimatedContainer>

        {/* Models Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {featuredModels.map((model) => (
            <StaggerItem key={model.id}>
              <ModelCard model={model} variant="featured" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
