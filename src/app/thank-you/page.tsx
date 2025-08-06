
'use client'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { BrainIcon } from 'lucide-react'

export default function ThankYouPage() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('paid', 'true')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl p-10 text-center space-y-4 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-green-600 flex justify-center gap-2 items-center">
          <BrainIcon /> Ďakujeme za podporu!
        </h1>
        <p className="text-gray-700">
          Tvoja plná verzia je aktívna. Môžeš teraz využívať všetky otázky a funkcie bez obmedzení.
        </p>

        <Button onClick={() => navigate('/app')} className="mt-4 w-full">
          Pokračovať do aplikácie
        </Button>
      </div>
    </div>
  )
}
