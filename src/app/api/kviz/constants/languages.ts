import { SUPPORTED_LANGUAGES } from '@/lib/languages';

export interface Language {
  code: typeof SUPPORTED_LANGUAGES[number];
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGE_DETAILS: Record<typeof SUPPORTED_LANGUAGES[number], Omit<Language, 'code'>> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  sk: { name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  cs: { name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  pl: { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  hu: { name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  uk: { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
};

export const LANGUAGES: Language[] = SUPPORTED_LANGUAGES.map(
  (code) => ({ code, ...LANGUAGE_DETAILS[code] })
);
