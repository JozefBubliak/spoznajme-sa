import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const editions = [
  { name: 'Páry', emoji: '💑', desc: 'Pre partnerov. Otázky o snoch, spomienkach a každodennom živote.', price: '18–25 €' },
  { name: 'Rodič + Dieťa', emoji: '👨‍👧', desc: 'Otázky podľa veku. Pre deti 5–15 rokov.', price: '18–25 €' },
  { name: 'Priatelia', emoji: '👯', desc: 'Pre dlhé večery s ľuďmi, ktorých poznáte. Alebo si myslíte, že poznáte.', price: '18–25 €' },
  { name: 'Tím', emoji: '🏢', desc: 'Pre kolegov. Psychologická bezpečnosť a vzájomné spoznanie.', price: '18–25 €' },
  { name: 'Seniori', emoji: '🧓', desc: 'Príbehy, spomienky, múdrosť. Pre starých rodičov a ich rodiny.', price: '18–25 €' },
]

export default async function KartickyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">← Produkty</Link>
          <div className="text-4xl">🃏</div>
          <h1 className="text-4xl font-bold text-foreground">Fyzické kartičky</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Päť edícií. Otázky na papieri — darček aj každodenný rituál. Kvalitná tlač, kompaktný formát.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/b2b/dopyt`} className="px-4 py-2 rounded-lg border text-sm font-medium text-foreground hover:bg-muted">
              Bulk objednávka (B2B)
            </Link>
          </div>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {editions.map(e => (
            <div key={e.name} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="text-3xl mb-3">{e.emoji}</div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-semibold text-foreground">{e.name}</h2>
                <span className="text-sm font-bold text-primary ml-3 shrink-0">{e.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{e.desc}</p>
              <button disabled className="px-4 py-2 rounded-lg border text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                Čoskoro
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">Čo je vo vnútri</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div><span className="font-medium text-foreground block">52 kartičiek</span>Na celý rok — jedna za týždeň.</div>
            <div><span className="font-medium text-foreground block">3 úrovne hĺbky</span>Ľahké, stredné, hlboké. Vyber si.</div>
            <div><span className="font-medium text-foreground block">Kompaktný formát</span>Zmestí sa do vrecka. Vhodné na cesty.</div>
          </div>
        </div>
      </Container>
    </div>
  )
}
