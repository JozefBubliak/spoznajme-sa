import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Bozky, dotyky a manuálna stimulácia — modul B1 „Bozky".
// Zdroj: „10_Bozky_dotyky_a_maznanie". Bozky (ústa/krk/telo, francúzske,
// hryzenie, bozk ako vedenie) + dotyky a maznanie + manuálna stimulácia
// rukami (pre ňu: klitoris/pysky/G-bod; pre neho: úchopy/skrotum; spoločné
// zóny; tempo/edging; ergonómia). z/m verzia zrkadlová.
// Rešerš pre prsia/bradavky a torzo (XLSM-012, 2026-09-30):
// - https://pubmed.ncbi.nlm.nih.gov/16681470/ — stimulácia zvyšuje vzrušenie
//   u mnohých žien aj mužov, ale u časti ľudí ho znižuje.
// - https://pubmed.ncbi.nlm.nih.gov/21797981/ — nipple self-stimulation a
//   aktivácia genitálnej oblasti senzorickej kôry u žien.
// - https://pubmed.ncbi.nlm.nih.gov/24805931/ — rozdielne prahy ľahkého dotyku,
//   tlaku a vibrácie v oblastiach prsníka, areoly a bradavky.
// - https://pubmed.ncbi.nlm.nih.gov/39566929/ — prsia aj bradavky môžu byť
//   erotogénne aj averzívne; mapa je individuálna.
// - https://pubmed.ncbi.nlm.nih.gov/28551701/ — erotická inervácia mužského prsníka.
// - https://www.reddit.com/r/AskMen/comments/1e7v14e/ — komunitná škála od
//   „nedotýkať sa“ po jemné, silné a dlhé dráždenie.
// Rešerš penisu a handjobu (XLSM-013, 2026-09-30):
// - https://pubmed.ncbi.nlm.nih.gov/35715453/ — rozdiely medzi hriadeľom a
//   uzdičkou; frenulum prinieslo najvyššie subjektívne hodnotenie rozkoše.
// - https://pubmed.ncbi.nlm.nih.gov/17378847/ — prahy jemného dotyku sa líšia
//   podľa miesta; neexistuje jedna univerzálna mapa citlivosti.
// - https://pubmed.ncbi.nlm.nih.gov/35853798/ — neistota z veľkosti a vzhľadu
//   genitálií je bežná a nie je redukovateľná iba na rozmery.
// - https://www.reddit.com/r/AskMen/comments/iip0dg/ — komunitné rozdiely v
//   úchope, vlhkosti, tempe, orgazme z ruky a zapojení partnerky.
// - https://www.reddit.com/r/askgaybros/comments/1ile77m/ — rôzne preferencie
//   pri práci s predkožkou, žaluďom a uzdičkou.
// Rešerš tempa a experimentovania (XLSM-024, 2026-10-01):
// - https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0249242
//   — populačne opísané techniky zmeny uhla, hojdania, plytkej stimulácie a
//   kombinovania podnetov; tempo nie je iba zrýchľovanie.
// - https://pubmed.ncbi.nlm.nih.gov/31741252/ — start-stop ako skúmaná
//   behaviorálna technika; v dotazníku použitá ako voľba, nie prísľub výsledku.
// Rešerš vulvy, klitorisu a vaginálnej stimulácie (XLSM-014, 2026-09-30):
// - https://pubmed.ncbi.nlm.nih.gov/26880506/ — anatómia vulvy, klitorisu a
//   jeho ústredná úloha v ženskom vzrušení a orgazme.
// - https://pubmed.ncbi.nlm.nih.gov/25112854/ a
//   https://pubmed.ncbi.nlm.nih.gov/29198508/ — G-oblasť nie je univerzálny
//   izolovaný „gombík“; ide o variabilnú oblasť prednej steny a okolitých štruktúr.
// - https://journals.plos.org/plosone/doi?id=10.1371/journal.pone.0249242 —
//   ženské techniky angling, rocking, shallowing a pairing.
// - https://pubmed.ncbi.nlm.nih.gov/21797981/ — klitoris, vagína a krčok
//   majú odlišné senzorické dráhy; vnútorné potešenie nie je mýtus ani povinnosť.
// - https://www.reddit.com/r/sexeducation/comments/1r5ow0d/
// - https://www.reddit.com/r/sexadvise/comments/1gvqn83/
// - https://www.reddit.com/r/WomensHealth/comments/1o5ausa/
//   — komunitné rozdiely: vonkajšia, plytká, predná, súbežná a žiadna
//   vnútorná stimulácia môžu byť rovnako platné preferencie.
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
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})
const VLHKOST: Moznost[] = [
  { v: 'sucho', label: 'Nasucho' },
  { v: 'sliny', label: 'Sliny' },
  { v: 'lubrikant', label: 'Lubrikant' },
]
const INT5: Moznost[] = [
  { v: '1', label: '1 — veľmi jemné' },
  { v: '2', label: '2' },
  { v: '3', label: '3 — stredné' },
  { v: '4', label: '4' },
  { v: '5', label: '5 — výrazné' },
]

// ── Bozky ────────────────────────────────────────────────────────────
// Zdroj + xlsm P47323–48012 (bozky m/z, typy bozkov, tipy, manuálne body A/U/
// fornix, orphan nadpisy „kombinácie a rituály", „prepojenie s masážou").
const BOZKY_USTA: Blok = {
  druh: 'skupina', id: 'bozky_usta', nadpis: 'Bozky — ústa',
  uvod: 'Bozk vie byť nežný ako pohladenie, drsný ako rozbúrené more, alebo provokatívny a hravý. Niekedy je predohrou, inokedy samotným centrom zážitku.',
  bloky: [
    {
      druh: 'text', id: 'boz_typy', nadpis: 'Typy bozkov a ich energia',
      telo:
        'Jemné a romantické — pomalé, mäkké dotyky pier, vnímanie dychu a tepla; ideálne na začiatok. ' +
        'Intenzívne a vášnivé — hlbšie spojenie pier a jazyka, rýchlejší rytmus, pevnejší tlak; prebúdzajú túžbu. ' +
        'Agresívne a dráždivé — silné zovretie pier, jemné alebo intenzívne hryzenie, vzrušujúci kontrast bolesti a potešenia.',
    },
    {
      druh: 'otazka', id: 'boz_usta', typ: 'jeden',
      text: g(
        'Predstav si, že ju držíš za šiju a vaše pery sa spoja v hlbokom, hladnom bozku. Ako máš rád bozky na ústa?',
        'Predstav si, že jeho pery len letmo prechádzajú po tvojich, zastavia sa a potom ťa nežne pobozkajú. Ako máš rada bozky na ústa?',
      ),
      moznosti: [
        { v: 'jemne', label: 'Jemné a krátke — nežnosť a romantika' },
        { v: 'vasnive', label: 'Intenzívne a vášnivé, dlhotrvajúce — rozohriatie túžby' },
        { v: 'kombinacia', label: 'Kombinácia jemných a intenzívnych' },
        { v: 'agresivne', label: 'Agresívnejšie — silný tlak, pritlačenie pier, zovretie, hryzenie' },
      ],
    },
    { druh: 'otazka', id: 'boz_usta_ine', typ: 'text', text: 'Vlastná odpoveď — bozky na ústa (voliteľné):' },

    {
      druh: 'otazka', id: 'boz_francuzske', typ: 'jeden',
      text: g(
        'Predstav si, že jej jazyk sa dotkne tvojho a váš dych sa spojí. Ako vnímaš francúzske bozky?',
        'Predstav si, ako jeho jazyk jemne vkĺzne medzi tvoje pery a začne sa s tvojím hrať. Vzrušujú ťa francúzske bozky?',
      ),
      moznosti: [
        { v: 'ano', label: 'Áno, milujem ich — veľmi ma vzrušujú' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'nie', label: 'Nie, nevyhľadávam ich' },
      ],
    },
    { druh: 'otazka', id: 'boz_francuzske_ine', typ: 'text', text: 'Vlastná odpoveď — francúzske bozky (voliteľné):' },

    {
      druh: 'otazka', id: 'boz_hryzenie_pier', typ: 'jeden',
      text: g(
        'Predstav si, že jej zuby sa zľahka zahryznú do tvojej pery. Láka ťa hryzenie pier?',
        'Predstav si, že pri bozku jemne hryzne tvoju peru — len tak, aby si cítila jeho vášeň. Ako ti vyhovuje hryzenie pier?',
      ),
      moznosti: [
        { v: 'milujem', label: 'Jemné hryzenie milujem — mierne dráždenie' },
        { v: 'intenzivne', label: 'Intenzívnejšie hryzenie — divokosť, láka ma alebo chcem skúsiť' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'nie', label: 'Nepreferujem hryzenie pier' },
      ],
    },
    { druh: 'otazka', id: 'boz_hryzenie_pier_ine', typ: 'text', text: 'Vlastná odpoveď — hryzenie pier (voliteľné):' },
    p('boz_6_sekund', 'Denný „6-sekundový bozk" — dlhší bozk pri odchode a príchode, nie len cmuk'),
    p('boz_pocas_sexu', 'Bozkávanie počas celého sexu, nielen na začiatku'),
    p('boz_po_orali', g('Bozk po oráli — ochutnať sa na perách partnerky', 'Bozk po oráli — ochutnať sa na perách partnera')),
    p('boz_hlava_vlasy', 'Ťahanie za vlasy alebo držanie tváre pri bozku'),
    p('boz_ocny_kontakt', 'Bozkávanie s hlbokým pohľadom do očí'),
    {
      druh: 'otazka', id: 'boz_miera_vlhkosti', typ: 'jeden',
      text: 'Miera „vlhkosti" bozku, ktorá mi je príjemná',
      moznosti: [
        { v: 'suchsie', label: 'Skôr suchšie, jemné pery' },
        { v: 'jemne_vlhke', label: 'Jemne vlhké' },
        { v: 'velmi_vlhke', label: 'Veľmi vlhké, vášnivé' },
        { v: 'snowballing', label: '„Snowballing" — vedomé predávanie slín z úst do úst' },
      ],
    },
    {
      druh: 'otazka', id: 'boz_predavanie_tekutin', typ: 'jeden',
      text: 'Predávanie tekutiny z úst do úst počas bozku (dúšok vína, šampanského, sladkého nápoja)',
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to vyskúšať' },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
  ],
}

const BOZKY_TELO: Blok = {
  druh: 'skupina', id: 'bozky_telo', nadpis: 'Bozky — krk a telo',
  bloky: [
    {
      druh: 'otazka', id: 'boz_krk', typ: 'jeden',
      text: g(
        'Predstav si, že jej pery a zuby sa dotýkajú tvojho krku a ty len zavrieš oči. Ako vnímaš bozkávanie krku?',
        'Predstav si, že ti pery blúdia po krku a sem-tam jemne nasajú pokožku. Ako máš rada bozky na krku?',
      ),
      moznosti: [
        { v: 'jemne', label: 'Jemné, šteklivé bozky — príjemné uvoľnenie' },
        { v: 'intenzivne', label: 'Intenzívne sanie a hryzenie — vášeň a stopa' },
        { v: 'kombinacia', label: 'Kombinácia jemných a dravých, striedavo' },
        { v: 'nie', label: 'Nie, bozkávanie krku nevyhľadávam' },
      ],
    },
    { druh: 'otazka', id: 'boz_krk_ine', typ: 'text', text: 'Vlastná odpoveď — bozky na krk (voliteľné):' },

    p('boz_znacenie', 'Značenie (cumlík / hryznutie, ktoré zanechá stopu)'),
    {
      druh: 'otazka', id: 'boz_zony', typ: 'viac', inePovolene: true,
      text: g('Kde najradšej prijímam bozky', 'Ktoré miesta na tele mám rada, keď ma bozkáva'),
      moznosti: [
        { v: 'usi', label: 'Uši (bozkávanie, dýchanie, hryzenie lalôčikov)' },
        { v: 'bradavky', label: 'Hrudník a bradavky (bozky, jemné hryzenie)' },
        { v: 'brucho', label: 'Brucho (bozkávanie, sanie pokožky)' },
        { v: 'stehna', label: 'Vnútorné stehná' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'chrbat', label: 'Chrbát' },
        { v: 'kluc_kost', label: 'Kľúčna kosť' },
        { v: 'prsty', label: 'Prsty a dlaň' },
        { v: 'zatylok', label: 'Zátylok a lopatky' },
        { v: 'podbrusko', label: 'Podbruško tesne nad genitáliami' },
        { v: 'chodidla', label: 'Chodidlá a členky' },
        { v: 'nie', label: 'Nepreferujem bozky na iných miestach' },
      ],
    },
    {
      druh: 'otazka', id: 'boz_intenzivne_hryzenie', typ: 'viac',
      text: 'Kde je intenzívne hryzenie OK',
      moznosti: [
        { v: 'bradavky', label: 'Bradavky' },
        { v: 'stehna', label: 'Stehná' },
        { v: 'krk', label: 'Krk' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'nikde', label: 'Nikde' },
      ],
    },
  ],
}

const BOZKY_TIPY: Blok = {
  druh: 'skupina', id: 'bozky_tipy', nadpis: 'Tipy a mýty o bozkávaní',
  bloky: [
    {
      druh: 'text', id: 'boz_vecer', nadpis: 'Večer bozkov',
      telo: g(
        'Predstav si večer, v ktorom sa partnerkine pery presúvajú z tvojich úst na krk, uši a hrudník. Nevidíš, kam príde ďalší bozk — raz je mäkký, potom hladný, s prisatím, zubami, dychom na koži alebo krátkym ťahom za vlasy.',
        'Predstav si večer, v ktorom sa partnerove pery presúvajú z tvojich úst na krk, uši a hrudník. Nevidíš, kam príde ďalší bozk — raz je mäkký, potom hladný, s prisatím, zubami, dychom na koži alebo krátkym ťahom za vlasy.',
      ),
    },
    {
      druh: 'text', id: 'boz_myty', nadpis: 'Mýty', ton: 'info',
      telo:
        'Mýtus: „Po rokoch vzťahu sa bozkávanie prirodzene vytratí." — Realita: páry, ktoré sa denne bozkávajú dlhšie ako pár sekúnd, hlásia vyššiu spokojnosť aj chuť na sex. Stačí to vedome obnoviť. ' +
        'Mýtus: „Veľa jazyka = vášnivý bozk." — Realita: väčšina ľudí chce menej jazyka, než dostáva; vášeň robí tlak pier, tempo a pauzy. ' +
        'Mýtus: „Ochutnať sa po oráli je nechutné." — Realita: pre mnohých je to jeden z najintímnejších a najvzrušujúcejších momentov. Nie je za čo sa hanbiť. ' +
        'Mýtus: „Cumlík je trápny." — Realita: pre niekoho je stopa tajným znakom, ktorý pripomína noc ešte celý deň.',
    },
  ],
}

const BOZK_VEDENIE: Blok = {
  druh: 'skupina', id: 'bozk_vedenie', nadpis: 'Bozk ako vedenie',
  bloky: [
    p('boz_uchop_hlavy', 'Pevný úchop hlavy alebo vlasov pri bozku'),
    p('boz_zaciatok_dominancie', '„Povedz, že ma chceš, potom ťa pobozkám" — bozk ako začiatok dominancie'),
  ],
}

// ── Dotyky a maznanie ───────────────────────────────────────────────
const DOTYKY: Blok = {
  druh: 'skupina', id: 'dotyky', nadpis: 'Dotyky a maznanie',
  bloky: [
    {
      druh: 'otazka', id: 'dot_jemne', typ: 'viac',
      text: 'Jemné dotyky, ktoré ma lákajú',
      moznosti: [
        { v: 'tvar_vlasy', label: 'Prechádzanie prstami po tvári / vlasoch' },
        { v: 'pery', label: 'Obťahovanie pier' },
        { v: 'tvary', label: 'Kreslenie tvarov na koži' },
        { v: 'nechty_chrbat', label: 'Nechtami po chrbte' },
        { v: 'pierko', label: 'Pierko-ľahké dotyky' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_tlak', typ: 'viac',
      text: 'Tlak a stisk',
      moznosti: [
        { v: 'striedanie', label: 'Striedanie hladenia a pevného stisku' },
        { v: 'pazurik', label: '„Mačací pazúrik"' },
        { v: 'chytenie', label: 'Hrubšie chytenie' },
        { v: 'placnutie', label: 'Jemné plesknutie po zadku' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_zony', typ: 'viac',
      text: 'Zóny tela',
      moznosti: [
        { v: 'krk', label: 'Krk / ramená' },
        { v: 'chrbat', label: 'Chrbát / kríže' },
        { v: 'zadok', label: 'Zadok / stehná' },
        { v: 'lytka', label: 'Lýtka / chodidlá' },
        { v: 'brucho', label: 'Brucho' },
        { v: 'lakte', label: 'Vnútro lakťov a kolien' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_objatia', typ: 'viac',
      text: 'Objatia a blízkosť',
      moznosti: [
        { v: 'dlhe', label: 'Dlhé objatie' },
        { v: 'lyzicky', label: '„Lyžičky"' },
        { v: 'hrud', label: 'Hlava na hrudi' },
        { v: 'nohy', label: 'Prepletené nohy' },
        { v: 'vaha', label: 'Váha tela na mne' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_kontext', typ: 'viac',
      text: 'Kontext maznania',
      moznosti: [
        { v: 'den', label: 'Nesexuálne počas dňa' },
        { v: 'predohra', label: 'Ako predohra' },
        { v: 'po_sexe', label: 'Po sexe' },
        { v: 'usinanie', label: 'Pri usínaní' },
        { v: 'film', label: 'Pri filme' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_vlasy', typ: 'jeden',
      text: 'Ako vnímam ťahanie za vlasy počas intímnych chvíľ?',
      moznosti: [
        { v: 'milujem', label: 'Milujem ho — pridáva intenzitu a pocit vedenia' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'jemne', label: 'Iba jemný úchop alebo krátke potiahnutie' },
        { v: 'fantazia', label: 'Láka ma skôr ako fantázia než reálny dotyk' },
        { v: 'nie', label: 'Nevyhľadávam ho' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_kontrast', typ: 'jeden',
      text: 'Ako ma láka striedanie jemných a intenzívnych dotykov?',
      moznosti: [
        { v: 'ano', label: 'Veľmi — kontrast je pre mňa hlavný spínač' },
        { v: 'mozno', label: 'Možno, chcem objaviť konkrétnu kombináciu' },
        { v: 'nalada', label: 'Iba v niektorých náladách' },
        { v: 'konzistentne', label: 'Preferujem jeden konzistentný štýl' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_partner_tuzba', typ: 'jeden',
      text: g('Ako reagujem, keď partnerka túži po pevnejších, jemnejších alebo striedavých dotykoch?', 'Ako reagujem, keď partner túži po pevnejších, jemnejších alebo striedavých dotykoch?'),
      moznosti: [
        { v: 'vzrusuje', label: g('Jej konkrétna túžba ma vzrušuje', 'Jeho konkrétna túžba ma vzrušuje') },
        { v: 'rad', label: g('Rád sa učím, aký dotyk jej sedí', 'Rada sa učím, aký dotyk mu sedí') },
        { v: 'vyber', label: 'Niektoré štýly poskytujem rád, iné mi nesedia' },
        { v: 'neutral', label: g('Jej túžbe rozumiem, ale dotyk ma osobne veľmi nevzrušuje', 'Jeho túžbe rozumiem, ale dotyk ma osobne veľmi nevzrušuje') },
        { v: 'nie', label: 'Nechcem tento typ dotyku poskytovať' },
      ],
    },
  ],
}

// ── Manuálna stimulácia — pre ňu ──────────────────────────────────
const MVN: Blok = {
  druh: 'skupina', id: 'mvn', nadpis: g('Manuálna stimulácia partnerky — vulva a vagína', 'Manuálna stimulácia mojej vulvy a vagíny'),
  bloky: [
    {
      druh: 'text', id: 'mvn_info', nadpis: 'Prsty dokážu byť presnejšie než akákoľvek iná technika', ton: 'info',
      telo: g(
        'Pod prstami môžeš cítiť, ako sa partnerkino telo mení: pysky napučia, panva sa pritlačí k dlani a presný rytmus na klitorise alebo prednej stene ju môže úplne pohltiť. Ruka vie naraz držať, krúžiť, pulzovať aj vytvárať tlak — prstovanie preto nemusí byť iba predohra, ale celý hlavný erotický zážitok.',
        'Prsty môžu objať celú vulvu, viesť jemný tlak cez kapucňu klitorisu, hrať sa pri vstupe alebo sa zvnútra oprieť o prednú stenu. Vonkajší a vnútorný dotyk sa môžu striedať alebo vrstviť; najväčší rozdiel často urobí presný uhol, plocha kontaktu a rytmus, ktorý moje telo nechce pustiť.',
      ),
    },
    {
      druh: 'otazka', id: 'mvn_postoj', typ: 'jeden',
      text: g('Ako vnímam poskytovanie prstovania partnerke?', 'Ako vnímam prijímanie prstovania od partnera?'),
      moznosti: [
        { v: 'milujem', label: g('Jej rozkoš pod mojimi prstami ma veľmi vzrušuje', 'Milujem ho a môže byť pre mňa hlavným aktom') },
        { v: 'rad', label: g('Veľmi rád jej ho poskytujem', 'Mám ho rada často, ale závisí od štýlu') },
        { v: 'obcas', label: 'Láka ma skôr občas alebo ako súčasť inej hry' },
        { v: 'zvedavy', label: g('Chcem lepšie objaviť, čo presne jej telo miluje', 'Som zvedavá na techniky, ktoré ešte nepoznám') },
        { v: 'neutral', label: g('Poskytujem ho skôr pre jej potešenie', 'Som k nemu neutrálna') },
        { v: 'nie', label: 'Neláka ma to' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_klitoris', typ: 'viac', inePovolene: true,
      text: g('Ktoré vonkajšie techniky ma láka robiť partnerke?', 'Ktoré vonkajšie techniky chcem prijímať?'),
      moznosti: [
        { v: 'kruzenie', label: 'Krúženie' },
        { v: 'tahy', label: 'Horizontálne aj vertikálne ťahy' },
        { v: 'tapping', label: 'Ťukance („tapping")' },
        { v: 'orbit', label: '„Orbit" — okolo, nie priamo' },
        { v: 'kapucna', label: 'Jemné odkrytie kapucne' },
        { v: 'pinch_roll', label: '„Pinch & roll"' },
        { v: 'cez_kapucnu', label: 'Tlak a krúženie cez kapucňu bez priameho dotyku žaluďa klitorisu' },
        { v: 'drzanie', label: 'Pevný tlak alebo podržanie bez pohybu' },
        { v: 'osmicky', label: 'Osmičky cez klitoris a jeho okolie' },
        { v: 'cela_dlan', label: 'Objatie celej vulvy dlaňou a pomalé hojdanie' },
        { v: 'labia_hug', label: 'Stlačenie pyskov okolo klitorisu („vulva hug")' },
        { v: 'mons', label: 'Tlak a masáž lonového pahorku nad klitorisom' },
        { v: 'vibracie', label: 'Jemné rýchle vibrácie končekom prsta' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_pysky', typ: 'viac',
      text: g('Ako ma láka stimulovať partnerkine pysky a vstup?', 'Akú stimuláciu pyskov a vstupu chcem prijímať?'),
      moznosti: [
        { v: 'hladenie', label: 'Hladenie malých pyskov dnu / von' },
        { v: 'vframe', label: 'Jemné natiahnutie („V-frame")' },
        { v: 'kruzenie_vstup', label: 'Krúženie po vstupe' },
        { v: 'dip', label: 'Plytké „dip"' },
        { v: 'klzanie', label: 'Kĺzanie medzi pyskami' },
        { v: 'shallowing', label: '„Shallowing" — prst alebo končeky tesne za vstupom' },
        { v: 'tlak_okolo', label: 'Pomalý tlak do tkaniva po obvode vstupu' },
        { v: 'dva_prsty_v', label: 'Dva prsty do tvaru V jemne rozťahujú pysky' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_prsty', typ: 'jeden',
      text: g('Koľko vnútornej stimulácie ma láka partnerke poskytovať?', 'Koľko vnútornej stimulácie mi najčastejšie vyhovuje?'),
      moznosti: [
        { v: 'bez', label: 'Iba zvonka, bez vsunutia prstov' },
        { v: 'plytko', label: 'Konček jedného prsta a hra pri vstupe' },
        { v: 'jeden', label: 'Jeden prst hlbšie' },
        { v: 'dva', label: 'Dva prsty' },
        { v: 'viac', label: 'Tri alebo viac prstov a výrazný pocit plnosti' },
        { v: 'striedat', label: 'Striedať podľa vzrušenia a nálady' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_gbod', typ: 'viac',
      text: g('Ktoré vnútorné miesta ma láka stimulovať partnerke?', 'Ktoré vnútorné miesta chcem stimulovať?'),
      moznosti: [
        { v: 'hook', label: '„Hook" — zahnuté prsty' },
        { v: 'pulzy', label: 'Pulzy' },
        { v: 'tahy', label: 'Drobné ťahy dopredu-dozadu' },
        { v: 'parovanie', label: 'Párovanie s klitorisom (externé + interné súbežne)' },
        { v: 'wave', label: '„Wave" (vlnka) zvnútra' },
        { v: 'tlak_dlane', label: 'Tlak dlane na podbrušku' },
        { v: 'a_bod', label: 'A-bod — hlboko na prednej stene pred krčkom' },
        { v: 'u_bod', label: 'U-bod — okolo ústia močovej trubice nad vstupom' },
        { v: 'fornix', label: 'Zadná klenba (posterior fornix) — hlboko vzadu za krčkom' },
        { v: 'vstup', label: 'Citlivá oblasť tesne za vstupom' },
        { v: 'bocne_steny', label: 'Pomalý tlak do bočných stien' },
        { v: 'zadna_stena', label: 'Tlak na zadnú stenu smerom ku konečníku' },
      ],
    },
    {
      druh: 'text', id: 'mvn_gbod_info', nadpis: 'G-bod: uhol a opora', ton: 'info',
      telo:
        'Pri pohybe „hook" sa zahnuté prsty opierajú o prednú stenu vagíny smerom k pupku. Jedna ruka môže pracovať zvnútra a druhá stabilizovať podbruško alebo stimulovať klitoris. ' +
        'Niekto uprednostňuje malé pulzy na jednom mieste, iný dlhšie priťahovanie prstov, súvislý tlak alebo prestávky. Pocit nutkania na močenie môže byť súčasťou tejto stimulácie a nie je dôvodom na hanbu.',
    },
    {
      druh: 'otazka', id: 'mvn_gbod_uhol', typ: 'viac', inePovolene: true,
      text: g('Aký smer a pohyb na partnerkinej prednej stene ma láka?', 'Aký smer a pohyb na prednej stene ma láka?'),
      moznosti: [
        { v: 'hook', label: 'Zahnuté prsty smerom k pupku' },
        { v: 'pulzy', label: 'Krátke pulzy na jednom bode' },
        { v: 'pritahovanie', label: 'Rytmické priťahovanie „poď sem"' },
        { v: 'kruhy', label: 'Malé krúžky' },
        { v: 'zametanie', label: 'Pomalé prechádzanie po širšej ploche' },
        { v: 'drzanie', label: 'Súvislý tlak bez pohybu' },
        { v: 'hojdanie', label: 'Zahnuté prsty držia tlak a celá ruka sa pomaly hojdá' },
        { v: 'dnu_von', label: 'Plynulé pohyby dnu a von s tlakom pri vyťahovaní' },
        { v: 'striedat_steny', label: 'Striedanie prednej, bočnej a zadnej steny' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_gbod_tlak', typ: 'jeden',
      text: g('Aký tlak ma láka poskytovať pri vnútornej stimulácii?', 'Aký tlak mi pri vnútornej stimulácii najčastejšie vyhovuje?'),
      moznosti: [
        { v: 'jemny', label: 'Jemný a postupný' },
        { v: 'stredny', label: 'Stredný a stabilný' },
        { v: 'silny', label: 'Pevný a dôrazný' },
        { v: 'stupnovanie', label: 'Postupné zvyšovanie tlaku' },
        { v: 'striedanie', label: 'Striedanie tlaku a uvoľnenia' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_gbod_rytmus', typ: 'jeden',
      text: g('Aký rytmus na G-oblasti ma láka partnerke poskytovať?', 'Čo mi pri stimulácii G-oblasti vyhovuje viac?'),
      moznosti: [
        { v: 'staly', label: 'Stály rytmus bez prerušovania' },
        { v: 'pauzy', label: 'Krátke pauzy a návraty' },
        { v: 'vlny', label: 'Vlny od jemného po intenzívne' },
        { v: 'spatna_vazba', label: 'Priebežné prispôsobovanie podľa mojich reakcií' },
      ],
    },
    { druh: 'otazka', id: 'mvn_vlhkost', typ: 'jeden', text: g('Aká vlhkosť pri stimulácii partnerky ma láka?', 'Aká vlhkosť mi pri stimulácii vyhovuje?'), moznosti: VLHKOST },
    { druh: 'otazka', id: 'mvn_intenzita', typ: 'jeden', text: g('Akú intenzitu ma láka partnerke poskytovať?', 'Aká intenzita mi vyhovuje?'), moznosti: INT5 },
    {
      druh: 'otazka', id: 'mvn_styl', typ: 'viac', inePovolene: true,
      text: 'Ktoré štýly ma lákajú?',
      moznosti: [
        { v: 'jemny', label: 'Pomalý, nežný a celotelový' },
        { v: 'presny', label: 'Presný a sústredený na jeden bod' },
        { v: 'mokry', label: 'Veľmi mokrý a klzký' },
        { v: 'rytmicky', label: 'Stabilný rytmus bez zmeny' },
        { v: 'teasing', label: 'Dlhé dráždenie okolo bez priameho dotyku' },
        { v: 'plnost', label: 'Výrazný tlak a pocit plnosti' },
        { v: 'intenzivny', label: 'Rýchly, pevný a intenzívny' },
        { v: 'vedenie', label: g('Partnerka vedie moju ruku vlastným pohybom', 'Vediem partnerovu ruku svojou rukou alebo panvou') },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_telo', typ: 'viac',
      text: g('Ako ma láka zapojiť partnerkino telo do pohybu?', 'Ako chcem pri prstovaní zapojiť vlastné telo?'),
      moznosti: [
        { v: 'panva', label: g('Nechať ju hojdať alebo tlačiť panvu proti mojej ruke', 'Hojdať alebo tlačiť panvu proti jeho ruke') },
        { v: 'stehna', label: 'Zovrieť stehná okolo ruky' },
        { v: 'svaly', label: 'Rytmicky zvierať a uvoľňovať panvové svaly okolo prstov' },
        { v: 'ruka', label: g('Nechať ju držať a viesť moju ruku', 'Držať a viesť jeho ruku') },
        { v: 'nehybne', label: 'Zostať takmer bez pohybu a sústrediť sa na presný dotyk' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_kombinacie', typ: 'viac',
      text: g('S čím ma láka spájať prstovanie partnerky?', 'S čím chcem spájať prstovanie?'),
      moznosti: [
        { v: 'oral', label: 'Ruka + ústa (cunnilingus)' },
        { v: 'vibrator', label: 'Ruka + mini-vibrátor (nízka intenzita)' },
        { v: 'penetracia', label: 'Prsty počas penetrácie' },
        { v: 'bradavky', label: 'Prsty + bozky alebo dotyky bradaviek' },
        { v: 'krk', label: 'Prsty + bozky na krku a uchu' },
        { v: 'anal', label: 'Prsty na vulve + vonkajšia stimulácia zadku alebo hrádze' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_partner_tuzba', typ: 'jeden',
      text: g('Ako na mňa pôsobí, keď partnerka túži po prstovaní?', 'Ako na mňa pôsobí, keď partner túži stimulovať ma prstami?'),
      moznosti: [
        { v: 'silno', label: g('Jej túžba cítiť moje prsty ma silno vzrušuje', 'Jeho chuť dotýkať sa ma prstami ma silno vzrušuje') },
        { v: 'rad', label: g('Rád jej ho poskytujem a sledujem jej reakcie', 'Rada ho prijímam a odovzdám sa jeho ruke') },
        { v: 'spolu', label: g('Láka ma, keď mi sama ukáže pohyb, ktorý miluje', 'Láka ma ukázať mu presne pohyb, ktorý milujem') },
        { v: 'doplnok', label: 'Vyhovuje mi skôr ako doplnok k orálu alebo penetrácii' },
        { v: 'neutral', label: g('Jej túžbu chápem, ale mňa osobne veľmi nevzrušuje', 'Jeho túžbu chápem, ale mňa osobne veľmi nevzrušuje') },
        { v: 'nie', label: 'Nechcem ho zaradiť medzi naše zhody' },
      ],
    },
    {
      druh: 'text', id: 'mvn_myty', nadpis: 'Mýty o prstovaní, klitorise a G-oblasti', ton: 'info',
      telo:
        'Mýtus: prstovanie znamená najmä pohyb dnu a von. Realita: mnohé ženy viac vzrušuje vonkajší klitoris, plytká hra pri vstupe, tlak na prednú stenu alebo ich kombinácia.\n\n' +
        'Mýtus: G-bod je rovnaký „gombík" u každej ženy. Realita: výskum opisuje variabilnú oblasť prednej vaginálnej steny a klitorálno-močovo-vaginálneho komplexu; niektorá žena ju miluje, iná cíti len tlak alebo nič zvláštne.\n\n' +
        'Mýtus: rýchlejšie a viac prstov znamená lepšiu techniku. Realita: rozhodovať môže jeden stabilný mikropohyb, široký tlak dlane alebo presné striedanie priameho a nepriameho dotyku.\n\n' +
        'Mýtus: ak žena nevyvrcholí z vnútornej stimulácie, niečo jej chýba. Realita: klitoris je pre veľa žien hlavnou cestou k orgazmu a vnútorný dotyk môže byť hlavný, doplnkový alebo úplne neutrálny.',
    },
    {
      druh: 'text', id: 'mvn_odkaz', ton: 'info',
      telo: 'Polohy pre pohodlný prístup rúk sú v téme „Polohy", vibrátory a doplnky v téme „Erotické pomôcky a hračky".',
    },
    {
      druh: 'otazka', id: 'mvn_polohy', typ: 'viac',
      text: g('Polohy, v ktorých sa mi partnerka najlepšie stimuluje', 'Polohy, v ktorých chcem prstovanie prijímať'),
      moznosti: [
        { v: 'chrbat', label: 'Na chrbte s vankúšom pod panvou' },
        { v: 'bok', label: 'Na boku' },
        { v: 'hrana', label: 'Hrana postele' },
      ],
    },
  ],
}

// ── Kombinácie a rituály ─────────────────────────────────────────────
// Zdroj uvádza len nadpisy „Kombinácie a rituály (keď chcete viac)" a
// „Prepojenie s masážou — aby sa telo uvoľnilo a hlava nestihla sabotovať
// zážitok". Obsah dotvorený.
const RUKY_RITUALY: Blok = {
  druh: 'skupina', id: 'ruky_ritualy', nadpis: 'Kombinácie a rituály s rukami',
  uvod: 'Masáž pred manuálnou stimuláciou uvoľní telo skôr, než hlava stihne sabotovať zážitok.',
  bloky: [
    p('rr_masaz_prechod', 'Masáž celého tela, ktorá plynulo prejde na genitálie'),
    p('rr_vzajomne', 'Vzájomná manuálna stimulácia naraz'),
    p('rr_vedenie_ruky', 'Položiť ruku na partnerovu a ukázať, ako to chcem'),
    p('rr_zozadu', g('Stimulácia zozadu v objatí — partnerka za mnou, ruka vpredu', 'Stimulácia zozadu v objatí — partner za mnou, ruka vpredu')),
    p('rr_ranny', 'Ranné prebudenie rukou'),
    p('rr_verejne', 'Diskrétne pod dekou v kine, v aute, pod stolom'),
    p('rr_do_konca', 'Manuálna stimulácia až do orgazmu ako hlavný akt'),
    {
      druh: 'otazka', id: 'rr_tlakove_body', typ: 'viac', inePovolene: true,
      text: 'Ktoré oporné a tlakové body chcem zapojiť dlaňou alebo prstami',
      moznosti: [
        { v: 'panvove_hrebene', label: 'Panvové hrebene — pevný úchop alebo tlak palcov' },
        { v: 'bedra', label: 'Bedrá a boky — hnetenie a pritiahnutie' },
        { v: 'krize', label: 'Kríže a spodný chrbát — tlak dlaňou' },
        { v: 'stehna', label: 'Vnútorné stehná — dlhé ťahy a stisk' },
        { v: 'podbrusko', label: 'Podbruško — opora dlane pri vnútornej stimulácii' },
        { v: 'zadok', label: 'Zadok — stisk, hnetenie alebo roztiahnutie' },
      ],
    },
    {
      druh: 'text', id: 'rr_tlakove_body_info', nadpis: 'Ruky mimo genitálií', ton: 'info',
      telo:
        'Dlaň na krížoch, palce na panvových hrebeňoch alebo pevný úchop bokov môžu meniť držanie tela aj pocit vedenia. ' +
        'Takýto tlak môže byť jemnou oporou, súčasťou masáže alebo intenzívnym kontrastom k presnej stimulácii prstami.',
    },
    {
      druh: 'text', id: 'rr_myty', nadpis: 'Mýty', ton: 'info',
      telo:
        'Mýtus: „Ruky sú len náhrada, keď sa nedá sex." — Realita: pre väčšinu žien je ruka na klitorise najspoľahlivejšia cesta k orgazmu. ' +
        'Mýtus: „Rýchlejšie a silnejšie = lepšie." — Realita: kľúčom je neprerušený rovnaký rytmus tesne pred orgazmom; zmena tempa v tej chvíli ho často odoženie. ' +
        'Mýtus: „Handjob vie každý." — Realita: každý penis a každá vulva chce niečo iné; najrýchlejšie sa to naučíte, keď sa navzájom pozorujete pri masturbácii.',
    },
  ],
}

// ── Manuálna stimulácia — pre neho ───────────────────────────────
const MNP: Blok = {
  druh: 'skupina', id: 'mnp', nadpis: 'Manuálna stimulácia — penis a skrotum (handjob)',
  bloky: [
    {
      druh: 'text', id: 'mnp_info', nadpis: 'Handjob je samostatná technika, nie iba doplnok k orálu', ton: 'info',
      telo:
        'Úchop určuje plochu kontaktu, tlak určuje intenzitu a vlhkosť mení trenie. Pohyb môže viesť celou dlaňou po hriadeli, sústrediť sa na korunu žaluďa a uzdičku alebo spojiť dve ruky do rotácie. ' +
        'Sliny pôsobia inak než lubrikant: rýchlejšie vysychajú a vytvárajú premenlivejšie trenie, zatiaľ čo lubrikant podporuje dlhé plynulé ťahy. Handjob môže byť predohra, edging aj celý hlavný akt. ' +
        'Táto časť nehľadá „ideálny typ" penisu ani neporovnáva partnerovo telo: vyberá dotyky, ktoré môžu fungovať s penisom, ktorý je súčasťou vášho vzťahu.',
    },
    {
      druh: 'otazka', id: 'mnp_uchopy', typ: 'viac', inePovolene: true,
      text: 'Úchopy',
      moznosti: [
        { v: 'ok', label: 'OK-grip' },
        { v: 'c', label: 'C-grip' },
        { v: 'barrel', label: '„Barrel" — celá dlaň' },
        { v: 'corkscrew', label: '„Corkscrew" — rotačný' },
        { v: 'ring', label: '„Ring" na žaluď' },
        { v: 'twist', label: 'Dvojrúčkový twist' },
        { v: 'base_squeeze', label: '„Base squeeze"' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_ciele', typ: 'viac',
      text: 'Cielené miesta',
      moznosti: [
        { v: 'koruna', label: 'Žaluď — koruna' },
        { v: 'frenulum', label: 'Uzdička (frenulum)' },
        { v: 'strany', label: 'Strany hriadeľa' },
        { v: 'spicka', label: 'Špička žaluďa a ústie močovej rúry' },
        { v: 'spodok_zaluda', label: 'Spodná strana žaluďa a prechod k uzdičke' },
        { v: 'koren', label: 'Koreň penisu a priestor tesne nad mieškom' },
        { v: 'predkozka', label: 'Predkožka a jej okraj' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_pohyby', typ: 'viac',
      text: 'Pohyby a vzorce',
      moznosti: [
        { v: 'kruzenie', label: 'Krúženie po žaluďa' },
        { v: 'osmicky', label: '8-čka po dĺžke' },
        { v: 'squeeze_glide', label: '„Squeeze & glide"' },
        { v: 'edging', label: 'Stop-start (edging)' },
        { v: 'palec_frenulum', label: 'Palec po uzdičke pri každom ťahu' },
        { v: 'koruna_rotacia', label: 'Rotácia dlane cez korunu žaluďa' },
        { v: 'dve_ruky_opacne', label: 'Dve ruky rotujúce opačným smerom' },
        { v: 'kratke_spodok', label: 'Krátke ťahy len na spodnej strane hriadeľa' },
        { v: 'hore_dole', label: 'Jednoduchý pohyb hore a dole po celej dĺžke' },
        { v: 'koren_spicka', label: 'Dlhý ťah od koreňa po špičku' },
        { v: 'dve_ruky', label: 'Dve ruky nad sebou alebo proti sebe' },
        { v: 'rychlo_pomaly', label: 'Striedanie rýchlych a pomalých ťahov' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_tlak', typ: 'jeden',
      text: 'Aký tlak pri handjobe mi vyhovuje',
      moznosti: [
        { v: 'lahky', label: 'Ľahký úchop a veľa kĺzania' },
        { v: 'stredny', label: 'Stredne pevný a rovnomerný' },
        { v: 'pevny', label: 'Pevný stisk' },
        { v: 'pulzy', label: 'Pulzujúce stláčanie a uvoľňovanie' },
        { v: 'striedanie', label: 'Striedanie tlaku podľa časti penisu' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_skrotum', typ: 'viac',
      text: 'Skrotum a okolie',
      moznosti: [
        { v: 'cradle', label: '„Cradle" — kolísanie' },
        { v: 'valcovanie', label: 'Jemné valcovanie semenníkov' },
        { v: 'tah_mieska', label: 'Ľahký ťah mieška' },
        { v: 'perineum', label: 'Perineum — kolmý tlak alebo krúženie palcom' },
        { v: 'hladenie', label: 'Jemné hladkanie dlaňou alebo prstami' },
        { v: 'bozky', label: 'Bozkávanie' },
        { v: 'lizanie', label: 'Lízanie semenníkov a švu mieška' },
        { v: 'sanie', label: 'Jemné sanie jedného alebo oboch semenníkov' },
        { v: 'nezapajat', label: 'Semenníky nezapájať' },
      ],
    },
    {
      druh: 'text', id: 'mnp_perineum_info', nadpis: 'Hrádza ako most k prostate', ton: 'info',
      telo:
        'Hrádza medzi mieškom a análnym otvorom sa dá stimulovať bez penetrácie. Pomalé krúženie, tlak palcom, krátke pulzy alebo pevné podržanie môžu nepriamo pôsobiť na oblasť prostaty a vrstviť sa s pohybom ruky na penise.',
    },
    {
      druh: 'otazka', id: 'mnp_perineum_techniky', typ: 'viac', inePovolene: true,
      text: 'Aké techniky na hrádzi ma lákajú',
      moznosti: [
        { v: 'kruhy', label: 'Malé krúžky končekom prsta alebo palcom' },
        { v: 'tlak', label: 'Pevný kolmý tlak' },
        { v: 'pulzy', label: 'Krátke rytmické pulzy' },
        { v: 'drzanie', label: 'Tlak a podržanie bez pohybu' },
        { v: 's_handjobom', label: 'Súčasne s handjobom' },
        { v: 's_oralom', label: 'Súčasne s orálom' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_tempo', typ: 'jeden',
      text: 'Tempo',
      moznosti: [
        { v: 'pomale', label: 'Pomalé a zmyselné' },
        { v: 'stredne', label: 'Stredne rýchle a stabilné' },
        { v: 'rychle', label: 'Rýchle a intenzívne' },
        { v: 'pulzy', label: 'Krátke pulzy' },
        { v: 'tahy', label: 'Dlhé ťahy' },
        { v: 'striedanie', label: 'Striedanie' },
      ],
    },
    { druh: 'otazka', id: 'mnp_vlhkost', typ: 'jeden', text: '„Vlhkosť"', moznosti: VLHKOST },
    {
      druh: 'otazka', id: 'mnp_predkozka', typ: 'jeden',
      text: g('Ako chcem, aby bola pri stimulácii zapojená moja predkožka?', 'Ako ma láka pracovať s partnerovou predkožkou?'),
      moznosti: [
        { v: 'klzanie', label: 'Prirodzené kĺzanie predkožky hore a dole' },
        { v: 'zalud_odkryty', label: 'Žaluď skôr odkrytý a stimulovaný priamo' },
        { v: 'okraj', label: 'Sústredenie na citlivý okraj a vnútornú stranu predkožky' },
        { v: 'striedanie', label: 'Striedanie zakrytého a odkrytého žaluďa' },
        { v: 'nemam', label: 'Táto otázka sa nás netýka alebo ju nechcem riešiť' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_pomocky', typ: 'viac', inePovolene: true,
      text: 'Ktoré pomôcky pri stimulácii penisu a okolia ma lákajú?',
      moznosti: [
        { v: 'vibrator', label: 'Vibračná pomôcka na žaluď, uzdičku alebo hriadeľ' },
        { v: 'stroker', label: 'Stroker alebo masturbačný návlek' },
        { v: 'kruzok', label: 'Penisový krúžok' },
        { v: 'vakuum', label: 'Vákuová pomôcka ako erotický prvok' },
        { v: 'analna', label: 'Análna alebo prostatická pomôcka súčasne' },
        { v: 'bez', label: 'Radšej iba ruky, ústa a telo' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_nove', typ: 'jeden',
      text: 'Ako ma láka skúšanie nových techník na penise a jeho okolí?',
      moznosti: [
        { v: 'ano', label: 'Veľmi — chcem objavovať nové zóny, úchopy a kombinácie' },
        { v: 'mozno', label: 'Možno, podľa konkrétnej techniky' },
        { v: 'osvedcene', label: 'Preferujem najmä osvedčené pohyby' },
        { v: 'partner', label: 'Láka ma, keď partnerka prinesie vlastný nápad' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_styl', typ: 'viac', inePovolene: true,
      text: 'Ktoré štýly ručnej stimulácie ma lákajú?',
      moznosti: [
        { v: 'presnost', label: 'Presná hra palcom alebo končekom prsta na uzdičke a korune' },
        { v: 'dlhe_tahy', label: 'Dlhé mokré ťahy od koreňa po špičku' },
        { v: 'corkscrew', label: 'Rotačný „corkscrew" jednou alebo dvoma rukami' },
        { v: 'predkozka', label: 'Vlna predkožky bez priameho trenia žaluďa' },
        { v: 'dlan_zalud', label: 'Rotácia dlane cez žaluď a krátke ťahy pod ním' },
        { v: 'vrstvenie', label: 'Handjob vrstvený so semenníkmi, hrádzou alebo prostatou' },
        { v: 'vedena_ruka', label: 'Partnerka vedie moju ruku alebo napodobňuje môj pohyb' },
        { v: 'vizualny', label: 'Pomalé vizuálne „uctievanie" penisu' },
      ],
    },
    {
      druh: 'text', id: 'mnp_inspiracie', nadpis: 'Inšpirácie: meniť možno viac než rýchlosť', ton: 'info',
      telo:
        'Jeden zážitok môže stáť na mikropohyboch palca na uzdičke, iný na dlhom kĺzaní celej dlane a ďalší na dvoch rukách rotujúcich proti sebe. ' +
        'Predkožka môže vytvoriť mäkkú vlnu cez žaluď; dlaň môže krúžiť po korune; druhá ruka môže držať miešok, pulzovať na hrádzi alebo pridať vibrácie. ' +
        'Rozdiel robí aj uhol ruky, plocha kontaktu, teplo, množstvo vlhkosti, stabilný rytmus, očný kontakt a to, či je dotyk presný, hravý, uctievajúci alebo intenzívny.',
    },
    {
      druh: 'otazka', id: 'mnp_edging', typ: 'jeden',
      text: 'Start-stop / edging',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'podmienky', label: 'Za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_polohy', typ: 'viac',
      text: 'Polohy',
      moznosti: [
        { v: 'stolicka', label: 'Sed na stoličke / kresle' },
        { v: 'chrbat', label: 'Ľah na chrbte' },
        { v: 'vedla', label: 'Vedľa seba (mutual)' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_finale', typ: 'jeden',
      text: 'Finále',
      moznosti: [
        { v: 'telo', label: 'Na telo' },
        { v: 'uterak', label: 'Do uteráka' },
        { v: 'usta', label: 'Do úst' },
        { v: 'nezalezi', label: 'Nezáleží' },
      ],
    },
    {
      druh: 'text', id: 'mnp_myty', nadpis: 'Mýty o penise a „správnej" technike', ton: 'info',
      telo:
        'Mýtus: všetci muži chcú čo najpevnejší stisk a najrýchlejší pohyb. Realita: citlivosť sa líši podľa miesta, vzrušenia, vlhkosti, predkožky aj dňa; niekoho berie ľahký dotyk uzdičky, iného pevný úchop hriadeľa.\n\n' +
        'Mýtus: veľkosť penisu určuje, aká vzrušujúca bude ručná alebo orálna stimulácia. Realita: žaluď, koruna, uzdička, predkožka, semenníky a hrádza ponúkajú množstvo kombinácií bez ohľadu na dĺžku.\n\n' +
        'Mýtus: partnerka by mala automaticky vedieť napodobniť pohyb, ktorým muž masturbuje. Realita: partnerský dotyk môže byť vzrušujúci práve tým, že je iný — a mužova vlastná technika je iba jedna z možností.\n\n' +
        'Mýtus: ak muž z handjobu alebo felácie nevyvrcholí, technika zlyhala. Realita: potešenie, vzrušenie a orgazmus nie sú tá istá vec; pre niekoho je ruka hlavný akt, pre iného vrstva bez potreby finále.',
    },
  ],
}

// ── Poskytovanie manuálnej stimulácie partnerovi ──────────────────────────
const RUKY_PARTNER: Blok = {
  druh: 'skupina', id: 'ruky_partner', nadpis: g('Keď rukami stimulujem partnerku', 'Keď rukami stimulujem partnera'),
  uvod: g(
    'Jej potešenie môže byť rovnako vzrušujúce ako tvoj vlastný dotyk: sleduješ pohyb panvy, meníš tlak palca na klitorise, pridávaš prsty alebo hračku a cítiš, ako sa jej telo pod tvojou rukou mení.',
    'Jeho potešenie môže byť rovnako vzrušujúce ako tvoj vlastný dotyk: cítiš zmenu tvrdosti, nájdeš presný tlak na uzdičke, pridáš druhú ruku, semenníky alebo hračku a sleduješ, ako na teba reaguje.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'rp_partner_tuzba', typ: 'jeden',
      text: g('Ako reagujem, keď partnerka túži po manuálnej stimulácii genitálií?', 'Ako reagujem, keď partner túži po manuálnej stimulácii genitálií?'),
      moznosti: [
        { v: 'centrum', label: g('Jej rozkoš pod mojou rukou je pre mňa silný erotický zážitok', 'Jeho rozkoš pod mojou rukou je pre mňa silný erotický zážitok') },
        { v: 'rad', label: g('Rád jej ju poskytujem, aj keď nemusí byť centrom môjho vzrušenia', 'Rada mu ju poskytujem, aj keď nemusí byť centrom môjho vzrušenia') },
        { v: 'zvedavy', label: g('Som zvedavý, akú techniku odo mňa naozaj chce', 'Som zvedavá, akú techniku odo mňa naozaj chce') },
        { v: 'doplnok', label: 'Vyhovuje mi skôr ako doplnok k orálu alebo penetrácii' },
        { v: 'neutral', label: 'Poskytujem ju skôr pre partnerovo potešenie než pre vlastné vzrušenie' },
        { v: 'nie', label: 'Nechcem ju poskytovať' },
      ],
    },
    {
      druh: 'otazka', id: 'rp_techniky', typ: 'viac', inePovolene: true,
      text: g('Ktoré techniky ma lákajú na partnerkinej vulve?', 'Ktoré techniky ma lákajú na partnerovom penise a okolí?'),
      moznosti: [
        { v: 'okolie', label: g('Pomalé hladenie pyskov a okolia klitorisu', 'Pomalé hladenie hriadeľa, slabín a okolia') },
        { v: 'presne', label: g('Presné kruhy alebo ťahy na klitorise', 'Presná stimulácia žaluďa a uzdičky') },
        { v: 'vnutorne', label: g('Prsty vo vagíne spolu s externou stimuláciou', 'Dve ruky, rotácia alebo zmena úchopu na hriadeli') },
        { v: 'kombinacia', label: g('Kombinovať prsty s bozkami alebo jazykom', 'Kombinovať ruku s ústami') },
        { v: 'okolie2', label: g('Tlak dlane na podbrušku, bokoch alebo stehnách', 'Stimulácia semenníkov, mieška alebo hrádze') },
        { v: 'vedenie', label: g('Nechať partnerku viesť moju ruku', 'Nechať partnera viesť moju ruku') },
      ],
    },
    {
      druh: 'otazka', id: 'rp_intenzita', typ: 'jeden',
      text: g('Akú intenzitu najradšej poskytujem partnerke?', 'Akú intenzitu najradšej poskytujem partnerovi?'),
      moznosti: [
        { v: 'jemna', label: 'Jemnú, precíznu a pomalú' },
        { v: 'stredna', label: 'Strednú a stabilnú' },
        { v: 'silna', label: 'Dôraznú, pevnú a intenzívnu' },
        { v: 'striedanie', label: g('Striedam jemnosť a silu podľa partnerkiných reakcií', 'Striedam jemnosť a silu podľa partnerových reakcií') },
      ],
    },
    {
      druh: 'otazka', id: 'rp_pomocky', typ: 'jeden',
      text: g('Ako vnímam použitie pomôcky pri stimulácii partnerky?', 'Ako vnímam použitie pomôcky pri stimulácii partnera?'),
      moznosti: [
        { v: 'ano', label: g('Áno — vibrátor alebo pomôcka presne tam, kde ju potrebuje', 'Áno — vibračná alebo masážna pomôcka podľa toho, čo mu sedí') },
        { v: 'mozno', label: 'Možno, podľa nálady a konkrétnej kombinácie' },
        { v: 'ruky_usta', label: 'Radšej iba ruky alebo ústa' },
        { v: 'partner', label: g('Pomôcku drží partnerka a ja pridávam ruky alebo ústa', 'Pomôcku drží partner a ja pridávam ruky alebo ústa') },
      ],
    },
  ],
}

// ── Chrbát ────────────────────────────────────────────────────────────────
const CHRBT: Blok = {
  druh: 'skupina', id: 'chrbat', nadpis: 'Chrbát — od upokojenia po zmyselné stopy',
  uvod: g(
    'Predstav si, že ležíš na bruchu a partnerkine dlane, pery alebo nechty putujú od šije cez lopatky až ku krížom. Chrbát môže telo upokojiť, rozpáliť aj niesť viditeľnú spomienku na intenzívnu noc.',
    'Predstav si, že ležíš na bruchu a partnerove dlane, pery alebo nechty putujú od šije cez lopatky až ku krížom. Chrbát môže telo upokojiť, rozpáliť aj niesť viditeľnú spomienku na intenzívnu noc.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'chr_techniky', typ: 'viac', inePovolene: true,
      text: 'Ktoré dotyky na chrbte ma lákajú?',
      moznosti: [
        { v: 'masaz', label: 'Pomalá uvoľňujúca masáž dlaňami' },
        { v: 'tlak', label: 'Pevný tlak palcov, dlane alebo predlaktia' },
        { v: 'nechty_jemne', label: 'Sotva cítiace prechádzanie nechtami' },
        { v: 'skrabanie', label: 'Silnejšie škrabanie, ktoré môže zanechať stopy' },
        { v: 'pery', label: 'Bozky, jazyk alebo teplý dych pozdĺž chrbtice' },
        { v: 'pierko', label: 'Pierko, štetec, vlasy alebo hodváb' },
        { v: 'teplota', label: 'Teplý olej, masážna sviečka alebo chladný kontrast' },
      ],
    },
    {
      druh: 'otazka', id: 'chr_intenzita', typ: 'jeden',
      text: 'Akú intenzitu na chrbte preferujem?',
      moznosti: [
        { v: 'jemna', label: 'Jemnú a uvoľňujúcu' },
        { v: 'stredna', label: 'Strednú — pevná masáž a ľahké nechty' },
        { v: 'silna', label: 'Silnú — výrazný tlak a škrabanie' },
        { v: 'kontrast', label: 'Striedanie mäkkých dotykov a intenzívnych stôp' },
      ],
    },
    {
      druh: 'otazka', id: 'chr_teplota', typ: 'jeden',
      text: 'Ako ma na chrbte láka teplo a chlad?',
      moznosti: [
        { v: 'chlad', label: 'Chladný dotyk alebo ľad pozdĺž chrbta' },
        { v: 'teplo', label: 'Teplý olej, dych alebo masážna sviečka' },
        { v: 'kontrast', label: 'Striedanie oboch kontrastov' },
        { v: 'neutral', label: 'Radšej neutrálna teplota kože a rúk' },
      ],
    },
    {
      druh: 'otazka', id: 'chr_poskytujem', typ: 'viac', inePovolene: true,
      text: g('Čo ma baví robiť na partnerkinom chrbte?', 'Čo ma baví robiť na partnerovom chrbte?'),
      moznosti: [
        { v: 'uvolnit', label: g('Uvoľniť ju pomalou masážou', 'Uvoľniť ho pomalou masážou') },
        { v: 'reakcie', label: g('Sledovať jej reakcie na pery, nechty a zmenu tlaku', 'Sledovať jeho reakcie na pery, nechty a zmenu tlaku') },
        { v: 'stopy', label: g('Zanechať na nej zmyselné stopy nechtov', 'Zanechať na ňom zmyselné stopy nechtov') },
        { v: 'teplota', label: 'Viesť po chrbtici teplý alebo chladný kontrast' },
        { v: 'prechod', label: 'Použiť chrbát ako pomalý prechod k zadku, bokom alebo stehnám' },
      ],
    },
    {
      druh: 'otazka', id: 'chr_partner_tuzba', typ: 'jeden',
      text: g('Ako reagujem, keď partnerka chce výraznejšiu stimuláciu chrbta?', 'Ako reagujem, keď partner chce výraznejšiu stimuláciu chrbta?'),
      moznosti: [
        { v: 'vzrusuje', label: g('Jej reakcie ma vzrušujú', 'Jeho reakcie ma vzrušujú') },
        { v: 'rad', label: g('Rád jej ju poskytujem', 'Rada mu ju poskytujem') },
        { v: 'vyber', label: 'Vyhovujú mi niektoré techniky, nie všetky' },
        { v: 'jemne', label: 'Chcem zostať iba pri jemnej verzii' },
        { v: 'nie', label: 'Nechcem ju poskytovať' },
      ],
    },
    {
      druh: 'text', id: 'chr_mytus', nadpis: 'Mýtus: chrbát je iba masážna zóna', ton: 'info',
      telo: 'Chrbát môže byť upokojujúci, ale aj výrazne erotický: pomalý dych pri uchu, nechty cez lopatky, pevný úchop krížov alebo teplotná stopa po chrbtici môžu byť samostatným centrom hry. Niekto chce relaxáciu, iný intenzitu a viditeľné stopy — jedno nie je „správnejšie“ než druhé.',
    },
  ],
}

// ── Stehná — teasing, tlak a kontrast ───────────────────────────────
const STEHNA: Blok = {
  druh: 'skupina', id: 'stehna', nadpis: 'Stehná — blízkosť, ktorá zvyšuje túžbu',
  uvod:
    'Vnútorné stehná sú silnou teasing zónou: dotyk sa môže približovať k intímnym miestam bez toho, aby na ne hneď prešiel. ' +
    'Bozky, dlaň, nechty, sanie aj hryzenie menia jemné očakávanie na intenzívnu energiu.',
  bloky: [
    {
      druh: 'text', id: 'steh_predstav',
      telo: g(
        'Predstav si pomalé bozky na vnútornej strane stehien, ktoré sa približujú a znovu vzďaľujú. Potom príde pevný tlak dlaní alebo krátke hryzenie.',
        'Predstav si pomalé bozky na vnútornej strane stehien, ktoré sa približujú a znovu vzďaľujú. Potom príde pevný tlak dlaní alebo krátke hryzenie.',
      ),
    },
    {
      druh: 'otazka', id: 'steh_techniky', typ: 'viac', inePovolene: true,
      text: g('Ako mám rád stimuláciu stehien?', 'Ako preferujem stimuláciu stehien?'),
      moznosti: [
        { v: 'hladenie', label: 'Pomalé hladenie dlaňou alebo končekmi prstov' },
        { v: 'bozky', label: 'Jemné bozky smerujúce k vnútornej strane stehien' },
        { v: 'sanie', label: 'Sanie pokožky a mokré bozky' },
        { v: 'hryzenie', label: 'Intenzívnejšie hryzenie' },
        { v: 'tlak', label: 'Pevný tlak a stláčanie dlaňami' },
        { v: 'skrabanie', label: 'Jemné až výrazné škrabanie nechtami' },
        { v: 'masaz', label: 'Hnetenie svalov a dlhé masážne ťahy' },
        { v: 'teplota', label: 'Teplý dych, olej alebo chladný kontrast' },
      ],
    },
    { druh: 'otazka', id: 'steh_techniky_ine', typ: 'text', text: 'Stimulácia stehien — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'steh_intenzita', typ: 'jeden',
      text: 'Akú intenzitu na stehnách preferujem',
      moznosti: [
        { v: 'jemna', label: 'Jemnú — bozky a ľahké hladenie' },
        { v: 'stredna', label: 'Strednú — masáž, sanie a pevnejší tlak' },
        { v: 'silna', label: 'Silnú — stisk, hryzenie a výrazné škrabanie' },
        { v: 'striedanie', label: 'Striedanie jemnej a intenzívnej energie' },
      ],
    },
    {
      druh: 'otazka', id: 'steh_kombinovanie', typ: 'jeden',
      text: 'Chcem na stehnách kombinovať viac techník',
      moznosti: [
        { v: 'ano', label: 'Áno — bozky, masáž, nechty aj tlak v jednej hre' },
        { v: 'podla_nalady', label: 'Možno, podľa nálady a intenzity' },
        { v: 'jedna', label: 'Radšej jednu techniku a stabilný rytmus' },
      ],
    },
    { druh: 'otazka', id: 'steh_kombinovanie_ine', typ: 'text', text: 'Moja ideálna kombinácia na stehnách (voliteľné):' },
    {
      druh: 'otazka', id: 'steh_teasing', typ: 'jeden',
      text: 'Ako dlho ma baví dráždenie stehien pred dotykom genitálií',
      moznosti: [
        { v: 'kratko', label: 'Krátko — pár bozkov a pokračovať' },
        { v: 'dlhsie', label: 'Dlhšie — chcem budovať očakávanie' },
        { v: 'navraty', label: 'Vracať sa k stehnám vo vlnách počas celého zážitku' },
        { v: 'samostatne', label: 'Stehná môžu byť samostatným centrom hry' },
      ],
    },
    {
      druh: 'text', id: 'steh_tipy_myty', nadpis: 'Tip a mýtus', ton: 'info',
      telo:
        'Tip: skús kontrast medzi sotva cítiacim dotykom nechtov, mokrým bozkom a pevným stiskom tesne nad kolenom; potom postupuj vyššie a znovu sa vráť. ' +
        'Mýtus: stehná sú iba cesta ku genitáliám. Realita: pre mnohých sú samostatnou erotogénnou zónou a dlhé dráždenie stehien je vzrušujúcejšie než rýchly presun k „hlavnej" stimulácii.',
    },
  ],
}

// ── Spoločné zóny ─────────────────────────────────────────────
const SPOL_ZONY: Blok = {
  druh: 'skupina', id: 'spol_zony', nadpis: 'Prsia, bradavky a ďalšie spoločné zóny',
  bloky: [
    {
      druh: 'text', id: 'sz_bradavky_uvod', nadpis: 'Prsia a bradavky — vlastný erotický jazyk', ton: 'citat',
      telo: g(
        'Predstav si partnerkine prsty, ktoré najprv obídu celý hrudník a až potom sa priblížia k bradavkám. Niekedy ťa naladí sotva cítiaci kruh, inokedy pevný stisk, zuby alebo vibrácia. Mužská hruď nie je „menej erotická“ — môže byť centrom túžby, doplnkom k inej stimulácii aj zónou, ktorú nechceš zapájať.',
        'Predstav si partnerove dlane, ktoré obídu boky pŕs, palce sa priblížia k areolám a jazyk zmení jemný dotyk na silnú vlnu vzrušenia. Veľkosť ani tvar neurčujú citlivosť. Prsia môžu byť centrom rozkoše, cestou k orgazmu, doplnkom k inej stimulácii aj zónou, ktorú chceš nechať nedotknutú.',
      ),
    },
    {
      druh: 'otazka', id: 'sz_bradavky_postoj', typ: 'jeden',
      text: 'Akú úlohu má stimulácia hrudníka, pŕs alebo bradaviek v mojej rozkoši?',
      moznosti: [
        { v: 'centrum', label: 'Je to jedno z hlavných centier môjho vzrušenia' },
        { v: 'zosilnuje', label: 'Výrazne zosilňuje inú stimuláciu' },
        { v: 'predohra', label: 'Mám ju rád najmä ako naladenie alebo predohru' },
        { v: 'zvedavost', label: g('Som zvedavý, ale ešte nepoznám svoju citlivosť', 'Som zvedavá, ale ešte nepoznám svoju citlivosť') },
        { v: 'neutral', label: 'Je to pre mňa skôr neutrálna zóna' },
        { v: 'neprijemne', label: 'Dotyky tejto oblasti ma rušia alebo sú mi nepríjemné' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_mapa', typ: 'viac', inePovolene: true,
      text: g('Ktoré časti môjho hrudníka reagujú eroticky?', 'Ktoré časti mojich pŕs a hrudníka reagujú eroticky?'),
      moznosti: [
        { v: 'cely_hrudnik', label: g('Celý hrudník a prsné svaly', 'Celé prsia a hrudník') },
        { v: 'boky', label: g('Boky hrudníka a priestor pod prsnými svalmi', 'Boky pŕs a záhyb pod nimi') },
        { v: 'areola', label: 'Areoly okolo bradaviek' },
        { v: 'bradavka', label: 'Samotné bradavky' },
        { v: 'jedna_strana', label: 'Jedna strana výraznejšie než druhá' },
        { v: 'okolie', label: 'Koža tesne okolo, ale nie priamy dotyk bradavky' },
        { v: 'ziadna', label: 'Žiadna časť tejto oblasti nie je pre mňa erotická' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky', typ: 'viac',
      text: 'Bradavky',
      moznosti: [
        { v: 'hladenie', label: 'Hladenie a krúženie končekmi prstov' },
        { v: 'lick', label: 'Lízanie' },
        { v: 'flick', label: 'Šľahanie jazykom / prstom' },
        { v: 'sanie', label: 'Sanie perami' },
        { v: 'roll', label: 'Rolovanie medzi prstami' },
        { v: 'pinch', label: 'Štípanie (nastaviteľný tlak / čas)' },
        { v: 'tapkanie', label: 'Jemné alebo rytmické ťapkanie' },
        { v: 'twist_pull', label: 'Jemné pootočenie a potiahnutie' },
        { v: 'hryzenie', label: 'Hryzenie — jemné až intenzívne' },
        { v: 'vibracia', label: 'Vibrácia alebo pulzujúca pomôcka' },
        { v: 'teplota', label: 'Párovanie s teplotou (ľad / teplý olej)' },
        { v: 'textury', label: 'Textúry látok' },
        { v: 'striedanie', label: 'Striedanie jazyka, pier, prstov a teploty' },
        { v: 'nie', label: 'Stimulácia tejto oblasti ma neláka' },
      ],
    },
    { druh: 'otazka', id: 'sz_bradavky_ine', typ: 'text', text: 'Stimulácia pŕs alebo bradaviek — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'sz_bradavky_prsia_tlak', typ: 'jeden',
      text: g('Aký tlak na celom hrudníku mi vyhovuje?', 'Aký tlak pri hladení a stláčaní celých pŕs mi vyhovuje?'),
      moznosti: [
        { v: 'sotva', label: 'Sotva cítiace hladenie končekmi prstov' },
        { v: 'jemny', label: 'Jemné hladenie a mäkká masáž' },
        { v: 'stredny', label: 'Stredne pevné hnetenie a stláčanie' },
        { v: 'silny', label: 'Silný stisk celou dlaňou' },
        { v: 'striedanie', label: 'Striedanie nežnosti a intenzívneho stisku' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_prsty', typ: 'jeden',
      text: 'Ako mi vyhovuje krúženie prstami okolo bradaviek?',
      moznosti: [
        { v: 'pomale', label: 'Jemné a pomalé kruhy' },
        { v: 'stredne', label: 'Stredná intenzita a stabilný rytmus' },
        { v: 'rychle', label: 'Rýchle a intenzívne krúženie' },
        { v: 'nalada', label: 'Meniť podľa nálady a vzrušenia' },
        { v: 'nie', label: 'Krúženie mi nesedí' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_stlacanie', typ: 'jeden',
      text: 'Ako mi vyhovuje stláčanie alebo rolovanie bradaviek medzi prstami?',
      moznosti: [
        { v: 'jemne', label: 'Jemné stlačenie alebo rolovanie' },
        { v: 'stredne', label: 'Stredná a rovnomerná intenzita' },
        { v: 'silne', label: 'Silné stlačenie a výrazný tlak' },
        { v: 'kontrast', label: 'Kombinácia jemných a silných pulzov' },
        { v: 'nie', label: 'Stláčanie mi nesedí' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_tahanie', typ: 'jeden',
      text: 'Ako mi vyhovuje ťahanie alebo pootočenie bradaviek?',
      moznosti: [
        { v: 'kratke', label: 'Jemné a krátke potiahnutie' },
        { v: 'stredne', label: 'Stredná intenzita a dlhšie podržanie' },
        { v: 'silne', label: 'Silné ťahanie alebo pootočenie' },
        { v: 'nalada', label: 'Iba v konkrétnej nálade alebo intenzívnej hre' },
        { v: 'nie', label: 'Ťahanie ani pootočenie mi nesedí' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_jazyk', typ: 'jeden',
      text: 'Aký pohyb jazyka ma najviac vzrušuje?',
      moznosti: [
        { v: 'pomaly', label: 'Pomalé krúženie okolo areoly' },
        { v: 'spicka', label: 'Rýchle presné pohyby špičkou jazyka' },
        { v: 'cela_plocha', label: 'Dlhé lízanie celou plochou jazyka' },
        { v: 'striedanie', label: 'Striedanie pomalého a intenzívneho pohybu' },
        { v: 'nie', label: 'Jazyk mi na tejto oblasti nesedí' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_sanie', typ: 'jeden',
      text: 'Aké sanie bradaviek mi vyhovuje?',
      moznosti: [
        { v: 'jemne', label: 'Jemné sanie bez zubov' },
        { v: 'stredne', label: 'Stredný podtlak a stabilné držanie' },
        { v: 'silne', label: 'Silný podtlak a intenzívne sanie' },
        { v: 'hryzenie', label: 'Sanie striedané s jemným hryzením' },
        { v: 'nie', label: 'Sanie mi nesedí' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_hryzenie', typ: 'jeden',
      text: 'Aká intenzita hryzenia bradaviek ma láka?',
      moznosti: [
        { v: 'jemne', label: 'Jemné zachytenie zubami' },
        { v: 'stredne', label: 'Stredné hryzenie s jasným tlakom' },
        { v: 'silne', label: 'Intenzívne hryzenie ako ostrý erotický vnem' },
        { v: 'nalada', label: 'Iba niekedy, podľa vzrušenia' },
        { v: 'nie', label: 'Hryzenie ma neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_citlivost', typ: 'jeden',
      text: 'Akú citlivosť bradaviek u seba vnímam',
      moznosti: [
        { v: 'velmi_citlive', label: 'Veľmi citlivé — najviac mi sedí jemnosť' },
        { v: 'stredne', label: 'Stredne citlivé — baví ma široké rozpätie' },
        { v: 'silny_tlak', label: 'Potrebujem silnejší tlak alebo intenzitu' },
        { v: 'rozdielne', label: 'Každá strana reaguje inak' },
        { v: 'neutralne', label: 'Skôr neutrálna zóna' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_nastroj', typ: 'jeden',
      text: 'Čo mi pri stimulácii bradaviek vyhovuje najviac',
      moznosti: [
        { v: 'jazyk_pery', label: 'Jazyk a pery' },
        { v: 'prsty', label: 'Prsty a dlaň' },
        { v: 'pomocka', label: 'Vibrácia alebo iná pomôcka' },
        { v: 'mix', label: 'Kombinácia a striedanie' },
        { v: 'nelaka', label: 'Táto stimulácia ma neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_pomocky', typ: 'viac', inePovolene: true,
      text: 'Ktoré pomôcky alebo senzorické vrstvy ma na tejto oblasti lákajú?',
      moznosti: [
        { v: 'vibrator', label: 'Vibrátor alebo pulzujúca pomôcka' },
        { v: 'prisavky', label: 'Prísavky alebo vákuová pomôcka na bradavky' },
        { v: 'svorky', label: 'Svorky na bradavky ako intenzívnejšia hra' },
        { v: 'olej', label: 'Masážny olej alebo krém na plynulé kĺzanie' },
        { v: 'teplo', label: 'Teplý dych, ruky alebo olej' },
        { v: 'chlad', label: 'Chladný kontrast alebo ľad' },
        { v: 'textilie', label: 'Hodváb, pierko, štetec alebo iná textúra' },
        { v: 'ruky_usta', label: 'Žiadne pomôcky — iba ruky a ústa' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_kedy', typ: 'viac', inePovolene: true,
      text: 'Kedy mi stimulácia tejto oblasti sedí najviac?',
      moznosti: [
        { v: 'naladenie', label: 'Na začiatku ako pomalé naladenie' },
        { v: 'cele', label: 'Priebežne počas celého sexu' },
        { v: 's_genitaliami', label: 'Súčasne so stimuláciou genitálií' },
        { v: 'pred_orgazmom', label: 'Najmä tesne pred orgazmom' },
        { v: 'samostatne', label: 'Ako samostatné centrum hry bez iného cieľa' },
        { v: 'nie_po', label: 'Nie po orgazme, keď je dotyk príliš intenzívny' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_kombinacie', typ: 'viac', inePovolene: true,
      text: 'S čím chcem stimuláciu hrudníka alebo pŕs kombinovať?',
      moznosti: [
        { v: 'bozky', label: 'Bozky na ústa, krk alebo telo' },
        { v: 'manual_genital', label: 'Manuálna stimulácia genitálií' },
        { v: 'oral_genital', label: 'Orálna stimulácia genitálií' },
        { v: 'penetracia', label: 'Penetrácia' },
        { v: 'masturbacia', label: 'Moja vlastná masturbácia' },
        { v: 'edging', label: 'Edging a budovanie vzrušenia vo vlnách' },
        { v: 'masaz', label: 'Masáž hrudníka, ramien a celého tela' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_orgazmus', typ: 'jeden',
      text: 'Akú úlohu môže mať táto stimulácia pri mojom orgazme?',
      moznosti: [
        { v: 'samostatne', label: 'Dokáže ma priviesť k orgazmu aj sama' },
        { v: 'takmer', label: 'Vie ma dostať veľmi blízko, ale potrebujem aj inú stimuláciu' },
        { v: 'zosilnuje', label: 'Výrazne zosilňuje orgazmus z inej stimulácie' },
        { v: 'vzrusenie', label: 'Vzrušuje ma, ale orgazmus zásadne nemení' },
        { v: 'neviem', label: 'Zatiaľ neviem' },
        { v: 'nie', label: 'Pri orgazme ju nechcem' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_premenlivost', typ: 'viac', inePovolene: true,
      text: 'Kedy sa moja citlivosť výrazne mení?',
      moznosti: [
        { v: 'vzrusenie', label: 'S rastúcim vzrušením' },
        { v: 'den', label: 'Zo dňa na deň bez jasného vzorca' },
        { v: 'hormony', label: g('Pri hormonálnych alebo liekových zmenách', 'Počas cyklu alebo pri iných hormonálnych zmenách') },
        { v: 'jazvy', label: 'Po operácii, piercingu alebo pri jazvách' },
        { v: 'nemeni', label: 'Je pomerne stabilná' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_poskytujem', typ: 'viac', inePovolene: true,
      text: g('Čo ma baví robiť na partnerkiných prsiach a bradavkách?', 'Čo ma baví robiť na partnerovom hrudníku a bradavkách?'),
      moznosti: [
        { v: 'objavovat', label: 'Pomaly objavovať rozdiely medzi celou oblasťou, areolou a bradavkou' },
        { v: 'ruky', label: 'Masírovať, stláčať a meniť tlak prstami alebo dlaňou' },
        { v: 'usta', label: 'Bozkávať, lízať a sať' },
        { v: 'ostre', label: 'Pridať hryzenie, ťahanie alebo ostrý kontrast' },
        { v: 'pomocky', label: 'Používať vibráciu, prísavky, teplotu alebo textúry' },
        { v: 'sledovat', label: g('Sledovať partnerkine reakcie a nájsť jej presný rytmus', 'Sledovať partnerove reakcie a nájsť jeho presný rytmus') },
        { v: 'nelaka', label: 'Poskytovanie tejto stimulácie ma veľmi neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_partner_tuzba', typ: 'jeden',
      text: g('Ako reagujem, keď partnerka túži po stimulácii pŕs alebo bradaviek?', 'Ako reagujem, keď partner túži po stimulácii hrudníka alebo bradaviek?'),
      moznosti: [
        { v: 'vzrusuje', label: g('Jej túžba a reakcie ma silno vzrušujú', 'Jeho túžba a reakcie ma silno vzrušujú') },
        { v: 'rad', label: g('Rád jej ju poskytujem, aj keď to nie je moja vlastná hlavná téma', 'Rada mu ju poskytujem, aj keď to nie je moja vlastná hlavná téma') },
        { v: 'zvedavy', label: g('Som zvedavý, čo presne sa jej páči', 'Som zvedavá, čo presne sa mu páči') },
        { v: 'jemne', label: 'Som otvorený iba jemnejšej verzii' },
        { v: 'neutral', label: g('Jej túžbe rozumiem, ale mňa osobne nevzrušuje', 'Jeho túžbe rozumiem, ale mňa osobne nevzrušuje') },
        { v: 'nie', label: 'Nechcem túto stimuláciu poskytovať' },
      ],
    },
    {
      druh: 'text', id: 'sz_bradavky_tipy', nadpis: 'Bradavky: experiment a mýtus', ton: 'info',
      telo:
        'Presná dotyková mapa môže porovnať celú plochu, okolie areoly a samotnú bradavku; prsty verzus jazyk; pomalý verzus rýchly pohyb; ľavú verzus pravú stranu. Rovnaký človek môže chcieť jemnosť na začiatku a silný tlak pri vysokom vzrušení.\n\n' +
        'Mýtus: bradavky sú erotickou zónou iba u žien. Realita: výskum aj skúsenosti ukazujú širokú škálu u oboch pohlaví — od silného vzrušenia až po úplne neutrálnu alebo nepríjemnú zónu.\n\n' +
        'Mýtus: väčšie prsia sú citlivejšie a ľahšie privedú k orgazmu. Realita: veľkosť ani tvar nepredpovedajú individuálnu citlivosť.\n\n' +
        'Mýtus: muž, ktorého vzrušujú bradavky, je menej mužný. Realita: mužské bradavky majú erotickú inerváciu a ich citlivosť nič nehovorí o mužnosti ani orientácii.\n\n' +
        'Mýtus: ak ma táto zóna nevzrušuje, partner robí niečo zle. Realita: môže byť erotická, neutrálna aj averzívna; niekedy rozhoduje technika a inokedy jednoducho nie je zdrojom potešenia.',
    },
    {
      druh: 'otazka', id: 'sz_zadok', typ: 'viac',
      text: 'Zadok (bez penetrácie)',
      moznosti: [
        { v: 'hladenie', label: 'Jemné hladenie / masáž' },
        { v: 'skrabkanie', label: 'Škrabkanie' },
        { v: 'placanie', label: 'Hravé plácanie (1–3)' },
      ],
    },
    p('sz_stehna', 'Pomalé približovanie k genitáliám („teasing"), vlnenie tlakom dlane cez panvu'),
    {
      druh: 'otazka', id: 'sz_chodidla', typ: 'viac',
      text: 'Chodidlá a prsty',
      moznosti: [
        { v: 'masaz', label: 'Masáž' },
        { v: 'stlacanie', label: 'Stláčanie' },
        { v: 'skrabkanie', label: 'Jemné škrabkanie' },
        { v: 'doplnky', label: 'Senzorické doplnky (štetec, hodváb)' },
      ],
    },
    { druh: 'otazka', id: 'sz_vynechat', typ: 'text', text: 'Ktoré zóny určite vynechať:' },
  ],
}

// ── Tempo, rytmus a edging ───────────────────────────────────
const TEMPO: Blok = {
  druh: 'skupina', id: 'tempo', nadpis: 'Tempo, rytmus a edging',
  bloky: [
    {
      druh: 'text', id: 'tempo_uvod', nadpis: 'Napätie nemusí rásť rovnou čiarou', ton: 'info',
      telo:
        'Niekoho vzrušuje plynulé zrýchľovanie, iného návraty od intenzity k jemnosti, dlhé držanie tesne pod vrcholom alebo úplné zastavenie, pri ktorom zostane iba dych a očakávanie. Edging nie je pokazený orgazmus ani skúška výdrže: môže byť samostatnou hrou, spôsobom, ako zosilniť vnímanie tela, alebo spoločným experimentom bez povinného finále.',
    },
    {
      druh: 'otazka', id: 'tempo_co_laka', typ: 'viac', inePovolene: true,
      text: 'Ktoré podoby práce s napätím ma lákajú',
      moznosti: [
        { v: 'plynule', label: 'Plynulo pridávať bez prestávok až k vrcholu' },
        { v: 'vlny', label: 'Opakované vlny — zosilniť, ubrať a znovu sa vrátiť' },
        { v: 'tesne', label: 'Držať ma dlhšie tesne pod vrcholom' },
        { v: 'stop_start', label: 'Úplne zastaviť a po chvíli začať inak' },
        { v: 'zmena_miesta', label: 'Pri vysokej intenzite prejsť na inú časť tela' },
        { v: 'bez_finale', label: 'Skončiť príjemne aj bez orgazmu a nechať napätie doznieť' },
        { v: 'prekvapenie', label: 'Nevedieť vopred, koľko vĺn alebo či príde finále' },
      ],
    },
    {
      druh: 'otazka', id: 'tempo_kto_vedie', typ: 'viac',
      text: 'Kto má pri vlnách určovať tempo',
      moznosti: [
        { v: 'ja', label: 'Ja podľa vlastného tela' },
        { v: 'partner', label: g('Partnerka podľa mojich reakcií', 'Partner podľa mojich reakcií') },
        { v: 'striedat', label: 'Striedať vedenie počas jedného zážitku' },
        { v: 'casovac', label: 'Nechať rytmus určovať hudbou alebo časovačom' },
        { v: 'nahoda', label: 'Pridať hravú náhodu — karta, kocka alebo nečakaný pokyn' },
      ],
    },
    p('tempo_vlny', 'Budovanie vĺn — pomalý nábeh → držanie napätia → útlm → nový nábeh'),
    {
      druh: 'otazka', id: 'tempo_startstop', typ: 'jeden',
      text: 'Start-stop (krátke pauzy pri 7–8/10 vzrušenia)',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'podmienky', label: 'Za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    p('tempo_zmena_vzorca', 'Prepnúť vzorec pohybu / úchop v „žltých" zónach vzrušenia'),
    {
      druh: 'otazka', id: 'tempo_pauza', typ: 'viac', inePovolene: true,
      text: 'Čo má zostať počas pauzy, aby napätie nezmizlo',
      moznosti: [
        { v: 'dych', label: 'Teplý dych tesne pri koži' },
        { v: 'pohlad', label: 'Očný kontakt alebo pohľad na telo' },
        { v: 'slova', label: 'Šepot, opis pokračovania alebo pokyn čakať' },
        { v: 'tlak', label: 'Nehybný tlak dlane alebo hračky bez pohybu' },
        { v: 'mimo_zony', label: 'Dotyky inde — krk, bradavky, stehná alebo chodidlá' },
        { v: 'nic', label: 'Úplné odtiahnutie a čisté očakávanie' },
      ],
    },
    {
      druh: 'otazka', id: 'tempo_pocet_vln', typ: 'jeden',
      text: 'Koľko návratov tesne k vrcholu mi znie eroticky',
      moznosti: [
        { v: 'jedna', label: 'Jeden — krátke oddialenie' },
        { v: 'dve_tri', label: 'Dva až tri — jasne vnímateľné vlny' },
        { v: 'vela', label: 'Viac vĺn a dlhé budovanie' },
        { v: 'bez_poctu', label: 'Nechcem počítať, chcem sa riadiť pocitom' },
        { v: 'nelaka', label: 'Odďaľovanie ma neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'tempo_inspiracie', typ: 'viac', inePovolene: true,
      text: 'Ktoré malé experimenty by som chcel vyskúšať',
      moznosti: [
        { v: 'tri_vlny', label: 'Tri krátke vlny rukou alebo ústami, zakaždým s inou pauzou' },
        { v: 'cele_telo', label: 'Po každom priblížení presunúť pozornosť na inú zónu tela' },
        { v: 'zmysly', label: 'Spojiť vlny so zaviazanými očami, hlasom, hudbou alebo teplotným kontrastom' },
        { v: 'poloha', label: 'Skúsiť polohu, v ktorej ľahko ukážem tempo pohybom panvy' },
        { v: 'cez_den', label: 'Budovať očakávanie správami a krátkymi dotykmi už počas dňa' },
        { v: 'len_teasing', label: 'Dohodnúť si stretnutie venované iba teasingu bez povinného finále' },
      ],
    },
    {
      druh: 'otazka', id: 'tempo_signaly', typ: 'viac',
      text: 'Signály počas hry',
      moznosti: [
        { v: 'dych', label: 'Dýchanie' },
        { v: 'pridaj', label: '„Pridaj / uber"' },
        { v: 'slova', label: 'Krátke kľúčové slová' },
        { v: 'ruka', label: g('Položiť ruku na partnerkinu ruku a viesť ju', 'Položiť ruku na partnerovu ruku a viesť ju') },
        { v: 'panva', label: 'Pohybom panvy ukázať priblíženie alebo odstup' },
      ],
    },
    { druh: 'otazka', id: 'tempo_zona', typ: 'text', text: 'Ako na mojom tele spoznať „ešte pokračuj“, „uber“ a „už nemen nič“:' },
    {
      druh: 'otazka', id: 'tempo_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku vzrušuje viesť ma vo vlnách alebo mi oddialiť orgazmus', 'Keď partnera vzrušuje viesť ma vo vlnách alebo mi oddialiť orgazmus'),
      moznosti: [
        { v: 'silno', label: g('Jej potešenie z vedenia ma vzrušuje ešte viac', 'Jeho potešenie z vedenia ma vzrušuje ešte viac') },
        { v: 'skusit', label: g('Rád to skúsim, ak sa budeme učiť z mojich reakcií', 'Rada to skúsim, ak sa budeme učiť z mojich reakcií') },
        { v: 'striedat', label: 'Láka ma to iba vtedy, keď sa vo vedení striedame' },
        { v: 'fantazia', label: 'Páči sa mi to skôr ako fantázia než pravidelná prax' },
        { v: 'nie', label: 'Pri vzrušení nechcem odovzdať kontrolu nad tempom' },
      ],
    },
    {
      druh: 'text', id: 'tempo_myty', nadpis: 'Mýty, ktoré zbytočne kazia hru', ton: 'info',
      telo:
        'Mýtus: čím viac oddialení, tým lepší výsledok. Realita: niekomu stačí jediná krátka pauza a priveľa návratov môže citlivosť alebo chuť oslabiť. Mýtus: edging musí skončiť silným orgazmom. Realita: pre časť ľudí je najvzrušujúcejšie práve napätie, vedenie a dlhé vnímanie tela — finále je možnosť, nie meradlo úspechu.',
    },
  ],
}

// ── Celotelová mapa dotykov ─────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „5) Zónové mapy tela" — chýbajúci
// systematický nástroj na zmapovanie celého tela, nie len jednotlivých zón.
const CELOTELOVA_MAPA: Blok = {
  druh: 'skupina', id: 'celotelova_mapa', nadpis: 'Celotelová mapa dotykov',
  bloky: [
    {
      druh: 'text', id: 'map_info', ton: 'info',
      telo: 'Rýchla mapa tela rozlišuje erotické, neutrálne a premenlivo citlivé zóny. Pomáha odhaliť aj miesta mimo genitálií, ktoré bývajú prehliadané.',
    },
    { druh: 'otazka', id: 'map_eroticke', typ: 'text', text: '5 zón, ktoré sú pre mňa najviac erotické:' },
    { druh: 'otazka', id: 'map_neutralne', typ: 'text', text: '5 zón, ktoré sú príjemné ako blízkosť, ale sex nespúšťajú:' },
    { druh: 'otazka', id: 'map_citlive', typ: 'text', text: '5 zón, ktoré sú citlivé len niekedy (po športe, po sprche, pri únave, po orgazme) — a kedy presne:' },
    { druh: 'otazka', id: 'map_nikdy', typ: 'text', text: g('3 zóny, ktoré ma zvyčajne nechávajú chladným:', '3 zóny, ktoré ma zvyčajne nechávajú chladnou:') },
    { druh: 'otazka', id: 'map_booster', typ: 'text', text: 'Top 3 miesta mimo genitálií, ktoré ma najrýchlejšie vzrušia:' },
    {
      druh: 'otazka', id: 'map_signaly_prilis', typ: 'viac',
      text: 'Ako telo najčastejšie ukazuje, že chce zmenu rytmu alebo intenzity',
      moznosti: [
        { v: 'dych', label: 'Zmenou dychu' },
        { v: 'napatie', label: 'Napätím alebo uvoľnením svalov' },
        { v: 'pohyb_panvy', label: 'Pohybom panvy' },
        { v: 'pritiahnutie', label: 'Pritiahnutím bližšie' },
        { v: 'vedenie_ruky', label: 'Vedením partnerovej ruky' },
        { v: 'radsej_slovo', label: 'Najradšej to poviem priamo' },
      ],
    },
  ],
}

// ── Senzorické doplnky ───────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Senzorické doplnky',
  bloky: [
    {
      druh: 'otazka', id: 'sen_textury', typ: 'viac',
      text: 'Senzorické doplnky',
      moznosti: [
        { v: 'hodvab', label: 'Hodváb' },
        { v: 'pierko', label: 'Pierko' },
        { v: 'koza', label: 'Koža' },
        { v: 'svieca', label: 'Masážne sviečky' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_teplota', typ: 'viac',
      text: 'Teplota',
      moznosti: [
        { v: 'lad', label: 'Ľad' },
        { v: 'teple_ruky', label: 'Teplé ruky' },
        { v: 'oleje', label: 'Oleje' },
      ],
    },
    { druh: 'otazka', id: 'sen_teplota_zony', typ: 'text', text: 'Teplotné hry — kde na tele áno / nie:' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'Senzorické kombinácie, ktoré ma lákajú najviac:' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: g('Kombinácie, ktoré by som skúsil podľa nálady:', 'Kombinácie, ktoré by som skúsila podľa nálady:') },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: g('Textúry alebo teploty, ktoré ma skôr nechávajú chladným:', 'Textúry alebo teploty, ktoré ma skôr nechávajú chladnou:') },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Môj vlastný ideálny senzorický mix (1–3 vety):' },
  ],
}

export const BOZKY_DOTYKY: TemaObsah = {
  slug: 'bozky/bozky',
  nadpis: 'Bozky, dotyky a manuálna stimulácia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Od jemných bozkov po dravé dotyky',
      telo:
        'Bozky, dotyky a ruky sú základ, na ktorom stojí zvyšok. Vysoká variabilita a jemná kontrola intenzity — ' +
        'od jemného „motýlieho" bozku po pevný úchop hlavy, od pierka po výrazný stisk.',
    },
    {
      druh: 'text', id: 'ramec_ruk', nadpis: 'Technika rúk', ton: 'info',
      telo:
        'Vlhkosť mení charakter pohybu: nasucho vzniká viac trenia, sliny dávajú krátke kĺzanie a lubrikant podporuje dlhšie plynulé ťahy. ' +
        'Teplé dlane, olej, ľad alebo textília pridávajú ďalšiu vrstvu kontrastu.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Čo z tejto oblasti chceš preskúmať?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'bozky', label: 'Bozky (ústa, krk, telo, francúzske)' },
        { v: 'dotyky', label: 'Dotyky a maznanie' },
        { v: 'bozk_vedenie', label: 'Bozk ako vedenie / dominancia' },
        { v: 'mvn', label: 'Manuálna stimulácia — vulva a vagína' },
        { v: 'mnp', label: 'Manuálna stimulácia — penis a skrotum' },
        { v: 'ruky_partner', label: g('Manuálna stimulácia partnerky — čo jej rád poskytujem', 'Manuálna stimulácia partnera — čo mu rada poskytujem') },
        { v: 'chrbat', label: 'Chrbát — masáž, nechty, teplota a intenzita' },
        { v: 'spol_zony', label: 'Prsia, bradavky a ďalšie spoločné zóny' },
      ],
    },
    BOZKY_USTA,
    BOZKY_TELO,
    BOZKY_TIPY,
    BOZK_VEDENIE,
    DOTYKY,
    MVN,
    MNP,
    RUKY_PARTNER,
    RUKY_RITUALY,
    CHRBT,
    STEHNA,
    SPOL_ZONY,
    CELOTELOVA_MAPA,
    TEMPO,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zvýraznia zhodné zóny, techniky a intenzitu dotyku, ktoré môžete ďalej preskúmať.',
    },
  ],
}
