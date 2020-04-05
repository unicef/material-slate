import React from 'react'
import ToolbarButton from './ToolbarButton'
import FormatListBulleted from '@material-ui/icons/FormatListBulleted'

/**
 * Toolbar button for underlined text mark
 * 
 * @see ToolbarButton
 * 
 */
const BulletedListButton = React.forwardRef(
  (props, ref) => (
    <ToolbarButton icon={<FormatListBulleted />} type="block" format="bulleted-list" ref={ref} {...props} />
  )
)
export default BulletedListButton  