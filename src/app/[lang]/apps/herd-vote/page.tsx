import { redirect } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export default async function HerdVoteOldPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  redirect(`/${lang}/herd-vote`)
}
