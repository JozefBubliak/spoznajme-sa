'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function HerdVoteJoinPage() {
  const router = useRouter()
  const params = useParams() as { lang?: string }
  const lang = params?.lang ?? 'sk'
  const [code, setCode] = useState('')

  const go = () => {
    const c = code.trim().toUpperCase()
    if (c.length >= 4) router.push(`/${lang}/herd-vote/play/${c}`)
  }

  return (
    <div className="hv-bg hv-particles min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 hv-badge bg-purple-500/15 text-purple-300 border border-purple-500/20">
            <span>🐂</span><span>Herd Vote</span>
          </div>
          <h1 className="text-3xl font-black text-white">Pripojiť sa</h1>
          <p className="hv-text-muted text-sm">Zadaj kód od moderátora</p>
        </div>

        <div className="hv-card-glow p-6 space-y-4">
          <input
            autoFocus
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && go()}
            placeholder="AB12CD"
            maxLength={8}
            className="hv-input w-full px-4 py-4 text-center text-3xl font-black font-mono tracking-[0.4em]"
          />
          <button
            onClick={go}
            disabled={code.trim().length < 4}
            className="hv-btn-primary w-full py-4 text-lg font-black"
          >
            Vstúpiť do hry →
          </button>
        </div>
      </div>
    </div>
  )
}
