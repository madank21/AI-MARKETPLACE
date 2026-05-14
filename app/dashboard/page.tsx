'use client'

import { GlowCard, GlowButton } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockModels, recentActivity } from '@/lib/mock-data'
import {
  Zap,
  Activity,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Star,
  DollarSign,
  Key,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// Mock usage data for chart
const usageData = [
  { date: 'Mon', calls: 1200 },
  { date: 'Tue', calls: 1800 },
  { date: 'Wed', calls: 2400 },
  { date: 'Thu', calls: 2100 },
  { date: 'Fri', calls: 3200 },
  { date: 'Sat', calls: 2800 },
  { date: 'Sun', calls: 3500 },
]

// Mock user stats
const userStats = {
  totalCalls: 45892,
  callsThisMonth: 12450,
  creditsRemaining: 8750,
  activeModels: 5,
  apiKeys: 3,
  spentThisMonth: '0.45 ETH',
}

// Mock subscribed models
const subscribedModels = mockModels.slice(0, 3)

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              Welcome back,{' '}
              <GradientText variant="blue-cyan">0x1a2b...3c4d</GradientText>
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your AI models today.
            </p>
          </div>
          <Link href="/marketplace">
            <GlowButton>
              <Plus className="w-4 h-4 mr-2" />
              Add Model
            </GlowButton>
          </Link>
        </div>
      </AnimatedContainer>

      {/* Stats Grid */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.1}>
        <StaggerItem>
          <GlowCard className="p-6" glowColor="blue">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="outline" className="text-green-500 border-green-500/30">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +24%
              </Badge>
            </div>
            <div className="text-2xl font-bold font-mono mb-1">
              {userStats.callsThisMonth.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">API Calls This Month</div>
          </GlowCard>
        </StaggerItem>

        <StaggerItem>
          <GlowCard className="p-6" glowColor="purple">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono mb-1">
              {userStats.creditsRemaining.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Credits Remaining</div>
          </GlowCard>
        </StaggerItem>

        <StaggerItem>
          <GlowCard className="p-6" glowColor="cyan">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono mb-1">
              {userStats.activeModels}
            </div>
            <div className="text-sm text-muted-foreground">Active Models</div>
          </GlowCard>
        </StaggerItem>

        <StaggerItem>
          <GlowCard className="p-6" glowColor="pink">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.7_0.25_330)]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[oklch(0.7_0.25_330)]" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono mb-1">
              {userStats.spentThisMonth}
            </div>
            <div className="text-sm text-muted-foreground">Spent This Month</div>
          </GlowCard>
        </StaggerItem>
      </StaggerContainer>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <AnimatedContainer delay={0.3} className="lg:col-span-2">
          <GlowCard className="p-6" glowColor="blue">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">API Usage</h3>
                <p className="text-sm text-muted-foreground">Calls over the last 7 days</p>
              </div>
              <Badge variant="outline">
                <TrendingUp className="w-3 h-3 mr-1" />
                +32% vs last week
              </Badge>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.7 0.2 250)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="oklch(0.7 0.2 250)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    stroke="oklch(0.65 0 0)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="oklch(0.65 0 0)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.12 0.02 270)',
                      border: '1px solid oklch(0.25 0.05 270)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="calls" 
                    stroke="oklch(0.7 0.2 250)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCalls)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>
        </AnimatedContainer>

        {/* Quick Actions */}
        <AnimatedContainer delay={0.4}>
          <GlowCard className="p-6 h-full" glowColor="purple">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/dashboard/api-keys">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Key className="w-5 h-5 text-primary" />
                  Manage API Keys
                  <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded">{userStats.apiKeys}</span>
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Zap className="w-5 h-5 text-secondary" />
                  Browse Models
                </Button>
              </Link>
              <Link href="/dashboard/billing">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <CreditCard className="w-5 h-5 text-accent" />
                  Add Credits
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Activity className="w-5 h-5 text-[oklch(0.7_0.25_330)]" />
                  View Documentation
                </Button>
              </Link>
            </div>
          </GlowCard>
        </AnimatedContainer>
      </div>

      {/* Subscribed Models & Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subscribed Models */}
        <AnimatedContainer delay={0.5}>
          <GlowCard className="p-6" glowColor="cyan">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Subscribed Models</h3>
              <Link href="/dashboard/models">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {subscribedModels.map((model) => (
                <Link key={model.id} href={`/models/${model.id}`}>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{model.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{model.creator.name}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          {model.stats.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {model.pricing.price === 0 ? 'Free' : `${model.pricing.price} ${model.pricing.currency}`}
                      </div>
                      <div className="text-xs text-muted-foreground">{model.pricing.perUnit}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </GlowCard>
        </AnimatedContainer>

        {/* Recent Activity */}
        <AnimatedContainer delay={0.6}>
          <GlowCard className="p-6" glowColor="pink">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${activity.type === 'purchase' ? 'bg-primary/10' : ''}
                    ${activity.type === 'deploy' ? 'bg-secondary/10' : ''}
                    ${activity.type === 'rating' ? 'bg-yellow-500/10' : ''}
                    ${activity.type === 'earning' ? 'bg-green-500/10' : ''}
                  `}>
                    {activity.type === 'purchase' && <DollarSign className="w-5 h-5 text-primary" />}
                    {activity.type === 'deploy' && <Zap className="w-5 h-5 text-secondary" />}
                    {activity.type === 'rating' && <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />}
                    {activity.type === 'earning' && <ArrowUpRight className="w-5 h-5 text-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate capitalize">{activity.type}</div>
                    <div className="text-xs text-muted-foreground truncate">{activity.model}</div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <div className="text-sm font-medium text-green-500">{activity.amount}</div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </AnimatedContainer>
      </div>
    </div>
  )
}
