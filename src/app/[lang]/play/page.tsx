// PATH: src/app/[lang]/play/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import QRScanner from '@/components/QRScanner'

export default function PlayJoinPage() {
  const router = useRouter()
  const params = useParams<{ lang: string }>()
  const lang = params?.lang || 'sk'
  const [code, setCode] = useState('')
  const [showScanner, setShowScanner] = useState(true)

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      setShowScanner(false)
    }
  }, [])

  const onScan = (text: string) => {
    try {
      const url = new URL(text)
      const parts = url.pathname.split('/')
      const c = parts.pop() || ''
      if (c) {
        router.push(`/${lang}/play/${c}`)
        return
      }
    } catch {}
    const clean = text.trim().toUpperCase()
    if (clean) router.push(`/${lang}/play/${clean}`)
  }

  return (
    <div className="mx-auto max-w-md p-6 space-y-4">
      {showScanner && (
        <div className="aspect-square w-full max-w-xs mx-auto border rounded overflow-hidden">
          <QRScanner onResult={onScan} />
        </div>
      )}
      {!showScanner && <div className="text-sm text-center text-muted-foreground">Nemáš kameru? Zadaj kód ručne.</div>}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Kód hry"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={!code.trim()}
          onClick={() => router.push(`/${lang}/play/${code.trim()}`)}
        >
          Pripojiť
        </button>
      </div>
    </div>
  )
}
