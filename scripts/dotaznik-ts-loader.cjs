// Relatívne importy dátových modulov pre existujúce kontroly zdrojových máp.
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const cache = new Map()
module.exports = function load(file) {
  if (cache.has(file)) return cache.get(file)
  const exports = {}
  cache.set(file, exports)
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  vm.runInNewContext(compiled, { exports, require: name => load(path.resolve(path.dirname(file), name + '.ts')) }, { timeout: 1000 })
  return exports
}
