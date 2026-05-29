-- Prehlad batch 7: flow / pomocky / BDSM-bondage / generator
-- Spusti v Supabase SQL Editore po:
-- 00_spustit_vsetko_zony_a_stimulacie.sql

-- 1) Scenare hry: dnes / tyzden / mesiac
select
  slug,
  label_sk,
  category,
  suggested_minutes_min || '-' || suggested_minutes_max || ' min' as trvanie,
  allowed_mode_slugs as rezimy,
  allowed_random_policies as losovanie,
  max_intensity,
  allow_genital,
  allow_internal,
  allow_anal,
  allow_toys,
  allow_bdsm,
  requires_aftercare,
  description_sk
from rel.intimate_scene_types
order by sort_order;

-- 2) Kroky scenarov a pocet kandidatov v kazdom kroku
select
  c.scene_label_sk as scenar,
  c.step_order as krok,
  c.step_label_sk as krok_label,
  c.candidate_count as pocet_kandidatov
from rel.v_intimate_scene_candidate_counts c
order by c.scene_slug, c.step_order;

-- 3) Kandidati pre generator, ktori su vhodni spontanne
select
  zone_label_sk as zona,
  receiver_target as prijimatel,
  actor_scope as kto_to_robi,
  play_mode_label_sk as rezim,
  technique_label_sk as technika,
  technique_family as typ,
  min_intensity,
  max_intensity,
  random_policy,
  requires_lube,
  requires_tool,
  prompt_sk
from rel.v_intimate_generator_candidates
where is_spontaneous_candidate
order by region, zone_slug, max_intensity, technique_label_sk;

-- 4) Kandidati, ktori potrebuju planovany flow
select
  zone_label_sk as zona,
  receiver_target as prijimatel,
  play_mode_label_sk as rezim,
  technique_label_sk as technika,
  random_policy,
  is_internal,
  penetration_related,
  requires_lube,
  requires_aftercare,
  caution_sk
from rel.v_intimate_generator_candidates
where needs_planned_flow
order by zone_slug, technique_label_sk;

-- 5) Pomocky a kompatibilne zony
select
  toy_label_sk as pomocka,
  family as typ,
  zone_label_sk as zona,
  zone_target as ciel_zony,
  beginner_ok,
  external_only,
  requires_lube,
  requires_cleaning,
  requires_condom_when_shared,
  planned_only,
  bdsm_related
from rel.v_intimate_toy_zone_matrix
order by family, toy_label_sk, zone_label_sk;

-- 6) Samostatne BDSM / bondage karty
select
  label_sk,
  scene_level,
  actor_scope as kto_to_robi,
  play_mode_slug as rezim,
  random_policy as losovanie,
  requires_tool,
  requires_aftercare,
  tool_tags as pomocky,
  prompt_sk,
  caution_sk
from rel.intimate_bondage_scene_cards
order by scene_level, label_sk;
