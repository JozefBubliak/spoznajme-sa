create extension if not exists pgcrypto;
create schema if not exists private;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  perspective text check (perspective in ('neutral', 'muz', 'zena')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.topics (
  topic_id text primary key,
  source_taxonomy_id text,
  parent_id text,
  slug text not null,
  name_sk text not null,
  name_en text,
  path_sk text,
  category text,
  level integer,
  node_type text,
  recommended_usage text,
  module_type text not null,
  classification_confidence numeric,
  classification_tags text[] not null default '{}',
  tags text[] not null default '{}',
  alt_names text[] not null default '{}',
  simple_enabled boolean not null default true,
  advanced_enabled boolean not null default false,
  simple_blocks text[] not null default '{}',
  advanced_blocks text[] not null default '{}',
  catalog_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pair_sessions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  created_by uuid not null references auth.users(id) on delete cascade,
  partner2_id uuid references auth.users(id) on delete set null,
  status text not null default 'waiting' check (status in ('waiting', 'active', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  topic_id text not null references public.topics(topic_id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  version text not null check (version in ('simple', 'advanced')),
  answers jsonb not null default '{}'::jsonb,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, topic_id, user_id, version)
);

create index if not exists topics_catalog_idx on public.topics (catalog_visible, category, name_sk);
create index if not exists topics_slug_idx on public.topics (slug);
create index if not exists pair_sessions_created_by_idx on public.pair_sessions (created_by);
create index if not exists pair_sessions_partner2_id_idx on public.pair_sessions (partner2_id);
create index if not exists responses_session_id_idx on public.responses (session_id);
create index if not exists responses_user_id_idx on public.responses (user_id);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function private.set_updated_at();
drop trigger if exists topics_set_updated_at on public.topics;
create trigger topics_set_updated_at before update on public.topics
for each row execute function private.set_updated_at();
drop trigger if exists pair_sessions_set_updated_at on public.pair_sessions;
create trigger pair_sessions_set_updated_at before update on public.pair_sessions
for each row execute function private.set_updated_at();
drop trigger if exists responses_set_updated_at on public.responses;
create trigger responses_set_updated_at before update on public.responses
for each row execute function private.set_updated_at();

create or replace function private.handle_new_intimity_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, perspective)
  values (new.id, new.raw_user_meta_data ->> 'perspective')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_intimity_user_created after insert on auth.users
for each row execute function private.handle_new_intimity_user();

insert into public.profiles (user_id, perspective)
select id, raw_user_meta_data ->> 'perspective' from auth.users
on conflict (user_id) do nothing;

create or replace function private.is_session_participant(p_session_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.pair_sessions s
    where s.id = p_session_id
      and ((select auth.uid()) = s.created_by or (select auth.uid()) = s.partner2_id)
  );
$$;

create or replace function private.shareable_answers(p_answers jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select coalesce(jsonb_object_agg(entry.key, entry.value), '{}'::jsonb)
  from jsonb_each(coalesce(p_answers, '{}'::jsonb)) as entry
  where entry.key = any (array[
    'topic_interest', 'want_try_reality', 'want_top_role', 'want_bottom_role',
    'want_receive_anal', 'want_give_anal', 'q_topic_gate', 'q_interest',
    'q_fantasy_reality', 'q_want_receive', 'q_want_give', 'q_top_bottom',
    'q_role', 'q_watch', 'q_be_watched', 'q_group'
  ]);
$$;

create or replace function public.create_pair_session()
returns public.pair_sessions
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  current_session public.pair_sessions;
  generated_code text;
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  i integer;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  select * into current_session from public.pair_sessions s
  where s.status in ('waiting', 'active')
    and (s.created_by = current_user_id or s.partner2_id = current_user_id)
  order by s.created_at desc limit 1;
  if found then return current_session; end if;

  loop
    generated_code := '';
    for i in 1..6 loop
      generated_code := generated_code || substr(alphabet, floor(random() * length(alphabet) + 1)::integer, 1);
    end loop;
    begin
      insert into public.pair_sessions (code, created_by)
      values (generated_code, current_user_id) returning * into current_session;
      return current_session;
    exception when unique_violation then
      -- Generate another code after the rare collision.
    end;
  end loop;
end;
$$;

create or replace function public.join_pair_session(p_code text)
returns public.pair_sessions
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  current_session public.pair_sessions;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  select * into current_session from public.pair_sessions s
  where s.status in ('waiting', 'active')
    and (s.created_by = current_user_id or s.partner2_id = current_user_id)
  order by s.created_at desc limit 1;
  if found then return current_session; end if;

  update public.pair_sessions s
  set partner2_id = current_user_id, status = 'active'
  where s.code = upper(trim(p_code)) and s.status = 'waiting'
    and s.partner2_id is null and s.created_by <> current_user_id
  returning * into current_session;
  if not found then raise exception 'Relácia neexistuje alebo už nie je dostupná'; end if;
  return current_session;
end;
$$;

create or replace function public.close_pair_session(p_session_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.pair_sessions set status = 'completed'
  where id = p_session_id and created_by = (select auth.uid());
  if not found then raise exception 'Reláciu môže ukončiť iba jej vlastník'; end if;
end;
$$;

create or replace function public.list_pair_responses(p_session_id uuid)
returns table (
  topic_id text, version text, partner_slot smallint, answers jsonb,
  completed boolean, created_at timestamptz, updated_at timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_session_participant(p_session_id) then
    raise exception 'Nemáš prístup k tejto relácii';
  end if;
  return query
  select r.topic_id, r.version,
    case when r.user_id = s.created_by then 1::smallint else 2::smallint end,
    private.shareable_answers(r.answers), r.completed, r.created_at, r.updated_at
  from public.responses r join public.pair_sessions s on s.id = r.session_id
  where r.session_id = p_session_id and r.completed = true;
end;
$$;

alter table public.profiles enable row level security;
alter table public.topics enable row level security;
alter table public.pair_sessions enable row level security;
alter table public.responses enable row level security;

create policy "Users can read their profile" on public.profiles for select to authenticated
using ((select auth.uid()) = user_id);
create policy "Users can update their profile" on public.profiles for update to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Authenticated users can browse topics" on public.topics for select to authenticated using (true);
create policy "Participants can read their sessions" on public.pair_sessions for select to authenticated
using ((select auth.uid()) = created_by or (select auth.uid()) = partner2_id);
create policy "Users can read their own responses" on public.responses for select to authenticated
using ((select auth.uid()) = user_id);
create policy "Participants can create their own responses" on public.responses for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));
create policy "Users can update their own responses" on public.responses for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));

grant usage on schema public to authenticated, service_role;
revoke all on schema private from public;
grant usage on schema private to authenticated;
grant select on public.topics, public.profiles, public.pair_sessions to authenticated;
grant update (perspective) on public.profiles to authenticated;
grant select, insert, update on public.responses to authenticated;
grant all on public.profiles, public.topics, public.pair_sessions, public.responses to service_role;
revoke all on function private.is_session_participant(uuid) from public;
revoke all on function private.shareable_answers(jsonb) from public;
grant execute on function private.is_session_participant(uuid) to authenticated;
revoke all on function public.create_pair_session() from public;
revoke all on function public.join_pair_session(text) from public;
revoke all on function public.close_pair_session(uuid) from public;
revoke all on function public.list_pair_responses(uuid) from public;
grant execute on function public.create_pair_session() to authenticated;
grant execute on function public.join_pair_session(text) to authenticated;
grant execute on function public.close_pair_session(uuid) to authenticated;
grant execute on function public.list_pair_responses(uuid) to authenticated;
