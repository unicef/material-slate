import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({ 
  comment: {
    backgroundColor: '#e1f5fe',
    cursor: 'pointer'
  }
}))

/* const CommentElement = React.forwardRef(
  (props, ref) => ({children, attributes, element, className }) => {

  const classes = useStyles()
  return ( 
    <Tooltip title={element.commentText?? "Empty commet"} {...attributes}>>
      <span className={className? className : classes.comment}> {children}</span>
    </Tooltip>
  )
})
*/

const CommentElement = ({element, children, attributes}) => {
  console.log(element)
  const classes = useStyles()
  return(
    <Tooltip title={`Comment: ${element.commentText}`} >
    <span className={classes.comment} title={element.commentText} {...attributes}>{children}</span>
    </Tooltip>

  )
}

export default CommentElement