
-- =====================================================================
-- Source: .\supabase\migrations\20260529_000_erogenous_zones_dice_rules.sql
-- =====================================================================

-- =============================================================================
-- DeepTalks · Intimne dobrodruzstvo — erogenous zones and dice rules
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
-- Purpose: reference data for rule-based erotic dice combinations.
-- =============================================================================

create extension if not exists "pgcrypto";
create schema if not exists rel;

do $$ begin
  create type rel.intimate_body_target as enum ('all','female','male');
exception when duplicate_object then null; end $$;

create table if not exists rel.intimate_activity_types (
  slug                  text primary key,
  label_sk              text not null,
  category              text not null,
  default_min_seconds   integer not null check (default_min_seconds >= 0),
  default_max_seconds   integer not null check (default_max_seconds >= default_min_seconds),
  default_intensities   text[] not null default '{}',
  notes_sk              text,
  created_at            timestamptz not null default now()
);

create table if not exists rel.erogenous_zones (
  slug              text primary key,
  target            rel.intimate_body_target not null,
  label_sk          text not null,
  region            text not null,
  sensitivity       smallint not null check (sensitivity between 1 and 5),
  is_genital        boolean not null default false,
  is_internal       boolean not null default false,
  dice_enabled      boolean not null default true,
  notes_sk          text,
  source_refs       text[] not null default '{}',
  created_at        timestamptz not null default now()
);

create table if not exists rel.erogenous_zone_activity_rules (
  zone_slug             text not null references rel.erogenous_zones(slug) on delete cascade,
  activity_slug         text not null references rel.intimate_activity_types(slug) on delete cascade,
  compatibility_score   smallint not null default 100 check (compatibility_score between 1 and 100),
  min_duration_seconds  integer not null check (min_duration_seconds >= 0),
  max_duration_seconds  integer not null check (max_duration_seconds >= min_duration_seconds),
  allowed_intensities   text[] not null default '{}',
  safety_note_sk        text,
  prompt_hint_sk        text,
  created_at            timestamptz not null default now(),
  primary key (zone_slug, activity_slug)
);

create index if not exists erogenous_zones_target_region_idx
  on rel.erogenous_zones (target, region);

create index if not exists erogenous_zone_rules_activity_idx
  on rel.erogenous_zone_activity_rules (activity_slug);

insert into rel.intimate_activity_types
  (slug, label_sk, category, default_min_seconds, default_max_seconds, default_intensities, notes_sk)
values
  ('touch_light',     'jemne sa dotykaj',       'dotyk',       10, 120, array['ultra jemne','jemne','pomaly'], 'Najbezpecnejsia zakladna aktivita pre vacsinu zon.'),
  ('stroke',          'hlad',                   'dotyk',       15, 180, array['jemne','pomaly','striedavo'], 'Plynuly dotyk rukou alebo prstami.'),
  ('kiss',            'bozkavaj',               'bozk',        10, 180, array['jemne','pomaly','vasnivo'], 'Bozky mozu fungovat na mnohych erotogennych zonach.'),
  ('lick',            'liz / pouzi jazyk',      'lizanie',      5,  90, array['jemne','pomaly','kratko','striedavo'], 'Len na zony, kde to dava zmysel; nie na vlasy alebo velke plochy tela.'),
  ('massage',         'masiruj',                'masaz',       60, 420, array['jemne','pomaly','hlbsie','striedavo'], 'Dlhsie trvanie patri hlavne k svalovym a vacsim plocham.'),
  ('breathe',         'dychaj na miesto',       'dych',         5,  60, array['jemne','teplo','pomaly'], 'Kratka zmyslova aktivita, najma pri usiach, krku a vnutornych stehnach.'),
  ('whisper',         'sepni pri mieste',       'hlas',         5,  60, array['jemne','hravo','pomaly'], 'Hlasova aktivita pri uchu, krku alebo vlasoch.'),
  ('feather',         'prechadzaj pierkom',     'senzorika',   10, 120, array['ultra jemne','jemne','pomaly'], 'Vhodne na citlive aj ne-genitalne zony.'),
  ('temperature',     'striedaj teplo/chlad',   'senzorika',    5,  60, array['jemne','kratko','pomaly'], 'Len jemne a kratko, vyhnut sa extremom.'),
  ('squeeze_light',   'jemne stlac',            'tlak',         5,  45, array['jemne','kratko','striedavo'], 'Len na zony, kde je tlak prirodzene prijemny.'),
  ('nibble_soft',     'jemne zahryzni',         'bozk',         3,  30, array['jemne','kratko','hravo'], 'Len jemne, skor ako hrava variacia bozku.'),
  ('hair_play',       'hraj sa s vlasmi',       'dotyk',       15, 180, array['jemne','pomaly','nežne'], 'Specificka aktivita pre vlasy a pokozku hlavy.'),
  ('vibration',       'pouzi vibraciu',         'pomocka',      5, 120, array['nizka intenzita','striedavo','kratko'], 'Len na zony, kde par pomocku vyslovene chce.')
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  category = excluded.category,
  default_min_seconds = excluded.default_min_seconds,
  default_max_seconds = excluded.default_max_seconds,
  default_intensities = excluded.default_intensities,
  notes_sk = excluded.notes_sk;

insert into rel.erogenous_zones
  (slug, target, label_sk, region, sensitivity, is_genital, is_internal, dice_enabled, notes_sk, source_refs)
values
  ('lips',                 'all',    'pery',                         'hlava',           4, false, false, true, 'Casta erotogenna zona vhodna na bozky, dotyk a jazyk.', array['Medical News Today: erogenous zones']),
  ('mouth_corners',        'all',    'kutiky ust',                    'hlava',           3, false, false, true, 'Jemna variacia pier; vhodne skor na kratke dotyky a bozky.', array['Medical News Today: erogenous zones']),
  ('ears',                 'all',    'usi',                           'hlava',           4, false, false, true, 'Vhodne na sepot, dych, jemne bozky a kratke lizanie.', array['Medical News Today: erogenous zones','MedicineNet: ears']),
  ('earlobes',             'all',    'usne lalociky',                 'hlava',           4, false, false, true, 'Casto citlive na bozky, dych a jemne zahryznutie.', array['MedicineNet: ears']),
  ('behind_ears',          'all',    'oblast za uchom',               'hlava',           3, false, false, true, 'Dobre miesto pre dych, bozky a sepot.', array['Medical News Today: erogenous zones']),
  ('hair',                 'all',    'vlasy',                         'hlava',           2, false, false, true, 'Nie je vhodne na lizanie; patri k hladeniu, bozku a hre s vlasmi.', array['Topography of Human Erogenous Zones']),
  ('scalp',                'all',    'pokozka hlavy',                 'hlava',           3, false, false, true, 'Vhodna na masaz, hladenie a hru s vlasmi.', array['Topography of Human Erogenous Zones']),
  ('cheeks',               'all',    'lica',                          'hlava',           2, false, false, true, 'Jemna ne-genitalna zona pre bozky a dotyk.', array['Topography of Human Erogenous Zones']),
  ('jawline',              'all',    'celust a linia sance',          'hlava',           3, false, false, true, 'Vhodne na pomale bozky a dotyk.', array['Topography of Human Erogenous Zones']),
  ('neck',                 'all',    'krk',                           'krk',             5, false, false, true, 'Jedna z najcastejsie uvadzanych ne-genitalnych erotogennych zon.', array['Medical News Today: neck','PubMed 27091187']),
  ('nape',                 'all',    'zatylok / sija',                'krk',             4, false, false, true, 'Vhodne na bozky, dych, pierko a jemny dotyk.', array['Topography of Human Erogenous Zones']),
  ('collarbones',          'all',    'klucne kosti',                  'hrudnik',         3, false, false, true, 'Prechod medzi krkom a hrudnikom, dobry na bozky a dotyk.', array['Topography of Human Erogenous Zones']),
  ('shoulders',            'all',    'ramena',                        'trup',            2, false, false, true, 'Vhodne najma na masaz, dotyk a bozky.', array['Topography of Human Erogenous Zones']),
  ('upper_back',           'all',    'horna cast chrbta',             'trup',            2, false, false, true, 'Vacsia plocha vhodna na masaz a dotyk.', array['Medical News Today: back']),
  ('spine_line',           'all',    'linia chrbtice',                'trup',            3, false, false, true, 'Vhodne na pierko, jemny dotyk a bozky.', array['Medical News Today: back']),
  ('lower_back',           'all',    'krize / spodna cast chrbta',    'trup',            3, false, false, true, 'Casto vnimana ako intimnejsia cast chrbta.', array['Medical News Today: back']),
  ('chest',                'all',    'hrudnik',                       'hrudnik',         3, false, false, true, 'Spolocna zona pre dotyk, bozky a masaz.', array['PubMed 27091187']),
  ('nipples',              'all',    'bradavky',                      'hrudnik',         5, false, false, true, 'Citlivost je velmi individualna; vyzaduje jemne davkovanie.', array['Medical News Today: nipples','MedicineNet: nipples']),
  ('areola',               'all',    'dvorce okolo bradaviek',        'hrudnik',         4, false, false, true, 'Casto citlive okolie bradaviek.', array['MedicineNet: nipples']),
  ('inner_wrist',          'all',    'vnutorna strana zapastia',      'ruky',            3, false, false, true, 'Jemna zona vhodna na bozky, jazyk a dotyk.', array['Topography of Human Erogenous Zones']),
  ('palms',                'all',    'dlane',                         'ruky',            3, false, false, true, 'Citlive na dotyk, bozky a jemnu masaz.', array['Medical News Today: hands','MedicineNet: palms']),
  ('fingers',              'all',    'prsty na rukach',               'ruky',            3, false, false, true, 'Vhodne na bozky, jemne lizanie a dotyk.', array['Medical News Today: fingers','MedicineNet: fingertips']),
  ('waist',                'all',    'pas',                           'trup',            3, false, false, true, 'Prechodova zona vhodna na dotyk a bozky.', array['Topography of Human Erogenous Zones']),
  ('hips',                 'all',    'boky',                          'trup',            3, false, false, true, 'Vhodne na dotyk, drzanie a bozky.', array['Topography of Human Erogenous Zones']),
  ('belly',                'all',    'brucho',                        'trup',            3, false, false, true, 'Vhodne na jemne dotyky, bozky a senzoriku.', array['Topography of Human Erogenous Zones']),
  ('lower_belly',          'all',    'podbrusko',                     'trup',            4, false, false, true, 'Intimnejsia ne-genitalna zona blizko panvy.', array['Topography of Human Erogenous Zones']),
  ('navel',                'all',    'pupok a okolie',                'trup',            2, false, false, true, 'Len ak je partnerovi prijemny; casto skor hrava zona.', array['Topography of Human Erogenous Zones']),
  ('buttocks',             'all',    'zadok',                         'panva',           4, false, false, true, 'Casta erotogenna zona vhodna na dotyk, masaz a bozky.', array['Medical News Today: buttocks']),
  ('gluteal_fold',         'all',    'oblast medzi zadkom a stehnom', 'panva',           4, false, false, true, 'Citliva prechodova zona.', array['Topography of Human Erogenous Zones']),
  ('inner_thighs',         'all',    'vnutorne stehna',               'nohy',            5, false, false, true, 'Casta erotogenna zona blizko genitalii.', array['Medical News Today: inner thigh','MedicineNet: inner thighs']),
  ('back_of_knees',        'all',    'zadna strana kolien',           'nohy',            2, false, false, true, 'Individualne citliva alebo stekliva zona.', array['Topography of Human Erogenous Zones']),
  ('calves',               'all',    'lytka',                         'nohy',            1, false, false, true, 'Skor relaxacna/masazna zona.', array['Topography of Human Erogenous Zones']),
  ('feet',                 'all',    'chodidla',                      'nohy',            2, false, false, true, 'U niekoho erotogenna, u inych neutralna alebo stekliva.', array['Medical News Today: feet','MedicineNet: feet']),
  ('toes',                 'all',    'prsty na nohach',               'nohy',            2, false, false, true, 'Pouzivat len pri paroch, ktore tuto zónu chcu.', array['Medical News Today: toes']),

  ('breasts',              'female', 'prsia',                         'hrudnik',         5, false, false, true, 'Pre zeny casto velmi vyznamna zona, ale aj casto citliva/aversivna; zacat jemne.', array['PubMed 27091187','Journal of Sexual Medicine breast mapping']),
  ('vulva',                'female', 'vulva ako celok',               'genitalie',       5, true,  false, true, 'Externy genitalny celok; len v jasne intimnom mode.', array['Cleveland Clinic: vulva erogenous zone','Medical News Today: vulva']),
  ('clitoris',             'female', 'klitoris',                      'genitalie',       5, true,  false, true, 'Najcitlivejsia cast vulvy pre mnohe zeny; velmi jemne a individualne.', array['Cleveland Clinic: clitoris']),
  ('clitoral_hood',        'female', 'klitoralna kapucna',            'genitalie',       5, true,  false, true, 'Nepriamejsia stimulacia klitorisu moze byt prijemnejsia nez priamy tlak.', array['Cleveland Clinic: clitoral hood']),
  ('labia_outer',          'female', 'velke pysky',                   'genitalie',       4, true,  false, true, 'Vhodne na jemny dotyk, bozky a jazyk.', array['Medical News Today: vulva']),
  ('labia_inner',          'female', 'male pysky',                    'genitalie',       5, true,  false, true, 'Velmi citliva oblast; kratko a jemne.', array['Medical News Today: vulva']),
  ('vaginal_opening',      'female', 'vchod do vaginy',               'genitalie',       5, true,  false, true, 'Citliva externa/prechodova oblast.', array['Medical News Today: vaginal opening']),
  ('periurethral_area',    'female', 'oblast okolo mocovej rury',     'genitalie',       4, true,  false, true, 'Citliva oblast uvadzana vo vyskumoch vulvy.', array['Medical News Today: periurethra']),
  ('vagina_front_wall',    'female', 'predna stena vaginy',           'genitalie',       4, true,  true,  false, 'Interna zona; nie je vhodna pre bezne kocky bez specialneho modu.', array['Medical News Today: genital zones']),
  ('g_spot_area',          'female', 'G-zona',                        'genitalie',       4, true,  true,  false, 'Interna/preferencna zona; nech je mimo zakladnych kociek.', array['Medical News Today: G-spot related coverage']),
  ('a_spot_area',          'female', 'A-spot oblast',                 'genitalie',       3, true,  true,  false, 'Interna/preferencna zona; nech je mimo zakladnych kociek.', array['MedicineNet: A-spot']),
  ('female_perineum',      'female', 'hradza / perineum',             'panva',           4, true,  false, true, 'U niekoho prijemna, u inych aversivna; drzat ako pokrocilejsiu volbu.', array['Medical News Today: perineum']),
  ('female_anal_area',     'female', 'analna oblast',                 'panva',           4, true,  false, false, 'Pokrocila a casto aversivna zona; nevkladat do zakladnych kociek.', array['PubMed 27091187']),

  ('penis',                'male',   'penis',                         'genitalie',       5, true,  false, true, 'Muzska genitalna zona ako celok.', array['Medical News Today: male genital zones']),
  ('glans',                'male',   'zalud',                         'genitalie',       5, true,  false, true, 'Velmi citliva oblast; jemne a individualne.', array['Medical News Today: male genital zones']),
  ('frenulum',             'male',   'uzdicka / frenulum',            'genitalie',       5, true,  false, true, 'Casto velmi citliva oblast na spodnej strane zaluda.', array['Medical News Today: frenulum']),
  ('foreskin',             'male',   'predkozka',                     'genitalie',       4, true,  false, true, 'Platne len ak ju muz ma; citlivost je individualna.', array['Medical News Today: male genital zones']),
  ('shaft_underside',      'male',   'spodna strana penisu',          'genitalie',       4, true,  false, true, 'Citliva cast vhodna na jemny dotyk.', array['Medical News Today: male genital zones']),
  ('penis_base',           'male',   'koren penisu',                  'genitalie',       3, true,  false, true, 'Menej citliva ako zalud/frenulum, vhodna na dotyk.', array['Medical News Today: male genital zones']),
  ('scrotum',              'male',   'miesok',                        'genitalie',       4, true,  false, true, 'Citliva oblast; vyhybat sa silnemu tlaku.', array['Medical News Today: scrotum']),
  ('testicles',            'male',   'semenniky',                     'genitalie',       4, true,  false, true, 'Velmi individualna zona, len jemne.', array['Medical News Today: scrotum']),
  ('male_perineum',        'male',   'hradza / perineum',             'panva',           4, true,  false, true, 'Oblast medzi mieskom a anusom.', array['Medical News Today: perineum']),
  ('prostate',             'male',   'prostata',                      'panva',           5, true,  true,  false, 'Interna pokrocila zona; nevkladat do zakladnych kociek.', array['Medical News Today: prostate']),
  ('male_anal_area',       'male',   'analna oblast',                 'panva',           4, true,  false, false, 'Pokrocila a casto aversivna zona; nevkladat do zakladnych kociek.', array['PubMed 27091187'])
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

with seed(zone_slug, activity_slugs, min_s, max_s, intensities, safety_note, hint) as (
  values
    ('lips',            array['kiss','lick','touch_light','nibble_soft'], 5, 120, array['jemne','pomaly','vasnivo'], null, 'Pery nech ostanu kratke az stredne; podla reakcie pridaj intenzitu.'),
    ('mouth_corners',   array['kiss','touch_light','lick'],               5,  45, array['jemne','kratko','pomaly'], null, 'Skor ako drobna variacia bozku.'),
    ('ears',            array['kiss','breathe','whisper','lick','nibble_soft','touch_light'], 3, 60, array['jemne','kratko','pomaly'], 'Ucho je citlive; vyhni sa silnemu zvuku a tlaku.', 'Dych a sepot su casto lepsie nez dlhe lizanie.'),
    ('earlobes',        array['kiss','breathe','lick','nibble_soft','touch_light'], 3, 45, array['jemne','kratko','hravo'], null, 'Kratke hrave stimuly.'),
    ('behind_ears',     array['kiss','breathe','whisper','touch_light'],  5,  60, array['jemne','pomaly'], null, 'Dobre pre tichy sepot a dych.'),
    ('hair',            array['stroke','hair_play','kiss','touch_light'],15, 180, array['jemne','pomaly','nežne'], 'Nelizat vlasy.', 'Hlad vlasy, pobozkaj ich alebo zaplet prsty do vlasov.'),
    ('scalp',           array['massage','stroke','hair_play'],           30, 240, array['jemne','pomaly','striedavo'], null, 'Skor relaxacna masaz a pomale hladenie.'),
    ('cheeks',          array['kiss','touch_light','stroke'],             5,  60, array['jemne','pomaly'], null, 'Jemna romanticka zona.'),
    ('jawline',         array['kiss','touch_light','stroke'],             5,  90, array['jemne','pomaly','vasnivo'], null, 'Pomaly prechadzaj od sance ku krku.'),
    ('neck',            array['kiss','lick','breathe','touch_light','feather','nibble_soft','temperature'], 5, 120, array['jemne','pomaly','vasnivo','kratko'], 'Vyhnut sa tlaku na prednu cast krku.', 'Bozkavaj, dychaj alebo jemne obkresluj krk.'),
    ('nape',            array['kiss','breathe','touch_light','feather','temperature'], 5, 120, array['jemne','pomaly'], null, 'Zatylok dobre funguje s dychom a pomalym dotykom.'),
    ('collarbones',     array['kiss','lick','touch_light','feather'],    10, 120, array['jemne','pomaly'], null, 'Obkresli klucne kosti bozkom alebo prstami.'),
    ('shoulders',       array['massage','kiss','touch_light','stroke'],  30, 300, array['jemne','pomaly','hlbsie'], null, 'Ramena su vhodne na dlhsie masazne hody.'),
    ('upper_back',      array['massage','kiss','touch_light','stroke','feather'], 30, 420, array['jemne','pomaly','hlbsie'], null, 'Vacsia plocha znesie dlhsie trvanie.'),
    ('spine_line',      array['touch_light','kiss','feather','temperature'], 5, 120, array['ultra jemne','jemne','pomaly'], null, 'Jemne prechadzaj pozdlz chrbtice.'),
    ('lower_back',      array['massage','kiss','touch_light','stroke'],  20, 300, array['jemne','pomaly','striedavo'], null, 'Prechod k bokom moze zvysit napatie.'),
    ('chest',           array['kiss','touch_light','stroke','massage','feather'], 15, 240, array['jemne','pomaly','vasnivo'], null, 'Hrudnik moze byt romanticky aj zmyselny.'),
    ('nipples',         array['touch_light','kiss','lick','breathe','feather','temperature','squeeze_light','vibration'], 3, 60, array['ultra jemne','jemne','kratko','striedavo'], 'Bradavky mozu byt prijemne aj neprijemne; zacat velmi jemne.', 'Kratko a s jemnou intenzitou.'),
    ('areola',          array['touch_light','kiss','lick','feather','temperature'], 3, 60, array['ultra jemne','jemne','kratko'], 'Okolie bradaviek je citlive; vyhybat sa hrubemu tlaku.', 'Obkresli dvorec, nie priamo bradavku.'),
    ('inner_wrist',     array['kiss','lick','touch_light','feather','breathe'], 5, 90, array['jemne','pomaly','kratko'], null, 'Vnutorne zapastie je dobre na jemny zaciatok.'),
    ('palms',           array['kiss','lick','touch_light','massage','feather'], 10, 180, array['jemne','pomaly','hravo'], null, 'Dlane dobre funguju s ocnym kontaktom.'),
    ('fingers',         array['kiss','lick','touch_light','stroke'],      5, 120, array['jemne','pomaly','kratko'], null, 'Jeden prst po druhom, nie prilis dlho.'),
    ('waist',           array['kiss','touch_light','stroke','squeeze_light'], 10, 120, array['jemne','pomaly','striedavo'], null, 'Pas je vhodny na drzanie a pomaly dotyk.'),
    ('hips',            array['kiss','touch_light','stroke','squeeze_light'], 10, 120, array['jemne','pomaly','striedavo'], null, 'Boky mozu viest k panve, ale netlacit.'),
    ('belly',           array['kiss','lick','touch_light','feather','temperature'], 5, 120, array['jemne','pomaly','kratko'], null, 'Brucho moze byt citlive na steklenie; sledovat reakciu.'),
    ('lower_belly',     array['kiss','breathe','touch_light','feather','temperature'], 5, 90, array['jemne','pomaly','kratko'], null, 'Buduje napatie blizko panvy.'),
    ('navel',           array['kiss','touch_light','feather'],            5, 45, array['jemne','kratko','hravo'], 'U niekoho je pupok neprijemny.', 'Pouzit len kratko a hravo.'),
    ('buttocks',        array['massage','kiss','touch_light','stroke','squeeze_light'], 10, 240, array['jemne','pomaly','striedavo'], 'Tlak len jemne, ak je to prijemne.', 'Zadok znesie masaz, ale intenzitu nech urci reakcia.'),
    ('gluteal_fold',    array['kiss','touch_light','feather','breathe'],  5,  90, array['jemne','pomaly','kratko'], null, 'Prechodova zona; skor jemne a kratko.'),
    ('inner_thighs',    array['kiss','lick','breathe','touch_light','feather','temperature'], 5, 120, array['jemne','pomaly','vasnivo','kratko'], null, 'Vnutorne stehna su silna napatie budujuca zona.'),
    ('back_of_knees',   array['kiss','touch_light','feather'],            5,  60, array['ultra jemne','jemne','kratko'], 'Moze byt velmi steklive.', 'Skor kratky test nez dlha vyzva.'),
    ('calves',          array['massage','touch_light','stroke'],         30, 240, array['jemne','pomaly','hlbsie'], null, 'Skor masazna a relaxacna zona.'),
    ('feet',            array['massage','kiss','touch_light','stroke'],  15, 240, array['jemne','pomaly','striedavo'], 'Pouzit len ak su chodidla v hre prijemne obom.', 'Dobry kandidat na volitelnu kategoriu.'),
    ('toes',            array['kiss','touch_light'],                      5,  45, array['jemne','kratko','hravo'], 'Pouzit len ak su prsty na nohach vyslovene v poriadku.', 'Nie je vhodne do zakladneho mixu bez preferencii.'),

    ('breasts',         array['kiss','lick','touch_light','stroke','massage','feather','temperature'], 5, 180, array['ultra jemne','jemne','pomaly','striedavo'], 'Prsia mozu byt aj aversivne; zacat jemne.', 'Venuj sa celej ploche, nielen bradavkam.'),
    ('vulva',           array['touch_light','kiss','lick','vibration'],   5, 120, array['ultra jemne','jemne','pomaly','striedavo'], 'Len v intimnom mode a velmi individualne.', 'Externy genitalny celok, postupovat pomaly.'),
    ('clitoris',        array['touch_light','lick','vibration'],          3,  60, array['ultra jemne','jemne','kratko','striedavo'], 'Velmi citliva oblast; priama stimulacia nemusi byt prijemna.', 'Skor kratke jemne stimuly a pauzy.'),
    ('clitoral_hood',   array['touch_light','lick','vibration'],          3,  60, array['ultra jemne','jemne','kratko'], 'Nepriamy dotyk casto funguje lepsie nez priamy tlak.', 'Jemne cez kapucnu, nie silou.'),
    ('labia_outer',     array['touch_light','kiss','lick'],               5,  90, array['jemne','pomaly','kratko'], 'Len v intimnom mode.', 'Jemne a pomaly, bez tlaku.'),
    ('labia_inner',     array['touch_light','lick'],                      3,  60, array['ultra jemne','jemne','kratko'], 'Velmi citliva oblast.', 'Kratke jemne stimuly.'),
    ('vaginal_opening', array['touch_light','lick'],                      3,  60, array['ultra jemne','jemne','kratko'], 'Citliva oblast; vyzaduje jemnost.', 'Skor okolie nez tlak.'),
    ('periurethral_area', array['touch_light'],                           3,  45, array['ultra jemne','jemne','kratko'], 'Velmi citliva oblast, nie pre agresivne podnety.', 'Len velmi jemny dotyk.'),
    ('female_perineum', array['touch_light','kiss','feather'],            3,  60, array['ultra jemne','jemne','kratko'], 'U mnohych ludi citlive alebo aversivne.', 'Pouzit iba v pokrocilejsej vetve.'),

    ('penis',           array['touch_light','stroke','kiss','lick','vibration'], 5, 120, array['jemne','pomaly','striedavo'], 'Len v intimnom mode.', 'Celok penisu, nie hned najcitlivejsie miesto.'),
    ('glans',           array['touch_light','kiss','lick','vibration'],   3,  60, array['ultra jemne','jemne','kratko'], 'Zalud moze byt velmi citlivy.', 'Kratko a jemne.'),
    ('frenulum',        array['touch_light','lick'],                      3,  45, array['ultra jemne','jemne','kratko'], 'Velmi citliva oblast.', 'Len jemne a kratko.'),
    ('foreskin',        array['touch_light','stroke','kiss','lick'],      3,  60, array['jemne','pomaly','kratko'], 'Len ak ju muz ma a je to prijemne.', 'Pracovat s pohybom predkozky jemne.'),
    ('shaft_underside', array['touch_light','stroke','kiss','lick'],      5,  90, array['jemne','pomaly','striedavo'], 'Citliva spodna strana.', 'Skor pomaly nez intenzivne.'),
    ('penis_base',      array['touch_light','stroke','kiss'],             5,  90, array['jemne','pomaly'], null, 'Menej citliva startovacia oblast.'),
    ('scrotum',         array['touch_light','kiss','lick'],               3,  60, array['ultra jemne','jemne','kratko'], 'Vyhnut sa tlaku a tahaniu bez vyslovnej preferencie.', 'Miesok len jemne.'),
    ('testicles',       array['touch_light','kiss'],                      3,  45, array['ultra jemne','jemne','kratko'], 'Velmi citlive; bez stlacania.', 'Len jemny dotyk alebo bozk.'),
    ('male_perineum',   array['touch_light','kiss','feather'],            3,  60, array['ultra jemne','jemne','kratko'], 'Pokrocilejsia zona.', 'Pouzit iba v intimnom/pokrocilejsom mode.')
)
insert into rel.erogenous_zone_activity_rules
  (zone_slug, activity_slug, min_duration_seconds, max_duration_seconds, allowed_intensities, safety_note_sk, prompt_hint_sk)
select
  seed.zone_slug,
  a.activity_slug,
  seed.min_s,
  seed.max_s,
  seed.intensities,
  seed.safety_note,
  seed.hint
from seed
cross join lateral unnest(seed.activity_slugs) as a(activity_slug)
on conflict (zone_slug, activity_slug) do update set
  min_duration_seconds = excluded.min_duration_seconds,
  max_duration_seconds = excluded.max_duration_seconds,
  allowed_intensities = excluded.allowed_intensities,
  safety_note_sk = excluded.safety_note_sk,
  prompt_hint_sk = excluded.prompt_hint_sk;

grant usage on schema rel to anon, authenticated;
grant select on rel.intimate_activity_types to anon, authenticated;
grant select on rel.erogenous_zones to anon, authenticated;
grant select on rel.erogenous_zone_activity_rules to anon, authenticated;


-- =====================================================================
-- Source: .\supabase\migrations\20260529_001_intimate_stimulation_preferences.sql
-- =====================================================================

-- =============================================================================
-- DeepTalks · Intimne dobrodruzstvo — stimulation preference engine
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- This is the second layer above erogenous_zones:
-- - zones say WHERE on the body
-- - techniques say WHAT can be done
-- - rules say FOR WHOM, BY WHOM, how intense, whether random-safe or planned
-- - preferences let each partner narrow the dice before play
--
-- Pilot content: nipples / areola for all genders.
-- =============================================================================

create extension if not exists "pgcrypto";
create schema if not exists rel;

do $$ begin
  create type rel.intimate_preference_value as enum (
    'love',
    'like',
    'curious',
    'maybe_later',
    'not_now',
    'no'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type rel.intimate_actor_scope as enum (
    'partner_to_receiver',
    'receiver_self',
    'mutual',
    'either'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type rel.intimate_random_policy as enum (
    'always_ok',
    'preference_required',
    'mode_required',
    'planned_only',
    'never_random'
  );
exception when duplicate_object then null; end $$;

create table if not exists rel.intimate_play_modes (
  slug              text primary key,
  label_sk          text not null,
  description_sk    text not null,
  sort_order        smallint not null,
  random_enabled    boolean not null default true
);

create table if not exists rel.intimate_intensity_levels (
  level             smallint primary key check (level between 1 and 5),
  slug              text unique not null,
  label_sk          text not null,
  description_sk    text not null
);

create table if not exists rel.intimate_stimulation_techniques (
  slug              text primary key,
  label_sk          text not null,
  family            text not null,
  description_sk    text not null,
  default_actor     rel.intimate_actor_scope not null default 'partner_to_receiver',
  uses_mouth        boolean not null default false,
  uses_hands        boolean not null default false,
  uses_toy          boolean not null default false,
  bdsm_related      boolean not null default false,
  penetration_related boolean not null default false,
  source_refs       text[] not null default '{}',
  created_at        timestamptz not null default now()
);

create table if not exists rel.intimate_zone_stimulation_rules (
  zone_slug             text not null references rel.erogenous_zones(slug) on delete cascade,
  technique_slug        text not null references rel.intimate_stimulation_techniques(slug) on delete cascade,
  receiver_target       rel.intimate_body_target not null default 'all',
  actor_scope           rel.intimate_actor_scope not null default 'partner_to_receiver',
  play_mode_slug        text not null references rel.intimate_play_modes(slug),
  min_intensity         smallint not null references rel.intimate_intensity_levels(level),
  max_intensity         smallint not null references rel.intimate_intensity_levels(level),
  suggested_seconds_min integer not null check (suggested_seconds_min >= 0),
  suggested_seconds_max integer not null check (suggested_seconds_max >= suggested_seconds_min),
  random_policy         rel.intimate_random_policy not null,
  requires_warmup       boolean not null default false,
  requires_tool         boolean not null default false,
  requires_lube         boolean not null default false,
  requires_aftercare    boolean not null default false,
  tool_tags             text[] not null default '{}',
  prompt_sk             text not null,
  caution_sk            text,
  source_refs           text[] not null default '{}',
  created_at            timestamptz not null default now(),
  primary key (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug)
);

create table if not exists rel.couple_intimate_zone_preferences (
  couple_id             uuid not null references rel.couples(id) on delete cascade,
  user_id               uuid not null,
  zone_slug             text not null references rel.erogenous_zones(slug) on delete cascade,
  preference            rel.intimate_preference_value not null,
  intensity_min         smallint references rel.intimate_intensity_levels(level),
  intensity_max         smallint references rel.intimate_intensity_levels(level),
  notes                 text,
  updated_at            timestamptz not null default now(),
  primary key (couple_id, user_id, zone_slug)
);

create table if not exists rel.couple_intimate_technique_preferences (
  couple_id             uuid not null references rel.couples(id) on delete cascade,
  user_id               uuid not null,
  zone_slug             text not null references rel.erogenous_zones(slug) on delete cascade,
  technique_slug        text not null references rel.intimate_stimulation_techniques(slug) on delete cascade,
  preference            rel.intimate_preference_value not null,
  intensity_min         smallint references rel.intimate_intensity_levels(level),
  intensity_max         smallint references rel.intimate_intensity_levels(level),
  only_in_mode_slug     text references rel.intimate_play_modes(slug),
  notes                 text,
  updated_at            timestamptz not null default now(),
  primary key (couple_id, user_id, zone_slug, technique_slug)
);

create index if not exists intimate_zone_rules_lookup_idx
  on rel.intimate_zone_stimulation_rules (zone_slug, receiver_target, play_mode_slug, random_policy);

create index if not exists intimate_zone_rules_technique_idx
  on rel.intimate_zone_stimulation_rules (technique_slug);

insert into rel.intimate_play_modes (slug, label_sk, description_sk, sort_order, random_enabled) values
  ('explore',      'Objavovanie',          'Nizsi tlak, vhodne na zistenie preferencii a nalady.', 10, true),
  ('sensual',      'Zmyselne',             'Bozky, jazyk, ruky, tempo, dych a cele telo.', 20, true),
  ('intense',      'Intenzivne',           'Silnejsi tlak, sanie, hryzenie, rychlejsie alebo vyraznejsie podnety.', 30, true),
  ('toys',         'Pomocky',              'Vibracie, svorky, prisavky, lubrikanty a ine pomocky.', 40, true),
  ('bdsm',         'BDSM / mocenska hra',  'Bolest, tlak, svorky, impact, kontrola a role.', 50, true),
  ('planned_edge', 'Planovane / pokrocile','Veci, ktore sa nemaju objavit ako nahodna karta bez pripravy.', 60, false)
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  description_sk = excluded.description_sk,
  sort_order = excluded.sort_order,
  random_enabled = excluded.random_enabled;

insert into rel.intimate_intensity_levels (level, slug, label_sk, description_sk) values
  (1, 'very_light', 'ultra jemne', 'Minimalny tlak alebo kratky test vnimania.'),
  (2, 'light',      'jemne',       'Jemne, ale cielene. Stale vhodne na objavovanie.'),
  (3, 'medium',     'stredne',     'Bezna zmyselna intenzita, ktoru vela ludi vnima uz jasne.'),
  (4, 'strong',     'silne',       'Vyrazny tlak, sanie, tah alebo tempo; len ak to prijimatel chce.'),
  (5, 'kink',       'BDSM / bolestive', 'Bolest, svorky, impact alebo velmi intenzivne podnety; len v povolenom rezime.')
on conflict (level) do update set
  slug = excluded.slug,
  label_sk = excluded.label_sk,
  description_sk = excluded.description_sk;

insert into rel.intimate_stimulation_techniques
  (slug, label_sk, family, description_sk, default_actor, uses_mouth, uses_hands, uses_toy, bdsm_related, penetration_related, source_refs)
values
  ('kiss_soft',          'jemne bozkavanie',         'mouth', 'Makke bozky na zvolenu zonu.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play','JSM nipple/breast stimulation']),
  ('kiss_firm',          'pevnejsie bozky',          'mouth', 'Vyraznejsie bozky s vacsim tlakom pier.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('lick_flat',          'lizanie plochou jazyka',   'mouth', 'Pomaly kontakt vacsou plochou jazyka.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('tongue_circle',      'kruzenie jazykom',         'mouth', 'Kruzenie okolo alebo priamo na citlivej casti.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('suck_light',         'jemne sanie',              'mouth', 'Sanie ustami s nizsim podtlakom.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('suck_strong',        'silne sanie',              'mouth', 'Vyrazne sanie ustami, vhodne len po preferencnom povoleni.', 'partner_to_receiver', true, false, false, false, false, array['WebMD nipple play']),
  ('nibble_soft',        'jemne hryzkanie',          'mouth', 'Hrave pouzitie zubov bez silneho tlaku.', 'partner_to_receiver', true, false, false, false, false, array['Healthline nipple clamps safety guide']),
  ('bite_controlled',    'kontrolovane hryzenie',    'mouth', 'Vyraznejsi tlak zubami, iba ak ho prijimatel chce.', 'partner_to_receiver', true, false, false, true, false, array['Healthline nipple clamps safety guide']),
  ('touch_trace',        'obkreslovanie prstami',    'hands', 'Pomaly dotyk okolo citlivej oblasti.', 'partner_to_receiver', false, true, false, false, false, array['WebMD nipple play']),
  ('pinch_light',        'jemne stipnutie',          'hands', 'Kratke stlacenie medzi prstami.', 'partner_to_receiver', false, true, false, false, false, array['WebMD nipple play']),
  ('pinch_firm',         'pevne stipnutie',          'hands', 'Vyraznejsie stlacenie medzi prstami.', 'partner_to_receiver', false, true, false, true, false, array['Healthline nipple clamps safety guide']),
  ('roll_between_fingers','rolovanie medzi prstami', 'hands', 'Pomalé rolovanie alebo rotacia medzi prstami.', 'partner_to_receiver', false, true, false, false, false, array['WebMD nipple play']),
  ('pull_light',         'jemne potiahnutie',        'hands', 'Kratke a kontrolovane potiahnutie.', 'partner_to_receiver', false, true, false, true, false, array['Healthline nipple clamps safety guide']),
  ('vibration_low',      'jemna vibracia',           'toy',   'Nizka intenzita vibratora alebo malej pomocky.', 'partner_to_receiver', false, false, true, false, false, array['WebMD clitoral suction and toy safety']),
  ('vibration_strong',   'silnejsia vibracia',       'toy',   'Vyraznejsia vibracia; len po preferencnom povoleni.', 'partner_to_receiver', false, false, true, false, false, array['WebMD clitoral suction and toy safety']),
  ('suction_cup',        'prisavka / podtlakova pomocka', 'toy', 'Pomocka s podtlakom, nie oralne sanie.', 'partner_to_receiver', false, false, true, false, false, array['WebMD clitoral suction toys','Healthline nipple clamps safety guide']),
  ('adjustable_clamp',   'nastavitelna svorka',      'bdsm',  'Svorka s nastavitelznym tlakom.', 'partner_to_receiver', false, false, true, true, false, array['Healthline nipple clamps safety guide','A Woman’s Touch nipple clamp safety']),
  ('clamp_tug_light',    'jemny tah za svorku',      'bdsm',  'Tah alebo pohyb svorkou, iba kratko a v BDSM mode.', 'partner_to_receiver', false, false, true, true, false, array['Healthline nipple clamps safety guide']),
  ('temperature_ice',    'lad / chlad',              'sensation', 'Kratky chladovy podnet.', 'partner_to_receiver', false, true, true, false, false, array['Healthline nipple clamps safety guide']),
  ('temperature_warm',   'teplo',                    'sensation', 'Kratky teply podnet bez palenia.', 'partner_to_receiver', false, true, true, false, false, array['Healthline nipple clamps safety guide']),
  ('feather_tease',      'pierko / velmi lahky dotyk','sensation','Lahky senzoricky podnet.', 'partner_to_receiver', false, true, true, false, false, array['WebMD nipple play']),
  ('impact_breast_soft', 'jemny impact cez prsia',  'impact', 'Lahky impact na prsia/hrudnik, nie prudky uder priamo na bradavku.', 'partner_to_receiver', false, true, true, true, false, array['TASHRA BDSM risk awareness','Healthline nipple clamps safety guide'])
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

with nipple_rules(
  zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
  min_i, max_i, min_s, max_s, random_policy, warmup, tool, aftercare,
  tool_tags, prompt, caution, refs
) as (
  values
    -- Areola / dvorec: often a good bridge before direct nipple stimulation.
    ('areola','kiss_soft','all','partner_to_receiver','explore',1,2,5,45,'always_ok',false,false,false,array[]::text[],'Jemne bozkavaj dvorec okolo bradavky, nie priamo bradavku.',null,array['WebMD nipple play']),
    ('areola','lick_flat','all','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Pomaly prejdi jazykom po dvorci a sleduj reakciu.',null,array['WebMD nipple play']),
    ('areola','tongue_circle','all','partner_to_receiver','sensual',1,3,5,60,'preference_required',false,false,false,array[]::text[],'Kruz jazykom okolo bradavky bez priameho tlaku.',null,array['WebMD nipple play']),
    ('areola','touch_trace','all','partner_to_receiver','explore',1,3,10,90,'always_ok',false,false,false,array[]::text[],'Prstami pomaly obkresluj dvorec a men tlak podla reakcie.',null,array['WebMD nipple play']),
    ('areola','feather_tease','all','partner_to_receiver','explore',1,2,10,90,'always_ok',false,true,false,array['pierko'],'Prechadzaj pierkom po dvorci a okolo prsnej oblasti.',null,array['WebMD nipple play']),
    ('areola','temperature_ice','all','partner_to_receiver','toys',1,3,3,20,'preference_required',true,true,false,array['lad'],'Kratko priloz chlad v okoli dvorca, potom prejdi na teply dotyk rukou.','Chlad len kratko; nepouzivat pri necitlivosti alebo bolesti.',array['Healthline nipple clamps safety guide']),

    -- Direct nipple, lower and medium intensity.
    ('nipples','kiss_soft','all','partner_to_receiver','explore',1,2,3,45,'always_ok',false,false,false,array[]::text[],'Jemne pobozkaj bradavku a potom sa vrat na dvorec.',null,array['WebMD nipple play','JSM nipple/breast stimulation']),
    ('nipples','kiss_firm','all','partner_to_receiver','sensual',2,3,5,60,'preference_required',false,false,false,array[]::text[],'Bozkavaj bradavku pevnejsim tlakom pier a striedaj pauzy.',null,array['WebMD nipple play']),
    ('nipples','lick_flat','all','partner_to_receiver','sensual',1,3,3,60,'preference_required',false,false,false,array[]::text[],'Pouzi jazyk na bradavku kratko a pomaly, potom zmen rytmus.',null,array['WebMD nipple play']),
    ('nipples','tongue_circle','all','partner_to_receiver','sensual',1,3,3,60,'preference_required',false,false,false,array[]::text[],'Kruz jazykom okolo bradavky a iba obcas prejdi priamo cez nu.',null,array['WebMD nipple play']),
    ('nipples','suck_light','all','partner_to_receiver','sensual',2,3,5,45,'preference_required',false,false,false,array[]::text[],'Jemne saj bradavku a po par sekundach povol.',null,array['WebMD nipple play']),
    ('nipples','suck_strong','all','partner_to_receiver','intense',3,4,5,30,'preference_required',true,false,false,array[]::text[],'Silnejsie saj bradavku kratko, potom uvolni a sleduj reakciu.','Silne sanie nelosovat bez preferencie prijimatela.',array['WebMD nipple play']),
    ('nipples','nibble_soft','all','partner_to_receiver','sensual',2,3,3,20,'preference_required',false,false,false,array[]::text[],'Jemne zachyt bradavku zubami bez silneho tlaku a hned povol.',null,array['Healthline nipple clamps safety guide']),
    ('nipples','bite_controlled','all','partner_to_receiver','intense',3,4,2,15,'preference_required',true,false,false,array[]::text[],'Kontrolovane zahryzni do bradavky iba na okamih a hned zmierni.','Zuby patria len do intenzivneho rezimu po nastaveni preferencii.',array['Healthline nipple clamps safety guide']),
    ('nipples','touch_trace','all','partner_to_receiver','explore',1,3,10,90,'always_ok',false,false,false,array[]::text[],'Prstom obkresluj bradavku a dvorec bez staleho tlaku.',null,array['WebMD nipple play']),
    ('nipples','pinch_light','all','partner_to_receiver','sensual',2,3,2,30,'preference_required',false,false,false,array[]::text[],'Jemne stlac bradavku medzi prstami a pusti.',null,array['WebMD nipple play']),
    ('nipples','pinch_firm','all','partner_to_receiver','intense',3,4,2,20,'preference_required',true,false,false,array[]::text[],'Pevnejsie stlac bradavku medzi prstami, kratko podrz a pusti.','Silne stlacenie len pre prijimatela, ktory to chce.',array['WebMD nipple play']),
    ('nipples','roll_between_fingers','all','partner_to_receiver','sensual',2,4,5,45,'preference_required',false,false,false,array[]::text[],'Pomaly roluj bradavku medzi prstami a men tlak.',null,array['WebMD nipple play']),
    ('nipples','pull_light','all','partner_to_receiver','intense',3,4,2,20,'preference_required',true,false,false,array[]::text[],'Jemne potiahni bradavku a potom ju pust alebo pobozkaj.','Tah len kratko a kontrolovane.',array['Healthline nipple clamps safety guide']),

    -- Toys and BDSM: never as default random unless mode/profile says yes.
    ('nipples','vibration_low','all','partner_to_receiver','toys',1,3,5,60,'preference_required',false,true,false,array['vibrator'],'Pouzi nizku vibraciu na bradavku alebo jej okolie.',null,array['WebMD nipple play']),
    ('nipples','vibration_strong','all','partner_to_receiver','toys',3,4,5,45,'preference_required',true,true,false,array['vibrator'],'Pouzi silnejsiu vibraciu kratko a striedaj pauzy.','Silna vibracia len po preferencnom povoleni.',array['WebMD clitoral suction toys']),
    ('nipples','suction_cup','all','partner_to_receiver','toys',2,4,10,120,'mode_required',true,true,false,array['prisavka','podtlak'],'Pouzi podtlakovu pomocku alebo prisavku v nastavenej intenzite.','Podtlakove pomocky patria do rezimu Pomocky.',array['WebMD clitoral suction toys','Healthline nipple clamps safety guide']),
    ('nipples','adjustable_clamp','all','partner_to_receiver','bdsm',2,5,30,300,'mode_required',true,true,true,array['nastavitelne svorky'],'Nasad nastavitelnu svorku na nizkej intenzite a po chvili sa opytaj, ci pridat alebo ubrat.','Prvykrat kratko; nastavitelne svorky su vhodnejsie nez silne neregulovatelne.',array['Healthline nipple clamps safety guide','A Woman’s Touch nipple clamp safety']),
    ('nipples','clamp_tug_light','all','partner_to_receiver','bdsm',3,5,3,20,'planned_only',true,true,true,array['svorky'],'V BDSM mode velmi jemne pohni svorkou alebo retiazkou a hned sleduj reakciu.','Tah za svorku nikdy nelosovat v beznom mixe.',array['Healthline nipple clamps safety guide']),
    ('nipples','temperature_ice','all','partner_to_receiver','toys',1,3,3,20,'preference_required',true,true,false,array['lad'],'Kratko prejdi ladom pri bradavke a potom ju zahrej ustami alebo rukou.','Lad len kratko, nie pri strate citlivosti.',array['Healthline nipple clamps safety guide']),
    ('nipples','temperature_warm','all','partner_to_receiver','toys',1,3,3,30,'preference_required',true,true,false,array['teplo'],'Pouzi prijemne teply dotyk v okoli bradavky.','Ziadne palenie ani horuci vosk v zakladnom rezime.',array['Healthline nipple clamps safety guide']),
    ('breasts','impact_breast_soft','female','partner_to_receiver','bdsm',2,4,3,30,'mode_required',true,true,true,array['placacka','flogger'],'V BDSM mode pouzi lahky impact na prsia alebo hrudnik, nie prudko priamo na bradavku.','Impact cez prsia/hrudnik vyzaduje nastaveny BDSM rezim.',array['TASHRA BDSM risk awareness'])
)
insert into rel.intimate_zone_stimulation_rules
  (zone_slug, technique_slug, receiver_target, actor_scope, play_mode_slug,
   min_intensity, max_intensity, suggested_seconds_min, suggested_seconds_max,
   random_policy, requires_warmup, requires_tool, requires_aftercare, tool_tags,
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
  aftercare,
  tool_tags,
  prompt,
  caution,
  refs
from nipple_rules
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

alter table rel.couple_intimate_zone_preferences enable row level security;
alter table rel.couple_intimate_technique_preferences enable row level security;

do $$ begin
  create policy couple_zone_prefs_owner_all on rel.couple_intimate_zone_preferences
    for all
    using (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
    with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy couple_technique_prefs_owner_all on rel.couple_intimate_technique_preferences
    for all
    using (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()))
    with check (user_id = auth.uid() and rel.is_couple_member(couple_id, auth.uid()));
exception when duplicate_object then null; end $$;

grant usage on schema rel to anon, authenticated;
grant select on rel.intimate_play_modes to anon, authenticated;
grant select on rel.intimate_intensity_levels to anon, authenticated;
grant select on rel.intimate_stimulation_techniques to anon, authenticated;
grant select on rel.intimate_zone_stimulation_rules to anon, authenticated;
grant select, insert, update, delete on rel.couple_intimate_zone_preferences to authenticated;
grant select, insert, update, delete on rel.couple_intimate_technique_preferences to authenticated;


-- =====================================================================
-- Source: .\supabase\migrations\20260529_002_common_upper_body_stimulation.sql
-- =====================================================================

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


-- =====================================================================
-- Source: .\supabase\migrations\20260529_003_lower_body_stimulation.sql
-- =====================================================================

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


-- =====================================================================
-- Source: .\supabase\migrations\20260529_004_female_genital_stimulation.sql
-- =====================================================================

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


-- =====================================================================
-- Source: .\supabase\migrations\20260529_005_male_genital_stimulation.sql
-- =====================================================================

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


-- =====================================================================
-- Source: .\supabase\migrations\20260529_006_anal_perineal_prostate_stimulation.sql
-- =====================================================================

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


-- =====================================================================
-- Source: .\supabase\migrations\20260529_007_intimate_flow_toys_bondage_engine.sql
-- =====================================================================

-- =============================================================================
-- DeepTalks - Intimne dobrodruzstvo - flow, toys and bondage engine
-- Target: PostgreSQL 15+ / Supabase   Schema: rel
--
-- Batch 7: generator layer above body zones. This does not replace zone rules.
-- It adds scenes, steps, toy profiles and generator views so random cards are
-- filtered by tempo, intensity, planning and safety flags.
-- =============================================================================

create extension if not exists "pgcrypto";
create schema if not exists rel;

create table if not exists rel.intimate_toy_profiles (
  slug                         text primary key,
  label_sk                     text not null,
  family                       text not null,
  description_sk               text not null,
  compatible_zone_slugs        text[] not null default '{}',
  compatible_receiver_targets  rel.intimate_body_target[] not null default array['all']::rel.intimate_body_target[],
  beginner_ok                  boolean not null default true,
  external_only                boolean not null default true,
  requires_lube                boolean not null default false,
  requires_cleaning            boolean not null default true,
  requires_condom_when_shared  boolean not null default false,
  planned_only                 boolean not null default false,
  bdsm_related                 boolean not null default false,
  source_refs                  text[] not null default '{}',
  created_at                   timestamptz not null default now()
);

create table if not exists rel.intimate_scene_types (
  slug                    text primary key,
  label_sk                text not null,
  category                text not null,
  description_sk          text not null,
  suggested_minutes_min   smallint not null check (suggested_minutes_min >= 0),
  suggested_minutes_max   smallint not null check (suggested_minutes_max >= suggested_minutes_min),
  allowed_mode_slugs      text[] not null default '{}',
  allowed_random_policies rel.intimate_random_policy[] not null default array['always_ok','preference_required']::rel.intimate_random_policy[],
  max_intensity           smallint not null references rel.intimate_intensity_levels(level),
  allow_genital           boolean not null default false,
  allow_internal          boolean not null default false,
  allow_anal              boolean not null default false,
  allow_toys              boolean not null default false,
  allow_bdsm              boolean not null default false,
  requires_aftercare      boolean not null default false,
  sort_order              smallint not null,
  source_refs             text[] not null default '{}',
  created_at              timestamptz not null default now()
);

create table if not exists rel.intimate_scene_steps (
  scene_slug                text not null references rel.intimate_scene_types(slug) on delete cascade,
  step_order                smallint not null,
  label_sk                  text not null,
  instruction_sk            text not null,
  candidate_region_filter   text[] not null default '{}',
  candidate_zone_filter     text[] not null default '{}',
  candidate_family_filter   text[] not null default '{}',
  allowed_mode_slugs        text[] not null default '{}',
  allowed_random_policies   rel.intimate_random_policy[] not null default array['always_ok','preference_required']::rel.intimate_random_policy[],
  max_intensity             smallint not null references rel.intimate_intensity_levels(level),
  require_preference        boolean not null default true,
  transition_sk             text,
  primary key (scene_slug, step_order)
);

create table if not exists rel.intimate_bondage_scene_cards (
  slug                 text primary key,
  label_sk             text not null,
  scene_level          smallint not null check (scene_level between 1 and 5),
  actor_scope          rel.intimate_actor_scope not null default 'partner_to_receiver',
  play_mode_slug       text not null references rel.intimate_play_modes(slug),
  random_policy        rel.intimate_random_policy not null default 'mode_required',
  requires_aftercare   boolean not null default false,
  requires_tool        boolean not null default false,
  tool_tags            text[] not null default '{}',
  prompt_sk            text not null,
  caution_sk           text,
  source_refs          text[] not null default '{}',
  created_at           timestamptz not null default now()
);

insert into rel.intimate_toy_profiles
  (slug, label_sk, family, description_sk, compatible_zone_slugs, compatible_receiver_targets,
   beginner_ok, external_only, requires_lube, requires_cleaning, requires_condom_when_shared,
   planned_only, bdsm_related, source_refs)
values
  ('massage_oil', 'masazny olej', 'sensation', 'Olej alebo gel na vonkajsiu masaz tela.', array['shoulders','upper_back','lower_back','chest','waist','hips','buttocks','calves','feet'], array['all']::rel.intimate_body_target[], true, true, false, true, false, false, false, array['Healthline sex toy cleaning','ASHA safer sex toolbox']),
  ('feather', 'pierko / velmi jemny dotyk', 'sensation', 'Jemna senzoricka pomocka na kozu.', array['neck','nape','collarbones','chest','areola','nipples','inner_thighs','feet'], array['all']::rel.intimate_body_target[], true, true, false, true, false, false, false, array['Scarleteen sexual anatomy']),
  ('ice_safe', 'chlad / lad kratko', 'sensation', 'Kratky chladovy podnet mimo sliznic a bez extremov.', array['neck','chest','areola','nipples','belly','inner_thighs'], array['all']::rel.intimate_body_target[], false, true, false, true, false, false, false, array['Healthline nipple clamps safety guide']),
  ('bullet_vibrator', 'maly vibrator / bullet', 'vibrator', 'Mala vibracna pomocka vhodna najma na vonkajsiu stimulaciu.', array['nipples','vulva','clitoris','penis','glans','perineum','inner_thighs'], array['all','female','male']::rel.intimate_body_target[], true, true, false, true, true, false, false, array['WebMD vibrators','Healthline sex toys and STIs']),
  ('wand_vibrator', 'wand vibrator', 'vibrator', 'Silnejsi vibrator na vonkajsiu stimulaciu a vacsie plochy.', array['vulva','clitoris','penis','perineum','buttocks','inner_thighs'], array['all','female','male']::rel.intimate_body_target[], false, true, false, true, true, false, false, array['WebMD vibrators','Healthline sex toys and STIs']),
  ('vaginal_toy', 'vaginalna pomocka', 'penetration', 'Pomocka urcena na vaginalne pouzitie.', array['vaginal_opening','vagina_front_wall','g_spot_area'], array['female']::rel.intimate_body_target[], false, false, true, true, true, true, false, array['WebMD dildos','Healthline sex toy cleaning']),
  ('anal_plug', 'analny plug', 'anal', 'Analna pomocka s bezpecnou zakladnou.', array['anal_area','female_anal_area','male_anal_area','prostate'], array['all','female','male']::rel.intimate_body_target[], false, false, true, true, true, true, false, array['Healthline butt plugs','ASHA safer sex toolbox']),
  ('prostate_toy', 'pomocka na prostatu', 'anal', 'Pomocka urcena na stimulaciu prostaty.', array['prostate','male_anal_area'], array['male']::rel.intimate_body_target[], false, false, true, true, true, true, false, array['Healthline butt plugs','Healthline anal sex safety']),
  ('adjustable_nipple_clamps', 'nastavitelne svorky na bradavky', 'bdsm', 'Nastavitelne svorky, kde sa da zacat na nizkom tlaku.', array['nipples'], array['all']::rel.intimate_body_target[], false, true, false, true, false, true, true, array['Healthline nipple clamps safety guide']),
  ('blindfold', 'paska na oci', 'bondage', 'Jemna senzoricka pomocka bez viazania tela.', array['whole_body'], array['all']::rel.intimate_body_target[], true, true, false, true, false, false, true, array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('soft_wrist_restraints', 'jemne putka / satka na zapastia', 'bondage', 'Makke obmedzenie ruk, len s jednoduchym uvolnenim.', array['inner_wrist','palms','fingers'], array['all']::rel.intimate_body_target[], false, true, false, true, false, true, true, array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('paddle_soft', 'jemna placacka', 'impact', 'Pomocka na lahky impact na masite miesta.', array['buttocks','inner_thighs'], array['all']::rel.intimate_body_target[], false, true, false, true, false, true, true, array['TASHRA BDSM risk awareness'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  family = excluded.family,
  description_sk = excluded.description_sk,
  compatible_zone_slugs = excluded.compatible_zone_slugs,
  compatible_receiver_targets = excluded.compatible_receiver_targets,
  beginner_ok = excluded.beginner_ok,
  external_only = excluded.external_only,
  requires_lube = excluded.requires_lube,
  requires_cleaning = excluded.requires_cleaning,
  requires_condom_when_shared = excluded.requires_condom_when_shared,
  planned_only = excluded.planned_only,
  bdsm_related = excluded.bdsm_related,
  source_refs = excluded.source_refs;

insert into rel.intimate_scene_types
  (slug, label_sk, category, description_sk, suggested_minutes_min, suggested_minutes_max,
   allowed_mode_slugs, allowed_random_policies, max_intensity,
   allow_genital, allow_internal, allow_anal, allow_toys, allow_bdsm, requires_aftercare,
   sort_order, source_refs)
values
  ('today_soft_explore', 'Dnes: jemne objavovanie', 'today', 'Kratka spontanna hra bez pokrocilych praktik.', 10, 30, array['explore','sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 3, false, false, false, false, false, false, 10, array['PubMed erogenous mirror']),
  ('today_sensual_body', 'Dnes: zmyselne telo', 'today', 'Bozky, dotyk, jazyk a masaz na vonkajsich zonach.', 15, 45, array['explore','sensual','intense'], array['always_ok','preference_required']::rel.intimate_random_policy[], 4, true, false, false, false, false, false, 20, array['PubMed erogenous mirror']),
  ('week_toys_intro', 'Tyzden: pomocky postupne', 'week', 'Jeden vecer na vyber a test pomocky, druhy vecer na opakovanie toho, co fungovalo.', 20, 60, array['explore','sensual','toys'], array['preference_required','mode_required']::rel.intimate_random_policy[], 4, true, false, false, true, false, false, 30, array['Healthline sex toy cleaning','ASHA safer sex toolbox']),
  ('week_oral_focus', 'Tyzden: oralne objavovanie', 'week', 'Oralne aktivity iba tam, kde davaju zmysel, bez miesania nahodnych zon.', 15, 45, array['sensual','intense'], array['preference_required']::rel.intimate_random_policy[], 4, true, false, false, false, false, false, 40, array['Scarleteen sexual anatomy']),
  ('month_bdsm_intro', 'Mesiac: BDSM uvod', 'month', 'Postup od rozhovoru cez senzoriku po jemny bondage alebo impact.', 20, 75, array['explore','bdsm'], array['mode_required','planned_only']::rel.intimate_random_policy[], 5, false, false, false, true, true, true, 50, array['Kink Checklist BDSM safety','BDSM Wiki safeword','BDSM Wiki aftercare']),
  ('month_anal_intro', 'Mesiac: anal/perineum uvod', 'month', 'Len planovana cesta od vonkajsej zony po pripadne pokrocilejsie kroky.', 20, 75, array['explore','sensual','planned_edge'], array['planned_only']::rel.intimate_random_policy[], 4, true, true, true, true, false, true, 60, array['Healthline anal sex safety','ASHA safer sex toolbox'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  category = excluded.category,
  description_sk = excluded.description_sk,
  suggested_minutes_min = excluded.suggested_minutes_min,
  suggested_minutes_max = excluded.suggested_minutes_max,
  allowed_mode_slugs = excluded.allowed_mode_slugs,
  allowed_random_policies = excluded.allowed_random_policies,
  max_intensity = excluded.max_intensity,
  allow_genital = excluded.allow_genital,
  allow_internal = excluded.allow_internal,
  allow_anal = excluded.allow_anal,
  allow_toys = excluded.allow_toys,
  allow_bdsm = excluded.allow_bdsm,
  requires_aftercare = excluded.requires_aftercare,
  sort_order = excluded.sort_order,
  source_refs = excluded.source_refs;

insert into rel.intimate_scene_steps
  (scene_slug, step_order, label_sk, instruction_sk, candidate_region_filter, candidate_zone_filter,
   candidate_family_filter, allowed_mode_slugs, allowed_random_policies, max_intensity,
   require_preference, transition_sk)
values
  ('today_soft_explore', 1, 'Naladenie', 'Vyber jednu vonkajsiu zonu s nizkou intenzitou.', array['hlava','krk','ruky','trup'], array[]::text[], array['mouth','hands','sensation'], array['explore','sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 2, false, 'Po karte povedzte: viac, menej alebo preskocit.'),
  ('today_soft_explore', 2, 'Zmyselny krok', 'Vyber dotyk, bozk alebo masaz bez penetracie a bez BDSM.', array['trup','ruky','nohy'], array[]::text[], array['mouth','hands','massage','sensation'], array['explore','sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 3, true, 'Ak to funguje, zopakujte rovnaku zonu inou technikou.'),
  ('today_sensual_body', 1, 'Mapa tela', 'Vyber vacsiu vonkajsiu zonu, ktora nie je interna.', array['hlava','krk','trup','panva','nohy'], array[]::text[], array['mouth','hands','massage'], array['sensual'], array['always_ok','preference_required']::rel.intimate_random_policy[], 3, true, 'Generator nesmie skombinovat jazyk s nezmyselnou zonou.'),
  ('today_sensual_body', 2, 'Intenzita', 'Pridaj iba techniku s max intenzitou podla preferencie prijimatela.', array[]::text[], array['nipples','buttocks','inner_thighs','penis','vulva','clitoris'], array['mouth','hands','toy'], array['sensual','intense'], array['preference_required']::rel.intimate_random_policy[], 4, true, 'Ak sa objavi genitalna zona, musi byt explicitne povolena v preferenciach.'),
  ('week_toys_intro', 1, 'Vyber pomocky', 'Vyber iba pomocku kompatibilnu so zonou a prijimatelom.', array[]::text[], array[]::text[], array['toy','sensation'], array['toys','sensual'], array['preference_required','mode_required']::rel.intimate_random_policy[], 3, true, 'Pomocka musi byt cista a vhodna na danu zonu.'),
  ('week_toys_intro', 2, 'Opakovanie', 'Zopakujte iba to, co v prvej casti dostalo hodnotenie paci sa alebo chcem skusit.', array[]::text[], array[]::text[], array['toy','hands','mouth'], array['toys','sensual'], array['preference_required']::rel.intimate_random_policy[], 4, true, 'Toto nie je nahodny skok na vyssiu intenzitu.'),
  ('week_oral_focus', 1, 'Oralne iba zmysluplne', 'Vyber iba zony, kde oralna technika patri do pravidiel.', array[]::text[], array['lips','ears','neck','nipples','vulva','clitoris','penis','glans','inner_thighs'], array['mouth'], array['sensual','intense'], array['preference_required']::rel.intimate_random_policy[], 4, true, 'Ziadne oralne karty na vlasy alebo nezmyselne velke plochy.'),
  ('month_bdsm_intro', 1, 'Rozhovor a mierka', 'Prva karta je iba dohoda intenzity 1 az 5 a vyber jednej vetvy.', array[]::text[], array[]::text[], array[]::text[], array['explore','bdsm'], array['mode_required']::rel.intimate_random_policy[], 2, true, 'Vybrat iba jednu vetvu: senzorika, bondage, impact alebo kontrola.'),
  ('month_bdsm_intro', 2, 'Jemna scena', 'Vyber bondage alebo BDSM kartu s jasnym nastrojom a aftercare.', array[]::text[], array[]::text[], array['bdsm','impact','toy','sensation'], array['bdsm'], array['mode_required','planned_only']::rel.intimate_random_policy[], 5, true, 'Po scene nasleduje kratke aftercare.'),
  ('month_anal_intro', 1, 'Vonkajsia zona', 'Zacni iba vonkajsim anal/perineum pravidlom.', array['panva'], array['perineum','female_perineum','male_perineum','anal_area','female_anal_area','male_anal_area'], array['hands'], array['explore','sensual'], array['preference_required']::rel.intimate_random_policy[], 3, true, 'Bez penetracie v prvom kroku.'),
  ('month_anal_intro', 2, 'Planovany krok', 'Ak vobec, dalsi krok pouzije len planned_only pravidla s lubrikantom.', array['panva'], array['anal_area','female_anal_area','male_anal_area','prostate'], array['hands','toy','penetration'], array['planned_edge'], array['planned_only']::rel.intimate_random_policy[], 4, true, 'Analne a prostaticke karty sa nelosuju spontanne.')
on conflict (scene_slug, step_order) do update set
  label_sk = excluded.label_sk,
  instruction_sk = excluded.instruction_sk,
  candidate_region_filter = excluded.candidate_region_filter,
  candidate_zone_filter = excluded.candidate_zone_filter,
  candidate_family_filter = excluded.candidate_family_filter,
  allowed_mode_slugs = excluded.allowed_mode_slugs,
  allowed_random_policies = excluded.allowed_random_policies,
  max_intensity = excluded.max_intensity,
  require_preference = excluded.require_preference,
  transition_sk = excluded.transition_sk;

insert into rel.intimate_bondage_scene_cards
  (slug, label_sk, scene_level, actor_scope, play_mode_slug, random_policy,
   requires_aftercare, requires_tool, tool_tags, prompt_sk, caution_sk, source_refs)
values
  ('traffic_light_checkin', 'semaforova kontrola', 1, 'mutual', 'bdsm', 'mode_required', false, false, array[]::text[], 'Pred odvahou si povedzte zelena, zlta alebo cervena pre intenzitu hry.', 'Toto je kontrolna karta pred BDSM vetvou, nie eroticka uloha sama o sebe.', array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('blindfold_sensory_intro', 'paska na oci a dotyk', 2, 'partner_to_receiver', 'bdsm', 'mode_required', true, true, array['paska na oci'], 'Jeden ma pasku na oci a druhy pouzije iba ruky, dych alebo pierko.', 'Bez strasenia, bolesti alebo prekvapivej penetracie.', array['Kink Checklist BDSM safety']),
  ('hands_above_head_hold', 'drzanie ruk nad hlavou', 2, 'partner_to_receiver', 'bdsm', 'mode_required', false, false, array[]::text[], 'Drz partnerove ruky nad hlavou kratko a spoj to s bozkami alebo dotykom.', 'Bez tlaku na zapastia, lakte alebo ramena.', array['Kink Checklist BDSM safety']),
  ('soft_wrist_restraint', 'jemne obmedzenie zapasti', 3, 'partner_to_receiver', 'bdsm', 'planned_only', true, true, array['satka','makke putka'], 'Pouzi jemne obmedzenie zapasti a nechaj volne jednoduche uvolnenie.', 'Ziadne pevne uzly, ziadne necitlive prsty, ziadne zavesenie vahy tela.', array['Kink Checklist BDSM safety','BDSM Wiki safeword']),
  ('no_touch_tease', 'zakaz dotyku ako hra', 2, 'mutual', 'bdsm', 'mode_required', false, false, array[]::text[], 'Na kratky cas plati pravidlo, ze prijimatel sa nesmie dotknut spat.', 'Karta ma byt hrava, nie ponizujuca, ak to nema prijimatel rad.', array['Kink Checklist BDSM safety']),
  ('simple_command_scene', 'jednoduche pokyny', 2, 'partner_to_receiver', 'bdsm', 'mode_required', false, false, array[]::text[], 'Jeden dava kratke pokyny typu pozri sa na mna, spomal, pod sem.', 'Zostat pri jednoduchych vetach a sledovat reakciu.', array['Kink Checklist BDSM safety']),
  ('soft_impact_choice', 'vyber miesta pre jemny impact', 3, 'partner_to_receiver', 'bdsm', 'mode_required', true, true, array['ruka','placacka','flogger'], 'Vyberte iba jedno miesto pre jemny impact: zadok alebo vnutorne stehna.', 'Neudierat klby, krk, hlavu, brucho ani priame genitalie.', array['TASHRA BDSM risk awareness']),
  ('aftercare_card', 'aftercare po intenzite', 1, 'mutual', 'bdsm', 'mode_required', false, false, array[]::text[], 'Po intenzivnejsom kole dajte vodu, objatie, pokoj alebo kratku spatnu vazbu.', 'Aftercare je sucast flow, nie trest ani formalita.', array['BDSM Wiki aftercare','Kink Checklist BDSM safety'])
on conflict (slug) do update set
  label_sk = excluded.label_sk,
  scene_level = excluded.scene_level,
  actor_scope = excluded.actor_scope,
  play_mode_slug = excluded.play_mode_slug,
  random_policy = excluded.random_policy,
  requires_aftercare = excluded.requires_aftercare,
  requires_tool = excluded.requires_tool,
  tool_tags = excluded.tool_tags,
  prompt_sk = excluded.prompt_sk,
  caution_sk = excluded.caution_sk,
  source_refs = excluded.source_refs;

create or replace view rel.v_intimate_generator_candidates as
select
  r.zone_slug,
  z.label_sk as zone_label_sk,
  z.target as zone_target,
  z.region,
  z.is_genital,
  z.is_internal,
  z.dice_enabled,
  r.technique_slug,
  t.label_sk as technique_label_sk,
  t.family as technique_family,
  t.uses_mouth,
  t.uses_hands,
  t.uses_toy,
  t.bdsm_related,
  t.penetration_related,
  r.receiver_target,
  r.actor_scope,
  r.play_mode_slug,
  m.label_sk as play_mode_label_sk,
  r.min_intensity,
  r.max_intensity,
  r.random_policy,
  r.requires_warmup,
  r.requires_tool,
  r.requires_lube,
  r.requires_aftercare,
  r.tool_tags,
  r.prompt_sk,
  r.caution_sk,
  (
    r.random_policy in ('always_ok','preference_required')
    and r.max_intensity <= 3
    and z.is_internal = false
    and t.penetration_related = false
    and r.requires_aftercare = false
  ) as is_spontaneous_candidate,
  (
    r.random_policy = 'planned_only'
    or z.is_internal = true
    or t.penetration_related = true
    or r.requires_aftercare = true
  ) as needs_planned_flow
from rel.intimate_zone_stimulation_rules r
join rel.erogenous_zones z on z.slug = r.zone_slug
join rel.intimate_stimulation_techniques t on t.slug = r.technique_slug
join rel.intimate_play_modes m on m.slug = r.play_mode_slug;

create or replace view rel.v_intimate_scene_candidate_counts as
select
  s.slug as scene_slug,
  s.label_sk as scene_label_sk,
  step.step_order,
  step.label_sk as step_label_sk,
  count(c.*) as candidate_count
from rel.intimate_scene_types s
join rel.intimate_scene_steps step on step.scene_slug = s.slug
left join rel.v_intimate_generator_candidates c on
  c.max_intensity <= step.max_intensity
  and c.random_policy = any(step.allowed_random_policies)
  and (
    cardinality(step.allowed_mode_slugs) = 0
    or c.play_mode_slug = any(step.allowed_mode_slugs)
  )
  and (
    cardinality(step.candidate_region_filter) = 0
    or c.region = any(step.candidate_region_filter)
  )
  and (
    cardinality(step.candidate_zone_filter) = 0
    or c.zone_slug = any(step.candidate_zone_filter)
  )
  and (
    cardinality(step.candidate_family_filter) = 0
    or c.technique_family = any(step.candidate_family_filter)
  )
group by s.slug, s.label_sk, step.step_order, step.label_sk
order by s.slug, step.step_order;

create or replace view rel.v_intimate_toy_zone_matrix as
select
  toy.slug as toy_slug,
  toy.label_sk as toy_label_sk,
  toy.family,
  zone.slug as zone_slug,
  zone.label_sk as zone_label_sk,
  zone.target as zone_target,
  toy.beginner_ok,
  toy.external_only,
  toy.requires_lube,
  toy.requires_cleaning,
  toy.requires_condom_when_shared,
  toy.planned_only,
  toy.bdsm_related
from rel.intimate_toy_profiles toy
join rel.erogenous_zones zone on zone.slug = any(toy.compatible_zone_slugs);

grant select on rel.intimate_toy_profiles to anon, authenticated;
grant select on rel.intimate_scene_types to anon, authenticated;
grant select on rel.intimate_scene_steps to anon, authenticated;
grant select on rel.intimate_bondage_scene_cards to anon, authenticated;
grant select on rel.v_intimate_generator_candidates to anon, authenticated;
grant select on rel.v_intimate_scene_candidate_counts to anon, authenticated;
grant select on rel.v_intimate_toy_zone_matrix to anon, authenticated;


-- =====================================================================
-- Source: .\supabase\migrations\20260529_008_zone_action_intensity_gap_expansion.sql
-- =====================================================================

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