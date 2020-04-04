
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
  }
  
  editor.syncEndnotes= (endnotesToKeep) => {
    editor.syncExternalNodes(ENDNOTE_TYPE, endnotesToKeep, false)
  }

  return editor
}

export default withEndnotes


