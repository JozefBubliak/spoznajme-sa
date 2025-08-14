export type Topic = { slug: string; i18nKey: string; fallback: string }

export const KOMPAS_TOPICS: Topic[] = [
  { slug: "zacinat-rozovor",       i18nKey: "topics.openers",    fallback: "Začať rozhovor" },
  { slug: "emocie-a-regulacia",    i18nKey: "topics.emotions",   fallback: "Emócie a regulácia" },
  { slug: "hranice-a-dohody",      i18nKey: "topics.limits",     fallback: "Hranice a dohody" },
  { slug: "konflikt-a-spolupraca", i18nKey: "topics.conflict",   fallback: "Konflikt a spolupráca" },
  { slug: "zmeny-a-prechody",      i18nKey: "topics.changes",    fallback: "Zmeny a prechody" },
  { slug: "spomienky-a-spojenie",  i18nKey: "topics.memory",     fallback: "Spomienky a spojenie" },
  { slug: "skola-a-ucenie",        i18nKey: "topics.school",     fallback: "Škola a učenie" },
  { slug: "digitalny-zivot",       i18nKey: "topics.digital",    fallback: "Digitálny život" },
  { slug: "zdravie-a-tazke-temy",  i18nKey: "topics.health",     fallback: "Zdravie a ťažké témy" },
  { slug: "identita-a-telo",       i18nKey: "topics.identity",   fallback: "Identita a telo" },
]