export const SUPPORTED_URL_LOCALES = [
  'en','sk','cs','pl','hu','fr','de','uk','ru','es',
] as const
export type UrlLocale = typeof SUPPORTED_URL_LOCALES[number]

export function isSupportedLocale(l: string): l is UrlLocale {
  return (SUPPORTED_URL_LOCALES as readonly string[]).includes(l)
}

export function normalizeUrlLocale(l: string | undefined | null): UrlLocale {
  const base = (l || 'sk').toLowerCase().split('-')[0]
  return isSupportedLocale(base) ? (base as UrlLocale) : 'sk'
}

// Minimal slug maps (extend later)
export const AUDIENCE_SLUGS: Record<UrlLocale, Record<string, string>> = {
  en: { 'rodic-dieta': 'parent-child', pary: 'couples', 'kamarati-party': 'friends-party', rodina: 'family' },
  sk: { 'rodic-dieta': 'rodic-dieta', pary: 'pary', 'kamarati-party': 'kamarati-party', rodina: 'rodina' },
  cs: { 'rodic-dieta': 'rodic-dieta', pary: 'pary', 'kamarati-party': 'kamaradi-party', rodina: 'rodina' },
  pl: { 'rodic-dieta': 'rodzic-dziecko', pary: 'pary', 'kamarati-party': 'przyjaciele-impreza', rodina: 'rodzina' },
  hu: { 'rodic-dieta': 'szulo-gyerek', pary: 'parok', 'kamarati-party': 'baratok-buli', rodina: 'csalad' },
  fr: { 'rodic-dieta': 'parent-enfant', pary: 'couples', 'kamarati-party': 'amis-soiree', rodina: 'famille' },
  de: { 'rodic-dieta': 'eltern-kind', pary: 'paare', 'kamarati-party': 'freunde-party', rodina: 'familie' },
  uk: { 'rodic-dieta': 'batky-dytyna', pary: 'pari', 'kamarati-party': 'druzi-vechirka', rodina: 'simya' },
  ru: { 'rodic-dieta': 'roditeli-rebenok', pary: 'pary', 'kamarati-party': 'druzya-vecherinka', rodina: 'semya' },
  es: { 'rodic-dieta': 'padre-hijo', pary: 'parejas', 'kamarati-party': 'amigos-fiesta', rodina: 'familia' },
}

export const TOPIC_SLUGS: Record<UrlLocale, Record<string, string>> = {
  en: {
    'otvarace-ritualy': 'openers-rituals',
    'emocie-a-regulacia': 'emotion-regulation',
    'volby-a-motivacia': 'choices-motivation',
    'zmeny-a-prechody': 'changes-transitions',
    'konflikt-a-spolupraca': 'conflict-collaboration',
    'vdacnost-a-silne-stranky': 'gratitude-strengths',
    'digitalny-zivot': 'digital-life',
    'skola-a-ucenie': 'school-learning',
    'zdravie-a-tazke-temy': 'health-tough-topics',
    'identita-a-telo': 'identity-body',
  },
  sk: {
    'otvarace-ritualy': 'otvarace-ritualy',
    'emocie-a-regulacia': 'emocie-a-regulacia',
    'volby-a-motivacia': 'volby-a-motivacia',
    'zmeny-a-prechody': 'zmeny-a-prechody',
    'konflikt-a-spolupraca': 'konflikt-a-spolupraca',
    'vdacnost-a-silne-stranky': 'vdacnost-a-silne-stranky',
    'digitalny-zivot': 'digitalny-zivot',
    'skola-a-ucenie': 'skola-a-ucenie',
    'zdravie-a-tazke-temy': 'zdravie-a-tazke-temy',
    'identita-a-telo': 'identita-a-telo',
  },
  cs: {}, pl: {}, hu: {}, fr: {}, de: {}, uk: {}, ru: {}, es: {},
}

export function buildHreflangAlternates(pathAfterLang: string) {
  const base = 'https://deeptalks.eu'
  const languages: Record<string, string> = {}
  for (const l of SUPPORTED_URL_LOCALES) {
    languages[l] = `${base}/${l}${pathAfterLang.startsWith('/') ? pathAfterLang : '/' + pathAfterLang}`
  }
  return languages
}
