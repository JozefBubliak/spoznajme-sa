import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Tabu témy a mantinely — modul I5.
// Zdroj: xlsm P49514 („Celkové tabu témy a práca s nimi — čo je absolútne nie,
// čo len fantázia, hranie s tabu, legálne vs. nelegálne, psychologický rámec"),
// P49516–49540 (Hranie s tabu a prekonávanie zábran: popis, čo je vzrušujúce,
// scenáre, 2 otázky, záver), P49610–49613 („Mantinely & nikdy": individuálne
// tabu pre pána/paniu — jasné nie a podmienené možno; všeobecné rizikové
// oblasti ako krv, moč). Blok „Hranie s tabu" presunutý sem z fantazie.ts
// (rovnaké id otázok). Obsah mriežky dotvorený.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

// ── Hranie s tabu a prekonávanie zábran ─────────────────────────────
const HRANIE: Blok = {
  druh: 'skupina', id: 'tabu', nadpis: 'Hranie s tabu a prekonávanie zábran',
  bloky: [
    {
      druh: 'text', id: 'tabu_info',
      telo:
        'Prekonávanie zábran a skúmanie tabuizovaných tém môže otvoriť nové dimenzie vzrušenia. ' +
        'Láka v tom adrenalín zo „zakázaného", pocit odvahy a intenzívny psychický zážitok.',
    },
    {
      druh: 'otazka', id: 'tabu_co_vzrusuje', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tabu vzrušuje',
      moznosti: [
        { v: 'limity', label: 'Prekonávanie vlastných limitov — je to oslobodzujúce' },
        { v: 'adrenalin', label: 'Adrenalín zo zakázaného' },
        { v: 'psychika', label: 'Psychická intenzita — odvaha a dôvera zároveň' },
        { v: 'spinavost', label: 'Pocit „špinavosti", robiť niečo, čo sa nemá' },
        { v: 'tajomstvo', label: 'Tajomstvo, ktoré máme len my dvaja' },
        { v: 'nic', label: 'Tabu ma nevzrušuje' },
      ],
    },
    {
      druh: 'otazka', id: 'tabu_diskusia', typ: 'jeden',
      text: 'Chcem diskutovať o svojich najtajnejších fantáziách s partnerom/kou',
      moznosti: [
        { v: 'ano', label: 'Áno, rád(a) sa podelím' },
        { v: 'potrebujem_cas', label: 'Možno, potrebujem na to čas' },
        { v: 'nie', label: 'Nie, necítim sa pri tom komfortne' },
      ],
    },
    {
      druh: 'otazka', id: 'tabu_skumanie', typ: 'jeden',
      text: 'Ako vnímam skúmanie tabuizovaných praktík všeobecne',
      moznosti: [
        { v: 'laka', label: 'Láka ma to, rád(a) by som ich preskúmal(a)' },
        { v: 'mozno_pripraveny', label: 'Možno, ak sa na to budem cítiť pripravený/á' },
        { v: 'nie', label: 'Nie, nemám o to záujem' },
      ],
    },
    {
      druh: 'otazka', id: 'tabu_scenare', typ: 'mrezka',
      text: 'Scenáre',
      riadky: [
        { v: 'diskusia', label: 'Diskusia o najtajnejších túžbach — čo z nich je realizovateľné' },
        { v: 'nove_miesta', label: 'Sex na nových, aj verejných miestach (diskrétne)' },
        { v: 'role', label: 'Roly a scény mimo bežných predstáv' },
        { v: 'jedna_vec', label: 'Každý raz za čas prinesie jednu vec, ktorú by sa bál(a) povedať' },
      ],
      stlpce: [
        { v: 'ano', label: 'Áno' },
        { v: 'mozno', label: 'Možno' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Mantinely — moja mapa tabu ──────────────────────────────────────
const MAPA_STLPCE: Moznost[] = [
  { v: 'nikdy', label: 'Nikdy' },
  { v: 'fantazia', label: 'Len fantázia / talk' },
  { v: 'mozno', label: 'Možno, za podmienok' },
  { v: 'ano', label: 'Áno' },
  { v: 'uz', label: 'Už robíme / máme radi' },
]

const MAPA: Blok = {
  druh: 'skupina', id: 'mapa', nadpis: 'Moja mapa tabu',
  uvod: 'Každý za seba. Rýchly prehľad naprieč témami — podrobnosti sú potom v jednotlivých témach.',
  bloky: [
    {
      druh: 'otazka', id: 'mapa_praktiky', typ: 'mrezka',
      text: 'Kde mám pri týchto oblastiach hranicu',
      riadky: [
        { v: 'bi', label: g('Interakcia s iným mužom', 'Interakcia s inou ženou') },
        { v: 'viac_muzov', label: 'Viac mužov naraz' },
        { v: 'viac_zien', label: 'Viac žien naraz' },
        { v: 'cudzi', label: 'Sex s cudzím človekom pred partnerom/kou' },
        { v: 'anal', label: 'Anál' },
        { v: 'bdsm_viazanie', label: 'Viazanie, znehybnenie' },
        { v: 'bitie', label: 'Bitie, výprask' },
        { v: 'facky', label: 'Facky' },
        { v: 'skrtenie', label: 'Škrtenie, ruka na krku' },
        { v: 'ponizovanie', label: 'Ponižovanie, nadávky' },
        { v: 'pluvanie', label: 'Pľuvanie' },
        { v: 'verejne', label: 'Sex na verejnosti' },
        { v: 'natacanie', label: 'Natáčanie, fotenie' },
        { v: 'cnc', label: 'Hra na znásilnenie (dohodnutý scenár)' },
        { v: 'vek_roly', label: 'Roly s vekovým rozdielom (učiteľ/ka, nevlastní)' },
        { v: 'moc', label: 'Úplná moc jedného nad druhým (24/7)' },
        { v: 'platba', label: 'Platený sex / roleplay prostitúcie' },
        { v: 'age_play', label: 'Age play, plienky' },
      ],
      stlpce: MAPA_STLPCE,
    },
    {
      druh: 'text', id: 'mapa_tekutiny_info', nadpis: 'Nie je za čo sa hanbiť', ton: 'info',
      telo:
        'Sliny, pot, vôňa tela, sperma, squirting, ba aj moč — pre mnohých ľudí sú to jedny z najvzrušujúcejších vecí na sexe. ' +
        'Nie je to „nechutné" ani „úchylné": ak to vzrušuje oboch, je to rovnako legitímne ako bozk. Robia to milióny ľudí každý deň, len o tom nahlas nehovoria.\n\n' +
        'Mýtus: „Kto chce zlatý dážď, má problém." — Realita: patrí medzi pomerne časté fetiše; láka na ňom teplo, intimita, odovzdanie alebo tabu samo osebe. ' +
        'Moč zdravého človeka na koži nie je nebezpečný; najjednoduchšie je začať v sprche alebo vani.\n\n' +
        'Mýtus: „Pľuvanie alebo mokré bozky sú ponižujúce." — Realita: pre niekoho áno a práve to ho vzrušuje, pre iného je to len vášeň. Rozhodujete vy dvaja.\n\n' +
        'Mýtus: „Sex počas menštruácie je nečistý." — Realita: veľa žien má vtedy vyššie libido a krv funguje ako lubrikant; stačí tmavá osuška alebo sprcha.',
    },
    {
      druh: 'otazka', id: 'mapa_tekutiny', typ: 'mrezka',
      text: 'Telesné tekutiny a hraničné oblasti',
      riadky: [
        { v: 'sperma', label: 'Sperma na tele / v ústach' },
        { v: 'squirt', label: 'Squirting' },
        { v: 'sliny', label: 'Sliny, mokré bozky' },
        { v: 'pot', label: 'Pot, pach tela' },
        { v: 'mens', label: 'Sex počas menštruácie' },
        { v: 'zlaty_dazd', label: 'Moč (zlatý dážď)' },
        { v: 'krv', label: 'Krv (škrabance, rezné hry)' },
        { v: 'scat', label: 'Výkaly' },
      ],
      stlpce: MAPA_STLPCE,
    },
    { druh: 'otazka', id: 'mapa_nikdy', typ: 'text', text: 'Moje absolútne NIE — čo nechcem ani v rozhovore:' },
    { druh: 'otazka', id: 'mapa_len_fantazia', typ: 'text', text: 'Čo je pre mňa len fantázia — rád(a) o tom počujem, ale nerobiť:' },
    { druh: 'otazka', id: 'mapa_podmienky', typ: 'text', text: 'Čo je „možno" — a za akých podmienok:' },
  ],
}

// ── Psychologický rámec ─────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Ako sa mi s tabu pracuje',
  bloky: [
    {
      druh: 'otazka', id: 'ram_posun', typ: 'jeden',
      text: 'Posúvajú sa moje hranice časom',
      moznosti: [
        { v: 'ano_casto', label: 'Áno, s dôverou sa otváram čoraz viac' },
        { v: 'pomaly', label: 'Pomaly, občas niečo' },
        { v: 'stabilne', label: 'Sú stabilné' },
        { v: 'zuzuju', label: 'Skôr sa zužujú' },
      ],
    },
    {
      druh: 'otazka', id: 'ram_vzrusenie', typ: 'jeden',
      text: 'Keď som veľmi vzrušený/á',
      moznosti: [
        { v: 'viac', label: 'Som ochotný/á ísť ďalej, než by som si myslel(a)' },
        { v: 'rovnako', label: 'Moje hranice ostávajú rovnaké' },
        { v: 'lutujem', label: 'Niekedy potom ľutujem, kam sme zašli' },
      ],
    },
    {
      druh: 'otazka', id: 'ram_hanba', typ: 'jeden',
      text: 'Po tabu zážitku mávam',
      moznosti: [
        { v: 'eufória', label: 'Eufóriu a blízkosť' },
        { v: 'zmiesane', label: 'Zmiešané pocity' },
        { v: 'hanba', label: 'Hanbu alebo výčitky' },
        { v: 'nezazil', label: 'Ešte som nič také nezažil(a)' },
      ],
    },
    {
      druh: 'otazka', id: 'ram_partner_tabu', typ: 'jeden',
      text: 'Keď partner/ka prizná tabu fantáziu, ktorú nezdieľam',
      moznosti: [
        { v: 'zaujem', label: 'Zaujíma ma, čo ho/ju na tom láka' },
        { v: 'talk', label: 'Môžeme to hrať aspoň slovne' },
        { v: 'neprekaza', label: 'Neprekáža mi, ak to ostane jeho/jej fantáziou' },
        { v: 'trapne', label: 'Je mi to nepríjemné' },
      ],
    },
  ],
}

export const TABU_MANTINELY: TemaObsah = {
  slug: 'tabu-mantinely/tabu-mantinely',
  nadpis: 'Tabu témy a mantinely',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'uvod', nadpis: 'Čo je absolútne nie, čo len fantázia a čo možno',
      telo:
        'Každý má iné tabu. Niekoho vzrušuje bitie, facky alebo ponižovanie, pre iného je to nepredstaviteľné — ' +
        'oboje je v poriadku. Táto téma je rýchla mapa naprieč všetkým: čo je pre mňa jasné nie, ' +
        'čo je len fantázia, čo možno za podmienok a čo áno.',
    },
  ],
  telo: [
    HRANIE,
    MAPA,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo:
        'Dynamika a intenzita sú kľúčom k nezabudnuteľným zážitkom — či ide o temno, rýchlosť, kontrolu alebo tabu. ' +
        'Výsledky zohľadnia len zhody. Čo niekto označí ako NIKDY, sa partnerovi nezobrazí.',
    },
  ],
}
