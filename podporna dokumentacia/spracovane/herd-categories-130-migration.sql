-- ═══════════════════════════════════════════════════════════════
-- HERD VOTE — KOMPLETNÁ MIGRÁCIA VŠETKÝCH 130 KATEGÓRIÍ
-- deeptalks.eu · Verzia 3.0 · Všetky kategórie
-- Logika: najprv kategórie → otázky sa dorobia
-- ═══════════════════════════════════════════════════════════════

-- KROK 1: Pridaj nové stĺpce (bezpečné, IF NOT EXISTS)
ALTER TABLE herd_categories
  ADD COLUMN IF NOT EXISTS icon          text DEFAULT '❓',
  ADD COLUMN IF NOT EXISTS group_tag     text DEFAULT 'veda',
  ADD COLUMN IF NOT EXISTS description_sk text,
  ADD COLUMN IF NOT EXISTS source_hint   text;  -- napr. "Trivial Pursuit · Jackbox"

-- KROK 2: UPDATE existujúcich 23 kategórií (podľa ID)
UPDATE herd_categories SET icon='🔬', group_tag='veda',     description_sk='Orgány, bunky, DNA, ľudské telo',                 source_hint='Trivial Pursuit'          WHERE id='e92ec47d-e983-4868-a80b-6bd129bfff44';
UPDATE herd_categories SET icon='🗺️',  group_tag='geo',      description_sk='Svetoznáme destinácie, UNESCO, zaujímavosti',     source_hint='Pub quiz obľúbené'        WHERE id='a11cf1a1-5acd-4a80-a7ce-0f3cf3feda41';
UPDATE herd_categories SET icon='🇪🇺', group_tag='geo',      description_sk='Krajiny, hlavné mestá, vlajky Európy',            source_hint='SK relevantné'            WHERE id='09ffd241-2c71-4f36-af34-13102b63cedb';
UPDATE herd_categories SET icon='🌍', group_tag='geo',      description_sk='Kontinenty, krajiny, hlavné mestá sveta',         source_hint='Trivial Pursuit #1'       WHERE id='133e068e-7114-4e3f-ad04-33424dbd2f0d';
UPDATE herd_categories SET icon='🇸🇰', group_tag='sk',       description_sk='Udalosti, osobnosti, dátumy, zmluvy',             source_hint='SK špecifické'            WHERE id='a4313182-884b-4d35-a030-8634c141953f';
UPDATE herd_categories SET icon='⚔️', group_tag='historia', description_sk='Vojny, civilizácie, zlomové udalosti',            source_hint='Trivial Pursuit'          WHERE id='76af9a02-2d48-4d55-b00d-825d97b8416e';
UPDATE herd_categories SET icon='🍕', group_tag='jedlo',    description_sk='Z akej krajiny pochádza jedlo? Ingrediencie?',    source_hint='Pub quiz · obľúbené'      WHERE id='d642a803-6dbb-41e2-8d71-3d71bddeb133';
UPDATE herd_categories SET icon='🎨', group_tag='kultura',  description_sk='Maliari, obrazy, múzeá, umelecké štýly',          source_hint='Trivial Pursuit'          WHERE id='5207a5c5-6547-40d1-9f4c-52c76f61243e';
UPDATE herd_categories SET icon='🧮', group_tag='deti',     description_sk='Hlavolamy, výpočty, logické úlohy',               source_hint='Školy · Kahoot'           WHERE id='5dba6845-59b0-46ae-8b6b-5724024fdaf9';
UPDATE herd_categories SET icon='💅', group_tag='funny',    description_sk='Značky, návrhári, trendy, ikonické kúsky',        source_hint='Pub quiz'                 WHERE id='4b7ba6c3-4764-4a93-b447-e16c324183f5';
UPDATE herd_categories SET icon='🎬', group_tag='zabava',   description_sk='Hity, herci, filmy, Netflix, seriály',            source_hint='Jackbox · pub quiz'       WHERE id='ac7ab9cd-657e-4260-b1a2-258651863db0';
UPDATE herd_categories SET icon='🧙', group_tag='deti',     description_sk='Postavy, príbehy, pesničky z rozprávok',          source_hint='SK unikát · deti'         WHERE id='08cd3656-3957-4fc7-b299-4db9e8fc2eb6';
UPDATE herd_categories SET icon='🌐', group_tag='zabava',   description_sk='Viral momenty, TikTok, YouTube, reddit',          source_hint='Gen-Z · Jackbox'          WHERE id='52a72121-8333-41de-bf4f-d4956f759200';
UPDATE herd_categories SET icon='🏔️', group_tag='sk',       description_sk='Tatry, mestá, hrady, osobnosti, symboly SR',     source_hint='SK špecifické'            WHERE id='183a3b75-0d83-47cb-9a7b-7b2e6a807618';
UPDATE herd_categories SET icon='⚽', group_tag='sport',    description_sk='Kluby, hráči, MS, rekordy, trofeje',              source_hint='Pub quiz #1'              WHERE id='9bdaa899-1866-4269-80b8-3f40050a910c';
UPDATE herd_categories SET icon='💻', group_tag='tech',     description_sk='Kto to vynašiel, kedy vzniklo, rekordy',          source_hint='Tech pub quiz'            WHERE id='3a8ca258-97da-4f06-8f35-397a6fa1ca94';
UPDATE herd_categories SET icon='🎯', group_tag='deeptalks',description_sk='Uhádni percentá, čísla, štatistiky o ľuďoch',    source_hint='Jackbox štýl ⭐'          WHERE id='b2739f9a-eab4-4cdb-b13e-40cab2f606b0';
UPDATE herd_categories SET icon='🎉', group_tag='kultura',  description_sk='Vianočné, veľkonočné, svetové sviatky, zvyky',   source_hint='SK relevantné'            WHERE id='bdf60707-7ed8-4b35-8306-5c65e3af1f79';
UPDATE herd_categories SET icon='🌌', group_tag='veda',     description_sk='Planéty, hviezdy, galaxie, misie NASA',           source_hint='Trivial Pursuit'          WHERE id='4631be3c-e28e-4b21-b6cf-639749cf1691';
UPDATE herd_categories SET icon='⚖️', group_tag='deeptalks',description_sk='Je X väčšie ako Y? Čo má viac? Porovnaj.',       source_hint='Herd Vote originál ⭐'    WHERE id='ad568a02-22aa-4ed6-b822-9ce59ee7d101';
UPDATE herd_categories SET icon='🤯', group_tag='funny',    description_sk='Guinnessova kniha, neuveriteľné ale pravdivé',    source_hint='Jackbox · virálne'        WHERE id='3a810e49-8175-48d3-ab1f-479ae5c1d6a0';
UPDATE herd_categories SET icon='🧬', group_tag='veda',     description_sk='Anatómia, choroby, vitamíny, medicína',           source_hint='Pub quiz · školy'         WHERE id='ee645247-a8d1-45f9-94d6-f48ea43cdac9';
UPDATE herd_categories SET icon='🦁', group_tag='veda',     description_sk='Fakty, rekordy, druhy, habitat, príroda',         source_hint='Rodinný pub quiz #1'      WHERE id='983728a8-a718-44dd-8669-8139cf178acf';

-- KROK 3: INSERT všetkých 107 nových kategórií
-- slug sa generuje automaticky z name — NEVKLADÁME HO
-- Nové kategórie štartujú so sort_order od 1000 (po existujúcich)
INSERT INTO herd_categories (name, is_active, display_order, lang, sort_order, locale, icon, group_tag, description_sk, source_hint) VALUES

-- ── ZÁBAVA & POP ──────────────────────────────────────────────
('Filmy',                          true, 100, 'sk', 1010, 'sk', '🎬', 'zabava',   'Citáty, herci, rok vydania, oscary',                  'Trivial Pursuit · Jackbox'),
('Televízia & Seriály',            true, 100, 'sk', 1020, 'sk', '📺', 'zabava',   'Netflix, HBO, klasiky. Znáš sa v tom?',               'Pub quiz · Netflix'),
('Hudba',                          true, 100, 'sk', 1030, 'sk', '🎵', 'zabava',   'Kapely, hity, roky, texty piesní',                    'Pub quiz · Kahoot'),
('Speváci & Kapely',               true, 100, 'sk', 1040, 'sk', '🎤', 'zabava',   'Kto spieval? Z akej kapely? Koľko albúmov?',          'Pub quiz'),
('Videohry',                       true, 100, 'sk', 1050, 'sk', '🎮', 'zabava',   'Konzoly, postavy, rok vydania, rekordy',              'Jackbox · Twitch'),
('Knihy & Literatúra',             true, 100, 'sk', 1060, 'sk', '📚', 'zabava',   'Autori, postavy, citáty, bestsellery',                'Trivial Pursuit'),
('Divadlo & Muzikály',             true, 100, 'sk', 1070, 'sk', '🎭', 'zabava',   'Broadway, West End, piesne z muzikálov',              'Kultúrny pub quiz'),
('Aktuálne udalosti',              true, 100, 'sk', 1080, 'sk', '📰', 'zabava',   'Správy posledného mesiaca, roku',                    'Kahoot · školy'),
('Superhrdinovia & Komiksy',       true, 100, 'sk', 1090, 'sk', '🦸', 'zabava',   'Marvel, DC, mená, schopnosti, filmy',                 'Jackbox · Gen-Z'),
('Reality šou & Súťaže',           true, 100, 'sk', 1100, 'sk', '🏆', 'zabava',   'Survivor, Big Brother, Idol, MasterChef',             'Pub quiz'),
('Stand-up & Komedianti',          true, 100, 'sk', 1110, 'sk', '🎪', 'zabava',   'Citáty, mená komikeov, Netflix špeciály',             'Niche pub quiz'),
('Celebrity & Slávni ľudia',       true, 100, 'sk', 1120, 'sk', '📸', 'zabava',   'Kto je kto? Kariéra, vzťahy, škandály',              'Pub quiz · BuzzFeed'),
('Internet & Memes',               true, 100, 'sk', 1130, 'sk', '🌐', 'zabava',   'Viral momenty, TikTok, YouTube, reddit',              'Gen-Z · Jackbox'),
('Disney & Animáky',               true, 100, 'sk', 1140, 'sk', '🃏', 'zabava',   'Postavy, piesne, filmy, Pixar',                      'Rodinný pub quiz'),
('Spoločenské hry',                true, 100, 'sk', 1150, 'sk', '🧩', 'zabava',   'Pravidlá, postavy, rok vzniku, rekordné hry',         'Board game café'),
('Podcasty & YouTube',             true, 100, 'sk', 1160, 'sk', '📡', 'zabava',   'Najväčší tvorcovia, videá s miliardou videní',       'Gen-Z niche'),

-- ── ŠPORT ─────────────────────────────────────────────────────
('Futbal',                         true, 100, 'sk', 1200, 'sk', '⚽', 'sport',    'Kluby, hráči, MS, rekordy, trofeje',                  'Pub quiz #1'),
('Basketbal (NBA)',                 true, 100, 'sk', 1210, 'sk', '🏀', 'sport',    'Tímy, MVP, šampionáty, štatistiky legiend',           'US pub quiz'),
('Tenis',                          true, 100, 'sk', 1220, 'sk', '🎾', 'sport',    'Grand Slamy, svetové jedničky, Wimbledon',            'Trivial Pursuit'),
('Olympijské hry',                 true, 100, 'sk', 1230, 'sk', '🏊', 'sport',    'Rekordy, mestá, olympijský oheň, medaily',            'Trivial Pursuit'),
('Hokej',                          true, 100, 'sk', 1240, 'sk', '🏒', 'sport',    'Tímy, MS, Stanley Cup, legendy',                     'SK/CZ pub quiz'),
('Box & MMA',                      true, 100, 'sk', 1250, 'sk', '🥊', 'sport',    'Šampióni, zápasy, UFC, majstrovstvá sveta',           'Pub quiz'),
('Formule 1',                      true, 100, 'sk', 1260, 'sk', '🏎️', 'sport',    'Tímy, piloti, trasy, víťazi šampionátu',              'Pub quiz'),
('Cyklistika',                     true, 100, 'sk', 1270, 'sk', '🚴', 'sport',    'Tour de France, Giro, Vuelta, rekordy',               'Európsky pub quiz'),
('Americký futbal (NFL)',           true, 100, 'sk', 1280, 'sk', '🏈', 'sport',    'Super Bowl, tímy, MVP, rekordy',                     'US pub quiz'),
('Zimné športy',                   true, 100, 'sk', 1290, 'sk', '🎿', 'sport',    'Lyžovanie, biatlon, skoky, krasokorčuľovanie',       'SK relevantné'),
('Baseball',                       true, 100, 'sk', 1300, 'sk', '⚾', 'sport',    'MLB, šampionáty, hráči, rekordy',                    'US pub quiz'),
('Volejbal & Plážové športy',      true, 100, 'sk', 1310, 'sk', '🏐', 'sport',    'MS, olympiáda, najlepšie tímy sveta',                'Pub quiz'),

-- ── KULTÚRA & UMENIE ──────────────────────────────────────────
('Výtvarné umenie',                true, 100, 'sk', 1400, 'sk', '🎨', 'kultura',  'Maliari, obrazy, múzeá, umelecké štýly',              'Trivial Pursuit'),
('Architektúra',                   true, 100, 'sk', 1410, 'sk', '🏛️', 'kultura',  'Stavby, architekti, štýly, rekordy výšky',            'Trivial Pursuit'),
('Mytológia',                      true, 100, 'sk', 1420, 'sk', '📜', 'kultura',  'Grécka, rímska, nordická, egyptská',                  'Školy · pub quiz'),
('Náboženstvá sveta',              true, 100, 'sk', 1430, 'sk', '🌍', 'kultura',  'Sviatky, symboly, zakladatelia, posvätné miesta',    'Trivial Pursuit'),
('Tanec & Balet',                  true, 100, 'sk', 1440, 'sk', '💃', 'kultura',  'Štýly, koreografie, svetové súbory',                 'Kultúrny pub quiz'),
('Klasická hudba',                 true, 100, 'sk', 1450, 'sk', '🎻', 'kultura',  'Skladatelia, diela, nástroje, opera',                'Trivial Pursuit'),
('Fotografia & Film',              true, 100, 'sk', 1460, 'sk', '📷', 'kultura',  'Ikonické fotky, fotografi, techniky',                 'Pub quiz'),
('Svetové pamiatky UNESCO',        true, 100, 'sk', 1470, 'sk', '🛕', 'kultura',  'Kde sa nachádzajú, kedy boli zapísané',              'Geo + kultúra'),
('Jazyky sveta',                   true, 100, 'sk', 1480, 'sk', '🌐', 'kultura',  'Koľko ľudí hovorí? Odkiaľ pochádza slovo?',          'Lingvistický pub quiz'),
('Citáty z kníh a filmov',         true, 100, 'sk', 1490, 'sk', '📖', 'kultura',  'Kto to povedal? Z akého diela?',                     'Pub quiz'),
('Festivaly sveta',                true, 100, 'sk', 1500, 'sk', '🎡', 'kultura',  'Oktoberfest, Karneval, Burning Man, Diwali',          'Kultúrny pub quiz'),

-- ── HISTÓRIA & POLITIKA ───────────────────────────────────────
('Vojny & Bitky',                  true, 100, 'sk', 1600, 'sk', '⚔️', 'historia', 'Dátumy, miesta, rozhodnutia, dôsledky',               'Trivial Pursuit'),
('Kráľovské rodiny',               true, 100, 'sk', 1610, 'sk', '👑', 'historia', 'Európske monarchie, zaujímavosti, nástupníctvo',      'UK pub quiz'),
('Prezidenti & Premiéri',          true, 100, 'sk', 1620, 'sk', '🗽', 'historia', 'Mená, roky, krajiny, zaujímavosti',                   'Trivial Pursuit'),
('Staroveké civilizácie',          true, 100, 'sk', 1630, 'sk', '🏺', 'historia', 'Egypt, Rím, Grécko, Aztékovia, Čína',                 'Trivial Pursuit'),
('Vesmírne preteky',               true, 100, 'sk', 1640, 'sk', '🚀', 'historia', 'NASA, Sojuz, prvý človek, Moon landing',              'Pub quiz'),
('Dôležité dátumy histórie',       true, 100, 'sk', 1650, 'sk', '📅', 'historia', 'Kedy sa to stalo? Rok udalosti?',                    'Trivial Pursuit'),
('Ekonomika & Peniaze',            true, 100, 'sk', 1660, 'sk', '🏦', 'historia', 'Meny, centrálne banky, veľké krízy',                  'Pokročilý pub quiz'),
('Revolúcie & Hnutia',             true, 100, 'sk', 1670, 'sk', '✊', 'historia', 'Francúzska revolúcia, Velvet Revolution, civil rights', 'Trivial Pursuit'),
('Právo & Súdne kauzy',            true, 100, 'sk', 1680, 'sk', '⚖️', 'historia', 'Slávne prípady, medzinárodné právo, súdy',            'Niche pub quiz'),
('Objavy & Prieskumníci',          true, 100, 'sk', 1690, 'sk', '🗺️', 'historia', 'Kolumbus, Magellan, Scott, Amundsen',                 'Trivial Pursuit'),
('20. storočie',                   true, 100, 'sk', 1700, 'sk', '📰', 'historia', 'Studená vojna, kozmické preteky, diktatúry',          'Pub quiz'),

-- ── GEOGRAFIA ─────────────────────────────────────────────────
('Hlavné mestá sveta',             true, 100, 'sk', 1800, 'sk', '🌍', 'geo',      'Ktoré mesto je hlavné mesto krajiny X?',              'Trivial Pursuit #1'),
('Vlajky štátov',                  true, 100, 'sk', 1810, 'sk', '🗺️', 'geo',      'Aká krajina má túto vlajku?',                        'Pub quiz · obľúbené'),
('Hory & Pohoria',                 true, 100, 'sk', 1820, 'sk', '⛰️', 'geo',      'Everest, Alpy, Andy, výšky, krajiny',                 'Trivial Pursuit'),
('Rieky, jazerá & oceány',         true, 100, 'sk', 1830, 'sk', '🌊', 'geo',      'Najdlhšia, najhlbšia, hranice krajín',                'Trivial Pursuit'),
('Najväčšie mestá sveta',          true, 100, 'sk', 1840, 'sk', '🏙️', 'geo',      'Počet obyvateľov, kontinenty, zaujímavosti',          'Pub quiz'),
('Krajiny sveta — fakty',          true, 100, 'sk', 1850, 'sk', '🧭', 'geo',      'Populácia, mena, jazyk, susedia',                    'Trivial Pursuit'),
('Ostrovy & Kontinenty',           true, 100, 'sk', 1860, 'sk', '🏝️', 'geo',      'Najväčšie, najmenšie, zaujímavé fakty',              'Pub quiz'),
('Svetoznáme pamiatky',            true, 100, 'sk', 1870, 'sk', '🗼', 'geo',      'V ktorom meste? V akej krajine?',                    'Obľúbené'),
('Prírodné javy',                  true, 100, 'sk', 1880, 'sk', '🌋', 'geo',      'Sopky, zemetrasenia, tornáda, tsunami',               'Veda + geo'),
('Podnebie & Počasie',             true, 100, 'sk', 1890, 'sk', '🌡️', 'geo',      'Najteplejšie, najmokrejšie, najsuchšie miesta',      'Pub quiz'),

-- ── JEDLO & PITIE ─────────────────────────────────────────────
('Víno & Vinárske regióny',        true, 100, 'sk', 1950, 'sk', '🍷', 'jedlo',    'Odrody, krajiny, rekordy, degustácia',                'Sofistikovaný pub quiz'),
('Pivo & Pivovary',                true, 100, 'sk', 1960, 'sk', '🍺', 'jedlo',    'Typy piva, krajiny, najstaršie pivovary',             'Pub quiz #1'),
('Káva & Čaj',                     true, 100, 'sk', 1970, 'sk', '☕', 'jedlo',    'Krajiny pôvodu, typy, príprava',                     'Kaviareň pub quiz'),
('Ázijská kuchyňa',                true, 100, 'sk', 1980, 'sk', '🍣', 'jedlo',    'Japonsko, Kórea, Čína, Thajsko, India',               'Foodie pub quiz'),
('Syry sveta',                     true, 100, 'sk', 1990, 'sk', '🧀', 'jedlo',    'Krajiny, typy, rekordy, zaujímavosti',                'Niche pub quiz'),
('Koreniny & Bylinky',             true, 100, 'sk', 2000, 'sk', '🌶️', 'jedlo',    'Pôvod, použitie, Scoville stupnica',                 'Foodie niche'),
('Dezerty sveta',                  true, 100, 'sk', 2010, 'sk', '🎂', 'jedlo',    'Tiramisu, crème brûlée, baklava — odkiaľ?',          'Pub quiz'),
('Michelinové hviezdy & šéfkuchári',true,100, 'sk', 2020, 'sk', '🍽️', 'jedlo',   'Najslávnejší šéfkuchári, reštaurácie, krajiny',      'Foodie pub quiz'),
('Koktaily & Destiláty',           true, 100, 'sk', 2030, 'sk', '🥃', 'jedlo',    'Ingrediencie, krajiny pôvodu, meno barmanky',         'Bar pub quiz'),
('Potraviny & Výživa',             true, 100, 'sk', 2040, 'sk', '🌾', 'jedlo',    'Vitamíny, kalórie, superfoods, fakty',                'Health niche'),

-- ── VEDA & PRÍRODA ────────────────────────────────────────────
('Biológia & Telo',                true, 100, 'sk', 2100, 'sk', '🔬', 'veda',     'Orgány, bunky, DNA, ľudské telo',                    'Trivial Pursuit'),
('Chémia',                         true, 100, 'sk', 2110, 'sk', '⚗️', 'veda',     'Prvky, značky, reakčné rovnice, Nobel',               'Školy · Kahoot'),
('Vesmír & Astronómia',            true, 100, 'sk', 2120, 'sk', '🌌', 'veda',     'Planéty, hviezdy, galaxie, misie NASA',               'Trivial Pursuit'),
('Zvieratá & Príroda',             true, 100, 'sk', 2130, 'sk', '🦁', 'veda',     'Fakty, rekordy, druhy, habitat',                     'Pub quiz · obľúbené'),
('Dinosaury & Prehistória',        true, 100, 'sk', 2140, 'sk', '🦕', 'veda',     'Mená, éry, fosílie, veľkosti, zánik',                'Deti + dospelí'),
('Objavy & Vynálezy',              true, 100, 'sk', 2150, 'sk', '🧪', 'veda',     'Kto vynašiel? Kedy? Ako to zmenilo svet?',            'Trivial Pursuit'),
('Fyzika',                         true, 100, 'sk', 2160, 'sk', '⚡', 'veda',     'Zákony, vedci, experimenty, jednotky',               'Školy'),
('Rastliny & Botanika',            true, 100, 'sk', 2170, 'sk', '🌱', 'veda',     'Druhy, liečivé rastliny, rekordy, fakty',             'Niche pub quiz'),
('Oceány & Morský život',          true, 100, 'sk', 2180, 'sk', '🌊', 'veda',     'Druhy rýb, hĺbky, zaujímavosti',                     'Pub quiz'),
('Psychológia & Mozog',            true, 100, 'sk', 2190, 'sk', '🧠', 'veda',     'Fakty o mozgu, efekty, experimenty',                 'DeepTalks relevantné'),
('Klimatická zmena & Ekológia',    true, 100, 'sk', 2200, 'sk', '🌿', 'veda',     'Fakty, riešenia, dohody, krajiny',                   'Moderný pub quiz'),

-- ── TECH & VEDA ───────────────────────────────────────────────
('Technológia & Internet',         true, 100, 'sk', 2300, 'sk', '💻', 'tech',     'Kto to vynašiel, kedy vzniklo, rekordy',              'Tech pub quiz'),
('Smartfóny & Aplikácie',          true, 100, 'sk', 2310, 'sk', '📱', 'tech',     'Apple vs Android, história, rekordy stiahnutí',      'Tech niche'),
('Umelá inteligencia',             true, 100, 'sk', 2320, 'sk', '🤖', 'tech',     'Modely, spoločnosti, prielomy, história',             '2024+ relevantné'),
('Autá & Doprava',                 true, 100, 'sk', 2330, 'sk', '🚗', 'tech',     'Značky, modely, rekordy, história áut',              'Pub quiz · obľúbené'),
('Lietadlá & Letectvo',            true, 100, 'sk', 2340, 'sk', '✈️', 'tech',     'Typy lietadiel, rekordy, aerolinky',                 'Tech pub quiz'),
('Vesmírne technológie',           true, 100, 'sk', 2350, 'sk', '🚀', 'tech',     'SpaceX, NASA, Roscosmos, satelity',                  'Tech pub quiz'),
('Kryptomena & Blockchain',        true, 100, 'sk', 2360, 'sk', '🔐', 'tech',     'Bitcoin, Ethereum, história, rekordy',                'Niche pub quiz'),
('Medicína & Zdravie',             true, 100, 'sk', 2370, 'sk', '🏥', 'tech',     'Lieky, diagnózy, rekordy, Nobel za medicínu',        'Trivial Pursuit'),

-- ── 🇸🇰 SLOVENSKO ─────────────────────────────────────────────
('Slovenská história',             true, 100, 'sk', 2400, 'sk', '🇸🇰', 'sk',      'Udalosti, osobnosti, dátumy, zmluvy',                'SK špecifické'),
('Slovenský šport',                true, 100, 'sk', 2410, 'sk', '⛷️', 'sk',       'Športovci, medailisti, rekordy',                     'SK špecifické'),
('Slovenská príroda & regióny',    true, 100, 'sk', 2420, 'sk', '🏔️', 'sk',      'Tatry, jaskyne, rieky, NP',                          'SK špecifické'),
('Slovenská hudba',                true, 100, 'sk', 2430, 'sk', '🎶', 'sk',       'Kapely, speváci, hity, folklore',                    'SK pub quiz'),
('Slovenské filmy & TV',           true, 100, 'sk', 2440, 'sk', '📺', 'sk',       'Klasiky, postavy, citáty, režiséri',                 'SK pub quiz'),
('Slovenské mestá & fakty',        true, 100, 'sk', 2450, 'sk', '🏙️', 'sk',      'Počty obyvateľov, symboly, historické fakty',        'SK pub quiz'),
('Slovenská kuchyňa',              true, 100, 'sk', 2460, 'sk', '🥣', 'sk',       'Jedlá, tradície, ingrediencie, sviatky',             'SK pub quiz'),
('Ukrajina & SK-UA vzťahy',        true, 100, 'sk', 2470, 'sk', '🇺🇦', 'sk',      'História, kultúra, zaujímavosti, osobnosti',         'DeepTalks bilingválne'),
('Slovenské hrady & pamiatky',     true, 100, 'sk', 2480, 'sk', '🏰', 'sk',       'Kde sa nachádzajú, história, UNESCO',                'SK pub quiz'),

-- ── ZÁBAVNÉ & NICHE ───────────────────────────────────────────
('Neuveriteľné fakty',             true, 100, 'sk', 2500, 'sk', '🤯', 'funny',    'True or False? Skutočné, no neuveriteľné',            'Jackbox · virálne'),
('Rekordy z Guinnessovej knihy',   true, 100, 'sk', 2510, 'sk', '🎲', 'funny',    'Najväčší, najrýchlejší, najzaujímavejší',             'Pub quiz obľúbené'),
('Záhadné a nadprirodzené',        true, 100, 'sk', 2520, 'sk', '🦄', 'funny',    'UFO, záhady, Bermudský trojuholník',                  'Niche fun'),
('Vtipné zákony & predpisy',       true, 100, 'sk', 2530, 'sk', '😂', 'funny',    'Reálne, ale absurdné zákony z celého sveta',          'Jackbox štýl'),
('Zvieracie rekordy',              true, 100, 'sk', 2540, 'sk', '🐾', 'funny',    'Najrýchlejšie, najväčšie, najzaujímavejšie',         'Rodinný pub quiz'),
('Najbohatší ľudia sveta',         true, 100, 'sk', 2550, 'sk', '💰', 'funny',    'Meno, majetok, čím zarobili, rok',                   'Pub quiz'),
('Horory & Strašidelné',           true, 100, 'sk', 2560, 'sk', '🧟', 'funny',    'Filmy, miesta, legendy, mýty',                       'Halloween pub quiz'),
('Horoskopy & Veštenie',           true, 100, 'sk', 2570, 'sk', '🔮', 'funny',    'Znamenia, planéty, predpovede, história',             'Fun niche'),
('Cirkus & Pouliční artisti',      true, 100, 'sk', 2580, 'sk', '🎪', 'funny',    'Rekordy, história, slávne čísla',                    'Fun niche'),
('Superlativy',                    true, 100, 'sk', 2590, 'sk', '🃏', 'funny',    'Čo je najväčšie, najmenšie, najrýchlejšie?',         'Pub quiz'),
('Sci-Fi & Budúcnosť',             true, 100, 'sk', 2600, 'sk', '🛸', 'funny',    'Predpovede, filmy, vynálezy inšpirované sci-fi',     'Niche tech'),
('Móda & Dizajn',                  true, 100, 'sk', 2610, 'sk', '💅', 'funny',    'Značky, návrhári, trendy, ikonické kúsky',            'Pub quiz'),

-- ── PRE DETI & ŠKOLU ──────────────────────────────────────────
('Matematika & Rébusy',            true, 100, 'sk', 2700, 'sk', '✏️', 'deti',     'Hlavolamy, výpočty, logické úlohy',                  'Školy · Kahoot'),
('Slovenský jazyk & Pravopis',     true, 100, 'sk', 2710, 'sk', '🔤', 'deti',     'Gramatika, synonymá, pravopis, úslovia',              'SK školy'),
('Farby, tvary & percepcia',       true, 100, 'sk', 2720, 'sk', '🌈', 'deti',     'Optické ilúzie, miešanie farieb, vnímanie',           'Deti · Kahoot'),
('Príroda okolo nás',              true, 100, 'sk', 2730, 'sk', '🦋', 'deti',     'Vtáky, stromy, kvety, zvieratá SR',                  'Deti · školy'),
('Školské predmety',               true, 100, 'sk', 2740, 'sk', '🏫', 'deti',     'Ktorý vedec? Ktorý rok? Zákon, vzorec',               'Kahoot'),
('Detské seriály & rozprávky',     true, 100, 'sk', 2750, 'sk', '🧒', 'deti',     'Postavy, mená, príbehy, pesničky',                   'Rodinný pub quiz'),
('Hry & Hračky',                   true, 100, 'sk', 2760, 'sk', '🎠', 'deti',     'LEGO, Barbie, Monopoly — história, fakty',           'Rodinný pub quiz'),

-- ── 💬 DEEPTALKS ORIGINÁL ─────────────────────────────────────
('Čo vieš o svojej rodine?',       true, 100, 'sk', 2800, 'sk', '💬', 'deeptalks','Kto z rodiny...? Kedy sa narodil...? Čo zbiera...?','DeepTalks originál ⭐'),
('Náš vzťah — páry',               true, 100, 'sk', 2810, 'sk', '🧡', 'deeptalks','Kedy sme sa prvýkrát...? Kde to bolo...?',           'DeepTalks originál ⭐'),
('Kto z nás by...?',               true, 100, 'sk', 2820, 'sk', '👥', 'deeptalks','Kto by prežil zombie apokalypsu? Kto by skôr...?',   'Herd Vote originál ⭐'),
('Uhádni percentá',                true, 100, 'sk', 2830, 'sk', '🔢', 'deeptalks','Koľko % ľudí...? Guesspionage štýl',                 'Jackbox štýl ⭐'),
('Psychologické fakty',            true, 100, 'sk', 2840, 'sk', '🤔', 'deeptalks','Čo hovorí výskum o ľuďoch, vzťahoch, mozgu',         'DeepTalks originál ⭐'),
('Emócie & Reakčné typy',          true, 100, 'sk', 2850, 'sk', '🎭', 'deeptalks','Ako reaguješ? Čo by si urobil/a? Ktorý typ si?',     'DeepTalks originál ⭐'),
('Domácnosť & Spolunažívanie',      true, 100, 'sk', 2860, 'sk', '🏠', 'deeptalks','Kto robí čo doma? Zvyky, nezhody, rituály',          'Páry · rodiny ⭐'),
('Sny & Ambície',                  true, 100, 'sk', 2870, 'sk', '🌟', 'deeptalks','Kto by chcel...? Čo by urobil/a s miliónom?',        'DeepTalks originál ⭐'),
('Trápne momenty & Škandály',      true, 100, 'sk', 2880, 'sk', '😬', 'deeptalks','Čo si urobil/a prvýkrát? Najhoršia situácia?',       'Icebreaker ⭐'),
('Väčšina by...?',                 true, 100, 'sk', 2890, 'sk', '🗳️', 'deeptalks','Čo by väčšina v tejto miestnosti odpovedala?',       'Herd Vote core ⭐'),
('Detstvo & Spomienky',            true, 100, 'sk', 2900, 'sk', '🕰️', 'deeptalks','Čo si robil/a ako dieťa? Prvé spomienky?',           'Generácie · Legacy ⭐'),
('Hodnoty & Presvedčenia',         true, 100, 'sk', 2910, 'sk', '🌍', 'deeptalks','Čo je pre teba najdôležitejšie? Bez čoho nevieš žiť?','DeepTalks hlboké ⭐');

-- ═══════════════════════════════════════════════════════════════
-- OVERENIE — spusti po migrácii
-- ═══════════════════════════════════════════════════════════════
SELECT group_tag, COUNT(*) as pocet
FROM herd_categories
WHERE is_active = true
GROUP BY group_tag
ORDER BY pocet DESC;

-- Celkový počet (mal by byť ~130)
SELECT COUNT(*) as celkom FROM herd_categories WHERE is_active = true;
