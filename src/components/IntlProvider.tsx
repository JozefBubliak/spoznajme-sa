'use client';

import React, { createContext, useContext, useMemo } from 'react';

export type Dictionary = Record<string, unknown>;
type Lang = 'en' | 'sk' | 'cs' | 'pl' | 'hu' | 'fr' | 'de' | 'uk' | 'ru' | 'es';

type IntlContextValue = {
  lang: Lang;
  dict: Dictionary;
  t: (path: string, fallback?: string, vars?: Record<string, string | number>) => string;
};

const defaultValue: IntlContextValue = {
  lang: 'sk',
  dict: {},
  t: (path, fallback) => fallback ?? path,
};

const IntlContext = createContext<IntlContextValue>(defaultValue);

export type IntlProviderProps = {
  lang: Lang;
  dict: Dictionary;
  children: React.ReactNode;
};

export default function IntlProvider({ lang, dict, children }: IntlProviderProps) {
  const value = useMemo<IntlContextValue>(() => {
    const t = (path: string, fallback?: string, vars?: Record<string, string | number>) => {
      const raw = path.split('.').reduce<any>((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) return acc[key];
        return undefined;
      }, dict);

      let out = (typeof raw === 'string' ? raw : undefined) ?? fallback ?? path;

      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replaceAll(`{${k}}`, String(v));
        }
      }
      return out;
    };

    return { lang, dict, t };
  }, [lang, dict]);

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

// toto je to, čo si importuje SiteHeader:
export const useI18n = () => useContext(IntlContext);

