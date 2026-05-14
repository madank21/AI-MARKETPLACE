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

    const { amount, currency, description } = JSON.parse(event.body || '{}')

    if (!amount || !currency) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Amount and currency required' }),
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      description,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      }),
    }
  } catch (error) {
    console.error('Payment error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Payment failed' }),
    }
  }
}

export { handler }
