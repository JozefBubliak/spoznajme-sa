// ─────────────────────────────────────────────────────────────────────────────
// Dotazník intímnych preferencií — STROM (schéma stránok + navigácia)
//
// Podľa docs/dotaznik-strom-navrh.md:
//   L1 doména (9) → L2 modul (54) → L3 okruh (~215) → L4 položka (seed ~550).
// Tento súbor drží štruktúru + poradie preklikov + sekčnú kostru modulu.
// Konkrétne znenie otázok: `otazky.ts` (generický walker) alebo `obsah/**` (kniha).
// ─────────────────────────────────────────────────────────────────────────────

export type Citlivost = 1 | 2 | 3 // 1 = jemné/bezpečné, 2 = stredné, 3 = vysoké/tabu

// ── Kanonická kostra sekcií vnútri jednej témy (okruhu) ─────────────────────
export type SekciaId =
  | 'kontext'
  | 'parametre'
  | 'hranice'
  | 'intro'
  | 'chcem'
  | 'skusenost'
  | 'preferencie'
  | 'techniky'
  | 'scenare'
  | 'zrkadlo-roli'
  | 'uvolnenie'
  | 'ako-na-to'
  | 'pocity'
  | 'bezpecne'
  | 'rizikove'
  | 'parovy-suhrn'
  | 'session-card'

export type Sekcia = {
  id: SekciaId
  nazov: string
  ucel: string
  volitelna?: boolean
  lenRizikove?: boolean
  lenZrkadlo?: boolean
}

export const SEKCIE: Sekcia[] = [
  { id: 'kontext', nazov: 'Kontext a nastavenia', ucel: 'Kedy, ako často, za akých podmienok téma vôbec prichádza do úvahy.' },
  { id: 'parametre', nazov: 'Základné parametre', ucel: 'Spoločný slovník: tlak, tempo, intenzita, hĺbka, trvanie.' },
  { id: 'hranice', nazov: 'Hranice (Áno / Možno / Nie)', ucel: 'Semafor: čo je zelené, čo oranžové, čo červené.' },
  { id: 'intro', nazov: 'Naladenie', ucel: 'Krátky úvod: čo téma znamená a prečo sa o nej oplatí hovoriť.' },
  { id: 'chcem', nazov: 'Chcem to skúmať?', ucel: 'Vstupná voľba bez tlaku — Áno / Ešte nie / Nie.' },
  { id: 'skusenost', nazov: 'Skúsenosť', ucel: 'Čo už máme za sebou a ako sme sa pri tom cítili.' },
  { id: 'preferencie', nazov: 'Preferencie', ucel: 'Čo presne chcem a ako — jadro dotazníka.' },
  { id: 'techniky', nazov: 'Techniky', ucel: 'Katalóg konkrétnych variácií (mení sa podľa témy).' },
  { id: 'scenare', nazov: 'Scenáre (S0 / S1 / S2)', ucel: 'Postupné stupňovanie od najjemnejšej verzie po najintenzívnejšiu.' },
  { id: 'zrkadlo-roli', nazov: 'Zrkadlo rolí', ucel: 'JA PRIJÍMAM vs JA POSKYTUJEM — pre témy s dvoma rolami.', lenZrkadlo: true },
  { id: 'uvolnenie', nazov: 'Uvoľnenie (dych a telo)', ucel: 'Ako sa dostať do pohody pred aj počas.', volitelna: true },
  { id: 'ako-na-to', nazov: 'Keď nevieme ako na to', ucel: 'Mikro-návod pre partnera/partnerku, ak chýba skúsenosť.', volitelna: true },
  { id: 'pocity', nazov: 'Pocity', ucel: 'Náročné emócie, hanba, strach — priestor ich pomenovať.', volitelna: true },
  { id: 'bezpecne', nazov: 'Bezpečne', ucel: 'Banner zásad + kontraindikácie.' },
  { id: 'rizikove', nazov: 'Rizikové praktiky — rámec', ucel: 'Minimálny bezpečnostný rámec pre rizikové varianty.', lenRizikove: true },
  { id: 'parovy-suhrn', nazov: 'Párový súhrn', ucel: 'Čo sa ukáže obom (len zhoda — Double Blind).' },
  { id: 'session-card', nazov: 'Session card', ucel: 'Konkrétny plán na jednu spoločnú chvíľu.', volitelna: true },
]

// ── Okruh (L3) — pod-oblasť v rámci modulu (v kóde historicky „Tema") ──────
export type Tema = {
  slug: string
  nazov: string
  popis: string
  zrkadlova?: boolean
  rizikova?: boolean
  sekcie?: SekciaId[]
  /** L4 seed — konkrétne praktiky/varianty; feedujú „Preferencie". */
  polozky?: string[]
}

// ── Modul (L2) ────────────────────────────────────────────────────────────
export type Modul = {
  slug: string
  cislo: number
  kod: string // A1, B3, H6 …
  domena: string // id domény (A–I)
  nazov: string
  popis: string
  ikona: string
  citlivost: Citlivost
  zrkadlovy?: boolean
  rizikovy?: boolean
  tier1?: boolean
  temy: Tema[]
}

// ── Doména (L1) ──────────────────────────────────────────────────────────
export type Domena = {
  id: string
  nazov: string
  popis: string
  ikona: string
  citlivost: Citlivost
}

export const DOMENY: Domena[] = [
  { id: 'A', nazov: 'Naladenie a rámec', popis: 'Všetko „pred" a „okolo" fyzického — bez toho zvyšok nefunguje.', ikona: '🕯️', citlivost: 1 },
  { id: 'B', nazov: 'Telo, dotyk a zmysly', popis: 'Nepenetratívne. Tu má väčšina párov najviac skrytého priestoru.', ikona: '🤲', citlivost: 1 },
  { id: 'C', nazov: 'Orál', popis: 'Orál na vulvu/penis, anilingus, kombinácie a polohy s dynamikou.', ikona: '👄', citlivost: 2 },
  { id: 'D', nazov: 'Penetrácia a priebeh aktu', popis: 'Vaginálna a análna penetrácia, polohy, tempo, orgazmus, aftercare.', ikona: '🌊', citlivost: 2 },
  { id: 'E', nazov: 'Pomôcky a hračky', popis: 'Vibrátory, dildá, análne a párové pomôcky, lubrikanty, nositeľné.', ikona: '🎛️', citlivost: 2 },
  { id: 'F', nazov: 'Moc, rola a scéna', popis: 'Konsenzuálna hra s mocou. Vyžaduje safe-words, dôveru a aftercare.', ikona: '⛓️', citlivost: 3 },
  { id: 'G', nazov: 'Fetiše a špecifické záujmy', popis: 'Časti tela, materiály, tekutiny, zvuky, objekty a rituály.', ikona: '🧷', citlivost: 3 },
  { id: 'H', nazov: 'Otvorenosť a ďalší ľudia', popis: 'Najprv ako fantázia. „Vzrušuje ma to v predstave" vs „chcem to reálne".', ikona: '🌐', citlivost: 3 },
  { id: 'I', nazov: 'Hranice, zdravie a telo', popis: 'Povinný rámec — prechádza sa pred modulmi aj priebežne.', ikona: '🛡️', citlivost: 1 },
]

// helper na skrátenie zápisu okruhu
const o = (slug: string, nazov: string, popis: string, polozky?: string[], extra?: Partial<Tema>): Tema => ({
  slug, nazov, popis, ...(polozky ? { polozky } : {}), ...extra,
})

// ─────────────────────────────────────────────────────────────────────────────
// MODULY (54) — poradie od najjemnejšieho po najcitlivejšie
// ─────────────────────────────────────────────────────────────────────────────
export const MODULY: Modul[] = [
  // ═══ A — NALADENIE A RÁMEC ═══════════════════════════════════════════════
  {
    slug: 'mentalna-priprava-tuzba', cislo: 1, kod: 'A1', domena: 'A', tier1: true,
    nazov: 'Mentálna príprava a túžba', popis: 'Vnútorné naladenie, bloky, libido, brzdy a spúšťače vzrušenia.', ikona: '🧠', citlivost: 1,
    temy: [
      o('vnutorne-naladenie', 'Vnútorné naladenie', 'Ako sa dostať do hlavy pred intimitou.', ['Fantazírovanie a vizualizácia scén', 'Spomínanie na predošlé zážitky', 'Erotické príbehy v mysli', 'Mentálne hry so „zakázaným"', 'Mindfulness a dych pred sexom']),
      o('praca-s-blokmi', 'Práca s blokmi', 'Čo v hlave prekáža a ako to zmierniť.', ['Uvoľnenie stresu', 'Hanba „nie som dosť dobrý/á"', 'Tlak na výkon', 'Telo-image počas aktu', 'Rozptýlená myseľ / „to-do list v hlave"']),
      o('libido-chut', 'Libido a chuť', 'Úroveň túžby a rozdiely medzi nami.', ['Úroveň túžby', 'Rozdiel medzi nami', 'Spontánna vs responzívna túžba', 'Čo chuť spúšťa', 'Čo ju spoľahlivo zabíja']),
      o('brzdy-spustace', 'Brzdy a spúšťače (dual control)', 'Kontexty, ktoré zapínajú alebo vypínajú.', ['Kontexty, ktoré zapínajú', 'Kontexty, ktoré vypínajú', 'Strach z následkov', 'Hnev / nevyriešený konflikt', 'Únava', 'Alkohol']),
    ],
  },
  {
    slug: 'iniciacia-signalizacia', cislo: 2, kod: 'A2', domena: 'A', tier1: true,
    nazov: 'Iniciácia a signalizácia', popis: 'Kto a ako začína, neverbálne aj verbálne pozvanie, odmietnutie s láskou.', ikona: '💌', citlivost: 1,
    temy: [
      o('kto-a-ako-zacina', 'Kto a ako začína', 'Rozdelenie iniciácie.', ['Striedanie iniciácie', 'Vždy jeden', 'Dohodnutý signál', '„Nikdy neiniciujem, chcem byť zvedený/á"']),
      o('neverbalne-signaly', 'Neverbálne signály', 'Ako dať vedieť bez slov.', ['Pohľady', 'Dotyk', 'Priblíženie', 'Obliekanie / vyzliekanie', 'Poloha v posteli']),
      o('verbalne-pozvanie', 'Verbálne pozvanie', 'Ako to povedať.', ['Priame („chcem ťa")', 'Náznakom', 'Hravé', 'Správa cez deň', 'Kód / heslo']),
      o('odmietnutie-s-laskou', 'Odmietnutie s láskou', 'Ako povedať a prijať „nie teraz".', ['Ako povedať „nie teraz"', 'Čo potrebujem počuť pri odmietnutí', 'Náhradná blízkosť bez sexu']),
      o('hrave-formy', 'Hravé formy', 'Iniciácia ako hra.', ['Erotická fotka', 'Lístoček', 'Hra / stávka', '„Date night" ako signál']),
    ],
  },
  {
    slug: 'prostredie-atmosfera', cislo: 3, kod: 'A3', domena: 'A', tier1: true,
    nazov: 'Prostredie a atmosféra', popis: 'Priestor, zmysly priestoru, súkromie a príprava.', ikona: '🌙', citlivost: 1,
    temy: [
      o('priestor', 'Priestor', 'Kde.', ['Spálňa', 'Iná izba', 'Kúpeľňa', 'Kuchyňa / gauč', 'Vonku (legálne)', 'Auto', 'Hotel / chata']),
      o('zmysly-priestoru', 'Zmysly priestoru', 'Svetlo, zvuk, vôňa, teplota.', ['Svetlo (tma / sviečky / plné svetlo)', 'Hudba', 'Vôňa', 'Teplota', 'Posteľná bielizeň']),
      o('sukromie-rusenie', 'Súkromie a rušenie', 'Čo nás vyrušuje.', ['Deti doma', 'Tenké steny', 'Telefóny preč', 'Časový tlak vs „máme celú noc"']),
      o('priprava-priestoru', 'Príprava priestoru', 'Režisérska príprava vs spontánne.', ['Pripravené pomôcky / uterák', 'Nápoj', 'Playlist', '„Režisérska" príprava vs spontánne']),
    ],
  },
  {
    slug: 'predohra-stupnovanie', cislo: 4, kod: 'A4', domena: 'A', tier1: true,
    nazov: 'Predohra a stupňovanie', popis: 'Dĺžka a tempo, slow-sex prvky, poradie, naladenie po konflikte.', ikona: '🕰️', citlivost: 1,
    temy: [
      o('dlzka-tempo', 'Dĺžka a tempo', 'Koľko predohry.', ['Quickie', 'Stredná', 'Dlhá „slow" predohra', 'Viac krátkych vĺn počas dňa']),
      o('slow-sex-prvky', 'Slow sex prvky', 'Vedomé spomalenie.', ['Tease & denial', 'Odkladanie penetrácie', 'Sústredenie na dych', 'Synchronizácia']),
      o('poradie', 'Poradie', 'Čo za čím.', ['Od jemného k dravému', 'Striedanie', '„Preskočiť rovno na…"', 'Čo musí prísť ako prvé']),
      o('naladenie-po-konflikte', 'Naladenie po konflikte', 'Zmierovací sex áno/nie.', ['„Zmierovací" sex áno / nie', 'Potreba najprv doriešiť', 'Vedomé prepnutie režimu']),
    ],
  },
  {
    slug: 'komunikacia-pocas-po', cislo: 5, kod: 'A5', domena: 'A', tier1: true,
    nazov: 'Komunikácia počas a po', popis: 'Počas aktu, spätná väzba, po akte, jemný aftercare.', ikona: '💬', citlivost: 1,
    temy: [
      o('pocas-aktu', 'Počas aktu', 'Ako komunikujeme počas.', ['Ticho', 'Zvuky a dych', 'Slovné pokyny', 'Pochvala / povzbudenie', 'Smiech je OK']),
      o('spatna-vazba', 'Spätná väzba', 'Kedy a ako.', ['Priebežná', 'Až po akte', 'Dohodnuté signály „viac / menej / stop"']),
      o('po-akte', 'Po akte', 'Prvé minúty po.', ['Objatie a rozhovor', 'Ticho', 'Usnúť', 'Sprcha', '„Debrief" čo bolo super / čo inak']),
      o('aftercare-jemna', 'Aftercare (jemná úroveň)', 'Po bežnom sexe.', ['Čo potrebujem po bežnom sexe', 'Ako dlho', 'Slová vs dotyk vs samota']),
    ],
  },

  // ═══ B — TELO, DOTYK A ZMYSLY ═══════════════════════════════════════════
  {
    slug: 'bozky', cislo: 6, kod: 'B1', domena: 'B', tier1: true, zrkadlovy: true,
    nazov: 'Bozky', popis: 'Typy, zóny, intenzita, bozk ako vedenie, kontext.', ikona: '💋', citlivost: 1,
    temy: [
      o('typy', 'Typy', 'Aký bozk.', ['Jemné „motýlie"', 'Francúzsky / hlboký', 'Hryzenie pier', 'Sanie pier']),
      o('zony', 'Zóny', 'Kam.', ['Pery', 'Krk a kľúčna kosť', 'Uši', 'Brucho', 'Vnútorné stehná', 'Chrbát', 'Prsty / dlaň']),
      o('intenzita-tempo', 'Intenzita a tempo', 'Ako.', ['Pomalé a zmyselné', 'Striedavé', 'Dravé', 'Od jemných k hrubým']),
      o('bozk-ako-vedenie', 'Bozk ako vedenie', 'Bozk s dynamikou moci.', ['Pevný úchop hlavy / vlasov', '„Povedz, že ma chceš, potom ťa pobozkám"', 'Bozk ako začiatok dominancie']),
      o('kontext', 'Kontext', 'Kedy.', ['Na privítanie', 'Počas dňa bez pokračovania', 'Len počas sexu', 'S očným kontaktom']),
    ],
  },
  {
    slug: 'dotyky-hladenie-maznanie', cislo: 7, kod: 'B2', domena: 'B', tier1: true, zrkadlovy: true,
    nazov: 'Dotyky, hladenie a maznanie', popis: 'Jemné dotyky, tlak a stisk, zóny tela, objatia, kontext.', ikona: '🫳', citlivost: 1,
    temy: [
      o('jemne-dotyky', 'Jemné dotyky', 'Ľahká hra.', ['Prechádzanie prstami po tvári / vlasoch', 'Obťahovanie pier', 'Kreslenie tvarov na koži', 'Nechtami po chrbte']),
      o('tlak-stisk', 'Tlak a stisk', 'Pevnejšie.', ['Striedanie hladenia a pevného stisku', '„Mačací pazúrik"', 'Hrubšie chytenie', 'Jemné plesknutie po zadku']),
      o('zony-tela', 'Zóny tela', 'Kde.', ['Krk / ramená', 'Chrbát / kríže', 'Zadok / stehná', 'Lýtka / chodidlá', 'Brucho', 'Vnútro lakťov a kolien']),
      o('objatia-blizkost', 'Objatia a blízkosť', 'Telo na telo.', ['Dlhé objatie', '„Lyžičky"', 'Hlava na hrudi', 'Prepletené nohy', 'Váha tela na mne']),
      o('kontext-maznania', 'Kontext maznania', 'Kedy.', ['Nesexuálne počas dňa', 'Ako predohra', 'Po sexe', 'Pri usínaní', 'Pri filme']),
    ],
  },
  {
    slug: 'masaz', cislo: 8, kod: 'B3', domena: 'B', zrkadlovy: true,
    nazov: 'Masáž', popis: 'Nesexuálna, zmyselná, erotická; nástroje.', ikona: '💆', citlivost: 2,
    temy: [
      o('nesexualna', 'Nesexuálna', 'Uvoľnenie.', ['Chrbát', 'Nohy', 'Hlava / vlasy', 'Ruky', 'S olejom', 'Teplé uteráky']),
      o('zmyselna', 'Zmyselná', 'Prechod k erotogénnym zónam.', ['Celotelová s prechodom k erotogénnym zónam', '„Nedotýkať sa genitálií, kým nepoviem"']),
      o('eroticka', 'Erotická', 'Priamo ku genitáliám.', ['Priamy prechod ku genitáliám', 'Yoni / lingam masáž', 'Masáž hrádze']),
      o('nastroje', 'Nástroje', 'Čím.', ['Ruky', 'Olej', 'Pierko / rukavica', 'Masážna hlavica', 'Horúci vosk (nízkoteplotný)']),
    ],
  },
  {
    slug: 'zmyslova-hra', cislo: 9, kod: 'B4', domena: 'B', rizikovy: true,
    nazov: 'Zmyslová hra', popis: 'Zrak, sluch, čuch, chuť, hmat/teplota; layering a deprivácia.', ikona: '🎨', citlivost: 2,
    temy: [
      o('zrak', 'Zrak', 'Vizuál a jeho odopretie.', ['Zaviazané oči', 'Striptease', 'Sledovanie v zrkadle', 'Vizuálne podnety', '„Pozeraj sa mi do očí"']),
      o('sluch', 'Sluch', 'Zvuk a ticho.', ['Šepot', 'Dirty talk (jemný)', 'Hudba', 'Sluchová deprivácia (slúchadlá / biely šum)']),
      o('cuch', 'Čuch', 'Vône.', ['Prirodzená vôňa tela a pohlavia', 'Parfum / olej', 'Feromóny', '„Vôňa po sexe"']),
      o('chut', 'Chuť', 'Ochutnávanie.', ['Bozky s ochutnávaním', 'Jedlo (ovocie, šľahačka, med)', 'Nápoj', 'Telesné tekutiny (opt-in)']),
      o('hmat-teplota-textura', 'Hmat / teplota / textúra', 'Dotyk materiálov a teplôt.', ['Ľad', 'Teplý olej', 'Hodváb / koža / latex na koži', 'Pierko', 'Vibrácia', 'Striedanie teplôt']),
      o('layering-deprivacia', 'Layering a deprivácia', 'Kombinácie a odoberanie zmyslov.', ['Kombinácia (oči + zvuk + dotyk)', 'Postupné odoberanie zmyslov']),
    ],
  },
  {
    slug: 'prsia-bradavky-torzo', cislo: 10, kod: 'B5', domena: 'B', zrkadlovy: true,
    nazov: 'Prsia, bradavky a torzo', popis: 'Techniky, intenzita, zóny, citlivosť a orgazmus.', ikona: '🔆', citlivost: 2,
    temy: [
      o('techniky', 'Techniky', 'Ako.', ['Krúživé pohyby okolo bradaviek', 'Jemné štípanie', 'Sanie', 'Hryzenie', 'Ťahanie']),
      o('intenzita', 'Intenzita', 'Sila.', ['Jemná', 'Stredná', 'Ostrá (svorky)']),
      o('zony', 'Zóny', 'Kde na torze.', ['Bradavky', 'Podprsie', 'Kľúčna kosť', 'Boky', 'Brucho', '„Happy trail"']),
      o('citlivost-orgazmus', 'Citlivosť a orgazmus', 'Orgazmus z bradaviek.', ['Stimulácia až k orgazmu z bradaviek', 'Precitlivenosť pred menštruáciou / po pôrode']),
    ],
  },
  {
    slug: 'manualna-stimulacia', cislo: 11, kod: 'B6', domena: 'B', tier1: true, zrkadlovy: true,
    nazov: 'Manuálna stimulácia (ruky a prsty)', popis: 'Vulva/klitoris, G-oblasť, penis, semenníky, vzájomne, sledovanie.', ikona: '✋', citlivost: 2,
    temy: [
      o('vulva-klitoris', 'Vulva / klitoris', 'Prstami zvonka.', ['Krúženie', 'Hore-dole', '„Písanie abecedy"', 'Nepriamo cez pysky', 'Tlak dlaňou', 'S lubrikantom', 'Kombinácia s penetráciou prstami']),
      o('g-oblast', 'G-oblasť / vnútorné body', 'Prstami zvnútra.', ['„Come hither" pohyb', 'Tlak', 'Rytmus', '1–2–3 prsty', 'Kombinácia s klitorisom obojručne']),
      o('penis', 'Penis', 'Ručná stimulácia.', ['Úchop a rytmus', 'Točenie na hlavičke', '„Twist"', 'Obojručne', 'S lubrikantom', 'Tempo edging', '„Nasucho" vs mokro']),
      o('semenniky-hradza', 'Semenníky a hrádza', 'Okolie.', ['Jemné držanie', 'Ťahanie', 'Tlak na hrádzu', '„Perineum press" pri orgazme']),
      o('vzajomne-spolocne', 'Vzájomne / spoločne', 'Spolu.', ['Vzájomná masturbácia', '„Ukáž mi, ako to robíš sám/sama"', 'Ruka na ruke (vedenie)']),
      o('sledovanie-solo', 'Sledovanie (solo pred partnerom)', 'Masturbovať a byť sledovaný.', ['Masturbovať a byť sledovaný/á', 'Sledovať partnera', 'Bez dotyku']),
    ],
  },
  {
    slug: 'nepenetrativne-trenie', cislo: 12, kod: 'B7', domena: 'B', zrkadlovy: true,
    nazov: 'Nepenetratívne trenie', popis: 'Frottage, intercrural, tribbing, grinding.', ikona: '🌀', citlivost: 2,
    temy: [
      o('frottage', 'Frottage / „dry humping"', 'Trenie tiel.', ['Cez oblečenie', 'Cez bielizeň', 'Nahí bez penetrácie']),
      o('intercrural', 'Intercrural / stehná', 'Penis medzi stehnami.', ['Penis medzi stehnami', 'S lubrikantom', 'Poloha']),
      o('tribbing', 'Tribbing / vulva na vulve', 'Trenie vulvy.', ['Na stehno', 'Na zadok', 'Na telo partnera']),
      o('grinding', 'Grinding', 'Rytmické trenie do orgazmu.', ['Sedieť na stehne / kolene', 'Na tvári', 'Rytmické trenie do orgazmu']),
    ],
  },

  // ═══ C — ORÁL ══════════════════════════════════════════════════════════
  {
    slug: 'oral-vulva-klitoris', cislo: 13, kod: 'C1', domena: 'C', tier1: true, zrkadlovy: true,
    nazov: 'Orál na vulvu a klitoris', popis: 'Techniky jazyka, tempo, kombinácie, poloha, dokončenie, rámce.', ikona: '👅', citlivost: 2,
    temy: [
      o('techniky-jazyka', 'Techniky jazyka', 'Ako jazykom.', ['Široké olizovanie', 'Hrot jazyka', 'Krúženie', '„Abeceda"', 'Bzučanie / vibrácia jazykom', 'Sanie klitorisu', 'Striedanie']),
      o('tempo-rytmus', 'Tempo a rytmus', 'Rytmus.', ['Pomalé budovanie', 'Stály rytmus (nemeniť tesne pred orgazmom)', 'Vlny', 'Rýchle finále']),
      o('kombinacie', 'Kombinácie', 'S rukou / hračkou.', ['S prstami vo vnútri', 'S prstom v anále', 'S vibrátorom', 'Držať pysky roztiahnuté', 'Ruka na bruchu / tlak']),
      o('poloha', 'Poloha', 'Ako ležíme.', ['Partner leží', 'Na kolenách nad tvárou', 'Z boku', 'Nohy na pleciach', 'Na kraji postele']),
      o('dokoncenie-po', 'Dokončenie a po', 'Orgazmus a po ňom.', ['Orál až do orgazmu', 'Prestať tesne pred (edging)', 'Pokračovať po orgazme (overstim)', 'Viacnásobný']),
      o('ramce', 'Rámce', 'Hygiena a bariéry.', ['Hygiena / sprcha pred', 'Prirodzená chuť', 'Počas menštruácie (opt-in)', 'Bariéra (koferdam)']),
    ],
  },
  {
    slug: 'oral-penis', cislo: 14, kod: 'C2', domena: 'C', tier1: true, zrkadlovy: true,
    nazov: 'Orál na penis', popis: 'Techniky, hĺbka a hrdlo, semenníky, poloha, dokončenie, rámce.', ikona: '🍆', citlivost: 2,
    temy: [
      o('techniky', 'Techniky', 'Ako.', ['Sanie', 'Jazyk na uzdičke / hlavičke', 'Krúženie', 'Ruka + ústa súčasne', '„Hollow cheeks"', 'Pomalé vs rýchle']),
      o('hlbka-hrdlo', 'Hĺbka a hrdlo', 'Ako hlboko.', ['Plytko', 'Stredne', 'Hlboké hrdlo', 'Držanie za hlavu (partner vedie)', 'Dávivý reflex — riešenie / limit'], { rizikova: true }),
      o('semenniky-okolie', 'Semenníky a okolie', 'Okolie penisu.', ['Lízanie / sanie semenníkov', 'Hrádza', 'Ruky + ústa + semenníky súčasne']),
      o('poloha', 'Poloha', 'Ako.', ['Partner leží', 'Kľačí nad tvárou', 'Na kraji postele', '„Na kolenách"', 'Face-fucking (opt-in)']),
      o('dokoncenie', 'Dokončenie', 'Kde a ako.', ['Dokončiť ústami', 'Prehltnúť / vypľuť / na telo / na tvár (opt-in)', 'Prestať pred a dokončiť inak', 'Edging']),
      o('ramce', 'Rámce', 'Hygiena a bariéry.', ['Hygiena', 'Chuť', 'Bariéra (kondóm na orál)']),
    ],
  },
  {
    slug: 'anilingus', cislo: 15, kod: 'C3', domena: 'C', zrkadlovy: true, rizikovy: true,
    nazov: 'Anilingus („rimming")', popis: 'Techniky, roly, hygienické a bezpečnostné rámce.', ikona: '🌸', citlivost: 3,
    temy: [
      o('techniky', 'Techniky', 'Ako.', ['Vonkajšie olizovanie', 'Krúženie', 'Penetrácia jazykom', 'S prstom súčasne', 'Striedanie s vulvou / penisom']),
      o('roly', 'Roly', 'Kto komu.', ['Dávam', 'Dostávam', 'Oboje']),
      o('ramce', 'Rámce', 'Hygiena a riziko.', ['Dôkladná hygiena / klystír', 'Bariéra (koferdam)', 'Nikdy z análu späť k vulve', 'Riziko a limity']),
    ],
  },
  {
    slug: 'oral-kombinacie-polohy', cislo: 16, kod: 'C4', domena: 'C', zrkadlovy: true, rizikovy: true,
    nazov: 'Kombinácie a polohy s dynamikou', popis: '69, face-sitting (hover/trón/plný kontakt), dynamika moci, dych.', ikona: '♻️', citlivost: 3,
    temy: [
      o('sixtynine', '69', 'Súčasný vzájomný orál.', ['Klasické', 'Z boku', 'Kto je „hore"', 'Nerovnaká pozornosť je OK']),
      o('face-sitting', 'Face-sitting', 'Poloha s dynamikou moci; hover / trón / plný kontakt.', undefined, { zrkadlova: true, rizikova: true }),
      o('dynamika-moci-oral', 'Dynamika moci pri oráli', 'Vedenie a kontrola pri oráli.', ['Partner vedie tempo rukou vo vlasoch', 'Príkazy', '„Uctievanie"', 'Edging pod kontrolou']),
      o('dych-face-sitting', 'Dych pri face-sittingu', 'Rámec obmedzenia dychu.', ['Žiadne obmedzenie (default)', 'Krátke „smother" momenty (opt-in, safe signál)']),
    ],
  },

  // ═══ D — PENETRÁCIA A PRIEBEH AKTU ═════════════════════════════════════
  {
    slug: 'vaginalna-penetracia', cislo: 17, kod: 'D1', domena: 'D', tier1: true, zrkadlovy: true,
    nazov: 'Vaginálna penetrácia', popis: 'Nábeh, techniky, hĺbka a náraz, čím, rytmus.', ikona: '🌊', citlivost: 2,
    temy: [
      o('nabeh', 'Nábeh', 'Prvé chvíle.', ['Lubrikácia', 'Pomalý vstup', '„Počkaj, kým poviem"', 'Plytké ťahy na začiatku', 'Dýchať']),
      o('techniky', 'Techniky', 'Ako.', ['Plytké vs hlboké', '„Angling" (uhol na prednú stenu)', '„Rocking" / grinding', 'Krúženie', 'Striedanie hĺbky', 'Kombinácia s klitorisom']),
      o('hlbka-naraz', 'Hĺbka a náraz', 'Ako hlboko.', ['Plytká hra', 'Stredná', 'Hlboko', 'Naráž na krčok — príjemné / nepríjemné / limit']),
      o('cim', 'Čím', 'Nástroj.', ['Prsty (1–2–3)', 'Penis', 'Dildo', 'Strap-on', 'Striedanie']),
      o('rytmus', 'Rytmus', 'Tempo ťahov.', ['Stály', 'Zrýchľovanie', '„Stop-start"', 'Vlny', '„Nehýb sa, len tak zostaň"']),
    ],
  },
  {
    slug: 'analna-penetracia', cislo: 18, kod: 'D2', domena: 'D', zrkadlovy: true, rizikovy: true,
    nazov: 'Anál a stimulácia zadku', popis: 'Externá stimulácia, anilingus, prstovanie (rola + prostata), hračky, penetračný anál, DP, bezpečnosť.', ikona: '🍑', citlivost: 3,
    temy: [
      o('analna-penetracia', 'Anál a stimulácia zadku', 'Kompletný sprievodca (kniha + dotazník) — celá análna doména.', undefined, { zrkadlova: true, rizikova: true }),
      o('priprava', 'Príprava', 'Než začneme.', ['Hygiena / klystír', 'Veľa lubrikantu', 'Postupné otváranie (prst → 2 → plug → viac)', 'Relaxácia / dych', '„Nikdy netlač ty, ja sa nasadím"']),
      o('cim', 'Čím', 'Nástroj.', ['Prst(y)', 'Plug (nosenie pred aktom)', 'Dildo', 'Penis', 'Strap-on']),
      o('techniky-tempo', 'Techniky a tempo', 'Ako.', ['Veľmi pomaly', 'Zastať pri odpore', 'Plytko dlho', 'Hlboko až keď poviem', 'Žiadne prekvapenia']),
      o('polohy', 'Polohy pre anál', 'Ako.', ['Na bruchu', '„Doggy"', 'Na chrbte (vidím ťa)', 'Na boku', 'Ja hore (mám kontrolu)']),
      o('bezpecnost', 'Bezpečnosť', 'Pravidlá.', ['Nič z análu späť k vulve', 'Hračky so stopérom / základňou', 'Bolesť = stop, nie „pretlačiť"', 'Frekvencia a regenerácia']),
    ],
  },
  {
    slug: 'polohy', cislo: 19, kod: 'D3', domena: 'D', tier1: true,
    nazov: 'Polohy', popis: 'Základné a varianty, prístup a kontakt, kontrola, ergonómia, nábytok.', ikona: '🧩', citlivost: 2,
    temy: [
      o('zakladne', 'Základné', 'Repertoár.', ['Misionárska (+ varianty)', '„Doggy"', 'Jazdkyňa', 'Reverzná jazdkyňa', 'Lyžičky', 'V stoji']),
      o('pristup-kontakt', 'Prístup a kontakt', 'Blízkosť.', ['Očný kontakt vs bez', 'Hĺbka podľa polohy', 'Prístup ruky ku klitorisu', 'Bozkávanie počas']),
      o('kontrola', 'Kontrola', 'Kto vedie.', ['Kto vedie pohyb', '„Pin down" (pritlačiť ruky)', 'Ja úplne pasívny/a', 'Striedanie kto je hore']),
      o('komfort-ergonomia', 'Komfort a ergonómia', 'Aby to vydržalo.', ['Vankúš pod boky', 'Opora o čelo postele', 'Kolená / chrbát / zápästia', 'Dĺžka v jednej polohe']),
      o('nabytok-priestor', 'Nábytok a priestor', 'Kde.', ['Posteľ', 'Kraj postele', 'Stolička', 'Sprcha / vaňa', 'Stôl', 'Podlaha', '„Sex nábytok" / klin']),
    ],
  },
  {
    slug: 'tempo-rytmus-choreografia', cislo: 20, kod: 'D4', domena: 'D',
    nazov: 'Tempo, rytmus a „choreografia"', popis: 'Krivka, edging a stop-start, prechody, pauzy.', ikona: '📈', citlivost: 2,
    temy: [
      o('krivka', 'Krivka', 'Priebeh.', ['Pomaly a stále', 'Postupné stupňovanie', 'Vlny (rýchlo–pomaly)', 'Dlhá plošina', 'Rýchle finále']),
      o('edging-stop-start', 'Edging a stop-start', 'Odďaľovanie.', ['Koľko „takmer"', 'Kto rozhoduje o pauze', 'Predĺžená plošina', '„Ruined"']),
      o('prechody', 'Prechody', 'Zmeny.', ['Plynulé vs „prestávky na zmenu polohy"', 'Orál → penetrácia → orál', 'Ruka medzi']),
      o('pauzy', 'Pauzy', 'Kedy zastať.', ['Pauza na vodu / dych', '„Reset" keď je to príliš', 'Pauza ako súčasť hry (tease)']),
    ],
  },
  {
    slug: 'orgazmus-kontrola', cislo: 21, kod: 'D5', domena: 'D', zrkadlovy: true,
    nazov: 'Orgazmus a jeho kontrola', popis: 'Cesta, poradie a počet, kontrola (D/s), po orgazme.', ikona: '✨', citlivost: 3,
    temy: [
      o('cesta', 'Cesta k orgazmu', 'Odkiaľ.', ['Z klitorisu', 'Z penetrácie', 'Kombinovaný', 'Z bradaviek', 'Z análu', '„Nezáleží, nemusí prísť"']),
      o('poradie-pocet', 'Poradie a počet', 'Kto a koľko.', ['Ja prvý/á', 'On / ona prvý/á', 'Súčasne (ak vyjde)', 'Viacnásobný', 'Pauza a druhé kolo']),
      o('kontrola-ds', 'Kontrola (D/s prvok)', 'Povolenie a zákaz.', ['„Nesmieš, kým nedovolím" (denial)', '„Teraz" (na povel)', 'Počítanie', 'Zákaz na dni', '„Forced" (nútený viacnásobný / overstim)'], { rizikova: true }),
      o('po-orgazme', 'Po orgazme', 'Prvé sekundy po.', ['Precitlivenosť (nedotýkať sa)', 'Pokračovať (overstim)', 'Okamžite objať', '„Nechaj ma chvíľu"']),
    ],
  },
  {
    slug: 'ukoncenie-dokoncenie', cislo: 22, kod: 'D6', domena: 'D', zrkadlovy: true,
    nazov: 'Ukončenie aktu a dokončenie', popis: 'Kde dokončí, antikoncepcia a „pull-out", po dokončení.', ikona: '🏁', citlivost: 2,
    temy: [
      o('kde-dokonci', 'Kde dokončí', 'Miesto.', ['Vo vnútri', 'Von + na telo / tvár / prsia / zadok', 'Do úst', 'Do kondómu', '„Nezáleží"']),
      o('antikoncepcia-pullout', 'Antikoncepcia / „pull-out"', 'Spoľahlivosť.', ['Spoľahlivá metóda', '„Pull-out" ako hra vs riziko', '„Creampie" ako preferencia (opt-in)']),
      o('po-dokonceni', 'Po dokončení', 'Prvé chvíle.', ['Utrieť / sprcha', 'Zostať spojení', '„Stay inside"', 'Kto ide po uterák']),
    ],
  },
  {
    slug: 'aftercare-debrief', cislo: 23, kod: 'D7', domena: 'D', tier1: true,
    nazov: 'Aftercare a debrief', popis: 'Fyzicky, emočne, po náročnejšej scéne.', ikona: '🧸', citlivost: 2,
    temy: [
      o('fyzicky', 'Fyzicky', 'Telo.', ['Objatie', 'Deka', 'Voda', 'Sprcha spolu', 'Jedlo', 'Ticho a spánok']),
      o('emocne', 'Emočne', 'Slová a uistenie.', ['Uistenie / slová', '„Ako ti bolo"', 'Humor', 'Potreba samoty a to je OK']),
      o('po-narocnejsej-scene', 'Po náročnejšej scéne (D/s, anál, breath)', 'Rozšírený aftercare.', ['Dlhší aftercare', '„Drop" na druhý deň', 'Check-in správa', 'Čo NErobiť hneď po']),
    ],
  },

  // ═══ E — POMÔCKY A HRAČKY ═════════════════════════════════════════════
  {
    slug: 'vibratory-stimulatory', cislo: 24, kod: 'E1', domena: 'E', tier1: true,
    nazov: 'Vibrátory a stimulátory', popis: 'Klitorálne, vnútorné/G, použitie, intenzita a vzory.', ikona: '📳', citlivost: 2,
    temy: [
      o('klitoralne', 'Klitorálne', 'Typy.', ['Tyčinkové', '„Rabbit"', 'Prikladacie (wand)', 'Saco-tlakové („air-pulse")', 'Jazýčkové']),
      o('vnutorne-g', 'Vnútorné / G', 'Typy.', ['Zahnuté', '„Rabbit"', 'Vibračné vajíčko', 'Dvojité']),
      o('pouzitie', 'Použitie', 'Kedy a ako.', ['Sólo', 'Partner ovláda', 'Počas penetrácie (medzi telami)', 'Počas orálu', '„Hands-free"']),
      o('intenzita-vzory', 'Intenzita a vzory', 'Nastavenie.', ['Nízka a stála', 'Vysoká', 'Pulzovanie', '„Edging" cez zapínanie / vypínanie', 'Precitlivenosť']),
    ],
  },
  {
    slug: 'dilda-penetracne', cislo: 25, kod: 'E2', domena: 'E', zrkadlovy: true,
    nazov: 'Dildá a penetračné pomôcky', popis: 'Typy, veľkosť a progresia, strap-on, použitie.', ikona: '🪄', citlivost: 2,
    temy: [
      o('typy', 'Typy', 'Tvar a materiál.', ['Hladké', 'S textúrou / žilami', 'Zahnuté (G/P)', 'Dvojité', 'Realistické vs abstraktné', 'Sklo / kov (teplota)']),
      o('velkost-progresia', 'Veľkosť a progresia', 'Rozmer.', ['Malé / stredné / veľké', '„Size play" ako fantázia', 'Postupné zväčšovanie']),
      o('strap-on', 'Strap-on (rola)', 'Kto koho.', ['Ona penetruje jeho (pegging)', 'Ona penetruje ju', '„Vac-u-lock"', 'Bezremeňové', '„Strapless"'], { rizikova: true }),
      o('pouzitie', 'Použitie', 'Kedy.', ['Namiesto penisu', 'Popri', 'Pri oráli', '„Double penetration" s partnerom (opt-in)']),
    ],
  },
  {
    slug: 'analne-pomocky', cislo: 26, kod: 'E3', domena: 'E', rizikovy: true,
    nazov: 'Análne pomôcky', popis: 'Plugy, guľôčky a progresívne, bezpečnosť.', ikona: '🔘', citlivost: 3,
    temy: [
      o('plugy', 'Plugy', 'Veľkosti a typy.', ['Malý „na nosenie"', 'Stredný', 'Veľký', 'Vibračné', '„Tail" / šperkové', 'Nosenie počas dňa / počas vaginálneho sexu']),
      o('gulocky-progresivne', 'Guľôčky a progresívne', 'Anal beads.', ['Anal beads', '„Vyťahovanie pri orgazme"']),
      o('bezpecnost', 'Bezpečnosť', 'Pravidlá.', ['VŽDY základňa / stoper', 'Veľa lubrikantu (vodný na silikón)', 'Čistenie', 'Materiál (silikón / sklo / kov)', 'Nezdieľať bez umytia / kondómu']),
    ],
  },
  {
    slug: 'penisove-parove', cislo: 27, kod: 'E4', domena: 'E',
    nazov: 'Penisové a párové pomôcky', popis: 'Krúžky, návleky a extendery, masturbátory, párové vibrátory.', ikona: '⭕', citlivost: 2,
    temy: [
      o('kruzky', 'Krúžky', 'Erekčné.', ['Erekčný krúžok', 'S vibráciou (stimuluje ju)', 'Pár-krúžok', 'Čas na tele (limit)']),
      o('navleky-extendery', 'Návleky / extendery', 'Zväčšenie.', ['Textúrované návleky', 'Predlžovacie', '„Hollow" (opt-in, komunikácia)']),
      o('masturbatory', 'Masturbátory', 'Pre neho.', ['Pre neho sólo', 'Partner používa na ňom', '„Strokery"']),
      o('parove-vibratory', 'Párové vibrátory', 'Počas penetrácie.', ['Nositeľné počas penetrácie (napr. „C-tvar")']),
    ],
  },
  {
    slug: 'lubrikanty-oleje', cislo: 28, kod: 'E5', domena: 'E', tier1: true,
    nazov: 'Lubrikanty, oleje a doplnky', popis: 'Typy, špeciálne, doplnky.', ikona: '💧', citlivost: 2,
    temy: [
      o('typy', 'Typy', 'Základné.', ['Vodný (univerzál)', 'Silikónový (dlhý, nie na silikónové hračky)', 'Hybridný', 'Olejový (nie s kondómom)']),
      o('specialne', 'Špeciálne', 'Efekty.', ['Hrejivý / chladivý', '„Anal" (hustejší)', 'Ochucený (na orál)', 'S CBD', '„Numbing" — prečo NIE pri anále']),
      o('doplnky', 'Doplnky', 'Okolo.', ['Masážne sviečky', 'Uteráky / podložka', 'Menštruačný disk na sex', '„Liquid latex" / farby']),
    ],
  },
  {
    slug: 'nositelne-dialkove', cislo: 29, kod: 'E6', domena: 'E', rizikovy: true,
    nazov: 'Nositeľné a diaľkové', popis: 'Ovládané partnerom, verejné hranie, chastity.', ikona: '📡', citlivost: 3,
    temy: [
      o('ovladane-partnerom', 'Ovládané partnerom', 'Na diaľku.', ['Vibračné vajíčko / nohavičky s appkou', 'Na diaľku', '„Daj mi telefón"']),
      o('verejne-hranie', 'Verejné hranie', 'Von.', ['V reštaurácii / kine / na prechádzke (legálne, diskrétne)', 'Pravidlá a safe-word']),
      o('chastity', 'Chastity', 'Klietka.', ['Klietka pre neho', 'Kľúč u nej', 'Časové rámce']),
    ],
  },

  // ═══ F — MOC, ROLA A SCÉNA ═══════════════════════════════════════════
  {
    slug: 'dominancia-submisia', cislo: 30, kod: 'F1', domena: 'F', zrkadlovy: true,
    nazov: 'Dominancia / submisia (D/s)', popis: 'Dynamika, prejavy dominancie a submisie, protokoly.', ikona: '👑', citlivost: 3,
    temy: [
      o('dynamika', 'Dynamika', 'Rozsah.', ['„Vanilla s korením" (občas)', 'Vyhradené scény', '24/7 prvky', 'Kto je Dom / sub / switch']),
      o('prejavy-dominancie', 'Prejavy dominancie', 'Ako vedie Dom.', ['Vedenie tempa', 'Príkazy', '„Nesmieš sa hýbať / vydávať zvuk"', 'Oslovenie (Pane / Pani / meno)', 'Povolenie na dotyk']),
      o('prejavy-submisie', 'Prejavy submisie', 'Ako sa prejavuje sub.', ['Poslúchať', 'Prosiť', '„Service" (obliekať, nosiť)', 'Pokľaknutie', 'Čakať v polohe']),
      o('protokoly', 'Protokoly', 'Pravidlá scény.', ['Pravidlá na scénu', 'Rituál začiatku / konca', '„High protocol" vs voľné']),
    ],
  },
  {
    slug: 'bondage-znehybnenie', cislo: 31, kod: 'F2', domena: 'F', zrkadlovy: true, rizikovy: true,
    nazov: 'Bondage a znehybnenie', popis: 'Pomôcky, rozsah, prvky, bezpečnosť.', ikona: '🪢', citlivost: 3,
    temy: [
      o('pomocky', 'Pomôcky', 'Čím.', ['Šatka / kravata', 'Putá (klasické / plyšové)', 'Popruhy pod posteľ', 'Lano (shibari — základné)', 'Klietka / spreader bar', 'Bondage tape']),
      o('rozsah', 'Rozsah', 'Ako veľmi.', ['Ruky spolu', 'Ruky o posteľ', 'Roztiahnuté', '„Hogtie"', 'O stoličku', 'V stoji']),
      o('prvky', 'Prvky', 'Doplnky.', ['Zaviazané oči', 'Roubík (opt-in — nikdy sám / pri riziku dýchania)', 'Polohové držanie bez pút („nehýb sa")']),
      o('bezpecnost', 'Bezpečnosť', 'Pravidlá.', ['Nikdy sám v miestnosti', 'Nožnice po ruke', 'Kontrola prstov / farba', 'Časový limit', 'Safe-gesto keď nemôže hovoriť']),
    ],
  },
  {
    slug: 'impact-play', cislo: 32, kod: 'F3', domena: 'F', zrkadlovy: true, rizikovy: true,
    nazov: 'Impact play', popis: 'Ruka, nástroje, intenzita a zóny, význam.', ikona: '🖐️', citlivost: 3,
    temy: [
      o('ruka', 'Ruka', 'Bez nástroja.', ['Plesknutie po zadku', 'Stehná', '„Warm-up" pravidlo']),
      o('nastroje', 'Nástroje', 'Čím.', ['Paddle', 'Flogger', 'Prút / trstica', 'Opasok', '„Pinwheel"']),
      o('intenzita-zony', 'Intenzita a zóny', 'Kde a ako silno.', ['Len zadok / stehná (bezpečné)', 'NIE obličky / chrbtica / kĺby', '„Od jemného, pýtať si viac"', 'Počítanie úderov']),
      o('vyznam', 'Význam', 'Prečo.', ['„Funkčná" (rozohriatie)', '„Trestová" scéna', 'Katarzia', 'Slzy sú OK ako uvoľnenie']),
    ],
  },
  {
    slug: 'deprivacia-dych', cislo: 33, kod: 'F4', domena: 'F', rizikovy: true,
    nazov: 'Deprivácia zmyslov a hrany dychu', popis: 'Deprivácia; breath play — najrizikovejšia položka celého dotazníka.', ikona: '🎭', citlivost: 3,
    temy: [
      o('deprivacia', 'Deprivácia', 'Odobrať zmysly.', ['Kukla / klapky + slúchadlá', 'Postupné', 'Dezorientácia']),
      o('breath-play', 'Breath play', 'Obmedzenie dychu — opt-in.', ['„Smother" (telo / ruka), NIE tlak na krk pri bežnom páre', 'Len opt-in, len krátko, jasný safe-signál', 'Kontraindikácie (srdce, tehotenstvo, panika)']),
    ],
  },
  {
    slug: 'edge-senzorika', cislo: 34, kod: 'F5', domena: 'F', zrkadlovy: true, rizikovy: true,
    nazov: '„Edge" senzorika', popis: 'Ostré vnemy, teplota, elektro.', ikona: '⚡', citlivost: 3,
    temy: [
      o('ostre-vnemy', 'Ostré vnemy', 'Ostrejšie.', ['Svorky na bradavky / pysky', 'Pinwheel', 'Nechty', 'Hryzenie (silné)', 'Vosk (nízkoteplotný)']),
      o('teplota', 'Teplota', 'Teplo a chlad.', ['Ľad', 'Horúci vosk', 'Kontrastné striedanie']),
      o('elektro', 'Elektro', 'Opt-in.', ['TENS / „violet wand" (opt-in)', 'Nikdy nad pásom / pri srdci']),
    ],
  },
  {
    slug: 'dirty-talk-oslovenia', cislo: 35, kod: 'F6', domena: 'F', zrkadlovy: true,
    nazov: 'Dirty talk, oslovenia a slovný priestor', popis: 'Tón, obsah, oslovenia, jazyk o tele partnera.', ikona: '🗣️', citlivost: 2,
    temy: [
      o('ton', 'Tón', 'Ako to znie.', ['Jemné povzbudenie', 'Vulgárne', 'Rozprávanie príbehu / scenára', 'Ticho a len rozkazy']),
      o('obsah', 'Obsah', 'Čo hovoriť.', ['Pochvala („si úžasná")', 'Komandovanie', '„Ponižovanie" (opt-in — presné slová dohodnúť)', '„Uctievanie"', 'Degradačné vs adorujúce']),
      o('oslovenia', 'Oslovenia', 'Ako ma volať.', ['Meno', '„Zlato"', '„Pane / Pani"', '„Miláčik"', 'Pet-names', 'Čo je absolútne mimo']),
      o('jazyk-tela', 'Jazyk tela partnera', 'Hovoriť o tele.', ['Čo o tele partnera áno', 'Čo je citlivé / hranica']),
    ],
  },
  {
    slug: 'kontrola-pravidla', cislo: 36, kod: 'F7', domena: 'F', zrkadlovy: true,
    nazov: 'Kontrola a pravidlá', popis: 'Orgasm control, chastity, úlohy a rituály, tresty a odmeny.', ikona: '🔒', citlivost: 3,
    temy: [
      o('orgasm-control', 'Orgasm control', 'Kontrola vyvrcholenia.', ['Denial (zákaz)', 'Permission (na povel)', '„Ruined"', 'Kvóty', 'Nahlasovanie masturbácie']),
      o('chastity', 'Chastity', 'Klietka.', ['Klietka', 'Časové rámce (hodiny / dni / týždne)', 'Kľúč u partnera', '„Key holder" dynamika']),
      o('ulohy-rituy', 'Úlohy a rituály', 'Počas dňa.', ['Dané úlohy', '„Rules" počas dňa', 'Správy', 'Oblečenie / bielizeň na povel', 'Poloha pri čakaní']),
      o('tresty-odmeny', 'Tresty a odmeny', 'Systém.', ['Dohodnutý systém', 'Čo je odmena', 'Čo je „trest"', 'Čo NIE je nikdy trest']),
    ],
  },
  {
    slug: 'roleplay-scenare', cislo: 37, kod: 'F8', domena: 'F',
    nazov: 'Roleplay a scenáre (bez tretej osoby)', popis: 'Mocenské, situačné, príbehové; prvky.', ikona: '🎬', citlivost: 3,
    temy: [
      o('mocenske', 'Mocenské', 'Roly moci.', ['Šéf / podriadený', 'Učiteľ / študent (dospelí)', 'Vypočúvanie', '„Prísny" tréner']),
      o('situacne', 'Situačné', 'Scenáre.', ['Neznámi v bare („pick-up")', 'Dlho odlúčení', '„Zakázané" (susedia)', 'Lekár / pacient', 'Masér / klient']),
      o('pribehove', 'Príbehové', 'S dejom.', ['Únos-fantázia (CNC — opt-in, prísne rámce)', '„Služobníčka"', 'Historické / kostýmové', 'Sci-fi / fantasy']),
      o('prvky', 'Prvky', 'Ako.', ['Kostýmy', 'Rekvizity', '„Scéna" s dejom', 'Improvizácia vs scenár', 'Kde sa to odohráva']),
    ],
  },

  // ═══ G — FETIŠE A ŠPECIFICKÉ ZÁUJMY ═══════════════════════════════════
  {
    slug: 'casti-tela', cislo: 38, kod: 'G1', domena: 'G',
    nazov: 'Časti tela', popis: 'Chodidlá, ruky, vlasy, ďalšie zóny, vzhľad a úprava.', ikona: '🦶', citlivost: 2,
    temy: [
      o('chodidla', 'Chodidlá', 'Foot.', ['Masáž', 'Bozkávanie / lízanie', '„Foot job"', 'Obuv / podpätky / pančuchy ako súčasť']),
      o('ruky', 'Ruky', 'Hands.', ['Prsty v ústach', 'Manikúra', 'Rukavice']),
      o('vlasy', 'Vlasy', 'Hair.', ['Ťahanie', 'Česanie', 'Vôňa', 'Dĺžka / účes ako preferencia']),
      o('dalsie', 'Ďalšie', 'Iné zóny.', ['Krk', 'Brucho', 'Zadok', 'Svaly', '„Navel"', 'Slina', 'Pot']),
      o('vzhlad-uprava', 'Vzhľad a úprava', 'Grooming.', ['Ochlpenie (áno / holené / úprava) — moje aj partnerovo', 'Make-up', 'Opálenie', 'Tetovania']),
    ],
  },
  {
    slug: 'materialy-oblecenie', cislo: 39, kod: 'G2', domena: 'G',
    nazov: 'Materiály a oblečenie', popis: 'Materiály, kúsky, kto nosí, stav oblečenia.', ikona: '🧥', citlivost: 3,
    temy: [
      o('materialy', 'Materiály', 'Na koži.', ['Latex / guma', 'Koža', 'Hodváb / satén', 'Čipka', 'Denim', 'Kožušina', 'Pančuchy / silon']),
      o('kusky', 'Kúsky', 'Čo obliecť.', ['Erotická bielizeň', 'Body / korzet', 'Podväzky', 'Vysoké podpätky', 'Uniformy', '„Office" outfit', 'Kostýmy']),
      o('kto-nosi', 'Kto nosí', 'Kto.', ['Ona', 'On', 'Oboje', 'Crossdressing (opt-in)', '„Sissy" dynamika (opt-in)']),
      o('stav-oblecenia', 'Stav oblečenia', 'Oblečení vs nahí.', ['Úplne oblečení (CMNF / CFNM)', 'Čiastočne', '„Roztrhať"', 'Nechať topánky / pančuchy']),
    ],
  },
  {
    slug: 'telesne-tekutiny', cislo: 40, kod: 'G3', domena: 'G', rizikovy: true,
    nazov: 'Fetiše, tekutiny a prirodzenosť', popis: 'Fetiš checklist, telesné tekutiny (sliny/semeno/vlhkosť/moč/slzy), materiály, časti tela, situačné fetiše.', ikona: '💦', citlivost: 3,
    temy: [
      o('telesne-tekutiny', 'Fetiše a špecifické záujmy', 'Kompletný sprievodca (kniha + dotazník) — celá doména fetišov.', undefined, { rizikova: true }),
      o('prirodzenost', 'Prirodzenosť', 'Vôňa a chuť tela.', ['Vôňa / chuť partnera ako afrodiziakum', 'Pot', 'Sliny', '„Po sexe" stav']),
      o('semeno', 'Semeno', 'Kde.', ['V ústach / prehltnúť', 'Na tele / tvári', '„Creampie"', '„Felching" (hygiena)']),
      o('zenska-ejakulacia', 'Ženská ejakulácia / „squirting"', 'Postoj.', ['Ako cieľ', 'Ako bonus', 'Nezáujem', 'Podložka']),
      o('menstrualna-krv', 'Menštruačná krv', 'Sex počas menštruácie.', ['Sex počas menštruácie', '„Period play"', 'Disk / uterák', 'Úplné NIE']),
      o('watersports', 'Watersports', 'Opt-in.', ['„Golden shower" (opt-in, hygiena / hydratácia, nie na rany / tvár bez dohody)', 'Len „talk" / fantázia']),
    ],
  },
  {
    slug: 'zvuky-rec', cislo: 41, kod: 'G4', domena: 'G',
    nazov: 'Zvuky a reč', popis: 'Zvuky partnera, konkrétne slová, ASMR / šepot.', ikona: '🔊', citlivost: 2,
    temy: [
      o('zvuky-partnera', 'Zvuky partnera', 'Hlas.', ['Vzdychy', 'Hlasné', 'Ticho', '„Chcem ťa počuť"', 'Slovný komentár']),
      o('konkretne-slova', 'Konkrétne slová', 'Slovník.', ['Vulgarizmy áno / nie', 'Cudzí jazyk', '„Prosím / ďakujem"', 'Číselné počítanie']),
      o('asmr-sepot', 'ASMR / šepot', 'Zvuk do ucha.', ['Pomalý hlas', 'Do ucha', 'Nahrávka / audio porno spolu']),
    ],
  },
  {
    slug: 'objekty-situacie-rituy', cislo: 42, kod: 'G5', domena: 'G',
    nazov: 'Objekty, situácie a rituály', popis: 'Situačné spúšťače, rituály, objekty.', ikona: '🗝️', citlivost: 3,
    temy: [
      o('situacne-spustace', 'Situačné spúšťače', 'Kontext ako spúšťač.', ['Konkrétne miesto', 'Ročné obdobie / sviatok', '„Po hádke"', '„Ráno"', 'Uniforma z práce']),
      o('rituy', 'Rituály', 'Opakované vzorce.', ['Vždy rovnaká pieseň / sviečka', '„Rozkaz" formulka', 'Poradie krokov', '„Náš" scenár']),
      o('objekty', 'Objekty', 'Konkrétne veci.', ['Konkrétny kus nábytku', 'Zrkadlo (sledovať sa)', 'Polaroid', 'Denník preferencií']),
    ],
  },
  {
    slug: 'telesne-vzhladove-preferencie', cislo: 43, kod: 'G6', domena: 'G',
    nazov: 'Špecifické telesné/vzhľadové preferencie', popis: 'Typ postavy, „size" fantázie, tehotenstvo/laktácia, vek-hra (roleplay).', ikona: '📐', citlivost: 2,
    temy: [
      o('typ-postavy', 'Typ postavy / proporcie', 'Formulovať opatrne.', ['Čo ma priťahuje (bez tlaku na partnera)']),
      o('size-fantazie', '„Size" fantázie', 'Nie ako kritika partnera.', ['Rozdiel výšky / sily', '„Size play" (hračky)']),
      o('tehotenstvo-laktacia', 'Tehotenstvo / laktácia', 'Ako fáza.', ['Priťahuje ako fáza', '„Preggo"', '„Milk" (opt-in)']),
      o('vek-hra', 'Vek-hra (len dospelí, len roleplay)', 'Jasne oddeliť od nelegálneho.', ['„Mladší / starší" dynamika ako roleplay', '„Daddy / mommy" oslovenie (opt-in)']),
    ],
  },

  // ═══ H — OTVORENOSŤ A ĎALŠÍ ĽUDIA ═════════════════════════════════════
  {
    slug: 'bi-zvedavost', cislo: 44, kod: 'H1', domena: 'H', zrkadlovy: true,
    nazov: 'Bi-zvedavosť / rovnaké pohlavie', popis: 'Rovina, aktivity, kontext, pocity a identita.', ikona: '🌈', citlivost: 3,
    temy: [
      o('rovina', 'Rovina', 'Fantázia vs realita.', ['Len fantázia', '„Talk" počas sexu', 'Reálne']),
      o('aktivity', 'Aktivity', 'Čo.', ['Bozk', 'Dotyky', 'Orál', 'Penetrácia / strap-on', '„Kto s kým" pri viacerých']),
      o('kontext', 'Kontext', 'Kde.', ['Pri trojke', 'Sólo (bez partnera, s dohodou)', 'Pred partnerom']),
      o('pocity-identita', 'Pocity a identita', 'Čo to znamená.', ['Čo to pre mňa znamená', 'Žiarlivosť', 'Podmienky', '„Len raz na vyskúšanie"']),
    ],
  },
  {
    slug: 'voyeur-exhib', cislo: 45, kod: 'H2', domena: 'H', zrkadlovy: true,
    nazov: 'Voyeurizmus a exhibicionizmus', popis: 'Sledovať, byť sledovaný, semi-public, miera rizika.', ikona: '👁️', citlivost: 3,
    temy: [
      o('sledovat', 'Sledovať', 'Byť divák.', ['Partnera sólo', 'Partnera s iným', 'Porno spolu', 'Iný pár (klub)', '„Live"']),
      o('byt-sledovany', 'Byť sledovaný', 'Byť na očiach.', ['Partnerom', 'Iným párom', 'Skupinou', 'Kamera (len pre nás)']),
      o('semi-public', 'Semi-public', 'Skoro na verejnosti.', ['Okno / balkón', 'Klubové „play" zóny', 'Zrkadlové izby', 'Auto', '„Skoro nachytali nás"']),
      o('miera-rizika', 'Miera rizika', 'Kde je hranica.', ['Striktne súkromné', '„Safe" verejné (klub)', 'Reálne riziko (legálne hranice)']),
    ],
  },
  {
    slug: 'trojky-skupiny', cislo: 46, kod: 'H3', domena: 'H', rizikovy: true,
    nazov: 'Trojky, skupiny a gangbang', popis: 'Konfigurácie, tretí človek, pravidlá, emócie; skupinový sex a eventy.', ikona: '👥', citlivost: 3,
    temy: [
      o('trojky-skupiny', 'Trojky, skupiny a gangbang', 'Kompletný sprievodca (kniha + dotazník).', undefined, { rizikova: true }),
      o('konfiguracia', 'Konfigurácia', 'Kto s kým.', ['MŽŽ', 'ŽMM', 'MŽM', 'ŽMŽ', 'Bi / hetero mix', 'Kto sa koho dotýka']),
      o('treti-clovek', 'Tretí človek', 'Koho zapojiť.', ['Neznámy (klub / app)', 'Kamarát/ka (riziko na vzťah)', '„Unicorn"', 'Profesionál/ka']),
      o('emocie', 'Emócie', 'Žiarlivosť a compersion.', ['Žiarlivosť', '„Compersion" (radosť z partnerovej radosti)', 'Po-debrief', 'Frekvencia']),
    ],
  },
  {
    slug: 'swinging', cislo: 47, kod: 'H5', domena: 'H', rizikovy: true,
    nazov: 'Swinging / výmena partnerov', popis: 'Soft / full swap, klub a prostredie, pravidlá, matice aktivít (kniha).', ikona: '🔄', citlivost: 3,
    temy: [
      o('swinging', 'Swinging / výmena partnerov', 'Kompletný sprievodca (kniha + dotazník).', undefined, { rizikova: true }),
    ],
  },
  {
    slug: 'zdielanie-partnera', cislo: 48, kod: 'H6', domena: 'H', zrkadlovy: true, rizikovy: true,
    nazov: 'Zdieľanie partnera (hotwife / cuckold)', popis: 'Hotwifing, cuckolding, kandalizmus; motív, rovina, roly, pravidlá (kniha).', ikona: '💍', citlivost: 3,
    temy: [
      o('zdielanie-partnera', 'Zdieľanie partnera (hotwife / cuckold)', 'Kompletný sprievodca (kniha + dotazník).', undefined, { rizikova: true }),
    ],
  },
  {
    slug: 'cnm-enm', cislo: 49, kod: 'H7', domena: 'H',
    nazov: 'CNM/ENM a vzťahové štruktúry', popis: 'Model, politika informovania, poly tvary, praktické.', ikona: '♾️', citlivost: 3,
    temy: [
      o('model', 'Model', 'Štruktúra vzťahu.', ['Striktná monogamia', '„Monogamish"', 'Otvorený vzťah', 'Swinging ako lifestyle', 'Polyamoria', 'Relationship anarchy']),
      o('politika-informovania', 'Politika informovania', 'Čo si hovoríme.', ['Plná transparentnosť', '„DADT"', '„Hall pass"']),
      o('poly-tvary', 'Poly tvary', 'Konfigurácie.', ['„V"', 'Triáda / throuple', 'Quad', 'Hierarchická (primárny / sekundárny) vs nehierarchická', '„Solo poly"', 'Polyfidelita']),
      o('prakticke', 'Praktické', 'Každodennosť.', ['Čas', 'Bývanie („nesting partner")', 'Pravidlá „safer sex"', '„Metamour" vzťahy', 'Žiarlivosť a „compersion"']),
    ],
  },
  {
    slug: 'digitalna-dialkova', cislo: 50, kod: 'H8', domena: 'H',
    nazov: 'Digitálna a diaľková intimita', popis: 'Sexting, ukladanie a riziko, porno spolu, kamera / VR / hračky na diaľku.', ikona: '📱', citlivost: 3,
    temy: [
      o('sexting', 'Sexting', 'Správy a fotky.', ['Texty', 'Hlasovky', 'Fotky (tvár áno / nie)', 'Video', 'Frekvencia', 'Kto iniciuje']),
      o('ukladanie-riziko', 'Ukladanie a riziko', 'Kde to žije.', ['Kde sa to ukladá', 'Mazanie', '„Nikdy tvár"', 'Dôvera', '„Revenge" riziko']),
      o('porno-spolu', 'Porno spolu', 'Spoločné pozeranie.', ['Spoločné pozeranie', 'Výber', '„Čo z toho by sme skúsili"', 'Individuálne porno a hranice']),
      o('kamera-vr', 'Kamera / VR / hračky na diaľku', 'Technológie.', ['Nahrávať seba (len pre nás)', 'Videohovor sex (odlúčenie)', 'VR', 'Appkou ovládané hračky', 'Platformy (súkromie)']),
    ],
  },

  // ═══ I — HRANICE, ZDRAVIE A TELO ═════════════════════════════════════
  {
    slug: 'suhlas-safewords', cislo: 51, kod: 'I1', domena: 'I', tier1: true,
    nazov: 'Súhlas, safe-words a signály', popis: 'Safe-word systém, „nie teraz" kultúra, súhlas vopred vs priebežný, alkohol.', ikona: '🚦', citlivost: 1,
    temy: [
      o('safeword-system', 'Safe-word systém', 'Ako zastavíme.', ['Jedno slovo (STOP) vs semafor (zelená / žltá / červená)', 'Neverbálny signál (3× stisk / pustiť predmet)']),
      o('nie-teraz-kultura', '„Nie teraz" kultúra', 'Odmietnutie bez zranenia.', ['Ako odmietnuť bez zranenia', 'Ako prijať odmietnutie', '„Check-in" počas']),
      o('suhlas-vopred-priebezny', 'Súhlas vopred vs priebežný', 'Dohoda a jej zmena.', ['Čo si dohodneme pred scénou', 'Právo zmeniť názor kedykoľvek', '„Veto" na osoby / aktivity']),
      o('alkohol-substancie', 'Alkohol a substancie', 'Naša hranica.', ['Kde je naša hranica „ešte OK / už nie"', 'Pravidlo pri nových veciach (triezvi)']),
    ],
  },
  {
    slug: 'zdravie-ochrana-hygiena', cislo: 52, kod: 'I2', domena: 'I', tier1: true,
    nazov: 'Zdravie, ochrana a hygiena', popis: 'Antikoncepcia, STI, hygiena, bolesť vs nepohodlie.', ikona: '🩺', citlivost: 2,
    temy: [
      o('antikoncepcia', 'Antikoncepcia', 'Metóda a zodpovednosť.', ['Metóda', 'Zodpovednosť', '„Pull-out" ako (ne)spoľahlivosť', 'Núdzová']),
      o('sti', 'STI', 'Testovanie a ochrana.', ['Testovanie (kedy naposledy, ako často)', 'Status', 'Kondómy (vždy / pri niektorých aktivitách / nie)', 'Pri otvorenom vzťahu protokol']),
      o('hygiena', 'Hygiena', 'Pred a po.', ['Sprcha pred / po', 'Intímna hygiena', 'Hračky (čistenie, materiály, zdieľanie)', 'Anál → nikdy späť k vulve', 'Ruky / nechty']),
      o('bolest-nepohodlie', 'Bolesť vs nepohodlie', 'Kedy je to varovanie.', ['Čo je „dobrá" intenzita a čo je varovanie', 'Suchosť', 'Bolesť pri penetrácii (kedy k lekárovi)', 'Po akte pálenie / UTI prevencia']),
    ],
  },
  {
    slug: 'telo-hanba-citlive', cislo: 53, kod: 'I3', domena: 'I', tier1: true,
    nazov: 'Telo, hanba a citlivé miesta', popis: 'Telo-image, hanba a bloky, spúšťače a história, špecifické obdobia.', ikona: '🫀', citlivost: 2,
    temy: [
      o('telo-image', 'Telo-image', 'Vzťah k vlastnému telu.', ['Čo o svojom tele neznesiem počuť / vidieť', 'Svetlo', 'Zrkadlá', 'Polohy, ktoré ma zneisťujú']),
      o('hanba-bloky', 'Hanba a bloky', 'Z čoho mám hanbu.', ['Z čoho mám hanbu', 'Čo mi pomáha ju znížiť', '„Nehodnotiaci" jazyk partnera']),
      o('spustace-historia', 'Spúšťače a história', 'Citlivé miesta.', ['Slová / dotyky / situácie, ktoré vypnú alebo vyvolajú zlú spomienku', 'Ako signalizovať „potrebujem pauzu"', 'Čo NErobiť keď sa to stane']),
      o('specificke-obdobia', 'Špecifické obdobia', 'Fázy života.', ['Stres / rodičovstvo', 'Tehotenstvo a po pôrode', 'Menštruácia', 'Menopauza', 'Zdravotné stavy / lieky', 'Vek a únava', 'Dlhé odlúčenie']),
    ],
  },
]

// ── Meta uzly (mimo modulov) ───────────────────────────────────────────────
export const ATLAS_SEKCIE = [
  { slug: 'suhlas', nazov: 'Súhlas a bezpečné slovo', popis: 'Safe word, neverbálne STOP, „nie teraz".' },
  { slug: 'komunikacia', nazov: 'Komunikácia a spätná väzba', popis: 'Ako dávame vedieť, čo chceme a čo nie.' },
  { slug: 'frekvencia-cas', nazov: 'Frekvencia a čas', popis: 'Ideálny čas, tempo života, kedy je priestor.' },
  { slug: 'telo-hanba', nazov: 'Telo a hanba', popis: 'Vzťah k vlastnému telu, komfort s nahotou.' },
  { slug: 'libido', nazov: 'Túžba a libido', popis: 'Úroveň, rozdiely medzi nami, spúšťače a brzdy.' },
  { slug: 'zdravie-hygiena', nazov: 'Zdravie a hygiena', popis: 'Ochrana, testovanie, hygiena tela a pomôcok.' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Helpery pre navigáciu
// ─────────────────────────────────────────────────────────────────────────────
export function getDomena(id: string): Domena | undefined {
  return DOMENY.find((d) => d.id === id)
}

export function modulyDomeny(domenaId: string): Modul[] {
  return MODULY.filter((m) => m.domena === domenaId)
}

export function getModul(slug: string): Modul | undefined {
  return MODULY.find((m) => m.slug === slug)
}

export function getTema(modulSlug: string, temaSlug: string): { modul: Modul; tema: Tema } | undefined {
  const modul = getModul(modulSlug)
  const tema = modul?.temy.find((t) => t.slug === temaSlug)
  if (!modul || !tema) return undefined
  return { modul, tema }
}

/** Sekcie platné pre danú tému (po aplikovaní filtrov `lenRizikove` / `lenZrkadlo` / override). */
export function sekcieTemy(tema: Tema): Sekcia[] {
  if (tema.sekcie) {
    return tema.sekcie
      .map((id) => SEKCIE.find((s) => s.id === id))
      .filter((s): s is Sekcia => Boolean(s))
  }
  return SEKCIE.filter((s) => {
    if (s.lenRizikove && !tema.rizikova) return false
    if (s.lenZrkadlo && !tema.zrkadlova) return false
    return true
  })
}

export function susednaSekcia(
  tema: Tema,
  aktualna: SekciaId,
  smer: 'dalej' | 'spat',
): Sekcia | undefined {
  const zoznam = sekcieTemy(tema)
  const i = zoznam.findIndex((s) => s.id === aktualna)
  if (i === -1) return undefined
  return smer === 'dalej' ? zoznam[i + 1] : zoznam[i - 1]
}

export function susednyModul(slug: string, smer: 'dalej' | 'spat'): Modul | undefined {
  const i = MODULY.findIndex((m) => m.slug === slug)
  if (i === -1) return undefined
  return smer === 'dalej' ? MODULY[i + 1] : MODULY[i - 1]
}

/** Cesty (bez jazykového prefixu — ten dopĺňa stránka). */
export const cesta = {
  domov: `/dotaznik`,
  akoToFunguje: `/dotaznik/ako-to-funguje`,
  sukromie: `/dotaznik/sukromie`,
  par: `/dotaznik/par`,
  rola: `/dotaznik/rola`,
  atlas: `/dotaznik/atlas`,
  moduly: `/dotaznik/moduly`,
  modul: (m: string) => `/dotaznik/m/${m}`,
  modulChcem: (m: string) => `/dotaznik/m/${m}/chcem`,
  modulZamknute: (m: string) => `/dotaznik/m/${m}/zamknute`,
  modulTemy: (m: string) => `/dotaznik/m/${m}/temy`,
  modulHotovo: (m: string) => `/dotaznik/m/${m}/hotovo`,
  tema: (m: string, t: string) => `/dotaznik/m/${m}/t/${t}`,
  temaChcem: (m: string, t: string) => `/dotaznik/m/${m}/t/${t}/chcem`,
  temaKniha: (m: string, t: string) => `/dotaznik/m/${m}/t/${t}/kniha`,
  temaRola: (m: string, t: string) => `/dotaznik/m/${m}/t/${t}/rola`,
  temaSekcia: (m: string, t: string, s: string) => `/dotaznik/m/${m}/t/${t}/s/${s}`,
  temaHotovo: (m: string, t: string) => `/dotaznik/m/${m}/t/${t}/hotovo`,
  hotovo: `/dotaznik/hotovo`,
  vyhodnotenie: `/dotaznik/vyhodnotenie`,
  mapa: `/dotaznik/mapa`,
}
