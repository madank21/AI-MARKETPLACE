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
import { StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { cn } from '@/lib/utils'
import { RobohashAvatar } from '@/components/ui/robohash-avatar' // 👈 ADDED

// COMPLETE 12+ MODELS with ROBOT CREATORS 🤖
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
      <GlowCard 
        className="group h-[540px] hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-3 transition-all duration-700 overflow-hidden relative border border-border/50 hover:border-primary/50" 
        glowColor="cyan" 
        hover
      >
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          {model.verified && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 backdrop-blur-sm shadow-lg px-3 py-1 font-bold">
              ✓ Verified
            </Badge>
          )}
          {model.trending && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-sm shadow-lg px-3 py-1 font-bold">
              🔥 Trending
            </Badge>
          )}
        </div>

        {/* Model Preview Image */}
        <motion.div 
          className="relative h-52 w-full rounded-2xl overflow-hidden mb-6 mt-3 group-hover:scale-[1.03] transition-transform duration-700"
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-white/90 text-black font-bold shadow-lg px-3 py-1 backdrop-blur-sm">
              {model.category}
            </Badge>
          </div>
        </motion.div>

        {/* Creator Section with ROBOHASH 🤖 */}
        <motion.div 
          className="flex items-center gap-3 mb-6 p-3 bg-muted/30 rounded-2xl backdrop-blur-sm border border-border/30"
          whileHover={{ scale: 1.02 }}
        >
          <RobohashAvatar 
            name={model.creator} 
            size={44}
            className="ring-2 ring-white/40 shadow-lg hover:ring-primary/60 transition-all" 
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm truncate">{model.creator}</h4>
            <p className="text-xs text-muted-foreground">AI Creator</p>
          </div>
        </motion.div>

        {/* Model Name */}
        <motion.h3 
          className="font-black text-xl mb-4 line-clamp-2 group-hover:text-primary transition-all duration-500"
          whileHover={{ y: -2 }}
        >
          {model.name}
        </motion.h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {model.tags.slice(0, 3).map((tag, i) => (
            <Badge 
              key={i} 
              variant="outline" 
              className="text-xs backdrop-blur-sm border-primary/30 hover:bg-primary/10 px-2.5 py-1 transition-all" 
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-8 gap-4 pt-2">
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl backdrop-blur-sm border border-yellow-500/20">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
            <span className="font-black text-lg text-yellow-400">{model.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <Download className="w-4 h-4" />
            {model.downloads.toLocaleString()}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          {model.price === 0 ? (
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl px-6 py-3 font-black text-lg">
              FREE
            </Badge>
          ) : (
            <div className="text-3xl font-black bg-gradient-to-r from-primary via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
              ${model.price}
            </div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              className="px-8 py-2.5 font-bold shadow-2xl hover:shadow-emerald-500/30 backdrop-blur-xl border-2 border-emerald-500/50 hover:border-emerald-500/80"
            >
              Try Now
            </Button>
          </motion.div>
        </div>
      </GlowCard>
    </Link>
  )
}

export default function ExplorePage() {
  const [loading, setLoading] = useState(true)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900/90 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-6xl mx-auto px-4"
        >
          <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-emerald-500/90 to-green-600/90 backdrop-blur-xl shadow-2xl mb-8 font-bold tracking-wide">
            🚀 15,247+ Models • 2,450+ Creators
          </Badge>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400 leading-tight"
          >
            Explore the <GradientText variant="purple-pink" className="inline-block text-7xl md:text-8xl lg:text-9xl">AI Universe</GradientText>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed"
          >
            Discover cutting-edge AI models for image generation, code, text, and beyond. 
            Built by the world's top robotic creators 🤖
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-muted-foreground group-focus-within:text-primary transition-all" />
              <input
                type="text"
                placeholder="🔍 Search 15K+ AI models, creators, categories..."
                className="w-full pl-20 pr-8 py-6 bg-white/5 backdrop-blur-2xl border-2 border-white/10 rounded-3xl text-xl font-semibold shadow-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all duration-500 placeholder:text-muted-foreground hover:border-white/20 hover:shadow-xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Filters & Layout Toggle */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-32">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 justify-center lg:justify-start mb-16"
        >
          {['All', 'Image', 'Code', 'Text', 'Trending', 'Free'].map((filter, i) => (
            <motion.div
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={activeFilter === filter.toLowerCase() ? 'default' : 'outline'}
                className={cn(
                  'backdrop-blur-xl shadow-xl border-2 font-bold px-6 py-3 transition-all duration-300',
                  activeFilter === filter.toLowerCase()
                    ? 'bg-gradient-to-r from-primary to-secondary shadow-primary/25 hover:shadow-primary/40'
                    : 'hover:bg-white/10 hover:border-primary/50 hover:shadow-primary/20'
                )}
                onClick={() => setActiveFilter(filter.toLowerCase())}
              >
                {filter}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Layout Toggle */}
        <div className="flex justify-center lg:justify-end mb-16 gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={layout === 'grid' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setLayout('grid')}
              className="backdrop-blur-xl shadow-xl px-8 font-bold"
            >
              <Grid className="w-5 h-5 mr-2" />
              Grid
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={layout === 'list' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setLayout('list')}
              className="backdrop-blur-xl shadow-xl px-8 font-bold"
            >
              <List className="w-5 h-5 mr-2" />
              List
            </Button>
          </motion.div>
        </div>

        {/* Models Grid */}
        <AnimatePresence mode="wait">
          <StaggerContainer
            key={`${layout}-${loading}`}
            className={cn(
              'gap-8',
              layout === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            )}
            staggerDelay={0.08}
          >
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <StaggerItem key={`skeleton-${i}`}>
                    <div className="space-y-4 animate-pulse">
                      <Skeleton className="h-52 w-full rounded-2xl" />
                      <div className="space-y-3">
                        <Skeleton className="h-8 w-4/5" />
                        <Skeleton className="h-5 w-3/5" />
                        <div className="flex gap-2">
                          <Skeleton className="h-10 w-20" />
                          <Skeleton className="h-10 w-24" />
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))
              : models.map((model, index) => (
                  <StaggerItem key={`${model.id}-${index}`}>
                    <ModelCard model={model} />
                  </StaggerItem>
                ))
            }
          </StaggerContainer>
        </AnimatePresence>

        {/* Load More CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-32"
        >
          // Replace the Load More button (line with size="xl"):
<Button 
  className="px-16 py-8 text-2xl font-black shadow-2xl backdrop-blur-2xl border-2 border-primary/50 hover:shadow-primary/40 hover:border-primary/80 hover:scale-105 transition-all duration-500 group text-lg h-auto"
>
  <span>Discover More Models</span>
  <motion.div 
    className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full ml-4 shrink-0"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
</Button>
        </motion.div>
      </div>
    </div>
  )
}