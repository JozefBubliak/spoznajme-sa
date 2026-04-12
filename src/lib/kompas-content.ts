import { KOMPAS_DATA } from '@/data/kompas'

export type KompasAudienceSlug =
  | 'rodic-dieta'
  | 'deti'
  | 'pary'
  | 'priatelia'
  | 'praca'
  | 'citlive-temy'

export type KompasLink = {
  label: string
  href: string
}

export type KompasAudienceContent = {
  slug: KompasAudienceSlug
  label: string
  shortLabel: string
  group: string
  eyebrow: string
  description: string
  lead: string
  featuredSituations: string[]
  themeSlugs: string[]
  relatedLinks: KompasLink[]
  canonicalHref: string
}

export type KompasThemeContent = {
  slug: string
  aliases?: string[]
  label: string
  description: string
  lead: string
  keywords: string[]
  audienceSlugs: KompasAudienceSlug[]
  featuredSituations: string[]
  relatedLinks: KompasLink[]
}

export type KompasOverviewGroup = {
  slug: string
  label: string
  description: string
  samples: string[]
  links: KompasLink[]
}

type KompasItem = (typeof KOMPAS_DATA)[number]

export const KOMPAS_AUDIENCES: KompasAudienceContent[] = [
  {
    slug: 'rodic-dieta',
    label: 'Rodič–dieťa',
    shortLabel: 'Rodič–dieťa',
    group: 'Rodič → Dieťa',
    eyebrow: 'Každodenné situácie doma',
    description:
      'Konkrétne vety pre emócie, hranice, školu, zmeny aj citlivé témy. Nie teória. Použiteľné začiatky rozhovorov.',
    lead:
      'Táto vetva je pre rodičov, ktorí nechcú zostať pri „ako bolo v škole?“, ale zároveň nechcú na dieťa tlačiť.',
    featuredSituations: [
      'Ako sa opýtať na školu inak než „čo bolo?“',
      'Ako reagovať, keď dieťa plače alebo sa uzavrie',
      'Ako nastaviť hranice bez kriku a hanbenia',
      'Ako hovoriť o strachu, smútku alebo rozvode',
    ],
    themeSlugs: ['zacinat-rozovor', 'emocie-a-regulacia', 'hranice-a-dohody', 'skola-a-ucenie', 'zdravie-a-tazke-temy'],
    relatedLinks: [
      { label: 'Produkty rodič–dieťa', href: '/produkty/rodic-dieta' },
      { label: 'Skupina rodič–dieťa', href: '/skupiny/rodic-dieta' },
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
    ],
    canonicalHref: '/kompas/rodic-dieta',
  },
  {
    slug: 'deti',
    label: 'Deti',
    shortLabel: 'Deti',
    group: 'Deti',
    eyebrow: 'Bezpečný jazyk pre mladých',
    description:
      'Vetva pre deti a tínedžerov, kde sa učíme pomenovať, čo sa deje vo vnútri, a ako si vypýtať pomoc.',
    lead:
      'Obsah má pomôcť deťom nájsť slová pre veci, ktoré sa ťažko hovoria nahlas: tlak, hanbu, smútok, neistotu či vzťahy.',
    featuredSituations: [
      'Ako povedať, že ma niečo trápi, aj keď neviem presne čo',
      'Ako si vypýtať pomoc bez pocitu, že otravujem',
      'Ako hovoriť o strachu, úzkosti alebo osamelosti',
      'Ako pomenovať hranice medzi kamarátmi a na internete',
    ],
    themeSlugs: ['emocie-a-regulacia', 'zdravie-a-tazke-temy', 'identita-a-telo', 'digitalny-zivot'],
    relatedLinks: [
      { label: 'Rodič–dieťa vetva', href: '/kompas/rodic-dieta' },
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
    ],
    canonicalHref: '/kompas/deti',
  },
  {
    slug: 'pary',
    label: 'Páry',
    shortLabel: 'Páry',
    group: 'Páry',
    eyebrow: 'Vzťah bez zbytočnej obrany',
    description:
      'Jazyk pre blízkosť, potreby, konflikty, financie, ospravedlnenie aj znovunájdenie spojenia po rutine.',
    lead:
      'Keď pár nevie, ako začať citlivo, potrebuje prvú vetu a bezpečnejší vstup. Práve to rieši Kompas pre páry.',
    featuredSituations: [
      'Ako povedať potrebu bez obviňovania',
      'Ako sa ospravedlniť tak, aby to fungovalo',
      'Ako hovoriť o peniazoch, sexe alebo vzdialenosti',
      'Ako obnoviť spojenie po období rutiny',
    ],
    themeSlugs: ['zacinat-rozovor', 'hranice-a-dohody', 'konflikt-a-spolupraca', 'spomienky-a-spojenie', 'zdravie-a-tazke-temy'],
    relatedLinks: [
      { label: 'DeepTalks pre páry', href: '/skupiny/pary' },
      { label: 'CoupleSync', href: '/apps/couplesync' },
      { label: 'Kartičky pre páry', href: '/produkty/pary' },
    ],
    canonicalHref: '/kompas/pary',
  },
  {
    slug: 'priatelia',
    label: 'Priatelia',
    shortLabel: 'Priatelia',
    group: 'Priatelia',
    eyebrow: 'Menej small talku, viac skutočnosti',
    description:
      'Témy pre priateľstvá, nové vzťahy, ospravedlnenia, podporu, žiarlivosť aj nepríjemné pravdy.',
    lead:
      'Priateľstvá sa nekazia len konfliktom. Často sa stratia v tichu, odkladaní a v tom, že nevieme, ako začať.',
    featuredSituations: [
      'Ako povedať kamarátovi nepríjemnú pravdu',
      'Ako nadviazať nové priateľstvo v dospelosti',
      'Ako sa ospravedlniť po dlhom mlčaní',
      'Ako byť oporou bez zachraňovania',
    ],
    themeSlugs: ['zacinat-rozovor', 'hranice-a-dohody', 'konflikt-a-spolupraca', 'spomienky-a-spojenie'],
    relatedLinks: [
      { label: 'Skupina priatelia', href: '/skupiny/priatelia' },
      { label: 'Online kartičky', href: '/apps/spoznajme-sa' },
      { label: 'Kartičkový systém', href: '/produkty/karticky' },
    ],
    canonicalHref: '/kompas/publikum/priatelia',
  },
  {
    slug: 'praca',
    label: 'Práca',
    shortLabel: 'Práca',
    group: 'Práca',
    eyebrow: 'Psychologické bezpečie v tíme',
    description:
      'Vety pre šéfa, kolegov, konflikty, hranice, spätnú väzbu a situácie, kde sa ľudia často radšej stiahnu.',
    lead:
      'Kompas pre prácu má byť most medzi normálnym ľudským jazykom a náročnými pracovnými rozhovormi.',
    featuredSituations: [
      'Ako povedať, že nestíham bez výhovoriek',
      'Ako požiadať o zvýšenie platu',
      'Ako vyjadriť nesúhlas bez pasívnej agresie',
      'Ako reagovať na toxického šéfa alebo kolegu',
    ],
    themeSlugs: ['hranice-a-dohody', 'konflikt-a-spolupraca', 'zmeny-a-prechody', 'zacinat-rozovor'],
    relatedLinks: [
      { label: 'B2B ponuka', href: '/b2b' },
      { label: 'Kartičky pre tímy', href: '/produkty/karticky' },
      { label: 'Produkty mapa', href: '/produkty' },
    ],
    canonicalHref: '/kompas/publikum/praca',
  },
  {
    slug: 'citlive-temy',
    label: 'Citlivé témy',
    shortLabel: 'Citlivé témy',
    group: 'Citlivé témy',
    eyebrow: 'Keď sa niečo nedá odkladať',
    description:
      'Ťažké rozhovory o psychike, závislostiach, hygiene, strate, chorobe alebo vzťahovej bolesti.',
    lead:
      'Niektoré témy potrebujú viac citlivosti než odvahy. Kompas tu pomáha nájsť bezpečnejší prvý krok.',
    featuredSituations: [
      'Ako sa spýtať, či je niekto v depresii',
      'Ako začať tému alkoholu alebo závislosti',
      'Ako povedať citlivú hygienickú vec bez poníženia',
      'Ako otvoriť tému straty, smrti alebo psychického vyčerpania',
    ],
    themeSlugs: ['emocie-a-regulacia', 'zdravie-a-tazke-temy', 'identita-a-telo', 'hranice-a-dohody'],
    relatedLinks: [
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
      { label: 'Kompas pre deti', href: '/kompas/deti' },
      { label: 'DeepTalks komunita', href: '/komunita' },
    ],
    canonicalHref: '/kompas/publikum/citlive-temy',
  },
]

export const KOMPAS_THEMES: KompasThemeContent[] = [
  {
    slug: 'zacinat-rozovor',
    aliases: ['otvarace-ritualy'],
    label: 'Začať rozhovor & rituály',
    description:
      'Otvorenie rozhovoru tak, aby nespustilo obranu. Check-iny, denné otázky, večerné rituály a prvé vety.',
    lead:
      'Najťažší býva prvý krok. Táto téma zbiera vstupy, ktoré otvárajú priestor bez tlaku a výsluchu.',
    keywords: ['Začať rozhovor', 'Sociálne situácie', 'Blízkosť', 'Čo trápi deti'],
    audienceSlugs: ['rodic-dieta', 'pary', 'priatelia', 'praca'],
    featuredSituations: [
      'Ako sa opýtať na školu inak než „čo bolo?“',
      'Ako začať večerný check-in vo dvojici bez pocitu povinnosti',
      'Ako osloviť človeka, s ktorým sa chceš rozprávať hlbšie než pri small talku',
      'Ako otvoriť dôležitú tému bez vety „musíme sa porozprávať“',
    ],
    relatedLinks: [
      { label: 'Daily Connection', href: '/apps/daily-connection' },
      { label: 'Online kartičky', href: '/apps/spoznajme-sa' },
    ],
  },
  {
    slug: 'emocie-a-regulacia',
    label: 'Emócie & regulácia',
    description:
      'Ako pomenovať pocity, upokojiť sa a zostať v kontakte aj vtedy, keď je toho veľa.',
    lead:
      'Pomáha tam, kde rozhovor neblokuje obsah, ale zaplavenie. Namiesto „upokoj sa“ dáva konkrétny jazyk a tempo.',
    keywords: ['Emócie', 'regulácia', 'Podpora', 'Vlastné emócie', 'Zdravie & psychika'],
    audienceSlugs: ['rodic-dieta', 'deti', 'pary', 'priatelia', 'citlive-temy'],
    featuredSituations: [
      'Ako reagovať, keď dieťa plače alebo zamrzne',
      'Ako povedať partnerovi, že som zahltený/á, bez odseknutia',
      'Ako hovoriť o úzkosti alebo panike blízkym',
      'Ako byť oporou bez okamžitého radcovstva',
    ],
    relatedLinks: [
      { label: 'Kompas pre deti', href: '/kompas/deti' },
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
    ],
  },
  {
    slug: 'hranice-a-dohody',
    label: 'Hranice & dohody',
    description:
      'Jasné požiadavky, dohody a odmietnutia bez zbytočného kriku, viny alebo ponižovania.',
    lead:
      'Táto téma je o rešpekte. Ako povedať nie, čo potrebujem a čo už nechcem niesť namiesto druhých.',
    keywords: ['Hranice', 'Kolegovia', 'Osobná hygiena'],
    audienceSlugs: ['rodic-dieta', 'pary', 'priatelia', 'praca', 'citlive-temy'],
    featuredSituations: [
      'Ako nastaviť hranice pri obrazovkách alebo večernom režime',
      'Ako odmietnuť úlohu od kolegu bez straty vzťahu',
      'Ako povedať kamarátovi, že niečo prekročilo tvoju hranicu',
      'Ako pomenovať nepríjemnú citlivú vec s rešpektom',
    ],
    relatedLinks: [
      { label: 'Kompas pre prácu', href: '/kompas/publikum/praca' },
      { label: 'Kompas pre priateľov', href: '/kompas/publikum/priatelia' },
    ],
  },
  {
    slug: 'konflikt-a-spolupraca',
    label: 'Konflikt & spolupráca',
    description:
      'Ako nesúhlasiť, hádať sa zdravšie a hľadať riešenie bez obranných reflexov a ponižovania.',
    lead:
      'Konflikt nemusí ničiť vzťah. Potrebuje však lepší jazyk, pauzu a schopnosť pomenovať, čo sa deje pod povrchom.',
    keywords: ['Konflikty', 'Konflikt', 'Konflikty v tíme'],
    audienceSlugs: ['rodic-dieta', 'pary', 'priatelia', 'praca'],
    featuredSituations: [
      'Rovnaká hádka vo dvojici dokola',
      'Dieťa robí scénu na verejnosti a rodič už ide vybuchnúť',
      'Kamarát urobil niečo, čo zabolelo, ale nechceš to nechať zhniť',
      'Nesúhlas v práci, ktorý potrebuje ostať profesionálny aj ľudský',
    ],
    relatedLinks: [
      { label: 'Kompas pre páry', href: '/kompas/pary' },
      { label: 'B2B ponuka', href: '/b2b' },
    ],
  },
  {
    slug: 'zmeny-a-prechody',
    label: 'Zmeny & prechody',
    description:
      'Rozhovory pri zmenách rytmu, role, školy, práce, rozchode, sťahovaní alebo novom období.',
    lead:
      'Keď sa mení prostredie alebo dynamika, staré vety už nestačia. Táto téma dáva premostenia namiesto chaosu.',
    keywords: ['Zmeny', 'prechody', 'Komunikácia so šéfom'],
    audienceSlugs: ['rodic-dieta', 'pary', 'praca'],
    featuredSituations: [
      'Ako hovoriť o rozvode, sťahovaní alebo novej škole',
      'Ako otvoriť tému veľkého rozhodnutia vo vzťahu',
      'Ako pomenovať, že starý spôsob fungovania v práci už nestačí',
      'Ako prejsť z hektického dňa do vedomého večerného spojenia',
    ],
    relatedLinks: [
      { label: 'CoupleSync', href: '/apps/couplesync' },
      { label: 'Daily Connection', href: '/apps/daily-connection' },
    ],
  },
  {
    slug: 'spomienky-a-spojenie',
    label: 'Spomienky & spojenie',
    description:
      'Vďačnosť, oceňovanie, blízkosť a príbehy, ktoré ľudí vracajú k sebe namiesto rutiny.',
    lead:
      'Táto téma nehasí len problémy. Vedome buduje teplo, zvedavosť a pocit, že sa ešte stále vidíme.',
    keywords: ['Spomienky', 'Blízkosť', 'Podpora'],
    audienceSlugs: ['pary', 'priatelia', 'rodic-dieta'],
    featuredSituations: [
      'Ako vytvoriť malý denný rituál spojenia',
      'Ako sa vrátiť k dobrým spoločným spomienkam, keď vzťah stvrdol',
      'Ako sa rozprávať so starými rodičmi o ich príbehoch skôr, než bude neskoro',
      'Ako hovoriť vďačnosť nahlas, nie len v hlave',
    ],
    relatedLinks: [
      { label: 'Kartičkový systém', href: '/produkty/karticky' },
      { label: 'Online kartičky', href: '/apps/spoznajme-sa' },
    ],
  },
  {
    slug: 'digitalny-zivot',
    label: 'Digitálny život',
    description:
      'Obrazovky, telefóny, online svet a dohody, ktoré pomáhajú bez moralizovania a hysterických zákazov.',
    lead:
      'Moderné konflikty často nevznikajú z charakteru, ale zo zariadení, pozornosti a nejasných dohôd.',
    keywords: ['Digitálny život'],
    audienceSlugs: ['rodic-dieta', 'deti', 'pary'],
    featuredSituations: [
      'Ako hovoriť s deťmi o telefóne a internete bez vojny',
      'Ako pomenovať, že telefón zjedol partnerský kontakt',
      'Ako nastaviť realistické dohody namiesto jednorazového zákazu',
      'Ako hovoriť o online bezpečí, hanbe a tlaku medzi mladými',
    ],
    relatedLinks: [
      { label: 'Daily Connection', href: '/apps/daily-connection' },
      { label: 'Kompas rodič–dieťa', href: '/kompas/rodic-dieta' },
    ],
  },
  {
    slug: 'skola-a-ucenie',
    label: 'Škola & učenie',
    description:
      'Podpora bez tlaku, motivácia, výkon, zlyhanie, učitelia a každodenné školské mikrokrízy.',
    lead:
      'Nie všetko sa má riešiť väčším tlakom. Táto téma pomáha hovoriť o škole tak, aby dieťa nemuselo utekať do ticha.',
    keywords: ['Škola', 'výkon', 'učenie'],
    audienceSlugs: ['rodic-dieta', 'deti'],
    featuredSituations: [
      'Ako reagovať, keď výsledok nie je dobrý, ale snaha bola',
      'Ako povzbudiť bez porovnania a hanby',
      'Ako zistiť, čo sa v škole naozaj deje, bez výsluchu',
      'Ako hovoriť o budúcnosti a talente bez tlaku na výkon',
    ],
    relatedLinks: [
      { label: 'Produkty rodič–dieťa', href: '/produkty/rodic-dieta' },
      { label: 'Skupina rodič–dieťa', href: '/skupiny/rodic-dieta' },
    ],
  },
  {
    slug: 'zdravie-a-tazke-temy',
    label: 'Zdravie & ťažké témy',
    description:
      'Choroba, smútok, psychika, strata, závislosti, šikana a ďalšie rozhovory, ktoré nikto nechce viesť zle.',
    lead:
      'Pri ťažkých témach nestačí odvaha. Potrebujeme aj vhodné tempo, primeranosť veku a citlivú formuláciu.',
    keywords: ['Ťažké situácie', 'Zdravie', 'psychika', 'Závislosti'],
    audienceSlugs: ['rodic-dieta', 'deti', 'pary', 'citlive-temy'],
    featuredSituations: [
      'Ako hovoriť s dieťaťom o rozvode, smrti alebo šikane',
      'Ako sa spýtať, či je niekto v depresii alebo v ohrození',
      'Ako otvoriť tému alkoholu, závislosti alebo sebapoškodzovania',
      'Ako hovoriť o dlhodobo odkladanom probléme vo vzťahu',
    ],
    relatedLinks: [
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
      { label: 'Kompas pre deti', href: '/kompas/deti' },
    ],
  },
  {
    slug: 'identita-a-telo',
    label: 'Identita & telo',
    description:
      'Sebahodnota, telo, intimita, citlivé hranice a rešpektujúci jazyk pri zraniteľných témach.',
    lead:
      'Tam, kde sa ľudia hanbia alebo boja odmietnutia, je dôležité hovoriť obzvlášť jemne a presne.',
    keywords: ['Identita', 'telo', 'intim', 'Osobná hygiena'],
    audienceSlugs: ['deti', 'pary', 'citlive-temy'],
    featuredSituations: [
      'Ako hovoriť o tele, dozrievaní a sexualite primerane veku',
      'Ako v páre pomenovať intimitu bez hanby a útoku',
      'Ako dať spätnú väzbu na citlivú telesnú alebo hygienickú tému',
      'Ako chrániť hranice a rešpektovať cudzie',
    ],
    relatedLinks: [
      { label: 'Kompas pre páry', href: '/kompas/pary' },
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
    ],
  },
]

export const KOMPAS_OVERVIEW_GROUPS: KompasOverviewGroup[] = [
  {
    slug: 'rodina-a-deti',
    label: 'Rodina & deti',
    description:
      'Najsilnejší dopyt je okolo každodenných rodičovských situácií, školy, emócií a náročných tém doma.',
    samples: [
      'Dieťa nechce odísť od telefónu alebo PC',
      'Ako sa opýtať na školu inak než „čo bolo?“',
      'Ako hovoriť o rozvode, smrti alebo šikane',
    ],
    links: [
      { label: 'Kompas rodič–dieťa', href: '/kompas/rodic-dieta' },
      { label: 'Škola & učenie', href: '/kompas/tema/skola-a-ucenie' },
      { label: 'Zdravie & ťažké témy', href: '/kompas/tema/zdravie-a-tazke-temy' },
    ],
  },
  {
    slug: 'pary',
    label: 'Páry',
    description:
      'Obnova spojenia, konflikty, peniaze, intimita a rutina patria medzi najčastejšie partnerské vstupy.',
    samples: [
      'Rovnaká hádka dokola',
      'Ako hovoriť o peniazoch bez hádky',
      'Ako vyjadriť potrebu bez obviňovania',
    ],
    links: [
      { label: 'Kompas pre páry', href: '/kompas/pary' },
      { label: 'Konflikt & spolupráca', href: '/kompas/tema/konflikt-a-spolupraca' },
      { label: 'CoupleSync', href: '/apps/couplesync' },
    ],
  },
  {
    slug: 'priatelia',
    label: 'Priatelia',
    description:
      'Priateľstvá potrebujú menej small talku, viac odvahy na pravdu, ospravedlnenie a nové spojenia.',
    samples: [
      'Ako nadviazať nové priateľstvo v dospelosti',
      'Ako povedať kamarátovi nepríjemnú pravdu',
      'Ako sa ospravedlniť po dlhom mlčaní',
    ],
    links: [
      { label: 'Kompas pre priateľov', href: '/kompas/publikum/priatelia' },
      { label: 'Začať rozhovor & rituály', href: '/kompas/tema/zacinat-rozovor' },
      { label: 'Online kartičky', href: '/apps/spoznajme-sa' },
    ],
  },
  {
    slug: 'praca',
    label: 'Práca',
    description:
      'Toxický šéf, spätná väzba, hranice a nesúhlas v tíme sú veľké témy pre jednotlivcov aj firmy.',
    samples: [
      'Ako povedať, že nestíham',
      'Ako požiadať o zvýšenie platu',
      'Ako vyjadriť nesúhlas bez útoku',
    ],
    links: [
      { label: 'Kompas pre prácu', href: '/kompas/publikum/praca' },
      { label: 'Hranice & dohody', href: '/kompas/tema/hranice-a-dohody' },
      { label: 'B2B ponuka', href: '/b2b' },
    ],
  },
  {
    slug: 'dusevne-zdravie',
    label: 'Duševné zdravie',
    description:
      'Úzkosť, depresia, hnev, sebapoškodzovanie a citlivé otázky potrebujú presnejší, opatrnejší jazyk.',
    samples: [
      'Ako hovoriť o úzkosti a panike',
      'Ako sa spýtať, či je niekto v depresii',
      'Ako otvoriť tému sebapoškodzovania alebo vyčerpania',
    ],
    links: [
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
      { label: 'Emócie & regulácia', href: '/kompas/tema/emocie-a-regulacia' },
      { label: 'Zdravie & ťažké témy', href: '/kompas/tema/zdravie-a-tazke-temy' },
    ],
  },
  {
    slug: 'zivotne-situacie',
    label: 'Životné situácie',
    description:
      'Zmeny rytmu, obrazovky, moderný stres a prechody si pýtajú nové dohody a menej automatických reakcií.',
    samples: [
      'Ako hovoriť o telefóne s deťmi bez vojny',
      'Ako prejsť z hektického dňa do spoločného večera',
      'Ako zvládnuť zmenu školy, práce alebo role vo vzťahu',
    ],
    links: [
      { label: 'Digitálny život', href: '/kompas/tema/digitalny-zivot' },
      { label: 'Zmeny & prechody', href: '/kompas/tema/zmeny-a-prechody' },
      { label: 'Daily Connection', href: '/apps/daily-connection' },
    ],
  },
  {
    slug: 'spolocnost',
    label: 'Spoločnosť',
    description:
      'Medzigeneračné rozdiely, kultúrne mosty a citlivé spoločenské rozhovory sú príležitosťou pre DeepTalks unikátny jazyk.',
    samples: [
      'Ako hovoriť cez generačné rozdiely',
      'Ako otvoriť citlivú hodnotovú tému bez vojny',
      'Ako vytvoriť most medzi ľuďmi, ktorí sa bežne nepoznajú',
    ],
    links: [
      { label: 'Identita & telo', href: '/kompas/tema/identita-a-telo' },
      { label: 'Začať rozhovor & rituály', href: '/kompas/tema/zacinat-rozovor' },
      { label: 'Kartičkový systém', href: '/produkty/karticky' },
    ],
  },
]

export function getKompasAudienceBySlug(slug: string) {
  return KOMPAS_AUDIENCES.find((item) => item.slug === slug)
}

export function getKompasThemeBySlug(slug: string) {
  return KOMPAS_THEMES.find(
    (item) => item.slug === slug || item.aliases?.includes(slug)
  )
}

export function getKompasAudienceItems(slug: KompasAudienceSlug) {
  const audience = getKompasAudienceBySlug(slug)
  if (!audience) {
    return []
  }

  return KOMPAS_DATA.filter((item) => item.group === audience.group)
}

export function getKompasThemeItems(slug: string) {
  const theme = getKompasThemeBySlug(slug)
  if (!theme) {
    return []
  }

  return KOMPAS_DATA.filter((item) =>
    theme.keywords.some((keyword) =>
      `${item.topic} ${item.subtopic}`.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    )
  )
}

export function getAudienceTopics(items: KompasItem[]) {
  return Array.from(new Set(items.map((item) => item.topic)))
}
