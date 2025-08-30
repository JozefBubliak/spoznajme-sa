declare module '@yudiel/react-qr-scanner' {
  import type { ComponentType } from 'react'

  export interface QrScannerProps {
    onDecode: (text: string) => void
    onError: (err: unknown) => void
    constraints?: MediaStreamConstraints
  }

  export const Scanner: ComponentType<QrScannerProps>
}
