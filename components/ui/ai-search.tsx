'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Clock, TrendingUp, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const suggestions = [
  'Image Generation Models',
  'Trending AI Agents',
  'Code Assistants',
  'Blockchain AI',
  'Text-to-Video',
  'Open Source Models',
]

const recentSearches = [
  'Nova AI Pro',
  'Quantum Code',
  'DreamScape',
]

interface AISearchProps {
  open: boolean
  onClose: () => void
}

export function AISearch({ open, onClose }: AISearchProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-3xl px-4"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(168,85,247,0.25)]">
              
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10" />

              {/* Header */}
              <div className="relative flex items-center gap-4 border-b border-white/10 p-5">
                <Search className="w-6 h-6 text-cyan-400" />

                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search AI models, creators, agents..."
                  className="flex-1 bg-transparent outline-none text-xl font-semibold placeholder:text-muted-foreground"
                />

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                
                {/* Trending */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-pink-400" />
                    <h3 className="font-bold text-lg">Trending Searches</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {suggestions.map((item) => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        key={item}
                        className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Recent */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-lg">Recent Searches</h3>
                  </div>

                  <div className="space-y-3">
                    {recentSearches.map((item) => (
                      <Link key={item} href="/">
                        <motion.div
                          whileHover={{ x: 6 }}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-400/30 transition-all cursor-pointer"
                        >
                          {item}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="rounded-3xl p-5 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-bold text-lg">
                      AI Discovery Assistant
                    </h4>
                  </div>

                  <p className="text-muted-foreground">
                    Search intelligently across decentralized AI models,
                    creators, smart agents, and Web3 tools.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}