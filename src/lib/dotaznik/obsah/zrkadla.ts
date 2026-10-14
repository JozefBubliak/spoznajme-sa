import type { Blok, OtazkaBlok, SkupinaBlok, TemaObsah } from './typ'

// Výslovne určené obsahové dvojice. V prehľade sa ukáže prijímanie jednej
// osoby oproti poskytovaniu druhej, a potom opačná perspektíva. Rovnaké `v`
// v oboch otázkach označuje tú istú aktivitu; rozdielne hodnoty nemajú zhodu.
// Nenahrádza to serverové Double-Blind vyhodnotenie (NEXT-003 je vypnuté).
const DVOJICE: Record<string, readonly (readonly [string, string])[]> = {
  'dirty-talk-oslovenia/obsah': [
    ['dt_ton_prijimam', 'dt_ton_poskytujem'],
    ['dt_obsah_prijimam', 'dt_obsah_poskytujem'],
    ['dt_oslovenia_prijimam', 'dt_oslovenia_poskytujem'],
  ],
  'oral-vulva-klitoris/oral-vulva-klitoris': [
    ['cun_prijimam', 'cun_poskytujem'],
    ['fel_prijimam', 'fel_poskytujem'],
    ['ani_prijimam', 'ani_poskytujem'],
  ],
  'analna-penetracia/analna-penetracia': [
    ['ani_prijimam', 'ani_poskytujem'],
    ['prst_prijimam_postoj', 'prst_poskytujem_postoj'],
    ['hr_prijimam', 'hr_poskytujem'],
    ['pen_prijimam', 'pen_poskytujem'],
  ],
  'dominancia-submisia/dominancia-submisia': [
    ['bond_prijimam', 'bond_poskytujem'],
    ['imp_prijimam', 'imp_poskytujem'],
    ['rough_prijimam', 'rough_poskytujem'],
  ],
  'mentalna-priprava-tuzba/mentalna-priprava-tuzba': [
    ['ini_formy_prijimam', 'ini_formy_poskytujem'],
  ],
  'predohra-stupnovanie/predohra-stupnovanie': [
    ['map_dotyky_prijimam', 'map_dotyky_poskytujem'],
    ['kom_konkretne_prijimam', 'kom_konkretne_poskytujem'],
    ['kom_top_prijimam', 'kom_top_poskytujem'],
  ],
  'tempo-rytmus-choreografia/tempo-rytmus-choreografia': [
    ['ene_intenzivne_prijimat', 'ene_intenzivne_poskytovat'],
    ['ene_prijimam', 'ene_poskytujem'],
  ],
  'orgazmus-kontrola/orgazmus-kontrola': [
    ['osc_prijimam', 'osc_poskytujem'],
  ],
  'nepenetrativne-trenie/nepenetrativne-trenie': [
    ['tit_prijimam', 'tit_poskytujem'],
  ],
  'telesne-tekutiny/telesne-tekutiny': [
    ['foot_davam', 'foot_dostavam'],
  ],
  'oral-kombinacie-polohy/face-sitting': [
    ['hore_miera', 'dole_miera'],
    ['hore_miera_zlepsit', 'dole_miera_zlepsit'],
    ['hore_frekvencia', 'dole_frekvencia'],
    ['hore_styl', 'dole_styl'],
    ['hore_lakadlo', 'dole_lakadlo'],
    ['hore_atmosfera', 'dole_atmosfera'],
    ['hore_umocni', 'dole_umocni'],
    ['hore_eroticke', 'dole_eroticke'],
    ['hore_hranice', 'dole_hranice'],
    ['hore_fungovalo', 'dole_fungovalo'],
    ['hore_zhrnutie', 'dole_zhrnutie'],
    ['hore_smother_priahuje', 'dole_smother_priahuje'],
  ],
}

const SKUPINOVE_DVOJICE: Record<string, readonly (readonly [string, string])[]> = {
  'analna-penetracia/analna-penetracia': [
    ['prst_prijimam', 'prst_poskytujem'],
    ['prostata_prijimam', 'prostata_poskytujem'],
  ],
  'oral-kombinacie-polohy/face-sitting': [
    ['hore', 'dole'],
    ['hore_smother', 'dole_smother'],
  ],
}

export function otazkyTémy(tema: TemaObsah): Map<string, OtazkaBlok> {
  const out = new Map<string, OtazkaBlok>()
  function walk(blocks: Blok[]) {
    for (const b of blocks) {
      if (b.druh === 'skupina') walk(b.bloky)
      else if (b.druh === 'otazka') out.set(b.id, b)
    }
  }
  walk([...tema.uvod, ...tema.telo, ...(tema.zaver ?? [])])
  return out
}

export function zrkadlaTémy(tema: TemaObsah): Map<string, OtazkaBlok> {
  const otazky = otazkyTémy(tema)
  const out = new Map<string, OtazkaBlok>()
  for (const [a, b] of DVOJICE[tema.slug] ?? []) {
    const prve = otazky.get(a)
    const druhe = otazky.get(b)
    if (prve && druhe) {
      out.set(a, druhe)
      out.set(b, prve)
    }
  }
  return out
}

export function zrkadloveSkupiny(tema: TemaObsah): Map<string, SkupinaBlok> {
  const groups = new Map<string, SkupinaBlok>()
  function walk(blocks: Blok[]) {
    for (const b of blocks) if (b.druh === 'skupina') { groups.set(b.id, b); walk(b.bloky) }
  }
  walk([...tema.uvod, ...tema.telo, ...(tema.zaver ?? [])])
  const out = new Map<string, SkupinaBlok>()
  for (const [a, b] of SKUPINOVE_DVOJICE[tema.slug] ?? []) {
    const first = groups.get(a)
    const second = groups.get(b)
    if (first && second) { out.set(a, second); out.set(b, first) }
  }
  return out
}

export function chybneZrkadla(tema: TemaObsah): string[] {
  const otazky = otazkyTémy(tema)
  const chyby = (DVOJICE[tema.slug] ?? []).flatMap(([a, b]) =>
    otazky.has(a) && otazky.has(b) ? [] : [`${tema.slug}: ${a} <> ${b}`],
  )
  const groups = zrkadloveSkupiny(tema)
  return [...chyby, ...(SKUPINOVE_DVOJICE[tema.slug] ?? []).flatMap(([a, b]) =>
    groups.has(a) && groups.has(b) ? [] : [`${tema.slug}: skupiny ${a} <> ${b}`],
  )]
}
