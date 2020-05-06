import PropTypes from 'prop-types'
import React from 'react'
import { Slate } from 'slate-react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
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
}) {
  const classes = useStyles()
  return (
    <Slate value={value} editor={editor} onChange={value => onChange(value)}>
      <Box
        className={`${classes.root} ${className}`}
        borderRadius="borderRadius"
      >
        {children}
      </Box>
    </Slate>
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
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}
