'use client'

import { cn } from '@/lib/utils'
import { GlowCard } from './glow-card'
import { GradientText } from './gradient-text'
import { Badge } from './badge'
import {
  Star,
  Zap,
  TrendingUp,
  Download,
  Clock,
  CheckCircle2,
} from 'lucide-react'

import type { AIModel } from '@/lib/mock-data'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ModelCardProps {
  model: AIModel
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export function ModelCard({
  model,
  variant = 'default',
  className,
}: ModelCardProps) {
  const glowColor = model.trending
    ? 'purple'
    : model.featured
    ? 'cyan'
    : 'blue'

  // COMPACT CARD
  if (variant === 'compact') {
    return (
      <Link href={`/models/${model.id}`}>
        <GlowCard
          className={cn(
            'p-4 cursor-pointer group transition-all duration-500 hover:scale-[1.02]',
            className
          )}
          glowColor={glowColor}
        >
          <div className="flex items-center gap-4">
            
            {/* RoboHash Avatar */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-primary/30 bg-black">
              <Image
                src={`https://robohash.org/${encodeURIComponent(
                  model.name
                )}?set=set2&bgset=bg1&size=120x120`}
                alt={model.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {model.name}
              </h3>

              <p className="text-sm text-muted-foreground truncate">
                {model.creator.name}
              </p>
            </div>

            <div className="text-right">
              <div className="font-mono text-sm font-semibold text-primary">
                {model.pricing.price === 0
                  ? 'Free'
                  : `${model.pricing.price} ${model.pricing.currency}`}
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                {model.stats.rating}
              </div>
            </div>
          </div>
        </GlowCard>
      </Link>
    )
  }

  return (
    <Link href={`/models/${model.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25 }}
        className="h-full"
      >
        <GlowCard
          className={cn(
            'overflow-hidden cursor-pointer group h-full border border-border/50 hover:border-primary/40 transition-all duration-700 bg-background/40 backdrop-blur-xl',
            variant === 'featured' &&
              'ring-1 ring-primary/50 shadow-primary/20',
            className
          )}
          glowColor={glowColor}
        >
          {/* AI Preview Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={`https://robohash.org/${encodeURIComponent(
                model.name
              )}?set=set2&bgset=bg1&size=500x300`}
              alt={model.name}
              fill
              unoptimized
              className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
              {model.verified && (
                <Badge className="bg-emerald-500/90 text-white border-none backdrop-blur-xl">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}

              {model.trending && (
                <Badge className="bg-orange-500/90 text-white border-none backdrop-blur-xl">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}

              {model.featured && (
                <Badge className="bg-purple-500/90 text-white border-none backdrop-blur-xl">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Category */}
            <div className="absolute bottom-4 right-4">
              <Badge className="bg-black/60 backdrop-blur-xl text-white border-white/10">
                {model.category}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            
            {/* Creator */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-primary/30">
                <Image
                  src={`https://robohash.org/${encodeURIComponent(
                    model.creator.name
                  )}?set=set1&size=100x100`}
                  alt={model.creator.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    {model.creator.name}
                  </span>

                  {model.creator.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  AI Creator
                </p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h3 className="font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors">
                {model.name}
              </h3>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {model.shortDescription}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {model.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-muted/40 border-primary/20 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  {model.stats.rating}
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Download className="w-4 h-4" />
                  {formatNumber(model.stats.downloads)}
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {model.stats.avgLatency}ms
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/40">
              <div>
                {model.pricing.type === 'free' ? (
                  <GradientText
                    variant="blue-cyan"
                    className="font-black text-xl"
                  >
                    FREE
                  </GradientText>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="font-black text-2xl text-primary">
                      {model.pricing.price}
                    </span>

                    <span className="text-muted-foreground text-sm mb-1">
                      {model.pricing.currency}
                    </span>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-5 py-2.5
                  rounded-xl
                  bg-gradient-to-r
                  from-primary
                  to-cyan-500
                  text-white
                  font-semibold
                  shadow-lg
                  hover:shadow-cyan-500/30
                  transition-all
                "
              >
                Try Now
              </motion.button>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </Link>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000)
    return `${(num / 1000000).toFixed(1)}M`

  if (num >= 1000)
    return `${(num / 1000).toFixed(1)}K`

  return num.toString()
}