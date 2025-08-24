// PATH: src/app/[lang]/pomocky/audience/[audience]/tema/[tema]/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; audience: string; tema: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw, tema } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: `Téma – ${tema}`,
    description: 'Čoskoro: alias témy s publikom.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${tema}`,
      languages: buildHreflangAlternates(`/pomocky/${tema}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw, audience, tema } = await params
  const lang = normalizeUrlLocale(raw)
  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/pomocky`, label: 'Pomôcky' },
          { href: `/${lang}/pomocky/${audience}`, label: audience },
          { label: tema },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">Téma – {tema}</h1>
      <p className="text-muted-foreground mt-2">
        Alias s kanonickou URL bez publika. Čoskoro.
      </p>
    </Container>
  )
}
