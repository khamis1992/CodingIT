import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { handleSubscriptionEvent } from '@/lib/subscription'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
])

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    console.error('Stripe signature or webhook secret is missing.')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe!.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      await handleSubscriptionEvent(event)
    } catch (error) {
      console.error('Error handling subscription event:', error)
      return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
