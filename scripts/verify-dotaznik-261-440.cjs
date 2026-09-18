// Kontrola dohľadateľnosti dávky; nenahrádza významové čítanie zdroja.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const root = path.resolve(__dirname, '..')
const map = JSON.parse(fs.readFileSync(path.join(root, 'docs/dotaznik-zdroj-261-440.json'), 'utf8'))
const files = ['miesta-prostredie', 'digitalna-intimita', 'zmyslova-hra']
const bank = new Map()
for (const file of files) {
  const source = fs.readFileSync(path.join(root, 'src/lib/dotaznik/obsah', file + '.ts'), 'utf8')
  const exports = {}
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
  vm.runInNewContext(compiled, { exports }, { timeout: 1000 })
  for (const topic of Object.values(exports)) {
    const ids = new Set()
    function walk(blocks) {
      for (const b of blocks) {
        assert(!ids.has(b.id), `Duplicitné ID ${file}:${b.id}`)
        ids.add(b.id)
        bank.set(`${file}:${b.id}`, b)
        if (b.moznosti) assert.equal(new Set(b.moznosti.map(x => x.v)).size, b.moznosti.length, `Duplicitné voľby ${b.id}`)
        if (b.bloky) walk(b.bloky)
      }
    }
    walk([...topic.uvod, ...topic.telo, ...(topic.zaver || [])])
  }
}
function target(ref) {
  const [base, value] = ref.split('#')
  const [key, field] = base.split('@')
  const b = bank.get(key)
  assert(b, `Neexistujúci blok ${ref}`)
  if (value) assert(b.moznosti?.some(x => x.v === value), `Neexistujúca voľba ${ref}`)
  if (field) assert(field === 'ine' && b.typ === 'viac' && b.inePovolene, `Nezobraziteľné Iné ${ref}`)
  return b
}
assert.equal(map.paragraphs.length, 180)
let choices = 0, own = 0
for (const [i, p] of map.paragraphs.entries()) {
  assert.equal(p.p, i + 261, 'Chýbajúci alebo opakovaný odsek')
  assert(p.decision, `Chýba rozhodnutie P${p.p}`)
  assert(p.targets.length || !p.source.trim(), `Nepriradený obsah P${p.p}`)
  p.targets.forEach(target)
  const lines = p.source.split('\n').filter(x => x.trim().startsWith('🔘'))
  assert.equal(p.options.length, lines.length, `Stratená možnosť P${p.p}`)
  p.options.forEach((o, j) => {
    assert.equal(o.source, lines[j].replace(/^🔘\s*/, ''))
    target(o.target)
    choices++
  })
  if (p.source.includes('✍️')) {
    assert(p.ownAnswer, `Stratená vlastná odpoveď P${p.p}`)
    const b = target(p.ownAnswer)
    assert(p.ownAnswer.endsWith('@ine') || b.typ === 'text', `Vlastná odpoveď nemá textové pole P${p.p}`)
    own++
  }
}
function checkText(t, where) {
  if (typeof t === 'string') return assert(t.length, where)
  assert(t && typeof t.m === 'string' && t.m.length && typeof t.z === 'string' && t.z.length, `Chýba mužská/ženská verzia: ${where}`)
}
for (const [id, b] of bank) {
  if (b.text) checkText(b.text, id)
  if (b.telo) checkText(b.telo, id)
  if (b.nadpis) checkText(b.nadpis, id)
  for (const option of b.moznosti || []) checkText(option.label, id + '#' + option.v)
}
assert.equal(choices, 164)
assert.equal(own, 40)
console.log(`PASS: 180 odsekov P261–440, ${choices} volieb, ${own} vlastných odpovedí, oba rodové texty a platné referencie.`)
