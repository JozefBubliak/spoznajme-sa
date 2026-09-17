import { NextResponse, type NextRequest } from 'next/server'
import { db, overPar } from '@/lib/dotaznik/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// DOČASNE VYPNUTÉ (2026-09-17) — nezobrazuje žiadne zhody.
//
// Nezávislý review (docs/AI-COLLAB.md, NEXT-003) ukázal, že `typ` uložený v `dotaznik_odpovede`
// je čisto klientom deklarovaná hodnota z PUT /odpoved a server ju pri zápise nijako neoveruje
// proti skutočnej schéme otázky. Akékoľvek vyhodnocovanie zhody podľa `typ` je preto obchádzateľné
// — klient si pri zápise môže „typ" vydávať za čokoľvek, čo sa nižšie odhaľovalo bez podmienky
// (napr. `frekvencia`/`intenzita`). Rovnaký koreňový problém (server dôveruje klientom deklarovanej
// hodnote pre bezpečnostné rozhodnutie) platí aj pre `tema` v zámku (PUT /odpoved) a `slot`
// (samostatný nález DQ-002). Namiesto ďalšej čiastočnej opravy jednej vetvy je bezpečnejšie
// prestať odhaľovať čokoľvek, kým nevznikne server-side register, ktorý vie pre danú
// (modul, tema, okruh, polozka) overiť skutočný typ/možnosti zo zdroja pravdy (`obsah/*.ts`
// register / `otazky.ts` banka), nie z toho, čo si klient sám o sebe zapísal.
//
// Pôvodná (chybná) logika vyhodnocovania je v git histórii — commit `a520c38` a predchádzajúce.
// Táto funkcia sa vráti až s NEXT-003 (server-side schema-aware register + migrácia škály).
export async function GET(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  const par = await overPar(kod, req.nextUrl.searchParams.get('k') ?? '')
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  const { count: pocetA } = await db()
    .from('dotaznik_odpovede')
    .select('*', { count: 'exact', head: true })
    .eq('par_id', par.id)
    .eq('slot', 'a')
  const { count: pocetB } = await db()
    .from('dotaznik_odpovede')
    .select('*', { count: 'exact', head: true })
    .eq('par_id', par.id)
    .eq('slot', 'b')

  return NextResponse.json({
    pripravene: false,
    docasne_nedostupne: true,
    pocet: { a: pocetA ?? 0, b: pocetB ?? 0 },
    moduly: [],
  })
}
