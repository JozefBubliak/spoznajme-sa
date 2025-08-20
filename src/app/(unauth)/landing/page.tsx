
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-purple-700">
          <Brain className="text-pink-500" /> Spoznajme sa
        </h1>

        <p className="text-gray-700">
          Otázky, ktoré prehlbujú vzťahy. S partnerom, rodinou aj priateľmi.
        </p>

        <div className="text-sm text-gray-600 space-y-1">
          <p>🎯 10 otázok zadarmo – bez registrácie</p>
          <p>🗓️ 2 nové otázky denne – po prihlásení</p>
          <p>🔓 8000+ otázok a extra funkcie – po jednorazovej úhrade</p>
        </div>

        <div className="space-y-4 mt-6">
          <Button
            className="bg-purple-600 hover:bg-purple-700 w-full text-white"
            onClick={() => router.push('/free')}
          >
            Vyskúšať zdarma
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Prihlásiť sa a získať 2 otázky denne
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => router.push('/upgrade')}
          >
            Odomknúť všetko za 6,99 €
          </Button>
        </div>

        <p className="text-xs text-gray-400 pt-2">
          Jednorazová platba, neobmedzený prístup. Navždy.
        </p>
      </div>
    </div>
  )
}
