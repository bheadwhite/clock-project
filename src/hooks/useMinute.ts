import { useMemo, useEffect, useState } from "react"
import useClockController from "./useClockController"

const useMinute = () => {
  const controller = useClockController()
  const [minute, setMinute] = useState<string>(controller.getMinute())

  const subscription = useMemo(
    () =>
      controller.onMinuteChange((nextMinute) => {
        return setMinute(nextMinute)
      }),
    [controller]
  )

  useEffect(() => {
    return () => subscription.unsubscribe()
  }, [subscription])

  return minute
}

export default useMinute
