const assert = require('node:assert/strict')
const path = require('node:path')
const load = require('./dotaznik-ts-loader.cjs')
const root = path.resolve(__dirname, '..')
const { BOZKY_DOTYKY } = load(path.join(root, 'src/lib/dotaznik/obsah/bozky-dotyky.ts'))
const { hodnotaPreOtazku, dalsiaZlucenaOdpoved } = load(path.join(root, 'src/lib/dotaznik/odpovede-ux.ts'))
const flat = bs => bs.flatMap(b => b.druh === 'skupina' ? [b, ...flat(b.bloky)] : [b])
const blocks = flat(BOZKY_DOTYKY.telo)
const q = id => blocks.find(b => b.id === id)
assert.equal(q('boz_hlava_vlasy'), undefined)
const merged = q('boz_uchop_hlavy')
assert.equal(merged.predosleId, 'boz_hlava_vlasy')
assert.equal(hodnotaPreOtazku(merged, { boz_hlava_vlasy: { v: 'neutral' } }).v, 'neutral')
const old = { boz_uchop_hlavy: { v: 'pacim' }, boz_hlava_vlasy: { v: 'nie' } }
assert.equal(hodnotaPreOtazku(merged, old).v, 'pacim')
assert.equal(dalsiaZlucenaOdpoved(merged, old).v, 'nie')
assert.equal(dalsiaZlucenaOdpoved(merged, { boz_uchop_hlavy: { v: 'nie' }, boz_hlava_vlasy: { v: 'nie' } }), undefined)
for (const [id, group] of [['boz_po_orali', 'bozky_usta'], ['boz_znacenie', 'bozky_telo'], ['boz_intenzivne_hryzenie', 'bozky_telo']]) {
  assert.equal(q(id).povodnyOkruh, group)
}
for (const id of ['bozky_usta', 'bozky_telo', 'bozk_vedenie']) {
  for (const b of flat(q(id).bloky).filter(b => b.druh === 'otazka')) {
    assert.ok(!JSON.stringify(b.text).includes('Predstav si'), b.id)
  }
}
assert.ok(q('boz_vecer').zbalitelny)
assert.ok(q('boz_myty').zbalitelny)
assert.equal(q('boz_miera_vlhkosti').moznosti.at(-1).v, 'snowballing')
assert.equal(q('bozky_usta').bloky[2].id, 'boz_miera_vlhkosti')
assert.ok(BOZKY_DOTYKY.telo.indexOf(q('bozk_vedenie')) < BOZKY_DOTYKY.telo.indexOf(q('bozky_tipy')))
console.log('PASS: direct copy, gradual order, optional tips, merged answers and stable storage keys.')
