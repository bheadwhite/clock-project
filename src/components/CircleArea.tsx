import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  CircleArea: {
    background: "green",
    height: "100%",
    width: "100%",
    borderRadius: "100%",
  },
}))

const CircleArea = () => {
  const classes = useStyles()
  return <div className={classes.CircleArea}></div>
}

export default CircleArea
