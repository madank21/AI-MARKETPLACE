'use client'

import { use, useState } from 'react'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { GlowCard, GlowButton } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { mockModels, categoryLabels } from '@/lib/mock-data'
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
import Link from 'next/link'
import { motion } from 'framer-motion'

// Code examples for different languages
const codeExamples = {
  curl: `curl -X POST https://api.nexusai.io/v1/models/{modelId}/inference \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "Your prompt here",
    "parameters": {
      "max_tokens": 1024,
      "temperature": 0.7
    }
  }'`,
  python: `import requests

response = requests.post(
    "https://api.nexusai.io/v1/models/{modelId}/inference",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "input": "Your prompt here",
        "parameters": {
            "max_tokens": 1024,
            "temperature": 0.7
        }
    }
)

print(response.json())`,
  javascript: `const response = await fetch(
  'https://api.nexusai.io/v1/models/{modelId}/inference',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: 'Your prompt here',
      parameters: {
        max_tokens: 1024,
        temperature: 0.7,
      },
    }),
  }
);

const data = await response.json();
console.log(data);`,
}

// Sample reviews
const reviews = [
  { id: 1, user: '0x1a2b...3c4d', rating: 5, comment: 'Incredible model! The response quality is outstanding and latency is minimal.', date: '2024-03-15' },
  { id: 2, user: '0x5e6f...7g8h', rating: 5, comment: 'Been using this for my production app. Extremely reliable and cost-effective.', date: '2024-03-10' },
  { id: 3, user: '0x9i0j...1k2l', rating: 4, comment: 'Great model overall. Would love to see longer context window support.', date: '2024-03-05' },
]

export default function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeCodeTab, setActiveCodeTab] = useState('curl')
  const [playgroundInput, setPlaygroundInput] = useState('')
  const [playgroundOutput, setPlaygroundOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  // Find the model
  const model = mockModels.find(m => m.id === id) || mockModels[0]

  const handleGenerate = async () => {
    if (!playgroundInput.trim()) return
    setIsGenerating(true)
    setPlaygroundOutput('')
    
    // Simulate streaming response
    const sampleOutput = `Based on your input, here's a comprehensive response:

${playgroundInput.includes('code') ? `\`\`\`javascript
function example() {
  console.log("Hello, NexusAI!");
  return { success: true };
}
\`\`\`` : 'This is a sample response demonstrating the model\'s capabilities. In production, this would be the actual AI-generated output based on your prompt.'}

The model processed your request with the following parameters:
- Temperature: 0.7
- Max Tokens: 1024
- Inference Time: ${Math.floor(Math.random() * 100 + 50)}ms

Feel free to experiment with different prompts to see the full range of capabilities.`

    // Simulate typing effect
    for (let i = 0; i <= sampleOutput.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10))
      setPlaygroundOutput(sampleOutput.slice(0, i))
    }
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <AnimatedContainer delay={0}>
            <Link href="/marketplace" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Link>
          </AnimatedContainer>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <AnimatedContainer delay={0.1} className="lg:col-span-2">
              <div className="flex flex-wrap items-start gap-4 mb-6">
                {/* Model Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Zap className="w-10 h-10 text-primary" />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      {model.name}
                    </h1>
                    {model.verified && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Link href={`/creators/${model.creator.id}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary" />
                      <span>{model.creator.name}</span>
                      {model.creator.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </Link>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{categoryLabels[model.category]}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {model.trending && (
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {model.featured && (
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {model.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {model.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{model.stats.rating}</span>
                  <span className="text-muted-foreground">({model.stats.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">{formatNumber(model.stats.downloads)}</span>
                  <span className="text-muted-foreground">downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">{formatNumber(model.stats.totalCalls)}</span>
                  <span className="text-muted-foreground">API calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">{model.stats.avgLatency}ms</span>
                  <span className="text-muted-foreground">avg latency</span>
                </div>
              </div>
            </AnimatedContainer>

            {/* Pricing Card */}
            <AnimatedContainer delay={0.2}>
              <GlowCard className="p-6 sticky top-24" glowColor="blue">
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                  {model.pricing.type === 'free' ? (
                    <GradientText variant="blue-cyan" className="text-3xl font-bold">
                      Free
                    </GradientText>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono">{model.pricing.price}</span>
                      <span className="text-lg text-muted-foreground">{model.pricing.currency}</span>
                      {model.pricing.perUnit && (
                        <span className="text-sm text-muted-foreground">/ {model.pricing.perUnit}</span>
                      )}
                    </div>
                  )}
                  <Badge 
                    variant="outline" 
                    className="mt-2 capitalize"
                  >
                    {model.pricing.type.replace('-', ' ')}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <GlowButton className="w-full" size="lg">
                    <Zap className="w-5 h-5 mr-2" />
                    Deploy Model
                  </GlowButton>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorited ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Uptime
                    </span>
                    <span className="font-semibold text-green-500">{model.stats.uptime}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Regions
                    </span>
                    <span className="font-semibold">Global (50+)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      GPU Type
                    </span>
                    <span className="font-semibold">H100 / A100</span>
                  </div>
                </div>
              </GlowCard>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
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

            {/* Playground Tab */}
            <TabsContent value="playground">
              <div className="grid lg:grid-cols-2 gap-6">
                <GlowCard className="p-6" glowColor="blue">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Input</h3>
                    <Badge variant="outline">Max 4096 tokens</Badge>
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
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Activity className="w-5 h-5 mr-2" />
                        </motion.div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Run Inference
                      </>
                    )}
                  </GlowButton>
                </GlowCard>

                <GlowCard className="p-6" glowColor="cyan">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Output</h3>
                    {playgroundOutput && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(playgroundOutput)}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    )}
                  </div>
                  <div className="min-h-[200px] bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap overflow-auto">
                    {playgroundOutput || (
                      <span className="text-muted-foreground">
                        Output will appear here...
                      </span>
                    )}
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

            {/* API Tab */}
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
                        onClick={() => setActiveCodeTab(lang)}
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
                      {codeExamples[activeCodeTab as keyof typeof codeExamples].replace('{modelId}', model.id)}
                    </code>
                  </pre>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(codeExamples[activeCodeTab as keyof typeof codeExamples].replace('{modelId}', model.id))}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Get your API key</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect your wallet and visit the{' '}
                        <Link href="/dashboard/api-keys" className="text-primary hover:underline">
                          API Keys
                        </Link>
                        {' '}section to generate your authentication key.
                      </p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </TabsContent>

            {/* Documentation Tab */}
            <TabsContent value="docs">
              <GlowCard className="p-6" glowColor="cyan">
                <h3 className="text-lg font-semibold mb-6">Model Documentation</h3>
                
                <div className="space-y-8">
                  {/* Capabilities */}
                  <div>
                    <h4 className="font-medium mb-3">Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.capabilities.map((cap) => (
                        <Badge key={cap} variant="outline" className="bg-primary/10">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Parameters */}
                  <div>
                    <h4 className="font-medium mb-3">Parameters</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 pr-4 font-medium">Parameter</th>
                            <th className="text-left py-2 pr-4 font-medium">Type</th>
                            <th className="text-left py-2 pr-4 font-medium">Default</th>
                            <th className="text-left py-2 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4 font-mono text-foreground">input</td>
                            <td className="py-2 pr-4">string</td>
                            <td className="py-2 pr-4">-</td>
                            <td className="py-2">The input prompt for the model</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4 font-mono text-foreground">max_tokens</td>
                            <td className="py-2 pr-4">integer</td>
                            <td className="py-2 pr-4">1024</td>
                            <td className="py-2">Maximum number of tokens to generate</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4 font-mono text-foreground">temperature</td>
                            <td className="py-2 pr-4">float</td>
                            <td className="py-2 pr-4">0.7</td>
                            <td className="py-2">Sampling temperature (0.0 - 2.0)</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4 font-mono text-foreground">stream</td>
                            <td className="py-2 pr-4">boolean</td>
                            <td className="py-2 pr-4">false</td>
                            <td className="py-2">Enable streaming responses</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Full Documentation
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Code2 className="w-4 h-4" />
                      OpenAPI Spec
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-6">
                {/* Review Summary */}
                <GlowCard className="p-6" glowColor="purple">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold font-mono mb-1">{model.stats.rating}</div>
                      <div className="flex gap-0.5 justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(model.stats.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`} 
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {model.stats.reviews} reviews
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-3">{stars}</span>
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-500 rounded-full"
                              style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <GlowCard key={review.id} className="p-6" glowColor="blue">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium font-mono">{review.user}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
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
                      <p className="text-muted-foreground">{review.comment}</p>
                    </GlowCard>
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="outline">Load More Reviews</Button>
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

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
