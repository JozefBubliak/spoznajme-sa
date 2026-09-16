import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Vaginálna penetrácia — modul D1 „Vaginálna penetrácia".
// Zdroj: „15_Vaginalna_penetracia.docx" — napriek názvu obsahoval takmer
// výhradne obsah, ktorý je už inde (klitorálna/prstová stimulácia →
// bozky-dotyky.ts, cunnilingus → oralna-intimita.ts, face-sitting →
// face-sitting.ts). Skutočný obsah o samotnej penetrácii (nábeh, techniky,
// hĺbka, rytmus) v zdroji chýbal, preto je napísaný od základu podľa
// existujúcich L4 seedov modulu. Vaginálny fisting bol v zdroji ako jediná
// genuinne nová položka — zahrnutý samostatne. z/m verzia zrkadlová,
// niektoré otázky viazané na pohlavie.
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

// ── Penetrácia ako voľba ──────────────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „7) Penetrácia & polohy" — chýbajúci
// rámec „musí byť/nemusí byť" a protokol pri nepohodlí.
const VOLBA: Blok = {
  druh: 'skupina', id: 'volba', nadpis: 'Penetrácia ako voľba',
  bloky: [
    {
      druh: 'otazka', id: 'vol_dolezitost', typ: 'jeden',
      text: 'Ako dôležitá je pre mňa penetrácia v rámci sexu',
      moznosti: [
        { v: 'must_have', label: '„Must-have" — bez nej mi niečo chýba' },
        { v: 'nice_to_have', label: '„Nice-to-have" — príjemná, nie nutná' },
        { v: 'casto_staci_bez', label: 'Často mi stačí aj sex bez penetrácie' },
      ],
    },
    { druh: 'otazka', id: 'vol_kedy_nie', typ: 'text', text: 'Situácie, kedy penetráciu nechcem (únava, stres, tlak na výkon, časový stres):' },
    {
      druh: 'otazka', id: 'vol_kedy_najlepsie', typ: 'jeden',
      text: 'Kedy je pre mňa penetrácia najpríjemnejšia',
      moznosti: [
        { v: 'hlavne_jedlo', label: 'Ako „hlavné jedlo" — dlhšia, ústredná časť' },
        { v: 'finale', label: 'Ako finále na záver' },
        { v: 'kratka_stred', label: 'Ako krátka časť uprostred' },
      ],
    },
    {
      druh: 'otazka', id: 'vol_setup', typ: 'jeden',
      text: 'Príprava vopred vs. spontánnosť',
      moznosti: [
        { v: 'setup_dopredu', label: 'Radšej mať „setup" pripravený vopred' },
        { v: 'spontannost', label: 'Spontánnosť aj za cenu prerušení' },
      ],
    },
    {
      druh: 'text', id: 'vol_diskomfort', ton: 'info',
      telo: 'Pri nepohodlí je prvým krokom vždy spomaliť, opýtať sa, prípadne zmeniť polohu alebo pridať lubrikant — nikdy pokračovať cez bolesť.',
    },
    { druh: 'otazka', id: 'vol_prvy_krok', typ: 'text', text: 'Čo chcem ako prvý krok, keď sa objaví nepohodlie (spomaliť / zastaviť / opýtať sa / zmeniť polohu / viac lubrikantu):' },
  ],
}

// ── Nábeh ────────────────────────────────────────────────────────────
const NABEH: Blok = {
  druh: 'skupina', id: 'nabeh', nadpis: 'Nábeh — prvé chvíle',
  bloky: [
    {
      druh: 'otazka', id: 'nab_vstup', typ: 'jeden',
      text: 'Preferovaný spôsob vstupu',
      moznosti: [
        { v: 'pomaly', label: 'Pomalý, postupný' },
        { v: 'plytke_tahy', label: 'Plytké ťahy na začiatok, potom hlbšie' },
        { v: 'pockaj', label: '„Počkaj, kým poviem" — ja určujem tempo prvého vstupu' },
      ],
    },
    { druh: 'otazka', id: 'nab_lubrikacia', typ: 'jeden', text: 'Lubrikácia pri vstupe',
      moznosti: [
        { v: 'prirodzena', label: 'Prirodzená vlhkosť stačí' },
        { v: 'lubrikant', label: 'Vždy radšej s lubrikantom' },
        { v: 'zalezi', label: 'Záleží na chvíli' },
      ],
    },
    p('nab_dych', 'Vedomé spomalenie dychu pri vstupe mi pomáha uvoľniť sa'),
  ],
}

// ── Techniky ───────────────────────────────────────────────────────
const TECHNIKY: Blok = {
  druh: 'skupina', id: 'techniky', nadpis: 'Techniky',
  bloky: [
    {
      druh: 'otazka', id: 'tec_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré techniky mám rád(a)',
      moznosti: [
        { v: 'plytke_hlboke', label: 'Striedanie plytkých a hlbokých ťahov' },
        { v: 'angling', label: '„Angling" — uhol smerom na prednú stenu (G-bod)' },
        { v: 'rocking', label: '„Rocking" / grinding — kývanie panvou bez vyťahovania' },
        { v: 'kruzenie', label: 'Krúženie panvou' },
        { v: 'shallowing', label: '„Shallowing" — vedome plytšie vstupy (napr. na začiatku/pri edgingu)' },
      ],
    },
    p('tec_kombinacia_klitoris', 'Kombinácia penetrácie s ručnou stimuláciou klitorisu ma výrazne zosilňuje'),
    {
      druh: 'otazka', id: 'tec_pairing_kto', typ: 'jeden',
      text: '„Pairing" (súbežná stimulácia klitorisu počas penetrácie) — kto ju robí',
      moznosti: [
        { v: 'ja_sam', label: 'Ja sám/sama' },
        { v: 'partner', label: 'Partner/ka rukou' },
        { v: 'hracka', label: 'Hračka' },
        { v: 'nie', label: 'Radšej bez toho — ruší mi to rytmus' },
      ],
    },
  ],
}

// ── Hĺbka a náraz ──────────────────────────────────────────────────
const HLBKA: Blok = {
  druh: 'skupina', id: 'hlbka', nadpis: 'Hĺbka a náraz',
  bloky: [
    {
      druh: 'otazka', id: 'hlb_preferovana', typ: 'jeden',
      text: 'Preferovaná hĺbka',
      moznosti: [
        { v: 'plytka', label: 'Plytká hra pri vstupe' },
        { v: 'stredna', label: 'Stredná' },
        { v: 'hlboka', label: 'Hlboká' },
        { v: 'striedanie', label: 'Striedanie podľa chvíle' },
      ],
    },
    {
      druh: 'otazka', id: 'hlb_naraz_krcok', typ: 'jeden', podmienka: { pohlavie: 'z' },
      text: 'Náraz na krčok maternice pri hlbokých ťahoch',
      moznosti: [
        { v: 'prijemne', label: 'Príjemné, ak je jemné' },
        { v: 'zalezi', label: 'Záleží na uhle a dni v cykle' },
        { v: 'nie', label: 'Nepríjemné — treba sa mu vyhnúť' },
      ],
    },
  ],
}

// ── Čím ────────────────────────────────────────────────────────────
const CIM: Blok = {
  druh: 'skupina', id: 'cim', nadpis: 'Čím',
  bloky: [
    {
      druh: 'otazka', id: 'cim_nastroj', typ: 'viac',
      text: 'Čím ma penetrácia najviac baví',
      moznosti: [
        { v: 'prsty', label: 'Prsty' },
        { v: 'penis', label: 'Penis' },
        { v: 'dildo', label: 'Dildo' },
        { v: 'strapon', label: 'Strap-on' },
        { v: 'striedanie', label: 'Striedanie počas jednej scény' },
      ],
    },
  ],
}

// ── Rytmus ─────────────────────────────────────────────────────────
// ── Rýchly a surový sex ────────────────────────────────────────────
// Doplnené zo zdroj.docx (systematická revízia, pozri
// docs/dotaznik-zdroj-progress.md) — kontrast k pomalému/nežnému štýlu:
// rýchly, dravší sex a rozpoznanie hranice medzi vzrušujúcou intenzitou
// a nepríjemným tlakom.
const SUROVY: Blok = {
  druh: 'skupina', id: 'surovy', nadpis: 'Rýchly a „surový" sex',
  bloky: [
    {
      druh: 'otazka', id: 'sur_kedy', typ: 'jeden',
      text: 'Rýchly, dravší sex ma láka najviac, keď',
      moznosti: [
        { v: 'spontanne', label: 'Príde spontánne, ako iskra' },
        { v: 'po_teasingu', label: 'Príde po dlhšom teasingu (napätie → výbuch)' },
        { v: 'kratky_intenzivny', label: 'Je krátky a intenzívny' },
      ],
    },
    {
      druh: 'otazka', id: 'sur_co_je_surove', typ: 'viac',
      text: 'Čo je pre mňa „surové" v dobrom zmysle',
      moznosti: [
        { v: 'pevnejsie_drzanie', label: 'Pevnejšie držanie a vedenie' },
        { v: 'rychle_tempo', label: 'Rýchle tempo' },
        { v: 'dravsie_prejavy', label: 'Dravšie bozkávanie / zvuky' },
        { v: 'menej_slov', label: 'Menej rozprávania, viac tela' },
      ],
    },
    {
      druh: 'otazka', id: 'sur_kontrast', typ: 'jeden',
      text: 'Kontrast — jemná predohra → dravší vstup',
      moznosti: [
        { v: 'lakave', label: 'Veľmi ma láka, telo cíti, že ma partner naozaj chce' },
        { v: 'zalezi', label: 'Záleží na nálade' },
        { v: 'nie', label: 'Radšej konzistentný štýl bez kontrastu' },
      ],
    },
    { druh: 'otazka', id: 'sur_akurat', typ: 'text', text: 'Čo presne chcem cítiť, keď je intenzita „akurát" (napätie v panve, tlak, pocit vedenia):' },
    { druh: 'otazka', id: 'sur_uz_veela', typ: 'text', text: 'Môj signál, že je to už príliš (telo sa stiahne, dych sa zlomí nepríjemne, potrebujem pauzu):' },
    { druh: 'otazka', id: 'sur_signal_stop', typ: 'text', text: 'Náš dohodnutý signál na spomalenie/stop pri rýchlom sexe:' },
  ],
}

const RYTMUS: Blok = {
  druh: 'skupina', id: 'rytmus', nadpis: 'Rytmus',
  bloky: [
    {
      druh: 'otazka', id: 'ryt_tempo', typ: 'jeden',
      text: 'Preferované tempo ťahov',
      moznosti: [
        { v: 'staly', label: 'Stály rytmus' },
        { v: 'zrychlovanie', label: 'Postupné zrýchľovanie' },
        { v: 'stop_start', label: '„Stop-start"' },
        { v: 'vlny', label: 'Vlny (rýchlo–pomaly)' },
      ],
    },
    p('ryt_nehyb_sa', '„Nehýb sa, len tak zostaň vo mne" — moment bez pohybu ma vie vzrušiť'),
  ],
}

// ── Vaginálny fisting ────────────────────────────────────────────────
const FISTING: Blok = {
  druh: 'skupina', id: 'fisting', nadpis: 'Vaginálny fisting',
  bloky: [
    {
      druh: 'text', id: 'fis_info',
      telo:
        'Postupné vkladanie celej ruky do vagíny. Vyžaduje veľa dôvery, komunikácie, trpezlivosti a lubrikantu — ' +
        'nikdy sa nerobí narýchlo.',
    },
    {
      druh: 'otazka', id: 'fis_postoj', typ: 'jeden',
      text: 'Záujem o vaginálny fisting',
      moznosti: [
        { v: 'robime', label: 'Už to robíme a som spokojný/á' },
        { v: 'tuzim', label: 'Túžim to vyskúšať' },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, necítim sa na to' },
      ],
    },
    {
      druh: 'otazka', id: 'fis_poloha', typ: 'jeden',
      text: 'Poloha, ktorá by mi najviac vyhovovala',
      moznosti: [
        { v: 'chrbat', label: 'Na chrbte' },
        { v: 'na_styroch', label: 'Na štyroch' },
        { v: 'bok', label: 'Na boku' },
        { v: 'drep', label: 'Hlboký drep' },
      ],
    },
    { druh: 'otazka', id: 'fis_podmienky', typ: 'text', text: 'Za akých podmienok (postup, lubrikant, stop-slovo):' },
  ],
}

export const VAGINALNA_PENETRACIA: TemaObsah = {
  slug: 'vaginalna-penetracia/vaginalna-penetracia',
  nadpis: 'Vaginálna penetrácia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Nábeh, tempo a hĺbka',
      telo:
        'Samotná penetrácia je oveľa viac než „dnu a von" — nábeh, uhol, hĺbka a rytmus dohromady tvoria zážitok. ' +
        'Klitorálna/prstová stimulácia a orál majú svoje vlastné podrobné témy — tu je dôraz len na penetráciu.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiace témy', ton: 'info',
      telo: 'Manuálna a orálna stimulácia vulvy má vlastné podrobné témy „Bozky, dotyky a manuálna stimulácia" a „Orálna intimita".',
    },
  ],
  telo: [
    VOLBA,
    NABEH,
    TECHNIKY,
    HLBKA,
    CIM,
    RYTMUS,
    SUROVY,
    FISTING,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
