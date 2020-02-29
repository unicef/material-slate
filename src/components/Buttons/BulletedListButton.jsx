import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatListBulleted from '@material-ui/icons/FormatListBulleted'

const BulletedListButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatListBulleted />} type="block" format="bulleted-list" ref={ref} {...props} />
  )
)
export default BulletedListButton  