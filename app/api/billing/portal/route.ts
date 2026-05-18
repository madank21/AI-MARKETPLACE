export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/database'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        username: true,
        stripeCustomerId: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User is not synced' }, { status: 404 })
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
    const body = await request.json().catch(() => ({}))
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: body.returnUrl || `${origin}/dashboard`,
    })

    return NextResponse.json({ success: true, url: session.url })
  } catch (error) {
    console.error('Failed to create billing portal session:', error)

    return NextResponse.json(
      { error: 'Billing portal session creation failed' },
      { status: 500 },
    )
  }
}
