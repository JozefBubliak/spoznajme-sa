// PATH: src/app/[lang]/produkty/rodic-dieta/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: 'Produkty – Rodič–dieťa',
    description: 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/produkty/rodic-dieta`,
      languages: buildHreflangAlternates('/produkty/rodic-dieta'),
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
          { label: 'Rodič–dieťa' },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">Produkty – Rodič–dieťa</h1>
      <p className="text-muted-foreground mt-2">Čoskoro.</p>
    </Container>
  )
}
