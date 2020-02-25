import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatUnderlined  from '@material-ui/icons/FormatUnderlined'

const UnderlinedButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatUnderlined />} mark="underlined" ref={ref} {...props} />
  )
)
export default UnderlinedButton  