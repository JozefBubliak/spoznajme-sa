import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const focusAreas = [
  {
    title: 'Ranný kruh a triedna kultúra',
    description: 'Krátke otázky, ktoré pomáhajú deťom hovoriť, počúvať a cítiť sa v triede bezpečnejšie.',
  },
  {
    title: 'Prevencia šikany a vylúčenia',
    description: 'Nie moralizovanie, ale citlivé otváranie tém ako prijatie, hranice a rešpekt.',
  },
  {
    title: 'Metodika pre učiteľov a psychológov',
    description: 'Aby nástroj neostal len peknou aktivitou, ale mal jasný účel, rytmus a bezpečné hranice.',
  },
]

const schoolTools = [
  'Kartičky pre triedu a menšie skupiny',
  'Herd Vote vo verzii pre školu alebo triedny kolektív',
  'Licencia a metodika pre školu',
  'Podpora pre učiteľov, školských psychológov a rodičovské stretnutia',
]

export default async function SkolaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.13),transparent_58%)] px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Skupiny
          </Link>
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Škola
            </span>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Škola ako miesto, kde sa deti neučia len učivo, ale aj hovoriť, počúvať a byť spolu.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              DeepTalks pre školy je nástroj pre triedy, učiteľov a školských psychológov. Pomáha vytvárať bezpečnejšiu
              triednu kultúru bez toho, aby to pôsobilo ako ďalšia formálna povinnosť.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/b2b/skoly`}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Pre školy a metodiku
            </Link>
            <Link
              href={`/${lang}/apps/herd-vote`}
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
            >
              Herd Vote pre triedu
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="grid gap-5 md:grid-cols-3">
            {focusAreas.map((item) => (
              <article key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Použitie v škole</p>
              <div className="mt-6 space-y-4">
                {schoolTools.map((item, index) => (
                  <div key={item} className="grid gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 sm:grid-cols-[44px_1fr]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ukážky otázok</p>
              <div className="mt-5 space-y-4">
                {[
                  '„V akej situácii sa ti v triede najľahšie ozýva?“',
                  '„Čo by ti pomohlo cítiť sa medzi spolužiakmi bezpečnejšie?“',
                  '„Ako spoznáš, že niekto v triede zostáva bokom?“',
                ].map((prompt) => (
                  <div key={prompt} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-relaxed text-foreground">
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
