import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Trans žena — žena s penisom — modul H9.
// Na žiadosť používateľa (2026-09-30). Plne personalizované: muž (partnerka)
// / žena (partner). Dve dimenzie: (1) moja vlastná túžba, (2) môj postoj,
// keď to vzrušuje partnera/partnerku. Pôvodné ID trans_frekvencia /
// trans_realizacia z fantazie.ts zachované.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už som to zažil a chcem znova', 'Už som to zažila a chcem znova') },
  { v: 'tuzim', label: 'Túžim to skúsiť' },
  { v: 'fantazia', label: 'Vzrušuje ma to len ako fantázia' },
  { v: 'ak_partner', label: g('Rád, ak by to chcela moja partnerka', 'Rada, ak by to chcel môj partner') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'jeden', text, moznosti: POSTOJ,
})
const M = { pohlavie: 'm' as const }
const Z = { pohlavie: 'z' as const }
const pm = (id: string, text: string): Blok => ({ ...p(id, text), podmienka: M })
const pz = (id: string, text: string): Blok => ({ ...p(id, text), podmienka: Z })

// ── Moja predstava ──────────────────────────────────────────────────
const ROVINA: Blok = {
  druh: 'skupina', id: 'rovina', nadpis: 'Moja predstava',
  bloky: [
    {
      druh: 'otazka', id: 'trans_frekvencia', typ: 'jeden',
      text: g(
        'Ako často ma napadne predstava sexu s trans ženou',
        'Ako často ma napadne predstava trans ženy — so mnou alebo s mojím partnerom',
      ),
      moznosti: [
        { v: 'nikdy', label: 'Nikdy' },
        { v: 'zriedka', label: 'Zriedka' },
        { v: 'obcas', label: 'Občas' },
        { v: 'casto', label: 'Často' },
        { v: 'velmi_casto', label: 'Veľmi často — patrí k mojim top fantáziám' },
      ],
    },
    {
      druh: 'otazka', id: 'trans_realizacia', typ: 'jeden',
      text: g('Chcel by som to niekedy zažiť naozaj?', 'Chcela by som to niekedy zažiť naozaj?'),
      moznosti: [
        { v: 'len_fantazia', label: 'Nie, nech ostane fantáziou' },
        { v: 'talk', label: g('Len v rozprávaní s partnerkou počas sexu', 'Len v rozprávaní s partnerom počas sexu') },
        { v: 'za_podmienok', label: 'Áno, za určitých podmienok' },
        { v: 'ano', label: 'Áno, naozaj' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_kde', typ: 'viac', inePovolene: true,
      text: 'Kde sa to u mňa objavuje',
      moznosti: [
        { v: 'myslienky', label: 'V myšlienkach a pri masturbácii' },
        { v: 'porno', label: 'Pozerám porno s trans ženami' },
        { v: 'anime', label: 'Futanari, anime, kreslené, AI' },
        { v: 'chat', label: 'Chat, sexting, videohovor' },
        { v: 'stretnutie_samo', label: g('Stretnutie s trans ženou bez partnerky', 'Stretnutie s trans ženou bez partnera') },
        { v: 'trojka', label: g('Trojka: ja, moja partnerka a trans žena', 'Trojka: ja, môj partner a trans žena') },
      ],
    },
    {
      druh: 'otazka', id: 'tr_skusenost', typ: 'jeden',
      text: 'Moja skúsenosť s trans ženou',
      moznosti: [
        { v: 'ziadna', label: 'Žiadna' },
        { v: 'online', label: 'Len online' },
        { v: 'raz', label: 'Raz naživo' },
        { v: 'viackrat', label: 'Viackrát naživo' },
      ],
    },
  ],
}

// ── Čo ma priťahuje ─────────────────────────────────────────────────
const PRITAHUJE: Blok = {
  druh: 'skupina', id: 'pritahuje', nadpis: 'Čo ma na tom vzrušuje',
  bloky: [
    {
      druh: 'otazka', id: 'tr_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma najviac vzrušuje',
      moznosti: [
        { v: 'kombinacia', label: 'Ženské telo, prsia a penis naraz' },
        { v: 'zenskost', label: 'Jej ženskosť — tvár, vlasy, oblečenie, pohyby' },
        { v: 'penis', label: 'Jej penis — vidieť ho, dotýkať sa ho, ochutnať ho' },
        { v: 'erekcia', label: 'Vidieť jej vzrušenie — erekciu, ejakuláciu' },
        { v: 'aktivna', label: g('Že ma môže penetrovať', 'Že ma môže penetrovať žena') },
        { v: 'tabu', label: 'Zakázanosť a tabu' },
        { v: 'bez_muza', label: g('Zažiť penis bez toho, aby to bol muž', 'Zažiť ženu a pritom penis') },
        { v: 'dominancia', label: 'Dominantná trans žena' },
        { v: 'jemnost', label: 'Jemná, poddajná trans žena' },
        { v: 'pozerat_partnera', label: g('Pozerať sa na ňu s mojou partnerkou', 'Pozerať sa na ňu s mojím partnerom') },
      ],
    },
  ],
}

// ── Čo by som s ňou chcel/a robiť ─────────────────────────────────────
const PRAKTIKY: Blok = {
  druh: 'skupina', id: 'praktiky', nadpis: g('Čo by som s ňou chcel robiť', 'Čo by som s ňou chcela robiť ja'),
  uvod: 'Každá položka zvlášť — aj keď je to zatiaľ len predstava.',
  bloky: [
    p('tr_bozky', 'Bozkávať sa s ňou'),
    p('tr_prsia', 'Hladkať a bozkávať jej prsia'),
    p('tr_dotyk_penis', 'Dotýkať sa jej penisu, masturbovať ju'),
    pm('tr_ona_mna', 'Aby ma rukou masturbovala ona'),
    pz('tr_ona_mna', 'Aby ma prstami hladila a dráždila ona'),
    p('tr_oral_dat', 'Dávať jej orál'),
    p('tr_oral_prijat', 'Prijímať od nej orál'),
    p('tr_69', '69 s ňou'),
    pm('tr_trenie', 'Trenie našich penisov o seba'),
    pz('tr_trenie', 'Trieť sa o ňu, jej penis o moju vulvu'),
    pm('tr_penetrovat', 'Análne ju penetrovať'),
    pz('tr_penetrovat', 'Penetrovať ju strap-onom'),
    pm('tr_byt_penetrovany', 'Byť ňou análne penetrovaný'),
    pz('tr_byt_penetrovany', 'Byť ňou penetrovaná vaginálne'),
    pz('tr_byt_penetrovana_anal', 'Byť ňou penetrovaná análne'),
    p('tr_ejakulacia', 'Aby sa udelala na mňa'),
    p('tr_prehltnut', 'Prehltnúť jej spermu'),
    p('tr_dominuje', 'Aby ma ovládala'),
    p('tr_dominujem', 'Ovládať ju'),
    {
      druh: 'otazka', id: 'tr_rola', typ: 'jeden',
      text: 'Ktorá rola ma láka',
      moznosti: [
        { v: 'top', label: 'Ja penetrujem ju' },
        { v: 'bottom', label: 'Ona penetruje mňa' },
        { v: 'obe', label: 'Oboje, striedanie' },
        { v: 'bez_penetracie', label: 'Bez penetrácie — dotyky a orál' },
      ],
    },
  ],
}

// ── Keď to vzrušuje môjho partnera / moju partnerku ────────────────────
const POSTOJ_K_PARTNEROVI: Blok = {
  druh: 'skupina', id: 'postoj_partner',
  nadpis: g('Keby to vzrušovalo moju partnerku', 'Keby to vzrušovalo môjho partnera'),
  uvod: g(
    'Predstav si, že ti partnerka prizná, že ju vzrušujú trans ženy — napríklad, že by chcela vidieť ženu s penisom alebo s ňou byť.',
    'Predstav si, že ti partner prizná, že ho vzrušujú trans ženy — napríklad, že by chcel byť so ženou, ktorá má penis.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'pp_reakcia', typ: 'viac', inePovolene: true,
      text: g('Ako by som reagoval', 'Ako by som reagovala'),
      moznosti: [
        { v: 'vzrusilo', label: 'Vzrušilo by ma to' },
        { v: 'zvedavost', label: g('Bol by som zvedavý, čo ju na tom láka', 'Bola by som zvedavá, čo ho na tom láka') },
        { v: 'fantazia_ok', label: g('Ako jej fantázia mi to neprekáža', 'Ako jeho fantázia mi to neprekáža') },
        { v: 'prekvapenie', label: 'Prekvapilo by ma to, potrebujem čas' },
        { v: 'ohrozenie', label: g('Cítil by som sa ohrozený — že jej nestačím', 'Cítila by som sa ohrozená — že mu nestačím') },
        { v: 'orientacia', label: g('Riešil by som, čo to o nej hovorí', 'Riešila by som, čo to hovorí o jeho orientácii') },
        { v: 'nie', label: 'Bolo by mi to nepríjemné' },
      ],
    },
    p('pp_talk', g('Rozprávať sa o jej fantázii počas sexu', 'Rozprávať sa o jeho fantázii počas sexu')),
    p('pp_porno', 'Pozerať spolu trans porno'),
    p('pp_trojka', 'Trojka s trans ženou, kde som aj ja'),
    p('pp_pozerat', g('Pozerať sa, ako je moja partnerka s trans ženou', 'Pozerať sa, ako je môj partner s trans ženou')),
    p('pp_bezo_mna', g('Aby to partnerka zažila bezo mňa a potom mi porozprávala', 'Aby to partner zažil bezo mňa a potom mi porozprával')),
    pm('pp_ona_strapon', 'Aby partnerka namiesto toho nosila strap-on a hrala „ženu s penisom"'),
    pz('pp_ja_strapon', 'Nosiť pre partnera strap-on a byť jeho „ženou s penisom"'),
    pz('pp_pegging', 'Penetrovať partnera strap-onom (pegging)'),
    pm('pp_pegging', 'Nechať sa partnerkou penetrovať strap-onom (pegging)'),
    {
      druh: 'otazka', id: 'pp_hranica', typ: 'text',
      text: g('Kde by bola moja hranica, keby to chcela partnerka:', 'Kde by bola moja hranica, keby to chcel partner:'),
    },
  ],
}

// ── Doma vo dvojici ──────────────────────────────────────────────────
const DOMA: Blok = {
  druh: 'skupina', id: 'bez_tretej', nadpis: 'Len my dvaja',
  bloky: [
    pm('bt_strapon', 'Partnerka s realistickým strap-onom — ako žena s penisom'),
    pz('bt_strapon', 'Ja s realistickým strap-onom — ako žena s penisom'),
    pm('bt_duty', 'Hrať sa, že moja partnerka je trans žena'),
    pz('bt_duty', 'Hrať sa, že som trans žena, a partner je so mnou'),
    pm('bt_pegging', 'Partnerka ma penetruje strap-onom'),
    pz('bt_pegging', 'Penetrujem partnera strap-onom'),
    p('bt_porno', 'Spoločné trans porno alebo erotické poviedky'),
  ],
}

// ── Pocity ───────────────────────────────────────────────────────────
const POCITY: Blok = {
  druh: 'skupina', id: 'pocity', nadpis: 'Čo pri tom cítim',
  bloky: [
    {
      druh: 'otazka', id: 'tr_pocit', typ: 'viac', inePovolene: true,
      text: 'Čo pri tejto predstave cítim',
      moznosti: [
        { v: 'vzrusenie', label: 'Čisté vzrušenie, bez výčitiek' },
        { v: 'hanba', label: 'Hanbu — čo by si pomysleli iní' },
        { v: 'orientacia', label: 'Otázku, čo to hovorí o mojej orientácii' },
        { v: 'strach_partner', label: g('Strach, ako by reagovala partnerka', 'Strach, ako by reagoval partner') },
        { v: 'zvedavost', label: 'Zvedavosť' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_partner_vie', typ: 'jeden',
      text: g('Vie o tejto mojej predstave partnerka?', 'Vie o tejto mojej predstave partner?'),
      moznosti: [
        { v: 'vie_ok', label: 'Vie a je to v poriadku' },
        { v: 'vie_zdrzanlivo', label: 'Vie, ale nehovoríme o tom' },
        { v: 'nevie', label: 'Nevie' },
        { v: 'nie_je', label: 'Túto predstavu nemám' },
      ],
    },
    { druh: 'otazka', id: 'tr_pozn', typ: 'text', text: g('Čo chcem, aby partnerka vedela:', 'Čo chcem, aby partner vedel:') },
  ],
}

export const TRANS_PARTNERKA: TemaObsah = {
  slug: 'trans-partnerka/trans-partnerka',
  nadpis: 'Trans žena — žena s penisom',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_je', nadpis: 'Ženské telo, prsia — a penis',
      telo: g(
        'Veľa mužov vzrušuje trans žena: ženská tvár, vlasy a prsia a k tomu penis. Pre niekoho je to to najlepšie z oboch svetov, pre iného zakázané tabu, pre ďalšieho možnosť zažiť penis bez toho, aby to bol muž. ' +
          'Táto téma sa pýta na dve veci: čo by si chcel ty — a ako by si to vnímal, keby to vzrušovalo tvoju partnerku.',
        'Trans ženy vzrušujú veľa mužov aj žien: ženská tvár, vlasy a prsia a k tomu penis. ' +
          'Táto téma sa pýta na dve veci: či to niečím láka teba — a ako by si to vnímala, keby to vzrušovalo tvojho partnera.',
      ),
    },
    {
      druh: 'text', id: 'myty', nadpis: 'Mýty', ton: 'info',
      telo: g(
        'Mýtus: „Keď ma to priťahuje, som gay." — Realita: priťahuje ťa žena. Je to častá predstava heterosexuálnych mužov a nehovorí nič zlé o tvojej orientácii.\n\n' +
          'Mýtus: „Nikto normálny to nemá." — Realita: trans porno patrí medzi najvyhľadávanejšie kategórie a pozerajú ho hlavne muži vo vzťahoch. Nie je za čo sa hanbiť.\n\n' +
          'Mýtus: „Keď to chce partnerka, nestačím jej." — Realita: jej predstava iného tela nie je kritika toho tvojho.',
        'Mýtus: „Keď to vzrušuje môjho partnera, je gay." — Realita: priťahuje ho žena. Je to častá predstava heterosexuálnych mužov a nehovorí nič o tom, že by ho priťahovali muži.\n\n' +
          'Mýtus: „Keď to chce, nestačím mu." — Realita: jeho predstava iného tela nie je kritika toho tvojho. Veľa párov si ju užíva spolu — napríklad so strap-onom.\n\n' +
          'Mýtus: „Ženy túto predstavu nemajú." — Realita: aj veľa žien vzrušuje žena s penisom — alebo predstava, že ňou sú samy.',
      ),
    },
  ],
  telo: [
    ROVINA,
    PRITAHUJE,
    PRAKTIKY,
    POSTOJ_K_PARTNEROVI,
    DOMA,
    POCITY,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: g(
        'Partnerka uvidí len to, v čom sa zhodnete. Čo označíš „Nie", sa jej nezobrazí.',
        'Partner uvidí len to, v čom sa zhodnete. Čo označíš „Nie", sa mu nezobrazí.',
      ),
    },
  ],
}
