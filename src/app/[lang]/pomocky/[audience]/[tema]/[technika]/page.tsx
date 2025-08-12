import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string; audience: string; tema: string; technika: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: `${params.technika}`,
    description: 'Alias s publikom; canonical smeruje na kanonickú cestu.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${params.tema}/${params.technika}`,
      languages: buildHreflangAlternates(`/pomocky/${params.tema}/${params.technika}`),
    },
  }
}

export default function Page({ params }: { params: { lang: string; audience: string; tema: string; technika: string } }) {
  const { lang, audience, tema, technika } = params
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { href: `/${lang}/pomocky`, label: 'Pomôcky' }, { href: `/${lang}/pomocky/${audience}`, label: audience }, { href: `/${lang}/pomocky/${tema}`, label: tema }, { label: technika }]} />
      <h1 className="text-3xl font-semibold mt-4">{technika}</h1>
      <p className="text-muted-foreground mt-2">Alias stránky – obsah zdieľaný, canonical nastavený na kanonickú URL.</p>
    </Container>
  )
}
