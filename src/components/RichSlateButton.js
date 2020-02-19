import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'

const RichSlateButton = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <IconButton
      {...props}
      className={className}
      ref={ref}
      color={active ? 'primary' : 'default'}
    />
  )
)

export default RichSlateButton

// PropTypes
RichSlateButton.propTypes = {
  /** className */
  className: PropTypes.object,
  /** To make button look active */
  active: PropTypes.bool,
}
