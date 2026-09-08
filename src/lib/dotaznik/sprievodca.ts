// ─────────────────────────────────────────────────────────────────────────────
// Režim „Naživo" — obsah pre sprievodcu rozhovorom.
// Žiadne ukladanie. Edu-box + otázky na diskusiu pre pár.
// Kľúč = `${modul}` alebo `${modul}/${tema}`. Chýbajúce → generický fallback.
// ─────────────────────────────────────────────────────────────────────────────

export type SprievodcaUzol = {
  edu?: string
  prompty: string[]
}

export const SPRIEVODCA: Record<string, SprievodcaUzol> = {
  'predohra-naladenie': {
    edu: 'Väčšina „problémov v posteli" sa začína mimo nej — v hlave, v tempe dňa, v tom, ako sa k sebe cez deň správame. Predohra nie je 5 minút pred sexom, je to celý kontext.',
    prompty: [
      'Kedy naposledy si cítil/a naozajstnú chuť — a čo tomu predchádzalo?',
      'Čo ti spoľahlivo chuť zapne? A čo ju spoľahlivo vypne?',
      'Potrebuješ dlhší nábeh, alebo ti stačí chvíľa?',
      'Ako by si chcel/a, aby to medzi nami začínalo?',
    ],
  },
  'predohra-naladenie/mentalna-priprava': {
    edu: 'Fantázia, spomienky a vedomé spomalenie sú „predohra pred predohrou". Nahlas povedať, na čo myslím, býva ťažšie než samotný akt — a zároveň to najviac zbližuje.',
    prompty: [
      'Fantazíruješ pred intimitou? O čom, ak to chceš zdieľať?',
      'Pomáha ti spomínať na naše zážitky? Ktorý sa ti vracia?',
      'Čo ti pomáha „vypnúť hlavu" — dych, pohyb, sprcha, rozhovor?',
      'Je niečo, čo by si chcel/a mi povedať, ale zatiaľ si sa neodvážil/a?',
    ],
  },
  'predohra-naladenie/iniciacia': {
    prompty: [
      'Kto z nás zvyčajne začína? Vyhovuje ti to?',
      'Ako by si chcel/a byť pozývaný/á — priamo, náznakom, hravo?',
      'Ako ti mám dať najavo „nie dnes" tak, aby to nebolelo?',
    ],
  },
  'bozky-dotyky-maznanie': {
    edu: 'Dotyk bez cieľa (nie ako „predohra k niečomu") je pre veľa ľudí to, čo najviac chýba. Aj tu sa oplatí pýtať sa na konkrétnosti — kde, ako silno, akým tempom.',
    prompty: [
      'Aký dotyk ťa najviac upokojí? A ktorý vzruší?',
      'Je nejaká zóna, ktorú mám obchádzať, kým nepovieš?',
      'Chýba ti maznanie bez toho, aby muselo niekam viesť?',
    ],
  },
}

/** Fallback pre moduly/témy bez ručného obsahu. */
export function sprievodcaUzol(kluc: string, popis: string): SprievodcaUzol {
  const rucny = SPRIEVODCA[kluc]
  if (rucny) return rucny
  return {
    edu: undefined,
    prompty: [
      `Porozprávajte sa o téme: ${popis}`,
      'Čo z toho každého z vás láka — reálne alebo len ako predstava?',
      'Kde má každý z vás hranicu, ktorú nechce prekročiť?',
      'Skúsili by sme z toho niečo v najjemnejšej verzii?',
    ],
  }
}
