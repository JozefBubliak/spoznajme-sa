-- Prehlad pilotu: bradavky / dvorce / prsia
-- Spusti v Supabase SQL Editore po subore:
-- 00_spustit_vsetko_zony_a_stimulacie.sql

-- 1) Ake zony mame k bradavkam a prsiam
select
  z.slug,
  z.target as pre_koho,
  z.label_sk as zona,
  z.region,
  z.sensitivity as citlivost_1_5,
  z.is_genital,
  z.is_internal,
  z.dice_enabled,
  z.notes_sk
from rel.erogenous_zones z
where z.slug in ('nipples', 'areola', 'breasts', 'chest')
order by z.target, z.slug;

-- 2) Co sa da s bradavkami/dvorcami/prsiami robit v novej hre
select
  r.zone_slug,
  z.label_sk as zona,
  r.receiver_target as prijimatel,
  r.actor_scope as kto_to_robi,
  m.label_sk as rezim,
  t.label_sk as technika,
  t.family as typ_techniky,
  i_min.label_sk as min_intenzita,
  i_max.label_sk as max_intenzita,
  r.suggested_seconds_min || '-' || r.suggested_seconds_max || ' s' as trvanie,
  r.random_policy as nahodne_losovanie,
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
where r.zone_slug in ('nipples', 'areola', 'breasts')
order by
  case r.zone_slug
    when 'areola' then 1
    when 'nipples' then 2
    when 'breasts' then 3
    else 9
  end,
  m.sort_order,
  r.min_intensity,
  t.family,
  t.label_sk;

-- 3) Kolko praktik je v jednotlivych rezimoch
select
  m.label_sk as rezim,
  count(*) as pocet_pravidiel
from rel.intimate_zone_stimulation_rules r
join rel.intimate_play_modes m on m.slug = r.play_mode_slug
where r.zone_slug in ('nipples', 'areola', 'breasts')
group by m.label_sk, m.sort_order
order by m.sort_order;

-- 4) Co sa moze losovat bezpecnejsie a co az po preferencii / rezime / planovani
select
  r.random_policy as pravidlo_losovania,
  count(*) as pocet
from rel.intimate_zone_stimulation_rules r
where r.zone_slug in ('nipples', 'areola', 'breasts')
group by r.random_policy
order by r.random_policy;
