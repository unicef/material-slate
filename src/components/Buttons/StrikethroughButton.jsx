import React from 'react'
import ToolbarButton from './ToolbarButton'
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';

const StrikethroughButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<StrikethroughSIcon />} mark="strikethrough" ref={ref} {...props} />
  )
)
export default StrikethroughButton  