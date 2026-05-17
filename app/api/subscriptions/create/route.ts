import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/database'
import { stripe } from '@/lib/stripe'

type Plan = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'

const priceEnvByPlan: Record<Plan, string> = {
  STARTER: 'STRIPE_PRICE_STARTER',
  PROFESSIONAL: 'STRIPE_PRICE_PROFESSIONAL',
  ENTERPRISE: 'STRIPE_PRICE_ENTERPRISE',
}

function normalizePlan(plan: unknown): Plan {
  const value = String(plan || 'STARTER').toUpperCase()

  if (value === 'PRO' || value === 'PROFESSIONAL') {
    return 'PROFESSIONAL'
  }

  if (value === 'ENTERPRISE') {
    return 'ENTERPRISE'
  }

  return 'STARTER'
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const plan = normalizePlan(body.plan)
    const priceId =
      typeof body.priceId === 'string' && body.priceId
        ? body.priceId
        : process.env[priceEnvByPlan[plan]]

    if (!priceId) {
      return NextResponse.json(
        { error: `Missing Stripe price ID for ${plan}` },
        { status: 400 },
      )
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        stripeCustomerId: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User is not synced' }, { status: 404 })
    }

    const modelId = typeof body.modelId === 'string' ? body.modelId : undefined

    if (modelId) {
      const model = await db.model.findFirst({
        where: {
          id: modelId,
          deletedAt: null,
          visibility: 'PUBLIC',
        },
        select: { id: true },
      })

      if (!model) {
        return NextResponse.json({ error: 'Model not found' }, { status: 404 })
      }
    }

    let stripeCustomerId = user.stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username || undefined,
        metadata: { userId },
      })

      stripeCustomerId = customer.id

      await db.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      })
    }

    const origin = new URL(request.url).origin
    const metadata = {
      userId,
      plan,
      priceId,
      ...(modelId ? { modelId } : {}),
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url:
        body.successUrl || `${origin}/dashboard?subscription=success`,
      cancel_url:
        body.cancelUrl || `${origin}/dashboard?subscription=cancelled`,
      metadata,
      subscription_data: { metadata },
    })

    return NextResponse.json({
      success: true,
      checkoutSessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Failed to create subscription checkout:', error)

    return NextResponse.json(
      { error: 'Subscription checkout creation failed' },
      { status: 500 },
    )
  }
}
