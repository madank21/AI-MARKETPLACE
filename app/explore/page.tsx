'use client'

import { Search, Grid, List, Star, Zap, Crown, TrendingUp, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { mockModels } from '@/lib/mock-data'
import { StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { cn } from '@/lib/utils'

// COMPLETE 12+ MODELS with REAL IMAGE PREVIEWS
const models = [
  { id: '1', name: 'Nova AI Pro', creator: 'Alex Chen', rating: 4.9, downloads: 12450, price: 29, category: 'Image', verified: true, trending: true, tags: ['SDXL', '4K'], image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop' },
  { id: '2', name: 'Quantum Code', creator: 'Sarah Kim', rating: 4.8, downloads: 8920, price: 0, category: 'Code', verified: true, trending: false, tags: ['GPT-4'], image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
  { id: '3', name: 'PixelForge XL', creator: 'Jamie Ruiz', rating: 4.95, downloads: 21500, price: 49, category: 'Image', verified: true, trending: true, tags: ['Midjourney'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ffe7e5?w=400&h=300&fit=crop' },
  { id: '4', name: 'SynthText Pro', creator: 'Elena Voss', rating: 4.7, downloads: 6730, price: 19, category: 'Text', verified: false, trending: false, tags: ['Llama'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
  { id: '5', name: 'VectorFlow', creator: 'Marcus Lee', rating: 4.85, downloads: 18900, price: 39, category: 'Image', verified: true, trending: true, tags: ['SVG'], image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop' },
  { id: '6', name: 'CodeMaster AI', creator: 'Priya Singh', rating: 4.92, downloads: 23400, price: 0, category: 'Code', verified: true, trending: false, tags: ['Solidity'], image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop' },
  { id: '7', name: 'DreamScape', creator: 'Luca Rossi', rating: 4.88, downloads: 15600, price: 59, category: 'Image', verified: true, trending: true, tags: ['Surreal'], image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop' },
  { id: '8', name: 'Narrative Engine', creator: 'Aiko Tanaka', rating: 4.75, downloads: 8900, price: 25, category: 'Text', verified: false, trending: false, tags: ['Stories'], image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' },
  { id: '9', name: 'HyperVision 4K', creator: 'David Park', rating: 4.96, downloads: 31200, price: 79, category: 'Image', verified: true, trending: true, tags: ['Realistic'], image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
  { id: '10', name: 'SmartContract Pro', creator: 'Rohan Patel', rating: 4.91, downloads: 14500, price: 45, category: 'Code', verified: true, trending: false, tags: ['Ethereum'], image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop' },
  { id: '11', name: 'Cosmic Art', creator: 'Luna Morales', rating: 4.82, downloads: 19800, price: 35, category: 'Image', verified: true, trending: true, tags: ['Space'], image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop' },
  { id: '12', name: 'Poetry Master', creator: 'Emma Wilson', rating: 4.78, downloads: 7650, price: 15, category: 'Text', verified: false, trending: false, tags: ['Poetry'], image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop' },
]

function ModelCard({ model }: { model: typeof models[0] }) {
  return (
    <Link href={`/models/${model.id}`} className="block">
      <GlowCard className="group h-[520px] p-6 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative border border-border/50 hover:border-primary/50" glowColor="purple" hover>
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {model.verified && <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600">✓ Verified</Badge>}
          {model.trending && <Badge className="bg-gradient-to-r from-orange-500 to-red-500">🔥 Trending</Badge>}
        </div>

        {/* Image Preview */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-700">
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-cover group-hover:brightness-110 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="space-y-4 flex-1">
          <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">{model.name}</h3>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
              {model.creator.charAt(0)}
            </div>
            <span className="font-semibold truncate">{model.creator}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {model.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-2 bg-muted rounded-lg">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{model.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
              <Download className="w-4 h-4" />
              {model.downloads.toLocaleString()}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto pt-4">
            {model.price === 0 ? (
              <Badge className="bg-emerald-500 text-white font-bold px-4 py-2 shadow-lg">FREE</Badge>
            ) : (
              <div className="text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                ${model.price}
              </div>
            )}
            <Button size="sm" className="shadow-lg hover:shadow-purple-500/25">Try Now</Button>
          </div>
        </div>
      </GlowCard>
    </Link>
  )
}

export default function ExplorePage() {
  const [loading, setLoading] = useState(true)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero */}
      <section className="pt-32 pb-24 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 mb-8 shadow-2xl">15K+ Models</Badge>
          <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text mb-6">
            Explore <GradientText variant="purple-pink">AI Models</GradientText>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">Discover the best AI models built by top creators</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary" />
              <input
                placeholder="Search models..."
                className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-lg focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
          {['All', 'Image', 'Code', 'Text', 'Trending', 'Free'].map((filter) => (
            <Button key={filter} variant="outline" className="backdrop-blur-xl hover:bg-white/10">
              {filter}
            </Button>
          ))}
        </div>

        <div className="flex justify-center lg:justify-end mb-12 gap-2">
          <Button variant={layout === 'grid' ? 'default' : 'outline'} onClick={() => setLayout('grid')}>
            <Grid className="w-5 h-5 mr-2" />
            Grid
          </Button>
          <Button variant={layout === 'list' ? 'default' : 'outline'} onClick={() => setLayout('list')}>
            <List className="w-5 h-5 mr-2" />
            List
          </Button>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'grid gap-8',
              layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
            )}
          >
            {loading 
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-[520px] w-full rounded-3xl" />
                ))
              : models.map((model) => <ModelCard key={model.id} model={model} />)
            }
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-24">
          <Button size="lg" className="px-12 py-8 text-xl shadow-2xl backdrop-blur-xl">
            Load More Models
          </Button>
        </div>
      </div>
    </div>
  )
}