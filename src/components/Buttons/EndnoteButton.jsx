import React from 'react'
import { useSlate } from 'slate-react'
import ToolbarButton from './ToolbarButton'
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined'

const EndnoteButton = React.forwardRef(
  (props, ref) => { 
    const editor = useSlate()

    //Only is enabled if there is some text selected
    const isDisabled = () => {
      return editor.isSelectionExpanded()
    }
    return (
      <ToolbarButton icon={<CallToActionOutlinedIcon />} type="other" disabled={isDisabled()} tooltip="Add endnote" format="endnote" ref={ref} {...props} />
    )
  }
)
export default EndnoteButton  