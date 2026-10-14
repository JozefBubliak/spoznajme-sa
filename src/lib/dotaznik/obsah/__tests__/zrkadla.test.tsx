import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, it, expect } from '@jest/globals'
import { vsetkyObsahy } from '../index'
import { chybneZrkadla, otazkyTémy, zrkadlaTémy, zrkadloveSkupiny } from '../zrkadla'
import PairedPreview, { MirrorQuestion } from '@/app/[lang]/dotaznik/obsah-prehlad/_paired'

describe('významové zrkadlá dotazníka', () => {
  const temy = vsetkyObsahy()

  it('všetky určené protikusy skutočne existujú a sú obojsmerné', () => {
    for (const tema of temy) {
      expect(chybneZrkadla(tema)).toEqual([])
      for (const [id, opposite] of zrkadlaTémy(tema)) {
        expect(zrkadlaTémy(tema).get(opposite.id)?.id).toBe(id)
        expect(otazkyTémy(tema).get(id)?.typ).toBe(opposite.typ)
      }
    }
  })

  it('pri dirty talku stojí jej prijímanie oproti jeho poskytovaniu', () => {
    const tema = temy.find(t => t.slug === 'dirty-talk-oslovenia/obsah')!
    const questions = otazkyTémy(tema)
    const female = questions.get('dt_obsah_prijimam')!
    const male = zrkadlaTémy(tema).get(female.id)!
    expect(male.id).toBe('dt_obsah_poskytujem')
    expect(female.moznosti?.map(x => x.v)).toEqual(male.moznosti?.map(x => x.v))
    const html = renderToStaticMarkup(<MirrorQuestion female={female} male={male}
      answers={{ z: {}, m: {} }} active={{ z: true, m: true }} showAll={false} save={() => {}} />)
    expect(html).toContain('Ktorý obsah chcem počuť')
    expect(html).toContain('Ktorý obsah chcem hovoriť partnerke')
    expect(html).toContain('Ako veľmi ma partner chce')
    expect(html).toContain('Ako veľmi ju chcem')
    const preview = renderToStaticMarkup(<PairedPreview tema={tema} />)
    expect(preview).toContain('data-zrkadlo-z="dt_obsah_prijimam" data-zrkadlo-m="dt_obsah_poskytujem"')
    expect(preview).toContain('data-zrkadlo-z="dt_obsah_poskytujem" data-zrkadlo-m="dt_obsah_prijimam"')
  })

  it('rolové skupiny tvoria opačné perspektívy, nie dve rovnaké roly', () => {
    const tema = temy.find(t => t.slug === 'oral-kombinacie-polohy/face-sitting')!
    expect(zrkadloveSkupiny(tema).get('hore')?.id).toBe('dole')
    expect(zrkadloveSkupiny(tema).get('dole')?.id).toBe('hore')
  })
})
