'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  Grid3X3,
  List,
  Star,
  Clock,
  DollarSign,
  X,
  CheckCircle2,
  Download,
  TrendingUp,
  ArrowRight,
  Zap,
  Activity,
  Filter,
  Globe,
  Cpu,
  Sparkles,
  Brain,
} from 'lucide-react'

import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { GlowCard } from '@/components/ui/glow-card'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { fetchJson } from '@/lib/api-client'

type SortKey = 'trending' | 'rating' | 'newest' | 'price-low' | 'price-high'

type ModelCategory = string

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

const categories: { value: string | 'all'; label: string }[] = [
  { value: 'all', label: 'All Models' },
  { value: 'text-generation', label: 'Text Gen' },
  { value: 'image-generation', label: 'Image Gen' },
  { value: 'code-generation', label: 'Code' },
  { value: 'audio-generation', label: 'Audio' },
  { value: 'video-generation', label: 'Video' },
  { value: 'multimodal', label: 'Multimodal' },
]

const sortOptions: { value: SortKey; label: string; icon: any }[] = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'price-low', label: 'Price: Low→High', icon: DollarSign },
  { value: 'price-high', label: 'Price: High→Low', icon: DollarSign },
]

const priceFilters = [
  { value: 'all', label: 'All Prices' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
]

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function normalizeModelCategory(m: ModelListItem): string {
  return m.category
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all')
  const [selectedSort, setSelectedSort] = useState<SortKey>('newest')
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const [page, setPage] = useState(1)
  const limit = 12

  const [loading, setLoading] = useState(false)
  const [models, setModels] = useState<ModelListItem[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', String(page))
        params.set('limit', String(limit))
        if (selectedCategory !== 'all') params.set('category', selectedCategory)
        if (searchQuery) params.set('search', searchQuery)
        // server only supports featured boolean; we translate “trending” client-side if needed.
        if (selectedSort === 'trending') params.set('featured', 'true')

        const res = await fetchJson(`/api/models?${params.toString()}`)
        if (!mounted) return

        let data: ModelListItem[] = res.models

        // Price filter and sort that aren’t fully supported by the API
        if (selectedPrice === 'free') data = data.filter((m) => m.price === 0)
        if (selectedPrice === 'paid') data = data.filter((m) => m.price !== 0)

        data = data.slice()
        if (selectedSort === 'rating') data.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        if (selectedSort === 'newest') data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        if (selectedSort === 'price-low') data.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        if (selectedSort === 'price-high') data.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))

        setModels(data)
        setTotalPages(res.pagination?.pages ?? 1)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [page, selectedCategory, selectedSort, selectedPrice, searchQuery])

  useEffect(() => {
    setPage(1)
  }, [selectedCategory, selectedSort, selectedPrice, searchQuery])

  const clearAll = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedPrice('all')
    setSelectedSort('newest')
  }

  return (
    <main className="min-h-screen" style={{ background: 'oklch(0.07 0.02 270)' }}>
      <Navbar />

      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.2 250 / 0.12), transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.55 0.25 300 / 0.08), transparent 60%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
              style={{
                background: 'oklch(0.7 0.2 250 / 0.08)',
                border: '1px solid oklch(0.7 0.2 250 / 0.25)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)' }} />
              <span className="text-xs font-bold tracking-[0.15em]" style={{ color: 'oklch(0.75 0.15 195)', fontFamily: "'Space Mono', monospace" }}>
                LIVE MARKETPLACE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-5 leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white">The </span>
              <span
                style={{
                  background:
                    'linear-gradient(135deg, oklch(0.85 0.05 200) 0%, oklch(0.75 0.2 250) 40%, oklch(0.65 0.25 300) 80%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradFlow 6s linear infinite',
                }}
              >
                AI Model
              </span>
              <br />
              <span className="text-white">Marketplace</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'oklch(0.5 0.03 270)' }}
            >
              Discover, deploy, and monetize cutting-edge AI models.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'oklch(0.45 0.03 270)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, categories…"
                className="w-full pl-14 pr-14 py-4 rounded-2xl text-sm font-medium text-white outline-none transition-all"
                style={{
                  background: 'oklch(0.12 0.025 270 / 0.8)',
                  border: '1px solid oklch(0.25 0.05 270 / 0.6)',
                  backdropFilter: 'blur(16px)',
                  caretColor: 'oklch(0.75 0.15 195)',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'oklch(0.2 0.03 270)', color: 'oklch(0.6 0.03 270)' }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          </AnimatedContainer>
        </div>
      </section>

      <div className="sticky top-[64px] z-30 border-b" style={{ background: 'oklch(0.08 0.018 270 / 0.92)', backdropFilter: 'blur(20px)', borderColor: 'oklch(0.18 0.025 270)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all"
                style={
                  selectedCategory === cat.value
                    ? {
                        background: 'linear-gradient(135deg, oklch(0.7 0.2 250 / 0.2), oklch(0.75 0.15 195 / 0.15))',
                        border: '1px solid oklch(0.7 0.2 250 / 0.4)',
                        color: 'oklch(0.85 0.1 250)',
                        boxShadow: '0 0 16px oklch(0.7 0.2 250 / 0.15)',
                      }
                    : {
                        background: 'oklch(0.12 0.018 270 / 0.6)',
                        border: '1px solid oklch(0.2 0.025 270)',
                        color: 'oklch(0.5 0.03 270)',
                      }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedSort} onValueChange={(v) => setSelectedSort(v as SortKey)}>
              <SelectTrigger className="w-[170px] text-xs rounded-xl" style={{ background: 'oklch(0.12 0.018 270)', border: '1px solid oklch(0.22 0.03 270)', color: 'oklch(0.7 0.03 270)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: 'oklch(0.1 0.018 270)', border: '1px solid oklch(0.22 0.03 270)' }}>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    <span className="flex items-center gap-2">
                      <o.icon className="w-3.5 h-3.5" />{o.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPrice} onValueChange={(v) => setSelectedPrice(v as any)}>
              <SelectTrigger className="w-[130px] text-xs rounded-xl" style={{ background: 'oklch(0.12 0.018 270)', border: '1px solid oklch(0.22 0.03 270)', color: 'oklch(0.7 0.03 270)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: 'oklch(0.1 0.018 270)', border: '1px solid oklch(0.22 0.03 270)' }}>
                {priceFilters.map((f) => (
                  <SelectItem key={f.value} value={f.value} className="text-xs">
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              {(selectedCategory !== 'all' || selectedPrice !== 'all' || searchQuery) && (
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'oklch(0.4 0.03 270)', fontFamily: "'Space Mono', monospace" }}>
              {models.length} results
            </span>
            <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid oklch(0.22 0.03 270)' }}>
              {(['grid', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="w-9 h-9 flex items-center justify-center transition-all"
                  style={
                    viewMode === mode
                      ? { background: 'oklch(0.7 0.2 250 / 0.15)', color: 'oklch(0.8 0.15 250)' }
                      : { background: 'oklch(0.12 0.018 270)', color: 'oklch(0.4 0.03 270)' }
                  }
                >
                  {mode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <StaggerContainer
          className={
            viewMode === 'grid'
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
              : 'flex flex-col gap-3'
          }
          staggerDelay={0.05}
        >
          {loading
            ? Array.from({ length: limit }).map((_, i) => (
                <StaggerItem key={i}>
<GlowCard className="h-72" glowColor="cyan"><div /></GlowCard>
                </StaggerItem>
              ))
            : models.map((m) => (
                <StaggerItem key={m.id}>
                  <Link href={`/models/${m.id}`}>
                    <GlowCard
                      className={cn('p-5 h-full', 'hover:shadow-lg transition-shadow')}
                      glowColor="blue"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-black truncate">{m.title}</h3>
                        {m.featured && (
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{m.description}</p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {m.tags?.slice(0, 3).map((t) => (
                          <Badge key={t} variant="outline" className="bg-muted/50">
                            {t}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {m.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" /> {fmt(m.downloads)}
                        </span>
                        <span className="ml-auto font-bold">
                          {m.price === 0 ? 'Free' : `${m.price} ${m.currency}`}
                        </span>
                      </div>

                      <div className="mt-3 text-xs text-muted-foreground">
                        Creator: {m.creator.username || m.creator.walletAddress || 'Unknown'}
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                        <ArrowRight className="w-4 h-4" /> View
                      </div>
                    </GlowCard>
                  </Link>
                </StaggerItem>
              ))}
        </StaggerContainer>

        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <div className="text-sm text-muted-foreground">Page {page} / {totalPages}</div>
          <Button
            variant="outline"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  )
}

