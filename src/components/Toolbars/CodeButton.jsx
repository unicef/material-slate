import React from 'react'
import ToolbarButton from './ToolbarButton'

const CodeButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton mark="code" ref={ref} {...props} />
  )
)
export default CodeButton  