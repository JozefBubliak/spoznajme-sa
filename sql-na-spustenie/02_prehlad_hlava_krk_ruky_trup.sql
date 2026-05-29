-- Prehlad batch 2: hlava / krk / ruky / horny trup
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
  r.prompt_sk as priklad_karty,
  r.caution_sk as poznamka
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
join rel.intimate_intensity_levels i_min on i_min.level = r.min_intensity
join rel.intimate_intensity_levels i_max on i_max.level = r.max_intensity
where r.zone_slug in (
  'lips',
  'mouth_corners',
  'ears',
  'earlobes',
  'behind_ears',
  'hair',
  'scalp',
  'cheeks',
  'jawline',
  'neck',
  'nape',
  'collarbones',
  'shoulders',
  'upper_back',
  'spine_line',
  'lower_back',
  'chest',
  'inner_wrist',
  'palms',
  'fingers'
)
order by
  z.region,
  z.label_sk,
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
  'lips',
  'mouth_corners',
  'ears',
  'earlobes',
  'behind_ears',
  'hair',
  'scalp',
  'cheeks',
  'jawline',
  'neck',
  'nape',
  'collarbones',
  'shoulders',
  'upper_back',
  'spine_line',
  'lower_back',
  'chest',
  'inner_wrist',
  'palms',
  'fingers'
)
group by z.label_sk
order by z.label_sk;

-- Co je vzajomne a co robi partner prijimatelovi
select
  r.actor_scope as kto_to_robi,
  count(*) as pocet
from rel.intimate_zone_stimulation_rules r
where r.zone_slug in (
  'lips',
  'mouth_corners',
  'ears',
  'earlobes',
  'behind_ears',
  'hair',
  'scalp',
  'cheeks',
  'jawline',
  'neck',
  'nape',
  'collarbones',
  'shoulders',
  'upper_back',
  'spine_line',
  'lower_back',
  'chest',
  'inner_wrist',
  'palms',
  'fingers'
)
group by r.actor_scope
order by r.actor_scope;
