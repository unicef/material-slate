import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import isHotkey from 'is-hotkey'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { HoveringToolbar } from './components/HoverToolbar'
import { toggleMark } from './components/ToolbarButtons'
import { Toolbar } from './components/Toolbar'
import { CommentElement } from './components/Comments'
// import Footnote from './components/footnotes/Footnote'

// To enable rich text with keys
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export default function UEditor({
  value,
  onChangeValue,
  toolbar,
  hoveringToolbar,
  toolbarButtons,
  onChangeComment,
  parentRenderElement,
  parentRenderLeaf,
  customToolbarButtons,
  editorId,
}) {
  const [initialValue, setValue] = useState(value)
  const renderElement = useCallback(props => Element(props), [])
  const renderLeaf = useCallback(props => Leaf(props), [])
  const editor = useMemo(
    () => withComments(withFootnotes(withHistory(withReact(createEditor())))),
    []
  )

  // On change value
  function handleChangeValue(value) {
    onChangeValue(value)
    setValue(value)
  }

  // Block level elements
  const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'comment':
        return (
          <CommentElement {...attributes} comments={[]}>
            {children}
          </CommentElement>
        )
      case 'footnote':
        return <Footnote {...attributes}>{children}</Footnote>
      default:
        return parentRenderElement ? (
          parentRenderElement({ attributes, children, element })
        ) : (
          <p {...attributes}>{children}</p>
        )
    }
  }

  function Footnote(props) {
    const { attributes, footnotes, children } = props

    return (
      <React.Fragment>
        {children} <sup>2</sup>
      </React.Fragment>
    )
  }

  // Leaf inline elements
  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.code) {
      children = <code>{children}</code>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.underline) {
      children = <u>{children}</u>
    }

    return parentRenderLeaf ? (
      parentRenderLeaf({ attributes, children, leaf })
    ) : (
      <span {...attributes}>{children}</span>
    )
  }

  // comments to pass to parent
  function handleComments(value) {
    return onChangeComment(value)
  }

  return (
    <Slate editor={editor} value={initialValue} onChange={handleChangeValue}>
      {hoveringToolbar && (
        <HoveringToolbar
          editorId={editorId}
          toolbarButtons={toolbarButtons}
          customToolbarButtons={customToolbarButtons}
          onChangeComment={value => handleComments(value)}
        />
      )}
      {toolbar && (
        <Toolbar
          editorId={editorId}
          toolbarButtons={toolbarButtons}
          customToolbarButtons={customToolbarButtons}
          onChangeComment={value => handleComments(value)}
        />
      )}
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
        placeholder="Enter some text..."
      />
    </Slate>
  )
}

// PropTypes
UEditor.propTypes = {
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
  /** Hover toolbar */
  hoveringToolbar: PropTypes.bool,
  /** Toolbar on top of editor*/
  toolbar: PropTypes.bool,
  /**To add custom buttons totoolbar */
  customToolbarButtons: PropTypes.fun,
  /** parentRenderLeaf is to add our own inline elements to editor*/
  parentRenderLeaf: PropTypes.func,
  /** parentRenderElement is to add our own block level elements to editor*/
  parentRenderElement: PropTypes.func,
}

// Default props
UEditor.defaultProps = {
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
  const { isInline } = editor

  editor.isInline = element => {
    return element.type === 'footnote' ? true : isInline(element)
  }

  return editor
}
