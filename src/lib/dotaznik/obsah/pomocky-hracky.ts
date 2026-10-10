import { CHUT } from './skaly'
import type { TemaObsah, Blok, Moznost, OtazkaBlok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Erotické pomôcky a hračky — modul E1 „Vibrátory a stimulátory".
// Zdroj: „zdroj.docx" (katalóg) + xlsm kus „Putá a laná… / Erotické pomôcky /
// Dotazník o erotických pomôckach" (2026-10-01): hry s hračkami m/ž (jeden ID
// = jeden akt, text z pohľadu muža aj ženy), putá + hračky oboma smermi,
// predohra s pomôckami, párové pomôcky, postoj k hračkám druhého človeka.
// Análne hračky z toho istého kusu spracoval Codex v analna-penetracia.ts.
// Reaudit XLSM P40200–40255: katalóg vibrátorov, zmyslových, análnych,
// BDSM, diaľkových a penisových pomôcok bol zlúčený bez duplicít.
// Rešerš: Herbenick a kol. 2009 (J Sex Med) — vibrátor použilo 53 % žien a
// ~45 % mužov, 81 % žien a 91 % mužov s vibrátorom ho použilo s partnerom;
// Univ. of Guelph / prieskum 2 056 žien a 1 047 mužov — 37 % žien si myslí, že
// muži sa cítia ohrození, 70 % mužov nesúhlasí. https://www.sciencedaily.com/releases/2009/06/090629100643.htm
// https://www.nbcnews.com/news/amp/wbna45119593
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POVODNY_POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — hranica' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis'], moznosti: Moznost[] = CHUT): OtazkaBlok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti, predosleMoznosti: POVODNY_POSTOJ,
})
const ZAUJEM: Moznost[] = [
  { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
  { v: 'tuzim', label: 'Túžim to skúsiť' },
  { v: 'ak_chces', label: g('Rád, ak po tom túži partnerka', 'Rada, ak po tom túži partner') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie' },
]

// ── Hry s hračkami — čo chcem ja, na sebe aj na druhom človeku ──
const HRY: Blok = {
  druh: 'skupina', id: 'hry_s_hrackami', nadpis: 'Hry s hračkami',
  uvod: g(
    'Predstav si ticho spálne, len svetlo sviečok. Tentoraz nebude všetko len o rukách a ústach — pridáte vibrátor, pierko, šatku… a jej rozkoš sa prehĺbi, spomalí a zintenzívni.',
    'Predstav si ticho spálne, len svetlo sviečok a jeho dych na tvojom krku. Tentoraz nebude všetko len o rukách a ústach — pridáte vibrátor, pierko, šatku… a tvoja rozkoš sa prehĺbi, spomalí a zintenzívni.',
  ),
  bloky: [
    { druh: 'otazka', id: 'hr_vibr_ona', typ: 'jeden', moznosti: ZAUJEM, text: g('Dráždiť partnerku vibrátorom — na klitorise alebo hlboko v nej — a sledovať, ako sa jej podlamujú nohy', 'Aby ma partner dráždil vibrátorom — na klitorise alebo hlboko vo mne — a sledoval každý môj ston') },
    { druh: 'otazka', id: 'hr_ona_sama_vibr', typ: 'jeden', moznosti: ZAUJEM, text: g('Pozerať sa, ako sa partnerka sama uspokojuje vibrátorom, a pritom sa uspokojovať aj ja', 'Uspokojovať sa vibrátorom a pozerať sa partnerovi do očí, kým sa uspokojuje aj on') },
    { druh: 'otazka', id: 'hr_oci_hracky', typ: 'jeden', moznosti: ZAUJEM, text: g('Zaviazať partnerke oči alebo spútať zápästia a skúšať na nej hračky — ona nevie, čo príde', 'Nechať si zaviazať oči alebo spútať zápästia a odovzdať sa partnerovi s hračkami — nevedieť, čo príde') },
    { druh: 'otazka', id: 'hr_ja_sputany', typ: 'jeden', moznosti: ZAUJEM, text: g('Aby mi partnerka zviazala ruky a mala kontrolu nad mojimi pohybmi', 'Zviazať partnerovi ruky a mať kontrolu nad jeho pohybmi') },
    { druh: 'otazka', id: 'hr_ona_sputana', typ: 'jeden', moznosti: ZAUJEM, text: g('Zviazať partnerke ruky a mať kontrolu nad jej pohybmi', 'Aby mi partner zviazal ruky a mal kontrolu nad mojimi pohybmi') },
    { druh: 'otazka', id: 'hr_nositelny', typ: 'jeden', moznosti: ZAUJEM, text: g('Ovládať partnerkine vibračné nohavičky alebo vajíčko — aj pri večeri v reštaurácii, keď sa usmieva a vnútri ju zaplavujú vlny', 'Nosiť vibračné nohavičky alebo vajíčko, ktoré partner tajne ovláda — aj pri večeri, keď sa usmievam a vnútri ma zaplavujú vlny') },
    { druh: 'otazka', id: 'hr_svieca', typ: 'jeden', moznosti: ZAUJEM, text: g('Masírovať partnerku masážnou sviečkou — teplý vosk po bruchu, ruky, ktoré ju hladia', 'Aby ma partner masíroval masážnou sviečkou — teplý vosk po bruchu a jeho ruky na mne') },
    { druh: 'otazka', id: 'hr_svieca_on', typ: 'jeden', moznosti: ZAUJEM, text: g('Aby ma partnerka masírovala masážnou sviečkou', 'Masírovať partnera masážnou sviečkou') },
    { druh: 'otazka', id: 'hr_pierko_lad', typ: 'jeden', moznosti: ZAUJEM, text: g('Pierko, ľadové kocky, teplo a chlad na partnerkinom tele', 'Pierko, ľadové kocky, teplo a chlad na mojom tele') },
    { druh: 'otazka', id: 'hr_kruzok', typ: 'jeden', moznosti: ZAUJEM, text: g('Vibračný krúžok na penis počas sexu — viac tlaku a dlhšie, a vibrácie aj pre partnerku', 'Aby partner nosil vibračný krúžok — vibrácie na mojom klitorise pri každom pohybe') },
    { druh: 'otazka', id: 'hr_masturbator', typ: 'jeden', moznosti: ZAUJEM, text: g('Aby ma partnerka uspokojovala masturbátorom (Fleshlight, umelá vagína), kým som úplne uvoľnený', 'Uspokojovať partnera masturbátorom a sledovať, ako sa mu oddáva') },
    { druh: 'otazka', id: 'hr_masturbator_solo', typ: 'jeden', moznosti: ZAUJEM, text: g('Používať masturbátor sám, aj keď sa partnerka pozerá', 'Pozerať sa, ako partner používa masturbátor') },
    { druh: 'otazka', id: 'hr_pumpa', typ: 'jeden', moznosti: ZAUJEM, text: g('Erekčný krúžok alebo vákuová pumpa', 'Aby partner skúsil erekčný krúžok alebo vákuovú pumpu') },
    { druh: 'otazka', id: 'hr_kremy', typ: 'jeden', moznosti: ZAUJEM, text: g('Stimulačné krémy a gély — hrejivé, chladivé, na zvýšenie citlivosti', 'Stimulačné krémy a gély — hrejivé, chladivé, na zvýšenie citlivosti') },
    { druh: 'otazka', id: 'hr_svorky_ona', typ: 'jeden', moznosti: ZAUJEM, text: g('Svorky na partnerkine bradavky', 'Svorky na mojich bradavkách') },
    { druh: 'otazka', id: 'hr_svorky_on', typ: 'jeden', moznosti: ZAUJEM, text: g('Svorky na mojich bradavkách', 'Svorky na partnerových bradavkách') },
    { druh: 'otazka', id: 'hr_placacka_ona', typ: 'jeden', moznosti: ZAUJEM, text: g('Plácačka alebo bičík na partnerkin zadok', 'Plácačka alebo bičík na môj zadok') },
    { druh: 'otazka', id: 'hr_placacka_on', typ: 'jeden', moznosti: ZAUJEM, text: g('Plácačka alebo bičík na môj zadok', 'Plácačka alebo bičík na partnerov zadok') },
    { druh: 'otazka', id: 'hr_stroj', typ: 'jeden', moznosti: ZAUJEM, text: g('Sex stroj pre partnerku — ja ovládam tempo a pozerám sa', 'Sex stroj — partner ovláda tempo a pozerá sa') },
    {
      druh: 'otazka', id: 'hr_parove', typ: 'jeden',
      text: 'Pomôcky vyslovene pre páry (párový vibrátor, aplikácia pre oboch, hry)',
      moznosti: [
        { v: 'ano', label: g('Áno, rád by som ich preskúmal', 'Áno, rada by som ich preskúmala') },
        { v: 'mozno', label: 'Možno, najprv sa chcem dozvedieť viac' },
        { v: 'nie', label: 'Nie, radšej bez pomôcok' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_vyber', typ: 'viac',
      text: 'Ako chcem hračky vyberať',
      moznosti: [
        { v: 'sexshop_spolu', label: 'Spolu v sexshope' },
        { v: 'online_spolu', label: 'Spolu online, večer pri víne' },
        { v: 'prekvapenie', label: g('Prekvapím partnerku', 'Nech ma partner prekvapí') },
        { v: 'prekvapenie_mna', label: g('Nech ma prekvapí partnerka', 'Prekvapím partnera') },
        { v: 'kazdy_sam', label: 'Každý si kúpi svoje' },
      ],
    },
  ],
}

// ── Pomôcky v predohre a kombinácie ───────────────────────────────────
const PREDOHRA: Blok = {
  druh: 'skupina', id: 'predohra_pomocky', nadpis: 'Pomôcky v predohre a kombinácie',
  bloky: [
    {
      druh: 'otazka', id: 'pre_zapojit', typ: 'jeden',
      text: 'Chcem zapájať pomôcky do predohry',
      moznosti: [
        { v: 'ano', label: g('Áno, veľmi rád experimentujem', 'Áno, veľmi rada experimentujem') },
        { v: 'obcas', label: 'Občas, ak je správna nálada' },
        { v: 'nie', label: 'Nie, predohra bez pomôcok' },
      ],
    },
    {
      druh: 'otazka', id: 'pre_kombinacie', typ: 'viac', inePovolene: true,
      text: 'Ako kombinovať pomôcky s inými technikami',
      moznosti: [
        { v: 'vibr_ruky', label: 'Striedanie vibrátora s dotykmi rúk' },
        { v: 'svieca_masaz', label: 'Masážna sviečka počas masáže' },
        { v: 'bondage_oral', label: g('Viazanie a orál — ona spútaná, ja ústami', 'Viazanie a orál — ja spútaná, on ústami') },
        { v: 'vibr_penetracia', label: 'Vibrátor na klitoris počas penetrácie' },
        { v: 'vibr_oral', label: 'Vibrátor počas orálu' },
        { v: 'oci_placacka', label: 'Páska na oči, jemné viazanie a plesknutie plácačkou' },
        { v: 'textury', label: 'Rôzne textúry — chlpatá páska na oči, gumový bičík, pierko' },
      ],
    },
    { zbalitelny: true,
      druh: 'text', id: 'pre_tipy', nadpis: 'Tipy', ton: 'info',
      telo:
        'Spojte viac vecí naraz: páska na oči, jemné viazanie a plácačka. Hrajte sa s textúrami a intenzitou — mäkké pierko a hneď nato gumový bičík. ' +
        'Pridajte rituál: sviečky, hudba, vôňa — a jedna pomôcka, ktorú ten druhý vopred nepozná.',
    },
  ],
}

// ── Keď pomôcky chce partner / partnerka ──────────────────────────────
const POSTOJ_PARTNER: Blok = {
  druh: 'skupina', id: 'postoj_partner_hracky',
  nadpis: g('Keď hračky chce alebo používa partnerka', 'Keď hračky chce alebo používa partner'),
  bloky: [
    {
      druh: 'otazka', id: 'pph_sama', typ: 'viac', inePovolene: true,
      text: g('Keď partnerka používa vibrátor sama, aj bezo mňa', 'Keď partner používa masturbátor alebo sa uspokojuje sám, aj bezo mňa'),
      moznosti: [
        { v: 'vzrusuje', label: 'Vzrušuje ma to' },
        { v: 'tesi', label: 'Teší ma, že sa o seba stará' },
        { v: 'neprekaza', label: 'Neprekáža mi to' },
        { v: 'pri_tom', label: 'Chcem byť pri tom' },
        { v: 'ovladat', label: g('Chcem jej ho ovládať', 'Chcem mu ho ovládať') },
        { v: 'nahraditelny', label: g('Cítim sa nahraditeľný', 'Cítim sa nahraditeľná') },
      ],
    },
    {
      druh: 'otazka', id: 'pph_navrh', typ: 'viac', inePovolene: true,
      text: g('Keby partnerka prišla s tým, že chce do postele hračky', 'Keby partner prišiel s tým, že chce do postele hračky'),
      moznosti: [
        { v: 'vzrusilo', label: 'Vzrušilo by ma to' },
        { v: 'vybrat_spolu', label: 'Chcem ich vyberať spolu' },
        { v: 'zvedavost', label: 'Zaujímalo by ma, čo konkrétne' },
        { v: 'nestacim', label: g('Bál by som sa, že jej nestačím', 'Bála by som sa, že mu nestačím') },
        { v: 'trapne', label: 'Bolo by mi to trápne' },
      ],
    },
    {
      druh: 'otazka', id: 'pph_vacsie', typ: 'jeden',
      text: g('Keby partnerka chcela hračku s inou funkciou, tvarom alebo pocitom, než dokáže telo', 'Keby som chcela hračku s inou funkciou, tvarom alebo pocitom, než dokáže partnerovo telo'),
      moznosti: [
        { v: 'vzrusuje', label: 'Vzrušovalo by ma objavovať to spolu' },
        { v: 'ok', label: 'Je to iný druh podnetu, nie porovnanie tiel' },
        { v: 'neprijemne', label: g('Potreboval by som rozumieť, čo ju na tom priťahuje', 'Chcela by som partnerovi vysvetliť, čo ma na tom priťahuje') },
      ],
    },
    { zbalitelny: true,
      druh: 'text', id: 'pph_myty', nadpis: 'Mýty', ton: 'info',
      telo: g(
        'Mýtus: „Vibrátor ma nahradí." — Realita: 81 % žien, ktoré vibrátor používajú, ho používa s partnerom. Je to tvoj pomocník, nie súper.\n\n' +
          'Mýtus: „Muži sa vibrátora boja." — Realita: v prieskume sa 70 % mužov necítilo ohrozených; mnohí uviedli, že sex s hračkami je pre nich príťažlivejší.\n\n' +
          'Mýtus: „Masturbátor je pre osamelých mužov." — Realita: veľa párov ho používa spolu — ona ho drží a ovláda tempo.',
        'Mýtus: „Keď potrebujem vibrátor, nie je so mnou niečo v poriadku." — Realita: vibrátor použila viac ako polovica žien a väčšina ho používa s partnerom. Väčšina žien potrebuje priamu stimuláciu klitorisu.\n\n' +
          'Mýtus: „Partner sa bude cítiť ohrozený." — Realita: 37 % žien si to myslí, ale 70 % mužov to popiera — mnohí si sex s hračkami užívajú viac.\n\n' +
          'Mýtus: „Hračky sú pre tie, ktorým sex nestačí." — Realita: ženy, ktoré používajú vibrátor, hlásia lepšiu sexuálnu funkciu a spokojnosť.',
      ),
    },
  ],
}

const VIBRATORY: Blok = {
  druh: 'skupina', id: 'vibratory', nadpis: 'Vibrátory',
  bloky: [
    {
      druh: 'otazka', id: 'vib_klit', typ: 'viac', inePovolene: true,
      text: 'Klitorálne vibrátory',
      moznosti: [
        { v: 'bullet', label: 'Bullet (malý bodový)' },
        { v: 'na_vulvu', label: 'Na priloženie k vulve' },
        { v: 'kralik', label: 'Tvarované stimulátory („králik")' },
        { v: 'air_pulse', label: 'Saco-tlakové / air-pulse' },
        { v: 'musle', label: 'Vibračné mušle (diskrétne pod bielizeň)' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_vag', typ: 'viac',
      text: 'Vaginálne vibrátory',
      moznosti: [
        { v: 'rovny', label: 'Klasický rovný' },
        { v: 'g_bod', label: 'Zakrivený na G-bod' },
        { v: 'dlhy', label: 'Dlhší na hĺbku' },
        { v: 'wand', label: 'Veľký masážny prikladací vibrátor (wand, napr. Hitachi štýl) — silný, plošný podnet' },
        { v: 'venusine_gulicky', label: 'Venušine guličky (nosené aj mimo sexu, jemná stimulácia/kegel cvičenie)' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_komb', typ: 'viac',
      text: 'Kombinované',
      moznosti: [
        { v: 'rabbit', label: 'Rabbit (vagína + klitoris)' },
        { v: 'dvojite', label: 'Dvojité pre súčasnú stimuláciu' },
        { v: 'hradza', label: 'Na masáž hrádze' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_nositelne', typ: 'viac',
      text: 'Nositeľné',
      moznosti: [
        { v: 'nohavicky', label: 'Vibračné nohavičky s diaľkovým ovládaním' },
        { v: 'vajicko', label: 'Mini vibračné vajíčko' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_pouzitie', typ: 'viac',
      text: 'Použitie',
      moznosti: [
        { v: 'solo', label: 'Sólo' },
        { v: 'partner_ovlada', label: g('Partnerka ovláda', 'Partner ovláda') },
        { v: 'penetracia', label: 'Počas penetrácie (medzi telami)' },
        { v: 'oral', label: 'Počas orálu' },
        { v: 'hands_free', label: '„Hands-free"' },
      ],
    },
    p('vib_intenzita', 'Vysoká intenzita / air-pulse (silné podnety)'),
  ],
}

const DILDA: Blok = {
  druh: 'skupina', id: 'dilda', nadpis: 'Dildá',
  bloky: [
    {
      druh: 'otazka', id: 'dil_typy', typ: 'viac', inePovolene: true,
      text: 'Typy',
      moznosti: [
        { v: 'silikon', label: 'Silikónové' },
        { v: 'sklo', label: 'Sklenené (chlad, hladkosť)' },
        { v: 'kov', label: 'Kovové' },
        { v: 'realisticke', label: 'Realistické tvary' },
        { v: 'texturovane', label: 'Textúrované / žilkovanie' },
      ],
    },
    {
      druh: 'otazka', id: 'dil_specialne', typ: 'viac',
      text: 'Špeciálne tvary',
      moznosti: [
        { v: 'dvojite', label: 'Dvojité (double-ended)' },
        { v: 'dp', label: 'Pre dvojitú penetráciu' },
        { v: 'gp_bod', label: 'Zakrivené na G-bod / P-bod' },
      ],
    },
    {
      druh: 'otazka', id: 'dil_velkost', typ: 'jeden',
      text: 'Veľkosť',
      moznosti: [
        { v: 'male', label: 'Malé' },
        { v: 'stredne', label: 'Stredné' },
        { v: 'velke', label: 'Veľké' },
        { v: 'size_play', label: '„Size play" ako fantázia' },
        { v: 'progresia', label: 'Postupné zväčšovanie' },
      ],
    },
    {
      druh: 'otazka', id: 'dil_strapon', typ: 'jeden',
      text: 'Strap-on',
      moznosti: [
        { v: 'pegging', label: 'Pegging — ona penetruje jeho' },
        { v: 'ona_ju', label: 'Ona penetruje ju' },
        { v: 'bezremenove', label: 'Bezremeňové / „strapless"' },
        { v: 'nezaujima', label: 'Nezaujíma ma' },
      ],
    },
  ],
}

const ANALNE: Blok = {
  druh: 'skupina', id: 'analne', nadpis: 'Análne hračky',
  bloky: [
    {
      druh: 'otazka', id: 'an_koliky', typ: 'viac',
      text: 'Kolíky',
      moznosti: [
        { v: 'male', label: 'Malé pre začiatočníkov' },
        { v: 'vibracne', label: 'Vibračné' },
        { v: 'chvostik', label: 'S chvostíkom' },
        { v: 'nositelne', label: 'Nositeľné — tajný pocit plnosti počas spoločného večera' },
      ],
    },
    {
      druh: 'otazka', id: 'an_koralky', typ: 'jeden',
      text: 'Análne korálky — kedy vytiahnuť',
      moznosti: [
        { v: 'vydych', label: 'Na výdych' },
        { v: 'vyvrcholenie', label: 'Pri vyvrcholení' },
        { v: 'nezaujem', label: 'Nezáujem' },
      ],
    },
    p('an_dilda', 'Análne dildá zakrivené na prostatu'),
    {
      druh: 'otazka', id: 'an_prostaticke', typ: 'jeden',
      text: 'Prostatické stimulátory (anatomické, vibračné)',
      podmienka: { pohlavie: 'm' },
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'podmienky', label: 'Za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'an_kombinacie', typ: 'viac',
      text: 'Kombinácie',
      moznosti: [
        { v: 'pocas_piv', label: 'Análny kolík počas vaginálnej penetrácie' },
        { v: 'vibrator', label: 'Dvojitá stimulácia s vibrátorom' },
        { v: 'oral', label: 'Plug počas orálu' },
      ],
    },
    {
      druh: 'otazka', id: 'an_bezpecnost', typ: 'viac',
      text: 'Ktoré vlastnosti análnej hračky ma priťahujú',
      moznosti: [
        { v: 'zakladna', label: 'Výrazná ozdobná základňa alebo šperk' },
        { v: 'lub', label: 'Veľmi klzký, hladký pohyb' },
        { v: 'cistenie', label: 'Pevný materiál, hmotnosť a tlak' },
        { v: 'kondom', label: 'Mäkký materiál, ktorý sa prispôsobuje telu' },
      ],
    },
  ],
}

const PENISOVE: Blok = {
  druh: 'skupina', id: 'penisove', nadpis: 'Penisové a párové pomôcky',
  bloky: [
    {
      druh: 'otazka', id: 'pen_kruzky', typ: 'viac',
      text: 'Erekčné krúžky',
      moznosti: [
        { v: 'erekcia', label: 'Na udržanie erekcie' },
        { v: 'vibracia', label: 'S vibráciou pre partnerku' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_masturbatory', typ: 'viac',
      text: 'Masturbátory',
      moznosti: [
        { v: 'umela_vagina', label: 'Umelá vagína (napr. Fleshlight)' },
        { v: 'textura', label: 'S textúrou' },
        { v: 'rukavy', label: 'Vibračné rukávy' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_navleky', typ: 'jeden',
      text: 'Návleky na penis',
      moznosti: [
        { v: 'objem', label: 'Na zväčšenie objemu' },
        { v: 'textura', label: 'Textúry pre stimuláciu partnerky' },
        { v: 'nezaujima', label: 'Nezaujíma ma' },
      ],
    },
    p('pen_parove_vibr', 'Párový vibrátor (tvar U) nosený počas penetrácie'),
    p('pen_sex_stroj', 'Automatizovaný sexuálny stroj (nastaviteľné tempo/hĺbka, jeden sleduje, druhý ovláda diaľkovo)'),
  ],
}

const DP: Blok = {
  druh: 'skupina', id: 'dp', nadpis: 'Dvojitá penetrácia (DP)',
  bloky: [
    p('dp_postoj', 'Dvojitá penetrácia (penis + hračka: anál + vagína, prípadne dve v jednej oblasti)'),
    {
      druh: 'otazka', id: 'dp_konfig', typ: 'viac',
      text: 'Konfigurácia',
      moznosti: [
        { v: 'vagina_anal', label: 'Penis vo vagíne + vibrátor v anále' },
        { v: 'anal_vagina', label: 'Penis v anále + vibrátor vo vagíne' },
        { v: 'dve_hracky', label: 'Dve hračky' },
      ],
    },
    {
      druh: 'otazka', id: 'dp_priprava', typ: 'viac',
      text: 'Ako má narastať intenzita',
      moznosti: [
        { v: 'rozsirenie', label: 'Postupne od jednej stimulácie k pocitu naplnenia' },
        { v: 'lub', label: 'Klzkosť a plynulé kĺzanie ako súčasť vzrušenia' },
        { v: 'koordinacia', label: 'Synchronizované pohyby penisu a hračky' },
        { v: 'pomaly', label: 'Pomalé vlny, pauzy a potom intenzívnejší rytmus' },
      ],
    },
  ],
}

const BDSM_POMOCKY: Blok = {
  druh: 'skupina', id: 'bdsm_pomocky', nadpis: 'BDSM pomôcky',
  uvod: 'Detailná téma je „BDSM a mocenská dynamika" — tu len či nás pomôcky lákajú.',
  bloky: [
    {
      druh: 'otazka', id: 'bdsm_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré pomôcky ma lákajú',
      moznosti: [
        { v: 'kovove_puta', label: 'Kovové putá' },
        { v: 'manzety', label: 'Kožené manžety' },
        { v: 'zavesne', label: 'Závesné obmedzovače' },
        { v: 'lana', label: 'Laná na shibari' },
        { v: 'pasky', label: 'Bondážne pásky (nelepivé)' },
        { v: 'vak', label: 'Bondážny vak' },
        { v: 'flogger', label: 'Flogger' },
        { v: 'placacka', label: 'Plácačka / paddle' },
        { v: 'prut', label: 'Prút / trstica' },
        { v: 'gag', label: 'Gag / náhubok' },
        { v: 'nakrcnik', label: 'Nákrčník a vodítko' },
      ],
    },
  ],
}

const LUBRIKANTY: Blok = {
  druh: 'skupina', id: 'lubrikanty', nadpis: 'Lubrikanty a doplnky',
  bloky: [
    {
      druh: 'otazka', id: 'lub_typ', typ: 'viac',
      text: 'Typy lubrikantu',
      moznosti: [
        { v: 'vodny', label: 'Vodný (univerzál)' },
        { v: 'silikon', label: 'Silikónový (nie na silikónové hračky)' },
        { v: 'hybrid', label: 'Hybridný' },
        { v: 'hrejivy', label: 'Hrejivý / chladivý' },
        { v: 'analny', label: 'Análny (hustejší)' },
        { v: 'ochuteny', label: 'Ochutený (na orál)' },
      ],
    },
    {
      druh: 'otazka', id: 'lub_ine', typ: 'viac',
      text: 'Doplnky',
      moznosti: [
        { v: 'ekologicke', label: 'Ekologické pomôcky a lubrikanty' },
        { v: 'svieca', label: 'Masážne sviečky' },
        { v: 'uterak', label: 'Uterák / podložka' },
      ],
    },
  ],
}

const KONTEXT: Blok = {
  druh: 'skupina', id: 'kontext', nadpis: 'Kto ovláda a kontext',
  bloky: [
    {
      druh: 'otazka', id: 'kto_ovlada', typ: 'jeden',
      text: 'Kto ovláda hračku',
      moznosti: [
        { v: 'ja', label: 'Ja' },
        { v: 'partner', label: g('Partnerka', 'Partner') },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    {
      druh: 'otazka', id: 'kedy', typ: 'viac',
      text: 'Kedy',
      moznosti: [
        { v: 'solo', label: 'Sólo' },
        { v: 'spolu', label: 'Spolu' },
        { v: 'penetracia', label: 'Počas penetrácie' },
        { v: 'oral', label: 'Počas orálu' },
        { v: 'diskretne', label: 'Diskrétne mimo domova' },
      ],
    },
    {
      druh: 'otazka', id: 'kombinacia_naraz', typ: 'jeden',
      text: 'Kombinovať viacero pomôcok/techník naraz (napr. viazanie + vibrátor + zmena polohy) v jednej scéne',
      moznosti: [
        { v: 'ano', label: 'Áno, lákajú ma komplexnejšie scenáre' },
        { v: 'mozno', label: 'Možno, ak to nebude príliš intenzívne' },
        { v: 'nie', label: 'Nie, dávam prednosť jednoduchej hre — jedna vec naraz' },
      ],
    },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'Pomôcka alebo kombinácia, ktorú chcem skúsiť ako prvú:' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'Pomôcka, ktorá ma zatiaľ láka skôr vo fantázii:' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'Detail pomôcky alebo spôsob použitia, ktorý ma eroticky vypína:' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chcem, aby partnerka vedela (1–3 vety):', 'Čo chcem, aby partner vedel (1–3 vety):') },
  ],
}

export const POMOCKY_HRACKY: TemaObsah = {
  slug: 'vibratory-stimulatory/vibratory-stimulatory',
  nadpis: 'Erotické pomôcky a hračky',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'prehlad', nadpis: 'Prehľad',
      telo:
        'Pomôcky nie sú len pre odvážnych — sú pre každého, kto chce cítiť viac. Pestrosť dodá vzťahu iskru, skúšanie nového prehĺbi dôveru a zmysly či hračky prinesú úplne nové formy potešenia. ' +
        'Vibrátory, dildá, análne hračky, penisové a párové pomôcky, BDSM pomôcky, lubrikanty.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Ktoré kategórie pomôcok ťa lákajú?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'vibratory', label: 'Vibrátory' },
        { v: 'dilda', label: 'Dildá' },
        { v: 'analne', label: 'Análne hračky' },
        { v: 'penisove', label: 'Penisové a párové pomôcky' },
        { v: 'dp', label: 'Dvojitá penetrácia' },
        { v: 'bdsm', label: 'BDSM pomôcky' },
        { v: 'ziadne', label: g('Zatiaľ nič konkrétne — som zvedavý', 'Zatiaľ nič konkrétne — som zvedavá') },
      ],
    },
    HRY,
    PREDOHRA,
    POSTOJ_PARTNER,
    VIBRATORY,
    DILDA,
    ANALNE,
    PENISOVE,
    DP,
    BDSM_POMOCKY,
    LUBRIKANTY,
    KONTEXT,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledok ukáže, ktoré hračky, vnemy, kombinácie a roly vás priťahujú oboch — aj či vás viac láka výber, ovládanie, sledovanie alebo samotný telesný pocit.',
    },
  ],
}
