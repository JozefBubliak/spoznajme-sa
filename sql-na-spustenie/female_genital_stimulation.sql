-- =============================================================================
-- DeepTalks · Intimne dobrodruzstvo — female genital stimulation rules
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 4: vulva, clitoris, clitoral hood, labia, vaginal opening,
-- periurethral area, vaginal front wall, G-zone, A-spot and female perineum.
-- =============================================================================

create schema if not exists rel;

insert into rel.intimate_stimulation_techniques
  (slug, label_sk, family, description_sk, default_actor, uses_mouth, uses_hands, uses_toy, bdsm_related, penetration_related, source_refs)
values
  ('vulva_palm_cup',           'prekrytie vulvy dlanou',              'hands', 'Teple prekrytie celej vulvy dlanou bez tlaku.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood female anatomy','Scarleteen sexual anatomy']),
  ('vulva_outer_stroke',       'hladenie vonkajsej vulvy',            'hands', 'Pomaly dotyk cez velke pysky a okolie vulvy.', 'partner_to_receiver', false, true, false, false, false, array['Scarleteen sexual anatomy']),
  ('labia_spread_light',       'jemne roztvorenie pyskov',            'hands', 'Jemne otvorenie vonkajsej vulvy prstami.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood female anatomy']),
  ('labia_stroke',             'hladenie pyskov',                     'hands', 'Dotyk po velkych alebo malych pyskoch.', 'partner_to_receiver', false, true, false, false, false, array['Scarleteen sexual anatomy']),
  ('labia_suck_light',         'jemne sanie pyskov',                  'mouth', 'Jemne sanie velkych alebo malych pyskov.', 'partner_to_receiver', true, false, false, false, false, array['University of Montana sexual health info']),
  ('clit_indirect_touch',      'nepriamy dotyk klitorisu',            'hands', 'Dotyk cez kapucnu alebo okolie, nie priamo na zalud klitorisu.', 'partner_to_receiver', false, true, false, false, false, array['Mayo Clinic Press orgasm advice','Scarleteen sexual anatomy']),
  ('clit_direct_touch',        'priamy dotyk klitorisu',              'hands', 'Cieleny dotyk zaluda klitorisu prstom.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood female anatomy','Mayo Clinic Press orgasm advice']),
  ('clit_circle',              'kruzenie okolo klitorisu',            'hands', 'Kruzenie prstom okolo klitorisu alebo cez kapucnu.', 'partner_to_receiver', false, true, false, false, false, array['Healthline clitoris stimulation']),
  ('clit_pressure_hold',       'staly tlak na klitoris',              'hands', 'Staly tlak bez trenia alebo s minimalnym pohybom.', 'partner_to_receiver', false, true, false, false, false, array['Healthline clitoris stimulation']),
  ('cunnilingus_flat',         'oralne lizanie plochou jazyka',       'mouth', 'Oralna stimulacia vulvy alebo klitorisu plochou jazyka.', 'partner_to_receiver', true, false, false, false, false, array['University of Montana sexual health info','Planned Parenthood pleasure']),
  ('cunnilingus_tip',          'oralne kruzenie spickou jazyka',      'mouth', 'Presnejsia oralna stimulacia spickou jazyka.', 'partner_to_receiver', true, false, false, false, false, array['University of Montana sexual health info']),
  ('clit_suck_light',          'jemne sanie klitorisu',               'mouth', 'Jemne sanie klitorisu alebo kapucne ustami.', 'partner_to_receiver', true, false, false, false, false, array['University of Montana sexual health info']),
  ('clit_suck_strong',         'silnejsie sanie klitorisu',           'mouth', 'Vyraznejsie sanie klitorisu alebo kapucne.', 'partner_to_receiver', true, false, false, false, false, array['Healthline clitoris stimulation']),
  ('vulva_vibration_low',      'jemna vibracia na vulve',             'toy', 'Nizka vibracia na vulve, pyskoch alebo klitoralnej oblasti.', 'partner_to_receiver', false, false, true, false, false, array['WebMD vibrators','Scarleteen masturbation quickie']),
  ('clit_vibration_direct',    'vibracia na klitorise',               'toy', 'Cielena vibracia na klitorise alebo cez kapucnu.', 'partner_to_receiver', false, false, true, false, false, array['WebMD vibrators']),
  ('clit_suction_toy',         'podtlakova klitoralna pomocka',       'toy', 'Pomocka s pulznym podtlakom alebo air-pulse stimulaciou.', 'partner_to_receiver', false, false, true, false, false, array['Healthline clitoris stimulation','WebMD vibrators']),
  ('vaginal_finger_one',       'jeden prst vaginalne',                'hands', 'Jeden prst pri vchode do vaginy alebo plytko vnutri.', 'partner_to_receiver', false, true, false, false, true, array['Scarleteen masturbation quickie','University of Montana sexual health info']),
  ('vaginal_finger_two',       'dva prsty vaginalne',                 'hands', 'Dva prsty vaginalne po naladeni a lubrikacii.', 'partner_to_receiver', false, true, false, false, true, array['Scarleteen masturbation quickie']),
  ('gspot_curve_fingers',      'zahnuty pohyb na G-zone',             'hands', 'Zahnuty pohyb prstami na prednej stene vaginy.', 'partner_to_receiver', false, true, false, false, true, array['Healthline clitoris stimulation','University of Montana sexual health info']),
  ('vaginal_toy_small',        'mensia vaginalna pomocka',            'toy', 'Mensia pomocka urcena na vaginalne pouzitie.', 'partner_to_receiver', false, false, true, false, true, array['Scarleteen masturbation quickie','Planned Parenthood sex toys']),
  ('vaginal_toy_vibrator',     'vaginalny vibrator',                  'toy', 'Vibrator urceny na vaginalne pouzitie.', 'partner_to_receiver', false, false, true, false, true, array['WebMD vibrators','Scarleteen masturbation quickie']),
  ('vaginal_penetration_shallow','plytka vaginalna penetracia',       'penetration', 'Plytka penetracia prstami, penisom alebo pomockou.', 'partner_to_receiver', false, false, false, false, true, array['Planned Parenthood female anatomy']),
  ('vaginal_penetration_deep', 'hlbsia vaginalna penetracia',         'penetration', 'Hlbsia vaginalna penetracia po naladeni.', 'partner_to_receiver', false, false, false, false, true, array['Planned Parenthood female anatomy']),
  ('vaginal_fisting_planned',  'postupne vaginalne fisting / cela ruka', 'planned', 'Velmi pokrocila, planovana praktika s postupnym roztahovanim a mnozstvom lubrikantu.', 'partner_to_receiver', false, true, false, true, true, array['Healthline anal safety principles','Scarleteen masturbation quickie']),
  ('perineum_touch_female',    'dotyk hradze',                        'hands', 'Dotyk alebo tlak na hradzu medzi vulvou a anusom.', 'partner_to_receiver', false, true, false, false, false, array['Mayo Clinic Press orgasm advice','Planned Parenthood female anatomy'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  family = excluded.family,
  description_sk = excluded.description_sk,
  default_actor = excluded.default_actor,
  uses_mouth = excluded.uses_mouth,
  uses_hands = excluded.uses_hands,
  uses_toy = excluded.uses_toy,
  bdsm_related = excluded.bdsm_related,
  penetration_related = excluded.penetration_related,
  source_refs = excluded.source_refs;

with rules(
  zone_slug, technique_slug, actor_scope, play_mode_slug,
  min_i, max_i, min_s, max_s, random_policy, warmup, tool, lube, aftercare,
  tool_tags, prompt, caution, refs
) as (
  values
    ('vulva','vulva_palm_cup','partner_to_receiver','explore',1,3,10,90,'preference_required',true,false,false,false,array[]::text[],'Prekry vulvu teplou dlanou bez tlaku a pockaj na reakciu.',null,array['Planned Parenthood female anatomy']),
    ('vulva','vulva_outer_stroke','partner_to_receiver','sensual',1,3,10,120,'preference_required',true,false,false,false,array[]::text[],'Hlad vonkajsiu vulvu cez velke pysky a okolie.',null,array['Scarleteen sexual anatomy']),
    ('vulva','cunnilingus_flat','partner_to_receiver','sensual',1,4,10,120,'preference_required',true,false,false,false,array[]::text[],'Pouzi plochu jazyka na celu vulvu a men tlak podla reakcie.',null,array['University of Montana sexual health info']),
    ('vulva','vulva_vibration_low','partner_to_receiver','toys',1,3,5,90,'preference_required',true,true,false,false,array['vibrator'],'Pouzi jemnu vibraciu cez vulvu alebo jej okolie.',null,array['WebMD vibrators']),

    ('labia_outer','labia_spread_light','partner_to_receiver','explore',1,2,5,45,'preference_required',true,false,false,false,array[]::text[],'Jemne roztvor velke pysky a chvilu len cakaj.',null,array['Planned Parenthood female anatomy']),
    ('labia_outer','labia_stroke','partner_to_receiver','sensual',1,3,10,90,'preference_required',true,false,false,false,array[]::text[],'Hlad velke pysky pomalym pohybom.',null,array['Scarleteen sexual anatomy']),
    ('labia_outer','labia_suck_light','partner_to_receiver','sensual',2,3,5,45,'preference_required',true,false,false,false,array[]::text[],'Jemne saj velky pysk a potom sa vrat k bozkom alebo jazyku.',null,array['University of Montana sexual health info']),
    ('labia_inner','labia_stroke','partner_to_receiver','sensual',1,3,5,60,'preference_required',true,false,false,false,array[]::text[],'Dotykaj sa malych pyskov velmi pomaly a sleduj citlivost.', 'Male pysky mozu byt velmi citlive.', array['Scarleteen sexual anatomy']),
    ('labia_inner','cunnilingus_tip','partner_to_receiver','sensual',1,3,3,45,'preference_required',true,false,false,false,array[]::text[],'Kratko prejdi spickou jazyka po malych pyskoch.', 'Kratko a bez silneho tlaku.', array['University of Montana sexual health info']),

    ('clitoral_hood','clit_indirect_touch','partner_to_receiver','explore',1,3,5,90,'preference_required',true,false,false,false,array[]::text[],'Stimuluj klitoris nepriamo cez kapucnu alebo jej okolie.',null,array['Mayo Clinic Press orgasm advice']),
    ('clitoral_hood','clit_circle','partner_to_receiver','sensual',1,4,5,90,'preference_required',true,false,false,false,array[]::text[],'Kruz prstom cez kapucnu klitorisu a men rychlost.',null,array['Healthline clitoris stimulation']),
    ('clitoral_hood','clit_suck_light','partner_to_receiver','sensual',2,3,3,45,'preference_required',true,false,false,false,array[]::text[],'Jemne saj oblast kapucne klitorisu kratko a s pauzami.',null,array['University of Montana sexual health info']),

    ('clitoris','clit_direct_touch','partner_to_receiver','sensual',1,4,3,60,'preference_required',true,false,false,false,array[]::text[],'Cielene sa dotykaj klitorisu len takou intenzitou, aku ma prijimatelka rada.', 'Priama stimulacia moze byt prilis silna.', array['Planned Parenthood female anatomy','Mayo Clinic Press orgasm advice']),
    ('clitoris','clit_circle','partner_to_receiver','sensual',1,4,5,90,'preference_required',true,false,false,false,array[]::text[],'Kruz okolo klitorisu a obcas zmen smer alebo tlak.',null,array['Healthline clitoris stimulation']),
    ('clitoris','clit_pressure_hold','partner_to_receiver','intense',2,4,5,60,'preference_required',true,false,false,false,array[]::text[],'Drz staly tlak pri klitorise bez rychleho trenia.',null,array['Healthline clitoris stimulation']),
    ('clitoris','cunnilingus_tip','partner_to_receiver','sensual',1,4,3,90,'preference_required',true,false,false,false,array[]::text[],'Pouzi spicku jazyka na klitoris alebo jeho okolie a striedaj pauzy.',null,array['University of Montana sexual health info']),
    ('clitoris','clit_suck_light','partner_to_receiver','sensual',2,3,3,45,'preference_required',true,false,false,false,array[]::text[],'Jemne saj klitoris kratko a potom uvolni tlak.',null,array['University of Montana sexual health info']),
    ('clitoris','clit_suck_strong','partner_to_receiver','intense',3,4,3,30,'preference_required',true,false,false,false,array[]::text[],'Silnejsie saj klitoris len kratko a s pauzami.', 'Silne sanie len ak ho prijimatelka vyslovene chce.', array['Healthline clitoris stimulation']),
    ('clitoris','clit_vibration_direct','partner_to_receiver','toys',1,5,5,120,'preference_required',true,true,false,false,array['vibrator'],'Pouzi vibraciu na klitoris v intenzite, ktoru ma prijimatelka nastavenu.',null,array['WebMD vibrators']),
    ('clitoris','clit_suction_toy','partner_to_receiver','toys',1,5,5,120,'preference_required',true,true,true,false,array['podtlakova pomocka'],'Pouzi klitoralnu podtlakovu pomocku v nastavenej intenzite.', 'Podtlakove pomocky mozu byt velmi intenzivne; nie bez preferencie.', array['Healthline clitoris stimulation','WebMD vibrators']),

    ('vaginal_opening','vaginal_finger_one','partner_to_receiver','sensual',1,3,10,120,'preference_required',true,false,true,false,array[]::text[],'Pouzi jeden prst pri vchode do vaginy alebo plytko vnutri, s lubrikantom.', 'Ak je sucho alebo napatie, vrat sa na vonkajsiu stimulaciu.', array['Scarleteen masturbation quickie']),
    ('vaginal_opening','vaginal_finger_two','partner_to_receiver','intense',2,4,10,120,'preference_required',true,false,true,false,array[]::text[],'Po naladeni pouzi dva prsty plytko pri vchode do vaginy.', 'Vyraznejsia penetracia len po preferencii.', array['Scarleteen masturbation quickie']),
    ('vaginal_opening','vaginal_toy_small','partner_to_receiver','toys',1,4,10,180,'preference_required',true,true,true,false,array['vaginalna pomocka','lubrikant'],'Pouzi mensiu vaginalnu pomocku pomaly a s lubrikantom.', 'Pomocka musi byt urcena na vaginalne pouzitie a cista.', array['Planned Parenthood sex toys']),
    ('vagina_front_wall','gspot_curve_fingers','partner_to_receiver','intense',2,4,10,180,'preference_required',true,false,true,false,array[]::text[],'Pouzi zahnuty pohyb prstami smerom k prednej stene vaginy.', 'Nie kazdej zene je G-zona prijemna; netlacit cez bolest.', array['Healthline clitoris stimulation','University of Montana sexual health info']),
    ('g_spot_area','gspot_curve_fingers','partner_to_receiver','intense',2,4,10,180,'preference_required',true,false,true,false,array[]::text[],'Stimuluj G-zonu zahnutym pohybom a men tlak podla reakcie.', 'Len po naladeni, s lubrikantom a bez tlaku cez bolest.', array['Healthline clitoris stimulation']),
    ('g_spot_area','vaginal_toy_vibrator','partner_to_receiver','toys',2,5,10,180,'preference_required',true,true,true,false,array['vaginalny vibrator','lubrikant'],'Pouzi vaginalny vibrator smerovany na prednu stenu.',null,array['WebMD vibrators']),
    ('a_spot_area','vaginal_penetration_deep','partner_to_receiver','planned_edge',2,4,10,180,'planned_only',true,false,true,false,array[]::text[],'A-spot alebo hlbsia vaginalna stimulacia iba ako planovana praktika.', 'Hlboka stimulacia nie je nahodna karta; ak boli bolesti, vynechat.', array['Planned Parenthood female anatomy']),
    ('vaginal_opening','vaginal_fisting_planned','partner_to_receiver','planned_edge',3,5,60,600,'planned_only',true,false,true,true,array['vela lubrikantu','rukavica volitelne'],'Postupne vaginalne roztahovanie smerom k celej ruke len ako vopred planovana praktika.', 'Nikdy nelosovat nahodne; vyzaduje vela lubrikantu, cas, naladenie a okamzite zastavenie pri bolesti.', array['Scarleteen masturbation quickie']),
    ('periurethral_area','clit_indirect_touch','partner_to_receiver','explore',1,2,3,30,'preference_required',true,false,false,false,array[]::text[],'Velmi jemne sa dotkni oblasti okolo mocovej rury a sleduj, ci je to prijemne.', 'Velmi citliva oblast, nie pre tlak ani drsny pohyb.', array['Mayo Clinic Press orgasm advice']),
    ('female_perineum','perineum_touch_female','partner_to_receiver','sensual',1,3,5,60,'preference_required',true,false,false,false,array[]::text[],'Jemne tlac alebo hlad hradzu medzi vulvou a anusom.', 'Ak je to neprijemne alebo prilis blizko analnej oblasti, preskocit.', array['Mayo Clinic Press orgasm advice'])
)
insert into rel.intimate_zone_stimulation_rules
  (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
   min_intensity, max_intensity, suggested_seconds_min, suggested_seconds_max,
   random_policy, requires_warmup, requires_tool, requires_lube, requires_aftercare, tool_tags,
   prompt_sk, caution_sk, source_refs)
select
  zone_slug,
  technique_slug,
  'female'::rel.intimate_body_target,
  actor_scope::rel.intimate_actor_scope,
  play_mode_slug,
  min_i,
  max_i,
  min_s,
  max_s,
  random_policy::rel.intimate_random_policy,
  warmup,
  tool,
  lube,
  aftercare,
  tool_tags,
  prompt,
  caution,
  refs
from rules
on conflict (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug) do update set
  min_intensity = excluded.min_intensity,
  max_intensity = excluded.max_intensity,
  suggested_seconds_min = excluded.suggested_seconds_min,
  suggested_seconds_max = excluded.suggested_seconds_max,
  random_policy = excluded.random_policy,
  requires_warmup = excluded.requires_warmup,
  requires_tool = excluded.requires_tool,
  requires_lube = excluded.requires_lube,
  requires_aftercare = excluded.requires_aftercare,
  tool_tags = excluded.tool_tags,
  prompt_sk = excluded.prompt_sk,
  caution_sk = excluded.caution_sk,
  source_refs = excluded.source_refs;
