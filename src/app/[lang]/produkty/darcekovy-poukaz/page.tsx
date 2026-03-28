import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function DarcekovyPoukazPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">← Produkty</Link>
          <div className="text-4xl">🎁</div>
          <h1 className="text-4xl font-bold text-foreground">Darčekový poukaz</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Darujte zmysluplný rozhovor. Emailové doručenie, výber hodnoty, fyzická karta na tlač.
          </p>
        </div>
      </section>
      <Container>
        <div className="max-w-lg space-y-5">
          <div className="rounded-2xl border bg-card p-8 shadow-sm text-center space-y-4">
            <div className="text-5xl">🎁</div>
            <h2 className="text-xl font-semibold text-foreground">Darčekový poukaz</h2>
            <p className="text-muted-foreground text-sm">
              Darujte prístup k otázkam, predplatnému alebo fyzickým kartičkám. Ideálne pre každú príležitosť.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['10 €', '20 €', '30 €', '50 €'].map(val => (
                <button
                  key={val}
                  disabled
                  className="px-4 py-2 rounded-lg border text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
                >
                  {val}
                </button>
              ))}
            </div>
            <button disabled className="w-full px-4 py-2.5 rounded-lg bg-primary/30 text-primary-foreground text-sm font-semibold cursor-not-allowed opacity-60">
              Čoskoro k dispozícii
            </button>
            <p className="text-xs text-muted-foreground">
              Máte záujem? Napíšte na <a href="mailto:ahoj@spoznajmesa.sk" className="text-primary hover:underline">ahoj@spoznajmesa.sk</a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
