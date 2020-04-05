import React from 'react'
import ToolbarButton from './ToolbarButton'
import CodeIcon from '@material-ui/icons/Code'

/**
 * Toolbar button for adding code mono-spaced text mark
 * 
 * @see ToolbarButton
 */

const CodeButton = React.forwardRef(
  (props, ref) => (
  <ToolbarButton icon={<CodeIcon />} type="mark" format="code" ref={ref} {...props} />
  )
)
export default CodeButton  