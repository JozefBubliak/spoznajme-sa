'use client'

import { useState, useMemo } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  group_tag: string
  description_sk: string | null
  source_hint: string | null
  sort_order: number
  question_count?: number
}

export interface CategorySelectorProps {
  categories: Category[]
  onConfirm: (selected: Category[]) => void
  maxSelect?: number
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTIONS = [
  { key: 'zabava',    label: '🎬 Zábava & Pop' },
  { key: 'sport',     label: '⚽ Šport' },
  { key: 'kultura',   label: '🎨 Kultúra & Umenie' },
  { key: 'historia',  label: '⚔️ História & Politika' },
  { key: 'geo',       label: '🌍 Geografia' },
  { key: 'jedlo',     label: '🍕 Jedlo & Pitie' },
  { key: 'veda',      label: '🔬 Veda & Príroda' },
  { key: 'tech',      label: '💻 Tech & Veda' },
  { key: 'sk',        label: '🇸🇰 Slovensko' },
  { key: 'funny',     label: '🤯 Zábavné & Niche' },
  { key: 'deti',      label: '🧒 Pre deti & Školu' },
  { key: 'deeptalks', label: '💬 DeepTalks originál ⭐' },
]

const FILTERS = [
  { key: 'all',       label: 'Všetky',              emoji: '' },
  { key: 'zabava',    label: 'Zábava & Pop',         emoji: '🎬' },
  { key: 'veda',      label: 'Veda & Príroda',       emoji: '🔬' },
  { key: 'sport',     label: 'Šport',                emoji: '⚽' },
  { key: 'kultura',   label: 'Kultúra & Umenie',     emoji: '🎨' },
  { key: 'historia',  label: 'História & Politika',   emoji: '⚔️' },
  { key: 'geo',       label: 'Geografia',             emoji: '🌍' },
  { key: 'jedlo',     label: 'Jedlo & Pitie',         emoji: '🍕' },
  { key: 'tech',      label: 'Tech & Veda',           emoji: '💻' },
  { key: 'sk',        label: 'Slovensko',             emoji: '🇸🇰' },
  { key: 'funny',     label: 'Zábavné & Niche',       emoji: '🤯' },
  { key: 'deti',      label: 'Pre deti & Školu',      emoji: '🧒' },
  { key: 'deeptalks', label: 'DeepTalks',             emoji: '💬' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function CategorySelector({
  categories,
  onConfirm,
  maxSelect = 8,
}: CategorySelectorProps) {
  const [selected, setSelected] = useState<Category[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [copyLabel, setCopyLabel] = useState('Kopírovať')

  const toggle = (cat: Category) => {
    setSelected(prev => {
      const exists = prev.some(c => c.id === cat.id)
      if (exists) return prev.filter(c => c.id !== cat.id)
      if (maxSelect > 0 && prev.length >= maxSelect) return prev
      return [...prev, cat]
    })
  }

  const remove = (cat: Category) => {
    setSelected(prev => prev.filter(c => c.id !== cat.id))
  }

  const clearAll = () => setSelected([])

  const copy = async () => {
    if (!selected.length) return
    await navigator.clipboard.writeText(selected.map(c => c.name).join('\n'))
    setCopyLabel('Skopírované ✓')
    setTimeout(() => setCopyLabel('Kopírovať'), 2000)
  }

  const q = search.toLowerCase().trim()

  const filtered = useMemo(() => {
    return categories.filter(c => {
      if (activeFilter !== 'all' && c.group_tag !== activeFilter) return false
      if (q && !(c.name + ' ' + (c.description_sk || '')).toLowerCase().includes(q)) return false
      return true
    })
  }, [categories, activeFilter, q])

  const isSelected = (id: string) => selected.some(c => c.id === id)

  const totalCount = categories.length

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="font-sans" style={{ background: '#f5f3f0', minHeight: '100vh', padding: '2rem 1.5rem 10rem' }}>
      {/* Header */}
      <div className="mx-auto max-w-[820px] mb-6">
        <h1 className="text-[22px] font-semibold mb-1" style={{ color: '#1a1814' }}>
          Kategórie pre Herd Vote Quiz
        </h1>
        <p className="text-[13px] leading-relaxed max-w-[580px]" style={{ color: '#7a7268' }}>
          {totalCount} kategórií z celého sveta — Trivial Pursuit, Jackbox, pub quizy, Kahoot, Netflix, školské súťaže.
          Klikni pre výber, filter podľa skupiny, hľadaj. Vybrané sa zbierajú dolu.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto max-w-[820px] mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Hľadaj kategóriu..."
          autoComplete="off"
          className="w-full text-[14px] px-4 py-2.5 rounded-[10px] outline-none transition-all"
          style={{
            border: '1px solid #e2ddd8',
            background: '#fff',
            color: '#1a1814',
          }}
        />
      </div>

      {/* Filter pills */}
      <div className="mx-auto max-w-[820px] mb-6 flex flex-wrap gap-1.5">
        {FILTERS.map(f => {
          const isActive = activeFilter === f.key
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className="text-[12px] font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap"
              style={isActive
                ? { background: '#1a1814', borderColor: '#1a1814', color: '#fff', border: '1px solid #1a1814' }
                : { background: '#fff', border: '1px solid #e2ddd8', color: '#7a7268' }
              }
            >
              {f.emoji && <span>{f.emoji}</span>}
              {f.key === 'all' ? `Všetky (${totalCount})` : f.label}
            </button>
          )
        })}
      </div>

      {/* Content: sections or flat grid */}
      {filtered.length === 0 ? (
        <div className="mx-auto max-w-[820px] text-center py-8">
          <div className="text-[32px] mb-2">🔍</div>
          <div className="text-[15px] font-medium mb-1" style={{ color: '#7a7268' }}>Nič sa nenašlo</div>
          <div className="text-[13px]" style={{ color: '#b0a89e' }}>Skús iný výraz alebo prepni filter</div>
        </div>
      ) : activeFilter === 'all' && !q ? (
        // Grouped by sections
        SECTIONS.map(sec => {
          const items = filtered.filter(c => c.group_tag === sec.key)
          if (!items.length) return null
          return (
            <div key={sec.key}>
              {/* Section label */}
              <div className="mx-auto max-w-[820px] mb-3 flex items-center gap-3">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap"
                  style={{ color: '#b0a89e', letterSpacing: '0.08em' }}
                >
                  {sec.label}
                </span>
                <span className="flex-1 h-px" style={{ background: '#e2ddd8' }} />
              </div>
              {/* Grid */}
              <div className="mx-auto max-w-[820px] mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {items.map(cat => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    isSelected={isSelected(cat.id)}
                    onToggle={() => toggle(cat)}
                  />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        // Flat grid
        <div className="mx-auto max-w-[820px] mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filtered.map(cat => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              isSelected={isSelected(cat.id)}
              onToggle={() => toggle(cat)}
            />
          ))}
        </div>
      )}

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: '#fff',
          borderTop: '1px solid #e2ddd8',
          padding: '0.9rem 1.5rem',
          boxShadow: '0 -4px 20px rgba(0,0,0,.08)',
        }}
      >
        <div className="mx-auto max-w-[820px]">
          {/* Selected pills */}
          <div className="flex flex-wrap gap-1.5 mb-2.5 min-h-[28px] items-center">
            {selected.length === 0 ? (
              <span className="text-[12px] italic" style={{ color: '#b0a89e' }}>
                Klikni na kategóriu pre výber
              </span>
            ) : (
              selected.map(cat => (
                <span
                  key={cat.id}
                  onClick={() => remove(cat)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full cursor-pointer transition-all max-w-[200px] hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                  }}
                >
                  <span className="text-[12px] flex-shrink-0">{cat.icon}</span>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{cat.name}</span>
                  <span className="opacity-45 text-[13px] flex-shrink-0">×</span>
                </span>
              ))
            )}
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] font-medium" style={{ color: '#7a7268' }}>
              {selected.length === 0
                ? '0 vybraných'
                : `${selected.length} vybraných — klikni na štítok pre odstránenie`}
            </span>
            <div className="flex gap-2 items-center">
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[12px] bg-transparent border-none cursor-pointer px-2 py-1.5 transition-colors hover:text-red-600"
                  style={{ color: '#b0a89e' }}
                >
                  Zrušiť všetko
                </button>
              )}
              <button
                type="button"
                onClick={copy}
                className="text-[12px] font-medium px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-white"
                style={{
                  border: '1px solid #e2ddd8',
                  background: '#f5f3f0',
                  color: '#3d3830',
                }}
              >
                {copyLabel}
              </button>
              <button
                type="button"
                disabled={selected.length === 0}
                onClick={() => onConfirm(selected)}
                className="text-[13px] font-semibold px-6 py-2.5 rounded-[10px] border-none cursor-pointer transition-all hover:-translate-y-px disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: selected.length > 0 ? '#2563eb' : '#c8c0b8',
                  color: '#fff',
                }}
              >
                Potvrdiť výber →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── CategoryCard ──────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  isSelected,
  onToggle,
}: {
  cat: Category
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <div
      onClick={onToggle}
      className="relative overflow-hidden cursor-pointer select-none transition-all duration-150 group"
      style={
        isSelected
          ? {
              background: '#eff6ff',
              border: '2px solid #2563eb',
              borderRadius: '12px',
              padding: '13px 14px 12px',
              boxShadow: '0 0 0 3px rgba(37,99,235,.08)',
            }
          : {
              background: '#fff',
              border: '1px solid #e2ddd8',
              borderRadius: '12px',
              padding: '13px 14px 12px',
            }
      }
    >
      {/* Orange hover line */}
      {!isSelected && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"
          style={{ background: '#e86b3a' }}
        />
      )}

      {/* Checkmark */}
      {isSelected && (
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
          style={{ background: '#2563eb', color: '#fff' }}
        >
          ✓
        </div>
      )}

      {/* Icon */}
      <span className="block text-[22px] leading-none mb-2">
        {cat.icon || '❓'}
      </span>

      {/* Name */}
      <div
        className="text-[13px] font-medium leading-snug mb-0.5"
        style={{ color: isSelected ? '#1d4ed8' : '#1a1814' }}
      >
        {cat.name}
      </div>

      {/* Description */}
      {cat.description_sk && (
        <div
          className="text-[11px] leading-[1.45] mb-1"
          style={{
            color: isSelected ? '#3b82f6' : '#7a7268',
            opacity: isSelected ? 0.85 : 1,
          }}
        >
          {cat.description_sk}
        </div>
      )}

      {/* Source hint tag */}
      {cat.source_hint && (
        <div
          className="text-[10px]"
          style={{ color: isSelected ? '#93c5fd' : '#b0a89e', letterSpacing: '0.02em' }}
        >
          {cat.source_hint}
        </div>
      )}
    </div>
  )
}
