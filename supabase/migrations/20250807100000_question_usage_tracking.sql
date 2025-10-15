-- Track quiz runs and question usage per moderator/game

create table if not exists public.herd_game_runs (
  id uuid primary key default gen_random_uuid(),
  game_code text not null,
  owner_id uuid not null,
  run_number int not null,
  status text not null default 'active',
  created_at timestamptz default now(),
  started_at timestamptz default now(),
  ended_at timestamptz
);

create unique index if not exists herd_game_runs_code_run_uq
  on public.herd_game_runs (game_code, run_number);

create index if not exists herd_game_runs_owner_idx
  on public.herd_game_runs (owner_id);

alter table public.herd_game_runs enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'herd_game_runs'
      and policyname = 'herd_game_runs_owner_select'
  ) then
    create policy herd_game_runs_owner_select on public.herd_game_runs
      for select using (auth.uid() = owner_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'herd_game_runs'
      and policyname = 'herd_game_runs_owner_insert'
  ) then
    create policy herd_game_runs_owner_insert on public.herd_game_runs
      for insert with check (auth.uid() = owner_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'herd_game_runs'
      and policyname = 'herd_game_runs_owner_update'
  ) then
    create policy herd_game_runs_owner_update on public.herd_game_runs
      for update using (auth.uid() = owner_id);
  end if;
end$$;

create or replace function random_herd_questions(
  cat uuid,
  n int,
  locale_prefix text default 'sk',
  run uuid default null
)
returns table(id uuid)
language sql stable as $$
  select q.id
  from herd_questions q
  where q.category_id = cat
    and coalesce(q.classic, false) = true
    and (
      locale_prefix is null
      or locale_prefix = ''
      or q.locale is null
      or q.locale ilike locale_prefix || '%'
    )
    and (
      run is null
      or not exists (
        select 1
        from herd_question_usage u
        where u.run_id = run
          and u.question_id = q.id
      )
    )
  order by random()
  limit greatest(1, coalesce(n, 0))
$$;

create table if not exists public.herd_question_usage (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  game_code text not null,
  run_id uuid not null references public.herd_game_runs(id) on delete cascade,
  category_id uuid not null,
  round_id uuid,
  question_id uuid not null references public.herd_questions(id),
  created_at timestamptz default now()
);

create unique index if not exists herd_question_usage_unique
  on public.herd_question_usage (run_id, question_id);

create index if not exists herd_question_usage_owner_idx
  on public.herd_question_usage (owner_id, game_code);

alter table public.herd_question_usage enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'herd_question_usage'
      and policyname = 'herd_question_usage_owner_select'
  ) then
    create policy herd_question_usage_owner_select on public.herd_question_usage
      for select using (auth.uid() = owner_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'herd_question_usage'
      and policyname = 'herd_question_usage_owner_insert'
  ) then
    create policy herd_question_usage_owner_insert on public.herd_question_usage
      for insert with check (auth.uid() = owner_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'herd_question_usage'
      and policyname = 'herd_question_usage_owner_delete'
  ) then
    create policy herd_question_usage_owner_delete on public.herd_question_usage
      for delete using (auth.uid() = owner_id);
  end if;
end$$;
