'use client'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'info' | 'error'
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'error' ? '#ff4d4f' : '#1e90ff',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        zIndex: 9999
      }}
    >
      {message}
    </div>
  )
}
