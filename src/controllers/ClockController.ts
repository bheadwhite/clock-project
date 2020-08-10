import StatefulSubject from "./StatefulSubject"

export default class ClockController {
  time: Date
  seconds: StatefulSubject<number>
  secondsInterval: NodeJS.Timeout

  constructor() {
    this.time = new Date()
    this.seconds = new StatefulSubject(this.time.getSeconds())
    this.secondsInterval = setInterval(() => {
      let seconds = this.seconds.getState()
      if (seconds === 59) {
        this.seconds.next(0)
      } else {
        this.seconds.next(seconds++)
      }
    }, 1000)
  }

  getSeconds() {
    return this.seconds
  }

  onSecondsChange(callback: (seconds: number) => void) {
    return this.seconds.subscribe({
      next: callback,
    })
  }

  dispose() {
    clearInterval(this.secondsInterval)
    this.seconds.complete()
  }
}
