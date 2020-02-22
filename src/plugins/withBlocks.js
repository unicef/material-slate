import RichEditor from '../helpers/RichEditor'

const withBlocks = editor => {
  /**
   * checks if a block is active
   */
  editor.isBlockActive = (format) => {
    const [match] = RichEditor.nodes(editor, {
      match: n => n.type === format,
    })
    return !!match
  }
  return editor
}

export default withBlocks