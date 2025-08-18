export type AppCard = {
  slug: string;
  title: string;
  description: string;
  href: string;
  badge?: 'nové' | 'beta' | 'prémiové' | null;
  visible?: boolean;
};

export const SK_APPS: AppCard[] = [
  {
    slug: 'herd-vote',
    title: 'Herd Vote (kvíz)',
    description: 'Rýchly tímový kvíz s kolami a bodovaním.',
    href: '/apps/herd-vote',
    badge: null,
    visible: true,
  },
  {
    slug: 'spoznajme-sa',
    title: 'Spoznajme sa (karty otázok)',
    description:
      'Interaktívne otázky v balíčkoch – otvárače, hlbšie, spomienky, zábavné.',
    href: '/apps/spoznajme-sa',
    badge: null,
    visible: true,
  },
  {
    slug: 'hadacka',
    title: 'Hádačka naživo',
    description:
      'Živá konverzačná hra s moderátorom: opis, pantomíma, jedno slovo. Tímy, časovač, skóre.',
    href: '/apps/hadacka',
    badge: 'nové',
    visible: true,
  },
];
