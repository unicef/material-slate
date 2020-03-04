import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatBold  from '@material-ui/icons/FormatBold'

const BoldButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatBold />} type="mark" format="bold" ref={ref} {...props} />
  )
)
export default BoldButton  