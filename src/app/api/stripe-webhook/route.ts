import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { grantAccess } from '@/lib/access-server'
import { type ProductSlug } from '@/lib/access'

// Stripe requires the raw body for signature verification
export const config = { api: { bodyParser: false } }

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  const rawBody = await req.text()
  let event: Stripe.Event

  try {
    const stripe = new Stripe(stripeKey)
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Only handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.user_id
    const productSlug = session.metadata?.product_slug as ProductSlug | undefined

    if (!userId || !productSlug) {
      console.error('[stripe-webhook] Missing metadata', session.metadata)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    try {
      await grantAccess({
        userId,
        productSlug,
        stripeSessionId: session.id,
        stripeCustomerId: session.customer as string | undefined,
      })
      console.log(`[stripe-webhook] Access granted: user=${userId} product=${productSlug}`)
    } catch (err) {
      console.error('[stripe-webhook] grantAccess failed:', err)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
