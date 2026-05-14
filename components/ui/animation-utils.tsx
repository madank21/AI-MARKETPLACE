'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface AnimatedContainerProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

interface FloatingElementProps {
  children: React.ReactNode
  duration?: number
  className?: string
}

export function AnimatedContainer({
  children,
  delay = 0,
  className = '',
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElement({
  children,
  duration = 3,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PulseProps {
  children: React.ReactNode
  className?: string
}

export function Pulse({ children, className = '' }: PulseProps) {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface GlowProps {
  children: React.ReactNode
  color?: 'primary' | 'secondary' | 'green'
  className?: string
}

export function Glow({ children, color = 'primary', className = '' }: GlowProps) {
  const colors = {
    primary: 'from-primary/30 to-primary/0',
    secondary: 'from-secondary/30 to-secondary/0',
    green: 'from-green-500/30 to-green-500/0',
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      <div
        className={`absolute inset-0 bg-gradient-radial ${colors[color]} blur-3xl pointer-events-none`}
      />
    </div>
  )
}

interface TypingProps {
  text: string
  speed?: number
  className?: string
}

export function TypingAnimation({ text, speed = 50, className = '' }: TypingProps) {
  const [displayedText, setDisplayedText] = React.useState('')

  React.useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index))
      index++
      if (index > text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span className={className}>{displayedText}</span>
}

interface ShimmerProps {
  children: React.ReactNode
  className?: string
}

export function Shimmer({ children, className = '' }: ShimmerProps) {
  return (
    <motion.div
      animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
        backgroundSize: '200% 100%',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

import React from 'react'
