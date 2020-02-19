import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Box } from '@material-ui/core'

export function createRichEditor() {
  return withComments(withFootnotes(withHistory(withReact(createEditor()))))
}

export function RichSlate({
  value,
  createRichEditor,
  onChangeValue,
  displayToolbar,
  displayHoverToolbar,
  toolbarButtons,
  comments,
  footnotes,
  onChangeComment,
  onChangeFootnote,
  extendRenderElement,
  extendRenderLeaf,
  customToolbarButtons,
  editorId,
  autoFocus,
  children,
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

// Editor to have comments as inline element
const withComments = editor => {
  const { isInline } = editor

  editor.isInline = element => {
    return element.type === 'comment' ? true : isInline(element)
  }

  return editor
}

// Editor to have footnotes as inline element
const withFootnotes = editor => {
  const { isInline, isVoid, insertText } = editor

  editor.isInline = element => {
    return element.type === 'footnote' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'footnote' ? true : isVoid(element)
  }

  return editor
}
