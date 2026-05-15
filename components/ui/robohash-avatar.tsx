// components/ui/robohash-avatar.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getRobohashUrl, getRobohashInitials } from '@/lib/robohash'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface RobohashAvatarProps {
  name: string
  size?: number
  className?: string
  showFallback?: boolean
}

export function RobohashAvatar({ 
  name, 
  size = 80, 
  className, 
  showFallback = true 
}: RobohashAvatarProps) {
  const url = getRobohashUrl(name, size)
  const initials = getRobohashInitials(name)

  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-white/20 shadow-2xl flex items-center justify-center",
        className
      )}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <Image
        src={url}
        alt={`${name}'s avatar`}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        priority={size > 64}
      />
      
      {/* Fallback initials */}
      {showFallback && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center text-xl font-black text-white drop-shadow-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {initials}
        </motion.div>
      )}
    </motion.div>
  )
}