import { Node } from 'slate'
/**
 *
 * Counter plugin for Material Slate.
 *
 * @param {Editor} editor
 */
const withCounter = editor => {
  /**
   * Returns the chars length
   */
  editor.getCharLength = nodes => {
    return nodes.map(n => Node.string(n)).join('\n').length
  }

  /**
   * Returns the words length
   */
  editor.getWordsLength = nodes => {
    return nodes
      .map(n => Node.string(n))
      .join('\n')
      .split(' ').length
  }

  /**
   * Returns the paragraphs length
   */
  editor.getParagraphLength = nodes => {
    return nodes
      .map(n => Node.string(n))
      .join('\n')
      .split(/\r\n|\r|\n/).length
  }

  return editor
}

export default withCounter
