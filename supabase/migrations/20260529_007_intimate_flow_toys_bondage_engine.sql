-- =============================================================================
-- DeepTalks - Intimne dobrodruzstvo - flow, toys and bondage engine
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 7: generator layer above body zones. This does not replace zone rules.
-- It adds scenes, steps, toy profiles and generator views so random cards are
-- filtered by tempo, intensity, planning and safety flags.
-- =============================================================================

create extension if not exists "pgcrypto";
create schema if not exists rel;

create table if not exists rel.intimate_toy_profiles (
  slug                         text primary key,
  label_sk                     text not null,
  family                       text not null,
  description_sk               text not null,
  compatible_zone_slugs        text[] not null default '{}',
  compatible_receiver_targets  rel.intimate_body_target[] not null default array['all']::rel.intimate_body_target[],
  beginner_ok                  boolean not null default true,
  external_only                boolean not null default true,
  requires_lube                boolean not null default false,
  requires_cleaning            boolean not null default true,
  requires_condom_when_shared  boolean not null default false,
  planned_only                 boolean not null default false,
  bdsm_related                 boolean not null default false,
  source_refs                  text[] not null default '{}',
  created_at                   timestamptz not null default now()
);

create table if not exists rel.intimate_scene_types (
  slug                    text primary key,
  label_sk                text not null,
  category                text not null,
  description_sk          text not null,
  suggested_minutes_min   smallint not null check (suggested_minutes_min >= 0),
  suggested_minutes_max   smallint not null check (suggested_minutes_max >= suggested_minutes_min),
  allowed_mode_slugs      text[] not null default '{}',
  allowed_random_policies rel.intimate_random_policy[] not null default array['always_ok','preference_required']::rel.intimate_random_policy[],
  max_intensity           smallint not null references rel.intimate_intensity_levels(level),
  allow_genital           boolean not null default false,
  allow_internal          boolean not null default false,
  allow_anal              boolean not null default false,
  allow_toys              boolean not null default false,
  allow_bdsm              boolean not null default false,
  requires_aftercare      boolean not null default false,
  sort_order              smallint not null,
  source_refs             text[] not null default '{}',
  created_at              timestamptz not null default now()
);

create table if not exists rel.intimate_scene_steps (
  scene_slug                text not null references rel.intimate_scene_types(slug) on delete cascade,
  step_order                smallint not null,
  label_sk                  text not null,
  instruction_sk            text not null,
  candidate_region_filter   text[] not null default '{}',
  candidate_zone_filter     text[] not null default '{}',
  candidate_family_filter   text[] not null default '{}',
  allowed_mode_slugs        text[] not null default '{}',
  allowed_random_policies   rel.intimate_random_policy[] not null default array['always_ok','preference_required']::rel.intimate_random_policy[],
  max_intensity             smallint not null references rel.intimate_intensity_levels(level),
  require_preference        boolean not null default true,
  transition_sk             text,
  primary key (scene_slug, step_order)
);

create table if not exists rel.intimate_bondage_scene_cards (
  slug                 text primary key,
  label_sk             text not null,
  scene_level          smallint not null check (scene_level between 1 and 5),
  actor_scope          rel.intimate_actor_scope not null default 'partner_to_receiver',
  play_mode_slug       text not null references rel.intimate_play_modes(slug),
  random_policy        rel.intimate_random_policy not null default 'mode_required',
  requires_aftercare   boolean not null default false,
  requires_tool        boolean not null default false,
  tool_tags            text[] not null default '{}',
  prompt_sk            text not null,
  caution_sk           text,
  source_refs          text[] not null default '{}',
  created_at           timestamptz not null default now()
);

insert into rel.intimate_toy_profiles
  (slug, label_sk, family, description_sk, compatible_zone_slugs, compatible_receiver_targets,
   beginner_ok, external_only, requires_lube, requires_cleaning, requires_condom_when_shared,
   planned_only, bdsm_related, source_refs)
values
  ('massage_oil', 'masazny olej', 'sensation', 'Olej alebo gel na vonkajsiu masaz tela.', array['shoulders','upper_back','lower_back','chest','waist','hips','buttocks','calves','feet'], array['all']::rel.intimate_body_target[], true, true, false, true, false, false, false, array['Healthline sex toy cleaning','ASHA safer sex toolbox']),
  ('feather', 'pierko / velmi jemny dotyk', 'sensation', 'Jemna senzoricka pomocka na kozu.', array['neck','nape','collarbones','chest','areola','nipples','inner_thighs','feet'], array['all']::rel.intimate_body_target[], true, true, false, true, false, false, false, array['Scarleteen sexual anatomy']),
  ('ice_safe', 'chlad / lad kratko', 'sensation', 'Kratky chladovy podnet mimo sliznic a bez extremov.', array['neck','chest','areola','nipples','belly','inner_thighs'], array['all']::rel.intimate_body_target[], false, true, false, true, false, false, false, array['Healthline nipple clamps safety guide']),
  ('bullet_vibrator', 'maly vibrator / bullet', 'vibrator', 'Mala vibracna pomocka vhodna najma na vonkajsiu stimulaciu.', array['nipples','vulva','clitoris','penis','glans','perineum','inner_thighs'], array['all','female','male']::rel.intimate_body_target[], true, true, false, true, true, false, false, array['WebMD vibrators','Healthline sex toys and STIs']),
  ('wand_vibrator', 'wand vibrator', 'vibrator', 'Silnejsi vibrator na vonkajsiu stimulaciu a vacsie plochy.', array['vulva','clitoris','penis','perineum','buttocks','inner_thighs'], array['all','female','male']::rel.intimate_body_target[], false, true, false, true, true, false, false, array['WebMD vibrators','Healthline sex toys and STIs']),
  ('vaginal_toy', 'vaginalna pomocka', 'penetration', 'Pomocka urcena na vaginalne pouzitie.', array['vaginal_opening','vagina_front_wall','g_spot_area'], array['female']::rel.intimate_body_target[], false, false, true, true, true, true, false, array['WebMD dildos','Healthline sex toy cleaning']),
  ('anal_plug', 'analny plug', 'anal', 'Analna pomocka s bezpecnou zakladnou.', array['anal_area','female_anal_area','male_anal_area','prostate'], array['all','female','male']::rel.intimate_body_target[], false, false, true, true, true, true, false, array['Healthline butt plugs','ASHA safer sex toolbox']),
  ('prostate_toy', 'pomocka na prostatu', 'anal', 'Pomocka urcena na stimulaciu prostaty.', array['prostate','male_anal_area'], array['male']::rel.intimate_body_target[], false, false, true, true, true, true, false, array['Healthline butt plugs','Healthline anal sex safety']),
  ('adjustable_nipple_clamps', 'nastavitelne svorky na bradavky', 'bdsm', 'Nastavitelne svorky, kde sa da zacat na nizkom tlaku.', array['nipples'], array['all']::rel.intimate_body_target[], false, true, false, true, false, true, true, array['Healthline nipple clamps safety guide']),
  ('blindfold', 'paska na oci', 'bondage', 'Jemna senzoricka pomocka bez viazania tela.', array['whole_body'], array['all']::rel.intimate_body_target[], true, true, false, true, false, false, true, array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('soft_wrist_restraints', 'jemne putka / satka na zapastia', 'bondage', 'Makke obmedzenie ruk, len s jednoduchym uvolnenim.', array['inner_wrist','palms','fingers'], array['all']::rel.intimate_body_target[], false, true, false, true, false, true, true, array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('paddle_soft', 'jemna placacka', 'impact', 'Pomocka na lahky impact na masite miesta.', array['buttocks','inner_thighs'], array['all']::rel.intimate_body_target[], false, true, false, true, false, true, true, array['TASHRA BDSM risk awareness'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  family = excluded.family,
  description_sk = excluded.description_sk,
  compatible_zone_slugs = excluded.compatible_zone_slugs,
  compatible_receiver_targets = excluded.compatible_receiver_targets,
  beginner_ok = excluded.beginner_ok,
  external_only = excluded.external_only,
  requires_lube = excluded.requires_lube,
  requires_cleaning = excluded.requires_cleaning,
  requires_condom_when_shared = excluded.requires_condom_when_shared,
  planned_only = excluded.planned_only,
  bdsm_related = excluded.bdsm_related,
  source_refs = excluded.source_refs;

insert into rel.intimate_scene_types
  (slug, label_sk, category, description_sk, suggested_minutes_min, suggested_minutes_max,
   allowed_mode_slugs, allowed_random_policies, max_intensity,
   allow_genital, allow_internal, allow_anal, allow_toys, allow_bdsm, requires_aftercare,
   sort_order, source_refs)
values
  ('today_soft_explore', 'Dnes: jemne objavovanie', 'today', 'Kratka spontanna hra bez pokrocilych praktik.', 10, 30, array['explore','sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 3, false, false, false, false, false, false, 10, array['PubMed erogenous mirror']),
  ('today_sensual_body', 'Dnes: zmyselne telo', 'today', 'Bozky, dotyk, jazyk a masaz na vonkajsich zonach.', 15, 45, array['explore','sensual','intense'], array['always_ok','preference_required']::rel.intimate_random_policy[], 4, true, false, false, false, false, false, 20, array['PubMed erogenous mirror']),
  ('week_toys_intro', 'Tyzden: pomocky postupne', 'week', 'Jeden vecer na vyber a test pomocky, druhy vecer na opakovanie toho, co fungovalo.', 20, 60, array['explore','sensual','toys'], array['preference_required','mode_required']::rel.intimate_random_policy[], 4, true, false, false, true, false, false, 30, array['Healthline sex toy cleaning','ASHA safer sex toolbox']),
  ('week_oral_focus', 'Tyzden: oralne objavovanie', 'week', 'Oralne aktivity iba tam, kde davaju zmysel, bez miesania nahodnych zon.', 15, 45, array['sensual','intense'], array['preference_required']::rel.intimate_random_policy[], 4, true, false, false, false, false, false, 40, array['Scarleteen sexual anatomy']),
  ('month_bdsm_intro', 'Mesiac: BDSM uvod', 'month', 'Postup od rozhovoru cez senzoriku po jemny bondage alebo impact.', 20, 75, array['explore','bdsm'], array['mode_required','planned_only']::rel.intimate_random_policy[], 5, false, false, false, true, true, true, 50, array['Kink Checklist BDSM safety','BDSM Wiki safeword','BDSM Wiki aftercare']),
  ('month_anal_intro', 'Mesiac: anal/perineum uvod', 'month', 'Len planovana cesta od vonkajsej zony po pripadne pokrocilejsie kroky.', 20, 75, array['explore','sensual','planned_edge'], array['planned_only']::rel.intimate_random_policy[], 4, true, true, true, true, false, true, 60, array['Healthline anal sex safety','ASHA safer sex toolbox'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  category = excluded.category,
  description_sk = excluded.description_sk,
  suggested_minutes_min = excluded.suggested_minutes_min,
  suggested_minutes_max = excluded.suggested_minutes_max,
  allowed_mode_slugs = excluded.allowed_mode_slugs,
  allowed_random_policies = excluded.allowed_random_policies,
  max_intensity = excluded.max_intensity,
  allow_genital = excluded.allow_genital,
  allow_internal = excluded.allow_internal,
  allow_anal = excluded.allow_anal,
  allow_toys = excluded.allow_toys,
  allow_bdsm = excluded.allow_bdsm,
  requires_aftercare = excluded.requires_aftercare,
  sort_order = excluded.sort_order,
  source_refs = excluded.source_refs;

insert into rel.intimate_scene_steps
  (scene_slug, step_order, label_sk, instruction_sk, candidate_region_filter, candidate_zone_filter,
   candidate_family_filter, allowed_mode_slugs, allowed_random_policies, max_intensity,
   require_preference, transition_sk)
values
  ('today_soft_explore', 1, 'Naladenie', 'Vyber jednu vonkajsiu zonu s nizkou intenzitou.', array['hlava','krk','ruky','trup'], array[]::text[], array['mouth','hands','sensation'], array['explore','sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 2, false, 'Po karte povedzte: viac, menej alebo preskocit.'),
  ('today_soft_explore', 2, 'Zmyselny krok', 'Vyber dotyk, bozk alebo masaz bez penetracie a bez BDSM.', array['trup','ruky','nohy'], array[]::text[], array['mouth','hands','massage','sensation'], array['explore','sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 3, true, 'Ak to funguje, zopakujte rovnaku zonu inou technikou.'),
  ('today_sensual_body', 1, 'Mapa tela', 'Vyber vacsiu vonkajsiu zonu, ktora nie je interna.', array['hlava','krk','trup','panva','nohy'], array[]::text[], array['mouth','hands','massage'], array['sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 3, true, 'Generator nesmie skombinovat jazyk s nezmyselnou zonou.'),
  ('today_sensual_body', 2, 'Intenzita', 'Pridaj iba techniku s max intenzitou podla preferencie prijimatela.', array[]::text[], array['nipples','buttocks','inner_thighs','penis','vulva','clitoris'], array['mouth','hands','toy'], array['sensual','intense'], array['preference_required']::rel.intimate_random_policy[], 4, true, 'Ak sa objavi genitalna zona, musi byt explicitne povolena v preferenciach.'),
  ('week_toys_intro', 1, 'Vyber pomocky', 'Vyber iba pomocku kompatibilnu so zonou a prijimatelom.', array[]::text[], array[]::text[], array['toy','sensation'], array['toys','sensual'], array['preference_required','mode_required']::rel.intimate_random_policy[], 3, true, 'Pomocka musi byt cista a vhodna na danu zonu.'),
  ('week_toys_intro', 2, 'Opakovanie', 'Zopakujte iba to, co v prvej casti dostalo hodnotenie paci sa alebo chcem skusit.', array[]::text[], array[]::text[], array['toy','hands','mouth'], array['toys','sensual'], array['preference_required']::rel.intimate_random_policy[], 4, true, 'Toto nie je nahodny skok na vyssiu intenzitu.'),
  ('week_oral_focus', 1, 'Oralne iba zmysluplne', 'Vyber iba zony, kde oralna technika patri do pravidiel.', array[]::text[], array['lips','ears','neck','nipples','vulva','clitoris','penis','glans','inner_thighs'], array['mouth'], array['sensual','intense'], array['preference_required']::rel.intimate_random_policy[], 4, true, 'Ziadne oralne karty na vlasy alebo nezmyselne velke plochy.'),
  ('month_bdsm_intro', 1, 'Rozhovor a mierka', 'Prva karta je iba dohoda intenzity 1 az 5 a vyber jednej vetvy.', array[]::text[], array[]::text[], array[]::text[], array['explore','bdsm'], array['mode_required']::rel.intimate_random_policy[], 2, true, 'Vybrat iba jednu vetvu: senzorika, bondage, impact alebo kontrola.'),
  ('month_bdsm_intro', 2, 'Jemna scena', 'Vyber bondage alebo BDSM kartu s jasnym nastrojom a aftercare.', array[]::text[], array[]::text[], array['bdsm','impact','toy','sensation'], array['bdsm'], array['mode_required','planned_only']::rel.intimate_random_policy[], 5, true, 'Po scene nasleduje kratke aftercare.'),
  ('month_anal_intro', 1, 'Vonkajsia zona', 'Zacni iba vonkajsim anal/perineum pravidlom.', array['panva'], array['perineum','female_perineum','male_perineum','anal_area','female_anal_area','male_anal_area'], array['hands'], array['explore','sensual'], array['preference_required']::rel.intimate_random_policy[], 3, true, 'Bez penetracie v prvom kroku.'),
  ('month_anal_intro', 2, 'Planovany krok', 'Ak vobec, dalsi krok pouzije len planned_only pravidla s lubrikantom.', array['panva'], array['anal_area','female_anal_area','male_anal_area','prostate'], array['hands','toy','penetration'], array['planned_edge'], array['planned_only']::rel.intimate_random_policy[], 4, true, 'Analne a prostaticke karty sa nelosuju spontanne.')
on conflict (scene_slug, step_order) do update set
  label_sk = excluded.label_sk,
  instruction_sk = excluded.instruction_sk,
  candidate_region_filter = excluded.candidate_region_filter,
  candidate_zone_filter = excluded.candidate_zone_filter,
  candidate_family_filter = excluded.candidate_family_filter,
  allowed_mode_slugs = excluded.allowed_mode_slugs,
  allowed_random_policies = excluded.allowed_random_policies,
  max_intensity = excluded.max_intensity,
  require_preference = excluded.require_preference,
  transition_sk = excluded.transition_sk;

insert into rel.intimate_bondage_scene_cards
  (slug, label_sk, scene_level, actor_scope, play_mode_slug, random_policy,
   requires_aftercare, requires_tool, tool_tags, prompt_sk, caution_sk, source_refs)
values
  ('traffic_light_checkin', 'semaforova kontrola', 1, 'mutual', 'bdsm', 'mode_required', false, false, array[]::text[], 'Pred odvahou si povedzte zelena, zlta alebo cervena pre intenzitu hry.', 'Toto je kontrolna karta pred BDSM vetvou, nie eroticka uloha sama o sebe.', array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('blindfold_sensory_intro', 'paska na oci a dotyk', 2, 'partner_to_receiver', 'bdsm', 'mode_required', true, true, array['paska na oci'], 'Jeden ma pasku na oci a druhy pouzije iba ruky, dych alebo pierko.', 'Bez strasenia, bolesti alebo prekvapivej penetracie.', array['Kink Checklist BDSM safety']),
  ('hands_above_head_hold', 'drzanie ruk nad hlavou', 2, 'partner_to_receiver', 'bdsm', 'mode_required', false, false, array[]::text[], 'Drz partnerove ruky nad hlavou kratko a spoj to s bozkami alebo dotykom.', 'Bez tlaku na zapastia, lakte alebo ramena.', array['Kink Checklist BDSM safety']),
  ('soft_wrist_restraint', 'jemne obmedzenie zapasti', 3, 'partner_to_receiver', 'bdsm', 'planned_only', true, true, array['satka','makke putka'], 'Pouzi jemne obmedzenie zapasti a nechaj volne jednoduche uvolnenie.', 'Ziadne pevne uzly, ziadne necitlive prsty, ziadne zavesenie vahy tela.', array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('no_touch_tease', 'zakaz dotyku ako hra', 2, 'mutual', 'bdsm', 'mode_required', false, false, array[]::text[], 'Na kratky cas plati pravidlo, ze prijimatel sa nesmie dotknut spat.', 'Karta ma byt hrava, nie ponizujuca, ak to nema prijimatel rad.', array['Kink Checklist BDSM safety']),
  ('simple_command_scene', 'jednoduche pokyny', 2, 'partner_to_receiver', 'bdsm', 'mode_required', false, false, array[]::text[], 'Jeden dava kratke pokyny typu pozri sa na mna, spomal, pod sem.', 'Zostat pri jednoduchych vetach a sledovat reakciu.', array['Kink Checklist BDSM safety']),
  ('soft_impact_choice', 'vyber miesta pre jemny impact', 3, 'partner_to_receiver', 'bdsm', 'mode_required', true, true, array['ruka','placacka','flogger'], 'Vyberte iba jedno miesto pre jemny impact: zadok alebo vnutorne stehna.', 'Neudierat klby, krk, hlavu, brucho ani priame genitalie.', array['TASHRA BDSM risk awareness']),
  ('aftercare_card', 'aftercare po intenzite', 1, 'mutual', 'bdsm', 'mode_required', false, false, array[]::text[], 'Po intenzivnejsom kole dajte vodu, objatie, pokoj alebo kratku spatnu vazbu.', 'Aftercare je sucast flow, nie trest ani formalita.', array['BDSM Wiki aftercare','Kink Checklist BDSM safety'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  scene_level = excluded.scene_level,
  actor_scope = excluded.actor_scope,
  play_mode_slug = excluded.play_mode_slug,
  random_policy = excluded.random_policy,
  requires_aftercare = excluded.requires_aftercare,
  requires_tool = excluded.requires_tool,
  tool_tags = excluded.tool_tags,
  prompt_sk = excluded.prompt_sk,
  caution_sk = excluded.caution_sk,
  source_refs = excluded.source_refs;

create or replace view rel.v_intimate_generator_candidates as
select
  r.zone_slug,
  z.label_sk as zone_label_sk,
  z.target as zone_target,
  z.region,
  z.is_genital,
  z.is_internal,
  z.dice_enabled,
  r.technique_slug,
  t.label_sk as technique_label_sk,
  t.family as technique_family,
  t.uses_mouth,
  t.uses_hands,
  t.uses_toy,
  t.bdsm_related,
  t.penetration_related,
  r.receiver_target,
  r.actor_scope,
  r.play_mode_slug,
  m.label_sk as play_mode_label_sk,
  r.min_intensity,
  r.max_intensity,
  r.random_policy,
  r.requires_warmup,
  r.requires_tool,
  r.requires_lube,
  r.requires_aftercare,
  r.tool_tags,
  r.prompt_sk,
  r.caution_sk,
  (
    r.random_policy in ('always_ok','preference_required')
    and r.max_intensity <= 3
    and z.is_internal = false
    and t.penetration_related = false
    and r.requires_aftercare = false
  ) as is_spontaneous_candidate,
  (
    r.random_policy = 'planned_only'
    or z.is_internal = true
    or t.penetration_related = true
    or r.requires_aftercare = true
  ) as needs_planned_flow
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug;

create or replace view rel.v_intimate_scene_candidate_counts as
select
  s.slug as scene_slug,
  s.label_sk as scene_label_sk,
  step.step_order,
  step.label_sk as step_label_sk,
  count(c.*) as candidate_count
from rel.intimate_scene_types s
join rel.intimate_scene_steps step on step.scene_slug = s.slug
left join rel.v_intimate_generator_candidates c on
  c.max_intensity <= step.max_intensity
  and c.random_policy = any(step.allowed_random_policies)
  and (
    cardinality(step.allowed_mode_slugs) = 0
    or c.play_mode_slug = any(step.allowed_mode_slugs)
  )
  and (
    cardinality(step.candidate_region_filter) = 0
    or c.region = any(step.candidate_region_filter)
  )
  and (
    cardinality(step.candidate_zone_filter) = 0
    or c.zone_slug = any(step.candidate_zone_filter)
  )
  and (
    cardinality(step.candidate_family_filter) = 0
    or c.technique_family = any(step.candidate_family_filter)
  )
group by s.slug, s.label_sk, step.step_order, step.label_sk
order by s.slug, step.step_order;

create or replace view rel.v_intimate_toy_zone_matrix as
select
  toy.slug as toy_slug,
  toy.label_sk as toy_label_sk,
  toy.family,
  zone.slug as zone_slug,
  zone.label_sk as zone_label_sk,
  zone.target as zone_target,
  toy.beginner_ok,
  toy.external_only,
  toy.requires_lube,
  toy.requires_cleaning,
  toy.requires_condom_when_shared,
  toy.planned_only,
  toy.bdsm_related
from rel.intimate_toy_profiles toy
join rel.erogenous_zones zone on zone.slug = any(toy.compatible_zone_slugs);

grant select on rel.intimate_toy_profiles to anon, authenticated;
grant select on rel.intimate_scene_types to anon, authenticated;
grant select on rel.intimate_scene_steps to anon, authenticated;
grant select on rel.intimate_bondage_scene_cards to anon, authenticated;
grant select on rel.v_intimate_generator_candidates to anon, authenticated;
grant select on rel.v_intimate_scene_candidate_counts to anon, authenticated;
grant select on rel.v_intimate_toy_zone_matrix to anon, authenticated;
