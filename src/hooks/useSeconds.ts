import useClockController from "./useClockController"
import { useEffect, useState, useMemo } from "react"

const useSeconds = () => {
  const controller = useClockController()
  const [seconds, setSeconds] = useState<number>(controller.getSeconds())

  const subscription = useMemo(
    () =>
      controller.onSecondsChange((changedSeconds) => {
        return setSeconds(changedSeconds)
      }),
    [controller]
  )

  useEffect(() => {
    return () => subscription.unsubscribe()
  }, [subscription])

  return seconds
}

export default useSeconds
