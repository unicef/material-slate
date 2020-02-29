import MaterialEditor from '../helpers/MaterialEditor'
import { Transforms } from 'slate'

 /**
  * There are situations in which you need to sync and manage some element contents
  * from outside the editor and then sync them back.
  * 
  * Comments are a very good example. You want to allow users to comment inline in the editor
  * but you may also want to have a view in which you display and manage all the comments that are in the document managed by
  * the editor (somewhat the same as Google Docs does). 
  * 
  * Another use case are endnotes. You want user to be able to add endnotes but you may also give the user control of 
  * these endnotes outside of the editor. 
  * 
  * Note that what is synced is the metadata, not the contents of the noded. For example, in a comment, the comment itself, 
  * not the text 
  * 
  * @param {Editor} editor 
  */
const withSyncedElements= editor => {
  
  /**
   * newData is an array with objects that conform the following format: 
   * ```
   *    id: { any object that holds the data that eventually may need to be displayed by the editor }
   *  }
   * ```
   * 
   */
  editor.syncNodes = (type, newData) => {
    //search notes
    //Compare node by node if it is in the new data
    editorNodes = editor.findNodesByType(type)
  }
  
  /**
   * Gets from current editor content the list of items of a particular type
   */
  editor.findNodesByType = (type) => {
    const list = RichEditor.nodes(editor, {
      match: n => n.type === type,
      at: [],
    })
    // List in editor with path and node
    const listWithNodesAndPath = Array.from(list)
    // List with node (element)
    const listWithNodes = listWithNodesAndPath.map(item => {
      return item[0]
    })
    return listWithNodes
  }

  /**
   * 
   */
  editor.wrapNode = (type, id, data) => {

  }

  return editor
}

export default withSyncedElements