// TEMPORARY DEBUG ENDPOINT — odstráň po oprave!
// GET /api/debug-game  alebo  POST /api/debug-game

import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return handler()
}

export async function POST() {
  return handler()
}

async function handler() {
  const log: Record<string, unknown> = {}

  // ── 1. Session ────────────────────────────────────────────────────────────
  let session: Awaited<ReturnType<typeof getSession>>
  try {
    session = await getSession()
  } catch (e) {
    return NextResponse.json({ step: 'getSession', fatal: String(e), log })
  }

  log.session = session
    ? { userId: session.user.id, email: session.user.email, tokenLen: session.access_token?.length }
    : null

  if (!session) {
    return NextResponse.json({ step: 'auth', error: 'No session — nie si prihlásený', log })
  }

  // ── 2. Supabase klienty ───────────────────────────────────────────────────
  const authClient = supabaseServer(session.access_token)  // user JWT → RLS platí
  const adminClient = supabaseServer()                      // service role → bypass RLS

  // ── 3. Env premenné ───────────────────────────────────────────────────────
  log.env = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? process.env.NEXT_PUBLIC_SUPABASE_URL.slice(0, 40) + '…'
      : 'CHÝBA',
    SERVICE_KEY_SET: !!(
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
    ),
  }

  // ── 4. ensure_room RPC ────────────────────────────────────────────────────
  const { data: room, error: roomErr } = await authClient.rpc('ensure_room')
  log.ensure_room = { data: room, error: roomErr }
  if (roomErr || !room) {
    return NextResponse.json({ step: 'ensure_room', log })
  }

  // ── 5. open_lobby RPC ─────────────────────────────────────────────────────
  const { data: lobbyData, error: lobbyErr } = await authClient.rpc('open_lobby')
  log.open_lobby = { data: lobbyData, error: lobbyErr }

  // ── 6. auth.uid() test (čo vracia PostgREST pre daný token) ──────────────
  let uidRow: unknown = null
  let uidErr: unknown = null
  try {
    const res = await (authClient as any).rpc('get_auth_uid').maybeSingle()
    uidRow = res?.data ?? null
    uidErr = res?.error ?? null
  } catch {
    uidErr = { message: 'RPC get_auth_uid neexistuje (OK)' }
  }
  log.auth_uid_rpc = { data: uidRow, error: uidErr }

  // Alternatíva: priamy select auth.uid() cez SQL (ak máš rpc)
  const { data: selectUid, error: selectUidErr } = await (authClient as any)
    .from('herd_games')
    .select('owner_id')
    .limit(1)
  log.herd_games_select_auth = { data: selectUid, error: selectUidErr }

  // ── 7. INSERT test s authClient (user JWT) ────────────────────────────────
  const testCode = 'DEBUG_' + Date.now().toString(36).toUpperCase().slice(-4)
  const { data: insertAuthData, error: insertAuthErr } = await authClient
    .from('herd_games')
    .insert({
      code: testCode + '_A',
      owner_id: session.user.id,
      phase: 'lobby',
      total_rounds: 0,
      active_round_index: 0,
      lobby_locked: false,
    })
    .select('code')
    .maybeSingle()
  log.insert_with_authClient = {
    code: testCode + '_A',
    data: insertAuthData,
    error: insertAuthErr,
    success: !insertAuthErr,
  }

  // ── 8. INSERT test s adminClient (service role) ───────────────────────────
  const { data: insertAdminData, error: insertAdminErr } = await adminClient
    .from('herd_games')
    .insert({
      code: testCode + '_B',
      owner_id: session.user.id,
      phase: 'lobby',
      total_rounds: 0,
      active_round_index: 0,
      lobby_locked: false,
    })
    .select('code')
    .maybeSingle()
  log.insert_with_adminClient = {
    code: testCode + '_B',
    data: insertAdminData,
    error: insertAdminErr,
    success: !insertAdminErr,
  }

  // ── 9. Upratanie testovacích záznamov ─────────────────────────────────────
  await adminClient
    .from('herd_games')
    .delete()
    .in('code', [testCode + '_A', testCode + '_B'])

  // ── 10. Zobraziť posledné záznamy v herd_games ───────────────────────────
  const { data: recent, error: recentErr } = await adminClient
    .from('herd_games')
    .select('code, owner_id, phase, created_at')
    .order('created_at', { ascending: false })
    .limit(5)
  log.recent_herd_games = { data: recent, error: recentErr }

  // ── Záver ────────────────────────────────────────────────────────────────
  const diagnosis = {
    authClientInsertWorks: !insertAuthErr,
    adminClientInsertWorks: !insertAdminErr,
    ensureRoomWorks: !roomErr && !!room,
    gameCode: room?.code ?? null,
    userId: session.user.id,
    conclusion: !insertAdminErr
      ? 'adminClient funguje → deploy opraveného route.ts vyrieši problém'
      : 'adminClient NefungujeVeri SUPABASE_SERVICE_ROLE_KEY a permissions',
  }

  return NextResponse.json({ diagnosis, log }, { status: 200 })
}
