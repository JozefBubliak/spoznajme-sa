import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Orgazmus a jeho kontrola — modul D5.
// Zdroj: „dotaznik.xlsx" list „9) Orgazmus, intenzita, edge logika" —
// orgazmus ako štýl (nie povinnosť), synchronizácia, viacnásobné vlny,
// kontrola (D/s), po orgazme. Mechanika edgingu/vĺn/tempa má vlastnú
// tému „Tempo, intenzita a orgazmus" (D4) — tu je dôraz na SAMOTNÝ
// orgazmus (cesta, poradie, kontrola, po ňom), nie na tempo pred ním.
// z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — hranica' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Orgazmus ako štýl, nie povinnosť ────────────────────────────────
const AKO_STYL: Blok = {
  druh: 'skupina', id: 'ako_styl', nadpis: 'Orgazmus ako štýl, nie povinnosť',
  bloky: [
    { druh: 'otazka', id: 'sty_dobry_sex_bez', typ: 'text', text: 'Čo pre mňa robí sex „dobrým" aj bez orgazmu:' },
    {
      druh: 'otazka', id: 'sty_je_to', typ: 'jeden',
      text: 'Orgazmus pri sexe je pre mňa',
      moznosti: [
        { v: 'ciel', label: 'Cieľ' },
        { v: 'bonus', label: 'Bonus, nie nutnosť' },
        { v: 'raz_za_cas', label: 'Niečo, čo príde „raz za čas"' },
      ],
    },
    {
      druh: 'otazka', id: 'sty_ked_nepride', typ: 'jeden',
      text: 'Keď orgazmus nepríde, chcem, aby partner/ka',
      moznosti: [
        { v: 'podporil', label: 'Dal(a) najavo, že to je úplne v poriadku' },
        { v: 'nerozoberal', label: 'Vôbec to neriešil(a) nahlas' },
        { v: 'opytal', label: 'Opýtal(a) sa, čo by pomohlo' },
      ],
    },
    {
      druh: 'otazka', id: 'sty_jazyk', typ: 'jeden',
      text: 'Aký jazyk o orgazme je pre mňa OK',
      moznosti: [
        { v: 'priamy', label: 'Priamy („urob sa", „vyvrchol")' },
        { v: 'jemny', label: 'Jemnejší, opisný' },
        { v: 'bez_slov', label: 'Radšej sa o tom nehovorí nahlas' },
      ],
    },
  ],
}

// ── Cesta k orgazmu ──────────────────────────────────────────────────
const CESTA: Blok = {
  druh: 'skupina', id: 'cesta', nadpis: 'Cesta k orgazmu',
  bloky: [
    {
      druh: 'otazka', id: 'ces_spolahlive', typ: 'viac',
      text: 'Najspoľahlivejšie cesty k môjmu orgazmu',
      moznosti: [
        { v: 'rucne', label: 'Ručne' },
        { v: 'oral', label: 'Orálne' },
        { v: 'penetracia', label: 'Penetrácia' },
        { v: 'vizual_rucne', label: 'Vizuál + ručne' },
        { v: 'kombinovany', label: 'Kombinovaný' },
        { v: 'z_bradaviek', label: 'Z bradaviek' },
        { v: 'z_analu', label: 'Z análu' },
        { v: 'nezalezi', label: 'Nezáleží, nemusí prísť' },
      ],
    },
    {
      druh: 'otazka', id: 'ces_ako', typ: 'jeden',
      text: 'Orgazmus u mňa príde skôr z',
      moznosti: [
        { v: 'intenzity', label: 'Intenzity' },
        { v: 'dlheho_budovania', label: 'Dlhého budovania' },
      ],
    },
    { druh: 'otazka', id: 'ces_co_brani', typ: 'text', text: 'Čo mi typicky bráni v tom, aby orgazmus prišiel:' },
    { druh: 'otazka', id: 'ces_co_pretazi', typ: 'text', text: 'Aké kombinácie stimulov ma „preťažia" (príliš veľa naraz):' },
  ],
}

// ── Synchronizácia ────────────────────────────────────────────────
const SYNCHRONIZACIA: Blok = {
  druh: 'skupina', id: 'synchronizacia', nadpis: 'Poradie a synchronizácia',
  bloky: [
    {
      druh: 'otazka', id: 'syn_preferencia', typ: 'jeden',
      text: 'Poradie a počet',
      moznosti: [
        { v: 'ja_prvy', label: 'Ja prvý/á' },
        { v: 'partner_prvy', label: 'Partner/ka prvý/á' },
        { v: 'sucasne', label: 'Súčasne (ak vyjde)' },
        { v: 'nezalezi', label: 'Nezáleží na poradí' },
      ],
    },
    {
      druh: 'otazka', id: 'syn_ako', typ: 'viac',
      text: 'Ak chceme synchronizovať, ide to cez',
      moznosti: [
        { v: 'tempo', label: 'Tempo/rytmus' },
        { v: 'pairing', label: 'Pairing / hračku' },
        { v: 'slova', label: 'Slová' },
        { v: 'zmena_polohy', label: 'Zmenu polohy' },
      ],
    },
    p('syn_pockat', 'Občas rád(a) „počkám" so svojím orgazmom kvôli partnerovi/ke, bez pocitu tlaku'),
    { druh: 'otazka', id: 'syn_nepriejmne', typ: 'text', text: 'Čo je pri synchronizácii pre mňa nepríjemné (tlak, zadržiavanie, „už musíš"):' },
  ],
}

// ── Kontrola (D/s prvok) ────────────────────────────────────────────
const KONTROLA: Blok = {
  druh: 'skupina', id: 'kontrola', nadpis: 'Kontrola orgazmu (D/s prvok)',
  bloky: [
    {
      druh: 'otazka', id: 'kon_forma', typ: 'viac',
      text: 'Ktoré formy kontroly ma lákajú',
      moznosti: [
        { v: 'denial', label: '„Nesmieš, kým nedovolím" (denial)' },
        { v: 'na_povel', label: '„Teraz" — na povel' },
        { v: 'pocitanie', label: 'Počítanie' },
        { v: 'zakaz_dni', label: 'Zákaz na dni' },
        { v: 'forced', label: '„Forced" — nútený viacnásobný / overstim' },
        { v: 'ziadna', label: 'Žiadna kontrola, chcem si to riadiť sám/sama' },
      ],
    },
  ],
}

// ── Viacnásobné vlny ──────────────────────────────────────────────
const VIACNASOBNE: Blok = {
  druh: 'skupina', id: 'viacnasobne', nadpis: 'Viacnásobné vlny',
  bloky: [
    {
      druh: 'otazka', id: 'via_skusenost', typ: 'jeden',
      text: 'Viac orgazmov/vĺn za sebou',
      moznosti: [
        { v: 'mam_a_chcem', label: 'Mám túto skúsenosť a chcem ju rozvíjať' },
        { v: 'fantazia', label: 'Zatiaľ len fantázia, chcel(a) by som skúsiť' },
        { v: 'nezaujima', label: 'Nezaujíma ma to' },
      ],
    },
    {
      druh: 'otazka', id: 'via_po_prvom', typ: 'jeden',
      text: 'Po prvom orgazme',
      moznosti: [
        { v: 'hned', label: 'Chcem pokračovať hneď' },
        { v: 'kratka_pauza', label: 'Potrebujem krátku pauzu' },
        { v: 'dlhsia_pauza', label: 'Potrebujem dlhšiu pauzu' },
      ],
    },
    {
      druh: 'otazka', id: 'via_zmena_zony', typ: 'jeden',
      text: 'Po orgazme uprednostňujem',
      moznosti: [
        { v: 'ina_zona', label: 'Prepnúť na inú zónu (prsia, krk, masáž)' },
        { v: 'rovnako', label: 'Pokračovať rovnako' },
        { v: 'stop', label: 'Zastaviť úplne' },
      ],
    },
  ],
}

// ── Po orgazme ──────────────────────────────────────────────────
const PO_ORGAZME: Blok = {
  druh: 'skupina', id: 'po_orgazme', nadpis: 'Po orgazme',
  bloky: [
    {
      druh: 'otazka', id: 'poo_reakcia', typ: 'jeden',
      text: 'Prvé sekundy po',
      moznosti: [
        { v: 'precitlivenost', label: 'Precitlivenosť — nedotýkať sa' },
        { v: 'pokracovat', label: 'Pokračovať (overstim)' },
        { v: 'objat', label: 'Okamžite objať' },
        { v: 'nechaj_chvilu', label: '„Nechaj ma chvíľu"' },
      ],
    },
    p('poo_hlucnost', 'Je pre mňa v poriadku byť pri orgazme hlučný/á'),
    p('poo_partner_hlucny', 'Chcem, aby bol/a aj partner/ka hlučný/á'),
    { druh: 'otazka', id: 'poo_zapamataj', typ: 'text', text: '1 veta, ktorú chcem, aby si partner/ka zapamätal(a) o mojom orgazme (čo funguje):' },
  ],
}

export const ORGAZMUS_KONTROLA: TemaObsah = {
  slug: 'orgazmus-kontrola/orgazmus-kontrola',
  nadpis: 'Orgazmus a jeho kontrola',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Orgazmus je štýl, nie skúška',
      telo:
        'Orgazmus môže byť cieľ, bonus, alebo sa niekedy jednoducho nedostaví — a to je v poriadku. ' +
        'Táto téma mapuje cestu k nemu, poradie/synchronizáciu, prípadnú kontrolu ako hru a čo nasleduje po.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiaca téma', ton: 'info',
      telo: 'Mechanika tempa, vĺn a edgingu pred samotným orgazmom má vlastnú tému „Tempo, intenzita a orgazmus".',
    },
    {
      druh: 'text', id: 'gap', nadpis: '„Orgazmový gap" nie je biológia', ton: 'info',
      telo:
        'Výskum (Harvey, Jones & Copulsky, 2023, na vzorke cis aj trans/nebinárnych ľudí) ukazuje, že to, ' +
        'čí orgazmus sa v posteli „počíta" viac, sa väčšinou riadi naučenými rodovými scenármi (kto iniciuje, ' +
        'kto sa má sústrediť na koho), nie biológiou. Tieto scenáre prežívajú aj v queer vzťahoch. Explicitne ' +
        'povedať, čo konkrétne funguje, namiesto spoliehania sa na predpoklady, tento vzorec dokáže zmeniť.',
    },
  ],
  telo: [
    AKO_STYL,
    CESTA,
    SYNCHRONIZACIA,
    KONTROLA,
    VIACNASOBNE,
    PO_ORGAZME,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
