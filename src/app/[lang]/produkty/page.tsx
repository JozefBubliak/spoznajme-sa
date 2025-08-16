// PATH: src/app/[lang]/produkty/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = normalizeUrlLocale(rawLang)
  return {
    title: 'Produkty',
    description: 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/produkty`,
      languages: buildHreflangAlternates('/produkty'),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: rawLang } = await params
  const lang = normalizeUrlLocale(rawLang)
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Produkty' }]} />
      <h1 className="text-3xl font-semibold mt-4">Produkty</h1>
      <p className="text-muted-foreground mt-2">Čoskoro.</p>
    </Container>
  )
}
