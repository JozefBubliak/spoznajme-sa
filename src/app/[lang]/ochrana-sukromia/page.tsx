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
    title: sk ? 'Ochrana súkromia – DeepTalks' : 'Privacy – DeepTalks',
    description: sk
      ? 'Ako DeepTalks spracúva osobné údaje.'
      : 'How DeepTalks handles personal data.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/ochrana-sukromia`,
      languages: buildHreflangAlternates('/ochrana-sukromia'),
    },
  }
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export default async function PrivacyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const sk = lang === 'sk'

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 space-y-6">
      <h1 className="text-3xl font-semibold">
        {sk ? 'Ochrana súkromia' : 'Privacy'}
      </h1>
      <p className="text-muted-foreground">
        {sk
          ? 'Pripravujeme úplné znenie zásad ochrany osobných údajov. Dovtedy nás v prípade otázok kontaktuj na '
          : 'The full privacy policy is in preparation. In the meantime, reach us at '}
        <a className="underline" href="mailto:hello@deeptalks.eu">hello@deeptalks.eu</a>.
      </p>
    </main>
  )
}
