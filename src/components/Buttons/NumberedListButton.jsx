import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'

const NumberedListButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatListNumbered />} type="block" format="numbered-list" ref={ref} {...props} />
  )
)
export default NumberedListButton  