import type { Metadata } from 'next'
import { MarketingHeader } from '@/components/MarketingHeader'
import { MarketingFooter } from '@/components/MarketingFooter'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: 'DeepTalks – Pomôcky a techniky',
    description: 'Hub komunikačných pomôcok pre rôzne publikum a témy.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}`,
      languages: buildHreflangAlternates(''),
    },
  }
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
