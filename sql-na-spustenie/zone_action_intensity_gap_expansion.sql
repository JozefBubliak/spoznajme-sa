-- =============================================================================
-- DeepTalks - Intimne dobrodruzstvo - zone/action/intensity gap expansion
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 8: second-pass gap analysis. Adds overlooked body zones, missing
-- stimulation families and multidimensional intensity profiles.
-- =============================================================================

create extension if not exists "pgcrypto";
create schema if not exists rel;

create table if not exists rel.intimate_intensity_profiles (
  slug              text primary key,
  label_sk          text not null,
  pressure_level    smallint not null check (pressure_level between 0 and 5),
  speed_level       smallint not null check (speed_level between 0 and 5),
  rhythm_sk         text not null,
  pain_level        smallint not null check (pain_level between 0 and 5),
  dominance_level   smallint not null check (dominance_level between 0 and 5),
  temperature_sk    text not null default 'neutral',
  description_sk    text not null,
  created_at        timestamptz not null default now()
);

insert into rel.intimate_intensity_profiles
  (slug, label_sk, pressure_level, speed_level, rhythm_sk, pain_level, dominance_level, temperature_sk, description_sk)
values
  ('barely_there',       'takmer necitelne',       1, 1, 'pomaly',        0, 0, 'neutral', 'Minimalny tlak, vhodne na testovanie citlivosti.'),
  ('soft_slow',          'jemne a pomaly',         2, 1, 'plynule',       0, 0, 'neutral', 'Makke tempo bez tlaku na vykon.'),
  ('medium_rhythm',      'stredne rytmicky',       3, 3, 'rytmicky',      0, 1, 'neutral', 'Bezna citelna stimulacia so stabilnym rytmom.'),
  ('firm_slow',          'pevne a pomaly',         4, 1, 'pomaly',        1, 1, 'neutral', 'Silnejsi tlak bez rychlosti.'),
  ('fast_light',         'rychlo, ale lahko',      2, 4, 'rychle pulzy',  0, 1, 'neutral', 'Rychlejsie tempo bez hlbokeho tlaku.'),
  ('squeeze_release',    'stlac a povol',          4, 2, 'pulzne',        1, 1, 'neutral', 'Kratke stlacenie a uvolnenie, nie drvenie.'),
  ('sharp_tease',        'ostre drazdenie',        3, 3, 'kratke pulzy',  2, 1, 'neutral', 'Zuby, nechty alebo presny tlak iba po preferencii.'),
  ('warm_slow',          'teplo a pomaly',         2, 1, 'plynule',       0, 0, 'warm',    'Teplo, dych alebo zahriaty dotyk.'),
  ('cool_short',         'chlad kratko',           2, 1, 'kratko',        0, 0, 'cool',    'Kratky chladovy podnet, nie extrem.'),
  ('impact_warmup',      'impact rozohriatie',     3, 2, 'jednotlivo',    2, 2, 'warm',    'Lahky az stredny impact na masite zony.'),
  ('bdsm_strong',        'BDSM silne',             5, 3, 'kontrolovane',  4, 4, 'neutral', 'Vyrazne podnety iba v BDSM rezime.'),
  ('planned_edge',       'planovane pokrocile',    4, 2, 'pomaly',        2, 3, 'neutral', 'Pokrocile veci, ktore nepatria do spontanneho losovania.')
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  pressure_level = excluded.pressure_level,
  speed_level = excluded.speed_level,
  rhythm_sk = excluded.rhythm_sk,
  pain_level = excluded.pain_level,
  dominance_level = excluded.dominance_level,
  temperature_sk = excluded.temperature_sk,
  description_sk = excluded.description_sk;

insert into rel.erogenous_zones
  (slug, target, label_sk, region, sensitivity, is_genital, is_internal, dice_enabled, notes_sk, source_refs)
values
  ('whole_body',          'all',    'cele telo',                         'cele_telo',   2, false, false, true,  'Kontextova zona pre senzoriku, pasku na oci, olej alebo celu mapu tela.', array['PubMed erogenous mirror']),
  ('skin',                'all',    'koza / povrch tela',                'cele_telo',   2, false, false, true,  'Vseobecna zona pre lahky dotyk, nechty, teplo, chlad a materialy.', array['PubMed erogenous mirror']),
  ('forehead',            'all',    'celo',                              'hlava',       1, false, false, true,  'Jemna zona skor na bozk, dotyk alebo starostlivost.', array['PubMed erogenous mirror']),
  ('temples',             'all',    'spanky',                            'hlava',       2, false, false, true,  'Citliva oblast vhodna na masaz a jemny dotyk.', array['PubMed erogenous mirror']),
  ('eyebrows',            'all',    'obocie',                            'hlava',       1, false, false, true,  'Jemna tvarova zona, skor starostlivost a dotyk.', array['PubMed erogenous mirror']),
  ('eyelids',             'all',    'viecka',                            'hlava',       2, false, false, false, 'Velmi jemna zona; nie tlak, nie pomocky.', array['PubMed erogenous mirror']),
  ('nose',                'all',    'nos',                               'hlava',       1, false, false, true,  'Hrave bozky a dotyk, nie tlak.', array['PubMed erogenous mirror']),
  ('philtrum',            'all',    'jamka nad hornou perou',            'hlava',       3, false, false, true,  'Prechod medzi perami a tvarou, vhodny na kratky bozk.', array['PubMed erogenous mirror']),
  ('chin',                'all',    'brada',                             'hlava',       2, false, false, true,  'Dotyk, bozk alebo jemne vedenie tvarou.', array['PubMed erogenous mirror']),
  ('throat_front',        'all',    'predna cast krku / hrdlo',          'krk',         3, false, false, false, 'Citliva a rizikova oblast; bez tlaku a bez skrtenia.', array['TASHRA BDSM risk awareness']),
  ('upper_arms',          'all',    'horne ramena',                      'ruky',        2, false, false, true,  'Vhodne na hladkanie, stlacenie a bozky.', array['PubMed erogenous mirror']),
  ('forearms',            'all',    'predlaktia',                        'ruky',        2, false, false, true,  'Jemny dotyk, nechty, bozky.', array['PubMed erogenous mirror']),
  ('inner_elbows',        'all',    'vnutorna strana lakta',             'ruky',        3, false, false, true,  'Tenka koza, vhodna na jemny dotyk a bozky.', array['PubMed erogenous mirror']),
  ('armpits',             'all',    'podpazusie',                        'trup',        3, false, false, false, 'Velmi individualna zona; casto eroticka alebo ticklish.', array['PubMed erogenous mirror']),
  ('sternum',             'all',    'stred hrudnika / hrudna kost',      'trup',        2, false, false, true,  'Stred hrudnika medzi prsiami alebo prsami.', array['PubMed erogenous mirror']),
  ('ribs',                'all',    'rebra',                             'trup',        2, false, false, true,  'Boky hrudnika, casto citlive na steklenie.', array['PubMed erogenous mirror']),
  ('flanks',              'all',    'boky tela / slabiny na trupe',      'trup',        3, false, false, true,  'Prechod medzi rebrami, pasom a bokmi.', array['PubMed erogenous mirror']),
  ('under_breasts',       'female', 'pod prsiami',                       'trup',        3, false, false, true,  'Spodna linia prs, vhodna na bozky a dotyk.', array['Planned Parenthood female anatomy']),
  ('pubic_mound',         'all',    'lonova oblast nad genitaliami',     'panva',       4, true,  false, false, 'Spolocna oblast nad genitaliami; intimna, ale nie interna.', array['Planned Parenthood anatomy']),
  ('groin_creases',       'all',    'slabinove ryhy',                    'panva',       4, true,  false, false, 'Prechod medzi stehnami a panvou, casto silne erotogenny.', array['PubMed erogenous mirror']),
  ('hip_bones',           'all',    'bedrove kosti',                     'panva',       3, false, false, true,  'Hrany bokov/panvy, vhodne na bozky a uchopenie.', array['PubMed erogenous mirror']),
  ('sacrum',              'all',    'krizova kost',                      'trup',        3, false, false, true,  'Prechod medzi spodnym chrbtom a zadkom.', array['PubMed erogenous mirror']),
  ('tailbone',            'all',    'kostrc',                            'trup',        2, false, false, false, 'Kostnate miesto; bez impactu a tlaku.', array['PubMed erogenous mirror']),
  ('outer_thighs',        'all',    'vonkajsie stehna',                  'nohy',        2, false, false, true,  'Vacsi povrch vhodny na dotyk, masaz a uchop.', array['PubMed erogenous mirror']),
  ('front_thighs',        'all',    'predna strana stehien',             'nohy',        2, false, false, true,  'Menej intimna ako vnutorne stehna, dobra na prechod.', array['PubMed erogenous mirror']),
  ('knees',               'all',    'kolena',                            'nohy',        1, false, false, true,  'Skor jemny dotyk alebo bozk, nie tlak.', array['PubMed erogenous mirror']),
  ('ankles',              'all',    'clenky',                            'nohy',        2, false, false, true,  'Jemny dotyk, bozky, senzorika.', array['PubMed erogenous mirror']),
  ('heels',               'all',    'paty',                              'chodidla',    1, false, false, true,  'Sucaast foot play, skor masaz a tlak.', array['WebMD foot fetish']),
  ('arches',              'all',    'klenba chodidla',                   'chodidla',    3, false, false, true,  'Citliva cast chodidla, masaz alebo jemne skrabkanie.', array['WebMD foot fetish']),
  ('soles',               'all',    'chodidlove plosky',                 'chodidla',    3, false, false, true,  'Citliva plocha chodidla, casto stekliva.', array['WebMD foot fetish']),
  ('corona_glans',        'male',   'okraj zaluda / korunka',            'genitalie',   5, true,  false, false, 'Velmi citliva cast zaluda.', array['PubMed penile erogenous sensation']),
  ('inner_foreskin',      'male',   'vnutorna strana predkozky',         'genitalie',   5, true,  false, false, 'Platne len ak ju muz ma; casto velmi citlive.', array['PubMed penile erogenous sensation']),
  ('shaft_sides',         'male',   'boky penisu',                       'genitalie',   4, true,  false, false, 'Dalsie clenene miesto na tele penisu.', array['PubMed penile erogenous sensation']),
  ('shaft_top',           'male',   'vrch penisu',                       'genitalie',   3, true,  false, false, 'Menej citlive nez uzdicka alebo zalud, ale relevantne.', array['PubMed penile erogenous sensation']),
  ('vaginal_canal',       'female', 'vaginalny kanal',                   'genitalie',   4, true,  true,  false, 'Interna zona; len cez preferencie a planovanie.', array['Planned Parenthood female anatomy']),
  ('cervix',              'female', 'krcok maternice',                   'genitalie',   3, true,  true,  false, 'Pre niektore prijemny, pre mnohe bolestivy; nikdy nahodne.', array['Planned Parenthood female anatomy']),
  ('clitoral_crura',      'female', 'vnutorne ramienka klitorisu',       'genitalie',   4, true,  true,  false, 'Vnutorna cast klitoralneho komplexu; stimulovana nepriamo.', array['Cleveland Clinic clitoris anatomy']),
  ('vestibular_bulbs',    'female', 'vestibularne tkanivo pri vstupe',   'genitalie',   4, true,  true,  false, 'Vnutorne/vonkajsie tkanivo okolo vstupu; skor nepriama stimulacia.', array['Cleveland Clinic clitoris anatomy'])
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
  ('broad_caress',       'siroke hladkanie dlanou',          'hands', 'Siroky dotyk dlanou cez vacsiu plochu tela.', 'partner_to_receiver', false, true, false, false, false, array['PubMed erogenous mirror']),
  ('fingertip_tap',      'jemne poklepkanie prstami',        'hands', 'Lahke rytmicke poklepkanie koncekmi prstov.', 'partner_to_receiver', false, true, false, false, false, array['PubMed erogenous mirror']),
  ('tickle_tease',       'steklenie ako hra',                'hands', 'Kratke steklive drazdenie bez trapenia.', 'partner_to_receiver', false, true, false, false, false, array['PubMed erogenous mirror']),
  ('scratch_light',      'lahke skrabkanie',                 'hands', 'Jemne prejdenie nechtami po kozi.', 'partner_to_receiver', false, true, false, false, false, array['TASHRA BDSM risk awareness']),
  ('scratch_firm',       'pevnejsie skrabanie',              'bdsm', 'Vyraznejsie skrabanie alebo nechty iba po preferencii.', 'partner_to_receiver', false, true, false, true, false, array['TASHRA BDSM risk awareness']),
  ('squeeze_release_skin','stlacenie a povolenie',           'hands', 'Kratke stlacenie makkej oblasti a uvolnenie.', 'partner_to_receiver', false, true, false, false, false, array['PubMed erogenous mirror']),
  ('pin_hold_soft',      'jemne pritlacenie k miestu',       'bdsm', 'Makky kontrolovany hold bez tlaku na krk alebo klby.', 'partner_to_receiver', false, true, false, true, false, array['Kink Checklist BDSM safety']),
  ('body_to_body_rub',   'trenim tela o telo',               'body', 'Stimulacia cez kontakt tela o telo.', 'mutual', false, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('oil_glide',          'olejovy klzavy dotyk',             'hands', 'Klzavy dotyk s olejom alebo masaznym gelom na vonkajsej kozi.', 'partner_to_receiver', false, true, true, false, false, array['Healthline sex toy cleaning']),
  ('fabric_drag',        'tahanie latky po kozi',            'sensation', 'Prechadzanie satkou, hodvabom alebo bavlnou po kozi.', 'partner_to_receiver', false, true, true, false, false, array['PubMed erogenous mirror']),
  ('blindfold_slow_touch','pomaly dotyk so zavretym zrakom', 'sensation', 'Senzoricky dotyk pri paske na oci alebo zatvorenych ociach.', 'partner_to_receiver', false, true, true, true, false, array['Kink Checklist BDSM safety']),
  ('praise_whisper',     'pochvala poseptom',                'voice', 'Pochvala alebo tuzobna veta zblizka.', 'partner_to_receiver', false, false, false, false, false, array['Scarleteen consent basics']),
  ('soft_command',       'jemny pokyn',                      'voice', 'Kratky pokyn v hre vedenia.', 'partner_to_receiver', false, false, false, true, false, array['Kink Checklist BDSM safety']),
  ('rhythm_pulse',       'pulzny rytmus',                    'hands', 'Striedanie tlaku alebo tempa v pravidelnych pulzoch.', 'partner_to_receiver', false, true, false, false, false, array['PubMed erogenous mirror']),
  ('suction_pulse_mouth','pulzne sanie ustami',              'mouth', 'Sanie s kratkymi pauzami, nie stale prisatie.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('flat_tongue_broad',  'siroky tah jazykom',               'mouth', 'Siroke lizanie plochou jazyka na zmysluplnej zone.', 'partner_to_receiver', true, false, false, false, false, array['Scarleteen sexual anatomy']),
  ('warm_oil_touch',     'teply olejovy dotyk',              'sensation', 'Prijemne teply olej alebo zahriaty dotyk na vonkajsej kozi.', 'partner_to_receiver', false, true, true, false, false, array['Healthline sex toy cleaning']),
  ('edging_pause',       'pauza pred vrcholom',              'control', 'Zastavenie alebo spomalenie tesne pred vyvrcholenim.', 'partner_to_receiver', false, true, false, true, false, array['Scarleteen consent basics'])
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
    ('whole_body','all','blindfold_slow_touch','partner_to_receiver','bdsm',1,3,30,240,'mode_required',true,true,false,true,array['paska na oci'],'So zavretym zrakom mapuj cele telo iba rukami alebo latkou.', 'Bez prekvapivej penetracie alebo bolesti.', array['Kink Checklist BDSM safety']),
    ('whole_body','all','body_to_body_rub','mutual','sensual',1,4,30,180,'preference_required',true,false,false,false,array[]::text[],'Pouzite trenie tela o telo a mente tlak podla reakcie.', null, array['Scarleteen sexual anatomy']),
    ('skin','all','fabric_drag','partner_to_receiver','explore',1,2,20,120,'always_ok',false,true,false,false,array['satka','latka'],'Prechadzaj latkou po kozi a sleduj, kde je to prijemne.', null, array['PubMed erogenous mirror']),
    ('skin','all','scratch_light','partner_to_receiver','sensual',1,3,10,90,'preference_required',false,false,false,false,array[]::text[],'Prejdi nechtami po kozi velmi lahko a pomaly.', null, array['TASHRA BDSM risk awareness']),
    ('skin','all','scratch_firm','partner_to_receiver','bdsm',3,5,3,30,'mode_required',true,false,false,true,array[]::text[],'Pevnejsie prejdi nechtami iba v BDSM rezime.', 'Nie cez znamienka, poranenia ani zapalenu kozu.', array['TASHRA BDSM risk awareness']),

    ('forehead','all','kiss_soft','partner_to_receiver','explore',1,2,3,20,'always_ok',false,false,false,false,array[]::text[],'Pobozkaj celo kratko a pomaly.', null, array['PubMed erogenous mirror']),
    ('temples','all','massage_soft','partner_to_receiver','explore',1,2,20,90,'always_ok',false,false,false,false,array[]::text[],'Masiruj spanky malymi kruhmi.', 'Bez tlaku, ak je bolest hlavy alebo citlivost.', array['PubMed erogenous mirror']),
    ('eyebrows','all','skin_trace','partner_to_receiver','explore',1,2,5,30,'always_ok',false,false,false,false,array[]::text[],'Prstom prejdi po oboci a okolo oci.', 'Nie priamo do oka.', array['PubMed erogenous mirror']),
    ('eyelids','all','kiss_soft','partner_to_receiver','explore',1,1,2,10,'preference_required',false,false,false,false,array[]::text[],'Daj velmi jemny bozk na zatvorene viecko.', 'Len uplne jemne, bez tlaku a bez pomocky.', array['PubMed erogenous mirror']),
    ('nose','all','kiss_soft','partner_to_receiver','explore',1,2,2,15,'always_ok',false,false,false,false,array[]::text[],'Daj hravy bozk na nos alebo jeho bok.', null, array['PubMed erogenous mirror']),
    ('philtrum','all','kiss_soft','partner_to_receiver','sensual',1,2,2,20,'preference_required',false,false,false,false,array[]::text[],'Pobozkaj jamku nad hornou perou a vrat sa k peram.', null, array['PubMed erogenous mirror']),
    ('chin','all','grip_hold','partner_to_receiver','sensual',1,3,2,20,'preference_required',false,false,false,false,array[]::text[],'Jemne podrz bradu a naved tvar k bozku.', 'Bez tlaku na sanku.', array['PubMed erogenous mirror']),
    ('throat_front','all','kiss_soft','partner_to_receiver','sensual',1,2,2,15,'preference_required',true,false,false,false,array[]::text[],'Ak je to prijemne, daj velmi jemny bozk na prednu cast krku bez tlaku.', 'Nikdy nestlacat hrdlo ani neskrtit.', array['TASHRA BDSM risk awareness']),

    ('upper_arms','all','broad_caress','partner_to_receiver','sensual',1,3,10,90,'always_ok',false,false,false,false,array[]::text[],'Hlad horne rameno sirokou dlanou.', null, array['PubMed erogenous mirror']),
    ('forearms','all','scratch_light','partner_to_receiver','sensual',1,3,10,60,'preference_required',false,false,false,false,array[]::text[],'Prejdi nechtami po predlakti od zapastia k laktu.', null, array['PubMed erogenous mirror']),
    ('inner_elbows','all','kiss_soft','partner_to_receiver','sensual',1,2,3,30,'preference_required',false,false,false,false,array[]::text[],'Pobozkaj vnutornu stranu lakta a kratko pockaj.', 'Tenka koza, bez hryzenia.', array['PubMed erogenous mirror']),
    ('armpits','all','tickle_tease','partner_to_receiver','explore',1,2,3,20,'preference_required',false,false,false,false,array[]::text[],'Kratko otestuj steklenie v podpazusi iba ako hru.', 'Ak je to neprijemne alebo trapne, preskocit.', array['PubMed erogenous mirror']),
    ('sternum','all','kiss_trail','partner_to_receiver','sensual',1,3,10,60,'preference_required',false,false,false,false,array[]::text[],'Urob sled bozkov stredom hrudnika.', null, array['PubMed erogenous mirror']),
    ('ribs','all','fingertip_tap','partner_to_receiver','explore',1,2,5,45,'preference_required',false,false,false,false,array[]::text[],'Poklep prstami cez rebra velmi lahko.', 'Casto steklive, netrapit.', array['PubMed erogenous mirror']),
    ('flanks','all','squeeze_release_skin','partner_to_receiver','sensual',2,4,5,45,'preference_required',false,false,false,false,array[]::text[],'Stlac bok tela a pomaly povol.', null, array['PubMed erogenous mirror']),
    ('under_breasts','female','kiss_trail','partner_to_receiver','sensual',1,3,10,60,'preference_required',true,false,false,false,array[]::text[],'Bozkavaj spodnu liniu prs a vyhni sa priamemu tlaku na bradavky.', null, array['Planned Parenthood female anatomy']),

    ('pubic_mound','all','broad_caress','partner_to_receiver','sensual',1,3,10,60,'preference_required',true,false,false,false,array[]::text[],'Hlad lonovu oblast nad genitaliami cez alebo bez latky podla preferencie.', 'Intimna zona, nie automaticky vyzva na genitalny dotyk.', array['Planned Parenthood anatomy']),
    ('groin_creases','all','kiss_trail','partner_to_receiver','sensual',1,3,5,60,'preference_required',true,false,false,false,array[]::text[],'Bozkavaj slabinovu ryhu medzi stehnom a panvou.', 'Zostat na ryhe, nepreskakovat automaticky na genitalie.', array['PubMed erogenous mirror']),
    ('groin_creases','all','flat_tongue_broad','partner_to_receiver','intense',2,4,3,45,'preference_required',true,false,false,false,array[]::text[],'Pouzi kratky siroky tah jazykom po slabinovej ryhe.', 'Len ak oralne aktivity pri slabinach patria medzi preferencie.', array['Scarleteen sexual anatomy']),
    ('hip_bones','all','grip_hold','partner_to_receiver','sensual',2,4,5,45,'preference_required',false,false,false,false,array[]::text[],'Uchop boky pri bedrovych kostiach a pritiahni partnera blizsie.', null, array['PubMed erogenous mirror']),
    ('sacrum','all','massage_soft','partner_to_receiver','sensual',1,3,20,120,'preference_required',false,false,false,false,array[]::text[],'Masiruj krizovu kost a prechod k zadku.', null, array['PubMed erogenous mirror']),
    ('tailbone','all','skin_trace','partner_to_receiver','explore',1,2,5,30,'preference_required',false,false,false,false,array[]::text[],'Len jemne prejdi prstom okolo kostrce, bez tlaku.', 'Kostnate miesto, ziadny impact.', array['PubMed erogenous mirror']),

    ('outer_thighs','all','squeeze_release_skin','partner_to_receiver','sensual',2,4,5,60,'preference_required',false,false,false,false,array[]::text[],'Stlac vonkajsie stehno a pomaly povol.', null, array['PubMed erogenous mirror']),
    ('front_thighs','all','broad_caress','partner_to_receiver','explore',1,3,10,90,'always_ok',false,false,false,false,array[]::text[],'Hlad prednu stranu stehien ako prechod k vnutornym stehnam.', null, array['PubMed erogenous mirror']),
    ('knees','all','kiss_soft','partner_to_receiver','explore',1,2,2,20,'always_ok',false,false,false,false,array[]::text[],'Pobozkaj koleno alebo jeho okolie.', 'Bez tlaku na klb.', array['PubMed erogenous mirror']),
    ('ankles','all','kiss_trail','partner_to_receiver','sensual',1,2,5,45,'preference_required',false,false,false,false,array[]::text[],'Bozkavaj clenok a prejdi k chodidlu alebo lytku.', null, array['PubMed erogenous mirror']),
    ('heels','all','massage_soft','partner_to_receiver','explore',1,3,20,120,'preference_required',false,false,false,false,array[]::text[],'Masiruj patu pomalym tlakom.', null, array['WebMD foot fetish']),
    ('arches','all','massage_deep','partner_to_receiver','sensual',2,4,20,120,'preference_required',false,false,false,false,array[]::text[],'Masiruj klenbu chodidla palcom alebo dlanou.', null, array['WebMD foot fetish']),
    ('soles','all','tickle_tease','partner_to_receiver','explore',1,2,3,20,'preference_required',false,false,false,false,array[]::text[],'Kratko otestuj steklivy dotyk na ploske chodidla.', 'Ak je steklenie neprijemne, preskocit.', array['WebMD foot fetish']),

    ('corona_glans','male','glans_tongue_circle','partner_to_receiver','sensual',1,4,3,45,'preference_required',true,false,false,false,array[]::text[],'Kruz jazykom okolo korunky zaluda a drz kratke intervaly.', 'Velmi citlive miesto.', array['PubMed penile erogenous sensation']),
    ('inner_foreskin','male','foreskin_slide','partner_to_receiver','sensual',1,3,5,45,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Jemne pracuj s vnutornou stranou predkozky, ak ju prijimatel ma.', 'Nepouzivat pri bolesti, napati alebo precitlivosti.', array['PubMed penile erogenous sensation']),
    ('shaft_sides','male','penis_lube_stroke','partner_to_receiver','sensual',2,4,10,120,'preference_required',true,false,true,false,array['lubrikant'],'Hlad boky penisu s lubrikantom alebo bez neho podla preferencie.', null, array['PubMed penile erogenous sensation']),
    ('shaft_top','male','penis_hand_stroke_slow','partner_to_receiver','sensual',1,3,10,90,'preference_required',true,false,false,false,array[]::text[],'Hlad vrchnu stranu penisu pomalym pohybom.', null, array['PubMed penile erogenous sensation']),

    ('vaginal_canal','female','vaginal_finger_one','partner_to_receiver','planned_edge',1,3,10,120,'planned_only',true,false,true,true,array['lubrikant'],'Vaginalny kanal stimuluj prstom iba ako planovany krok s lubrikantom.', 'Nie cez bolest, suchost alebo napatie.', array['Planned Parenthood female anatomy']),
    ('cervix','female','vaginal_penetration_deep','partner_to_receiver','planned_edge',1,3,3,45,'planned_only',true,false,true,true,array['lubrikant'],'Ak je krcok maternice prijemna tema, pracujte iba velmi pomaly a planovane.', 'Pre mnohe zeny je dotyk krcka bolestivy; nikdy nahodne.', array['Planned Parenthood female anatomy']),
    ('clitoral_crura','female','vulva_outer_stroke','partner_to_receiver','sensual',1,3,10,90,'preference_required',true,false,false,false,array[]::text[],'Stimuluj vnutorne ramienka klitorisu nepriamo cez okolie vulvy a pyskov.', 'Nejde o priamy bod, skor nepriama stimulacia.', array['Cleveland Clinic clitoris anatomy']),
    ('vestibular_bulbs','female','labia_stroke','partner_to_receiver','sensual',1,3,5,60,'preference_required',true,false,true,false,array['lubrikant volitelne'],'Jemne stimuluj tkanivo okolo vstupu cez pysky a okolie.', 'Citlive miesto, bez tlaku.', array['Cleveland Clinic clitoris anatomy'])
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

grant select on rel.intimate_intensity_profiles to anon, authenticated;
