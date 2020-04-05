import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatUnderlined  from '@material-ui/icons/FormatUnderlined'

/**
 * Toolbar button for underlined text mark
 * 
 * @see ToolbarButton
 */
const UnderlinedButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatUnderlined />} type="mark" format="underlined" ref={ref} {...props} />
  )
)
export default UnderlinedButton  