// PATH: src/app/api/games/herd-vote/categories/route.ts
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// doÄŤasne statickĂ© (na lokĂˇlny test). NeskĂ´r vieĹˇ nahradiĹĄ ÄŤĂ­tanĂ­m zo Supabase.
const CATEGORIES = [
  { name: 'VĹˇeobecnĂ©', count: 100 },
  { name: 'Geografia', count: 42 },
  { name: 'Veda',      count: 37 },
]

export async function GET() {
  return NextResponse.json({ categories: CATEGORIES })
}
