'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Sliders, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterProps {
  onSearch?: (query: string) => void
  onFilterChange?: (filters: Record<string, unknown>) => void
}

export function MarketplaceFilters({ onSearch, onFilterChange }: FilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1])
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const categories = [
    'Language Models',
    'Computer Vision',
    'Audio/Speech',
    'Time Series',
    'Embeddings',
    'Image Generation',
    'Sentiment Analysis',
    'Object Detection',
  ]

  const tags = [
    'Trending',
    'Free',
    'Open Source',
    'Verified Creator',
    'Recommended',
    'Production Ready',
  ]

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  const handleFilterChange = () => {
    const filters = {
      search: searchQuery,
      category,
      priceRange,
      sortBy,
      tags: selectedTags,
    }
    onFilterChange?.(filters)
  }

  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(updated)
  }

  const activeFilters = [category, ...selectedTags].filter(Boolean).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search AI models..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
      </div>

      {/* Sort & Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(activeFilters > 0 && 'border-primary')}
        >
          <Sliders className="w-4 h-4 mr-2" />
          Filters
          {activeFilters > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilters}
            </Badge>
          )}
        </Button>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card rounded-lg border border-border/50 p-6 space-y-6"
        >
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold mb-3">Price Range</label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                className="w-20"
              />
              <span>to</span>
              <Input
                type="number"
                min={0}
                max={10}
                step={0.01}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                className="w-20"
              />
              <span className="text-muted-foreground">ETH</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-3">Features</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium transition-all',
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border/50 text-muted-foreground hover:border-primary'
                  )}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="flex gap-2 pt-4 border-t border-border/50">
            <Button
              onClick={handleFilterChange}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCategory('')
                setSelectedTags([])
                setPriceRange([0, 1])
              }}
            >
              Reset
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
