'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CategorySelector, { type Category } from '@/components/quiz/CategorySelector'

export default function ExplorerClient({ lang }: { lang: string }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/herd-vote/categories')
      .then(async response => {
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?._error || data?.error || 'Nepodarilo sa načítať kategórie.')
        }
        setCategories(Array.isArray(data.categories) ? data.categories : [])
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Nepodarilo sa načítať kategórie.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] px-6 py-12">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b0a89e]">Herd Vote</p>
          <h1 className="text-3xl font-semibold text-[#1a1814]">Načítavam živý prehľad kategórií…</h1>
          <p className="text-sm text-[#7a7268]">
            Beriem dáta priamo z kategórií pripravených pre quiz a Herd Vote flow.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e2ddd8] bg-white p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b0a89e]">Herd Vote</p>
          <h1 className="mt-3 text-3xl font-semibold text-[#1a1814]">Kategórie sa nepodarilo načítať</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#7a7268]">{error}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={`/${lang}/apps/herd-vote`}
              className="rounded-xl border border-[#e2ddd8] px-5 py-3 text-sm font-medium text-[#1a1814] transition hover:border-[#c8c0b8]"
            >
              Späť na Herd Vote
            </Link>
            <Link
              href={`/${lang}/apps/herd-vote/admin`}
              className="rounded-xl bg-[#1a1814] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Otvoriť administráciu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <CategorySelector
      categories={categories}
      maxSelect={0}
      mode="explorer"
      title="Živý prehľad kategórií pre Herd Vote"
      description="Sem smeruje finálny kategóriový mapping z dokumentácie. Vidíš tu reálne aktívne kategórie z databázy, ich skupiny aj pripravenosť otázok, bez potreby spúšťať lobby."
    />
  )
}
