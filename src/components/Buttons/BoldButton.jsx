import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatBold from '@mui/icons-material/FormatBold'

/**
 * Toolbar button for bold text mark
 *
 * @see ToolbarButton
 */

const BoldButton = React.forwardRef((props, ref) => (
  <ToolbarButton
    icon={<FormatBold />}
    type="mark"
    format="bold"
    ref={ref}
    {...props}
  />
))
export default BoldButton
