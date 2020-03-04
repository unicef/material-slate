

import MaterialEditor from '../helpers/MaterialEditor'
import {Range} from 'slate'
import { Transforms } from 'slate'


const withComments = editor => {

  const { isInline } = editor

  editor.isInline = element => {
    return element.type === 'comment' ? true : isInline(element)
  }

  /**
   *  If the editor loses focus upon pressing the `AddCommentButtoncall`, you need to call editor.rememberCurrentSelection() before the 
   * editor loses the focus  
   * 
   * `data` cannot contain the following items: id, type or children.
   */ 
  editor.addComment = (id, attributes) => {
    const node = {
      id: id,
      type: 'comment',
      children: [], 
      ...attributes //any data of the comment will be an attribute.
    } 
    console.log('addcomment node to be added: ', node)
    console.log('addComment: rememberedSelection:', editor.rememberedSelection)
    editor.wrapNode(node, editor.selection || editor.rememberedSelection)
  }

  editor.unwrapNode = type => {
    Transforms.unwrapNodes(editor, { match: n => n.type === type })
  }

  editor.isNodeTypeActive = type => {
    const [node] = MaterialEditor.nodes(editor, { match: n => n.type === type })
    return !!node
  }

  editor.rememberedSelection = {}

  editor.rememberCurrentSelection = () => {
    editor.rememberedSelection = editor.selection
  }

  editor.isCollapsed = () => {
    const { selection } = editor
    console.log('selection', selection)
    return selection && Range.isCollapsed(selection)
  }

  editor.wrapNode = (node, wrapSelection = null ) => {
    
    //if wrapSelecion is passed => we use it. Use editor selection in other case
    editor.selection = wrapSelection ?  wrapSelection : editor.selection
     
    // if the node is already wrapped with current node we unwrap it first.
    if (editor.isNodeTypeActive(node.type)) {
      editor.unwrapNode(node.type)
    }
    // if there is no text selected => insert the node.
    if (editor.isCollapsed()) {
      Transforms.insertNodes(editor, node)
    } else {
      //text is selected => add the node
      
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
