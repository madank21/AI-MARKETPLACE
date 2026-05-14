'use client'

import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp,
  Zap,
  DollarSign,
  Users,
  Activity,
} from 'lucide-react'
import { platformStats, recentActivity, trendingCategories, categoryLabels } from '@/lib/mock-data'

export function StatsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Live Stats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Platform{' '}
            <GradientText variant="rainbow">Metrics</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real-time insights into the NexusAI ecosystem.
          </p>
        </AnimatedContainer>

        {/* Stats Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.1}>
          <StaggerItem>
            <GlowCard className="p-6" glowColor="blue">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +24%
                </Badge>
              </div>
              <div className="text-3xl font-bold font-mono mb-1">
                {platformStats.totalModels.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">AI Models Deployed</div>
            </GlowCard>
          </StaggerItem>

          <StaggerItem>
            <GlowCard className="p-6" glowColor="purple">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +18%
                </Badge>
              </div>
              <div className="text-3xl font-bold font-mono mb-1">
                {platformStats.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </GlowCard>
          </StaggerItem>

          <StaggerItem>
            <GlowCard className="p-6" glowColor="cyan">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +156%
                </Badge>
              </div>
              <div className="text-3xl font-bold font-mono mb-1">
                {(platformStats.totalTransactions / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </GlowCard>
          </StaggerItem>

          <StaggerItem>
            <GlowCard className="p-6" glowColor="pink">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.7_0.25_330)]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[oklch(0.7_0.25_330)]" />
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +89%
                </Badge>
              </div>
              <div className="text-3xl font-bold font-mono mb-1">
                {platformStats.totalVolume}
              </div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </GlowCard>
          </StaggerItem>
        </StaggerContainer>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trending Categories */}
          <AnimatedContainer delay={0.3}>
            <GlowCard className="p-6 h-full" glowColor="purple">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold">Trending Categories</h3>
              </div>
              <div className="space-y-4">
                {trendingCategories.map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-lg font-mono text-muted-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{categoryLabels[item.category]}</div>
                        <div className="text-sm text-muted-foreground">{item.models} models</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500/30">
                      {item.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </GlowCard>
          </AnimatedContainer>

          {/* Recent Activity */}
          <AnimatedContainer delay={0.4}>
            <GlowCard className="p-6 h-full" glowColor="cyan">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${activity.type === 'purchase' ? 'bg-primary/10' : ''}
                      ${activity.type === 'deploy' ? 'bg-secondary/10' : ''}
                      ${activity.type === 'rating' ? 'bg-yellow-500/10' : ''}
                      ${activity.type === 'earning' ? 'bg-green-500/10' : ''}
                    `}>
                      {activity.type === 'purchase' && <DollarSign className="w-4 h-4 text-primary" />}
                      {activity.type === 'deploy' && <Zap className="w-4 h-4 text-secondary" />}
                      {activity.type === 'rating' && <span className="text-yellow-500">★</span>}
                      {activity.type === 'earning' && <ArrowUpRight className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{activity.model}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {activity.user}
                        {activity.amount && ` • ${activity.amount}`}
                        {activity.rating && ` • ${activity.rating} stars`}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  )
}
