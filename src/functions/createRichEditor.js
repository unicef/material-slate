import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'

export default function createRichEditor(editorId = 0) {
  return withHistory(withReact(createEditor()))
}
