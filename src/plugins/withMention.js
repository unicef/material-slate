import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

/**
 * TODO: this should be in unicef material slate
 *
 * @param {Object} editor editor for the library
 */
const withMention = editor => {
  const { isInline, isVoid } = editor
  const MENTION_TYPE = 'mention'

  /**
   * Overwrite to indicate `mention` nodes are inline
   */
  editor.isInline = element => {
    return element.type === MENTION_TYPE ? true : isInline(element)
  }

  /**
   * Overwrite to indicate `mention` nodes are void
   */
  editor.isVoid = element => {
    return element.type === MENTION_TYPE ? true : isVoid(element)
  }

  /**
   *
   * @param {*} text Label text to display
   * @param {*} text Label text to display
   * Inserts the mention within the body of the editor
   */
  editor.insertMention = (identifier, text) => {
    const mention = {
      type: 'mention',
      identifier,
      children: [{ text: `${text} ` }],
    }
    Transforms.insertNodes(editor, mention)
    // Transforms.move(editor)
    ReactEditor.focus(editor)
    Transforms.move(editor)
  }

  /**
   *
   * @param {Object} target Target range
   * @param {String|Number} identifier Unique identifier for the mention (eg. id, email , etc..)
   * @param {*} text Label text to display
   * Select and insert a new mention within the body of the editor
   */
  editor.selectAndInsert = (target, identifier, text) => {
    Transforms.select(editor, target)
    editor.insertMention(identifier, text)
  }

  return editor
}

export default withMention
