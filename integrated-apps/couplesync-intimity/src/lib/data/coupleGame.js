export const CHALLENGES = [
  // Romantika
  { key: 'r1', category: 'Romantika', text: 'Povedz partnerovi jednu vec, ktor\u00fa si na \u0148om/\u0148ej v\u0161imol/a dnes.', emoji: '\ud83d\udc9c', duration: null },
  { key: 'r2', category: 'Romantika', text: 'Zatancujte si spolu – aspoň na jednu pieseň, ktorú vyberie partner.', emoji: '\ud83d\udc83', duration: '3 min' },
  { key: 'r3', category: 'Romantika', text: 'Napíš partnerovi správu: "Ke\u010f som s tebou, najviac sa c\u00edtim..."', emoji: '\ud83d\udc8c', duration: null },
  { key: 'r4', category: 'Romantika', text: 'Spomnite si na prv\u00e9 rande \u2013 ka\u017ed\u00fd povie 1 vec, ktor\u00fa si zapamätal/a.', emoji: '\ud83c\udf39', duration: null },
  { key: 'r5', category: 'Romantika', text: 'Objímajte sa presne 60 sek\u00fand bez prerušenia.', emoji: '\ud83e\udd17', duration: '60s' },
  { key: 'r6', category: 'Romantika', text: 'Pozrite sa sebe navzájom do o\u010d\u00ed 2 min\u00faty bez hovorenia.', emoji: '\ud83d\udc40', duration: '2 min' },

  // Blízkosť
  { key: 'b1', category: 'Blízkosť', text: 'Každý povie partnerovi jednu vec, za ktorú mu/jej je tento týždeň vďačný/á.', emoji: '\u2764\ufe0f', duration: null },
  { key: 'b2', category: 'Blízkosť', text: 'Povedz: "Nikdy som ti nepovedal/a, ale..."', emoji: '\ud83e\udd2b', duration: null },
  { key: 'b3', category: 'Blízkosť', text: 'Každý povie 3 veci, ktoré si na tom druhom cení.', emoji: '\u2b50', duration: null },
  { key: 'b4', category: 'Blízkosť', text: 'Povedz partnerovi, ktoré jeho/jej gesto ti naposledy urobilo radosť.', emoji: '\ud83d\ude0a', duration: null },
  { key: 'b5', category: 'Blízkosť', text: 'Povedzte si navzájom jeden strach, ktorý máte a doteraz ste ho nezdieľali.', emoji: '\ud83d\udc9b', duration: null },
  { key: 'b6', category: 'Blízkosť', text: 'Vytvorte spolu bud\u00facnos\u0165 \u2013 ka\u017ed\u00fd povie 1 vec, ktor\u00fa chce za\u017ei\u0165 spolu.', emoji: '\ud83d\udd2e', duration: null },

  // Humor
  { key: 'h1', category: 'Humor', text: 'Napíšte si navzájom smiešny riadok životopisu – jednou vetou. Prečítajte ho nahlas.', emoji: '\ud83d\ude02', duration: null },
  { key: 'h2', category: 'Humor', text: 'Každý napodobní druhého – typické gesto, frázu alebo ranný zvyk.', emoji: '\ud83e\udd73', duration: null },
  { key: 'h3', category: 'Humor', text: 'Vymyslite spolu neuveriteľný príbeh – striedajte sa po jednej vete.', emoji: '\ud83d\udcdd', duration: null },
  { key: 'h4', category: 'Humor', text: 'Každý povie 1 vec, ktorú druhý robí smiešne – ale milo, nie kriticky.', emoji: '\ud83d\ude42', duration: null },

  // Odvaha
  { key: 'o1', category: 'Odvaha', text: 'Ka\u017ed\u00fd povie nie\u010do, \u010do by za normálnych okolností \u010dakal/a dlho poveda\u0165.', emoji: '\ud83d\udca1', duration: null },
  { key: 'o2', category: 'Odvaha', text: 'Povedz: "Chcem, aby si vedel/vedela, \u017ee..." \u2013 ni\u010do nepridaj.', emoji: '\ud83d\udd25', duration: null },
  { key: 'o3', category: 'Odvaha', text: 'Povedz partnerovi, \u010do by sa zmenilo, keby ste za\u010d\u00ednali odznova dnes.', emoji: '\u21aa\ufe0f', duration: null },
  { key: 'o4', category: 'Odvaha', text: 'Ka\u017ed\u00fd povie 1 vec, ktor\u00fa by chcel/a vo vz\u0165ahu zmeni\u0165 alebo robi\u0165 inak.', emoji: '\ud83d\udd04', duration: null },
  { key: 'o5', category: 'Odvaha', text: 'Povedz: "Ke\u010f som \u0165a prvýkrát videl/a, pomyslel/a som si..."', emoji: '\ud83e\udd14', duration: null },

  // Objavovanie
  { key: 'ob1', category: 'Objavovanie', text: 'Každý položí druhému jednu otázku, ktorú sa ho ešte nikdy nepýtal.', emoji: '\ud83d\udd0d', duration: null },
  { key: 'ob2', category: 'Objavovanie', text: 'Povedzte si, ktor\u00e9 rozhodnutia vo v\u00e1\u0161 \u017eivote boli najd\u00f4le\u017eitej\u0161ie.', emoji: '\ud83d\udee4', duration: null },
  { key: 'ob3', category: 'Objavovanie', text: 'Povedz 1 vec, na ktorú sa tešíš v budúcnosti, a 1 vec, ktorej sa obávaš.', emoji: '\ud83e\udde0', duration: null },
  { key: 'ob4', category: 'Objavovanie', text: 'Ak by ste mohli dnes spolu začať niečo nové, čo by to bolo?', emoji: '\ud83c\udf1f', duration: null },
];

export const CATEGORIES = [...new Set(CHALLENGES.map(c => c.category))];
