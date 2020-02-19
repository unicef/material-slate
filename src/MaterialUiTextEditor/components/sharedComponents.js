import React from 'react'
import ReactDOM from 'react-dom'
import { IconButton } from '@material-ui/core'
import { cx, css } from 'emotion'

export const RichSlateButton = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <IconButton {...props} ref={ref} color={active ? 'primary' : 'default'} />
  )
)

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
  <Menu
    {...props}
    ref={ref}
    className={css`
      padding: 8px 7px 6px;
      position: absolute;
      z-index: 1200;
      margin-top: -48px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid rgba(0, 103, 181, 1);
      transition: opacity 0.75s;
    `}
  />
))
