'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn'
}

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  slideIn: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
  },
}

export function AnimatedContainer({
  children,
  className,
  delay = 0,
  duration = 0.6,
  animation = 'fadeInUp',
}: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      initial={animations[animation].initial}
      whileInView={animations[animation].animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export function CountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
}: CountUpProps) {
  return (
    <motion.span
      className={cn('tabular-nums', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Counter end={end} duration={duration} decimals={decimals} />
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  )
}

function Counter({ end, duration, decimals }: { end: number; duration: number; decimals: number }) {
  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={(entry) => {
          if (entry?.target) {
            const target = entry.target as HTMLElement
            let start = 0
            const stepTime = Math.abs(Math.floor(duration * 1000 / end))
            const timer = setInterval(() => {
              start += Math.ceil(end / (duration * 60))
              if (start >= end) {
                start = end
                clearInterval(timer)
              }
              target.textContent = decimals > 0 ? start.toFixed(decimals) : start.toLocaleString()
            }, stepTime)
          }
        }}
      >
        0
      </motion.span>
    </motion.span>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
}: TypewriterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * (speed / 1000) }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}

export function FloatingElement({
  children,
  className,
  amplitude = 10,
  duration = 3,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

interface PulseProps {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
}

export function Pulse({
  children,
  className,
  scale = 1.05,
  duration = 2,
}: PulseProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
