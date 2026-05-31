import { notFound } from 'next/navigation'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import NezabudniClient from './NezabudniClient'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'Nezabudni na ňu | DeepTalks',
  description:
    'Súkromný partnerský zápisník pre malé gestá, dôležité dátumy, darčekové poznámky a rande.',
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return <NezabudniClient lang={lang as Locale} />
}
