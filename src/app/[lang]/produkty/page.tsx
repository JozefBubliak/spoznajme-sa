import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const categories = [
  {
    slug: 'pary',
    emoji: '💑',
    label: 'Pre páry',
    desc: 'Kartičky, dotazníky a nástroje pre partnerov.',
    items: ['Fyzické kartičky', 'CoupleSync dotazník', 'Daily Connection'],
  },
  {
    slug: 'rodic-dieta',
    emoji: '👨‍👧',
    label: 'Rodič–dieťa',
    desc: 'Pomôcky pre rodičov podľa veku dieťaťa.',
    items: ['Fyzické kartičky', 'Kompas skripty', 'Vekový filter'],
  },
  {
    slug: 'karticky',
    emoji: '🃏',
    label: 'Fyzické kartičky',
    desc: 'Päť edícií. Páry, Rodič+Dieťa, Priatelia, Tím, Seniori.',
    price: '18–25 €/edícia',
  },
  {
    slug: 'predplatne',
    emoji: '✨',
    label: 'Predplatné',
    desc: 'Legacy 52 otázok/rok + viazaná kniha. Daily Connection Premium.',
    price: 'od 4 €/mes',
  },
  {
    slug: 'darcekovy-poukaz',
    emoji: '🎁',
    label: 'Darčekový poukaz',
    desc: 'Email doručenie. Výber hodnoty. Fyzická karta na tlač.',
    soon: true,
  },
]

export default async function ProduktyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">← Domov</Link>
          <h1 className="text-4xl font-bold text-foreground">Produkty</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Digitálne aj fyzické pomôcky pre hlbšie rozhovory. Pre domov, školu aj firemné eventy.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-background">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(c => (
            <Link
              key={c.slug}
              href={`/${lang}/produkty/${c.slug}`}
              className="group rounded-2xl border bg-card p-6 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
            >
              <div className="text-3xl mb-3">{c.emoji}</div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-semibold text-foreground">{c.label}</h2>
                {c.soon && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border font-medium">Čoskoro</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
              {c.price && (
                <p className="text-xs font-semibold text-primary">{c.price}</p>
              )}
              {c.items && (
                <ul className="mt-2 space-y-1">
                  {c.items.map(i => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="text-primary">·</span>{i}
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
