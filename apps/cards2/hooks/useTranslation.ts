import { translations, TranslationKey } from '@/constants/translations';
import { useAppStore } from '@/store/appStore';

export function useTranslation() {
  const { language } = useAppStore();
  
  const t = (key: TranslationKey): string => {
    const languageTranslations = translations[language as keyof typeof translations] || translations.en;
    return languageTranslations[key] || translations.en[key] || key;
  };

  return { t };
}