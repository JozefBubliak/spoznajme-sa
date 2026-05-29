-- =============================================================================
-- DeepTalks - Intimne dobrodruzstvo - male genital stimulation rules
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 5: penis, glans, frenulum, foreskin, shaft underside,
-- penis base, scrotum, testicles and male perineum.
-- =============================================================================

create schema if not exists rel;

insert into rel.intimate_stimulation_techniques
  (slug, label_sk, family, description_sk, default_actor, uses_mouth, uses_hands, uses_toy, bdsm_related, penetration_related, source_refs)
values
  ('penis_hand_stroke_slow',      'pomale hladkanie penisu rukou',       'hands', 'Pomaly manualny pohyb po penise bez cieleneho tlaku na najcitlivejsie body.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy','Scarleteen sexual anatomy']),
  ('penis_lube_stroke',           'hladkanie penisu s lubrikantom',       'hands', 'Manualna stimulacia s lubrikantom pre menej trenia a viac citelny pohyb.', 'partner_to_receiver', false, true, false, false, false, array['Scarleteen sexual anatomy']),
  ('penis_firm_stroke',           'pevnejsi tah po penise',               'hands', 'Vyraznejsi manualny pohyb po tele penisu.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('glans_palm_circle',           'kruzenie dlanou cez zalud',            'hands', 'Kruzenie dlanou alebo prstami cez zalud s kontrolovanym tlakom.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('glans_tongue_circle',         'kruzenie jazykom na zaludi',           'mouth', 'Oralny kruhovy dotyk na zaludi alebo po jeho okraji.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('frenulum_finger_focus',       'dotyk uzdicky prstom',                 'hands', 'Cielene hladkanie uzdicky alebo okolia pod zaludom.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('frenulum_tongue_focus',       'dotyk uzdicky jazykom',                'mouth', 'Kratka oralna stimulacia uzdicky alebo spodnej strany zaluda.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('foreskin_slide',              'posuvanie predkozky',                  'hands', 'Jemny pohyb predkozky hore a dole, len ak ju prijimatel ma.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy','Scarleteen sexual anatomy']),
  ('shaft_underside_stroke',      'hladkanie spodnej strany penisu',      'hands', 'Pomaly alebo pevnejsi dotyk po spodnej strane penisu.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('shaft_underside_lick',        'lizanie spodnej strany penisu',        'mouth', 'Oralny tah jazykom po spodnej strane penisu.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('penis_base_grip',             'pevnejsie drzanie korena penisu',      'hands', 'Drzanie alebo tlak pri koreni penisu, mimo zaluda.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('oral_penis_kiss',             'bozkavanie penisu',                    'mouth', 'Bozky na penis, zalud alebo koren bez sania.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('oral_penis_lick',             'lizanie penisu',                       'mouth', 'Lizanie penisu po dlzke alebo okolo zaluda.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('oral_penis_suck_light',       'jemne sanie penisu',                   'mouth', 'Jemne oralne sanie penisu alebo zaluda.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('oral_penis_suck_strong',      'silnejsie sanie penisu',               'mouth', 'Vyraznejsie oralne sanie s kratkymi pauzami.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('penis_vibration_low',         'jemna vibracia na penise',             'toy', 'Nizka vibracia na tele penisu, koreni alebo zaludi.', 'partner_to_receiver', false, false, true, false, false, array['WebMD vibrators']),
  ('penis_vibration_strong',      'silnejsia vibracia na penise',         'toy', 'Vyraznejsia vibracia na penise alebo zaludi.', 'partner_to_receiver', false, false, true, false, false, array['WebMD vibrators']),
  ('scrotum_cup',                 'prekrytie mieska dlanou',              'hands', 'Jemne podrzanie mieska v dlani bez stlacania semennikov.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('scrotum_lift_light',          'jemne nadvihnutie mieska',             'hands', 'Lahke nadvihnutie mieska bez tahu na semenniky.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('scrotum_kiss',                'bozkavanie mieska',                    'mouth', 'Bozky na miesok alebo jeho okolie.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('scrotum_lick',                'lizanie mieska',                       'mouth', 'Jemne lizanie mieska alebo jeho okolia.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('testicle_touch_light',        'jemny dotyk semennikov',               'hands', 'Velmi jemny dotyk semennikov bez tlaku.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy']),
  ('testicle_kiss',               'bozkavanie semennikov',                'mouth', 'Kratke bozky na oblast semennikov bez satia alebo tlaku.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('male_perineum_pressure',      'tlak na muzsku hradzu',                'hands', 'Tlak alebo kruzenie na hradzi medzi mieskom a anusom.', 'partner_to_receiver', false, true, false, false, false, array['Planned Parenthood male anatomy','Healthline anal fingering'])
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
    ('penis','penis_hand_stroke_slow','partner_to_receiver','sensual',1,3,10,120,'preference_required',true,false,false,false,array[]::text[],'Pomaly hlad penis rukou a sleduj, kde prijimatel vnimanie citi najlepsie.',null,array['Planned Parenthood male anatomy']),
    ('penis','penis_lube_stroke','partner_to_receiver','sensual',2,4,20,180,'preference_required',true,false,true,false,array['lubrikant'],'Pouzi lubrikant a striedaj rychlost alebo tlak podla preferencie.',null,array['Scarleteen sexual anatomy']),
    ('penis','penis_firm_stroke','partner_to_receiver','intense',3,4,10,120,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Pouzi pevnejsi tah po penise bez toho, aby si prechadzal cez bolest.', 'Pevny tlak nie je vhodny pre kazdeho; citlivost sa meni aj pocas vzrusenia.', array['Planned Parenthood male anatomy']),
    ('penis','oral_penis_kiss','partner_to_receiver','sensual',1,3,5,90,'preference_required',true,false,false,false,array[]::text[],'Bozkavaj penis alebo jeho koren bez sania.',null,array['Scarleteen sexual anatomy']),
    ('penis','oral_penis_lick','partner_to_receiver','sensual',1,4,5,120,'preference_required',true,false,false,false,array[]::text[],'Liz penis po dlzke alebo okolo zaluda a men tempo.',null,array['Scarleteen sexual anatomy']),
    ('penis','oral_penis_suck_light','partner_to_receiver','sensual',2,4,5,120,'preference_required',true,false,false,false,array[]::text[],'Jemne saj penis a pridavaj alebo uberaj tlak podla reakcie.',null,array['Scarleteen sexual anatomy']),
    ('penis','oral_penis_suck_strong','partner_to_receiver','intense',3,4,3,60,'preference_required',true,false,false,false,array[]::text[],'Silnejsie saj penis kratko a s pauzami.', 'Silne sanie len ak je to vyslovene oblubene.', array['Scarleteen sexual anatomy']),
    ('penis','penis_vibration_low','partner_to_receiver','toys',1,3,5,90,'preference_required',true,true,false,false,array['vibrator'],'Pouzi jemnu vibraciu na tele penisu alebo pri koreni.',null,array['WebMD vibrators']),
    ('penis','penis_vibration_strong','partner_to_receiver','toys',3,5,5,90,'preference_required',true,true,false,false,array['vibrator'],'Pouzi silnejsiu vibraciu na penise iba v nastavenej intenzite.', 'Vibracia na zaludi moze byt rychlo prilis intenzivna.', array['WebMD vibrators']),

    ('glans','glans_palm_circle','partner_to_receiver','sensual',1,4,5,60,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Kruz dlanou alebo prstami cez zalud v prijemnej intenzite.', 'Zalud byva velmi citlivy; zacat skor nepriamo alebo kratko.', array['Planned Parenthood male anatomy']),
    ('glans','glans_tongue_circle','partner_to_receiver','sensual',1,4,3,60,'preference_required',true,false,false,false,array[]::text[],'Kruz jazykom na zaludi alebo po jeho okraji.',null,array['Scarleteen sexual anatomy']),
    ('glans','oral_penis_suck_light','partner_to_receiver','sensual',2,4,3,60,'preference_required',true,false,false,false,array[]::text[],'Jemne saj zalud a striedaj tlak s pauzami.',null,array['Scarleteen sexual anatomy']),
    ('glans','penis_vibration_low','partner_to_receiver','toys',1,3,3,45,'preference_required',true,true,false,false,array['vibrator'],'Kratko pouzi jemnu vibraciu na zaludi alebo cez predkozku.', 'Ak je zalud precitliveny, vrat sa na telo penisu.', array['WebMD vibrators']),

    ('frenulum','frenulum_finger_focus','partner_to_receiver','sensual',1,4,3,60,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Cielene hlad uzdicku prstom alebo palcom.', 'Uzdicka moze byt velmi intenzivna, pouzi kratke intervaly.', array['Planned Parenthood male anatomy']),
    ('frenulum','frenulum_tongue_focus','partner_to_receiver','sensual',1,4,3,45,'preference_required',true,false,false,false,array[]::text[],'Kratko stimuluj uzdicku jazykom a sleduj reakciu.', 'Kratko a presne; nie kazdy chce priamu stimulaciu uzdicky.', array['Scarleteen sexual anatomy']),

    ('foreskin','foreskin_slide','partner_to_receiver','explore',1,3,5,90,'preference_required',true,false,false,false,array[]::text[],'Ak prijimatel ma predkozku, pomaly ju posuvaj bez tahu alebo bolesti.', 'Toto pravidlo sa nepouzije, ak prijimatel predkozku nema alebo je oblast citliva.', array['Planned Parenthood male anatomy']),
    ('foreskin','glans_tongue_circle','partner_to_receiver','sensual',1,3,3,45,'preference_required',true,false,false,false,array[]::text[],'Oralne stimuluj zalud cez predkozku alebo jej okraj.', 'Len ak je predkozka pritomna a pohyb je prijemny.', array['Scarleteen sexual anatomy']),

    ('shaft_underside','shaft_underside_stroke','partner_to_receiver','sensual',1,4,10,120,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Hlad spodnu stranu penisu pomaly alebo pevnejsie podla preferencie.',null,array['Planned Parenthood male anatomy']),
    ('shaft_underside','shaft_underside_lick','partner_to_receiver','sensual',1,4,5,90,'preference_required',true,false,false,false,array[]::text[],'Liz spodnu stranu penisu smerom ku zaludu alebo naspat.',null,array['Scarleteen sexual anatomy']),
    ('shaft_underside','frenulum_tongue_focus','partner_to_receiver','intense',2,4,3,45,'preference_required',true,false,false,false,array[]::text[],'Prejdi jazykom po spodnej strane penisu az k uzdicke.',null,array['Scarleteen sexual anatomy']),

    ('penis_base','penis_base_grip','partner_to_receiver','sensual',2,4,10,90,'preference_required',true,false,false,false,array[]::text[],'Drz alebo tlac pri koreni penisu mimo zaluda.',null,array['Planned Parenthood male anatomy']),
    ('penis_base','oral_penis_kiss','partner_to_receiver','sensual',1,3,5,60,'preference_required',true,false,false,false,array[]::text[],'Bozkavaj koren penisu a okolie.',null,array['Scarleteen sexual anatomy']),

    ('scrotum','scrotum_cup','partner_to_receiver','explore',1,2,10,60,'preference_required',true,false,false,false,array[]::text[],'Jemne prekry miesok dlanou bez stlacania.', 'Bez tlaku na semenniky.', array['Planned Parenthood male anatomy']),
    ('scrotum','scrotum_lift_light','partner_to_receiver','sensual',1,2,5,45,'preference_required',true,false,false,false,array[]::text[],'Jemne nadvihni miesok, bez tahu a bez stlacania.', 'Ak je to neprijemne, vrat sa k dotyku penisu alebo stehien.', array['Planned Parenthood male anatomy']),
    ('scrotum','scrotum_kiss','partner_to_receiver','sensual',1,3,5,60,'preference_required',true,false,false,false,array[]::text[],'Bozkavaj miesok kratko a jemne.',null,array['Scarleteen sexual anatomy']),
    ('scrotum','scrotum_lick','partner_to_receiver','sensual',1,3,3,45,'preference_required',true,false,false,false,array[]::text[],'Jemne liz miesok alebo jeho okolie.',null,array['Scarleteen sexual anatomy']),

    ('testicles','testicle_touch_light','partner_to_receiver','explore',1,2,3,30,'preference_required',true,false,false,false,array[]::text[],'Velmi jemne sa dotkni semennikov bez tlaku.', 'Semenniky nikdy nestlacat, ak to nie je vyslovene povolena preferencia.', array['Planned Parenthood male anatomy']),
    ('testicles','testicle_kiss','partner_to_receiver','sensual',1,2,3,30,'preference_required',true,false,false,false,array[]::text[],'Daj kratke jemne bozky na oblast semennikov.', 'Kratke, bez satia a bez tlaku.', array['Scarleteen sexual anatomy']),

    ('male_perineum','male_perineum_pressure','partner_to_receiver','sensual',1,4,5,90,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Kruz alebo jemne tlac na hradzu medzi mieskom a anusom.', 'Ak sa aktivita zacne menit na analnu stimulaciu, pouzit az samostatnu analnu preferenciu.', array['Healthline anal fingering'])
)
insert into rel.intimate_zone_stimulation_rules
  (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
   min_intensity, max_intensity, suggested_seconds_min, suggested_seconds_max,
   random_policy, requires_warmup, requires_tool, requires_lube, requires_aftercare, tool_tags,
   prompt_sk, caution_sk, source_refs)
select
  zone_slug,
  technique_slug,
  'male'::rel.intimate_body_target,
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
