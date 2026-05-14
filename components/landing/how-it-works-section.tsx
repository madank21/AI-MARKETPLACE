'use client'

import { GlowCard } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { FloatingCubesScene } from '@/components/ui/scene-3d'
import { 
  Upload, 
  Code2, 
  Rocket, 
  Coins,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your Model',
    description: 'Upload your trained AI model in any format. We support PyTorch, TensorFlow, ONNX, and more.',
    features: ['Automatic format conversion', 'Model validation', 'Version control'],
    color: 'blue' as const,
  },
  {
    icon: Code2,
    step: '02',
    title: 'Configure API',
    description: 'Set up your model\'s API endpoints with our intuitive interface. Define inputs, outputs, and pricing.',
    features: ['Auto-generated endpoints', 'Custom pricing tiers', 'Rate limiting'],
    color: 'purple' as const,
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Deploy to Network',
    description: 'Deploy to our decentralized compute network with one click. Automatic scaling and load balancing included.',
    features: ['Global distribution', 'Auto-scaling', '99.99% uptime'],
    color: 'cyan' as const,
  },
  {
    icon: Coins,
    step: '04',
    title: 'Earn Rewards',
    description: 'Start earning immediately. Get paid in crypto for every API call with instant settlements.',
    features: ['Instant payments', 'Revenue analytics', 'Withdrawal anytime'],
    color: 'pink' as const,
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <FloatingCubesScene />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Rocket className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Deploy in{' '}
            <GradientText variant="blue-cyan">Minutes</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            From upload to earning in four simple steps. No DevOps experience required.
          </p>
        </AnimatedContainer>

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
          {steps.map((step, index) => (
            <StaggerItem key={step.step}>
              <div className="relative h-full">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0">
                    <ArrowRight className="absolute right-0 -top-2 w-4 h-4 text-border" />
                  </div>
                )}
                
                <GlowCard
                  className="p-6 h-full relative z-10"
                  glowColor={step.color}
                  hover
                >
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-4xl font-bold font-mono text-muted/20">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl mb-4 flex items-center justify-center
                    ${step.color === 'blue' ? 'bg-primary/10 text-primary' : ''}
                    ${step.color === 'purple' ? 'bg-secondary/10 text-secondary' : ''}
                    ${step.color === 'cyan' ? 'bg-accent/10 text-accent' : ''}
                    ${step.color === 'pink' ? 'bg-[oklch(0.7_0.25_330)]/10 text-[oklch(0.7_0.25_330)]' : ''}
                  `}>
                    <step.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
