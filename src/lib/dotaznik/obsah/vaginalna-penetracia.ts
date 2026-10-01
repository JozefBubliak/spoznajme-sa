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
// Rešerš pre vaginálnu manuálnu stimuláciu a fisting (XLSM-014):
// https://pubmed.ncbi.nlm.nih.gov/26880506/
// https://pubmed.ncbi.nlm.nih.gov/25112854/
// https://pubmed.ncbi.nlm.nih.gov/29198508/
// https://journals.plos.org/plosone/doi?id=10.1371/journal.pone.0249242
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — neláka ma to' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Penetrácia ako voľba ──────────────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „7) Penetrácia & polohy" — chýbajúci
// rámec „musí byť/nemusí byť" a premenlivosť pocitu pri penetrácii.
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
      telo: 'Penetrácia nemusí byť stále rovnaká ani povinná. Niekedy telo túži po plnosti a hlbokom tlaku, inokedy po plytkej hre pri vstupe, dlhom nehybnom objatí alebo úplne inom druhu sexu.',
    },
    { druh: 'otazka', id: 'vol_prvy_krok', typ: 'text', text: 'Keď ma aktuálny pocit prestane vzrušovať, na čo chcem prejsť — plytšie, iný uhol, nehybný tlak, klitoris alebo inú aktivitu:' },
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
      text: g('Ktoré techniky mám rád', 'Ktoré techniky mám rada'),
      moznosti: [
        { v: 'plytke_hlboke', label: 'Striedanie plytkých a hlbokých ťahov' },
        { v: 'angling', label: '„Angling" — uhol smerom na prednú stenu (G-bod)' },
        { v: 'a_bod', label: 'Tlak hlboko vpredu blízko krčka (A-bod) pri hlbších ťahoch' },
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
        { v: 'ja_sam', label: g('Ja sám', 'Ja sama') },
        { v: 'partner', label: g('Partnerka rukou', 'Partner rukou') },
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
    { druh: 'otazka', id: 'sur_uz_veela', typ: 'text', text: 'Ktorá intenzívna telesná reakcia ma vzrušuje najviac — napätie panvy, zrýchlený dych, zvuky, pocit plnosti alebo strata rytmu:' },
    { druh: 'otazka', id: 'sur_signal_stop', typ: 'text', text: 'Ako chcem, aby dravá penetrácia vyvrcholila alebo prešla do ďalšej aktivity:' },
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
      druh: 'text', id: 'fis_info', nadpis: 'Plnosť, tlak a úplné odovzdanie', ton: 'info',
      telo: g(
        'Vaginálny fisting môže byť pre muža intenzívnym zážitkom z partnerkinho odovzdania: celá ruka je obklopená jej telom a namiesto rýchlych ťahov môže vytvárať hlboký tlak, malé pulzy alebo nehybný pocit plnosti. Erotický náboj môže stáť na presnosti, moci, pohľade na jej reakciu alebo vedomí, že sa jej dotýka spôsobom úplne odlišným od penisu.',
        'Vaginálny fisting môže priniesť pocit úplnej plnosti, hlbokého vnútorného tlaku a odovzdania, ktorý sa nepodobá bežnej penetrácii. Ruka môže zostať nehybná, jemne pulzovať, meniť svoj tvar alebo sa spojiť s klitorisom; vzrušujúce môže byť aj to, že partner cíti každý pohyb mojej panvy a svalov zvnútra.',
      ),
    },
    {
      druh: 'text', id: 'fis_myty', nadpis: 'Mýty a tipy', ton: 'info',
      telo:
        'Mýtus: fisting musí byť rýchly, násilný alebo vyzerať ako porno. Realita: jeho príťažlivosť môže stáť na pomalom pocite plnosti, nehybnom tlaku, malých pulzoch a pohybe panvy.\n\n' +
        'Mýtus: celá ruka znamená, že klitoris prestáva byť dôležitý. Realita: hlboká plnosť a presná vonkajšia stimulácia môžu byť dve samostatné vrstvy toho istého zážitku.\n\n' +
        'Mýtus: túžba po fistingu znamená, že partnerov penis nestačí. Realita: ruka prináša úplne iný tvar, tlak, pohyb a psychologický význam; nie je hodnotením veľkosti partnerovho tela.\n\n' +
        'Mýtus: záujem o intenzívnu plnosť robí ženu „príliš voľnou" alebo nenásytnou. Realita: je to jedna z konkrétnych erotických preferencií a nehovorí nič o jej hodnote ani o kvalite bežného sexu.',
    },
    {
      druh: 'otazka', id: 'fis_postoj', typ: 'jeden',
      text: g('Chcel by som skúsiť vložiť ruku do vagíny partnerky a pomaly experimentovať s hlbokou stimuláciou?', 'Chcela by som, aby partner vložil ruku do mojej vagíny a pomaly experimentoval s hlbokou stimuláciou?'),
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to zapojiť do našich hier' },
        { v: 'ak_chces', label: g('Rád to vyskúšam, ak po tom túži partnerka', 'Rada to vyskúšam, ak po tom túži partner') },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, necítim sa na to' },
      ],
    },
    {
      druh: 'otazka', id: 'fis_motivy', typ: 'viac', inePovolene: true,
      text: 'Čo ma na predstave vaginálneho fistingu priťahuje?',
      moznosti: [
        { v: 'plnost', label: 'Výnimočne intenzívny pocit plnosti' },
        { v: 'hlboky_tlak', label: 'Hlboký tlak po väčšej ploche' },
        { v: 'odovzdanie', label: g('Partnerkino úplné odovzdanie sa mojej ruke', 'Úplné odovzdanie sa partnerovej ruke') },
        { v: 'moc', label: g('Pocit moci a vedenia v mojich rukách', 'Pocit, že partner vedie a drží ma zvnútra') },
        { v: 'tabu', label: 'Tabu a intenzita samotnej predstavy' },
        { v: 'zvedavost', label: 'Zvedavosť na nový druh vnútorného pocitu' },
        { v: 'svaly', label: g('Cítiť jej vnútorné pohyby a zovretie okolo ruky', 'Zvierať a uvoľňovať svaly okolo jeho ruky') },
      ],
    },
    {
      druh: 'otazka', id: 'fis_pocity', typ: 'viac', inePovolene: true,
      text: 'Ktoré vnútorné pohyby a kombinácie ma lákajú?',
      moznosti: [
        { v: 'nehybne', label: 'Ruka zostane nehybná a vytvára súvislú plnosť' },
        { v: 'pulzy', label: 'Malé rytmické pulzy prstov alebo dlane' },
        { v: 'rotacia', label: 'Pomalá rotácia celej ruky' },
        { v: 'zovretie', label: 'Zmena úzkeho tvaru ruky na jemne zovretú päsť vo vnútri' },
        { v: 'panva', label: g('Partnerka sa hýbe proti mojej ruke', 'Ja sa hýbem panvou proti partnerovej ruke') },
        { v: 'klitoris', label: 'Súbežná stimulácia klitorisu' },
        { v: 'svaly', label: 'Rytmické zovretie panvových svalov okolo ruky' },
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
    { druh: 'otazka', id: 'fis_postoj_ine', typ: 'text', text: 'Vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'fis_partner_tuzba', typ: 'jeden',
      text: g('Ako na mňa pôsobí, keď partnerka túži cítiť moju ruku hlboko v sebe?', 'Ako na mňa pôsobí, keď partner túži vložiť do mňa celú ruku?'),
      moznosti: [
        { v: 'silno', label: g('Jej dôvera a túžba ma silno vzrušujú', 'Jeho túžba a intenzita predstavy ma silno vzrušujú') },
        { v: 'rad', label: g('Rád jej túto plnosť poskytujem', 'Rada sa mu v tejto predstave odovzdám') },
        { v: 'zvedavy', label: g('Som zvedavý, ako by jej telo reagovalo', 'Som zvedavá, ako by reagovalo moje telo') },
        { v: 'fantazia', label: 'Vzrušuje ma skôr ako fantázia než plán' },
        { v: 'neutral', label: g('Jej túžbu chápem, ale mňa osobne veľmi nevzrušuje', 'Jeho túžbu chápem, ale mňa osobne veľmi nevzrušuje') },
        { v: 'nie', label: 'Nechcem to zaradiť medzi naše zhody' },
      ],
    },
    { druh: 'otazka', id: 'fis_podmienky', typ: 'text', text: g('Ako vyzerá moja najvzrušujúcejšia predstava tejto hry — poloha, nálada, pohyb a partnerkina reakcia:', 'Ako vyzerá moja najvzrušujúcejšia predstava tejto hry — poloha, nálada, pohyb a partnerovo vedenie:') },
  ],
}

// Hĺbková mapa podľa kvalitatívneho vzoru face-sittingu: nielen technika,
// ale aj erotické jadro, predstava verzus realita a partnerova túžba.
const HLBKOVA_MAPA: Blok = {
  druh: 'skupina', id: 'hlbkova_mapa', nadpis: 'Čo pre mňa penetrácia znamená',
  uvod: 'Rovnaký pohyb môže byť nežný, hravý, odovzdaný aj surový. Táto časť pomenúva, čo z neho robí práve tvoj zážitok.',
  bloky: [
    {
      druh: 'otazka', id: 'vp_jadro', typ: 'viac', inePovolene: true,
      text: 'Čo ma na vaginálnej penetrácii priťahuje najviac',
      moznosti: [
        { v: 'spojenie', label: 'Pocit tesného telesného spojenia' },
        { v: 'plnost', label: 'Plnosť a tlak zvnútra' },
        { v: 'rytmus', label: 'Rytmus, ktorý pohltí celé telo' },
        { v: 'pohlad', label: 'Pohľad na partnerove reakcie zblízka' },
        { v: 'ziaducnost', label: g('Pocit, že ma partnerka chce v sebe', 'Pocit, že ma partner chce preniknúť') },
        { v: 'vedenie', label: 'Vedenie, odovzdanie alebo výmena kontroly' },
        { v: 'surovost', label: 'Dravosť a strata uhladenosti' },
      ],
    },
    {
      druh: 'otazka', id: 'vp_fantazia_realita', typ: 'jeden', inePovolene: true,
      text: 'Kde dnes žije moja najsilnejšia predstava penetrácie',
      moznosti: [
        { v: 'realita', label: 'Už ju zažívam a chcem ju prehĺbiť' },
        { v: 'variacia', label: 'Chcem novú verziu toho, čo už poznáme' },
        { v: 'fantazia', label: 'Zatiaľ najmä vo fantázii' },
        { v: 'slova', label: 'Vzrušuje ma o nej hovoriť počas sexu' },
        { v: 'nelaka', label: 'Nie je pre mňa dôležitou súčasťou sexu' },
      ],
    },
    {
      druh: 'otazka', id: 'vp_partner_tuzba', typ: 'jeden', inePovolene: true,
      text: g('Ako na mňa pôsobí, keď partnerka túži po penetrácii', 'Ako na mňa pôsobí, keď partner túži po penetrácii'),
      moznosti: [
        { v: 'nakazlive', label: g('Jej túžba ma okamžite naladí', 'Jeho túžba ma okamžite naladí') },
        { v: 'ziadany', label: g('Cítim sa žiadaný a chcem jej dať presne ten pocit', 'Cítim sa žiadaná a chcem cítiť jeho túžbu v tele') },
        { v: 'vedenie', label: g('Vzrušuje ma, keď mi ukáže tempo a hĺbku, po ktorých túži', 'Vzrušuje ma, keď ma vedie tempom a hĺbkou, po ktorých túži') },
        { v: 'podla_nalady', label: 'Láka ma to iba v určitej nálade alebo podobe' },
        { v: 'neutral', label: g('Jej túžbu prijímam, ale sama ma nemusí vzrušovať', 'Jeho túžbu prijímam, ale sama ma nemusí vzrušovať') },
        { v: 'nie', label: 'Nechcem, aby sa penetrácia očakávala zakaždým' },
      ],
    },
    {
      druh: 'otazka', id: 'vp_scenar', typ: 'viac', inePovolene: true,
      text: 'Ktoré erotické podoby penetrácie ma lákajú',
      moznosti: [
        { v: 'pomaly', label: 'Veľmi pomalý vstup a dlhé nehybné spojenie' },
        { v: 'ona_vedie', label: 'Žena vedie uhol, hĺbku a rytmus' },
        { v: 'on_vedie', label: 'Muž vedie pevne a rozhodne' },
        { v: 'vlny', label: 'Striedanie plytkých, hlbokých a nehybných chvíľ' },
        { v: 'klitoris', label: 'Penetrácia vrstvená s presnou stimuláciou klitorisu' },
        { v: 'zrkadlo', label: 'Pohľad na spojenie v zrkadle alebo zblízka' },
        { v: 'slova', label: 'Slová, pochvala alebo vulgárnejší tón počas pohybu' },
      ],
    },
    {
      druh: 'otazka', id: 'vp_nova_verzia', typ: 'text',
      text: 'Jedna nová verzia penetrácie, ktorú chcem skúsiť — čo sa zmení na nálade, vedení, uhle alebo rytme:',
    },
    {
      druh: 'text', id: 'vp_myty', nadpis: 'Mýty, ktoré zbytočne zužujú penetráciu', ton: 'info',
      telo: 'Mýtus: penetrácia je automaticky hlavný alebo „skutočný“ sex. Realita: je jednou z mnohých plnohodnotných možností.\n\nMýtus: hlbšie a rýchlejšie znamená lepšie. Realita: pre niekoho je najsilnejší plytký tlak pri vstupe, stabilný rytmus, nehybné spojenie alebo kombinácia s klitorisom.\n\nMýtus: partneri by mali chcieť rovnakú podobu zakaždým. Realita: túžba po jemnosti, plnosti, kontrole či dravosti sa môže meniť podľa nálady bez toho, aby to hodnotilo partnera alebo jeho telo.',
    },
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
    HLBKOVA_MAPA,
    FISTING,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledok ukáže spoločné podoby penetrácie — od plytkej hry a nehybného tlaku po hlbokú intenzitu — ktoré vzrušujú oboch.',
    },
  ],
}
