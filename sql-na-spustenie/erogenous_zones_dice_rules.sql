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
