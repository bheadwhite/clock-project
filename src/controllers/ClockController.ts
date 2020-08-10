import StatefulSubject from "./StatefulSubject"

const handle59 = (current: number) => {
  if (current === 59) {
    return 0
  } else {
    return current + 1
  }
}
const handle12 = (current: number) => {
  if (current === 12) {
    return 1
  } else {
    return current + 1
  }
}

export default class ClockController {
  private time: Date
  private hour: StatefulSubject<number>
  private minute: StatefulSubject<number>
  private second: StatefulSubject<number>
  private secondsInterval: NodeJS.Timeout

  constructor() {
    this.time = new Date()
    this.second = new StatefulSubject(this.time.getSeconds())
    this.minute = new StatefulSubject(this.time.getMinutes())
    this.hour = new StatefulSubject(this.time.getHours())
    this.secondsInterval = setInterval(() => {
      const second = this.second.getState()
      const nextSecond = handle59(second)
      this.second.next(nextSecond)
      if (nextSecond === 0) {
        const minute = this.minute.getState()
        const nextMinute = handle59(minute)
        console.log("firing next minute")
        this.minute.next(nextMinute)
        if (nextMinute === 0) {
          const hour = this.hour.getState()
          const nextHour = handle12(hour)
          this.hour.next(nextHour)
        }
      }
    }, 1000)
  }

  //public methods
  getSeconds() {
    return this.second.getState()
  }
  getMinute() {
    return this.minute.getState()
  }
  getHour() {
    return this.hour.getState()
  }

  //hooks
  onSecondsChange(callback: (seconds: number) => void) {
    return this.second.subscribe({
      next: callback,
    })
  }
  onMinuteChange(callback: (seconds: number) => void) {
    return this.minute.subscribe({
      next: callback,
    })
  }
  onHourChange(callback: (seconds: number) => void) {
    return this.hour.subscribe({
      next: callback,
    })
  }

  //context
  dispose() {
    clearInterval(this.secondsInterval)
    this.second.complete()
    this.minute.complete()
    this.hour.complete()
  }
}
