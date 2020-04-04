import React from 'react'
import ToolbarButton from './ToolbarButton'
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined'

const EndnoteButton = React.forwardRef(
  (props, ref) => { 
    return (
      <ToolbarButton 
        icon={<CallToActionOutlinedIcon />} 
        type="other" 
        disableOnSelection={true} 
        tooltip="Add endnote" 
        format="endnote" 
        ref={ref} 
        {...props} />
    )
  }
)
export default EndnoteButton  