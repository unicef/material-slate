import React from 'react'
import ToolbarButton from './ToolbarButton'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'

/**
 * Toolbar button for strike through text mark
 *
 * @see ToolbarButton
 */

const StrikethroughButton = React.forwardRef((props, ref) => (
  <ToolbarButton
    icon={<StrikethroughSIcon />}
    type="mark"
    format="strikethrough"
    ref={ref}
    {...props}
  />
))
export default StrikethroughButton
