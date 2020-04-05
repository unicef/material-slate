import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'

/**
 * Toolbar button for numbered list block
 * 
 * @see ToolbarButton
 */

const NumberedListButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatListNumbered />} type="block" format="numbered-list" ref={ref} {...props} />
  )
)
export default NumberedListButton  