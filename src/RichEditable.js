import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import isHotkey from 'is-hotkey'
import { Editable, useSlate } from 'slate-react'
import { Editor, Transforms } from 'slate'
import { toggleMark } from './components/ToolbarButtons'
import { CommentElement } from './components/Comments'
import Footnote from './components/Footnote'

// To enable rich text with keys
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}
/** The RichEditable component acts like contenteditable. Anywhere you render it will render an editable richtext document for the nearest editor context. */
export default function RichEditable({
  comments,
  footnotes,
  onChangeComment,
  onChangeFootnote,
  extendRenderElement,
  extendRenderLeaf,
  autoFocus,
  onKeyDown,
  style,
  className,
  ...props
}) {
  const editor = useSlate()
  const renderElement = useCallback(props => Element(props), [
    footnotes,
    comments,
  ])
  // const [editorFocus, setEditorFocus] = useState(autoFocus)
  const renderLeaf = useCallback(props => Leaf(props), [])

  useEffect(() => {
    const footnotesInEditor = getListByFormat('footnote')
    // If there is difference in footnotes in editor and state
    if (footnotes.length !== footnotesInEditor.length) {
      // Find the removed footnote
      let removedFootnotes = footnotesInEditor.filter(
        obj => !footnotes.some(element => element.id === obj.id)
      )

      // Remove from editor
      removedFootnotes.map(footnote => {
        Transforms.removeNodes(editor, {
          at: [],
          match: n => n.id === footnote.id,
        })
      })
    }
  }, [footnotes])

  useEffect(() => {
    const commentsInEditor = getListByFormat('comment')
    // If there is difference in footnotes in editor and state
    if (comments.length !== commentsInEditor.length) {
      // Find the removed comment
      let removedComments = commentsInEditor.filter(
        obj => !comments.some(element => element.id === obj.id)
      )

      // unwrap from editor
      removedComments.map(comment => {
        Transforms.unwrapNodes(editor, {
          at: [],
          match: n => n.id === comment.id,
        })
      })
    }
  }, [comments])

  // To get list of format exists in editor
  function getListByFormat(format) {
    const list = Editor.nodes(editor, {
      match: n => n.type === format,
      at: [],
    })

    // List in editor with path and node
    const listWithNodesAndPath = Array.from(list)
    // List with node (element)
    const listWithNodes = listWithNodesAndPath.map(item => {
      return item[0]
    })
    return listWithNodes
  }

  // Block level elements
  const Element = ({ attributes, element, children, ...props }) => {
    //on change in footnote
    function handleChangeFootnote(value) {
      onChangeFootnote && onChangeFootnote(value)
    }

    // on change in comment
    function handleChangeComment(value) {
      onChangeComment && onChangeComment(value)
    }

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
          <CommentElement
            attributes={attributes}
            comments={comments}
            element={element}
            onChangeComment={value => handleChangeComment(value)}
            {...props}
          >
            {children}
          </CommentElement>
        )
      case 'footnote':
        return (
          <Footnote
            attributes={attributes}
            footnotes={footnotes}
            element={element}
            onChangeFootnote={value => handleChangeFootnote(value)}
            {...props}
          >
            {children}
          </Footnote>
        )
      default:
        return extendRenderElement ? (
          extendRenderElement({ attributes, children, element })
        ) : (
          <p {...attributes}>{children}</p>
        )
    }
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

    return extendRenderLeaf ? (
      extendRenderLeaf({ attributes, children, leaf })
    ) : (
      <span {...attributes}>{children}</span>
    )
  }

  return (
    <Editable
      renderElement={props => renderElement(props)}
      renderLeaf={props => renderLeaf(props)}
      onKeyDown={event => {
        for (const hotkey in HOTKEYS) {
          if (isHotkey(hotkey, event)) {
            event.preventDefault()
            const mark = HOTKEYS[hotkey]
            toggleMark(editor, mark)
          }
        }
        onKeyDown && onKeyDown()
      }}
      placeholder="Enter some text..."
      {...props}
    />
  )
}

// PropTypes
RichEditable.propTypes = {
  /** className*/
  className: PropTypes.object,
  /** styles */
  style: PropTypes.object,
  /**list comments in the editor */
  comments: PropTypes.array,
  /**list footnotes in the editor */
  footnotes: PropTypes.array,
  /** on comment change */
  onChangeComment: PropTypes.func,
  /** on footnote change */
  onChangeFootnote: PropTypes.func,
  /** extendRenderLeaf is to add our own inline elements to editor*/
  extendRenderLeaf: PropTypes.func,
  /** extendRenderElement is to add our own block level elements to editor*/
  extendRenderElement: PropTypes.func,
}
