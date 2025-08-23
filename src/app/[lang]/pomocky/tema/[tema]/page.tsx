// PATH: src/app/[lang]/pomocky/tema/[tema]/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getTopicFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; tema: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw, tema } = await params
  const lang = normalizeUrlLocale(raw)
  const fm = getTopicFrontmatter(lang, tema)
  const rawTitle = fm?.seoTitle ?? fm?.title
  const title = typeof rawTitle === 'string' ? rawTitle : `Pomôcky – ${tema}`
  const description =
    typeof fm?.seoDescription === 'string' ? fm.seoDescription : 'Čoskoro.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${tema}`,
      languages: buildHreflangAlternates(`/pomocky/${tema}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw, tema } = await params
  const lang = normalizeUrlLocale(raw)
  const fm = getTopicFrontmatter(lang, tema)
  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/pomocky`, label: 'Pomôcky' },
          { label: fm?.title || tema },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">{fm?.title || tema}</h1>
      <p className="text-muted-foreground mt-2">{fm?.description || 'Čoskoro.'}</p>
    </Container>
  )
}
