// PATH: src/components/QRScanner.tsx
'use client'
import dynamic from 'next/dynamic'

const QrScanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then(m => m.QrScanner),
  { ssr: false }
)

export default function QRScanner({ onResult }: { onResult: (text: string) => void }) {
  return <QrScanner onDecode={onResult} onError={() => {}} constraints={{ facingMode: 'environment' }} />
}
