import { notFound } from 'next/navigation'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import QuizPageClient from './Client'

// Render quiz routes dynamically to prevent stale 404s
export const dynamic = 'force-dynamic'

type P = { params: Promise<{ lang: string }> }

export default async function QuizPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return <QuizPageClient lang={lang} />
}
