import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const sections = [
  { title: '🗺️ Cesta páru', items: ['Spoznávanie', 'Budovanie dôvery', 'Hlboké rozhovory', 'Kríza & obnova', 'Záväzok & budúcnosť'] },
  { title: '🧭 Kompasové situácie', items: ['Každodenná rutina', 'Vyjadrenie pocitov', 'Hádky a nedorozumenia', 'Vzdialenosť', 'Intimita'] },
  { title: '🃏 Nástroje', items: ['Kartičky "Spoznajme sa" — partneri', 'CoupleSync dotazník', 'Daily Connection — denná otázka', 'Herd Vote kvíz pre dvojicu'] },
  { title: '📦 Produkty', items: ['Fyzické kartičky – Páry (18–25 €)', 'Daily Connection Premium (4 €/mes)', 'Darčekový poukaz'] },
]

export default async function ParyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">← Skupiny</Link>
          <div className="text-4xl">💑</div>
          <h1 className="text-4xl font-bold text-foreground">Páry</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Hlbšie porozumenie, dôvera a intimita. Nástroje pre každodenné aj ťažké momenty vo vzťahu.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/kompas/pary`} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Otvoriť kompas pre páry
            </Link>
            <Link href={`/${lang}/apps/spoznajme-sa`} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Kartičky pre partnerov
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div className="grid md:grid-cols-2 gap-5">
          {sections.map(s => (
            <div key={s.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-semibold text-foreground mb-4">{s.title}</h2>
              <ul className="space-y-2">
                {s.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0">·</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
