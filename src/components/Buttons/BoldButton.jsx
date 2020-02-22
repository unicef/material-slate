import React from 'react'
import ToolbarButton from './ToolbarButton'
import { FormatBold } from '@material-ui/icons'

const BoldButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatBold />} mark="bold" ref={ref} {...props} />
  )
)
export default BoldButton  