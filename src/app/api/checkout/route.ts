import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  try {
    const stripe = new Stripe(stripeSecretKey)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://spoznajmesa-kappa.vercel.app'
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID ?? 'price_1Ro7WUAciFxB09IepKSBrNMB',
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/thank-you`,
      cancel_url: `${baseUrl}/upgrade`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe Checkout error:', error)
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 })
  }
}
