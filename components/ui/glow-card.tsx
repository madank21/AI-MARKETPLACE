'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'cyan' | 'pink' | 'green'
  hover?: boolean
  animated?: boolean
}

const glowColors = {
  blue: 'hover:shadow-[0_0_30px_oklch(0.7_0.2_250/0.4)] shadow-[0_0_15px_oklch(0.7_0.2_250/0.2)]',
  purple: 'hover:shadow-[0_0_30px_oklch(0.6_0.25_300/0.4)] shadow-[0_0_15px_oklch(0.6_0.25_300/0.2)]',
  cyan: 'hover:shadow-[0_0_30px_oklch(0.75_0.15_195/0.4)] shadow-[0_0_15px_oklch(0.75_0.15_195/0.2)]',
  pink: 'hover:shadow-[0_0_30px_oklch(0.7_0.25_330/0.4)] shadow-[0_0_15px_oklch(0.7_0.25_330/0.2)]',
  green: 'hover:shadow-[0_0_30px_oklch(0.75_0.2_150/0.4)] shadow-[0_0_15px_oklch(0.75_0.2_150/0.2)]',
}

const borderColors = {
  blue: 'before:bg-gradient-to-r before:from-transparent before:via-[oklch(0.7_0.2_250)] before:to-transparent',
  purple: 'before:bg-gradient-to-r before:from-transparent before:via-[oklch(0.6_0.25_300)] before:to-transparent',
  cyan: 'before:bg-gradient-to-r before:from-transparent before:via-[oklch(0.75_0.15_195)] before:to-transparent',
  pink: 'before:bg-gradient-to-r before:from-transparent before:via-[oklch(0.7_0.25_330)] before:to-transparent',
  green: 'before:bg-gradient-to-r before:from-transparent before:via-[oklch(0.75_0.2_150)] before:to-transparent',
}

export function GlowCard({
  children,
  className,
  glowColor = 'blue',
  hover = true,
  animated = false,
}: GlowCardProps) {
  const Component = animated ? motion.div : 'div'
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }
    : {}

  return (
    <Component
      className={cn(
        'relative rounded-xl bg-card/80 backdrop-blur-xl border border-border/50',
        'transition-all duration-300',
        hover && glowColors[glowColor],
        hover && 'hover:scale-[1.02] hover:border-border',
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

interface GlowButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glowColor?: 'blue' | 'purple' | 'cyan'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground',
  secondary: 'bg-secondary/20 text-secondary-foreground border border-secondary/50 hover:bg-secondary/30',
  outline: 'bg-transparent border border-border hover:bg-muted/50 text-foreground',
  ghost: 'bg-transparent hover:bg-muted/50 text-foreground',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function GlowButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glowColor = 'blue',
  onClick,
  disabled,
  type = 'button',
}: GlowButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative rounded-lg font-semibold transition-all duration-300',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        buttonVariants[variant],
        buttonSizes[size],
        variant === 'primary' && glowColors[glowColor],
        className
      )}
    >
      {children}
    </button>
  )
}
