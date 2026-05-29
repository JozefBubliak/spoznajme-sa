-- Prehlad batch 5: muzske genitalne zony
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
  'penis',
  'glans',
  'frenulum',
  'foreskin',
  'shaft_underside',
  'penis_base',
  'scrotum',
  'testicles',
  'male_perineum'
)
order by
  case r.zone_slug
    when 'penis' then 1
    when 'glans' then 2
    when 'frenulum' then 3
    when 'foreskin' then 4
    when 'shaft_underside' then 5
    when 'penis_base' then 6
    when 'scrotum' then 7
    when 'testicles' then 8
    when 'male_perineum' then 9
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
  'penis',
  'glans',
  'frenulum',
  'foreskin',
  'shaft_underside',
  'penis_base',
  'scrotum',
  'testicles',
  'male_perineum'
)
group by z.label_sk
order by z.label_sk;

-- Najcitlivejsie muzske pravidla, ktore nemaju byt uplne nahodne
select
  z.label_sk as zona,
  m.label_sk as rezim,
  t.label_sk as technika,
  r.min_intensity,
  r.max_intensity,
  r.random_policy,
  r.requires_lube,
  r.caution_sk
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.receiver_target = 'male'
  and (
    r.zone_slug in ('glans', 'frenulum', 'testicles')
    or r.max_intensity >= 4
    or r.requires_lube
  )
order by z.label_sk, m.sort_order, t.label_sk;
