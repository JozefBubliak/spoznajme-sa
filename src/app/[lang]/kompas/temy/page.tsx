import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { KOMPAS_OVERVIEW_GROUPS, KOMPAS_THEMES } from '@/lib/kompas-content'

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/kompas`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Kompas
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Globálny prehľad tém
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Kompas nie je jedna stránka. Je to mapa situácií, tém a publík, kde sa ľudia najčastejšie zaseknú.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Táto stránka prekladá podpornú dokumentáciu do reálnej navigácie: od veľkých obsahových okruhov až po konkrétne
                témy a živé vetvy Kompasu.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
                <div className="text-2xl font-bold text-foreground">7</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">globálnych okruhov z dokumentácie</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
                <div className="text-2xl font-bold text-foreground">10</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">kanonických tém Kompasu s detailom</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
                <div className="text-2xl font-bold text-foreground">6</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">publík, na ktoré sa dá ďalej prekliknúť</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Obsahové okruhy</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Najprv si vyber, v akom svete sa problém deje.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {KOMPAS_OVERVIEW_GROUPS.map((group) => (
                <div key={group.slug} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-2xl font-semibold text-foreground">{group.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                  <div className="mt-5 space-y-2">
                    {group.samples.map((sample) => (
                      <div
                        key={sample}
                        className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground"
                      >
                        {sample}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${lang}${link.href}`}
                        className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kanonické témy</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Potom choď do presnej tematickej vrstvy.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {KOMPAS_THEMES.map((theme) => (
                <Link
                  key={theme.slug}
                  href={`/${lang}/kompas/tema/${theme.slug}`}
                  className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="text-xl font-semibold text-foreground">{theme.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{theme.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {theme.audienceSlugs.length} publiká
                  </p>
                  <div className="mt-5 text-sm font-medium text-primary">Otvoriť detail témy →</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
