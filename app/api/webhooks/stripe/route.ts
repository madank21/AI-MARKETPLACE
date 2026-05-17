import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/database'
import { stripe } from '@/lib/stripe'

type Plan = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
type SubscriptionState = 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE'

function stripeId(
  value: string | Stripe.Customer | Stripe.DeletedCustomer | null,
) {
  return typeof value === 'string' ? value : value?.id || null
}

function normalizePlan(value: string | null | undefined): Plan {
  const plan = String(value || 'STARTER').toUpperCase()

  if (plan === 'PRO' || plan === 'PROFESSIONAL') {
    return 'PROFESSIONAL'
  }

  if (plan === 'ENTERPRISE') {
    return 'ENTERPRISE'
  }

  return 'STARTER'
}

function mapSubscriptionStatus(
  status: Stripe.Subscription.Status,
): SubscriptionState {
  if (status === 'active' || status === 'trialing') {
    return 'ACTIVE'
  }

  if (status === 'canceled') {
    return 'CANCELLED'
  }

  if (status === 'incomplete_expired') {
    return 'EXPIRED'
  }

  return 'PAST_DUE'
}

async function syncPaymentIntent(paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata.userId
  const modelId = paymentIntent.metadata.modelId || undefined

  if (!userId) {
    return
  }

  const amount = (paymentIntent.amount_received || paymentIntent.amount) / 100
  const currency = paymentIntent.currency.toUpperCase()

  await db.transaction.upsert({
    where: { stripePaymentId: paymentIntent.id },
    update: {
      amount,
      currency,
      status: 'COMPLETED',
      ...(modelId ? { modelId } : {}),
    },
    create: {
      userId,
      modelId,
      amount,
      currency,
      status: 'COMPLETED',
      stripePaymentId: paymentIntent.id,
    },
  })

  if (modelId) {
    await db.model
      .update({
        where: { id: modelId },
        data: { downloads: { increment: 1 } },
      })
      .catch(() => undefined)
  }
}

async function markPaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata.userId

  if (!userId) {
    return
  }

  await db.transaction.upsert({
    where: { stripePaymentId: paymentIntent.id },
    update: { status: 'FAILED' },
    create: {
      userId,
      modelId: paymentIntent.metadata.modelId || undefined,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency.toUpperCase(),
      status: 'FAILED',
      stripePaymentId: paymentIntent.id,
    },
  })
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const customerId = stripeId(subscription.customer)
  const price = subscription.items.data[0]?.price
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end
  let userId: string | undefined = subscription.metadata.userId

  if (!userId && customerId) {
    const user = await db.user.findUnique({
      where: { stripeCustomerId: customerId },
      select: { id: true },
    })

    userId = user?.id
  }

  if (!userId) {
    return
  }

  await db.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      userId,
      modelId: subscription.metadata.modelId || undefined,
      stripeCustomerId: customerId,
      stripePriceId: price?.id,
      plan: normalizePlan(subscription.metadata.plan),
      status: mapSubscriptionStatus(subscription.status),
      monthlyPrice: (price?.unit_amount || 0) / 100,
      currentPeriodEnd: currentPeriodEnd
        ? new Date(currentPeriodEnd * 1000)
        : null,
      endDate: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : null,
      autoRenew: !subscription.cancel_at_period_end,
    },
    create: {
      userId,
      modelId: subscription.metadata.modelId || undefined,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customerId,
      stripePriceId: price?.id,
      plan: normalizePlan(subscription.metadata.plan),
      status: mapSubscriptionStatus(subscription.status),
      monthlyPrice: (price?.unit_amount || 0) / 100,
      currentPeriodEnd: currentPeriodEnd
        ? new Date(currentPeriodEnd * 1000)
        : null,
      endDate: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : null,
      autoRenew: !subscription.cancel_at_period_end,
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing Stripe webhook signature or secret' },
        { status: 400 },
      )
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    )

    switch (event.type) {
      case 'payment_intent.succeeded':
        await syncPaymentIntent(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await markPaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await syncSubscription(event.data.object as Stripe.Subscription)
        break
      default:
        break
    }

    return NextResponse.json(
      { received: true, type: event.type },
      { status: 200 }
    )
  } catch (error) {
    console.error('Stripe webhook processing failed:', error)

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    )
  }
}
