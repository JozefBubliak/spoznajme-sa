// PATH: src/app/[lang]/page.tsx
import type { Metadata } from 'next'
import { normalizeUrlLocale, buildHreflangAlternates } from '@/lib/i18n-routing'
import { SUPPORTED_LANGUAGES } from '@/lib/languages'
import MarketingHomePage from '@/components/MarketingHomePage'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)

  const title =
    lang === 'sk'
      ? 'DeepTalks – praktická komunikácia pre rodiny a páry'
      : 'DeepTalks – practical communication for families and couples'

  const description =
    lang === 'sk'
      ? 'Krátke vety, minipostupy a nástroje na lepšie rozhovory. Pre rodičov, páry a učiteľov.'
      : 'Short phrases, mini-playbooks and tools for better conversations. For parents, couples and educators.'

  return {
    title,
    description,
    alternates: {
      canonical: `https://deeptalks.eu/${lang}`,
      languages: buildHreflangAlternates('/'),
    },
  }
}

// (voliteľné) predgenerovanie jazykových verzií
export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export default async function Page({ params }: P) {
  await params
  return <MarketingHomePage />
}

