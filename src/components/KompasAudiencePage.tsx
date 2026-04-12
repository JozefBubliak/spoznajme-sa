import Link from 'next/link'
import Kompas from '@/components/Kompas'
import { Container } from '@/components/Container'
import {
  type KompasAudienceContent,
  getKompasAudienceItems,
  getAudienceTopics,
  getKompasThemeBySlug,
} from '@/lib/kompas-content'

type Props = {
  audience: KompasAudienceContent
  lang: string
}

export function KompasAudiencePage({ audience, lang }: Props) {
  const items = getKompasAudienceItems(audience.slug)
  const liveItems = items.filter((item) => item.phrases.length > 0)
  const topics = getAudienceTopics(items)

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_56%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/kompas`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Kompas
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {audience.eyebrow}
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Kompas pre {audience.label.toLocaleLowerCase()}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {audience.description}
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                {audience.lead}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/kompas/temy`}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Všetky témy Kompasu
              </Link>
              {audience.relatedLinks.slice(0, 2).map((link) => (
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
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Najčastejšie vstupy</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Situácie, na ktoré tento kompas mieri ako prvé.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {audience.featuredSituations.map((item) => (
                <div key={item} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <p className="text-base leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Tematické vetvy</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Obsah je rozdelený tak, aby si vedel ísť od situácie k presnejšiemu jazyku.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {audience.themeSlugs.map((slug) => {
                const theme = getKompasThemeBySlug(slug)
                if (!theme) {
                  return null
                }

                return (
                  <Link
                    key={slug}
                    href={`/${lang}/kompas/tema/${theme.slug}`}
                    className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <h3 className="text-xl font-semibold text-foreground">{theme.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{theme.description}</p>
                    <div className="mt-5 text-sm font-medium text-primary">Otvoriť tému →</div>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Živý prehliadač</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                {liveItems.length > 0
                  ? 'Máš k dispozícii konkrétne situácie aj ukážkové vety.'
                  : 'Mapovanie je pripravené, detailné frázy do tejto vetvy ešte dopĺňame.'}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {liveItems.length > 0
                  ? `Aktuálne tu nájdeš ${liveItems.length} spracovaných situácií v ${topics.length} témach.`
                  : 'Zatiaľ je pripravený tematický rámec a prekliky na súvisiace vetvy. Ďalšie frázy budeme dopĺňať bez toho, aby sa rozbil mapping.'}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Súvisiace cesty</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Kompas je len jedna vstupná brána.</h2>
              <div className="mt-6 space-y-3">
                {audience.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${lang}${link.href}`}
                    className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                  >
                    <span>{link.label}</span>
                    <span>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>

      {liveItems.length > 0 ? (
        <div className="border-t border-border/60">
          <Kompas defaultGroup={audience.group} hideHero lockGroup />
        </div>
      ) : null}
    </div>
  )
}
