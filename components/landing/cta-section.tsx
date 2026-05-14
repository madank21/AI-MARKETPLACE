'use client'

import { GlowCard, GlowButton } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { ParticleField } from '@/components/ui/particle-field'
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-background" />
      <ParticleField className="opacity-20" particleCount={40} color="oklch(0.6 0.25 300)" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlowCard className="p-8 lg:p-16 text-center" glowColor="purple">
          {/* Floating Icons */}
          <div className="absolute top-8 left-8 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center animate-float">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute top-12 right-12 w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
            <Zap className="w-5 h-5 text-secondary" />
          </div>
          <div className="absolute bottom-8 left-1/4 w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
            <Globe className="w-4 h-4 text-accent" />
          </div>

          <AnimatedContainer>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to{' '}
              <GradientText variant="rainbow">Revolutionize</GradientText>
              <br />
              Your AI Workflow?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of developers and creators who are building the future of AI 
              on our decentralized platform. Start deploying in minutes.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/marketplace">
                <GlowButton size="lg" className="group">
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </GlowButton>
              </Link>
              <Link href="/docs">
                <GlowButton variant="outline" size="lg">
                  Read Documentation
                </GlowButton>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Trusted by leading organizations</p>
              <StaggerContainer className="flex flex-wrap justify-center gap-8 opacity-50" staggerDelay={0.1}>
                {['OpenAI', 'Anthropic', 'Stability AI', 'Hugging Face', 'Mistral'].map((company) => (
                  <StaggerItem key={company}>
                    <div className="text-lg font-semibold text-muted-foreground">
                      {company}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedContainer>
        </GlowCard>
      </div>
    </section>
  )
}
