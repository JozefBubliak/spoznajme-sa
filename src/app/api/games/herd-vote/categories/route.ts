// PATH: src/app/api/games/herd-vote/categories/route.ts
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// dočasne statické (na lokálny test). Neskôr vieš nahradiť čítaním zo Supabase.
const CATEGORIES = [
  { name: 'Všeobecné', count: 100 },
  { name: 'Geografia', count: 42 },
  { name: 'Veda',      count: 37 },
]

export async function GET() {
  return NextResponse.json({ categories: CATEGORIES })
}
