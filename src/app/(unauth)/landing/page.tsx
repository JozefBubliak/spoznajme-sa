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
          OtĂˇzky, ktorĂ© prehlbujĂş vzĹĄahy. S partnerom, rodinou aj priateÄľmi.
        </p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>đźŽŻ 10 otĂˇzok zadarmo â€“ bez registrĂˇcie</p>
          <p>đź—“ď¸Ź 2 novĂ© otĂˇzky denne â€“ po prihlĂˇsenĂ­</p>
          <p>đź”“ 8000+ otĂˇzok a extra funkcie â€“ po jednorazovej Ăşhrade</p>
        </div>
        <div className="space-y-4 mt-6">
          <Button
            className="bg-purple-600 hover:bg-purple-700 w-full text-white"
            onClick={() => router.push('/free')}
          >
            VyskĂşĹˇaĹĄ zdarma
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            PrihlĂˇsiĹĄ sa a zĂ­skaĹĄ 2 otĂˇzky denne
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => router.push('/upgrade')}
          >
            OdomknĂşĹĄ vĹˇetko za 6,99 â‚¬
          </Button>
        </div>
        <p className="text-xs text-gray-400 pt-2">
          JednorazovĂˇ platba, neobmedzenĂ˝ prĂ­stup. NavĹľdy.
        </p>
      </div>
    </div>
  )
}
