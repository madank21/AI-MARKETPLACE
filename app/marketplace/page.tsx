'use client'

import { useState, useEffect, useRef } from 'react'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { ModelCard } from '@/components/ui/model-card'
import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { ParticleField } from '@/components/ui/particle-field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  mockModels, 
  categoryLabels, 
  type ModelCategory 
} from '@/lib/mock-data'
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  TrendingUp,
  Star,
  Clock,
  DollarSign,
  X,
  Zap,
  Brain,
  Image,
  Play,
  Mic,
  Code,
  Globe,
  Layers,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Enhanced model data with preview images
const modelPreviewImages = {
  'gpt-4-vision': '/api/placeholder/400/250',
  'stable-diffusion-xl': '/api/placeholder/400/250',
  'llama-3-70b': '/api/placeholder/400/250',
  'whisper-large-v3': '/api/placeholder/400/250',
  'dall-e-3': '/api/placeholder/400/250',
  'codex-2': '/api/placeholder/400/250',
  'gemini-pro': '/api/placeholder/400/250',
  'clip-vit-large': '/api/placeholder/400/250',
}

const categories: { value: ModelCategory | 'all'; label: string; icon: any }[] = [
  { value: 'all', label: 'All Categories', icon: Layers },
  { value: 'text-generation', label: 'Text Generation', icon: Brain },
  { value: 'image-generation', label: 'Image Generation', icon: Image },
  { value: 'code-generation', label: 'Code Generation', icon: Code },
  { value: 'audio-generation', label: 'Audio Generation', icon: Mic },
  { value: 'video-generation', label: 'Video Generation', icon: Play },
  { value: 'translation', label: 'Translation', icon: Globe },
  { value: 'multimodal', label: 'Multimodal', icon: Layers },
  { value: 'embedding', label: 'Embedding', icon: Zap },
]

const sortOptions = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
  { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
]

const priceFilters = [
  { value: 'all', label: 'All Prices' },
  { value: 'free', label: 'Free', icon: Zap },
  { value: 'paid', label: 'Paid' },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory | 'all'>('all')
  const [selectedSort, setSelectedSort] = useState('trending')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Enhanced filtering and sorting
  let filteredModels = [...mockModels]

  if (searchQuery) {
    filteredModels = filteredModels.filter(
      model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  if (selectedCategory !== 'all') {
    filteredModels = filteredModels.filter(model => model.category === selectedCategory)
  }

  if (selectedPrice === 'free') {
    filteredModels = filteredModels.filter(model => model.pricing.type === 'free')
  } else if (selectedPrice === 'paid') {
    filteredModels = filteredModels.filter(model => model.pricing.type !== 'free')
  }

  filteredModels.sort((a, b) => {
    switch (selectedSort) {
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      case 'rating':
        return b.stats.rating - a.stats.rating
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'price-low':
        return a.pricing.price - b.pricing.price
      case 'price-high':
        return b.pricing.price - a.pricing.price
      default:
        return 0
    }
  })

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (selectedPrice !== 'all' ? 1 : 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900/50 to-slate-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <ParticleField 
        className="absolute inset-0 opacity-30" 
        particleCount={80}
        colors={['#8B5CF6', '#06B6D4', '#FCD34D', '#EF4444', '#10B981']}
      />

      {/* Mouse-following glow */}
      <div 
        className="fixed w-64 h-64 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl z-0 pointer-events-none transition-all duration-500"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      <Navbar />

      {/* Cinematic Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-black/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-8 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-ping" />
              <span className="text-sm font-medium text-emerald-400 tracking-wider uppercase">Live Marketplace</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <GradientText 
                variant="holographic"
                className="bg-gradient-to-r from-white via-purple-400 to-pink-400 bg-clip-text bg-[length:200%_200%] animate-[gradient-move_4s_ease-infinite]"
              >
                AI Model
              </GradientText>
              <span className="block text-4xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text transparent">
                Marketplace
              </GradientText>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm">
              Discover, deploy, and monetize cutting-edge AI models from creators worldwide. 
              <span className="block mt-2 text-blue-400 font-medium animate-pulse">Powered by the future.</span>
            </p>

            {/* Animated Search Bar */}
            <div className="relative max-w-3xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-1000" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-black/50 border border-white/10 rounded-xl p-4 pl-14">
                  <Search className="absolute left-5 w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <Input
                    ref={searchRef}
                    type="text"
                    placeholder="Search 10,000+ AI models, categories, or creators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-xl text-white placeholder-white/60 focus:ring-0 focus-visible:ring-0 h-auto py-4 px-0 flex-1"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 hover:bg-white/10 rounded-xl h-12 w-12 p-0 border-white/20"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Live stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>12,847 Models Live</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>2.4M Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>847 Creators</span>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Cyberpunk Filters & Content */}
      <section className="pb-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Neon Filter Bar */}
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl shadow-black/50">
            <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-6 mb-8">
              <div className="flex flex-wrap items-center gap-4 order-2 lg:order-1">
                {/* Category Filter */}
                <div className="group relative">
                  <Select 
                    value={selectedCategory} 
                    onValueChange={(value) => setSelectedCategory(value as ModelCategory | 'all')}
                  >
                    <SelectTrigger className="w-[200px] bg-black/50 backdrop-blur-sm border-white/20 hover:border-white/40 text-white h-14 px-4 rounded-2xl group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                      <div className="flex items-center gap-3">
                        {categories.find(c => c.value === selectedCategory)?.icon ? 
                          React.createElement(categories.find(c => c.value === selectedCategory)!.icon, { className: 'w-4 h-4' }) : 
                          <Layers className="w-4 h-4" />
                        }
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                  </Select>
                </div>

                {/* Price Filter */}
                <div className="group">
                  <Select 
                    value={selectedPrice} 
                    onValueChange={setSelectedPrice}
                  >
                    <SelectTrigger className="w-[160px] bg-black/50 backdrop-blur-sm border-white/20 hover:border-white/40 text-white h-14 px-4 rounded-2xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>

                {/* Sort */}
                <div className="group">
                  <Select 
                    value={selectedSort} 
                    onValueChange={setSelectedSort}
                  >
                    <SelectTrigger className="w-[200px] bg-black/50 backdrop-blur-sm border-white/20 hover:border-white/40 text-white h-14 px-4 rounded-2xl group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedPrice('all')
                    }}
                    className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border-white/20 hover:border-red-400/50 text-white h-14 px-6 rounded-2xl hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300"
                  >
                    Clear ({activeFiltersCount})
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4 order-1 lg:order-2">
                <span className="text-lg font-medium text-white/80">
                  {filteredModels.length} models found
                </span>
                <div className="flex items-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-12 w-12 mx-1 rounded-xl backdrop-blur-sm border-white/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-12 w-12 mx-1 rounded-xl backdrop-blur-sm border-white/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters - Neon badges */}
          {(selectedCategory !== 'all' || selectedPrice !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <span className="text-lg font-medium text-white/80">Active Filters:</span>
              {searchQuery && (
                <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-white/20 text-white px-4 py-2 rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 gap-2">
                  🔍 {searchQuery.slice(0, 20)}...
                  <X className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border-white/20 text-white px-4 py-2 rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 gap-2">
                  {categories.find(c => c.value === selectedCategory)?.icon ? 
                    React.createElement(categories.find(c => c.value === selectedCategory)!.icon, { className: 'w-4 h-4' }) : null}
                  {categoryLabels[selectedCategory]}
                  <X className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedCategory('all')} />
                </Badge>
              )}
              {selectedPrice !== 'all' && (
                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-white/20 text-white px-4 py-2 rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 gap-2">
                  {selectedPrice === 'free' ? '🆓 Free' : '💎 Premium'}
                  <X className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedPrice('all')} />
                </Badge>
              )}
            </div>
          )}

          {/* Neon Cyberpunk Model Grid */}
          {filteredModels.length > 0 ? (
            <StaggerContainer 
              className={
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                  : 'space-y-6'
              }
              staggerDelay={0.08}
            >
              {filteredModels.map((model, index) => (
                <StaggerItem key={model.id} delay={index * 0.02}>
                  <ModelCard 
                    model={{
                      ...model,
                      previewImage: modelPreviewImages[model.id as keyof typeof modelPreviewImages] || '/api/placeholder/400/250'
                    }}
                    variant={viewMode === 'list' ? 'compact' : 'cyberpunk'}
                    className="group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] hover:shadow-magenta"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <GlowCard className="p-20 text-center max-w-2xl mx-auto backdrop-blur-xl bg-black/40 border-white/10 rounded-3xl shadow-2xl" glowColor="purple">
              <div className="text-8xl mb-8 animate-bounce">🚀</div>
              <h3 className="text-3xl font-black mb-4 text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text transparent">
                No models found
              </h3>
              <p className="text-xl text-white/70 mb-8 backdrop-blur-sm">
                Try adjusting your search or filter criteria to discover amazing AI models.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12 py-8 rounded-2xl font-semibold shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 border-white/20"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedPrice('all')
                }}
              >
                🔮 Explore All Models
              </Button>
            </GlowCard>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}