// PATH: src/app/[lang]/vekove-mapy/[range]/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getAgeMapFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; range: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: rawLang, range } = await params
  const lang = normalizeUrlLocale(rawLang)
  const fm = getAgeMapFrontmatter(lang, range)
  return {
    title: fm?.title || `Veková mapa – ${range}`,
    description: fm?.seoDescription || 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/vekove-mapy/${range}`,
      languages: buildHreflangAlternates(`/vekove-mapy/${range}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: rawLang, range } = await params
  const lang = normalizeUrlLocale(rawLang)
  const fm = getAgeMapFrontmatter(lang, range)
  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { label: 'Vekové mapy' },
          { label: range },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">{fm?.title || `Veková mapa ${range}`}</h1>
      <p className="text-muted-foreground mt-2">{fm?.description || 'Čoskoro.'}</p>
    </Container>
  )
}
