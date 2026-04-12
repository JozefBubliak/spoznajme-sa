import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const eventTypes = [
  {
    title: 'Circle sessions',
    description: 'Menšie vedené stretnutia, kde ľudia nejdú po výkone, ale po skutočnom počutí a prepojení.',
  },
  {
    title: 'Pop-up večery a mestské formáty',
    description: 'Otázky na stole, ľudia pri stole a atmosféra, kde sa dá hovoriť aj s niekým novým.',
  },
  {
    title: 'Spontánky a komunitné výjazdy',
    description: 'Opekačky, výlety, menšie stretnutia a formáty, kde digitál len pomáha dostať ľudí do reality.',
  },
]

export default async function KomunitaAkciePage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.13),transparent_58%)] px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <Link href={`/${lang}/komunita`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Komunita
          </Link>
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Akcie a eventy
            </span>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              DeepTalks nie je len web. Je to aj priestor, kde sa dá stretnúť naživo.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Digitál má v DeepTalks len pomôcť ľuďom dostať sa bližšie k sebe. Akcie, circle sessions a spontánne stretnutia
              sú miesto, kde sa z otázok stáva realita.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/komunita/spontanky`}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Pozrieť Spontánky
            </Link>
            <Link
              href={`/${lang}/komunita/organizuj`}
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
            >
              Chcem organizovať
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="grid gap-5 md:grid-cols-3">
            {eventTypes.map((item) => (
              <article key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako to môže vyzerať</p>
              <div className="mt-6 space-y-4">
                {[
                  'Tematický večer pre páry alebo priateľov',
                  'Komunitný stôl s kartičkami a open seating formátom',
                  'Mestský pop-up s otázkou dňa a jemným onboardingom do komunity',
                  'Výlet, opekačka alebo malé lokálne stretnutie organizované cez Spontánky',
                ].map((item, index) => (
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
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Aktuálny stav</p>
              <div className="mt-5 rounded-2xl border border-dashed border-border/70 bg-background/70 p-5">
                <p className="text-lg font-semibold text-foreground">Kalendár eventov ešte len skladáme.</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Kým spustíme plný kalendár, najživšou vetvou sú Spontánky a organizovanie lokálnych stretnutí. Tam už je
                  možné vytvárať, zdieľať a spravovať reálne akcie.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/${lang}/komunita/spontanky`}
                    className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Ísť do Spontánok
                  </Link>
                  <Link
                    href={`/${lang}/komunita/organizuj`}
                    className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                  >
                    Organizovať stretnutie
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
