import RichEditor from '../helpers/RichEditor'
import { Transforms } from 'slate'

 /**
  * There are situations in which you need to sync and manage some marks
  * from outside the editor and then sync them back.
  * 
  * Comments are a very good example. You want to allow users to comment inline in the editor
  * but you may also want to have a view in which you display and manage all the comments that are in the document managed by
  * the editor (somewhat the same as Google Docs does). 
  * 
  * Another use case are endnotes. You want user to be able to add endnotes but you may also give the user control of 
  * these endnotes outside of the editor. 
  * 
  * @param {Editor} editor 
  */
const witSyncedMarks= editor => {
  /**
   * Initializes the external collection as an empty object on creation time.
   * 
   */
  editor.external = {}

  /**
   * Search for collection
   * 
   * It will search on the 
   * 
   * @param {string} collectionName Name of the collection to sync
   * 
   */
  editor.syncNodes = (type, newData) => {
    //Check if collection
    if (typeOf (editor.external[collectionType]) === 'undefined') {
      //create an empty collection
      editor.external[collectionType] = []
    }
    //Current collection
    collection = editor.external[collectionType] 
    //For each item in new collection search for it by key.
    // 
      
    }
  }
  
  /**
   * Gets from current editor content the list of items of a particular type
   */
  editor.findNodes = (type) => {
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

  return editor
}

export default withBlocks