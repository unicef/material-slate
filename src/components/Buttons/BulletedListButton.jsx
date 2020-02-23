import React from 'react'
import ToolbarButton from './ToolbarButton'
import {FormatListBulleted} from '@material-ui/icons'

const BulletedListButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatListBulleted />} block="bulleted-list" ref={ref} {...props} />
  )
)
export default BulletedListButton  