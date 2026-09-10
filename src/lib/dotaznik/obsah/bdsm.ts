import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// BDSM a mocenská dynamika — modul F1 „Dominancia / submisia" (celá F doména).
// Zdroj: „22_BDSM_a_mocenska_dynamika". D/s dynamika, verbálne hry a protokoly,
// bondage, impact play, senzorika/deprivácia, bradavky/svorky, kontrola orgazmu,
// gagy/nákrčníky, breath play (len screening), roleplay, anál v BDSM, skupiny,
// mini-scény, rámec a aftercare. z/m verzia zrkadlová (rovnaké id + hodnoty).
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
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})
const INT5: Moznost[] = [
  { v: '1', label: '1 — jemné' },
  { v: '2', label: '2' },
  { v: '3', label: '3 — stredné' },
  { v: '4', label: '4' },
  { v: '5', label: '5 — ostré' },
]

// ── Rola a dynamika ───────────────────────────────────────────────────
const ROLA: Blok = {
  druh: 'skupina', id: 'rola', nadpis: 'Rola a základná dynamika',
  bloky: [
    {
      druh: 'otazka', id: 'rola_ktora', typ: 'jeden',
      text: 'Akú rolu uprednostňuješ počas intímnych chvíľ?',
      moznosti: [
        { v: 'dom', label: 'Dominantnú — rada vediem a určujem tempo' },
        { v: 'sub', label: 'Submisívnu — rada sa odovzdávam a prijímam' },
        { v: 'switch', label: 'Switching — rada skúšam oboje' },
        { v: 'neviem', label: 'Zatiaľ neviem' },
      ],
    },
    {
      druh: 'otazka', id: 'rola_rozsah', typ: 'jeden',
      text: 'Aký rozsah',
      moznosti: [
        { v: 'korenie', label: '„Vanilla s korením" — občas prvky' },
        { v: 'sceny', label: 'Vyhradené scény' },
        { v: '247', label: 'Aj 24/7 prvky' },
      ],
    },
    p('rola_sub', 'Byť submisívny/a — poslúchať, podriadiť sa, nechať sa viesť'),
    p('rola_dom', 'Byť dominantný/a — prikazovať, viesť, určovať tempo, skúšať hranice'),
    p('rola_switch', 'Switching — role sa dynamicky vymenia (raz vedieš ty, raz partner)'),
    p('rola_power', 'Dohodnutá výmena moci (power exchange) — jeden odovzdá kontrolu na scénu'),
  ],
}

// ── Verbálne hranie a protokoly ─────────────────────────────────────
const VERBAL: Blok = {
  druh: 'skupina', id: 'verbal', nadpis: 'Verbálne hranie a protokoly',
  bloky: [
    p('verb_prikazy', 'Verbálne príkazy a komandovanie'),
    {
      druh: 'otazka', id: 'verb_oslovenia', typ: 'viac', inePovolene: true,
      text: 'Oslovenia, ktoré sedia',
      moznosti: [
        { v: 'meno', label: 'Meno' },
        { v: 'pan', label: '„Pane / Pani"' },
        { v: 'zlato', label: '„Zlato / miláčik"' },
        { v: 'petname', label: 'Pet-names' },
        { v: 'ziadne', label: 'Bez oslovení' },
      ],
    },
    p('verb_pochvala', 'Pochvala a odmeny (slovne)'),
    {
      druh: 'otazka', id: 'verb_ponizovanie', typ: 'jeden',
      text: 'Verbálne ponižovanie',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'jemne', label: 'Len jemné a striktne dohodnuté (presné slová)' },
        { v: 'nie', label: 'Nie — tvrdá hranica' },
      ],
    },
    {
      druh: 'otazka', id: 'verb_kde', typ: 'jeden',
      text: 'Kde platí dynamika',
      moznosti: [
        { v: 'scena', label: 'Len v scéne' },
        { v: 'aj_mimo', label: 'Aj mimo scény (protokol počas dňa)' },
        { v: 'nevieme', label: 'Nevieme' },
      ],
    },
    {
      druh: 'otazka', id: 'verb_protokol', typ: 'viac',
      text: 'Protokoly a rituály',
      moznosti: [
        { v: 'drzanie', label: 'Držanie tela' },
        { v: 'cakat', label: 'Čakať v polohe' },
        { v: 'povolenie', label: 'Povolenie na dotyk / na orgazmus' },
        { v: 'rules', label: '„Rules" počas dňa' },
        { v: 'ritual', label: 'Rituál začiatku a konca scény' },
      ],
    },
    { druh: 'otazka', id: 'verb_tabu', typ: 'text', text: 'Výrazy / slová, ktoré sú absolútne mimo:' },
  ],
}

// ── Bondage ──────────────────────────────────────────────────────────
const BONDAGE: Blok = {
  druh: 'skupina', id: 'bondage', nadpis: 'Bondage a obmedzenie pohybu',
  bloky: [
    p('bond_prijimam', 'Byť zviazaný/á — pocit odovzdania a bezmocnosti'),
    p('bond_poskytujem', 'Zväzovať partnera — jemne alebo pevne'),
    {
      druh: 'otazka', id: 'bond_intenzita', typ: 'jeden',
      text: 'Intenzita obmedzenia',
      moznosti: [
        { v: 'jemne', label: 'Jemné (šatky na rukách)' },
        { v: 'stredne', label: 'Stredné (putá, jemné laná)' },
        { v: 'intenzivne', label: 'Intenzívne (plné viazanie, väčšia kontrola)' },
      ],
    },
    {
      druh: 'otazka', id: 'bond_pomocky', typ: 'viac', inePovolene: true,
      text: 'Pomôcky',
      moznosti: [
        { v: 'satka', label: 'Šatka' },
        { v: 'manzety', label: 'Kožené manžety' },
        { v: 'kovove', label: 'Kovové putá' },
        { v: 'lana', label: 'Laná (shibari — základné)' },
        { v: 'pasky', label: 'Nelepivé bondážne pásky' },
        { v: 'popruhy', label: 'Pod-posteľné popruhy' },
        { v: 'spreader', label: 'Spreader bar (rozťahovacia tyč)' },
        { v: 'hrudnik', label: 'Bondáž hrudníka' },
      ],
    },
    {
      druh: 'otazka', id: 'bond_rozsah', typ: 'viac',
      text: 'Rozsah',
      moznosti: [
        { v: 'ruky_spolu', label: 'Ruky spolu' },
        { v: 'ruky_postel', label: 'Ruky o posteľ' },
        { v: 'roztiahnute', label: 'Roztiahnuté' },
        { v: 'stolicka', label: 'O stoličku' },
        { v: 'hogtie', label: '„Hogtie"' },
        { v: 'stoj', label: 'V stoji' },
      ],
    },
    {
      druh: 'otazka', id: 'bond_polohy', typ: 'viac',
      text: 'Polohy',
      moznosti: [
        { v: 'stolicka', label: 'Sed na stoličke' },
        { v: 'chrbat', label: 'Na chrbte s oporami' },
        { v: 'brucho', label: 'Na bruchu (vankúš pod panvou)' },
        { v: 'hrana', label: 'Hrana postele' },
      ],
    },
    {
      druh: 'otazka', id: 'bond_max_cas', typ: 'jeden',
      text: 'Maximálny čas',
      moznosti: [
        { v: 'minuty', label: 'Pár minút' },
        { v: '15', label: 'Do 15 minút' },
        { v: 'dlhsie', label: 'Dlhšie so „comfort-check" každých pár minút' },
      ],
    },
    {
      druh: 'otazka', id: 'bond_boundaries', typ: 'viac',
      text: 'Bezpečnostné hranice, na ktorých trvám',
      moznosti: [
        { v: 'klby', label: 'Bez bolesti kĺbov' },
        { v: 'dych', label: 'Bez zadržiavania dychu' },
        { v: 'noznice', label: 'Nožnice poruke' },
        { v: 'cirkulacia', label: 'Kontrola cirkulácie (prsty / farba)' },
        { v: 'gesto', label: 'Safe-gesto keď nemôžem hovoriť' },
      ],
    },
    {
      druh: 'otazka', id: 'bond_kto_vedie', typ: 'jeden',
      text: 'Kto vedie',
      moznosti: [
        { v: 'dom', label: 'Dominant/ka' },
        { v: 'striedanie', label: 'Striedanie' },
      ],
    },
  ],
}

// ── Impact play ─────────────────────────────────────────────────────
const IMPACT: Blok = {
  druh: 'skupina', id: 'impact', nadpis: 'Impact play (výprask)',
  bloky: [
    p('imp_prijimam', 'Prijímať výprask — bolesť, ktorá sa mení na rozkoš'),
    p('imp_poskytujem', 'Dávať výprask — jemne alebo intenzívne, sledovať reakcie'),
    {
      druh: 'otazka', id: 'imp_intenzita', typ: 'jeden',
      text: 'Intenzita',
      moznosti: [
        { v: '1', label: '1 — jemné symbolické' },
        { v: '2', label: '2 — rytmické stredné' },
        { v: '3', label: '3 — výraznejšie (podľa dohody)' },
      ],
    },
    {
      druh: 'otazka', id: 'imp_nastroje', typ: 'viac', inePovolene: true,
      text: 'Nástroje',
      moznosti: [
        { v: 'ruka', label: 'Ruka' },
        { v: 'placacka', label: 'Mäkká plácačka' },
        { v: 'paddle', label: 'Paddle' },
        { v: 'flogger', label: 'Krátky flogger' },
        { v: 'prut', label: 'Ratanový prút' },
        { v: 'opasok', label: 'Opasok' },
      ],
    },
    {
      druh: 'otazka', id: 'imp_zony', typ: 'viac',
      text: 'Zóny',
      moznosti: [
        { v: 'zadok', label: 'Zadok' },
        { v: 'stehna', label: 'Bočné stehná' },
        { v: 'nie_riziko', label: 'NIE obličky / chrbtica / kĺby' },
      ],
    },
    {
      druh: 'otazka', id: 'imp_rytmus', typ: 'jeden',
      text: 'Rytmus',
      moznosti: [
        { v: 'legato', label: 'Legato (plynulé)' },
        { v: 'pulzy', label: 'Pulzy' },
        { v: 'pauzy', label: 'Pauza na dotyk / pochvalu' },
        { v: 'pocitanie', label: 'Počítanie úderov' },
      ],
    },
    {
      druh: 'otazka', id: 'imp_zadok_tech', typ: 'viac',
      text: 'Techniky na zadku',
      moznosti: [
        { v: 'hladenie', label: 'Hladenie' },
        { v: 'skrabkanie', label: 'Škrabkanie' },
        { v: 'plesknutie', label: 'Plesknutie' },
        { v: 'striedanie', label: 'Striedanie hladenia a úderov' },
      ],
    },
    {
      druh: 'otazka', id: 'imp_vyznam', typ: 'viac',
      text: 'Význam',
      moznosti: [
        { v: 'funkcna', label: '„Funkčná" — rozohriatie' },
        { v: 'trestova', label: '„Trestová" scéna' },
        { v: 'katarzia', label: 'Katarzia' },
        { v: 'slzy', label: 'Slzy ako uvoľnenie sú OK' },
      ],
    },
    {
      druh: 'otazka', id: 'imp_postcare', typ: 'jeden',
      text: 'Po impacte',
      moznosti: [
        { v: 'masaz', label: 'Chcem masáž olejom / balzam' },
        { v: 'objatie', label: 'Objatie' },
        { v: 'nic', label: 'Nič, len chvíľu ticha' },
      ],
    },
    { druh: 'otazka', id: 'imp_kde_nie', typ: 'text', text: 'Kde na tele určite nie:' },
  ],
}

// ── Senzorika a deprivácia ─────────────────────────────────────────
const SENZORIKA: Blok = {
  druh: 'skupina', id: 'senzorika', nadpis: 'Senzorika a deprivácia zmyslov',
  bloky: [
    {
      druh: 'otazka', id: 'sen_kto', typ: 'jeden',
      text: 'Obmedzenie zmyslov',
      moznosti: [
        { v: 'ja_obmedzim', label: 'Chcem byť ten/tá, kto obmedzí zmysly' },
        { v: 'mne', label: 'Chcem, aby obmedzili mne' },
        { v: 'oboje', label: 'Oboje' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_prostriedky', typ: 'viac',
      text: 'Prostriedky',
      moznosti: [
        { v: 'paska', label: 'Páska na oči' },
        { v: 'stuple', label: 'Štuple do uší' },
        { v: 'sluchadla', label: 'Slúchadlá s bielym šumom' },
        { v: 'kukla', label: 'Kukla' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_textury', typ: 'viac',
      text: 'Textúry',
      moznosti: [
        { v: 'pierka', label: 'Pierka' },
        { v: 'hodvab', label: 'Hodváb' },
        { v: 'koza', label: 'Koža' },
        { v: 'nechty', label: 'Jemné nechty / škrabkanie' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_teplota', typ: 'viac',
      text: 'Teplota',
      moznosti: [
        { v: 'lad', label: 'Ľad' },
        { v: 'oleje', label: 'Teplé oleje' },
        { v: 'svieca', label: 'Masážne sviečky (nízkoteplotný vosk)' },
        { v: 'striedanie', label: 'Kontrastné striedanie' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_teplota_zony', typ: 'viac',
      text: 'Teplotné prvky — kde je to v poriadku',
      moznosti: [
        { v: 'pery_krk', label: 'Pery / krk' },
        { v: 'hrudnik', label: 'Hrudník' },
        { v: 'brucho', label: 'Brucho' },
        { v: 'stehna', label: 'Stehná' },
        { v: 'nie_tvar', label: 'NIE tvár' },
        { v: 'nie_genital', label: 'NIE genitálie' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_prekvapenie', typ: 'jeden',
      text: 'Prekvapenie vs. brief',
      moznosti: [
        { v: 'prekvapenie', label: 'Element prekvapenia (neviem, čo príde)' },
        { v: 'brief', label: 'Vopred brief, čo bude' },
        { v: 'mix', label: 'Mix' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_ritual', typ: 'viac',
      text: 'Senzorický rituál',
      moznosti: [
        { v: 'svetlo', label: 'Svetlo' },
        { v: 'hudba', label: 'Hudba' },
        { v: 'vone', label: 'Vône' },
        { v: 'ticho', label: 'Ticho' },
      ],
    },
  ],
}

// ── Bradavky a svorky ──────────────────────────────────────────────
const BRADAVKY: Blok = {
  druh: 'skupina', id: 'bradavky', nadpis: 'Bradavky a svorky',
  bloky: [
    {
      druh: 'otazka', id: 'brad_manual', typ: 'viac',
      text: 'Manuálne techniky',
      moznosti: [
        { v: 'lick', label: 'Lízanie' },
        { v: 'flick', label: 'Šľahanie jazykom / prstom' },
        { v: 'roll', label: 'Rolovanie medzi prstami' },
        { v: 'pinch', label: 'Štípanie' },
        { v: 'teplota', label: 'Spojenie s teplotou' },
      ],
    },
    {
      druh: 'otazka', id: 'brad_svorky', typ: 'jeden',
      text: 'Svorky na bradavky',
      moznosti: [
        { v: 'dotyk', label: 'Dotyk stačí, bez svoriek' },
        { v: 'klipsy', label: 'Svorky — klipsy' },
        { v: 'srobovacie', label: 'Svorky — šróbovacie (regulovateľné)' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'brad_cas', typ: 'jeden',
      text: 'Čas nosenia svoriek',
      moznosti: [
        { v: 'sekundy', label: 'Pár sekúnd' },
        { v: 'minuta', label: 'Do minúty' },
        { v: 'dlhsie', label: 'Dlhšie so signálmi „pridaj / uber / stop"' },
      ],
    },
    {
      druh: 'otazka', id: 'brad_kto', typ: 'jeden',
      text: 'Kto nasadzuje',
      moznosti: [
        { v: 'partner', label: 'Partner/ka' },
        { v: 'ja', label: 'Ja sám/sama' },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    { druh: 'otazka', id: 'brad_intenzita', typ: 'jeden', text: 'Intenzita', moznosti: INT5 },
    {
      druh: 'otazka', id: 'brad_po', typ: 'jeden',
      text: 'Po zložení svoriek',
      moznosti: [
        { v: 'dotyk', label: 'Upokojiť dotykom' },
        { v: 'teplo', label: 'Upokojiť teplom' },
        { v: 'nic', label: 'Nič' },
      ],
    },
  ],
}

// ── Kontrola orgazmu ──────────────────────────────────────────────
const ORGAZMUS: Blok = {
  druh: 'skupina', id: 'orgazmus', nadpis: 'Kontrola orgazmu',
  bloky: [
    p('oc_zaujem', 'Kontrola orgazmu (edging, denial, na povel)'),
    {
      druh: 'otazka', id: 'oc_ako', typ: 'viac',
      text: 'Ako',
      moznosti: [
        { v: 'zdrzovanie', label: 'Zdržovanie — spomaliť tempo tesne pred vrcholom' },
        { v: 'denial', label: '„Nesmieš, kým nedovolím" (denial)' },
        { v: 'povel', label: '„Teraz" (na povel)' },
        { v: 'pocitanie', label: 'Počítanie' },
        { v: 'ruined', label: '„Ruined" — dráždiť a prestať' },
        { v: 'dni', label: 'Zákaz na dni' },
        { v: 'nahlasovanie', label: 'Nahlasovanie masturbácie' },
      ],
    },
    {
      druh: 'otazka', id: 'oc_kto', typ: 'jeden',
      text: 'Kto kontroluje',
      moznosti: [
        { v: 'dom', label: 'Dominant/ka' },
        { v: 'ja', label: 'Ja' },
        { v: 'striedame', label: 'Striedame' },
      ],
    },
    p('oc_nasobne', 'Násobné orgazmy — pokračovať v stimulácii po prvom (overstim)'),
    p('oc_chastity', 'Chastity (klietka, časové rámce, kľúč u partnera)'),
  ],
}

// ── Gagy, nákrčníky, extra pomôcky ─────────────────────────────
const POMOCKY: Blok = {
  druh: 'skupina', id: 'pomocky', nadpis: 'Gagy, nákrčníky a extra pomôcky',
  bloky: [
    {
      druh: 'otazka', id: 'gag', typ: 'jeden',
      text: 'Náhubok / gag',
      moznosti: [
        { v: 'ball', label: 'Ball gag' },
        { v: 'bit', label: 'Bit gag' },
        { v: 'otvoreny', label: 'Otvorený náhubok' },
        { v: 'satka', label: 'Len šatka' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    p('nakrcnik', 'Nákrčník a vodítko ako symbol podriadenosti'),
    {
      druh: 'otazka', id: 'cbt', typ: 'jeden',
      text: 'CBT — stimulácia penisu a semenníkov s prvkom bolesti',
      podmienka: { pohlavie: 'm' },
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'jemne', label: 'Len jemne, za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'vakuum', typ: 'jeden',
      text: 'Prísavky na bradavky / klitoris, vákuum',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'podmienky', label: 'Za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'elektro', typ: 'jeden',
      text: 'E-stim / TENS',
      moznosti: [
        { v: 'teoreticky', label: 'Láka ma to teoreticky' },
        { v: 'edukacia', label: 'Za podmienok, s edukáciou' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Edge témy — len screening ─────────────────────────────────
const EDGE: Blok = {
  druh: 'skupina', id: 'edge', nadpis: '„Dark / edge" témy — len screening',
  uvod: 'Toto sú najrizikovejšie prvky. Nižšie je len záujem — nie návod. Do reality len s odbornou edukáciou a jasným rámcom; pri pochybnostiach voľte senzoriku a soft bondage.',
  bloky: [
    {
      druh: 'otazka', id: 'breath_play', typ: 'jeden',
      text: 'Breath play (obmedzenie dychu)',
      moznosti: [
        { v: 'fantazia', label: 'Láka ma len ako fantázia' },
        { v: 'trening', label: 'Možno s odborným tréningom a jasným rámcom' },
        { v: 'nie', label: 'Nie — tvrdá hranica v realite' },
      ],
    },
    {
      druh: 'otazka', id: 'cnc', typ: 'jeden',
      text: 'CNC / hrané donútenie (consensual non-consent)',
      moznosti: [
        { v: 'fantazia', label: 'Láka ma ako fantázia' },
        { v: 'scena', label: 'Ako scéna s detailným protokolom a hard-stopmi' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'fire_needles', typ: 'jeden',
      text: 'Fire-play / ihly / krv',
      moznosti: [
        { v: 'nezaujima', label: 'Nezaujíma ma to' },
        { v: 'fantazia', label: 'Len ako fantázia' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Roleplay so scenárom ──────────────────────────────────────
const ROLEPLAY: Blok = {
  druh: 'skupina', id: 'roleplay', nadpis: 'Roleplay so scenárom',
  bloky: [
    {
      druh: 'otazka', id: 'rp_scenare', typ: 'viac', inePovolene: true,
      text: 'Scenáre, ktoré ma lákajú',
      moznosti: [
        { v: 'sef', label: 'Šéf/ka – asistent/ka' },
        { v: 'policajt', label: 'Policajt – zadržaný' },
        { v: 'lekar', label: 'Lekár – pacient' },
        { v: 'trener', label: 'Prísny tréner' },
        { v: 'bar', label: 'Neznámi v bare' },
        { v: 'sluzobnicka', label: '„Služobníčka"' },
        { v: 'historicke', label: 'Historické / kostýmové' },
      ],
    },
    p('rp_kostymy', 'Kostýmy a rekvizity ako súčasť scény'),
    {
      druh: 'otazka', id: 'rp_kto_vedie', typ: 'jeden',
      text: 'Kto vedie scénu',
      moznosti: [
        { v: 'ja', label: 'Ja' },
        { v: 'partner', label: 'Partner/ka' },
        { v: 'scenar', label: 'Podľa scenára' },
      ],
    },
    {
      druh: 'otazka', id: 'rp_scenar_improv', typ: 'jeden',
      text: 'Scenár vs. improvizácia',
      moznosti: [
        { v: 'scenar', label: 'Vopred napísaný scenár' },
        { v: 'improv', label: 'Voľná improvizácia' },
        { v: 'ramec', label: 'Rámec + improvizácia' },
      ],
    },
  ],
}

// ── Anál v BDSM + skupiny + s inými ───────────────────────────
const KONTEXTY: Blok = {
  druh: 'skupina', id: 'kontexty', nadpis: 'Anál, skupiny a BDSM s inými',
  bloky: [
    p('anal_v_bdsm', 'Análne prvky v BDSM scéne (plug počas viazania, kolík počas orálu)'),
    {
      druh: 'otazka', id: 'anal_kto_ovlada', typ: 'jeden',
      text: 'Análny rytmus v scéne ovláda',
      moznosti: [
        { v: 'dom', label: 'Dominant/ka' },
        { v: 'ja', label: 'Ja' },
        { v: 'striedame', label: 'Striedame' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_konfig', typ: 'viac',
      text: 'Skupinové konfigurácie — čo ma láka (aj len ako fantázia)',
      moznosti: [
        { v: 'jeden_dom', label: 'Jeden dominant + viac submisívnych' },
        { v: 'viac_dom', label: 'Viac dominantov + jeden submisívny' },
        { v: 'hierarchia', label: 'Viacúrovňová hierarchia' },
        { v: 'majster_sluzky', label: 'Hra na majstra a slúžky' },
        { v: 'ziadne', label: 'Žiadne — len my dvaja' },
      ],
    },
    {
      druh: 'otazka', id: 'bdsm_ini', typ: 'jeden',
      text: 'BDSM prvky s inými ľuďmi',
      moznosti: [
        { v: 'nezvazujeme', label: 'Nezvažujeme' },
        { v: 'pozorujem', label: 'Len „pozorujem"' },
        { v: 'soft', label: 'Soft prvky s inými OK' },
        { v: 'plna', label: 'Plná účasť' },
      ],
    },
    { druh: 'otazka', id: 'bdsm_ini_tabu', typ: 'text', text: 'Čo je s inými absolútne tabu:' },
  ],
}

// ── Mini-scény ────────────────────────────────────────────────
const SCENY: Blok = {
  druh: 'skupina', id: 'sceny', nadpis: 'Mini-scény — čo ma láka',
  bloky: [
    p('scena_blindfold', '„Senzorický blindfold" (10 min) — páska na oči + pierko/ľad + šepot'),
    p('scena_soft_bondage', '„Soft bondage + ruka" (20–30 min) — putá/šatka, ruka na bradavky/stehná, tempo vlny'),
    p('scena_impact_ritual', '„Impact light s rituálom" (30–40 min) — warm-up, stupnica 1→3, po akcii masáž olejom'),
    p('scena_odovzdanie', '„Rituál odovzdania" — blindfold + putá + teplý vosk + slovný protokol'),
    p('scena_kontrola_zmyslov', '„Kontrola zmyslov" — páska na oči + štuple do uší + pierka/ľad'),
  ],
}

// ── Rámec, hranice, aftercare ────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec, hranice a aftercare',
  bloky: [
    {
      druh: 'otazka', id: 'ram_signaly', typ: 'viac',
      text: 'Signály a stop-mechanizmy',
      moznosti: [
        { v: 'safeword', label: 'Safe word (STOP)' },
        { v: 'semafor', label: 'Semafor (zelená / žltá / červená)' },
        { v: 'gesto', label: 'Neverbálne gesto (3× stisk, pustiť predmet)' },
        { v: 'pridaj', label: '„Pridaj / uber / stop"' },
      ],
    },
    { druh: 'otazka', id: 'ram_stopslovo', typ: 'text', text: 'Naše konkrétne stop-slovo a gesto:' },
    { druh: 'otazka', id: 'ram_tabu_globalne', typ: 'text', text: '„Nikdy" — globálne tvrdé hranice:' },
    { druh: 'otazka', id: 'ram_tabu_fantazia', typ: 'text', text: 'Čo láka len ako fantázia, nie realita:' },
    {
      druh: 'otazka', id: 'ram_zdravie', typ: 'viac',
      text: 'Zdravotné okolnosti, ktoré treba brať do úvahy',
      moznosti: [
        { v: 'koza', label: 'Citlivosť kože' },
        { v: 'krv', label: 'Lieky na riedenie krvi (opatrnosť pri impacte)' },
        { v: 'klby', label: 'Kĺby' },
        { v: 'dych', label: 'Dýchacie problémy' },
        { v: 'panika', label: 'Panické reakcie na stiesnenie' },
      ],
    },
    { druh: 'otazka', id: 'ram_aftercare', typ: 'text', text: 'Čo potrebujem po scéne (nápoj, teplo, objatie, rozhovor, samota) a na druhý deň (subdrop / topdrop):' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne, za podmienok):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const BDSM: TemaObsah = {
  slug: 'dominancia-submisia/dominancia-submisia',
  nadpis: 'BDSM a mocenská dynamika',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Čo je „light" BDSM a prečo láka',
      telo:
        'Dôvera, hra s kontrolou a intimitou, endorfíny. Bolestivé či intenzívne podnety môžu viesť k uvoľneniu hormónov šťastia. ' +
        'Kľúč je príprava scény a dôraz na aftercare — telo aj emócie potrebujú „dobehnúť".',
    },
    {
      druh: 'text', id: 'pravidla', nadpis: 'Pravidlá a jazyk hry', ton: 'vystraha',
      telo:
        'SSC / RACK, safe word alebo gesto, semafor (zelená = OK, žltá = spomaľ/zmeň, červená = STOP). ' +
        '„Stop bez otázok" ostáva vždy aktívne. Dohody vopred — čo áno / možno / nikdy. ' +
        'Aftercare a debrief: nápoj, prikrytie, objatie, kontrola kože, „2+2". Počítajte so subdrop / topdrop na druhý deň.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Čo z BDSM a mocenskej dynamiky chceš preskúmať?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'ds', label: 'D/s dynamika (dominancia / submisia / switching)' },
        { v: 'verbal', label: 'Verbálne hry a protokoly' },
        { v: 'bondage', label: 'Bondage a obmedzenie pohybu' },
        { v: 'impact', label: 'Impact play (výprask)' },
        { v: 'senzorika', label: 'Senzorika a deprivácia zmyslov' },
        { v: 'bradavky', label: 'Bradavky a svorky' },
        { v: 'orgazmus', label: 'Kontrola orgazmu' },
        { v: 'roleplay', label: 'Roleplay so scenárom' },
        { v: 'edge', label: 'Screening „edge" tém (breath play, CNC)' },
        { v: 'ziadne', label: 'Zatiaľ nič konkrétne — som zvedavý/á' },
      ],
    },
    ROLA,
    VERBAL,
    BONDAGE,
    IMPACT,
    SENZORIKA,
    BRADAVKY,
    ORGAZMUS,
    POMOCKY,
    ROLEPLAY,
    KONTEXTY,
    EDGE,
    SCENY,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'debrief', nadpis: 'Debrief „2+2"', ton: 'info',
      telo: 'Po scéne: dve veci super, dve na úpravu. Zapíšte si podmienky na nabudúce. Kedykoľvek je legitímne spomaliť alebo ukončiť.',
    },
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
