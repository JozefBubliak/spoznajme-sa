-- Prehlad batch 3: pas / brucho / zadok / nohy / chodidla
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
  'waist',
  'hips',
  'belly',
  'lower_belly',
  'navel',
  'buttocks',
  'gluteal_fold',
  'inner_thighs',
  'back_of_knees',
  'calves',
  'feet',
  'toes'
)
order by
  case r.zone_slug
    when 'waist' then 1
    when 'hips' then 2
    when 'belly' then 3
    when 'lower_belly' then 4
    when 'navel' then 5
    when 'buttocks' then 6
    when 'gluteal_fold' then 7
    when 'inner_thighs' then 8
    when 'back_of_knees' then 9
    when 'calves' then 10
    when 'feet' then 11
    when 'toes' then 12
    else 99
  end,
  m.sort_order,
  r.min_intensity,
  t.label_sk;

-- Suhrn podla zony
select
  z.label_sk as zona,
  count(*) as pocet_pravidiel,
  string_agg(distinct m.label_sk, ', ' order by m.label_sk) as rezimy
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.zone_slug in (
  'waist',
  'hips',
  'belly',
  'lower_belly',
  'navel',
  'buttocks',
  'gluteal_fold',
  'inner_thighs',
  'back_of_knees',
  'calves',
  'feet',
  'toes'
)
group by z.label_sk
order by z.label_sk;

-- Impact/BDSM pravidla v tomto batchi
select
  z.label_sk as zona,
  m.label_sk as rezim,
  t.label_sk as technika,
  r.min_intensity,
  r.max_intensity,
  r.random_policy,
  r.caution_sk
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.zone_slug in ('buttocks', 'inner_thighs')
  and (t.family = 'impact' or m.slug = 'bdsm')
order by z.label_sk, m.sort_order, t.label_sk;
