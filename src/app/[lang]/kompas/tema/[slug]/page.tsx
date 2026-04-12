import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import {
  KOMPAS_AUDIENCES,
  getKompasThemeBySlug,
  getKompasThemeItems,
} from '@/lib/kompas-content'

type P = { params: Promise<{ lang: string; slug: string }> }

export default async function Page({ params }: P) {
  const { lang: raw, slug } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const theme = getKompasThemeBySlug(slug)
  if (!theme) notFound()

  const audienceCards = KOMPAS_AUDIENCES.filter((audience) =>
    theme.audienceSlugs.includes(audience.slug)
  )
  const liveItems = getKompasThemeItems(slug)

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_56%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/kompas/temy`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Všetky témy
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Detail témy
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {theme.label}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {theme.description}
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                {theme.lead}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/kompas`}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Otvoriť Kompas
              </Link>
              {theme.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${lang}${link.href}`}
                  className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kedy sa hodí</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Typické vstupy, ktoré táto téma zachytáva.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {theme.featuredSituations.map((item) => (
                <div key={item} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <p className="text-base leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Publiká</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Táto téma žije v rôznych typoch vzťahov, len s iným kontextom.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {audienceCards.map((audience) => (
                <Link
                  key={audience.slug}
                  href={`/${lang}${audience.canonicalHref}`}
                  className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{audience.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{audience.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
                  <div className="mt-5 text-sm font-medium text-primary">Otvoriť vetvu →</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Živé ukážky z dát</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                {liveItems.length > 0
                  ? 'Téma už má v projekte konkrétne situácie a vety.'
                  : 'Mapovanie je pripravené, no detailné ukážky do tejto témy ešte dopĺňame.'}
              </h2>
              {liveItems.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {liveItems.slice(0, 4).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.group}</p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">{item.subtopic}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground">{item.situation}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.firstLine ?? 'Konkrétne vety budú doplnené v ďalšej iterácii.'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Zatiaľ sme tu spravili tematický detail, prekliky na publiká a ďalšie produktové vstupy, aby stránka nebola slepá.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kam ďalej</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Vyber si ďalší typ vstupu podľa toho, čo človek potrebuje spraviť hneď teraz.</h2>
              <div className="mt-6 space-y-3">
                <Link
                  href={`/${lang}/kompas`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Interaktívny prehliadač Kompasu</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/kompas/temy`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Všetky témy a publikum</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/apps/spoznajme-sa`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Online kartičky ako mäkší vstup</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
