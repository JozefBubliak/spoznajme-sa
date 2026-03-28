'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { WordVM, PlayMode } from '@/types/hadacka'

interface WordCardProps {
  word: WordVM | null
  playMode: PlayMode
  className?: string
  showTabooTerms?: boolean
  tabooTerms?: string[]
}

export function WordCard({
  word,
  playMode,
  className,
  showTabooTerms = false,
  tabooTerms,
}: WordCardProps) {
  if (!word) {
    return (
      <Card className={cn('h-64 flex items-center justify-center', className)}>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-lg">
            Žiadne slovo k dispozícii
          </p>
        </CardContent>
      </Card>
    )
  }

  const getModeIcon = (mode: PlayMode): string => {
    switch (mode) {
      case 'opis-tabu': return '💬'
      case 'pantomima': return '🎭'
      case 'jedno-slovo': return '☝️'
      case 'mix': return '🔀'
      default: return '❓'
    }
  }

  const getModeLabel = (mode: PlayMode): string => {
    switch (mode) {
      case 'opis-tabu': return 'Opis/TABU'
      case 'pantomima': return 'Pantomíma'
      case 'jedno-slovo': return 'Jedno slovo'
      case 'mix': return 'Mix módov'
      default: return 'Neznámy mód'
    }
  }

  const resolvedTabooTerms = tabooTerms ?? word.tabooTerms ?? []
  const shouldShowTaboo = playMode === 'opis-tabu' && showTabooTerms && resolvedTabooTerms.length > 0

  return (
    <Card className={cn('card-elegant transition-all duration-300', className)}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* Mode indicator */}
          <div className="flex justify-center items-center gap-2">
            <span className="text-2xl">{getModeIcon(playMode)}</span>
            <Badge variant="secondary" className="text-sm">
              {getModeLabel(playMode)}
            </Badge>
          </div>

          {/* Main word */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-primary gradient-text">
              {word.word}
            </h1>
            <p className="text-muted-foreground capitalize">
              {(word.categoryName || word.categoryCode).replace('-', ' ')}
            </p>
          </div>

          {/* Taboo terms */}
          {shouldShowTaboo && (
            <div className="border-t pt-6 mt-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-destructive flex items-center justify-center gap-2">
                  🚫 Zakázané výrazy
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {resolvedTabooTerms.map((term, index) => (
                    <Badge 
                      key={index} 
                      variant="destructive"
                      className="text-sm px-3 py-1"
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}