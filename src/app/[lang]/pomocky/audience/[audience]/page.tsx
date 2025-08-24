// PATH: src/app/[lang]/pomocky/audience/[audience]/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; audience: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw, audience } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: `Pomôcky – ${audience}`,
    description: 'Čoskoro: hub pre publikum.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${audience}`,
      languages: buildHreflangAlternates(`/pomocky/${audience}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw, audience } = await params
  const lang = normalizeUrlLocale(raw)
  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/pomocky`, label: 'Pomôcky' },
          { label: audience },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">Pomôcky – {audience}</h1>
      <p className="text-muted-foreground mt-2">Čoskoro.</p>
    </Container>
  )
}
