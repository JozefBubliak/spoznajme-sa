-- =============================================================================
-- DeepTalks · Relationship Companion  —  shared multilingual schema
-- Target: PostgreSQL 15+ / Supabase
-- =============================================================================
--
-- DESIGN PRINCIPLES
--   1. Single shared DB with DeepTalks. This product lives in schema `rel`
--      and reuses shared reference tables (languages, cultural_locales).
--      If DeepTalks already has equivalents, drop the CREATE IF NOT EXISTS
--      blocks below and point the FKs at the existing tables.
--   2. Double-blind consent is enforced at the DATABASE layer (RLS), not in
--      app code. A partner's individual answers are never readable via API.
--      Matches are computed server-side and only the INTERSECTION is returned.
--   3. Matches are computed on-read (no materialization), so "revoke anytime"
--      works cleanly: withdraw a 'yes' and the match silently disappears.
--   4. Content is keyed on (language x cultural_variant), with per-locale
--      sensitivity/legal availability flags.
--   5. Erotic content (intensity 5) has its own sub-scale (5a..5e) gated by a
--      mutual, monotonic "safety ladder" the couple unlocks together.
--
-- Naming: caller identity = auth.uid() (Supabase). Replace with your own
--         current_user_id() if not on Supabase auth.
-- =============================================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid()

create schema if not exists rel;

-- =============================================================================
-- SHARED REFERENCE  (reuse DeepTalks' tables if they already exist)
-- =============================================================================

create table if not exists rel.languages (
  code        text primary key,            -- ISO 639-1, e.g. 'sk','en','de'
  name        text not null,
  rtl         boolean not null default false
);

-- A cultural variant is NOT the same as a language. Same language can carry a
-- different boldness/tone calibration per region/market.
create table if not exists rel.cultural_locales (
  code          text primary key,          -- e.g. 'sk-SK','en-US','en-GB','de-AT'
  language_code text not null references rel.languages(code),
  region        text,                      -- ISO 3166-1 alpha-2, e.g. 'SK'
  -- market-wide ceiling: max intensity this locale is even allowed to surface
  -- (store policy / legal). NULL = no extra restriction.
  max_intensity_allowed smallint check (max_intensity_allowed between 1 and 5)
);

-- =============================================================================
-- ENUMS
-- =============================================================================

do $$ begin
  create type rel.effort_band   as enum ('micro','short','evening','day_plus');
  create type rel.activity_mode as enum ('solo_for_partner','together','async_remote','prepared_surprise');
  create type rel.love_language  as enum ('words','time','touch','gifts','acts');
  create type rel.answer         as enum ('yes','maybe','no','later');
exception when duplicate_object then null; end $$;

-- =============================================================================
-- CONTENT  (language-neutral core + localized text)
-- =============================================================================

create table rel.challenges (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,                     -- stable key for content ops
  intensity       smallint not null check (intensity between 1 and 5),
  -- erotic sub-scale: 1..5 -> 5a..5e. NULL for intensity < 5.
  erotic_sublevel smallint check (
                    (intensity = 5 and erotic_sublevel between 1 and 5)
                    or (intensity < 5 and erotic_sublevel is null)),
  effort          rel.effort_band   not null,
  mode            rel.activity_mode not null,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- One row per (challenge x language x cultural variant). Variant lets you ship
-- e.g. a tamer 'en-US' wording and a bolder 'en-GB' wording of the same card.
create table rel.challenge_translations (
  challenge_id   uuid not null references rel.challenges(id) on delete cascade,
  locale_code    text not null references rel.cultural_locales(code),
  title          text not null,
  body           text not null,
  -- true = native-written / reviewed (required for intensity 4-5);
  -- false = machine translation pending review (ok for intensity 1-3).
  human_reviewed boolean not null default false,
  primary key (challenge_id, locale_code)
);

-- Per-locale publishability. A challenge can exist globally but be hidden in
-- specific markets for legal / store-policy reasons.
create table rel.challenge_locale_availability (
  challenge_id  uuid not null references rel.challenges(id) on delete cascade,
  locale_code   text not null references rel.cultural_locales(code),
  is_published  boolean not null default true,
  block_reason  text,                                       -- e.g. 'store_policy','legal'
  primary key (challenge_id, locale_code)
);

create table rel.tags (
  id    smallint generated always as identity primary key,
  slug  text unique not null                                -- 'playful','vulnerability','touch','adventure','nostalgia','fantasy'
);

create table rel.challenge_tags (
  challenge_id uuid     not null references rel.challenges(id) on delete cascade,
  tag_id       smallint not null references rel.tags(id) on delete cascade,
  primary key (challenge_id, tag_id)
);

create index on rel.challenges (intensity, effort) where is_active;
create index on rel.challenge_translations (locale_code);

-- =============================================================================
-- COUPLES & MEMBERSHIP
-- =============================================================================

create table rel.couples (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now()
);

create table rel.couple_members (
  couple_id  uuid not null references rel.couples(id) on delete cascade,
  user_id    uuid not null,                                 -- references auth.users(id)
  joined_at  timestamptz not null default now(),
  primary key (couple_id, user_id)
);
-- enforce exactly-two-member couples at the app/invite layer; a partial-unique
-- guard against a user being in multiple active couples can be added per product rule.
create unique index couple_members_user_unique on rel.couple_members (user_id);

-- Couple-level safety ladder: the unlocked ceiling. Erotic sub-levels are
-- unlocked monotonically and only with mutual confirmation (see below).
create table rel.couple_settings (
  couple_id              uuid primary key references rel.couples(id) on delete cascade,
  max_intensity_unlocked smallint not null default 1 check (max_intensity_unlocked between 1 and 5),
  max_erotic_sublevel    smallint not null default 0 check (max_erotic_sublevel between 0 and 5),
  updated_at             timestamptz not null default now()
);

-- =============================================================================
-- DOUBLE-BLIND RESPONSES
--   Each user privately answers cards. Rows are readable ONLY by their author.
--   The intersection is exposed only through get_matched_challenges().
-- =============================================================================

create table rel.challenge_responses (
  couple_id    uuid not null references rel.couples(id) on delete cascade,
  user_id      uuid not null,                               -- author (auth.users.id)
  challenge_id uuid not null references rel.challenges(id) on delete cascade,
  answer       rel.answer not null,
  answered_at  timestamptz not null default now(),
  primary key (couple_id, user_id, challenge_id)
);
create index on rel.challenge_responses (couple_id, challenge_id);

-- Mutual unlock requests for the safety ladder. A higher ceiling is granted
-- only when BOTH members have an active confirmation for that target level.
create table rel.ladder_confirmations (
  couple_id        uuid not null references rel.couples(id) on delete cascade,
  user_id          uuid not null,
  target_intensity smallint not null check (target_intensity between 1 and 5),
  target_sublevel  smallint not null default 0 check (target_sublevel between 0 and 5),
  confirmed_at     timestamptz not null default now(),
  primary key (couple_id, user_id, target_intensity, target_sublevel)
);

-- =============================================================================
-- ANTI-FORGETTING MOTOR  (lean: nudges / scheduled acts of affection)
-- =============================================================================

create table rel.activity_templates (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  love_language rel.love_language not null,
  effort        rel.effort_band   not null
);

create table rel.activity_translations (
  template_id uuid not null references rel.activity_templates(id) on delete cascade,
  locale_code text not null references rel.cultural_locales(code),
  prompt      text not null,
  primary key (template_id, locale_code)
);

-- Per-user preferences (which love language to weight, do-not-disturb, etc.)
create table rel.user_prefs (
  user_id              uuid primary key,                    -- auth.users.id
  preferred_locale     text references rel.cultural_locales(code),
  primary_love_language rel.love_language,
  erotic_opt_in        boolean not null default false,      -- gate for intensity 5 surfacing
  updated_at           timestamptz not null default now()
);

-- =============================================================================
-- AUTHORIZATION HELPERS  (SECURITY DEFINER → bypass RLS, avoid policy recursion)
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
  select couple_id from rel.couple_members where user_id = auth.uid() limit 1;
$$;

-- Returns ONLY the intersection: challenges where BOTH members answered
-- yes/maybe, capped by the couple's unlocked ladder. The caller never learns
-- the partner's per-card answers — only the shared result.
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
    select rel.couple_settings.max_intensity_unlocked as mi,
           rel.couple_settings.max_erotic_sublevel    as me
    from rel.couple_settings where couple_id = p_couple_id
  ) s
  where rel.is_couple_member(p_couple_id, auth.uid())   -- caller authorization (definer bypasses RLS)
    and c.is_active
    and c.intensity <= s.mi
    and (c.intensity < 5 or c.erotic_sublevel <= s.me)
    and (
      select count(*) = 2 from (
        select r.user_id
        from rel.challenge_responses r
        join rel.couple_members m
          on m.user_id = r.user_id and m.couple_id = p_couple_id
        where r.challenge_id = c.id
          and r.answer in ('yes','maybe')
        group by r.user_id
      ) both_said_yes
    );
$$;

-- Grants the next ladder step ONLY if both members have confirmed the target.
-- Monotonic: never lowers a ceiling here (revoking is a separate explicit op).
create or replace function rel.try_unlock_ladder(
  p_couple_id uuid, p_target_intensity smallint, p_target_sublevel smallint default 0)
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
           max_erotic_sublevel    = greatest(max_erotic_sublevel, p_target_sublevel),
           updated_at = now()
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

-- Couple visible to its members.
create policy couples_member_read on rel.couples
  for select using (rel.is_couple_member(id, auth.uid()));

-- Membership rows visible to members of the same couple.
create policy members_read on rel.couple_members
  for select using (rel.is_couple_member(couple_id, auth.uid()));

-- Settings: members read; writes go through try_unlock_ladder (definer) or a
-- members-only update for non-ceiling fields.
create policy settings_read on rel.couple_settings
  for select using (rel.is_couple_member(couple_id, auth.uid()));

-- *** The core double-blind guarantee ***
-- A response row is visible / writable ONLY to its author. There is no policy
-- that ever exposes a partner's row. The match is surfaced solely via the
-- SECURITY DEFINER function, which returns the intersection, not the answers.
create policy responses_owner_all on rel.challenge_responses
  for all
  using  (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
  with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));

-- Likewise, each member sees only their own ladder confirmations.
create policy ladder_owner_all on rel.ladder_confirmations
  for all
  using  (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
  with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));

create policy prefs_owner_all on rel.user_prefs
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Content tables (challenges/translations/tags/activities) are public read in
-- this product; no RLS needed. Restrict writes to a content/admin role:
--   revoke all on all tables in schema rel from anon, authenticated;
--   grant select on rel.challenges, rel.challenge_translations,
--                   rel.challenge_locale_availability, rel.tags,
--                   rel.challenge_tags, rel.activity_templates,
--                   rel.activity_translations to authenticated;
-- (Add a separate `content_editor` role for inserts/updates.)

-- =============================================================================
-- SEED  (structure demo — text kept at category level, not explicit)
-- =============================================================================

insert into rel.languages(code,name) values
  ('sk','Slovenčina'),('en','English') on conflict do nothing;

insert into rel.cultural_locales(code,language_code,region,max_intensity_allowed) values
  ('sk-SK','sk','SK',5),
  ('en-US','en','US',5),
  ('en-GB','en','GB',5) on conflict do nothing;

insert into rel.tags(slug) values
  ('playful'),('vulnerability'),('touch'),('adventure'),('nostalgia'),('fantasy')
  on conflict do nothing;

insert into rel.challenges(slug,intensity,erotic_sublevel,effort,mode) values
  ('gratitude-one-line',      1, null, 'micro',    'async_remote'),
  ('living-room-dance',       2, null, 'short',    'together'),
  ('blind-trip-plan',         3, null, 'day_plus', 'prepared_surprise'),
  ('slow-evening-massage',    4, null, 'evening',  'together'),
  ('flirty-texts-all-day',    5, 1,    'micro',    'async_remote')  -- 5a, tamest erotic tier
  on conflict do nothing;

-- =============================================================================
-- USAGE
--   App fetches matched cards via:  select * from rel.get_matched_challenges(my_couple_id());
--   Erotic tiers (intensity 5) should additionally be gated client-side by
--   both members' user_prefs.erotic_opt_in before the cards are even shown.
-- =============================================================================
