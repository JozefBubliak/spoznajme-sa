import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function PracaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">← Skupiny</Link>
          <div className="text-4xl">🤝</div>
          <h1 className="text-4xl font-bold text-foreground">Práca</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Psychologická bezpečnosť, spätná väzba, hranice a tímová spolupráca.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/b2b`} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              B2B pre firmy
            </Link>
            <Link href={`/${lang}/apps/quiz`} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Herd Vote kvíz
            </Link>
          </div>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-2 gap-5">
          {['Spätná väzba', 'Hranice', 'Konflikty', 'Žiadosť o zvýšenie', 'Tímové otázky', 'Psychologická bezpečnosť'].map(t => (
            <div key={t} className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-medium text-foreground">{t}</h3>
              <p className="text-sm text-muted-foreground mt-1">Obsah čoskoro.</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
