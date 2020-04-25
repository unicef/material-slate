import { createEditor } from 'slate'

// slate plugins
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'

// Import material editor plugins
import withBase from '../plugins/withBase'
import withMarks  from '../plugins/withMarks'
import withBlocks from '../plugins/withBlocks'

/**
 * Creates a RichText editor.
 * 
 * Includes the following plugins
 *  - withBlocks
 *  - withMarks
 *  - withBase
 *  - withHistory
 *  - withReact
 * 
 * @param {string} editorId Optional unique identifier in case you have more than one editor. Defaults to default.
 * @public
 */
export default function createMaterialEditor(editorId = "default") {
  const editor = 
      withBlocks( 
        withMarks(
          withBase( 
            withHistory(
              withReact(
                createEditor()
              )
            )
          )
        )
      )
  editor.editorId=editorId
  return editor
}