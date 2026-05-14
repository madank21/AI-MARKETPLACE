import { Handler } from '@netlify/functions'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const handler: Handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      }
    }

    const signature = event.headers['stripe-signature'] || ''
    const body = event.body || ''

    // TODO: Verify webhook signature
    // const webhookEvent = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // )

    // For now, just parse the body
    const webhookEvent = JSON.parse(body)

    // Handle different event types
    switch (webhookEvent.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', webhookEvent.data.object)
        // TODO: Update database, create subscription, etc.
        break
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', webhookEvent.data.object)
        // TODO: Handle failed payment
        break
      case 'charge.refunded':
        console.log('Charge refunded:', webhookEvent.data.object)
        // TODO: Handle refund
        break
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook failed' }),
    }
  }
}

export { handler }
