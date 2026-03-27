'use client'
// TEMPORARY DEBUG PAGE — odstráň po oprave!
// URL: /sk/debug-game

import { useState } from 'react'

interface DiagResult {
  diagnosis?: {
    authClientInsertWorks: boolean
    adminClientInsertWorks: boolean
    ensureRoomWorks: boolean
    gameCode: string | null
    userId: string
    conclusion: string
  }
  log?: Record<string, unknown>
  step?: string
  error?: string
  fatal?: string
}

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
        ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {ok ? '✓' : '✗'} {label}
    </span>
  )
}

function Row({ label, value }: { label: string; value: unknown }) {
  const str =
    value === null ? 'null' : value === undefined ? 'undefined' : JSON.stringify(value, null, 2)
  const isError = str.includes('"error"') && !str.includes('"error":null') && !str.includes('"error":{}')
  return (
    <div className="border-b border-slate-100 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <pre
        className={`mt-1 overflow-x-auto whitespace-pre-wrap break-all rounded p-2 text-xs ${
          isError ? 'bg-red-50 text-red-800' : 'bg-slate-50 text-slate-700'
        }`}
      >
        {str}
      </pre>
    </div>
  )
}

export default function DebugGamePage() {
  const [result, setResult] = useState<DiagResult | null>(null)
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    setResult(null)
    try {
      const r = await fetch('/api/debug-game', { method: 'POST', cache: 'no-store' })
      const data = await r.json()
      setResult(data)
    } catch (e) {
      setResult({ fatal: String(e) })
    }
    setLoading(false)
  }

  const d = result?.diagnosis
  const log = result?.log as Record<string, unknown> | undefined

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <h1 className="text-lg font-bold text-amber-800">🔧 Debug — Game Creation</h1>
        <p className="mt-1 text-sm text-amber-700">
          Dočasná diagnostická stránka. Odstráň po oprave.
        </p>
      </div>

      <button
        onClick={run}
        disabled={loading}
        className="w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-slate-300"
      >
        {loading ? 'Testujem…' : 'Spustiť diagnostiku'}
      </button>

      {result?.fatal && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <strong>Fatal error:</strong> {result.fatal}
        </div>
      )}

      {result?.error && !d && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-xs font-semibold uppercase text-red-500">Zlyhalo v kroku: {result.step}</p>
          <p className="mt-1 text-sm text-red-800">{result.error}</p>
        </div>
      )}

      {d && (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Výsledky testov</h2>

          <div className="flex flex-wrap gap-2">
            <Badge ok={d.ensureRoomWorks} label="ensure_room()" />
            <Badge ok={d.authClientInsertWorks} label="INSERT (user JWT)" />
            <Badge ok={d.adminClientInsertWorks} label="INSERT (service role)" />
          </div>

          <div className={`rounded-lg p-4 text-sm font-medium ${
            d.adminClientInsertWorks ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {d.conclusion}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-400">Game kód</p>
              <p className="font-mono font-bold text-slate-900">{d.gameCode ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">User ID</p>
              <p className="font-mono text-xs text-slate-600">{d.userId}</p>
            </div>
          </div>
        </div>
      )}

      {log && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-semibold text-slate-900">Detailný log</h2>
          {Object.entries(log).map(([key, val]) => (
            <Row key={key} label={key} value={val} />
          ))}
        </div>
      )}
    </div>
  )
}
