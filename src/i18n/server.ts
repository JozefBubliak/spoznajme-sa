// src/i18n/server.ts
import type { Dict, Dictionary } from "./types"
import { DEFAULT_LOCALE, type Locale } from "./config"

// Importy tvojich JSON slovníkov
import en from "./locales/en.json"
import sk from "./locales/sk.json"
import cz from "./locales/cz.json"
import de from "./locales/de.json"
import pl from "./locales/pl.json"
import fr from "./locales/fr.json"
import hu from "./locales/hu.json"
import es from "./locales/es.json"
import ua from "./locales/ua.json"
import ru from "./locales/ru.json"

const DICTS: Record<string, Dictionary> = {
  en, sk, cz, de, pl, fr, hu, es, ua, ru,
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
  const base = DICTS[DEFAULT_LOCALE]
  if (!base) {
    throw new Error("Missing default locale dictionary")
  }
  const override = DICTS[locale]
  if (!override) return base
  return deepMerge(base as Dict, override as Dict) as Dictionary
}
