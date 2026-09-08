import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale, buildHreflangAlternates } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const sk = lang === 'sk'
  return {
    title: sk ? 'Podmienky používania – DeepTalks' : 'Terms of Use – DeepTalks',
    description: sk
      ? 'Podmienky používania služby DeepTalks.'
      : 'Terms of use for DeepTalks.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/podmienky`,
      languages: buildHreflangAlternates('/podmienky'),
    },
  }
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export default async function TermsPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const sk = lang === 'sk'

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 space-y-6">
      <h1 className="text-3xl font-semibold">
        {sk ? 'Podmienky používania' : 'Terms of Use'}
      </h1>
      <p className="text-muted-foreground">
        {sk
          ? 'Pripravujeme úplné znenie podmienok používania. Dovtedy nás v prípade otázok kontaktuj na '
          : 'The full terms of use are in preparation. In the meantime, reach us at '}
        <a className="underline" href="mailto:hello@deeptalks.eu">hello@deeptalks.eu</a>.
      </p>
    </main>
  )
}
