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
      druh: 'text', id: 'zra_info',
      telo:
        'Zrak dokáže atmosféru posilniť aj úplne vypnúť — a oba smery fungujú ako vzrušenie. Zrkadlo mení uhol pohľadu na seba aj na partnera; ' +
        'zaviazané oči nechajú vidieť len jedného z dvoch; úplná tma odoberie zrak obom naraz a preloží pozornosť na dotyk, dych a vôňu.',
    },
    {
      druh: 'otazka', id: 'zra_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'zaviazane_oci', label: 'Zaviazané oči — jeden z nás nevidí, druhý áno (napätie z neistoty, čo príde)' },
        { v: 'tma', label: 'Úplná tma — nevidí ani jeden z nás (zrak odpadá obom, zbystrí sa dotyk aj sluch)' },
        { v: 'striptiz', label: 'Striptíz / pomalé vyzliekanie' },
        { v: 'zrkadlo', label: 'Sledovanie seba/partnera v zrkadle (nový uhol na to, čo sa práve deje)' },
        { v: 'vizualne_podnety', label: 'Vizuálne podnety (tlmené svetlo, farebné LED, sviečky)' },
        { v: 'oblecenie', label: 'Erotické oblečenie/kostým ako vizuálny prvok predohry' },
        { v: 'maska', label: 'Maska (anonymita/estetika — iné než zaviazané oči, vidím ja, nevidí sa moja tvár)' },
        { v: 'ocny_kontakt', label: '„Pozeraj sa mi do očí" počas intimity' },
        { v: 'zatvorene_oci', label: 'Radšej zatvorené oči — sústredím sa na pocity, nie na pohľad' },
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
    {
      druh: 'otazka', id: 'slu_hudobny_zaner', typ: 'jeden',
      text: 'Hudobný žáner, ktorý mi počas intimity najviac sedí',
      moznosti: [
        { v: 'rnb_jazz', label: 'Zmyselné R&B alebo jazz' },
        { v: 'klavir', label: 'Jemné klavírne skladby' },
        { v: 'dynamicke', label: 'Dynamické, rytmické melódie' },
        { v: 'ambient', label: 'Ambientná hudba' },
        { v: 'ziadna', label: 'Nepreferujem hudbu počas intimity' },
      ],
    },
    {
      druh: 'otazka', id: 'slu_verbalne_prikazy', typ: 'jeden',
      text: 'Verbálne príkazy počas aktu (tón autority)',
      moznosti: [
        { v: 'tvrde', label: 'Milujem tvrdé, autoritatívne príkazy' },
        { v: 'jemne', label: 'Mám rád(a) jemné vedenie' },
        { v: 'mozno', label: 'Možno, ak to nebude príliš tvrdé' },
        { v: 'nie', label: 'Nie, necítim sa pri tom dobre' },
      ],
    },
    {
      druh: 'otazka', id: 'slu_druhy_prejavov', typ: 'viac', inePovolene: true,
      text: 'Aké druhy verbálnych prejavov ma vzrušujú',
      moznosti: [
        { v: 'komplimenty', label: 'Nežné komplimenty ("Si nádherná/ý.")' },
        { v: 'dirty_talk', label: 'Priamy dirty talk (odvážne, explicitné slová)' },
        { v: 'opisovanie', label: 'Opisovanie toho, čo sa práve deje alebo bude nasledovať' },
        { v: 'roleplay_rec', label: 'Roleplay oslovenia ("môj pán", "zlý chlapec"...)' },
        { v: 'vulgarne', label: 'Vulgárne výrazové spojenia (v rámci dohodnutých hraníc)' },
        { v: 'ticho', label: 'Žiadne slová — preferujem ticho' },
      ],
    },
    {
      druh: 'otazka', id: 'slu_ton_hlasu', typ: 'jeden',
      text: 'Aký tón hlasu ma najviac vzrušuje (nie čo sa hovorí, ale ako to znie)',
      moznosti: [
        { v: 'jemny_lask', label: 'Jemné a láskavé šepkanie' },
        { v: 'dominantny', label: 'Dominantný a príkazový tón' },
        { v: 'hlboky', label: 'Hrubší, hlboký hlas' },
        { v: 'nezalezi', label: 'Nezáleží mi na tóne' },
      ],
    },
  ],
}

// ── Čuch ─────────────────────────────────────────────────────────────
const CUCH: Blok = {
  druh: 'skupina', id: 'cuch', nadpis: 'Čuch — vône',
  bloky: [
    {
      druh: 'text', id: 'cuc_info',
      telo:
        'Vôňa je jeden z najsilnejších spúšťačov túžby, lebo ide priamo na emócie a pamäť. Ylang-ylang podporuje uvoľnenie, jazmín prebúdza vášeň, ' +
        'vanilka a santalové drevo dávajú pocit hrejivého pokoja — a prírodný olej na pulzných bodoch (zápästia, krk, dekolt) zvýrazní vlastnú telesnú vôňu, ' +
        'namiesto toho, aby ju prebil. Tip na rituál: naviaž jednu konkrétnu vôňu len na spoločné noci — po čase sa vám v hlave prepojí s túžbou.',
    },
    {
      druh: 'otazka', id: 'cuc_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'prirodzena_vona', label: 'Prirodzená vôňa tela a pohlavia' },
        { v: 'parfum_olej', label: 'Parfum / vonný olej na koži' },
        { v: 'feromony', label: 'Predstava feromónov a prirodzeného „chemického" priťahovania' },
        { v: 'vona_po_sexe', label: '„Vôňa po sexe" — nesprchovať sa hneď' },
        { v: 'aromaterapia', label: 'Aromaterapia (sviečky, esenciálne oleje) ako súčasť atmosféry' },
        { v: 'masaz_s_olejom', label: 'Masáž s vonným olejom (teplo rúk + vôňa spolu uvoľňujú telo aj myseľ)' },
      ],
    },
    p('cuc_vedome_privoniavanie', 'Vedomé privoniavanie ku krku, zápästiam alebo vlasom partnera počas predohry (ako rituál) ma láka'),
    { druh: 'otazka', id: 'cuc_preferovane_vone', typ: 'text', text: 'Konkrétne vône, ktoré ma najviac vzrušujú alebo upokojujú (napr. santalové drevo, ylang-ylang, vanilka, kokos, pačuli):' },
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
    p('chu_kombinacia_tekutin', 'Kombinácia telesných tekutín s inou chuťou (med, sladký sirup) ma láka'),
    {
      druh: 'otazka', id: 'chu_alkohol', typ: 'jeden',
      text: 'Alkohol (víno, šampanské) ako súčasť erotických hier',
      moznosti: [
        { v: 'ano', label: 'Áno, znie to vzrušujúco' },
        { v: 'mozno_jemne', label: 'Možno, ak to bude jemné a bezpečné' },
        { v: 'nie', label: 'Nie, nechcem miešať alkohol a intimitu' },
      ],
    },
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
      druh: 'text', id: 'layering_ritual_tip', ton: 'info',
      telo:
        'Inšpirácia na vyskúšanie: naplánuj predohru ako malý rituál pre všetky zmysly naraz — zhasni svetlá, zapáľ sviečku, pusti jemnú hudbu ' +
        'a použi vonný olej. Partnerovi zaviaž oči a skúmaj jeho telo pierkom, teplým olejom a pomalými bozkami, intenzitu zvyšuj postupne a sleduj reakcie. ' +
        'Alebo skús opačný extrém — úplnú tmu a ticho, len dych a dotyk, bez akéhokoľvek plánu.',
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
