'use client'

import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { RobohashAvatar } from '@/components/ui/robohash-avatar'
import { mockCreators } from '@/lib/mock-data'
import { Star, CheckCircle2, Users, Coins, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function CreatorsSection() {
  const topCreators = mockCreators.filter(c => c.verified).slice(0, 4)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-background/80 to-black/20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-ping [animation-delay:0s]" />
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-secondary/30 rounded-full animate-ping [animation-delay:1s]" />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-accent/30 rounded-full animate-ping [animation-delay:2s]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContainer className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 backdrop-blur-xl mb-8 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring' }}
          >
            <Users className="w-5 h-5 text-primary drop-shadow-sm" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Top Creators
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet the{' '}
            <GradientText variant="purple-pink" className="inline-block">
              Innovators
            </GradientText>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover the brilliant robotic minds building the future of AI 🤖
          </motion.p>
        </AnimatedContainer>

        {/* Creators Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.12}>
          {topCreators.map((creator, index) => (
            <StaggerItem key={creator.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
              >
                <Link href={`/creators/${creator.id}`} className="block h-full">
                  <GlowCard
                    className="h-full p-8 text-center group cursor-pointer relative overflow-hidden shadow-2xl hover:shadow-glow hover:shadow-purple-500/30 border border-border/50 hover:border-primary/50 transition-all duration-500 backdrop-blur-sm"
                    glowColor={index % 4 === 0 ? 'purple' : index % 4 === 1 ? 'cyan' : index % 4 === 2 ? 'pink' : 'emerald'}
                    hover
                  >
                    {/* Animated particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute top-4 left-4 w-2 h-2 bg-primary/60 rounded-full animate-ping" />
                      <div className="absolute bottom-8 right-4 w-3 h-3 bg-secondary/60 rounded-full animate-ping [animation-delay:0.2s]" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent/60 rounded-full animate-ping [animation-delay:0.4s]" />
                    </div>

                    {/* Robohash Avatar */}
                    <div className="relative w-28 h-28 mx-auto mb-8 flex-shrink-0">
                      <RobohashAvatar 
                        name={creator.name} 
                        size={112}
                        className="shadow-2xl ring-4 ring-white/30 hover:ring-primary/50 transition-all duration-500 mx-auto"
                      />
                      
                      {creator.verified && (
                        <motion.div 
                          className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl border-4 border-background group-hover:scale-110"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ type: 'spring' }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-background drop-shadow-lg" />
                        </motion.div>
                      )}
                    </div>

                    {/* Name */}
                    <motion.h3 
                      className="font-black text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary group-hover:from-primary group-hover:to-accent transition-all duration-700 line-clamp-2"
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      {creator.name}
                    </motion.h3>

                    {/* Rating & Followers */}
                    <motion.div 
                      className="flex items-center justify-center gap-3 mb-8 p-3 bg-secondary/20 rounded-2xl backdrop-blur-sm border border-secondary/30"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                        <span className="text-lg font-black text-yellow-400">{creator.rating}</span>
                      </div>
                      <div className="w-px h-6 bg-muted-foreground/50" />
                      <span className="text-sm font-bold text-muted-foreground">
                        {creator.followers.toLocaleString()} followers
                      </span>
                    </motion.div>

                    {/* Enhanced Stats */}
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/30">
                      <motion.div 
                        className="group/stats p-4 rounded-xl bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <div className="text-2xl font-black font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {creator.totalModels}
                          </div>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Models</div>
                      </motion.div>

                      <motion.div 
                        className="group/stats p-4 rounded-xl bg-gradient-to-b from-secondary/5 to-transparent backdrop-blur-sm border border-secondary/20 hover:bg-secondary/10 transition-all"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <TrendingUp className="w-5 h-5 text-secondary" />
                          </div>
                          <div className="text-2xl font-black font-mono bg-gradient-to-r from-secondary to-yellow-500 bg-clip-text text-transparent">
                            {creator.totalEarnings}
                          </div>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Earned</div>
                      </motion.div>
                    </div>

                    {/* Hover glow overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-2xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </GlowCard>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}