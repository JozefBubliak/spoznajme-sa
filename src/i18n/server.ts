// src/i18n/server.ts
import type { Dictionary } from "./types"
import type { Locale } from "./config"

type Dict = Record<string, unknown>

// fallback „base“ – zmeň na "sk", ak chceš mať slovenčinu ako primárny zdroj
const BASE_LOCALE: Locale = "en"

// PRIDAJ LEN TIE JAZYKY, KTORÉ MÁŠ V ./locales/*.json
const LOADERS: Partial<Record<Locale, () => Promise<Dictionary>>> = {
  en: () => import("./locales/en.json").then(m => m.default),
  sk: () => import("./locales/sk.json").then(m => m.default),
  cs: () => import("./locales/cs.json").then(m => m.default),
  de: () => import("./locales/de.json").then(m => m.default),
  pl: () => import("./locales/pl.json").then(m => m.default),
  fr: () => import("./locales/fr.json").then(m => m.default),
  hu: () => import("./locales/hu.json").then(m => m.default),
  es: () => import("./locales/es.json").then(m => m.default),
  uk: () => import("./locales/uk.json").then(m => m.default),
  ru: () => import("./locales/ru.json").then(m => m.default),
}

function isDict(v: unknown): v is Dict {
  return v !== null && typeof v === "object" && !Array.isArray(v)
}

function deepMerge(a: Dict, b: Dict): Dict {
  const out: Dict = { ...a }
  for (const key of Object.keys(b)) {
    const vA = (a as Record<string, unknown>)[key]
    const vB = (b as Record<string, unknown>)[key]
    out[key] = isDict(vA) && isDict(vB) ? deepMerge(vA, vB) : vB
  }
  return out
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const baseLoader = LOADERS[BASE_LOCALE]!
  const base = await baseLoader()
  const load = LOADERS[locale]
  if (!load) return base
  const override = await load()
  return deepMerge(base as Dict, override as Dict) as Dictionary
}
