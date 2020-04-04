
import { Editor } from 'slate'
/**
 * Plugin for handling endnote synced type
 * 
 * Requires withBase plugin
 */
const withEndnotes = editor => {
  const { isInline, isVoid } = editor

  const ENDNOTE_TYPE = 'endnote'

  editor.isInline = element => {
    return element.type === ENDNOTE_TYPE ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === ENDNOTE_TYPE ? true : isVoid(element)
  }

  /**
   * If the editor loses focus upon pressing the `AddEndnoteButton`, you need to call 
   * editor.rememberCurrentSelection() before the editor loses the focus  
   * 
   * `data` cannot contain the following items: id, type or children.
   */ 
  editor.addEndnote = (id,data) => {
    const text = { text: '' }
    const node = {
      id: id,
      type: ENDNOTE_TYPE,
      children: [text], 
      data //any data of the comment will be an attribute.
    } 
    editor.wrapNode(node, editor.selection || editor.rememberedSelection)  
    return node
  }
  
  /**
   * Gets the endnote node previous to this one.
   * If there is no endnote, returns null
   */
  editor.previousEndnoteNode = (endnoteId) => {
    let previous = null
    const endnotes = editor.findNodesByType(ENDNOTE_TYPE)
    for(const endnote of endnotes) {
      if (endnote.id === endnoteId) {
        console.log('************************************* previous', previous)
        break
      } 
      previous = endnote
    
    }
    console.log('************************************* previous', previous)
    return previous
  }

  editor.syncEndnotes= (endnotesToKeep) => {
    editor.syncExternalNodes(ENDNOTE_TYPE, endnotesToKeep, false)
  }

  return editor
}

export default withEndnotes


