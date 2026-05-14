'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'blue-cyan' | 'purple-pink' | 'rainbow'
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  animate?: boolean
}

const gradientVariants = {
  default: 'bg-gradient-to-r from-primary via-secondary to-accent',
  'blue-cyan': 'bg-gradient-to-r from-[oklch(0.7_0.2_250)] to-[oklch(0.75_0.15_195)]',
  'purple-pink': 'bg-gradient-to-r from-[oklch(0.6_0.25_300)] to-[oklch(0.7_0.25_330)]',
  rainbow: 'bg-gradient-to-r from-[oklch(0.7_0.2_250)] via-[oklch(0.6_0.25_300)] to-[oklch(0.75_0.15_195)]',
}

export function GradientText({
  children,
  className,
  variant = 'default',
  as: Component = 'span',
  animate = false,
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        'bg-clip-text text-transparent',
        gradientVariants[variant],
        animate && 'bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]',
        className
      )}
    >
      {children}
    </Component>
  )
}

interface GlowTextProps {
  children: ReactNode
  className?: string
  color?: 'blue' | 'purple' | 'cyan'
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'
}

const glowTextColors = {
  blue: 'text-[oklch(0.7_0.2_250)] [text-shadow:0_0_10px_oklch(0.7_0.2_250/0.8),0_0_20px_oklch(0.7_0.2_250/0.5),0_0_40px_oklch(0.7_0.2_250/0.3)]',
  purple: 'text-[oklch(0.6_0.25_300)] [text-shadow:0_0_10px_oklch(0.6_0.25_300/0.8),0_0_20px_oklch(0.6_0.25_300/0.5),0_0_40px_oklch(0.6_0.25_300/0.3)]',
  cyan: 'text-[oklch(0.75_0.15_195)] [text-shadow:0_0_10px_oklch(0.75_0.15_195/0.8),0_0_20px_oklch(0.75_0.15_195/0.5),0_0_40px_oklch(0.75_0.15_195/0.3)]',
}

export function GlowText({
  children,
  className,
  color = 'blue',
  as: Component = 'span',
}: GlowTextProps) {
  return (
    <Component className={cn(glowTextColors[color], className)}>
      {children}
    </Component>
  )
}
