import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config"

const BASE = "https://deeptalks.eu"

export function normalizeUrlLocale(input: string): Locale {
  const code = (input || "").toLowerCase()
  if ((SUPPORTED_LOCALES as readonly string[]).includes(code)) return code as Locale
  // známe aliasy
  if (code.startsWith("cz")) return "cs" as Locale
  if (code.startsWith("ua")) return "uk" as Locale
  return "en" as Locale
}

export function buildHreflangAlternates(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`
  const out: Record<string, string> = {}
  for (const l of SUPPORTED_LOCALES) out[l] = `${BASE}/${l}${clean === "/" ? "" : clean}`
  return out
}
