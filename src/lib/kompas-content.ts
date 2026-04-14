import {
  KOMPAS_DATA,
  KOMPAS_SCENARIOS,
  type KompasAudienceSlug,
} from '@/data/kompas'

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
    eyebrow: 'Deti, tínedžeri aj dospelí pri nich',
    description:
      'Jazyk pre deti a tínedžerov aj pre dospelých, ktorí s nimi potrebujú hovoriť citlivo, pokojne a bez zbytočného tlaku.',
    lead:
      'Vetva spája dva smery: deti si tu môžu nájsť slová pre vlastné prežívanie a rodičia či blízki zas bezpečnejšie prvé vety, keď potrebujú byť oporou.',
    featuredSituations: [
      'Ako sa dieťaťa spýtať, čo prežíva, bez výsluchu',
      'Ako hovoriť po ťažkom dni v škole alebo pri šikanovaní',
      'Ako vysvetliť rozvod, smrť či silné emócie bez zľahčovania',
      'Ako dať deťom aj tínedžerom slová pre pomoc, strach a online svet',
    ],
    themeSlugs: ['emocie-a-regulacia', 'zdravie-a-tazke-temy', 'identita-a-telo', 'digitalny-zivot', 'skola-a-ucenie'],
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
  {
    slug: 'vlastne-potreby',
    label: 'Vlastné potreby',
    shortLabel: 'Vlastné potreby',
    group: 'Vlastné potreby',
    eyebrow: 'Sebaobhajoba bez pocitu viny',
    description:
      'Konkrétne prvé vety pre momenty, keď potrebuješ prestať sa zmenšovať, pomenovať potrebu alebo povedať nie bez drámy.',
    lead:
      'Táto vetva pomáha tam, kde človek vie, že niečo potrebuje povedať za seba, ale staré reflexy ho tlačia do ospravedlňovania, mlčania alebo prehnaného vysvetľovania.',
    featuredSituations: [
      'Ako prestať sa ospravedlňovať za vlastné potreby',
      'Ako povedať nesúhlas bez pocitu viny',
      'Ako požiadať o pomoc bez hanby a bez maskovania',
      'Ako vo vzťahu konečne povedať, čo ma bolí alebo čo chcem',
    ],
    themeSlugs: ['zacinat-rozovor', 'emocie-a-regulacia', 'hranice-a-dohody', 'identita-a-telo'],
    relatedLinks: [
      { label: 'Kompas témy', href: '/kompas/temy' },
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
      { label: 'Online kartičky', href: '/apps/spoznajme-sa' },
    ],
    canonicalHref: '/kompas/vlastne-potreby',
  },
  {
    slug: 'rodina',
    label: 'Rozšírená rodina',
    shortLabel: 'Rodina',
    group: 'Rozšírená rodina',
    eyebrow: 'Rodičia, súrodenci, svokrovci, dedičstvo',
    description:
      'Vetva pre rodinné rozhovory, ktoré bývajú citlivé práve preto, že v nich ide o blízkosť, lojalitu, staré roly a dlhú pamäť.',
    lead:
      'Od svokrovcov cez nevyžiadané rady až po dedičstvo alebo staré zranenia z detstva. Táto vetva pomáha hovoriť pravdu bez potreby rodinu rozbiť.',
    featuredSituations: [
      'Ako nastaviť hranice s rodičmi alebo svokrovcami',
      'Ako hovoriť o rozvode rodičov či rodinných stretnutiach bez vojny',
      'Ako povedať, že rodinný humor alebo výchova zraňovali',
      'Ako otvoriť peniaze, dedičstvo alebo návštevy po narodení dieťaťa',
    ],
    themeSlugs: ['hranice-a-dohody', 'konflikt-a-spolupraca', 'zmeny-a-prechody', 'zdravie-a-tazke-temy', 'identita-a-telo'],
    relatedLinks: [
      { label: 'Rodič–dieťa vetva', href: '/kompas/rodic-dieta' },
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
    ],
    canonicalHref: '/kompas/rodina',
  },
  {
    slug: 'randenie',
    label: 'Randenie',
    shortLabel: 'Randenie',
    group: 'Randenie',
    eyebrow: 'Začiatky, iskra aj jasné nie',
    description:
      'Prvé vety pre sympatie, pozvania, nejasné statusy, exkluzivitu aj férové ukončenie kontaktu na začiatku.',
    lead:
      'Randenie často nestroskotá na cite, ale na tom, že nikto nechce byť prvý, kto povie niečo jasné. Táto vetva dáva konkrétny jazyk práve na tie momenty medzi nádejou a neistotou.',
    featuredSituations: [
      'Ako povedať, že sa mi niekto páči alebo ho pozvať na rande',
      'Ako sa spýtať, čo medzi nami vlastne je',
      'Ako pomenovať, že chcem viac než nezáväznosť',
      'Ako odmietnuť alebo ukončiť začínajúci kontakt bez zbytočnej krutosti',
    ],
    themeSlugs: ['zacinat-rozovor', 'hranice-a-dohody', 'zmeny-a-prechody', 'emocie-a-regulacia'],
    relatedLinks: [
      { label: 'Kompas pre páry', href: '/kompas/pary' },
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
      { label: 'Online kartičky', href: '/apps/spoznajme-sa' },
    ],
    canonicalHref: '/kompas/randenie',
  },
  {
    slug: 'rozchod',
    label: 'Rozchod',
    shortLabel: 'Rozchod',
    group: 'Rozchod',
    eyebrow: 'Koniec vzťahu bez zbytočnej krutosti',
    description:
      'Jazyk pre rozchody, pauzy, hranice po rozchode, rozhovory s deťmi aj ospravedlnenie za to, ako sme kedysi odišli.',
    lead:
      'Niektoré vzťahy sa končia preto, aby sa neubližovalo ďalej. Táto vetva pomáha nájsť presnejšie slová v situáciách, kde nejasnosť často bolí viac než pravda.',
    featuredSituations: [
      'Ako ukončiť vzťah jasne a bez krutosti',
      'Ako povedať, že potrebujem pauzu alebo priestor',
      'Ako nastaviť kontakt po rozchode',
      'Ako hovoriť s deťmi, rodinou alebo bývalým partnerom po veľkej zmene',
    ],
    themeSlugs: ['zmeny-a-prechody', 'hranice-a-dohody', 'emocie-a-regulacia', 'zdravie-a-tazke-temy'],
    relatedLinks: [
      { label: 'Kompas pre páry', href: '/kompas/pary' },
      { label: 'Rodina', href: '/kompas/rodina' },
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
    ],
    canonicalHref: '/kompas/rozchod',
  },
  {
    slug: 'peniaze',
    label: 'Peniaze',
    shortLabel: 'Peniaze',
    group: 'Peniaze',
    eyebrow: 'Financie bez hanby a bez tajomstiev',
    description:
      'Situácie okolo míňania, dlhov, požičaných peňazí, spoločnej domácnosti aj rodinnej finančnej pomoci.',
    lead:
      'Peniaze často rozbíjajú vzťahy nie preto, že by ich bolo málo, ale preto, že sa o nich hovorí neskoro, nejasne alebo s veľkou hanbou. Táto vetva dáva konkrétne prvé vety tam, kde býva najväčšie ticho.',
    featuredSituations: [
      'Ako hovoriť s partnerom o rozdielnych výdavkoch',
      'Ako povedať, že si niečo nemôžem dovoliť bez hanby',
      'Ako sa ozvať kvôli vráteniu požičaných peňazí',
      'Ako otvoriť dlh, spoločný rozpočet alebo finančné pravidlá doma',
    ],
    themeSlugs: ['hranice-a-dohody', 'konflikt-a-spolupraca', 'zmeny-a-prechody', 'zdravie-a-tazke-temy'],
    relatedLinks: [
      { label: 'Kompas pre páry', href: '/kompas/pary' },
      { label: 'Rozšírená rodina', href: '/kompas/rodina' },
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
    ],
    canonicalHref: '/kompas/peniaze',
  },
  {
    slug: 'zdravie',
    label: 'Zdravie',
    shortLabel: 'Zdravie',
    group: 'Zdravie',
    eyebrow: 'Choroba, starostlivosť, diagnóza',
    description:
      'Prvé vety pre diagnózy, dlhodobé choroby, starostlivosť o blízkych, rozhovory s lekárom aj témy smrti a straty.',
    lead:
      'Keď vstúpi do života choroba alebo slabnutie blízkeho, bežný jazyk často nestačí. Táto vetva pomáha hovoriť pravdivo, bez popretia a bez zbytočného chaosu.',
    featuredSituations: [
      'Ako povedať rodine o vážnej diagnóze',
      'Ako hovoriť o starostlivosti o starého rodiča alebo o vlastnom limite',
      'Ako sa ozvať lekárovi, keď sa necítim vypočutý',
      'Ako reagovať, keď mi niekto povie o ťažkej chorobe',
    ],
    themeSlugs: ['zdravie-a-tazke-temy', 'emocie-a-regulacia', 'zmeny-a-prechody'],
    relatedLinks: [
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
      { label: 'Rozšírená rodina', href: '/kompas/rodina' },
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
    ],
    canonicalHref: '/kompas/zdravie',
  },
  {
    slug: 'susedia',
    label: 'Susedia',
    shortLabel: 'Susedia',
    group: 'Susedia',
    eyebrow: 'Spoločný priestor bez eskalácie',
    description:
      'Krátke, použiteľné vstupy pre hluk, spolubývanie, nevhodné poznámky a porušovanie spoločných pravidiel.',
    lead:
      'Nie každý konflikt je intímny a nie každý sa dá vyriešiť mlčaním. Táto vetva je pre momenty, keď treba zasiahnuť pokojne, ale jasne vo verejnom alebo spoločnom priestore.',
    featuredSituations: [
      'Ako povedať susedovi, že ruší pokoj alebo spánok',
      'Ako riešiť opakujúci sa problém so spolubývajúcim',
      'Ako reagovať na rasistický alebo sexistický komentár v spoločnosti',
      'Ako slušne ukončiť návštevu alebo pomenovať porušenie pravidiel',
    ],
    themeSlugs: ['hranice-a-dohody', 'konflikt-a-spolupraca', 'identita-a-telo'],
    relatedLinks: [
      { label: 'Kompas témy', href: '/kompas/temy' },
      { label: 'Citlivé témy', href: '/kompas/publikum/citlive-temy' },
      { label: 'Online kartičky', href: '/apps/spoznajme-sa' },
    ],
    canonicalHref: '/kompas/susedia',
  },
  {
    slug: 'digitalna-komunikacia',
    label: 'Digitálna komunikácia',
    shortLabel: 'Digitálna komunikácia',
    group: 'Digitálna komunikácia',
    eyebrow: 'Telefóny, správy, online konflikt',
    description:
      'Vetva pre ghosting, toxické komentáre, online kritiku, čas na telefóne aj obsah, ktorý narúša vzťahy.',
    lead:
      'Veľa dnešných konfliktov nevzniká tvárou v tvár, ale cez obrazovku. Táto vetva dáva konkrétny jazyk na situácie, kde sa pozornosť, hranice a ticho dejú online.',
    featuredSituations: [
      'Ako reagovať na toxický komentár alebo online kritiku',
      'Ako povedať, že ma niekto ghostuje',
      'Ako otvoriť tému telefónu vo vzťahu alebo v rodine',
      'Ako pomenovať, že mi niečí obsah alebo štýl komunikácie nesedí',
    ],
    themeSlugs: ['digitalny-zivot', 'hranice-a-dohody', 'emocie-a-regulacia', 'zacinat-rozovor'],
    relatedLinks: [
      { label: 'Digitálny život', href: '/kompas/tema/digitalny-zivot' },
      { label: 'Deti', href: '/kompas/deti' },
      { label: 'Všetky témy Kompasu', href: '/kompas/temy' },
    ],
    canonicalHref: '/kompas/digitalna-komunikacia',
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
    audienceSlugs: ['rodic-dieta', 'deti', 'pary', 'priatelia', 'praca', 'vlastne-potreby', 'rodina', 'randenie', 'peniaze', 'zdravie', 'susedia', 'digitalna-komunikacia'],
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
    audienceSlugs: ['rodic-dieta', 'deti', 'pary', 'priatelia', 'citlive-temy', 'vlastne-potreby', 'rodina', 'rozchod', 'zdravie', 'digitalna-komunikacia'],
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
    audienceSlugs: ['rodic-dieta', 'pary', 'priatelia', 'praca', 'citlive-temy', 'vlastne-potreby', 'rodina', 'randenie', 'rozchod', 'peniaze', 'zdravie', 'susedia', 'digitalna-komunikacia'],
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
    audienceSlugs: ['rodic-dieta', 'pary', 'priatelia', 'praca', 'rodina', 'peniaze', 'susedia'],
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
    audienceSlugs: ['rodic-dieta', 'pary', 'praca', 'rodina', 'randenie', 'rozchod', 'peniaze', 'zdravie'],
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
    audienceSlugs: ['pary', 'priatelia', 'rodic-dieta', 'rozchod', 'praca'],
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
    audienceSlugs: ['rodic-dieta', 'deti', 'pary', 'digitalna-komunikacia'],
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
    audienceSlugs: ['rodic-dieta', 'deti', 'pary', 'citlive-temy', 'rodina', 'rozchod', 'peniaze', 'zdravie'],
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
    audienceSlugs: ['deti', 'pary', 'citlive-temy', 'vlastne-potreby', 'rodina', 'rozchod', 'susedia'],
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
  return KOMPAS_DATA.filter((item) => item.audienceSlug === slug)
}

export function getKompasThemeItems(slug: string) {
  const theme = getKompasThemeBySlug(slug)
  if (!theme) {
    return []
  }

  return KOMPAS_DATA.filter((item) => item.themeSlug === theme.slug)
}

export function getAudienceTopics(items: KompasItem[]) {
  return Array.from(new Set(items.map((item) => item.topic)))
}

export function getKompasScenarioCount() {
  return KOMPAS_SCENARIOS.length
}
