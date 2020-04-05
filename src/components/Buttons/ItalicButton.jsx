import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatItalicOutlined  from '@material-ui/icons/FormatItalicOutlined'

/**
 * Toolbar button for italic text mark
 * 
 * @see ToolbarButton
 */

const ItalicButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatItalicOutlined />} type="mark" format="italic" ref={ref} {...props} />
  )
)
export default ItalicButton  