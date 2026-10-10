const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const root = path.resolve(__dirname, '..')
let saved = {}
const cache = new Map()
function load(file) {
  if (cache.has(file)) return cache.get(file)
  const exports = {}
  cache.set(file, exports)
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  function resolve(name) {
    if (name === './_par') return { usePar: () => ({ par: {}, ready: true }) }
    if (name === './_stav') return { useStavy: () => ({ stavy: {} }), partnerZamok: () => false }
    if (name === './_odp') return { useMojeOdpovede: () => ({ mapa: Object.entries(saved).map(([polozka, hodnota]) => ({ polozka, hodnota })), nacitane: true }) }
    if (name === '@/components/IntlProvider') return { useI18n: () => ({ t: key => key }) }
    if (name === './_ui') return { Krok: ({ children }) => React.createElement('main', null, children), Volba: ({ children }) => React.createElement('button', null, children) }
    if (name.startsWith('.') || name.startsWith('@/')) {
      const base = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(file), name)
      return load(base + (fs.existsSync(base + '.ts') ? '.ts' : '.tsx'))
    }
    return require(name)
  }
  new Function('exports', 'require', js)(exports, resolve)
  return exports
}
const Kniha = load(path.join(root, 'src/app/[lang]/dotaznik/_kniha.tsx')).default
const { vsetkyObsahy } = load(path.join(root, 'src/lib/dotaznik/obsah/index.ts'))
const theme = vsetkyObsahy().find(t => t.telo.some(b => b.id === 'bozky' || JSON.stringify(b).includes('boz_6_sekund')))
assert.ok(theme)
function render(pohlavie) {
  saved = { pohlavie: { v: pohlavie }, boz_6_sekund: { v: 'neutral' }, map_eroticke: { v: 'Moja pôvodná zóna' } }
  return renderToStaticMarkup(React.createElement(Kniha, { lang: 'sk', modul: 'B1', tema: theme.slug, obsah: theme, spatHref: '/sk/dotaznik', dalejHref: '/sk/dotaznik' }))
}
const male = render('m')
const female = render('z')
assert.ok(male.includes('<details'))
assert.ok(male.includes('aria-pressed='))
assert.ok(male.includes('dotaznik.ui.previousAnswer'))
assert.ok(male.includes('Moja pôvodná zóna'))
assert.ok(male.includes('Rád, ak chceš ty'))
assert.ok(female.includes('Rada, ak chceš ty'))
console.log('PASS: vykreslenie knihy, pôvodná odpoveď a text, zbalenie detailov, prístupné voľby, obe pohlavia.')
