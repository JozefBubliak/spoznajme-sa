import type { TemaObsah, Blok, Moznost, Podmienka } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Fetiše a špecifické záujmy — modul G3 „Telesné tekutiny a prirodzenosť".
// Zdroj: „21_Fetise" (checklist materiálov/častí tela + hlboký ponor do
// telesných tekutín + situačné fetiše). Zjednotené, každá odlišná otázka
// zachovaná. z/m verzia zrkadlová (rovnaké id + hodnoty).
// Doplnené 2026-10-01: WHO SHAPE; Holvoet et al. 2017; kink ženy
// (Sagarin et al.); Autostraddle, The Duchy a Temple Scarlet checklisty.
// Rozšírené WAM/tekutiny a nízkofrekvenčný screening špecifických praktík.
// Reaudit XLSM P38657–38888: fyzické, predmetové, materiálové, zmyslové
// a dynamické fetiše; foot play, ruky, vlasy a voyeurizmus.
// Reaudit XLSM P38231–38653: sliny, semeno, watersports, latex/koža,
// voyeur/exhib, chodidlá, textílie a použitá bielizeň.
// Reaudit XLSM P37666–38227: detailné m/ž mapy semena, vaginálnej
// vlhkosti a opakovaný watersports blok.
// Širší screening: Scorolli et al. (2007), 381 online komunít,
// https://pubmed.ncbi.nlm.nih.gov/17304204/; Sagarin et al. — neklinická
// mapa kink žien, https://pmc.ncbi.nlm.nih.gov/articles/PMC4379392/;
// komunitné checklisty: https://kinkchecklist.com/yes-no-maybe-list a
// https://msmorganthorne.com/wp-content/uploads/2019/11/Master-checklist.pdf;
// roly give/receive a inventár tekutín:
// https://kinkchecklist.com/activities/spitting-in-mouth,
// https://kinkchecklist.com/activities/sexual-body-fluids-consuming a
// https://kinkchecklist.com/activities/sexual-body-fluids-on-body.
// Tvrdenia o strave: prehľad https://pubmed.ncbi.nlm.nih.gov/29266782/
// skúma parametre spermií, nie predvídateľnú zmenu chuti ejakulátu.
// Reaudit tekutín: XLSM P37449–38472 a P38787–38793. Medicínska korekcia
// vzťahu subjektívneho a genitálneho vzrušenia: Chivers et al. (2010),
// https://pubmed.ncbi.nlm.nih.gov/20049519/. Menštruačné postoje a skúsenosti:
// https://pubmed.ncbi.nlm.nih.gov/38682834/ a https://pubmed.ncbi.nlm.nih.gov/33347212/.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis'], podmienka?: Podmienka): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ, ...(podmienka ? { podmienka } : {}),
})

const VYZNAM: Moznost[] = [
  { v: 'prirodzenost', label: 'Prirodzenosť a spontánnosť' },
  { v: 'dovera', label: 'Dôvera a intimita' },
  { v: 'moc', label: 'Dominancia a submisivita' },
  { v: 'estetika', label: 'Estetika, vôňa, vizuál' },
]

const SLINY_YFMN: Moznost[] = [
  { v: 'realita', label: 'Chcem to v realite' },
  { v: 'fantazia', label: 'Láka ma to iba ako fantázia' },
  { v: 'mozno', label: 'Možno v konkrétnom scenári' },
  { v: 'nie', label: 'Nie, neláka ma to' },
]
const SLINY_OPEN: Podmienka = { ot: 'sliny_screening', jeNiektora: ['ano', 'mozno'] }

// ── Široký objavovací screening ─────────────────────────────────────────
const FETIS_SCREENING: Blok = {
  druh: 'skupina', id: 'fetis_screening', nadpis: 'Čo všetko môže byť erotickým spúšťačom',
  uvod:
    'Fetiš nemusí byť jedna „zvláštna vec“. Niekedy je jadrom predmet, inokedy materiál, vôňa, zvuk, časť tela, spôsob nosenia alebo rola medzi dvoma ľuďmi. ' +
    'Rovnaké nohavičky môžu vzrušovať čipkou, vôňou, tým, kto ich nosí, alebo tajomstvom, že ich má človek pri sebe. Tento screening hľadá presne tú vrstvu, ktorá zapína teba.',
  bloky: [
    {
      druh: 'otazka', id: 'fs_odev_predmety', typ: 'viac', inePovolene: true,
      text: 'Ktoré oblečenie alebo predmety vo mne prebúdzajú erotickú zvedavosť',
      moznosti: [
        { v: 'nohavicky', label: 'Nohavičky, slipy alebo boxerky' },
        { v: 'podprsenka', label: 'Podprsenka, body alebo korzet' },
        { v: 'pancuchy', label: 'Pančuchy, silonky, podväzky alebo sieťovina' },
        { v: 'ponozky', label: 'Ponožky alebo podkolienky' },
        { v: 'topanky', label: 'Topánky, čižmy, tenisky alebo vysoké opätky' },
        { v: 'rukavice', label: 'Rukavice — čipkové, kožené, latexové alebo pracovné' },
        { v: 'uniforma', label: 'Uniforma alebo pracovné oblečenie' },
        { v: 'formal', label: 'Oblek, košeľa, kravata alebo formálne šaty' },
        { v: 'sport', label: 'Legíny, dres, plavky alebo športové oblečenie' },
        { v: 'maska', label: 'Maska, kapucňa alebo zakrytá identita' },
        { v: 'mokre', label: 'Mokré alebo priesvitné oblečenie' },
        { v: 'sperky', label: 'Šperky, obojok, piercing alebo kovové doplnky' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_materialy', typ: 'viac', inePovolene: true,
      text: 'Ktoré materiály, povrchy alebo zvuky ma priťahujú',
      moznosti: [
        { v: 'latex', label: 'Latex alebo guma — lesk, tlak, vôňa a zvuk' },
        { v: 'koza', label: 'Koža — vôňa, pevnosť a autorita' },
        { v: 'pvc', label: 'PVC alebo vinyl — hladký lesklý povrch' },
        { v: 'hodvab', label: 'Hodváb alebo satén — kĺzanie po koži' },
        { v: 'cipka', label: 'Čipka — jemnosť a čiastočné odhalenie' },
        { v: 'nylon', label: 'Nylon, silonky alebo hladká sieťovina' },
        { v: 'vlna', label: 'Vlna, kožušina alebo mäkký chlpatý povrch' },
        { v: 'kov', label: 'Kov — chlad, hmotnosť a lesk' },
        { v: 'tesne', label: 'Elastický materiál tesne obopínajúci telo' },
        { v: 'zvuk', label: 'Zvuk opätkov, latexu, kože alebo sťahovaného zipsu' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_casti_tela', typ: 'viac', inePovolene: true,
      text: 'Ktoré časti tela alebo detaily si prirodzene všímam',
      moznosti: [
        { v: 'chodidla', label: 'Chodidlá, prsty na nohách alebo klenby' },
        { v: 'ruky', label: 'Ruky, prsty, dlane alebo nechty' },
        { v: 'vlasy', label: 'Vlasy — vzhľad, vôňa, dotyk alebo pohyb' },
        { v: 'podpazusie', label: 'Podpazušie a prirodzená vôňa' },
        { v: 'krk_usi', label: 'Krk, uši alebo zátylok' },
        { v: 'brucho_pupok', label: 'Brucho, boky alebo pupok' },
        { v: 'zadok_stehna', label: 'Zadok, stehná alebo kolená' },
        { v: 'hrudnik', label: 'Hrudník, prsia alebo bradavky' },
        { v: 'chrbat', label: 'Chrbát, ramená alebo lopatky' },
        { v: 'ochlpenie', label: 'Telesné alebo intímne ochlpenie' },
        { v: 'tetovanie', label: 'Tetovanie, piercing alebo jazvy ako vizuálny detail' },
        { v: 'vona', label: 'Prirodzená vôňa kože, potu alebo genitálií' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_ako', typ: 'viac', inePovolene: true,
      text: 'Aký spôsob použitia robí predmet alebo detail erotickým',
      moznosti: [
        { v: 'pozerat', label: 'Pozerať sa, ako ho druhý nosí alebo ukazuje' },
        { v: 'nosit', label: 'Nosiť ho na vlastnom tele' },
        { v: 'obliekat', label: g('Obliekať partnerku alebo jej vybrať vzhľad', 'Obliekať partnera alebo mu vybrať vzhľad') },
        { v: 'vyzliekat', label: 'Pomaly ho vyzliekať alebo sledovať vyzliekanie' },
        { v: 'dotyk', label: 'Dotýkať sa materiálu na tele alebo cez neho stimulovať' },
        { v: 'vona', label: 'Vnímať vôňu predmetu po nosení' },
        { v: 'pri_sebe', label: 'Nosiť predmet druhého človeka pri sebe ako tajomstvo' },
        { v: 'zbierat', label: 'Zbierať, vystavovať alebo fotografovať konkrétne kúsky' },
        { v: 'posluznost', label: 'Použiť predmet ako symbol moci, služby alebo vlastníctva' },
        { v: 'znicit', label: 'Zašpiniť, premočiť, roztrhnúť alebo inak premeniť vzhľad predmetu' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_menej_bezne', typ: 'viac', inePovolene: true,
      text: 'Ktoré menej bežné predmetové alebo situačné fetiše chcem aspoň pomenovať',
      moznosti: [
        { v: 'balony', label: 'Balóny — nafukovanie, napätie alebo prasknutie' },
        { v: 'crush', label: 'Crush/trampling — šliapanie po predmetoch alebo jedle' },
        { v: 'fajcenie', label: 'Fajčenie — obraz, gestá, dym alebo zvuk výdychu' },
        { v: 'medical', label: 'Zdravotnícke oblečenie, rukavice alebo nástroje ako obraz' },
        { v: 'mokre', label: 'Mokré oblečenie, dážď alebo ponorenie vo vode' },
        { v: 'nafukovanie', label: 'Inflation alebo predstava zväčšovania a napĺňania' },
        { v: 'figurka', label: 'Bábiky, figuríny alebo premena človeka na „živý predmet"' },
        { v: 'jedlo', label: 'Jedlo, krémy alebo messy textúry na tele' },
        { v: 'zrkadlo', label: 'Zrkadlá, body paint alebo vizuálna premena tela' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_uroven', typ: 'jeden',
      text: 'Ako chcem označené podnety preskúmať',
      moznosti: [
        { v: 'realita', label: 'Chcem ich zažiť v realite' },
        { v: 'jemna_realita', label: 'Chcem začať jemnou konkrétnou formou' },
        { v: 'fantazia', label: 'Lákajú ma iba ako fantázia, obraz alebo príbeh' },
        { v: 'info', label: 'Najprv chcem pochopiť, čo presne ľudí priťahuje' },
        { v: 'partner', label: g('Sám ich nepotrebujem, ale zaujíma ma partnerkina túžba', 'Sama ich nepotrebujem, ale zaujíma ma partnerova túžba') },
      ],
    },
    {
      druh: 'otazka', id: 'fs_partner_tuzi', typ: 'viac', inePovolene: true,
      text: g('Keď partnerku vzrušuje predmet alebo časť tela, ktorú eroticky nevnímam', 'Keď partnera vzrušuje predmet alebo časť tela, ktorú eroticky nevnímam'),
      moznosti: [
        { v: 'zvedavost', label: g('Jej nadšenie vo mne prebúdza zvedavosť', 'Jeho nadšenie vo mne prebúdza zvedavosť') },
        { v: 'chcem_vidiet', label: 'Chcem vidieť, ako na podnet reaguje' },
        { v: 'vybrat_rolu', label: g('Som otvorený iba vybranej role alebo spôsobu použitia', 'Som otvorená iba vybranej role alebo spôsobu použitia') },
        { v: 'dar', label: g('Rád jej túto skúsenosť doprajem, aj keď ju sám nepotrebujem', 'Rada mu túto skúsenosť doprajem, aj keď ju sama nepotrebujem') },
        { v: 'fantazia', label: 'Môžeme ju zapojiť do slov alebo fantázie, nie do reality' },
        { v: 'nie', label: 'Nie je to pre mňa eroticky príjemné' },
      ],
    },
    {
      druh: 'text', id: 'fs_mytus', nadpis: 'Fetiš nie je diagnóza ani povinnosť', ton: 'info',
      telo:
        'Mýtus: fetiš je vždy extrémny alebo nahrádza partnera. Realita: často ide o jeden detail, ktorý zosilní už existujúcu príťažlivosť — materiál na partnerkinom tele, partnerova vôňa, pohľad na ruky alebo zvuk opätkov. ' +
        'Mýtus: predmet musí byť jediným zdrojom vzrušenia. Realita: veľa ľudí ho vníma ako korenie, nie podmienku sexu. A to, že partnera vzrušuje konkrétny kúsok oblečenia, neznamená, že túži menej po tebe.',
    },
  ],
}

// ── Telesné tekutiny ─────────────────────────────────────────────────────
const SLINY: Blok = {
  druh: 'skupina', id: 'sliny', nadpis: 'Sliny — moc, vlhkosť a intimita',
  uvod:
    'Sliny sú prirodzenou tekutinou tela. Môžu byť jemnou súčasťou bozku a vlhkého dotyku, ale aj surovým symbolom odovzdania, nadvlády alebo tabu. ' +
    'Niekto v nich cíti maximálnu blízkosť, iný ich eroticky nevníma. Ani jedna reakcia nie je dôvodom na hanbu.',
  bloky: [
    {
      druh: 'text', id: 'sliny_naladenie', nadpis: 'Bez hanby a bez jednej „správnej" reakcie', ton: 'info',
      telo:
        'Vlhký bozk, naslinenie prstov, pomalé stekanie po tele a pľuvnutie do úst môžu používať rovnakú tekutinu, no psychologicky pôsobia úplne odlišne. ' +
        'Rozhoduje množstvo, miesto, rola, pohľad, slová aj to, či je pre človeka dôležitejšia neha, živočíšnosť, moc alebo prekročenie tabu.',
    },
    {
      druh: 'otazka', id: 'sliny_screening', typ: 'jeden',
      text: 'Chcem teraz otvoriť tému slín',
      moznosti: [
        { v: 'ano', label: 'Áno, chcem ju preskúmať' },
        { v: 'mozno', label: 'Možno — prejdem si ju zo zvedavosti' },
        { v: 'nie', label: 'Nie, túto tému teraz preskočím' },
      ],
    },
    {
      druh: 'text', id: 'sliny_role_info', nadpis: 'Rola môže zmeniť celú odpoveď', ton: 'info', podmienka: SLINY_OPEN,
      telo:
        'Človeka môže vzrušovať prijímať sliny, ale nie ich používať na druhom — alebo presne naopak. Preto sa každá hlavná forma pýta zvlášť na rolu prijímateľa a aktéra a oddeľuje reálnu túžbu od fantázie.',
    },
    {
      druh: 'otazka', id: 'sliny_prij_lub', typ: 'jeden', podmienka: SLINY_OPEN,
      text: g('Prijímam: partnerka použije sliny ako vlhkosť pri predohre alebo manuálnej stimulácii', 'Prijímam: partner použije sliny ako vlhkosť pri predohre alebo manuálnej stimulácii'), moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_prij_bozk', typ: 'jeden', podmienka: SLINY_OPEN,
      text: 'Prijímam: intenzívny bozk so zdieľaním slín', moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_prij_usta_tvar', typ: 'jeden', podmienka: SLINY_OPEN,
      text: 'Prijímam: sliny na tvár alebo do úst ako prvok moci', moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_prij_telo', typ: 'jeden', podmienka: SLINY_OPEN,
      text: g('Prijímam: partnerka nechá sliny stekať alebo ich rozotrie po mojom tele', 'Prijímam: partner nechá sliny stekať alebo ich rozotrie po mojom tele'), moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_akt_lub', typ: 'jeden', podmienka: SLINY_OPEN,
      text: g('Používam sliny ako vlhkosť pri predohre alebo manuálnej stimulácii partnerky', 'Používam sliny ako vlhkosť pri predohre alebo manuálnej stimulácii partnera'), moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_akt_telo', typ: 'jeden', podmienka: SLINY_OPEN,
      text: g('Nechám sliny stekať alebo pľuvnem na partnerkino telo', 'Nechám sliny stekať alebo pľuvnem na partnerovo telo'), moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_akt_moc', typ: 'jeden', podmienka: SLINY_OPEN,
      text: g('Používam sliny na partnerke ako prejav sily alebo nadvlády', 'Používam sliny na partnerovi ako prejav sily alebo nadvlády'), moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_akt_usta', typ: 'jeden', podmienka: SLINY_OPEN,
      text: g('Dávam partnerke sliny priamo do úst — pľuvnutím alebo pomalým stekaním', 'Dávam partnerovi sliny priamo do úst — pľuvnutím alebo pomalým stekaním'), moznosti: SLINY_YFMN,
    },
    p('sliny_lubrikant', 'Sliny ako prirodzená vlhkosť pri dotykoch na intímnych miestach', SLINY_OPEN),
    p('sliny_na_telo', 'Pľuvanie alebo stekanie slín na telo (prsia, brucho, genitálie) a rozotieranie', SLINY_OPEN),
    p('sliny_do_ust', 'Pľuvanie do úst s chytením za bradu a očným kontaktom', SLINY_OPEN),
    p('sliny_bozk', 'Intenzívne zdieľanie slín počas bozkávania', SLINY_OPEN),
    p('sliny_kombinacia', 'Kombinácia slín s inými tekutinami (semeno, vaginálna vlhkosť)', SLINY_OPEN),
    {
      druh: 'otazka', id: 'sliny_pohon', typ: 'viac', podmienka: SLINY_OPEN, inePovolene: true,
      text: 'Čo ma na slinách vnútorne priťahuje',
      napoveda: 'Vyber najviac tri hlavné motívy.',
      moznosti: [
        { v: 'zivocisnost', label: 'Živočíšnosť — surový, „špinavý" sex' },
        { v: 'prepojenie', label: 'Prepojenie — zdieľanie tekutiny ako maximálna blízkosť' },
        { v: 'moc', label: 'Moc — vládnutie, podriadenie alebo odovzdanie' },
        { v: 'zmysly', label: 'Zmysly — teplo, vôňa, chuť a mokrý pocit' },
        { v: 'tabu', label: 'Tabu — vzrušuje ma robiť niečo „zakázané"' },
        { v: 'vizual', label: 'Vizuál — stekanie, lesk a mokrá pokožka' },
        { v: 'spontannost', label: 'Spontánnosť — netreba nič pripravovať' },
      ],
    },
    {
      druh: 'otazka', id: 'sliny_mnozstvo', typ: 'jeden', podmienka: SLINY_OPEN,
      text: 'Aké množstvo slín ma láka',
      moznosti: [
        { v: 'symbolicky', label: 'Symbolicky — navlhčenie pier alebo prstov' },
        { v: 'par_kvapiek', label: 'Pár viditeľných kvapiek' },
        { v: 'mokre', label: 'Výrazná vlhkosť a mokrý vzhľad' },
        { v: 'vela', label: 'Veľa slín, stekanie a intenzívna messy hra' },
        { v: 'podla_sceny', label: 'Podľa scény a nálady' },
      ],
    },
    {
      druh: 'otazka', id: 'sliny_miesta', typ: 'viac', podmienka: SLINY_OPEN, inePovolene: true,
      text: 'Kde ma sliny lákajú',
      moznosti: [
        { v: 'genitalie', label: 'Genitálie a prsty pri manuálnej stimulácii' },
        { v: 'prsia', label: 'Prsia a bradavky' },
        { v: 'brucho', label: 'Brucho a boky' },
        { v: 'zadok', label: 'Zadok a hrádza' },
        { v: 'tvar', label: 'Tvár' },
        { v: 'usta', label: 'Do úst alebo na jazyk' },
        { v: 'cele_telo', label: 'Po tele ako súčasť messy hry' },
      ],
    },
    {
      druh: 'otazka', id: 'sliny_scenare', typ: 'viac', podmienka: SLINY_OPEN, inePovolene: true,
      text: 'Ktoré scenáre so slinami ma lákajú',
      moznosti: [
        { v: 'naslinenie_prstov', label: 'Pomalé naslinenie prstov pred dotykom' },
        { v: 'mokry_bozk', label: 'Dlhý mokrý bozk bez utierania pier' },
        { v: 'stekanie', label: 'Nechať sliny pomaly stekať na vybrané miesto' },
        { v: 'pluvnutie', label: 'Priame pľuvnutie ako prudký prvok dominancie' },
        { v: 'usta_pomaly', label: 'Pomalé stekanie slín z úst do otvorených úst partnera' },
        { v: 'otvor_usta', label: 'Príkaz otvoriť ústa a prijať sliny' },
        { v: 'lizanie', label: 'Zlízať sliny späť z kože' },
        { v: 'brada', label: 'Nechať ich tiecť z pier po brade a zlízať ich' },
        { v: 'wet_look', label: 'Rozotrieť ich po tele pre mokrý vzhľad' },
        { v: 'dirty_talk', label: 'Nechať scénu iba vo fantázii a opísať ju slovami' },
      ],
    },
    { druh: 'otazka', id: 'sliny_vyznam', typ: 'viac', text: 'Čo je pre mňa na slinách vzrušujúce', moznosti: VYZNAM, podmienka: SLINY_OPEN },
    {
      druh: 'otazka', id: 'sliny_partner_tuzi', typ: 'jeden', podmienka: SLINY_OPEN,
      text: g('Keď partnerka túži po slinách viac než ja', 'Keď partner túži po slinách viac než ja'),
      moznosti: [
        { v: 'laka', label: g('Jej túžba ma vzrušuje a chcem ju preskúmať', 'Jeho túžba ma vzrušuje a chcem ju preskúmať') },
        { v: 'vybrana_forma', label: g('Som otvorený iba vybranej forme, miestu alebo role', 'Som otvorená iba vybranej forme, miestu alebo role') },
        { v: 'fantazia', label: 'Môžeme o tom hovoriť alebo fantazírovať, no nechcem to urobiť' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
    {
      druh: 'text', id: 'sliny_myty', nadpis: 'Mýty a realita', ton: 'info', podmienka: SLINY_OPEN,
      telo:
        'Mýtus: sliny pri sexe sú vždy ponižujúce. Realita: môžu znamenať dominanciu, ale aj nehu, spontánnosť, maximálnu blízkosť alebo jednoducho príjemný mokrý pocit. ' +
        'Mýtus: ak ma niečo vzrušuje vo fantázii, musím to chcieť aj zažiť. Realita: fantázia môže zostať iba slovami a stále byť plnohodnotnou súčasťou sexuality. ' +
        'Túžba po slinách nie je špinavá ani čudná; ide o pomerne bežné spojenie zmyslov, tekutín, tabu a moci.',
    },
    {
      druh: 'text', id: 'sliny_rozhovor_zhoda', nadpis: 'Keď sa zhodnete na realite', ton: 'info', podmienka: SLINY_OPEN,
      telo: 'Porozprávajte sa, v ktorej chvíli je tento prvok najvzrušujúcejší: ako pomalé naladenie, počas manuálnej alebo orálnej stimulácie, pri dominancii, alebo až ako intenzívne finále. Každý nech opíše jednu konkrétnu scénu.',
    },
    {
      druh: 'text', id: 'sliny_rozhovor_mozno', nadpis: 'Keď odpoveď znie „možno"', ton: 'info', podmienka: SLINY_OPEN,
      telo: 'Dokončite vetu: „Lákalo by ma to viac, keby…" Môže ísť o menšie množstvo, iné miesto, inú rolu, pomalšie tempo alebo iba sliny na tele namiesto úst.',
    },
    {
      druh: 'text', id: 'sliny_rozhovor_fantazia', nadpis: 'Keď to má zostať fantáziou', ton: 'info', podmienka: SLINY_OPEN,
      telo: 'Skúste scénu opísať slovami bez jej uskutočnenia: kto vedie, kde sliny dopadnú, čo pri tom zaznie a čo je na predstave najvzrušujúcejšie. Fantázia nemusí byť plán.',
    },
  ],
}

const SEMENO: Blok = {
  druh: 'skupina', id: 'semeno', nadpis: 'Semeno',
  uvod:
    'Pre niekoho je semeno viditeľným finále, stopou túžby alebo zmyslovým detailom; pre iného znamená blízkosť, plodnosť, moc či odovzdanie. ' +
    'Vzrušovať môže miesto, teplo, chuť, vôňa, konzistencia aj samotný okamih ejakulácie — bez toho, aby človek musel chcieť všetky formy.',
  bloky: [
    {
      druh: 'otazka', id: 'semeno_rola', typ: 'viac', inePovolene: true,
      text: 'Ktorá rola alebo pohľad ma pri semene priťahuje',
      moznosti: [
        { v: 'prijat', label: g('Prijať vlastné semeno späť z partnerkiných úst alebo tela', 'Prijať partnerovo semeno na telo alebo do úst') },
        { v: 'dat', label: g('Ejakulovať na telo partnerky alebo do jej úst', 'Naniesť alebo vrátiť partnerovo semeno na jeho telo či do úst') },
        { v: 'sledovat', label: 'Sledovať okamih ejakulácie zblízka' },
        { v: 'rozotriet', label: 'Rozotierať ho po koži alebo genitáliách' },
        { v: 'ochutnat_vlastne', label: 'Ochutnať vlastné semeno alebo ho prijať späť' },
        { v: 'iba_vizual', label: 'Iba vizuál alebo fantázia, nie kontakt' },
      ],
    },
    {
      druh: 'otazka', id: 'semeno_na_telo', typ: 'viac', inePovolene: true,
      text: g('Kde ma láka ejakulovať alebo vidieť svoje semeno', 'Kde mi vyhovuje prijať alebo vidieť partnerovo semeno'),
      moznosti: [
        { v: 'tvar', label: 'Tvár — čelo, líca alebo pery („facial")' },
        { v: 'usta_prehltnut', label: 'Do úst a prehltnúť' },
        { v: 'usta_bez_prehlt', label: 'Do úst bez prehltnutia — vypľuť, ukázať alebo použiť ďalej' },
        { v: 'vlasy', label: 'Vlasy' },
        { v: 'krk_ramena', label: 'Krk, kľúčne kosti alebo ramená' },
        { v: 'prsia', label: 'Prsia a bradavky' },
        { v: 'hrud', label: 'Hruď' },
        { v: 'brucho', label: 'Brucho alebo pupok' },
        { v: 'podbrusko', label: 'Podbruško alebo lonová oblasť' },
        { v: 'vulva', label: 'Vulva zvonka' },
        { v: 'penis_semenniky', label: 'Penis alebo semenníky — vlastné semeno vrátené na telo' },
        { v: 'hrádza', label: 'Hrádza' },
        { v: 'stehna', label: 'Stehná — spredu alebo zvnútra' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'chrbat', label: 'Chrbát alebo kríže' },
        { v: 'ruky', label: 'Ruky alebo prsty' },
        { v: 'chodidla', label: 'Chodidlá alebo prsty na nohách' },
        { v: 'oblecenie', label: 'Spodná bielizeň alebo oblečenie' },
        { v: 'vagina', label: 'Do vagíny' },
        { v: 'anus', label: 'Do análu' },
        { v: 'nikam', label: 'Nikam na telo' },
      ],
    },
    {
      druh: 'text', id: 'semeno_miesta_uvod', nadpis: 'Miesto mení význam celej scény', ton: 'info',
      telo: g(
        'Tvár môže niesť moc a výrazný vizuál, prsia či brucho zmyselnosť, ústa chuť a prijatie a vlasy alebo oblečenie stopu, ktorá zostáva aj po vyvrcholení. Preto každé miesto hodnotíš zvlášť, nie ako jedno všeobecné áno alebo nie.',
        'Tvár môže niesť moc a výrazný vizuál, prsia či brucho zmyselnosť, ústa chuť a prijatie a vlasy alebo oblečenie stopu, ktorá zostáva aj po vyvrcholení. Preto každé miesto hodnotíš zvlášť, nie ako jedno všeobecné áno alebo nie.',
      ),
    },
    p('semeno_miesto_tvar', g('Ejakulovať partnerke na tvár a sledovať výrazný vizuálny okamih', 'Prijať partnerovo semeno na tvár')),
    p('semeno_miesto_usta_prehltnut', g('Ejakulovať partnerke do úst a vzrušuje ma, keď ho prehltne', 'Prijať partnerovo semeno do úst a prehltnúť ho')),
    p('semeno_miesto_usta_hra', g('Ejakulovať partnerke do úst bez očakávania prehltnutia a pokračovať v hre', 'Nechať si partnerovo semeno v ústach, vypľuť ho, rozotrieť alebo vrátiť bozkom')),
    p('semeno_miesto_vlasy', g('Ejakulovať partnerke do vlasov ako výraznú stopu scény', 'Prijať partnerovo semeno do vlasov ako výraznú stopu scény')),
    p('semeno_miesto_krk_ramena', g('Ejakulovať partnerke na krk, kľúčne kosti alebo ramená', 'Prijať partnerovo semeno na krk, kľúčne kosti alebo ramená')),
    p('semeno_miesto_prsia', g('Ejakulovať partnerke na prsia alebo bradavky', 'Prijať partnerovo semeno na prsia alebo bradavky a cítiť jeho stekanie')),
    p('semeno_miesto_hrud', g('Prijať vlastné semeno späť na hruď', 'Naniesť partnerovo semeno na jeho hruď')),
    p('semeno_miesto_brucho', g('Ejakulovať partnerke na brucho alebo pupok', 'Prijať partnerovo semeno na brucho alebo pupok')),
    p('semeno_miesto_podbrusko', g('Ejakulovať partnerke na podbruško alebo lonovú oblasť', 'Prijať partnerovo semeno na podbruško alebo lonovú oblasť')),
    p('semeno_miesto_stehna', g('Ejakulovať partnerke na stehná alebo medzi ne', 'Prijať partnerovo semeno na stehná alebo medzi ne')),
    p('semeno_miesto_zadok', g('Ejakulovať partnerke na zadok', 'Prijať partnerovo semeno na zadok')),
    p('semeno_miesto_chrbat', g('Ejakulovať partnerke na chrbát alebo kríže', 'Prijať partnerovo semeno na chrbát alebo kríže')),
    p('semeno_miesto_ruky', g('Ejakulovať partnerke na ruky alebo prsty a pokračovať v hre', 'Prijať partnerovo semeno na ruky alebo prsty a pokračovať v hre')),
    p('semeno_miesto_chodidla', g('Ejakulovať partnerke na chodidlá alebo prsty na nohách', 'Prijať partnerovo semeno na chodidlá alebo prsty na nohách')),
    p('semeno_miesto_vulva', g('Ejakulovať partnerke na vulvu a pokračovať v stimulácii', 'Prijať partnerovo semeno zvonka na vulvu a pokračovať v stimulácii')),
    p('semeno_miesto_vagina', g('Ejakulovať do partnerkinej vagíny ako predstavu hlbokého spojenia', 'Cítiť partnerovu ejakuláciu vo vagíne ako predstavu hlbokého spojenia')),
    p('semeno_miesto_anal', g('Ejakulovať partnerke do análu', 'Cítiť partnerovu ejakuláciu v anále')),
    p('semeno_miesto_partner', g('Prijať vlastné semeno späť na penis, semenníky alebo hrádzu', 'Naniesť partnerovo semeno späť na jeho penis, semenníky alebo hrádzu')),
    p('semeno_prehltanie', 'Prehĺtanie semena ako súčasť orálneho rituálu'),
    p('semeno_snowballing', '„Snowballing" — predávanie semena ústami späť osobe, ktorá ejakulovala'),
    p('semeno_ocistenie', 'Orálne očistenie po ejakulácii (penis / vagína jazykom)'),
    p('semeno_lubrikant', 'Semeno rozotreté ako lubrikant (klitoris, hrádza)'),
    p('semeno_bielizen', 'Semeno na spodnej bielizni ako pripomienka / vôňa'),
    p('semeno_kombinacia', 'Kombinácia semena so slinami a vaginálnou vlhkosťou („koktail")'),
    p('semeno_usta_bez_prehlt', 'Prijať semeno do úst bez prehltnutia — vypľuť ho alebo ho použiť ďalej'),
    p('semeno_z_tela', 'Zlízať semeno z kože alebo sledovať, ako ho z tela zlíže partner'),
    p('semeno_jedlo', 'Zapojiť semeno do messy hry s ovocím, krémom alebo šľahačkou'),
    p('semeno_partner_hra', g('Sledovať partnerku, ako sa hrá s mojím semenom', 'Hrať sa s partnerovým semenom pred jeho pohľadom')),
    {
      druh: 'otazka', id: 'semeno_vyznam', typ: 'viac', inePovolene: true,
      text: 'Čo je pre mňa na semene vzrušujúce',
      moznosti: [
        ...VYZNAM,
        { v: 'viditelne_finale', label: 'Viditeľné finále a dôkaz vyvrcholenia' },
        { v: 'teplo_textura', label: 'Teplo, konzistencia, vôňa alebo chuť' },
        { v: 'oznacenie', label: 'Označenie tela a pocit, že po nás zostala stopa' },
        { v: 'plodnost', label: 'Symbol plodnosti alebo predstava oplodnenia' },
        { v: 'tabu', label: g('Prekročenie tabu alebo dovolenie nebyť uhladený', 'Prekročenie tabu alebo dovolenie nebyť uhladená') },
      ],
    },
    {
      druh: 'otazka', id: 'semeno_chut', typ: 'text',
      text: 'Čo mi na chuti, vôni alebo konzistencii vyhovuje a čo je pre mňa mimo:',
    },
    {
      druh: 'otazka', id: 'semeno_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka túži po výraznejšej hre so semenom než ja', 'Keď partner túži po výraznejšej hre so semenom než ja'),
      moznosti: [
        { v: 'laka', label: g('Jej túžba ma vzrušuje a chcem nájsť spoločnú formu', 'Jeho túžba ma vzrušuje a chcem nájsť spoločnú formu') },
        { v: 'vybrane', label: 'Áno iba pri vybranom mieste alebo forme' },
        { v: 'fantazia', label: 'Môžeme o tom hovoriť, no nechcem fyzický kontakt' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
    {
      druh: 'text', id: 'semeno_myty', nadpis: 'Mýty a tabu', ton: 'info',
      telo:
        'Chuť na semeno nie je povinnou súčasťou orálneho sexu a odmietnutie konkrétneho miesta nie je odmietnutím človeka. ' +
        'Prijať semeno do úst tiež neznamená povinnosť prehltnúť ho; pre niekoho je erotická práve možnosť vidieť ho, vypľuť, vrátiť bozkom alebo rozotrieť ďalej. ' +
        'Fantázia o ejakulácii dovnútra nemusí znamenať plán na rodičovstvo — často ide o symbol úplného odovzdania, plodnosti alebo zakázaného rizika. Hra so semenom nemusí byť ponižujúca: môže byť nežná, vizuálna, hravá aj mocenská. ' +
        'Internetové sľuby, že ananás alebo konkrétne jedlo spoľahlivo zmení chuť semena, nie sú overený recept. Chuť a vôňa sa prirodzene menia a žiadna potravina negarantuje konkrétny výsledok.',
    },
  ],
}

const VLHKOST: Blok = {
  druh: 'skupina', id: 'vlhkost', nadpis: 'Vaginálna vlhkosť',
  uvod:
    'Vaginálna vlhkosť môže byť zmyselná stopa vzrušenia — teplá, voňavá, lesklá a veľmi osobná. Nie je však spoľahlivým meradlom túžby, súhlasu ani potešenia: ' +
    'telesná reakcia a vnútorné prežívanie sa nemusia vždy zhodovať. Práve preto môže byť erotická bez toho, aby sa z nej robila skúška toho, „ako veľmi" žena chce.',
  bloky: [
    p('vlhkost_ochutnat', g('Ochutnať partnerkinu vlhkosť priamo a venovať sa jej chuti aj vôni', 'Nechať partnera ochutnať moju vlhkosť priamo a cítiť jeho nadšenie')),
    p('vlhkost_prsty', g('Zlízať vlhkosť z partnerkiných prstov, keď mi ich vedome ponúkne', 'Navlhčiť si prsty a ponúknuť ich partnerovi na pomalé zlíznutie')),
    p('vlhkost_bozk', g('Ochutnať partnerkinu vlhkosť z jej pier počas dlhého bozku', 'Naniesť si vlastnú vlhkosť na pery a dať ju partnerovi ochutnať v bozku')),
    p('vlhkost_rozotieranie', g('Ochutnávať partnerkinu vlhkosť z jej bradaviek alebo tela', 'Naniesť si vlastnú vlhkosť na bradavky alebo telo a nechať ju partnera zlízať')),
    p('vlhkost_penis', 'Rozotrieť ju po penise alebo použiť pri vzájomnom trení tiel'),
    p('vlhkost_vona', g('Vnímať partnerkinu prirodzenú vôňu ako samostatný erotický podnet', 'Vzrušuje ma, keď partner vyhľadáva moju prirodzenú vôňu')),
    p('vlhkost_bielizen', g('Vôňa a mokrá stopa na partnerkiných nohavičkách ako intímna pripomienka', 'Nechať partnerovi nohavičky s mojou prirodzenou vôňou a mokrou stopou')),
    p('vlhkost_ponuknut', g('Vedome sa mi partnerka ponúkne, aby som ochutnal', 'Vedome sa partnerovi ponúknem, aby ochutnal')),
    p('vlhkost_kombinacia', 'Kombinácia s inými tekutinami počas hry'),
    {
      druh: 'otazka', id: 'vlhkost_vyznam', typ: 'viac', inePovolene: true,
      text: 'Čo ma na vaginálnej vlhkosti priťahuje',
      moznosti: [
        { v: 'chut_vona', label: 'Prirodzená chuť a vôňa' },
        { v: 'teplo_klzkost', label: 'Teplo, klzkosť a mokrý pocit' },
        { v: 'vizual', label: 'Lesk, stekanie alebo mokrý odtlačok' },
        { v: 'intimita', label: 'Pocit prijatia prirodzeného tela bez hanby' },
        { v: 'reakcia', label: 'Viditeľná telesná reakcia partnerky — bez domýšľania súhlasu' },
        { v: 'uctievanie', label: g('Pocit, že môžem partnerkino prirodzené telo obdivovať a oslavovať', 'Pocit, že partner moje prirodzené telo obdivuje a oslavuje') },
        { v: 'vabenie', label: g('Keď mi ju partnerka vedome ponúkne ako zvodné pozvanie', 'Keď ju môžem partnerovi ponúknuť ako zvodné pozvanie') },
      ],
    },
    {
      druh: 'otazka', id: 'vlhkost_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka chce, aby som jej vlhkosti venoval viac pozornosti', 'Keď partner chce oslavovať moju prirodzenú vlhkosť viac než ja'),
      moznosti: [
        { v: 'laka', label: 'Vzrušuje ma to a chcem to preskúmať' },
        { v: 'jemne', label: 'Áno, ale iba jemne a bez veľkého zvýrazňovania' },
        { v: 'slova', label: 'Môžeme o tom hovoriť, no nechcem z toho robiť samostatnú hru' },
        { v: 'nie', label: 'Nie je mi to príjemné' },
      ],
    },
    {
      druh: 'text', id: 'vlhkost_mytus', nadpis: 'Mýtus verzus realita', ton: 'info',
      telo:
        'Mýtus: čím je žena vlhšia, tým viac túži po sexe. Realita: zvlhčenie ovplyvňuje cyklus, hormóny, lieky, stres aj druh stimulácie a nemusí kopírovať subjektívnu túžbu. ' +
        'Menej vlhkosti neznamená nezáujem a viac vlhkosti nikdy nenahrádza jasný súhlas.',
    },
  ],
}

const MOC: Blok = {
  druh: 'skupina', id: 'moc_tek', nadpis: 'Moč (watersports)',
  uvod:
    'Teplý prúd na koži, úplná telesná prirodzenosť, odovzdanie, dominancia alebo vedomie, že spolu prekračujete silné tabu — watersports môže priťahovať veľmi odlišnými spôsobmi. ' +
    'Pre niekoho je jadrom jemná spoločná sprcha, pre iného sledovanie, označenie tela alebo intenzívna mocenská scéna.',
  bloky: [
    {
      druh: 'otazka', id: 'moc_uroven', typ: 'jeden',
      text: 'Kde som s „watersports"?',
      moznosti: [
        { v: 'fantazia', label: 'Len fantázia alebo dirty talk' },
        { v: 'mozno', label: 'Možno v konkrétnom scenári' },
        { v: 'ano', label: 'Áno, chcem to v realite' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
    {
      druh: 'otazka', id: 'moc_rola', typ: 'viac', inePovolene: true,
      text: 'Ktoré roly alebo podoby ma lákajú',
      podmienka: { ot: 'moc_uroven', jeNiektora: ['fantazia', 'mozno', 'ano'] },
      moznosti: [
        { v: 'prijimat', label: 'Prijímať na telo alebo zvolenú časť tela' },
        { v: 'poskytovat', label: g('Močiť na partnerku', 'Močiť na partnera') },
        { v: 'sledovat', label: 'Pozerať sa na močenie bez kontaktu' },
        { v: 'byt_sledovany', label: g('Byť sledovaný pri močení', 'Byť sledovaná pri močení') },
        { v: 'spolu', label: 'Močiť spolu v sprche alebo vonku' },
        { v: 'kontrola', label: 'Mocenská hra s príkazom, čakaním alebo označením' },
      ],
    },
    {
      druh: 'otazka', id: 'moc_kam', typ: 'viac',
      text: 'Ak áno — kam je to v poriadku',
      podmienka: { ot: 'moc_uroven', jeNiektora: ['mozno', 'ano'] },
      moznosti: [
        { v: 'telo', label: 'Na telo' },
        { v: 'v_sprche', label: 'Len v sprche / vani' },
        { v: 'genital', label: 'Na genitálie' },
        { v: 'tvar', label: 'Na tvár' },
        { v: 'usta', label: 'Do úst' },
      ],
    },
    {
      druh: 'otazka', id: 'moc_vyznam', typ: 'viac', inePovolene: true,
      text: 'Čo ma na predstave priťahuje',
      podmienka: { ot: 'moc_uroven', jeNiektora: ['fantazia', 'mozno', 'ano'] },
      moznosti: [
        { v: 'teplo', label: 'Teplo a mokrý pocit' },
        { v: 'tabu', label: 'Prekročenie tabu' },
        { v: 'moc', label: 'Dominancia, odovzdanie alebo poníženie' },
        { v: 'prirodzenost', label: 'Úplná telesná prirodzenosť bez uhladenosti' },
        { v: 'tajomstvo', label: 'Súkromný rituál, o ktorom vieme iba my' },
      ],
    },
    {
      druh: 'otazka', id: 'moc_scenare', typ: 'viac', inePovolene: true,
      text: 'Ktoré konkrétne scenáre ma priťahujú',
      podmienka: { ot: 'moc_uroven', jeNiektora: ['fantazia', 'mozno', 'ano'] },
      moznosti: [
        { v: 'sprcha_jemne', label: 'Jemný, spontánny moment počas spoločnej sprchy' },
        { v: 'sledovat', label: g('Sledovať partnerku pri močení', 'Sledovať partnera pri močení') },
        { v: 'na_telo', label: 'Teplý prúd na hrudník, brucho, stehná alebo genitálie' },
        { v: 'oznacenie', label: 'Označenie tela ako prejav vlastníctva alebo odovzdania' },
        { v: 'tvar', label: 'Intenzívnejšia scéna na tvár' },
        { v: 'usta', label: 'Prijatie do úst alebo predstava „human toilet"' },
        { v: 'oblecenie', label: 'Močenie cez oblečenie alebo na bielizeň' },
        { v: 'drzanie', label: 'Príkaz čakať, držať moč alebo požiadať o dovolenie' },
      ],
    },
    { druh: 'otazka', id: 'moc_podmienky', typ: 'text', text: 'Scenár, miesto a forma, ktoré si viem predstaviť:', podmienka: { ot: 'moc_uroven', jeNiektora: ['mozno', 'ano'] } },
    {
      druh: 'otazka', id: 'moc_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka túži po watersports viac než ja', 'Keď partner túži po watersports viac než ja'),
      moznosti: [
        { v: 'laka', label: g('Jej túžba ma láka a chcem hľadať spoločnú verziu', 'Jeho túžba ma láka a chcem hľadať spoločnú verziu') },
        { v: 'fantazia', label: g('Som otvorený iba fantázii alebo slovám', 'Som otvorená iba fantázii alebo slovám') },
        { v: 'vybrane', label: 'Iba vybraná rola, miesto alebo forma' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
    {
      druh: 'text', id: 'moc_myty', nadpis: 'Tabu nehovorí, čo to musí znamenať', ton: 'info',
      telo:
        'Watersports nemusí byť automaticky o ponížení. Rovnaký čin môže znamenať hravú prirodzenosť v sprche, zmyslový zážitok tepla, obdiv tela, odovzdanie alebo výraznú moc. ' +
        'A fantázia o intenzívnej forme neznamená, že človek chce každú rolu, každé miesto alebo jej uskutočnenie v realite.',
    },
  ],
}

const SLZY: Blok = {
  druh: 'skupina', id: 'slzy', nadpis: 'Slzy a emočné výlevy',
  uvod: 'Slzy môžu znamenať zraniteľnosť, úľavu, intenzitu alebo krásu úplného odovzdania. Nie každé slzenie je smútok a nie každého erotizuje rovnaký význam.',
  bloky: [
    p('slzy_zranitelnost', 'Fetiš na zraniteľnosť — vidieť / prejaviť emóciu a slzy počas intimity'),
    p('slzy_scena', 'Slzy počas intenzívnej scény ako uvoľnenie / katarzia'),
    {
      druh: 'otazka', id: 'slzy_vyznam', typ: 'viac', inePovolene: true,
      text: 'Čo ma na slzách priťahuje',
      moznosti: [
        { v: 'zranitelnost', label: 'Zraniteľnosť a otvorenosť' },
        { v: 'katarzia', label: 'Uvoľnenie a katarzia' },
        { v: 'intenzita', label: 'Viditeľný znak intenzívneho prežívania' },
        { v: 'moc', label: 'Mocenský obraz v dohodnutej scéne' },
        { v: 'starostlivost', label: g('Možnosť po intenzite partnerku držať a upokojiť', 'Možnosť po intenzite partnera držať a upokojiť') },
      ],
    },
    {
      druh: 'otazka', id: 'slzy_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku erotizujú slzy viac než mňa', 'Keď partnera erotizujú slzy viac než mňa'),
      moznosti: [
        { v: 'laka', label: 'Chcem pochopiť význam a preskúmať ho' },
        { v: 'iba_emocie', label: g('Som otvorený prirodzenej emócii, nie vyvolávaniu slz', 'Som otvorená prirodzenej emócii, nie vyvolávaniu slz') },
        { v: 'fantazia', label: 'Iba ako fantázia alebo slovný obraz' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
  ],
}

const MENSTRUACIA: Blok = {
  druh: 'skupina', id: 'menstruacia', nadpis: 'Menštruačná krv',
  uvod:
    'Sex počas menštruácie môže pôsobiť telesne, nežne, zakázane alebo úplne prirodzene. Niekoho priťahuje väčšia vlhkosť a pocit prijatia tela bez hanby; iný chce blízkosť, ale nie vedomú hru s krvou.',
  bloky: [
    p('men_sex', 'Sex počas menštruácie'),
    p('men_periodplay', '„Period play" — vedomá hra s menštruačnou krvou'),
    {
      druh: 'otazka', id: 'men_formy', typ: 'viac', inePovolene: true,
      text: 'Ktoré formy ma lákajú alebo sú mi príjemné',
      moznosti: [
        { v: 'bezna_intimita', label: 'Bežná intimita bez zdôrazňovania krvi' },
        { v: 'sprcha', label: 'Sex alebo dotyky v sprche' },
        { v: 'oral', label: 'Orálna stimulácia aj počas menštruácie' },
        { v: 'prsty', label: 'Prsty a manuálna stimulácia' },
        { v: 'penetracia', label: 'Penetrácia a výraznejšia vlhkosť' },
        { v: 'viditelna', label: 'Viditeľná krv na tele, rukách alebo plachte' },
        { v: 'iba_nepenetracne', label: 'Iba nepenetračná blízkosť' },
      ],
    },
    {
      druh: 'otazka', id: 'men_vyznam', typ: 'viac', inePovolene: true,
      text: 'Čo je na tejto téme erotické alebo dôležité',
      moznosti: [
        { v: 'prijatie', label: 'Prijatie prirodzeného tela bez hanby' },
        { v: 'tabu', label: 'Prekročenie kultúrneho tabu' },
        { v: 'vlhkost', label: 'Teplo, vlhkosť a iný telesný pocit' },
        { v: 'blizkost', label: 'Blízkosť aj v čase, ktorý sa často považuje za „nevhodný"' },
        { v: 'vizual', label: 'Farba a viditeľná telesnosť' },
      ],
    },
    {
      druh: 'otazka', id: 'men_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka túži po intimite počas menštruácie viac než ja', 'Keď partner túži po intimite počas mojej menštruácie viac než ja'),
      moznosti: [
        { v: 'laka', label: g('Jej prirodzenosť a otvorenosť ma vzrušujú', 'Jeho prijatie môjho tela ma vzrušuje') },
        { v: 'vybrane', label: 'Áno, ale iba vybrané formy' },
        { v: 'nepenetracne', label: 'Chcem blízkosť, nie genitálnu alebo krvavú hru' },
        { v: 'nie', label: 'Nie je mi to príjemné' },
      ],
    },
    {
      druh: 'text', id: 'men_mytus', nadpis: 'Mýtus verzus realita', ton: 'info',
      telo:
        'Mýtus: menštruačná krv robí telo nečistým alebo menej žiaducim. Realita: odpor a hanba sú silno ovplyvnené kultúrou a ľudia majú veľmi rozdielne postoje. ' +
        'Sex počas menštruácie a vedomá hra s krvou sú dve odlišné preferencie — súhlas s jednou neznamená túžbu po druhej.',
    },
  ],
}

const POT: Blok = {
  druh: 'skupina', id: 'pot', nadpis: 'Pot a prirodzená vôňa tela',
  uvod:
    'Pot môže niesť vôňu námahy, blízkosti a tela bez filtra. Niekto miluje horúcu kožu po pohybe, mokré vlasy či vôňu podpazušia; inému vyhovuje iba jemný náznak alebo vôbec nič.',
  bloky: [
    {
      druh: 'otazka', id: 'pot_formy', typ: 'viac', inePovolene: true,
      text: 'Ktoré podoby ma priťahujú',
      moznosti: [
        { v: 'horuca_koza', label: 'Horúca spotená koža počas sexu' },
        { v: 'po_pohybe', label: 'Vôňa tela po športe, tanci alebo námahe' },
        { v: 'podpazusie', label: 'Vôňa alebo bozkávanie podpazušia' },
        { v: 'vlasy_krk', label: 'Mokré vlasy, krk a chrbát' },
        { v: 'oblecenie', label: 'Vôňa na tričku alebo spodnej bielizni' },
        { v: 'zapas', label: 'Klzké telá, objatie alebo hravý zápas' },
      ],
    },
    {
      druh: 'otazka', id: 'pot_vyznam', typ: 'viac', inePovolene: true,
      text: 'Čo ma na pote alebo prirodzenej vôni priťahuje',
      moznosti: [
        { v: 'zivocisnost', label: 'Živočíšnosť a telo bez filtra' },
        { v: 'namaha', label: 'Viditeľná námaha a rastúce vzrušenie' },
        { v: 'vona', label: g('Jedinečná vôňa partnerky', 'Jedinečná vôňa partnera') },
        { v: 'teplo', label: 'Teplo, vlhkosť a klzkosť kože' },
        { v: 'blizkost', label: 'Pocit, že sme úplne blízko a nič neskrývame' },
      ],
    },
    {
      druh: 'otazka', id: 'pot_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku priťahuje moja prirodzená vôňa a pot viac než mňa', 'Keď partnera priťahuje moja prirodzená vôňa a pot viac než mňa'),
      moznosti: [
        { v: 'laka', label: g('Byť takto žiadaný ma vzrušuje', 'Byť takto žiadaná ma vzrušuje') },
        { v: 'jemne', label: 'Príjemný je mi iba jemný náznak' },
        { v: 'po_sprche', label: 'Radšej po sprche alebo s vôňou kozmetiky' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
  ],
}

// ── Oblečenie a materiály ───────────────────────────────────────────────
const MATERIALY: Blok = {
  druh: 'skupina', id: 'materialy', nadpis: 'Oblečenie a materiály',
  uvod:
    'Materiál môže vzrušovať ešte skôr, než sa niekto vyzlečie: leskom, vôňou, zvukom, tlakom na telo alebo tým, čo odhaľuje a čo necháva skryté. Latex, koža, hodváb a nylon preto nemusia znamenať rovnakú fantáziu.',
  bloky: [
    {
      druh: 'otazka', id: 'mat_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré materiály a kúsky ma priťahujú',
      moznosti: [
        { v: 'latex', label: 'Latex / guma' },
        { v: 'pvc', label: 'PVC / vinyl' },
        { v: 'koza', label: 'Koža (korzet, postroj, rukavice)' },
        { v: 'hodvab', label: 'Hodváb / satén' },
        { v: 'cipka', label: 'Čipka' },
        { v: 'pancuchy', label: 'Nylóny / pančuchy / podväzky' },
        { v: 'kozusina', label: 'Kožušina' },
        { v: 'opatky', label: 'Vysoké opätky' },
        { v: 'rukavicky', label: 'Rukavičky' },
        { v: 'uniformy', label: 'Uniformy' },
        { v: 'bielizen', label: 'Erotická bielizeň' },
      ],
    },
    {
      druh: 'otazka', id: 'mat_kto_nosi', typ: 'jeden',
      text: 'Kto to má nosiť',
      moznosti: [
        { v: 'ja', label: 'Ja' },
        { v: 'partner', label: g('Partnerka', 'Partner') },
        { v: 'oboje', label: 'Oboje' },
        { v: 'striedavo', label: 'Podľa nálady' },
      ],
    },
    {
      druh: 'otazka', id: 'mat_ako', typ: 'viac', inePovolene: true,
      text: 'Čo ma na materiáli priťahuje',
      moznosti: [
        { v: 'vizual', label: 'Lesk, farba a tvarovanie tela' },
        { v: 'dotyk', label: 'Pocit pod prstami alebo na vlastnej koži' },
        { v: 'tlak', label: 'Tesné obopnutie, kompresia alebo korzetový tlak' },
        { v: 'vona', label: 'Vôňa kože, latexu alebo noseného textilu' },
        { v: 'zvuk', label: 'Šušťanie, vŕzganie, napínanie alebo zips' },
        { v: 'teplota', label: 'Chladný povrch, ktorý sa postupne zahreje telom' },
        { v: 'premenit', label: 'Premena bežného tela na výraznú postavu alebo objekt' },
      ],
    },
    p('mat_priliehave', 'Maznanie a dotyky cez priliehavé oblečenie (pocit materiálu na koži, vône latexu)'),
    p('mat_textilie_stimulacia', 'Prechádzanie hodvábom / textíliou po tele ako stimulácia'),
    p('mat_opatky_pocas', 'Nechať topánky / opätky / pančuchy počas aktu'),
    {
      druh: 'otazka', id: 'mat_scenar', typ: 'viac', inePovolene: true,
      text: 'Ako výrazne chcem materiál zapojiť do scény',
      moznosti: [
        { v: 'detail', label: 'Jeden detail — nohavičky, rukavice, opasok alebo obojok' },
        { v: 'kus', label: 'Výrazný kus — korzet, postroj, pančuchy alebo vysoké čižmy' },
        { v: 'cele_telo', label: 'Celotelový priliehavý odev alebo úplná premena vzhľadu' },
        { v: 'kontrast', label: 'Kontrast dvoch tiel — jedno v latexe či koži, druhé nahé' },
        { v: 'kombinacia', label: 'Kombinovať latex, kožu, kov, čipku alebo hodváb' },
        { v: 'iba_dotyk', label: 'Nenosiť ho — používať ho iba na dotyk a stimuláciu kože' },
      ],
    },
    {
      druh: 'otazka', id: 'mat_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku vzrušuje konkrétny materiál alebo oblečenie viac než mňa', 'Keď partnera vzrušuje konkrétny materiál alebo oblečenie viac než mňa'),
      moznosti: [
        { v: 'laka', label: g('Jej premena a vzrušenie ma lákajú', 'Jeho premena a vzrušenie ma lákajú') },
        { v: 'nosi_partner', label: g('Rád ho uvidím na partnerke, nechcem ho nosiť', 'Rada ho uvidím na partnerovi, nechcem ho nosiť') },
        { v: 'nosim_ja', label: g('Som ochotný ho nosiť pre jej pohľad', 'Som ochotná ho nosiť pre jeho pohľad') },
        { v: 'iba_vizual', label: 'Láka ma iba vizuál alebo fantázia' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
  ],
}

// ── Časti tela a vzhľad ────────────────────────────────────────────────
const CASTI_TELA: Blok = {
  druh: 'skupina', id: 'casti_tela', nadpis: 'Časti tela a vzhľad',
  bloky: [
    p('foot_davam', g('Foot fetish — venovať pozornosť chodidlám partnerky (masáž, bozky, olizovanie prstov)', 'Foot fetish — venovať pozornosť chodidlám partnera (masáž, bozky, olizovanie prstov)')),
    p('foot_dostavam', 'Foot fetish — keď partner venuje pozornosť mojim chodidlám'),
    {
      druh: 'otazka', id: 'foot_formy', typ: 'viac', inePovolene: true,
      text: 'Ktoré formy foot play ma priťahujú',
      moznosti: [
        { v: 'masaz', label: 'Masáž chodidiel a klenby' },
        { v: 'bozky', label: 'Bozkávanie chodidiel' },
        { v: 'prsty', label: 'Sanie alebo lízanie prstov' },
        { v: 'vona', label: 'Prirodzená vôňa chodidiel, ponožiek alebo obuvi' },
        { v: 'footjob', label: 'Stimulácia penisu chodidlami' },
        { v: 'sluzba', label: 'Kľačanie, uctievanie alebo služba pri nohách' },
        { v: 'slapanie', label: 'Jemné alebo pevnejšie šliapanie po tele' },
        { v: 'obuv', label: 'Topánky, čižmy, opätky alebo pančuchy počas hry' },
      ],
    },
    {
      druh: 'otazka', id: 'ct_zony', typ: 'viac', inePovolene: true,
      text: 'Ktoré časti tela / prvky vzhľadu ma zvlášť priťahujú',
      moznosti: [
        { v: 'ruky', label: 'Ruky, prsty, nechty / manikúra' },
        { v: 'vlasy', label: 'Vlasy (ovinutie okolo ruky, vôňa, ťahanie)' },
        { v: 'brucho', label: 'Brucho a bedrá' },
        { v: 'zadok', label: 'Zadok — estetika' },
        { v: 'prsia', label: 'Prsia (non-nude)' },
        { v: 'okuliare', label: 'Okuliare' },
        { v: 'makeup', label: 'Makeup štýly' },
        { v: 'piercing', label: 'Piercing a tetovanie (obdivovanie, lízanie zdobených miest)' },
        { v: 'lesk', label: 'Lesk — olej na tele' },
        { v: 'metalicke', label: 'Metalické doplnky' },
        { v: 'bodypaint', label: 'Body paint' },
      ],
    },
    {
      druh: 'otazka', id: 'ct_ako', typ: 'viac', inePovolene: true,
      text: 'Čo chcem s obľúbenou časťou tela robiť',
      moznosti: [
        { v: 'pozerat', label: 'Pozorovať ju alebo ju nechať zámerne vystaviť' },
        { v: 'hladit', label: 'Hladiť, masírovať alebo držať' },
        { v: 'bozkavat', label: 'Bozkávať, lízať alebo jemne sať' },
        { v: 'vona', label: 'Vnímať jej prirodzenú vôňu' },
        { v: 'intenzivne', label: 'Škrabať, štípať, hrýzť alebo ťahať' },
        { v: 'ozdobit', label: 'Ozdobiť ju šperkom, lakom, olejom alebo farbou' },
        { v: 'uctievat', label: 'Uctievať ju alebo z nej urobiť stred celej scény' },
      ],
    },
    {
      druh: 'otazka', id: 'ct_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku výrazne priťahuje konkrétna časť môjho tela', 'Keď partnera výrazne priťahuje konkrétna časť môjho tela'),
      moznosti: [
        { v: 'ziadany', label: g('Byť takto obdivovaný ma vzrušuje', 'Byť takto obdivovaná ma vzrušuje') },
        { v: 'ukazat', label: g('Rád ju zvýrazním alebo ponúknem jej pohľadu', 'Rada ju zvýrazním alebo ponúknem jeho pohľadu') },
        { v: 'vybrane', label: 'Príjemné sú mi iba vybrané dotyky alebo intenzita' },
        { v: 'neutral', label: 'Nevzrušuje ma to, ale partnerova túžba mi neprekáža' },
        { v: 'nie', label: 'Táto pozornosť mi eroticky nesedí' },
      ],
    },
  ],
}

// ── Spodná bielizeň a nohavičky ─────────────────────────────────────────
const NOHAVICKY: Blok = {
  druh: 'skupina', id: 'spodna_bielizen', nadpis: 'Nohavičky a spodná bielizeň — pohľad, dotyk, vôňa a tajomstvo',
  uvod: g(
    'Nohavičky môžu byť oveľa viac než oblečenie: rámujú partnerkino telo, nesú jej vôňu a po vyzlečení zostanú ako intímna stopa. Niekoho vzrušuje čipka a strih, iného nosený kúsok vo vrecku, vôňa na tvári alebo to, že ich partnerka počas sexu iba odhrnie nabok.',
    'Spodná bielizeň môže byť oveľa viac než oblečenie: rámuje telo, nesie vôňu a po vyzlečení zostane ako intímna stopa. Niekoho vzrušuje čipka a strih, iného nosený kúsok vo vrecku, vôňa na tvári, výmena bielizne alebo to, že ju partner počas sexu iba odhrnie nabok.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'nohavicky_typ', typ: 'viac', inePovolene: true,
      text: 'Ktoré kúsky alebo štýly ma priťahujú',
      moznosti: [
        { v: 'cipkove', label: 'Čipkové nohavičky alebo tangá' },
        { v: 'bavlnene', label: 'Obyčajné bavlnené nohavičky — prirodzenosť' },
        { v: 'saten', label: 'Hodvábne alebo saténové' },
        { v: 'priesvitne', label: 'Priesvitné, sieťované alebo „peek-a-boo"' },
        { v: 'otvorene', label: 'Otvorené alebo odhrnuteľné bez vyzlečenia' },
        { v: 'vysoky_pas', label: 'Vysoký pás, retro strih alebo korzetová bielizeň' },
        { v: 'boxerky', label: 'Slipy, boxerky alebo jockstrap' },
        { v: 'body', label: 'Body, podväzkový pás alebo celý komplet' },
      ],
    },
    {
      druh: 'otazka', id: 'nohavicky_stav', typ: 'viac', inePovolene: true,
      text: 'V akom stave alebo kontexte ma bielizeň priťahuje',
      moznosti: [
        { v: 'nova', label: 'Nová, čistá a pripravená ako prekvapenie' },
        { v: 'cerstvo_nosena', label: 'Čerstvo nosená — teplo a prirodzená vôňa' },
        { v: 'po_dni', label: 'Po celom dni ako výraznejšia intímna stopa' },
        { v: 'vlhka', label: 'Vlhká alebo s viditeľnou stopou vzrušenia' },
        { v: 'mokre', label: 'Mokrá po sprche, daždi alebo hre vo vode' },
        { v: 'pod_oblecenim', label: 'Tajná pod bežným oblečením počas dňa' },
      ],
    },
    {
      druh: 'otazka', id: 'nohavicky', typ: 'viac', inePovolene: true,
      text: 'Ako chcem nohavičky alebo spodnú bielizeň použiť',
      moznosti: [
        { v: 'pozerat', label: g('Pozerať sa na partnerku v nohavičkách', 'Nechať partnera pozerať sa na mňa v nohavičkách') },
        { v: 'nechat_pocas', label: 'Nechať ich počas sexu na tele a iba ich odhrnúť' },
        { v: 'vyzliect_zubami', label: 'Vyzliecť ich zubami alebo veľmi pomaly rukami' },
        { v: 'uchovanie', label: g('Nosiť partnerkine nohavičky pri sebe ako tajomstvo', 'Dať partnerovi moje nohavičky, aby ich nosil pri sebe') },
        { v: 'sniffing', label: 'Vnímať vôňu nosenej bielizne' },
        { v: 'na_tvar', label: 'Priložiť ju na tvár alebo cez ňu cítiť vôňu a dych' },
        { v: 'oci', label: 'Použiť ju ako mäkkú pásku na oči' },
        { v: 'trenie', label: 'Trieť ju o telo alebo genitálie ako súčasť masturbácie' },
        { v: 'vymena', label: 'Vymeniť si bielizeň alebo nosiť kúsok patriaci druhému' },
        { v: 'vybrat', label: g('Vybrať partnerke, čo si oblečie', 'Nechať partnera vybrať, čo si oblečiem') },
        { v: 'fotka', label: 'Fotografia alebo odhalenie konkrétneho kúsku' },
        { v: 'zbierka', label: 'Uchovávať obľúbené kúsky ako intímnu zbierku' },
        { v: 'ziadne', label: 'Nič z toho' },
      ],
    },
    {
      druh: 'otazka', id: 'nohavicky_vyznam', typ: 'viac', inePovolene: true,
      text: 'Čo robí spodnú bielizeň erotickou',
      moznosti: [
        { v: 'ramovanie', label: 'Rámuje telo a zároveň ho úplne neukáže' },
        { v: 'vona', label: 'Nesie jedinečnú vôňu človeka' },
        { v: 'tajomstvo', label: 'Je skrytá pod oblečením a vieme o nej iba my' },
        { v: 'stopa', label: 'Po vyzlečení zostáva osobnou stopou prítomnosti' },
        { v: 'moc', label: 'Výber bielizne ako vedenie, príkaz alebo služba' },
        { v: 'premenlivost', label: 'Možnosť meniť štýl, rolu a náladu bez zmeny tela' },
      ],
    },
    {
      druh: 'otazka', id: 'nohavicky_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku vzrušuje, aby som pracoval s jej nohavičkami', 'Keď partnera vzrušujú moje nohavičky alebo chce, aby som pracovala s jeho bielizňou'),
      moznosti: [
        { v: 'laka', label: g('Jej intímna stopa a túžba ma vzrušujú', 'Jeho záujem a pocit, že som takto žiadaná, ma vzrušujú') },
        { v: 'vizual', label: 'Láka ma vizuál a nosenie, nie vôňa' },
        { v: 'vona', label: 'Láka ma vôňa a osobný predmet, nie predvádzanie' },
        { v: 'vybrane', label: g('Som otvorený iba konkrétnemu spôsobu použitia', 'Som otvorená iba konkrétnemu spôsobu použitia') },
        { v: 'fantazia', label: 'Môžeme o tom fantazírovať, no nechcem to robiť' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
    {
      druh: 'text', id: 'nohavicky_myty', nadpis: 'Mýty a tabu', ton: 'info',
      telo:
        'Mýtus: fetiš na nohavičky je vždy iba o „špinavej" vôni. Realita: ľudí môže priťahovať strih, materiál, čiastočné odhalenie, teplo po nosení, osobná stopa alebo tajomstvo výmeny. ' +
        'Mýtus: muž, ktorého vzrušuje nosenie ženských nohavičiek, tým automaticky niečo hovorí o svojej orientácii alebo identite. Realita: oblečenie, rodová hra, materiál a sexuálna orientácia sú odlišné roviny. ' +
        'Mýtus: záujem o partnerkinu bielizeň znamená, že ho nezaujíma ona. Realita: často je erotická práve preto, že nesie jej vôňu, teplo a spomienku na jej telo.',
    },
  ],
}

// ── Vône a pach ───────────────────────────────────────────────────────
const VONE: Blok = {
  druh: 'skupina', id: 'vone', nadpis: 'Vône a prirodzený pach',
  bloky: [
    p('vona_prirodzena', 'Prirodzený pach tela a pohlavia ako afrodiziakum'),
    p('vona_parfum', 'Konkrétny parfum / vôňa ako súčasť hry'),
  ],
}

// ── Dirty talk, prosby a hlas ─────────────────────────────────────────
const DT_TON: Blok = {
  druh: 'skupina', id: 'dt_ton', nadpis: 'Tón, hlas a načasovanie',
  uvod: 'Rovnaká veta môže znieť nežne, dráždivo, vlastnícky alebo surovo. Často rozhoduje hlas, tempo a chvíľa viac než samotné slovo.',
  bloky: [
    {
      druh: 'otazka', id: 'dt_ton_prijimam', typ: 'viac', inePovolene: true, rola: 'prijimam',
      text: g('Ako chcem, aby na mňa partnerka hovorila', 'Ako chcem, aby na mňa partner hovoril'),
      moznosti: [
        { v: 'sepot', label: 'Tichý šepot priamo do ucha' },
        { v: 'hlboky', label: 'Pomalý, hlboký a sebavedomý hlas' },
        { v: 'nezny', label: 'Nežný, obdivný a láskyplný tón' },
        { v: 'hravy', label: 'Hravé provokovanie a podpichovanie' },
        { v: 'rozkazovacny', label: 'Pokojný rozkazovací tón bez zvyšovania hlasu' },
        { v: 'naliehavy', label: 'Naliehavý hlas, ktorý stráca uhladenosť' },
        { v: 'vulgarny', label: 'Surový a vulgárny slovník' },
        { v: 'hlasny', label: 'Hlasné slová alebo príkazy' },
        { v: 'asmr', label: 'ASMR, dych, zavrčanie alebo hlas tesne pri koži' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_ton_poskytujem', typ: 'viac', inePovolene: true, rola: 'poskytujem',
      text: g('Ako chcem hovoriť na partnerku', 'Ako chcem hovoriť na partnera'),
      moznosti: [
        { v: 'sepot', label: 'Tichý šepot priamo do ucha' },
        { v: 'hlboky', label: 'Pomalý, hlboký a sebavedomý hlas' },
        { v: 'nezny', label: 'Nežný, obdivný a láskyplný tón' },
        { v: 'hravy', label: 'Hravé provokovanie a podpichovanie' },
        { v: 'rozkazovacny', label: 'Pokojný rozkazovací tón bez zvyšovania hlasu' },
        { v: 'naliehavy', label: 'Naliehavý hlas, ktorý stráca uhladenosť' },
        { v: 'vulgarny', label: 'Surový a vulgárny slovník' },
        { v: 'hlasny', label: 'Hlasné slová alebo príkazy' },
        { v: 'asmr', label: 'ASMR, dych, zavrčanie alebo hlas tesne pri koži' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_kedy', typ: 'viac', inePovolene: true,
      text: 'Kedy ma dirty talk láka najviac',
      moznosti: [
        { v: 'spravy', label: 'V správach počas dňa ako budovanie očakávania' },
        { v: 'zvadzanie', label: 'Pri zvádzaní a vyzliekaní' },
        { v: 'predohra', label: 'Počas predohry a pomalého dráždenia' },
        { v: 'oral', label: 'Počas orálu alebo manuálnej stimulácie' },
        { v: 'penetracia', label: 'Počas penetrácie alebo intenzívneho trenia' },
        { v: 'dominancia', label: 'V dominantno-submisívnej scéne' },
        { v: 'pred_orgazmom', label: 'Tesne pred orgazmom, keď miznú zábrany' },
        { v: 'po', label: 'Po sexe ako pomenovanie toho, čo bolo silné' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_gradacia', typ: 'viac', inePovolene: true,
      text: 'Ako má slovná intenzita narastať',
      moznosti: [
        { v: 'jemne_silne', label: 'Od komplimentov cez túžbu až k vulgárnym slovám' },
        { v: 'rovnako', label: 'Jeden štýl držať počas celej scény' },
        { v: 'prekvapenie', label: 'Jedna nečakane silná veta v správnej chvíli' },
        { v: 'partner_vedie', label: g('Nechať partnerku určovať, ako ďaleko slová pôjdu', 'Nechať partnera určovať, ako ďaleko slová pôjdu') },
        { v: 'ja_vediem', label: g('Sám ukazovať reakciou alebo slovami, že chcem viac', 'Sama ukazovať reakciou alebo slovami, že chcem viac') },
      ],
    },
  ],
}

const DT_OBSAH: Blok = {
  druh: 'skupina', id: 'dt_obsah', nadpis: 'Čo chcem hovoriť a počuť',
  uvod: 'Dirty talk nemusí byť iba vulgarita. Môže opisovať túžbu, telo, práve prebiehajúcu scénu, budúci obraz, príkaz, prosbu, pochvalu aj úplné odovzdanie.',
  bloky: [
    {
      druh: 'otazka', id: 'dt_obsah_prijimam', typ: 'viac', inePovolene: true, rola: 'prijimam',
      text: 'Ktorý obsah chcem počuť',
      moznosti: [
        { v: 'tuzba', label: g('Ako veľmi ma partnerka chce', 'Ako veľmi ma partner chce') },
        { v: 'pochvala', label: 'Pochvala môjho tela, pohybu alebo reakcií' },
        { v: 'opis', label: g('Presný opis toho, čo partnerka práve robí a vidí', 'Presný opis toho, čo partner práve robí a vidí') },
        { v: 'buducnost', label: g('Čo mi partnerka ešte urobí', 'Čo mi partner ešte urobí') },
        { v: 'fantazia', label: 'Rozprávanie erotickej fantázie alebo zakázaného scenára' },
        { v: 'prikazy', label: 'Krátke príkazy: pozri sa, otoč sa, zostaň, povedz mi…' },
        { v: 'otazky', label: 'Otázky, ktoré ma nútia vysloviť túžbu nahlas' },
        { v: 'vlastnictvo', label: g('Vlastnícky jazyk: „si môj“, „patríš mi“', 'Vlastnícky jazyk: „si moja“, „patríš mi“') },
        { v: 'uctievanie', label: 'Uctievanie a obdiv: moje telo je nádherné a žiadané' },
        { v: 'degradacia', label: 'Erotická degradácia a sexuálne ponižovanie' },
        { v: 'orgazmus', label: 'Príkazy, prosby alebo odpočítavanie pred orgazmom' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_obsah_poskytujem', typ: 'viac', inePovolene: true, rola: 'poskytujem',
      text: g('Ktorý obsah chcem hovoriť partnerke', 'Ktorý obsah chcem hovoriť partnerovi'),
      moznosti: [
        { v: 'tuzba', label: g('Ako veľmi ju chcem', 'Ako veľmi ho chcem') },
        { v: 'pochvala', label: g('Pochvala jej tela, pohybu alebo reakcií', 'Pochvala jeho tela, pohybu alebo reakcií') },
        { v: 'opis', label: 'Presný opis toho, čo práve robím a vidím' },
        { v: 'buducnost', label: g('Čo jej ešte urobím', 'Čo mu ešte urobím') },
        { v: 'fantazia', label: 'Rozprávanie erotickej fantázie alebo zakázaného scenára' },
        { v: 'prikazy', label: 'Krátke príkazy a vedenie tela' },
        { v: 'otazky', label: g('Otázky, ktoré ju nútia vysloviť túžbu nahlas', 'Otázky, ktoré ho nútia vysloviť túžbu nahlas') },
        { v: 'vlastnictvo', label: g('Vlastnícky jazyk: „si moja“, „patríš mi“', 'Vlastnícky jazyk: „si môj“, „patríš mi“') },
        { v: 'uctievanie', label: g('Uctievanie a obdiv jej tela', 'Uctievanie a obdiv jeho tela') },
        { v: 'degradacia', label: 'Erotická degradácia a sexuálne ponižovanie' },
        { v: 'orgazmus', label: 'Príkazy, prosby alebo odpočítavanie pred orgazmom' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_reakcia', typ: 'viac', inePovolene: true,
      text: 'Ako chcem na dirty talk reagovať',
      moznosti: [
        { v: 'potvrdit', label: g('Potvrdiť vetu: „áno, som tvoj“', 'Potvrdiť vetu: „áno, som tvoja“') },
        { v: 'prosit', label: 'Prosiť o pokračovanie, viac alebo dovolenie' },
        { v: 'opakovat', label: 'Nechať si slovo či oslovenie zopakovať' },
        { v: 'odpovedat', label: g('Vrátiť partnerke rovnako silnú vetu', 'Vrátiť partnerovi rovnako silnú vetu') },
        { v: 'iba_telo', label: 'Neodpovedať slovami — reagovať dychom, zvukom a telom' },
        { v: 'viest', label: 'Povedať presne, ktoré slovo alebo veta ma zasiahli' },
      ],
    },
  ],
}

const DT_OSLOVENIA: Blok = {
  druh: 'skupina', id: 'dt_oslovenia', nadpis: 'Oslovenia — od nežných po degradačné',
  uvod: '„Miláčik“ je iba jeden koniec spektra. Oslovenie môže vyjadrovať nehu, pochvalu, vlastníctvo, rolu, sexuálny apetít, objektifikáciu alebo zámernú degradáciu.',
  bloky: [
    {
      druh: 'otazka', id: 'dt_oslovenia_prijimam', typ: 'viac', inePovolene: true, rola: 'prijimam',
      text: g('Ako ma môže partnerka v posteli oslovovať', 'Ako ma môže partner v posteli oslovovať'),
      moznosti: [
        { v: 'meno', label: 'Mojím menom alebo intímnou prezývkou' },
        { v: 'laska', label: 'Láska, miláčik, zlatko' },
        { v: 'krasny', label: g('Krásavec, sexy muž, môj chlap', 'Kráska, sexy žena, moja žena') },
        { v: 'dobry', label: g('Dobrý chlapec, poslušný chlapec', 'Dobré dievča, poslušné dievča') },
        { v: 'pan_pani', label: g('Pán, Sir, Daddy', 'Pani, Mistress, Mommy') },
        { v: 'moj_moja', label: g('Môj muž, môj majetok, môj milenec', 'Moja žena, môj majetok, moja milenka') },
        { v: 'hracka', label: 'Moja hračka, sex toy, fucktoy, pet' },
        { v: 'nenasytny', label: g('Nenásytný, hladný, nedočkavý', 'Nenásytná, hladná, nedočkavá') },
        { v: 'spinavy', label: g('Špinavý chlapec, zvrhlík', 'Špinavé dievča, zvrhlíčka') },
        { v: 'slut', label: g('Slut, whore alebo bitch ako anglická erotická rola', 'Slut, whore alebo bitch ako anglická erotická rola') },
        { v: 'kurvicka', label: g('Kurviak alebo kurva ako degradačná rola', 'Kurvička, štetka alebo suka ako degradačná rola') },
        { v: 'sluha', label: g('Sluha, otrok, psík', 'Slúžka, otrokyňa, sučka') },
      ],
    },
    {
      druh: 'otazka', id: 'dt_oslovenia_poskytujem', typ: 'viac', inePovolene: true, rola: 'poskytujem',
      text: g('Ako chcem oslovovať partnerku', 'Ako chcem oslovovať partnera'),
      moznosti: [
        { v: 'meno', label: g('Jej menom alebo intímnou prezývkou', 'Jeho menom alebo intímnou prezývkou') },
        { v: 'laska', label: 'Láska, miláčik, zlatko' },
        { v: 'krasny', label: g('Kráska, sexy žena, moja žena', 'Krásavec, sexy muž, môj chlap') },
        { v: 'dobry', label: g('Dobré dievča, poslušné dievča', 'Dobrý chlapec, poslušný chlapec') },
        { v: 'pan_pani', label: g('Pani, Mistress, Mommy', 'Pán, Sir, Daddy') },
        { v: 'moj_moja', label: g('Moja žena, môj majetok, moja milenka', 'Môj muž, môj majetok, môj milenec') },
        { v: 'hracka', label: 'Moja hračka, sex toy, fucktoy, pet' },
        { v: 'nenasytny', label: g('Nenásytná, hladná, nedočkavá', 'Nenásytný, hladný, nedočkavý') },
        { v: 'spinavy', label: g('Špinavé dievča, zvrhlíčka', 'Špinavý chlapec, zvrhlík') },
        { v: 'slut', label: 'Slut, whore alebo bitch ako anglická erotická rola' },
        { v: 'kurvicka', label: g('Kurvička, štetka alebo suka ako degradačná rola', 'Kurviak alebo kurva ako degradačná rola') },
        { v: 'sluha', label: g('Slúžka, otrokyňa, sučka', 'Sluha, otrok, psík') },
      ],
    },
    {
      druh: 'otazka', id: 'dt_degradacia_styl', typ: 'viac', inePovolene: true,
      text: 'Ktorá podoba erotickej degradácie ma vzrušuje',
      moznosti: [
        { v: 'moja', label: 'Vlastnícka: „moja kurvička“, „moja hračka“, „patríš mi“' },
        { v: 'apetit', label: g('Zameraná na sexuálny apetít: hladný, nenásytný, nedočkavý', 'Zameraná na sexuálny apetít: hladná, nenásytná, nedočkavá') },
        { v: 'kontrast', label: g('Kontrast roly: cez deň slušný, v posteli úplne zvrhlý', 'Kontrast roly: cez deň slušná, v posteli úplne zvrhlá') },
        { v: 'objekt', label: 'Erotická objektifikácia: telo alebo hračka určená na rozkoš' },
        { v: 'vykon', label: 'Komentovanie toho, ako poslúcham, prosím alebo strácam kontrolu' },
        { v: 'anglictina', label: 'Anglické slová, ktoré na mňa pôsobia mäkšie alebo filmovejšie' },
        { v: 'ziadna', label: 'Žiadna degradácia — chcem iba pochvalu alebo príkazy' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_oslovenia_mimo', typ: 'text',
      text: 'Presné oslovenia alebo typy útoku, ktoré ma okamžite eroticky vypínajú:',
    },
  ],
}

const DT_JAZYK_TELA: Blok = {
  druh: 'skupina', id: 'dt_jazyk_tela', nadpis: 'Slová pre telo, genitálie a samotný akt',
  bloky: [
    {
      druh: 'otazka', id: 'dt_telo_styl', typ: 'viac', inePovolene: true,
      text: g('Ako môže partnerka hovoriť o mojom tele', 'Ako môže partner hovoriť o mojom tele'),
      moznosti: [
        { v: 'obdiv', label: 'Obdivne a zmyselne — krásne, sexy, neodolateľné' },
        { v: 'konkretne', label: 'Konkrétne — pomenovať, čo vidí, cíti a čo sa mu páči' },
        { v: 'vulgarny', label: 'Vulgárne a priamo, bez zjemňovania' },
        { v: 'vlastnicky', label: 'Vlastnícky — „toto telo patrí mne“' },
        { v: 'objektifikacia', label: 'Ako o erotickom objekte alebo hračke' },
        { v: 'reakcie', label: 'Opisovať mokrosť, tvrdosť, tras, zvuky a stratu kontroly' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_telo_styl_poskytujem', typ: 'viac', inePovolene: true, rola: 'poskytujem',
      text: g('Ako chcem hovoriť o partnerkinom tele', 'Ako chcem hovoriť o partnerovom tele'),
      moznosti: [
        { v: 'obdiv', label: g('Obdivne a zmyselne — krásna, sexy, neodolateľná', 'Obdivne a zmyselne — krásny, sexy, neodolateľný') },
        { v: 'konkretne', label: g('Konkrétne pomenovať, čo na nej vidím, cítim a čo sa mi páči', 'Konkrétne pomenovať, čo na ňom vidím, cítim a čo sa mi páči') },
        { v: 'vulgarny', label: 'Vulgárne a priamo, bez zjemňovania' },
        { v: 'vlastnicky', label: g('Vlastnícky — „toto telo je moje“', 'Vlastnícky — „toto telo je moje“') },
        { v: 'objektifikacia', label: g('Hovoriť o nej ako o erotickom objekte alebo hračke', 'Hovoriť o ňom ako o erotickom objekte alebo hračke') },
        { v: 'reakcie', label: g('Opisovať jej mokrosť, tras, zvuky a stratu kontroly', 'Opisovať jeho tvrdosť, tras, zvuky a stratu kontroly') },
      ],
    },
    {
      druh: 'otazka', id: 'dt_penis_slova', typ: 'viac', inePovolene: true,
      text: g('Ktoré pomenovania môjho penisu mi znejú eroticky', 'Ktoré pomenovania partnerovho penisu mi znejú eroticky'),
      moznosti: [
        { v: 'penis', label: 'Penis' },
        { v: 'vtak', label: 'Vták' },
        { v: 'kokot', label: 'Kokot alebo kok' },
        { v: 'ud', label: 'Úd' },
        { v: 'privlastnenie', label: g('Môj vták alebo môj penis', 'Tvoj vták alebo tvoj penis') },
      ],
    },
    {
      druh: 'otazka', id: 'dt_vulva_slova', typ: 'viac', inePovolene: true,
      text: g('Ktoré pomenovania partnerkinej vulvy alebo vagíny mi znejú eroticky', 'Ktoré pomenovania mojej vulvy alebo vagíny mi znejú eroticky'),
      moznosti: [
        { v: 'vulva', label: 'Vulva' },
        { v: 'vagina', label: 'Vagína' },
        { v: 'picka', label: 'Pička alebo kundička' },
        { v: 'rozkrok', label: 'Rozkrok' },
        { v: 'privlastnenie', label: g('Tvoja pička alebo tvoja vulva', 'Moja pička alebo moja vulva') },
      ],
    },
    {
      druh: 'otazka', id: 'dt_prsia_zadok_slova', typ: 'viac', inePovolene: true,
      text: 'Ktoré ďalšie telesné pomenovania sú pre mňa erotické',
      moznosti: [
        { v: 'prsia', label: 'Prsia' },
        { v: 'kozy', label: 'Kozy alebo cecky' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'rit', label: 'Riť' },
        { v: 'usta', label: 'Ústa, pery alebo jazyk pomenované priamo' },
        { v: 'cele_telo', label: 'Celé telo ako niečo žiadané alebo vlastnené' },
      ],
    },
    { druh: 'otazka', id: 'dt_telo_mimo', typ: 'text', text: 'Slová o mojom tele, ktoré nechcem počuť ani v erotickej role:' },
  ],
}

const DT_PARTNER: Blok = {
  druh: 'skupina', id: 'dt_partner', nadpis: g('Keď chce dirty talk partnerka', 'Keď chce dirty talk partner'),
  bloky: [
    {
      druh: 'otazka', id: 'dt_partner_tuzba', typ: 'jeden', inePovolene: true,
      text: g('Ako na mňa pôsobí partnerkina túžba po odvážnejších slovách', 'Ako na mňa pôsobí partnerova túžba po odvážnejších slovách'),
      moznosti: [
        { v: 'nakazlive', label: g('Jej túžba ma vzrušuje a prebúdza moju odvahu', 'Jeho túžba ma vzrušuje a prebúdza moju odvahu') },
        { v: 'chcem_dat', label: g('Chcem jej hovoriť presne to, čo ju zasiahne', 'Chcem mu hovoriť presne to, čo ho zasiahne') },
        { v: 'chcem_pocut', label: g('Chcem, aby rovnakú otvorenosť použila aj voči mne', 'Chcem, aby rovnakú otvorenosť použil aj voči mne') },
        { v: 'vybrane', label: 'Lákajú ma iba vybrané tóny, slová alebo oslovenia' },
        { v: 'spravy', label: 'Ľahšie sa mi to skúma písomne než nahlas' },
        { v: 'fantazia', label: 'Vzrušuje ma predstava, ale v realite sa pri nej zatiaľ necítim prirodzene' },
        { v: 'nie', label: 'Dirty talk ma eroticky neťahá' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_partner_najsilnejsie', typ: 'text',
      text: g('Ktorá konkrétna veta alebo oslovenie by podľa mňa partnerku najviac vzrušili:', 'Ktorá konkrétna veta alebo oslovenie by podľa mňa partnera najviac vzrušili:'),
    },
  ],
}

const DT_MYTY: Blok = {
  druh: 'text', id: 'dt_myty', nadpis: 'Mýty a tabu', ton: 'info',
  telo:
    'Mýtus: dirty talk musí byť vulgárny. Realita: môže byť komplimentom, opisom túžby, šepotom, prosbou aj jedným slovom v správnej chvíli.\n\n' +
    'Mýtus: degradačné oslovenie ukazuje, čo si o človeku jeho náprotivok naozaj myslí. Realita: „moja kurvička“, „slut“ alebo „hračka“ môžu fungovať ako presná erotická rola postavená na vlastníctve, apetíte či kontraste s bežným životom.\n\n' +
    'Mýtus: slovenské a anglické slovo majú rovnakú silu. Realita: pre mnohých znie „slut“, „good girl“ alebo „fucktoy“ filmovejšie a menej osobne než slovenský výraz; pre iných je práve slovenčina silnejšia.\n\n' +
    'Mýtus: smiech pokazí atmosféru. Realita: niekedy iba uvoľní hanbu a pomôže nájsť slová, ktoré páru znejú prirodzene.',
}

const DIRTY_TALK: Blok = {
  druh: 'skupina', id: 'dirty_talk', nadpis: 'Dirty talk, oslovenia a slovný priestor',
  uvod: 'Slová môžu byť predohrou, navigáciou, pochvalou, príkazom, fantáziou aj nástrojom moci. Táto mapa ide od jemného šepotu cez priame pomenovanie túžby až po vlastnícky jazyk a erotickú degradáciu.',
  bloky: [DT_TON, DT_OBSAH, DT_OSLOVENIA, DT_JAZYK_TELA, DT_PARTNER, DT_MYTY],
}

// ── Voyeurizmus a exhibicionizmus ───────────────────────────────────
const VOYEUR: Blok = {
  druh: 'skupina', id: 'voyeur', nadpis: 'Voyeurizmus a exhibicionizmus',
  bloky: [
    p('vo_partner_solo', g('Sledovať partnerku pri masturbácii alebo intímnej aktivite', 'Sledovať partnera pri masturbácii alebo intímnej aktivite')),
    p('vo_iny_par', 'Sledovať iný pár pri sexe (klub, párty)'),
    p('vo_porno', 'Spoločné sledovanie erotických filmov ako predohra'),
    p('ex_partnerom', g('Byť sledovaný partnerkou (erotický tanec, masturbácia)', 'Byť sledovaná partnerom (erotický tanec, masturbácia)')),
    p('ex_inymi', g('Byť sledovaný inými pármi alebo divákmi počas intimity', 'Byť sledovaná inými pármi alebo divákmi počas intimity')),
    p('ex_semipublic', 'Diskrétne riziko odhalenia na verejnom mieste (auto, pláž, tmavá ulička)'),
    p('vo_natacanie', 'Natáčanie videí — len pre nás'),
  ],
}

// ── Roleplay a situačné prvky ──────────────────────────────────────
const ROLEPLAY: Blok = {
  druh: 'skupina', id: 'roleplay', nadpis: 'Roleplay a situačné prvky',
  bloky: [
    {
      druh: 'otazka', id: 'rp_spanok', typ: 'jeden',
      text: 'Predstieranie spánku / jemné dotyky „spiaceho" tela',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'za_podmienok', label: 'Len konkrétna verzia tejto scény' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    p('rp_identita', 'Skrývanie identity — maska, zaviazané oči, „slepá dôvera"'),
    p('rp_verejny', 'Verejný sex (diskrétny)'),
    p('rp_kostymy', 'Sex v kostýmoch (zvieracie uši, fantasy oblečenie)'),
    p('rp_prezliekanie', 'Obliekanie si oblečenia bežne spájaného s opačným pohlavím (crossdressing) ako súčasť hry'),
    p('rp_smoking', 'Smoking fetish — partner fajčí počas aktu'),
    p('rp_tehotenstvo', 'Fetiš na tehotenstvo / laktáciu (bruško, dojčenie ako prvok)'),
    p('rp_vek', 'Fetiš na vekový rozdiel — roleplay „mladší / starší"'),
  ],
}

// ── Messy play ──────────────────────────────────────────────────────
const MESSY: Blok = {
  druh: 'skupina', id: 'messy', nadpis: 'Wet-and-messy play — textúry, jedlo a hravý neporiadok',
  uvod:
    'WAM môže byť hravý, zmyslový, vizuálny, transformačný alebo ponižujúci: hladká koža sa zmení na plátno, jedlo na predohru a klzkosť na hru celého tela. ' +
    'Telesné tekutiny majú vlastné podrobné témy vyššie; tu ide o jedlo, kozmetické látky, farby a hmoty.',
  bloky: [
    {
      druh: 'otazka', id: 'messy_latky', typ: 'viac', inePovolene: true,
      text: 'Ktoré látky alebo textúry ma eroticky priťahujú',
      moznosti: [
        { v: 'jedlo', label: 'Šľahačka, med, čokoláda, ovocie alebo iné jedlo' },
        { v: 'krem', label: 'Krém, pena, olej, gél alebo lesk po celom tele' },
        { v: 'sliz', label: 'Sliz, blato, farba alebo výrazne klzká hmota' },
        { v: 'bodypaint', label: 'Body paint alebo liquid latex ako premena tela' },
        { v: 'voda', label: 'Voda, pena do kúpeľa alebo mokré oblečenie' },
        { v: 'prach', label: 'Múka, púder alebo iná suchá textúra na koži' },
      ],
    },
    {
      druh: 'otazka', id: 'messy_scenare', typ: 'viac', inePovolene: true,
      text: 'Ktoré messy scenáre ma lákajú',
      moznosti: [
        { v: 'ochutnavanie', label: g('Ochutnávať látku alebo tekutinu z partnerkinho tela', 'Ochutnávať látku alebo tekutinu z partnerovho tela') },
        { v: 'natieranie', label: 'Natierať telo a pomaly ho čistiť ústami alebo rukami' },
        { v: 'polievanie', label: 'Polievanie, striekanie alebo stekanie po tele' },
        { v: 'wrestling', label: 'Klzký wrestling alebo hra tiel pokrytých olejom či gélom' },
        { v: 'jedlo_na_tele', label: 'Servírovať alebo jesť jedlo z tela' },
        { v: 'premena', label: 'Postupne pokryť celé telo farbou, penou alebo lesklou hmotou' },
        { v: 'oblecenie', label: 'Zašpiniť alebo premočiť oblečenie ešte na tele' },
        { v: 'ponizenie', label: 'Zašpinenie ako dohodnuté ponižovanie' },
        { v: 'hravost', label: 'Hravá food fight alebo smiech bez mocenskej roly' },
      ],
    },
    {
      druh: 'otazka', id: 'messy_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka túži po messy hre viac než ja', 'Keď partner túži po messy hre viac než ja'),
      moznosti: [
        { v: 'laka', label: g('Jej telesnosť a túžba ma vzrušujú', 'Jeho telesnosť a túžba ma vzrušujú') },
        { v: 'vybrane', label: 'Chcem vybrať konkrétnu látku a konkrétnu rolu' },
        { v: 'fantazia', label: 'Môžeme o tom hovoriť alebo fantazírovať, no nechcem to na tele' },
        { v: 'nie', label: 'Táto telesnosť ma eroticky vypína' },
      ],
    },
    {
      druh: 'text', id: 'messy_mytus', ton: 'info', nadpis: 'Mýtus verzus realita',
      telo: g(
        'Mýtus: messy hra je iba „špinavý fetiš“. Realita: často ide o textúru, farbu, hravosť, premenu tela alebo dovolenie nebyť dokonale upravený. Záujem o šľahačku či olej nehovorí nič o vzťahu človeka k telesným tekutinám — sú to odlišné preferencie.',
        'Mýtus: messy hra je iba „špinavý fetiš“. Realita: často ide o textúru, farbu, hravosť, premenu tela alebo dovolenie nebyť dokonale upravená. Záujem o šľahačku či olej nehovorí nič o vzťahu človeka k telesným tekutinám — sú to odlišné preferencie.',
      ),
    },
  ],
}

const SPECIFICKE_PRAKTIKY: Blok = {
  druh: 'skupina', id: 'specificke_praktiky', nadpis: 'Špecifické praktiky a pomôcky — stručný objavovací screening',
  uvod:
    'Niektoré menej bežné záujmy sa v širokom dotazníku ľahko stratia. Tento blok ich nepovyšuje na povinnú skúsenosť; dáva človeku možnosť povedať „poznám a chcem“, „iba fantázia“, „zaujíma ma vysvetlenie“ alebo „nie“.',
  bloky: [
    {
      druh: 'otazka', id: 'sp_pomocky', typ: 'viac', inePovolene: true,
      text: 'Ktoré špecifické praktiky alebo pomôcky ma zaujímajú',
      moznosti: [
        { v: 'sounding', label: 'Uretrálny sounding alebo uretrálny plug' },
        { v: 'figging', label: 'Figging — intenzívny hrejivý podnet v análnej oblasti' },
        { v: 'enema', label: 'Erotický klystír alebo pocit naplnenia tekutinou' },
        { v: 'penis_pump', label: 'Penisová pumpa alebo vákuum ako vizuálny a telesný prvok' },
        { v: 'vulva_pump', label: 'Vulvová alebo klitorálna pumpa' },
        { v: 'nipple_pump', label: 'Pumpovanie bradaviek alebo pŕs' },
        { v: 'milking', label: 'Milking — prostatické „dojenie“ alebo kontrolované vyvrcholenie' },
        { v: 'speculum', label: 'Speculum alebo medical pomôcka ako prvok fantázie a roleplay' },
        { v: 'sex_machine', label: 'Sex machine — prijímať alebo ovládať jej rytmus' },
        { v: 'clone', label: 'Odliatok vlastných genitálií ako hračka pre pár' },
        { v: 'sleeve', label: 'Penisový sleeve, návlek alebo protéza pre inú textúru a funkciu' },
        { v: 'thigh_harness', label: 'Stehenný alebo bezbedrový harness' },
        { v: 'docking', label: 'Docking alebo spájanie genitálií cez predkožku' },
        { v: 'inflatable', label: 'Nafukovacie insertables alebo postupná zmena plnosti' },
        { v: 'furniture', label: 'Sex sling, dverový záves alebo polohovací nábytok' },
      ],
    },
    {
      druh: 'otazka', id: 'sp_uroven', typ: 'jeden',
      text: 'Ako chcem s označenou položkou naložiť',
      moznosti: [
        { v: 'realita', label: 'Chcem ju reálne preskúmať' },
        { v: 'fantazia', label: 'Vzrušuje ma iba ako fantázia alebo obraz' },
        { v: 'info', label: 'Najprv potrebujem presné vysvetlenie, až potom postoj' },
        { v: 'partner', label: g('Sám ju nepotrebujem, ale zaujíma ma partnerkina túžba', 'Sama ju nepotrebujem, ale zaujíma ma partnerova túžba') },
      ],
    },
    { druh: 'otazka', id: 'sp_partner', typ: 'text', text: g('Čo ma na partnerkinej túžbe po špecifickej praktike láka, zneisťuje alebo by som potreboval pochopiť:', 'Čo ma na partnerovej túžbe po špecifickej praktike láka, zneisťuje alebo by som potrebovala pochopiť:') },
  ],
}

// ── Objavovanie a reflexia ─────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Objavovanie a reflexia',
  bloky: [
    {
      druh: 'otazka', id: 'ram_zacat', typ: 'viac',
      text: 'Ako chceme fetiše objavovať',
      moznosti: [
        { v: 'diskusia', label: 'Najprv si opísať, čo nás na téme priťahuje' },
        { v: 'mierne', label: 'Začať miernymi formami, postupne rozvíjať' },
        { v: 'filmy', label: 'Spolu si pozrieť obsah na tú tému a rozprávať sa' },
        { v: 'reflexia', label: 'Po každom experimente reflexia „2+2"' },
      ],
    },
    { druh: 'otazka', id: 'ram_ochutnavanie', typ: 'jeden',
      text: g('Ako celkovo vnímam ochutnávanie telesných tekutín partnerky', 'Ako celkovo vnímam ochutnávanie telesných tekutín partnera'),
      moznosti: [
        { v: 'vzrusujuce', label: 'Je to veľmi vzrušujúce' },
        { v: 'situacia', label: 'Záleží na situácii a nálade' },
        { v: 'neprijemne', label: 'Nie je mi to príjemné' },
      ],
    },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'Fetiše a podnety, ktoré ma priťahujú najviac:' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'Veci, ktoré ma lákajú iba vo fantázii alebo podľa nálady:' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'Podnety, ktoré ma eroticky vôbec neoslovujú:' },
    { druh: 'otazka', id: 'sem_stopslovo', typ: 'text', text: 'Ako najradšej dávam najavo „pridaj / uber / zmeň rytmus":' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo ma na mojich záujmoch najviac vzrušuje (1–3 vety):' },
    { druh: 'otazka', id: 'pozn_bojim', typ: 'text', text: 'Čo ma pri tejto téme úplne odradí alebo vypne:' },
  ],
}

export const FETISE: TemaObsah = {
  slug: 'telesne-tekutiny/telesne-tekutiny',
  nadpis: 'Fetiše a špecifické záujmy',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_su', nadpis: 'Čo sú fetiše',
      telo:
        'Niekedy túžbu rozsvieti detail: lesk kože, vôňa nosenej bielizne, pohľad na chodidlá, zvuk opätkov alebo pocit, že sa obyčajný predmet stal tajným znakom medzi dvoma ľuďmi. ' +
        'Fetiš nemusí nahradiť príťažlivosť k človeku — často ju práve zaostrí a dá jej nový materiál, obraz, vôňu alebo rolu.',
    },
    {
      druh: 'text', id: 'ako_zacat', nadpis: 'Čo môže byť na detaile také silné', ton: 'info',
      telo:
        'Ten istý predmet môže priťahovať vzhľadom, dotykom, vôňou, zvukom, spomienkou, pocitom moci alebo tým, že odhaľuje a zároveň zakrýva. ' +
        'Preto sa screening nepýta iba „čo“, ale aj „ako“: pozerať, nosiť, ovoňať, dotýkať sa, odovzdať partnerovi alebo z toho vytvoriť celú scénu.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Aké fetiše ťa lákajú preskúmať?',
      napoveda: 'Rýchly prehľad — detaily sú nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'tekutiny', label: 'Telesné tekutiny (sliny, semeno, vlhkosť…)' },
        { v: 'materialy', label: 'Materiály a oblečenie (latex, koža, pančuchy…)' },
        { v: 'casti_tela', label: 'Časti tela a vzhľad (chodidlá, ruky, vlasy…)' },
        { v: 'vone', label: 'Vône a prirodzený pach' },
        { v: 'dirty_talk', label: 'Dirty talk a hlas' },
        { v: 'voyeur', label: 'Voyeurizmus / exhibicionizmus' },
        { v: 'roleplay', label: 'Roleplay a situačné prvky' },
        { v: 'messy', label: 'Messy play (jedlo, farby, olej)' },
        { v: 'ziadne', label: g('Zatiaľ nič konkrétne — som zvedavý', 'Zatiaľ nič konkrétne — som zvedavá') },
      ],
    },
    FETIS_SCREENING,
    SLINY,
    SEMENO,
    VLHKOST,
    MOC,
    SLZY,
    MENSTRUACIA,
    POT,
    MATERIALY,
    NOHAVICKY,
    CASTI_TELA,
    VONE,
    DIRTY_TALK,
    VOYEUR,
    ROLEPLAY,
    MESSY,
    SPECIFICKE_PRAKTIKY,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'reflexia', nadpis: 'Reflexia po experimente', ton: 'info',
      telo: 'Po každom novom kroku si povedzte, čo bolo príjemné a čo nie („2+2" — dve super, dve na úpravu), a naplánujte ďalší.',
    },
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zvýraznia podnety, tekutiny, materiály a scenáre, pri ktorých sa vaše preferencie stretávajú.',
    },
  ],
}

// Samostatné L3 témy musia smerovať na plný obsah, nie na skrátené seed
// položky zo stromu. Rovnaké bloky ostávajú aj v širokom fetišovom sprievodcovi.
export const PRIRODZENOST_TEMA: TemaObsah = {
  slug: 'telesne-tekutiny/prirodzenost',
  nadpis: 'Prirodzenosť tela — vôňa, chuť a tekutiny',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'prirodzenost_uvod', nadpis: 'Telo bez uhladenia',
      telo: 'Prirodzená vôňa, pot a sliny môžu byť intímnym detailom, výrazným zmyslovým podnetom aj súčasťou hry s úplným prijatím tela. Každá z týchto vrstiev má vlastné preferencie — jedna odpoveď za všetky by ich zbytočne osekala.',
    },
  ],
  telo: [SLINY, POT, VONE],
}

export const ZENSKA_VLHKOST_TEMA: TemaObsah = {
  slug: 'telesne-tekutiny/zenska-vlhkost',
  nadpis: g(
    'Jej prirodzená vlhkosť — vôňa, chuť a ochutnávanie',
    'Moja prirodzená vlhkosť — vôňa, chuť a ochutnávanie',
  ),
  zdielanieDovod: true,
  uvod: [],
  telo: [VLHKOST],
}

export const SEMENO_TEMA: TemaObsah = {
  slug: 'telesne-tekutiny/semeno',
  nadpis: 'Semeno a ejakulácia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'semeno_tema_uvod', nadpis: 'Viditeľné finále, zmysly a význam',
      telo: 'Semeno môže byť vizuálnym finále, stopou na tele, chuťou, teplom, symbolom plodnosti, moci, prijatia alebo hravosti. Táto téma preto oddeľuje konkrétne miesta, ústa s prehltnutím a bez neho, vnútornú ejakuláciu, rozotieranie, zlíznutie, snowballing aj kombinácie s ďalšími telesnými tekutinami.',
    },
  ],
  telo: [SEMENO],
}

export const MENSTRUALNA_KRV_TEMA: TemaObsah = {
  slug: 'telesne-tekutiny/menstrualna-krv',
  nadpis: 'Menštruačná krv a period play',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'menstruacia_tema_uvod', nadpis: 'Krv ako prirodzenosť, vizuál alebo tabu',
      telo: 'Menštruácia môže meniť chuť na sex, telesné vnemy aj význam samotnej krvi. Pre niekoho je neutrálna, pre iného zmyselná, vizuálna alebo tabu vrstva, ktorú chce preskúmať samostatne.',
    },
  ],
  telo: [MENSTRUACIA],
}

export const WATERSPORTS_TEMA: TemaObsah = {
  slug: 'telesne-tekutiny/watersports',
  nadpis: 'Watersports',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'watersports_tema_uvod', nadpis: 'Teplo, prirodzenosť, moc a tabu',
      telo: 'Watersports môže byť jemná spoločná telesná hra, sledovanie, prijímanie teplého prúdu, označenie tela alebo výrazná mocenská fantázia. Rozdiel medzi týmito podobami je príliš veľký na jednu všeobecnú otázku.',
    },
  ],
  telo: [MOC],
}

// F6 má štyri samostatné používateľské stránky. Každá dostáva vlastný výrez
// plného dirty-talk obsahu, aby nespadla na krátky seed zo stromu.
export const DIRTY_TALK_TON_TEMA: TemaObsah = {
  slug: 'dirty-talk-oslovenia/ton',
  nadpis: 'Dirty talk — tón, hlas a načasovanie',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'dt_ton_tema_uvod', nadpis: 'Keď túžbu nesie hlas',
      telo: 'Šepot pri uchu, nežný obdiv, hravé provokovanie aj pokojný rozkaz môžu z tej istej vety urobiť úplne iný zážitok. Táto časť mapuje hlas, chvíľu a postupné zosilňovanie slov.',
    },
  ],
  telo: [DT_TON, DT_PARTNER, DT_MYTY],
}

export const DIRTY_TALK_OBSAH_TEMA: TemaObsah = {
  slug: 'dirty-talk-oslovenia/obsah',
  nadpis: 'Dirty talk — čo chcem hovoriť a počuť',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'dt_obsah_tema_uvod', nadpis: 'Slová ako predohra, vedenie aj fantázia',
      telo: 'Dirty talk môže pomenovať túžbu, obdivovať telo, opisovať prítomný okamih, sľubovať ďalší krok, viesť príkazom alebo otvoriť erotickú rolu. Nejde o jednu správnu vetu, ale o obsah, ktorý medzi dvoma ľuďmi znie pravdivo a vzrušujúco.',
    },
  ],
  telo: [DT_OBSAH, DT_PARTNER, DT_MYTY],
}

export const DIRTY_TALK_OSLOVENIA_TEMA: TemaObsah = {
  slug: 'dirty-talk-oslovenia/oslovenia',
  nadpis: 'Dirty talk — oslovenia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'dt_oslovenia_tema_uvod', nadpis: 'Od mena po erotickú rolu',
      telo: '„Miláčik“ je iba začiatok. Oslovenie môže niesť nehu, pochvalu, vlastníctvo, poslušnosť, sexuálny apetít, objektifikáciu aj vedome zvolenú degradáciu. Rozhodujú presné slová a význam, ktorý majú práve pre vás.',
    },
  ],
  telo: [DT_OSLOVENIA, DT_PARTNER, DT_MYTY],
}

export const DIRTY_TALK_JAZYK_TELA_TEMA: TemaObsah = {
  slug: 'dirty-talk-oslovenia/jazyk-tela',
  nadpis: 'Dirty talk — jazyk tela a genitálií',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'dt_jazyk_tela_tema_uvod', nadpis: 'Slová, ktoré telo rozsvietia alebo vypnú',
      telo: 'Niekto chce zmyselný obdiv, iný priame anatomické slová a ďalší surový slovník. Táto časť oddeľuje spôsob hovorenia o tele od konkrétnych pomenovaní, aby sa nestratilo to, čo znie eroticky — ani to, čo okamžite ruší náladu.',
    },
  ],
  telo: [DT_JAZYK_TELA, DT_PARTNER, DT_MYTY],
}
