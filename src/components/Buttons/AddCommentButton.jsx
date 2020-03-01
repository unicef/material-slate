import React from 'react'
import ToolbarButton from './ToolbarButton'
import AddCommentIcon from '@material-ui/icons/AddComment'

const AddCommentButton = React.forwardRef(
  (props, ref) => (
  <ToolbarButton icon={<AddCommentIcon />} type="other" tooltip="Add comment" format="comment" ref={ref} {...props} />
  )
)
export default AddCommentButton  