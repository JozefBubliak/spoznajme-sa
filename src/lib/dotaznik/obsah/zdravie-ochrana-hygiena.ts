import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Zdravie, ochrana a hygiena — modul I2.
// Zdroj: „07_Bezpecnost_zdravie_a_hygiena.docx". Cyklus a menštruácia
// (odkaz na „Špecifické obdobia"), funkčné ťažkosti a bolesti (vaginizmus/
// dyspareúnia, ED/PE), mobilita/veľkosti tiel/neurodiverzita, alergie/lieky/
// pooperačné stavy, reflexia a denník starostlivosti, plus existujúce L4
// seedy modulu (antikoncepcia, STI, hygiena, bolesť vs nepohodlie).
// z/m verzia zrkadlová, niektoré otázky viazané na pohlavie.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'aktualne', label: 'Aktuálne sa ma to týka' },
  { v: 'niekedy', label: 'Občas / čiastočne' },
  { v: 'netyka', label: 'Netýka sa ma' },
]
const p = (id: string, text: TemaObsah['nadpis'], podmienka?: { pohlavie?: 'm' | 'z' }): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ, ...(podmienka ? { podmienka } : {}),
})

// ── Antikoncepcia a STI ─────────────────────────────────────────────
const OCHRANA: Blok = {
  druh: 'skupina', id: 'ochrana', nadpis: 'Antikoncepcia a STI',
  bloky: [
    {
      druh: 'otazka', id: 'och_metoda', typ: 'jeden',
      text: 'Metóda antikoncepcie a zodpovednosť',
      moznosti: [
        { v: 'hormonalna', label: 'Hormonálna (ona)' },
        { v: 'kondom', label: 'Kondóm' },
        { v: 'oboje', label: 'Kombinácia oboch' },
        { v: 'ine', label: 'Iná metóda' },
      ],
    },
    {
      druh: 'otazka', id: 'och_testovanie', typ: 'jeden',
      text: 'Testovanie na STI',
      moznosti: [
        { v: 'pravidelne', label: 'Pravidelne (aspoň raz ročne)' },
        { v: 'pri_zmene', label: 'Pri zmene partnera/situácie' },
        { v: 'nikdy', label: 'Zatiaľ nikdy' },
      ],
    },
    { druh: 'otazka', id: 'och_kondom_kedy', typ: 'jeden', text: 'Kondómy',
      moznosti: [
        { v: 'vzdy', label: 'Vždy' },
        { v: 'niektore', label: 'Pri niektorých aktivitách' },
        { v: 'v_par', label: 'V stálom páre po dohode nie' },
      ],
    },
  ],
}

// ── Hygiena ──────────────────────────────────────────────────────────
const HYGIENA: Blok = {
  druh: 'skupina', id: 'hygiena', nadpis: 'Hygiena',
  bloky: [
    {
      druh: 'otazka', id: 'hyg_kedy', typ: 'viac',
      text: 'Kedy je pre mňa sprcha dôležitá',
      moznosti: [
        { v: 'pred', label: 'Pred' },
        { v: 'po', label: 'Po' },
        { v: 'nezalezi', label: 'Nezáleží mi na tom' },
      ],
    },
    p('hyg_hracky', 'Čistenie a materiál hračiek (aj zdieľanie medzi sebou) mi je dôležité'),
    {
      druh: 'text', id: 'hyg_cross_clean', ton: 'vystraha',
      telo: 'Anál → nikdy späť k vulve bez výmeny ochrany alebo umytia rúk/hračky.',
    },
  ],
}

// ── Funkčné ťažkosti a bolesti ─────────────────────────────────────
const FUNKCNE: Blok = {
  druh: 'skupina', id: 'funkcne', nadpis: 'Funkčné ťažkosti a bolesti',
  bloky: [
    {
      druh: 'text', id: 'fun_info', ton: 'info',
      telo:
        'Bolesť pri sexe nikdy nie je „normálna daň" — je to signál. Rozdiel medzi „dobrou" intenzitou a varovaním ' +
        'je kľúčový a stojí za to o ňom hovoriť nahlas, aj s lekárom.',
    },
    {
      druh: 'otazka', id: 'fun_vaginizmus', typ: 'jeden', podmienka: { pohlavie: 'z' },
      text: 'Bolesť pri penetrácii (vaginizmus / dyspareúnia)',
      moznosti: [
        { v: 'netyka', label: 'Netýka sa ma' },
        { v: 'obcas', label: 'Občas sa vyskytne' },
        { v: 'casto', label: 'Často, riešim/chcem riešiť s odborníkom' },
      ],
    },
    { druh: 'otazka', id: 'fun_co_pomaha_z', typ: 'text', text: 'Čo pri bolesti/nepohodlí pomáha (viac času, iná poloha, prestať a skúsiť inokedy):' },
    {
      druh: 'otazka', id: 'fun_ed_pe', typ: 'jeden', podmienka: { pohlavie: 'm' },
      text: 'Erekcia alebo tempo vyvrcholenia',
      moznosti: [
        { v: 'netyka', label: 'Netýka sa ma' },
        { v: 'niekedy', label: 'Niekedy kolíše, chcem o tom vedieť hovoriť bez trápnosti' },
        { v: 'riesim', label: 'Riešim/chcem riešiť (stop-start, edging, prípadne odborník)' },
      ],
    },
    { druh: 'otazka', id: 'fun_dohoda', typ: 'text', text: 'Naša dohoda, ak sa niečo z toho stane počas aktu (žiadny tlak, prejsť na iné, skúsiť neskôr):' },
  ],
}

// ── Mobilita, veľkosti tiel a neurodiverzita ─────────────────────────
const MOBILITA: Blok = {
  druh: 'skupina', id: 'mobilita', nadpis: 'Mobilita, veľkosti tiel a neurodiverzita',
  bloky: [
    { druh: 'otazka', id: 'mob_obmedzenia', typ: 'text', text: 'Fyzické obmedzenia, ktoré ovplyvňujú polohy alebo tempo (kĺby, chrbát, výdrž):' },
    {
      druh: 'otazka', id: 'mob_opory', typ: 'viac',
      text: 'Čo mi uľahčuje pohodlie',
      moznosti: [
        { v: 'vankuse', label: 'Vankúše / kliny' },
        { v: 'okraj_postele', label: 'Nižší/vyšší okraj postele' },
        { v: 'pomalejsi_prechod', label: 'Pomalšie prechody medzi polohami' },
      ],
    },
    {
      druh: 'otazka', id: 'mob_senzitivita', typ: 'jeden',
      text: 'Citlivosť na dotyk/textúry/hluk/svetlo (neurodiverzita, precitlivenosť)',
      moznosti: [
        { v: 'netyka', label: 'Netýka sa ma' },
        { v: 'ano', label: 'Áno — potrebujem predvídateľnosť a jasné signály vopred' },
      ],
    },
    { druh: 'otazka', id: 'mob_idealny_cas', typ: 'text', text: 'Môj ideálny čas dňa a stav energie pre intimitu:' },
  ],
}

// ── Alergie, lieky, pooperačné stavy ──────────────────────────────────
const ALERGIE: Blok = {
  druh: 'skupina', id: 'alergie', nadpis: 'Alergie, lieky a pooperačné stavy',
  bloky: [
    {
      druh: 'otazka', id: 'ale_latex', typ: 'jeden',
      text: 'Alergia na latex alebo iné materiály',
      moznosti: [
        { v: 'nie', label: 'Nie' },
        { v: 'ano_latex', label: 'Áno — potrebujem alternatívu ku kondómom/rukaviciam' },
        { v: 'ano_ine', label: 'Áno — iný materiál (napíšem do poznámky)' },
      ],
    },
    { druh: 'otazka', id: 'ale_lieky', typ: 'text', text: 'Lieky, ktoré ovplyvňujú libido, vzrušenie alebo funkciu (voliteľné, len ak chcem zdieľať):' },
    {
      druh: 'otazka', id: 'ale_pooperacne', typ: 'text',
      text: 'Pooperačný stav alebo zdravotné obmedzenie vyžadujúce lekársky súhlas pred návratom k intimite:',
    },
  ],
}

// ── Bolesť vs. nepohodlie (kedy STOP) ─────────────────────────────
const BOLEST: Blok = {
  druh: 'skupina', id: 'bolest', nadpis: 'Bolesť vs. nepohodlie — kedy STOP',
  bloky: [
    {
      druh: 'otazka', id: 'bol_rozliseni', typ: 'jeden',
      text: 'Ako rozlišujem „dobrú" intenzitu od varovania',
      moznosti: [
        { v: 'jasne', label: 'Mám to jasné, viem to rozoznať' },
        { v: 'neisty', label: 'Nie vždy si som istý/á, chcem sa to naučiť' },
      ],
    },
    { druh: 'otazka', id: 'bol_po_akte', typ: 'text', text: 'Po akte — pálenie, nepohodlie alebo iné signály, ktoré neignorovať (a kedy ísť k lekárovi):' },
  ],
}

// ── Reflexia a denník starostlivosti ──────────────────────────────
const REFLEXIA: Blok = {
  druh: 'skupina', id: 'reflexia', nadpis: 'Reflexia a denník starostlivosti',
  bloky: [
    {
      druh: 'text', id: 'ref_info',
      telo: 'Krátky, pravidelný záznam pomáha všimnúť si vzorce skôr, než sa stanú problémom.',
    },
    { druh: 'otazka', id: 'ref_skore_telo', typ: 'jeden', text: 'Ako sa dnes cítim telesne (0 = zle, 5 = výborne)',
      moznosti: [
        { v: '0', label: '0' }, { v: '1', label: '1' }, { v: '2', label: '2' },
        { v: '3', label: '3' }, { v: '4', label: '4' }, { v: '5', label: '5' },
      ],
    },
    { druh: 'otazka', id: 'ref_super', typ: 'text', text: '3 veci, ktoré boli super:' },
    { druh: 'otazka', id: 'ref_upravit', typ: 'text', text: '1 vec na úpravu nabudúce:' },
  ],
}

export const ZDRAVIE_OCHRANA_HYGIENA: TemaObsah = {
  slug: 'zdravie-ochrana-hygiena/zdravie-ochrana-hygiena',
  nadpis: 'Zdravie, ochrana a hygiena',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Bezpečné telo je základ',
      telo:
        'Ochrana, hygiena a zdravotné obmedzenia nie sú prekážkou vzrušenia — sú rámcom, v ktorom sa dá vzrušenie ' +
        'bezpečne prežívať. Táto téma pokrýva antikoncepciu, STI, hygienu, bolesť/nepohodlie, telesnú rôznorodosť a reflexiu.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiaca téma', ton: 'info',
      telo: 'Cyklus, tehotenstvo, menopauza a ďalšie fázy života majú vlastnú tému „Špecifické obdobia a obmedzenia".',
    },
  ],
  telo: [
    OCHRANA,
    HYGIENA,
    FUNKCNE,
    MOBILITA,
    ALERGIE,
    BOLEST,
    REFLEXIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom. Zdravotné údaje zdieľaj len v rozsahu, v akom sa cítiš komfortne.',
    },
  ],
}
