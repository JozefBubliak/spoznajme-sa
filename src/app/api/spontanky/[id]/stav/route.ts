import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const Schema = z.object({
  stav: z.enum(['aktivna', 'pozastavena', 'zrusena', 'ukoncena']),
  dovod_zrusenia: z.string().max(500).optional(),
  notif_text: z.string().max(500).optional(), // auto notification message
})

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = supabaseServer()
  const { data: sp } = await db.from('spontanky').select('creator_id, stav, nazov').eq('id', id).single()
  if (!sp) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (sp.creator_id !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json().catch(() => null)
  const parsed = Schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const { stav, dovod_zrusenia, notif_text } = parsed.data

  const { error } = await db
    .from('spontanky')
    .update({
      stav,
      dovod_zrusenia: dovod_zrusenia ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Post system notification to chat
  const systemMessages: Record<string, string> = {
    pozastavena: `⏸ Organizátor pozastavil spontánku. Sledujte aktualizácie v chate.`,
    zrusena: dovod_zrusenia
      ? `❌ Spontánka bola zrušená. Dôvod: ${dovod_zrusenia}`
      : `❌ Spontánka bola zrušená organizátorom.`,
    aktivna: `▶️ Spontánka je opäť aktívna!`,
    ukoncena: `✅ Spontánka sa skončila. Ďakujeme všetkým za účasť!`,
  }

  const msg = notif_text || systemMessages[stav]
  if (msg) {
    await db.from('spontanka_chat').insert({
      spontanka_id: id,
      participant_id: 'system',
      meno: 'Organizátor',
      text: msg,
      pinned: false,
    })
  }

  return NextResponse.json({ ok: true })
}
