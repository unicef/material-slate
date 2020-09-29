import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e1f5fe',
    cursor: 'pointer',
  },
}))

/**
 * Renders a Comment.
 *  1. Adds blueish background to the text the comment wraps
 *  2. On hover displays the comment.
 *
 *  If `onClick` is passed, it is called if the text wrapped by the comment is clicked.
 *
 *  Expects the `element` object passed as prop to have `element.data.body` to display the comment text.
 *
 */
const CommentElement = ({
  element,
  onClick,
  className,
  children,
  attributes,
}) => {
  const classes = useStyles()
  return (
    <Tooltip title={`Comment: ${element.data.body}`}>
      <span
        className={`${classes.root} ${className}`}
        {...attributes}
        onClick={event => onClick && onClick({ event, element })}
      >
        {children}
      </span>
    </Tooltip>
  )
}

export default CommentElement
