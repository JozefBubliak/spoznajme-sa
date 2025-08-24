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
}

export function WordCard({ 
  word, 
  playMode, 
  className,
  showTabooTerms = false 
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

  // Mock taboo terms for demonstration (would come from DB in production)
  const getTabooTerms = (word: string): string[] => {
    const tabooMap: Record<string, string[]> = {
      'pes': ['šteká', 'zviera', 'mačka', 'kôstka', 'ocas'],
      'telefón': ['hovorí', 'mobil', 'číslom', 'zvoniť', 'displej'],
      'pizza': ['taliansky', 'syr', 'paradajky', 'kruh', 'kúsok'],
      'auto': ['jazda', 'benzín', 'šofér', 'kolesá', 'cesta'],
      'futbal': ['lopta', 'gól', 'jedenásť', 'kopať', 'branka'],
    }
    return tabooMap[word.toLowerCase()] || ['termín 1', 'termín 2', 'termín 3']
  }

  const shouldShowTaboo = playMode === 'opis-tabu' && showTabooTerms
  const tabooTerms = shouldShowTaboo ? getTabooTerms(word.word) : []

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
              {word.categoryCode.replace('-', ' ')}
            </p>
          </div>

          {/* Taboo terms */}
          {shouldShowTaboo && tabooTerms.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-destructive flex items-center justify-center gap-2">
                  🚫 Zakázané výrazy
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {tabooTerms.map((term, index) => (
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