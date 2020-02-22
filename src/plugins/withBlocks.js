import RichEditor from '../helpers/RichEditor'
import { Transforms } from 'slate'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const withBlocks = editor => {
  /**
   * checks if a block is active
   */
  editor.isBlockActive = (block) => {
    const [match] = RichEditor.nodes(editor, {
      match: n => n.type === block,
    })
    return !!match
  }
  editor.toggleBlock = (block) => {
    const isActive = editor.isBlockActive(block)
    const isList = LIST_TYPES.includes(block)

    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true,
    })

    //TODO this cannot be generalized??
    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : block,
    })

    if (!isActive && isList) {
      const selected = { type: block, children: [] }
      Transforms.wrapNodes(editor, selected)
    }
  }
  return editor
}

export default withBlocks