'use client'

import { cn } from '@/lib/utils'
import { GlowCard } from './glow-card'
import { GradientText } from './gradient-text'
import { Badge } from './badge'
import { Star, Zap, TrendingUp, Download, Clock, CheckCircle2 } from 'lucide-react'
import type { AIModel } from '@/lib/mock-data'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ModelCardProps {
  model: AIModel
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export function ModelCard({ model, variant = 'default', className }: ModelCardProps) {
  const glowColor = model.trending ? 'purple' : model.featured ? 'cyan' : 'blue'

  if (variant === 'compact') {
    return (
      <Link href={`/models/${model.id}`}>
        <GlowCard
          className={cn('p-4 cursor-pointer group', className)}
          glowColor={glowColor}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
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
                {model.pricing.price === 0 ? 'Free' : `${model.pricing.price} ${model.pricing.currency}`}
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
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <GlowCard
          className={cn(
            'overflow-hidden cursor-pointer group h-full',
            variant === 'featured' && 'ring-1 ring-primary/50',
            className
          )}
          glowColor={glowColor}
        >
          {/* Header with gradient background */}
          <div className="relative h-32 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="relative flex gap-2 flex-wrap">
              {model.verified && (
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {model.trending && (
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
              {model.featured && (
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Category icon */}
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Title and creator */}
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                {model.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <span className="text-sm text-muted-foreground">{model.creator.name}</span>
                {model.creator.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {model.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {model.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  {model.stats.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {formatNumber(model.stats.downloads)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {model.stats.avgLatency}ms
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                {model.pricing.type === 'free' ? (
                  <GradientText variant="blue-cyan" className="font-semibold">
                    Free
                  </GradientText>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-semibold text-foreground">
                      {model.pricing.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {model.pricing.currency}
                    </span>
                    {model.pricing.perUnit && (
                      <span className="text-xs text-muted-foreground">
                        / {model.pricing.perUnit}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  'capitalize',
                  model.pricing.type === 'free' && 'border-green-500/50 text-green-500',
                  model.pricing.type === 'pay-per-use' && 'border-primary/50 text-primary',
                  model.pricing.type === 'subscription' && 'border-secondary/50 text-secondary',
                )}
              >
                {model.pricing.type.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </Link>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
