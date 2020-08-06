import MaterialEditor from '../slate/MaterialEditor'
import { Range } from 'slate'
import { Transforms, Editor } from 'slate'
import { Node } from 'slate'
import { ReactEditor } from 'slate-react'
/**
 *
 * Base plugin for Material Slate.
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

  /**
   * Returns true if current selection is collapsed, that is there is no selection at all
   * (the focus and the anchor are the same).
   *
   * @returns {boolean} true if the selection is collapsed
   */
  editor.isSelectionCollapsed = () => {
    return !editor.isSelectionExpanded()
  }

  /**
   * Is the editor focused?
   * @returns {boolean} true if the editor has focus. */
  editor.isFocused = () => {
    return ReactEditor.isFocused(editor)
  }

  /**
   * Unwraps any node of `type` within the current selection.
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
    //console.log('selection', selection)
    return selection && Range.isCollapsed(selection)
  }

  /**
   * Wraps a selection with an argument. If `wrapSelection` is not passed
   * uses current selection
   *
   * Upon wrapping moves the cursor to the end.
   *
   * @param {Node} node the node to be added
   * @param {Selection} wrapSelection selection of the text that will be wrapped with the node.
   *
   */
  editor.wrapNode = (node, wrapSelection = null) => {
    //if wrapSelection is passed => we use it. Use editor selection in other case
    editor.selection = wrapSelection ? wrapSelection : editor.selection

    // if the node is already wrapped with current node we unwrap it first.
    if (editor.isNodeTypeActive(node.type)) {
      editor.unwrapNode(node.type)
    }
    // if there is no text selected => insert the node.
    //console.log(editor.selection)
    //console.log('isLocation', Location.isLocation(editor.selection))
    if (editor.isCollapsed()) {
      //console.log('is collapsed insertNodes')
      Transforms.insertNodes(editor, node)
    } else {
      //text is selected => add the node
      Transforms.wrapNodes(editor, node, { split: true })
      //console.log('editor', editor.children)
      Transforms.collapse(editor, { edge: 'end' })
    }
  }

  /**
   * Unwraps or removes the nodes that are not in the list.
   *
   * It will search for all the nodes of `type` in the editor and will keep only
   * the ones in the nodesToKeep.
   *
   * It assumes each item of nodesToKeep has an attribute `id`. This attribute will be the discriminator.
   *
   */
  editor.syncExternalNodes = (type, nodesToKeep, unwrap = true) => {
    //extracts the id from the nodes and removes those that are not in the list
    const listOfIds = nodesToKeep.map(node => node.id)

    if (unwrap) {
      editor.unwrapNotInList(type, listOfIds)
    } else {
      editor.removeNotInList(type, listOfIds)
    }
    const nodesToKeepObj = {}
    //Update values of nodes.data
    //Create a map by id of the nodes to keep
    nodesToKeep.forEach(node => (nodesToKeepObj[node.id] = node))
    //Find nodes of this type remaining in the editor
    const editorNodes = editor.findNodesByType(type)
    //Update them
    editorNodes.map(node => {
      Transforms.setNodes(
        editor,
        { data: nodesToKeepObj[node.id] },
        { match: n => n.id == node.id, at: [] }
      )
    })
  }

  /**
   * Removes the nodes that are not in the list of Ids
   *
   * Nodes of type `type` shall have the attribute/property `id`
   *
   * Example:
   * ```
   * {
   *    type: `comment`
   *    id: 30
   *    data: { ... }
   *  }
   * ```
   */
  editor.removeNotInList = (type, listOfIds) => {
    Transforms.removeNodes(editor, {
      match: n => n.type === type && !listOfIds.includes(n.id),
      at: [], //Search the whole editor content
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
    Transforms.unwrapNodes(editor, {
      match: n => n.type === type && !listOfIds.includes(n.id),
      at: [], //Search the whole editor content
    })
  }

  /**
   * Gets from current editor content the list of items of a particular type
   */
  editor.findNodesByType = type => {
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
    //console.log('fondNodesByType ', listWithNodes)
    return listWithNodes
  }

  /**
   * Returns the serialized value (plain text)
   */
  editor.serialize = nodes => {
    return nodes.map(n => Node.string(n)).join('\n')
  }

  /**
   * Functions similar to syncExternalNodes,and also updates the node temporaryId with original id and data
   *
   * First, It will search for match in temporaryId's in nodesToKeep with id's of nodes and updates it with latest data
   * Then, updates data in node id's matching with nodesToKeep id's
   *
   * Unwraps or removes the nodes that are not in the list.
   */
  editor.syncExternalNodesWithTemporaryId = (
    type,
    nodesToKeep,
    unwrap = true
  ) => {
    //extracts the id from the nodes and removes those that are not in the list
    const listOfIds = nodesToKeep.map(node => node.id)

    const nodesToKeepObj = {}
    //Update values of nodes.data
    //Create a map by id of the nodes to keep
    nodesToKeep.forEach(node => (nodesToKeepObj[node.id] = node))
    //Find nodes of this type remaining in the editor
    const editorNodes = editor.findNodesByType(type)
    //Update them
    editorNodes.map(node => {
      // Find the key of node to update
      const key = Object.keys(nodesToKeepObj).find(
        key => nodesToKeepObj[key].temporaryId === node.id
      )

      // node to Update with original Id and data
      const nodeToUpdate = nodesToKeepObj[key]
      // If node.id exists
      if (nodesToKeepObj[node.id] && !nodeToUpdate) {
        Transforms.setNodes(
          editor,
          { data: nodesToKeepObj[node.id] },
          { match: n => n.id == node.id, at: [0] }
        )
        // TemporaryId and data will be replaced with new id and data
      } else if (key && nodeToUpdate) {
        Transforms.setNodes(
          editor,
          { id: nodeToUpdate.id, data: nodeToUpdate },
          { match: n => n.id == nodeToUpdate.temporaryId, at: [] }
        )
      } else if (unwrap) {
        // unwraps the nodes in not list
        editor.unwrapNotInList(type, listOfIds)
      } else {
        // removes the nodes in not list
        editor.removeNotInList(type, listOfIds)
      }
    })
  }
  /**
   * Is to get the selected plain text from the editor.selection
   *
   * @returns {string} selected text
   */
  editor.getSelectedText = () => {
    return MaterialEditor.string(editor, editor.rememberedSelection)
  }

  return editor
}

export default withBase
