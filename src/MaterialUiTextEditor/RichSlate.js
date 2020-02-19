import React, { useCallback, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import isHotkey from 'is-hotkey'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Editor, Transforms } from 'slate'
import { withHistory } from 'slate-history'

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
      {children}
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
  /** format Buttons to display on toolbar  */
  toolbarButtons: PropTypes.arrayOf(PropTypes.object),
  /** on comment change */
  onChangeComment: PropTypes.func,
  /** on footnote change */
  onChangeFootnote: PropTypes.func,
  /** Hover toolbar */
  displayHoverToolbar: PropTypes.bool,
  /** Toolbar on top of editor*/
  displayToolbar: PropTypes.bool,
  /**To add custom buttons totoolbar */
  customToolbarButtons: PropTypes.fun,
  /** parentRenderLeaf is to add our own inline elements to editor*/
  parentRenderLeaf: PropTypes.func,
  /** parentRenderElement is to add our own block level elements to editor*/
  parentRenderElement: PropTypes.func,
}

// Default props
RichSlate.defaultProps = {
  toolbarButtons: [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Mark', format: 'underline' },
    { type: 'Mark', format: 'code' },
    { type: 'Block', format: 'bulleted-list' },
    { type: 'Block', format: 'numbered-list' },
    { type: 'Block', format: 'heading-one' },
    { type: 'Block', format: 'heading-two' },
    { type: 'Comment', format: 'comment' },
    { type: 'Footnote', format: 'footnote' },
  ],
  hoveringToolbar: true,
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
