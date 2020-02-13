import React from 'react'
import { Transforms, Editor, Range } from 'slate'
import { useSlate } from 'slate-react'
import { Button } from './components'
// import { CommentButton } from './Comments'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
} from '@material-ui/icons'
import AddCommentIcon from '@material-ui/icons/AddComment'
import CodeIcon from '@material-ui/icons/Code'
import ListIcon from '@material-ui/icons/List'
import LooksOne from '@material-ui/icons/LooksOne'
import LooksTwo from '@material-ui/icons/LooksTwo'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const ToolbarButtons = ({
  toolbarButtons,
  customToolbarButtons,
  wrapLink,
  ...props
}) => {
  return (
    <React.Fragment>
      {toolbarButtons.map(({ type, format, icon }) =>
        type === 'Mark' ? (
          <MarkButton key={format} format={format}>
            {icon ? icon : <Icon format={format} />}
          </MarkButton>
        ) : (
          <BlockButton key={format} format={format}>
            {icon ? icon : <Icon format={format} />}
          </BlockButton>
        )
      )}
      <CommentButton key={'comment'} format="comment" {...props}>
        <AddCommentIcon />
      </CommentButton>
      <FootnoteButton key={'footnote'} format="footnote" {...props}>
        <PlaylistAddIcon />
      </FootnoteButton>
      {customToolbarButtons}
    </React.Fragment>
  )
}

const Icon = ({ format }) => {
  switch (format) {
    case 'bold':
      return <FormatBold />
    case 'code':
      return <CodeIcon />
    case 'italic':
      return <FormatItalic />
    case 'underline':
      return <FormatUnderlined />
    case 'block-quote':
      return <FormatQuote />
    case 'bulleted-list':
      return <FormatListBulleted />
    case 'heading-one':
      return <LooksOne />
    case 'heading-two':
      return <LooksTwo />
    case 'list-item':
      return <ListIcon />
    case 'numbered-list':
      return <FormatListNumbered />
    default:
      return
  }
}

export const BlockButton = ({ format, children }) => {
  const editor = useSlate()

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {children}
    </Button>
  )
}

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const MarkButton = ({ format, children }) => {
  const editor = useSlate()

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {children}
    </Button>
  )
}

// Comments
const insertComment = (editor, url, format) => {
  if (editor.selection) {
    wrapComment(editor, url, format)
  }
}

export const wrapComment = (editor, url, format) => {
  if (isFormatActive(editor, format)) {
    unwrapFormat(editor, format)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'comment',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const CommentButton = ({ format, children }) => {
  const editor = useSlate()
  return (
    <Button
      active={isFormatActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertComment(editor, url, format)
      }}
    >
      {children}
    </Button>
  )
}

// Footnotes
const isFormatActive = (editor, format) => {
  const [active] = Editor.nodes(editor, { match: n => n.type === format })
  return !!active
}

const unwrapFormat = (editor, format) => {
  Transforms.unwrapNodes(editor, { match: n => n.type === format })
}

const insertFootnote = (editor, text, format) => {
  if (editor.selection) {
    wrapFootnote(editor, text, format)
  }
}

export const wrapFootnote = (editor, url, format) => {
  if (isFormatActive(editor, format)) {
    unwrapFormat(editor, format)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'footnote',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.collapse(editor, { edge: 'end' })
    Transforms.wrapNodes(editor, link, { split: true })
  }
}

const FootnoteButton = ({ format, children }) => {
  const editor = useSlate()
  return (
    <Button
      active={isFormatActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        const text = window.prompt('Enter the URL of the link:')
        if (!text) return
        insertFootnote(editor, text, format)
      }}
    >
      {children}
    </Button>
  )
}
