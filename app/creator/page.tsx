'use client'

import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'
import { StatsCard } from '@/components/ui/stats-card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, DollarSign, Zap, Upload, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const stats = [
  { label: 'Total Earnings', value: '$12,450.50', change: '+12.5%', icon: DollarSign },
  { label: 'Models Published', value: '8', change: '+2 this month', icon: Zap },
  { label: 'Total Downloads', value: '2,847', change: '+340 today', icon: Users },
  { label: 'API Usage', value: '1.2M', change: '+23% this week', icon: TrendingUp },
]

const earningsData = [
  { month: 'Jan', earnings: 1200, sales: 4000 },
  { month: 'Feb', earnings: 1900, sales: 3000 },
  { month: 'Mar', earnings: 2400, sales: 2000 },
  { month: 'Apr', earnings: 3200, sales: 2780 },
  { month: 'May', earnings: 4100, sales: 1890 },
  { month: 'Jun', earnings: 5200, sales: 2390 },
]

const modelPerformance = [
  { name: 'GPT-Vision Clone', downloads: 2400, revenue: 4200 },
  { name: 'BERT Sentiment', downloads: 1398, revenue: 2210 },
  { name: 'Stable Diffusion XL', downloads: 9800, revenue: 8290 },
  { name: 'Whisper Speech', downloads: 3908, revenue: 5000 },
  { name: 'LLaMA 2 Fine-tune', downloads: 4800, revenue: 3800 },
]

export default function CreatorDashboardPage() {
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
              Creator <GradientText>Dashboard</GradientText>
            </h1>
            <p className="text-muted-foreground">
              Manage your AI models and earnings
            </p>
          </div>
          <Link href="/creator/upload">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Upload className="w-5 h-5 mr-2" />
              Upload Model
            </Button>
          </Link>
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
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="glass-card rounded-xl border border-border/50 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Earnings Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningsData}>
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
                dataKey="earnings"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Model Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="glass-card rounded-xl border border-border/50 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Top Models</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={modelPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 100, 255, 0.1)" />
              <XAxis dataKey="name" stroke="rgba(100, 100, 100, 0.5)" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="rgba(100, 100, 100, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.95)',
                  border: '1px solid rgba(100, 100, 255, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="downloads" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="glass-card rounded-xl border border-border/50 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Models</h2>
          <Link href="/creator/models" className="text-primary text-sm hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {modelPerformance.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div>
                <p className="font-medium">{model.name}</p>
                <p className="text-sm text-muted-foreground">
                  {model.downloads.toLocaleString()} downloads
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${model.revenue.toLocaleString()}</p>
                <p className="text-sm text-green-400">revenue</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
