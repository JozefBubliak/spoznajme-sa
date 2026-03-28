import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const ages = [
  { range: '3–6', desc: 'Emócie, rutiny, bezpečné vzťahy' },
  { range: '7–11', desc: 'Škola, kamaráti, identity' },
  { range: '12–17', desc: 'Puberta, obrazovky, hranice, sny' },
  { range: '18+', desc: 'Dospelé dieťa, nový vzťah, vďačnosť' },
]

const sections = [
  { title: '🧭 Kompasové situácie', items: ['Ráno pred školou', 'Po škole — čo sa stalo', 'Hnev a plač', 'Obrazovky a limity', 'Škola a výkon', 'Ťažké témy (smrť, rozvod, šikana)'] },
  { title: '🃏 Nástroje', items: ['Kartičky "Spoznajme sa" — Rodič–dieťa', 'Vekový filter pre Kompas', 'Index: Čo trápi deti', 'Index: Čo trápi rodičov'] },
]

export default async function RodicDietaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">← Skupiny</Link>
          <div className="text-4xl">👨‍👧</div>
          <h1 className="text-4xl font-bold text-foreground">Rodič–dieťa</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Bezpečný priestor pre emócie, školu, obrazovky aj ťažké témy. Podľa veku dieťaťa.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/kompas/rodic-dieta`} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Otvoriť kompas
            </Link>
            <Link href={`/${lang}/apps/spoznajme-sa`} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Kartičky rodič–dieťa
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ages.map(a => (
              <Link
                key={a.range}
                href={`/${lang}/kompas/rodic-dieta`}
                className="rounded-xl border bg-card p-4 text-center hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <div className="font-bold text-foreground text-lg">{a.range}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.desc}</div>
              </Link>
            ))}
          </div>
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
        </div>
      </Container>
    </div>
  )
}
