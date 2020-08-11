import { useMemo, useEffect, useState } from "react"
import useClockController from "./useClockController"

const useHour = () => {
  const controller = useClockController()
  const [hour, setHour] = useState<string>(controller.getHour())

  const subscription = useMemo(
    () =>
      controller.onHourChange((nextHour) => {
        return setHour(nextHour)
      }),
    [controller]
  )

  useEffect(() => {
    return () => subscription.unsubscribe()
  }, [subscription])

  return hour
}

export default useHour
