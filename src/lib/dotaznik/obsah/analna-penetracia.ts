import type { TemaObsah, Blok, Moznost, Podmienka } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Anál a stimulácia zadku — modul D2 „Análna penetrácia".
// Zdroj: „17_Anal_a_stimulacia_zadku" (proper vetviaci dotazník — 4× opakovaný;
// zjednotené; úplnosť sa ešte audituje, pozri CONTENT-001 v progress dokumente). Oblasti:
// externá stimulácia, anilingus, prstovanie (rola + prostata), hračky,
// penetračný anál, DP, kombinácie, psychológia a preferencie.
// z / m verzia zrkadlová (rovnaké id + hodnoty). Prostata → len pohlavie 'm'.
// Rešerš análneho potešenia a hračiek (XLSM-015, 2026-10-01):
// - https://pubmed.ncbi.nlm.nih.gov/35767540/ — Anal Surfacing, Shallowing
//   a Pairing v reprezentatívnej vzorke 3 017 žien.
// - https://pubmed.ncbi.nlm.nih.gov/40463812/ — mapy erotogénnych oblastí
//   konečníka u mužov a žien; častá je povrchová predná oblasť.
// - https://pubmed.ncbi.nlm.nih.gov/23519588/ a
//   https://pubmed.ncbi.nlm.nih.gov/28796537/ — učenie, potešenie, zvedavosť,
//   stigma a rozdielne významy análnej hry pre ženy.
// - https://www.reddit.com/r/askgaybros/comments/ltolr9/
// - https://www.reddit.com/r/askgaybros/comments/muip0p/
// - https://www.reddit.com/r/askgaybros/comments/1vfhamm/
//   — komunitné rozdiely medzi plnosťou, pohybom, vibráciami, prostatickým
//   tlakom, nosením a diaľkovým ovládaním.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — neláka ma to' },
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
  uvod: 'Aj bez skúsenosti môžeš rozlíšiť, či ťa priťahuje dotyk zvonka, plytký tlak, plnosť, prostata, odovzdanie alebo zatiaľ iba samotná fantázia.',
  podmienka: { ot: 'skusenost', obsahuje: 'ziadna' },
  bloky: [
    {
      druh: 'otazka', id: 'en_fantazia', typ: 'jeden',
      text: 'Objavuje sa análna oblasť v tvojich fantáziách?',
      moznosti: [
        { v: 'ziadna', label: 'Nie, táto predstava sa v mojich fantáziách neobjavuje' },
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
        { v: 'podmienky', label: 'Možno — láka ma iba konkrétna podoba' },
        { v: 'fantazia', label: 'Chcem, aby to ostalo len fantázia' },
        { v: 'nekomfort', label: 'Necítim sa komfortne' },
      ],
    },
    {
      druh: 'otazka', id: 'en_ochota_podmienky', typ: 'text',
      text: 'Ktorá konkrétna podoba fantázie ma láka:',
      podmienka: { ot: 'en_ochota', je: 'podmienky' },
    },
    {
      druh: 'otazka', id: 'en_bariery', typ: 'viac', inePovolene: true,
      text: 'Čo je pre teba blok v ochote to skúsiť?',
      napoveda: 'Nič z toho nie je „zlé".',
      moznosti: [
        { v: 'bolest', label: 'Predstava nepríjemného telesného pocitu' },
        { v: 'hygiena', label: 'Telesnosť a prirodzenosť tejto oblasti ma nevzrušuje' },
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
      text: 'Aká atmosféra anilingusu ma láka?',
      moznosti: [
        { v: 'sprcha', label: 'Svieža, zmyselná a starostlivo pripravená' },
        { v: 'klystir', label: 'Spontánna a telesná bez veľkého rituálu' },
        { v: 'bariera', label: 'Hravá, jemná a skôr teasingová' },
        { v: 'prirodzenost', label: 'Veľmi prirodzená, mokrá a intenzívna' },
      ],
    },
    { druh: 'otazka', id: 'ani_hranice', typ: 'text', text: 'Najvzrušujúcejšia podoba anilingusu, ktorú si viem predstaviť:' },
  ],
}

// ── Prstovanie — prijímam ──────────────────────────────────────────────
const PRST_PRIJIMAM: Blok = {
  druh: 'skupina',
  id: 'prst_prijimam',
  nadpis: 'Prstovanie zadočku — prijímam',
  bloky: [
    {
      druh: 'otazka', id: 'prst_prijimam_minula_skusenost', typ: 'jeden',
      text: 'Ako hodnotíš svoju doterajšiu skúsenosť s prijímaním tejto stimulácie?',
      napoveda: 'Pýta sa na minulosť. To, čo chceš dnes, môže byť iné — aj príjemnú skúsenosť nemusíš chcieť opakovať.',
      podmienka: { ot: 'skusenost', obsahuje: 'prst_prijimam' },
      moznosti: [
        { v: 'velmi_prijemna', label: 'Veľmi príjemná' },
        { v: 'prijemna', label: 'Príjemná' },
        { v: 'bez_vyrazneho_pocitu', label: 'Ani príjemná, ani nepríjemná' },
        { v: 'zmiesana', label: 'Rôzne skúsenosti alebo zmiešané pocity' },
        { v: 'neprijemna', label: 'Nepríjemná' },
        { v: 'neviem', label: 'Neviem to zatiaľ zhodnotiť' },
      ],
    },
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
        { v: 'grip_rock', label: 'Grip & Rock — jedna ruka drží oporu pri otvore, druhá jemne "hojdá" panvu' },
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
        { v: 'anchor', label: 'Anchor — jeden prst drží príjemné miesto vnútri, druhá ruka pracuje zvonka' },
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
    postojOt('prst_poskytujem_postoj', g('Prstovať partnerke zadoček — poskytujem', 'Prstovať partnerovi zadoček — poskytujem')),
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
        { v: 'partner', label: g('Iniciuje partnerka', 'Iniciuje partner') },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    {
      druh: 'otazka', id: 'prst_poskyt_pokyny', typ: 'jeden',
      text: g('Preferujem jasné pokyny od partnerky', 'Preferujem jasné pokyny od partnera'),
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
      text: g('Rád by som to spojil s…', 'Rada by som to spojila s…'),
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
    {
      druh: 'text', id: 'hr_uvod', nadpis: 'Plnosť, vibrácie, pohyb alebo tajomstvo pod oblečením', ton: 'info',
      telo: g(
        'Análna hračka môže zostať nehybná a vytvárať pocit plnosti, pulzovať proti prostate, pohybovať sa pri každom stiahnutí svalov alebo odovzdať ovládanie partnerke. Erotické môže byť samotné zavádzanie, sledovanie jej reakcie, vedomie o skrytej hračke počas iného sexu aj chvíľa, keď sa korálky vytiahnu v rytme orgazmu.',
        'Análna hračka môže zostať nehybná a vytvárať pocit plnosti, vibrovať pri každom pohybe panvy alebo odovzdať ovládanie partnerovi. Erotické môže byť samotné zavádzanie, jeho pohľad na moju reakciu, tajomstvo skryté pod oblečením, súčasná vaginálna stimulácia aj vlnenie korálok počas orgazmu.',
      ),
    },
    postojOt('hr_prijimam', g('Prijímať análne hračky od partnerky', 'Prijímať análne hračky od partnera')),
    postojOt('hr_poskytujem', g('Zavádzať a ovládať análne hračky partnerke', 'Zavádzať a ovládať análne hračky partnerovi')),
    postojOt('hr_solo', 'Používať análne hračky pri sólo hre'),
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
        { v: 'dialkove', label: 'Diaľkovo alebo cez aplikáciu ovládaný kolík' },
        { v: 'rotacny', label: 'Rotačný alebo pulzujúci análny stimulátor' },
        { v: 'nafukovaci', label: 'Nafukovací kolík s meniteľným pocitom plnosti' },
        { v: 'trening', label: 'Sada stupňovaných kolíkov' },
        { v: 'prutik', label: 'Zakrivený análny prútik na presný vnútorný tlak' },
        { v: 'kov_sklo', label: 'Ťažšia kovová alebo sklenená hračka' },
        { v: 'chvost', label: 'Kolík s ozdobou, šperkom alebo chvostom' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_pocity', typ: 'viac', inePovolene: true,
      text: 'Ktoré pocity od análnej hračky ma lákajú?',
      moznosti: [
        { v: 'plnost', label: 'Nehybný pocit plnosti' },
        { v: 'otvor', label: 'Tlak a roztiahnutie najmä pri otvore' },
        { v: 'hlbka', label: 'Hlbší tlak vo vnútri' },
        { v: 'vibracie', label: 'Vibrácie šíriace sa panvou' },
        { v: 'pulzy', label: 'Pulzovanie alebo prírazy v rytme' },
        { v: 'rotacia', label: 'Rotácia alebo pohyb po vnútorných stenách' },
        { v: 'prostata', label: g('Presný tlak na prostatu', 'Tlak cez prednú stenu smerom k vagíne') },
        { v: 'hmotnost', label: 'Vnímať hmotnosť hračky pri pohybe tela' },
        { v: 'teplota', label: 'Teplý alebo chladný materiál ako zmyslový kontrast' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_tvar_material', typ: 'viac', inePovolene: true,
      text: 'Aký tvar a charakter hračky ma priťahuje?',
      moznosti: [
        { v: 'makka', label: 'Mäkká a pružná' },
        { v: 'pevna', label: 'Pevná a presná' },
        { v: 'hladka', label: 'Hladký povrch' },
        { v: 'textura', label: 'Výstupky, vlny alebo výrazná textúra' },
        { v: 'zuzeny_krk', label: 'Plnšie telo a úzky krk na nosenie' },
        { v: 'stupnovana', label: 'Postupne rastúce korálky alebo kužele' },
        { v: 'zakrivena', label: 'Zakrivenie na prednú vnútornú stenu' },
        { v: 'tazsia', label: 'Ťažšia hračka, ktorú cítiť pri každom pohybe' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_koralky', typ: 'jeden',
      text: 'Análne korálky — kedy vytiahnuť',
      moznosti: [
        { v: 'vydych', label: 'Na výdych' },
        { v: 'vyvrcholenie', label: 'Pri vyvrcholení (timing)' },
        { v: 'pred', label: 'Tesne pred orgazmom ako ďalšia vlna' },
        { v: 'postupne', label: 'Po jednej korálke v pomalom rytme' },
        { v: 'dnu_von', label: 'Pohybovať nimi dnu a von počas celej stimulácie' },
        { v: 'nezaujem', label: 'Nezáujem' },
      ],
    },
    postojOt('hr_plug_nosenie', 'Nosenie plugu — počas predohry, iného sexu alebo ako diskrétne erotické tajomstvo mimo spálne'),
    {
      druh: 'otazka', id: 'hr_kontexty', typ: 'viac', inePovolene: true,
      text: 'Kedy ma análne hračky lákajú najviac?',
      moznosti: [
        { v: 'solo', label: 'Pri sólo masturbácii' },
        { v: 'partner_zavadza', label: g('Keď mi ju zavádza partnerka', 'Keď mi ju zavádza partner') },
        { v: 'ja_zavadzam', label: g('Keď ju zavádzam partnerke a sledujem jej reakciu', 'Keď ju zavádzam partnerovi a sledujem jeho reakciu') },
        { v: 'oral', label: 'Počas orálu alebo manuálnej stimulácie' },
        { v: 'vaginalny', label: 'Súčasne s vaginálnou penetráciou' },
        { v: 'penis', label: 'Súčasne so stimuláciou penisu' },
        { v: 'orgazmus', label: 'Ako vrstva tesne pred orgazmom alebo počas neho' },
        { v: 'nosenie', label: 'Pri nosení pod oblečením' },
        { v: 'bdsm', label: 'Ako súčasť hry s mocou, úlohami alebo odovzdaním' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_ovladac', typ: 'jeden',
      text: 'Kto ovláda hračku',
      moznosti: [
        { v: 'ja', label: 'Ovládam ja' },
        { v: 'partner', label: g('Ovláda partnerka', 'Ovláda partner') },
        { v: 'striedavo', label: 'Striedavo' },
        { v: 'program', label: 'Automatický program alebo rytmus podľa hudby' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_bezpecnost', typ: 'viac',
      text: 'Ktoré podoby diaľkového ovládania ma lákajú?',
      moznosti: [
        { v: 'zakladna', label: 'Partner mení intenzitu, zatiaľ čo vidí moju reakciu' },
        { v: 'lub', label: 'Nečakané krátke vlny počas večera doma' },
        { v: 'kondom', label: 'Diskrétna hra na večeri, prechádzke alebo ceste' },
        { v: 'cistenie', label: 'Ovládanie na diaľku, keď nie sme na rovnakom mieste' },
        { v: 'material', label: 'Hra s úlohami alebo odmenou za reakciu' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_partner_tuzba', typ: 'jeden',
      text: g('Ako na mňa pôsobí, keď partnerka túži používať análnu hračku na mne alebo na sebe?', 'Ako na mňa pôsobí, keď partner túži používať análnu hračku na mne alebo na sebe?'),
      moznosti: [
        { v: 'silno', label: g('Jej zvedavosť a reakcia ma silno vzrušujú', 'Jeho zvedavosť a reakcia ma silno vzrušujú') },
        { v: 'rad', label: g('Rád jej hračku zavádzam, ovládam alebo ju prijímam', 'Rada mu hračku zavádzam, ovládam alebo ju prijímam') },
        { v: 'sledovat', label: g('Láka ma sledovať, ako ju používa sama', 'Láka ma sledovať, ako ju používa sám') },
        { v: 'vyber', label: 'Niektoré typy alebo roly ma lákajú, iné nie' },
        { v: 'fantazia', label: 'Vzrušuje ma to skôr ako fantázia než plán' },
        { v: 'neutral', label: g('Jej túžbu chápem, ale mňa osobne veľmi nevzrušuje', 'Jeho túžbu chápem, ale mňa osobne veľmi nevzrušuje') },
        { v: 'nie', label: 'Nechcem to zaradiť medzi naše zhody' },
      ],
    },
    {
      druh: 'text', id: 'hr_myty', nadpis: 'Mýty o análnych hračkách', ton: 'info',
      telo:
        'Mýtus: kolík je iba príprava na análny sex. Realita: pre veľa ľudí je plnosť, tlak pri otvore alebo tajomstvo nosenia samostatným cieľom bez pokračovania k penisu.\n\n' +
        'Mýtus: vibračná hračka musí automaticky stimulovať prostatu a vyvolať silný orgazmus. Realita: tvar a uhol rozhodujú rovnako ako vibrácie; niekto cíti prostatu okamžite, iný miluje iba plnosť alebo pohyb pri otvore.\n\n' +
        'Mýtus: análne korálky sú zaujímavé iba pri vyťahovaní počas orgazmu. Realita: rozdielne veľkosti môžu vytvárať vlny aj pri pomalom pohybe dnu a von alebo pri nehybnom držaní.\n\n' +
        'Mýtus: mužská túžba prijímať análnu hračku určuje orientáciu alebo mužnosť. Realita: konečník a prostata sú telesné zóny; erotická rola nie je test identity.\n\n' +
        'Mýtus: väčšia hračka je automaticky lepšia. Realita: niekto hľadá plnosť, iný presný tlak, vibráciu, pohyb alebo iba jemné „shallowing" tesne za otvorom.',
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
      text: 'Aké naladenie a vrstvenie ma pred análnou penetráciou láka?',
      moznosti: [
        { v: 'sprcha', label: 'Zmyselný rituál a pomalé očakávanie' },
        { v: 'klystir', label: 'Masáž zadku, stehien a hrádze' },
        { v: 'kondom', label: 'Anilingus ako prechod k penetrácii' },
        { v: 'lub', label: 'Veľmi mokrá a klzká hra' },
        { v: 'plug', label: 'Kolík alebo prsty ako prvá vrstva' },
        { v: 'dych', label: 'Spoločný rytmus dychu a pohybu' },
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
      text: 'Ktoré kontrasty pri análnej penetrácii ma lákajú?',
      moznosti: [
        { v: 'nikdy_vagina', label: 'Striedanie análnej hry s klitorisom, vagínou alebo penisom' },
        { v: 'bolest_stop', label: 'Jemný začiatok a neskôr výrazne dravšia intenzita' },
        { v: 'prestavky', label: 'Krátke nehybné pauzy medzi vlnami pohybu' },
        { v: 'regeneracia', label: 'Dlhá scéna s viacerými kolami a zmenami polôh' },
      ],
    },
  ],
}

// ── Pegging (rolová dynamika strap-onu) ──────────────────────────────
const PEGGING: Blok = {
  druh: 'skupina',
  id: 'pegging',
  nadpis: 'Pegging — keď ona penetruje jeho',
  podmienka: { pohlavie: 'm' },
  bloky: [
    {
      druh: 'text', id: 'peg_info',
      telo:
        'Pegging nie je o dokazovaní niečoho o identite — je o tom, čo sa stane, keď sa na chvíľu premiešajú role: kto vedie, ' +
        'kto prijíma, kto sa učí načúvať telu toho druhého. Tá istá praktika môže mať úplne inú emóciu podľa toho, ako si ju rámujete.',
    },
    postojOt('peg_postoj', 'Pegging (partnerka ma penetruje strap-onom) ma zaujíma'),
    {
      druh: 'otazka', id: 'peg_ramovanie', typ: 'jeden',
      text: 'Aké rámovanie by mi sedelo najviac',
      moznosti: [
        { v: 'nezna', label: 'Nežné, romantické — spoločné objavovanie' },
        { v: 'trening', label: '„Tréning" — postupné, trpezlivé zvykanie si' },
        { v: 'dominancia', label: 'Dominantná scéna — partnerka vedie s príkazmi' },
        { v: 'zvedavost', label: 'Čistá zvedavosť, bez veľkého rámca' },
      ],
    },
    postojOt('peg_prva_noc_light', 'Krátka „light" verzia peggingu s pomalým rytmom a dlhými nehybnými chvíľami'),
    { druh: 'otazka', id: 'peg_hranice', typ: 'text', text: 'Najvzrušujúcejšia rola, poloha a atmosféra peggingu, ktorú si viem predstaviť:' },
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
        { v: 'mozno', label: 'Možno — láka ma konkrétna podoba' },
        { v: 'ano', label: 'Áno, chcem to preskúmať' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    postojOt('komb_anilingus_prst', 'Anilingus + prst / plug súčasne'),
    postojOt('komb_public', 'Public play light — nositeľný plug alebo vajce ako diskrétne erotické tajomstvo mimo spálne'),
    { druh: 'otazka', id: 'komb_scenar', typ: 'text', text: 'Ako vyzerá môj ideálny spoločný scenár — miesto, dĺžka, kto prijíma, kto vedie a s čím sa hra kombinuje:' },
    {
      druh: 'text', id: 'komb_dilatacia_tip', ton: 'info',
      telo:
        'Stupňované kolíky dokážu vytvoriť vlastný erotický scenár: každý priemer má inú plnosť, hmotnosť a tlak pri otvore. ' +
        'Nemusí ísť o cestu k najväčšiemu rozmeru — niekoho najviac vzruší presný malý kolík, iného pocit postupných vĺn alebo chvíľa, keď partner vyberie ďalšiu veľkosť. ' +
        'Pri fistingu môže byť hlavným zážitkom nehybná ruka, jemné pulzy, pohyb panvy alebo psychológia odovzdania, nie rekord.',
    },
  ],
}

// ── Mapa túžby, prirodzenosť a tabu ─────────────────────────────────
const SEMAFOR: Blok = {
  druh: 'skupina',
  id: 'semafor',
  nadpis: 'Mapa túžby, prirodzenosť a tabu',
  bloky: [
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'Čo ma na análnej hre vzrušuje najviac:' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: g('Na čo som zvedavý, ale zatiaľ neviem, či sa mi to páči:', 'Na čo som zvedavá, ale zatiaľ neviem, či sa mi to páči:') },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'Čo ma neláka a nechcem to zaradiť medzi naše zhody:' },
    { druh: 'otazka', id: 'sem_stopslovo', typ: 'text', text: 'Slovo alebo veta, ktorú chcem pri análnej hre počuť:' },
    {
      druh: 'otazka', id: 'sem_hygiena', typ: 'jeden',
      text: 'Ako na mňa pôsobí prirodzená telesnosť análnej oblasti?',
      moznosti: [
        { v: '1', label: '1 — výrazne ma odpudzuje' },
        { v: '2', label: '2 — skôr ma ruší' },
        { v: '3', label: '3 — neutrálne' },
        { v: '4', label: '4 — prijímam ju ako súčasť erotiky' },
        { v: '5', label: '5 — prirodzenosť a tabu ma silno vzrušujú' },
      ],
    },
    {
      druh: 'otazka', id: 'sem_lubrikant', typ: 'jeden',
      text: 'Aký pocit klzkosti a mokrosti ma láka?',
      moznosti: [
        { v: 'vodny', label: 'Ľahký a prirodzený sklz' },
        { v: 'silikon', label: 'Veľmi hladký, dlhotrvajúci a mokrý pocit' },
        { v: 'hybrid', label: 'Hustejší, mäkký a obopínajúci pocit' },
        { v: 'testujeme', label: 'Láka ma skúšať rozdielne textúry' },
      ],
    },
    {
      druh: 'otazka', id: 'sem_bariery', typ: 'viac',
      text: 'Ktorý vizuál a pocit pri práci rukou alebo hračkou ma láka?',
      moznosti: [
        { v: 'rukavice', label: 'Čierne rukavice ako fetišový alebo profesionálny vizuál' },
        { v: 'kondom_prst', label: 'Hladký obalený prst a presný dotyk' },
        { v: 'kondom_hracka', label: 'Hladký povrch hračky bez výraznej textúry' },
        { v: 'bez', label: 'Priamy kontakt kože, prstov a prirodzených textúr' },
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
      text: g('Čo konkrétne vo mne vyvoláva náročné pocity, aby to partnerka pochopila:', 'Čo konkrétne vo mne vyvoláva náročné pocity, aby to partner pochopil:'),
      podmienka: { ot: 'sem_narocne', jeNiektora: ['dost', 'velmi'] },
    },
  ],
}

// ── Erotické vedenie a spätná väzba ─────────────────────────────────
const KOMUNIKACIA: Blok = {
  druh: 'skupina',
  id: 'komunikacia',
  nadpis: 'Erotické vedenie a spätná väzba',
  bloky: [
    {
      druh: 'otazka', id: 'kom_forma', typ: 'viac',
      text: 'Ako ma láka viesť tempo a intenzitu?',
      moznosti: [
        { v: 'slova', label: 'Priame erotické slová: „hlbšie", „drž", „pridaj"' },
        { v: 'semafor', label: 'Stupňovanie slovami: jemne, silnejšie, naplno' },
        { v: 'gesta', label: 'Pohybom panvy, rukou alebo stiahnutím svalov' },
        { v: 'vety', label: 'Opisovať partnerovi, čo práve cítim a chcem' },
      ],
    },
    {
      druh: 'otazka', id: 'kom_frekvencia', typ: 'jeden',
      text: 'Ako často chcem počas hry meniť alebo potvrdzovať vedenie?',
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
    {
      druh: 'otazka', id: 'kom_okamzity_switch', typ: 'text',
      text: 'Veta, ktorou chcem eroticky prejsť z penetrácie iba na vonkajší dotyk, masáž alebo anilingus:',
    },
    { druh: 'otazka', id: 'kom_pomenovania_ok', typ: 'text', text: 'Pomenovania tejto oblasti, ktoré sú pre mňa OK (anál/riť/zadoček...):' },
    { druh: 'otazka', id: 'kom_pomenovania_nie', typ: 'text', text: 'Pomenovania, ktoré nechcem počuť:' },
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
      text: g('Ako často by som análnu hru chcel', 'Ako často by som análnu hru chcela'),
      moznosti: [
        { v: 'casto', label: 'Často' },
        { v: 'nalada', label: 'Podľa nálady' },
        { v: 'bonus', label: 'Občas ako bonus' },
        { v: 'raz', label: 'Raz vyskúšať' },
        { v: 'nikdy', label: 'Nikdy' },
      ],
    },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chcem, aby partnerka vedela o mojej túžbe po análnej hre:', 'Čo chcem, aby partner vedel o mojej túžbe po análnej hre:') },
    { druh: 'otazka', id: 'pozn_bojim', typ: 'text', text: 'Ktorý pocit, vizuál alebo dynamika ma pri análnej hre úplne vypína:' },
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
      id: 'psychologicky_ramec',
      nadpis: 'Bez zmiešaných pocitov',
      ton: 'info',
      telo:
        'Análna oblasť má u oboch pohlaví husté nervové zakončenia a je citlivá sama osebe — záujem o jej stimuláciu ' +
        'nehovorí nič o sexuálnej orientácii ani o mužnosti. U muža stimulácia análnej oblasti (vrátane prostaty) ' +
        'nerovná sa homosexualita — je to len ďalšia príjemná zóna tela. Keď to obaja partneri takto chápu, môžu sa ' +
        'o téme rozprávať pokojne a rozhodnúť sa, či a ako do nej ísť, bez hanby alebo obáv „čo to o mne hovorí".',
    },
    {
      druh: 'text',
      id: 'statistiky',
      nadpis: 'Ako bežné to naozaj je',
      ton: 'info',
      telo:
        'Reprezentatívny prieskum v USA (PLOS ONE) zistil, že 43,5 % žien považuje nejakú formu análneho dotyku za príjemnú — ' +
        '40,3 % vonkajší dotyk, 34,6 % vnútornú stimuláciu, 28,3 % konkrétne partnerov prst vo vnútri. ' +
        'Medzi tými, čo si to obľúbili, väčšina (56–68 %) hovorí, že prvé pokusy príjemné neboli — obľuba prišla neskôr vďaka spôsobu, ' +
        'akým to partner robil, emocionálnemu prepojeniu, dostatku času na vzrušenie a dostatku lubrikantu. ' +
        'Austrálsky prieskum ASHR2 zistil, že 17 % ľudí malo v poslednom roku skúsenosť s análnou stimuláciou prstami. ' +
        'Francúzsky prieskum IFOP zistil, že 22 % žien už niekedy prstom penetrovalo partnera. ' +
        'Skrátka — nie je to okrajová záležitosť ani niečo, čo treba hneď „vedieť robiť": pre väčšinu ľudí je to zručnosť, ktorá sa buduje postupne.',
    },
    {
      druh: 'text',
      id: 'bezpecne',
      nadpis: 'Čo všetko môže análna hra znamenať',
      ton: 'info',
      telo:
        'Pre niekoho je jadrom jemný dotyk okolo otvoru, pre iného plytký tlak, pocit plnosti, pohyb hračky, prostata alebo vrstvenie s klitorisom, vagínou či penisom. ' +
        'Rovnaká praktika môže pôsobiť nežne, hravo, tabu, dominantne alebo úplne meditatívne. Kolík môže byť samostatný hlavný akt, tajomstvo pod oblečením, súčasť orálu, prvok odovzdania alebo iba nehybný tlak, ktorý zosilní orgazmus inde v tele.',
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
    PEGGING,
    KOMBINACIE,
    SEMAFOR,
    KOMUNIKACIA,
    KONTEXT,
  ],
  zaver: [
    {
      druh: 'text',
      id: 'aftercare',
      nadpis: 'Ako môže análna hra doznieť',
      ton: 'info',
      telo:
        'Hra môže skončiť vybratím hračky počas orgazmu, prechodom na jemný vonkajší dotyk, masážou zadku a krížov alebo tým, že malý kolík zostane ako tiché doznievanie. ' +
        'Pre niekoho je bodkou pocit prázdna po plnosti, pre iného ďalšie kolo orálu, masturbácie alebo pokojného telesného objatia.',
    },
    {
      druh: 'text',
      id: 'zaver',
      telo:
        'Výsledok ukáže spoločné podoby análnej hry — od dotyku zvonka po plnosť, vibrácie, prostatu a partnerské ovládanie — ktoré vzrušujú oboch.',
    },
  ],
}
