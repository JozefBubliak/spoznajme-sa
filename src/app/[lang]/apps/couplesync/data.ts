// ─────────────────────────────────────────────────────────────────
// CoupleSync – Dotazník sexuálnych preferencií
// ─────────────────────────────────────────────────────────────────

export type ScaleQuestion = {
  id: string
  type: 'scale'
  level: 1
  category: string
  emoji: string
  question: string
  scaleMin: string
  scaleMax: string
}

export type ChoiceOption = { value: string; label: string }
export type ChoiceQuestion = {
  id: string
  type: 'choice'
  level: 1
  category: string
  emoji: string
  question: string
  options: ChoiceOption[]
}

export type L1Question = ScaleQuestion | ChoiceQuestion

export type YmnoQuestion = {
  id: string
  type: 'ymno'
  level: 2
  category: string
  emoji: string
  question: string
}

// Y = Áno, M = Možno, N = Nie, O = Nikdy som neskúsil/a ale zaujíma ma
export type YmnoAnswer = 'Y' | 'M' | 'N' | 'O'
export type L1Answer = number | string

export type AnswerPayload = {
  name: string
  wantsLevel2: boolean
  l1: Record<string, L1Answer>
  l2: Record<string, YmnoAnswer>
}

// ─────────────────────────────────────────────────────────────────
// LEVEL 1 – Základná úroveň (15 otázok)
// ─────────────────────────────────────────────────────────────────
export const LEVEL1_QUESTIONS: L1Question[] = [
  {
    id: 'l1_01',
    type: 'scale',
    level: 1,
    category: 'Komunikácia',
    emoji: '💬',
    question: 'Rád/a hovorím so svojím partnerom/partnerkou o tom, čo nám v intímnom živote vyhovuje',
    scaleMin: 'Vôbec nie',
    scaleMax: 'Veľmi rád/a',
  },
  {
    id: 'l1_02',
    type: 'scale',
    level: 1,
    category: 'Emocionálna blízkosť',
    emoji: '❤️',
    question: 'Emocionálna blízkosť a dôvera sú pre mňa nevyhnutnou súčasťou intimity',
    scaleMin: 'Nie je to podmienka',
    scaleMax: 'Absolútne nevyhnutná',
  },
  {
    id: 'l1_03',
    type: 'scale',
    level: 1,
    category: 'Dotyk a blízkosť',
    emoji: '🤗',
    question: 'Fyzický dotyk a maznaníe (aj mimo sexu) sú pre mňa veľmi dôležité',
    scaleMin: 'Nie je to dôležité',
    scaleMax: 'Veľmi dôležité',
  },
  {
    id: 'l1_04',
    type: 'scale',
    level: 1,
    category: 'Otvorenosť',
    emoji: '🌱',
    question: 'Rád/a skúšam nové veci a experimenty v intímnom živote',
    scaleMin: 'Preferujem istotu',
    scaleMax: 'Rád/a experimentujem',
  },
  {
    id: 'l1_05',
    type: 'scale',
    level: 1,
    category: 'Vlastné potreby',
    emoji: '🗣️',
    question: 'Slobodne hovorím o tom, čo mi je príjemné a čo mi nevyhovuje',
    scaleMin: 'Je mi to ťažko povedať',
    scaleMax: 'Hovorím otvorene',
  },
  {
    id: 'l1_06',
    type: 'scale',
    level: 1,
    category: 'Záujem o partnera',
    emoji: '🎯',
    question: 'Je pre mňa dôležité aktívne zisťovať, čo sa páči môjmu partnerovi/partnerke',
    scaleMin: 'Nie veľmi',
    scaleMax: 'Veľmi dôležité',
  },
  {
    id: 'l1_07',
    type: 'scale',
    level: 1,
    category: 'Verbálne prejavy',
    emoji: '✨',
    question: 'Páči sa mi, keď partner/ka počas intimity verbálne vyjadruje, čo sa mu/jej páči',
    scaleMin: 'Nie',
    scaleMax: 'Veľmi áno',
  },
  {
    id: 'l1_08',
    type: 'scale',
    level: 1,
    category: 'Atmosféra',
    emoji: '😄',
    question: 'Humor, smiech a ľahkosť sú pre mňa prirodzenou súčasťou intímnych chvíľ',
    scaleMin: 'Preferujem vážnosť',
    scaleMax: 'Smiech mi vyhovuje',
  },
  {
    id: 'l1_09',
    type: 'scale',
    level: 1,
    category: 'Hranice',
    emoji: '🛡️',
    question: 'Cítim sa pohodlne, keď hovorím o svojich hraniciach a obmedzeniach',
    scaleMin: 'Je mi to ťažké',
    scaleMax: 'Hovorím bez problémov',
  },
  {
    id: 'l1_10',
    type: 'scale',
    level: 1,
    category: 'Fantázie',
    emoji: '💭',
    question: 'Rád/a zdieľam svoje fantázie a predstavy so svojím partnerom/partnerkou',
    scaleMin: 'To si nechávam pre seba',
    scaleMax: 'Rád/a zdieľam',
  },
  {
    id: 'l1_11',
    type: 'choice',
    level: 1,
    category: 'Iniciatíva',
    emoji: '🎬',
    question: 'V intimite preferujem skôr...',
    options: [
      { value: 'A', label: 'Iniciovať – ja rád/a začínam' },
      { value: 'B', label: 'Reagovať – páči sa mi, keď začne partner/ka' },
      { value: 'C', label: 'Striedame sa – záleží od nálady' },
    ],
  },
  {
    id: 'l1_12',
    type: 'choice',
    level: 1,
    category: 'Atmosféra',
    emoji: '🕯️',
    question: 'Aký typ atmosféry mi viac vyhovuje?',
    options: [
      { value: 'A', label: 'Romantická – sviečky, hudba, príprava' },
      { value: 'B', label: 'Spontánna – tu a teraz, bez prípravy' },
      { value: 'C', label: 'Oba typy rovnako' },
    ],
  },
  {
    id: 'l1_13',
    type: 'choice',
    level: 1,
    category: 'Tempo',
    emoji: '⏱️',
    question: 'Čo sa týka tempa, preferujem...',
    options: [
      { value: 'A', label: 'Pomalé a intenzívne – každý moment' },
      { value: 'B', label: 'Rýchle a vášnivé – dynamické' },
      { value: 'C', label: 'Záleží od situácie a nálady' },
    ],
  },
  {
    id: 'l1_14',
    type: 'choice',
    level: 1,
    category: 'Čas',
    emoji: '🌅',
    question: 'Intímne chvíle mi najlepšie vyhovujú...',
    options: [
      { value: 'A', label: 'Ráno – s čerstvou energiou' },
      { value: 'B', label: 'Večer – po dni' },
      { value: 'C', label: 'V noci – keď je ticho a tma' },
      { value: 'D', label: 'Kedykoľvek – nemám preferenciu' },
    ],
  },
  {
    id: 'l1_15',
    type: 'choice',
    level: 1,
    category: 'Po intimite',
    emoji: '🌙',
    question: 'Po intímnych chvíľach preferujem...',
    options: [
      { value: 'A', label: 'Blízkosť a maznaníe – zostanem v objetí' },
      { value: 'B', label: 'Chvíľu priestoru – trochu pre seba' },
      { value: 'C', label: 'Záleží od momentu' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────
// LEVEL 2 – Hlbšia úroveň (28 tém)
// Odpovede: Y=Áno | M=Možno | N=Nie | O=Neskúšal/a ale zaujíma ma
// PRAVIDLO: ak niekto odpovie N → táto téma sa v porovnaní nezobrazí
// ─────────────────────────────────────────────────────────────────
export const LEVEL2_QUESTIONS: YmnoQuestion[] = [
  // ── Fyzická blízkosť ──────────────────────────────────────
  {
    id: 'l2_01',
    type: 'ymno',
    level: 2,
    category: 'Fyzická blízkosť',
    emoji: '💆',
    question: 'Dlhé zmyslové masáže ako súčasť intimity',
  },
  {
    id: 'l2_02',
    type: 'ymno',
    level: 2,
    category: 'Fyzická blízkosť',
    emoji: '🛁',
    question: 'Spoločný kúpeľ alebo sprcha ako súčasť intímnych chvíľ',
  },
  {
    id: 'l2_03',
    type: 'ymno',
    level: 2,
    category: 'Fyzická blízkosť',
    emoji: '💃',
    question: 'Tanec spolu doma, len pre nás dvoch, ako spôsob blízkosti',
  },
  {
    id: 'l2_04',
    type: 'ymno',
    level: 2,
    category: 'Fyzická blízkosť',
    emoji: '👁️',
    question: 'Dlhý, intenzívny očný kontakt počas intimity',
  },
  // ── Komunikácia a atmosféra ───────────────────────────────
  {
    id: 'l2_05',
    type: 'ymno',
    level: 2,
    category: 'Komunikácia',
    emoji: '💬',
    question: 'Opisovanie fantázií slovami partnerovi/ke pred alebo počas intimity',
  },
  {
    id: 'l2_06',
    type: 'ymno',
    level: 2,
    category: 'Komunikácia',
    emoji: '📖',
    question: 'Čítanie erotickej literatúry alebo príbehov spolu',
  },
  {
    id: 'l2_07',
    type: 'ymno',
    level: 2,
    category: 'Komunikácia',
    emoji: '🎬',
    question: 'Pozeranie erotického obsahu spolu',
  },
  {
    id: 'l2_08',
    type: 'ymno',
    level: 2,
    category: 'Komunikácia',
    emoji: '📱',
    question: 'Písanie si erotických správ (sexting) počas dňa',
  },
  {
    id: 'l2_09',
    type: 'ymno',
    level: 2,
    category: 'Komunikácia',
    emoji: '📸',
    question: 'Fotografovanie alebo videá len pre nás dvoch',
  },
  // ── Dynamika a roly ───────────────────────────────────────
  {
    id: 'l2_10',
    type: 'ymno',
    level: 2,
    category: 'Dynamika a roly',
    emoji: '⚖️',
    question: 'Dominancia a submisia – jeden vedie, druhý nasleduje (ľahká forma)',
  },
  {
    id: 'l2_11',
    type: 'ymno',
    level: 2,
    category: 'Dynamika a roly',
    emoji: '🔄',
    question: 'Striedame si roly – raz vedie jeden, raz druhý',
  },
  {
    id: 'l2_12',
    type: 'ymno',
    level: 2,
    category: 'Dynamika a roly',
    emoji: '🎭',
    question: 'Hranie rolí (roleplay) – fiktívne postavy alebo scenáre',
  },
  {
    id: 'l2_13',
    type: 'ymno',
    level: 2,
    category: 'Dynamika a roly',
    emoji: '🪢',
    question: 'Ľahké viazanie (šatky, putá) – bondage v miernej forme',
  },
  {
    id: 'l2_14',
    type: 'ymno',
    level: 2,
    category: 'Dynamika a roly',
    emoji: '🌸',
    question: 'Pomalé, „tantrické" chvíle s dôrazom na prítomnosť a dýchanie',
  },
  {
    id: 'l2_15',
    type: 'ymno',
    level: 2,
    category: 'Dynamika a roly',
    emoji: '💫',
    question: 'Použitie intímnych pomôcok (vibrátory a iné)',
  },
  {
    id: 'l2_16',
    type: 'ymno',
    level: 2,
    category: 'Dynamika a roly',
    emoji: '🔥',
    question: 'Ľahká bolesť ako súčasť hry (hryzenie, škrabanie, plácanie)',
  },
  // ── Orálny sex ────────────────────────────────────────────
  {
    id: 'l2_17',
    type: 'ymno',
    level: 2,
    category: 'Orálny sex',
    emoji: '💋',
    question: 'Orálna stimulácia – dávanie',
  },
  {
    id: 'l2_18',
    type: 'ymno',
    level: 2,
    category: 'Orálny sex',
    emoji: '💋',
    question: 'Orálna stimulácia – prijímanie',
  },
  {
    id: 'l2_19',
    type: 'ymno',
    level: 2,
    category: 'Orálny sex',
    emoji: '👑',
    question: 'Face sitting (intímna poloha s orálnou stimuláciou)',
  },
  // ── Análna hra ────────────────────────────────────────────
  {
    id: 'l2_20',
    type: 'ymno',
    level: 2,
    category: 'Análna hra',
    emoji: '🌸',
    question: 'Análna stimulácia – dávanie',
  },
  {
    id: 'l2_21',
    type: 'ymno',
    level: 2,
    category: 'Análna hra',
    emoji: '🌸',
    question: 'Análna stimulácia – prijímanie',
  },
  // ── Zmyslová hra ──────────────────────────────────────────
  {
    id: 'l2_22',
    type: 'ymno',
    level: 2,
    category: 'Zmyslová hra',
    emoji: '🕯️',
    question: 'Zmyslová hra – zaviazané oči, kvapky vosku, ľad',
  },
  {
    id: 'l2_23',
    type: 'ymno',
    level: 2,
    category: 'Zmyslová hra',
    emoji: '🎵',
    question: 'Spoločný playlist na naladenie sa a vstup do nálady',
  },
  // ── Fantázie a scenáre ────────────────────────────────────
  {
    id: 'l2_24',
    type: 'ymno',
    level: 2,
    category: 'Fantázie a scenáre',
    emoji: '🗺️',
    question: 'Sex na nečakaných alebo netradičných miestach',
  },
  {
    id: 'l2_25',
    type: 'ymno',
    level: 2,
    category: 'Fantázie a scenáre',
    emoji: '🌹',
    question: 'Plánované romantické „rande" so scenárom a prekvapením',
  },
  {
    id: 'l2_26',
    type: 'ymno',
    level: 2,
    category: 'Fantázie a scenáre',
    emoji: '👀',
    question: 'Voyerizmus – páči sa mi sledovať partnera/ku (len nás dvoch)',
  },
  {
    id: 'l2_27',
    type: 'ymno',
    level: 2,
    category: 'Fantázie a scenáre',
    emoji: '💭',
    question: 'Fantázie o tretej osobe (len ako fantázia, nie reálna situácia)',
  },
  {
    id: 'l2_28',
    type: 'ymno',
    level: 2,
    category: 'Fantázie a scenáre',
    emoji: '🌅',
    question: 'Strávenie celého dňa v posteli – len my dvaja, bez plánu',
  },
]

// ─────────────────────────────────────────────────────────────────
// YMNO Options
// ─────────────────────────────────────────────────────────────────
export const YMNO_OPTIONS = [
  { value: 'Y' as YmnoAnswer, emoji: '✅', label: 'Áno', sublabel: 'Páči sa mi to' },
  { value: 'M' as YmnoAnswer, emoji: '🤔', label: 'Možno', sublabel: 'Som otvorený/á' },
  { value: 'N' as YmnoAnswer, emoji: '❌', label: 'Nie', sublabel: 'To nie je pre mňa' },
  { value: 'O' as YmnoAnswer, emoji: '🌟', label: 'Zaujíma ma', sublabel: 'Neskúšal/a som' },
]

// ─────────────────────────────────────────────────────────────────
// Encoding / Decoding (URL-safe base64)
// ─────────────────────────────────────────────────────────────────
export function encodePayload(payload: AnswerPayload): string {
  const json = JSON.stringify(payload)
  return btoa(encodeURIComponent(json))
}

export function decodePayload(encoded: string): AnswerPayload | null {
  try {
    const json = decodeURIComponent(atob(encoded))
    return JSON.parse(json) as AnswerPayload
  } catch {
    return null
  }
}

// ─────────────────────────────────────────────────────────────────
// Results logic
// ─────────────────────────────────────────────────────────────────
export type L1ResultItem = {
  id: string
  category: string
  question: string
  type: 'scale' | 'choice'
  matchLevel: 'perfect' | 'close' | 'different'
  aValue: L1Answer
  bValue: L1Answer
  aLabel?: string
  bLabel?: string
  conversationTip?: string
}

export type L2ResultItem = {
  id: string
  category: string
  emoji: string
  question: string
  level: 'green' | 'yellow'
  matchText: string
  aAnswer: YmnoAnswer
  bAnswer: YmnoAnswer
}

export function computeL1Results(
  a: Record<string, L1Answer>,
  b: Record<string, L1Answer>,
): L1ResultItem[] {
  return LEVEL1_QUESTIONS.map((q) => {
    const aVal = a[q.id]
    const bVal = b[q.id]
    if (aVal === undefined || bVal === undefined) return null

    if (q.type === 'scale') {
      const diff = Math.abs((aVal as number) - (bVal as number))
      const matchLevel: L1ResultItem['matchLevel'] =
        diff === 0 ? 'perfect' : diff === 1 ? 'close' : 'different'
      const tips: Record<number, string> = {
        2: 'Trochu sa líšite — dobrá téma na krátky rozhovor.',
        3: 'Výraznejší rozdiel — stojí za to sa o tom porozprávať bez očakávaní.',
        4: 'Veľmi odlišné pohľady — tu je priestor na hlboké pochopenie jeden druhého.',
      }
      return {
        id: q.id,
        category: q.category,
        question: q.question,
        type: 'scale',
        matchLevel,
        aValue: aVal,
        bValue: bVal,
        conversationTip: diff >= 2 ? tips[diff] ?? tips[4] : undefined,
      } as L1ResultItem
    } else {
      // choice
      const opts = q.options
      const aLabel = opts.find((o) => o.value === aVal)?.label ?? String(aVal)
      const bLabel = opts.find((o) => o.value === bVal)?.label ?? String(bVal)
      const matchLevel: L1ResultItem['matchLevel'] = aVal === bVal ? 'perfect' : 'different'
      return {
        id: q.id,
        category: q.category,
        question: q.question,
        type: 'choice',
        matchLevel,
        aValue: aVal,
        bValue: bVal,
        aLabel,
        bLabel,
        conversationTip:
          aVal !== bVal
            ? 'Máte rôzne preferencie — porozprávajte sa, prečo a či sa dajú skĺbiť.'
            : undefined,
      } as L1ResultItem
    }
  }).filter(Boolean) as L1ResultItem[]
}

export function computeL2Results(
  a: Record<string, YmnoAnswer>,
  b: Record<string, YmnoAnswer>,
): L2ResultItem[] {
  const results: L2ResultItem[] = []

  for (const q of LEVEL2_QUESTIONS) {
    const aAns = a[q.id]
    const bAns = b[q.id]
    if (!aAns || !bAns) continue

    // Ak niekto odpovedal N → skryjeme, bez komentára
    if (aAns === 'N' || bAns === 'N') continue

    // Green matches
    const greenCombos: Array<[YmnoAnswer, YmnoAnswer]> = [
      ['Y', 'Y'],
      ['Y', 'O'],
      ['O', 'Y'],
      ['O', 'O'],
    ]
    const yellowCombos: Array<[YmnoAnswer, YmnoAnswer]> = [
      ['Y', 'M'],
      ['M', 'Y'],
      ['O', 'M'],
      ['M', 'O'],
      ['M', 'M'],
    ]

    const matchTexts: Record<string, string> = {
      'Y-Y': 'Obaja chcete — skúste to spolu! 🎉',
      'Y-O': 'Jeden chce, druhý je zvedavý — skvelá príležitosť na prvý raz',
      'O-Y': 'Jeden chce, druhý je zvedavý — skvelá príležitosť na prvý raz',
      'O-O': 'Obaja ste zvedaví — prečo to neskúsiť?',
      'Y-M': 'Jeden chce, druhý je otvorený — porozprávajte sa bez tlaku',
      'M-Y': 'Jeden chce, druhý je otvorený — porozprávajte sa bez tlaku',
      'O-M': 'Obaja ste otvorení — mohlo by sa z toho niečo vyviniť',
      'M-O': 'Obaja ste otvorení — mohlo by sa z toho niečo vyviniť',
      'M-M': 'Obaja ste otvorení — možno stojí za to postupne skúsiť',
    }

    const key = `${aAns}-${bAns}` as keyof typeof matchTexts

    if (greenCombos.some(([x, y]) => x === aAns && y === bAns)) {
      results.push({
        id: q.id,
        category: q.category,
        emoji: q.emoji,
        question: q.question,
        level: 'green',
        matchText: matchTexts[key] ?? '',
        aAnswer: aAns,
        bAnswer: bAns,
      })
    } else if (yellowCombos.some(([x, y]) => x === aAns && y === bAns)) {
      results.push({
        id: q.id,
        category: q.category,
        emoji: q.emoji,
        question: q.question,
        level: 'yellow',
        matchText: matchTexts[key] ?? '',
        aAnswer: aAns,
        bAnswer: bAns,
      })
    }
  }

  return results
}
