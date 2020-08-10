import { useContext } from "react"
import { ClockContext } from "context/ClockProvider"

export default () => {
  return useContext(ClockContext)
}
