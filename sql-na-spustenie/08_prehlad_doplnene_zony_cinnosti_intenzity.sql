-- Prehlad batch 8: doplnene zony / cinnosti / intenzitne profily
-- Spusti v Supabase SQL Editore po:
-- 00_spustit_vsetko_zony_a_stimulacie.sql

-- 1) Doplnene zony z druheho kola gap analysis
select
  z.target,
  z.region,
  z.slug,
  z.label_sk as zona,
  z.sensitivity,
  z.is_genital,
  z.is_internal,
  z.dice_enabled,
  count(r.*) as pocet_pravidiel,
  string_agg(distinct r.receiver_target::text, ', ' order by r.receiver_target::text) as prijimatelia
from rel.erogenous_zones z
left join rel.intimate_zone_stimulation_rules r on r.zone_slug = z.slug
where z.slug in (
  'whole_body',
  'skin',
  'forehead',
  'temples',
  'eyebrows',
  'eyelids',
  'nose',
  'philtrum',
  'chin',
  'throat_front',
  'upper_arms',
  'forearms',
  'inner_elbows',
  'armpits',
  'sternum',
  'ribs',
  'flanks',
  'under_breasts',
  'pubic_mound',
  'groin_creases',
  'hip_bones',
  'sacrum',
  'tailbone',
  'outer_thighs',
  'front_thighs',
  'knees',
  'ankles',
  'heels',
  'arches',
  'soles',
  'corona_glans',
  'inner_foreskin',
  'shaft_sides',
  'shaft_top',
  'vaginal_canal',
  'cervix',
  'clitoral_crura',
  'vestibular_bulbs'
)
group by z.target, z.region, z.slug, z.label_sk, z.sensitivity, z.is_genital, z.is_internal, z.dice_enabled
order by z.target, z.region, z.slug;

-- 2) Doplnene techniky/cinnosti
select
  slug,
  label_sk,
  family,
  uses_mouth,
  uses_hands,
  uses_toy,
  bdsm_related,
  penetration_related,
  description_sk
from rel.intimate_stimulation_techniques
where slug in (
  'broad_caress',
  'fingertip_tap',
  'tickle_tease',
  'scratch_light',
  'scratch_firm',
  'squeeze_release_skin',
  'pin_hold_soft',
  'body_to_body_rub',
  'oil_glide',
  'fabric_drag',
  'blindfold_slow_touch',
  'praise_whisper',
  'soft_command',
  'rhythm_pulse',
  'suction_pulse_mouth',
  'flat_tongue_broad',
  'warm_oil_touch',
  'edging_pause'
)
order by family, label_sk;

-- 3) Intenzita nie je iba "jemne/silne": tlak, rychlost, bolest, dominancia, teplota.
select
  slug,
  label_sk,
  pressure_level as tlak,
  speed_level as rychlost,
  rhythm_sk as rytmus,
  pain_level as bolest,
  dominance_level as dominancia,
  temperature_sk as teplota,
  description_sk
from rel.intimate_intensity_profiles
order by pressure_level, speed_level, pain_level, dominance_level, slug;

-- 4) Rizikove alebo planovane nove pravidla
select
  z.label_sk as zona,
  r.receiver_target as prijimatel,
  t.label_sk as technika,
  m.label_sk as rezim,
  r.random_policy,
  r.requires_lube,
  r.requires_aftercare,
  r.caution_sk
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.zone_slug in (
  'throat_front',
  'armpits',
  'pubic_mound',
  'groin_creases',
  'tailbone',
  'corona_glans',
  'inner_foreskin',
  'vaginal_canal',
  'cervix',
  'clitoral_crura',
  'vestibular_bulbs'
)
order by z.slug, m.sort_order, t.label_sk;
