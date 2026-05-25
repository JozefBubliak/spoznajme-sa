import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSession } from '@/app/api/games/_session'
import { PRODUCTS, type ProductSlug } from '@/lib/access'

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  // Auth check — reuse the same cookie-based session util as all game routes
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Parse request body
  const body = await req.json().catch(() => ({}))
  const productSlug = (body.productSlug ?? 'herd-vote') as ProductSlug
  const lang = (body.lang ?? 'sk') as string

  const product = PRODUCTS[productSlug]
  if (!product) {
    return NextResponse.json({ error: 'Unknown product' }, { status: 400 })
  }

  const priceId = product.stripePriceId
  if (!priceId) {
    return NextResponse.json(
      { error: `No Stripe price configured for ${productSlug}` },
      { status: 500 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://deeptalks.eu'

  try {
    const stripe = new Stripe(stripeKey)
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: session.user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      // Metadata passes through to webhook so we can grant access automatically
      metadata: {
        user_id: session.user.id,
        product_slug: productSlug,
      },
      success_url: `${baseUrl}/${lang}${product.hubPath}?payment=success`,
      cancel_url: `${baseUrl}/${lang}${product.upgradePath}?payment=cancelled`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('[checkout] Stripe error:', error)
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 })
  }
}
