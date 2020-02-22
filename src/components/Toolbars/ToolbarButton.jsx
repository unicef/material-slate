import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, Tooltip } from '@material-ui/core'
import { RadioButtonUnchecked } from '@material-ui/icons'

/** 
 * ToolbarButton is the base button for the toolbar. Based on the `active` status it shows a different look and feel.  
 * 
 * It has a tooltip
 */
const ToolbarButton = React.forwardRef(
  ({ tooltip, active, icon, placement, ...props }, ref) => (
    <Tooltip title={tooltip && tooltip} placement={placement}>
      <IconButton
        aria-label={tooltip}
        ref={ref}
        color={active ? 'secondary' : 'default'}
        {...props}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
)

export default ToolbarButton

ToolbarButton.defaultProps = {
  placement: 'top',
  icon: <RadioButtonUnchecked />
}

// PropTypes
ToolbarButton.propTypes = {
  /** Text displayed on the tooltip. It is required for supporting accessibility. */
  tooltip: PropTypes.string.isRequired,
  /** Location where the tooltip will appear. It can be `top`, `bottom`, `left`, `right`. Defaults to top. */
  placement: PropTypes.string,
  /** Boolean that indicates if the button is pressed or not. */
  active: PropTypes.bool,
  /* Icon typically from @material-ui/icons */
  icon: PropTypes.object
}