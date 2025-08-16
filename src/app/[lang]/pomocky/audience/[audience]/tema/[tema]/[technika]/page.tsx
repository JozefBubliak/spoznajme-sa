// PATH: src/app/[lang]/pomocky/audience/[audience]/tema/[tema]/[technika]/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; audience: string; tema: string; technika: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw, tema, technika } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: `${technika}`,
    description: 'Alias s publikom; canonical smeruje na kanonickú cestu.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${tema}/${technika}`,
      languages: buildHreflangAlternates(`/pomocky/${tema}/${technika}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw, audience, tema, technika } = await params
  const lang = normalizeUrlLocale(raw)
  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/pomocky`, label: 'Pomôcky' },
          { href: `/${lang}/pomocky/${audience}`, label: audience },
          { href: `/${lang}/pomocky/${tema}`, label: tema },
          { label: technika },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">{technika}</h1>
      <p className="text-muted-foreground mt-2">
        Alias stránky – obsah zdieľaný, canonical nastavený na kanonickú URL.
      </p>
    </Container>
  )
}
