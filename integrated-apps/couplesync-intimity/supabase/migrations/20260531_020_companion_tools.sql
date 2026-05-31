create table if not exists public.daily_pulses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date date not null,
  question_id text not null,
  answer text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, user_id, date)
);

create table if not exists public.bucket_items (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  category text not null,
  partner_confirmed boolean not null default false,
  completed boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.secret_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  text text not null,
  revealed boolean not null default false,
  reveal_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_profiles (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  flowers text,
  coffee text,
  chocolate text,
  film_genre text,
  clothing_size text,
  shoe_size text,
  hard_day_help text,
  gift_dont text,
  wishes text,
  favorite_place text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.relationship_dates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  month integer not null check (month between 1 and 12),
  day integer not null check (day between 1 and 31),
  year integer,
  type text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gift_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  category text not null,
  budget text not null,
  used boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matching_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  proposal_key text not null,
  answer text not null check (answer in ('yes', 'maybe', 'later', 'no')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, user_id, proposal_key)
);

create table if not exists public.compass_scans (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  communication integer not null check (communication between 1 and 5),
  closeness integer not null check (closeness between 1 and 5),
  conflict integer not null check (conflict between 1 and 5),
  time_together integer not null check (time_together between 1 and 5),
  overall integer not null check (overall between 1 and 5),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  tag text,
  mood text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mutual_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pair_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  question_key text not null,
  self_answer text,
  partner_guess text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, user_id, question_key)
);

create index if not exists daily_pulses_session_idx on public.daily_pulses (session_id, date);
create index if not exists bucket_items_session_idx on public.bucket_items (session_id);
create index if not exists secret_messages_session_idx on public.secret_messages (session_id);
create index if not exists matching_answers_session_idx on public.matching_answers (session_id);
create index if not exists compass_scans_session_idx on public.compass_scans (session_id);
create index if not exists journal_entries_session_idx on public.journal_entries (session_id);
create index if not exists mutual_answers_session_idx on public.mutual_answers (session_id);

drop trigger if exists daily_pulses_set_updated_at on public.daily_pulses;
create trigger daily_pulses_set_updated_at before update on public.daily_pulses
for each row execute function private.set_updated_at();
drop trigger if exists bucket_items_set_updated_at on public.bucket_items;
create trigger bucket_items_set_updated_at before update on public.bucket_items
for each row execute function private.set_updated_at();
drop trigger if exists secret_messages_set_updated_at on public.secret_messages;
create trigger secret_messages_set_updated_at before update on public.secret_messages
for each row execute function private.set_updated_at();
drop trigger if exists partner_profiles_set_updated_at on public.partner_profiles;
create trigger partner_profiles_set_updated_at before update on public.partner_profiles
for each row execute function private.set_updated_at();
drop trigger if exists relationship_dates_set_updated_at on public.relationship_dates;
create trigger relationship_dates_set_updated_at before update on public.relationship_dates
for each row execute function private.set_updated_at();
drop trigger if exists gift_notes_set_updated_at on public.gift_notes;
create trigger gift_notes_set_updated_at before update on public.gift_notes
for each row execute function private.set_updated_at();
drop trigger if exists matching_answers_set_updated_at on public.matching_answers;
create trigger matching_answers_set_updated_at before update on public.matching_answers
for each row execute function private.set_updated_at();
drop trigger if exists journal_entries_set_updated_at on public.journal_entries;
create trigger journal_entries_set_updated_at before update on public.journal_entries
for each row execute function private.set_updated_at();
drop trigger if exists mutual_answers_set_updated_at on public.mutual_answers;
create trigger mutual_answers_set_updated_at before update on public.mutual_answers
for each row execute function private.set_updated_at();

alter table public.daily_pulses enable row level security;
alter table public.bucket_items enable row level security;
alter table public.secret_messages enable row level security;
alter table public.partner_profiles enable row level security;
alter table public.relationship_dates enable row level security;
alter table public.gift_notes enable row level security;
alter table public.matching_answers enable row level security;
alter table public.compass_scans enable row level security;
alter table public.journal_entries enable row level security;
alter table public.mutual_answers enable row level security;

create policy "Users can read their own daily pulses" on public.daily_pulses for select to authenticated
using ((select auth.uid()) = user_id);
create policy "Participants can create their own daily pulses" on public.daily_pulses for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));
create policy "Participants can update their own daily pulses" on public.daily_pulses for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));

create policy "Participants can read bucket items" on public.bucket_items for select to authenticated
using ((select private.is_session_participant(session_id)));
create policy "Participants can create their own bucket items" on public.bucket_items for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));
create policy "Participants can update bucket items" on public.bucket_items for update to authenticated
using ((select private.is_session_participant(session_id)))
with check ((select private.is_session_participant(session_id)));
create policy "Users can delete their own bucket items" on public.bucket_items for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can read their own secret messages" on public.secret_messages for select to authenticated
using ((select auth.uid()) = user_id);
create policy "Participants can create their own secret messages" on public.secret_messages for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));

create policy "Users can manage their partner profile" on public.partner_profiles for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can manage their relationship dates" on public.relationship_dates for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can manage their gift notes" on public.gift_notes for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "Users can read their own matching answers" on public.matching_answers for select to authenticated
using ((select auth.uid()) = user_id);
create policy "Participants can create their own matching answers" on public.matching_answers for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));
create policy "Participants can update their own matching answers" on public.matching_answers for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));

create policy "Participants can read compass scans" on public.compass_scans for select to authenticated
using ((select private.is_session_participant(session_id)));
create policy "Participants can create their own compass scans" on public.compass_scans for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));

create policy "Participants can read journal entries" on public.journal_entries for select to authenticated
using ((select private.is_session_participant(session_id)));
create policy "Participants can create their own journal entries" on public.journal_entries for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));
create policy "Users can delete their own journal entries" on public.journal_entries for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can read their own mutual answers" on public.mutual_answers for select to authenticated
using ((select auth.uid()) = user_id);
create policy "Participants can create their own mutual answers" on public.mutual_answers for insert to authenticated
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));
create policy "Participants can update their own mutual answers" on public.mutual_answers for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id and (select private.is_session_participant(session_id)));

create or replace function public.list_daily_pulse_state(p_session_id uuid, p_date date)
returns table (
  id uuid, session_id uuid, user_id uuid, date date, question_id text, answer text,
  created_at timestamptz, updated_at timestamptz
)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not private.is_session_participant(p_session_id) then raise exception 'Nemáš prístup k tejto relácii'; end if;
  return query
  select p.id, p.session_id, p.user_id, p.date, p.question_id, p.answer, p.created_at, p.updated_at
  from public.daily_pulses p
  where p.session_id = p_session_id and p.date = p_date
    and (p.user_id = (select auth.uid()) or exists (
      select 1 from public.daily_pulses mine
      where mine.session_id = p_session_id and mine.date = p_date and mine.user_id = (select auth.uid())
    ));
end;
$$;

create or replace function public.list_secret_message_state(p_session_id uuid)
returns table (
  id uuid, session_id uuid, user_id uuid, text text, revealed boolean,
  reveal_date timestamptz, created_at timestamptz, updated_at timestamptz
)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not private.is_session_participant(p_session_id) then raise exception 'Nemáš prístup k tejto relácii'; end if;
  return query
  select m.id, m.session_id, m.user_id,
    case when m.user_id = (select auth.uid()) or m.revealed then m.text else null end,
    m.revealed, m.reveal_date, m.created_at, m.updated_at
  from public.secret_messages m
  where m.session_id = p_session_id
  order by m.created_at desc;
end;
$$;

create or replace function public.reveal_secret_message(p_message_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  update public.secret_messages m
  set revealed = true, reveal_date = now()
  where m.id = p_message_id and m.user_id <> (select auth.uid())
    and (select private.is_session_participant(m.session_id));
  if not found then raise exception 'Odkaz nie je možné odhaliť'; end if;
end;
$$;

create or replace function public.list_matching_answer_state(p_session_id uuid)
returns table (proposal_key text, my_answer text, partner_answered boolean, is_match boolean)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not private.is_session_participant(p_session_id) then raise exception 'Nemáš prístup k tejto relácii'; end if;
  return query
  select mine.proposal_key, mine.answer,
    partner.id is not null,
    coalesce(mine.answer in ('yes', 'maybe') and partner.answer in ('yes', 'maybe'), false)
  from public.matching_answers mine
  left join public.matching_answers partner on partner.session_id = mine.session_id
    and partner.proposal_key = mine.proposal_key and partner.user_id <> mine.user_id
  where mine.session_id = p_session_id and mine.user_id = (select auth.uid());
end;
$$;

create or replace function public.list_mutual_answer_state(p_session_id uuid, p_expected_count integer)
returns table (
  id uuid, session_id uuid, user_id uuid, question_key text, self_answer text,
  partner_guess text, created_at timestamptz, updated_at timestamptz
)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not private.is_session_participant(p_session_id) then raise exception 'Nemáš prístup k tejto relácii'; end if;
  return query
  with completed_users as (
    select a.user_id
    from public.mutual_answers a
    where a.session_id = p_session_id and a.self_answer is not null
    group by a.user_id
    having count(*) >= p_expected_count
  )
  select a.id, a.session_id, a.user_id, a.question_key, a.self_answer, a.partner_guess, a.created_at, a.updated_at
  from public.mutual_answers a
  where a.session_id = p_session_id
    and (a.user_id = (select auth.uid()) or (select count(*) from completed_users) >= 2);
end;
$$;

grant select, insert, update on public.daily_pulses to authenticated;
grant select, insert, delete on public.bucket_items to authenticated;
grant update (partner_confirmed, completed) on public.bucket_items to authenticated;
grant select, insert on public.secret_messages to authenticated;
grant select, insert, update, delete on public.partner_profiles, public.relationship_dates, public.gift_notes to authenticated;
grant select, insert, update on public.matching_answers to authenticated;
grant select, insert on public.compass_scans to authenticated;
grant select, insert, delete on public.journal_entries to authenticated;
grant select, insert, update on public.mutual_answers to authenticated;

grant all on public.daily_pulses, public.bucket_items, public.secret_messages, public.partner_profiles,
  public.relationship_dates, public.gift_notes, public.matching_answers, public.compass_scans,
  public.journal_entries, public.mutual_answers to service_role;

revoke all on function public.list_daily_pulse_state(uuid, date) from public;
revoke all on function public.list_secret_message_state(uuid) from public;
revoke all on function public.reveal_secret_message(uuid) from public;
revoke all on function public.list_matching_answer_state(uuid) from public;
revoke all on function public.list_mutual_answer_state(uuid, integer) from public;
grant execute on function public.list_daily_pulse_state(uuid, date) to authenticated;
grant execute on function public.list_secret_message_state(uuid) to authenticated;
grant execute on function public.reveal_secret_message(uuid) to authenticated;
grant execute on function public.list_matching_answer_state(uuid) to authenticated;
grant execute on function public.list_mutual_answer_state(uuid, integer) to authenticated;
