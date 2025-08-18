export class TimerService {
  private static instances = new Map<string, TimerService>()
  
  private intervalId: NodeJS.Timeout | null = null
  private onTick?: (timeLeft: number) => void
  private onEnd?: () => void
  private onWarning?: (seconds: number) => void
  private timeLeft = 0
  private isRunning = false

  private constructor(private id: string) {}

  static getInstance(id: string = 'default'): TimerService {
    if (!this.instances.has(id)) {
      this.instances.set(id, new TimerService(id))
    }
    return this.instances.get(id)!
  }

  start(
    seconds: number, 
    callbacks: {
      onTick?: (timeLeft: number) => void
      onEnd?: () => void
      onWarning?: (seconds: number) => void
    } = {}
  ): void {
    this.stop()
    
    this.timeLeft = seconds
    this.onTick = callbacks.onTick
    this.onEnd = callbacks.onEnd
    this.onWarning = callbacks.onWarning
    this.isRunning = true

    // Immediate tick
    this.onTick?.(this.timeLeft)

    this.intervalId = setInterval(() => {
      this.timeLeft -= 1
      this.onTick?.(this.timeLeft)

      // Warning sounds at 3, 2, 1 seconds
      if ([3, 2, 1].includes(this.timeLeft) && this.onWarning) {
        this.onWarning(this.timeLeft)
      }

      if (this.timeLeft <= 0) {
        this.stop()
        this.onEnd?.()
      }
    }, 1000)
  }

  pause(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
      this.isRunning = false
    }
  }

  resume(): void {
    if (!this.isRunning && this.timeLeft > 0) {
      this.start(this.timeLeft, {
        onTick: this.onTick,
        onEnd: this.onEnd,
        onWarning: this.onWarning,
      })
    }
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.isRunning = false
  }

  getTimeLeft(): number {
    return this.timeLeft
  }

  getIsRunning(): boolean {
    return this.isRunning && this.intervalId !== null
  }

  setTimeLeft(seconds: number): void {
    this.timeLeft = seconds
    this.onTick?.(this.timeLeft)
  }

  destroy(): void {
    this.stop()
    TimerService.instances.delete(this.id)
  }

  static destroyAll(): void {
    this.instances.forEach(instance => instance.destroy())
    this.instances.clear()
  }
}