import React from 'react'
import ToolbarButton from './ToolbarButton'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined'

const AddCommentButton = React.forwardRef(
  (props, ref) => (
  <ToolbarButton icon={<AddCommentOutlinedIcon />} type="other" tooltip="Add comment" format="comment" ref={ref} {...props} />
  )
)
export default AddCommentButton  