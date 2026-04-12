'use client'

import { useMemo, useState } from 'react'

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
  onConfirm?: (selected: Category[]) => void
  maxSelect?: number
  mode?: 'picker' | 'explorer'
  title?: string
  description?: string
  confirmLabel?: string
}

const GROUP_META: Record<string, { label: string; emoji: string }> = {
  zabava: { label: 'Zábava & Pop', emoji: '🎬' },
  sport: { label: 'Šport', emoji: '⚽' },
  historia: { label: 'História', emoji: '⚔️' },
  geo: { label: 'Geografia', emoji: '🌍' },
  jedlo: { label: 'Jedlo & Pitie', emoji: '🍽️' },
  veda: { label: 'Veda & Príroda', emoji: '🔬' },
  sk: { label: 'Slovensko', emoji: '🇸🇰' },
  deeptalks: { label: 'DeepTalks', emoji: '💬' },
  format: { label: 'Špeciálny formát', emoji: '🎲' },
  kultura: { label: 'Kultúra', emoji: '🎨' },
  tech: { label: 'Tech', emoji: '💻' },
  funny: { label: 'Zábavné', emoji: '🤯' },
  deti: { label: 'Deti', emoji: '🧒' },
}

const GROUP_ORDER = [
  'zabava',
  'sport',
  'historia',
  'geo',
  'jedlo',
  'veda',
  'sk',
  'deeptalks',
  'format',
  'kultura',
  'tech',
  'funny',
  'deti',
]

function normalizeSearch(value: string) {
  return value.toLowerCase().trim()
}

function getGroupMeta(group: string) {
  return GROUP_META[group] ?? { label: group, emoji: '❓' }
}

export default function CategorySelector({
  categories,
  onConfirm,
  maxSelect = 8,
  mode = 'picker',
  title = 'Kategórie pre Herd Vote',
  description = 'Živý prehľad kategórií z databázy. Filtrovať môžeš podľa skupiny, vyhľadávať podľa názvu a pri každej kategórii hneď vidíš, či už má pripravené otázky.',
  confirmLabel = 'Potvrdiť výber →',
}: CategorySelectorProps) {
  const [selected, setSelected] = useState<Category[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [copyLabel, setCopyLabel] = useState('Kopírovať')

  const groupedCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const category of categories) {
      counts.set(category.group_tag, (counts.get(category.group_tag) ?? 0) + 1)
    }
    return counts
  }, [categories])

  const orderedGroups = useMemo(() => {
    const present = Array.from(groupedCounts.keys())
    const ordered = GROUP_ORDER.filter(group => present.includes(group))
    const extra = present.filter(group => !GROUP_ORDER.includes(group)).sort((a, b) => a.localeCompare(b))
    return [...ordered, ...extra]
  }, [groupedCounts])

  const filters = useMemo(
    () => [
      { key: 'all', label: 'Všetky', emoji: '', count: categories.length },
      ...orderedGroups.map(group => ({
        key: group,
        label: getGroupMeta(group).label,
        emoji: getGroupMeta(group).emoji,
        count: groupedCounts.get(group) ?? 0,
      })),
    ],
    [categories.length, groupedCounts, orderedGroups],
  )

  const q = normalizeSearch(search)

  const filtered = useMemo(() => {
    return categories.filter(category => {
      if (activeFilter !== 'all' && category.group_tag !== activeFilter) return false

      if (!q) return true

      const haystack = [
        category.name,
        category.description_sk ?? '',
        category.source_hint ?? '',
        getGroupMeta(category.group_tag).label,
      ].join(' ')

      return normalizeSearch(haystack).includes(q)
    })
  }, [activeFilter, categories, q])

  const questionReadyCount = categories.filter(category => (category.question_count ?? 0) > 0).length
  const emptyCount = categories.length - questionReadyCount

  const toggle = (category: Category) => {
    setSelected(previous => {
      const exists = previous.some(item => item.id === category.id)
      if (exists) return previous.filter(item => item.id !== category.id)
      if (maxSelect > 0 && previous.length >= maxSelect) return previous
      return [...previous, category]
    })
  }

  const remove = (category: Category) => {
    setSelected(previous => previous.filter(item => item.id !== category.id))
  }

  const clearAll = () => setSelected([])

  const copy = async () => {
    if (!selected.length) return
    await navigator.clipboard.writeText(selected.map(category => `${category.icon} ${category.name}`).join('\n'))
    setCopyLabel('Skopírované ✓')
    setTimeout(() => setCopyLabel('Kopírovať'), 2000)
  }

  const isSelected = (id: string) => selected.some(category => category.id === id)
  const canConfirm = mode === 'picker' && !!onConfirm

  return (
    <div className="font-sans" style={{ background: '#f5f3f0', minHeight: '100vh', padding: '2rem 1.5rem 10rem' }}>
      <div className="mx-auto mb-6 max-w-[820px]">
        <h1 className="mb-1 text-[22px] font-semibold" style={{ color: '#1a1814' }}>
          {title}
        </h1>
        <p className="max-w-[620px] text-[13px] leading-relaxed" style={{ color: '#7a7268' }}>
          {description}
        </p>
      </div>

      <div className="mx-auto mb-4 grid max-w-[820px] gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Aktívne kategórie', value: categories.length, accent: '#16a34a' },
          { label: 'Pripravené s otázkami', value: questionReadyCount, accent: '#2563eb' },
          { label: 'Bez otázok', value: emptyCount, accent: '#d97706' },
          { label: 'Práve zobrazené', value: filtered.length, accent: '#7a7268' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[12px] border bg-white px-4 py-3" style={{ borderColor: '#e2ddd8' }}>
            <div className="text-[24px] font-semibold leading-none" style={{ color: stat.accent }}>
              {stat.value}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.08em]" style={{ color: '#b0a89e' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mb-4 max-w-[820px]">
        <input
          type="text"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Hľadaj kategóriu, skupinu alebo popis..."
          autoComplete="off"
          className="w-full rounded-[10px] px-4 py-2.5 text-[14px] outline-none transition-all"
          style={{ border: '1px solid #e2ddd8', background: '#fff', color: '#1a1814' }}
        />
      </div>

      <div className="mx-auto mb-6 flex max-w-[820px] flex-wrap gap-1.5">
        {filters.map(filter => {
          const isActive = activeFilter === filter.key
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className="flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition-all"
              style={
                isActive
                  ? { background: '#1a1814', borderColor: '#1a1814', color: '#fff', border: '1px solid #1a1814' }
                  : { background: '#fff', border: '1px solid #e2ddd8', color: '#7a7268' }
              }
            >
              {filter.emoji && <span>{filter.emoji}</span>}
              <span>{filter.label}</span>
              <span style={{ opacity: isActive ? 0.72 : 0.5 }}>({filter.count})</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-[820px] py-10 text-center">
          <div className="mb-2 text-[32px]">🔍</div>
          <div className="mb-1 text-[15px] font-medium" style={{ color: '#7a7268' }}>
            Nič sa nenašlo
          </div>
          <div className="text-[13px]" style={{ color: '#b0a89e' }}>
            Skús iný výraz alebo prepni filter.
          </div>
        </div>
      ) : activeFilter === 'all' && !q ? (
        orderedGroups.map(group => {
          const items = filtered.filter(category => category.group_tag === group)
          if (!items.length) return null

          const meta = getGroupMeta(group)

          return (
            <div key={group}>
              <div className="mx-auto mb-3 flex max-w-[820px] items-center gap-3">
                <span
                  className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: '#b0a89e', letterSpacing: '0.08em' }}
                >
                  {meta.emoji} {meta.label} ({items.length})
                </span>
                <span className="h-px flex-1" style={{ background: '#e2ddd8' }} />
              </div>
              <div className="mx-auto mb-5 grid max-w-[820px] grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(category => (
                  <CategoryCard
                    key={category.id}
                    cat={category}
                    isSelected={isSelected(category.id)}
                    onToggle={() => toggle(category)}
                  />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="mx-auto mb-5 grid max-w-[820px] grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(category => (
            <CategoryCard
              key={category.id}
              cat={category}
              isSelected={isSelected(category.id)}
              onToggle={() => toggle(category)}
            />
          ))}
        </div>
      )}

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
          <div className="mb-2.5 flex min-h-[28px] flex-wrap items-center gap-1.5">
            {selected.length === 0 ? (
              <span className="text-[12px] italic" style={{ color: '#b0a89e' }}>
                Klikni na kategóriu pre výber.
              </span>
            ) : (
              selected.map(category => (
                <span
                  key={category.id}
                  onClick={() => remove(category)}
                  className="inline-flex max-w-[220px] cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all hover:bg-red-50 hover:text-red-600"
                  style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8' }}
                >
                  <span className="shrink-0 text-[12px]">{category.icon}</span>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{category.name}</span>
                  <span className="shrink-0 text-[13px] opacity-45">×</span>
                </span>
              ))
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] font-medium" style={{ color: '#7a7268' }}>
              {selected.length === 0
                ? '0 vybraných'
                : `${selected.length} vybraných — klikni na štítok pre odstránenie`}
            </span>
            <div className="flex items-center gap-2">
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="cursor-pointer border-none bg-transparent px-2 py-1.5 text-[12px] transition-colors hover:text-red-600"
                  style={{ color: '#b0a89e' }}
                >
                  Zrušiť všetko
                </button>
              )}
              <button
                type="button"
                onClick={copy}
                disabled={selected.length === 0}
                className="cursor-pointer rounded-lg px-4 py-2 text-[12px] font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40"
                style={{ border: '1px solid #e2ddd8', background: '#f5f3f0', color: '#3d3830' }}
              >
                {copyLabel}
              </button>
              {canConfirm && (
                <button
                  type="button"
                  disabled={selected.length === 0}
                  onClick={() => onConfirm?.(selected)}
                  className="cursor-pointer rounded-[10px] border-none px-6 py-2.5 text-[13px] font-semibold text-white transition-all hover:-translate-y-px disabled:cursor-not-allowed disabled:transform-none"
                  style={{ background: selected.length > 0 ? '#2563eb' : '#c8c0b8' }}
                >
                  {confirmLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryCard({
  cat,
  isSelected,
  onToggle,
}: {
  cat: Category
  isSelected: boolean
  onToggle: () => void
}) {
  const count = cat.question_count ?? 0
  const badgeLabel = count > 0 ? `${count} otázok` : 'Bez otázok'
  const badgeColor = count > 0
    ? { background: '#f0fdf4', color: '#16a34a' }
    : { background: '#fffbeb', color: '#d97706' }

  return (
    <div
      onClick={onToggle}
      className="group relative cursor-pointer select-none overflow-hidden transition-all duration-150"
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
      {!isSelected && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
          style={{ background: '#e86b3a' }}
        />
      )}

      <div
        className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold"
        style={isSelected ? { background: '#2563eb', color: '#fff' } : badgeColor}
      >
        {isSelected ? 'Vybrané' : badgeLabel}
      </div>

      <span className="mb-2 block text-[22px] leading-none">
        {cat.icon || '❓'}
      </span>

      <div className="mb-0.5 text-[13px] font-medium leading-snug" style={{ color: isSelected ? '#1d4ed8' : '#1a1814' }}>
        {cat.name}
      </div>

      <div
        className="mb-1 text-[11px] leading-[1.45]"
        style={{ color: isSelected ? '#3b82f6' : '#7a7268', opacity: isSelected ? 0.85 : 1 }}
      >
        {cat.description_sk || 'Kategória pre Herd Vote otázky a skupinové hranie.'}
      </div>

      <div className="text-[10px]" style={{ color: isSelected ? '#93c5fd' : '#b0a89e', letterSpacing: '0.02em' }}>
        {cat.source_hint || getGroupMeta(cat.group_tag).label}
      </div>
    </div>
  )
}
