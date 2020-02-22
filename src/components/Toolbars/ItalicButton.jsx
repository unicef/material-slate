import React from 'react'
import MarkButton from './MarkButton'
import { FormatItalicOutlined } from '@material-ui/icons'

const ItalicButton = React.forwardRef(
  (props, ref) => (
    <MarkButton icon={<FormatItalicOutlined />} mark="italic" ref={ref} {...props} />
  )
)
export default ItalicButton  