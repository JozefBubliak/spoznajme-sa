-- Fix: month_bdsm_intro step 1 (Rozhovor a mierka) mal 0 kandidatov
-- Pridavame senzoricky warm-up pre bdsm mode s max_intensity = 2
-- Tieto pravidla su vhodne pre zaciatocny krok BDSM sceny (consent + sensory intro)

insert into rel.intimate_zone_stimulation_rules (
  zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
  min_intensity, max_intensity, suggested_seconds_min, suggested_seconds_max,
  random_policy, requires_warmup, requires_tool, requires_lube, requires_aftercare,
  tool_tags, prompt_sk, caution_sk, source_refs
)
values
  ('upper_back', 'feather_path', 'all', 'partner_to_receiver', 'bdsm',
   1, 2, 30, 120, 'mode_required', false, true, false, false,
   array['pierko'],
   'Prechádzaj pierkom po chrbte veľmi pomaly. Pozoruj, ako reaguje telo — toto je senzorické naladenie.',
   null,
   array['Kink Checklist BDSM safety', 'BDSM Wiki aftercare']),

  ('neck', 'warm_breath', 'all', 'partner_to_receiver', 'bdsm',
   1, 2, 10, 45, 'mode_required', false, false, false, false,
   array[]::text[],
   'Dýchaj pomaly a teplo na krk. Nechaj teplo klesnúť k ramenu. Žiadne slová — len prítomnosť.',
   null,
   array['BDSM Wiki safeword', 'Kink Checklist BDSM safety']),

  ('ears', 'close_whisper', 'all', 'partner_to_receiver', 'bdsm',
   1, 2, 10, 30, 'mode_required', false, false, false, false,
   array[]::text[],
   'Pošepkaj: „Dnes sme v bezpečí. Safeword je [vaše slovo]. Čo chceš dnes skúsiť?" — a počúvaj.',
   'Toto je krok dohody, nie stimulácie. Odpoveď partnera určuje ďalší smer.',
   array['BDSM Wiki safeword', 'Kink Checklist BDSM safety']),

  ('shoulders', 'feather_path', 'all', 'partner_to_receiver', 'bdsm',
   1, 2, 20, 90, 'mode_required', false, true, false, false,
   array['pierko'],
   'Prechádzaj pierkom po ramenách a šíji. Striedaj rýchlosť a tlak — nechaj druhého hádať, kde ďalej.',
   null,
   array['Kink Checklist BDSM safety']),

  ('spine_line', 'skin_trace', 'all', 'partner_to_receiver', 'bdsm',
   1, 2, 20, 60, 'mode_required', false, false, false, false,
   array[]::text[],
   'Prst pomaly po chrbtici zhora nadol. Každý centimeter s pozornosťou. Zastav pri reakcii.',
   null,
   array['BDSM Wiki aftercare', 'Kink Checklist BDSM safety'])
on conflict (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug) do nothing;
