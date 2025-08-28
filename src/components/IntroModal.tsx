'use client'
import { useState } from 'react'

interface IntroModalProps {
  onClose: () => void
}

export default function IntroModal({ onClose }: IntroModalProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: 'white',
          color: '#111',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '500px',
          textAlign: 'center'
        }}
      >
        <h2>👋 Vitaj v hre „Spoznajme sa“</h2>
        <p>Táto hra prebieha v 3 jednoduchých krokoch:</p>
        <ol style={{ textAlign: 'left' }}>
          <li>Vytvor miestnosť a pozvi hráčov (QR alebo link)</li>
          <li>Nastav kolá (témy, otázky, čas)</li>
          <li>Spusti hru a sleduj, kto vás pozná najlepšie!</li>
        </ol>
        <button
          onClick={() => {
            setVisible(false)
            onClose()
          }}
          style={{
            marginTop: '1rem',
            background: '#1e90ff',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '8px'
          }}
        >
          🎮 Začať
        </button>
      </div>
    </div>
  )
}
