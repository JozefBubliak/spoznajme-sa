import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Kontext vzťahu a životná situácia — modul I4 (nový, doplnený do domény
// I „Hranice, zdravie a telo").
// Zdroj: „03_Konstelacia_vztahu_a_zivotna_situacia.docx" bol prázdny (len
// názov, žiadny obsah) — táto téma je preto napísaná od základu. Ide o
// všeobecný „intake" rámec — kontext, ktorý ovplyvňuje všetky ostatné témy
// (fáza vzťahu, deti, práca, bývanie, zdravie, skúsenosti, motivácia
// vyplniť tento dotazník). Domény H7 (CNM/ENM) rieši štruktúru vzťahu
// (monogamia/polyamoria) — tu sa nerozvádza, len odkaz.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'aktualne', label: 'Áno, to je naša situácia' },
  { v: 'ciastocne', label: 'Čiastočne / niekedy' },
  { v: 'netyka', label: 'Netýka sa nás' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Dĺžka a fáza vzťahu ──────────────────────────────────────────────
const FAZA: Blok = {
  druh: 'skupina', id: 'faza', nadpis: 'Dĺžka a fáza vzťahu',
  bloky: [
    {
      druh: 'otazka', id: 'faz_dlzka', typ: 'jeden',
      text: 'Ako dlho sme spolu',
      moznosti: [
        { v: 'do_1', label: 'Menej než rok' },
        { v: '1_5', label: '1–5 rokov' },
        { v: '5_15', label: '5–15 rokov' },
        { v: 'nad_15', label: 'Viac než 15 rokov' },
      ],
    },
    {
      druh: 'otazka', id: 'faz_stav', typ: 'jeden',
      text: 'Kde sa práve nachádzame',
      moznosti: [
        { v: 'novy', label: 'Nový vzťah, spoznávame sa' },
        { v: 'stabilny', label: 'Stabilné dlhodobé obdobie' },
        { v: 'po_krize', label: 'Po kríze alebo náročnom období — obnovujeme dôveru' },
        { v: 'po_prestavke', label: 'Po dlhšej pauze v intimite (choroba, odlúčenie, hádka)' },
        { v: 'druhy_vztah', label: 'Vzťah po predchádzajúcom vzťahu / s deťmi z iného vzťahu' },
      ],
    },
    p('faz_prvykrat', 'Toto je prvý vzťah, v ktorom takto podrobne hovoríme o intímnych preferenciách'),
  ],
}

// ── Životná situácia ──────────────────────────────────────────────────
const SITUACIA: Blok = {
  druh: 'skupina', id: 'situacia', nadpis: 'Životná situácia',
  bloky: [
    {
      druh: 'otazka', id: 'sit_deti', typ: 'jeden',
      text: 'Deti a súkromie',
      moznosti: [
        { v: 'bez_deti', label: 'Bez detí doma' },
        { v: 'male_deti', label: 'Malé deti — súkromie je vzácne' },
        { v: 'starsie_deti', label: 'Staršie deti / dospievajúci — iný typ obmedzení' },
        { v: 'odrastene', label: 'Deti už odrastené / mimo domácnosti' },
      ],
    },
    {
      druh: 'otazka', id: 'sit_praca', typ: 'jeden',
      text: 'Pracovné a časové zaťaženie',
      moznosti: [
        { v: 'vysoke', label: 'Vysoké — málo energie na intimitu počas týždňa' },
        { v: 'stredne', label: 'Stredné, zvládateľné' },
        { v: 'flexibilne', label: 'Flexibilné, priestoru je dosť' },
      ],
    },
    {
      druh: 'otazka', id: 'sit_byvanie', typ: 'jeden',
      text: 'Bývanie',
      moznosti: [
        { v: 'sami', label: 'Bývame sami, plné súkromie' },
        { v: 'rodina', label: 'Zdieľame domácnosť s rodičmi / rodinou' },
        { v: 'spoluByvajuci', label: 'So spolubývajúcimi' },
        { v: 'oddelene', label: 'Dočasne bývame oddelene (práca, štúdium)' },
      ],
    },
    p('sit_vzdialenost', 'Riešime dlhšie obdobia fyzickej vzdialenosti od seba (LDR, pracovné cesty)'),
    { druh: 'otazka', id: 'sit_zdravie_celkovo', typ: 'text', text: 'Celkový zdravotný stav / energia, ktoré aktuálne ovplyvňujú našu intimitu:' },
  ],
}

// ── Skúsenosti a očakávania ────────────────────────────────────────
const SKUSENOSTI: Blok = {
  druh: 'skupina', id: 'skusenosti', nadpis: 'Skúsenosti a očakávania',
  bloky: [
    {
      druh: 'otazka', id: 'sku_skusenost', typ: 'jeden',
      text: 'Moja celková skúsenosť so skúmaním vlastných preferencií',
      moznosti: [
        { v: 'velka', label: 'Veľká — už som o tom veľa premýšľal(a) / hovoril(a)' },
        { v: 'stredna', label: 'Stredná — niečo som riešil(a), ale nie do hĺbky' },
        { v: 'mala', label: 'Malá — toto je pre mňa nové' },
      ],
    },
    { druh: 'otazka', id: 'sku_z_minula', typ: 'text', text: 'Čo si nesiem z predchádzajúcich vzťahov (dobré aj to, čo chcem robiť inak):' },
    { druh: 'otazka', id: 'sku_ocakavanie', typ: 'text', text: 'Čo očakávam od vyplnenia tohto dotazníka:' },
  ],
}

// ── Motivácia a rytmus ─────────────────────────────────────────────
const MOTIVACIA: Blok = {
  druh: 'skupina', id: 'motivacia', nadpis: 'Motivácia a rytmus vypĺňania',
  bloky: [
    {
      druh: 'otazka', id: 'mot_preco', typ: 'viac',
      text: 'Prečo to riešime práve teraz',
      moznosti: [
        { v: 'zvedavost', label: 'Zdravá zvedavosť, chceme sa lepšie spoznať' },
        { v: 'rutina', label: 'Cítime rutinu a chceme ju prelomiť' },
        { v: 'konflikt', label: 'Mali sme nezhodu okolo intimity a chceme to vyjasniť' },
        { v: 'novy_vztah', label: 'Sme na začiatku a chceme si nastaviť spoločnú reč' },
      ],
    },
    {
      druh: 'otazka', id: 'mot_rytmus', typ: 'jeden',
      text: 'Ako často by sme si chceli odpovede obnoviť',
      moznosti: [
        { v: 'raz', label: 'Raz stačí, budeme sa vracať podľa potreby' },
        { v: 'rocne', label: 'Približne raz ročne' },
        { v: 'po_zmene', label: 'Vždy keď sa výrazne zmení životná situácia' },
      ],
    },
    p('mot_spolu_oddelene', 'Preferujem vypĺňať väčšinu otázok najprv oddelene a potom sa spolu pozrieť na zhody'),
  ],
}

export const KONTEXT_VZTAHU: TemaObsah = {
  slug: 'kontext-vztahu-zivotna-situacia/kontext-vztahu-zivotna-situacia',
  nadpis: 'Kontext vzťahu a životná situácia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Rámec pred všetkými ostatnými témami',
      telo:
        'Fáza vzťahu, deti, práca, bývanie a zdravie určujú, koľko priestoru a energie máme na všetko ostatné ' +
        'v tomto dotazníku. Táto téma sa vypĺňa ako prvá — pomôže nastaviť realistické očakávania pre zvyšok.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiaca téma', ton: 'info',
      telo: 'Ak riešite štruktúru vzťahu samotnú (monogamia, otvorený vzťah, polyamoria), tomu sa venuje samostatná téma „CNM/ENM a vzťahové štruktúry".',
    },
  ],
  telo: [
    FAZA,
    SITUACIA,
    SKUSENOSTI,
    MOTIVACIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom — cieľom je spoločný obraz situácie, nie porovnávanie.',
    },
  ],
}
