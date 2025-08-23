// PATH: src/app/[lang]/pomocky/tema/[tema]/[technika]/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getToolFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; tema: string; technika: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw, tema, technika } = await params
  const lang = normalizeUrlLocale(raw)
  const fm = getToolFrontmatter(lang, tema, technika)
  const title =
    typeof fm?.seoTitle === 'string'
      ? fm.seoTitle
      : typeof fm?.title === 'string'
        ? fm.title
        : technika
  const description =
    typeof fm?.seoDescription === 'string'
      ? fm.seoDescription
      : typeof fm?.summary === 'string'
        ? fm.summary
        : 'Čoskoro.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${tema}/${technika}`,
      languages: buildHreflangAlternates(`/pomocky/${tema}/${technika}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw, tema, technika } = await params
  const lang = normalizeUrlLocale(raw)
  const fm = getToolFrontmatter(lang, tema, technika)
  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/pomocky`, label: 'Pomôcky' },
          { href: `/${lang}/pomocky/${tema}`, label: tema },
          { label: fm?.title || technika },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">{fm?.title || technika}</h1>
      <p className="text-muted-foreground mt-2">{fm?.summary || 'Čoskoro.'}</p>
    </Container>
  )
}
