-- =============================================================================
-- DeepTalks · Intimne dobrodruzstvo — lower-body stimulation rules
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 3: waist, hips, belly, lower belly, navel, buttocks, inner thighs,
-- back of knees, calves, feet and toes.
--
-- Genitals, anal play, penetration and fisting are intentionally separate.
-- =============================================================================

create schema if not exists rel;

insert into rel.intimate_stimulation_techniques
  (slug, label_sk, family, description_sk, default_actor, uses_mouth, uses_hands, uses_toy, bdsm_related, penetration_related, source_refs)
values
  ('grip_pull_close',       'pritiahnutie za boky/pas',    'hands',     'Pevnejsie pritiahne telo za boky alebo pas.', 'partner_to_receiver', false, true, false, false, false, array['Scarleteen sexual consent basics']),
  ('belly_kiss_trail',      'sled bozkov po bruchu',       'mouth',     'Pomaly sled bozkov po bruchu alebo podbrusku.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('belly_tongue_trace',    'obkreslenie jazykom',         'mouth',     'Kratke obkreslenie jazykom po bruchu alebo bokoch.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('thigh_kiss_trail',      'bozky po vnutornych stehnach','mouth',     'Bozky cez vnutorne stehna smerom k panve, bez genitalii.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('thigh_suck_light',      'jemne sanie stehna',          'mouth',     'Kratke sanie koze na vnutornom stehne.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('thigh_bite_soft',       'jemne zahryznutie do stehna', 'mouth',     'Jemne zachytenie koze alebo svalu stehna zubami.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('thigh_bite_firm',       'pevnejsie zahryznutie do stehna','mouth',  'Vyraznejsie kontrolovane hryzenie vnutorneho stehna.', 'partner_to_receiver', true, false, false, true, false, array['TASHRA BDSM risk awareness']),
  ('butt_squeeze',          'stlacenie zadku',             'hands',     'Stlacenie alebo uchopenie zadku rukou.', 'partner_to_receiver', false, true, false, false, false, array['Medical News Today erogenous zones']),
  ('butt_massage',          'masaz zadku',                 'hands',     'Masaz sedacich svalov a okolia bokov.', 'partner_to_receiver', false, true, false, false, false, array['Medical News Today erogenous zones']),
  ('spank_hand_light',      'lahke placnutie rukou',       'impact',    'Lahke placnutie rukou na masite casti zadku.', 'partner_to_receiver', false, true, false, true, false, array['Healthline impact play','BDSM Wiki impact play']),
  ('spank_hand_firm',       'pevnejsie placnutie rukou',   'impact',    'Vyraznejsie placnutie rukou na masite casti zadku.', 'partner_to_receiver', false, true, false, true, false, array['Healthline impact play','BDSM Wiki impact play']),
  ('paddle_light',          'lahka placacka',              'impact',    'Lahky impact placackou na masite casti zadku.', 'partner_to_receiver', false, true, true, true, false, array['Healthline impact play','BDSM Wiki impact play']),
  ('flogger_light',         'lahky flogger / bicik',       'impact',    'Lahky impact makksou pomockou na masite casti zadku alebo stehna.', 'partner_to_receiver', false, true, true, true, false, array['Healthline impact play','BDSM Wiki impact play']),
  ('foot_massage',          'masaz chodidiel',             'hands',     'Masaz chodidiel a prstov na nohach.', 'partner_to_receiver', false, true, false, false, false, array['WebMD foot fetish','Medical News Today foot fetish']),
  ('sole_trace',            'dotyk po chodidle',           'hands',     'Pomaly tah prstom alebo nechtom po chodidle.', 'partner_to_receiver', false, true, false, false, false, array['WebMD foot fetish']),
  ('toe_kiss',              'bozkavanie prstov na nohach', 'mouth',     'Bozky na prsty na nohach.', 'partner_to_receiver', true, false, false, false, false, array['WebMD foot fetish']),
  ('toe_suck',              'sanie prstov na nohach',      'mouth',     'Sanie prstov na nohach ako foot play.', 'partner_to_receiver', true, false, false, false, false, array['WebMD foot fetish','Medical News Today foot fetish'])
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
  min_i, max_i, min_s, max_s, random_policy, warmup, tool, aftercare,
  tool_tags, prompt, caution, refs
) as (
  values
    -- Waist / hips
    ('waist','skin_trace','partner_to_receiver','explore',1,3,10,90,'always_ok',false,false,false,array[]::text[],'Pomaly prejdi prstami po pase a zastav tam, kde telo zareaguje.',null,array['Medical News Today erogenous zones']),
    ('waist','kiss_trail','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Bozkavaj pas a prechadzaj medzi bokmi a bruchom.',null,array['Medical News Today erogenous zones']),
    ('waist','grip_pull_close','partner_to_receiver','sensual',2,4,5,45,'preference_required',false,false,false,array[]::text[],'Chyť partnera/ku za pas a pritiahni ho/ju blizsie.',null,array['Scarleteen sexual consent basics']),
    ('hips','skin_trace','partner_to_receiver','explore',1,3,10,90,'always_ok',false,false,false,array[]::text[],'Prechadzaj prstami cez boky pomalym tahom.',null,array['Medical News Today erogenous zones']),
    ('hips','grip_pull_close','partner_to_receiver','sensual',2,4,5,60,'preference_required',false,false,false,array[]::text[],'Pevnejsie uchop boky a nastav tempo priblizenia.',null,array['Scarleteen sexual consent basics']),
    ('hips','kiss_trail','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Bozkavaj boky bez ponahlaneho prechodu dalej.',null,array['Medical News Today erogenous zones']),

    -- Belly / lower belly / navel
    ('belly','skin_trace','partner_to_receiver','explore',1,3,10,120,'always_ok',false,false,false,array[]::text[],'Prstami pomaly obkresluj brucho a sleduj dych.',null,array['Medical News Today erogenous zones']),
    ('belly','belly_kiss_trail','partner_to_receiver','sensual',1,3,10,120,'preference_required',false,false,false,array[]::text[],'Daj pomaly sled bozkov cez brucho.',null,array['Medical News Today erogenous zones']),
    ('belly','belly_tongue_trace','partner_to_receiver','sensual',1,3,3,45,'preference_required',false,false,false,array[]::text[],'Kratko obkresli jazykom cast brucha a potom sa vrat k bozkom.',null,array['Medical News Today erogenous zones']),
    ('belly','feather_path','partner_to_receiver','explore',1,2,10,120,'always_ok',false,true,false,array['pierko'],'Prechadzaj pierkom cez brucho a boky.',null,array['Medical News Today erogenous zones']),
    ('belly','ice_trace','partner_to_receiver','toys',1,3,3,20,'preference_required',true,true,false,array['lad'],'Kratko prejdi chladom cez brucho a hned ho zahrej rukou alebo bozkom.','Chlad len kratko a bez neprijemnych reakcii.',array['Healthline hickeys']),
    ('lower_belly','skin_trace','partner_to_receiver','explore',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Pomaly prejdi prstami po podbrusku bez dotyku genitalii.',null,array['Medical News Today erogenous zones']),
    ('lower_belly','belly_kiss_trail','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Bozkavaj podbrusko a zastav sa pred genitaliami.',null,array['Medical News Today erogenous zones']),
    ('lower_belly','warm_breath','partner_to_receiver','sensual',1,3,3,30,'preference_required',false,false,false,array[]::text[],'Dychaj teplo na podbrusko a nechaj pauzu.',null,array['Medical News Today erogenous zones']),
    ('navel','skin_trace','partner_to_receiver','explore',1,2,5,45,'preference_required',false,false,false,array[]::text[],'Jemne obkresli okolie pupka prstom.', 'Pupok moze byt neprijemny alebo steklivy.', array['Medical News Today erogenous zones']),
    ('navel','kiss_soft','partner_to_receiver','sensual',1,2,3,30,'preference_required',false,false,false,array[]::text[],'Kratko pobozkaj okolie pupka.', 'Pupok pouzivaj len ak je prijemny.', array['Medical News Today erogenous zones']),
    ('navel','tongue_flick','partner_to_receiver','sensual',1,2,2,15,'preference_required',false,false,false,array[]::text[],'Ak to ma prijimatel rad, velmi kratko sa dotkni jazykom okolia pupka.', 'Nie je vhodne do zakladneho mixu bez preferencie.', array['Medical News Today erogenous zones']),

    -- Buttocks / gluteal fold
    ('buttocks','butt_massage','partner_to_receiver','explore',1,3,30,240,'preference_required',false,false,false,array[]::text[],'Masiruj zadok a boky pomalym tlakom.',null,array['Medical News Today erogenous zones']),
    ('buttocks','butt_squeeze','partner_to_receiver','sensual',2,4,5,60,'preference_required',false,false,false,array[]::text[],'Stlac zadok rukou a men tlak podla reakcie.',null,array['Medical News Today erogenous zones']),
    ('buttocks','kiss_trail','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Bozkavaj zadok mimo analnej oblasti.',null,array['Medical News Today erogenous zones']),
    ('buttocks','nibble_soft','partner_to_receiver','sensual',2,3,2,20,'preference_required',false,false,false,array[]::text[],'Jemne zahryzni do masitej casti zadku a hned povol.',null,array['Medical News Today erogenous zones']),
    ('buttocks','spank_hand_light','partner_to_receiver','intense',2,4,2,30,'preference_required',true,false,false,array[]::text[],'Lahko placni rukou na masitu cast zadku a nechaj pauzu.', 'Vyhnut sa kostrci, krizom, klbom a kostiam.', array['Healthline impact play','BDSM Wiki impact play']),
    ('buttocks','spank_hand_firm','partner_to_receiver','bdsm',3,5,2,30,'mode_required',true,false,true,array[]::text[],'V BDSM mode pouzi pevnejsie placnutie rukou na masitu cast zadku.', 'Impact patri len do povoleneho rezimu; zacat nizko a pomaly.', array['Healthline impact play','BDSM Wiki impact play']),
    ('buttocks','paddle_light','partner_to_receiver','bdsm',2,4,2,30,'mode_required',true,true,true,array['placacka'],'Pouzi lahku placacku na masitu cast zadku v nastavenej intenzite.', 'Vyhnut sa kostrci, oblickam, krizom a klbom.', array['Healthline impact play','BDSM Wiki impact play']),
    ('buttocks','flogger_light','partner_to_receiver','bdsm',2,4,2,30,'mode_required',true,true,true,array['flogger','bicik'],'Pouzi lahky flogger alebo makky bicik na masitu cast zadku.', 'Len v BDSM mode a nie na kostnate oblasti.', array['Healthline impact play','BDSM Wiki impact play']),
    ('gluteal_fold','skin_trace','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Pomaly prejdi prstami medzi zadkom a stehnom bez prechodu k analnej oblasti.',null,array['Medical News Today erogenous zones']),
    ('gluteal_fold','kiss_trail','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Bozkavaj oblast medzi zadkom a stehnom.',null,array['Medical News Today erogenous zones']),

    -- Inner thighs
    ('inner_thighs','thigh_kiss_trail','partner_to_receiver','sensual',1,3,10,120,'preference_required',false,false,false,array[]::text[],'Bozkavaj vnutorne stehna smerom k panve, ale zastav pred genitaliami.',null,array['Medical News Today erogenous zones']),
    ('inner_thighs','thigh_suck_light','partner_to_receiver','sensual',2,3,3,30,'preference_required',false,false,false,array[]::text[],'Kratko saj kozu na vnutornom stehne a potom ju pobozkaj.',null,array['Medical News Today erogenous zones']),
    ('inner_thighs','thigh_bite_soft','partner_to_receiver','sensual',2,3,2,20,'preference_required',false,false,false,array[]::text[],'Jemne zahryzni do vnutorneho stehna a hned povol.',null,array['Medical News Today erogenous zones']),
    ('inner_thighs','thigh_bite_firm','partner_to_receiver','intense',3,4,2,15,'preference_required',true,false,false,array[]::text[],'Pevnejsie zahryzni do vnutorneho stehna len kratko.', 'Hryzenie vnutorneho stehna len po preferencii.', array['TASHRA BDSM risk awareness']),
    ('inner_thighs','skin_trace','partner_to_receiver','explore',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Prechadzaj prstami po vnutornom stehne a drz sa mimo genitalii.',null,array['Medical News Today erogenous zones']),
    ('inner_thighs','feather_path','partner_to_receiver','explore',1,2,10,90,'preference_required',false,true,false,array['pierko'],'Prechadzaj pierkom po vnutornych stehnach.',null,array['Medical News Today erogenous zones']),
    ('inner_thighs','ice_trace','partner_to_receiver','toys',1,3,3,20,'preference_required',true,true,false,array['lad'],'Kratko prejdi chladom po vnutornom stehne a potom zahrej rukou.',null,array['Medical News Today erogenous zones']),
    ('inner_thighs','flogger_light','partner_to_receiver','bdsm',2,4,2,20,'mode_required',true,true,true,array['flogger','bicik'],'V BDSM mode pouzi lahky flogger na masitej casti stehna.', 'Vyhnut sa klbom a vnutornym citlivym oblastiam, ak je to neprijemne.', array['Healthline impact play','BDSM Wiki impact play']),

    -- Knees / calves
    ('back_of_knees','skin_trace','partner_to_receiver','explore',1,2,5,45,'preference_required',false,false,false,array[]::text[],'Jemne prejdi prstami za kolenom.', 'Moze byt velmi steklive.', array['Medical News Today erogenous zones']),
    ('back_of_knees','kiss_soft','partner_to_receiver','sensual',1,2,3,30,'preference_required',false,false,false,array[]::text[],'Kratko pobozkaj zadnu stranu kolena.', 'Kratko, lebo zona moze byt stekliva.', array['Medical News Today erogenous zones']),
    ('calves','massage_soft','partner_to_receiver','explore',1,3,30,240,'always_ok',false,false,false,array[]::text[],'Masiruj lytka pomalym tlakom.',null,array['Medical News Today erogenous zones']),
    ('calves','massage_deep','partner_to_receiver','sensual',2,4,30,180,'preference_required',false,false,false,array[]::text[],'Pouzi hlbsi tlak na lytka a men tempo.',null,array['Medical News Today erogenous zones']),
    ('calves','kiss_trail','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Bozkavaj lytko smerom k zadnej strane kolena.',null,array['Medical News Today erogenous zones']),

    -- Feet / toes. More preference-gated because many people love it and many reject it.
    ('feet','foot_massage','partner_to_receiver','explore',1,3,60,420,'preference_required',false,false,false,array[]::text[],'Masiruj chodidlo a nechaj prijimatela ukazat tlak.', 'Foot play pouzivat len ak je zóna prijemna.', array['WebMD foot fetish','Medical News Today foot fetish']),
    ('feet','sole_trace','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Pomaly prejdi prstom po chodidle.', 'Moze byt steklive alebo neprijemne.', array['WebMD foot fetish']),
    ('feet','kiss_soft','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Bozkavaj chodidlo iba ak je to prijemne obom.', 'Nerobit pri koznom probleme alebo otvorenej ranke.', array['WebMD foot fetish']),
    ('feet','lick_flat','partner_to_receiver','sensual',1,3,3,45,'preference_required',true,false,false,array[]::text[],'Kratko prejdi jazykom po chodidle, ak je foot play povoleny.', 'Hygiena a ziadne kozne infekcie/ranky.', array['WebMD foot fetish']),
    ('toes','toe_kiss','partner_to_receiver','sensual',1,3,3,45,'preference_required',false,false,false,array[]::text[],'Bozkavaj prsty na nohach, jeden po druhom.', 'Len ak je foot play povoleny.', array['WebMD foot fetish']),
    ('toes','toe_suck','partner_to_receiver','intense',2,4,3,45,'preference_required',true,false,false,array[]::text[],'Saj prst na nohe pomaly a kratko.', 'Vyhnut sa pri koznom probleme, rankach alebo nechuti k foot play.', array['WebMD foot fetish','Medical News Today foot fetish'])
)
insert into rel.intimate_zone_stimulation_rules
  (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
   min_intensity, max_intensity, suggested_seconds_min, suggested_seconds_max,
   random_policy, requires_warmup, requires_tool, requires_aftercare, tool_tags,
   prompt_sk, caution_sk, source_refs)
select
  zone_slug,
  technique_slug,
  'all'::rel.intimate_body_target,
  actor_scope::rel.intimate_actor_scope,
  play_mode_slug,
  min_i,
  max_i,
  min_s,
  max_s,
  random_policy::rel.intimate_random_policy,
  warmup,
  tool,
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
  requires_aftercare = excluded.requires_aftercare,
  tool_tags = excluded.tool_tags,
  prompt_sk = excluded.prompt_sk,
  caution_sk = excluded.caution_sk,
  source_refs = excluded.source_refs;
