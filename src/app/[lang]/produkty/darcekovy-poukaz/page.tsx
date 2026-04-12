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
        <div className="max-w-3xl space-y-5">
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

          <div className="grid gap-5 md:grid-cols-2">
            <Link href={`/${lang}/produkty/legacy`} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Silný darček</p>
              <h3 className="mt-3 text-xl font-semibold text-foreground">Legacy Spomienky</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Týždenná otázka emailom pre rodiča alebo starého rodiča. Po roku vznikne kniha, ktorá ostane celej rodine.
              </p>
              <div className="mt-5 text-sm font-medium text-primary">Otvoriť Legacy →</div>
            </Link>

            <Link href={`/${lang}/produkty/karticky`} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Offline darček</p>
              <h3 className="mt-3 text-xl font-semibold text-foreground">Kartičky DeepTalks</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Fyzické aj online kartičky pre páry, rodiny a ďalšie vetvy. Dobrá voľba, ak chceš darovať rozhovor hneď teraz.
              </p>
              <div className="mt-5 text-sm font-medium text-primary">Pozrieť kartičky →</div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
