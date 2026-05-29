-- Prehlad batch 4: zenske genitalne zony
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
  'vulva',
  'clitoris',
  'clitoral_hood',
  'labia_outer',
  'labia_inner',
  'vaginal_opening',
  'periurethral_area',
  'vagina_front_wall',
  'g_spot_area',
  'a_spot_area',
  'female_perineum'
)
order by
  case r.zone_slug
    when 'vulva' then 1
    when 'labia_outer' then 2
    when 'labia_inner' then 3
    when 'clitoral_hood' then 4
    when 'clitoris' then 5
    when 'periurethral_area' then 6
    when 'vaginal_opening' then 7
    when 'vagina_front_wall' then 8
    when 'g_spot_area' then 9
    when 'a_spot_area' then 10
    when 'female_perineum' then 11
    else 99
  end,
  m.sort_order,
  r.min_intensity,
  t.label_sk;

-- Suhrn podla zony
select
  z.label_sk as zona,
  count(*) as pocet_pravidiel,
  string_agg(distinct m.label_sk, ', ' order by m.label_sk) as rezimy,
  bool_or(r.requires_lube) as nieco_potrebuje_lubrikant,
  bool_or(r.requires_tool) as nieco_potrebuje_pomocku
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.zone_slug in (
  'vulva',
  'clitoris',
  'clitoral_hood',
  'labia_outer',
  'labia_inner',
  'vaginal_opening',
  'periurethral_area',
  'vagina_front_wall',
  'g_spot_area',
  'a_spot_area',
  'female_perineum'
)
group by z.label_sk
order by z.label_sk;

-- Planovane alebo pokrocile zenske genitalne pravidla
select
  z.label_sk as zona,
  m.label_sk as rezim,
  t.label_sk as technika,
  r.random_policy,
  r.requires_warmup,
  r.requires_lube,
  r.requires_aftercare,
  r.caution_sk
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.receiver_target = 'female'
  and (
    r.random_policy = 'planned_only'
    or r.requires_lube
    or t.penetration_related
  )
order by z.label_sk, m.sort_order, t.label_sk;
