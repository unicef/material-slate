import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'

/**
 * Toolbar button for numbered list block
 *
 * @see ToolbarButton
 */

const NumberedListButton = React.forwardRef((props, ref) => (
  <ToolbarButton
    icon={<FormatListNumberedIcon />}
    type="block"
    format="numbered-list"
    ref={ref}
    {...props}
  />
))
export default NumberedListButton
