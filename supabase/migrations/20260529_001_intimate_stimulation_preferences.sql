-- =============================================================================
-- DeepTalks · Intimne dobrodruzstvo — stimulation preference engine
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- This is the second layer above erogenous_zones:
-- - zones say WHERE on the body
-- - techniques say WHAT can be done
-- - rules say FOR WHOM, BY WHOM, how intense, whether random-safe or planned
-- - preferences let each partner narrow the dice before play
--
-- Pilot content: nipples / areola for all genders.
-- =============================================================================

create extension if not exists "pgcrypto";
create schema if not exists rel;

do $$ begin
  create type rel.intimate_preference_value as enum (
    'love',
    'like',
    'curious',
    'maybe_later',
    'not_now',
    'no'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type rel.intimate_actor_scope as enum (
    'partner_to_receiver',
    'receiver_self',
    'mutual',
    'either'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type rel.intimate_random_policy as enum (
    'always_ok',
    'preference_required',
    'mode_required',
    'planned_only',
    'never_random'
  );
exception when duplicate_object then null; end $$;

create table if not exists rel.intimate_play_modes (
  slug              text primary key,
  label_sk          text not null,
  description_sk    text not null,
  sort_order        smallint not null,
  random_enabled    boolean not null default true
);

create table if not exists rel.intimate_intensity_levels (
  level             smallint primary key check (level between 1 and 5),
  slug              text unique not null,
  label_sk          text not null,
  description_sk    text not null
);

create table if not exists rel.intimate_stimulation_techniques (
  slug              text primary key,
  label_sk          text not null,
  family            text not null,
  description_sk    text not null,
  default_actor     rel.intimate_actor_scope not null default 'partner_to_receiver',
  uses_mouth        boolean not null default false,
  uses_hands        boolean not null default false,
  uses_toy          boolean not null default false,
  bdsm_related      boolean not null default false,
  penetration_related boolean not null default false,
  source_refs       text[] not null default '{}',
  created_at        timestamptz not null default now()
);

create table if not exists rel.intimate_zone_stimulation_rules (
  zone_slug             text not null references rel.erogenous_zones(slug) on delete cascade,
  technique_slug        text not null references rel.intimate_stimulation_techniques(slug) on delete cascade,
  receiver_target       rel.intimate_body_target not null default 'all',
  actor_scope           rel.intimate_actor_scope not null default 'partner_to_receiver',
  play_mode_slug        text not null references rel.intimate_play_modes(slug),
  min_intensity         smallint not null references rel.intimate_intensity_levels(level),
  max_intensity         smallint not null references rel.intimate_intensity_levels(level),
  suggested_seconds_min integer not null check (suggested_seconds_min >= 0),
  suggested_seconds_max integer not null check (suggested_seconds_max >= suggested_seconds_min),
  random_policy         rel.intimate_random_policy not null,
  requires_warmup       boolean not null default false,
  requires_tool         boolean not null default false,
  requires_lube         boolean not null default false,
  requires_aftercare    boolean not null default false,
  tool_tags             text[] not null default '{}',
  prompt_sk             text not null,
  caution_sk            text,
  source_refs           text[] not null default '{}',
  created_at            timestamptz not null default now(),
  primary key (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug)
);

create table if not exists rel.couple_intimate_zone_preferences (
  couple_id             uuid not null references rel.couples(id) on delete cascade,
  user_id               uuid not null,
  zone_slug             text not null references rel.erogenous_zones(slug) on delete cascade,
  preference            rel.intimate_preference_value not null,
  intensity_min         smallint references rel.intimate_intensity_levels(level),
  intensity_max         smallint references rel.intimate_intensity_levels(level),
  notes                 text,
  updated_at            timestamptz not null default now(),
  primary key (couple_id, user_id, zone_slug)
);

create table if not exists rel.couple_intimate_technique_preferences (
  couple_id             uuid not null references rel.couples(id) on delete cascade,
  user_id               uuid not null,
  zone_slug             text not null references rel.erogenous_zones(slug) on delete cascade,
  technique_slug        text not null references rel.intimate_stimulation_techniques(slug) on delete cascade,
  preference            rel.intimate_preference_value not null,
  intensity_min         smallint references rel.intimate_intensity_levels(level),
  intensity_max         smallint references rel.intimate_intensity_levels(level),
  only_in_mode_slug     text references rel.intimate_play_modes(slug),
  notes                 text,
  updated_at            timestamptz not null default now(),
  primary key (couple_id, user_id, zone_slug, technique_slug)
);

create index if not exists intimate_zone_rules_lookup_idx
  on rel.intimate_zone_stimulation_rules (zone_slug, receiver_target, play_mode_slug, random_policy);

create index if not exists intimate_zone_rules_technique_idx
  on rel.intimate_zone_stimulation_rules (technique_slug);

insert into rel.intimate_play_modes (slug, label_sk, description_sk, sort_order, random_enabled) values
  ('explore',      'Objavovanie',          'Nizsi tlak, vhodne na zistenie preferencii a nalady.', 10, true),
  ('sensual',      'Zmyselne',             'Bozky, jazyk, ruky, tempo, dych a cele telo.', 20, true),
  ('intense',      'Intenzivne',           'Silnejsi tlak, sanie, hryzenie, rychlejsie alebo vyraznejsie podnety.', 30, true),
  ('toys',         'Pomocky',              'Vibracie, svorky, prisavky, lubrikanty a ine pomocky.', 40, true),
  ('bdsm',         'BDSM / mocenska hra',  'Bolest, tlak, svorky, impact, kontrola a role.', 50, true),
  ('planned_edge', 'Planovane / pokrocile','Veci, ktore sa nemaju objavit ako nahodna karta bez pripravy.', 60, false)
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  description_sk = excluded.description_sk,
  sort_order = excluded.sort_order,
  random_enabled = excluded.random_enabled;

insert into rel.intimate_intensity_levels (level, slug, label_sk, description_sk) values
  (1, 'very_light', 'ultra jemne', 'Minimalny tlak alebo kratky test vnimania.'),
  (2, 'light',      'jemne',       'Jemne, ale cielene. Stale vhodne na objavovanie.'),
  (3, 'medium',     'stredne',     'Bezna zmyselna intenzita, ktoru vela ludi vnima uz jasne.'),
  (4, 'strong',     'silne',       'Vyrazny tlak, sanie, tah alebo tempo; len ak to prijimatel chce.'),
  (5, 'kink',       'BDSM / bolestive', 'Bolest, svorky, impact alebo velmi intenzivne podnety; len v povolenom rezime.')
on conflict (level) do update set
  slug = excluded.slug,
  label_sk = excluded.label_sk,
  description_sk = excluded.description_sk;

insert into rel.intimate_stimulation_techniques
  (slug, label_sk, family, description_sk, default_actor, uses_mouth, uses_hands, uses_toy, bdsm_related, penetration_related, source_refs)
values
  ('kiss_soft',          'jemne bozkavanie',         'mouth', 'Makke bozky na zvolenu zonu.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play','JSM nipple/breast stimulation']),
  ('kiss_firm',          'pevnejsie bozky',          'mouth', 'Vyraznejsie bozky s vacsim tlakom pier.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('lick_flat',          'lizanie plochou jazyka',   'mouth', 'Pomaly kontakt vacsou plochou jazyka.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('tongue_circle',      'kruzenie jazykom',         'mouth', 'Kruzenie okolo alebo priamo na citlivej casti.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('suck_light',         'jemne sanie',              'mouth', 'Sanie ustami s nizsim podtlakom.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('suck_strong',        'silne sanie',              'mouth', 'Vyrazne sanie ustami, vhodne len po preferencnom povoleni.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('nibble_soft',        'jemne hryzkanie',          'mouth', 'Hrave pouzitie zubov bez silneho tlaku.', 'partner_to_receiver', true, false, false, false, false, array['Healthline nipple clamps safety guide']),
  ('bite_controlled',    'kontrolovane hryzenie',    'mouth', 'Vyraznejsi tlak zubami, iba ak ho prijimatel chce.', 'partner_to_receiver', true, false, false, true, false, array['Healthline nipple clamps safety guide']),
  ('touch_trace',        'obkreslovanie prstami',    'hands', 'Pomaly dotyk okolo citlivej oblasti.', 'partner_to_receiver', false, true, false, false, false, array['WebMD nipple play']),
  ('pinch_light',        'jemne stipnutie',          'hands', 'Kratke stlacenie medzi prstami.', 'partner_to_receiver', false, true, false, false, false, array['WebMD nipple play']),
  ('pinch_firm',         'pevne stipnutie',          'hands', 'Vyraznejsie stlacenie medzi prstami.', 'partner_to_receiver', false, true, false, true, false, array['Healthline nipple clamps safety guide']),
  ('roll_between_fingers','rolovanie medzi prstami', 'hands', 'Pomalé rolovanie alebo rotacia medzi prstami.', 'partner_to_receiver', false, true, false, false, false, array['WebMD nipple play']),
  ('pull_light',         'jemne potiahnutie',        'hands', 'Kratke a kontrolovane potiahnutie.', 'partner_to_receiver', false, true, false, true, false, array['Healthline nipple clamps safety guide']),
  ('vibration_low',      'jemna vibracia',           'toy',   'Nizka intenzita vibratora alebo malej pomocky.', 'partner_to_receiver', false, false, true, false, false, array['WebMD clitoral suction and toy safety']),
  ('vibration_strong',   'silnejsia vibracia',       'toy',   'Vyraznejsia vibracia; len po preferencnom povoleni.', 'partner_to_receiver', false, false, true, false, false, array['WebMD clitoral suction and toy safety']),
  ('suction_cup',        'prisavka / podtlakova pomocka', 'toy', 'Pomocka s podtlakom, nie oralne sanie.', 'partner_to_receiver', false, false, true, false, false, array['WebMD clitoral suction toys','Healthline nipple clamps safety guide']),
  ('adjustable_clamp',   'nastavitelna svorka',      'bdsm',  'Svorka s nastavitelznym tlakom.', 'partner_to_receiver', false, false, true, true, false, array['Healthline nipple clamps safety guide','A Woman’s Touch nipple clamp safety']),
  ('clamp_tug_light',    'jemny tah za svorku',      'bdsm',  'Tah alebo pohyb svorkou, iba kratko a v BDSM mode.', 'partner_to_receiver', false, false, true, true, false, array['Healthline nipple clamps safety guide']),
  ('temperature_ice',    'lad / chlad',              'sensation', 'Kratky chladovy podnet.', 'partner_to_receiver', false, true, true, false, false, array['Healthline nipple clamps safety guide']),
  ('temperature_warm',   'teplo',                    'sensation', 'Kratky teply podnet bez palenia.', 'partner_to_receiver', false, true, true, false, false, array['Healthline nipple clamps safety guide']),
  ('feather_tease',      'pierko / velmi lahky dotyk','sensation','Lahky senzoricky podnet.', 'partner_to_receiver', false, true, true, false, false, array['WebMD nipple play']),
  ('impact_breast_soft', 'jemny impact cez prsia',  'impact', 'Lahky impact na prsia/hrudnik, nie prudky uder priamo na bradavku.', 'partner_to_receiver', false, true, true, true, false, array['TASHRA BDSM risk awareness','Healthline nipple clamps safety guide'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  family = excluded.family,
  description_sk = excluded.description_sk,
  default_actor = excluded.default_actor,
  uses_mouth = excluded.uses_mouth,
  uses_hands = excluded.uses_hands,
  uses_toy = excluded.uses_toy,
  bdsm_related = excluded.bdsm_related,
  penetration_related = excluded.penetration_related,
  source_refs = excluded.source_refs;

with nipple_rules(
  zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
  min_i, max_i, min_s, max_s, random_policy, warmup, tool, aftercare,
  tool_tags, prompt, caution, refs
) as (
  values
    -- Areola / dvorec: often a good bridge before direct nipple stimulation.
    ('areola','kiss_soft','all','partner_to_receiver','explore',1,2,5,45,'always_ok',false,false,false,array[]::text[],'Jemne bozkavaj dvorec okolo bradavky, nie priamo bradavku.',null,array['WebMD nipple play']),
    ('areola','lick_flat','all','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Pomaly prejdi jazykom po dvorci a sleduj reakciu.',null,array['WebMD nipple play']),
    ('areola','tongue_circle','all','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Kruz jazykom okolo bradavky bez priameho tlaku.',null,array['WebMD nipple play']),
    ('areola','touch_trace','all','partner_to_receiver','explore',1,3,10,90,'always_ok',false,false,false,array[]::text[],'Prstami pomaly obkresluj dvorec a men tlak podla reakcie.',null,array['WebMD nipple play']),
    ('areola','feather_tease','all','partner_to_receiver','explore',1,2,10,90,'always_ok',false,true,false,array['pierko'],'Prechadzaj pierkom po dvorci a okolo prsnej oblasti.',null,array['WebMD nipple play']),
    ('areola','temperature_ice','all','partner_to_receiver','toys',1,3,3,20,'preference_required',true,true,false,array['lad'],'Kratko priloz chlad v okoli dvorca, potom prejdi na teply dotyk rukou.','Chlad len kratko; nepouzivat pri necitlivosti alebo bolesti.',array['Healthline nipple clamps safety guide']),

    -- Direct nipple, lower and medium intensity.
    ('nipples','kiss_soft','all','partner_to_receiver','explore',1,2,3,45,'always_ok',false,false,false,array[]::text[],'Jemne pobozkaj bradavku a potom sa vrat na dvorec.',null,array['WebMD nipple play','JSM nipple/breast stimulation']),
    ('nipples','kiss_firm','all','partner_to_receiver','sensual',2,3,5,60,'preference_required',false,false,false,array[]::text[],'Bozkavaj bradavku pevnejsim tlakom pier a striedaj pauzy.',null,array['WebMD nipple play']),
    ('nipples','lick_flat','all','partner_to_receiver','sensual',1,3,3,60,'preference_required',false,false,false,array[]::text[],'Pouzi jazyk na bradavku kratko a pomaly, potom zmen rytmus.',null,array['WebMD nipple play']),
    ('nipples','tongue_circle','all','partner_to_receiver','sensual',1,3,3,60,'preference_required',false,false,false,array[]::text[],'Kruz jazykom okolo bradavky a iba obcas prejdi priamo cez nu.',null,array['WebMD nipple play']),
    ('nipples','suck_light','all','partner_to_receiver','sensual',2,3,5,45,'preference_required',false,false,false,array[]::text[],'Jemne saj bradavku a po par sekundach povol.',null,array['WebMD nipple play']),
    ('nipples','suck_strong','all','partner_to_receiver','intense',3,4,5,30,'preference_required',true,false,false,array[]::text[],'Silnejsie saj bradavku kratko, potom uvolni a sleduj reakciu.','Silne sanie nelosovat bez preferencie prijimatela.',array['WebMD nipple play']),
    ('nipples','nibble_soft','all','partner_to_receiver','sensual',2,3,3,20,'preference_required',false,false,false,array[]::text[],'Jemne zachyt bradavku zubami bez silneho tlaku a hned povol.',null,array['Healthline nipple clamps safety guide']),
    ('nipples','bite_controlled','all','partner_to_receiver','intense',3,4,2,15,'preference_required',true,false,false,array[]::text[],'Kontrolovane zahryzni do bradavky iba na okamih a hned zmierni.','Zuby patria len do intenzivneho rezimu po nastaveni preferencii.',array['Healthline nipple clamps safety guide']),
    ('nipples','touch_trace','all','partner_to_receiver','explore',1,3,10,90,'always_ok',false,false,false,array[]::text[],'Prstom obkresluj bradavku a dvorec bez staleho tlaku.',null,array['WebMD nipple play']),
    ('nipples','pinch_light','all','partner_to_receiver','sensual',2,3,2,30,'preference_required',false,false,false,array[]::text[],'Jemne stlac bradavku medzi prstami a pusti.',null,array['WebMD nipple play']),
    ('nipples','pinch_firm','all','partner_to_receiver','intense',3,4,2,20,'preference_required',true,false,false,array[]::text[],'Pevnejsie stlac bradavku medzi prstami, kratko podrz a pusti.','Silne stlacenie len pre prijimatela, ktory to chce.',array['WebMD nipple play']),
    ('nipples','roll_between_fingers','all','partner_to_receiver','sensual',2,4,5,45,'preference_required',false,false,false,array[]::text[],'Pomaly roluj bradavku medzi prstami a men tlak.',null,array['WebMD nipple play']),
    ('nipples','pull_light','all','partner_to_receiver','intense',3,4,2,20,'preference_required',true,false,false,array[]::text[],'Jemne potiahni bradavku a potom ju pust alebo pobozkaj.','Tah len kratko a kontrolovane.',array['Healthline nipple clamps safety guide']),

    -- Toys and BDSM: never as default random unless mode/profile says yes.
    ('nipples','vibration_low','all','partner_to_receiver','toys',1,3,5,60,'preference_required',false,true,false,array['vibrator'],'Pouzi nizku vibraciu na bradavku alebo jej okolie.',null,array['WebMD nipple play']),
    ('nipples','vibration_strong','all','partner_to_receiver','toys',3,4,5,45,'preference_required',true,true,false,array['vibrator'],'Pouzi silnejsiu vibraciu kratko a striedaj pauzy.','Silna vibracia len po preferencnom povoleni.',array['WebMD clitoral suction toys']),
    ('nipples','suction_cup','all','partner_to_receiver','toys',2,4,10,120,'mode_required',true,true,false,array['prisavka','podtlak'],'Pouzi podtlakovu pomocku alebo prisavku v nastavenej intenzite.','Podtlakove pomocky patria do rezimu Pomocky.',array['WebMD clitoral suction toys','Healthline nipple clamps safety guide']),
    ('nipples','adjustable_clamp','all','partner_to_receiver','bdsm',2,5,30,300,'mode_required',true,true,true,array['nastavitelne svorky'],'Nasad nastavitelnu svorku na nizkej intenzite a po chvili sa opytaj, ci pridat alebo ubrat.','Prvykrat kratko; nastavitelne svorky su vhodnejsie nez silne neregulovatelne.',array['Healthline nipple clamps safety guide','A Woman’s Touch nipple clamp safety']),
    ('nipples','clamp_tug_light','all','partner_to_receiver','bdsm',3,5,3,20,'planned_only',true,true,true,array['svorky'],'V BDSM mode velmi jemne pohni svorkou alebo retiazkou a hned sleduj reakciu.','Tah za svorku nikdy nelosovat v beznom mixe.',array['Healthline nipple clamps safety guide']),
    ('nipples','temperature_ice','all','partner_to_receiver','toys',1,3,3,20,'preference_required',true,true,false,array['lad'],'Kratko prejdi ladom pri bradavke a potom ju zahrej ustami alebo rukou.','Lad len kratko, nie pri strate citlivosti.',array['Healthline nipple clamps safety guide']),
    ('nipples','temperature_warm','all','partner_to_receiver','toys',1,3,3,30,'preference_required',true,true,false,array['teplo'],'Pouzi prijemne teply dotyk v okoli bradavky.','Ziadne palenie ani horuci vosk v zakladnom rezime.',array['Healthline nipple clamps safety guide']),
    ('breasts','impact_breast_soft','female','partner_to_receiver','bdsm',2,4,3,30,'mode_required',true,true,true,array['placacka','flogger'],'V BDSM mode pouzi lahky impact na prsia alebo hrudnik, nie prudko priamo na bradavku.','Impact cez prsia/hrudnik vyzaduje nastaveny BDSM rezim.',array['TASHRA BDSM risk awareness'])
)
insert into rel.intimate_zone_stimulation_rules
  (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
   min_intensity, max_intensity, suggested_seconds_min, suggested_seconds_max,
   random_policy, requires_warmup, requires_tool, requires_aftercare, tool_tags,
   prompt_sk, caution_sk, source_refs)
select
  zone_slug,
  technique_slug,
  receiver_target::rel.intimate_body_target,
  actor_scope::rel.intimate_actor_scope,
  play_mode_slug,
  min_i,
  max_i,
  min_s,
  max_s,
  random_policy::rel.intimate_random_policy,
  warmup,
  tool,
  aftercare,
  tool_tags,
  prompt,
  caution,
  refs
from nipple_rules
on conflict (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug) do update set
  min_intensity = excluded.min_intensity,
  max_intensity = excluded.max_intensity,
  suggested_seconds_min = excluded.suggested_seconds_min,
  suggested_seconds_max = excluded.suggested_seconds_max,
  random_policy = excluded.random_policy,
  requires_warmup = excluded.requires_warmup,
  requires_tool = excluded.requires_tool,
  requires_aftercare = excluded.requires_aftercare,
  tool_tags = excluded.tool_tags,
  prompt_sk = excluded.prompt_sk,
  caution_sk = excluded.caution_sk,
  source_refs = excluded.source_refs;

alter table rel.couple_intimate_zone_preferences enable row level security;
alter table rel.couple_intimate_technique_preferences enable row level security;

do $$ begin
  create policy couple_zone_prefs_owner_all on rel.couple_intimate_zone_preferences
    for all
    using (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
    with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy couple_technique_prefs_owner_all on rel.couple_intimate_technique_preferences
    for all
    using (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
    with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

grant usage on schema rel to anon, authenticated;
grant select on rel.intimate_play_modes to anon, authenticated;
grant select on rel.intimate_intensity_levels to anon, authenticated;
grant select on rel.intimate_stimulation_techniques to anon, authenticated;
grant select on rel.intimate_zone_stimulation_rules to anon, authenticated;
grant select, insert, update, delete on rel.couple_intimate_zone_preferences to authenticated;
grant select, insert, update, delete on rel.couple_intimate_technique_preferences to authenticated;
