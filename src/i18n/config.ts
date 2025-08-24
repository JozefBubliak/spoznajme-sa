// src/i18n/config.ts
export const SUPPORTED_LOCALES = ["en","sk","cs","pl","hu","fr","de","uk","ru","es"] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const FALLBACK_LOCALE: Locale = "en";
