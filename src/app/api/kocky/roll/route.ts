import { NextRequest, NextResponse } from 'next/server';
import { relServer } from '@/lib/supabase/rel-server';

export type DiceRollResult = {
  zone_slug: string;
  zone_label_sk: string;
  region: string;
  is_genital: boolean;
  technique_slug: string;
  technique_label_sk: string;
  technique_family: string;
  play_mode_label_sk: string;
  receiver_target: 'all' | 'female' | 'male';
  actor_scope: 'partner_to_receiver' | 'receiver_self' | 'mutual' | 'either';
  min_intensity: number;
  max_intensity: number;
  suggested_seconds_min: number;
  suggested_seconds_max: number;
  requires_warmup: boolean;
  requires_tool: boolean;
  requires_lube: boolean;
  requires_aftercare: boolean;
  tool_tags: string[];
  prompt_sk: string;
  caution_sk: string | null;
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const play_mode: string = body.play_mode ?? 'sensual';
  const max_intensity: number = Math.min(5, Math.max(1, Number(body.max_intensity ?? 3)));
  const exclude_genital: boolean = body.exclude_genital ?? false;
  const receiver_target: string = body.receiver_target ?? 'all';

  const supabase = relServer();

  const { data, error } = await supabase
    .from('v_intimate_generator_candidates')
    .select(
      'zone_slug,zone_label_sk,region,is_genital,technique_slug,technique_label_sk,' +
      'technique_family,play_mode_label_sk,receiver_target,actor_scope,' +
      'min_intensity,max_intensity,' +
      'requires_warmup,requires_tool,requires_lube,requires_aftercare,' +
      'tool_tags,prompt_sk,caution_sk,random_policy'
    )
    .eq('play_mode_slug', play_mode)
    .lte('max_intensity', max_intensity)
    .in('receiver_target', ['all', receiver_target])
    .not('prompt_sk', 'is', null)
    // Filter on the underlying safety columns directly instead of the view's
    // precomputed is_spontaneous_candidate, which hardcodes max_intensity <= 3
    // regardless of the user's own slider. Every 'intense' rule in the DB has
    // max_intensity = 4, so relying on that flag made the whole Intenzívne mode
    // permanently return zero candidates; same root cause as the BDSM mode
    // being stuck on 0 before the mode_required rows were included here. The
    // user's max_intensity slider (already applied above) is the real ceiling —
    // is_internal / penetration_related / requires_aftercare stay hard filters
    // since those mark content that needs a planned flow, not a random dice roll.
    .in('random_policy', ['always_ok', 'preference_required', 'mode_required'])
    .eq('is_internal', false)
    .eq('penetration_related', false)
    .eq('requires_aftercare', false);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let pool = (data ?? []) as unknown as DiceRollResult[];

  if (exclude_genital) {
    pool = pool.filter((r) => !r.is_genital);
  }

  if (pool.length === 0) {
    return NextResponse.json({ error: 'no_candidates' }, { status: 404 });
  }

  const pick = pool[Math.floor(Math.random() * pool.length)];

  // v_intimate_generator_candidates doesn't expose suggested_seconds_min/max
  // (omitted from the view definition) — read them from the base rules table,
  // which is granted select for anon, by the row's own composite key.
  const { data: durationRow } = await supabase
    .from('intimate_zone_stimulation_rules')
    .select('suggested_seconds_min,suggested_seconds_max')
    .eq('zone_slug', pick.zone_slug)
    .eq('technique_slug', pick.technique_slug)
    .eq('receiver_target', pick.receiver_target)
    .eq('actor_scope', pick.actor_scope)
    .eq('play_mode_slug', play_mode)
    .single();

  const secondsMin = durationRow?.suggested_seconds_min ?? 10;
  const secondsMax = durationRow?.suggested_seconds_max ?? Math.max(secondsMin, 30);
  pick.suggested_seconds_min = secondsMin;
  pick.suggested_seconds_max = secondsMax;

  const duration = secondsMin + Math.floor(Math.random() * (secondsMax - secondsMin + 1));

  return NextResponse.json({ result: pick, duration_seconds: duration });
}
