-- Trvalé redakčné poznámky k admin prehľadu. Nikdy nie sú súčasťou odpovedí páru.
create table if not exists public.dotaznik_admin_poznamky (
  tema text not null,
  blok text not null,
  poznamka text not null default '',
  updated_at timestamptz not null default now(),
  updated_by text not null,
  primary key (tema, blok)
);

alter table public.dotaznik_admin_poznamky enable row level security;
-- Bez policies: prístup má iba server so service-role kľúčom.
