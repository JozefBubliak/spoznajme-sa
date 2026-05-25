'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useRef, Suspense } from 'react'

// ── Interná: iba pre testovanie ──────────────────────────────────
const CORRECT = '090720'
const COOKIE_NAME = 'cs_dev'
const COOKIE_VALUE = 'allowed'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 dní

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
}

function UnlockForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') ?? ''

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  const handleChange = (idx: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[idx] = v
    setDigits(next)
    setError(false)

    // auto-advance
    if (v && idx < 5) {
      inputs.current[idx + 1]?.focus()
    }

    // auto-submit when all filled
    if (v && idx === 5) {
      const code = [...next.slice(0, 5), v].join('')
      if (code.length === 6) submit(code)
    }
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setDigits(pasted.split(''))
      submit(pasted)
    }
  }

  const submit = (code: string) => {
    if (code === CORRECT) {
      setCookie(COOKIE_NAME, COOKIE_VALUE, COOKIE_MAX_AGE)
      // Redirect späť na play alebo default
      const dest = nextPath || window.location.pathname.replace('/unlock', '/play')
      router.replace(dest)
    } else {
      setError(true)
      setShake(true)
      setDigits(['', '', '', '', '', ''])
      setTimeout(() => {
        setShake(false)
        inputs.current[0]?.focus()
      }, 600)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit(digits.join(''))
  }

  return (
    <div className="unlock-shell">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap"
      />

      <div className="unlock-card">
        <div className="unlock-logo">
          DeepTalks <span>/ CoupleSync</span>
        </div>

        <div className="lock-icon">🔐</div>
        <h1 className="unlock-title">Testovacie prostredie</h1>
        <p className="unlock-sub">Zadaj prístupový kód</p>

        <form onSubmit={handleSubmit}>
          <div className={`digits-row ${shake ? 'shake' : ''}`} onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={d}
                autoFocus={i === 0}
                className={`digit-input ${error ? 'error' : ''}`}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          {error && <p className="error-msg">Nesprávny kód. Skús znova.</p>}

          <button type="submit" className="unlock-btn" disabled={digits.some((d) => !d)}>
            Otvoriť →
          </button>
        </form>
      </div>

      <style jsx global>{`
        body { margin: 0; background: #0d0b0e; }
        .unlock-shell {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0d0b0e;
          font-family: 'DM Sans', sans-serif;
          padding: 24px;
        }
        .unlock-card {
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          text-align: center;
        }
        .unlock-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: #c9a96e;
          margin-bottom: 8px;
        }
        .unlock-logo span { color: #7a6d8a; font-size: .85rem; }
        .lock-icon { font-size: 2.8rem; }
        .unlock-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 300;
          color: #e8e0f0;
          margin: 0;
        }
        .unlock-sub { color: #7a6d8a; font-size: .9rem; margin: 0; }

        .digits-row {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 8px 0;
        }
        .digit-input {
          width: 48px;
          height: 58px;
          background: #16121a;
          border: 1.5px solid rgba(180,140,200,.2);
          border-radius: 10px;
          color: #e8e0f0;
          font-size: 1.4rem;
          font-family: 'Cormorant Garamond', serif;
          text-align: center;
          outline: none;
          transition: border-color .15s;
          caret-color: transparent;
        }
        .digit-input:focus { border-color: #9b7bca; }
        .digit-input.error { border-color: #c97a8a; color: #c97a8a; }

        .shake {
          animation: shake .5s ease;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        .error-msg {
          color: #c97a8a;
          font-size: .82rem;
          margin: 0;
        }

        .unlock-btn {
          margin-top: 4px;
          width: 100%;
          background: linear-gradient(135deg, #c9a96e, #b8893e);
          color: #1a1200;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          border-radius: 28px;
          padding: 13px 24px;
          cursor: pointer;
          transition: opacity .15s;
        }
        .unlock-btn:disabled { opacity: .35; cursor: not-allowed; }
        .unlock-btn:not(:disabled):hover { opacity: .9; }
      `}</style>
    </div>
  )
}

export default function UnlockPage() {
  return (
    <Suspense fallback={null}>
      <UnlockForm />
    </Suspense>
  )
}
