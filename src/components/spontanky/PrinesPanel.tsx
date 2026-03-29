'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { supabaseClient } from '@/integrations/supabase/client'
import type { PrinesItem } from '@/lib/spontanky/types'

interface Props {
  spontankaId: string
  initialItems: PrinesItem[]
  pid: string
  pname: string
  onNeedName: () => void
  disabled: boolean
}

export function PrinesPanel({ spontankaId, initialItems, pid, pname, onNeedName, disabled }: Props) {
  const [items, setItems] = useState<PrinesItem[]>(initialItems)
  const [newNazov, setNewNazov] = useState('')
  const [newMnozstvo, setNewMnozstvo] = useState('')
  const [adding, setAdding] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Real-time updates
  useEffect(() => {
    const channel = supabaseClient
      .channel(`prinesiem-${spontankaId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'spontanka_prinesiem',
        filter: `spontanka_id=eq.${spontankaId}`,
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setItems(prev => [...prev, payload.new as PrinesItem].sort((a, b) => a.order_index - b.order_index))
        } else if (payload.eventType === 'UPDATE') {
          setItems(prev => prev.map(i => i.id === payload.new.id ? payload.new as PrinesItem : i))
        } else if (payload.eventType === 'DELETE') {
          setItems(prev => prev.filter(i => i.id !== payload.old.id))
        }
      })
      .subscribe()
    return () => { supabaseClient.removeChannel(channel) }
  }, [spontankaId])

  const addItem = async () => {
    if (!newNazov.trim() || disabled) return
    setAdding(true)
    const res = await fetch(`/api/spontanky/${spontankaId}/prinesiem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nazov: newNazov.trim(), mnozstvo: newMnozstvo.trim() }),
    })
    if (res.ok) {
      setNewNazov('')
      setNewMnozstvo('')
    }
    setAdding(false)
  }

  const toggle = async (item: PrinesItem) => {
    if (!pid || !pname) { onNeedName(); return }
    if (disabled || actionLoading) return
    if (item.claimed_by_participant_id && item.claimed_by_participant_id !== pid) return // claimed by someone else

    setActionLoading(item.id)
    const action = item.claimed_by_participant_id ? 'unclaim' : 'claim'

    // Optimistic
    setItems(prev => prev.map(i => {
      if (i.id !== item.id) return i
      return action === 'claim'
        ? { ...i, claimed_by_participant_id: pid, claimed_by_meno: pname, claimed_at: new Date().toISOString() }
        : { ...i, claimed_by_participant_id: null, claimed_by_meno: null, claimed_at: null }
    }))

    const res = await fetch(`/api/spontanky/${spontankaId}/prinesiem/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, participant_id: pid, meno: pname }),
    })

    if (!res.ok) {
      // Revert
      setItems(prev => prev.map(i => i.id === item.id ? item : i))
    }
    setActionLoading(null)
  }

  const free = items.filter(i => !i.claimed_by_participant_id)
  const claimed = items.filter(i => i.claimed_by_participant_id)

  return (
    <div className="space-y-5">
      {items.length === 0 && (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-sm">Nikto ešte nič nepridali. Buď prvý — napíš čo prinesieš.</p>
        </div>
      )}

      {free.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Hľadá nosiča</h3>
          <div className="space-y-2">
            {free.map(item => (
              <ItemRow key={item.id} item={item} pid={pid} loading={actionLoading === item.id} disabled={disabled} onToggle={() => toggle(item)} />
            ))}
          </div>
        </div>
      )}

      {claimed.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Potvrdené</h3>
          <div className="space-y-2">
            {claimed.map(item => (
              <ItemRow key={item.id} item={item} pid={pid} loading={actionLoading === item.id} disabled={disabled} onToggle={() => toggle(item)} />
            ))}
          </div>
        </div>
      )}

      {!disabled && (
        <div className="flex gap-2 pt-2">
          <input
            value={newNazov}
            onChange={e => setNewNazov(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem() } }}
            placeholder="Pridať položku (napr. frisbee, voda…)"
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            value={newMnozstvo}
            onChange={e => setNewMnozstvo(e.target.value)}
            placeholder="množstvo"
            className="w-24 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button variant="outline" size="sm" disabled={adding || !newNazov.trim()} onClick={addItem}>
            {adding ? '…' : 'Pridať'}
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Zdieľanie je dobrovoľné. Ak to prinesieš inak alebo vôbec, je to v poriadku.
      </p>
    </div>
  )
}

function ItemRow({
  item, pid, loading, disabled, onToggle,
}: {
  item: PrinesItem
  pid: string
  loading: boolean
  disabled: boolean
  onToggle: () => void
}) {
  const isMine = item.claimed_by_participant_id === pid
  const isClaimed = !!item.claimed_by_participant_id
  const canInteract = !disabled && !loading && (!isClaimed || isMine)

  return (
    <div className={cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all',
      isClaimed ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200/60 dark:border-green-800/40' : 'bg-background',
    )}>
      <div className="flex-1 min-w-0">
        <span className={cn('text-sm font-medium', isClaimed && 'text-muted-foreground')}>{item.nazov}</span>
        {item.mnozstvo && <span className="text-xs text-muted-foreground ml-2">{item.mnozstvo}</span>}
        {item.claimed_by_meno && (
          <div className="text-xs text-muted-foreground mt-0.5">
            {isMine ? 'Ty' : item.claimed_by_meno}
          </div>
        )}
      </div>
      <button
        onClick={onToggle}
        disabled={!canInteract}
        className={cn(
          'text-xs font-medium px-3 py-1.5 rounded-lg border transition-all shrink-0',
          isMine ? 'bg-green-100 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' :
          isClaimed ? 'bg-muted border-border text-muted-foreground opacity-50' :
          'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20',
          !canInteract && 'opacity-40 cursor-not-allowed',
        )}
      >
        {loading ? '…' : isMine ? 'Mám ✓' : isClaimed ? item.claimed_by_meno : 'Prinesiem'}
      </button>
    </div>
  )
}
