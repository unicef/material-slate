import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
  },
}))

/**
 * Displays a super index text with the index number of the endnote.
 * A tooltip with the content of the endnote is displayed if the user hovers the endnote.
 *
 * Expects the `element` prop to have `element.data.value` the text of the endnote (string) and
 * `element.data.index` the index number fo the endnote.
 *
 * If `onClick` prop is set it is called if user clicks the tex
 */
const EndnoteElement = ({ element, onClick, attributes, children }) => {
  const classes = useStyles()
  return (
    <Tooltip placement="top" title={`${element.data.value}`}>
      <sup
        className={classes.root}
        {...attributes}
        onClick={event => onClick && onClick({ event, element })}
      >
        {element.data.index || 'x'}
        {children}
      </sup>
    </Tooltip>
  )
}

export default EndnoteElement
