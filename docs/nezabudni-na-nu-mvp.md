# Nezabudni na nu — MVP

`Nezabudni na nu` is a practical DeepTalks companion for small acts of care.
It is deliberately not a scoring system, surveillance tool, or manipulation
guide. The product helps the user remember details that their partner has
already shared and turn them into considerate actions.

## Current release

Route: `/{lang}/apps/nezabudni`

The first usable release is private and local-first. Its data stays in browser
`localStorage` under `deeptalks_nezabudni_workspace_v1`; no account is required.

Included:

- partner profile with likes, gift avoid-list, and hard-day support note
- concrete daily gesture and lightweight weekly mission
- important dates with upcoming-date ordering
- gift notebook with rough budget bands
- date planner filtered by budget and available energy
- local history of completed gestures

## Existing cloud mode

Route: `/{lang}/apps/nudge`

The existing Nudge Engine remains the paired cloud mode. It supports sign-in,
pairing by invite code, love-language preferences, tailored suggestions, and a
completion history. Both routes link to each other as two modes of one product.

## Prepared Supabase synchronization

Migration: `supabase/migrations/20260531_011_partner_assistant_workspace.sql`

The migration adds owner-scoped `rel` tables for a later authenticated sync:

- `partner_profiles`
- `relationship_dates`
- `gift_notes`
- `preference_notes`
- `reminders`
- `completed_actions`

All six tables use row-level security. A user can read and modify only rows
where `owner_user_id = auth.uid()`. Sharing private notebook content with the
partner must remain an explicit future product decision, not an automatic side
effect of pairing.
