import React from 'react'
import ToolbarButton from './ToolbarButton'
import LinkIcon from '@material-ui/icons/Link'

/**
 * Toolbar button for adding links
 *
 * @see ToolbarButton
 */
const LinkButton = React.forwardRef((props, ref) => {
  return (
    <ToolbarButton
      icon={<LinkIcon />}
      type="link"
      tooltip="Add link"
      format="link"
      ref={ref}
      {...props}
    />
  )
})

export default LinkButton
