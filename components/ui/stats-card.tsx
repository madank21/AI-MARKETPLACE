'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  delay?: number
}

export function StatsCard({
  label,
  value,
  change,
  icon: Icon,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ translateY: -5 }}
      className="glass-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs font-medium text-green-400">{change}</span>
      </div>
      <div>
        <p className="text-muted-foreground text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  )
}
