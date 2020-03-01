import React from 'react'
import ToolbarButton from './ToolbarButton'
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined'

const EndnoteButton = React.forwardRef(
  (props, ref) => (
  <ToolbarButton icon={<CallToActionOutlinedIcon />} type="other" tooltip="Add endnote" format="endnote" ref={ref} {...props} />
  )
)
export default EndnoteButton  