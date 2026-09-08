-- ─────────────────────────────────────────────────────────────────────────────
-- Dotazník intímnych preferencií — anonymná párovacia infra
--
-- Bez účtov. Pár = kód (shareable) + secret (v URL fragmente, hash v DB).
-- Prístup výhradne cez server route handlery so service-role kľúčom.
-- RLS zapnuté a BEZ policies → anon/authenticated nemá prístup vôbec.
-- Auto-mazanie po 30 dňoch nečinnosti (funkcia dotaznik_gc(), volá ju cron).
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists pgcrypto;

-- ── Pár ─────────────────────────────────────────────────────────────────────
create table if not exists public.dotaznik_pary (
  id                uuid primary key default gen_random_uuid(),
  kod               text not null unique,               -- napr. "K7M2-Q4XR"
  pin_hash          text not null,                      -- sha256(secret) hex
  rezim             text not null default 'blind'
                    check (rezim in ('live','blind','open')),
  prezyvka_a        text,
  prezyvka_b        text,
  vytvorene         timestamptz not null default now(),
  posledna_aktivita timestamptz not null default now(),
  zmazat_po         timestamptz not null default (now() + interval '30 days')
);

-- ── Stav tém (screening + zámky) ───────────────────────────────────────────
-- tema = '' znamená stav celého modulu (prázdny string, nie NULL, kvôli upsertu)
create table if not exists public.dotaznik_stav_temy (
  id         uuid primary key default gen_random_uuid(),
  par_id     uuid not null references public.dotaznik_pary(id) on delete cascade,
  slot       char(1) not null check (slot in ('a','b')),
  modul      text not null,
  tema       text not null default '',
  stav       text not null check (stav in ('ano','este_nie','nie','hotovo')),
  updated_at timestamptz not null default now(),
  unique (par_id, slot, modul, tema)
);
create index if not exists dotaznik_stav_par on public.dotaznik_stav_temy(par_id);

-- ── Odpovede (jednotky hodnotenia, L4) ─────────────────────────────────────
create table if not exists public.dotaznik_odpovede (
  id         uuid primary key default gen_random_uuid(),
  par_id     uuid not null references public.dotaznik_pary(id) on delete cascade,
  slot       char(1) not null check (slot in ('a','b')),
  modul      text not null,
  okruh      text not null,
  polozka    text not null,
  typ        text not null,                            -- 'postoj' | 'semafor' | ...
  rola       text not null default ''
             check (rola in ('','prijimam','poskytujem')),
  hodnota    jsonb not null,
  poznamka   text,
  updated_at timestamptz not null default now(),
  unique (par_id, slot, modul, okruh, polozka, rola)
);
create index if not exists dotaznik_odp_par on public.dotaznik_odpovede(par_id);

-- ── Zdieľania (Režim C — pripravené, zatiaľ nevyužité) ─────────────────────
create table if not exists public.dotaznik_zdielania (
  id        uuid primary key default gen_random_uuid(),
  par_id    uuid not null references public.dotaznik_pary(id) on delete cascade,
  od_slot   char(1) not null check (od_slot in ('a','b')),
  rozsah    text not null check (rozsah in ('zelene','vsetko')),
  vytvorene timestamptz not null default now()
);

-- ── RLS: zapnuté, žiadne policies = len service-role ──────────────────────
alter table public.dotaznik_pary        enable row level security;
alter table public.dotaznik_stav_temy   enable row level security;
alter table public.dotaznik_odpovede    enable row level security;
alter table public.dotaznik_zdielania   enable row level security;

-- ── Garbage collection ───────────────────────────────────────────────────
create or replace function public.dotaznik_gc()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  n integer;
begin
  delete from public.dotaznik_pary where zmazat_po < now();
  get diagnostics n = row_count;
  return n;
end;
$$;

-- Ak je dostupné pg_cron, naplánuj denne o 03:15:
-- select cron.schedule('dotaznik-gc', '15 3 * * *', $$select public.dotaznik_gc()$$);
