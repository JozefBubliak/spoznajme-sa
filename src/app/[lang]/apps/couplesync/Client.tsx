'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  LEVEL1_QUESTIONS,
  LEVEL2_QUESTIONS,
  YMNO_OPTIONS,
  type AnswerPayload,
  type L1Answer,
  type YmnoAnswer,
  encodePayload,
  decodePayload,
  computeL1Results,
  computeL2Results,
} from './data'

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
type View =
  | 'landing'
  | 'intro'
  | 'l1'
  | 'l1_done'
  | 'l2_consent'
  | 'l2'
  | 'share'
  | 'partner_intro'
  | 'results'

// ─────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────
export default function Client({ lang }: { dict?: any; lang: string }) {
  // ── View state ───────────────────────────────────────────────
  const [view, setView] = useState<View>('landing')

  // ── Identity ─────────────────────────────────────────────────
  const [myName, setMyName] = useState('')
  const [isPartner, setIsPartner] = useState(false) // true = Person B flow

  // ── My answers ───────────────────────────────────────────────
  const [l1Answers, setL1Answers] = useState<Record<string, L1Answer>>({})
  const [l2Answers, setL2Answers] = useState<Record<string, YmnoAnswer>>({})
  const [wantsLevel2, setWantsLevel2] = useState(false)

  // ── Partner A's encoded data (stored when Person B opens link) ──
  const [partnerEncoded, setPartnerEncoded] = useState<string | null>(null)
  const [partnerData, setPartnerData] = useState<AnswerPayload | null>(null)

  // ── Navigation within questionnaire ──────────────────────────
  const [l1Index, setL1Index] = useState(0)
  const [l2Index, setL2Index] = useState(0)

  // ── UI state ─────────────────────────────────────────────────
  const [copied, setCopied] = useState(false)
  const [animKey, setAnimKey] = useState(0) // forces re-animation on question change

  // ── Results state (decoded from URL) ─────────────────────────
  const [resultA, setResultA] = useState<AnswerPayload | null>(null)
  const [resultB, setResultB] = useState<AnswerPayload | null>(null)

  // ── Detect URL on mount ──────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash

    if (hash.startsWith('#partner?a=')) {
      const encoded = hash.replace('#partner?a=', '')
      const decoded = decodePayload(encoded)
      if (decoded) {
        setPartnerEncoded(encoded)
        setPartnerData(decoded)
        setIsPartner(true)
        setView('partner_intro')
      }
    } else if (hash.startsWith('#results?')) {
      const params = new URLSearchParams(hash.replace('#results?', ''))
      const aEnc = params.get('a')
      const bEnc = params.get('b')
      if (aEnc && bEnc) {
        const a = decodePayload(aEnc)
        const b = decodePayload(bEnc)
        if (a && b) {
          setResultA(a)
          setResultB(b)
          setView('results')
        }
      }
    }
  }, [])

  // ── Current questions ────────────────────────────────────────
  const currentL1Q = LEVEL1_QUESTIONS[l1Index]
  const currentL2Q = LEVEL2_QUESTIONS[l2Index]

  // ── Progress bar ─────────────────────────────────────────────
  const progressPct = useMemo(() => {
    if (view === 'l1') return Math.round((l1Index / LEVEL1_QUESTIONS.length) * 100)
    if (view === 'l2') return Math.round((l2Index / LEVEL2_QUESTIONS.length) * 100)
    return 0
  }, [view, l1Index, l2Index])

  const showProgress = view === 'l1' || view === 'l2'

  // ── Share URL ────────────────────────────────────────────────
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const payload: AnswerPayload = {
      name: myName,
      wantsLevel2,
      l1: l1Answers,
      l2: wantsLevel2 ? l2Answers : {},
    }
    const encoded = encodePayload(payload)
    return `${window.location.href.split('#')[0]}#partner?a=${encoded}`
  }, [myName, wantsLevel2, l1Answers, l2Answers])

  // ── Handlers ─────────────────────────────────────────────────
  const setL1Answer = (id: string, val: L1Answer) => {
    setL1Answers((prev) => ({ ...prev, [id]: val }))
  }

  const setL2Answer = (id: string, val: YmnoAnswer) => {
    setL2Answers((prev) => ({ ...prev, [id]: val }))
  }

  const nextL1 = () => {
    if (!l1Answers[currentL1Q.id]) return
    if (l1Index < LEVEL1_QUESTIONS.length - 1) {
      setAnimKey((k) => k + 1)
      setL1Index((i) => i + 1)
    } else {
      setView('l1_done')
    }
  }

  const prevL1 = () => {
    if (l1Index > 0) {
      setAnimKey((k) => k + 1)
      setL1Index((i) => i - 1)
    }
  }

  const nextL2 = () => {
    if (!l2Answers[currentL2Q.id]) return
    if (l2Index < LEVEL2_QUESTIONS.length - 1) {
      setAnimKey((k) => k + 1)
      setL2Index((i) => i + 1)
    } else {
      // Done with L2
      if (isPartner) {
        finishPartner(true)
      } else {
        setView('share')
      }
    }
  }

  const prevL2 = () => {
    if (l2Index > 0) {
      setAnimKey((k) => k + 1)
      setL2Index((i) => i - 1)
    }
  }

  const acceptL2 = () => {
    setWantsLevel2(true)
    setL2Index(0)
    setView('l2')
  }

  const skipL2 = () => {
    setWantsLevel2(false)
    if (isPartner) {
      finishPartner(false)
    } else {
      setView('share')
    }
  }

  const finishPartner = (didL2: boolean) => {
    if (!partnerEncoded) return
    const myPayload: AnswerPayload = {
      name: myName,
      wantsLevel2: didL2,
      l1: l1Answers,
      l2: didL2 ? l2Answers : {},
    }
    const myEncoded = encodePayload(myPayload)
    // Navigate to results URL
    window.location.hash = `results?a=${partnerEncoded}&b=${myEncoded}`
    // Decode both and show results
    const a = decodePayload(partnerEncoded)
    if (a) {
      setResultA(a)
      setResultB(myPayload)
      setView('results')
    }
  }

  const startPartnerL1 = () => {
    setL1Index(0)
    setAnimKey((k) => k + 1)
    setView('l1')
  }

  const copyUrl = async (url: string, setCopiedFn: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedFn(true)
      setTimeout(() => setCopiedFn(false), 2500)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopiedFn(true)
      setTimeout(() => setCopiedFn(false), 2500)
    }
  }

  // ── Results data ─────────────────────────────────────────────
  const l1Results = useMemo(() => {
    if (!resultA || !resultB) return []
    return computeL1Results(resultA.l1, resultB.l1)
  }, [resultA, resultB])

  const l2Results = useMemo(() => {
    if (!resultA || !resultB) return []
    if (!resultA.wantsLevel2 || !resultB.wantsLevel2) return []
    return computeL2Results(resultA.l2, resultB.l2)
  }, [resultA, resultB])

  const l2Green = l2Results.filter((r) => r.level === 'green')
  const l2Yellow = l2Results.filter((r) => r.level === 'yellow')

  const aName = resultA?.name || (isPartner ? 'Partner/ka' : 'Ty')
  const bName = resultB?.name || (isPartner ? 'Ty' : 'Partner/ka')

  const [copiedResults, setCopiedResults] = useState(false)
  const resultsUrl = typeof window !== 'undefined' ? window.location.href : ''

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="cs-shell">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
      />

      {/* ── Header ── */}
      <header className="site-header">
        <div className="site-logo">
          DeepTalks <span>/ CoupleSync</span>
        </div>
        <div className="header-badge">Bezpečný priestor</div>
      </header>

      {/* ── Progress bar ── */}
      {showProgress && (
        <div className="q-progress">
          <div className="q-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      <div className="page-wrap">

        {/* ══════════════════════════════════════════════
            LANDING
        ══════════════════════════════════════════════ */}
        {view === 'landing' && (
          <div className="screen active">
            <section className="hero">
              <div className="hero-eyebrow">CoupleSync – Dotazník preferencií</div>
              <h1 className="hero-title">
                Objavte spoločnú <em>intimitu</em>
                <br />
                bez zahanbenia
              </h1>
              <p className="hero-sub">
                Bezpečný, diskrétny dotazník pre páry. Každý odpovedá sám.
                Zobrazia sa len zhody — nikto neuvidí, čomu druhý povedal Nie.
              </p>
              <div className="privacy-badges">
                <span className="privacy-badge">
                  <span className="dot" /> Double-blind systém
                </span>
                <span className="privacy-badge">
                  <span className="dot" /> Len zhody sú viditeľné
                </span>
                <span className="privacy-badge">
                  <span className="dot" /> Žiadny server, len URL
                </span>
              </div>
            </section>

            <div className="step-bar">
              <div className="step-item active"><div className="step-num">1</div>Základy</div>
              <div className="step-connector" />
              <div className="step-item"><div className="step-num">2</div>Hlbšie (opt-in)</div>
              <div className="step-connector" />
              <div className="step-item"><div className="step-num">3</div>Partner/ka</div>
              <div className="step-connector" />
              <div className="step-item"><div className="step-num">4</div>Výsledky</div>
            </div>

            <div className="landing-cta">
              <button type="button" className="btn-gold btn-lg" onClick={() => setView('intro')}>
                Začať dotazník →
              </button>
              <p className="landing-note">Vypln sám/sama, potom zdieľaj odkaz s partnerom/kou</p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            INTRO
        ══════════════════════════════════════════════ */}
        {view === 'intro' && (
          <div className="screen active narrow">
            <h2 className="screen-title">Ako to funguje?</h2>

            <div className="how-steps">
              <div className="how-step">
                <div className="how-num">1</div>
                <div>
                  <strong>Ty vypln dotazník</strong>
                  <p>Sám/sama, úprimne, bez náhlenia</p>
                </div>
              </div>
              <div className="how-step">
                <div className="how-num">2</div>
                <div>
                  <strong>Zdieľaš odkaz s partnerom/kou</strong>
                  <p>On/ona vyplní dotazník samostatne</p>
                </div>
              </div>
              <div className="how-step">
                <div className="how-num">3</div>
                <div>
                  <strong>Zobrazí sa vám spoločná mapa</strong>
                  <p>Zhody, priestor na rozhovor, porozumenie</p>
                </div>
              </div>
            </div>

            <div className="info-block">
              <strong>🔒 Súkromie</strong>
              <p>
                Odpovede sa neukladajú na žiadnom serveri. Partner/ka <em>nikdy</em> neuvidí,
                čomu si povedal/a <strong>Nie</strong>. Žiadne odsúdenie, žiadne prekvapenia.
              </p>
            </div>

            <div className="field-group">
              <label className="field-label">Ako ťa máme volať? <span className="optional">(nepovinné)</span></label>
              <input
                type="text"
                className="text-input"
                placeholder="Meno alebo prezývka"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                maxLength={30}
              />
            </div>

            <button
              type="button"
              className="btn-gold btn-lg w-full"
              onClick={() => { setL1Index(0); setView('l1') }}
            >
              Začať základnú úroveň →
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            LEVEL 1 – Questions
        ══════════════════════════════════════════════ */}
        {view === 'l1' && currentL1Q && (
          <div className="screen active narrow">
            <div className="q-meta">
              <span className="q-counter">Otázka {l1Index + 1} / {LEVEL1_QUESTIONS.length}</span>
              <span className="q-category">{currentL1Q.category}</span>
            </div>

            <div className="q-card" key={`l1-${animKey}`}>
              <div className="q-emoji">{currentL1Q.emoji}</div>
              <h3 className="q-text">{currentL1Q.question}</h3>

              {/* Scale */}
              {currentL1Q.type === 'scale' && (
                <div className="scale-wrap">
                  <div className="scale-dots">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`scale-dot ${l1Answers[currentL1Q.id] === n ? 'active' : ''}`}
                        onClick={() => setL1Answer(currentL1Q.id, n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="scale-labels">
                    <span>{currentL1Q.scaleMin}</span>
                    <span>{currentL1Q.scaleMax}</span>
                  </div>
                </div>
              )}

              {/* Choice */}
              {currentL1Q.type === 'choice' && (
                <div className="choice-opts">
                  {currentL1Q.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`choice-opt ${l1Answers[currentL1Q.id] === opt.value ? 'selected' : ''}`}
                      onClick={() => setL1Answer(currentL1Q.id, opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-row">
              {l1Index > 0 && (
                <button type="button" className="btn-ghost" onClick={prevL1}>← Späť</button>
              )}
              <button
                type="button"
                className={`btn-primary flex-1 ${!l1Answers[currentL1Q.id] ? 'disabled' : ''}`}
                disabled={!l1Answers[currentL1Q.id]}
                onClick={nextL1}
              >
                {l1Index === LEVEL1_QUESTIONS.length - 1 ? 'Hotovo ✓' : 'Ďalej →'}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            LEVEL 1 DONE
        ══════════════════════════════════════════════ */}
        {view === 'l1_done' && (
          <div className="screen active narrow center-content">
            <div className="big-emoji">🎉</div>
            <h2 className="screen-title">Prvá úroveň hotová!</h2>
            <p className="screen-sub">
              Chceš ísť hlbšie? Druhá úroveň obsahuje konkrétnejšie témy —
              aktivity, dynamiku a fantázie.
            </p>

            <div className="info-block amber">
              <p>
                💡 Druhá úroveň sa v porovnaní zobrazí <strong>len vtedy, ak sa obaja rozhodnete pre ňu</strong>.
                Ak partner/ka odmietne, výsledky druhej úrovne zostanú skryté.
              </p>
            </div>

            <div className="btn-stack">
              <button type="button" className="btn-gold btn-lg" onClick={() => setView('l2_consent')}>
                Áno, chcem hlbšiu úroveň 🔥
              </button>
              <button type="button" className="btn-outline" onClick={skipL2}>
                Nie, spokojný/á som s prvou úrovňou
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            LEVEL 2 CONSENT
        ══════════════════════════════════════════════ */}
        {view === 'l2_consent' && (
          <div className="screen active narrow center-content">
            <div className="big-emoji">🔓</div>
            <h2 className="screen-title">Hlbšia úroveň</h2>
            <p className="screen-sub">
              Táto časť obsahuje konkrétne otázky o aktivitách, dynamike vzťahu a fantáziách.
              Odpovedáš stále sám/sama — platia rovnaké pravidlá: čo poviete obaja Nie, to sa nezobrazí.
            </p>
            <div className="info-block">
              <strong>4 kategórie, 28 tém:</strong>
              <p>Fyzická blízkosť · Komunikácia · Dynamika a roly · Fantázie a scenáre</p>
            </div>
            <div className="btn-stack">
              <button type="button" className="btn-gold btn-lg" onClick={acceptL2}>
                Začať hlbšiu úroveň →
              </button>
              <button type="button" className="btn-outline" onClick={skipL2}>
                Preskočiť
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            LEVEL 2 – Questions
        ══════════════════════════════════════════════ */}
        {view === 'l2' && currentL2Q && (
          <div className="screen active narrow">
            <div className="q-meta">
              <span className="q-counter">Hlbšia úroveň: {l2Index + 1} / {LEVEL2_QUESTIONS.length}</span>
              <span className="q-category l2-cat">{currentL2Q.category}</span>
            </div>

            <div className="q-card" key={`l2-${animKey}`}>
              <div className="q-emoji">{currentL2Q.emoji}</div>
              <h3 className="q-text">{currentL2Q.question}</h3>

              <div className="ymno-grid">
                {YMNO_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`ymno-btn ${l2Answers[currentL2Q.id] === opt.value ? 'selected' : ''}`}
                    onClick={() => setL2Answer(currentL2Q.id, opt.value)}
                  >
                    <span className="ymno-emoji">{opt.emoji}</span>
                    <span className="ymno-label">{opt.label}</span>
                    <span className="ymno-sub">{opt.sublabel}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="nav-row">
              {l2Index > 0 && (
                <button type="button" className="btn-ghost" onClick={prevL2}>← Späť</button>
              )}
              <button
                type="button"
                className={`btn-primary flex-1 ${!l2Answers[currentL2Q.id] ? 'disabled' : ''}`}
                disabled={!l2Answers[currentL2Q.id]}
                onClick={nextL2}
              >
                {l2Index === LEVEL2_QUESTIONS.length - 1 ? 'Dokončiť ✓' : 'Ďalej →'}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            SHARE
        ══════════════════════════════════════════════ */}
        {view === 'share' && (
          <div className="screen active narrow center-content">
            <div className="big-emoji">📤</div>
            <h2 className="screen-title">Teraz je rad na partnerovi/ke</h2>
            <p className="screen-sub">
              Skopíruj odkaz a pošli ho. On/ona ho otvorí, vyplní dotazník
              a hneď sa vám zobrazia výsledky.
            </p>

            <div className="url-box">
              <p className="url-label">Tvoj odkaz pre partnera/ku:</p>
              <div className="url-text">{shareUrl}</div>
            </div>

            <button
              type="button"
              className="btn-gold btn-lg w-full"
              onClick={() => copyUrl(shareUrl, setCopied)}
            >
              {copied ? '✓ Zkopírované!' : '📋 Zkopírovať odkaz'}
            </button>

            <p className="screen-note">
              Po tom, čo partner/ka vyplní dotazník, automaticky sa zobrazí stránka s výsledkami.
              Odkaz na výsledky si môžete potom vzájomne zdieľať.
            </p>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            PARTNER INTRO (Person B opens link)
        ══════════════════════════════════════════════ */}
        {view === 'partner_intro' && (
          <div className="screen active narrow center-content">
            <div className="big-emoji">💌</div>
            <h2 className="screen-title">
              {partnerData?.name
                ? `${partnerData.name} ťa pozval/a vyplniť dotazník`
                : 'Tvoj/Tvoja partner/ka vyplnil/a dotazník'}
            </h2>
            <p className="screen-sub">
              Teraz je rad na tebe. Vyplň dotazník a hneď sa vám zobrazia výsledky — čo máte spoločné
              a kde je priestor na rozhovor.
            </p>

            <div className="info-block">
              <strong>Pamätaj:</strong>
              <ul className="reminder-list">
                <li>Odpovedaj úprimne a pre seba</li>
                <li>Partner/ka <em>nikdy</em> neuvidí, čomu si povedal/a Nie</li>
                <li>Nie sú správne ani nesprávne odpovede</li>
              </ul>
            </div>

            {partnerData?.wantsLevel2 && (
              <div className="info-block amber">
                <p>
                  🔥 Tvoj/Tvoja partner/ka chcel/a ísť aj do hlbšej úrovne.
                  Po základných otázkach sa ťa spýtame, či chceš tiež.
                </p>
              </div>
            )}

            <div className="field-group">
              <label className="field-label">Ako ťa máme volať? <span className="optional">(nepovinné)</span></label>
              <input
                type="text"
                className="text-input"
                placeholder="Meno alebo prezývka"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                maxLength={30}
              />
            </div>

            <button type="button" className="btn-gold btn-lg w-full" onClick={startPartnerL1}>
              Začať →
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            RESULTS
        ══════════════════════════════════════════════ */}
        {view === 'results' && resultA && resultB && (
          <div className="screen active results-screen">
            <div className="results-header">
              <div className="big-emoji">✨</div>
              <h2 className="screen-title">Vaše výsledky</h2>
              <p className="screen-sub">
                <strong>{aName}</strong> a <strong>{bName}</strong>
              </p>
            </div>

            {/* ── Level 1 results ── */}
            <div className="results-section">
              <h3 className="section-heading">Základná úroveň</h3>
              <div className="result-cards">
                {l1Results.map((item) => (
                  <div key={item.id} className={`result-card match-${item.matchLevel}`}>
                    <div className="result-card-head">
                      <span className="result-category">{item.category}</span>
                      <span className={`match-badge ${item.matchLevel}`}>
                        {item.matchLevel === 'perfect'
                          ? '🟢 Zhoda'
                          : item.matchLevel === 'close'
                          ? '🟡 Blízko'
                          : '🔴 Rozdiel'}
                      </span>
                    </div>
                    <p className="result-question">{item.question}</p>

                    {item.type === 'scale' && (
                      <div className="scale-compare">
                        <div className="scale-person">
                          <span className="scale-val a-color">{item.aValue}</span>
                          <span className="scale-name">{aName}</span>
                        </div>
                        <div className="scale-bar-wrap">
                          <div className="scale-bar">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <div
                                key={n}
                                className={`scale-bar-dot ${
                                  n === item.aValue ? 'a-dot' : n === item.bValue ? 'b-dot' : ''
                                } ${n === item.aValue && n === item.bValue ? 'both-dot' : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="scale-person">
                          <span className="scale-val b-color">{item.bValue}</span>
                          <span className="scale-name">{bName}</span>
                        </div>
                      </div>
                    )}

                    {item.type === 'choice' && (
                      <div className="choice-compare">
                        {item.aValue === item.bValue ? (
                          <p className="choice-match">✓ Obaja: „{item.aLabel}"</p>
                        ) : (
                          <>
                            <p className="choice-row">
                              <span className="a-color">{aName}:</span> „{item.aLabel}"
                            </p>
                            <p className="choice-row">
                              <span className="b-color">{bName}:</span> „{item.bLabel}"
                            </p>
                          </>
                        )}
                      </div>
                    )}

                    {item.conversationTip && (
                      <div className="conv-tip">💬 {item.conversationTip}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Level 2 results ── */}
            {(l2Green.length > 0 || l2Yellow.length > 0) && (
              <div className="results-section">
                <h3 className="section-heading">Hlbšia úroveň</h3>

                {l2Green.length > 0 && (
                  <div className="l2-group">
                    <h4 className="l2-group-title green">🟢 Zhody — obaja chcete alebo ste zvedaví</h4>
                    <div className="l2-cards">
                      {l2Green.map((item) => (
                        <div key={item.id} className="l2-card green">
                          <span className="l2-emoji">{item.emoji}</span>
                          <div>
                            <p className="l2-question">{item.question}</p>
                            <p className="l2-match-text">{item.matchText}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {l2Yellow.length > 0 && (
                  <div className="l2-group">
                    <h4 className="l2-group-title yellow">🟡 Na rozhovor — obaja ste otvorení</h4>
                    <div className="l2-cards">
                      {l2Yellow.map((item) => (
                        <div key={item.id} className="l2-card yellow">
                          <span className="l2-emoji">{item.emoji}</span>
                          <div>
                            <p className="l2-question">{item.question}</p>
                            <p className="l2-match-text">{item.matchText}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* No L2 if partner skipped */}
            {resultA.wantsLevel2 !== resultB.wantsLevel2 && (
              <div className="info-block amber">
                <p>
                  Jeden z vás nechcel/a hlbšiu úroveň — výsledky druhej úrovne sa preto nezobrazujú.
                  Ak si to rozmyslíte, vyplňte dotazník znova.
                </p>
              </div>
            )}

            {/* Share results */}
            <div className="share-results-box">
              <p className="url-label">Zdieľaj výsledky s partnerom/kou</p>
              <button
                type="button"
                className="btn-outline w-full"
                onClick={() => copyUrl(resultsUrl, setCopiedResults)}
              >
                {copiedResults ? '✓ Zkopírované!' : '📋 Zkopírovať odkaz na výsledky'}
              </button>
            </div>
          </div>
        )}

      </div>{/* /page-wrap */}

      {/* ─────────────────────────────────────────────────────────
          STYLES
      ───────────────────────────────────────────────────────── */}
      <style jsx global>{`
        /* ── Variables ── */
        .cs-shell {
          --bg: #0d0b0e;
          --surface: #16121a;
          --surface2: #1e1825;
          --border: rgba(180,140,200,.12);
          --border2: rgba(180,140,200,.22);
          --gold: #c9a96e;
          --gold-light: rgba(201,169,110,.15);
          --rose: #c97a8a;
          --violet: #9b7bca;
          --yes: #5a9e7a;
          --amber: #c9a040;
          --text: #e8e0f0;
          --text2: #b8aac8;
          --text3: #7a6d8a;
          --radius: 14px;
          --radius-sm: 8px;
        }
        .cs-shell, .cs-shell * { box-sizing: border-box; }
        .cs-shell {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }

        /* ── Header ── */
        .site-header {
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          background: rgba(13,11,14,.9);
          backdrop-filter: blur(12px);
          z-index: 30;
        }
        .site-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: var(--gold);
        }
        .site-logo span { color: var(--text3); font-size: .85rem; }
        .header-badge {
          font-size: .7rem;
          color: var(--text3);
          border: 1px solid var(--border);
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* ── Progress ── */
        .q-progress {
          position: fixed;
          top: 61px;
          left: 0; right: 0;
          height: 2px;
          background: var(--border);
          z-index: 40;
        }
        .q-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--violet), var(--rose));
          transition: width .4s ease;
        }

        /* ── Page wrap ── */
        .page-wrap { padding-bottom: 60px; }
        .screen { max-width: 980px; margin: 0 auto; padding: 0 24px; }
        .screen.narrow { max-width: 560px; }
        .screen.center-content { display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 20px; gap: 20px; }
        .screen.active { display: flex; flex-direction: column; gap: 20px; padding-top: 24px; }

        /* ── Hero ── */
        .hero {
          text-align: center;
          padding: 72px 20px 32px;
        }
        .hero-eyebrow {
          font-size: .7rem;
          letter-spacing: .2em;
          color: var(--violet);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 300;
          line-height: 1.15;
          margin: 0 0 16px;
        }
        .hero-title em { color: var(--gold); font-style: italic; }
        .hero-sub {
          color: var(--text2);
          max-width: 560px;
          margin: 0 auto 20px;
          line-height: 1.65;
        }
        .privacy-badges {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .privacy-badge {
          font-size: .75rem;
          color: var(--text3);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dot {
          width: 6px; height: 6px;
          background: var(--yes);
          border-radius: 50%;
        }

        /* ── Step bar ── */
        .step-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          padding: 0 20px 8px;
        }
        .step-item {
          display: flex;
          align-items: center;
          color: var(--text3);
          font-size: .8rem;
          gap: 8px;
        }
        .step-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .step-item.active .step-num {
          background: var(--violet);
          color: #fff;
          border-color: var(--violet);
        }
        .step-connector {
          height: 1px;
          width: 32px;
          background: var(--border);
          margin: 0 4px;
        }

        /* ── Landing CTA ── */
        .landing-cta {
          text-align: center;
          padding: 8px 0 16px;
        }
        .landing-note {
          margin-top: 10px;
          font-size: .8rem;
          color: var(--text3);
        }

        /* ── Buttons ── */
        .btn-gold {
          background: linear-gradient(135deg, var(--gold), #b8893e);
          color: #1a1200;
          font-weight: 600;
          border: none;
          border-radius: 28px;
          padding: 12px 28px;
          cursor: pointer;
          transition: opacity .15s, transform .1s;
        }
        .btn-gold:hover { opacity: .9; }
        .btn-gold:active { transform: scale(.98); }
        .btn-gold.btn-lg { padding: 14px 32px; font-size: 1rem; }
        .btn-gold.w-full { width: 100%; }

        .btn-primary {
          background: linear-gradient(135deg, var(--violet), #7b5cb8);
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 28px;
          padding: 13px 24px;
          cursor: pointer;
          transition: opacity .15s, transform .1s;
        }
        .btn-primary:hover { opacity: .9; }
        .btn-primary:active { transform: scale(.98); }
        .btn-primary.disabled { opacity: .35; cursor: not-allowed; }
        .btn-primary.flex-1 { flex: 1; }

        .btn-outline {
          background: transparent;
          color: var(--text2);
          border: 1px solid var(--border2);
          border-radius: 28px;
          padding: 12px 24px;
          cursor: pointer;
          transition: border-color .15s, color .15s;
        }
        .btn-outline:hover { border-color: var(--violet); color: var(--text); }
        .btn-outline.w-full { width: 100%; }

        .btn-ghost {
          background: transparent;
          color: var(--text3);
          border: none;
          padding: 12px 16px;
          cursor: pointer;
          border-radius: var(--radius-sm);
        }
        .btn-ghost:hover { color: var(--text); }

        .btn-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        /* ── Screens shared ── */
        .big-emoji { font-size: 3.5rem; }
        .screen-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 400;
          margin: 0;
          color: var(--text);
        }
        .screen-sub {
          color: var(--text2);
          line-height: 1.65;
          max-width: 480px;
          margin: 0;
        }
        .screen-note {
          font-size: .78rem;
          color: var(--text3);
          text-align: center;
          max-width: 400px;
        }

        /* ── Info blocks ── */
        .info-block {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 20px;
          font-size: .9rem;
          color: var(--text2);
          line-height: 1.6;
          width: 100%;
        }
        .info-block strong { color: var(--text); display: block; margin-bottom: 6px; }
        .info-block.amber {
          background: rgba(201,160,64,.07);
          border-color: rgba(201,160,64,.25);
          color: rgba(220,185,120,.9);
        }
        .info-block.amber strong { color: var(--amber); }

        .reminder-list {
          padding-left: 18px;
          margin: 6px 0 0;
          list-style: disc;
          color: var(--text2);
        }
        .reminder-list li { margin-bottom: 4px; }

        /* ── How steps ── */
        .how-steps { display: flex; flex-direction: column; gap: 14px; width: 100%; }
        .how-step {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
        }
        .how-num {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--gold-light);
          border: 1px solid rgba(201,169,110,.4);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          color: var(--gold);
          flex-shrink: 0;
        }
        .how-step strong { color: var(--text); font-size: .95rem; }
        .how-step p { color: var(--text3); font-size: .82rem; margin: 3px 0 0; }

        /* ── Form fields ── */
        .field-group { width: 100%; text-align: left; }
        .field-label { font-size: .82rem; color: var(--text3); display: block; margin-bottom: 8px; }
        .optional { font-style: italic; }
        .text-input {
          width: 100%;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 11px 14px;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem;
        }
        .text-input:focus {
          outline: none;
          border-color: rgba(155,123,202,.4);
        }
        .text-input::placeholder { color: var(--text3); }

        /* ── Question UI ── */
        .q-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .q-counter { font-size: .75rem; color: var(--text3); }
        .q-category {
          font-size: .72rem;
          padding: 3px 10px;
          background: var(--gold-light);
          border-radius: 20px;
          color: var(--gold);
        }
        .q-category.l2-cat {
          background: rgba(155,123,202,.12);
          color: var(--violet);
        }

        .q-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px 24px;
          animation: fadeSlideUp .25s ease;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .q-emoji { font-size: 2.2rem; margin-bottom: 14px; }
        .q-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 400;
          line-height: 1.4;
          color: var(--text);
          margin: 0 0 24px;
        }

        /* ── Scale ── */
        .scale-wrap { display: flex; flex-direction: column; gap: 10px; }
        .scale-dots { display: flex; justify-content: space-between; }
        .scale-dot {
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 2px solid var(--border2);
          background: transparent;
          color: var(--text3);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all .15s;
        }
        .scale-dot:hover { border-color: var(--violet); color: var(--text); }
        .scale-dot.active {
          background: var(--violet);
          border-color: var(--violet);
          color: #fff;
          transform: scale(1.12);
        }
        .scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: .72rem;
          color: var(--text3);
        }

        /* ── Choice ── */
        .choice-opts { display: flex; flex-direction: column; gap: 10px; }
        .choice-opt {
          text-align: left;
          background: transparent;
          border: 1px solid var(--border2);
          border-radius: var(--radius-sm);
          padding: 13px 16px;
          color: var(--text2);
          font-size: .9rem;
          cursor: pointer;
          transition: all .15s;
        }
        .choice-opt:hover { border-color: var(--violet); color: var(--text); }
        .choice-opt.selected {
          border-color: var(--violet);
          background: rgba(155,123,202,.1);
          color: var(--text);
        }

        /* ── YMNO ── */
        .ymno-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .ymno-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 16px 12px;
          border: 1px solid var(--border2);
          border-radius: var(--radius);
          background: transparent;
          cursor: pointer;
          transition: all .15s;
        }
        .ymno-btn:hover { border-color: var(--violet); }
        .ymno-btn.selected {
          border-color: var(--rose);
          background: rgba(201,122,138,.1);
        }
        .ymno-emoji { font-size: 1.6rem; }
        .ymno-label { font-size: .85rem; font-weight: 600; color: var(--text); }
        .ymno-sub { font-size: .72rem; color: var(--text3); text-align: center; }

        /* ── Navigation ── */
        .nav-row { display: flex; gap: 10px; }

        /* ── Share URL ── */
        .url-box {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
        }
        .url-label { font-size: .78rem; color: var(--text3); margin-bottom: 8px; }
        .url-text {
          font-family: monospace;
          font-size: .75rem;
          color: var(--text2);
          word-break: break-all;
          background: var(--surface2);
          padding: 10px;
          border-radius: var(--radius-sm);
        }

        /* ── Results ── */
        .results-screen { max-width: 720px; margin: 0 auto; }
        .results-header { text-align: center; padding: 24px 0 8px; }
        .results-section { display: flex; flex-direction: column; gap: 16px; }
        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--text3);
          text-transform: uppercase;
          letter-spacing: .1em;
          margin: 0;
        }

        .result-cards { display: flex; flex-direction: column; gap: 12px; }
        .result-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 20px;
        }
        .result-card.match-perfect { border-color: rgba(90,158,122,.25); }
        .result-card.match-different { border-color: rgba(201,122,138,.2); }

        .result-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .result-category {
          font-size: .72rem;
          color: var(--text3);
          text-transform: uppercase;
          letter-spacing: .1em;
        }
        .match-badge {
          font-size: .75rem;
          padding: 3px 10px;
          border-radius: 20px;
          font-weight: 500;
        }
        .match-badge.perfect { background: rgba(90,158,122,.12); color: #5a9e7a; }
        .match-badge.close { background: rgba(201,169,110,.12); color: var(--gold); }
        .match-badge.different { background: rgba(201,122,138,.12); color: var(--rose); }

        .result-question {
          font-size: .88rem;
          color: var(--text2);
          margin: 0 0 14px;
          line-height: 1.5;
        }

        .scale-compare {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .scale-person { text-align: center; min-width: 48px; }
        .scale-val {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
        }
        .scale-name { font-size: .7rem; color: var(--text3); }
        .a-color { color: var(--rose); }
        .b-color { color: var(--violet); }

        .scale-bar-wrap { flex: 1; }
        .scale-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .scale-bar-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--border2);
        }
        .a-dot { background: var(--rose); transform: scale(1.4); }
        .b-dot { background: var(--violet); transform: scale(1.4); }
        .both-dot {
          background: var(--gold) !important;
          transform: scale(1.6) !important;
        }

        .choice-compare { font-size: .88rem; }
        .choice-match { color: var(--yes); font-weight: 500; margin: 0; }
        .choice-row { color: var(--text2); margin: 4px 0; }

        .conv-tip {
          margin-top: 12px;
          background: rgba(201,160,64,.08);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: .8rem;
          color: rgba(220,185,120,.85);
        }

        /* ── L2 results ── */
        .l2-group { display: flex; flex-direction: column; gap: 10px; }
        .l2-group-title {
          font-size: .85rem;
          font-weight: 600;
          margin: 0;
        }
        .l2-group-title.green { color: #5a9e7a; }
        .l2-group-title.yellow { color: var(--gold); }

        .l2-cards { display: flex; flex-direction: column; gap: 8px; }
        .l2-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px 16px;
        }
        .l2-card.green { border-color: rgba(90,158,122,.25); }
        .l2-card.yellow { border-color: rgba(201,169,110,.2); }
        .l2-emoji { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
        .l2-question {
          font-size: .88rem;
          color: var(--text);
          margin: 0 0 4px;
          line-height: 1.45;
        }
        .l2-match-text {
          font-size: .78rem;
          color: var(--text3);
          margin: 0;
        }

        .share-results-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 20px;
          margin-top: 8px;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .site-header { padding: 16px 20px; }
          .step-bar { display: none; }
          .hero { padding: 56px 16px 24px; }
          .screen { padding: 0 16px; }
          .ymno-grid { grid-template-columns: 1fr 1fr; }
          .scale-dot { width: 40px; height: 40px; }
          .q-text { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  )
}
