'use client'

import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'
import { StatsCard } from '@/components/ui/stats-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, Users, ArrowUpRight, Download, Eye } from 'lucide-react'
import Link from 'next/link'

const earningsData = [
  { month: 'Jan', earnings: 125 },
  { month: 'Feb', earnings: 235 },
  { month: 'Mar', earnings: 450 },
  { month: 'Apr', earnings: 890 },
  { month: 'May', earnings: 1240 },
  { month: 'Jun', earnings: 1850 },
]

const stats = [
  { label: 'Total Earnings', value: '$1,850.00', change: '+42% this month', icon: DollarSign },
  { label: 'Total Users', value: '342', change: '+28 this week', icon: Users },
  { label: 'Model Views', value: '12.5K', change: '+1.2K today', icon: Eye },
  { label: 'Downloads', value: '2,847', change: '+15% trend', icon: Download },
]

const recentWithdrawals = [
  { id: 1, date: 'May 10, 2024', amount: 500, status: 'Completed', txHash: '0x123...' },
  { id: 2, date: 'Apr 28, 2024', amount: 750, status: 'Completed', txHash: '0x456...' },
  { id: 3, date: 'Apr 15, 2024', amount: 600, status: 'Completed', txHash: '0x789...' },
]

export default function EarningsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Earnings <GradientText>Dashboard</GradientText>
            </h1>
            <p className="text-muted-foreground">
              Track your model performance and earnings
            </p>
          </div>
          <Link href="/creator/withdraw">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90">
              Withdraw Funds
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
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

      {/* Earnings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl border border-border/50 p-6"
      >
        <h2 className="text-lg font-semibold mb-4">Earnings Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
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
              formatter={(value) => `$${value}`}
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

      {/* Withdrawal History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl border border-border/50 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Withdrawals</h2>
          <Link href="/creator/withdraw-history" className="text-primary text-sm hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentWithdrawals.map((withdrawal, index) => (
            <motion.div
              key={withdrawal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div>
                <p className="font-medium">{withdrawal.date}</p>
                <p className="text-sm text-muted-foreground font-mono">{withdrawal.txHash}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold">${withdrawal.amount}</p>
                  <p className="text-xs text-green-400">{withdrawal.status}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-green-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pending Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-xl border border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Available to Withdraw</h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold mb-2">$3,450.00</p>
            <p className="text-muted-foreground text-sm">
              From your model earnings and royalties
            </p>
          </div>
          <Link href="/creator/withdraw">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Withdraw Now
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
