import React from 'react'
import { useSlate } from 'slate-react'
import ToolbarButton from './ToolbarButton'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined'

const AddCommentButton = React.forwardRef(
  (props, ref) => {
    const editor = useSlate()

    /**
     * The comment button is disabled when the selection is collapsed (ie there is no selection)
     */
    const isDisabled = () => {
      return editor.isSelectionCollapsed()
    }

    return (
      <ToolbarButton icon={<AddCommentOutlinedIcon />} type="other" disabled={isDisabled()} tooltip="Add comment" format="comment" ref={ref} {...props} />
    )
  }
)
export default AddCommentButton  