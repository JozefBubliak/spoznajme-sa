import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Predohra a naladenie — modul A4 „Predohra a stupňovanie".
// Zdroj: „09_Predohra_a_naladenie". Fyzická príprava a starostlivosť o telo,
// výber oblečenia, signály pripravenosti a očný kontakt, sexting/erotická
// komunikácia počas dňa, vedome dohodnutá iniciácia, polohy mimo spálne,
// dĺžka/tempo/poradie predohry, naladenie po konflikte a špeciálne kontexty.
// Zmyslová hra (zrak/sluch/čuch/chuť/hmat) má vlastný modul B4 „zmyslova-hra" —
// tu len stručný odkaz, nie duplikát. Iniciácia a signalizácia má vlastný
// modul A2 — tu len doplnok (nepriame prejavy, očný kontakt). Prostredie má
// vlastný modul A3 — tu nerozvádzané. Rituály a antirutina sú v „Dlhodobej
// intimite" (A1) — tu nerozvádzané. z/m verzia zrkadlová.
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

// ── Fyzická príprava a starostlivosť ───────────────────────────────────
const PRIPRAVA: Blok = {
  druh: 'skupina', id: 'priprava', nadpis: 'Fyzická príprava a starostlivosť o telo',
  bloky: [
    {
      druh: 'otazka', id: 'pri_telo', typ: 'viac',
      text: 'Starostlivosť o telo pred intímnymi chvíľami — čo je pre mňa dôležité',
      moznosti: [
        { v: 'kupel', label: 'Kúpeľ alebo sprcha' },
        { v: 'parfum', label: 'Parfum, oleje, krémy' },
        { v: 'vlasy', label: 'Úprava vlasov / brady / pokožky' },
        { v: 'intimne', label: 'Úprava intímnych partií (holenie, strihanie)' },
        { v: 'nezalezi', label: 'Nezáleží mi na tom, som prirodzený/á' },
      ],
    },
    {
      druh: 'otazka', id: 'pri_oblecenie', typ: 'viac', inePovolene: true,
      text: 'Aké oblečenie ma pri intímnych chvíľach najviac láka (nosiť aj vidieť na partnerovi)',
      moznosti: [
        { v: 'bielizen', label: 'Erotická spodná bielizeň' },
        { v: 'kostym', label: 'Kostýmy pre roleplay' },
        { v: 'pohodlne', label: 'Pohodlné domáce oblečenie' },
        { v: 'nahota', label: 'Nahota s dôrazom na prirodzenosť' },
      ],
    },
    p('pri_sebavedomie', 'Oblečenie / vlasy / detaily, ktoré mi dodávajú sebavedomie, sú pre mňa dôležité'),
  ],
}

// ── Signály pripravenosti ────────────────────────────────────────────
const SIGNALY: Blok = {
  druh: 'skupina', id: 'signaly', nadpis: 'Signály pripravenosti a očný kontakt',
  bloky: [
    {
      druh: 'otazka', id: 'sig_nepriame', typ: 'viac',
      text: 'Nepriame prejavy túžby, ktoré sú mi najpríjemnejšie',
      moznosti: [
        { v: 'dotyky', label: 'Nenápadné dotyky počas bežných aktivít' },
        { v: 'pohlady', label: 'Láskyplné pohľady a úsmevy' },
        { v: 'bozky', label: 'Bozky na ústa alebo iné časti tela' },
      ],
    },
    { druh: 'otazka', id: 'sig_frekvencia', typ: 'jeden', text: 'Ako často by som chcel(a) takéto gestá zažívať',
      moznosti: [
        { v: 'denne', label: 'Denne, ako súčasť každodenného života' },
        { v: 'obcas', label: 'Občas, podľa situácie' },
        { v: 'zriedka', label: 'Zriedka — uprednostňujem iné formy náklonnosti' },
      ],
    },
    {
      druh: 'otazka', id: 'sig_ocny_kontakt', typ: 'jeden',
      text: 'Význam očného kontaktu počas intímnych chvíľ',
      moznosti: [
        { v: 'velmi', label: 'Veľmi dôležitý — rád(a) sa pozerám do očí' },
        { v: 'obcas', label: 'Občas, záleží na situácii' },
        { v: 'nie', label: 'Nie, radšej mám oči zatvorené' },
      ],
    },
  ],
}

// ── Sexting a erotická komunikácia počas dňa ─────────────────────────
const SEXTING: Blok = {
  druh: 'skupina', id: 'sexting', nadpis: 'Sexting a erotická komunikácia počas dňa',
  bloky: [
    {
      druh: 'text', id: 'sexting_intro',
      telo:
        'Erotická komunikácia počas dňa je most medzi fantáziou a realitou — hravá správa, krátka hlasovka, ' +
        'nenápadný dotyk na verejnosti. Očakávanie sa stáva súčasťou predohry ešte predtým, než sa dotknete.',
    },
    {
      druh: 'otazka', id: 'sex_zaujem', typ: 'jeden',
      text: 'Záujem o výmenu erotických správ počas dňa',
      moznosti: [
        { v: 'ano', label: 'Áno, rád(a) flirtujem a budujem vzrušenie cez texty' },
        { v: 'mozno', label: 'Možno, ak je správny kontext a nálada' },
        { v: 'nie', label: 'Nie, preferujem osobný kontakt' },
      ],
    },
    {
      druh: 'otazka', id: 'sex_intenzita', typ: 'jeden',
      text: 'Preferovaná intenzita správ',
      moznosti: [
        { v: 'naznaky', label: 'Náznaky a jemné flirtovanie' },
        { v: 'priame', label: 'Priame a detailné popisy fantázií' },
      ],
    },
    {
      druh: 'otazka', id: 'sex_formy', typ: 'viac',
      text: 'Iné formy erotickej komunikácie okrem textu',
      moznosti: [
        { v: 'hlasovka', label: 'Hlasové správy so zvodným tónom' },
        { v: 'video', label: 'Videohovory na zdieľanie fantázií' },
        { v: 'foto', label: 'Erotická fotografia' },
        { v: 'listocek', label: 'Skrytý odkaz / lístoček' },
        { v: 'len_text', label: 'Nie, len text' },
      ],
    },
  ],
}

// ── Vedome dohodnutá iniciácia + polohy mimo spálne ──────────────────
const INICIACIA: Blok = {
  druh: 'skupina', id: 'iniciacia', nadpis: 'Vedome dohodnutá iniciácia',
  bloky: [
    {
      druh: 'otazka', id: 'ini_dohoda', typ: 'viac',
      text: 'Formy vedome dohodnutej iniciácie, ktoré ma lákajú',
      moznosti: [
        { v: 'vzajomna', label: 'Vzájomná dohoda, kto dnes začína' },
        { v: 'striedanie', label: 'Striedanie rolí (dominantný / submisívny)' },
        { v: 'ritual', label: 'Spoločný rituál začiatku (znamenie, veta, gesto)' },
      ],
    },
    {
      druh: 'otazka', id: 'ini_polohy_mimo', typ: 'viac',
      text: 'Polohy mimo spálne, ktoré by som chcel(a) vyskúšať',
      moznosti: [
        { v: 'gauc', label: 'Na gauči' },
        { v: 'sprcha', label: 'V sprche alebo vani' },
        { v: 'auto', label: 'V aute' },
        { v: 'vonku', label: 'Vonku (diskrétne)' },
        { v: 'nie', label: 'Nie, radšej zostávam v spálni' },
      ],
    },
    {
      druh: 'otazka', id: 'ini_pomocky_polohy', typ: 'viac',
      text: 'Pomôcky pri polohách mimo spálne',
      moznosti: [
        { v: 'vibrator', label: 'Vibrátory na klitoris alebo G-bod' },
        { v: 'bondage', label: 'Bondage pomôcky' },
        { v: 'vankuse', label: 'Polohovacie vankúše' },
        { v: 'nie', label: 'Nie, radšej bez pomôcok' },
      ],
    },
  ],
}

// ── Dĺžka, tempo a poradie predohry ──────────────────────────────────
const DLZKA_TEMPO: Blok = {
  druh: 'skupina', id: 'dlzka_tempo', nadpis: 'Dĺžka, tempo a poradie predohry',
  bloky: [
    {
      druh: 'otazka', id: 'dt_dlzka', typ: 'jeden',
      text: 'Koľko predohry zvyčajne potrebujem / chcem',
      moznosti: [
        { v: 'quickie', label: 'Quickie — rýchlo k veci' },
        { v: 'stredna', label: 'Stredne dlhá' },
        { v: 'dlha', label: 'Dlhá, „slow" predohra' },
        { v: 'vlny', label: 'Viac krátkych vĺn rozložených počas dňa' },
      ],
    },
    p('dt_tease_denial', 'Vedomé spomalenie — tease & denial, odkladanie penetrácie'),
    p('dt_synchronizacia', 'Sústredenie na dych a synchronizáciu s partnerom'),
    {
      druh: 'otazka', id: 'dt_poradie', typ: 'jeden',
      text: 'Preferované poradie predohry',
      moznosti: [
        { v: 'od_jemneho', label: 'Od jemného k dravému' },
        { v: 'striedanie', label: 'Striedanie intenzity' },
        { v: 'preskocit', label: '„Preskočiť rovno na…" — mám jasný obľúbený krok' },
      ],
    },
    { druh: 'otazka', id: 'dt_prve', typ: 'text', text: 'Čo pre mňa musí prísť ako prvé, aby predohra fungovala:' },
    {
      druh: 'otazka', id: 'dt_pocet_kol', typ: 'jeden',
      text: 'Počet kôl a pauzy',
      moznosti: [
        { v: 'jedno', label: 'Jedno súvislé kolo' },
        { v: 'viac', label: 'Viac kôl s pauzami' },
        { v: 'nezalezi', label: 'Nezáleží, podľa nálady' },
      ],
    },
  ],
}

// ── Naladenie po konflikte a špeciálne kontexty ──────────────────────
const KONFLIKT: Blok = {
  druh: 'skupina', id: 'konflikt', nadpis: 'Naladenie po konflikte a špeciálne kontexty',
  bloky: [
    {
      druh: 'otazka', id: 'kon_zmierovaci', typ: 'jeden',
      text: '„Zmierovací" sex po hádke',
      moznosti: [
        { v: 'ano', label: 'Áno, pomáha nám to sa zblížiť' },
        { v: 'doriesit', label: 'Potrebujem najprv konflikt doriešiť' },
        { v: 'nie', label: 'Nie, po hádke nie som naladený/á' },
      ],
    },
    p('kon_prepnutie', 'Vedomé prepnutie režimu — dohodnutý spôsob, ako z hádky prejsť späť k blízkosti'),
    {
      druh: 'otazka', id: 'kon_zdravotne', typ: 'jeden',
      text: 'Predohra pri zdravotnom obmedzení / únave — čo pomáha',
      moznosti: [
        { v: 'jemnejsie', label: 'Jemnejšie techniky, nižšie tempo' },
        { v: 'ine_polohy', label: 'Prispôsobenie polôh' },
        { v: 'nesexualne', label: 'Radšej nesexuálna blízkosť v takej chvíli' },
      ],
    },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const PREDOHRA_NALADENIE: TemaObsah = {
  slug: 'predohra-stupnovanie/predohra-stupnovanie',
  nadpis: 'Predohra a naladenie',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Naladenie ako súčasť zážitku',
      telo:
        'Predohra nezačína v posteli — začína starostlivosťou o telo, nepriamymi signálmi počas dňa a spoločným ' +
        'rituálom, ktorý oznámi „som pripravený/á". Táto téma sa venuje príprave, tempu a poradiu predohry.',
    },
    {
      druh: 'text', id: 'odkazy', nadpis: 'Súvisiace témy', ton: 'info',
      telo:
        'Zmyslová hra (zrak, sluch, čuch, chuť, hmat) má vlastnú tému „Zmyslová hra". Prostredie a atmosféra ' +
        'majú vlastnú tému „Prostredie a atmosféra". Denné rituály a antirutina sú v téme „Dlhodobá intimita vo vzťahu".',
    },
  ],
  telo: [
    PRIPRAVA,
    SIGNALY,
    SEXTING,
    INICIACIA,
    DLZKA_TEMPO,
    KONFLIKT,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
