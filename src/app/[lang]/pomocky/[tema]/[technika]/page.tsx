import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getToolFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string; tema: string; technika: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  const fm = getToolFrontmatter(lang, params.tema, params.technika)
  const title = fm?.seoTitle || fm?.title || params.technika
  const description = fm?.seoDescription || fm?.summary || 'Čoskoro.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${params.tema}/${params.technika}`,
      languages: buildHreflangAlternates(`/pomocky/${params.tema}/${params.technika}`),
    },
  }
}

export default function Page({ params }: { params: { lang: string; tema: string; technika: string } }) {
  const { lang, tema, technika } = params
  const fm = getToolFrontmatter(lang, tema, technika)
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { href: `/${lang}/pomocky`, label: 'Pomôcky' }, { href: `/${lang}/pomocky/${tema}`, label: tema }, { label: fm?.title || technika }]} />
      <h1 className="text-3xl font-semibold mt-4">{fm?.title || technika}</h1>
      <p className="text-muted-foreground mt-2">{fm?.summary || 'Čoskoro.'}</p>
    </Container>
  )
}
