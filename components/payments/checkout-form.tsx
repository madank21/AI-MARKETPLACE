'use client'

import { FormEvent, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type CheckoutFormProps = {
  amount: number
  modelId?: string
  modelTitle?: string
  submitLabel?: string
  onSuccess?: (paymentIntentId: string) => void
}

export function CheckoutForm({
  amount,
  modelId,
  modelTitle,
  submitLabel = 'Pay now',
  onSuccess,
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!stripe || !elements) {
      setError('Stripe is still loading. Try again in a moment.')
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setError('Card details are required.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, modelId }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to start checkout.')
      }

      const result = await stripe.confirmCardPayment(payload.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name || undefined,
            email: email || undefined,
          },
        },
      })

      if (result.error) {
        throw new Error(result.error.message || 'Payment failed.')
      }

      const paymentIntentId = result.paymentIntent?.id

      if (paymentIntentId) {
        onSuccess?.(paymentIntentId)
      }

      setIsComplete(true)
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Payment failed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-1">
        <div className="text-sm font-medium">
          {modelTitle ? `Purchase ${modelTitle}` : 'Secure checkout'}
        </div>
        <div className="text-sm text-muted-foreground">
          ${amount.toFixed(2)} USD
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="checkout-name">Name</Label>
        <Input
          id="checkout-name"
          autoComplete="cc-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="checkout-email">Email</Label>
        <Input
          id="checkout-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Card</Label>
        <div className="rounded-md border border-input bg-transparent px-3 py-3 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30">
          <CardElement
            options={{
              style: {
                base: {
                  color: '#f8fafc',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '16px',
                  '::placeholder': { color: '#94a3b8' },
                },
                invalid: { color: '#fb7185' },
              },
            }}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {isComplete && (
        <p className="text-sm text-emerald-500">Payment completed.</p>
      )}

      <Button type="submit" disabled={!stripe || isSubmitting || isComplete}>
        <CreditCard />
        {isSubmitting ? 'Processing...' : submitLabel}
      </Button>
    </form>
  )
}
