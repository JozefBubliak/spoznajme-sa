// PATH: src/app/api/games/route.ts
// Create game: POST /api/games  ->  { gameCode }
//
// Each call mints a FRESH random code and its own herd_games row. The old
// `ensure_room` RPC handed every moderator one permanent code, so every game
// they ever hosted reused the same code — stale QR links from a previous event
// dropped players straight into the next one, and "my active games" always
// showed a phantom room. A new code per game fixes both.

import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { ensureActiveRun } from './[code]/_runs'
import { resetGameArtifacts } from './[code]/_reset'

export const dynamic = 'force-dynamic'

// No 0/O/1/I/L — unambiguous when read off a screen or dictated aloud.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

function randomCode(len = 6) {
  let out = ''
  for (let i = 0; i < len; i++) out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  return out
}

async function mintUniqueCode(admin: ReturnType<typeof supabaseServer>) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = randomCode()
    const { data, error } = await admin
      .from('herd_games')
      .select('code')
      .eq('code', code)
      .maybeSingle()
    if (error) throw error
    if (!data) return code
  }
  throw new Error('Could not allocate a free game code')
}

export async function POST(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminClient = supabaseServer() // service role — bypasses RLS for table writes

  let code: string
  try {
    code = await mintUniqueCode(adminClient)
  } catch (err) {
    console.error('[POST /api/games] code allocation failed:', err)
    return NextResponse.json({ error: 'Failed to allocate game code' }, { status: 500 })
  }

  const { error: insertError } = await adminClient
    .from('herd_games')
    .insert({
      code,
      owner_id: session.user.id,
      phase: 'lobby',
      total_rounds: 0,
      active_round_index: 0,
      lobby_locked: false,
    })

  if (insertError) {
    console.error('[POST /api/games] herd_games insert failed:', insertError.code, insertError.message, '| code:', code)
    return NextResponse.json({ error: `Failed to save game: ${insertError.message}` }, { status: 500 })
  }

  try {
    await ensureActiveRun(adminClient, code, session.user.id)
  } catch (err) {
    console.error('[POST /api/games] ensureActiveRun failed:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to initialise run' }, { status: 500 })
  }

  // Brand-new code, so nothing to clear — but keep it for parity / safety.
  try {
    await resetGameArtifacts(adminClient, code)
  } catch (err) {
    console.error('[POST /api/games] resetGameArtifacts failed:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to reset game data' }, { status: 500 })
  }

  return NextResponse.json({ gameCode: code })
}
