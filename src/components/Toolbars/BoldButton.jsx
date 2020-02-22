import React from 'react'
import MarkButton from './MarkButton'
import { FormatBold } from '@material-ui/icons'

const BoldButton = React.forwardRef(
  (props, ref) => (
    <MarkButton icon={<FormatBold />} mark="bold" ref={ref} {...props} />
  )
)
export default BoldButton  