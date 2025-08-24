// src/i18n/server.ts
import type { Dict, Dictionary } from "./types"
import type { Locale } from "./config"

// NAČÍTANIE SLOVNÍKOV – POZOR NA KÓD PRE ČEŠTINU: väčšinou je to "cs"
import en from "./locales/en.json"
import sk from "./locales/sk.json"
import cs from "./locales/cs.json"  // ak máš súbor cs.json; ak máš cz.json, uprav aj kľúč nižšie
import de from "./locales/de.json"
import pl from "./locales/pl.json"
import fr from "./locales/fr.json"
import hu from "./locales/hu.json"
import es from "./locales/es.json"
import uk from "./locales/uk.json"   // ak používaš uk/ua, zlaď to s configom
import ru from "./locales/ru.json"

// fallback „base“ – zmeň na "sk", ak chceš mať slovenčinu ako primárny zdroj
const BASE_LOCALE: Locale = "en"

const DICTS: Record<string, Dictionary> = {
  en, sk, cs, de, pl, fr, hu, es, uk, ru,
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
  const base = DICTS[BASE_LOCALE]
  const override = DICTS[locale]
  // ak daný jazyk nepoznáme, vrátime aspoň base
  if (!override) return base
  // inak spravíme fallback: base -> override
  return deepMerge(base as Dict, override as Dict) as Dictionary
}
