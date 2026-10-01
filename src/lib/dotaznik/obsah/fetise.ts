import type { TemaObsah, Blok, Moznost, Podmienka } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Fetiše a špecifické záujmy — modul G3 „Telesné tekutiny a prirodzenosť".
// Zdroj: „21_Fetise" (checklist materiálov/častí tela + hlboký ponor do
// telesných tekutín + situačné fetiše). Zjednotené, každá odlišná otázka
// zachovaná. z/m verzia zrkadlová (rovnaké id + hodnoty).
// Doplnené 2026-10-01: WHO SHAPE; Holvoet et al. 2017; kink ženy
// (Sagarin et al.); Autostraddle, The Duchy a Temple Scarlet checklisty.
// Rozšírené WAM/tekutiny a nízkofrekvenčný screening špecifických praktík.
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
      text: 'Prijímam: partner/ka použije sliny ako vlhkosť pri predohre alebo manuálnej stimulácii', moznosti: SLINY_YFMN,
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
      druh: 'otazka', id: 'sliny_akt_lub', typ: 'jeden', podmienka: SLINY_OPEN,
      text: 'Som aktér/ka: používam sliny ako vlhkosť pri predohre alebo manuálnej stimulácii', moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_akt_telo', typ: 'jeden', podmienka: SLINY_OPEN,
      text: 'Som aktér/ka: nechám sliny stekať alebo pľuvnem na partnerovo telo', moznosti: SLINY_YFMN,
    },
    {
      druh: 'otazka', id: 'sliny_akt_moc', typ: 'jeden', podmienka: SLINY_OPEN,
      text: 'Som aktér/ka: používam sliny ako prejav sily alebo nadvlády', moznosti: SLINY_YFMN,
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
        { v: 'otvor_usta', label: 'Príkaz otvoriť ústa a prijať sliny' },
        { v: 'lizanie', label: 'Zlízať sliny späť z kože' },
        { v: 'wet_look', label: 'Rozotrieť ich po tele pre mokrý vzhľad' },
        { v: 'dirty_talk', label: 'Nechať scénu iba vo fantázii a opísať ju slovami' },
      ],
    },
    { druh: 'otazka', id: 'sliny_vyznam', typ: 'viac', text: 'Čo je pre mňa na slinách vzrušujúce', moznosti: VYZNAM, podmienka: SLINY_OPEN },
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
  uvod: 'Symbol túžby a splynutia — zmyslový zážitok (chuť, teplo, konzistencia, vôňa), dôkaz vzrušenia, prvok moci alebo odovzdania.',
  bloky: [
    {
      druh: 'otazka', id: 'semeno_na_telo', typ: 'viac', inePovolene: true,
      text: 'Ejakulácia na telo — kam je to v poriadku',
      moznosti: [
        { v: 'tvar', label: 'Tvár („facial")' },
        { v: 'prsia', label: 'Prsia a bradavky' },
        { v: 'brucho', label: 'Brucho a stehná' },
        { v: 'vlasy', label: 'Vlasy' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'nikam', label: 'Nikam na telo' },
      ],
    },
    p('semeno_prehltanie', 'Prehĺtanie semena ako súčasť orálneho rituálu'),
    p('semeno_snowballing', '„Snowballing" — predávanie semena ústami späť partnerovi'),
    p('semeno_ocistenie', 'Orálne očistenie po ejakulácii (penis / vagína jazykom)'),
    p('semeno_lubrikant', 'Semeno rozotreté ako lubrikant (klitoris, hrádza)'),
    p('semeno_bielizen', 'Semeno na spodnej bielizni ako pripomienka / vôňa'),
    p('semeno_kombinacia', 'Kombinácia semena so slinami a vaginálnou vlhkosťou („koktail")'),
    { druh: 'otazka', id: 'semeno_vyznam', typ: 'viac', text: 'Čo je pre mňa na semene vzrušujúce', moznosti: VYZNAM },
    {
      druh: 'otazka', id: 'semeno_chut', typ: 'text',
      text: 'Komfort s chuťou — čo pomáha (napr. ovocie, veľa vody) / čo je mimo:',
    },
  ],
}

const VLHKOST: Blok = {
  druh: 'skupina', id: 'vlhkost', nadpis: 'Vaginálna vlhkosť',
  uvod: 'Jeden z najpravdivejších prejavov vzrušenia — nedá sa predstierať ani potlačiť. Pre niekoho jemný symbol dôvery, pre iného surový a dráždivý.',
  bloky: [
    p('vlhkost_ochutnat', 'Partner ju ochutná priamo, bez bariér a hanby'),
    p('vlhkost_rozotieranie', 'Rozotieranie po perách, tele alebo bradavkách'),
    p('vlhkost_ponuknut', g('Vedome sa mi partnerka ponúkne, aby som ochutnal', 'Vedome sa partnerovi ponúknem, aby ochutnal')),
    p('vlhkost_kombinacia', 'Kombinácia s inými tekutinami počas hry'),
  ],
}

const MOC: Blok = {
  druh: 'skupina', id: 'moc_tek', nadpis: 'Moč (watersports)',
  uvod: 'Teplo, mokrý pocit, odovzdanie, dominancia a tabu môžu tvoriť jadro tejto fantázie alebo praktiky.',
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
    { druh: 'otazka', id: 'moc_podmienky', typ: 'text', text: 'Scenár, miesto a forma, ktoré si viem predstaviť:', podmienka: { ot: 'moc_uroven', jeNiektora: ['mozno', 'ano'] } },
  ],
}

const SLZY: Blok = {
  druh: 'skupina', id: 'slzy', nadpis: 'Slzy a emočné výlevy',
  bloky: [
    p('slzy_zranitelnost', 'Fetiš na zraniteľnosť — vidieť / prejaviť emóciu a slzy počas intimity'),
    p('slzy_scena', 'Slzy počas intenzívnej scény ako uvoľnenie / katarzia'),
  ],
}

const MENSTRUACIA: Blok = {
  druh: 'skupina', id: 'menstruacia', nadpis: 'Menštruačná krv',
  bloky: [
    p('men_sex', 'Sex počas menštruácie'),
    p('men_periodplay', '„Period play" — vedomá hra s menštruačnou krvou'),
  ],
}

// ── Oblečenie a materiály ───────────────────────────────────────────────
const MATERIALY: Blok = {
  druh: 'skupina', id: 'materialy', nadpis: 'Oblečenie a materiály',
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
        { v: 'partner', label: 'Partner/ka' },
        { v: 'oboje', label: 'Oboje' },
        { v: 'striedavo', label: 'Podľa nálady' },
      ],
    },
    p('mat_priliehave', 'Maznanie a dotyky cez priliehavé oblečenie (pocit materiálu na koži, vône latexu)'),
    p('mat_textilie_stimulacia', 'Prechádzanie hodvábom / textíliou po tele ako stimulácia'),
    p('mat_opatky_pocas', 'Nechať topánky / opätky / pančuchy počas aktu'),
  ],
}

// ── Časti tela a vzhľad ────────────────────────────────────────────────
const CASTI_TELA: Blok = {
  druh: 'skupina', id: 'casti_tela', nadpis: 'Časti tela a vzhľad',
  bloky: [
    p('foot_davam', 'Foot fetish — venovať pozornosť chodidlám partnera (masáž, bozky, olizovanie prstov)'),
    p('foot_dostavam', 'Foot fetish — keď partner venuje pozornosť mojim chodidlám'),
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
  ],
}

// ── Vône a pach ───────────────────────────────────────────────────────
const VONE: Blok = {
  druh: 'skupina', id: 'vone', nadpis: 'Vône a prirodzený pach',
  bloky: [
    p('vona_prirodzena', 'Prirodzený pach tela a pohlavia ako afrodiziakum'),
    p('vona_parfum', 'Konkrétny parfum / vôňa ako súčasť hry'),
    {
      druh: 'otazka', id: 'nohavicky', typ: 'viac',
      text: 'Použité nohavičky — čo ma láka',
      moznosti: [
        { v: 'uchovanie', label: 'Uchovanie / nosenie pri sebe kvôli vôni' },
        { v: 'sniffing', label: 'Cítenie vône (sniffing)' },
        { v: 'na_tvar', label: 'Prikladanie na tvár počas predohry' },
        { v: 'ziadne', label: 'Nič z toho' },
      ],
    },
  ],
}

// ── Dirty talk, prosby a hlas ─────────────────────────────────────────
const DIRTY_TALK: Blok = {
  druh: 'skupina', id: 'dirty_talk', nadpis: 'Dirty talk, prosby a hlas',
  bloky: [
    p('dt_hruby', 'Hrubší slovník / vulgárne'),
    {
      druh: 'otazka', id: 'dt_urazky', typ: 'jeden',
      text: 'Sexuálne urážky / ponižovanie',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'za_podmienok', label: 'Len niektoré slová alebo konkrétny štýl' },
        { v: 'nie', label: 'Nie, vypína ma to' },
      ],
    },
    p('dt_prosby', 'Prosby a pokorné reči'),
    p('dt_hlas', 'Fetiš na hlas — šepot, ASMR, pomalý hlas do ucha'),
    { druh: 'otazka', id: 'dt_mimo', typ: 'text', text: 'Presné slová alebo oslovenia, ktoré ma vypínajú:' },
  ],
}

// ── Voyeurizmus a exhibicionizmus ───────────────────────────────────
const VOYEUR: Blok = {
  druh: 'skupina', id: 'voyeur', nadpis: 'Voyeurizmus a exhibicionizmus',
  bloky: [
    p('vo_partner_solo', 'Sledovať partnera pri masturbácii / intímnej aktivite'),
    p('vo_iny_par', 'Sledovať iný pár pri sexe (klub, párty)'),
    p('vo_porno', 'Spoločné sledovanie erotických filmov ako predohra'),
    p('ex_partnerom', 'Byť sledovaný/á partnerom (erotický tanec, masturbácia)'),
    p('ex_inymi', 'Byť sledovaný/á inými pármi alebo divákmi počas intimity'),
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
  druh: 'skupina', id: 'messy', nadpis: 'Tekutiny a wet-and-messy play — telo bez sterilnosti',
  uvod:
    'Pre niekoho je vlhkosť dôkazom vzrušenia, pot vôňou blízkosti a neporiadok dovolením stratiť kontrolu nad uhladeným obrazom seba. WAM môže byť hravý a zmyslový, ponižujúci, vizuálny alebo jednoducho veľmi telesný.',
  bloky: [
    {
      druh: 'otazka', id: 'messy_latky', typ: 'viac', inePovolene: true,
      text: 'Ktoré látky a telesné prejavy ma eroticky priťahujú',
      moznosti: [
        { v: 'pot', label: 'Pot, horúca koža a prirodzený pach po sexe alebo pohybe' },
        { v: 'slzy', label: 'Slzy ako emocionálny alebo mocenský obraz' },
        { v: 'sliny', label: 'Sliny — bozk, stekanie, pľutie alebo rozotieranie' },
        { v: 'semeno', label: 'Semeno — na tele, v ústach alebo ako vizuálne finále' },
        { v: 'vaginalna', label: 'Vaginálna vlhkosť alebo squirting ako viditeľný znak vzrušenia' },
        { v: 'menstruacia', label: 'Menštruačná krv bez hanby alebo odporu' },
        { v: 'moc', label: 'Moč ako telesná, tabu alebo mocenská hra' },
        { v: 'mlieko', label: 'Materské mlieko alebo laktácia' },
        { v: 'jedlo', label: 'Šľahačka, med, čokoláda, ovocie alebo iné jedlo' },
        { v: 'krem', label: 'Krém, pena, olej, gél alebo lesk po celom tele' },
        { v: 'sliz', label: 'Sliz, blato, farba alebo výrazne klzká hmota' },
        { v: 'bodypaint', label: 'Body paint alebo liquid latex ako premena tela' },
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
        { v: 'cum_kiss', label: 'Cum-kiss alebo snowballing — odovzdanie semena bozkom' },
        { v: 'felching', label: 'Felching ako explicitná fantasy alebo praktika' },
        { v: 'oznacenie', label: 'Označenie tela tekutinou ako dominantný alebo majetnícky obraz' },
        { v: 'ponizenie', label: 'Zašpinenie ako dohodnuté ponižovanie' },
        { v: 'hravost', label: 'Hravá food fight alebo smiech bez mocenskej roly' },
      ],
    },
    {
      druh: 'otazka', id: 'messy_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka túži po tekutinách alebo zašpinení viac než ja', 'Keď partner túži po tekutinách alebo zašpinení viac než ja'),
      moznosti: [
        { v: 'laka', label: g('Jej telesnosť a túžba ma vzrušujú', 'Jeho telesnosť a túžba ma vzrušujú') },
        { v: 'vybrane', label: 'Chcem vybrať konkrétnu látku a konkrétnu rolu' },
        { v: 'fantazia', label: 'Môžeme o tom hovoriť alebo fantazírovať, no nechcem to na tele' },
        { v: 'nie', label: 'Táto telesnosť ma eroticky vypína' },
      ],
    },
    {
      druh: 'text', id: 'messy_mytus', ton: 'info', nadpis: 'Mýtus verzus realita',
      telo:
        'Mýtus: messy hra je iba „špinavý fetiš“. Realita: môže byť hravým návratom k telu, zmyslovou textúrou, dôkazom vzrušenia alebo vedomým opustením potreby vyzerať dokonale. Nie každý, koho vzrušuje pot či vlhkosť, chce extrémnejšie tekutiny — každá má vlastný význam.',
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
      text: 'Ako vnímam ochutnávanie telesných tekutín partnera celkovo',
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
        'Špecifické podnety, predmety, situácie alebo dynamiky, ktoré vyvolávajú sexuálne vzrušenie. ' +
        'Sú prirodzenou súčasťou sexuality. Delia sa na fyzické (časti tela, materiály, obuv), ' +
        'dynamické (dominancia/submisivita, voyeurizmus, exhibicionizmus) a psychologické (roleplay, mocenské hry).',
    },
    {
      druh: 'text', id: 'ako_zacat', nadpis: 'Ako začať', ton: 'info',
      telo:
        'Najprv si pomenujte, čo je na konkrétnom podnete vzrušujúce: vzhľad, materiál, vôňa, moc, tabu alebo určitá rola. ' +
        'Začať sa dá opisom fantázie, jemnou verziou, jedným prvkom alebo celým pripraveným scenárom.',
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
        { v: 'ziadne', label: 'Zatiaľ nič konkrétne — som zvedavý/á' },
      ],
    },
    SLINY,
    SEMENO,
    VLHKOST,
    MOC,
    SLZY,
    MENSTRUACIA,
    MATERIALY,
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
