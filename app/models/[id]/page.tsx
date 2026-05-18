'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star,
  Zap,
  TrendingUp,
  Download,
  Clock,
  CheckCircle2,
  Copy,
  Play,
  Code2,
  BookOpen,
  MessageSquare,
  Activity,
  Shield,
  Globe,
  Cpu,
  ArrowLeft,
  ExternalLink,
  Heart,
  Share2,
  AlertCircle,
} from 'lucide-react'

import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { GlowCard, GlowButton } from '@/components/ui/glow-card'
import { AnimatedContainer } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { GradientText } from '@/components/ui/gradient-text'

import { fetchJson } from '@/lib/api-client'

type RouteParams = { id: string }


type Review = {
  id: string
  user: { id: string; username: string | null }
  rating: number
  title: string
  content: string
  helpful: number
  createdAt: string
}

type ModelResponse = {
  id: string
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  version: string
  ipfsHash: string | null
  inferenceEndpoint: string | null
  thumbnail: string | null
  price: number
  currency: string
  downloads: number
  rating: number
  reviewCount: number
  visibility: string
  featured: boolean
  deletedAt?: string | null
  createdAt: string
  updatedAt: string
  creator: {
    id: string
    username: string | null
    email: string | null
    walletAddress: string | null
  }
  reviews?: Review[]
}

const codeExamples = {
  curl: `curl -X POST http://localhost:3000/api/inference \\
  -H "Content-Type: application/json" \\
  -d '{
    "modelId": "{modelId}",
    "input": "Your prompt here"
  }'`,
  python: `import requests

response = requests.post(
  "http://localhost:3000/api/inference",
  headers={"Content-Type": "application/json"},
  json={"modelId": "{modelId}", "input": "Your prompt here"}
)

print(response.json())`,
  javascript: `const res = await fetch(
  'http://localhost:3000/api/inference',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ modelId: '{modelId}', input: 'Your prompt here' }),
  }
)

console.log(await res.json())`,
}

export default function ModelDetailPage({ params }: { params: RouteParams }) {
  const { id } = (params as any as { id: string }) ?? ({} as any)

  // NOTE: your original route uses `use(params)`; keeping this page minimal + compiling.
  // Next.js will pass `params` as an object; if your runtime differs, this can be adjusted.
  const [model, setModel] = useState<ModelResponse | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])

  const [activeCodeTab, setActiveCodeTab] = useState<keyof typeof codeExamples>('curl')
  const [playgroundInput, setPlaygroundInput] = useState('')
  const [playgroundOutput, setPlaygroundOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let mounted = true
    ;(async () => {
      try {
        setError(null)
        const res = await fetchJson(`/api/models/${id}`)
        if (!mounted) return
        setModel(res.model)
        setReviews(res.model.reviews ?? [])
      } catch (e: any) {
        if (!mounted) return
        setError(e?.message || 'Failed to load model')
      }
    })()
    return () => {
      mounted = false
    }
  }, [id])

  const pricing = useMemo(() => {
    if (!model) return null
    const isFree = model.price === 0
    return {
      isFree,
      price: model.price,
      currency: model.currency,
      label: isFree ? 'Free' : `${model.price} ${model.currency}`,
    }
  }, [model])

  const handleGenerate = async () => {
    if (!playgroundInput.trim()) return
    if (!model?.id) return

    setIsGenerating(true)
    setPlaygroundOutput('')
    setError(null)

    try {
      const result = await fetchJson('/api/inference', {
        method: 'POST',
        body: JSON.stringify({ modelId: model.id, input: playgroundInput }),
      })
      setPlaygroundOutput(result?.output ?? '')
    } catch (e: any) {
      setError(e?.message || 'Inference failed')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  if (!model) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 text-center text-muted-foreground">
          {error ? `Error: ${error}` : 'Loading model…'}
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer delay={0}>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Link>
          </AnimatedContainer>

          <div className="grid lg:grid-cols-3 gap-8">
            <AnimatedContainer delay={0.1} className="lg:col-span-2">
              <div className="flex flex-wrap items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Zap className="w-10 h-10 text-primary" />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{model.title}</h1>
                    {model.featured && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary" />
                      <span>{model.creator.username || model.creator.walletAddress || 'Creator'}</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{model.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {model.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{model.description}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{model.rating}</span>
                  <span className="text-muted-foreground">({model.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">{model.downloads}</span>
                  <span className="text-muted-foreground">downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">—</span>
                  <span className="text-muted-foreground">API calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">—</span>
                  <span className="text-muted-foreground">avg latency</span>
                </div>
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <GlowCard className="p-6 sticky top-24" glowColor="blue">
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                  {pricing?.isFree ? (
                    <GradientText variant="blue-cyan" className="text-3xl font-bold">
                      Free
                    </GradientText>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono">{pricing?.price}</span>
                      <span className="text-lg text-muted-foreground">{pricing?.currency}</span>
                    </div>
                  )}
                  <Badge variant="outline" className="mt-2 capitalize">
                    {pricing?.isFree ? 'free' : 'pay per use'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <GlowButton className="w-full" size="lg" onClick={() => {}}>
                    <Zap className="w-5 h-5 mr-2" />
                    Deploy Model
                  </GlowButton>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full" onClick={() => setIsFavorited(!isFavorited)}>
                      <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorited ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Uptime
                    </span>
                    <span className="font-semibold text-green-500">—</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Regions
                    </span>
                    <span className="font-semibold">—</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      GPU Type
                    </span>
                    <span className="font-semibold">—</span>
                  </div>
                </div>
              </GlowCard>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="playground" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="playground" className="gap-2">
                <Play className="w-4 h-4" />
                Playground
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2">
                <Code2 className="w-4 h-4" />
                API
              </TabsTrigger>
              <TabsTrigger value="docs" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playground">
              <div className="grid lg:grid-cols-2 gap-6">
                <GlowCard className="p-6" glowColor="blue">
                  {error && (
                    <div className="mb-4 flex items-start gap-2 text-sm text-red-500">
                      <AlertCircle className="w-4 h-4 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Input</h3>
                    <Badge variant="outline">Auth required</Badge>
                  </div>

                  <Textarea
                    value={playgroundInput}
                    onChange={(e) => setPlaygroundInput(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className="min-h-[200px] bg-muted/50 border-border/50 resize-none mb-4"
                  />

                  <GlowButton
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={isGenerating || !playgroundInput.trim()}
                  >
                    {isGenerating ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Activity className="w-5 h-5 mr-2 inline" />
                      </motion.span>
                    ) : (
                      <Play className="w-5 h-5 mr-2 inline" />
                    )}
                    {isGenerating ? 'Generating…' : 'Run Inference'}
                  </GlowButton>
                </GlowCard>

                <GlowCard className="p-6" glowColor="cyan">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Output</h3>
                    {playgroundOutput && (
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(playgroundOutput)}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    )}
                  </div>

                  <div className="min-h-[200px] bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap overflow-auto">
                    {playgroundOutput || <span className="text-muted-foreground">Output will appear here…</span>}
                    {isGenerating && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-primary ml-1"
                      />
                    )}
                  </div>
                </GlowCard>
              </div>
            </TabsContent>

            <TabsContent value="api">
              <GlowCard className="p-6" glowColor="purple">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">API Integration</h3>
                  <div className="flex gap-2">
                    {Object.keys(codeExamples).map((lang) => (
                      <Button
                        key={lang}
                        variant={activeCodeTab === lang ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveCodeTab(lang as keyof typeof codeExamples)}
                        className="capitalize"
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="text-muted-foreground">
                      {codeExamples[activeCodeTab].replace('{modelId}', model.id)}
                    </code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(codeExamples[activeCodeTab].replace('{modelId}', model.id))
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Auth required</h4>
                      <p className="text-sm text-muted-foreground">Inference endpoint logs usage and requires a signed-in user.</p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </TabsContent>

            <TabsContent value="docs">
              <GlowCard className="p-6" glowColor="cyan">
                <h3 className="text-lg font-semibold mb-6">Model Documentation</h3>
                <div className="text-muted-foreground">This UI will be extended to render on-chain/IPFS metadata for capabilities.</div>
              </GlowCard>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                <GlowCard className="p-6" glowColor="purple">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold font-mono mb-1">{model.rating}</div>
                      <div className="flex gap-0.5 justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(model.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">{model.reviewCount} reviews</div>
                    </div>
                  </div>
                </GlowCard>

                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <div className="text-muted-foreground">No reviews yet.</div>
                  ) : (
                    reviews.map((review) => (
                      <GlowCard key={review.id} className="p-6" glowColor="blue">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                              {(review.user.username || 'U').charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium font-mono">{review.user.username || 'Anonymous'}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.content}</p>
                      </GlowCard>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}

