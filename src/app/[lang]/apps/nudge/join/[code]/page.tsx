import { redirect, notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { getSession } from '@/app/api/games/_session'
import { NudgeJoin } from './NudgeJoin'

type P = { params: Promise<{ lang: string; code: string }> }

export const metadata = { title: 'Pripojiť sa k páru | DeepTalks' }

export default async function NudgeJoinPage({ params }: P) {
  const { lang: raw, code } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const session = await getSession()

  if (!session?.user) {
    const next = encodeURIComponent(`/${lang}/apps/nudge/join/${code}`)
    redirect(`/auth?next=${next}`)
  }

  return <NudgeJoin lang={lang} code={code.toUpperCase()} userId={session.user.id} />
}
