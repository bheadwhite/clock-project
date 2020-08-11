import StatefulSubject from "./StatefulSubject"

const handle59 = (current: number, init: boolean = false): string => {
  if ((current === 59 && init) || current === 59) {
    return handleLessThan10(0)
  } else if (init) {
    return handleLessThan10(current)
  } else {
    return handleLessThan10(current + 1)
  }
}
const handle12 = (current: number, init: boolean = false) => {
  if ((current > 12 && init) || current > 12) {
    const num = current - 12
    return handleLessThan10(num)
  } else if (init) {
    return handleLessThan10(current)
  } else {
    return handleLessThan10(current + 1)
  }
}

const handleLessThan10 = (num: number): string => {
  if (num < 10) {
    return "0" + num
  } else {
    return num.toString()
  }
}

export default class ClockController {
  private time: Date
  private hour: StatefulSubject<string>
  private minute: StatefulSubject<string>
  private second: StatefulSubject<string>
  private secondsInterval: NodeJS.Timeout

  constructor() {
    this.time = new Date()
    this.second = new StatefulSubject(handle59(this.time.getSeconds(), true))
    this.minute = new StatefulSubject(handle59(this.time.getMinutes(), true))
    this.hour = new StatefulSubject(handle12(this.time.getHours(), true))
    this.secondsInterval = setInterval(() => {
      const second = this.second.getState()
      const nextSecond = handle59(Number(second))
      this.second.next(nextSecond)
      if (nextSecond === "00") {
        const minute = this.minute.getState()
        const nextMinute = handle59(Number(minute))
        this.minute.next(nextMinute)
        if (nextMinute === "00") {
          const hour = this.hour.getState()
          const nextHour = handle12(Number(hour))
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
  onSecondsChange(callback: (seconds: string) => void) {
    return this.second.subscribe({
      next: callback,
    })
  }
  onMinuteChange(callback: (seconds: string) => void) {
    return this.minute.subscribe({
      next: callback,
    })
  }
  onHourChange(callback: (seconds: string) => void) {
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
