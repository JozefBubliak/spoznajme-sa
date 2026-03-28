// Shared skupiny page template
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

export type SkupinaConfig = {
  emoji: string
  label: string
  desc: string
  sections: { title: string; items: string[] }[]
  tools: { label: string; href: string }[]
}

export async function SkupinaPage({
  params,
  config,
}: {
  params: Promise<{ lang: string }>
  config: SkupinaConfig
}) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Skupiny
          </Link>
          <div className="text-4xl">{config.emoji}</div>
          <h1 className="text-4xl font-bold text-foreground">{config.label}</h1>
          <p className="text-lg text-muted-foreground max-w-xl">{config.desc}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {config.tools.map(t => (
              <Link
                key={t.href}
                href={t.href.startsWith('/') ? t.href : `/${lang}${t.href}`}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Container>
        <div className="grid md:grid-cols-2 gap-6 py-4">
          {config.sections.map(sec => (
            <div key={sec.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-semibold text-foreground mb-4">{sec.title}</h2>
              <ul className="space-y-2">
                {sec.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
