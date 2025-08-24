'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TimerRingProps {
  seconds: number
  totalSeconds: number
  running?: boolean
  size?: number
  strokeWidth?: number
  className?: string
  showText?: boolean
  onEnd?: () => void
}

export function TimerRing({
  seconds,
  totalSeconds,
  running = false,
  size = 120,
  strokeWidth = 8,
  className,
  showText = true,
  onEnd,
}: TimerRingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevSecondsRef = useRef(seconds)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = (size - strokeWidth) / 2

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Calculate progress
    const progress = totalSeconds > 0 ? seconds / totalSeconds : 0
    const angle = (2 * Math.PI * progress) - Math.PI / 2

    // Background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = 'hsl(var(--muted))'
    ctx.lineWidth = strokeWidth
    ctx.stroke()

    // Progress arc
    if (progress > 0) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle)
      
      // Color based on time remaining
      let color = 'hsl(var(--primary))'
      if (seconds <= 10) {
        color = 'hsl(var(--destructive))'
      } else if (seconds <= 30) {
        color = 'hsl(var(--warning))'
      }
      
      ctx.strokeStyle = color
      ctx.lineWidth = strokeWidth
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    // Pulse effect when time is low
    if (seconds <= 10 && running && seconds > 0) {
      const pulseIntensity = 1 + (0.2 * Math.sin(Date.now() / 200))
      canvas.style.transform = `scale(${pulseIntensity})`
    } else {
      canvas.style.transform = 'scale(1)'
    }

    // Check for end condition
    if (prevSecondsRef.current > 0 && seconds === 0) {
      onEnd?.()
    }
    prevSecondsRef.current = seconds

  }, [seconds, totalSeconds, running, size, strokeWidth, onEnd])

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60)
    const remainingSeconds = secs % 60
    return minutes > 0 
      ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
      : remainingSeconds.toString()
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <canvas
        ref={canvasRef}
        className="transition-transform duration-200"
        style={{ width: size, height: size }}
      />
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className={cn(
              'font-bold text-foreground transition-colors duration-200',
              seconds <= 10 && running ? 'text-destructive' : 'text-primary',
              size > 100 ? 'text-2xl' : 'text-lg'
            )}
          >
            {formatTime(seconds)}
          </span>
        </div>
      )}
    </div>
  )
}