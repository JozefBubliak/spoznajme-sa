// src/i18n/server.ts
import type { Dict } from "./types";
import { DEFAULT_LOCALE, type Locale } from "./config";

// Import slovníkov (server-safe, žiadny "use client")
import en from "./locales/en.json";
import sk from "./locales/sk.json";
import cz from "./locales/cz.json";
import de from "./locales/de.json";
import pl from "./locales/pl.json";
import fr from "./locales/fr.json";
import hu from "./locales/hu.json";
import es from "./locales/es.json";
import ua from "./locales/ua.json";
import ru from "./locales/ru.json";

// Mapovanie jazyk -> slovník
const DICTS: Record<string, Dict> = {
  en, sk, cz, de, pl, fr, hu, es, ua, ru,
};

const EMPTY: Dict = {};

function isDict(v: unknown): v is Dict {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function deepMerge(a: Dict, b: Dict): Dict {
  const out: Dict = { ...a };
  for (const key of Object.keys(b)) {
    const vA = (a as Record<string, unknown>)[key];
    const vB = (b as Record<string, unknown>)[key];

    if (isDict(vA) && isDict(vB)) {
      out[key] = deepMerge(vA, vB);
    } else {
      out[key] = vB;
    }
  }
  return out;
}

/**
 * Vráti slovník pre daný jazyk s fallbackom na DEFAULT_LOCALE.
 * Typovo bezpečné – žiadne {} do parametra očakávajúceho Dict.
 */
export async function getDictionary(locale: Locale): Promise<Dict> {
  const base = (DICTS[DEFAULT_LOCALE] ?? EMPTY) as Dict;
  const override = (DICTS[locale] ?? EMPTY) as Dict;
  return deepMerge(base, override);
}
