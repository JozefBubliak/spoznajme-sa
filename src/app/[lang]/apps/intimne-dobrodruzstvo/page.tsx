import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { adventureAccess } from '@/lib/adventure-access'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Intímne dobrodružstvo | DeepTalks', robots: { index: false, follow: false, nocache: true } }

export default async function AdventurePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const access = await adventureAccess()
  if (access === 'anonymous') redirect(`/auth/login?next=${encodeURIComponent(`/${lang}/apps/intimne-dobrodruzstvo`)}`)
  if (access !== 'owner') notFound()
  return <iframe title="Intímne dobrodružstvo" src="/intimne-dobrodruzstvo/" className="fixed inset-0 z-[100] h-dvh w-full border-0 bg-[#151110]" />
}
