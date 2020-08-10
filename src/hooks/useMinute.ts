import { useMemo, useEffect, useState } from "react"
import useClockController from "./useClockController"

const useMinute = () => {
  const controller = useClockController()
  const [minute, setMinute] = useState<number>(controller.getMinute())

  const subscription = useMemo(
    () =>
      controller.onHourChange((nextMinute) => {
        setMinute(nextMinute)
      }),
    [controller]
  )

  useEffect(() => {
    return () => subscription.unsubscribe()
  }, [subscription])

  return minute
}

export default useMinute
