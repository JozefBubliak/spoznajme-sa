# BUILD — Anti-Forgetting Nudge Engine + Content Library

**Product:** DeepTalks · Relationship Companion
**Scope of this doc:** the "Motor 1" anti-forgetting feature — daily reminders that
prompt the giving partner to do a small act of affection — plus a seeded,
research-grounded content library.
**Stack:** PostgreSQL 15+ / Supabase. Extends the existing `rel` schema
(see `relationship_companion_schema.sql`). Single shared DB with DeepTalks.

> Hand this file to Claude Code as the build brief. It assumes the base schema
> (`rel.activity_templates`, `rel.activity_translations`, `rel.user_prefs`,
> `rel.couples`, `rel.couple_members`) already exists.

---

## 1. What we're building

A scheduler that, on a per-user cadence, picks a small act of affection
**calibrated to the receiving partner** and sends it as a notification to the
**giving** partner. Example notification: *"Pick up a single flower on your way
home — no occasion needed."*

Two distinct goals drive the selection logic (keep them separate):

- **Consistency** — fight autopilot with low-effort acts, done often. (Gottman:
  "small things often"; turning toward bids; aim for a positive cadence.)
- **Novelty** — periodically inject something new/experiential so the
  relationship keeps expanding. (Aron self-expansion; Perel on desire/novelty.)

The engine is **not** the challenge/consent system (Motor 2). This feature has
no intensity-5 content and needs no double-blind logic — it surfaces only
intensity 1–2 affectionate acts.

---

## 2. Framework → category mapping

Content is organized by **love language** (Chapman) crossed with **effort band**.
The frameworks below are used only as a category skeleton; all wording is
original. Do not fabricate quotes, statistics, citations, or testimonials.

| Love language (`rel.love_language`) | User's examples | Grounding (skeleton only) |
|---|---|---|
| `words`  | praise for something specific | Gottman fondness & admiration |
| `time`   | cinema, theatre, a walk | Gottman rituals of connection; Aron novelty |
| `touch`  | massage, hug | general attachment / closeness |
| `gifts`  | a flower, something sweet | symbolic "bids" |
| `acts`   | coffee, breakfast | Gottman "turning toward" everyday bids |

**Effort bands** (`rel.effort_band`): `micro` (≤2 min) · `short` (≤30 min) ·
`evening` · `day_plus`. The scheduler must be able to serve a `micro` act even
on the busiest day — that is what protects daily adherence.

---

## 3. New tables to add

```sql
-- Per-user nudge cadence + quiet hours.
create table rel.nudge_settings (
  user_id        uuid primary key,                    -- giver (auth.users.id)
  enabled        boolean not null default true,
  per_week       smallint not null default 4 check (per_week between 1 and 14),
  quiet_from     time not null default '22:00',
  quiet_to       time not null default '08:00',
  timezone       text not null default 'Europe/Bratislava',
  novelty_ratio  numeric not null default 0.25        -- share of nudges drawn from the novelty pool
                  check (novelty_ratio between 0 and 1),
  updated_at     timestamptz not null default now()
);

-- What was sent, so we can avoid repeats and measure follow-through.
create table rel.nudge_log (
  id           uuid primary key default gen_random_uuid(),
  couple_id    uuid not null references rel.couples(id) on delete cascade,
  giver_id     uuid not null,                          -- who receives the notification
  receiver_id  uuid not null,                          -- partner the act is for
  template_id  uuid not null references rel.activity_templates(id),
  locale_code  text not null references rel.cultural_locales(code),
  sent_at      timestamptz not null default now(),
  -- light feedback loop (optional, drives future weighting):
  marked_done  boolean,
  done_at      timestamptz
);
create index on rel.nudge_log (giver_id, sent_at desc);
create index on rel.nudge_log (template_id);

-- Tag templates that belong to the "novelty" pool (experiential / new).
alter table rel.activity_templates
  add column if not exists is_novelty boolean not null default false;
```

**RLS:** `nudge_settings` and `nudge_log` are owner-scoped, identical pattern to
the rest of the schema:

```sql
alter table rel.nudge_settings enable row level security;
alter table rel.nudge_log      enable row level security;

create policy nudge_settings_owner on rel.nudge_settings
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy nudge_log_owner on rel.nudge_log
  for select using (giver_id = auth.uid());
-- inserts come from the scheduler (service role), not the client.
```

---

## 4. Selection algorithm

Run as a scheduled job (Supabase cron / edge function). For each enabled user
whose cadence is due and who is **outside** quiet hours in their timezone:

1. Resolve `receiver_id` = the partner from `rel.couple_members`.
2. Read the receiver's `rel.user_prefs.primary_love_language` (fallback: rotate
   across all five so no language is starved).
3. Decide pool: with probability `novelty_ratio` draw from `is_novelty = true`
   templates (`time`-heavy, higher effort); otherwise the consistency pool
   (favor `micro`/`short`).
4. Filter candidates:
   - matching love language (or any, if novelty rotation),
   - has a published translation in the giver's `preferred_locale`,
   - **not** sent to this giver in the last N days (cooldown; default 21).
5. Pick one (weighted random; down-weight templates with low historical
   `marked_done`).
6. Insert into `rel.nudge_log`, fetch the localized `prompt`, push notification.

**Cadence guard (Gottman 5:1 spirit):** never let the consistency pool go
silent for more than ~3 days, even if the user set a low `per_week`. Small,
frequent positives are the whole point.

---

## 5. Localization rules

- The content below is the **English canonical** base. Each template needs a row
  in `rel.activity_translations` per target locale.
- For this feature (intensity 1–2) machine translation **with review** is
  acceptable — set `human_reviewed = false` until a native speaker passes it.
- Some acts are culturally specific (e.g. a specific sweet, a holiday). Keep the
  seed culturally neutral; let locale teams add local variants as new templates.
- `sk-SK` is a launch locale — a few Slovak examples are included to anchor tone.

---

## 6. Seed content library

Insert as `rel.activity_templates` (+ one `rel.activity_translations` row each).
`slug` is the stable key; `is_novelty = true` marks the novelty pool.

### Words of affirmation (`words`)
| slug | effort | EN prompt (canonical) |
|---|---|---|
| words-specific-praise | micro | Tell them one specific thing they did well this week — name the detail. |
| words-thank-for-ordinary | micro | Thank them for something ordinary they always do and never get thanked for. |
| words-text-thinking-of-you | micro | Send a "thinking of you" message in the middle of the day, no reason. |
| words-note-in-bag | short | Leave a short handwritten note where they'll find it later. |
| words-brag-to-others | short | Say something proud about them out loud in front of someone else. |
| words-voice-message | micro | Record a 20-second voice note saying what you appreciate today. |
| words-future-we | short | Tell them one thing you're looking forward to doing together. |

### Quality time (`time`)
| slug | effort | is_novelty | EN prompt |
|---|---|---|---|
| time-coffee-together | short | no | Make time for an unhurried coffee together, phones away. |
| time-evening-walk | short | no | Suggest a short evening walk, just the two of you. |
| time-cinema | evening | yes | Plan a spontaneous cinema night this week. |
| time-theatre | day_plus | yes | Book tickets to a play or show they'd never expect. |
| time-new-place | evening | yes | Take them somewhere in your city neither of you has been. |
| time-cook-together | evening | yes | Cook one dish together tonight instead of separately. |
| time-device-free-hour | short | no | Propose one device-free hour together this evening. |
| time-recreate-first-date | day_plus | yes | Recreate something from one of your early dates. |
| time-learn-something | day_plus | yes | Try a class or new activity together you've both never done. |

### Physical touch (`touch`)
| slug | effort | EN prompt |
|---|---|---|
| touch-long-hug | micro | Give a hug that lasts a few seconds longer than usual. |
| touch-hold-hands | micro | Reach for their hand the next time you're walking together. |
| touch-shoulder-rub | short | Offer a short shoulder/neck rub with no agenda. |
| touch-massage | evening | Give an unhurried back or foot massage tonight. |
| touch-sit-close | micro | Sit close to them on the couch instead of across the room. |
| touch-greet-properly | micro | Greet them with a real hug/kiss next time, not a passing one. |

### Gifts (`gifts`)
| slug | effort | EN prompt |
|---|---|---|
| gifts-single-flower | short | Bring home a single flower for no occasion. |
| gifts-something-sweet | short | Pick up a small sweet thing they like on your way back. |
| gifts-their-snack | micro | Grab their favorite snack when you're out, unprompted. |
| gifts-tiny-thing-mentioned | short | Get the small thing they mentioned wanting weeks ago. |
| gifts-playlist | short | Make them a short playlist of songs that remind you of them. |
| gifts-photo-print | day_plus | Print one photo of a good memory and give it to them. |

### Acts of service (`acts`)
| slug | effort | EN prompt |
|---|---|---|
| acts-coffee-in-bed | micro | Bring them their morning coffee/tea before they ask. |
| acts-make-breakfast | short | Make breakfast unannounced one morning. |
| acts-take-a-chore | short | Quietly do one chore that's normally theirs. |
| acts-warm-the-car | micro | Warm up / sort the car or their commute prep for them. |
| acts-handle-the-annoying-task | short | Take over the one task you know they've been dreading. |
| acts-prep-their-morning | short | Set out everything they need for tomorrow morning. |
| acts-let-them-rest | short | Take the kids/dog/errands so they get an unexpected hour off. |

### Slovak tone anchors (`sk-SK` examples for `rel.activity_translations`)
| slug | SK prompt |
|---|---|
| gifts-single-flower | Cestou domov kúp jeden kvietok — bez príležitosti. |
| acts-coffee-in-bed | Prines jej/mu rannú kávu skôr, než si o ňu povie. |
| words-specific-praise | Povedz jednu konkrétnu vec, ktorú tento týždeň zvládol/zvládla — pomenuj detail. |
| time-evening-walk | Navrhni krátku večernú prechádzku, len vy dvaja. |
| touch-long-hug | Objím ju/ho o pár sekúnd dlhšie, než zvyčajne. |

---

## 7. Acceptance criteria

- [ ] New tables + RLS created; client cannot read another user's nudge log.
- [ ] Scheduler respects timezone, quiet hours, and `per_week`.
- [ ] `novelty_ratio` measurably shifts the mix toward `is_novelty` templates.
- [ ] No template repeats to the same giver within the cooldown window.
- [ ] Consistency pool never silent > 3 days regardless of low cadence.
- [ ] Seed loads; every seeded template has at least an EN translation.
- [ ] `marked_done` round-trips and down-weights ignored templates over time.

## 8. Out of scope (do not build here)
- Intensity 3–5 / erotic content and the double-blind consent system (Motor 2).
- Couple invite/pairing flow (separate spec).
- Push-notification transport setup (assume an existing notification service;
  this engine only decides *what* and *when*).
