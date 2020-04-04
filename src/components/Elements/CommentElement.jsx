import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e1f5fe',
    cursor: 'pointer'
  }
}))

const CommentElement = ({ element, onClick, children, attributes }) => {
  const classes = useStyles()
  return (
    <Tooltip title={`Comment: ${element.data.body}`} >
      <span className={classes.root} {...attributes} onClick={(event) => onClick && onClick({ event, element })}>{children}</span>
    </Tooltip>
  )
}

export default CommentElement