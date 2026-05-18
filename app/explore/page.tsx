'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, Download, Star, TrendingUp } from 'lucide-react'

import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { cn } from '@/lib/utils'
import { fetchJson } from '@/lib/api-client'

type SortKey = 'trending' | 'rating' | 'newest' | 'price-low' | 'price-high'

type ModelListItem = {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  price: number
  currency: string
  downloads: number
  rating: number
  reviewCount: number
  featured: boolean
  createdAt: string
  creator: {
    id: string
    username: string | null
    walletAddress: string | null
  }
}

const categoryLabel: Record<string, string> = {
  'text-generation': 'Text',
  'image-generation': 'Image',
  'code-generation': 'Code',
  'audio-generation': 'Audio',
  'video-generation': 'Video',
  'multimodal': 'Multimodal',
  embedding: 'Embeddings',
  translation: 'Translation',
  summarization: 'Summarization',
  classification: 'Classification',
}

function ModelCard({ model }: { model: ModelListItem }) {
  const isFree = model.price === 0
  return (
    <Link href={`/models/${model.id}`} className="block">
      <GlowCard className="h-[540px] p-6" glowColor="cyan">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit">
              {categoryLabel[model.category] || model.category}
            </Badge>

            <div className="mt-3 flex items-center gap-2">
              {model.featured && (
                <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                  <TrendingUp className="w-3 h-3 mr-1" /> Trending
                </Badge>
              )}
            </div>
          </div>
        </div>

        <h3 className="mt-5 font-black text-xl leading-tight line-clamp-2">{model.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{model.description}</p>

        <div className="mt-5 flex flex-wrap gap-1">
          {model.tags?.slice(0, 3).map((t) => (
            <Badge key={t} variant="outline" className="bg-muted/50">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {model.rating}
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <Download className="w-4 h-4" /> {model.downloads.toLocaleString()}
          </span>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="text-2xl font-black">
            {isFree ? 'Free' : `${model.price} ${model.currency}`}
          </div>
          <Button variant="secondary" size="lg">
            View
          </Button>
        </div>
      </GlowCard>
    </Link>
  )
}

export default function ExplorePage() {

  const [loading, setLoading] = useState(true)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sort, setSort] = useState<SortKey>('trending')
  const [models, setModels] = useState<ModelListItem[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', '1')
        params.set('limit', '12')
        if (query.trim()) params.set('search', query.trim())
        if (sort === 'trending') params.set('featured', 'true')

        const res = await fetchJson(`/api/models?${params.toString()}`)
        if (!mounted) return
        setModels(res.models ?? [])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [query, sort])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900/90 relative overflow-hidden">
      <Navbar />

      <section className="pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-6xl mx-auto px-4"
        >
          <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-emerald-500/90 to-green-600/90 backdrop-blur-xl shadow-2xl mb-8 font-bold tracking-wide">
            Explore Live Models
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400 leading-tight"
          >
            Explore the{' '}
            <GradientText variant="purple-pink" className="inline-block text-7xl md:text-8xl lg:text-9xl">
              AI Universe
            </GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed"
          >
            Discover creator-published AI models from your Neon + Prisma database.
          </motion.p>

          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-muted-foreground group-focus-within:text-primary transition-all" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, creators, tags…"
                className="w-full pl-20 pr-6 py-6 bg-white/5 backdrop-blur-2xl border-2 border-white/10 rounded-3xl text-lg font-semibold shadow-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all duration-500 placeholder:text-muted-foreground hover:border-white/20 hover:shadow-xl"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {([
                ['trending', 'Trending'],
                ['newest', 'Newest'],
                ['rating', 'Highest Rated'],
              ] as const).map(([k, label]) => (
                <Button
                  key={k}
                  variant={sort === k ? 'default' : 'outline'}
                  onClick={() => setSort(k)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-32">
        <div className="flex justify-center lg:justify-end mb-10 gap-3">
          <Button variant={layout === 'grid' ? 'default' : 'outline'} size="lg" onClick={() => setLayout('grid')}>
            <Grid className="w-5 h-5 mr-2" /> Grid
          </Button>
          <Button variant={layout === 'list' ? 'default' : 'outline'} size="lg" onClick={() => setLayout('list')}>
            <List className="w-5 h-5 mr-2" /> List
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <StaggerContainer
            key={`${layout}-${loading}-${query}-${sort}`}
            className={cn(
              'grid gap-8 w-full',
              layout === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            )}
            staggerDelay={0.06}
          >
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <StaggerItem key={`sk-${i}`}>
                    <Skeleton className="h-[540px] w-full rounded-2xl" />
                  </StaggerItem>
                ))
              : models.map((m) => (
                  <StaggerItem key={m.id}>
                    <ModelCard model={m} />
                  </StaggerItem>
                ))}
          </StaggerContainer>
        </AnimatePresence>

        <div className="text-center mt-16 text-muted-foreground">Showing live data from /api/models</div>
      </div>

      <Footer />
    </div>
  )
}

