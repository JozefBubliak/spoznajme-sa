import type { TemaObsah, Blok, Moznost, Podmienka } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Anál a stimulácia zadku — modul D2 „Análna penetrácia".
// Zdroj: „17_Anal_a_stimulacia_zadku" (proper vetviaci dotazník — 4× opakovaný;
// zjednotené, každá odlišná otázka zachovaná). Pokrýva celú análnu doménu:
// externá stimulácia, anilingus, prstovanie (rola + prostata), hračky,
// penetračný anál, DP, kombinácie, bezpečnosť a aftercare.
// z / m verzia zrkadlová (rovnaké id + hodnoty). Prostata → len pohlavie 'm'.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — hranica' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const postojOt = (id: string, text: TemaObsah['nadpis'], podmienka?: Podmienka): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ, ...(podmienka ? { podmienka } : {}),
})

const INTENZITA5: Moznost[] = [
  { v: '1', label: '1 — jemne' },
  { v: '2', label: '2 — stredne' },
  { v: '3', label: '3 — dôrazne' },
  { v: '4', label: '4 — rázne' },
  { v: '5', label: '5 — vysoká intenzita' },
]

// ── „Ešte nie" vetva ─────────────────────────────────────────────────────
const ESTE_NIE: Blok = {
  druh: 'skupina',
  id: 'este_nie',
  nadpis: 'Fantázia a vnútorný postoj',
  uvod: 'Ak s análnou oblasťou zatiaľ nemáš skúsenosť. Fantázia ≠ záväzok — kedykoľvek môžeš zmeniť názor.',
  podmienka: { ot: 'skusenost', obsahuje: 'ziadna' },
  bloky: [
    {
      druh: 'otazka', id: 'en_fantazia', typ: 'jeden',
      text: 'Objavuje sa análna oblasť v tvojich fantáziách?',
      moznosti: [
        { v: 'silna', label: 'Je to moja silná / opakujúca sa fantázia' },
        { v: 'obcasna', label: 'Je to občasná predstava' },
        { v: 'zvedavy', label: g('Som zvedavý, ale nie je to súčasť mojich fantázií', 'Som zvedavá, ale nie je to súčasť mojich fantázií') },
      ],
    },
    {
      druh: 'otazka', id: 'en_pocit', typ: 'jeden',
      text: 'Keď si tú predstavu pripustíš, aký pocit v tebe vyvoláva?',
      moznosti: [
        { v: 'prijemny', label: 'Príjemný / vzrušujúci' },
        { v: 'zvedavy', label: 'Skôr zvedavý než vzrušujúci' },
        { v: 'neutralny', label: 'Neutrálny' },
        { v: 'rozpacity', label: 'Rozpačitý / zmiešaný' },
        { v: 'neprijemny_vracia', label: 'Skôr nepríjemný, ale aj tak sa mi vracia' },
      ],
    },
    {
      druh: 'otazka', id: 'en_ochota', typ: 'jeden',
      text: 'Ako to máš s prenesením do reality?',
      moznosti: [
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'vyskusam', label: 'Vyskúšam, ak po tom túžiš' },
        { v: 'podmienky', label: 'Možno, len za jasných podmienok' },
        { v: 'fantazia', label: 'Chcem, aby to ostalo len fantázia' },
        { v: 'nekomfort', label: 'Necítim sa komfortne' },
      ],
    },
    {
      druh: 'otazka', id: 'en_ochota_podmienky', typ: 'text',
      text: 'Za akých podmienok:',
      podmienka: { ot: 'en_ochota', je: 'podmienky' },
    },
    {
      druh: 'otazka', id: 'en_bariery', typ: 'viac', inePovolene: true,
      text: 'Čo je pre teba blok v ochote to skúsiť?',
      napoveda: 'Nič z toho nie je „zlé".',
      moznosti: [
        { v: 'bolest', label: 'Obava z bolesti' },
        { v: 'hygiena', label: 'Hygiena / čistota' },
        { v: 'hanba', label: 'Hanba / trápnosť' },
        { v: 'kontrola', label: 'Strata kontroly' },
        { v: 'odsudenie', label: 'Strach z odsúdenia' },
        { v: 'neviem', label: 'Neviem, ako na to' },
        { v: 'nic', label: g('Nič — som otvorený', 'Nič — som otvorená') },
      ],
    },
  ],
}

// ── Externá stimulácia ──────────────────────────────────────────────────
const EXTERNA: Blok = {
  druh: 'skupina',
  id: 'externa',
  nadpis: 'Vonkajšia stimulácia zadku (bez penetrácie)',
  bloky: [
    {
      druh: 'otazka', id: 'ext_dotyky', typ: 'viac', inePovolene: true,
      text: 'Aké dotyky na zadku ma lákajú?',
      moznosti: [
        { v: 'hladenie', label: 'Hladenie a masáž' },
        { v: 'skrabkanie', label: 'Škrabkanie nechtami' },
        { v: 'placnutie', label: 'Hravé plácnutie (light)' },
        { v: 'hryzenie', label: 'Hryzenie' },
        { v: 'teplota', label: 'Kombinácia s teplom / chladom' },
        { v: 'olej', label: 'Olej' },
        { v: 'textilie', label: 'Textílie (hodváb, pierko)' },
      ],
    },
    { druh: 'otazka', id: 'ext_intenzita', typ: 'jeden', text: 'Intenzita dotykov, ktorá mi vyhovuje', moznosti: INTENZITA5 },
    postojOt('ext_hradza', 'Tlak a masáž hrádze (perineum — externá stimulácia prostaty)'),
    {
      druh: 'otazka', id: 'ext_hradza_kombinacie', typ: 'viac',
      text: 'Hrádzu chcem stimulovať…',
      moznosti: [
        { v: 'oral', label: 'Súbežne s orálom' },
        { v: 'manual', label: 'Súbežne s manuálnou stimuláciou' },
        { v: 'samostatne', label: 'Samostatne' },
      ],
    },
  ],
}

// ── Anilingus ──────────────────────────────────────────────────────────
const ANILINGUS: Blok = {
  druh: 'skupina',
  id: 'anilingus',
  nadpis: 'Anilingus (jazyk na zadku)',
  bloky: [
    postojOt('ani_prijimam', 'Prijímať anilingus'),
    postojOt('ani_poskytujem', 'Poskytovať anilingus'),
    {
      druh: 'otazka', id: 'ani_techniky', typ: 'viac', inePovolene: true,
      text: 'Aké techniky preferujem?',
      moznosti: [
        { v: 'kruzenie', label: 'Jemné krúženie jazykom okolo otvoru' },
        { v: 'bozky', label: 'Kombinácia lízania a jemných bozkov' },
        { v: 'sanie', label: 'Jemné sanie' },
        { v: 'striedanie', label: 'Striedanie s bozkami na okolí' },
        { v: 'penetracia', label: 'Penetrácia jazykom' },
        { v: 's_prstom', label: 'Súčasne s prstom alebo kolíkom' },
        { v: 'od_okolia', label: 'Postup od okolia k otvoru' },
      ],
    },
    postojOt('ani_prostata', 'Anilingus súčasne s masážou prostaty', { pohlavie: 'm' }),
    {
      druh: 'otazka', id: 'ani_hygiena', typ: 'viac',
      text: 'Hygienické podmienky pre anilingus',
      moznosti: [
        { v: 'sprcha', label: 'Sprcha tesne predtým' },
        { v: 'klystir', label: 'Klystír podľa preferencie' },
        { v: 'bariera', label: 'Bariéra (koferdam)' },
        { v: 'prirodzenost', label: 'Prirodzenosť je OK' },
      ],
    },
    { druh: 'otazka', id: 'ani_hranice', typ: 'text', text: 'Anilingus — moje podmienky / čo určite nie:' },
  ],
}

// ── Prstovanie — prijímam ──────────────────────────────────────────────
const PRST_PRIJIMAM: Blok = {
  druh: 'skupina',
  id: 'prst_prijimam',
  nadpis: 'Prstovanie zadočku — prijímam',
  bloky: [
    postojOt('prst_prijimam_postoj', 'Cítiť prsty v zadočku počas predohry alebo sexu — prijímam'),
    {
      druh: 'otazka', id: 'prst_rozsah', typ: 'jeden',
      text: 'Rozsah, ktorý je pre mňa OK',
      moznosti: [
        { v: 'okraj', label: 'Len po okraj (zvonka)' },
        { v: 'spicka', label: 'Špička prsta na prahu' },
        { v: '1_bez', label: '1 prst krátko, bez pohybu' },
        { v: '1_pohyb', label: '1 prst s jemným pohybom' },
        { v: '2', label: '2 prsty' },
        { v: '3', label: '3 a viac prstov' },
        { v: 'viac', label: 'Viac (fisting)' },
      ],
    },
    { druh: 'otazka', id: 'prst_intenzita', typ: 'jeden', text: 'Intenzita (tlak)', moznosti: INTENZITA5 },
    {
      druh: 'otazka', id: 'prst_tempo', typ: 'jeden', text: 'Tempo pohybu',
      moznosti: [
        { v: 'pomale', label: 'Pomalé (≤ 30 / min)' },
        { v: 'plynule', label: 'Plynulé (31–60 / min)' },
        { v: 'rychlejsie', label: 'Rýchlejšie (61–90 / min)' },
        { v: 'rychle', label: 'Rýchle (90+ / min)' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_hlbka', typ: 'jeden', text: 'Preferovaná hĺbka (ak vnútri)',
      moznosti: [
        { v: 'pol', label: '≤ 0,5 článka' },
        { v: '1clanok', label: '~ 1 článok' },
        { v: 'cely', label: 'Celá dĺžka prsta' },
        { v: 'viac', label: 'Viac' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_rytmus', typ: 'viac',
      text: 'Rytmus a pohyb',
      moznosti: [
        { v: 'plynule', label: 'Plynulé ťahy' },
        { v: 'piston', label: 'Piston (krátke rýchle ťahy → pauza)' },
        { v: 'vlny', label: 'Vlny / „swell"' },
        { v: 'drzanie', label: 'Držanie bez pohybu' },
        { v: 'rotacia', label: 'Rotácia' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_tech_zvonka', typ: 'viac', inePovolene: true,
      text: 'Techniky zvonka (hrádza / okolie) — čo ma láka',
      moznosti: [
        { v: 'orbit', label: 'Orbit — plynulé krúženie 360° okolo otvoru' },
        { v: 'figure8', label: 'Figure-8 — osmičky cez hrádzu' },
        { v: 'press_hold', label: 'Press & Hold — pevný tlak 3–8 s na bode, ktorý „volá"' },
        { v: 'pulse', label: 'Pulse — krátke pulzy smerom k otvoru' },
        { v: 'edge_trace', label: 'Edge-Trace — sledovanie okraja špičkou prsta' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_tech_vnutri', typ: 'viac', inePovolene: true,
      text: 'Techniky vnútri — čo ma láka',
      moznosti: [
        { v: 'twist', label: 'Twist-In / Twist-Out — jemná rotácia pri vstupe / výstupe' },
        { v: 'wave', label: 'Wave — plynulé vlnenie dnu–von (0,5–2 cm)' },
        { v: 'piston', label: 'Piston — rýchle krátke ťahy, intervaly 5–15 → pauza' },
        { v: 'expand', label: 'Expand — 2 prsty: najprv paralelne, potom jemné roztváranie' },
        { v: 'come_hither', label: 'Come-Hither — krátke pritiahnutia smerom k pupku' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_kombinacie', typ: 'viac',
      text: 'Kombinácie („anal pairing")',
      moznosti: [
        { v: 'klitoris', label: 'Súbežná stimulácia klitorisu' },
        { v: 'pocas_piv', label: 'Počas vaginálnej penetrácie' },
        { v: 'penis', label: 'Súbežná stimulácia penisu, semenníkov' },
        { v: 'pocas_styku', label: 'Počas styku v polohách, ktoré to umožňujú' },
        { v: 'prostata', label: 'So zameraním na prostatu' },
        { v: 'bez', label: 'Bez kombinácií' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_polohy', typ: 'viac',
      text: 'Polohy na uvoľnenie',
      moznosti: [
        { v: 'bok', label: 'Na boku s pokrčenými kolenami' },
        { v: 'styri', label: 'Na štyroch' },
        { v: 'vankus', label: 'S vankúšom pod bokmi' },
        { v: 'chrbat', label: 'Na chrbte s nohami hore' },
        { v: 'spooning', label: 'Spooning' },
      ],
    },
  ],
}

// ── Prstovanie — poskytujem ────────────────────────────────────────────
const PRST_POSKYTUJEM: Blok = {
  druh: 'skupina',
  id: 'prst_poskytujem',
  nadpis: 'Prstovanie zadočku — poskytujem',
  bloky: [
    postojOt('prst_poskytujem_postoj', 'Prstovať partnerovi/ke zadoček — poskytujem'),
    {
      druh: 'otazka', id: 'prst_stupienky', typ: 'jeden',
      text: 'Čo si trúfam poskytovať',
      moznosti: [
        { v: 'spicka', label: 'Špička prsta na prahu' },
        { v: '1_2', label: '1–2 prsty' },
        { v: '3plus', label: '3 a viac prstov až po fisting' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_poskyt_iniciativa', typ: 'jeden',
      text: 'Iniciatíva',
      moznosti: [
        { v: 'ja', label: 'Iniciujem ja' },
        { v: 'partner', label: 'Iniciuje partner/ka' },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_poskyt_pokyny', typ: 'jeden',
      text: 'Preferujem jasné pokyny od partnera/ky',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'skor_ano', label: 'Skôr áno' },
        { v: 'skor_nie', label: 'Skôr nie' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    { druh: 'otazka', id: 'prst_poskyt_pomoc', typ: 'text', text: 'Jedna konkrétna vec, ktorá by mi to uľahčila:' },
  ],
}

// ── Prostata (P-bod) — muž ─────────────────────────────────────────────
const PROSTATA_PRIJIMAM: Blok = {
  druh: 'skupina',
  id: 'prostata_prijimam',
  nadpis: 'Prostata (P-bod) — prijímam',
  podmienka: { pohlavie: 'm' },
  bloky: [
    postojOt('pro_prst', 'Masáž prostaty prstom — prijímam'),
    postojOt('pro_hracka', 'Masáž prostaty pomôckou (análny vibrátor / stimulátor prostaty) — prijímam'),
    {
      druh: 'otazka', id: 'pro_zvonka_zvnutra', typ: 'jeden',
      text: 'Zvonka vs. zvnútra',
      moznosti: [
        { v: 'zvonka', label: 'Radšej zvonka (hrádza)' },
        { v: 'zvnutra', label: 'Zvnútra (prst / stimulátor)' },
        { v: 'oboje', label: 'Oboje' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_techniky', typ: 'viac', inePovolene: true,
      text: 'Techniky masáže prostaty — čo ma láka',
      moznosti: [
        { v: 'come_hither', label: 'Come-Hither — krátke pritiahnutia smerom k pupku' },
        { v: 'circle', label: 'Circle-on-Spot — malé krúžky priamo na bode' },
        { v: 'press_release', label: 'Press-Release — 2–4 s pevného tlaku → uvoľni → opakuj' },
        { v: 'pulse_hold', label: 'Pulse & Hold — 3–5 pulzov → 2–3 s podržať' },
        { v: 'sweep', label: 'Sweep — „zametanie" od okraja k stredu prostaty' },
        { v: 'clock', label: 'Clock-Mapping — mapovanie bodu' },
        { v: 'staticke', label: 'Statické držanie 10–20 s a sledovať dych' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_kombinacie', typ: 'viac',
      text: 'Kombinácie',
      moznosti: [
        { v: 'oral', label: 'Súčasne orál' },
        { v: 'penis', label: 'Súčasne manuálna stimulácia penisu' },
        { v: 'edging', label: 'Edging a preťahovanie' },
        { v: 'minimalna', label: 'Orgazmus aj pri minimálnej stimulácii penisu' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_polohy', typ: 'viac',
      text: 'Polohy',
      moznosti: [
        { v: 'bok', label: 'Na boku s pokrčenými kolenami' },
        { v: 'styri', label: 'Na štyroch' },
        { v: 'opora', label: 'Opora o okraj postele' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_kontrola', typ: 'jeden',
      text: 'Kto má kontrolu',
      moznosti: [
        { v: 'poskytujuci', label: 'Poskytujúci' },
        { v: 'ja', label: 'Ja (prijímam)' },
        { v: 'striedame', label: 'Striedame' },
      ],
    },
  ],
}
const PROSTATA_POSKYTUJEM: Blok = {
  druh: 'skupina',
  id: 'prostata_poskytujem',
  nadpis: 'Prostata — poskytujem',
  bloky: [
    postojOt('pro_poskytujem_postoj', 'Poskytnúť partnerovi masáž prostaty (prst / pomôcka)'),
    {
      druh: 'otazka', id: 'pro_poskyt_kombinacie', typ: 'viac',
      text: 'Rád(a) by som to spojil(a) s…',
      moznosti: [
        { v: 'oral', label: 'Orálom' },
        { v: 'masturbacia', label: 'Masturbáciou partnera' },
        { v: 'edging', label: 'Edgingom' },
      ],
    },
  ],
}

// ── Análne hračky ─────────────────────────────────────────────────────
const HRACKY: Blok = {
  druh: 'skupina',
  id: 'hracky',
  nadpis: 'Análne hračky',
  bloky: [
    postojOt('hr_prijimam', 'Análne hračky počas predohry alebo sexu — prijímam'),
    {
      druh: 'otazka', id: 'hr_typy', typ: 'viac', inePovolene: true,
      text: 'Ktoré hračky ma lákajú',
      moznosti: [
        { v: 'kolik_s', label: 'Kolík malý (S)' },
        { v: 'kolik_m', label: 'Kolík stredný (M)' },
        { v: 'kolik_l', label: 'Kolík veľký (L)' },
        { v: 'kolik_vibr', label: 'Vibračný kolík' },
        { v: 'plug_nos', label: 'Nositeľný plug (krátke intervaly)' },
        { v: 'koralky', label: 'Análne korálky (stupňované)' },
        { v: 'dildo', label: 'Análne dildo (zakrivené na P-bod)' },
        { v: 'stimulator', label: 'Prostatický stimulátor (vibračný / rotačný / hands-free)' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_koralky', typ: 'jeden',
      text: 'Análne korálky — kedy vytiahnuť',
      moznosti: [
        { v: 'vydych', label: 'Na výdych' },
        { v: 'vyvrcholenie', label: 'Pri vyvrcholení (timing)' },
        { v: 'nezaujem', label: 'Nezáujem' },
      ],
    },
    postojOt('hr_plug_nosenie', 'Nosenie plugu — pred aktom / počas vaginálneho sexu / diskrétne mimo domova („public play light")'),
    {
      druh: 'otazka', id: 'hr_ovladac', typ: 'jeden',
      text: 'Kto ovláda hračku',
      moznosti: [
        { v: 'ja', label: 'Ovládam ja' },
        { v: 'partner', label: 'Ovláda partner/ka' },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_bezpecnost', typ: 'viac',
      text: 'Bezpečnostné pravidlá, na ktorých trvám',
      moznosti: [
        { v: 'zakladna', label: 'Vždy základňa / stoper' },
        { v: 'lub', label: 'Veľa lubrikantu' },
        { v: 'kondom', label: 'Kondóm na hračke pri zdieľaní' },
        { v: 'cistenie', label: 'Čistenie a dezinfekcia medzi použitiami' },
        { v: 'material', label: 'Kompatibilita lubu s materiálom' },
      ],
    },
  ],
}

// ── Penetračný anál ───────────────────────────────────────────────────
const PENETRACNY: Blok = {
  druh: 'skupina',
  id: 'penetracny',
  nadpis: 'Penetračný anál',
  bloky: [
    postojOt('pen_prijimam', 'Análny styk (penisom / strap-onom) — prijímam'),
    postojOt('pen_poskytujem', 'Análny styk (penisom / strap-onom) — poskytujem'),
    {
      druh: 'otazka', id: 'pen_priprava', typ: 'viac',
      text: 'Príprava, na ktorej mi záleží',
      moznosti: [
        { v: 'sprcha', label: 'Sprcha' },
        { v: 'klystir', label: 'Klystír podľa preferencie' },
        { v: 'kondom', label: 'Kondóm' },
        { v: 'lub', label: 'Veľa lubrikantu' },
        { v: 'plug', label: 'Plug alebo prsty pred' },
        { v: 'dych', label: 'Dýchanie na výdych pri vniknutí' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_tempo', typ: 'jeden',
      text: 'Tempo',
      moznosti: [
        { v: 'velmi_pomaly', label: 'Veľmi pomaly, zastať pri odpore' },
        { v: 'plytko', label: 'Plytko dlho' },
        { v: 'hlboko_povel', label: 'Hlboko až keď poviem' },
        { v: 'bez_prekvapeni', label: 'Žiadne prekvapenia' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_polohy', typ: 'viac',
      text: 'Polohy',
      moznosti: [
        { v: 'bok', label: 'Na boku' },
        { v: 'zozadu', label: 'Zozadu („doggy")' },
        { v: 'styri', label: 'Na štyroch' },
        { v: 'chrbat', label: 'Na chrbte s nohami zdvihnutými' },
        { v: 'ja_hore', label: 'Ja hore (mám kontrolu)' },
        { v: 'spooning', label: 'Spooning' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_kontrola', typ: 'jeden',
      text: 'Kto vedie pohyb',
      moznosti: [
        { v: 'prijimam', label: 'Pohyb vediem ja (prijímam) — „ja sa nasadím"' },
        { v: 'poskytujuci', label: 'Vedie poskytujúci' },
        { v: 'striedame', label: 'Striedame' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_dokoncenie', typ: 'jeden',
      text: 'Dokončenie',
      moznosti: [
        { v: 'vnutri', label: 'Vo vnútri' },
        { v: 'von', label: 'Von' },
        { v: 'nezalezi', label: 'Nezáleží' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_bezpecnost', typ: 'viac',
      text: 'Bezpečnostné pravidlá, na ktorých trvám',
      moznosti: [
        { v: 'nikdy_vagina', label: 'Anál → vagína nikdy bez výmeny kondómu / rukavíc' },
        { v: 'bolest_stop', label: 'Bolesť = stop, nie „pretlačiť"' },
        { v: 'prestavky', label: 'Hygienické prestávky' },
        { v: 'regeneracia', label: 'Frekvencia a regenerácia' },
      ],
    },
  ],
}

// ── Kombinácie & scenáre ─────────────────────────────────────────────
const KOMBINACIE: Blok = {
  druh: 'skupina',
  id: 'kombinacie',
  nadpis: 'Kombinácie a scenáre',
  bloky: [
    postojOt('komb_dp', 'Dvojitá penetrácia (penis vo vagíne + hračka v anále / penis v anále + vibrátor vo vagíne)'),
    {
      druh: 'otazka', id: 'komb_fisting', typ: 'jeden',
      text: 'Análny fisting — kde som?',
      moznosti: [
        { v: 'fantazia', label: 'Len fantázia' },
        { v: 'mozno', label: 'Možno, s jasnými podmienkami' },
        { v: 'ano', label: 'Áno, s podmienkami' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    postojOt('komb_anilingus_prst', 'Anilingus + prst / plug súčasne'),
    postojOt('komb_public', 'Public play light — nositeľný plug / vajce s dohodnutými signálmi a časovými oknami'),
    { druh: 'otazka', id: 'komb_scenar', typ: 'text', text: 'Ako by mal vyzerať náš prvý spoločný pokus (miesto, dĺžka, kto prijíma, stop-signál):' },
  ],
}

// ── Bezpečie, semafor, tabu ─────────────────────────────────────────
const SEMAFOR: Blok = {
  druh: 'skupina',
  id: 'semafor',
  nadpis: 'Bezpečie, podmienky a tabu',
  bloky: [
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne, za podmienok):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'sem_stopslovo', typ: 'text', text: 'Naše stop-slovo / gesto (aj v hlučnom prostredí):' },
    {
      druh: 'otazka', id: 'sem_hygiena', typ: 'jeden',
      text: 'Komfort s hygienou / čistotou',
      moznosti: [
        { v: '1', label: '1 — veľké obavy' },
        { v: '2', label: '2' },
        { v: '3', label: '3 — stredne' },
        { v: '4', label: '4' },
        { v: '5', label: '5 — som úplne v pohode' },
      ],
    },
    {
      druh: 'otazka', id: 'sem_lubrikant', typ: 'jeden',
      text: 'Lubrikant',
      moznosti: [
        { v: 'vodny', label: 'Vodný' },
        { v: 'silikon', label: 'Silikónový' },
        { v: 'hybrid', label: 'Hybrid' },
        { v: 'testujeme', label: 'Testujeme' },
      ],
    },
    {
      druh: 'otazka', id: 'sem_bariery', typ: 'viac',
      text: 'Bariéry',
      moznosti: [
        { v: 'rukavice', label: 'Rukavice' },
        { v: 'kondom_prst', label: 'Kondóm na prst' },
        { v: 'kondom_hracka', label: 'Kondóm na hračku' },
        { v: 'bez', label: 'Bez (dohoda)' },
      ],
    },
    {
      druh: 'otazka', id: 'sem_narocne', typ: 'jeden',
      text: 'Náročné pocity pri tejto téme',
      moznosti: [
        { v: 'vobec', label: 'Vôbec' },
        { v: 'trochu', label: 'Trochu' },
        { v: 'dost', label: 'Dosť' },
        { v: 'velmi', label: 'Veľmi' },
      ],
    },
    {
      druh: 'otazka', id: 'sem_narocne_text', typ: 'text',
      text: 'Čo konkrétne (aby to partner vedel):',
      podmienka: { ot: 'sem_narocne', jeNiektora: ['dost', 'velmi'] },
    },
  ],
}

// ── Komunikácia ──────────────────────────────────────────────────────
const KOMUNIKACIA: Blok = {
  druh: 'skupina',
  id: 'komunikacia',
  nadpis: 'Komunikácia a spätná väzba',
  bloky: [
    {
      druh: 'otazka', id: 'kom_forma', typ: 'viac',
      text: 'Forma signálov',
      moznosti: [
        { v: 'slova', label: 'Kľúčové slová („pomalšie", „drž", „pauza")' },
        { v: 'semafor', label: 'Semafor (zelená / žltá / červená)' },
        { v: 'gesta', label: 'Dohodnuté gestá / dotyk' },
        { v: 'vety', label: 'Krátke vety' },
      ],
    },
    {
      druh: 'otazka', id: 'kom_frekvencia', typ: 'jeden',
      text: 'Frekvencia spätnej väzby',
      moznosti: [
        { v: 'priebezne', label: 'Priebežne' },
        { v: 'kroky', label: 'Po kľúčových krokoch' },
        { v: 'zmena', label: 'Po každej zmene tempa alebo polohy' },
      ],
    },
    {
      druh: 'otazka', id: 'kom_pokyny', typ: 'jeden',
      text: 'Aké pokyny preferujem',
      moznosti: [
        { v: 'detailne', label: 'Priebežné detailné pokyny' },
        { v: 'jemne', label: 'Jemné usmernenia priebežne' },
        { v: 'potvrdenia', label: 'Potvrdenia v kľúčových momentoch' },
        { v: 'kratke', label: 'Krátke kľúčové slová podľa dohody' },
      ],
    },
  ],
}

// ── Kontext + poznámky ──────────────────────────────────────────────
const KONTEXT: Blok = {
  druh: 'skupina',
  id: 'kontext',
  nadpis: 'Kedy a kontext',
  bloky: [
    {
      druh: 'otazka', id: 'ctx_kedy', typ: 'viac',
      text: 'Kedy análnu hru chcem',
      moznosti: [
        { v: 'solo', label: 'Sólo' },
        { v: 'spolu', label: 'Spolu' },
        { v: 'pocas_piv', label: 'Počas PIV (vaginálnej penetrácie)' },
        { v: 'predohra', label: 'Počas predohry' },
        { v: 'samostatne', label: 'Ako samostatná scéna' },
        { v: 'mimo', label: 'Mimo domova' },
      ],
    },
    {
      druh: 'otazka', id: 'ctx_frekvencia', typ: 'jeden',
      text: 'Ako často by som análnu hru chcel(a)',
      moznosti: [
        { v: 'casto', label: 'Často' },
        { v: 'nalada', label: 'Podľa nálady' },
        { v: 'bonus', label: 'Občas ako bonus' },
        { v: 'raz', label: 'Raz vyskúšať' },
        { v: 'nikdy', label: 'Nikdy' },
      ],
    },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
    { druh: 'otazka', id: 'pozn_bojim', typ: 'text', text: 'Čoho sa bojím / čo ma úplne odradí:' },
  ],
}

export const ANALNA_PENETRACIA: TemaObsah = {
  slug: 'analna-penetracia/analna-penetracia',
  nadpis: 'Anál a stimulácia zadku',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text',
      id: 'preco',
      nadpis: 'Prečo análne hry',
      telo:
        'Spektrum zážitkov — od zmyslových dotykov po intenzívne prežitky. „Light → pokročilé": komfort sa rozširuje postupne. ' +
        'Análna oblasť má husté nervové zakončenia; pre mnoho párov je to akt dôvery a nová úroveň intimity.',
    },
    {
      druh: 'text',
      id: 'bezpecne',
      nadpis: 'Bezpečne a s pôžitkom',
      ton: 'vystraha',
      telo:
        'Veľa lubrikantu (ideálne silikónový; vodný je OK, no rýchlejšie schne) a priebežné dopĺňanie. ' +
        'Krátke nechty alebo rukavice, pomalý vstup, trpezlivosť, dýchanie na výdych pri vniknutí. ' +
        'Semafor / dohodnuté gesto, malé „OK?" check-iny. ' +
        'Anál → vagína nikdy bez výmeny ochrany. Krátka hygienická rutina pred hrou (toaleta, teplá sprcha, pokojná hlava), uterák poruke.',
    },
  ],
  telo: [
    {
      druh: 'otazka',
      id: 'skusenost',
      typ: 'viac',
      text: 'Aká je tvoja skúsenosť s análnou oblasťou?',
      napoveda: 'Môžeš označiť viac možností.',
      moznosti: [
        { v: 'ziadna', label: 'Nemám žiadnu skúsenosť' },
        { v: 'externe', label: 'Externá stimulácia (dotyky, hrádza)' },
        { v: 'anilingus', label: 'Anilingus' },
        { v: 'prst_prijimam', label: 'Prstovanie — prijímam' },
        { v: 'prst_poskytujem', label: 'Prstovanie — poskytujem' },
        { v: 'hracky', label: 'Análne hračky' },
        { v: 'penetracny', label: 'Penetračný anál' },
        { v: 'prostata', label: 'Stimulácia prostaty' },
      ],
    },
    ESTE_NIE,
    EXTERNA,
    ANILINGUS,
    PRST_PRIJIMAM,
    PRST_POSKYTUJEM,
    PROSTATA_PRIJIMAM,
    PROSTATA_POSKYTUJEM,
    HRACKY,
    PENETRACNY,
    KOMBINACIE,
    SEMAFOR,
    KOMUNIKACIA,
    KONTEXT,
  ],
  zaver: [
    {
      druh: 'text',
      id: 'aftercare',
      nadpis: 'Aftercare',
      ton: 'info',
      telo:
        'Po scéne: ticho, nápoj, jemná masáž brucha alebo krížov. Debrief „2+2" — dve veci super, dve na úpravu. ' +
        'Pri intenzívnejšej hre počítaj s „dropom" na druhý deň a krátkym check-inom.',
    },
    {
      druh: 'text',
      id: 'zaver',
      telo:
        'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí — ' +
        'zostáva len to, čo je pre vás oboch v poriadku a vzrušujúce.',
    },
  ],
}
