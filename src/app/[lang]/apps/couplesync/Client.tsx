'use client'

import { useMemo, useState } from 'react'

type Props = { dict: any; lang: string }
type Screen = 'landing' | 'topics' | 'detail'
type TopicState = 'yes' | 'maybe' | 'no' | null

type Topic = {
  id: string
  icon: string
  title: string
  desc: string
}

const TOPICS: Topic[] = [
  {
    id: 'facesitting',
    icon: '👑',
    title: 'Face Sitting',
    desc: 'Intímna poloha s orálnou stimuláciou a dynamikou moci',
  },
  {
    id: 'bondage',
    icon: '🔗',
    title: 'Bondage',
    desc: 'Bezpečné viazanie a kontrola v intímnom prostredí',
  },
  {
    id: 'roleplay',
    icon: '🎭',
    title: 'Role-Play',
    desc: 'Hranie rôznych postáv a scenárov v intímnom kontexte',
  },
  {
    id: 'ds',
    icon: '⚖️',
    title: 'Dominancia a Submisia',
    desc: 'Dynamika moci a podriadenosti v intímnom živote',
  },
  {
    id: 'sensory',
    icon: '🕯️',
    title: 'Zmyslová Hra',
    desc: 'Stimulácia zmyslov a senzorické zážitky',
  },
  {
    id: 'oral',
    icon: '💋',
    title: 'Orálny Sex',
    desc: 'Rôzne formy orálnej stimulácie a preferencie',
  },
  {
    id: 'anal',
    icon: '🌸',
    title: 'Análna Hra',
    desc: 'Bezpečné a príjemné experimentovanie s análnou zónou',
  },
  {
    id: 'dirtytalk',
    icon: '💬',
    title: 'Dirty Talk',
    desc: 'Erotická komunikácia a slovné hry',
  },
]

export default function Client({ lang }: Props) {
  const [screen, setScreen] = useState<Screen>('landing')
  const [currentGender, setCurrentGender] = useState<'zena' | 'muz' | null>(null)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [topicStates, setTopicStates] = useState<Record<string, TopicState>>({})
  const [role, setRole] = useState<'dole' | 'hore'>('dole')
  const [selectedRung, setSelectedRung] = useState<number | null>(null)
  const [showImprovableDole, setShowImprovableDole] = useState(false)
  const [showImprovableHore, setShowImprovableHore] = useState(false)
  const [shareReason, setShareReason] = useState(false)
  const [saved, setSaved] = useState(false)

  const progressWidth = useMemo(() => {
    if (screen === 'landing') return '5%'
    if (screen === 'topics') return '33%'
    return '66%'
  }, [screen])

  const selectedTopic = TOPICS.find((t) => t.id === selectedTopicId) || null
  const selectedTopicState = selectedTopicId ? topicStates[selectedTopicId] : null

  const selectGender = (gender: 'zena' | 'muz') => {
    setCurrentGender(gender)
    setScreen('topics')
  }

  const openTopic = (id: string) => {
    setSelectedTopicId(id)
    setSaved(false)
    setScreen('detail')
  }

  const setTopicState = (id: string, state: TopicState) => {
    setTopicStates((prev) => ({ ...prev, [id]: state }))
  }

  const saveTopic = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setScreen('topics')
    }, 1500)
  }

  const intimacyCopy =
    currentGender === 'zena'
      ? 'Predstavte si intimitu, kde sa nemusíte na nič hrať. Kde sa jeden z vás odovzdá do rúk toho druhého s absolútnou dôverou. Face sitting nie je len „poloha z filmu“. Je to rituál uctievania.'
      : 'Predstav si intimitu, kde sa nemusíš na nič hrať. Kde sa jeden z vás vedome odovzdá tomu druhému s absolútnou dôverou. Face sitting nie je len „poloha z filmu“. Je to rituál uctievania.'

  return (
    <div className="cs-shell">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
      />
      <div className="page-wrap">
        <header className="site-header">
          <div className="site-logo">
            DeepTalks <span>/ CoupleSync</span>
          </div>
          <div className="header-badge">Bezpečný priestor</div>
        </header>

        <div className="q-progress">
          <div className="q-progress-fill" style={{ width: progressWidth }} />
        </div>

        {screen === 'landing' && (
          <div className="screen active">
            <section className="hero">
              <div className="hero-eyebrow">CoupleSync – Vzťahový Dotazník</div>
              <h1 className="hero-title">
                Objavte spoločnú <em>intimitu</em>
                <br />
                bez zahanbenia
              </h1>
              <p className="hero-sub">
                Bezpečný, diskrétny dotazník pre páry. Zdieľajú sa len zhody.
              </p>
              <div className="privacy-badges">
                <span className="privacy-badge">
                  <span className="dot" /> Double Blind systém
                </span>
                <span className="privacy-badge">
                  <span className="dot" /> Zobrazí sa len zhoda
                </span>
                <span className="privacy-badge">
                  <span className="dot" /> 100 % anonymné
                </span>
              </div>
            </section>

            <div className="step-bar">
              <div className="step-item active">
                <div className="step-num">1</div>Pohlavie
              </div>
              <div className="step-connector" />
              <div className="step-item">
                <div className="step-num">2</div>Témy
              </div>
              <div className="step-connector" />
              <div className="step-item">
                <div className="step-num">3</div>Dotazník
              </div>
              <div className="step-connector" />
              <div className="step-item">
                <div className="step-num">4</div>Výsledky
              </div>
            </div>

            <div className="gender-select">
              <p className="section-label">Aké je vaše pohlavie?</p>
              <p className="section-note">
                Podľa vašej voľby prispôsobíme jazyk a zrkadlové otázky.
              </p>
              <div className="gender-cards">
                <div className="gender-card female" onClick={() => selectGender('zena')}>
                  <div className="gender-icon">♀</div>
                  <h3>Žena</h3>
                  <p>Dotazník prispôsobený pre ženskú perspektívu</p>
                  <button className="btn-primary">Pokračovať</button>
                </div>
                <div className="gender-card male" onClick={() => selectGender('muz')}>
                  <div className="gender-icon">♂</div>
                  <h3>Muž</h3>
                  <p>Dotazník prispôsobený pre mužskú perspektívu</p>
                  <button className="btn-primary">Pokračovať</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'topics' && (
          <div className="screen active">
            <div className="topics-screen">
              <div className="topics-header">
                <h2>Dostupné témy</h2>
                <p>Vyber tému, ktorú chceš preskúmať. Každá obsahuje podrobný dotazník.</p>
              </div>

              <div className="topics-grid">
                {TOPICS.map((topic) => {
                  const state = topicStates[topic.id]
                  const locked = state === 'no'
                  const maybe = state === 'maybe'
                  return (
                    <button
                      type="button"
                      key={topic.id}
                      className={`topic-card ${locked ? 'locked' : ''}`}
                      disabled={locked}
                      onClick={() => !locked && openTopic(topic.id)}
                    >
                      {locked && <div className="topic-lock">🔒 Zamknuté</div>}
                      {maybe && <div className="topic-lock maybe">⏳ Čoskoro</div>}
                      <div className="topic-icon">{topic.icon}</div>
                      <h3>{topic.title}</h3>
                      <p>{topic.desc}</p>
                      {!locked && <div className="open-btn">Otvoriť →</div>}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {screen === 'detail' && selectedTopic && (
          <div className="screen active">
            <div className="topic-detail">
              <button type="button" className="back-btn" onClick={() => setScreen('topics')}>
                ← Späť na témy
              </button>

              <div className="topic-hero">
                <div className="tag">{selectedTopic.icon} Intímna Téma</div>
                <h1>{selectedTopic.title}</h1>
              </div>

              {selectedTopic.id !== 'facesitting' ? (
                <div className="info-block locked-msg">
                  <div className="lock-icon">🛠️</div>
                  Táto téma je v príprave. Bude čoskoro dostupná.
                </div>
              ) : (
                <>
                  <div className="info-block">
                    <h4>Čo je to?</h4>
                    <p>
                      Face sitting je intímna poloha, pri ktorej si jeden z partnerov sadne alebo kľakne nad
                      tvár druhého.
                    </p>
                  </div>
                  <div className="info-block intimate">
                    <h4>Intímny pohľad</h4>
                    <p>{intimacyCopy}</p>
                  </div>

                  <div className="screening-card">
                    <h3>Chceš preskúmať túto tému?</h3>
                    <div className="screening-opts">
                      <button
                        type="button"
                        className={`screening-opt yes-opt ${selectedTopicState === 'yes' ? 'selected' : ''}`}
                        onClick={() => setTopicState('facesitting', 'yes')}
                      >
                        ✅ Áno
                      </button>
                      <button
                        type="button"
                        className={`screening-opt maybe-opt ${selectedTopicState === 'maybe' ? 'selected' : ''}`}
                        onClick={() => setTopicState('facesitting', 'maybe')}
                      >
                        ⏳ Ešte nie
                      </button>
                      <button
                        type="button"
                        className={`screening-opt no-opt ${selectedTopicState === 'no' ? 'selected' : ''}`}
                        onClick={() => setTopicState('facesitting', 'no')}
                      >
                        🔒 Nie
                      </button>
                    </div>

                    {(selectedTopicState === 'no' || selectedTopicState === 'maybe') && (
                      <div className="optional-share">
                        <p>Voliteľné — čo uvidí partner:</p>
                        <label className="share-opt">
                          <input type="checkbox" checked readOnly />
                          Partner uvidí len to, že téma je zamknutá.
                        </label>
                        <label className="share-opt">
                          <input
                            type="checkbox"
                            checked={shareReason}
                            onChange={(e) => setShareReason(e.target.checked)}
                          />
                          Partner môže vidieť dôvod v 1 vete.
                        </label>
                        {shareReason && <input type="text" className="text-input" placeholder="Krátky dôvod..." />}
                      </div>
                    )}
                  </div>

                  {selectedTopicState === 'yes' && (
                    <>
                      <div className="role-tabs">
                        <button
                          type="button"
                          className={`role-tab ${role === 'dole' ? 'active' : ''}`}
                          onClick={() => setRole('dole')}
                        >
                          Rola DOLE
                        </button>
                        <button
                          type="button"
                          className={`role-tab ${role === 'hore' ? 'active' : ''}`}
                          onClick={() => setRole('hore')}
                        >
                          Rola HORE
                        </button>
                      </div>

                      {role === 'dole' && (
                        <div className="q-block">
                          <div className="q-label">
                            <strong>Miera vzrušenia</strong> — Ktoré tvrdenie najviac sedí na pozíciu DOLE?
                          </div>
                          <label className="radio-opt">
                            <input type="radio" name="arousal_dole" /> Veľmi ma to vzrušovalo.
                          </label>
                          <label className="radio-opt">
                            <input type="radio" name="arousal_dole" onChange={() => setShowImprovableDole(true)} />
                            Skôr mi to nesedelo, ale môže sa to zlepšiť.
                          </label>
                          {showImprovableDole && (
                            <textarea
                              className="text-input"
                              rows={2}
                              placeholder="Čo by to mohlo zlepšiť?"
                            />
                          )}
                        </div>
                      )}

                      {role === 'hore' && (
                        <>
                          <div className="q-block">
                            <div className="q-label">
                              <strong>Miera vzrušenia</strong> — Ktoré tvrdenie najviac sedí na pozíciu HORE?
                            </div>
                            <label className="radio-opt">
                              <input type="radio" name="arousal_hore" /> Veľmi ma to vzrušovalo.
                            </label>
                            <label className="radio-opt">
                              <input type="radio" name="arousal_hore" onChange={() => setShowImprovableHore(true)} />
                              Skôr mi to nesedelo, ale môže sa to zlepšiť.
                            </label>
                            {showImprovableHore && (
                              <textarea
                                className="text-input"
                                rows={2}
                                placeholder="Čo by to mohlo zlepšiť?"
                              />
                            )}
                          </div>

                          <div className="q-block">
                            <div className="q-label">
                              <strong>Stupienky istoty (Osoba HORE)</strong>
                            </div>
                            {[1, 2, 3, 4, 5].map((r) => (
                              <button
                                type="button"
                                key={r}
                                className={`step-rung ${selectedRung === r ? 'selected' : ''}`}
                                onClick={() => setSelectedRung((prev) => (prev === r ? null : r))}
                              >
                                <span className="step-rung-num">{r}</span>
                                <span>Stupeň {r}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="action-row">
                        <button type="button" className="btn-gold" onClick={saveTopic}>
                          {saved ? '✓ Uložené' : 'Uložiť odpovede →'}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .cs-shell { --bg:#0d0b0e;--surface:#16121a;--surface2:#1e1825;--border:rgba(180,140,200,.12);--border2:rgba(180,140,200,.22);--gold:#c9a96e;--rose:#c97a8a;--violet:#9b7bca;--text:#e8e0f0;--text2:#b8aac8;--text3:#7a6d8a;--locked:#4a3f55;--yes:#5a9e7a;--no:#9e5a6a;--radius:14px;--radius-sm:8px; }
        .cs-shell,.cs-shell *{box-sizing:border-box}
        .cs-shell{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
        .page-wrap{position:relative}
        .site-header{padding:20px 40px;display:flex;justify-content:space-between;border-bottom:1px solid var(--border);position:sticky;top:0;background:rgba(13,11,14,.85);z-index:30}
        .site-logo{font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:var(--gold)} .site-logo span{color:var(--text3);font-size:.9rem}
        .header-badge{font-size:.7rem;color:var(--text3);border:1px solid var(--border);padding:4px 12px;border-radius:20px}
        .q-progress{position:fixed;top:63px;left:0;right:0;height:2px;background:var(--border);z-index:40}.q-progress-fill{height:100%;background:linear-gradient(90deg,var(--violet),var(--rose));transition:width .3s}
        .hero{text-align:center;padding:80px 20px 40px}.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,5vw,4rem);font-weight:300}.hero-title em{color:var(--gold)}
        .hero-eyebrow{font-size:.7rem;letter-spacing:.2em;color:var(--violet);text-transform:uppercase}.hero-sub{color:var(--text2);max-width:580px;margin:14px auto}
        .privacy-badges{display:flex;gap:20px;justify-content:center;flex-wrap:wrap}.privacy-badge{font-size:.75rem;color:var(--text3);display:flex;align-items:center;gap:8px}.dot{width:6px;height:6px;background:var(--yes);border-radius:50%}
        .step-bar{display:flex;justify-content:center;align-items:center;padding:0 20px 32px}.step-item{display:flex;align-items:center;color:var(--text3);font-size:.8rem}.step-num{width:28px;height:28px;border-radius:999px;border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;margin-right:8px}.step-item.active .step-num{background:var(--violet);color:#fff;border-color:var(--violet)}.step-connector{height:1px;width:48px;background:var(--border);margin:0 8px}
        .gender-select,.topics-screen,.topic-detail{max-width:980px;margin:0 auto;padding:0 20px 60px}.section-label{text-align:center;font-family:'Cormorant Garamond',serif;font-size:1.7rem}.section-note{text-align:center;color:var(--text3);margin:8px 0 26px}
        .gender-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px}.gender-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:30px;text-align:center;cursor:pointer}.gender-card:hover{border-color:var(--border2)}.gender-icon{font-size:2rem}.btn-primary,.btn-gold{border:none;border-radius:28px;padding:11px 20px;cursor:pointer}.btn-primary{margin-top:14px;background:linear-gradient(135deg,var(--violet),#7b5cb8);color:white}.btn-gold{background:linear-gradient(135deg,var(--gold),#b8893e);color:#1a1200}
        .topics-header h2{font-family:'Cormorant Garamond',serif;font-size:2rem}.topics-header p{color:var(--text3)}.topics-grid{margin-top:20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
        .topic-card{position:relative;text-align:left;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px;color:inherit}.topic-card:not(:disabled){cursor:pointer}.topic-card:disabled{opacity:.55}.topic-lock{position:absolute;top:10px;right:10px;background:var(--locked);padding:3px 8px;border-radius:10px;font-size:.7rem}.topic-lock.maybe{background:rgba(201,169,110,.2);color:var(--gold)}.topic-icon{font-size:1.3rem}.open-btn{margin-top:8px;color:var(--violet);font-size:.8rem}
        .back-btn{border:none;background:none;color:var(--text3);cursor:pointer;padding:0;margin-bottom:24px}.topic-hero h1{font-family:'Cormorant Garamond',serif;font-size:2.1rem}.tag{font-size:.75rem;color:var(--violet)}
        .info-block,.screening-card,.q-block{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px;margin-bottom:16px}.intimate{background:linear-gradient(135deg,rgba(155,123,202,.06),rgba(201,122,138,.04));border-color:rgba(155,123,202,.2)}
        .screening-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.screening-opt{border:1px solid var(--border);padding:12px;border-radius:10px;background:transparent;color:var(--text2);cursor:pointer}.screening-opt.selected.yes-opt{background:rgba(90,158,122,.1);border-color:var(--yes)}.screening-opt.selected.maybe-opt{background:rgba(201,169,110,.1);border-color:var(--gold)}.screening-opt.selected.no-opt{background:rgba(158,90,106,.1);border-color:var(--no)}
        .optional-share{margin-top:12px;background:var(--surface2);padding:14px;border-radius:12px}.share-opt{display:flex;gap:8px;font-size:.85rem;color:var(--text2);margin:6px 0}
        .role-tabs{display:flex;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;margin-bottom:12px}.role-tab{flex:1;border:none;background:transparent;color:var(--text3);padding:10px;cursor:pointer}.role-tab.active{background:var(--surface2);color:var(--text)}
        .radio-opt{display:block;border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px 12px;margin-top:8px;color:var(--text2)} .text-input{width:100%;margin-top:8px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px;color:var(--text)}
        .step-rung{width:100%;display:flex;gap:10px;align-items:center;background:var(--surface2);border:1px solid var(--border);border-radius:10px;color:var(--text2);padding:10px;margin-top:8px;cursor:pointer}.step-rung.selected{border-color:var(--gold);background:rgba(201,169,110,.06)}.step-rung-num{font-family:'Cormorant Garamond',serif;color:var(--gold)}
        .action-row{margin-top:16px;display:flex;justify-content:flex-end}
        .locked-msg{text-align:center;color:var(--text3)}
        @media(max-width:640px){.gender-cards,.screening-opts{grid-template-columns:1fr}.step-bar{display:none}.site-header{padding:16px 20px}}
      `}</style>
    </div>
  )
}
