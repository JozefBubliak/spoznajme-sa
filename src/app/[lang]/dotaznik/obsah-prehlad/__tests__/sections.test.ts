import { describe, expect, it } from '@jest/globals'
import { vsetkyObsahy } from '@/lib/dotaznik/obsah'
import { PREHLAD_SKUPINY } from '../_sections'

describe('navigácia admin prehľadu', () => {
  it('každá obsahová téma má presne jedno viditeľné miesto', () => {
    const names = PREHLAD_SKUPINY.flatMap(group => group.polozky.flatMap(item => item.slugs))
    const all = vsetkyObsahy().map(t => t.slug)
    expect(names.filter((slug, index) => names.indexOf(slug) !== index)).toEqual([])
    expect(all.filter(slug => !names.includes(slug))).toEqual([])
  })

  it('trojky majú jednu položku; ostatné formáty ostávajú samostatné', () => {
    const group = PREHLAD_SKUPINY.find(g => g.id === 'dalsi-ludia')!
    const slugs = group.polozky.flatMap(p => p.slugs)
    const overview = slugs.indexOf('trojky-skupiny/trojky-skupiny')
    expect(overview).toBeGreaterThanOrEqual(0)
    expect(slugs).not.toContain('trojky-skupiny/trojka-mmf')
    expect(slugs).not.toContain('trojky-skupiny/trojka-fmf')
    for (const slug of ['skupinovy-sex', 'gangbang', 'bukkake', 'treti-clovek']) {
      const item = group.polozky.find(p => p.slugs.includes(`trojky-skupiny/${slug}`))
      expect(item).toBeDefined()
      expect(slugs.indexOf(`trojky-skupiny/${slug}`)).toBeGreaterThan(overview)
    }
  })

  it('súvisiace, ale odlišné témy sú v správnej skupine', () => {
    const groupOf = (slug: string) => PREHLAD_SKUPINY.find(g => g.polozky.some(p => p.slugs.includes(slug)))?.id
    expect(groupOf('zdielanie-partnera/zdielanie-partnera')).toBe('dalsi-ludia')
    expect(groupOf('swinging/swinging')).toBe('dalsi-ludia')
    expect(groupOf('trojky-skupiny/gangbang')).toBe('dalsi-ludia')
    expect(groupOf('trojky-skupiny/dvojita-penetracia')).toBe('specificke-praktiky')
  })
})
