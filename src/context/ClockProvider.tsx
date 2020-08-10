import React, { createContext, useMemo, useEffect } from "react"
import ClockController from "controllers/ClockController"

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

const controller = new ClockController()
export const ClockContext = createContext(controller)

const ClockProvider = ({ children }: IProps) => {
  const clockController = useMemo(() => new ClockController(), [])

  useEffect(() => {
    return () => clockController.dispose()
  }, [clockController])

  return (
    <ClockContext.Provider value={controller}>{children}</ClockContext.Provider>
  )
}

export default ClockProvider
