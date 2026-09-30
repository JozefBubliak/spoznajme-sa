import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Trans partnerka / žena s penisom — modul H9.
// Na žiadosť používateľa (2026-09-30): téma v zdroji chýbala, existovala len
// malá karta vo fantazie.ts (presunutá sem, rovnaké ID trans_frekvencia /
// trans_realizacia). Obsah vytvorený: kniha, roviny, praktiky m/z, roly,
// varianty bez tretej osoby, pocity, mýty, tipy.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už som to zažil a chcem znova', 'Už som to zažila a chcem znova') },
  { v: 'tuzim', label: 'Túžim to skúsiť' },
  { v: 'fantazia', label: 'Len ako fantázia / v porne' },
  { v: 'ak_partner', label: g('Rád, ak by to chcela partnerka', 'Rada, ak by to chcel partner') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'jeden', text, moznosti: POSTOJ,
})

const FREKV: Moznost[] = [
  { v: 'nikdy', label: 'Nikdy' },
  { v: 'zriedka', label: 'Zriedka' },
  { v: 'obcas', label: 'Občas' },
  { v: 'casto', label: 'Často' },
  { v: 'velmi_casto', label: 'Veľmi často — patrí k mojim top fantáziám' },
]
const REALIZACIA: Moznost[] = [
  { v: 'len_fantazia', label: 'Nie, nech ostane fantáziou' },
  { v: 'talk', label: 'Len v dirty talku / roleplay s partnerom' },
  { v: 'za_podmienok', label: 'Áno, za určitých podmienok' },
  { v: 'ano', label: 'Áno, naozaj to chcem zažiť' },
]

// ── Rovina a frekvencia ───────────────────────────────────────────────
const ROVINA: Blok = {
  druh: 'skupina', id: 'rovina', nadpis: 'Kde to u mňa je',
  bloky: [
    { druh: 'otazka', id: 'trans_frekvencia', typ: 'jeden', text: 'Ako často sa mi táto predstava vracia', moznosti: FREKV },
    { druh: 'otazka', id: 'trans_realizacia', typ: 'jeden', text: 'Chcem to niekedy preniesť do reality?', moznosti: REALIZACIA },
    {
      druh: 'otazka', id: 'tr_kde', typ: 'viac', inePovolene: true,
      text: 'Kde sa to u mňa objavuje',
      moznosti: [
        { v: 'myslienky', label: 'Len v myšlienkach a pri masturbácii' },
        { v: 'porno', label: 'Pozerám porno s trans ženami' },
        { v: 'anime', label: 'Futanari / anime, kreslené, AI' },
        { v: 'chat', label: 'Chat, sexting, videohovor' },
        { v: 'stretnutie_samo', label: 'Stretnutie s trans ženou sám / sama' },
        { v: 'trojka', label: 'Trojka s trans ženou spolu s partnerom/partnerkou' },
        { v: 'vztah', label: 'Viem si predstaviť aj vzťah' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_skusenost', typ: 'jeden',
      text: 'Moja skúsenosť',
      moznosti: [
        { v: 'ziadna', label: 'Žiadna' },
        { v: 'online', label: 'Len online (chat, video)' },
        { v: 'raz', label: 'Raz, naživo' },
        { v: 'viackrat', label: 'Viackrát, naživo' },
      ],
    },
  ],
}

// ── Čo ma priťahuje ─────────────────────────────────────────────────
const PRITAHUJE: Blok = {
  druh: 'skupina', id: 'pritahuje', nadpis: 'Čo ma na tom priťahuje',
  bloky: [
    {
      druh: 'otazka', id: 'tr_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma najviac vzrušuje',
      moznosti: [
        { v: 'kombinacia', label: 'Kombinácia ženského tela, pŕs a penisu naraz' },
        { v: 'zenskost', label: 'Jej ženskosť — tvár, vlasy, oblečenie, pohyby' },
        { v: 'penis', label: 'Penis — vidieť ho, dotýkať sa, ochutnať' },
        { v: 'erekcia', label: 'Vidieť jej vzrušenie — erekciu, ejakuláciu' },
        { v: 'role_obratene', label: 'Že môže byť aj aktívna — penetrovať' },
        { v: 'tabu', label: 'Zakázanosť a tabu' },
        { v: 'bez_gay', label: g('Zážitok s penisom bez toho, aby to bol muž', 'Ženské telo a zároveň penis — to najlepšie z oboch') },
        { v: 'dominancia', label: 'Dominantná trans žena' },
        { v: 'jemnost', label: 'Jemná, submisívna trans žena' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_typ', typ: 'viac',
      text: 'Aký typ ma láka',
      moznosti: [
        { v: 'velmi_zenska', label: 'Veľmi ženská, „nerozoznateľná"' },
        { v: 'prsia_velke', label: 'S výraznými prsiami' },
        { v: 'prirodzena', label: 'Prirodzená, bez veľkých úprav' },
        { v: 'velky_penis', label: 'S väčším penisom' },
        { v: 'maly_penis', label: 'S menším penisom' },
        { v: 'nezalezi', label: 'Nezáleží, ide o osobu' },
      ],
    },
  ],
}

// ── Praktiky ─────────────────────────────────────────────────────────
const PRAKTIKY: Blok = {
  druh: 'skupina', id: 'praktiky', nadpis: 'Čo by som chcel(a) robiť',
  uvod: 'Pri každej praktike zvlášť — aj keď je to zatiaľ len predstava.',
  bloky: [
    p('tr_pozerat', 'Pozerať sa na ňu nahú, keď je vzrušená'),
    p('tr_bozky', 'Bozkávať sa s ňou'),
    p('tr_prsia', 'Hladkať a bozkávať jej prsia'),
    p('tr_dotyk_penis', 'Dotýkať sa jej penisu, masturbovať ju'),
    p('tr_ona_mna', g('Aby ma masturbovala ona', 'Aby ma rukami a prstami hladila ona')),
    p('tr_oral_dat', 'Dávať jej orál'),
    p('tr_oral_prijat', 'Prijímať od nej orál'),
    p('tr_69', '69 s ňou'),
    p('tr_trenie', 'Trenie penisov / tiel o seba'),
    p('tr_penetrovat', g('Penetrovať ju (análne)', 'Penetrovať ju strap-onom')),
    p('tr_byt_penetrovany', g('Byť ňou penetrovaný (análne)', 'Byť ňou penetrovaná (vaginálne alebo análne)')),
    p('tr_ejakulacia', 'Jej ejakulácia na mňa / do mňa'),
    p('tr_prehltnut', 'Prehltnúť jej spermu'),
    p('tr_dominuje', 'Aby ma dominovala'),
    p('tr_dominujem', 'Dominovať ju'),
    {
      druh: 'otazka', id: 'tr_rola', typ: 'jeden',
      text: 'Ktorá rola ma láka',
      moznosti: [
        { v: 'top', label: 'Aktívna — ja penetrujem' },
        { v: 'bottom', label: 'Pasívna — ona penetruje mňa' },
        { v: 'obe', label: 'Obe, striedanie' },
        { v: 'bez_penetracie', label: 'Bez penetrácie — dotyky, orál' },
        { v: 'neviem', label: 'Neviem, zistím to' },
      ],
    },
  ],
}

// ── S partnerom/partnerkou ────────────────────────────────────────────
const S_PARTNEROM: Blok = {
  druh: 'skupina', id: 's_partnerom', nadpis: 'Ako to súvisí s nami',
  bloky: [
    p('tr_trojka', 'Trojka: my dvaja + trans žena'),
    p('tr_sledovat_partnera', g('Pozerať sa, ako je partnerka s trans ženou', 'Pozerať sa, ako je partner s trans ženou')),
    p('tr_partner_sleduje', g('Aby sa partnerka pozerala, ako som s trans ženou ja', 'Aby sa partner pozeral, ako som s trans ženou ja')),
    p('tr_spolu_porno', 'Pozerať trans porno spolu s partnerom/partnerkou'),
    p('tr_talk', 'Dirty talk o tejto fantázii počas sexu'),
    {
      druh: 'otazka', id: 'tr_partner_vie', typ: 'jeden',
      text: g('Vie o tejto mojej fantázii partnerka?', 'Vie o tejto mojej fantázii partner?'),
      moznosti: [
        { v: 'vie_ok', label: 'Vie a je v pohode' },
        { v: 'vie_zdrzanlivo', label: 'Vie, ale nehovoríme o tom' },
        { v: 'nevie', label: 'Nevie — tento dotazník je prvý krok' },
        { v: 'nechcem', label: 'Nechcem, aby vedel(a)' },
      ],
    },
  ],
}

// ── Bez tretej osoby ─────────────────────────────────────────────────
const BEZ_TRETEJ: Blok = {
  druh: 'skupina', id: 'bez_tretej', nadpis: 'Ako to zažiť aj bez tretej osoby',
  uvod: 'Veľa párov si túto fantáziu užíva doma, len vo dvojici.',
  bloky: [
    p('bt_strapon', g('Partnerka s realistickým strap-onom — „má penis"', 'Nosiť realistický strap-on a byť „ona s penisom"')),
    p('bt_duty', g('Dutý strap-on alebo návlek — ja ako „ona"', 'Partner v ženskom oblečení / líčení (crossdressing)')),
    p('bt_roleplay', 'Roleplay, v ktorom je jeden z nás trans žena'),
    p('bt_porno', 'Spoločné porno alebo erotické poviedky s touto témou'),
    p('bt_pegging', g('Pegging — partnerka ma penetruje strap-onom', 'Pegging — ja penetrujem partnera strap-onom')),
  ],
}

// ── Pocity ───────────────────────────────────────────────────────────
const POCITY: Blok = {
  druh: 'skupina', id: 'pocity', nadpis: 'Pocity a otázky, ktoré si kladiem',
  bloky: [
    {
      druh: 'otazka', id: 'tr_pocit', typ: 'viac', inePovolene: true,
      text: 'Čo pri tejto fantázii cítim',
      moznosti: [
        { v: 'vzrusenie', label: 'Čisté vzrušenie, bez výčitiek' },
        { v: 'hanba', label: 'Hanbu — čo by si pomysleli iní' },
        { v: 'orientacia', label: 'Otázku, čo to hovorí o mojej orientácii' },
        { v: 'strach_partner', label: 'Strach, ako by reagoval(a) partner/ka' },
        { v: 'zvedavost', label: 'Zvedavosť, chcem to pochopiť' },
      ],
    },
    { druh: 'otazka', id: 'tr_pozn', typ: 'text', text: 'Čo chcem, aby partner/ka o tejto fantázii vedel(a):' },
  ],
}

export const TRANS_PARTNERKA: TemaObsah = {
  slug: 'trans-partnerka/trans-partnerka',
  nadpis: 'Trans partnerka — žena s penisom',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_je', nadpis: 'Ženské telo, prsia — a penis',
      telo:
        'Trans ženy s penisom priťahujú obrovské množstvo ľudí: ženská tvár, vlasy a prsia v kombinácii s penisom. ' +
        'Pre niekoho je to „to najlepšie z oboch svetov", pre iného zakázané tabu, pre ďalšieho možnosť zažiť penis bez toho, aby to bol muž. ' +
        'Trans porno patrí dlhodobo medzi najvyhľadávanejšie kategórie — a veľkú časť divákov tvoria heterosexuálni muži vo vzťahoch.',
    },
    {
      druh: 'text', id: 'myty', nadpis: 'Mýty', ton: 'info',
      telo:
        'Mýtus: „Keď ma to priťahuje, som gay." — Realita: priťahuje ťa žena; trans žena je žena. Táto príťažlivosť je častá u heterosexuálnych mužov a nehovorí nič zlé o tvojej orientácii.\n\n' +
        'Mýtus: „Je to zvrátené, nikto normálny to nemá." — Realita: robia to a fantazírujú o tom milióny ľudí, len o tom nahlas nehovoria. Nie je za čo sa hanbiť.\n\n' +
        'Mýtus: „Keď to má partnerka/partner, nestačím mu/jej." — Realita: fantázia o inom tele nie je kritika toho tvojho. Je to jedna z mnohých vecí, ktoré človeka vzrušujú.\n\n' +
        'Mýtus: „Ženy túto fantáziu nemajú." — Realita: aj veľa žien vzrušuje predstava ženy s penisom — alebo byť ňou sama, so strap-onom.',
    },
    {
      druh: 'text', id: 'tipy', nadpis: 'Ako začať', ton: 'info',
      telo:
        'Najjednoduchší prvý krok je povedať to partnerovi/partnerke — napríklad cez tento dotazník. ' +
        'Potom spoločné porno alebo dirty talk, strap-on doma a až nakoniec, ak obaja chcete, stretnutie. ' +
        'Ak sa niekedy stretnete s trans ženou naživo, je to človek so svojimi túžbami — najlepšie zážitky vznikajú, keď ju berieš ako ženu, nie ako „kategóriu".',
    },
  ],
  telo: [
    ROVINA,
    PRITAHUJE,
    PRAKTIKY,
    S_PARTNEROM,
    BEZ_TRETEJ,
    POCITY,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí „Nie", sa nikde nezobrazí.',
    },
  ],
}
