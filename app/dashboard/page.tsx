'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { GlowCard, GlowButton } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/ui/navbar'
import { ParticleField } from '@/components/ui/particle-field'
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
  User,
  Mail,
  Wallet,
  Calendar,
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
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ParticleField className="opacity-10" particleCount={30} />
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section with User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="glass-card rounded-2xl border border-border/50 p-8 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || 'User'}
                    className="w-24 h-24 rounded-full border-4 border-primary/30 shadow-lg shadow-primary/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-4 border-primary/30 shadow-lg shadow-primary/20">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-background">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 >
                   Welcome back
                </h1>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {user?.fullName || user?.username ? (
                    <GradientText variant="blue-cyan">
                      {user.fullName || user.username}
                    </GradientText>
                  ) : (
                    <GradientText variant="blue-cyan">
                      {user?.primaryWeb3Wallet?.web3Wallet?.slice(0, 6)}...{user?.primaryWeb3Wallet?.web3Wallet?.slice(-4) || 'User'}
                    </GradientText>
                  )}
                </h1>
                <p className="text-muted-foreground mb-4">
                  {user?.primaryEmailAddress?.emailAddress || user?.primaryWeb3Wallet?.web3Wallet || "Here's what's happening with your AI models today."}
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-background/50 rounded-lg px-4 py-2 border border-border/50">
                    <p className="text-sm text-muted-foreground">Member since</p>
                    <p className="font-semibold">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-background/50 rounded-lg px-4 py-2 border border-border/50">
                    <p className="text-sm text-muted-foreground">Auth Method</p>
                    <p className="font-semibold">
                      {user?.primaryWeb3Wallet ? 'Wallet' : 'Email'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Clerk User Button & Add Model */}
              <div className="flex flex-col items-center gap-3">
                <UserButton  />
                <Link href="/marketplace">
                  <GlowButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Model
                  </GlowButton>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {/* Profile Card */}
          <GlowCard className="p-6" glowColor="blue">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Profile</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{user?.fullName || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{user?.username || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-mono text-sm">{user?.id?.slice(0, 12)}...</p>
              </div>
            </div>
          </GlowCard>

          {/* Contact Card */}
          <GlowCard className="p-6" glowColor="purple">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-semibold">Contact</h3>
            </div>
            <div className="space-y-3">
              {user?.primaryEmailAddress && (
                <div>
                  <p className="text-sm text-muted-foreground">Primary Email</p>
                  <p className="font-medium">{user.primaryEmailAddress.emailAddress}</p>
                </div>
              )}
              {user?.emailAddresses?.map((email, index) => (
                <div key={email.id}>
                  <p className="text-sm text-muted-foreground">
                    Email {index + 1}
                    {email.id === user.primaryEmailAddressId && ' (Primary)'}
                  </p>
                  <p className="font-medium">{email.emailAddress}</p>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Wallet Card */}
          <GlowCard className="p-6" glowColor="cyan">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold">Wallet</h3>
            </div>
            {user?.primaryWeb3Wallet ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Connected Wallet</p>
                  <p className="font-mono text-sm">
                    {user.primaryWeb3Wallet.web3Wallet?.slice(0, 10)}...
                    {user.primaryWeb3Wallet.web3Wallet?.slice(-8)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Network</p>
                  <p className="font-medium">Ethereum</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No wallet connected</p>
            )}
          </GlowCard>
        </motion.div>

        {/* Stats Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12" staggerDelay={0.1}>
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
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
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
    </main>
  )
}