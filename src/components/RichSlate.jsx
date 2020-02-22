import PropTypes from 'prop-types'
import React from 'react'
import { Slate } from 'slate-react'
import { Box } from '@material-ui/core'

/**
 * Rich Slate
 * 
 * It is the provider of the useSlate hook.
 * 
 * 
 */
export default function RichSlate({ value, editor, onChange, children, className }) {
  return (
    <Slate value={value} editor={editor} onChange={(value) => onChange(value)} >
      <Box className={className}>{children}</Box>
    </Slate>
  )
}

RichSlate.propTypes = {
  /** editor created using createRichEditor() */
  editor: PropTypes.object.isRequired,
  /** content to display in the editor*/
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Called every time there is a change on the value */
  onChange: PropTypes.func,
}