// app/explore/page.tsx

'use client'

import { Search, Filter, Grid, List, Star, Zap, Crown, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { mockModels1 } from '@/lib/mock-data' // Add this to your mock-data
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'

// Mock data for models (add to lib/mock-data.ts)
export const mockModels = [
  {
    id: '1',
    name: 'Nova AI Pro',
    creator: 'Alex Chen',
    rating: 4.9,
    downloads: 12450,
    price: 29,
    category: 'Image Gen',
    verified: true,
    trending: true,
    tags: ['Stable Diffusion', 'High Fidelity', 'Commercial']
  },
  {
    id: '2',
    name: 'Quantum Code',
    creator: 'Sarah Kim',
    rating: 4.8,
    downloads: 8920,
    price: 0,
    category: 'Code Gen',
    verified: true,
    trending: false,
    tags: ['GPT-4', 'Code Completion', 'TypeScript']
  },
  // Add more mock models...
]

function ModelCard({ model }: { model: typeof mockModels[0] }) {
  return (
    <Link href={`/models/${model.id}`}>
      <GlowCard className="group hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden" glowColor="cyan" hover>
        <div className="absolute top-4 right-4 flex gap-1">
          {model.verified && (
            <Badge variant="secondary" className="bg-primary/90 backdrop-blur-sm">
              <Crown className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {model.trending && (
            <Badge variant="destructive" className="bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        <div className="p-6 h-full flex flex-col">
          {/* Model Preview */}
          <motion.div
            className="w-full h-48 bg-gradient-to-br from-muted/50 to-muted rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
            whileHover={{ scale: 1.02 }}
          >
            <Zap className="w-16 h-16 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {model.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              by <span className="font-semibold text-primary">{model.creator}</span>
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-6">
              {model.tags.slice(0, 2).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{model.rating}</span>
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                {model.downloads.toLocaleString()} downloads
              </div>
            </div>

            {/* Category & Price */}
            <div className="flex items-center justify-between">
              <Badge className="bg-secondary text-secondary-foreground px-3 py-1">
                {model.category}
              </Badge>
              {model.price > 0 ? (
                <div className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ${model.price}
                </div>
              ) : (
                <Badge variant="secondary" className="bg-green-500/90 text-white">
                  Free
                </Badge>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </Link>
  )
}

function ExploreFilters() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filters = [
    { id: 'all', label: 'All Models', icon: Grid },
    { id: 'image', label: 'Image Gen', icon: Star },
    { id: 'code', label: 'Code Gen', icon: Zap },
    { id: 'text', label: 'Text Gen', icon: TrendingUp },
    { id: 'trending', label: 'Trending', icon: Crown },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-8 lg:mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          className={`group backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${activeFilter === filter.id
            ? 'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25'
            : 'hover:bg-secondary/50 hover:border-primary/50'
            }`}
          onClick={() => setActiveFilter(filter.id)}
        >
          <filter.icon className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

function SearchBar() {
  return (
    <div className="relative max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search 10,000+ AI models..."
          className="w-full pl-12 pr-6 py-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl text-lg font-medium shadow-xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}

export default function ExplorePage() {
  const [models, setModels] = useState(mockModels)
  const [loading, setLoading] = useState(true)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-black/20">
      {/* Hero Search */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm mb-6 shadow-xl">
              15,247+ Models Available
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-accent leading-tight">
              Explore <GradientText variant="purple-pink">AI Universe</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the best AI models for image generation, code, text, and more.
              Built by top creators worldwide.
            </p>
          </motion.div>

          <SearchBar />
        </div>
      </section>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <ExploreFilters />
          <div className="flex items-center gap-2">
            <Button
              variant={layout === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('grid')}
              className="backdrop-blur-sm"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('list')}
              className="backdrop-blur-sm"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Models Grid */}
        <AnimatePresence mode="wait">
          <StaggerContainer
            key={layout}
            className={`grid gap-6 ${layout === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              : 'grid-cols-1'
              }`}
            staggerDelay={0.1}
          >
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                <StaggerItem key={`skeleton-${i}`}>
                  <Skeleton className="h-[500px] rounded-3xl" />
                </StaggerItem>
              ))
              : models.map((model, index) => (
                <StaggerItem key={model.id}>
                  <ModelCard model={model} />
                </StaggerItem>
              ))}
          </StaggerContainer>
        </AnimatePresence>

        {/* Load More */}
        <div className="text-center mt-20">
          <Button size="lg" className="group backdrop-blur-sm shadow-2xl px-12 text-lg font-bold">
            <span>Load More Models</span>
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full ml-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </Button>
        </div>
      </div>
    </div>
  )
}