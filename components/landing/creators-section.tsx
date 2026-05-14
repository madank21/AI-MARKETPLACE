'use client'

import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { mockCreators } from '@/lib/mock-data'
import { Star, CheckCircle2, Users, Coins } from 'lucide-react'
import Link from 'next/link'

export function CreatorsSection() {
  const topCreators = mockCreators.filter(c => c.verified).slice(0, 4)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary font-medium">Top Creators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Meet the{' '}
            <GradientText variant="purple-pink">Innovators</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the brilliant minds building the future of AI on our platform.
          </p>
        </AnimatedContainer>

        {/* Creators Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {topCreators.map((creator, index) => (
            <StaggerItem key={creator.id}>
              <Link href={`/creators/${creator.id}`}>
                <GlowCard
                  className="p-6 text-center cursor-pointer group"
                  glowColor={index % 2 === 0 ? 'purple' : 'cyan'}
                  hover
                >
                  {/* Avatar */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-0.5">
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-bold">
                          {creator.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {creator.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-medium">{creator.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({creator.followers.toLocaleString()} followers)
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <div className="text-lg font-bold font-mono text-primary">
                        {creator.totalModels}
                      </div>
                      <div className="text-xs text-muted-foreground">Models</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold font-mono text-secondary">
                        {creator.totalEarnings}
                      </div>
                      <div className="text-xs text-muted-foreground">Earned</div>
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
