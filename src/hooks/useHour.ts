import { useMemo, useEffect, useState } from "react"
import useClockController from "./useClockController"

const useHour = () => {
  const controller = useClockController()
  const [hour, setHour] = useState<number>(controller.getHour())

  const subscription = useMemo(
    () =>
      controller.onHourChange((nextHour) => {
        setHour(nextHour)
      }),
    [controller]
  )

  useEffect(() => {
    return () => subscription.unsubscribe()
  }, [subscription])

  return hour
}

export default useHour
