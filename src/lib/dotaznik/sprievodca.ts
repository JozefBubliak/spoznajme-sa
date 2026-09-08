// ─────────────────────────────────────────────────────────────────────────────
// Režim „Naživo" — obsah pre sprievodcu rozhovorom.
// Pre ľudí, ktorí o téme nemusia vedieť nič: čo to je → prečo to páry skúšajú →
// ako to bezpečne robiť → ako začať → otázky na rozhovor. Žiadne ukladanie.
//
// Kľúč = `${modul}` (úvod modulu) alebo `${modul}/${tema}`. Chýbajúce → fallback.
// Zdroj obsahu: docs/dotaznik-obsah/*.md
// ─────────────────────────────────────────────────────────────────────────────

export type SprievodcaUzol = {
  co?: string // čo to je (pre začiatočníka)
  preco?: string // prečo to páry skúšajú
  bezpecne?: string[] // bezpečnostné zásady
  akoZacat?: string[] // mikro-kroky
  prompty: string[] // otázky na rozhovor
}

export const SPRIEVODCA: Record<string, SprievodcaUzol> = {
  // ── Modul 1 — Predohra a naladenie ──────────────────────────────────────
  'predohra-naladenie': {
    co: 'Všetko „pred" a „okolo" fyzického — naladenie v hlave, tempo dňa, prostredie, spôsob, akým sa k sebe cez deň správate. Predohra nie je 5 minút pred sexom, je to celý kontext.',
    preco: 'Väčšina „problémov v posteli" sa začína mimo nej. Keď je naladenie a bezpečie, telo väčšinou nasleduje samo.',
    prompty: [
      'Kedy naposledy si cítil/a naozajstnú chuť — a čo tomu predchádzalo?',
      'Čo ti spoľahlivo chuť zapne? A čo ju spoľahlivo vypne?',
      'Potrebuješ dlhší nábeh, alebo ti stačí chvíľa?',
      'Ako by si chcel/a, aby to medzi nami začínalo?',
    ],
  },
  'predohra-naladenie/mentalna-priprava': {
    co: 'Fantázia, spomienky a vedomé spomalenie — „predohra pred predohrou", ktorá sa deje v hlave.',
    preco: 'Nahlas povedať, na čo myslím, býva ťažšie než samotný akt — a zároveň to najviac zbližuje.',
    akoZacat: ['Skúste si počas dňa poslať jednu vetu o tom, na čo sa večer tešíte.'],
    prompty: [
      'Fantazíruješ pred intimitou? O čom, ak to chceš zdieľať?',
      'Pomáha ti spomínať na naše zážitky? Ktorý sa ti vracia?',
      'Čo ti pomáha „vypnúť hlavu" — dych, pohyb, sprcha, rozhovor?',
      'Je niečo, čo by si mi chcel/a povedať, ale zatiaľ si sa neodvážil/a?',
    ],
  },

  // ── Modul 8 — Mocenská dynamika, BDSM a roleplay (VZOROVÁ ČASŤ) ─────────
  'mocenska-dynamika': {
    co: 'Konsenzuálna hra, kde si dvojica vedome a dočasne rozdelí rolu: „ten, kto vedie" (dominantný) a „ten, kto sa odovzdáva" (submisívny). Môže to byť len jemné vedenie tempa a slovné pokyny — alebo prepracované scény s pravidlami, viazaním, rekvizitami. Nie je to o skutočnej nerovnosti vo vzťahu; mimo spálne ste rovní partneri.',
    preco: 'Psychologická intenzita a „tunelové" sústredenie. Submisívny partner zažíva bezpečné odovzdanie a úľavu od rozhodovania; dominantný pocit istoty a dôvery. Paradoxne to vyžaduje viac komunikácie a dôvery než bežný sex — preto páry, ktoré to robia, často hlásia lepšie zladenie.',
    bezpecne: [
      'Bezpečné slovo: jedno slovo (napr. „červená") = OKAMŽITE stop, bez vysvetľovania. „žltá" = spomaľ / skontroluj ma.',
      'Ak niekto nemôže hovoriť (zakrytá tvár, roubík) → dohodnite signál rukou: 3× stisk alebo pustenie predmetu.',
      'Zoznam hraníc pred prvou scénou: čo je 🟢 áno, 🟡 za podmienok, 🔴 nikdy.',
      'Triezvi — nič nové neskúšajte pod vplyvom alkoholu.',
      'Aftercare vždy (viď téma „Aftercare"). „Drop" — útlm, plač, chlad, pochybnosti — môže prísť aj o deň-dva neskôr.',
      'Zviazaného partnera nikdy nenechávajte samého v miestnosti; nožnice po ruke.',
    ],
    akoZacat: [
      'Rozhovor bez tlaku na akciu — čo v predstave láka, čo je hranica.',
      'Mikroscéna 10–15 min: jeden vedie tempo a dá 2–3 jednoduché pokyny, druhý ich plní. Potom spätná väzba: 2 veci super, 2 upraviť.',
      'Pridávajte jeden prvok naraz (oslovenie → zaviazané oči → mäkké putá → …), vždy s bezpečným slovom.',
    ],
    prompty: [
      'Láka ťa v predstave skôr viesť, alebo sa odovzdať? Prečo?',
      'Čo by pre teba znamenalo „cítiť sa bezpečne", keby si sa mal/a odovzdať?',
      'Je niečo z tejto oblasti, čo ťa láka len ako fantázia, ale nie naživo?',
    ],
  },
  'mocenska-dynamika/d-s-dynamika': {
    co: 'Jeden partner preberá vedenie — slovné pokyny, rozhodovanie o polohách, tempe, o tom, kedy sa druhý smie dotknúť alebo vyvrcholiť. Druhý sa vedome odovzdáva. Veľa ľudí je „switch" — mení rolu podľa nálady.',
    preco: 'Submisívny: úľava, „stačí sa poddať a byť vedený". Dominantný: sústredená zodpovednosť za rozkoš toho druhého, sebaistota.',
    akoZacat: ['„Dnes večer ma veď ty" — 15 minút, druhý dáva jednoduché pokyny („zostaň", „pozeraj sa na mňa", „ešte nie").'],
    prompty: [
      'Ktorá rola ťa v predstave viac láka — viesť, alebo sa odovzdať?',
      'Sú oslovenia (Pane/Pani, meno, „zlato") pre teba sexy, alebo skôr trápne?',
      'Kontrola orgazmu (nesmieš, kým nedovolím / až na povel) — láka, alebo je to cez čiaru?',
      'Skúsili by sme si obaja vyskúšať aj opačnú rolu?',
    ],
  },
  'mocenska-dynamika/viazanie-bondage': {
    co: 'Obmedzenie pohybu — šatka, mäkké putá, popruhy pod posteľou, lano. Od symbolického („ruky nad hlavu, nehýb sa") po skutočné zviazanie.',
    preco: 'Znehybnenie zosilňuje každý dotyk (nemôžeš predvídať ani uhnúť) a prehlbuje pocit odovzdania alebo kontroly.',
    bezpecne: [
      'Nikdy okolo krku.',
      'Kontrolujte ruky (teplota, farba, mravčenie) — ak stŕpnu, hneď uvoľnite.',
      'Nožnice po ruke. Zviazaného nenechávajte samého. Max 20–30 min v jednej pozícii.',
      'Roubík len ako opt-in a nikdy pri riziku dýchania.',
    ],
    akoZacat: ['Zaviazané oči → šatka na zápästiach (ľahko sa vyvlečie) → putá o čelo postele. Vždy s dohodnutým signálom rukou.'],
    prompty: [
      'Láka ťa byť znehybnený/á, znehybniť partnera, alebo ani jedno?',
      'Čo je pre teba OK — šatka, mäkké putá, lano? Kde je hranica?',
      'Zaviazané oči — áno/nie? Roubík — áno/nie/nikdy?',
      'Aký signál použijeme, keď nebudeš môcť hovoriť?',
    ],
  },
  'mocenska-dynamika/impact-play': {
    co: 'Plesknutie po zadku rukou, paddle, jemný bičík (flogger). Od hravého plesknutia po intenzívnejšiu „scénu".',
    preco: 'Kombinácia miernej bolesti a rozkoše, adrenalín, rituál „potrestania" alebo katarzia. Po pár minútach menia endorfíny vnímanie.',
    bezpecne: [
      'Len zadok a stehná (mäkké, svalnaté). NIKDY chrbtica, obličky (spodná časť chrbta), kĺby, hlava, brucho.',
      'Vždy zahriať — najprv jemne, postupne silnejšie. Semafor „farby", počítajte údery, dohodnite max.',
      'Po scéne aftercare + skontrolujte modriny; 48 h pauza na regeneráciu.',
    ],
    akoZacat: ['Rukou po zadku počas sexu, jemne. Pýtajte si spätnú väzbu („viac/menej?"). Nástroje až keď máte istotu s rukou.'],
    prompty: [
      'Láka ťa dávať, dostávať, alebo ani jedno?',
      'Len ruka, alebo aj pomôcka (paddle, flogger)?',
      'Je to pre teba „hravé rozohriatie", alebo „scéna s dejom" (potrestanie)?',
      'Kde je tvoje jednoznačné „nie"?',
    ],
  },
  'mocenska-dynamika/senzoricka-deprivacia-bdsm': {
    co: 'Vypnutie zmyslov — zaviazané oči, slúchadlá / biely šum, kukla. Keď vypadne zrak a sluch, hmat a očakávanie zosilnejú.',
    preco: 'Zvýšená citlivosť, dezorientácia, hlbšie odovzdanie a sústredenie na telo. Silný „tunelový" zážitok.',
    bezpecne: [
      'Postupne — najprv len oči, potom pridať sluch.',
      'Vedúci partner musí byť neustále pri druhom a priebežne dávať najavo „som tu".',
      'Kontraindikácie: úzkosť, klaustrofóbia, panika.',
    ],
    akoZacat: ['Zaviazané oči na 5 min počas maznania. Ak je to príjemné, pridajte hudbu do slúchadiel.'],
    prompty: [
      'Láka ťa nevidieť? Nepočuť? Oboje naraz?',
      'Čo potrebuješ počuť alebo cítiť, aby si sa pri tom cítil/a bezpečne?',
      'Máš niekedy pocit stiesnenia alebo paniky pri zakrytej tvári?',
    ],
  },
  'mocenska-dynamika/dirty-talk-ponizovanie': {
    co: 'Slová ako nástroj — od jemného povzbudenia („áno, presne tak") cez rozkazy až po „špinavé" reči. Dva opačné smery: ponižovanie (opt-in, presné slová treba dohodnúť) a uctievanie („si bohyňa", „patríš mi").',
    preco: 'Slová menia dynamiku rýchlejšie než čokoľvek iné — budujú scénu a napätie, alebo naopak jemnosť.',
    bezpecne: [
      'Vopred si povedzte, ktoré slová/témy sú 🔴 (o tele, o minulosti, konkrétne nadávky).',
      'Ponižovanie je hra — funguje len ak sa obaja cítia bezpečne; mimo spálne to neprenášajte.',
    ],
    prompty: [
      'Aký tón ťa vzrušuje — nežné povzbudenie, rozkazy, alebo „špinavé" reči?',
      'Chceš oslovovať, byť oslovovaný/á, alebo oboje? Aké oslovenia?',
      'Ponižovanie: láka (a ktoré slová sú OK), alebo je úplne mimo?',
      'Ktoré slová alebo témy sú absolútna hranica?',
    ],
  },
  'mocenska-dynamika/roleplay': {
    co: 'Zahranie postáv a situácie — mocenské (šéf/podriadený, učiteľ/študent — dospelí, vypočúvanie), fantazijné (lekár/pacient, neznámi na prvom rande, dlho odlúčení). Bez tretej osoby.',
    preco: '„Nie som to ja" znižuje hanbu a tlak na výkon — dovolí povedať a robiť veci, ktoré by inak boli trápne. Hravosť a novosť.',
    akoZacat: ['Jednoduchý scenár na 10 min — napr. „stretli sme sa dnes prvýkrát". Kostýmy nie sú nutné, stačí zmena oslovenia a tónu. Po scéne vedomé „vypnutie roly" — pár viet ako vy dvaja.'],
    prompty: [
      'Láka ťa roleplay vôbec? Skôr romantický, alebo mocenský?',
      'Ktorý scenár by si si chcel/a skúsiť ako prvý?',
      'Chceš scenár dopredu dohodnutý, alebo improvizovať?',
      'Je nejaká postava alebo situácia, ktorá je pre teba nepríjemná?',
    ],
  },
  'mocenska-dynamika/aftercare': {
    co: 'Vedomá starostlivosť po intímnej chvíli, najmä po intenzívnejšej scéne. Fyzická (objatie, deka, voda, sprcha, jedlo) aj emočná (uistenie, „ako ti bolo", humor, alebo naopak ticho).',
    preco: 'Po silnom zážitku telo aj hlava „klesnú" — útlm, plačlivosť, chlad, pochybnosti. Aftercare tento pád zachytí. „Drop" môže prísť aj o deň-dva neskôr.',
    prompty: [
      'Čo potrebuješ hneď po sexe — objatie a slová, ticho, sprchu, jedlo, spánok?',
      'Ako dlho? Čo ti naopak nesadne (hneď telefón, hneď vstať)?',
      'Po náročnejšej scéne — chceš check-in správu na druhý deň?',
      'Ako mi dáš najavo, že prichádza „drop" a čo vtedy potrebuješ?',
    ],
  },
}

/** Fallback pre moduly/témy bez ručného obsahu. */
export function sprievodcaUzol(kluc: string, popis: string): SprievodcaUzol {
  const rucny = SPRIEVODCA[kluc]
  if (rucny) return rucny
  return {
    prompty: [
      `Porozprávajte sa o téme: ${popis}`,
      'Čo z toho každého z vás láka — reálne alebo len ako predstava?',
      'Kde má každý z vás hranicu, ktorú nechce prekročiť?',
      'Skúsili by sme z toho niečo v najjemnejšej verzii?',
    ],
  }
}
