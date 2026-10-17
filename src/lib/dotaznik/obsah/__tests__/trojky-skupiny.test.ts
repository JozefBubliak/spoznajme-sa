import { describe, expect, it } from '@jest/globals'
import { splna } from '../../podmienky'
import { prepniMoznost } from '../../odpovede-ux'
import { temaObsah } from '../index'
import { gtext, type Blok, type Podmienka, type TemaObsah } from '../typ'

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

const trojAll = () => [...bloky(temaObsah('trojky-skupiny', 'trojka-mmf')!), ...bloky(temaObsah('trojky-skupiny', 'trojka-fmf')!)]

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

  it('MMF a FMF sú dve samostatné témy, každá začína vlastnou skúsenosťou', () => {
    for (const prefix of ['mmf', 'fmf'] as const) {
      const tema = temaObsah('trojky-skupiny', `trojka-${prefix}`)!
      expect(tema).toBeDefined()
      expect(tema.zdielanieDovod).toBe(true)
      expect(tema.telo[0].id).toBe(`${prefix}_skusenost`)
      const other = prefix === 'mmf' ? 'fmf' : 'mmf'
      const all = bloky(tema)
      const ids = all.map(b => b.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids).toContain(`${prefix}_podtema`)
      expect(ids.some(id => id.startsWith(`${other}_`))).toBe(false)
      expect(ids).not.toContain(`${prefix}_vstup`)
      expect(ids).toContain(`${prefix}_rozdelenie_zrkadlo`)
      expect(ids).toContain(`${prefix}_roly_a_pozornost`)
      expect(ids).toContain(`${prefix}_konkretne_kontakty`)
      expect(ids).toContain(`${prefix}_pocity_a_motivacie`)
      expect(ids).toContain(`${prefix}_realny_ramec`)
      const kontakt = all.find(b => b.id === `${prefix}_par_treti_aktivity_vyber`)
      expect(kontakt?.druh).toBe('otazka')
      if (kontakt?.druh === 'otazka') {
        expect(kontakt.typ).toBe('viac')
        expect(kontakt.moznosti).toHaveLength(prefix === 'mmf' ? 12 : 11)
      }
      const rovnake = all.find(b => b.id === `${prefix}_rovnake_pohlavie_vyber`)
      expect(rovnake?.druh).toBe('otazka')
      if (rovnake?.druh === 'otazka') {
        expect(rovnake.typ).toBe('viac')
        expect(rovnake.moznosti).toHaveLength(prefix === 'mmf' ? 7 : 8)
      }
      const questions = new Set(all.filter(b => b.druh === 'otazka').map(b => b.id))
      for (const b of all) for (const ref of refs(b.podmienka)) expect(questions.has(ref)).toBe(true)
      const byId = (id: string) => all.find(b => b.id === id)!
      expect(splna(byId(`${prefix}_podtema`).podmienka, { [`${prefix}_skusenost`]: { v: 'ano' } }, 'z')).toBe(true)
      expect(splna(byId(`${prefix}_podtema`).podmienka, { [`${prefix}_skusenost`]: { v: 'nie' } }, 'z')).toBe(false)
      expect(splna(byId(`${prefix}_bez_skusenosti_nove`).podmienka, { [`${prefix}_skusenost`]: { v: 'nie' } }, 'z')).toBe(true)
      expect(splna(byId(`${prefix}_bez_skusenosti_nove`).podmienka, { [`${prefix}_skusenost`]: { v: 'ano' } }, 'z')).toBe(false)
      expect(splna(byId(`${prefix}_preferencie_spolocne`).podmienka,
        { [`${prefix}_skusenost`]: { v: 'ano' }, [`${prefix}_miera_vzrusenia`]: { v: 'nechcem_opakovat' } }, 'z')).toBe(false)
      expect(splna(byId(`${prefix}_povodne_odpovede`).podmienka, {}, 'm')).toBe(false)
      expect(splna(byId(`${prefix}_povodne_odpovede`).podmienka,
        { [`${prefix}_skusenost`]: { v: 'ano' }, [`${prefix}_miera_vzrusenia`]: { v: 'velmi' }, [prefix === 'mmf' ? 'mmf_prijat' : 'fmf_prijat_ona']: { v: ['bozk'] } }, 'm')).toBe(true)
    }
  })

  it('znenie skúsenosti a pozornosti zahŕňa respondenta v oboch rodových verziách', () => {
    const all = trojAll()
    const question = (id: string) => {
      const b = all.find(item => item.id === id)
      expect(b?.druh).toBe('otazka')
      if (b?.druh !== 'otazka') throw new Error(`Chýba otázka ${id}`)
      return b
    }
    expect(gtext(question('mmf_skusenost').text, 'm')).toBe('Máš osobnú skúsenosť s trojkou so ženou a ďalším mužom (MMF)?')
    expect(gtext(question('mmf_skusenost').text, 'z')).toBe('Máš osobnú skúsenosť s trojkou s dvoma mužmi (MMF)?')
    expect(gtext(question('fmf_skusenost').text, 'm')).toBe('Máš osobnú skúsenosť s trojkou s dvoma ženami (FMF)?')
    expect(gtext(question('fmf_skusenost').text, 'z')).toBe('Máš osobnú skúsenosť s trojkou s mužom a ďalšou ženou (FMF)?')
    for (const [prefix, male, female] of [
      ['mmf', 'ja, žena a ďalší muž', 'ja a dvaja muži'],
      ['fmf', 'ja a dve ženy', 'ja, muž a ďalšia žena'],
    ]) {
      const group = all.find(item => item.id === `${prefix}_podtema`)
      expect(group?.druh).toBe('skupina')
      if (group?.druh !== 'skupina') throw new Error(`Chýba podtéma ${prefix}`)
      expect(gtext(group.nadpis, 'm')).toContain(male)
      expect(gtext(group.nadpis, 'z')).toContain(female)
      expect(group.bloky.findIndex(item => item.id === `${prefix}_miera_vzrusenia`))
        .toBeLessThan(group.bloky.findIndex(item => item.id === `${prefix}_naladenie`))
    }
    for (const id of ['mmf_rozdelenie_zrkadlo', 'mmf_rozdelenie_bez']) {
      const first = question(id).moznosti!.find(item => item.v === 'len_jej')!
      expect(gtext(first.label, 'm')).toContain('Ja a ďalší muž')
      expect(gtext(first.label, 'z')).toContain('Partner a ďalší muž')
    }
    expect(gtext(question('fmf_pocit_stredobod').text, 'm'))
      .toBe('Ako na teba pôsobí predstava, že sa ty a ďalšia žena venujete partnerke?')
  })

  it('skúsená vetva má celé pokračovanie a stopka ďalej nepokračuje', () => {
    for (const prefix of ['mmf', 'fmf'] as const) {
      const all = bloky(temaObsah('trojky-skupiny', `trojka-${prefix}`)!)
      const byId = (id: string) => all.find(b => b.id === id)!
      const answers = { [`${prefix}_skusenost`]: { v: 'ano' }, [`${prefix}_miera_vzrusenia`]: { v: 'velmi' } }
      expect(splna(byId(`${prefix}_postoj_a_hranice`).podmienka, answers, 'z')).toBe(true)
      expect(splna(byId(`${prefix}_preferencie_spolocne`).podmienka, answers, 'z')).toBe(true)
      const stopped = { [`${prefix}_skusenost`]: { v: 'ano' }, [`${prefix}_miera_vzrusenia`]: { v: 'nechcem_opakovat' } }
      expect(splna(byId(`${prefix}_postoj_a_hranice`).podmienka, stopped, 'z')).toBe(false)
      expect(splna(byId(`${prefix}_naladenie`).podmienka, stopped, 'z')).toBe(false)
      expect(all.map(b => b.id)).not.toContain(`${prefix}_partner_tuzi_nove`)
      expect(all.map(b => b.id)).toContain(`${prefix}_frekvencia_vyhovuje`)
      expect(splna(byId(`${prefix}_preferencie_spolocne`).podmienka, stopped, 'z')).toBe(false)
      expect(all.map(b => b.id)).toContain(`${prefix}_miera_zapojenia`)
      expect(all.map(b => b.id)).toContain(`${prefix}_styl_rol`)
      const centre = byId(`${prefix}_pocit_stredobod`)
      const chosenCentre = prefix === 'mmf' ? 'len_jej' : 'druha_stredobod'
      const possible = { ...answers, [`${prefix}_rozdelenie_zrkadlo`]: { v: [chosenCentre] } }
      expect(splna(centre.podmienka, possible, 'z')).toBe(true)
      expect(splna(centre.podmienka, { ...possible, [`${prefix}_rozdelenie_zrkadlo`]: { v: ['kazdy_kazdemu'] } }, 'z')).toBe(false)
    }
  })

  it('každá téma má skúsenú aj neskúsenú vetvu oddelene', () => {
    for (const prefix of ['mmf', 'fmf'] as const) {
      const tema = temaObsah('trojky-skupiny', `trojka-${prefix}`)!
      expect(tema.telo.map(b => b.id)).toEqual([`${prefix}_skusenost`, `${prefix}_podtema`, `${prefix}_bez_skusenosti_nove`])
      const podtema = tema.telo.find(b => b.id === `${prefix}_podtema`)
      expect(podtema?.druh).toBe('skupina')
      if (podtema?.druh !== 'skupina') continue
      expect(podtema.bloky.map(b => b.id)).toContain(`${prefix}_miera_vzrusenia`)
      expect(podtema.bloky.map(b => b.id)).toContain(`${prefix}_postoj_a_hranice`)
      const postoj = podtema.bloky.find(b => b.id === `${prefix}_postoj_a_hranice`)
      expect(postoj?.druh).toBe('skupina')
      if (postoj?.druh === 'skupina') expect(postoj.bloky.map(b => b.id)).toContain(`${prefix}_preferencie_spolocne`)
    }
  })

  it('MMF aj FMF majú päťstupňovú mieru vzrušenia a podotázku iba pri zlepšiteľnej skúsenosti', () => {
    const all = trojAll()
    for (const prefix of ['mmf', 'fmf']) {
      const rating = all.find(b => b.id === `${prefix}_miera_vzrusenia`)
      const improve = all.find(b => b.id === `${prefix}_mozne_zlepsenie`)
      const details = all.find(b => b.id === `${prefix}_preferencie_spolocne`)
      const practical = all.find(b => b.id === `${prefix}_realny_ramec`)
      expect(rating?.druh).toBe('otazka')
      expect(improve?.druh).toBe('otazka')
      if (rating?.druh !== 'otazka') continue
      expect(rating.moznosti?.map(m => m.v)).toEqual(['velmi', 'zlepsit', 'zmiesane', 'nechcem_opakovat'])
      expect(all.map(b => b.id)).not.toContain(`${prefix}_s_kym`)
      expect(all.map(b => b.id)).not.toContain(`${prefix}_fungovalo_nove`)
      expect(all.map(b => b.id)).not.toContain(`${prefix}_opakovat`)
      for (const value of ['velmi', 'zlepsit', 'zmiesane', 'nechcem_opakovat']) {
        const answers = { [`${prefix}_skusenost`]: { v: 'ano' }, [`${prefix}_miera_vzrusenia`]: { v: value } }
        expect(splna(improve?.podmienka, answers, 'z')).toBe(value === 'zlepsit')
        expect(splna(details?.podmienka, answers, 'z')).toBe(value !== 'nechcem_opakovat')
        expect(splna(practical?.podmienka, answers, 'z')).toBe(['velmi', 'zlepsit', 'zmiesane'].includes(value))
      }
    }
  })

  it('klikateľné situácie a hranice pomenúvajú rovnaký dej žene aj mužovi', () => {
    const all = trojAll()
    const mmf = all.find(b => b.id === 'mmf_par_treti_aktivity_vyber')
    const fmf = all.find(b => b.id === 'fmf_par_treti_aktivity_vyber')
    expect(mmf?.druh).toBe('otazka')
    expect(fmf?.druh).toBe('otazka')
    if (mmf?.druh !== 'otazka' || fmf?.druh !== 'otazka') return
    expect(gtext(mmf.moznosti![0].label, 'm')).toContain('Partnerka')
    expect(gtext(mmf.moznosti![0].label, 'z')).toContain('Bozkávam')
    expect(gtext(fmf.moznosti![0].label, 'm')).toContain('Bozkávam')
    expect(gtext(fmf.moznosti![0].label, 'z')).toContain('Partner')
    for (const prefix of ['mmf', 'fmf']) {
      const allowed = all.find(b => b.id === `${prefix}_par_treti_aktivity_vyber`)
      const forbidden = all.find(b => b.id === `${prefix}_hranice_vyber`)
      const feeling = all.find(b => b.id === `${prefix}_pocit_par_treti`)
      const feelingSameGender = all.find(b => b.id === `${prefix}_pocit_rovnake_pohlavie`)
      expect(allowed?.druh).toBe('otazka')
      expect(forbidden?.druh).toBe('otazka')
      expect(feeling?.druh).toBe('otazka')
      expect(feelingSameGender?.druh).toBe('otazka')
      if (allowed?.druh !== 'otazka' || forbidden?.druh !== 'otazka' || feeling?.druh !== 'otazka' || feelingSameGender?.druh !== 'otazka') continue
      expect(allowed.typ).toBe('viac')
      expect(forbidden.typ).toBe('viac')
      expect(feeling.typ).toBe('jeden')
      expect(feelingSameGender.typ).toBe('jeden')
      expect(feeling.moznosti?.map(m => m.v)).toEqual(['vzrusuje', 'mozno', 'zmiesane', 'neprijemne', 'nepredstavim'])
      expect(gtext(feeling.text, 'm')).toContain(prefix === 'mmf' ? 'partnerku s ďalším mužom' : 'pri kontakte s ďalšou ženou')
      expect(gtext(feeling.text, 'z')).toContain(prefix === 'mmf' ? 'pri kontakte s ďalším mužom' : 'partnera s ďalšou ženou')
      expect(gtext(feelingSameGender.text, 'm')).toContain(prefix === 'mmf' ? 'pri kontakte s ďalším mužom' : 'partnerku s ďalšou ženou')
      expect(gtext(feelingSameGender.text, 'z')).toContain(prefix === 'mmf' ? 'partnera s ďalším mužom' : 'pri kontakte s ďalšou ženou')
      expect(allowed.moznosti?.map(m => m.v)).toEqual(expect.arrayContaining(['bozk', 'oral_prijima', 'oral_poskytuje', 'penetracia', 'pomocka', 'partner_sleduje', 'partner_aktivne']))
      expect(forbidden.moznosti?.map(m => m.v)).toEqual(expect.arrayContaining(['bozk', 'oral_prijima', 'oral_poskytuje', 'penetracia', 'pomocky', 'pozornost', 'rovnake_pohlavie', 'dominancia']))
      expect(prepniMoznost(allowed, ['bozk'], 'bozk')).toEqual([])
      expect(prepniMoznost(forbidden, ['bozk'], 'ziadne')).toEqual(['ziadne'])
      expect(prepniMoznost(forbidden, ['ziadne'], 'oral_prijima')).toEqual(['oral_prijima'])
      for (const option of [...allowed.moznosti!, ...forbidden.moznosti!]) {
        expect(gtext(option.label, 'm')).not.toMatch(/treti[aeu]|tretia osob|treťou osob|tretej osob/i)
        expect(gtext(option.label, 'z')).not.toMatch(/treti[aeu]|tretia osob|treťou osob|tretej osob/i)
      }
    }
  })

  it('kontakty medzi mužmi a ženami majú rovnako podrobné možnosti a hranice', () => {
    const all = trojAll()
    for (const prefix of ['mmf', 'fmf']) {
      const allowed = all.find(b => b.id === `${prefix}_rovnake_pohlavie_vyber`)
      const forbidden = all.find(b => b.id === `${prefix}_hranice_vyber`)
      expect(allowed?.druh).toBe('otazka')
      expect(forbidden?.druh).toBe('otazka')
      if (allowed?.druh !== 'otazka' || forbidden?.druh !== 'otazka') continue
      for (const option of allowed.moznosti!.filter(m => m.v !== 'ziadne')) {
        const taboo = forbidden.moznosti!.find(m => m.v === `rovnake_${option.v}`)
        expect(taboo).toBeDefined()
        expect(gtext(taboo!.label, 'm')).toBe(gtext(option.label, 'm'))
        expect(gtext(taboo!.label, 'z')).toBe(gtext(option.label, 'z'))
      }
      expect(prepniMoznost(forbidden, ['rovnake_bozk'], 'rovnake_oral_prijima'))
        .toEqual(['rovnake_bozk', 'rovnake_oral_prijima'])
      expect(prepniMoznost(forbidden, ['bozk'], 'rovnake_pohlavie')).toEqual(['bozk', 'rovnake_pohlavie'])
    }
  })

  it('obe zloženia rozlišujú trvalé pozorovanie od neskoršieho zapojenia', () => {
    const all = trojAll()
    for (const prefix of ['mmf', 'fmf']) {
      const split = all.find(b => b.id === `${prefix}_rozdelenie_zrkadlo`)
      const involvement = all.find(b => b.id === `${prefix}_miera_zapojenia`)
      expect(split?.druh).toBe('otazka')
      expect(involvement?.druh).toBe('otazka')
      if (split?.druh !== 'otazka') continue
      if (involvement?.druh === 'otazka') {
        expect(involvement.moznosti?.map(m => m.v)).toContain('len_pozorovat')
        expect(involvement.moznosti?.map(m => m.v)).toContain('pozorovat')
      }
      const watch = split.moznosti!.find(m => m.v === 'pozorovatel')!
      const join = split.moznosti!.find(m => m.v === 'jeden_asistuje')!
      for (const sex of ['m', 'z'] as const) {
        expect(gtext(watch.label, sex)).toContain('zostan')
        expect(gtext(join.label, sex)).toContain('potom sa zapoj')
      }
    }
  })

  it('staré odpovede FMF majú mužské aj ženské znenie', () => {
    const all = trojAll()
    for (const id of ['fmf_prijat_ona', 'fmf_poskytnut_ona']) {
      const question = all.find(b => b.id === id)
      expect(question?.druh).toBe('otazka')
      if (question?.druh !== 'otazka') continue
      expect(gtext(question.text, 'm')).not.toMatch(/rada|bola ochotná/)
      expect(gtext(question.text, 'z')).toMatch(/rada|bola ochotná/)
    }
  })

  it('MMF aj FMF sa pýtajú na vzrušenie v skúsenej aj neskúsenej vetve', () => {
    const all = trojAll()
    for (const prefix of ['mmf', 'fmf']) {
      const experienced = all.find(b => b.id === `${prefix}_miera_vzrusenia`)
      const novice = all.find(b => b.id === `${prefix}_vzrusenie_bez`)
      const motiveExperienced = all.find(b => b.id === `${prefix}_co_laka`)
      const motiveNovice = all.find(b => b.id === `${prefix}_co_vzrusuje_bez`)
      for (const question of [experienced, novice, motiveExperienced, motiveNovice]) {
        expect(question?.druh).toBe('otazka')
        if (question?.druh !== 'otazka') continue
        for (const sex of ['m', 'z'] as const) expect(gtext(question.text, sex)).toMatch(/vzruš|hodnotíš/)
      }
      expect(novice?.druh === 'otazka' && novice.moznosti?.map(m => m.v))
        .toEqual(['velmi', 'skor', 'zmiesane', 'nevzrusuje', 'neprijemne'])
    }
  })

  it('neskúsená vetva otvorí fantáziu bez plánovania a okolnosti až pri ochote', () => {
    const all = trojAll()
    const byId = (id: string) => all.find(b => b.id === id)!
    for (const prefix of ['mmf', 'fmf']) {
      const fantasy = byId(`${prefix}_predstava_bez`)
      const circumstances = byId(`${prefix}_okolnosti_bez`)
      const relief = byId(`${prefix}_co_pomoze_bez`)
      const partner = byId(`${prefix}_partner_tuzi_bez`)
      expect(partner.druh).toBe('otazka')
      expect(partner.podmienka).toBeUndefined()
      for (const value of ['fantazia', 'mozno', 'chcem', 'nie']) {
        const answers = { [`${prefix}_realita_nova`]: { v: value } }
        expect(splna(fantasy.podmienka, answers, 'm')).toBe(value !== 'nie')
        expect(splna(circumstances.podmienka, answers, 'z')).toBe(value === 'mozno' || value === 'chcem')
      }
      expect(splna(relief.podmienka, { [`${prefix}_obavy_bez`]: { v: ['bokom'] } }, 'm')).toBe(true)
      expect(splna(relief.podmienka, { [`${prefix}_obavy_bez`]: { v: ['bez_obav'] } }, 'z')).toBe(false)
      expect(all.map(b => b.id)).not.toContain(`${prefix}_s_kym_to_bolo`)
    }
  })

  it('nové predstavy a hranice sú po jednotlivých dejoch zrkadlové', () => {
    const all = trojAll()
    const question = (id: string) => all.find(b => b.id === id)
    for (const prefix of ['mmf', 'fmf']) {
      for (const [possibleId, tabooId] of [
        [`${prefix}_par_treti_bez`, `${prefix}_tabu_par_bez`],
        [`${prefix}_rovnake_bez`, `${prefix}_tabu_rovnake_bez`],
      ]) {
        const possible = question(possibleId)
        const taboo = question(tabooId)
        expect(possible?.druh).toBe('otazka')
        expect(taboo?.druh).toBe('otazka')
        if (possible?.druh !== 'otazka' || taboo?.druh !== 'otazka') continue
        for (const option of possible.moznosti!.filter(m => m.v !== 'ziadne')) {
          const matching = taboo.moznosti!.find(m => m.v === option.v)
          expect(matching).toBeDefined()
          for (const sex of ['m', 'z'] as const) expect(gtext(matching!.label, sex)).toBe(gtext(option.label, sex))
        }
        const experiencedId = possibleId.includes('par_treti')
          ? `${prefix}_par_treti_aktivity_vyber` : `${prefix}_rovnake_pohlavie_vyber`
        const experienced = question(experiencedId)
        expect(experienced?.druh).toBe('otazka')
        if (experienced?.druh === 'otazka') {
          for (const option of possible.moznosti!.filter(m => m.v !== 'ziadne')) {
            const matching = experienced.moznosti!.find(m => m.v === option.v)
            expect(matching).toBeDefined()
            for (const sex of ['m', 'z'] as const) expect(gtext(matching!.label, sex)).toBe(gtext(option.label, sex))
          }
        }
        expect(prepniMoznost(taboo, ['bozk'], 'bozk')).toEqual([])
      }
      expect(question(`${prefix}_kto_bez`)?.druh).toBe('otazka')
      expect(question(`${prefix}_miesto_bez`)?.druh).toBe('otazka')
      expect(question(`${prefix}_opakovat_bez`)?.druh).toBe('otazka')
      expect(question(`${prefix}_po_bez`)?.druh).toBe('otazka')
      expect(question(`${prefix}_miesto`)?.druh).toBe('otazka')
      expect(question(`${prefix}_frekvencia_vyhovuje`)?.druh).toBe('otazka')
      expect(question(`${prefix}_vedenie_bez`)?.druh).toBe('otazka')
      expect(question(`${prefix}_pocit_rovnake_bez`)?.druh).toBe('otazka')
    }
  })

  it('skúsená vetva má hranicu pre každý ponúkaný kontakt s ďalším človekom', () => {
    const all = trojAll()
    for (const prefix of ['mmf', 'fmf']) {
      const possible = all.find(b => b.id === `${prefix}_par_treti_aktivity_vyber`)
      const taboo = all.find(b => b.id === `${prefix}_hranice_vyber`)
      expect(possible?.druh).toBe('otazka')
      expect(taboo?.druh).toBe('otazka')
      if (possible?.druh !== 'otazka' || taboo?.druh !== 'otazka') continue
      for (const option of possible.moznosti!.filter(m => m.v !== 'ziadne')) {
        const tabooValue = option.v === 'pomocka' ? 'pomocky' : option.v
        const matching = taboo.moznosti!.find(m => m.v === tabooValue)
        expect(matching).toBeDefined()
        for (const sex of ['m', 'z'] as const) expect(gtext(matching!.label, sex)).toBe(gtext(option.label, sex))
      }
      expect(all.find(b => b.id === `${prefix}_co_pomoze`)?.druh).toBe('otazka')
    }
  })

  it('odpovede sa medzi oddelenými témami neprepisujú cez spoločné ID', () => {
    const routes = ['trojka-mmf', 'trojka-fmf', ...formaty, 'treti-clovek']
    const all = routes.flatMap(slug => bloky(temaObsah('trojky-skupiny', slug)!)
      .filter(b => b.druh === 'otazka').map(b => `${slug}:${b.id}`))
    const ids = all.map(row => row.split(':')[1])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('presunuté otázky zapisujú do pôvodných kľúčov uložených odpovedí', () => {
    const examples = [
      ['trojka-mmf', 'mmf_rozdelenie_zrkadlo', 'mmf'],
      ['trojka-fmf', 'fmf_rozdelenie_zrkadlo', 'fmf'],
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
