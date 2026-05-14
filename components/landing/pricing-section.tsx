'use client'

import { useState } from 'react'
import { GlowCard, GlowButton } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { CheckCircle2, Sparkles, Zap, Crown } from 'lucide-react'

const plans = [
  {
    name: 'Explorer',
    description: 'Perfect for getting started with AI models',
    price: { monthly: 0, yearly: 0 },
    icon: Sparkles,
    color: 'blue' as const,
    features: [
      '100 API calls/month',
      'Access to free models',
      'Basic analytics',
      'Community support',
      '1 API key',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Builder',
    description: 'For developers building serious applications',
    price: { monthly: 49, yearly: 39 },
    icon: Zap,
    color: 'purple' as const,
    features: [
      '10,000 API calls/month',
      'Access to all models',
      'Advanced analytics',
      'Priority support',
      '10 API keys',
      'Custom rate limits',
      'Webhook integrations',
    ],
    cta: 'Start Building',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced needs',
    price: { monthly: 299, yearly: 249 },
    icon: Crown,
    color: 'cyan' as const,
    features: [
      'Unlimited API calls',
      'Access to all models',
      'Real-time analytics',
      'Dedicated support',
      'Unlimited API keys',
      'Custom SLAs',
      'On-premise deployment',
      'Custom model hosting',
      'SSO & SAML',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute inset-0 neural-bg opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <span className="text-sm text-secondary font-medium">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Simple,{' '}
            <GradientText variant="purple-pink">Transparent</GradientText>
            {' '}Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that fits your needs. All plans include access to our decentralized network.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/30">
                Save 20%
              </Badge>
            )}
          </div>
        </AnimatedContainer>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <AnimatedContainer key={plan.name} delay={index * 0.1}>
              <GlowCard
                className={`p-6 lg:p-8 h-full flex flex-col ${plan.popular ? 'ring-2 ring-secondary' : ''}`}
                glowColor={plan.color}
                hover
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div className={`
                    w-12 h-12 rounded-xl mb-4 flex items-center justify-center
                    ${plan.color === 'blue' ? 'bg-primary/10 text-primary' : ''}
                    ${plan.color === 'purple' ? 'bg-secondary/10 text-secondary' : ''}
                    ${plan.color === 'cyan' ? 'bg-accent/10 text-accent' : ''}
                  `}>
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-mono">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  {isYearly && plan.price.monthly > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.price.yearly * 12}/year)
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <GlowButton
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  glowColor={plan.color}
                >
                  {plan.cta}
                </GlowButton>
              </GlowCard>
            </AnimatedContainer>
          ))}
        </div>

        {/* Enterprise Note */}
        <AnimatedContainer delay={0.4} className="text-center mt-12">
          <p className="text-muted-foreground">
            Need a custom solution?{' '}
            <a href="/contact" className="text-primary hover:underline">
              Contact our sales team
            </a>
            {' '}for tailored pricing.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  )
}
