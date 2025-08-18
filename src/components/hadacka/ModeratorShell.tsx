'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ModeratorShellProps {
  children: React.ReactNode
}

export function ModeratorShell({ children }: ModeratorShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/apps/hadacka" className="text-xl font-bold gradient-text">
              🎮 Hádačka naživo
            </Link>
            <span className="text-sm text-muted-foreground">
              Moderátorska konzola
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/apps/hadacka/display', '_blank')}
            >
              📺 Otvoriť Display
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/apps/hadacka">
                ← Späť na úvod
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="p-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="text-xs text-muted-foreground space-y-1">
            <div><kbd className="px-1 bg-muted rounded">Space</kbd> Uhadnuté</div>
            <div><kbd className="px-1 bg-muted rounded">→</kbd> Preskočiť</div>
            <div><kbd className="px-1 bg-muted rounded">S</kbd> Štart/Pauza</div>
            <div><kbd className="px-1 bg-muted rounded">Enter</kbd> Ďalšie kolo</div>
            <div><kbd className="px-1 bg-muted rounded">R</kbd> Spustiť hru</div>
          </div>
        </Card>
      </div>
    </div>
  )
}