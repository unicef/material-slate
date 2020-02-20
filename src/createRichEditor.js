import { withReact } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

/**
 * @version 1.0.1
 * Create's a Slate editor object that won't change across renders.
 * In order to use existing editor of Material ui text editor, importing it and pass it as editor prop in RichSlate.
 */
export default function createRichEditor() {
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

    return withComments(withFootnotes(withHistory(withReact(createEditor()))))
  }
}
