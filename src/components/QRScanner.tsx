// PATH: src/components/QRScanner.tsx
'use client'

import dynamic from 'next/dynamic'
import type { QrScannerProps } from '@yudiel/react-qr-scanner'

const Scanner = dynamic<QrScannerProps>(
  () => import('@yudiel/react-qr-scanner').then(m => m.Scanner),
  { ssr: false }
)

export default function QRScanner({ onResult }: { onResult: (text: string) => void }) {
  return (
    <Scanner
      onDecode={onResult}
      onError={() => {}}
      constraints={{ video: { facingMode: 'environment' } }}
    />
  )
}
