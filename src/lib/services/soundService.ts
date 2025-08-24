declare global {
  interface Window {
    // staršie Safari
    webkitAudioContext?: {
      new (contextOptions?: AudioContextOptions): AudioContext
      prototype: AudioContext
    }
  }
}

export class SoundService {
  private static audioContext: AudioContext | null = null
  private static volume = 0.7
  private static enabled = true

  static init(): void {
    try {
      if (typeof window === "undefined") return

      const AudioCtx:
        | (new (contextOptions?: AudioContextOptions) => AudioContext)
        | undefined = window.AudioContext ?? window.webkitAudioContext

      if (!AudioCtx) {
        console.warn("AudioContext nie je v tomto prehliadači dostupný")
        return
      }

      this.audioContext = new AudioCtx()
    } catch (error) {
      console.warn("AudioContext nepodporovaný:", error)
    }
  }

  static setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  static setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  private static playTone(frequency: number, duration: number, volume?: number): void {
    if (!this.enabled || !this.audioContext) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      const finalVolume = (volume ?? this.volume) * 0.1 // Keep it subtle
      gainNode.gain.setValueAtTime(finalVolume, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.start()
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.warn('Failed to play sound:', error)
    }
  }

  static playWarning(seconds: number): void {
    const frequencies = {
      3: 800,
      2: 900,
      1: 1000,
    }
    
    const frequency = frequencies[seconds as keyof typeof frequencies] || 800
    this.playTone(frequency, 0.2)
  }

  static playTimeUp(): void {
    // Play a more dramatic sound for time up
    this.playTone(400, 0.5)
    setTimeout(() => this.playTone(350, 0.5), 200)
  }

  static playSuccess(): void {
    // Pleasant ascending tone for correct guess
    this.playTone(523, 0.1) // C
    setTimeout(() => this.playTone(659, 0.1), 100) // E
    setTimeout(() => this.playTone(784, 0.2), 200) // G
  }

  static playSkip(): void {
    // Neutral tone for skip
    this.playTone(440, 0.15)
  }

  static playGameStart(): void {
    // Energetic start sound
    this.playTone(659, 0.1)
    setTimeout(() => this.playTone(784, 0.1), 100)
    setTimeout(() => this.playTone(1047, 0.2), 200)
  }

  static playRoundEnd(): void {
    // Completion sound
    this.playTone(523, 0.2)
    setTimeout(() => this.playTone(659, 0.2), 150)
    setTimeout(() => this.playTone(784, 0.3), 300)
  }

  static vibrate(pattern: number | number[]): void {
    if (typeof window !== 'undefined' && navigator.vibrate && this.enabled) {
      try {
        navigator.vibrate(pattern)
      } catch (error) {
        // Vibration not supported
      }
    }
  }
}

// Initialize on module load
if (typeof window !== 'undefined') {
  SoundService.init()
}