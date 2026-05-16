'use client'

import { useState, useRef, useEffect } from 'react'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  mockModels,
  categoryLabels,
  categoryIcons,
  type ModelCategory,
  type AIModel,
} from '@/lib/mock-data'
import {
  Search, Grid3X3, List, TrendingUp, Star, Clock,
  DollarSign, X, CheckCircle2, Download, Zap,
  ArrowRight, Brain, Cpu, Layers, Filter, ChevronDown,
  Activity, Globe, Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

// ─── types ────────────────────────────────────────────────────────────────────
type SortKey = 'trending' | 'rating' | 'newest' | 'price-low' | 'price-high'
type ViewMode = 'grid' | 'list'

// ─── static data ──────────────────────────────────────────────────────────────
const categories: { value: ModelCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all',              label: 'All Models',      icon: '⬡' },
  { value: 'text-generation',  label: 'Text Gen',        icon: '📝' },
  { value: 'image-generation', label: 'Image Gen',       icon: '🎨' },
  { value: 'code-generation',  label: 'Code',            icon: '💻' },
  { value: 'audio-generation', label: 'Audio',           icon: '🎵' },
  { value: 'video-generation', label: 'Video',           icon: '🎬' },
  { value: 'multimodal',       label: 'Multimodal',      icon: '🔮' },
  { value: 'embedding',        label: 'Embedding',       icon: '🔢' },
  { value: 'translation',      label: 'Translation',     icon: '🌐' },
]

const sortOptions: { value: SortKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'trending',   label: 'Trending',         icon: TrendingUp  },
  { value: 'rating',     label: 'Highest Rated',    icon: Star        },
  { value: 'newest',     label: 'Newest',           icon: Clock       },
  { value: 'price-low',  label: 'Price: Low→High',  icon: DollarSign  },
  { value: 'price-high', label: 'Price: High→Low',  icon: DollarSign  },
]

const priceFilters = [
  { value: 'all',  label: 'All Prices' },
  { value: 'free', label: 'Free'       },
  { value: 'paid', label: 'Paid'       },
]

// ─── helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

// ─── card accent palette ──────────────────────────────────────────────────────
const CARD_ACCENTS = [
  { glow: 'oklch(0.7 0.2 250)',   border: 'oklch(0.7 0.2 250 / 0.25)',   grad: 'from-[oklch(0.7_0.2_250/0.12)] to-transparent'   },
  { glow: 'oklch(0.6 0.25 300)',  border: 'oklch(0.6 0.25 300 / 0.25)',  grad: 'from-[oklch(0.6_0.25_300/0.12)] to-transparent'  },
  { glow: 'oklch(0.75 0.15 195)', border: 'oklch(0.75 0.15 195 / 0.25)', grad: 'from-[oklch(0.75_0.15_195/0.12)] to-transparent' },
  { glow: 'oklch(0.7 0.25 330)',  border: 'oklch(0.7 0.25 330 / 0.25)',  grad: 'from-[oklch(0.7_0.25_330/0.12)] to-transparent'  },
  { glow: 'oklch(0.7 0.2 150)',   border: 'oklch(0.7 0.2 150 / 0.25)',   grad: 'from-[oklch(0.7_0.2_150/0.12)] to-transparent'   },
]

const CATEGORY_EMOJI: Record<string, string> = {
  'text-generation':  '✦', 'image-generation': '◈', 'code-generation':  '⎇',
  'audio-generation': '◎', 'video-generation': '▣', 'multimodal':       '⬡',
  'embedding':        '∷', 'translation':      '⟐', 'summarization':    '≡',
  'classification':   'λ',
}

// ─── Model grid card ──────────────────────────────────────────────────────────
function ModelGridCard({ model, idx }: { model: AIModel; idx: number }) {
  const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length]
  const emoji  = CATEGORY_EMOJI[model.category] ?? '◈'
  const isFree = model.pricing.type === 'free'

  return (
    <Link href={`/models/${model.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="group relative rounded-2xl overflow-hidden h-full cursor-pointer"
        style={{
          background: 'oklch(0.1 0.018 270 / 0.85)',
          border: `1px solid ${accent.border}`,
          boxShadow: `0 0 0 0 ${accent.glow}`,
          transition: 'box-shadow 0.3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 30px ${accent.glow}33, 0 20px 60px rgba(0,0,0,0.5)`)}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${accent.glow}`)}
      >
        {/* Gradient border sweep on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent.glow}18, transparent 60%)` }} />

        {/* Header visual area */}
        <div className="relative h-44 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accent.glow}22 0%, oklch(0.08 0.02 270) 100%)`,
            borderBottom: `1px solid ${accent.border}`,
          }}
        >
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${idx}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${idx})`} style={{ color: accent.glow }} />
          </svg>

          {/* Central glyph */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-7xl select-none"
              style={{ filter: `drop-shadow(0 0 20px ${accent.glow}80)` }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {emoji}
            </motion.div>
          </div>

          {/* Glow orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 rounded-full blur-3xl opacity-30"
              style={{ background: accent.glow }} />
          </div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {model.verified && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full"
                style={{ background: 'oklch(0.5 0.2 150 / 0.2)', color: 'oklch(0.75 0.2 150)', border: '1px solid oklch(0.5 0.2 150 / 0.35)' }}>
                <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
              </span>
            )}
            {model.trending && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-full"
                style={{ background: 'oklch(0.65 0.25 30 / 0.2)', color: 'oklch(0.8 0.2 30)', border: '1px solid oklch(0.65 0.25 30 / 0.35)' }}>
                🔥 TRENDING
              </span>
            )}
          </div>

          {/* Price tag */}
          <div className="absolute top-3 right-3">
            <span className="text-[11px] font-black px-2.5 py-1 rounded-full"
              style={isFree ? {
                background: 'oklch(0.5 0.2 150 / 0.15)', color: 'oklch(0.75 0.2 150)', border: '1px solid oklch(0.5 0.2 150 / 0.3)',
              } : {
                background: `${accent.glow}20`, color: accent.glow, border: `1px solid ${accent.glow}40`,
              }}>
              {isFree ? 'FREE' : `${model.pricing.price} ${model.pricing.currency}`}
            </span>
          </div>

          {/* Category chip */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
              style={{ background: 'oklch(0.08 0.015 270 / 0.8)', color: 'oklch(0.55 0.03 270)', border: '1px solid oklch(0.2 0.03 270)' }}>
              {categoryLabels[model.category]}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-3">
          {/* Creator */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${accent.glow}, oklch(0.6 0.25 300))` }} />
            <span className="text-xs font-medium" style={{ color: 'oklch(0.55 0.03 270)' }}>{model.creator.name}</span>
            {model.creator.verified && <CheckCircle2 className="w-3 h-3" style={{ color: accent.glow }} />}
          </div>

          {/* Name */}
          <h3 className="font-black text-base leading-tight text-white group-hover:opacity-80 transition-opacity line-clamp-1"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {model.name}
          </h3>

          {/* Description */}
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'oklch(0.5 0.03 270)' }}>
            {model.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {model.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'oklch(0.15 0.02 270)', color: 'oklch(0.5 0.03 270)', border: '1px solid oklch(0.22 0.03 270)' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'oklch(0.18 0.02 270)' }}>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'oklch(0.65 0.15 80)', fontFamily: "'Space Mono', monospace" }}>
              <Star className="w-3 h-3" style={{ fill: 'oklch(0.75 0.2 80)', color: 'oklch(0.75 0.2 80)' }} />
              {model.stats.rating}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'oklch(0.45 0.03 270)', fontFamily: "'Space Mono', monospace" }}>
              <Download className="w-3 h-3" />
              {fmt(model.stats.downloads)}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'oklch(0.45 0.03 270)', fontFamily: "'Space Mono', monospace" }}>
              <Activity className="w-3 h-3" />
              {model.stats.avgLatency}ms
            </span>
            <span className="ml-auto flex items-center gap-1 text-xs" style={{ color: 'oklch(0.45 0.03 270)', fontFamily: "'Space Mono', monospace" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {model.stats.uptime}%
            </span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${accent.glow}25, ${accent.glow}10)`,
                border: `1px solid ${accent.glow}40`,
                color: accent.glow,
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              Deploy Now
            </button>
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-[1.05]"
              style={{ background: 'oklch(0.14 0.02 270)', border: '1px solid oklch(0.22 0.03 270)' }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: 'oklch(0.5 0.03 270)' }} />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// ─── Model list row ───────────────────────────────────────────────────────────
function ModelListRow({ model, idx }: { model: AIModel; idx: number }) {
  const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length]
  const isFree = model.pricing.type === 'free'
  const emoji  = CATEGORY_EMOJI[model.category] ?? '◈'

  return (
    <Link href={`/models/${model.id}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ x: 4 }}
        className="group flex items-center gap-5 px-5 py-4 rounded-2xl cursor-pointer transition-all"
        style={{
          background: 'oklch(0.1 0.018 270 / 0.7)',
          border: `1px solid oklch(0.18 0.025 270)`,
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = accent.border, e.currentTarget.style.background = `oklch(0.12 0.018 270 / 0.9)`)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'oklch(0.18 0.025 270)', e.currentTarget.style.background = 'oklch(0.1 0.018 270 / 0.7)')}
      >
        {/* Glyph */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
          style={{ background: `${accent.glow}18`, border: `1px solid ${accent.border}`, filter: `drop-shadow(0 0 8px ${accent.glow}40)` }}>
          {emoji}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-sm text-white truncate">{model.name}</h3>
            {model.verified && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'oklch(0.7 0.2 150)' }} />}
            {model.trending && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: 'oklch(0.65 0.25 30 / 0.15)', color: 'oklch(0.8 0.2 30)', border: '1px solid oklch(0.65 0.25 30 / 0.3)' }}>🔥</span>}
          </div>
          <p className="text-xs truncate" style={{ color: 'oklch(0.45 0.03 270)' }}>{model.shortDescription}</p>
        </div>

        {/* Category */}
        <span className="hidden sm:block text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0"
          style={{ background: 'oklch(0.14 0.02 270)', color: 'oklch(0.5 0.03 270)', border: '1px solid oklch(0.2 0.025 270)' }}>
          {categoryLabels[model.category]}
        </span>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <span className="flex items-center gap-1 text-xs" style={{ fontFamily: "'Space Mono', monospace", color: 'oklch(0.65 0.15 80)' }}>
            <Star className="w-3 h-3" style={{ fill: 'oklch(0.75 0.2 80)', color: 'oklch(0.75 0.2 80)' }} />{model.stats.rating}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ fontFamily: "'Space Mono', monospace", color: 'oklch(0.45 0.03 270)' }}>
            <Download className="w-3 h-3" />{fmt(model.stats.downloads)}
          </span>
          <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace", color: 'oklch(0.45 0.03 270)' }}>
            {model.stats.avgLatency}ms
          </span>
        </div>

        {/* Price */}
        <span className="text-sm font-black flex-shrink-0" style={{ fontFamily: "'Space Mono', monospace", color: isFree ? 'oklch(0.75 0.2 150)' : accent.glow }}>
          {isFree ? 'FREE' : `${model.pricing.price} ${model.pricing.currency}`}
        </span>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent.glow }} />
      </motion.div>
    </Link>
  )
}

// ─── Category pill ────────────────────────────────────────────────────────────
function CategoryPill({
  cat, active, onClick,
}: { cat: typeof categories[0]; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all"
      style={active ? {
        background: 'linear-gradient(135deg, oklch(0.7 0.2 250 / 0.2), oklch(0.75 0.15 195 / 0.15))',
        border: '1px solid oklch(0.7 0.2 250 / 0.4)',
        color: 'oklch(0.85 0.1 250)',
        boxShadow: '0 0 16px oklch(0.7 0.2 250 / 0.15)',
      } : {
        background: 'oklch(0.12 0.018 270 / 0.6)',
        border: '1px solid oklch(0.2 0.025 270)',
        color: 'oklch(0.5 0.03 270)',
      }}
    >
      <span>{cat.icon}</span>
      <span className="tracking-wide">{cat.label}</span>
    </motion.button>
  )
}

// ─── Hero particle canvas ─────────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const pts: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.5, a: Math.random(),
    }))
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(80,160,255,${0.12 * (1 - d / 130)})`
            ctx.lineWidth = 0.5; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
          }
        }
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(80,160,255,${pts[i].a * 0.5})`; ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MarketplacePage() {
  const [searchQuery,      setSearchQuery]      = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory | 'all'>('all')
  const [selectedSort,     setSelectedSort]     = useState<SortKey>('trending')
  const [selectedPrice,    setSelectedPrice]    = useState('all')
  const [viewMode,         setViewMode]         = useState<ViewMode>('grid')
  const [showFilters,      setShowFilters]      = useState(false)
  const prefersReduced = useReducedMotion()

  // ── filtering ──
  let filtered = [...mockModels]
  if (searchQuery)
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  if (selectedCategory !== 'all')
    filtered = filtered.filter(m => m.category === selectedCategory)
  if (selectedPrice === 'free')
    filtered = filtered.filter(m => m.pricing.type === 'free')
  else if (selectedPrice === 'paid')
    filtered = filtered.filter(m => m.pricing.type !== 'free')

  filtered.sort((a, b) => {
    switch (selectedSort) {
      case 'trending':   return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      case 'rating':     return b.stats.rating - a.stats.rating
      case 'newest':     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'price-low':  return a.pricing.price - b.pricing.price
      case 'price-high': return b.pricing.price - a.pricing.price
      default:           return 0
    }
  })

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0)

  const clearAll = () => { setSearchQuery(''); setSelectedCategory('all'); setSelectedPrice('all') }

  return (
    <main className="min-h-screen" style={{ background: 'oklch(0.07 0.02 270)' }}>
      <style>{`
        @keyframes gradFlow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes scanPulse { 0%,100%{opacity:0} 50%{opacity:1} }
        .scrollbar-none::-webkit-scrollbar { display:none }
        input::placeholder { color: oklch(0.4 0.03 270); }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <HeroCanvas />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.6 0.2 250 / 0.12), transparent 70%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.55 0.25 300 / 0.08), transparent 60%)',
          }} />
          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.75 0.15 195 / 0.012) 2px, oklch(0.75 0.15 195 / 0.012) 4px)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer className="text-center max-w-4xl mx-auto">

            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
              style={{ background: 'oklch(0.7 0.2 250 / 0.08)', border: '1px solid oklch(0.7 0.2 250 / 0.25)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)' }} />
              <span className="text-xs font-bold tracking-[0.15em]" style={{ color: 'oklch(0.75 0.15 195)', fontFamily: "'Space Mono', monospace" }}>
                LIVE MARKETPLACE · {mockModels.length} MODELS
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-5 leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white">The </span>
              <span style={{
                background: 'linear-gradient(135deg, oklch(0.85 0.05 200) 0%, oklch(0.75 0.2 250) 40%, oklch(0.65 0.25 300) 80%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradFlow 6s linear infinite',
              }}>
                AI Model
              </span>
              <br />
              <span className="text-white">Marketplace</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'oklch(0.5 0.03 270)' }}
            >
              Discover, deploy, and monetize cutting-edge AI models. Built on decentralized compute — owned by creators.
            </motion.p>

            {/* search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'oklch(0.45 0.03 270)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search models, categories, creators…"
                className="w-full pl-14 pr-14 py-4 rounded-2xl text-sm font-medium text-white outline-none transition-all"
                style={{
                  background: 'oklch(0.12 0.025 270 / 0.8)',
                  border: '1px solid oklch(0.25 0.05 270 / 0.6)',
                  backdropFilter: 'blur(16px)',
                  caretColor: 'oklch(0.75 0.15 195)',
                }}
                onFocus={e => (e.target.style.borderColor = 'oklch(0.7 0.2 250 / 0.6)', e.target.style.boxShadow = '0 0 0 3px oklch(0.7 0.2 250 / 0.08), 0 0 30px oklch(0.7 0.2 250 / 0.08)')}
                onBlur={e => (e.target.style.borderColor = 'oklch(0.25 0.05 270 / 0.6)', e.target.style.boxShadow = 'none')}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'oklch(0.2 0.03 270)', color: 'oklch(0.6 0.03 270)' }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>

            {/* quick stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {[
                { label: 'Models', value: '2,847', icon: Brain },
                { label: 'Creators', value: '1,234', icon: Sparkles },
                { label: 'API Calls', value: '15.4M', icon: Zap },
                { label: 'Uptime', value: '99.95%', icon: Globe },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: 'oklch(0.7 0.2 250)' }} />
                  <span className="text-sm font-black" style={{ fontFamily: "'Space Mono', monospace", color: 'oklch(0.85 0.08 250)' }}>{value}</span>
                  <span className="text-xs" style={{ color: 'oklch(0.45 0.03 270)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </AnimatedContainer>
        </div>
      </section>

      {/* ── CATEGORY PILLS ── */}
      <div className="sticky top-[64px] z-30 border-b" style={{ background: 'oklch(0.08 0.018 270 / 0.92)', backdropFilter: 'blur(20px)', borderColor: 'oklch(0.18 0.025 270)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-none">
            {categories.map(cat => (
              <CategoryPill key={cat.value} cat={cat} active={selectedCategory === cat.value}
                onClick={() => setSelectedCategory(cat.value as ModelCategory | 'all')} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">

        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">

            {/* Sort */}
            <Select value={selectedSort} onValueChange={v => setSelectedSort(v as SortKey)}>
              <SelectTrigger className="w-[170px] text-xs rounded-xl"
                style={{ background: 'oklch(0.12 0.018 270)', border: '1px solid oklch(0.22 0.03 270)', color: 'oklch(0.7 0.03 270)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: 'oklch(0.1 0.018 270)', border: '1px solid oklch(0.22 0.03 270)' }}>
                {sortOptions.map(o => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    <span className="flex items-center gap-2">
                      <o.icon className="w-3.5 h-3.5" />{o.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price */}
            <Select value={selectedPrice} onValueChange={setSelectedPrice}>
              <SelectTrigger className="w-[130px] text-xs rounded-xl"
                style={{ background: 'oklch(0.12 0.018 270)', border: '1px solid oklch(0.22 0.03 270)', color: 'oklch(0.7 0.03 270)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: 'oklch(0.1 0.018 270)', border: '1px solid oklch(0.22 0.03 270)' }}>
                {priceFilters.map(f => (
                  <SelectItem key={f.value} value={f.value} className="text-xs">{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Active filters */}
            <AnimatePresence>
              {activeFiltersCount > 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2">
                  {searchQuery && (
                    <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                      style={{ background: 'oklch(0.7 0.2 250 / 0.1)', color: 'oklch(0.8 0.15 250)', border: '1px solid oklch(0.7 0.2 250 / 0.25)' }}>
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  <button onClick={clearAll}
                    className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                    style={{ color: 'oklch(0.6 0.25 25)', background: 'oklch(0.6 0.25 25 / 0.1)', border: '1px solid oklch(0.6 0.25 25 / 0.25)' }}>
                    Clear ({activeFiltersCount})
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'oklch(0.4 0.03 270)', fontFamily: "'Space Mono', monospace" }}>
              {filtered.length} results
            </span>
            {/* View toggle */}
            <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid oklch(0.22 0.03 270)' }}>
              {(['grid', 'list'] as const).map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className="w-9 h-9 flex items-center justify-center transition-all"
                  style={viewMode === mode ? {
                    background: 'oklch(0.7 0.2 250 / 0.15)', color: 'oklch(0.8 0.15 250)',
                  } : {
                    background: 'oklch(0.12 0.018 270)', color: 'oklch(0.4 0.03 270)',
                  }}>
                  {mode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Models */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key={`${viewMode}-${selectedCategory}-${selectedSort}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={viewMode === 'grid'
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                : 'flex flex-col gap-3'
              }
            >
              {filtered.map((model, idx) =>
                viewMode === 'grid'
                  ? <ModelGridCard key={model.id} model={model} idx={idx} />
                  : <ModelListRow  key={model.id} model={model} idx={idx} />
              )}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="text-6xl mb-6 opacity-20">⌀</div>
              <h3 className="text-lg font-bold mb-2 text-white">No models found</h3>
              <p className="text-sm mb-6" style={{ color: 'oklch(0.45 0.03 270)' }}>
                Try adjusting your search or filter criteria.
              </p>
              <button onClick={clearAll}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.03]"
                style={{ background: 'oklch(0.7 0.2 250 / 0.12)', color: 'oklch(0.8 0.15 250)', border: '1px solid oklch(0.7 0.2 250 / 0.3)' }}>
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  )
}