import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User is not synced' }, { status: 404 })
    }

    const body = await request.json()
    const modelId = typeof body.modelId === 'string' ? body.modelId : undefined

    const model = modelId
      ? await db.model.findFirst({
          where: {
            id: modelId,
            deletedAt: null,
            visibility: 'PUBLIC',
          },
          select: {
            id: true,
            price: true,
            currency: true,
          },
        })
      : null

    if (modelId && !model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const amount = model ? model.price : Number(body.amount)

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'A positive amount is required' },
        { status: 400 }
      )
    }

    const currency = String(model?.currency || body.currency || 'usd').toLowerCase()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        ...(model?.id ? { modelId: model.id } : {}),
      },
    })

    await db.transaction.create({
      data: {
        userId,
        modelId: model?.id,
        amount,
        currency: currency.toUpperCase(),
        status: 'PENDING',
        stripePaymentId: paymentIntent.id,
      },
    })

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntent: {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount,
        currency,
        status: paymentIntent.status,
      },
    })
  } catch (error) {
    console.error('Failed to create payment intent:', error)

    return NextResponse.json(
      { error: 'Payment intent creation failed' },
      { status: 500 }
    )
  }
}
