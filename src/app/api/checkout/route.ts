
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
  "sk_test_51Ro77dAciFxB09IeiOU1ulLk0JlI4YY35WnkdqJ4XLLMb8x18tbqm2jb3Et90bv2MZrWazw1ej2KFox6JCBfqqcY00tT8svLfQ",
  {
    apiVersion: '2025-08-27.basil',
  }
)

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: "price_1Ro7WUAciFxB09IepKSBrNMB",
          quantity: 1,
        },
      ],
      success_url: `https://spoznajmesa-kappa.vercel.app/thank-you`,
      cancel_url: `https://spoznajmesa-kappa.vercel.app/upgrade`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe Checkout error:', error)
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 })
  }
}
