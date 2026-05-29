-- =============================================================================
-- DeepTalks - Intimne dobrodruzstvo - anal, perineal and prostate rules
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 6: shared anal/perineal zones for all bodies, gender-specific anal
-- area rows, and prostate-specific stimulation for male receivers.
-- =============================================================================

create schema if not exists rel;

insert into rel.erogenous_zones
  (slug, target, label_sk, region, sensitivity, is_genital, is_internal, dice_enabled, notes_sk, source_refs)
values
  ('perineum',  'all', 'hradza / perineum', 'panva', 4, true, false, false, 'Spolocna zona medzi genitaliami a anusom; v hre pouzivat cez preferencie.', array['Planned Parenthood anatomy','Healthline anal fingering']),
  ('anal_area', 'all', 'analna oblast',     'panva', 4, true, false, false, 'Spolocna analna zona pre zeny aj muzov; nevkladat do zakladnych nahodnych kociek bez preferencie.', array['Healthline anal sex safety','Healthline anal fingering'])
on conflict (slug) do update set
  target = excluded.target,
  label_sk = excluded.label_sk,
  region = excluded.region,
  sensitivity = excluded.sensitivity,
  is_genital = excluded.is_genital,
  is_internal = excluded.is_internal,
  dice_enabled = excluded.dice_enabled,
  notes_sk = excluded.notes_sk,
  source_refs = excluded.source_refs;

insert into rel.intimate_stimulation_techniques
  (slug, label_sk, family, description_sk, default_actor, uses_mouth, uses_hands, uses_toy, bdsm_related, penetration_related, source_refs)
values
  ('perineum_external_pressure',  'tlak na hradzu',                    'hands', 'Tlak alebo kruzenie po hradzi zvonku.', 'partner_to_receiver', false, true, false, false, false, array['Healthline anal fingering','Planned Parenthood anatomy']),
  ('anal_external_touch',         'vonkajsi dotyk analnej oblasti',     'hands', 'Dotyk okolo anusu bez penetracie.', 'partner_to_receiver', false, true, false, false, false, array['Healthline anal sex safety']),
  ('anal_external_circle',        'kruzenie okolo anusu',               'hands', 'Kruzenie prstom okolo anusu bez vstupu dovnutra.', 'partner_to_receiver', false, true, false, false, false, array['Healthline anal fingering']),
  ('anal_kiss',                   'bozk na analnu oblast',              'mouth', 'Bozk na okolie anusu alebo zadku v analnej zony.', 'partner_to_receiver', true, false, false, false, false, array['Healthline rimming']),
  ('anal_lick',                   'oralna stimulacia anusu',            'mouth', 'Lizanie alebo oralna stimulacia anusu.', 'partner_to_receiver', true, false, false, false, false, array['Healthline rimming','Healthline anal sex safety']),
  ('anal_finger_tip',             'spicka prsta pri analnom vstupe',    'hands', 'Velmi plytky dotyk spickou prsta pri analnom vstupe.', 'partner_to_receiver', false, true, false, false, true, array['Healthline anal fingering']),
  ('anal_finger_one',             'jeden prst analne',                  'hands', 'Jeden prst analne po rozohriati a s lubrikantom.', 'partner_to_receiver', false, true, false, false, true, array['Healthline anal fingering','Healthline anal sex safety']),
  ('anal_plug_small',             'mensi analny plug',                  'toy', 'Mensi analny plug s rozsirujucou sa zakladnou urcenou na analne pouzitie.', 'partner_to_receiver', false, false, true, false, true, array['Healthline butt plugs','Healthline anal sex safety']),
  ('anal_toy_progressive',        'postupna analna pomocka',            'toy', 'Postupna analna pomocka v zvolenej velkosti.', 'partner_to_receiver', false, false, true, false, true, array['Healthline butt plugs','Healthline anal sex safety']),
  ('anal_penetration_planned',    'planovana analna penetracia',         'penetration', 'Analna penetracia prstom, penisom alebo pomockou iba ako planovana aktivita.', 'partner_to_receiver', false, false, false, false, true, array['Healthline anal sex safety']),
  ('anal_fisting_planned',        'planovany analny fisting',            'planned', 'Velmi pokrocila analna praktika iba ako vopred planovana aktivita.', 'partner_to_receiver', false, true, false, true, true, array['Healthline anal sex safety']),
  ('prostate_external_perineum',  'nepriamy tlak smerom k prostate',     'hands', 'Vonkajsi tlak cez muzsku hradzu ako nepriama stimulacia prostaty.', 'partner_to_receiver', false, true, false, false, false, array['Healthline anal fingering','Planned Parenthood male anatomy']),
  ('prostate_internal_finger',    'vnutorna stimulacia prostaty prstom', 'hands', 'Vnutorna analna stimulacia prostaty prstom.', 'partner_to_receiver', false, true, false, false, true, array['Healthline anal fingering']),
  ('prostate_toy',                'pomocka na prostatu',                 'toy', 'Pomocka urcena na stimulaciu prostaty.', 'partner_to_receiver', false, false, true, false, true, array['Healthline anal sex safety','Healthline butt plugs'])
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
  zone_slug, receiver_target, technique_slug, actor_scope, play_mode_slug,
  min_i, max_i, min_s, max_s, random_policy, warmup, tool, lube, aftercare,
  tool_tags, prompt, caution, refs
) as (
  values
    ('perineum','all','perineum_external_pressure','partner_to_receiver','sensual',1,4,5,90,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Kruz alebo tlac na hradzu zvonku v intenzite, ktoru prijimatel vybral.', 'Ak sa aktivita presuva k analnej penetracii, patri uz do analneho modu.', array['Healthline anal fingering']),
    ('female_perineum','female','perineum_external_pressure','partner_to_receiver','sensual',1,3,5,60,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Jemne stimuluj zensku hradzu medzi vulvou a anusom.', 'Drzat sa vonkajsej stimulacie, pokial nie je zvolena analna preferencia.', array['Planned Parenthood female anatomy']),
    ('male_perineum','male','perineum_external_pressure','partner_to_receiver','sensual',1,4,5,90,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Stimuluj muzsku hradzu tlakom alebo kruzenim.',null,array['Healthline anal fingering']),
    ('male_perineum','male','prostate_external_perineum','partner_to_receiver','intense',2,4,10,120,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Pouzi vonkajsi tlak cez hradzu ako nepriame drazdenie prostaty.', 'Len ak muz tuto zonu v preferenciach povolil.', array['Healthline anal fingering']),

    ('anal_area','all','anal_external_touch','partner_to_receiver','explore',1,2,5,60,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Dotykaj sa okolia anusu zvonku, bez penetracie.', 'Analna oblast nie je zakladna nahodna karta; vyzaduje preferenciu.', array['Healthline anal sex safety']),
    ('anal_area','all','anal_external_circle','partner_to_receiver','sensual',1,3,5,90,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Kruz okolo anusu bez vstupu dovnutra.',null,array['Healthline anal fingering']),
    ('anal_area','all','anal_kiss','partner_to_receiver','sensual',1,2,3,30,'preference_required',true,false,false,false,array[]::text[],'Daj kratky bozk na analnu oblast alebo jej okolie.', 'Oralno-analne aktivity maju samostatnu hygienu a preferenciu.', array['Healthline rimming']),
    ('anal_area','all','anal_lick','partner_to_receiver','planned_edge',1,3,3,45,'planned_only',true,false,false,true,array[]::text[],'Oralna analna stimulacia iba ako planovana aktivita.', 'Nelosit nahodne; samostatna preferencia, hygiena a po aktivite nemenit na vaginalnu/oralnu stimulaciu bez ocistenia.', array['Healthline rimming','Healthline anal sex safety']),
    ('anal_area','all','anal_finger_tip','partner_to_receiver','planned_edge',1,2,3,30,'planned_only',true,false,true,false,array['lubrikant'],'Dotkni sa spickou prsta pri analnom vstupe iba ak je to vopred zvolene.', 'Pouzit lubrikant, kratke nechty, bez tlaku a bez bolesti.', array['Healthline anal fingering']),
    ('anal_area','all','anal_finger_one','partner_to_receiver','planned_edge',1,3,10,120,'planned_only',true,false,true,true,array['lubrikant'],'Jeden prst analne iba ako planovana aktivita s vela lubrikantom.', 'Anal nema prirodzeny lubrikant; ak je bolest alebo odpor, stop.', array['Healthline anal fingering','Healthline anal sex safety']),
    ('anal_area','all','anal_plug_small','partner_to_receiver','planned_edge',1,3,30,300,'planned_only',true,true,true,true,array['analny plug','lubrikant'],'Pouzi maly analny plug urceny na analne pouzitie.', 'Pomocka musi mat bezpecnu zakladnu a vela lubrikantu.', array['Healthline butt plugs']),
    ('anal_area','all','anal_penetration_planned','partner_to_receiver','planned_edge',2,4,30,300,'planned_only',true,false,true,true,array['lubrikant'],'Analna penetracia iba ako vopred planovana aktivita.', 'Nie je nahodna vyzva; zacat pomaly, s lubrikantom a bez bolesti.', array['Healthline anal sex safety']),
    ('anal_area','all','anal_fisting_planned','partner_to_receiver','planned_edge',4,5,120,900,'planned_only',true,false,true,true,array['vela lubrikantu','rukavica volitelne'],'Planovany analny fisting iba mimo nahodneho generatora.', 'Velmi pokrocile; nelosovat, vyzaduje cas, pripravu, lubrikant a okamzite zastavenie pri bolesti.', array['Healthline anal sex safety']),

    ('female_anal_area','female','anal_external_touch','partner_to_receiver','explore',1,2,5,60,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Dotykaj sa zenskej analnej oblasti zvonku, bez penetracie.',null,array['Healthline anal sex safety']),
    ('female_anal_area','female','anal_external_circle','partner_to_receiver','sensual',1,3,5,90,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Kruz okolo anusu zvonku, bez vstupu dovnutra.',null,array['Healthline anal fingering']),
    ('female_anal_area','female','anal_finger_one','partner_to_receiver','planned_edge',1,3,10,120,'planned_only',true,false,true,true,array['lubrikant'],'Jeden prst analne iba ako zvolena planovana aktivita.', 'Lubrikant a velmi pomale tempo; nevymienat analne/vaginalne poradie bez ocistenia.', array['Healthline anal fingering','Healthline anal sex safety']),
    ('female_anal_area','female','anal_plug_small','partner_to_receiver','planned_edge',1,3,30,300,'planned_only',true,true,true,true,array['analny plug','lubrikant'],'Pouzi maly analny plug iba ako planovanu aktivitu.', 'Pomocka musi mat bezpecnu zakladnu.', array['Healthline butt plugs']),
    ('female_anal_area','female','anal_penetration_planned','partner_to_receiver','planned_edge',2,4,30,300,'planned_only',true,false,true,true,array['lubrikant'],'Planovana analna penetracia pre zensku prijimatelku.', 'Nie je nahodna karta; bez bolesti a bez tlaku.', array['Healthline anal sex safety']),

    ('male_anal_area','male','anal_external_touch','partner_to_receiver','explore',1,2,5,60,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Dotykaj sa muzskej analnej oblasti zvonku, bez penetracie.',null,array['Healthline anal sex safety']),
    ('male_anal_area','male','anal_external_circle','partner_to_receiver','sensual',1,3,5,90,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Kruz okolo anusu zvonku, bez vstupu dovnutra.',null,array['Healthline anal fingering']),
    ('male_anal_area','male','anal_finger_one','partner_to_receiver','planned_edge',1,3,10,120,'planned_only',true,false,true,true,array['lubrikant'],'Jeden prst analne iba ako zvolena planovana aktivita.', 'Pouzit lubrikant, kratke nechty, pomaly a bez bolesti.', array['Healthline anal fingering']),
    ('male_anal_area','male','anal_plug_small','partner_to_receiver','planned_edge',1,3,30,300,'planned_only',true,true,true,true,array['analny plug','lubrikant'],'Pouzi maly analny plug iba ako planovanu aktivitu.', 'Pomocka musi mat bezpecnu zakladnu.', array['Healthline butt plugs']),
    ('male_anal_area','male','anal_penetration_planned','partner_to_receiver','planned_edge',2,4,30,300,'planned_only',true,false,true,true,array['lubrikant'],'Planovana analna penetracia pre muzskeho prijimatela.', 'Nie je nahodna karta; bez bolesti a bez tlaku.', array['Healthline anal sex safety']),

    ('prostate','male','prostate_external_perineum','partner_to_receiver','intense',2,4,10,120,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Stimuluj prostatu nepriamo cez tlak na hradzu.', 'Nepriama varianta, bez analnej penetracie.', array['Healthline anal fingering']),
    ('prostate','male','prostate_internal_finger','partner_to_receiver','planned_edge',1,4,10,180,'planned_only',true,false,true,true,array['lubrikant'],'Vnutorna stimulacia prostaty prstom iba ako planovana aktivita.', 'Vela lubrikantu, kratke nechty a okamzite stop pri bolesti.', array['Healthline anal fingering']),
    ('prostate','male','prostate_toy','partner_to_receiver','planned_edge',1,5,30,300,'planned_only',true,true,true,true,array['pomocka na prostatu','lubrikant'],'Pouzi pomocku na prostatu iba v zvolenej velkosti a intenzite.', 'Pomocka musi byt urcena na analne/prostaticke pouzitie a mat bezpecnu zakladnu.', array['Healthline butt plugs','Healthline anal sex safety'])
)
insert into rel.intimate_zone_stimulation_rules
  (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
   min_intensity, max_intensity, suggested_seconds_min, suggested_seconds_max,
   random_policy, requires_warmup, requires_tool, requires_lube, requires_aftercare, tool_tags,
   prompt_sk, caution_sk, source_refs)
select
  zone_slug,
  technique_slug,
  receiver_target::rel.intimate_body_target,
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
