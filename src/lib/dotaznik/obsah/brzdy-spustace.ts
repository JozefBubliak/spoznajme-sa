import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Brzdy a spúšťače vzrušenia — okruh „brzdy-spustace" v module A1
// „Mentálna príprava, túžba a dlhodobá intimita".
// Zdroj: „06_Brzdy_a_spustace_vzrusenia.docx" bol prázdny (len názov, žiadny
// obsah) — táto téma je preto napísaná od základu podľa dobre zavedeného
// psychoedukačného rámca „Dual Control Model" (akcelerátor / brzda vzrušenia),
// so zachovaním existujúcich L4 seedov modulu (kontexty ktoré zapínajú/vypínajú,
// strach z následkov, hnev, únava, alkohol). z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'silny', label: 'Silne to na mňa platí' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne / nevšímam si to' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'vobec', label: 'Vôbec' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Akcelerátor — čo túžbu zapína ────────────────────────────────────
const AKCELERATOR: Blok = {
  druh: 'skupina', id: 'akcelerator', nadpis: 'Môj akcelerátor — čo túžbu zapína',
  bloky: [
    {
      druh: 'otazka', id: 'akc_co', typ: 'viac', inePovolene: true,
      text: 'Čo u mňa najspoľahlivejšie naštartuje túžbu',
      moznosti: [
        { v: 'dovera_bezpecie', label: 'Pocit dôvery a bezpečia s partnerom' },
        { v: 'novota', label: 'Novota — nové miesto, technika, situácia' },
        { v: 'pozornost', label: 'Plná pozornosť partnera, byť „videný/á"' },
        { v: 'vzhlad', label: 'Vlastný pocit atraktivity / dobrý vzhľad' },
        { v: 'predstavivost', label: 'Fantázia a predstavivosť — aj bez dotyku' },
        { v: 'priama_stimulacia', label: 'Priama fyzická stimulácia (aj bez „nálady" vopred)' },
        { v: 'pochvala', label: 'Slovná pochvala alebo túžba počuť „chcem ťa"' },
        { v: 'napatie', label: 'Napätie z očakávania (flirt počas dňa, odkladanie)' },
      ],
    },
    p('akc_responzivna', 'Moja túžba je skôr responzívna — príde až počas stimulácie, nie vopred'),
    p('akc_spontanna', 'Moja túžba je skôr spontánna — príde sama, bez podnetu'),
  ],
}

// ── Brzda — čo túžbu vypína ───────────────────────────────────────────
const BRZDA: Blok = {
  druh: 'skupina', id: 'brzda', nadpis: 'Moja brzda — čo túžbu vypína',
  bloky: [
    {
      druh: 'otazka', id: 'brz_co', typ: 'viac', inePovolene: true,
      text: 'Čo u mňa najspoľahlivejšie vzrušenie vypne',
      moznosti: [
        { v: 'stres', label: 'Stres a starosti (práca, financie, deti)' },
        { v: 'strach_nasledkov', label: 'Strach z následkov (tehotenstvo, STI, „čo si o mne pomyslí")' },
        { v: 'hnev_konflikt', label: 'Hnev alebo nevyriešený konflikt' },
        { v: 'unava', label: 'Únava' },
        { v: 'telo_image', label: 'Nespokojnosť s vlastným telom v danej chvíli' },
        { v: 'tlak_na_vykon', label: 'Tlak na výkon / pozorovanie seba počas sexu' },
        { v: 'hluk_vyrusenie', label: 'Hluk, vyrušenie, strach že nás niekto počuje' },
        { v: 'rutina', label: 'Pocit, že „to je vždy rovnaké"' },
      ],
    },
    {
      druh: 'otazka', id: 'brz_alkohol', typ: 'jeden',
      text: 'Alkohol — ako naň reagujem',
      moznosti: [
        { v: 'uvolni', label: 'Malé množstvo uvoľní a pomôže brzde povoliť' },
        { v: 'vypne', label: 'Väčšie množstvo skôr vzrušenie vypne / otupí' },
        { v: 'nezalezi', label: 'Nemá na mňa výrazný vplyv' },
      ],
    },
    { druh: 'otazka', id: 'brz_ktore_najsilnejsie', typ: 'text', text: 'Ktoré 1–2 brzdy sú u mňa najsilnejšie a najčastejšie sa spúšťajú:' },
  ],
}

// ── Kontext ────────────────────────────────────────────────────────────
const KONTEXT: Blok = {
  druh: 'skupina', id: 'kontext', nadpis: 'Kontext — miesto, čas a energia',
  bloky: [
    {
      druh: 'otazka', id: 'kon_cas', typ: 'jeden',
      text: 'Kedy mám najviac priestoru pre túžbu',
      moznosti: [
        { v: 'rano', label: 'Ráno, s čerstvou energiou' },
        { v: 'vecer', label: 'Večer, keď je za nami deň' },
        { v: 'vikend', label: 'Cez víkend, bez časového tlaku' },
        { v: 'nezalezi', label: 'Nezáleží na čase, skôr na nálade' },
      ],
    },
    p('kon_cas_tlak', 'Časový tlak („musíme to stihnúť pred niečím") je pre mňa brzda'),
    p('kon_prostredie_bezpecie', 'Potrebujem pocit súkromia a bezpečia priestoru, inak sa neuvoľním'),
  ],
}

// ── Komunikácia o brzde ────────────────────────────────────────────────
const KOMUNIKACIA: Blok = {
  druh: 'skupina', id: 'komunikacia', nadpis: 'Keď sa brzda zapne — ako o tom hovoriť',
  bloky: [
    {
      druh: 'text', id: 'kom_info', ton: 'info',
      telo:
        'Brzda nie je odmietnutie partnera — je to signál tela alebo mysle. Pomenovanie brzdy nahlas ' +
        '(„som unavený/á", „mám v hlave prácu") je oveľa jednoduchšie zvládnuteľné než ticho a domnienky.',
    },
    {
      druh: 'otazka', id: 'kom_ako', typ: 'jeden',
      text: 'Ako najradšej dám vedieť, že mám práve zapnutú brzdu',
      moznosti: [
        { v: 'priamo', label: 'Priamo poviem, čo sa deje' },
        { v: 'signal', label: 'Radšej krátky dohodnutý signál/slovo' },
        { v: 'neverbalne', label: 'Neverbálne — partner to spozná sám' },
      ],
    },
    { druh: 'otazka', id: 'kom_pomaha', typ: 'text', text: 'Čo mi vtedy pomáha (čas, rozhovor, nesexuálna blízkosť, odložiť na inokedy):' },
  ],
}

export const BRZDY_SPUSTACE: TemaObsah = {
  slug: 'mentalna-priprava-tuzba/brzdy-spustace',
  nadpis: 'Brzdy a spúšťače vzrušenia (dual control)',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Akcelerátor a brzda',
      telo:
        'Vzrušenie funguje ako dva nezávislé systémy — akcelerátor (reaguje na sexuálne podnety) a brzda ' +
        '(reaguje na čokoľvek, čo vyhodnotí ako riziko alebo rozptýlenie). U každého sú inak citlivé. ' +
        'Nejde o to mať „silnejší" akcelerátor, ale poznať a rešpektovať vlastnú brzdu.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Prečo je to dôležité', ton: 'info',
      telo:
        'Nízka túžba často nie je „slabý akcelerátor" — je to aktívna brzda. Poznanie vlastných spúšťačov ' +
        'a brzdičov pomáha partnerovi vytvárať podmienky, v ktorých sa túžba objaví prirodzene, bez tlaku.',
    },
  ],
  telo: [
    AKCELERATOR,
    BRZDA,
    KONTEXT,
    KOMUNIKACIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom — je to mapa na spoločné vytváranie podmienok, nie hodnotenie.',
    },
  ],
}
