-- =============================================================================
-- DeepTalks · Relationship Companion — base schema
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
-- Idempotent: safe to run against a DB that already has the schema.
-- =============================================================================

create extension if not exists "pgcrypto";

create schema if not exists rel;

-- =============================================================================
-- SHARED REFERENCE TABLES
-- =============================================================================

create table if not exists rel.languages (
  code  text primary key,
  name  text not null,
  rtl   boolean not null default false
);

create table if not exists rel.cultural_locales (
  code                  text primary key,
  language_code         text not null references rel.languages(code),
  region                text,
  max_intensity_allowed smallint check (max_intensity_allowed between 1 and 5)
);

-- =============================================================================
-- ENUMS
-- =============================================================================

do $$ begin
  create type rel.effort_band   as enum ('micro','short','evening','day_plus');
exception when duplicate_object then null; end $$;

do $$ begin
  create type rel.activity_mode as enum (
    'solo_for_partner','together','async_remote','prepared_surprise'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type rel.love_language as enum ('words','time','touch','gifts','acts');
exception when duplicate_object then null; end $$;

do $$ begin
  create type rel.answer as enum ('yes','maybe','no','later');
exception when duplicate_object then null; end $$;

-- =============================================================================
-- CONTENT TABLES
-- =============================================================================

create table if not exists rel.challenges (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  intensity       smallint not null check (intensity between 1 and 5),
  erotic_sublevel smallint check (
    (intensity = 5 and erotic_sublevel between 1 and 5)
    or (intensity < 5 and erotic_sublevel is null)
  ),
  effort          rel.effort_band   not null,
  mode            rel.activity_mode not null,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

create table if not exists rel.challenge_translations (
  challenge_id   uuid not null references rel.challenges(id) on delete cascade,
  locale_code    text not null references rel.cultural_locales(code),
  title          text not null,
  body           text not null,
  human_reviewed boolean not null default false,
  primary key (challenge_id, locale_code)
);

create table if not exists rel.challenge_locale_availability (
  challenge_id  uuid not null references rel.challenges(id) on delete cascade,
  locale_code   text not null references rel.cultural_locales(code),
  is_published  boolean not null default true,
  block_reason  text,
  primary key (challenge_id, locale_code)
);

create table if not exists rel.tags (
  id    smallint generated always as identity primary key,
  slug  text unique not null
);

create table if not exists rel.challenge_tags (
  challenge_id uuid     not null references rel.challenges(id) on delete cascade,
  tag_id       smallint not null references rel.tags(id) on delete cascade,
  primary key (challenge_id, tag_id)
);

create index if not exists challenges_intensity_effort_idx
  on rel.challenges (intensity, effort) where is_active;
create index if not exists challenge_translations_locale_idx
  on rel.challenge_translations (locale_code);

-- =============================================================================
-- COUPLES & MEMBERSHIP
-- =============================================================================

create table if not exists rel.couples (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table if not exists rel.couple_members (
  couple_id uuid not null references rel.couples(id) on delete cascade,
  user_id   uuid not null,
  joined_at timestamptz not null default now(),
  primary key (couple_id, user_id)
);

create unique index if not exists couple_members_user_unique
  on rel.couple_members (user_id);

create table if not exists rel.couple_settings (
  couple_id              uuid primary key references rel.couples(id) on delete cascade,
  max_intensity_unlocked smallint not null default 1 check (max_intensity_unlocked between 1 and 5),
  max_erotic_sublevel    smallint not null default 0 check (max_erotic_sublevel between 0 and 5),
  updated_at             timestamptz not null default now()
);

-- =============================================================================
-- DOUBLE-BLIND RESPONSES
-- =============================================================================

create table if not exists rel.challenge_responses (
  couple_id    uuid not null references rel.couples(id) on delete cascade,
  user_id      uuid not null,
  challenge_id uuid not null references rel.challenges(id) on delete cascade,
  answer       rel.answer not null,
  answered_at  timestamptz not null default now(),
  primary key (couple_id, user_id, challenge_id)
);
create index if not exists challenge_responses_couple_challenge_idx
  on rel.challenge_responses (couple_id, challenge_id);

create table if not exists rel.ladder_confirmations (
  couple_id        uuid not null references rel.couples(id) on delete cascade,
  user_id          uuid not null,
  target_intensity smallint not null check (target_intensity between 1 and 5),
  target_sublevel  smallint not null default 0 check (target_sublevel between 0 and 5),
  confirmed_at     timestamptz not null default now(),
  primary key (couple_id, user_id, target_intensity, target_sublevel)
);

-- =============================================================================
-- ANTI-FORGETTING MOTOR — base tables
-- =============================================================================

create table if not exists rel.activity_templates (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  love_language rel.love_language not null,
  effort        rel.effort_band   not null
);

create table if not exists rel.activity_translations (
  template_id uuid not null references rel.activity_templates(id) on delete cascade,
  locale_code text not null references rel.cultural_locales(code),
  prompt      text not null,
  primary key (template_id, locale_code)
);

create table if not exists rel.user_prefs (
  user_id               uuid primary key,
  preferred_locale      text references rel.cultural_locales(code),
  primary_love_language rel.love_language,
  erotic_opt_in         boolean not null default false,
  updated_at            timestamptz not null default now()
);

-- =============================================================================
-- AUTHORIZATION HELPERS  (SECURITY DEFINER to avoid RLS recursion)
-- =============================================================================

create or replace function rel.is_couple_member(p_couple_id uuid, p_user uuid)
returns boolean
language sql stable security definer set search_path = rel, public as $$
  select exists (
    select 1 from rel.couple_members
    where couple_id = p_couple_id and user_id = p_user
  );
$$;

create or replace function rel.my_couple_id()
returns uuid
language sql stable security definer set search_path = rel, public as $$
  select couple_id from rel.couple_members
  where user_id = auth.uid() limit 1;
$$;

create or replace function rel.get_matched_challenges(p_couple_id uuid)
returns table (
  challenge_id    uuid,
  slug            text,
  intensity       smallint,
  erotic_sublevel smallint,
  effort          rel.effort_band,
  mode            rel.activity_mode
)
language sql stable security definer set search_path = rel, public as $$
  select c.id, c.slug, c.intensity, c.erotic_sublevel, c.effort, c.mode
  from rel.challenges c
  cross join lateral (
    select cs.max_intensity_unlocked as mi, cs.max_erotic_sublevel as me
    from rel.couple_settings cs where couple_id = p_couple_id
  ) s
  where rel.is_couple_member(p_couple_id, auth.uid())
    and c.is_active
    and c.intensity <= s.mi
    and (c.intensity < 5 or c.erotic_sublevel <= s.me)
    and (
      select count(*) = 2 from (
        select r.user_id
        from rel.challenge_responses r
        join rel.couple_members m
          on m.user_id = r.user_id and m.couple_id = p_couple_id
        where r.challenge_id = c.id and r.answer in ('yes','maybe')
        group by r.user_id
      ) both_said_yes
    );
$$;

create or replace function rel.try_unlock_ladder(
  p_couple_id       uuid,
  p_target_intensity smallint,
  p_target_sublevel  smallint default 0
)
returns boolean
language plpgsql security definer set search_path = rel, public as $$
declare both_confirmed boolean;
begin
  if not rel.is_couple_member(p_couple_id, auth.uid()) then
    raise exception 'not a member of this couple';
  end if;

  select count(distinct user_id) = 2 into both_confirmed
  from rel.ladder_confirmations
  where couple_id = p_couple_id
    and target_intensity = p_target_intensity
    and target_sublevel  = p_target_sublevel;

  if both_confirmed then
    update rel.couple_settings
       set max_intensity_unlocked = greatest(max_intensity_unlocked, p_target_intensity),
           max_erotic_sublevel    = greatest(max_erotic_sublevel,    p_target_sublevel),
           updated_at             = now()
     where couple_id = p_couple_id;
    return true;
  end if;
  return false;
end;
$$;

-- =============================================================================
-- ROW-LEVEL SECURITY
-- =============================================================================

alter table rel.couples              enable row level security;
alter table rel.couple_members       enable row level security;
alter table rel.couple_settings      enable row level security;
alter table rel.challenge_responses  enable row level security;
alter table rel.ladder_confirmations enable row level security;
alter table rel.user_prefs           enable row level security;

do $$ begin
  create policy couples_member_read on rel.couples
    for select using (rel.is_couple_member(id, auth.uid()));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy members_read on rel.couple_members
    for select using (rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy settings_read on rel.couple_settings
    for select using (rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy responses_owner_all on rel.challenge_responses
    for all
    using  (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
    with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy ladder_owner_all on rel.ladder_confirmations
    for all
    using  (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
    with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy prefs_owner_all on rel.user_prefs
    for all using (user_id = auth.uid()) with check (user_id = auth.uid());
exception when duplicate_object then null; end $$;

-- =============================================================================
-- SEED — reference data
-- =============================================================================

insert into rel.languages (code, name) values
  ('sk', 'Slovenčina'),
  ('en', 'English'),
  ('cs', 'Čeština'),
  ('pl', 'Polski'),
  ('hu', 'Magyar'),
  ('de', 'Deutsch')
on conflict do nothing;

insert into rel.cultural_locales (code, language_code, region, max_intensity_allowed) values
  ('sk-SK', 'sk', 'SK', 5),
  ('en-US', 'en', 'US', 5),
  ('en-GB', 'en', 'GB', 5),
  ('cs-CZ', 'cs', 'CZ', 5),
  ('pl-PL', 'pl', 'PL', 5),
  ('hu-HU', 'hu', 'HU', 5),
  ('de-DE', 'de', 'DE', 5)
on conflict do nothing;

insert into rel.tags (slug) values
  ('playful'),('vulnerability'),('touch'),('adventure'),('nostalgia'),('fantasy')
on conflict do nothing;

-- Demo challenge seed (structure only — not the nudge content library)
insert into rel.challenges (slug, intensity, erotic_sublevel, effort, mode) values
  ('gratitude-one-line',   1, null, 'micro',    'async_remote'),
  ('living-room-dance',    2, null, 'short',    'together'),
  ('blind-trip-plan',      3, null, 'day_plus', 'prepared_surprise'),
  ('slow-evening-massage', 4, null, 'evening',  'together'),
  ('flirty-texts-all-day', 5, 1,    'micro',    'async_remote')
on conflict do nothing;
