import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, Tooltip } from '@material-ui/core'

/** RichSlateButton is the rich utils buttons displayed inside the toolbar
 *
 */
const RichSlateButton = React.forwardRef(
  ({ className, title, active, reversed, ...props }, ref) => (
    <Tooltip title={title && title}>
      <IconButton
        {...props}
        className={className}
        ref={ref}
        color={active ? 'primary' : 'default'}
      />
    </Tooltip>
  )
)

export default RichSlateButton

// PropTypes
RichSlateButton.propTypes = {
  /** className */
  className: PropTypes.object,
  /** Title */
  title: PropTypes.string,
  /** To make button look active */
  active: PropTypes.bool,
}
