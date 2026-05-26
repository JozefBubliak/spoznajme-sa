-- =============================================================================
-- DeepTalks · Nudge Engine — frontend helper functions
-- Depends on: 20260526_000_rel_base_schema.sql
--             20260526_001_nudge_engine.sql
-- =============================================================================

-- ── 1. Add invite_code to couples ────────────────────────────────────────────

alter table rel.couples
  add column if not exists invite_code text unique;

-- Back-fill existing rows (dev data only)
update rel.couples
   set invite_code = upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 8))
 where invite_code is null;

-- ── 2. save_nudge_prefs ───────────────────────────────────────────────────────
-- Upserts the calling user's nudge_settings row.

create or replace function rel.save_nudge_prefs(
  p_per_week      smallint,
  p_love_language rel.love_language,
  p_novelty_ratio numeric default 0.3
)
returns void
language plpgsql security definer set search_path = rel, public as $$
begin
  insert into rel.nudge_settings (
    user_id, per_week, novelty_ratio
  ) values (
    auth.uid(), p_per_week, p_novelty_ratio
  )
  on conflict (user_id) do update
    set per_week      = excluded.per_week,
        novelty_ratio = excluded.novelty_ratio,
        updated_at    = now();

  -- persist the preferred love language in user_prefs
  insert into rel.user_prefs (user_id, primary_love_language, updated_at)
    values (auth.uid(), p_love_language, now())
  on conflict (user_id) do update
    set primary_love_language = excluded.primary_love_language,
        updated_at            = now();
end;
$$;

-- ── 3. create_couple ──────────────────────────────────────────────────────────
-- Creates a new couple, generates an 8-char invite code, adds the caller as member.
-- Returns the new couple_id + invite_code.

create or replace function rel.create_couple()
returns table (couple_id uuid, invite_code text)
language plpgsql security definer set search_path = rel, public as $$
declare
  v_couple_id   uuid;
  v_invite_code text;
  v_existing    uuid;
begin
  -- Prevent double-couple: each user may only be in one couple
  select cm.couple_id into v_existing
    from rel.couple_members cm
   where cm.user_id = auth.uid()
   limit 1;

  if v_existing is not null then
    raise exception 'user is already in a couple';
  end if;

  -- Generate a unique 8-character code (retry up to 10 times)
  for i in 1..10 loop
    v_invite_code := upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 8));
    exit when not exists (
      select 1 from rel.couples c where c.invite_code = v_invite_code
    );
  end loop;

  insert into rel.couples (invite_code) values (v_invite_code)
    returning id into v_couple_id;

  insert into rel.couple_settings (couple_id) values (v_couple_id)
    on conflict do nothing;

  insert into rel.couple_members (couple_id, user_id)
    values (v_couple_id, auth.uid());

  return query select v_couple_id, v_invite_code;
end;
$$;

-- ── 4. join_couple ────────────────────────────────────────────────────────────
-- Joins an existing couple by invite code.
-- Returns couple_id + invite_code (so caller can display it too).

create or replace function rel.join_couple(p_code text)
returns table (couple_id uuid, invite_code text)
language plpgsql security definer set search_path = rel, public as $$
declare
  v_couple_id uuid;
  v_existing  uuid;
begin
  -- Already in a couple?
  select cm.couple_id into v_existing
    from rel.couple_members cm
   where cm.user_id = auth.uid()
   limit 1;

  if v_existing is not null then
    raise exception 'user is already in a couple';
  end if;

  select c.id into v_couple_id
    from rel.couples c
   where c.invite_code = upper(trim(p_code));

  if v_couple_id is null then
    raise exception 'invalid invite code';
  end if;

  -- Couple already full (>= 2 members)?
  if (select count(*) from rel.couple_members cm where cm.couple_id = v_couple_id) >= 2 then
    raise exception 'couple is already full';
  end if;

  insert into rel.couple_members (couple_id, user_id)
    values (v_couple_id, auth.uid());

  return query
    select c.id, c.invite_code from rel.couples c where c.id = v_couple_id;
end;
$$;

-- ── 5. get_my_couple ──────────────────────────────────────────────────────────
-- Returns full app state for the calling user in one round-trip.

create or replace function rel.get_my_couple()
returns table (
  couple_id       uuid,
  invite_code     text,
  partner_joined  boolean,
  has_settings    boolean,
  per_week        smallint,
  love_language   rel.love_language,
  novelty_ratio   numeric
)
language sql stable security definer set search_path = rel, public as $$
  select
    c.id                                               as couple_id,
    c.invite_code                                      as invite_code,
    (select count(*) from rel.couple_members cm2
      where cm2.couple_id = c.id) >= 2                as partner_joined,
    exists (select 1 from rel.nudge_settings ns
              where ns.user_id = auth.uid())           as has_settings,
    coalesce(ns.per_week, 3)                           as per_week,
    up.primary_love_language                           as love_language,
    coalesce(ns.novelty_ratio, 0.3)                    as novelty_ratio
  from rel.couple_members cm
  join rel.couples c on c.id = cm.couple_id
  left join rel.nudge_settings ns on ns.user_id = auth.uid()
  left join rel.user_prefs up    on up.user_id  = auth.uid()
  where cm.user_id = auth.uid()
  limit 1;
$$;

-- ── 6. request_nudge ──────────────────────────────────────────────────────────
-- On-demand nudge: picks a template and logs it immediately (bypass the scheduler).

create or replace function rel.request_nudge()
returns table (nudge_id uuid, prompt text)
language plpgsql security definer set search_path = rel, public as $$
declare
  v_couple_id   uuid;
  v_partner_id  uuid;
  v_locale      text;
  v_ratio       numeric;
  v_pick        record;
  v_log_id      uuid;
begin
  -- Resolve caller's couple
  select cm.couple_id into v_couple_id
    from rel.couple_members cm where cm.user_id = auth.uid() limit 1;

  if v_couple_id is null then
    raise exception 'not in a couple';
  end if;

  -- Find partner
  select cm.user_id into v_partner_id
    from rel.couple_members cm
   where cm.couple_id = v_couple_id and cm.user_id <> auth.uid()
   limit 1;

  -- Locale + novelty ratio
  select coalesce(up.preferred_locale, 'sk-SK')
    into v_locale
    from rel.user_prefs up where up.user_id = auth.uid();

  select coalesce(ns.novelty_ratio, 0.3) into v_ratio
    from rel.nudge_settings ns where ns.user_id = auth.uid();

  -- Reuse pick_nudge logic
  select p.template_id, p.prompt, p.receiver_id
    into v_pick
    from rel.pick_nudge(
      auth.uid(), v_couple_id,
      coalesce(v_ratio, 0.3),
      coalesce(v_locale, 'sk-SK')
    ) p
   limit 1;

  if v_pick.template_id is null then
    raise exception 'no template available';
  end if;

  insert into rel.nudge_log (couple_id, giver_id, receiver_id, template_id, locale_code)
    values (v_couple_id, auth.uid(), coalesce(v_pick.receiver_id, v_partner_id),
            v_pick.template_id, coalesce(v_locale, 'sk-SK'))
    returning id into v_log_id;

  return query select v_log_id, v_pick.prompt;
end;
$$;

-- ── 7. get_recent_nudges ──────────────────────────────────────────────────────
-- Returns the caller's recent dispatched nudges (most recent first).

create or replace function rel.get_recent_nudges(p_limit int default 10)
returns table (
  nudge_id    uuid,
  prompt      text,
  sent_at     timestamptz,
  marked_done boolean
)
language sql stable security definer set search_path = rel, public as $$
  select
    nl.id                           as nudge_id,
    coalesce(at2.prompt, '[?]')     as prompt,
    nl.sent_at                      as sent_at,
    nl.marked_done                  as marked_done
  from rel.nudge_log nl
  left join rel.activity_translations at2
    on at2.template_id = nl.template_id
   and at2.locale_code = nl.locale_code
  where nl.giver_id = auth.uid()
  order by nl.sent_at desc
  limit p_limit;
$$;

-- ── 8. RLS additions ──────────────────────────────────────────────────────────
-- couples table needs write for create_couple/join_couple (both use SECURITY DEFINER
-- so they bypass RLS). But we also want clients to be able to read their couple's
-- invite_code via the select policy already in place.
-- No additional policies needed — all new functions are SECURITY DEFINER.
