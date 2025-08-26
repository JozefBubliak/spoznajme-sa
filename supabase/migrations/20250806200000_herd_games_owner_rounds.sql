-- Ensure herd_games has required columns and indexes
alter table public.herd_games
  add column if not exists code text unique,
  add column if not exists owner_id uuid,
  add column if not exists phase text default 'lobby',
  add column if not exists total_rounds int4 default 0,
  add column if not exists active_round_index int4 default 0,
  add column if not exists lobby_locked boolean default false,
  add column if not exists prep_seconds int4,
  add column if not exists question_seconds int4,
  add column if not exists scoring_mode text,
  add column if not exists created_at timestamptz default now(),
  add column if not exists timer_deadline timestamptz;

create index if not exists herd_games_owner_code_idx
  on public.herd_games (owner_id, code);

-- Ensure herd_rounds has required columns and indexes
alter table public.herd_rounds
  add column if not exists game_code text,
  add column if not exists idx int4,
  add column if not exists category uuid,
  add column if not exists count int4,
  add column if not exists settings jsonb,
  add column if not exists status text default 'setup',
  add column if not exists q_index int4 default 0,
  add column if not exists timer_deadline timestamptz,
  add column if not exists created_at timestamptz default now();

create index if not exists herd_rounds_game_idx on public.herd_rounds (game_code);
create unique index if not exists herd_rounds_game_idx_idx on public.herd_rounds (game_code, idx);

-- RLS policies for herd_games
alter table public.herd_games enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='herd_games' and policyname='herd_games_owner_select'
  ) then
    create policy herd_games_owner_select on public.herd_games
      for select using (auth.uid() = owner_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='herd_games' and policyname='herd_games_owner_upd'
  ) then
    create policy herd_games_owner_upd on public.herd_games
      for update using (auth.uid() = owner_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='herd_games' and policyname='herd_games_owner_ins'
  ) then
    create policy herd_games_owner_ins on public.herd_games
      for insert with check (auth.uid() = owner_id);
  end if;
end$$;
