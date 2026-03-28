import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const skupiny = [
  { slug: 'pary',         emoji: '💑', label: 'Páry',           desc: 'Hlbšie porozumenie, dôvera, intimita. Nástroje pre každodenné aj ťažké momenty.', priority: true },
  { slug: 'rodic-dieta',  emoji: '👨‍👧', label: 'Rodič–dieťa',  desc: 'Vekové filtre, skripty pre emócie, školu, obrazovky aj ťažké témy.', priority: true },
  { slug: 'priatelia',    emoji: '👫', label: 'Priatelia',      desc: 'Anti-small-talk. Otázky, ktoré robia zo známych priateľov.' },
  { slug: 'praca',        emoji: '🤝', label: 'Práca',          desc: 'Psychologická bezpečnosť, spätná väzba, hranice a tímová spolupráca.' },
  { slug: 'skola',        emoji: '🎓', label: 'Škola',          desc: 'Ranný kruh, šikana, metodika pre učiteľov a školských psychológov.' },
  { slug: 'seniori',      emoji: '🧓', label: 'Seniori',        desc: '"Babka vie veci" — príbehy, spomienky a mosty medzi generáciami.' },
]

export default async function SkupinyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Domov
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Skupiny vzťahov</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Vyber skupinu a nájdi nástroje, otázky a kompasové skripty šité na mieru.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-background">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skupiny.map(s => (
            <Link
              key={s.slug}
              href={`/${lang}/skupiny/${s.slug}`}
              className="group rounded-2xl border bg-card p-6 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
            >
              <div className="text-3xl mb-3">{s.emoji}</div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-semibold text-foreground">{s.label}</h2>
                {s.priority && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    Priorita
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
