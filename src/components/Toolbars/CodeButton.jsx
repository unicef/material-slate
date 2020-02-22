import React from 'react'
import MarkButton from './MarkButton'

const CodeButton = React.forwardRef(
  (props, ref) => (
    <MarkButton mark="code" ref={ref} {...props} />
  )
)
export default CodeButton  