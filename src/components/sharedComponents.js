import React from 'react'
import ReactDOM from 'react-dom'
import { cx, css } from 'emotion'

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
