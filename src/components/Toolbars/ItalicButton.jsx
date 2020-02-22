import React from 'react'
import ToolbarButton from './ToolbarButton'
import { FormatItalicOutlined } from '@material-ui/icons'

const ItalicButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatItalicOutlined />} mark="italic" ref={ref} {...props} />
  )
)
export default ItalicButton  