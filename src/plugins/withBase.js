
import MaterialEditor from '../slate/MaterialEditor'
import { Range } from 'slate'
import { Transforms } from 'slate'

/**
 * 
 * Base plugin for Material Editor.
 * 
 * All other plugins assume this plugin exists and has been included.
 * 
 * @param {Editor} editor 
 */
const withBase = editor => {

  /**
   * Is the current editor selection a range, that is the focus and the anchor are different?
   * 
   * @returns {boolean} true if the current selection is a range.
   */
  editor.isSelectionExpanded = () => {
    return editor.selection ? Range.isExpanded(editor.selection) : false
  }

  editor.isSelectionCollapsed = () => {
    return ! editor.isSelectionExpanded()
  }

  editor.isFocused = () => {
    return editor.selection === null
  }
  /**
   * Unwraps any node of `type` within the current selection.
   * 
   */
  editor.unwrapNode = type => {
    Transforms.unwrapNodes(editor, { match: n => n.type === type })
  }

  /**
   * 
   * @param {string} type type of node to be checked. Example: `comment`, `numbered-list`
   * 
   * @returns {bool} true if within current selection there is a node of type `type`
   */
  editor.isNodeTypeActive = type => {
    const [node] = MaterialEditor.nodes(editor, { match: n => n.type === type })
    return !!node
  }

  /**
   * Variable for holding a selection may be forgotten.
   */
  editor.rememberedSelection = {}

  /**
   * Gets current selection and stores it in rememberedSelection.
   * 
   * This may be useful when you need to open a dialog box and the editor loses the focus 
   */
  editor.rememberCurrentSelection = () => {
    editor.rememberedSelection = editor.selection
  }

  /**
   * Is the current selection collapsed?
   */
  editor.isCollapsed = () => {
    const { selection } = editor
    console.log('selection', selection)
    return selection && Range.isCollapsed(selection)
  }

  /**
   * Wraps a selection with an argument. If `wrapSelection` is not passed
   * uses current selection
   * 
   * Upon wraping moves the cursor to the end.
   * 
   * @param {Node} node the node to be added
   * @param {Selection} wrapSelection selection of the text that will be wrapped with the node.
   * 
   */
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

  /**
   * Removes the nodes that are not in the list.
   * 
   * It will search for all the nodes of `type` in the editor and will keep only
   * the ones in the nodesToKeep.
   * 
   * It assumes each item of nodesToKeep has an attribute `id`. This attribute will be the discriminator.  
   * 
   */
  editor.syncExternalNodes = (type, nodesToKeep, unwrap = true) => {
    //extracts the id from the nodes and removes those that are not in the list
    if (unwrap) { 
      editor.unwrapNotInList(type, nodesToKeep.map( node => node.id))
    } else {
      editor.removeNotInList(type, nodesToKeep.map( node => node.id))
    }
  }
  
  /**
   * 
   */
  editor.removeNotInList = (type, listOfIds) => {
    Transforms.removeNodes(editor, { 
      match: n => (n.type === type) && (! listOfIds.includes(n.id)),
      at: [] //Search the whole editor content 
     })
  }

  /**
   * 
   * Unwraps the nodes of `type` whose ids are not in the provided list
   * 
   * It assumes the nodes of `type` have an attribute `id`. The `id` may be a number or string.
   * 
   * @param {string} type node type to be searched. Example: `comment`
   * @param {Array} listOfIds Array with the list of ids. Example: [1, 2, 3].
   */
  editor.unwrapNotInList = (type, listOfIds) => {

    // const matcher = n => {
    //   let condition = (n.type === type) && (! listOfIds.includes(n.id))
    //   console.log(`matcher ${n.type} ${n.id} ${condition}`)
    //   return (n.type === type) && (! listOfIds.includes(n.id))
    // }
    // Transforms.unwrapNodes(editor, { 
    //   match: matcher,
    //   at: [] 
    // })
    
     Transforms.unwrapNodes(editor, { 
       match: n => (n.type === type) && (! listOfIds.includes(n.id)),
       at: [] //Search the whole editor content 
      })
  }
  
  /**
   * Gets from current editor content the list of items of a particular type
   */
  editor.findNodesByType = (type) => {
    const list = MaterialEditor.nodes(editor, {
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

export default withBase