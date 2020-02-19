import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Slate } from 'slate-react'
import { Box } from '@material-ui/core'

export default function RichSlate({
  value,
  children,
  createRichEditor,
  onChangeValue,
  className,
  ...props
}) {
  const [initialValue, setValue] = useState(value)
  const editor = useMemo(() => createRichEditor, [])

  // On change value
  function handleChangeValue(value) {
    onChangeValue(value)
    setValue(value)
  }

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={handleChangeValue}
      {...props}
    >
      <Box className={className}>{children}</Box>
    </Slate>
  )
}

// PropTypes
RichSlate.propTypes = {
  /** unique id of the editor */
  editorId: PropTypes.number,
  /** content to display in the editor*/
  value: PropTypes.arrayOf(PropTypes.object),
  /** on change value */
  onChangeValue: PropTypes.func,
}
