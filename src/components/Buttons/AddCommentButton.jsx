import React from 'react'
import ToolbarButton from './ToolbarButton'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined'

const AddCommentButton = React.forwardRef(
  (props, ref) => {
    return (
      <ToolbarButton 
        icon={<AddCommentOutlinedIcon />} 
        type="other" 
        disableOnCollapse={true} 
        tooltip="Add comment" 
        format="comment" 
        ref={ref} 
        {...props} />
    )
  }
)
export default AddCommentButton  