import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Zmyslová hra — modul B4 „Zmyslová hra".
// Zdroj: „11_Senzoricke_hranenie.docx" bol prázdny (len názov, žiadny
// obsah) — táto téma je preto napísaná od základu podľa existujúceho L4
// seedu modulu (zrak, sluch, čuch, chuť, hmat/teplota/textúra, layering
// a deprivácia). z/m verzia zrkadlová.
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

// ── Zrak ─────────────────────────────────────────────────────────────
const ZRAK: Blok = {
  druh: 'skupina', id: 'zrak', nadpis: 'Zrak — vizuál a jeho odopretie',
  bloky: [
    {
      druh: 'otazka', id: 'zra_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'zaviazane_oci', label: 'Zaviazané oči (odopretie zraku zvýrazní ostatné zmysly)' },
        { v: 'striptiz', label: 'Striptíz / pomalé vyzliekanie' },
        { v: 'zrkadlo', label: 'Sledovanie seba/partnera v zrkadle' },
        { v: 'vizualne_podnety', label: 'Vizuálne podnety (svetlo, farby, obraz)' },
        { v: 'ocny_kontakt', label: '„Pozeraj sa mi do očí" počas intimity' },
      ],
    },
    p('zra_odopretie', 'Odopretie zraku (tma, páska) mi pomáha uvoľniť sa a viac cítiť'),
  ],
}

// ── Sluch ─────────────────────────────────────────────────────────────
const SLUCH: Blok = {
  druh: 'skupina', id: 'sluch', nadpis: 'Sluch — zvuk a ticho',
  bloky: [
    {
      druh: 'otazka', id: 'slu_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'sepot', label: 'Šepot do ucha' },
        { v: 'dirty_talk_jemny', label: 'Jemný dirty talk' },
        { v: 'hudba', label: 'Hudba na pozadí' },
        { v: 'sluchova_deprivacia', label: 'Sluchová deprivácia (slúchadlá, biely šum)' },
        { v: 'ticho', label: 'Vedomé ticho — sústrediť sa len na dych a dotyk' },
      ],
    },
    p('slu_zvuky', 'Vlastné zvuky (dych, vzdychy) počas intimity si chcem vedome dovoliť, nepotláčať'),
  ],
}

// ── Čuch ─────────────────────────────────────────────────────────────
const CUCH: Blok = {
  druh: 'skupina', id: 'cuch', nadpis: 'Čuch — vône',
  bloky: [
    {
      druh: 'otazka', id: 'cuc_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'prirodzena_vona', label: 'Prirodzená vôňa tela a pohlavia' },
        { v: 'parfum_olej', label: 'Parfum / vonný olej na koži' },
        { v: 'feromony', label: 'Predstava feromónov a prirodzeného „chemického" priťahovania' },
        { v: 'vona_po_sexe', label: '„Vôňa po sexe" — nesprchovať sa hneď' },
        { v: 'aromaterapia', label: 'Aromaterapia (sviečky, esenciálne oleje) ako súčasť atmosféry' },
      ],
    },
  ],
}

// ── Chuť ─────────────────────────────────────────────────────────────
const CHUT: Blok = {
  druh: 'skupina', id: 'chut', nadpis: 'Chuť — ochutnávanie',
  bloky: [
    {
      druh: 'otazka', id: 'chu_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'bozky_ochutnavanie', label: 'Bozky s vedomým „ochutnávaním"' },
        { v: 'jedlo', label: 'Jedlo na tele (ovocie, šľahačka, med, čokoláda)' },
        { v: 'napoj', label: 'Prenášanie dúšku nápoja bozkom' },
        { v: 'telesne_tekutiny', label: 'Telesné tekutiny (opt-in, podľa preferencie)' },
      ],
    },
    { druh: 'otazka', id: 'chu_kde', typ: 'text', text: 'Ktoré chute a na ktorých miestach tela sú pre mňa lákavé:' },
  ],
}

// ── Hmat / teplota / textúra ──────────────────────────────────────────
const HMAT: Blok = {
  druh: 'skupina', id: 'hmat', nadpis: 'Hmat, teplota a textúra',
  bloky: [
    {
      druh: 'otazka', id: 'hma_teplota', typ: 'viac',
      text: 'Teplotné hry',
      moznosti: [
        { v: 'lad', label: 'Ľad' },
        { v: 'teply_olej', label: 'Teplý olej' },
        { v: 'striedanie', label: 'Striedanie teplého a studeného' },
      ],
    },
    {
      druh: 'otazka', id: 'hma_textury', typ: 'viac',
      text: 'Materiály a textúry na koži',
      moznosti: [
        { v: 'hodvab', label: 'Hodváb' },
        { v: 'koza', label: 'Koža' },
        { v: 'latex', label: 'Latex' },
        { v: 'pierko', label: 'Pierko' },
      ],
    },
    p('hma_vibracia', 'Jemná vibrácia mimo genitálií (krk, chrbát) ako súčasť senzorickej hry ma láka'),
    { druh: 'otazka', id: 'hma_kde_teplota', typ: 'text', text: 'Kde na tele áno a kde určite nie (najmä pri teplote):' },
  ],
}

// ── Layering a deprivácia ──────────────────────────────────────────
const LAYERING: Blok = {
  druh: 'skupina', id: 'layering', nadpis: 'Layering a deprivácia',
  bloky: [
    {
      druh: 'text', id: 'layering_info',
      telo:
        'Kombinovanie zmyslov (napr. zaviazané oči + šepot + ľad) alebo postupné odoberanie jedného zmyslu ' +
        'zosilňuje vnímanie ostatných. Ide o jemnú formu hry, nie o silovú kontrolu — vždy s možnosťou kedykoľvek prestať.',
    },
    {
      druh: 'otazka', id: 'lay_co', typ: 'viac',
      text: 'Čo by som chcel(a) skúsiť',
      moznosti: [
        { v: 'kombinacia', label: 'Kombinácia dvoch zmyslov naraz (napr. oči + dotyk)' },
        { v: 'postupne_odoberanie', label: 'Postupné odoberanie zmyslov v priebehu scény' },
        { v: 'jeden_zmysel', label: 'Radšej jeden zmysel naraz, bez kombinovania' },
      ],
    },
    p('lay_deprivacia_ok', 'Zmyslová deprivácia (páska, slúchadlá) mi je príjemná, pokiaľ viem, že môžem kedykoľvek prestať'),
  ],
}

// ── Rámec a bezpečie ───────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec a bezpečie',
  bloky: [
    { druh: 'otazka', id: 'ram_alergie', typ: 'text', text: 'Alergie alebo citlivosti na materiály/vône/oleje, ktoré treba zohľadniť:' },
    {
      druh: 'otazka', id: 'ram_signal', typ: 'jeden',
      text: 'Pri zmyslovom preťažení (príliš veľa naraz) preferujem',
      moznosti: [
        { v: 'slovo', label: 'Povedať to nahlas' },
        { v: 'gesto', label: 'Dohodnuté gesto (keď mám napr. zaviazané oči)' },
        { v: 'redukcia', label: 'Partner postupne uberá intenzitu bez toho, aby som musel(a) niečo hovoriť' },
      ],
    },
  ],
}

export const ZMYSLOVA_HRA: TemaObsah = {
  slug: 'zmyslova-hra/zmyslova-hra',
  nadpis: 'Zmyslová hra',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Päť brán k vzrušeniu',
      telo:
        'Zrak, sluch, čuch, chuť a hmat — každý zmysel je samostatná cesta k vzrušeniu a každý sa dá zosilniť, ' +
        'stlmiť alebo dočasne odobrať. Táto téma mapuje, ktoré zmyslové vrstvy ma najviac oslovujú.',
    },
    {
      druh: 'text', id: 'ramec_info', nadpis: 'Rámec', ton: 'info',
      telo: 'Akákoľvek forma dočasného odopretia zmyslu (páska, slúchadlá) je vždy opt-in a s možnosťou kedykoľvek prestať.',
    },
  ],
  telo: [
    ZRAK,
    SLUCH,
    CUCH,
    CHUT,
    HMAT,
    LAYERING,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
