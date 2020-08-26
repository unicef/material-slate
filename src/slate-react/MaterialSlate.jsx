import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Slate } from 'slate-react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    borderColor: theme.palette.grey[400],
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
  },
  focused: {
    borderColor: theme.palette.primary.main,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
}))

/**
 * Rich Slate
 *
 * It is the provider of the useSlate hook.
 *
 *
 */
export default function MaterialSlate({
  value,
  editor,
  onChange,
  children,
  className,
  focusClassName,
}) {
  const classes = useStyles()
  const [isFocused, setIsFocused] = useState(false)
  return (
    <Box
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      className={`${classes.root} ${isFocused &&
        (focusClassName ? focusClassName : classes.focused)} ${className}`}
    >
      <Slate value={value} editor={editor} onChange={value => onChange(value)}>
        {children}
      </Slate>
    </Box>
  )
}

MaterialSlate.propTypes = {
  /** editor created using createRichEditor() */
  editor: PropTypes.object.isRequired,
  /** content to display in the editor*/
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Called every time there is a change on the value */
  onChange: PropTypes.func,
  /** class to override and style the slate  */
  className: PropTypes.string,
  /** className to apply when the editor has focus */
  focusClassName: PropTypes.string,
}
