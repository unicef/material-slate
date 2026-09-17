import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined'

/**
 * Toolbar button for italic text mark
 *
 * @see ToolbarButton
 */

const ItalicButton = React.forwardRef((props, ref) => (
  <ToolbarButton
    icon={<FormatItalicOutlinedIcon />}
    type="mark"
    format="italic"
    ref={ref}
    {...props}
  />
))
export default ItalicButton
