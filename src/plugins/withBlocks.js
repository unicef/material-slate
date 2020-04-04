import MaterialEditor from '../slate/MaterialEditor'
import { Transforms } from 'slate'


const withBlocks = editor => {
  editor.LIST_TYPES = ['numbered-list', 'bulleted-list']

  /**
   * checks if a block is active
   */
  editor.isBlockActive = (block) => {
    const [match] = MaterialEditor.nodes(editor, {
      match: n => n.type === block,
    })
    return !!match
  }

  editor.toggleBlock = (block) => {
    const isActive = editor.isBlockActive(block)
    const isList = editor.LIST_TYPES.includes(block)

    Transforms.unwrapNodes(editor, {
      match: n => editor.LIST_TYPES.includes(n.type),
      split: true,
    })

    //TODO cannot this be generalized??
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