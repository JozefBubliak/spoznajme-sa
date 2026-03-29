import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'
import { SpontankaCard } from '@/components/spontanky/SpontankaCard'
import type { SpontankaWithStats } from '@/lib/spontanky/types'

type P = { params: Promise<{ lang: string }> }

async function getSpontanky(): Promise<SpontankaWithStats[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/spontanky?limit=30`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.spontanky ?? []
  } catch {
    return []
  }
}

export default async function SpontankyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const spontanky = await getSpontanky()
  const upcoming = spontanky.filter(s => new Date(s.datum) >= new Date(new Date().setHours(0, 0, 0, 0)))
  const past = spontanky.filter(s => new Date(s.datum) < new Date(new Date().setHours(0, 0, 0, 0)))

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/komunita`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Komunita
          </Link>
          <div className="text-4xl">🌿</div>
          <h1 className="text-4xl font-bold text-foreground">Spontánky</h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Malé, neformálne, lokálne stretnutia. Žiadny organizátor, žiadne vstupné.
            Len ľudia, miesto a čas — <em>"My tam ideme, pridajte sa ak chcete."</em>
          </p>
          <Link href={`/${lang}/komunita/spontanky/vytvorit`}>
            <span className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              + Vytvoriť spontánku
            </span>
          </Link>
        </div>
      </section>

      <Container>
        {upcoming.length === 0 && past.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center space-y-3">
            <div className="text-4xl">🌱</div>
            <p className="font-medium text-foreground">V okolí zatiaľ žiadna spontánka</p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Budeš prvý? Vytvorenie trvá 2 minúty.
            </p>
            <Link href={`/${lang}/komunita/spontanky/vytvorit`}>
              <span className="inline-block mt-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Vytvoriť spontánku
              </span>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {upcoming.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Nadchádzajúce</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcoming.map(sp => (
                    <SpontankaCard key={sp.id} sp={sp} lang={lang} />
                  ))}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Prebehlo</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {past.map(sp => (
                    <SpontankaCard key={sp.id} sp={sp} lang={lang} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-dashed p-6 text-center space-y-2 text-sm text-muted-foreground">
          <p>Spontánky sú neformálne stretnutia. Každý koná za seba a zodpovedá za seba a svoje deti.</p>
        </div>
      </Container>
    </div>
  )
}
