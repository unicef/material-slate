import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { initialValue } from './data'
import isHotkey from 'is-hotkey'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { HoveringToolbar } from './components/HoverToolbar'
import { toggleMark } from './components/SlateRendering'
import { Toolbar } from './components/Toolbar'
// import Footnote from './components/footnotes/Footnote'
import { wrapFootnote, wrapComment } from './components/SlateRendering'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export default function UEditor({ toolbarButtons }) {
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback(props => Element(props), [])
  const renderLeaf = useCallback(props => Leaf(props), [])
  const editor = useMemo(
    () => withComments(withFootnotes(withHistory(withReact(createEditor())))),
    []
  )

  const Element = ({ attributes, children, element }) => {
    // console.log(element)
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
        return <p {...attributes}>{children}</p>
      // parentRenderElement({ attributes, children, element })
    }
  }

  function CommentElement(props) {
    const { attributes, children } = props
    console.log(props)

    return (
      <span {...attributes} style={{ backgroundColor: 'yellow' }}>
        {children}
      </span>
    )
  }

  function Footnote(props) {
    const { attributes, footnotes, children } = props
    console.log(props)

    return (
      <span {...attributes}>
        {children}
        <sup>2</sup>
      </span>
    )
  }

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

    return <span {...attributes}>{children}</span>
  }

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <HoveringToolbar toolbarButtons={toolbarButtons} />
      <Toolbar toolbarButtons={toolbarButtons} />
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

UEditor.propTypes = {
  /** content to display in the editor*/
  value: PropTypes.arrayOf(PropTypes.object),
  /** on change value */
  onChangeValue: PropTypes.func,
  /** format Buttons to display on toolbar  */
  toolbarButtons: PropTypes.arrayOf(PropTypes.object),
}

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
  ],
}

const withComments = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'comment' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapComment(editor, text, 'comment')
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapComment(editor, text, 'comment')
    } else {
      insertData(data)
    }
  }

  return editor
}

const withFootnotes = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'footnote' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapFootnote(editor, text, 'footnote')
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapFootnote(editor, text, 'footnote')
    } else {
      insertData(data)
    }
  }

  return editor
}
