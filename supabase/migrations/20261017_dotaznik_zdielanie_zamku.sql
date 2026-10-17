-- Voliteľné zdieľanie dôvodu zámku témy (Ešte nie / Nie) s partnerom.
alter table public.dotaznik_stav_temy
  add column if not exists zdielanie text check (zdielanie in ('len_zamok','aj_dovod')),
  add column if not exists dovod text check (dovod is null or char_length(dovod) <= 200);
