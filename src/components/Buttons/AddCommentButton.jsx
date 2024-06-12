import React from 'react'
import ToolbarButton from './ToolbarButton'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'

/**
 * Toolbar button for adding comments.
 *
 * The button is disabled on collapse.
 *
 * @see ToolbarButton
 */

const AddCommentButton = React.forwardRef((props, ref) => {
  return (
    <ToolbarButton
      icon={<AddCommentOutlinedIcon />}
      type="other"
      disableOnCollapse={true}
      tooltip="Add comment"
      format="comment"
      ref={ref}
      {...props}
    />
  )
})
export default AddCommentButton
