import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Orgazmus a jeho kontrola — modul D5.
// Zdroj: „dotaznik.xlsx" list „9) Orgazmus, intenzita, edge logika" —
// orgazmus ako štýl (nie povinnosť), synchronizácia, viacnásobné vlny,
// kontrola (D/s), po orgazme. Mechanika edgingu/vĺn/tempa má vlastnú
// tému „Tempo, intenzita a orgazmus" (D4) — tu je dôraz na SAMOTNÝ
// orgazmus (cesta, poradie, kontrola, po ňom), nie na tempo pred ním.
// z/m verzia zrkadlová.
// Doplnené 2026-10-01: Herbenick et al. (orgazmický repertoár), WSFQ/Joyal
// fantasy inventáre, OMGYES pleasure research a komunitné kink checklisty.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string): TemaObsah['nadpis'] => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
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
      text: g('Keď orgazmus nepríde, chcem, aby partnerka', 'Keď orgazmus nepríde, chcem, aby partner'),
      moznosti: [
        { v: 'podporil', label: g('Dala najavo, že to je úplne v poriadku', 'Dal najavo, že to je úplne v poriadku') },
        { v: 'nerozoberal', label: g('Vôbec to nahlas nerozoberala', 'Vôbec to nahlas nerozoberal') },
        { v: 'opytal', label: g('Opýtala sa, čo by pomohlo', 'Opýtal sa, čo by pomohlo') },
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
        { v: 'ja_prvy', label: g('Ja prvý', 'Ja prvá') },
        { v: 'partner_prvy', label: g('Partnerka prvá', 'Partner prvý') },
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
    p('syn_pockat', g('Občas rád počkám so svojím orgazmom kvôli partnerke, bez pocitu tlaku', 'Občas rada počkám so svojím orgazmom kvôli partnerovi, bez pocitu tlaku')),
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
        { v: 'ziadna', label: g('Žiadna kontrola, chcem si to riadiť sám', 'Žiadna kontrola, chcem si to riadiť sama') },
      ],
    },
  ],
}

// ── Viacnásobné vlny ──────────────────────────────────────────────
const VIACNASOBNE: Blok = {
  druh: 'skupina', id: 'viacnasobne', nadpis: 'Viacnásobné vlny',
  bloky: [
    {
      druh: 'text', id: 'via_info', ton: 'info',
      telo:
        'Viacnásobný zážitok nemusí znamenať sériu rovnakých vrcholov. Môže ísť o niekoľko menších vĺn, jeden orgazmus a druhý po pauze, zmenu zóny po prvom vrchole alebo pokračovanie v inom rytme. ' +
        'Citlivosť po orgazme sa líši medzi ľuďmi aj medzi jednotlivými dňami.',
    },
    {
      druh: 'otazka', id: 'via_skusenost', typ: 'jeden',
      text: 'Viac orgazmov/vĺn za sebou',
      moznosti: [
        { v: 'mam_a_chcem', label: 'Mám túto skúsenosť a chcem ju rozvíjať' },
        { v: 'fantazia', label: g('Zatiaľ len fantázia, chcel by som to skúsiť', 'Zatiaľ len fantázia, chcela by som to skúsiť') },
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
    {
      druh: 'otazka', id: 'via_cesta', typ: 'viac', inePovolene: true,
      text: 'Čo mi pri skúmaní ďalšej vlny dáva najväčší zmysel',
      moznosti: [
        { v: 'jemnejsie', label: 'Po prvom vrchole výrazne zjemniť' },
        { v: 'ina_zona', label: 'Presunúť sa na inú erotogénnu zónu' },
        { v: 'pauza', label: 'Dať si krátku pauzu a vrátiť sa' },
        { v: 'staly_rytmus', label: 'Pokračovať v rovnakom rytme' },
        { v: 'hracka', label: 'Pridať alebo vymeniť pomôcku' },
        { v: 'partner_vedie', label: g('Nechať ďalšiu vlnu viesť partnerku', 'Nechať ďalšiu vlnu viesť partnera') },
      ],
    },
    {
      druh: 'text', id: 'via_myty', nadpis: 'Mýtus verzus realita', ton: 'info',
      telo:
        'Mýtus: viac orgazmov je automaticky lepších než jeden. Realita: jeden hlboký vrchol, viac menších vĺn aj sex bez orgazmu môžu byť rovnako hodnotné. ' +
        'Schopnosť pokračovať nie je skúška kondície ani ženskosti či mužnosti a nie je dôvodom na hanbu.',
    },
  ],
}

const ORGAZMICKE_SCENARE: Blok = {
  druh: 'skupina', id: 'orgazmicke_scenare', nadpis: 'Orgazmické scenáre — vrchol, ktorý nesie vlastný príbeh',
  uvod:
    'Orgazmus môže byť odmena, príkaz, prekvapenie, nedokončený vrchol alebo iba vedľajší efekt celého zážitku. Niektorých vzrušuje kontrola a presné načasovanie, iných predstava, že telo „neposlúchne“ plán.',
  bloky: [
    {
      druh: 'otazka', id: 'osc_prijimam', typ: 'viac', inePovolene: true, rola: 'prijimam',
      text: 'Ktoré scenáre chcem zažiť na vlastnom tele',
      moznosti: [
        { v: 'na_povel', label: 'Orgazmus na povel alebo po odpočítaní' },
        { v: 'forced', label: '„Forced orgasm“ — partner pokračuje v stimulácii v dohodnutej role' },
        { v: 'ruined', label: 'Ruined orgasm — zámerne prerušená stimulácia tesne pri vrchole' },
        { v: 'overstim', label: 'Overstimulation — pokračovanie po orgazme cez precitlivenosť' },
        { v: 'handsfree', label: 'Hands-free orgazmus bez priamej stimulácie genitálií' },
        { v: 'bez_dotyku', label: 'Fantasy orgazmu iba hlasom, predstavou alebo príkazom' },
        { v: 'viacnasobny', label: 'Viacnásobné orgazmy alebo dlhé orgazmické vlny' },
        { v: 'spolocny', label: 'Súčasný orgazmus ako spoločné finále' },
        { v: 'sledovany', label: g('Byť pozorovaný pri orgazme bez pomoci partnerky', 'Byť pozorovaná pri orgazme bez pomoci partnera') },
        { v: 'zakazany', label: 'Orgazmus zakázaný počas celej scény' },
      ],
    },
    {
      druh: 'otazka', id: 'osc_poskytujem', typ: 'viac', inePovolene: true, rola: 'poskytujem',
      text: g('Ktoré orgazmické scenáre chcem vytvoriť partnerke', 'Ktoré orgazmické scenáre chcem vytvoriť partnerovi'),
      moznosti: [
        { v: 'na_povel', label: g('Viesť partnerku k orgazmu na povel', 'Viesť partnera k orgazmu na povel') },
        { v: 'forced', label: 'Pokračovať v dohodnutej forced-orgasm role' },
        { v: 'ruined', label: 'Zámerne „pokaziť“ vrchol prerušením' },
        { v: 'overstim', label: 'Pokračovať cez precitlivenosť po orgazme' },
        { v: 'edging', label: 'Opakovane priviesť tesne k vrcholu a oddialiť ho' },
        { v: 'sledovat', label: g('Iba pozorovať partnerkin orgazmus a reakciu tela', 'Iba pozorovať partnerov orgazmus a reakciu tela') },
        { v: 'viacnasobny', label: 'Skúmať viacnásobné vlny bez tlaku na počet' },
      ],
    },
    {
      druh: 'otazka', id: 'osc_telesne_varianty', typ: 'viac', inePovolene: true,
      text: 'Ktoré telesné varianty ma zaujímajú alebo ich zažívam',
      moznosti: [
        { v: 'org_bez_ejak', label: 'Orgazmus bez ejakulácie' },
        { v: 'ejak_bez_org', label: 'Ejakulácia bez pocitu orgazmu' },
        { v: 'squirting', label: 'Squirting alebo ženská ejakulácia ako možný sprievodný jav' },
        { v: 'bez_org', label: 'Plnohodnotný sex bez orgazmu' },
        { v: 'nejasny', label: 'Nejasná hranica medzi veľmi silným vzrušením a orgazmom' },
      ],
    },
    {
      druh: 'otazka', id: 'osc_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka túži po inom orgazmickom scenári než ja', 'Keď partner túži po inom orgazmickom scenári než ja'),
      moznosti: [
        { v: 'laka', label: g('Jej vzrušenie ma láka a chcem jej ten zážitok vytvoriť', 'Jeho vzrušenie ma láka a chcem mu ten zážitok vytvoriť') },
        { v: 'bez_ciela', label: 'Chcem ho skúmať bez toho, aby výsledok bol povinný' },
        { v: 'fantazia', label: 'Chcem o ňom hovoriť alebo ho hrať slovami, nie telom' },
        { v: 'nie', label: 'Tento scenár vo mne vytvára tlak a nechcem ho' },
      ],
    },
    {
      druh: 'otazka', id: 'osc_squirting_partner', typ: 'jeden',
      text: g('Ako na mňa pôsobí partnerkin squirting alebo ženská ejakulácia', 'Ako chcem, aby partner reagoval na môj squirting alebo ženskú ejakuláciu'),
      moznosti: [
        { v: 'vzrusuje', label: 'Veľmi ma vzrušuje a vnímam ho ako telesný prejav' },
        { v: 'bonus', label: 'Je to príjemný bonus, nie cieľ ani dôkaz kvality' },
        { v: 'neutral', label: 'Je mi to neutrálne' },
        { v: 'nechcem', label: 'Tento prvok nechcem v centre pozornosti' },
      ],
    },
    {
      druh: 'text', id: 'osc_myty', ton: 'info', nadpis: 'Mýty verzus realita',
      telo:
        'Mýtus: každý orgazmus musí vyzerať rovnako a byť sprevádzaný ejakuláciou. Realita: orgazmus, ejakulácia, squirting a subjektívny pocit vrcholu sú prepojené, ale nie totožné javy. Mýtus: „forced orgasm“ znamená skutočné donútenie. V erotickom scenári ide o fantáziu neovládateľnej rozkoše v dohodnutej role, nie o popretie hraníc.',
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
    p('poo_hlucnost', g('Je pre mňa v poriadku byť pri orgazme hlučný', 'Je pre mňa v poriadku byť pri orgazme hlučná')),
    p('poo_partner_hlucny', g('Chcem, aby bola aj partnerka hlučná', 'Chcem, aby bol aj partner hlučný')),
    { druh: 'otazka', id: 'poo_zapamataj', typ: 'text', text: g('Jedna veta, ktorú chcem, aby si partnerka zapamätala o mojom orgazme:', 'Jedna veta, ktorú chcem, aby si partner zapamätal o mojom orgazme:') },
  ],
}

const HLBKOVA_MAPA: Blok = {
  druh: 'skupina', id: 'hlbkova_mapa', nadpis: 'Psychológia orgazmu',
  uvod: 'Orgazmus môže byť súkromné uvoľnenie, spoločný vrchol, predstavenie pre partnera aj chvíľa úplnej straty kontroly. Rozdiel často nie je v sile, ale vo význame.',
  bloky: [
    {
      druh: 'otazka', id: 'org_jadro', typ: 'viac', inePovolene: true,
      text: 'Čo ma na orgazme eroticky priťahuje najviac',
      moznosti: [
        { v: 'uvolnenie', label: 'Telesné uvoľnenie a doznievanie' },
        { v: 'strata_kontroly', label: 'Chvíľa, keď telo prestane poslúchať plán' },
        { v: 'pohlad', label: 'Pohľad na partnerov vrchol a mimovoľné reakcie' },
        { v: 'dar', label: g('Pocit, že som partnerke orgazmus vytvoril', 'Pocit, že som partnerovi orgazmus vytvorila') },
        { v: 'odovzdanie', label: 'Odovzdanie načasovania do partnerových rúk' },
        { v: 'vykon', label: 'Viditeľná alebo hlasná intenzita ako erotické predstavenie' },
        { v: 'spolocny', label: 'Pocit spoločnej vlny, aj keď nepríde presne naraz' },
        { v: 'ocakavanie', label: 'Očakávanie tesne pred vrcholom' },
      ],
    },
    {
      druh: 'otazka', id: 'org_partner_tuzba', typ: 'jeden', inePovolene: true,
      text: g('Ako na mňa pôsobí partnerkina silná túžba priviesť ma k orgazmu', 'Ako na mňa pôsobí partnerova silná túžba priviesť ma k orgazmu'),
      moznosti: [
        { v: 'ziadany', label: g('Cítim sa veľmi žiadaný', 'Cítim sa veľmi žiadaná') },
        { v: 'odovzdam', label: g('Vzrušuje ma odovzdať jej vedenie až do konca', 'Vzrušuje ma odovzdať mu vedenie až do konca') },
        { v: 'ukazem', label: 'Chcem partnerovi presne ukázať, čo moje telo potrebuje' },
        { v: 'bez_ciela', label: g('Láka ma jej pozornosť, ale nechcem z orgazmu urobiť cieľ', 'Láka ma jeho pozornosť, ale nechcem z orgazmu urobiť cieľ') },
        { v: 'tlak', label: 'Táto túžba vo mne môže vytvoriť tlak na výkon' },
        { v: 'nie', label: g('Radšej si svoj orgazmus vediem sám', 'Radšej si svoj orgazmus vediem sama') },
      ],
    },
    {
      druh: 'otazka', id: 'org_partnerov_vrchol', typ: 'viac', inePovolene: true,
      text: g('Čo ma vzrušuje na partnerkinom orgazme', 'Čo ma vzrušuje na partnerovom orgazme'),
      moznosti: [
        { v: 'telo', label: 'Mimovoľné pohyby a napätie tela' },
        { v: 'hlas', label: 'Zvuky, dych a strata uhladenosti' },
        { v: 'pohlad', label: 'Očný kontakt tesne pred vrcholom alebo počas neho' },
        { v: 'moja_zasluha', label: 'Vedomie, že vrchol vzniká mojím dotykom alebo vedením' },
        { v: 'pokyny', label: 'Keď mi povie alebo ukáže, že mám presne pokračovať' },
        { v: 'dozvuk', label: 'Precitlivenosť, úsmev, tras alebo úplné uvoľnenie po ňom' },
      ],
    },
    {
      druh: 'otazka', id: 'org_fantazia_realita', typ: 'viac', inePovolene: true,
      text: 'Ktoré orgazmické fantázie ma lákajú',
      moznosti: [
        { v: 'bez_varovania', label: 'Vrchol bez varovania, ktorý partner rozpozná na tele' },
        { v: 'prikaz', label: 'Orgazmus na pokyn alebo ako odmena' },
        { v: 'zadrziavanie', label: 'Dlhé zadržiavanie a prosenie o dovolenie' },
        { v: 'viac_vln', label: 'Viac vĺn alebo pokračovanie cez precitlivenosť' },
        { v: 'partner_sleduje', label: g('Partnerka iba sleduje, kým sa k vrcholu privediem sám', 'Partner iba sleduje, kým sa k vrcholu privediem sama') },
        { v: 'spolu', label: 'Vyvrcholenie v tesnom kontakte alebo čo najbližšie po sebe' },
        { v: 'bez_orgazmu', label: 'Scéna, ktorá zámerne skončí bez orgazmu' },
      ],
    },
    {
      druh: 'otazka', id: 'org_idealna_scena', typ: 'text',
      text: 'Moja ideálna orgazmická scéna — kto vedie, čo sa deje tesne pred vrcholom, čo partner vidí alebo počuje a ako má chvíľa doznieť:',
    },
    {
      druh: 'text', id: 'org_myty_hlbka', nadpis: 'Mýty, ktoré vytvárajú zbytočný tlak', ton: 'info',
      telo: 'Mýtus: silný orgazmus musí byť hlasný, viditeľný alebo súčasný s partnerovým. Realita: intenzita sa môže prejaviť trasom, tichom, kontrakciami, smiechom aj hlbokým uvoľnením.\n\nMýtus: kto partnera nepriviedol k orgazmu, zlyhal. Realita: vrchol nie je známka ani dôkaz kvality sexu; erotické môže byť aj presné vedenie, očakávanie alebo vedomé nedokončenie.\n\nMýtus: fantázia o kontrole orgazmu znamená túžbu stratiť hlas. Realita: jej náboj môže stáť na role, prosení, odovzdaní alebo predstave neovládateľnej rozkoše.',
    },
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
    ORGAZMICKE_SCENARE,
    HLBKOVA_MAPA,
    PO_ORGAZME,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zvýraznia zhodné cesty k orgazmu, preferované poradie, formy kontroly a potreby po vrchole.',
    },
  ],
}
