'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type GroupKey = 'partneri' | 'kamarati' | 'rodina' | 'rodic_dieta'

interface GroupCompletionContentProps {
  group: GroupKey
  setGroup: (group: GroupKey | null) => void
  user: any
  isPaid: boolean
}

const groupContent: Record<
  GroupKey,
  {
    emoji: string
    title: string
    subtitle: string
    description: string
    benefits: string[]
  }
> = {
  partneri: {
    emoji: '💖',
    title: 'Láska je rozhovor – ten pravý začína tu.',
    subtitle:
      'Dokázali ste spolu prejsť všetky otázky pre partnerov – krásna cesta!',
    description: 'Ale tie najhlbšie témy ešte len prídu.',
    benefits: [
      'Otázky, ktoré prehlbujú intimitu a dôveru',
      'Hlboké diskusie o hodnotách, túžbach a strachoch',
      'Zábavné a provokatívne témy, ktoré vás zbližujú',
    ],
  },
  kamarati: {
    emoji: '🤝',
    title: 'Skutočné priateľstvo sa spozná v hlbokých rozhovoroch.',
    subtitle:
      'Zvládol si všetky otázky pre kamarátov – skvelý začiatok!',
    description: 'Ale tie najzaujímavejšie diskusie ešte len čakajú.',
    benefits: [
      'Otázky o snoch, ambíciách a hodnotách',
      'Témy, ktoré odhaľujú skutočnú osobnosť',
      'Spomienky aj plány do budúcnosti',
    ],
  },
  rodina: {
    emoji: '👨‍👩‍👧‍👦',
    title: 'Rodina je miesto, kde sa učíme počúvať.',
    subtitle: 'Prešli ste otázky pre rodinu – a to je len začiatok.',
    description:
      'Stovky ďalších ti pomôžu spoznať príbehy a postoje tvojich blízkych.',
    benefits: [
      'Otázky o detstve, vďačnosti a vzťahoch medzi generáciami',
      'Témy, ktoré možno nikdy predtým nepadli',
      'Spoločné spomienky aj nové prepojenia',
    ],
  },
  rodic_dieta: {
    emoji: '👨‍👧',
    title: 'Porozumenie medzi rodičom a dieťaťom sa buduje slovami.',
    subtitle:
      'Zvládol(a) si všetky otázky v tejto skupine – výborne!',
    description: 'Ale tie najcennejšie rozhovory ešte len čakajú.',
    benefits: [
      'Otázky pre lepšie pochopenie sveta dieťaťa',
      'Bezpečný priestor pre emócie, sny a problémy',
      'Spolu vytvorený most dôvery',
    ],
  },
}

export default function GroupCompletionContent({
  group,
  setGroup,
  user,
  isPaid,
}: GroupCompletionContentProps) {
  const router = useRouter()
  const content = groupContent[group]

  return (
    <div className="text-center space-y-6">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎉</div>
        <div className="text-4xl mb-4">{content.emoji}</div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {content.title}
        </h3>
        <p className="text-gray-700 mb-2 font-medium">
          {content.subtitle}
        </p>
        <p className="text-gray-600 italic">{content.description}</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-left">
        <h4 className="font-semibold text-purple-800 mb-3 text-center">
          ✨ Chceš sa spoznať ešte hlbšie?
        </h4>
        <p className="text-gray-700 mb-4 text-center">
          Spoznávanie nekončí! 🚀
          <br />
          Získaj neobmedzený prístup k stovkám premyslených otázok, ktoré ti
          pomôžu:
        </p>
        <ul className="space-y-2 text-gray-700 mb-4">
          {content.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-2">🎁 Bonus pre nových členov:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-amber-700">
          <div className="flex items-center gap-2">
            <span>🏅</span>
            <span>Každý deň 2 otázky zadarmo z každej skupiny</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💖</span>
            <span>Možnosť ukladať obľúbené otázky</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📈</span>
            <span>Pokračuj tam, kde si skončil</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🗝️</span>
            <span>Kedykoľvek si odomkni celý obsah navždy</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">🧭 Čo chceš spraviť teraz?</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            onClick={() => router.push('/upgrade')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white h-12"
          >
            🗝️ Chcem plný prístup
          </Button>

          {!user && (
            <Button
              onClick={() => router.push('/login')}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200 h-12"
            >
              ✍️ Registrovať sa a získať 2 otázky denne
            </Button>
          )}

          <Button variant="outline" onClick={() => setGroup(null)} className="h-12">
            ↩️ Vybrať inú skupinu
          </Button>
        </div>
      </div>
    </div>
  )
}
