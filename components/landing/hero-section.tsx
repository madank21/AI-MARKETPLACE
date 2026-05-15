'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'
import { GlowButton } from '@/components/ui/glow-card'
const Scene3D = dynamic(
  () => import('@/components/ui/scene-3d.client').then((mod) => mod.Scene3D),
  { ssr: false }
)
import { ParticleField } from '@/components/ui/particle-field'
import { AnimatedContainer, FloatingElement } from '@/components/ui/animated'
import { ArrowRight, Play, Sparkles, Shield, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { value: '2,847+', label: 'AI Models' },
  { value: '1.2M+', label: 'API Calls/Day' },
  { value: '99.99%', label: 'Uptime' },
  { value: '45K+', label: 'ETH Volume' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      <div className="absolute inset-0 neural-bg" />
      <ParticleField className="opacity-30" particleCount={60} />
      
      {/* 3D Scene */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] hidden lg:block">
        <Scene3D variant="hero" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <AnimatedContainer delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Now Live on Mainnet
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-xs font-semibold text-primary">
                v2.0
              </span>
            </div>
          </AnimatedContainer>

          {/* Headline */}
          <AnimatedContainer delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6">
              The Future of{' '}
              <GradientText variant="rainbow" className="block">
                Decentralized AI
              </GradientText>
              <span className="block">Is Here</span>
            </h1>
          </AnimatedContainer>

          {/* Subheadline */}
          <AnimatedContainer delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Deploy, monetize, and discover cutting-edge AI models on the world&apos;s first 
              fully decentralized marketplace. Powered by blockchain, secured by cryptography.
            </p>
          </AnimatedContainer>

          {/* CTAs */}
          <AnimatedContainer delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/marketplace">
                <GlowButton size="lg" className="group">
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </GlowButton>
              </Link>
              <GlowButton variant="outline" size="lg" className="group">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </GlowButton>
            </div>
          </AnimatedContainer>

          {/* Stats */}
          <AnimatedContainer delay={0.4}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-mono gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingElement className="absolute left-[10%] top-[20%] hidden lg:block" amplitude={15} duration={4}>
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center">
          <Shield className="w-8 h-8 text-primary" />
        </div>
      </FloatingElement>

      <FloatingElement className="absolute right-[15%] bottom-[25%] hidden lg:block" amplitude={20} duration={5}>
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/20 flex items-center justify-center">
          <Zap className="w-7 h-7 text-secondary" />
        </div>
      </FloatingElement>

      <FloatingElement className="absolute left-[5%] bottom-[30%] hidden lg:block" amplitude={12} duration={3.5}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20 flex items-center justify-center">
          <Globe className="w-6 h-6 text-accent" />
        </div>
      </FloatingElement>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
