export const SUPPORTED_LANGUAGES = ["en", "sk", "cs", "pl", "hu", "fr", "de", "uk", "ru", "es"] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];