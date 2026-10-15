import { describe, expect, it } from '@jest/globals'
import { splna } from '../../podmienky'
import { temaObsah } from '../index'
import type { Blok, Podmienka, TemaObsah } from '../typ'

const formaty = ['skupinovy-sex', 'gangbang', 'bukkake', 'dvojita-penetracia'] as const
const prefixy = ['skup', 'gb', 'bk', 'dp'] as const

function bloky(t: TemaObsah): Blok[] {
  const out: Blok[] = []
  function walk(xs: Blok[]) {
    for (const b of xs) {
      out.push(b)
      if (b.druh === 'skupina') walk(b.bloky)
    }
  }
  walk([...t.uvod, ...t.telo, ...(t.zaver ?? [])])
  return out
}

function refs(p: Podmienka | undefined): string[] {
  if (!p) return []
  return [...(p.ot ? [p.ot] : []), ...(p.vsetky ?? []).flatMap(refs), ...(p.asponJedna ?? []).flatMap(refs)]
}

describe('samostatné témy trojok a skupín', () => {
  it('každý formát má vlastnú route, otázku na skúsenosť a úplné vetvy', () => {
    for (const [i, slug] of formaty.entries()) {
      const tema = temaObsah('trojky-skupiny', slug)
      expect(tema).toBeDefined()
      const ids = bloky(tema!).map(b => b.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids).toContain(`${prefixy[i]}_skusenost`)
      expect(ids).toContain(`${prefixy[i]}_so_skusenostou`)
      expect(ids).toContain(`${prefixy[i]}_bez_skusenosti`)
      expect(ids).toContain(`${prefixy[i]}_partner_tuzi`)
      const questionIds = new Set(bloky(tema!).filter(b => b.druh === 'otazka').map(b => b.id))
      for (const b of bloky(tema!)) for (const ref of refs(b.podmienka)) expect(questionIds.has(ref)).toBe(true)
    }
  })

  it('skúsenosť a odmietnutie skrývajú nesprávnu vetvu aj detailné preferencie', () => {
    for (const [i, slug] of formaty.entries()) {
      const prefix = prefixy[i]
      const tema = temaObsah('trojky-skupiny', slug)!
      const all = bloky(tema)
      const experienced = all.find(b => b.id === `${prefix}_so_skusenostou`)!
      const novice = all.find(b => b.id === `${prefix}_bez_skusenosti`)!
      const details = all.find(b => b.id === `${prefix}_podoby`)!
      const interest = slug === 'dvojita-penetracia' ? 'edge_dp' : slug === 'skupinovy-sex' ? 'skup_postoj' :
        slug === 'bukkake' ? 'bk_postoj' : `${prefix}_postoj`
      const choice = slug === 'dvojita-penetracia' ? 'ano' : 'tuzim'
      const yes = { [`${prefix}_skusenost`]: { v: 'ano' }, [`${prefix}_hodnotenie`]: { v: 'velmi' }, [interest]: { v: choice } }
      const no = { [`${prefix}_skusenost`]: { v: 'ziadna' }, [`${prefix}_realita`]: { v: 'mozno' }, [interest]: { v: choice } }
      expect(splna(experienced.podmienka, yes, 'z')).toBe(true)
      expect(splna(novice.podmienka, yes, 'z')).toBe(false)
      expect(splna(experienced.podmienka, no, 'z')).toBe(false)
      expect(splna(novice.podmienka, no, 'z')).toBe(true)
      expect(splna(details.podmienka, yes, 'z')).toBe(true)
      expect(splna(details.podmienka, no, 'z')).toBe(true)
      expect(splna(details.podmienka, { ...yes, [`${prefix}_hodnotenie`]: { v: 'nechcem_opakovat' } }, 'z')).toBe(false)
      expect(splna(details.podmienka, { ...no, [`${prefix}_realita`]: { v: 'nie' } }, 'z')).toBe(false)
      expect(splna(details.podmienka, { ...yes, [interest]: { v: 'nie' } }, 'z')).toBe(false)
    }
  })

  it('Trojky začínajú skúsenosťou a MMF/FMF majú nezávislé podtémy', () => {
    const tema = temaObsah('trojky-skupiny', 'trojky-skupiny')!
    const all = bloky(tema)
    const ids = all.map(b => b.id)
    expect(ids[1]).toBe('troj_skusenost')
    expect(ids).not.toContain('troj_konfiguracie')
    expect(ids).toContain('mmf_podtema')
    expect(ids).toContain('fmf_podtema')
    expect(new Set(ids).size).toBe(ids.length)
    const questions = new Set(all.filter(b => b.druh === 'otazka').map(b => b.id))
    for (const b of all) for (const ref of refs(b.podmienka)) expect(questions.has(ref)).toBe(true)
    const byId = (id: string) => all.find(b => b.id === id)!
    const odpovede = { troj_skusenost: { v: 'mmf' }, mmf_vstup: { v: 'ano' }, fmf_vstup: { v: 'ano' } }
    expect(splna(byId('mmf_skusena').podmienka, odpovede, 'z')).toBe(true)
    expect(splna(byId('mmf_bez_skusenosti_nove').podmienka, odpovede, 'z')).toBe(false)
    expect(splna(byId('fmf_bez_skusenosti_nove').podmienka, odpovede, 'z')).toBe(true)
    expect(splna(byId('fmf_skusena').podmienka, odpovede, 'z')).toBe(false)
    expect(splna(byId('mmf_skusena').podmienka, { ...odpovede, mmf_vstup: { v: 'nie' } }, 'z')).toBe(false)
    expect(splna(byId('fmf_skusena').podmienka, { ...odpovede, troj_skusenost: { v: 'obe' } }, 'z')).toBe(true)
    const fantazia = { ...odpovede, fmf_realita_nova: { v: 'fantazia' } }
    expect(splna(byId('fmf_postoj_a_hranice').podmienka, fantazia, 'z')).toBe(true)
    expect(splna(byId('fmf_podmienky_nove').podmienka, fantazia, 'z')).toBe(false)
    expect(splna(byId('fmf_postoj_a_hranice').podmienka,
      { ...odpovede, fmf_realita_nova: { v: 'nie' } }, 'z')).toBe(false)
    expect(splna(byId('mmf_postoj_a_hranice').podmienka,
      { ...odpovede, mmf_opakovat: { v: 'nie' } }, 'z')).toBe(false)
  })

  it('odpovede sa medzi oddelenými témami neprepisujú cez spoločné ID', () => {
    const routes = ['trojky-skupiny', ...formaty, 'treti-clovek']
    const all = routes.flatMap(slug => bloky(temaObsah('trojky-skupiny', slug)!)
      .filter(b => b.druh === 'otazka').map(b => `${slug}:${b.id}`))
    const ids = all.map(row => row.split(':')[1])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('presunuté otázky zapisujú do pôvodných kľúčov uložených odpovedí', () => {
    const examples = [
      ['trojky-skupiny', 'mmf_prijat', 'mmf'],
      ['trojky-skupiny', 'fmf_prijat_ona', 'fmf'],
      ['gangbang', 'gb_postoj', 'gangbang'],
      ['bukkake', 'bk_miesta', 'gangbang'],
      ['dvojita-penetracia', 'edge_dp', 'edge'],
    ] as const
    for (const [slug, id, okruh] of examples) {
      const question = bloky(temaObsah('trojky-skupiny', slug)!).find(b => b.id === id)
      expect(question?.druh).toBe('otazka')
      if (question?.druh === 'otazka') expect(question.povodnyOkruh).toBe(okruh)
    }
  })
})
