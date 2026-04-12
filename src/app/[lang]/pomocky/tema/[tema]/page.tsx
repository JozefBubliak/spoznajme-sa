import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { getToolFrontmatters, getTopicFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'
import { KOMPAS_AUDIENCES, getKompasThemeBySlug } from '@/lib/kompas-content'

type P = { params: Promise<{ lang: string; tema: string }> }

function prettifySlug(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toLocaleUpperCase() + part.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw, tema } = await params
  const lang = normalizeUrlLocale(raw)
  const topic = getTopicFrontmatter(lang, tema)
  const kompasTheme = getKompasThemeBySlug(tema)
  const title = String(topic?.seoTitle ?? topic?.title ?? kompasTheme?.label ?? prettifySlug(tema))
  const description = String(
    topic?.seoDescription ??
      topic?.description ??
      kompasTheme?.description ??
      'Praktický prehľad témy, súvisiacich publík a dostupných komunikačných techník.'
  )

  return {
    title,
    description,
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/tema/${tema}`,
      languages: buildHreflangAlternates(`/pomocky/tema/${tema}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw, tema } = await params
  const lang = normalizeUrlLocale(raw)
  const topic = getTopicFrontmatter(lang, tema)
  const kompasTheme = getKompasThemeBySlug(tema)
  const tools = getToolFrontmatters(lang, tema)
  const audienceCards = kompasTheme
    ? KOMPAS_AUDIENCES.filter((audience) => kompasTheme.audienceSlugs.includes(audience.slug))
    : []

  const title = String(topic?.title ?? kompasTheme?.label ?? prettifySlug(tema))
  const description = String(
    topic?.description ??
      kompasTheme?.description ??
      'Táto téma zhromažďuje komunikačné vstupy, odkazy na publikum a odporúčané ďalšie kroky.'
  )

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Breadcrumbs
              items={[
                { href: `/${lang}`, label: 'Domov' },
                { href: `/${lang}/pomocky`, label: 'Pomôcky' },
                { label: title },
              ]}
            />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Detail témy
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              {kompasTheme?.lead ? (
                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {kompasTheme.lead}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/pomocky`}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Späť na pomôcky
              </Link>
              <Link
                href={`/${lang}/kompas/tema/${kompasTheme?.slug ?? tema}`}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Otvoriť v Kompase
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Dostupné techniky
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                {tools.length > 0
                  ? 'V tejto téme už existujú konkrétne pomôcky.'
                  : 'Téma má pripravené mapovanie aj bez samostatnej techniky.'}
              </h2>
              {tools.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {tools.map((tool) => (
                    <Link
                      key={`${tool.topicSlug}-${String(tool.slug)}`}
                      href={`/${lang}/pomocky/tema/${tool.topicSlug}/${tool.slug}`}
                      className="block rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/30 hover:text-primary"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-foreground">{String(tool.title)}</h3>
                        {tool.tool_id ? (
                          <span className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                            {String(tool.tool_id)}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {String(tool.summary ?? '')}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Stránka stále dáva zmysel: drží pohromade kontext, publiká a odkazy na ďalšie
                  živé vetvy, kým sa rozšíria jednotlivé techniky.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Kam ďalej
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href={`/${lang}/kompas`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Interaktívny Kompas</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/apps/spoznajme-sa`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Online kartičky</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/vekove-mapy`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Vekové mapy</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>

          {audienceCards.length > 0 ? (
            <section className="space-y-5">
              <div className="max-w-3xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Publikum
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Tá istá téma vyzerá inak podľa toho, kde sa odohráva.
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {audienceCards.map((audience) => (
                  <Link
                    key={audience.slug}
                    href={`/${lang}${audience.canonicalHref}`}
                    className="rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {audience.eyebrow}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-foreground">{audience.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {audience.description}
                    </p>
                    <div className="mt-5 text-sm font-medium text-primary">Otvoriť vetvu →</div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
