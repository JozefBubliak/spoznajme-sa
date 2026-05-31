export const PROPOSALS = [
  // Romantika
  { key: "r1", category: "Romantika", title: "Večerná prechádzka bez telefónu", icon: "🌙" },
  { key: "r2", category: "Romantika", title: "Variť spolu večeru od základov", icon: "🍝" },
  { key: "r3", category: "Romantika", title: "Sledovať západ slnka spolu", icon: "🌅" },
  { key: "r4", category: "Romantika", title: "Zapáliť sviečky a jesť doma", icon: "🕯️" },
  { key: "r5", category: "Romantika", title: "Napísať si navzájom list", icon: "💌" },
  { key: "r6", category: "Romantika", title: "Ísť na kávu ako na prvé rande", icon: "☕" },
  { key: "r7", category: "Romantika", title: "Spolu pozerať hviezdy", icon: "⭐" },

  // Dobrodružstvo
  { key: "a1", category: "Dobrodružstvo", title: "Vyskúšať nový šport alebo aktivitu", icon: "🧗" },
  { key: "a2", category: "Dobrodružstvo", title: "Spontánny výlet bez plánovania", icon: "🗺️" },
  { key: "a3", category: "Dobrodružstvo", title: "Navštíviť miesto, kde sme ešte neboli", icon: "📍" },
  { key: "a4", category: "Dobrodružstvo", title: "Ísť na výlet na celý deň", icon: "🚗" },
  { key: "a5", category: "Dobrodružstvo", title: "Skúsiť tanec alebo kurz spolu", icon: "💃" },
  { key: "a6", category: "Dobrodružstvo", title: "Víkend v inom meste", icon: "🏙️" },

  // Doma
  { key: "d1", category: "Doma & pohoda", title: "Deň lenivosti doma spolu", icon: "🛋️" },
  { key: "d2", category: "Doma & pohoda", title: "Spoločné čítanie alebo podcast", icon: "📚" },
  { key: "d3", category: "Doma & pohoda", title: "Pozerať celú sériu cez víkend", icon: "📺" },
  { key: "d4", category: "Doma & pohoda", title: "Spoločné raňajky v posteli", icon: "🥐" },
  { key: "d5", category: "Doma & pohoda", title: "Urobiť si SPA doma", icon: "🧖" },
  { key: "d6", category: "Doma & pohoda", title: "Hrať spoločenské hry", icon: "🎲" },

  // Rozhovor
  { key: "c1", category: "Rozhovor", title: "Povedať si, čo nám v poslednom čase chýbalo", icon: "💬" },
  { key: "c2", category: "Rozhovor", title: "Porozprávať sa o budúcnosti – 5 rokov dopredu", icon: "🔮" },
  { key: "c3", category: "Rozhovor", title: "Povedať si, čo si na druhom ceníme", icon: "⭐" },
  { key: "c4", category: "Rozhovor", title: "Prebrať tému financií a spoločných cieľov", icon: "💰" },
  { key: "c5", category: "Rozhovor", title: "Otvorene hovoriť o rodine", icon: "👨‍👩‍👧" },
  { key: "c6", category: "Rozhovor", title: "Povedať si, čo by sme zmenili v každodennom živote", icon: "🔄" },

  // Blízkosť
  { key: "b1", category: "Blízkosť", title: "Masáž bez očakávaní", icon: "🤲" },
  { key: "b2", category: "Blízkosť", title: "Povedať si, čo sa nám páči na druhom", icon: "🌸" },
  { key: "b3", category: "Blízkosť", title: "Tancovať doma spolu", icon: "🎵" },
  { key: "b4", category: "Blízkosť", title: "Objímať sa aspoň 20 sekúnd každý deň", icon: "🤗" },
  { key: "b5", category: "Blízkosť", title: "Večer len pre nás dvoch – bez obrazovky", icon: "❤️" },
  { key: "b6", category: "Blízkosť", title: "Prekvapenie bez dôvodu", icon: "🎁" },
];

export const CATEGORIES = [...new Set(PROPOSALS.map(p => p.category))];