import React from 'react'
import ToolbarButton from './ToolbarButton'
import {FormatListNumbered} from '@material-ui/icons'

const NumberedListButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatListNumbered />} block="numbered-list" ref={ref} {...props} />
  )
)
export default NumberedListButton  