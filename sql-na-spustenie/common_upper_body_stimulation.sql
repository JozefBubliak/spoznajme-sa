-- =============================================================================
-- DeepTalks · Intimne dobrodruzstvo — common upper-body stimulation rules
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 2: shared zones for all receivers
-- lips, ears, hair/scalp, cheeks/jaw, neck/nape, collarbones, shoulders/back,
-- chest, wrists, palms, fingers.
--
-- Genitals, penetration, anal play and advanced BDSM are intentionally NOT here.
-- =============================================================================

create schema if not exists rel;

insert into rel.intimate_stimulation_techniques
  (slug, label_sk, family, description_sk, default_actor, uses_mouth, uses_hands, uses_toy, bdsm_related, penetration_related, source_refs)
values
  ('deep_kiss',          'hlboky bozk',                 'mouth',     'Intenzivnejsi bozk ustami a jazykom.', 'mutual', true, false, false, false, false, array['Scarleteen kissing and snuggles','Medical News Today erogenous zones']),
  ('lip_bite_soft',      'jemne zahryznutie do pery',   'mouth',     'Jemne zachytenie pery zubami bez silneho tlaku.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen kissing and snuggles']),
  ('lip_bite_firm',      'pevnejsie zahryznutie do pery','mouth',    'Vyraznejsie, ale kontrolovane zahryznutie do pery.', 'partner_to_receiver', true, false, false, true, false, array['Scarleteen kissing and snuggles']),
  ('kiss_trail',         'pomaly sled bozkov',          'mouth',     'Sled bozkov cez viac blizkych bodov na tele.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('suck_skin_light',    'jemne sanie koze',            'mouth',     'Kratke sanie koze bez ciela zanechat stopu.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('suck_skin_mark',     'sanie so stopou / cucflek',   'mouth',     'Sanie koze s moznym zanechanim stopy.', 'partner_to_receiver', true, false, false, true, false, array['Healthline hickeys','Medical News Today erogenous zones']),
  ('tongue_flick',       'kratke dotyky spickou jazyka','mouth',     'Kratke, cielene dotyky spickou jazyka.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('warm_breath',        'teply dych',                  'sensation', 'Teple dychanie na citlivu oblast.', 'partner_to_receiver', false, false, false, false, false, array['Medical News Today erogenous zones']),
  ('close_whisper',      'sepot zblizka',               'voice',     'Hlasovy a dychovy podnet pri uchu alebo krku.', 'partner_to_receiver', false, false, false, false, false, array['Scarleteen consent basics','Medical News Today erogenous zones']),
  ('skin_trace',         'pomaly tah prstami',          'hands',     'Pomaly tah prstami po kozi.', 'partner_to_receiver', false, true, false, false, false, array['Medical News Today erogenous zones']),
  ('nails_light',        'lahke prejdenie nechtami',    'hands',     'Jemne nechtove skrabkanie bez bolesti.', 'partner_to_receiver', false, true, false, false, false, array['Medical News Today erogenous zones']),
  ('nails_firm',         'pevnejsie prejdenie nechtami','hands',     'Vyraznejsi tlak nechtami alebo skrabanie.', 'partner_to_receiver', false, true, false, true, false, array['TASHRA BDSM risk awareness']),
  ('massage_soft',       'jemna masaz',                 'hands',     'Relaxacna alebo zmyselna masaz nizsim tlakom.', 'partner_to_receiver', false, true, false, false, false, array['Medical News Today erogenous zones']),
  ('massage_deep',       'hlbsia masaz',                'hands',     'Pevnejsia masaz svalovych oblasti.', 'partner_to_receiver', false, true, false, false, false, array['Medical News Today erogenous zones']),
  ('grip_hold',          'pevnejsie podrzanie',         'hands',     'Drzanie alebo uchopenie oblasti bez trhania.', 'partner_to_receiver', false, true, false, false, false, array['Scarleteen consent basics']),
  ('finger_suck',        'sanie prstov',                'mouth',     'Sanie alebo bozkavanie prstov.', 'partner_to_receiver', true, false, false, false, false, array['Medical News Today erogenous zones']),
  ('hair_play_soft',     'jemna hra s vlasmi',          'hands',     'Prechadzanie prstami cez vlasy alebo ich hladkanie.', 'partner_to_receiver', false, true, false, false, false, array['Women’s Health hair pulling safety','Medical News Today erogenous zones']),
  ('hair_pull_light',    'jemne potiahnutie vlasov',    'hands',     'Kratke a kontrolovane potiahnutie vlasov pri korienkoch.', 'partner_to_receiver', false, true, false, true, false, array['Women’s Health hair pulling safety']),
  ('hair_pull_firm',     'pevnejsie tahenie vlasov',    'bdsm',      'Vyraznejsie tahenie vlasov v intenzivnom alebo BDSM mode.', 'partner_to_receiver', false, true, false, true, false, array['Women’s Health hair pulling safety']),
  ('feather_path',       'pierko po kozi',              'sensation', 'Lahka senzoricka stimulacia pierkom alebo makkou latkou.', 'partner_to_receiver', false, true, true, false, false, array['Medical News Today erogenous zones']),
  ('ice_trace',          'kratky chladovy tah',         'sensation', 'Kratky chladovy podnet cez kozu.', 'partner_to_receiver', false, true, true, false, false, array['Healthline hickeys'])
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
    -- Lips / mouth area
    ('lips','kiss_soft','partner_to_receiver','explore',1,2,5,45,'always_ok',false,false,false,array[]::text[],'Jemne bozkavaj pery a po par sekundach zmen tlak.',null,array['Scarleteen kissing and snuggles']),
    ('lips','deep_kiss','mutual','sensual',2,4,10,120,'preference_required',false,false,false,array[]::text[],'Dajte si hlbsi bozk a striedajte, kto vedie tempo.',null,array['Scarleteen kissing and snuggles']),
    ('lips','lip_bite_soft','partner_to_receiver','sensual',2,3,2,15,'preference_required',false,false,false,array[]::text[],'Jemne zachyt spodnu peru zubami a hned povol.',null,array['Scarleteen kissing and snuggles']),
    ('lips','lip_bite_firm','partner_to_receiver','intense',3,4,2,10,'preference_required',true,false,false,array[]::text[],'Pevnejsie zahryzni do pery len na okamih a potom prejdi na bozk.','Zuby na perach len po preferencnom povoleni.',array['Scarleteen kissing and snuggles']),
    ('mouth_corners','kiss_soft','partner_to_receiver','explore',1,2,3,30,'always_ok',false,false,false,array[]::text[],'Bozkavaj kutiky ust kratko a hravo.',null,array['Medical News Today erogenous zones']),
    ('mouth_corners','tongue_flick','partner_to_receiver','sensual',1,3,3,20,'preference_required',false,false,false,array[]::text[],'Kratko prejdi spickou jazyka po kutiku ust.',null,array['Medical News Today erogenous zones']),

    -- Ears
    ('ears','close_whisper','partner_to_receiver','explore',1,3,5,60,'always_ok',false,false,false,array[]::text[],'Sepni pri uchu jednu vetu alebo instrukciu.',null,array['Scarleteen consent basics','Medical News Today erogenous zones']),
    ('ears','warm_breath','partner_to_receiver','sensual',1,3,3,30,'preference_required',false,false,false,array[]::text[],'Dychaj teplo pri uchu a potom sa odtiahni.',null,array['Medical News Today erogenous zones']),
    ('ears','kiss_soft','partner_to_receiver','sensual',1,3,3,45,'preference_required',false,false,false,array[]::text[],'Jemne bozkavaj ucho alebo oblast za nim.',null,array['Medical News Today erogenous zones']),
    ('ears','tongue_flick','partner_to_receiver','sensual',1,3,2,20,'preference_required',false,false,false,array[]::text[],'Pouzi len kratke dotyky jazykom pri uchu.',null,array['Medical News Today erogenous zones']),
    ('earlobes','nibble_soft','partner_to_receiver','sensual',2,3,2,20,'preference_required',false,false,false,array[]::text[],'Jemne zachyt usny lalocik zubami a hned povol.',null,array['Medical News Today erogenous zones']),
    ('earlobes','bite_controlled','partner_to_receiver','intense',3,4,2,10,'preference_required',true,false,false,array[]::text[],'Kontrolovane pevnejsie zahryzni do lalocika len na okamih.','Ucho je citlive; len kratko a po preferencii.',array['Medical News Today erogenous zones']),
    ('behind_ears','kiss_soft','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Bozkavaj oblast za uchom a striedaj dych.',null,array['Medical News Today erogenous zones']),
    ('behind_ears','close_whisper','partner_to_receiver','explore',1,3,5,60,'always_ok',false,false,false,array[]::text[],'Sepkaj tesne za uchom a sleduj reakciu tela.',null,array['Scarleteen consent basics']),

    -- Hair / scalp
    ('hair','hair_play_soft','partner_to_receiver','explore',1,3,15,180,'always_ok',false,false,false,array[]::text[],'Prechadzaj prstami cez vlasy alebo ich pomaly hlad.',null,array['Women’s Health hair pulling safety']),
    ('hair','kiss_soft','partner_to_receiver','explore',1,2,5,45,'always_ok',false,false,false,array[]::text[],'Pobozkaj vlasy alebo oblast pri vlasovej linii.',null,array['Medical News Today erogenous zones']),
    ('hair','hair_pull_light','partner_to_receiver','intense',2,4,2,20,'preference_required',true,false,false,array[]::text[],'Jemne potiahni vlasy pri korienkoch a hned povol.','Netahat za konce ani prudko; tlak ma byt rozlozeny pri korienkoch.',array['Women’s Health hair pulling safety']),
    ('hair','hair_pull_firm','partner_to_receiver','bdsm',3,5,2,20,'mode_required',true,false,true,array[]::text[],'V BDSM mode pevnejsie chyť vlasy pri korienkoch a nastav smer pohybu.','Pevne tahenie vlasov patri len do povoleneho intenzivneho/BDSM rezimu.',array['Women’s Health hair pulling safety']),
    ('scalp','massage_soft','partner_to_receiver','explore',1,3,30,240,'always_ok',false,false,false,array[]::text[],'Masiruj pokozku hlavy pomaly a opakuj prijemny tlak.',null,array['Medical News Today erogenous zones']),
    ('scalp','massage_deep','partner_to_receiver','sensual',2,4,30,180,'preference_required',false,false,false,array[]::text[],'Pouzi pevnejsiu masaz pokozky hlavy a spytaj sa telom na tempo.',null,array['Medical News Today erogenous zones']),

    -- Face and jaw
    ('cheeks','kiss_soft','partner_to_receiver','explore',1,2,5,45,'always_ok',false,false,false,array[]::text[],'Bozkavaj lica pomaly a nechaj pauzy.',null,array['Scarleteen kissing and snuggles']),
    ('cheeks','skin_trace','partner_to_receiver','explore',1,2,10,60,'always_ok',false,false,false,array[]::text[],'Prejdi prstami po licach a sanke.',null,array['Medical News Today erogenous zones']),
    ('jawline','kiss_trail','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Bozkavaj liniu sance smerom ku krku.',null,array['Medical News Today erogenous zones']),
    ('jawline','nibble_soft','partner_to_receiver','sensual',2,3,2,15,'preference_required',false,false,false,array[]::text[],'Jemne zahryzni pri linii sance a vrat sa k bozkom.',null,array['Scarleteen kissing and snuggles']),

    -- Neck / nape. No pressure on throat, no breath restriction.
    ('neck','kiss_trail','partner_to_receiver','sensual',1,3,10,120,'preference_required',false,false,false,array[]::text[],'Bozkavaj bok krku pomaly, od sance ku klucnej kosti.',null,array['Medical News Today erogenous zones']),
    ('neck','suck_skin_light','partner_to_receiver','sensual',2,3,3,30,'preference_required',false,false,false,array[]::text[],'Kratko saj kozu na boku krku bez ciela zanechat stopu.',null,array['Healthline hickeys']),
    ('neck','suck_skin_mark','partner_to_receiver','intense',3,4,5,30,'preference_required',true,false,false,array[]::text[],'Ak je to povolene, vytvor kratku stopu sanim na boku krku.','Moze zanechat viditelnu modrinu; nelosovat bez preferencie.',array['Healthline hickeys']),
    ('neck','tongue_flick','partner_to_receiver','sensual',1,3,3,30,'preference_required',false,false,false,array[]::text[],'Kratko prejdi jazykom po boku krku a potom bozkaj.',null,array['Medical News Today erogenous zones']),
    ('neck','nibble_soft','partner_to_receiver','sensual',2,3,2,15,'preference_required',false,false,false,array[]::text[],'Jemne zahryzni do boku krku a hned povol.','Vyhnut sa prednej casti krku a akemukolvek tlaku na dychanie.',array['Medical News Today erogenous zones']),
    ('nape','warm_breath','partner_to_receiver','explore',1,3,3,45,'always_ok',false,false,false,array[]::text[],'Dychaj teplo na zatylok a potom ho pobozkaj.',null,array['Medical News Today erogenous zones']),
    ('nape','kiss_trail','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Pomaly bozkavaj zatylok a zadnu cast krku.',null,array['Medical News Today erogenous zones']),
    ('nape','hair_pull_light','partner_to_receiver','intense',2,4,2,20,'preference_required',true,false,false,array[]::text[],'Jemne nadvihni vlasy pri zatylku a spoj to s bozkom.',null,array['Women’s Health hair pulling safety']),

    -- Upper torso
    ('collarbones','kiss_trail','partner_to_receiver','sensual',1,3,10,120,'preference_required',false,false,false,array[]::text[],'Bozkavaj klucne kosti a prechadzaj medzi nimi pomaly.',null,array['Medical News Today erogenous zones']),
    ('collarbones','tongue_flick','partner_to_receiver','sensual',1,3,3,30,'preference_required',false,false,false,array[]::text[],'Kratko obkresli klucnu kost jazykom.',null,array['Medical News Today erogenous zones']),
    ('collarbones','ice_trace','partner_to_receiver','toys',1,3,3,20,'preference_required',true,true,false,array['lad'],'Kratko prejdi chladom pri klucnej kosti a potom zahrej bozkom.','Chlad len kratko a mimo neprijemnych reakcii.',array['Healthline hickeys']),
    ('shoulders','massage_soft','partner_to_receiver','explore',1,3,30,300,'always_ok',false,false,false,array[]::text[],'Masiruj ramena pomaly a nechaj prijimatela ukazat tlak.',null,array['Medical News Today erogenous zones']),
    ('shoulders','massage_deep','partner_to_receiver','sensual',2,4,30,240,'preference_required',false,false,false,array[]::text[],'Pevnejsie masiruj ramena a striedaj tlak.',null,array['Medical News Today erogenous zones']),
    ('shoulders','kiss_trail','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Bozkavaj rameno smerom ku krku.',null,array['Medical News Today erogenous zones']),
    ('upper_back','massage_soft','partner_to_receiver','explore',1,3,60,420,'always_ok',false,false,false,array[]::text[],'Masiruj hornu cast chrbta a drz pomale tempo.',null,array['Medical News Today erogenous zones']),
    ('upper_back','massage_deep','partner_to_receiver','sensual',2,4,60,360,'preference_required',false,false,false,array[]::text[],'Pouzi hlbsi tlak na svaly hornej casti chrbta.',null,array['Medical News Today erogenous zones']),
    ('upper_back','nails_light','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Lahko prejdi nechtami po hornej casti chrbta.',null,array['Medical News Today erogenous zones']),
    ('upper_back','nails_firm','partner_to_receiver','intense',3,4,5,45,'preference_required',true,false,false,array[]::text[],'Pevnejsie prejdi nechtami po chrbte a hned zmierni.','Skrabanie len po preferencii.',array['TASHRA BDSM risk awareness']),
    ('spine_line','feather_path','partner_to_receiver','explore',1,2,10,120,'always_ok',false,true,false,array['pierko'],'Prechadzaj pierkom pozdlz chrbtice.',null,array['Medical News Today erogenous zones']),
    ('spine_line','skin_trace','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,array[]::text[],'Pomaly prejdi prstami pozdlz chrbtice.',null,array['Medical News Today erogenous zones']),
    ('lower_back','massage_soft','partner_to_receiver','explore',1,3,30,300,'always_ok',false,false,false,array[]::text[],'Masiruj spodnu cast chrbta a krize.',null,array['Medical News Today erogenous zones']),
    ('lower_back','grip_hold','partner_to_receiver','sensual',2,4,5,60,'preference_required',false,false,false,array[]::text[],'Pevnejsie podrz boky alebo krize a pritiahni telo blizsie.',null,array['Scarleteen consent basics']),
    ('chest','kiss_trail','partner_to_receiver','sensual',1,3,10,120,'preference_required',false,false,false,array[]::text[],'Bozkavaj hrudnik mimo bradaviek a pomaly men miesto.',null,array['Medical News Today erogenous zones']),
    ('chest','skin_trace','partner_to_receiver','explore',1,3,10,120,'always_ok',false,false,false,array[]::text[],'Prechadzaj prstami po hrudniku a sleduj dych prijimatela.',null,array['Medical News Today erogenous zones']),
    ('chest','nails_light','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Lahko prejdi nechtami cez hrudnik mimo bradaviek.',null,array['Medical News Today erogenous zones']),

    -- Hands
    ('inner_wrist','kiss_soft','partner_to_receiver','explore',1,2,5,60,'always_ok',false,false,false,array[]::text[],'Bozkavaj vnutorne zapastie pomaly a kratko.',null,array['Medical News Today erogenous zones']),
    ('inner_wrist','tongue_flick','partner_to_receiver','sensual',1,3,3,30,'preference_required',false,false,false,array[]::text[],'Kratko prejdi jazykom po vnutornom zapasti.',null,array['Medical News Today erogenous zones']),
    ('inner_wrist','warm_breath','partner_to_receiver','explore',1,2,3,30,'always_ok',false,false,false,array[]::text[],'Dychni na vnutorne zapastie a potom ho pobozkaj.',null,array['Medical News Today erogenous zones']),
    ('palms','massage_soft','partner_to_receiver','explore',1,3,30,180,'always_ok',false,false,false,array[]::text[],'Masiruj dlan a prsty pomaly.',null,array['Medical News Today erogenous zones']),
    ('palms','kiss_soft','partner_to_receiver','explore',1,2,5,60,'always_ok',false,false,false,array[]::text[],'Bozkavaj dlan a nechaj prijimatela sledovat tvoj pohyb.',null,array['Medical News Today erogenous zones']),
    ('palms','tongue_flick','partner_to_receiver','sensual',1,3,3,30,'preference_required',false,false,false,array[]::text[],'Kratko pouzi jazyk na dlani a potom prejdi na prsty.',null,array['Medical News Today erogenous zones']),
    ('fingers','kiss_soft','partner_to_receiver','explore',1,2,5,60,'always_ok',false,false,false,array[]::text[],'Bozkavaj jeden prst po druhom.',null,array['Medical News Today erogenous zones']),
    ('fingers','finger_suck','partner_to_receiver','sensual',2,4,5,60,'preference_required',false,false,false,array[]::text[],'Saj jeden prst pomaly a striedaj tlak ust.',null,array['Medical News Today erogenous zones']),
    ('fingers','nibble_soft','partner_to_receiver','sensual',2,3,2,15,'preference_required',false,false,false,array[]::text[],'Jemne zachyt prst zubami a hned povol.',null,array['Scarleteen kissing and snuggles'])
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
