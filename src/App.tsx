import React from "react"
import "./App.css"
import useSeconds from "hooks/useSeconds"
import useMinute from "hooks/useMinute"
import useHour from "hooks/useHour"

function App() {
  const second = useSeconds()
  const hour = useHour()
  const minute = useMinute()

  return <div className='clock-project'>{`${hour}:${minute}:${second}`}</div>
}

export default App
