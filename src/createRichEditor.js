import { withReact } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

export default function createRichEditor() {
  return withComments(withFootnotes(withHistory(withReact(createEditor()))))
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
  const { isInline, isVoid } = editor

  editor.isInline = element => {
    return element.type === 'footnote' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'footnote' ? true : isVoid(element)
  }

  return editor
}
