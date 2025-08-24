import { useEffect } from 'react'

interface KeyboardShortcuts {
  onSpace?: () => void      // Guessed
  onArrowRight?: () => void // Skip
  onKeyS?: () => void       // Start/Pause timer
  onEnter?: () => void      // Next round
  onKeyR?: () => void       // Reset/New game
  onEscape?: () => void     // Pause/Stop
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      // Prevent default behavior for our shortcuts
      const preventDefault = () => {
        event.preventDefault()
        event.stopPropagation()
      }

      switch (event.code) {
        case 'Space':
          if (shortcuts.onSpace) {
            preventDefault()
            shortcuts.onSpace()
          }
          break
        case 'ArrowRight':
          if (shortcuts.onArrowRight) {
            preventDefault()
            shortcuts.onArrowRight()
          }
          break
        case 'KeyS':
          if (shortcuts.onKeyS) {
            preventDefault()
            shortcuts.onKeyS()
          }
          break
        case 'Enter':
          if (shortcuts.onEnter) {
            preventDefault()
            shortcuts.onEnter()
          }
          break
        case 'KeyR':
          if (shortcuts.onKeyR) {
            preventDefault()
            shortcuts.onKeyR()
          }
          break
        case 'Escape':
          if (shortcuts.onEscape) {
            preventDefault()
            shortcuts.onEscape()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [shortcuts, enabled])
}