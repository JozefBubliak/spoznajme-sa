import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import Client from './Client'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'CoupleSync – vzťahový dotazník | DeepTalks',
  description:
    'Partnerský dotazník, ktorý vám pomôže zosúladiť očakávania aj túžby. Vyplňte ho každý zvlášť a porovnajte výsledky.',
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const dict = await getDictionary(lang as Locale)
  return <Client dict={dict} lang={lang} />
}

