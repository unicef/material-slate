

import MaterialEditor from '../helpers/MaterialEditor'
import {Range} from 'slate'
import { Transforms } from 'slate'


const withComments = editor => {

  const { isInline } = editor

  editor.isInline = element => {
    return element.type === 'comment' ? true : isInline(element)
  }

  editor.addComment = (id, data) => {
    const node = {
      id: id,
      type: 'comment',
      data: data,
      children: [{text: 'comentario'}]
    }
    console.log(node)
    editor.wrapNode(node)
  }

  editor.unwrapNode = type => {
    Transforms.unwrapNodes(editor, { match: n => n.type === type })
  }

  editor.isNodeTypeActive = type => {
    const [node] = MaterialEditor.nodes(editor, { match: n => n.type === type })
    return !!node
  }

  editor.comment = {}

  editor.startAddComment = () => {
    editor.comment.selection = editor.selection
  }

  editor.isCollapsed = () => {
    const { selection } = editor
    console.log('selection', selection)
    return selection && Range.isCollapsed(selection)
  }

  editor.wrapNode = (node) => {
    console.log(editor)
    editor.selection = editor.comment.selection
    if (editor.isNodeTypeActive(node.type)) {
      unwrapNode(node.type)
    }
    
    if (editor.isCollapsed()) {
      Transforms.insertNodes(editor, node)
    } else {
      console.log("wrapNode")
      console.log(editor.children)
      Transforms.wrapNodes(editor, node, { split: true })
      console.log("editor", editor.children)
      Transforms.collapse(editor, { edge: 'end' })
    }
  }

  editor.syncComments = (newData) => {
    editor.syncElements('comment', newData)
  }

  return editor

}
export default withComments
