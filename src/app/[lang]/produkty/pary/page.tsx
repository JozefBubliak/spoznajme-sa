// PATH: src/app/[lang]/produkty/pary/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: 'Produkty – Páry',
    description: 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/produkty/pary`,
      languages: buildHreflangAlternates('/produkty/pary'),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/produkty`, label: 'Produkty' },
          { label: 'Páry' },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">Produkty – Páry</h1>
      <p className="text-muted-foreground mt-2">Čoskoro.</p>
    </Container>
  )
}
