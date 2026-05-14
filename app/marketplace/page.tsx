'use client'

import { useState } from 'react'
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
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories: { value: ModelCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'text-generation', label: 'Text Generation' },
  { value: 'image-generation', label: 'Image Generation' },
  { value: 'code-generation', label: 'Code Generation' },
  { value: 'audio-generation', label: 'Audio Generation' },
  { value: 'video-generation', label: 'Video Generation' },
  { value: 'translation', label: 'Translation' },
  { value: 'multimodal', label: 'Multimodal' },
  { value: 'embedding', label: 'Embedding' },
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
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory | 'all'>('all')
  const [selectedSort, setSelectedSort] = useState('trending')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort models
  let filteredModels = [...mockModels]

  // Filter by search
  if (searchQuery) {
    filteredModels = filteredModels.filter(
      model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  // Filter by category
  if (selectedCategory !== 'all') {
    filteredModels = filteredModels.filter(model => model.category === selectedCategory)
  }

  // Filter by price
  if (selectedPrice === 'free') {
    filteredModels = filteredModels.filter(model => model.pricing.type === 'free')
  } else if (selectedPrice === 'paid') {
    filteredModels = filteredModels.filter(model => model.pricing.type !== 'free')
  }

  // Sort
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
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <ParticleField className="opacity-20" particleCount={30} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <GradientText variant="rainbow">AI Model Marketplace</GradientText>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover, deploy, and monetize cutting-edge AI models from creators worldwide.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search models, categories, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-card/50 border-border/50 focus:border-primary"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <Select 
                value={selectedCategory} 
                onValueChange={(value) => setSelectedCategory(value as ModelCategory | 'all')}
              >
                <SelectTrigger className="w-[180px] bg-card/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select 
                value={selectedPrice} 
                onValueChange={setSelectedPrice}
              >
                <SelectTrigger className="w-[140px] bg-card/50">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select 
                value={selectedSort} 
                onValueChange={setSelectedSort}
              >
                <SelectTrigger className="w-[180px] bg-card/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className="w-4 h-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedPrice('all')
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear filters ({activeFiltersCount})
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Results count */}
              <span className="text-sm text-muted-foreground mr-4">
                {filteredModels.length} models
              </span>

              {/* View Toggle */}
              <div className="flex items-center bg-muted/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'all' || selectedPrice !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSearchQuery('')}
                  />
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {categoryLabels[selectedCategory]}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCategory('all')}
                  />
                </Badge>
              )}
              {selectedPrice !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedPrice === 'free' ? 'Free' : 'Paid'}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedPrice('all')}
                  />
                </Badge>
              )}
            </div>
          )}

          {/* Models Grid/List */}
          {filteredModels.length > 0 ? (
            <StaggerContainer 
              className={
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }
              staggerDelay={0.05}
            >
              {filteredModels.map((model) => (
                <StaggerItem key={model.id}>
                  <ModelCard 
                    model={model} 
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <GlowCard className="p-12 text-center" glowColor="blue">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No models found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedPrice('all')
                }}
              >
                Clear all filters
              </Button>
            </GlowCard>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
