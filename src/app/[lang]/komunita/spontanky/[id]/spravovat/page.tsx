import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { OrganizerDashboard } from '@/components/spontanky/OrganizerDashboard'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import type { SpontankaDetail } from '@/lib/spontanky/types'

type P = { params: Promise<{ lang: string; id: string }> }

async function getSpontankaDetail(id: string): Promise<SpontankaDetail | null> {
  try {
    const db = supabaseServer()
    const [spRes, ucastniciRes, prinesRes, chatRes] = await Promise.all([
      db.from('spontanky').select('*').eq('id', id).single(),
      db.from('spontanka_ucastnici').select('*').eq('spontanka_id', id).order('created_at'),
      db.from('spontanka_prinesiem').select('*').eq('spontanka_id', id).order('order_index'),
      db.from('spontanka_chat').select('*').eq('spontanka_id', id).order('created_at').limit(50),
    ])
    if (spRes.error || !spRes.data) return null
    const ucastnici = ucastniciRes.data ?? []
    return {
      ...spRes.data,
      ucastnici,
      prinesiem: prinesRes.data ?? [],
      chat: chatRes.data ?? [],
      stats: {
        pridem: ucastnici.filter((u: any) => u.status === 'pridem').length,
        mozno: ucastnici.filter((u: any) => u.status === 'mozno').length,
        celkom: ucastnici.filter((u: any) => u.status !== 'nepridem').length,
      },
    } as SpontankaDetail
  } catch {
    return null
  }
}

export default async function SpravovatPage({ params }: P) {
  const { lang: raw, id } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const session = await getSession()
  if (!session) redirect(`/${lang}/login?next=/${lang}/komunita/spontanky/${id}/spravovat`)

  const data = await getSpontankaDetail(id)
  if (!data) notFound()

  if (data.creator_id !== session.user.id) {
    redirect(`/${lang}/komunita/spontanky/${id}`)
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://deeptalks.eu'}/${lang}/komunita/spontanky/${id}`

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-1">
          <Link href={`/${lang}/komunita/spontanky/${id}`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Spontánka
          </Link>
          <h1 className="text-xl font-bold text-foreground">Správa spontánky</h1>
          <p className="text-sm text-muted-foreground">{data.nazov}</p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <OrganizerDashboard initial={data} lang={lang} baseUrl={baseUrl} />
      </div>
    </div>
  )
}
