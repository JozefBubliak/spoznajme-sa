// ─────────────────────────────────────────────────────────────────────────────
// Dotazník intímnych preferencií — STROM (schéma stránok + navigácia)
//
// Cieľ: bezpečne zistiť, čo sa každému partnerovi páči / nepáči / je mu jedno,
// a k tomu má neutrálny postoj. Bez zahanbenia (princíp Double Blind).
//
// Zdroj konceptu: docs/podklady „Finalny_strom_tem_komplet“ + svetové vzory:
//  - Yes / Maybe / No lists (BDSM/sex checklist — globálny štandard mapovania chuti)
//  - Semafor hraníc (green / amber / red)
//  - Wheel of Consent (Betty Martin) → „Zrkadlo rolí“: JA PRIJÍMAM vs JA POSKYTUJEM
//  - Double-blind reveal (Mojoupgrade, WNRS) → zhoda sa ukáže len keď chcú obaja
//  - Sensate focus → scenáre S0 / S1 / S2 (postupné stupňovanie)
//  - Modulárne, progresívne ukladanie (Paired, Coral, Blueheart)
//
// Tento súbor NEobsahuje otázky — len uzly stromu a poradie preklikov.
// ─────────────────────────────────────────────────────────────────────────────

export type Citlivost = 1 | 2 | 3 // 1 = jemné/bezpečné, 2 = stredné, 3 = vysoké/tabu

// ── Kanonická kostra sekcií vnútri jednej témy ──────────────────────────────
// Poradie = poradie preklikov. `volitelna` sekcie sa dajú preskočiť.
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
  lenRizikove?: boolean // zobrazí sa len ak je téma označená `rizikova`
  lenZrkadlo?: boolean // zobrazí sa len ak má téma rolu poskytovateľ/prijímateľ
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

// ── Téma vnútri modulu ─────────────────────────────────────────────────────
export type Tema = {
  slug: string
  nazov: string
  popis: string
  zrkadlova?: boolean // má rolu poskytovateľ/prijímateľ (mirror karty)
  rizikova?: boolean // pridá sekciu „rizikove“
  sekcie?: SekciaId[] // override kanonického poradia
}

// ── Modul (hlavná vetva stromu) ────────────────────────────────────────────
export type Modul = {
  slug: string
  cislo: number
  nazov: string
  popis: string
  ikona: string
  citlivost: Citlivost
  temy: Tema[]
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULY — poradie od najjemnejšieho po najcitlivejšie
// ─────────────────────────────────────────────────────────────────────────────
export const MODULY: Modul[] = [
  {
    slug: 'predohra-naladenie',
    cislo: 1,
    nazov: 'Predohra a naladenie',
    popis: 'Mentálna príprava, budovanie napätia, prostredie, iniciácia a signalizácia túžby.',
    ikona: '🕯️',
    citlivost: 1,
    temy: [
      { slug: 'mentalna-priprava', nazov: 'Mentálna príprava a psychológia', popis: 'Fantázia, uvoľnenie stresu, práca s hanbou.' },
      { slug: 'budovanie-napatia', nazov: 'Očakávanie a budovanie napätia', popis: 'Slow burn, flirt počas dňa, odďaľovaná blízkosť.' },
      { slug: 'dovera-a-intimita', nazov: 'Dôvera a vzťahová intimita', popis: 'Neverbálna komunikácia, verbálne rituály, podmienky pre predohru.' },
      { slug: 'starostlivost-o-telo', nazov: 'Fyzická príprava a starostlivosť', popis: 'Hygiena, vône, oblečenie, bielizeň.' },
      { slug: 'prostredie-atmosfera', nazov: 'Prostredie a atmosféra', popis: 'Domáce aj externé prostredie, svetlo, hudba, teplota.' },
      { slug: 'iniciacia', nazov: 'Iniciácia a signalizácia túžby', popis: 'Signály pripravenosti, hravé pozvania, dohodnutá iniciácia.' },
      { slug: 'slow-sex', nazov: 'Slow sex a spomalenie', popis: 'Vedomá prítomnosť, tease & denial, synchronizácia dychu.' },
    ],
  },
  {
    slug: 'bozky-dotyky-maznanie',
    cislo: 2,
    nazov: 'Bozky, dotyky a maznanie',
    popis: 'Bozky, hladkanie, masáž, petting a nepenetratívne aktivity.',
    ikona: '💞',
    citlivost: 1,
    temy: [
      { slug: 'bozky', nazov: 'Bozky', popis: 'Typy bozkov, intenzita, bozk ako forma vedenia.' },
      { slug: 'hladkanie-masaz', nazov: 'Hladkanie a masáž', popis: 'Jemné dotyky, masáž tela, hry s tlakom, erotogénne zóny.' },
      { slug: 'prsia-hrudnik', nazov: 'Prsia a hrudník', popis: 'Krúživé pohyby, bradavky, jemné štípance.' },
      { slug: 'petting', nazov: 'Petting a prstovanie', popis: 'Externý aj interný petting, stimulácia cez oblečenie.', zrkadlova: true },
      { slug: 'nepenetrativne', nazov: 'Nepenetratívne aktivity', popis: 'Dry humping, frottage, tribbing, vzájomná masturbácia.' },
    ],
  },
  {
    slug: 'zmyslova-hra',
    cislo: 3,
    nazov: 'Zmyslová hra',
    popis: 'Práca so zrakom, sluchom, čuchom, chuťou a hmatom; teplota a textúra.',
    ikona: '🪶',
    citlivost: 2,
    temy: [
      { slug: 'zrak', nazov: 'Zrak', popis: 'Zaviazanie očí, striptease, vizuálne podnety.' },
      { slug: 'sluch', nazov: 'Sluch', popis: 'Šepot, dirty talk, hudba, zvuky vzrušenia.' },
      { slug: 'cuch-chut', nazov: 'Čuch a chuť', popis: 'Prirodzená vôňa tela, parfumy, ochutnávanie.' },
      { slug: 'hmat-teplota', nazov: 'Hmat, teplota a textúra', popis: 'Hladenie, tlak, škrabanie, teplé/studené obklady, materiály.' },
      { slug: 'senzoricka-deprivacia', nazov: 'Senzorická deprivácia', popis: 'Obmedzenie zraku/sluchu, layering vnemov.', rizikova: true },
    ],
  },
  {
    slug: 'oralna-intimita',
    cislo: 4,
    nazov: 'Orálna intimita',
    popis: 'Orál na vulvu/penis, 69, face-sitting, tempo a hygienické rámce.',
    ikona: '👄',
    citlivost: 2,
    temy: [
      { slug: 'oral-vulva', nazov: 'Orál na vulvu', popis: 'Techniky, tempo, kombinácia s rukou.', zrkadlova: true },
      { slug: 'oral-penis', nazov: 'Orál na penis', popis: 'Hĺbka, tempo, dokončenie.', zrkadlova: true },
      { slug: '69', nazov: '69', popis: 'Súčasná vzájomná stimulácia, polohy, pohodlie.' },
      { slug: 'face-sitting', nazov: 'Face-sitting', popis: 'Poloha s dynamikou moci; hover / trón / plný kontakt.', zrkadlova: true, rizikova: true },
    ],
  },
  {
    slug: 'vaginalna-penetracia',
    cislo: 5,
    nazov: 'Vaginálna penetrácia a techniky',
    popis: 'Hĺbka, uhol, PIV techniky, polohy, tempo, orgazmus a aftercare.',
    ikona: '🌊',
    citlivost: 2,
    temy: [
      { slug: 'zaklady-priprava', nazov: 'Základy a príprava', popis: 'Lubrikácia, tempo nábehu, komunikácia počas.' },
      { slug: 'techniky-penetracie', nazov: 'Techniky počas penetrácie', popis: 'Angling, rocking, kombinácia s klitorálnou stimuláciou.' },
      { slug: 'polohy', nazov: 'Polohy a ergonómia', popis: 'Klasické polohy, variácie, opory, prístup ruky/úst.' },
      { slug: 'tempo-rytmus', nazov: 'Tempo a rytmus', popis: 'Pomalé vs rýchle, striedanie vĺn, edging, stop-start.' },
      { slug: 'orgazmus', nazov: 'Orgazmus a „choreografia“', popis: 'Poradie orgazmov, počet „takmer“, orgazmická kontrola.' },
      { slug: 'ukoncenie-aftercare', nazov: 'Ukončenie aktu a aftercare', popis: 'Dokončenie, upokojenie, blízkosť po.' },
    ],
  },
  {
    slug: 'anal-a-zadok',
    cislo: 6,
    nazov: 'Anál a stimulácia zadku',
    popis: 'Dotyky, spanking, hrádza, anilingus, prstovanie, análne hračky, penetračný anál.',
    ikona: '🍑',
    citlivost: 3,
    temy: [
      { slug: 'dotyky-spanking', nazov: 'Dotyky a spanking', popis: 'Hladenie, plesknutie, intenzita, rituál.', zrkadlova: true },
      { slug: 'hradza-anilingus', nazov: 'Hrádza a anilingus', popis: 'Vonkajšia orálna a manuálna stimulácia.', zrkadlova: true, rizikova: true },
      { slug: 'prstovanie-anal', nazov: 'Análne prstovanie', popis: 'Postupné otváranie, tempo, komunikácia.', zrkadlova: true, rizikova: true },
      { slug: 'anal-hracky', nazov: 'Análne hračky', popis: 'Plugy, guľôčky, veľkosti, materiály, hygiena.', rizikova: true },
      { slug: 'penetracny-anal', nazov: 'Penetračný anál', popis: 'Príprava, polohy, tempo, bezpečnosť.', zrkadlova: true, rizikova: true },
    ],
  },
  {
    slug: 'pomocky-a-hracky',
    cislo: 7,
    nazov: 'Erotické pomôcky a hračky',
    popis: 'Vibrátory, dildá, análne a párové hračky, krúžky, nositeľné pomôcky, lubrikanty.',
    ikona: '🎛️',
    citlivost: 2,
    temy: [
      { slug: 'vibratory', nazov: 'Vibrátory', popis: 'Klitorálne, vaginálne, párové, na diaľkové ovládanie.' },
      { slug: 'dilda', nazov: 'Dildá', popis: 'Veľkosti, materiály, strap-on.', zrkadlova: true },
      { slug: 'anal-pomocky', nazov: 'Análne pomôcky', popis: 'Plugy, guľôčky, progresívne sety.', rizikova: true },
      { slug: 'penisove-parove', nazov: 'Penisové a párové pomôcky', popis: 'Krúžky, návleky, pomôcky pre spoločnú stimuláciu.' },
      { slug: 'nositelne', nazov: 'Nositeľné pomôcky', popis: 'Vibračná bielizeň, ovládanie partnerom, verejné hranie.' },
      { slug: 'lubrikanty', nazov: 'Lubrikanty a doplnky', popis: 'Typy (voda/silikón), kompatibilita, masážne oleje.' },
    ],
  },
  {
    slug: 'mocenska-dynamika',
    cislo: 8,
    nazov: 'Mocenská dynamika, BDSM a roleplay',
    popis: 'Dominancia/submisia, viazanie, deprivácia zmyslov, protokoly, kontrola, roleplay a mikroscénky.',
    ikona: '⛓️',
    citlivost: 3,
    temy: [
      { slug: 'd-s-dynamika', nazov: 'Dominancia a submisia', popis: 'Vedenie a odovzdanie sa, protokoly, kontrola orgazmu.', zrkadlova: true },
      { slug: 'viazanie-bondage', nazov: 'Viazanie a znehybnenie', popis: 'Mäkké putá, pozície, trvanie, únikové poistky.', zrkadlova: true, rizikova: true },
      { slug: 'impact-play', nazov: 'Impact play', popis: 'Plesknutie, paddling, intenzita, bezpečné zóny tela.', zrkadlova: true, rizikova: true },
      { slug: 'senzoricka-deprivacia-bdsm', nazov: 'Deprivácia zmyslov', popis: 'Kukly, klapky, slúchadlá; postupnosť a dôvera.', rizikova: true },
      { slug: 'dirty-talk-ponizovanie', nazov: 'Dirty talk a ponižovanie/uctievanie', popis: 'Slová, oslovenia, hranice jazyka.', zrkadlova: true },
      { slug: 'roleplay', nazov: 'Roleplay a mikroscénky', popis: 'Profesie, mocenské role, fiktívne rande — bez tretej osoby.' },
      { slug: 'aftercare', nazov: 'Aftercare', popis: 'Čo potrebujem po scéne, ako dlho, akou formou.' },
    ],
  },
  {
    slug: 'fetise',
    cislo: 9,
    nazov: 'Fetiše a špecifické záujmy',
    popis: 'Časti tela, materiály, oblečenie, konkrétne situácie a objekty, telesné tekutiny, zvuky a reč.',
    ikona: '🧷',
    citlivost: 3,
    temy: [
      { slug: 'casti-tela', nazov: 'Fetiše na časti tela', popis: 'Chodidlá, ruky, vlasy, ďalšie zóny.' },
      { slug: 'materialy-oblecenie', nazov: 'Materiály a oblečenie', popis: 'Latex, koža, pančuchy, uniformy, textúry.' },
      { slug: 'scenare-rituly', nazov: 'Scenáre a rituály', popis: 'Opakované vzorce, konkrétne situácie a rekvizity.' },
      { slug: 'telesne-tekutiny', nazov: 'Telesné tekutiny a pocity', popis: 'Hranice okolo prirodzenosti tela.', rizikova: true },
      { slug: 'zvuky-rec', nazov: 'Zvuky a reč', popis: 'Konkrétne slová, tón, jazyk, ticho vs hlas.' },
      { slug: 'specialne-situacie', nazov: 'Špeciálne situácie', popis: 'Miesto, čas, kontext ako spúšťač.' },
    ],
  },
  {
    slug: 'otvorenost',
    cislo: 10,
    nazov: 'Otvorenosť a zapojenie iných',
    popis: 'Bi-zvedavosť, voyeurizmus a exhibícia, trojky a skupiny, swinging, hotwife/cuckold, CNM/ENM a polyamoria — najmä ako fantázia vs realita.',
    ikona: '🌐',
    citlivost: 3,
    temy: [
      { slug: 'rovnake-pohlavie', nazov: 'Interakcie s rovnakým pohlavím', popis: 'Fantázia vs realita, bozky, dotyky, orál, podmienky.', zrkadlova: true },
      { slug: 'voyeur-exhib', nazov: 'Voyeurizmus a exhibicionizmus', popis: 'Sledovať / byť sledovaný, semi-public situácie.', zrkadlova: true },
      { slug: 'trojky-skupiny', nazov: 'Trojky a skupiny', popis: 'Konfigurácie, rozdelenie pozornosti, žiarlivosť, pravidlá.', rizikova: true },
      { slug: 'swinging', nazov: 'Swinging (lifestyle)', popis: 'Soft/full swap, same room / separate, „unicorn“, kluby.', rizikova: true },
      { slug: 'zdielanie-partnera', nazov: 'Zdieľanie partnera (hotwife / cuckold)', popis: 'Hotwifing, stag & vixen, cuckold/cuckquean, candaulizm.', zrkadlova: true, rizikova: true },
      { slug: 'cnm-poly', nazov: 'CNM/ENM a polyamoria', popis: 'Otvorený vzťah, monogamish, poly tvary, politika informovania.', rizikova: true },
    ],
  },
  {
    slug: 'tabu-a-hranice',
    cislo: 11,
    nazov: 'Tabu témy a hranice',
    popis: 'Celkový prehľad tvrdých hraníc, „len fantázia“ zóny a práca s tabu — uzatvárací modul.',
    ikona: '🛑',
    citlivost: 3,
    temy: [
      { slug: 'tvrde-hranice', nazov: 'Tvrdé hranice', popis: 'Čo je absolútne „nie“ za každých okolností.' },
      { slug: 'len-fantazia', nazov: '„Len fantázia“ zóna', popis: 'Čo vzrušuje v predstave, ale nechcem realizovať.' },
      { slug: 'hranie-s-tabu', nazov: 'Hranie s tabu', popis: 'Ako s tabu pracovať bezpečne a s rámcom.' },
      { slug: 'spustace-trauma', nazov: 'Spúšťače a citlivé miesta', popis: 'Čo sa nesmie povedať/urobiť; ako signalizovať STOP.' },
    ],
  },
]

// ── Meta uzly (mimo modulov) ───────────────────────────────────────────────
export const ATLAS_SEKCIE = [
  { slug: 'suhlas', nazov: 'Súhlas a bezpečné slovo', popis: 'Safe word, neverbálne STOP, „nie teraz“.' },
  { slug: 'komunikacia', nazov: 'Komunikácia a spätná väzba', popis: 'Ako dávame vedieť, čo chceme a čo nie.' },
  { slug: 'frekvencia-cas', nazov: 'Frekvencia a čas', popis: 'Ideálny čas, tempo života, kedy je priestor.' },
  { slug: 'telo-hanba', nazov: 'Telo a hanba', popis: 'Vzťah k vlastnému telu, komfort s nahotou.' },
  { slug: 'libido', nazov: 'Túžba a libido', popis: 'Úroveň, rozdiely medzi nami, spúšťače a brzdy.' },
  { slug: 'zdravie-hygiena', nazov: 'Zdravie a hygiena', popis: 'Ochrana, testovanie, hygiena tela a pomôcok.' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Helpery pre navigáciu
// ─────────────────────────────────────────────────────────────────────────────
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
