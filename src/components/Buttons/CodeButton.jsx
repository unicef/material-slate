import React from 'react'
import ToolbarButton from './ToolbarButton'
import CodeIcon from '@material-ui/icons/Code'

const CodeButton = React.forwardRef(
  (props, ref) => (
  <ToolbarButton icon={<CodeIcon />} type="mark" format="code" ref={ref} {...props} />
  )
)
export default CodeButton  