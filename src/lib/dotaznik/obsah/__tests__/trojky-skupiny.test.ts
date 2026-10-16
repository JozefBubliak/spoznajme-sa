import { describe, expect, it } from '@jest/globals'
import { splna } from '../../podmienky'
import { temaObsah } from '../index'
import { gtext, nazovSkupiny, type Blok, type Podmienka, type TemaObsah } from '../typ'

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
    expect(tema.telo[0].id).toBe('troj_skusenost')
    expect(ids).not.toContain('troj_konfiguracie')
    expect(ids).toContain('mmf_podtema')
    expect(ids).toContain('fmf_podtema')
    for (const prefix of ['mmf', 'fmf']) {
      expect(ids).toContain(`${prefix}_rozdelenie_zrkadlo`)
      expect(ids).toContain(`${prefix}_roly_a_pozornost`)
      expect(ids).toContain(`${prefix}_konkretne_kontakty`)
      expect(ids).toContain(`${prefix}_pocity_a_motivacie`)
      expect(ids).toContain(`${prefix}_realny_ramec`)
      const kontakt = all.find(b => b.id === `${prefix}_par_treti_kontakty`)
      expect(kontakt?.druh).toBe('otazka')
      if (kontakt?.druh === 'otazka') expect(kontakt.riadky).toHaveLength(prefix === 'mmf' ? 9 : 8)
      const rovnake = all.find(b => b.id === `${prefix}_rovnake_pohlavie_kontakty`)
      expect(rovnake?.druh).toBe('otazka')
      if (rovnake?.druh === 'otazka') expect(rovnake.riadky).toHaveLength(prefix === 'mmf' ? 6 : 7)
    }
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
    expect(splna(byId('fmf_fantazia_iba_rozsah').podmienka, fantazia, 'z')).toBe(true)
    expect(splna(byId('fmf_podmienky_nove').podmienka, fantazia, 'z')).toBe(false)
    expect(splna(byId('fmf_realny_ramec').podmienka, fantazia, 'z')).toBe(false)
    expect(splna(byId('fmf_realny_ramec').podmienka,
      { ...odpovede, fmf_realita_nova: { v: 'mozno' } }, 'z')).toBe(true)
    expect(splna(byId('fmf_preferencie_spolocne').podmienka,
      { ...odpovede, fmf_realita_nova: { v: 'nie' } }, 'z')).toBe(false)
    expect(splna(byId('mmf_preferencie_spolocne').podmienka,
      { ...odpovede, mmf_miera_vzrusenia: { v: 'nechcem_opakovat' } }, 'z')).toBe(false)
    expect(splna(byId('mmf_povodne_odpovede').podmienka, {}, 'm')).toBe(false)
    expect(splna(byId('mmf_povodne_odpovede').podmienka,
      { mmf_vstup: { v: 'ano' }, mmf_prijat: { v: ['bozk'] } }, 'm')).toBe(true)
  })

  it('preferencie majú rovnakú vetvu po skúsenosti aj bez nej, odmietnutie ponechá postoj k partnerovej túžbe', () => {
    const all = bloky(temaObsah('trojky-skupiny', 'trojky-skupiny')!)
    const byId = (id: string) => all.find(b => b.id === id)!
    for (const prefix of ['mmf', 'fmf']) {
      for (const [skusenost, dalsiaOdpoved] of [
        [prefix, { [`${prefix}_miera_vzrusenia`]: { v: 'skor' } }],
        ['ziadna', { [`${prefix}_realita_nova`]: { v: 'mozno' } }],
      ] as const) {
        const answers = { troj_skusenost: { v: skusenost }, [`${prefix}_vstup`]: { v: 'ano' }, ...dalsiaOdpoved }
        expect(splna(byId(`${prefix}_postoj_a_hranice`).podmienka, answers, 'z')).toBe(true)
        expect(splna(byId(`${prefix}_preferencie_spolocne`).podmienka, answers, 'z')).toBe(true)
      }
      const stopped = { troj_skusenost: { v: prefix }, [`${prefix}_vstup`]: { v: 'ano' }, [`${prefix}_miera_vzrusenia`]: { v: 'nechcem_opakovat' } }
      expect(splna(byId(`${prefix}_postoj_a_hranice`).podmienka, stopped, 'z')).toBe(true)
      expect(splna(byId(`${prefix}_preferencie_spolocne`).podmienka, stopped, 'z')).toBe(false)
      const noviceNo = { troj_skusenost: { v: 'ziadna' }, [`${prefix}_vstup`]: { v: 'ano' }, [`${prefix}_realita_nova`]: { v: 'nie' } }
      expect(splna(byId(`${prefix}_postoj_a_hranice`).podmienka, noviceNo, 'z')).toBe(true)
      expect(splna(byId(`${prefix}_preferencie_spolocne`).podmienka, noviceNo, 'z')).toBe(false)
      expect(all.map(b => b.id)).toContain(`${prefix}_miera_zapojenia`)
      expect(all.map(b => b.id)).toContain(`${prefix}_styl_rol`)
      const centre = byId(`${prefix}_pocit_stredobod`)
      const chosenCentre = prefix === 'mmf' ? 'len_jej' : 'druha_stredobod'
      const possible = { troj_skusenost: { v: 'ziadna' }, [`${prefix}_vstup`]: { v: 'ano' }, [`${prefix}_realita_nova`]: { v: 'mozno' }, [`${prefix}_rozdelenie_zrkadlo`]: { v: [chosenCentre] } }
      expect(splna(centre.podmienka, possible, 'z')).toBe(true)
      expect(splna(centre.podmienka, { ...possible, [`${prefix}_rozdelenie_zrkadlo`]: { v: ['kazdy_kazdemu'] } }, 'z')).toBe(false)
    }
  })

  it('všetky nadväzujúce otázky ostávajú v bubline označenej podľa skúsenosti', () => {
    const tema = temaObsah('trojky-skupiny', 'trojky-skupiny')!
    for (const prefix of ['mmf', 'fmf'] as const) {
      const podtema = tema.telo.find(b => b.id === `${prefix}_podtema`)
      expect(podtema?.druh).toBe('skupina')
      if (podtema?.druh !== 'skupina') continue
      const vetva = podtema.bloky.find(b => b.id === `${prefix}_moja_vetva`)
      expect(vetva?.druh).toBe('skupina')
      if (vetva?.druh !== 'skupina') continue
      expect(vetva.bloky.map(b => b.id)).toEqual([
        `${prefix}_skusena`, `${prefix}_bez_skusenosti_nove`, `${prefix}_postoj_a_hranice`,
      ])
      const experienced = { troj_skusenost: { v: prefix } }
      const novice = { troj_skusenost: { v: prefix === 'mmf' ? 'fmf' : 'mmf' } }
      expect(nazovSkupiny(vetva, experienced, 'z')).toBe('Mám skúsenosť')
      expect(nazovSkupiny(vetva, novice, 'm')).toBe('Nemám skúsenosť')
    }
  })

  it('MMF aj FMF majú päťstupňovú mieru vzrušenia a podotázku iba pri zlepšiteľnej skúsenosti', () => {
    const all = bloky(temaObsah('trojky-skupiny', 'trojky-skupiny')!)
    for (const prefix of ['mmf', 'fmf']) {
      const rating = all.find(b => b.id === `${prefix}_miera_vzrusenia`)
      const improve = all.find(b => b.id === `${prefix}_mozne_zlepsenie`)
      const details = all.find(b => b.id === `${prefix}_preferencie_spolocne`)
      const practical = all.find(b => b.id === `${prefix}_realny_ramec`)
      expect(rating?.druh).toBe('otazka')
      expect(improve?.druh).toBe('otazka')
      if (rating?.druh !== 'otazka') continue
      expect(rating.moznosti?.map(m => m.v)).toEqual(['velmi', 'skor', 'neutral', 'zlepsit', 'nechcem_opakovat'])
      expect(all.map(b => b.id)).not.toContain(`${prefix}_s_kym`)
      expect(all.map(b => b.id)).not.toContain(`${prefix}_fungovalo_nove`)
      expect(all.map(b => b.id)).not.toContain(`${prefix}_opakovat`)
      for (const value of ['velmi', 'skor', 'neutral', 'zlepsit', 'nechcem_opakovat']) {
        const answers = { troj_skusenost: { v: prefix }, [`${prefix}_vstup`]: { v: 'ano' }, [`${prefix}_miera_vzrusenia`]: { v: value } }
        expect(splna(improve?.podmienka, answers, 'z')).toBe(value === 'zlepsit')
        expect(splna(details?.podmienka, answers, 'z')).toBe(value !== 'nechcem_opakovat')
        expect(splna(practical?.podmienka, answers, 'z')).toBe(['velmi', 'skor', 'zlepsit'].includes(value))
      }
    }
  })

  it('riadky kontaktov opisujú tú istú situáciu žene aj mužovi', () => {
    const all = bloky(temaObsah('trojky-skupiny', 'trojky-skupiny')!)
    const mmf = all.find(b => b.id === 'mmf_par_treti_kontakty')
    const fmf = all.find(b => b.id === 'fmf_par_treti_kontakty')
    expect(mmf?.druh).toBe('otazka')
    expect(fmf?.druh).toBe('otazka')
    if (mmf?.druh !== 'otazka' || fmf?.druh !== 'otazka') return
    expect(gtext(mmf.riadky![0].label, 'm')).toContain('Partnerka')
    expect(gtext(mmf.riadky![0].label, 'z')).toContain('Bozkávam')
    expect(gtext(fmf.riadky![0].label, 'm')).toContain('Bozkávam')
    expect(gtext(fmf.riadky![0].label, 'z')).toContain('Partner')
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
      ['trojky-skupiny', 'mmf_rozdelenie_zrkadlo', 'mmf'],
      ['trojky-skupiny', 'fmf_rozdelenie_zrkadlo', 'fmf'],
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
