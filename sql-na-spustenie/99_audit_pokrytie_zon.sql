-- Audit pokrytia erotogennych zon
-- Spusti po:
-- 00_spustit_vsetko_zony_a_stimulacie.sql

-- 1) Vsetky zony + pocet pravidiel v novom preference engine.
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
  string_agg(distinct r.receiver_target::text, ', ' order by r.receiver_target::text) as prijimatelia,
  string_agg(distinct m.label_sk, ', ' order by m.label_sk) as rezimy
from rel.erogenous_zones z
left join rel.intimate_zone_stimulation_rules r on r.zone_slug = z.slug
left join rel.intimate_play_modes m on m.slug = r.play_mode_slug
group by
  z.target,
  z.region,
  z.slug,
  z.label_sk,
  z.sensitivity,
  z.is_genital,
  z.is_internal,
  z.dice_enabled
order by
  z.target,
  z.region,
  z.slug;

-- 2) Zony bez pravidiel. Toto je hlavna kontrola, co este chyba dorobit.
select
  z.target,
  z.region,
  z.slug,
  z.label_sk as zona,
  z.notes_sk
from rel.erogenous_zones z
left join rel.intimate_zone_stimulation_rules r on r.zone_slug = z.slug
where r.zone_slug is null
order by z.target, z.region, z.slug;

-- 3) Suhrn pokrytia podla cielovej skupiny.
select
  z.target,
  count(*) as pocet_zon,
  count(*) filter (where exists (
    select 1
    from rel.intimate_zone_stimulation_rules r
    where r.zone_slug = z.slug
  )) as zony_s_pravidlami,
  count(*) filter (where not exists (
    select 1
    from rel.intimate_zone_stimulation_rules r
    where r.zone_slug = z.slug
  )) as zony_bez_pravidiel
from rel.erogenous_zones z
group by z.target
order by z.target;

-- 4) Genitalne a interne zony, kde musi byt jasne prijimatel a losovanie.
select
  z.target,
  z.slug,
  z.label_sk as zona,
  r.receiver_target as prijimatel,
  r.random_policy,
  count(*) as pocet_pravidiel
from rel.erogenous_zones z
join rel.intimate_zone_stimulation_rules r on r.zone_slug = z.slug
where z.is_genital or z.is_internal
group by z.target, z.slug, z.label_sk, r.receiver_target, r.random_policy
order by z.target, z.slug, r.receiver_target, r.random_policy;

-- 5) Potencialne nebezpecne kombinacie: penetracia bez lubrikantu alebo planovania.
select
  z.slug as zona_slug,
  z.label_sk as zona,
  t.slug as technika_slug,
  t.label_sk as technika,
  r.receiver_target,
  r.random_policy,
  r.requires_lube,
  r.requires_warmup,
  r.requires_aftercare,
  r.caution_sk
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
where t.penetration_related
  and (
    r.requires_lube = false
    or r.requires_warmup = false
    or r.random_policy not in ('preference_required', 'planned_only')
  )
order by z.slug, t.slug;

-- 6) Kontrola, ze analne zony existuju pre oboch aj spolocne.
select
  z.slug,
  z.target,
  z.label_sk as zona,
  count(r.*) as pocet_pravidiel,
  bool_or(r.receiver_target = 'all') as ma_spolocne_pravidlo,
  bool_or(r.receiver_target = 'female') as ma_zenske_pravidlo,
  bool_or(r.receiver_target = 'male') as ma_muzske_pravidlo
from rel.erogenous_zones z
left join rel.intimate_zone_stimulation_rules r on r.zone_slug = z.slug
where z.slug in ('anal_area', 'female_anal_area', 'male_anal_area', 'perineum', 'female_perineum', 'male_perineum', 'prostate')
group by z.slug, z.target, z.label_sk
order by z.slug;

-- 7) Flow kroky bez kandidatov. Toto musi byt prazdne.
select
  scene_slug,
  scene_label_sk,
  step_order,
  step_label_sk,
  candidate_count
from rel.v_intimate_scene_candidate_counts
where candidate_count = 0
order by scene_slug, step_order;

-- 8) Pomocky bez kompatibilnej realnej zony. Niektore kontextove pomocky mozu byt zamerne mimo zony,
-- ale pre vibrator, analne a vaginalne pomocky tu nechceme prazdne vysledky.
select
  toy.slug,
  toy.label_sk,
  toy.family,
  toy.compatible_zone_slugs
from rel.intimate_toy_profiles toy
where toy.family in ('vibrator', 'anal', 'penetration', 'bdsm', 'impact')
  and not exists (
    select 1
    from rel.v_intimate_toy_zone_matrix matrix
    where matrix.toy_slug = toy.slug
  )
order by toy.family, toy.slug;

-- 9) Spontanne kandidaty nesmu byt interne, penetracne ani aftercare-only.
-- Toto musi byt prazdne.
select
  zone_slug,
  zone_label_sk,
  technique_slug,
  technique_label_sk,
  random_policy,
  is_internal,
  penetration_related,
  requires_aftercare
from rel.v_intimate_generator_candidates
where is_spontaneous_candidate
  and (
    is_internal
    or penetration_related
    or requires_aftercare
  )
order by zone_slug, technique_slug;
