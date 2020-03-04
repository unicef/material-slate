import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  comment: {
    backgroundColor: '#e1f5fe',
    cursor: 'pointer'
  }
}))


const CommentElement = ({ element, onClick, children, attributes }) => {
  console.log(element)
  const classes = useStyles()
  return (
    <Tooltip title={`Comment: ${element.body}`} >
      <span className={classes.comment} {...attributes} onClick={(event) => onClick({ event, element })}>{children}</span>
    </Tooltip>
  )
}

export default CommentElement