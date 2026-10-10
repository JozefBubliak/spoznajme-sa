const fs = require('fs')
const path = require('path')
const assert = require('node:assert/strict')
const ts = require('typescript')
const root = path.resolve(__dirname, '..')
const cache = new Map()
function load(file) {
  file = path.resolve(file)
  if (cache.has(file)) return cache.get(file).exports
  const module = { exports: {} }
  cache.set(file, module)
  const source = fs.readFileSync(file, 'utf8')
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const localRequire = name => name.startsWith('.') ? load(path.resolve(path.dirname(file), name + '.ts')) : require(name)
  new Function('exports', 'module', 'require', js)(module.exports, module, localRequire)
  return module.exports
}
const { vsetkyObsahy } = load(path.join(root, 'src/lib/dotaznik/obsah/index.ts'))
const { hodnotaPreOtazku, predoslaMoznost, prepniMoznost } = load(path.join(root, 'src/lib/dotaznik/odpovede-ux.ts'))
const { gtext } = load(path.join(root, 'src/lib/dotaznik/obsah/typ.ts'))
const { splna } = load(path.join(root, 'src/lib/dotaznik/podmienky.ts'))
const themes = vsetkyObsahy()
const flatten = blocks => blocks.flatMap(b => b.druh === 'skupina' ? [b, ...flatten(b.bloky)] : [b])
const questions = themes.flatMap(t => flatten([...t.uvod, ...t.telo, ...(t.zaver ?? [])]).filter(b => b.druh === 'otazka'))
const find = id => { const q = questions.find(b => b.id === id); assert.ok(q, id); return q }

// Staré neutrálne/odmietavé odpovede neznamenajú novú ochotu.
const scale = find('boz_6_sekund')
assert.equal(scale.moznosti.length, 4)
for (const v of ['neutral', 'skor_nie', 'zvedavy']) {
  const saved = { [scale.id]: { v } }
  assert.deepEqual(hodnotaPreOtazku(scale, saved), { v })
  assert.equal(predoslaMoznost(scale, saved[scale.id]).v, v)
}
assert.equal(predoslaMoznost(scale, { v: 'ochota' }), undefined)
assert.notEqual(gtext(scale.moznosti[1].label, 'm'), gtext(scale.moznosti[1].label, 'z'))
assert.deepEqual(prepniMoznost(find('kon_kontext'), ['novy', 'viac'], 'ziadne'), ['ziadne'])
assert.deepEqual(prepniMoznost(find('kon_kontext'), ['ziadne'], 'novy'), ['novy'])
assert.equal(find('men_hanba').moznosti.some(m => m.v === 'pacim'), false)
assert.equal(find('pri_sebavedomie').moznosti.some(m => m.v === 'pacim'), false)
assert.equal(find('poc_vina').moznosti.some(m => m.v === 'pacim'), false)

// Starý text aj jednorazová voľba sa zobrazia bez mutácie uložených dát.
const old = { map_eroticke: { v: 'Vlastná pôvodná zóna' } }
assert.deepEqual(hodnotaPreOtazku(find('map_eroticke'), old), { v: [], ine: 'Vlastná pôvodná zóna' })
assert.equal(old.map_eroticke.v, 'Vlastná pôvodná zóna')
assert.deepEqual(hodnotaPreOtazku(find('kon_zdravotne'), { kon_zdravotne: { v: 'kratko' } }).v, ['kratko'])
assert.equal(find('kon_zdravotne').typ, 'viac')

const merged = questions.filter(q => q.doplnenieId)
assert.ok(merged.length >= 55)
for (const q of merged) {
  assert.ok(q.inePovolene)
  assert.equal(hodnotaPreOtazku(q, { [q.doplnenieId]: { v: 'Doplnenie' } }).ine, 'Doplnenie')
  // Vymazanie nového inline poľa nesmie obnoviť starý samostatný text.
  assert.equal(hodnotaPreOtazku(q, { [q.id]: { v: [], ine: '' }, [q.doplnenieId]: { v: 'Staré' } }).ine, '')
}

// Podmienka „nie je NIE“ vyžaduje odpoveď, nie chýbajúcu hodnotu.
assert.equal(splna({ ot: 'q', nie: 'nie' }, {}), false)
assert.equal(splna({ ot: 'q', nie: 'nie' }, { q: { v: '' } }), false)
assert.equal(splna({ ot: 'q', nie: 'nie' }, { q: { v: 'nie' } }), false)
assert.equal(splna({ ot: 'q', nie: 'nie' }, { q: { v: 'zlepsit' } }), true)
assert.equal(splna({ vsetky: [{ ot: 'mam', je: 'ano' }, { ot: 'q', nie: 'nie' }] }, { mam: { v: 'ziadna' }, q: { v: 'ano' } }), false)
for (const id of ['kon_novy_partner', 'kon_viac_partnerov']) {
  assert.equal(splna(find(id).podmienka, {}), false)
  assert.equal(splna(find(id).podmienka, { kon_kontext: { v: ['ziadne'] } }), false)
}
const nipple = find('sz_bradavky_jazyk')
assert.equal(splna(nipple.podmienka, { sz_bradavky: { v: ['lick'] } }), true)
assert.equal(splna(nipple.podmienka, { sz_bradavky: { v: ['sanie'] } }), false)
assert.ok(questions.some(q => q.id === 'tempo_partner_tuzi'))
assert.ok(find('tnt_len_objatie').moznosti.some(m => m.v === 'dlhe_naladenie'))

// Podmienky nových detailov musia odkazovať na existujúcu otázku a možnosť.
for (const tema of themes) {
  const blocks = flatten([...tema.uvod, ...tema.telo, ...(tema.zaver ?? [])])
  const ids = new Set(blocks.map(b => b.id))
  for (const q of blocks.filter(b => b.druh === 'otazka' && b.zbalitelna && b.podmienka?.obsahujeNiektoru)) {
    assert.ok(ids.has(q.podmienka.ot), `${tema.slug}: ${q.id}`)
    const gate = blocks.find(b => b.id === q.podmienka.ot)
    for (const v of q.podmienka.obsahujeNiektoru) assert.ok(gate.moznosti.some(m => m.v === v), `${q.id}: ${v}`)
  }
}
console.log(`PASS: zachovanie odpovedí, ${merged.length} inline doplnení, význam škál, kontexty, detailné vetvenie a zmena pohlavia.`)
