-- =============================================================================
-- DeepTalks · Nezabudni na nu — private partner assistant workspace
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
-- Additive and idempotent. The first UI release stores data locally; these
-- owner-scoped tables are the prepared synchronization target after sign-in.
-- =============================================================================

create extension if not exists "pgcrypto";
create schema if not exists rel;

create or replace function rel.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists rel.partner_profiles (
  id               uuid primary key default gen_random_uuid(),
  owner_user_id    uuid not null unique,
  couple_id        uuid references rel.couples(id) on delete cascade,
  partner_name     text not null default '',
  favorite_flowers text,
  favorite_drink   text,
  favorite_food    text,
  favorite_place   text,
  hard_day_help    text,
  gift_avoid       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists rel.relationship_dates (
  id                   uuid primary key default gen_random_uuid(),
  owner_user_id        uuid not null,
  couple_id            uuid references rel.couples(id) on delete cascade,
  label                text not null,
  date_value           date not null,
  reminder_days_before smallint[] not null default array[7, 1]::smallint[],
  note                 text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create table if not exists rel.gift_notes (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  couple_id     uuid references rel.couples(id) on delete cascade,
  title         text not null,
  detail        text,
  budget_band   text not null default 'small'
                check (budget_band in ('free', 'small', 'medium', 'special')),
  status        text not null default 'idea'
                check (status in ('idea', 'planned', 'done', 'avoid')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists rel.preference_notes (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  couple_id     uuid references rel.couples(id) on delete cascade,
  category      text not null
                check (category in ('like', 'avoid', 'hard_day', 'ritual', 'place', 'food', 'other')),
  note          text not null,
  source        text not null default 'manual'
                check (source in ('manual', 'spoznajme-sa', 'daily-connection', 'other')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists rel.reminders (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  couple_id     uuid references rel.couples(id) on delete cascade,
  title         text not null,
  remind_at     timestamptz not null,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists rel.completed_actions (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  couple_id     uuid references rel.couples(id) on delete cascade,
  template_id   uuid references rel.activity_templates(id) on delete set null,
  title         text not null,
  completed_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists relationship_dates_owner_date_idx
  on rel.relationship_dates (owner_user_id, date_value);
create index if not exists gift_notes_owner_created_idx
  on rel.gift_notes (owner_user_id, created_at desc);
create index if not exists preference_notes_owner_category_idx
  on rel.preference_notes (owner_user_id, category);
create index if not exists reminders_owner_remind_at_idx
  on rel.reminders (owner_user_id, remind_at);
create index if not exists completed_actions_owner_completed_idx
  on rel.completed_actions (owner_user_id, completed_at desc);

do $$ begin
  create trigger partner_profiles_updated_at
    before update on rel.partner_profiles
    for each row execute function rel.set_updated_at();
exception when duplicate_object then null; end $$;

do $$ begin
  create trigger relationship_dates_updated_at
    before update on rel.relationship_dates
    for each row execute function rel.set_updated_at();
exception when duplicate_object then null; end $$;

do $$ begin
  create trigger gift_notes_updated_at
    before update on rel.gift_notes
    for each row execute function rel.set_updated_at();
exception when duplicate_object then null; end $$;

do $$ begin
  create trigger preference_notes_updated_at
    before update on rel.preference_notes
    for each row execute function rel.set_updated_at();
exception when duplicate_object then null; end $$;

do $$ begin
  create trigger reminders_updated_at
    before update on rel.reminders
    for each row execute function rel.set_updated_at();
exception when duplicate_object then null; end $$;

alter table rel.partner_profiles   enable row level security;
alter table rel.relationship_dates enable row level security;
alter table rel.gift_notes         enable row level security;
alter table rel.preference_notes   enable row level security;
alter table rel.reminders          enable row level security;
alter table rel.completed_actions  enable row level security;

do $$ begin
  create policy partner_profiles_owner_all on rel.partner_profiles
    for all using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy relationship_dates_owner_all on rel.relationship_dates
    for all using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy gift_notes_owner_all on rel.gift_notes
    for all using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy preference_notes_owner_all on rel.preference_notes
    for all using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy reminders_owner_all on rel.reminders
    for all using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy completed_actions_owner_all on rel.completed_actions
    for all using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
exception when duplicate_object then null; end $$;

grant usage on schema rel to authenticated;
grant select, insert, update, delete on
  rel.partner_profiles,
  rel.relationship_dates,
  rel.gift_notes,
  rel.preference_notes,
  rel.reminders,
  rel.completed_actions
to authenticated;
