-- =============================================================================
-- Nudge Engine — Anti-Forgetting Motor 1
-- DeepTalks · Relationship Companion
--
-- Adds: nudge_settings, nudge_log, is_novelty flag,
--       get_due_givers(), pick_nudge(), mark_nudge_done(),
--       full seed content library (35 EN templates + 5 SK tone anchors).
--
-- Assumes: 20260526_000_rel_base_schema.sql has been applied.
-- =============================================================================

-- =============================================================================
-- 1. EXTEND activity_templates WITH is_novelty FLAG
-- =============================================================================

alter table rel.activity_templates
  add column if not exists is_novelty boolean not null default false;

-- =============================================================================
-- 2. NEW TABLES
-- =============================================================================

-- Per-user nudge cadence + quiet hours (giver's settings)
create table if not exists rel.nudge_settings (
  user_id       uuid primary key,              -- giver (auth.users.id)
  enabled       boolean not null default true,
  per_week      smallint not null default 4 check (per_week between 1 and 14),
  quiet_from    time not null default '22:00',
  quiet_to      time not null default '08:00',
  timezone      text not null default 'Europe/Bratislava',
  novelty_ratio numeric not null default 0.25
                  check (novelty_ratio between 0 and 1),
  updated_at    timestamptz not null default now()
);

comment on table rel.nudge_settings is
  'Per-giver cadence config. quiet_from/quiet_to wrap midnight when quiet_from > quiet_to.';
comment on column rel.nudge_settings.novelty_ratio is
  'Fraction of nudges drawn from the novelty pool (is_novelty=true). 0=always consistency, 1=always novelty.';

-- Audit log: what was sent, enables cooldown + feedback weighting
create table if not exists rel.nudge_log (
  id          uuid primary key default gen_random_uuid(),
  couple_id   uuid not null references rel.couples(id)             on delete cascade,
  giver_id    uuid not null,                 -- receives the notification
  receiver_id uuid not null,                 -- partner the act is calibrated for
  template_id uuid not null references rel.activity_templates(id),
  locale_code text not null references rel.cultural_locales(code),
  sent_at     timestamptz not null default now(),
  marked_done boolean,                       -- null = no feedback yet
  done_at     timestamptz
);

create index if not exists nudge_log_giver_sent_idx
  on rel.nudge_log (giver_id, sent_at desc);
create index if not exists nudge_log_template_idx
  on rel.nudge_log (template_id);

-- =============================================================================
-- 3. RLS
-- =============================================================================

alter table rel.nudge_settings enable row level security;
alter table rel.nudge_log      enable row level security;

-- Owner sees and edits own settings
do $$ begin
  create policy nudge_settings_owner on rel.nudge_settings
    for all
    using  (user_id = auth.uid())
    with check (user_id = auth.uid());
exception when duplicate_object then null; end $$;

-- Giver reads own nudge history (inserts are service-role only)
do $$ begin
  create policy nudge_log_giver_read on rel.nudge_log
    for select using (giver_id = auth.uid());
exception when duplicate_object then null; end $$;

-- =============================================================================
-- 4. SCHEDULER FUNCTIONS
-- =============================================================================

-- ----------------------------------------------------------------------------
-- rel.get_due_givers()
-- Returns every enabled giver whose cadence is due AND who is outside
-- their quiet-hours window right now.
-- Called by the edge function with service role (bypasses RLS).
-- ----------------------------------------------------------------------------
create or replace function rel.get_due_givers()
returns table(
  giver_id         uuid,
  couple_id        uuid,
  novelty_ratio    numeric,
  preferred_locale text
)
language plpgsql stable security definer
set search_path = rel, public
as $$
declare
  r              record;
  v_last_nudge   timestamptz;
  v_week_count   int;
  v_min_interval interval;
  v_cur_min      int;
  v_qfrom_min    int;
  v_qto_min      int;
  v_in_quiet     boolean;
begin
  for r in
    select
      ns.user_id,
      ns.per_week,
      ns.quiet_from,
      ns.quiet_to,
      ns.timezone,
      ns.novelty_ratio,
      cm.couple_id,
      coalesce(up.preferred_locale, 'en-US') as pref_locale
    from rel.nudge_settings ns
    join rel.couple_members cm on cm.user_id = ns.user_id
    left join rel.user_prefs  up on up.user_id = ns.user_id
    where ns.enabled = true
  loop
    -- ── Quiet-hours guard (timezone-aware) ───────────────────────
    v_cur_min   := ( extract(hour   from now() at time zone r.timezone) * 60
                   + extract(minute from now() at time zone r.timezone) )::int;
    v_qfrom_min := ( extract(hour   from r.quiet_from) * 60
                   + extract(minute from r.quiet_from) )::int;
    v_qto_min   := ( extract(hour   from r.quiet_to)   * 60
                   + extract(minute from r.quiet_to)   )::int;

    -- If quiet_from >= quiet_to the window wraps midnight (e.g. 22:00→08:00)
    v_in_quiet := case
      when v_qfrom_min >= v_qto_min
        then v_cur_min >= v_qfrom_min or  v_cur_min < v_qto_min
      else      v_cur_min >= v_qfrom_min and v_cur_min < v_qto_min
    end;

    continue when v_in_quiet;

    -- ── Cadence check ────────────────────────────────────────────
    select count(*), max(sent_at)
    into   v_week_count, v_last_nudge
    from   rel.nudge_log
    where  giver_id = r.user_id
      and  sent_at  > now() - interval '7 days';

    -- Minimum spacing between nudges: 7 days / per_week
    v_min_interval := (7.0 / r.per_week) * interval '1 day';

    -- Due when: under weekly quota AND min spacing elapsed
    -- OR: Gottman 3-day guard — no nudge in 3 days forces one regardless
    if (
         v_week_count < r.per_week
         and (v_last_nudge is null or v_last_nudge < now() - v_min_interval)
       )
       or (v_last_nudge is null or v_last_nudge < now() - interval '3 days')
    then
      giver_id         := r.user_id;
      couple_id        := r.couple_id;
      novelty_ratio    := r.novelty_ratio;
      preferred_locale := r.pref_locale;
      return next;
    end if;
  end loop;
end;
$$;

-- ----------------------------------------------------------------------------
-- rel.pick_nudge(giver, couple, novelty_ratio, locale)
-- Selects one template for the giver calibrated to their partner.
-- Returns (template_id, prompt, receiver_id) or empty if nothing fits.
-- ----------------------------------------------------------------------------
create or replace function rel.pick_nudge(
  p_giver_id      uuid,
  p_couple_id     uuid,
  p_novelty_ratio numeric,
  p_locale        text
)
returns table(template_id uuid, prompt text, receiver_id uuid)
language plpgsql volatile security definer
set search_path = rel, public
as $$
declare
  v_receiver_id uuid;
  v_love_lang   rel.love_language;
  v_use_novelty boolean;
  c_cooldown    constant int := 21;  -- days before a template can repeat
begin
  -- 1. Find the receiving partner in the couple
  select cm.user_id into v_receiver_id
  from   rel.couple_members cm
  where  cm.couple_id = p_couple_id
    and  cm.user_id  <> p_giver_id
  limit  1;

  if v_receiver_id is null then return; end if;   -- solo or couple not found

  -- 2. Receiver's primary love language (null → no preference filter)
  select up.primary_love_language into v_love_lang
  from   rel.user_prefs up
  where  up.user_id = v_receiver_id;

  -- 3. Pool decision: novelty or consistency
  v_use_novelty := random() < p_novelty_ratio;

  -- 4+5. Primary pick — weighted random within the selected pool
  --      Weight = historical marked_done rate (floor 0.3 prevents starvation)
  return query
  with cands as (
    select
      t.id      as tid,
      tr.prompt as tprompt,
      greatest(0.3, coalesce(
        ( select avg(case when nl2.marked_done then 1.0 else 0.3 end)
          from   rel.nudge_log nl2
          where  nl2.template_id = t.id
            and  nl2.giver_id    = p_giver_id
            and  nl2.marked_done is not null ),
        1.0   -- no history → neutral weight
      )) as w
    from rel.activity_templates t
    join rel.activity_translations tr
      on  tr.template_id = t.id
      and tr.locale_code = p_locale
    where
      -- Pool + love-language filter
      (
        (     v_use_novelty  and t.is_novelty = true)
        or
        ( not v_use_novelty
          and t.is_novelty = false
          and t.effort in ('micro', 'short')
          and (v_love_lang is null or t.love_language = v_love_lang)
        )
      )
      -- Cooldown: skip recently sent templates
      and not exists (
        select 1 from rel.nudge_log nl
        where  nl.template_id = t.id
          and  nl.giver_id    = p_giver_id
          and  nl.sent_at     > now() - make_interval(days => c_cooldown)
      )
  )
  select tid, tprompt, v_receiver_id
  from   cands
  order  by w * random() desc
  limit  1;

  -- Fallback 1: relax love-language + shorter cooldown (7 days)
  if not found then
    return query
    select t.id, tr.prompt, v_receiver_id
    from   rel.activity_templates t
    join   rel.activity_translations tr
      on   tr.template_id = t.id and tr.locale_code = p_locale
    where  not exists (
      select 1 from rel.nudge_log nl
      where  nl.template_id = t.id
        and  nl.giver_id    = p_giver_id
        and  nl.sent_at     > now() - interval '7 days'
    )
    order by random()
    limit 1;
  end if;

  -- Fallback 2: preferred locale exhausted → try en-US
  if not found and p_locale <> 'en-US' then
    return query
    select t.id, tr.prompt, v_receiver_id
    from   rel.activity_templates t
    join   rel.activity_translations tr
      on   tr.template_id = t.id and tr.locale_code = 'en-US'
    where  not exists (
      select 1 from rel.nudge_log nl
      where  nl.template_id = t.id
        and  nl.giver_id    = p_giver_id
        and  nl.sent_at     > now() - interval '7 days'
    )
    order by random()
    limit 1;
  end if;
end;
$$;

-- ----------------------------------------------------------------------------
-- rel.mark_nudge_done(nudge_id)
-- Called by the client to record follow-through. Enforces ownership.
-- ----------------------------------------------------------------------------
create or replace function rel.mark_nudge_done(p_nudge_id uuid)
returns void
language sql volatile security definer
set search_path = rel, public
as $$
  update rel.nudge_log
  set    marked_done = true,
         done_at     = now()
  where  id       = p_nudge_id
    and  giver_id = auth.uid();
$$;

-- =============================================================================
-- 5. SEED — content library
--    35 EN templates + 5 SK tone anchors
--    is_novelty=true marks the experiential/novelty pool (time-heavy)
-- =============================================================================

-- ── Words of affirmation ─────────────────────────────────────────────────────
insert into rel.activity_templates (slug, love_language, effort, is_novelty) values
  ('words-specific-praise',      'words', 'micro', false),
  ('words-thank-for-ordinary',   'words', 'micro', false),
  ('words-text-thinking-of-you', 'words', 'micro', false),
  ('words-note-in-bag',          'words', 'short', false),
  ('words-brag-to-others',       'words', 'short', false),
  ('words-voice-message',        'words', 'micro', false),
  ('words-future-we',            'words', 'short', false)
on conflict (slug) do nothing;

-- ── Quality time ─────────────────────────────────────────────────────────────
insert into rel.activity_templates (slug, love_language, effort, is_novelty) values
  ('time-coffee-together',       'time', 'short',    false),
  ('time-evening-walk',          'time', 'short',    false),
  ('time-device-free-hour',      'time', 'short',    false),
  ('time-cinema',                'time', 'evening',  true),
  ('time-new-place',             'time', 'evening',  true),
  ('time-cook-together',         'time', 'evening',  true),
  ('time-theatre',               'time', 'day_plus', true),
  ('time-recreate-first-date',   'time', 'day_plus', true),
  ('time-learn-something',       'time', 'day_plus', true)
on conflict (slug) do nothing;

-- ── Physical touch ───────────────────────────────────────────────────────────
insert into rel.activity_templates (slug, love_language, effort, is_novelty) values
  ('touch-long-hug',      'touch', 'micro',   false),
  ('touch-hold-hands',    'touch', 'micro',   false),
  ('touch-sit-close',     'touch', 'micro',   false),
  ('touch-greet-properly','touch', 'micro',   false),
  ('touch-shoulder-rub',  'touch', 'short',   false),
  ('touch-massage',       'touch', 'evening', false)
on conflict (slug) do nothing;

-- ── Gifts ────────────────────────────────────────────────────────────────────
insert into rel.activity_templates (slug, love_language, effort, is_novelty) values
  ('gifts-their-snack',          'gifts', 'micro',    false),
  ('gifts-single-flower',        'gifts', 'short',    false),
  ('gifts-something-sweet',      'gifts', 'short',    false),
  ('gifts-tiny-thing-mentioned', 'gifts', 'short',    false),
  ('gifts-playlist',             'gifts', 'short',    false),
  ('gifts-photo-print',          'gifts', 'day_plus', false)
on conflict (slug) do nothing;

-- ── Acts of service ──────────────────────────────────────────────────────────
insert into rel.activity_templates (slug, love_language, effort, is_novelty) values
  ('acts-coffee-in-bed',          'acts', 'micro', false),
  ('acts-warm-the-car',           'acts', 'micro', false),
  ('acts-make-breakfast',         'acts', 'short', false),
  ('acts-take-a-chore',           'acts', 'short', false),
  ('acts-handle-the-annoying-task','acts','short', false),
  ('acts-prep-their-morning',     'acts', 'short', false),
  ('acts-let-them-rest',          'acts', 'short', false)
on conflict (slug) do nothing;

-- =============================================================================
-- EN translations (canonical, human_reviewed implicit via activity_translations
-- which has no human_reviewed column — intensity 1-2 MT is acceptable per spec)
-- =============================================================================

insert into rel.activity_translations (template_id, locale_code, prompt)
select t.id, 'en-US', p.prompt
from (values
  -- words
  ('words-specific-praise',       'Tell them one specific thing they did well this week — name the detail.'),
  ('words-thank-for-ordinary',    'Thank them for something ordinary they always do and never get thanked for.'),
  ('words-text-thinking-of-you',  'Send a "thinking of you" message in the middle of the day, no reason.'),
  ('words-note-in-bag',           'Leave a short handwritten note where they''ll find it later.'),
  ('words-brag-to-others',        'Say something proud about them out loud in front of someone else.'),
  ('words-voice-message',         'Record a 20-second voice note saying what you appreciate today.'),
  ('words-future-we',             'Tell them one thing you''re looking forward to doing together.'),
  -- time
  ('time-coffee-together',        'Make time for an unhurried coffee together, phones away.'),
  ('time-evening-walk',           'Suggest a short evening walk, just the two of you.'),
  ('time-device-free-hour',       'Propose one device-free hour together this evening.'),
  ('time-cinema',                 'Plan a spontaneous cinema night this week.'),
  ('time-new-place',              'Take them somewhere in your city neither of you has been.'),
  ('time-cook-together',          'Cook one dish together tonight instead of separately.'),
  ('time-theatre',                'Book tickets to a play or show they''d never expect.'),
  ('time-recreate-first-date',    'Recreate something from one of your early dates.'),
  ('time-learn-something',        'Try a class or new activity together you''ve both never done.'),
  -- touch
  ('touch-long-hug',              'Give a hug that lasts a few seconds longer than usual.'),
  ('touch-hold-hands',            'Reach for their hand the next time you''re walking together.'),
  ('touch-sit-close',             'Sit close to them on the couch instead of across the room.'),
  ('touch-greet-properly',        'Greet them with a real hug or kiss next time, not a passing one.'),
  ('touch-shoulder-rub',          'Offer a short shoulder or neck rub with no agenda.'),
  ('touch-massage',               'Give an unhurried back or foot massage tonight.'),
  -- gifts
  ('gifts-their-snack',           'Grab their favourite snack when you''re out, unprompted.'),
  ('gifts-single-flower',         'Bring home a single flower for no occasion.'),
  ('gifts-something-sweet',       'Pick up a small sweet thing they like on your way back.'),
  ('gifts-tiny-thing-mentioned',  'Get the small thing they mentioned wanting weeks ago.'),
  ('gifts-playlist',              'Make them a short playlist of songs that remind you of them.'),
  ('gifts-photo-print',           'Print one photo of a good memory and give it to them.'),
  -- acts
  ('acts-coffee-in-bed',          'Bring them their morning coffee or tea before they ask.'),
  ('acts-warm-the-car',           'Warm up or prep the car for their commute before they head out.'),
  ('acts-make-breakfast',         'Make breakfast unannounced one morning.'),
  ('acts-take-a-chore',           'Quietly do one chore that''s normally theirs.'),
  ('acts-handle-the-annoying-task','Take over the one task you know they''ve been dreading.'),
  ('acts-prep-their-morning',     'Set out everything they need for tomorrow morning.'),
  ('acts-let-them-rest',          'Take the kids, dog, or errands so they get an unexpected hour off.')
) as p(slug, prompt)
join rel.activity_templates t on t.slug = p.slug
on conflict do nothing;

-- =============================================================================
-- SK-SK tone anchors (5 native-written examples to anchor the locale's voice)
-- Remaining templates can be machine-translated with native review.
-- =============================================================================

insert into rel.activity_translations (template_id, locale_code, prompt)
select t.id, 'sk-SK', p.prompt
from (values
  ('gifts-single-flower',   'Cestou domov kúp jeden kvietok — bez príležitosti.'),
  ('acts-coffee-in-bed',    'Prines jej/mu rannú kávu skôr, než si o ňu povie.'),
  ('words-specific-praise', 'Povedz jednu konkrétnu vec, ktorú tento týždeň zvládol/zvládla — pomenuj detail.'),
  ('time-evening-walk',     'Navrhni krátku večernú prechádzku, len vy dvaja.'),
  ('touch-long-hug',        'Objím ju/ho o pár sekúnd dlhšie, než zvyčajne.')
) as p(slug, prompt)
join rel.activity_templates t on t.slug = p.slug
on conflict do nothing;

-- =============================================================================
-- 6. OPTIONAL: pg_cron schedule
--    Uncomment after enabling pg_cron + pg_net extensions in Supabase dashboard.
--    Replace ANON_KEY with your project's anon key (or use a dedicated secret).
--    The edge function validates Authorization internally.
-- =============================================================================

-- select cron.schedule(
--   'nudge-engine-hourly',
--   '0 * * * *',
--   $$
--     select net.http_post(
--       url     := 'https://uoochdvpvjlcuxwlyhnb.supabase.co/functions/v1/nudge-scheduler',
--       headers := jsonb_build_object(
--                    'Content-Type',  'application/json',
--                    'Authorization', 'Bearer ' || current_setting('app.service_role_key')
--                  ),
--       body    := '{}'::jsonb
--     );
--   $$
-- );
