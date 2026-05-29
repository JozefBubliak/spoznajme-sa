-- Prehlad batch 6: anal / hradza / prostata
-- Spusti v Supabase SQL Editore po:
-- 00_spustit_vsetko_zony_a_stimulacie.sql

select
  r.zone_slug,
  z.label_sk as zona,
  r.receiver_target as prijimatel,
  r.actor_scope as kto_to_robi,
  m.label_sk as rezim,
  t.label_sk as technika,
  t.family as typ,
  i_min.label_sk as min_intenzita,
  i_max.label_sk as max_intenzita,
  r.suggested_seconds_min || '-' || r.suggested_seconds_max || ' s' as trvanie,
  r.random_policy as losovanie,
  r.requires_warmup as potrebuje_naladenie,
  r.requires_tool as potrebuje_pomocku,
  r.requires_lube as potrebuje_lubrikant,
  r.requires_aftercare as potrebuje_aftercare,
  r.tool_tags as pomocky,
  r.prompt_sk as priklad_karty,
  r.caution_sk as poznamka
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
join rel.intimate_intensity_levels i_min on i_min.level = r.min_intensity
join rel.intimate_intensity_levels i_max on i_max.level = r.max_intensity
where r.zone_slug in (
  'perineum',
  'female_perineum',
  'male_perineum',
  'anal_area',
  'female_anal_area',
  'male_anal_area',
  'prostate'
)
order by
  case r.zone_slug
    when 'perineum' then 1
    when 'female_perineum' then 2
    when 'male_perineum' then 3
    when 'anal_area' then 4
    when 'female_anal_area' then 5
    when 'male_anal_area' then 6
    when 'prostate' then 7
    else 99
  end,
  m.sort_order,
  r.min_intensity,
  t.label_sk;

-- Kontrola, ze anal existuje ako spolocna aj cielena zona
select
  z.slug,
  z.target,
  z.label_sk as zona,
  count(r.*) as pocet_pravidiel,
  string_agg(distinct r.receiver_target::text, ', ' order by r.receiver_target::text) as prijimatelia
from rel.erogenous_zones z
left join rel.intimate_zone_stimulation_rules r on r.zone_slug = z.slug
where z.slug in ('anal_area', 'female_anal_area', 'male_anal_area')
group by z.slug, z.target, z.label_sk
order by z.slug;

-- Vsetko, co je planovane a nikdy nema byt zakladna nahodna karta
select
  z.label_sk as zona,
  r.receiver_target as prijimatel,
  m.label_sk as rezim,
  t.label_sk as technika,
  r.random_policy,
  r.requires_lube,
  r.requires_tool,
  r.requires_aftercare,
  r.caution_sk
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.zone_slug in (
  'anal_area',
  'female_anal_area',
  'male_anal_area',
  'prostate'
)
  and (
    r.random_policy = 'planned_only'
    or r.requires_lube
    or r.requires_aftercare
    or t.penetration_related
  )
order by z.label_sk, r.receiver_target, m.sort_order, t.label_sk;
