import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Slate } from 'slate-react'
import { Box } from '@material-ui/core'

/** RichSlate is context provider. it basically renders the Slate context. It must be render above any RichEditable component
 *
 * - Initially it requires value with slate json format
 * - Create's a Slate editor object that won't change across renders.
 * - In order to create and use existing editor of Material ui text editor
 * - import createRichEditor and pass it as editor prop in RichSlate. Ex:  editor ={createRichEditor}
 * - To extend editor to add new utils, wrap it with the createRichEditor. Ex: editor ={withLinks(createRichEditor)}
 * - <a href="https://github.com/unicef/material-ui-texteditor/blob/master/editor-example/src/App.js"> Example view source</a>
 */

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
  /** editor  to create slate */
  editor: PropTypes.object.isRequired,
  /** unique id of the editor */
  editorId: PropTypes.number,
  /** content to display in the editor*/
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** on change value */
  onChangeValue: PropTypes.func,
}
