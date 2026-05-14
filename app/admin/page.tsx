'use client'

import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'
import { StatsCard } from '@/components/ui/stats-card'
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Users, Shield, DollarSign, Zap, AlertTriangle, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Total Users', value: '12,450', change: '+340 this month', icon: Users },
  { label: 'Active Models', value: '847', change: '+45 this week', icon: Zap },
  { label: 'Total Revenue', value: '$124,550', change: '+23.5% YoY', icon: DollarSign },
  { label: 'Reports', value: '24', change: '12 pending', icon: AlertTriangle },
]

const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 26000 },
  { month: 'Jun', revenue: 31000 },
]

const userGrowth = [
  { name: 'Creators', value: 2847, color: '#6366f1' },
  { name: 'Users', value: 9603, color: '#8b5cf6' },
]

const flaggedModels = [
  { id: 1, name: 'Malware Detector V1', reason: 'Suspicious behavior', severity: 'high' },
  { id: 2, name: 'Data Scraper', reason: 'Copyright violation', severity: 'critical' },
  { id: 3, name: 'Image Generator', reason: 'Adult content', severity: 'high' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Admin <GradientText>Dashboard</GradientText>
            </h1>
            <p className="text-muted-foreground">
              Platform overview and moderation
            </p>
          </div>
          <Button size="lg" variant="outline">
            View Reports
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            delay={0.2 + index * 0.1}
          />
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="glass-card rounded-xl border border-border/50 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Platform Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 100, 255, 0.1)" />
              <XAxis stroke="rgba(100, 100, 100, 0.5)" />
              <YAxis stroke="rgba(100, 100, 100, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.95)',
                  border: '1px solid rgba(100, 100, 255, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#00FFA3"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="glass-card rounded-xl border border-border/50 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userGrowth}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {userGrowth.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.95)',
                  border: '1px solid rgba(100, 100, 255, 0.2)',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {userGrowth.map((user) => (
              <div key={user.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: user.color }} />
                  {user.name}
                </span>
                <span className="font-medium">{user.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Flagged Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="glass-card rounded-xl border border-border/50 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Flagged Models
          </h2>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </div>
        <div className="space-y-3">
          {flaggedModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-border/30"
            >
              <div>
                <p className="font-medium">{model.name}</p>
                <p className="text-sm text-muted-foreground">{model.reason}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={model.severity === 'critical' ? 'destructive' : 'secondary'}
                  className="capitalize"
                >
                  {model.severity}
                </Badge>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
