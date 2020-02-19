import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { IconButton } from '@material-ui/core'
import { cx, css } from 'emotion'

export const RichSlateButton = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <IconButton
      {...props}
      className={className}
      ref={ref}
      color={active ? 'primary' : 'default'}
    />
  )
)

// PropTypes
RichSlateButton.propTypes = {
  /** className */
  className: PropTypes.object,
  /** To make button look active */
  active: PropTypes.bool,
}

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }

        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
))

export const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body)
}

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu {...props} ref={ref} className={cx(className, css``)} />
))
