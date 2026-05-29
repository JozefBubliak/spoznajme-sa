import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

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

  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .schema('rel')
    .from('v_intimate_generator_candidates')
    .select(
      'zone_slug,zone_label_sk,region,is_genital,technique_slug,technique_label_sk,' +
      'technique_family,play_mode_label_sk,receiver_target,actor_scope,' +
      'min_intensity,max_intensity,suggested_seconds_min,suggested_seconds_max,' +
      'requires_warmup,requires_tool,requires_lube,requires_aftercare,' +
      'tool_tags,prompt_sk,caution_sk,random_policy'
    )
    .eq('play_mode_slug', play_mode)
    .lte('max_intensity', max_intensity)
    .in('random_policy', ['always_ok', 'preference_required', 'mode_required'])
    .eq('is_spontaneous_candidate', true)
    .in('receiver_target', ['all', receiver_target])
    .not('prompt_sk', 'is', null);

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

  const duration =
    pick.suggested_seconds_min +
    Math.floor(
      Math.random() * (pick.suggested_seconds_max - pick.suggested_seconds_min + 1)
    );

  return NextResponse.json({ result: pick, duration_seconds: duration });
}
