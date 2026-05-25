/**
 * nudge-scheduler — Anti-Forgetting Motor 1
 * DeepTalks · Relationship Companion
 *
 * Invoked hourly via pg_cron (or manually via HTTP POST with service-role key).
 * For each giver whose cadence is due it:
 *   1. calls rel.get_due_givers()  — who needs a nudge right now
 *   2. calls rel.pick_nudge()      — selects the best template
 *   3. inserts into rel.nudge_log  — records the dispatch
 *   4. stubs the push notification — transport is wired outside this function
 *
 * Deploy:  supabase functions deploy nudge-scheduler
 * Invoke:  POST /functions/v1/nudge-scheduler
 *          Authorization: Bearer <SERVICE_ROLE_KEY>
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ── Types ────────────────────────────────────────────────────────────────────

interface DueGiver {
  giver_id: string
  couple_id: string
  novelty_ratio: number
  preferred_locale: string
}

interface NudgePick {
  template_id: string
  prompt: string
  receiver_id: string
}

type DispatchResult =
  | { giver_id: string; status: 'sent';        nudge_id: string; preview: string }
  | { giver_id: string; status: 'no_template'; reason?: string }
  | { giver_id: string; status: 'log_error';   reason: string }
  | { giver_id: string; status: 'error';       reason: string }

// ── Handler ──────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  const supabaseUrl     = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  // ── Auth: accept service-role key in Authorization header ────────────────
  const auth = req.headers.get('Authorization') ?? ''
  if (auth !== `Bearer ${serviceRoleKey}`) {
    return json({ error: 'Unauthorized' }, 401)
  }

  // ── Supabase client scoped to the `rel` schema ───────────────────────────
  const rel = createClient(supabaseUrl, serviceRoleKey, {
    db: { schema: 'rel' },
    auth: { persistSession: false },
  })

  // ── 1. Fetch givers whose cadence is due right now ───────────────────────
  const { data: dueGivers, error: giverErr } = await rel.rpc('get_due_givers')

  if (giverErr) {
    console.error('[nudge] get_due_givers failed:', giverErr.message)
    return json({ error: giverErr.message }, 500)
  }

  const givers = (dueGivers ?? []) as DueGiver[]
  console.log(`[nudge] ${givers.length} giver(s) due`)

  const results: DispatchResult[] = []

  for (const giver of givers) {
    try {
      results.push(await processGiver(rel, giver))
    } catch (err) {
      results.push({ giver_id: giver.giver_id, status: 'error', reason: String(err) })
    }
  }

  const sent = results.filter(r => r.status === 'sent').length
  console.log(`[nudge] done — ${sent}/${givers.length} sent`)

  return json({ ok: true, total: givers.length, sent, results })
})

// ── Per-giver dispatch ───────────────────────────────────────────────────────

async function processGiver(
  // deno-lint-ignore no-explicit-any
  rel: any,
  giver: DueGiver,
): Promise<DispatchResult> {
  const { giver_id, couple_id, novelty_ratio, preferred_locale } = giver

  // 2. Pick a template calibrated to this giver's partner
  const { data: picks, error: pickErr } = await rel.rpc('pick_nudge', {
    p_giver_id:      giver_id,
    p_couple_id:     couple_id,
    p_novelty_ratio: novelty_ratio,
    p_locale:        preferred_locale,
  })

  if (pickErr) {
    console.warn(`[nudge] pick_nudge error for ${giver_id}:`, pickErr.message)
    return { giver_id, status: 'no_template', reason: pickErr.message }
  }

  if (!picks?.length) {
    console.warn(`[nudge] no template available for ${giver_id}`)
    return { giver_id, status: 'no_template' }
  }

  const pick = picks[0] as NudgePick

  // 3. Log the dispatch (service role bypasses RLS — no client can insert here)
  const { data: logRow, error: logErr } = await rel
    .from('nudge_log')
    .insert({
      couple_id,
      giver_id,
      receiver_id: pick.receiver_id,
      template_id: pick.template_id,
      locale_code: preferred_locale,
    })
    .select('id')
    .single()

  if (logErr) {
    console.error(`[nudge] nudge_log insert failed for ${giver_id}:`, logErr.message)
    return { giver_id, status: 'log_error', reason: logErr.message }
  }

  // 4. Push notification — transport wired by the app team
  //    Uncomment and adapt once your notification service is set up:
  //
  // await sendPushNotification({
  //   userId:  giver_id,
  //   title:   'Malý gesto dnes 💛',
  //   body:    pick.prompt,
  //   data:    { nudgeId: logRow.id, screen: 'nudge-done' },
  // })

  const preview = pick.prompt.slice(0, 72) + (pick.prompt.length > 72 ? '…' : '')
  console.log(`[nudge] → ${giver_id}  "${preview}"`)

  return { giver_id, status: 'sent', nudge_id: logRow.id, preview }
}

// ── Util ─────────────────────────────────────────────────────────────────────

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
