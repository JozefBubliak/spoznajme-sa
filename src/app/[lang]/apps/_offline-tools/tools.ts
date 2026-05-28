export type ToolKind = 'random' | 'missions' | 'library' | 'ideas'

export type OfflineItem = {
  cat?: string
  budget?: number
  emoji: string
  title: string
  desc: string
  steps?: string[]
  why?: string
  context?: string
  soft?: string
  direct?: string
  avoid?: string
  question?: string
  note?: string
  minPlayers?: number
  duration?: string
  usesPhone?: boolean
}

export type FilterOption = {
  key: string
  label: string
  color?: string
  desc?: string
}

export type OfflineTool = {
  slug: string
  kind: ToolKind
  icon: string
  title: string
  subtitle: string
  theme: string
  bg: string
  button: string
  emptyText: string
  primaryAction: string
  nextAction: string
  filters?: FilterOption[]
  budgets?: FilterOption[]
  items: OfflineItem[]
  itemsAlt?: OfflineItem[]
}

const q = (text: string) => `„${text}“`

export const OFFLINE_TOOLS: Record<string, OfflineTool> = {
  'rande': {
    slug: 'rande',
    kind: 'random',
    icon: '💑',
    title: 'Rande bez nudy',
    subtitle: 'Náhodné rande nápady od 0 EUR do 50 EUR. Spontánne, hlboké aj odvážne.',
    theme: 'from-orange-500 to-rose-500',
    bg: 'from-amber-50 via-orange-50 to-rose-50',
    button: 'from-orange-500 to-rose-500',
    emptyText: 'Vyber parametre a nechaj si vylosovať rande.',
    primaryAction: 'Daj mi rande nápad',
    nextAction: 'Ďalší nápad',
    budgets: [
      { key: '0', label: 'Zadarmo', desc: '0 EUR', color: 'from-green-400 to-teal-500' },
      { key: '10', label: 'Malý', desc: 'do 10 EUR', color: 'from-sky-400 to-blue-500' },
      { key: '50', label: 'Víkend', desc: 'do 50 EUR', color: 'from-violet-400 to-purple-600' },
    ],
    filters: [
      { key: 'all', label: 'Všetky' },
      { key: 'spontanne', label: '⚡ Spontánne' },
      { key: 'hlboke', label: '💬 Hlboké' },
      { key: 'adventurozne', label: '🎲 Odvážne' },
    ],
    items: [
      { budget: 0, cat: 'spontanne', emoji: '🌙', title: 'Nočná prechádzka', desc: 'Vyjdite von keď je tma. Bez cieľa, bez telefónu, len s teplým oblečením.', steps: ['Oblečte sa teplo.', 'Vyberte ľubovoľný smer.', 'Hovorte o niečom, čo ste dlho neriešili.'], why: 'Tma odstraňuje rozptýlenie. Ľudia sú v noci úprimnejší.' },
      { budget: 0, cat: 'hlboke', emoji: '📸', title: 'Staré fotky', desc: 'Nájdite staré fotografie a rozprávajte sa o každej.', steps: ['Vyberte album alebo galériu.', 'Každá fotka rovná sa jedna spomienka.', 'Opýtajte sa: čo si vtedy cítil/a?'], why: 'Spomienky posilňujú väzbu.' },
      { budget: 0, cat: 'spontanne', emoji: '🎲', title: 'Náhodné odbočky', desc: 'Choďte pešo a na každej križovatke hádžte mincou.', steps: ['Vyjdite von.', 'Hlava vľavo, znak vpravo.', 'Po 30 minútach sa zastavte a pozrite, kde ste.'], why: 'Náhoda ruší plány. A to je celý zmysel.' },
      { budget: 10, cat: 'adventurozne', emoji: '🛒', title: 'Sekáč výzva', desc: 'Každý má 5 EUR a 15 minút nájsť druhému niečo, čo ho vystihuje.', steps: ['Choďte do secondhandu.', 'Nakupujte oddelene.', 'Ukážte, čo ste kúpili a prečo.'], why: 'Zistíte viac o tom, ako vás partner vníma.' },
      { budget: 10, cat: 'hlboke', emoji: '🍰', title: 'Dezert a rozhovor', desc: 'Jeden dezert, dve lyžice, jedna téma.', steps: ['Objednajte jeden dezert na dvoch.', 'Každý si pripraví jednu tému.', 'Hovorte, kým dezert zmizne.'], why: 'Zdieľaný tanier vie vytvoriť zdieľanú pozornosť.' },
      { budget: 50, cat: 'spontanne', emoji: '🎬', title: 'Kino a diskusia', desc: 'Film podľa výberu toho, koho ste dlho nechali nevyberať.', steps: ['Vyberá ten, kto zvyčajne nevyberá.', 'Pred filmom si tipnite dej.', 'Po filme povedzte, čo vám pripomenul z vášho života.'], why: 'Film je zrkadlo. Rozhovor o ňom je blízkosť.' },
      { budget: 50, cat: 'adventurozne', emoji: '🧩', title: 'Escape room', desc: '60 minút spolupráce bez možnosti odísť.', steps: ['Vyberte tematiku, ktorú ste neskúšali.', 'Nehádajte sa, len spolupracujte.', 'Po hre si povedzte, čo ste zistili o spolupráci.'], why: 'Tlak odhalí, ako ste tím.' },
      { budget: 50, cat: 'hlboke', emoji: '♨️', title: 'Wellness poldeň', desc: 'Kúpeľ, sauna, ticho. Žiadne pracovné témy.', steps: ['Rezervujte vstupy.', 'Telefóny nechajte v skrinke.', 'Jedna téma: čo chceme o rok?'], why: 'Oddych spolu je iný ako oddych zvlášť.' },
    ],
  },
  'rozbi-rutinu': {
    slug: 'rozbi-rutinu',
    kind: 'random',
    icon: '💥',
    title: 'Rozbi rutinu',
    subtitle: 'Offline výzvy pre pár od miernych po šialené. Telefón ukáže výzvu a ide bokom.',
    theme: 'from-purple-600 to-fuchsia-600',
    bg: 'from-purple-50 via-fuchsia-50 to-pink-50',
    button: 'from-purple-600 to-fuchsia-600',
    emptyText: 'Stlač tlačidlo a vylosuj výzvu.',
    primaryAction: 'Prvá výzva',
    nextAction: 'Ďalšia výzva',
    filters: [
      { key: 'all', label: 'Všetky' },
      { key: 'mirne', label: '😊 Mierne' },
      { key: 'trapne', label: '😳 Trápne' },
      { key: 'adventurozne', label: '🎲 Odvážne' },
      { key: 'odvazne', label: '🔥 Šialené' },
    ],
    items: [
      { cat: 'mirne', emoji: '🚶', title: 'Iná cesta domov', desc: 'Choďte domov inou trasou. Bez navigácie. Ak sa stratíte, tým lepšie.' },
      { cat: 'mirne', emoji: '📵', title: 'Hodina bez telefónu', desc: 'Obaja odložte telefóny. 60 minút. Hovorte, mlčte, ale nie do obrazovky.' },
      { cat: 'mirne', emoji: '🎵', title: 'Jedna pieseň spolu', desc: 'Vyberte si každý jednu pesničku a vysvetlite, prečo ju máte na srdci.' },
      { cat: 'trapne', emoji: '🤳', title: 'Najhoršia selfie', desc: 'Súťaž: kto urobí horšiu selfie. Víťaz vyberá, čo robíte zajtra.' },
      { cat: 'trapne', emoji: '🎭', title: 'Alter ego', desc: 'Na 30 minút ste iní ľudia. Iné mená, iné charaktery. Prvý smiech prehráva.' },
      { cat: 'adventurozne', emoji: '🪙', title: 'Mincový výlet', desc: 'Sadnite do auta. Na každej križovatke hodíte mincou. Po 45 minútach zastavíte.' },
      { cat: 'adventurozne', emoji: '🌅', title: 'Západ slnka', desc: 'Nájdite miesto s výhľadom a buďte tam presne pri západe. Bez telefónov.' },
      { cat: 'odvazne', emoji: '🎭', title: 'Cudzinci v bare', desc: 'Stretnite sa v bare samostatne. Falošné mená. Jeden druhého musí zbaliť od začiatku.' },
    ],
  },
  'misie': {
    slug: 'misie',
    kind: 'missions',
    icon: '🎯',
    title: 'Tajné misie',
    subtitle: 'Konkrétny impulz na dnes. Pre neho aj pre ňu. Žiadne všeobecnosti.',
    theme: 'from-amber-500 to-orange-500',
    bg: 'from-yellow-50 via-amber-50 to-orange-50',
    button: 'from-amber-500 to-orange-500',
    emptyText: 'Vyber komu je misia určená a vylosuj dnešný impulz.',
    primaryAction: 'Daj mi misiu na dnes',
    nextAction: 'Iná misia',
    items: [
      { emoji: '📱', title: 'Správa bez logistiky', desc: 'Pošli jej správu dnes. Nie otázku. Nie plán. Len niečo, čo si si na nej všimol.' },
      { emoji: '☕', title: 'Káva bez pýtania', desc: 'Priprav jej kávu presne tak, ako ju má rada. Bez toho, aby musela žiadať.' },
      { emoji: '🌸', title: 'Jeden kvet bez dôvodu', desc: 'Kúp jej cestou domov jeden kvet. Nie kyticu. Len tak, pretože si si spomenul.' },
      { emoji: '👀', title: 'Všimni si detail', desc: 'Dnes si všimni niečo konkrétne a povedz to nahlas.' },
      { emoji: '📝', title: 'Odkaz na zrkadle', desc: 'Nechaj jej krátky odkaz. Jedna veta. Konkrétna, nie všeobecná.' },
      { emoji: '🌙', title: 'Nočná prechádzka', desc: 'Pozvi ju na krátku prechádzku. Bez cieľa, bez telefónov.' },
    ],
    itemsAlt: [
      { emoji: '🏆', title: 'Konkrétna pochvala', desc: 'Dnes mu povedz jednu vec, ktorú robí dobre. Nie všeobecne, ale presne.' },
      { emoji: '🤫', title: 'Nechaj priestor', desc: 'Daj mu hodinu pre seba bez komentárov a bez otázok.' },
      { emoji: '💌', title: 'Správa cez deň', desc: 'Pošli mu správu, ktorá ho prekvapí. Hravú, vtipnú alebo milú. Nie logistiku.' },
      { emoji: '🌟', title: 'Pochváľ ho pred niekým', desc: 'Povedz pred niekým jednu konkrétnu vec, ktorú si na ňom vážiš.' },
      { emoji: '💬', title: 'Vypočuj bez riešenia', desc: 'Keď ti dnes niečo povie, neopravuj. Opýtaj sa: a čo cítiš?' },
    ],
  },
  'car-games': {
    slug: 'car-games',
    kind: 'library',
    icon: '🚗',
    title: 'Hry do auta',
    subtitle: 'Slovné hry na dlhé cesty. Telefón ukáže pravidlá a potom ide bokom.',
    theme: 'from-sky-500 to-indigo-600',
    bg: 'from-sky-50 via-blue-50 to-indigo-50',
    button: 'from-sky-500 to-indigo-600',
    emptyText: 'Vyber hru a rozklikni pravidlá.',
    primaryAction: 'Otvoriť pravidlá',
    nextAction: 'Ďalšia hra',
    filters: [
      { key: 'all', label: 'Všetky' },
      { key: 'vsetci', label: '👨‍👩‍👧‍👦 Pre všetkých' },
      { key: 'dospeli', label: '🍸 Dospelí' },
      { key: 'deti', label: '🧒 Deti' },
    ],
    items: [
      { cat: 'vsetci', emoji: '⚽', title: 'Slovný futbal', desc: 'Každé slovo začína posledným písmenom predchádzajúceho.', minPlayers: 2, duration: 'bez limitu', steps: ['Prvý hráč povie podstatné meno.', 'Ďalší povie slovo na posledné písmeno.', 'Kto nevie do 5 sekúnd, vypadáva.'] },
      { cat: 'vsetci', emoji: '🎭', title: 'Kto som?', desc: 'Uhádni osobu alebo postavu pomocou áno/nie otázok.', minPlayers: 2, duration: '5-10 min', steps: ['Jeden si vyberie osobu.', 'Ostatní sa pýtajú iba áno/nie.', 'Max 20 otázok.'] },
      { cat: 'vsetci', emoji: '🤥', title: 'Pravda alebo lož', desc: 'Každý povie 2 pravdy a 1 lož. Ostatní hádajú.', minPlayers: 3, duration: '15-20 min', steps: ['Priprav 3 tvrdenia.', 'Prečítaj ich v ľubovoľnom poradí.', 'Ostatní tipujú lož.'] },
      { cat: 'vsetci', emoji: '🗺️', title: 'Mesto-krajina-rieka', desc: 'Kto prvý vyplní kategórie na dané písmeno, vyhráva kolo.', minPlayers: 2, duration: 'bez limitu', steps: ['Vyberte kategórie.', 'Zastavte abecedu.', 'Bod za unikátnu odpoveď.'] },
      { cat: 'vsetci', emoji: '📖', title: 'Spoločný príbeh', desc: 'Každý pridá jednu vetu. Čím absurdnejší príbeh, tým lepšie.', minPlayers: 2, duration: '10-15 min', steps: ['Prvý začne jednou vetou.', 'Každý pridá práve jednu vetu.', 'Koniec si dohodnite dopredu.'] },
      { cat: 'dospeli', emoji: '🕵️', title: 'Špión', desc: 'Jeden hráč nevie, kde sa nachádza. Ostatní ho musia odhaliť.', minPlayers: 3, duration: '10-15 min', usesPhone: true, steps: ['Zvoľte tajnú lokáciu.', 'Jeden hráč je špión.', 'Pýtajte sa otázky súvisiace s lokáciou.'] },
      { cat: 'deti', emoji: '🚗', title: 'Počítame autá', desc: 'Každý si vyberie farbu. Kto napočíta 20 áut svojej farby, vyhráva.', minPlayers: 2, duration: 'podľa trasy', steps: ['Každý si vyberie farbu.', 'Počítajú sa protiidúce autá.', 'Prvý pri 20 vyhráva.'] },
    ],
  },
  'kompas': {
    slug: 'kompas',
    kind: 'library',
    icon: '💬',
    title: 'Ťažké rozhovory',
    subtitle: 'Vety do reálnych situácií. Ako začať, čo povedať a čomu sa vyhnúť.',
    theme: 'from-blue-600 to-indigo-600',
    bg: 'from-blue-50 via-indigo-50 to-violet-50',
    button: 'from-blue-600 to-indigo-600',
    emptyText: 'Vyber situáciu a otvor konkrétne vety.',
    primaryAction: 'Otvoriť situáciu',
    nextAction: 'Ďalšia situácia',
    filters: [
      { key: 'all', label: 'Všetky' },
      { key: 'potreba', label: '💬 Potreba' },
      { key: 'konflikt', label: '😤 Konflikt' },
      { key: 'hranice', label: '❌ Hranice' },
      { key: 'ospravedlnenie', label: '🙏 Ospravedlnenie' },
      { key: 'intimita', label: '🌹 Intimita' },
    ],
    items: [
      { cat: 'potreba', emoji: '💬', title: 'Chýba mi pozornosť', context: 'Máte pocit, že ste vedľa seba, ale nie spolu.', desc: 'Pomenuj pocit, nie vinu.', soft: q('Chýbajú mi momenty, keď sme viac len my dvaja.'), direct: q('Mám pocit, že sme posledné týždne vedľa seba, nie spolu. Mohli by sme to zmeniť?'), avoid: 'Ty sa mi nikdy nevenuješ. / Vždy si len pri telefóne.', question: q('Kedy by sme si vedeli dať čas len pre nás?') },
      { cat: 'potreba', emoji: '😔', title: 'Som vyčerpaný/á', context: 'Nemáš silu, ale nechceš pôsobiť odtiahnuto.', desc: 'Krátke vysvetlenie zabráni domnienkam.', soft: q('Dnes som naozaj na dne. Potrebujem chvíľu kľudu.'), direct: q('Dnes nie som v stave veľa dávať. Nie je to o tebe, som len úplne vyčerpaný/á.'), avoid: 'Nechaj ma! / Mlčanie bez vysvetlenia.', question: q('Môžem mať dnes večer ticho? Zajtra budem viac tu.') },
      { cat: 'ospravedlnenie', emoji: '🙏', title: 'Chcem sa ospravedlniť', context: 'Urobil/a si niečo, čo bolelo.', desc: 'Skutočné ospravedlnenie neobsahuje ale.', soft: q('Ľutujem, čo som povedal/a. Zasiahlo to hlbšie, než som chcel/a.'), direct: q('Správal/a som sa zle a chcem, aby si vedel/a, že to beriem vážne. Prepáč mi.'), avoid: 'Prepáč, ale ty si... / Prepáč, ak sa ti to zdalo...', question: q('Čo by pomohlo, aby si sa cítil/a lepšie?') },
      { cat: 'konflikt', emoji: '😤', title: 'Začíname sa hádať', context: 'Rozhovor ide do slepej uličky.', desc: 'Pauza nie je útek. Je to prevencia.', soft: q('Počkaj. Chcem počúvať, nie súperiť. Skúsme to inak.'), direct: q('Potrebujem pauzu. Päť minút a potom pokračujeme, ale bez kričania.'), avoid: 'Vždy to isté ty! / Odchádzanie bez slova.', question: q('Čo potrebuješ, aby si sa cítil/a vypočutý/á?') },
      { cat: 'hranice', emoji: '❌', title: 'Chcem odmietnuť bez zranenia', context: 'Partner chce niečo a ty na to nemáš kapacitu.', desc: 'Odmietnutie s alternatívou je iné ako ticho.', soft: q('Dnes na to nemám. Môžeme na to zajtra?'), direct: q('Nie je to odmietnutie teba. Odmietam túto chvíľu.'), avoid: 'Nechaj ma na pokoji. / Neurčité odchyľovanie.', question: q('Môžeme nájsť čas, kedy na to budem?') },
      { cat: 'intimita', emoji: '🌹', title: 'Intímny život', context: 'Chceš hovoriť o blízkosti alebo o tom, čo chýba.', desc: 'Citlivé témy potrebujú bezpečný čas.', soft: q('Chcem sa porozprávať o nás a o tom, čo by som chcel/a viac. Bez tlaku.'), direct: q('Mám pocit, že v tejto oblasti sa nám komunikácia trochu zadrháva. Môžeme si to povedať?'), avoid: 'Nikdy nechceš... / Vždy si unavený/á...', question: q('Čo by ti pomohlo cítiť sa viac v bezpečí, keď sa o tom rozprávame?') },
    ],
  },
  'nezabudni': {
    slug: 'nezabudni',
    kind: 'ideas',
    icon: '💐',
    title: 'Nezabudni na ňu',
    subtitle: 'Konkrétny nápad šitý na mieru podľa toho, čo má druhý človek rád.',
    theme: 'from-rose-500 to-pink-600',
    bg: 'from-rose-50 via-pink-50 to-purple-50',
    button: 'from-rose-500 to-pink-600',
    emptyText: 'Vyplň krátky profil a dostaneš konkrétny nápad.',
    primaryAction: 'Daj mi nápad',
    nextAction: 'Ďalší nápad',
    items: [
      { emoji: '☕', title: 'Presne jej káva', desc: 'Priprav alebo dones kávu presne tak, ako ju má rada. Pridaj krátky odkaz bez veľkých slov.', steps: ['Zisti alebo si spomeň na presnú objednávku.', 'Dones ju bez pýtania.', 'Pridaj vetu: dnes som si na teba spomenul.'] },
      { emoji: '🌸', title: 'Jeden kvet', desc: 'Nie kytica a nie výročie. Jeden kvet len tak, nech to nepôsobí ako udalosť, ale pozornosť.', steps: ['Vyber jeden jednoduchý kvet.', 'Daj ho bez vysvetľovania.', 'Povedz jednu konkrétnu vec, ktorú si na nej vážiš.'] },
      { emoji: '📝', title: 'Odkaz na bežnom mieste', desc: 'Nechaj krátky odkaz tam, kde ho nájde počas obyčajného dňa.', steps: ['Napíš jednu konkrétnu vetu.', 'Daj ho na zrkadlo, do tašky alebo ku káve.', 'Nerob z toho veľké predstavenie.'] },
      { emoji: '🍓', title: 'Malý snack rituál', desc: 'Prines niečo malé, čo má rada, a priprav z toho desaťminútový spoločný moment.', steps: ['Vyber jedlo alebo nápoj, ktorý má rada.', 'Daj telefóny bokom.', 'Opýtaj sa: čo ti dnes urobilo dobre?'] },
      { emoji: '🚶', title: 'Krátka prechádzka', desc: 'Pozvi ju von bez programu. Len desať až dvadsať minút vedľa seba.', steps: ['Navrhni konkrétny čas.', 'Neberte slúchadlá.', 'Pýtaj sa viac, než rozprávaš.'] },
      { emoji: '🧹', title: 'Jedna vec za ňu', desc: 'Vybav jednu drobnú povinnosť, ktorú zvyčajne drží v hlave ona.', steps: ['Vyber viditeľnú praktickú vec.', 'Sprav ju bez otázok.', 'Nečakaj pochvalu, len odľahči deň.'] },
    ],
  },
}
