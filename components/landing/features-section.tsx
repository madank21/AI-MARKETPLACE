'use client'

import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { 
  Cpu, 
  Shield, 
  Coins, 
  Zap, 
  Globe, 
  Lock,
  Network,
  BarChart3,
} from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'Decentralized Compute',
    description: 'Access a global network of GPU providers. Run models on distributed infrastructure with automatic failover and load balancing.',
    color: 'blue' as const,
  },
  {
    icon: Shield,
    title: 'Verifiable Inference',
    description: 'Every computation is cryptographically verified. Zero-knowledge proofs ensure model outputs are authentic and untampered.',
    color: 'purple' as const,
  },
  {
    icon: Coins,
    title: 'Creator Economics',
    description: 'Deploy your AI models and earn with every API call. Smart contracts handle payments automatically with instant settlements.',
    color: 'cyan' as const,
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Edge-optimized inference with sub-100ms latency. Intelligent routing selects the fastest available compute node.',
    color: 'pink' as const,
  },
  {
    icon: Globe,
    title: 'Global Availability',
    description: 'Models deployed across 50+ regions worldwide. Automatic geo-routing ensures optimal performance everywhere.',
    color: 'green' as const,
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data never leaves your control. Federated learning and secure enclaves protect sensitive information.',
    color: 'blue' as const,
  },
  {
    icon: Network,
    title: 'Composable AI',
    description: 'Chain multiple models together to build complex AI workflows. Create sophisticated pipelines with simple APIs.',
    color: 'purple' as const,
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Monitor performance, usage, and earnings in real-time. Detailed insights help optimize your AI deployments.',
    color: 'cyan' as const,
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <span className="text-sm text-secondary font-medium">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built for the{' '}
            <GradientText variant="purple-pink">Future of AI</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to build, deploy, and scale AI applications on decentralized infrastructure.
          </p>
        </AnimatedContainer>

        {/* Features Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <GlowCard
                className="p-6 h-full"
                glowColor={feature.color}
                hover
              >
                <div className={`
                  w-12 h-12 rounded-xl mb-4 flex items-center justify-center
                  ${feature.color === 'blue' ? 'bg-primary/10 text-primary' : ''}
                  ${feature.color === 'purple' ? 'bg-secondary/10 text-secondary' : ''}
                  ${feature.color === 'cyan' ? 'bg-accent/10 text-accent' : ''}
                  ${feature.color === 'pink' ? 'bg-[oklch(0.7_0.25_330)]/10 text-[oklch(0.7_0.25_330)]' : ''}
                  ${feature.color === 'green' ? 'bg-[oklch(0.75_0.2_150)]/10 text-[oklch(0.75_0.2_150)]' : ''}
                `}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
