import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import ExplorerClient from '@/app/[lang]/apps/herd-vote/kategorie/ExplorerClient'

type P = { params: Promise<{ lang: string }> }
export const dynamic = 'force-dynamic'

export default async function HerdVoteHubCategoriesPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  return <ExplorerClient lang={lang} />
}
