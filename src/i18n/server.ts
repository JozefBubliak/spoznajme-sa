// src/i18n/server.ts
import { FALLBACK_LOCALE, type Locale } from "./config";
import type { Dictionary } from "./types";

type Dict = Record<string, unknown>;

function merge(base: Dict, override: Dict): Dict {
  const out: Dict = { ...base };
  for (const k of Object.keys(override)) {
    if (override[k] && typeof override[k] === "object" && !Array.isArray(override[k])) {
      out[k] = merge(base[k] ?? {}, override[k]);
    } else {
      out[k] = override[k];
    }
  }
  return out;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const en = (await import(`./dictionaries/en.json`)).default as Dictionary;
  if (locale === "en") return en;
  try {
    const loc = (await import(`./dictionaries/${locale}.json`)).default as Dictionary;
    return merge(en, loc) as Dictionary;
  } catch {
    return en;
  }
}
