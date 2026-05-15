'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { ReactNode, ComponentProps } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'cyan' | 'pink' | 'green' | 'emerald' | 'orange'
  hover?: boolean
  animated?: boolean
  containerClassName?: string
  classNameContainer?: string // 👈 NEW: Separate container class
}

const glowColors = {
  blue: 'hover:shadow-[0_0_40px_theme(colors.blue.400/0.6)] shadow-[0_0_20px_theme(colors.blue.400/0.3)]',
  purple: 'hover:shadow-[0_0_40px_theme(colors.purple.500/0.6)] shadow-[0_0_20px_theme(colors.purple.500/0.3)]',
  cyan: 'hover:shadow-[0_0_40px_theme(colors.cyan.400/0.6)] shadow-[0_0_20px_theme(colors.cyan.400/0.3)]',
  pink: 'hover:shadow-[0_0_40px_theme(colors.pink.500/0.6)] shadow-[0_0_20px_theme(colors.pink.500/0.3)]',
  green: 'hover:shadow-[0_0_40px_theme(colors.green.500/0.6)] shadow-[0_0_20px_theme(colors.green.500/0.3)]',
  emerald: 'hover:shadow-[0_0_40px_theme(colors.emerald.500/0.6)] shadow-[0_0_20px_theme(colors.emerald.500/0.3)]',
  orange: 'hover:shadow-[0_0_40px_theme(colors.orange.500/0.6)] shadow-[0_0_20px_theme(colors.orange.500/0.3)]',
}

const borderGlows = {
  blue: 'hover:before:shadow-[0_0_20px_theme(colors.blue.400/0.4)]',
  purple: 'hover:before:shadow-[0_0_20px_theme(colors.purple.500/0.4)]',
  cyan: 'hover:before:shadow-[0_0_20px_theme(colors.cyan.400/0.4)]',
  pink: 'hover:before:shadow-[0_0_20px_theme(colors.pink.500/0.4)]',
  green: 'hover:before:shadow-[0_0_20px_theme(colors.green.500/0.4)]',
  emerald: 'hover:before:shadow-[0_0_20px_theme(colors.emerald.500/0.4)]',
  orange: 'hover:before:shadow-[0_0_20px_theme(colors.orange.500/0.4)]',
}

export function GlowCard({
  children,
  className,
  glowColor = 'blue',
  hover = true,
  animated = false,
  containerClassName,
  classNameContainer, // 👈 NEW PROP
}: GlowCardProps) {
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  return (
   <motion.div
      className={cn(
        'group relative rounded-3xl bg-card/95 backdrop-blur-xl border border-border/40 hover:border-white/30 transition-all duration-700 overflow-hidden',
        hover && glowColors[glowColor],
        hover && 'hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]',
        className
      )}
      initial={animated ? { opacity: 0, y: 30, scale: 0.95 } : undefined}
      whileInView={animated ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={animated ? { once: true, margin: "-100px" } : undefined}
      transition={animated ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] } : undefined}
      whileHover={hover ? { scale: 1.02 } : undefined}
     
    >
      {/* Animated border glow */}
      {hover && (
        <motion.div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      
      {/* Content Container */}
      <div className={cn(
        'relative z-10 h-full p-8', // 👈 Fixed padding
        containerClassName,
        classNameContainer
      )}>
        {children}
      </div>
    </motion.div>
  )
}

// GlowButton remains the SAME (no changes needed)
interface GlowButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glowColor?: 'blue' | 'purple' | 'cyan' | 'pink' | 'green' | 'emerald'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-transparent hover:from-primary/90 hover:shadow-primary/25',
  secondary: 'bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground border-secondary/30 hover:from-secondary/90 hover:shadow-secondary/20',
  outline: 'bg-transparent/50 border-2 border-border/50 backdrop-blur-xl hover:bg-white/10 hover:border-primary/50 hover:shadow-primary/10 text-foreground',
  ghost: 'bg-transparent hover:bg-white/10 text-foreground backdrop-blur-sm',
  destructive: 'bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:shadow-destructive/25',
}

const buttonSizes = {
  sm: 'h-9 px-4 rounded-xl text-sm font-semibold',
  md: 'h-11 px-6 rounded-xl text-base font-semibold',
  lg: 'h-12 px-8 rounded-2xl text-lg font-bold',
  xl: 'h-14 px-12 rounded-2xl text-xl font-black',
}

export function GlowButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glowColor = 'blue',
  onClick,
  disabled,
  loading,
  type = 'button',
  icon,
}: GlowButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 overflow-hidden',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        buttonVariants[variant],
        buttonSizes[size],
        glowColors[glowColor],
        'hover:scale-105 active:scale-95 shadow-lg',
        className
      )}
    >
      {loading && (
        <motion.div 
          className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full shrink-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {icon && !loading && icon}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      
      {/* Shine effect */}
      {!disabled && !loading && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '120%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      )}
    </button>
  )
}