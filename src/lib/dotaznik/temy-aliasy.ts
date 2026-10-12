/** Staré časti Dirty talku majú jeden spoločný screening; odpovede nemeníme. */
export function temyPreStav(modul: string, tema: string): string[] {
  const dirtyTalk = ['obsah', 'ton', 'oslovenia', 'jazyk-tela']
  return modul === 'dirty-talk-oslovenia' && dirtyTalk.includes(tema) ? dirtyTalk : [tema]
}

/** Dirty talk bol aj vo všeobecnej téme tekutín/fetišov. Nové odpovede majú prednosť. */
export function odpovedePreModul<T extends { modul: string; polozka: string }>(modul: string | null, riadky: T[]): T[] {
  if (modul !== 'dirty-talk-oslovenia') return riadky
  return riadky.filter(r => r.modul === modul || r.polozka.startsWith('dt_'))
    .sort((a, b) => Number(a.modul === modul) - Number(b.modul === modul))
}
