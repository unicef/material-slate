


const withComments = editor => {

  const { isInline } = editor

  /**
   * Set comment type not to be a 
   */
  editor.isInline = element => {
    return element.type === 'comment' ? true : isInline(element)
  }

  /**
   * If the editor loses focus upon pressing the `AddCommentButtoncall`, you need to call 
   * editor.rememberCurrentSelection() before the editor loses the focus  
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
    editor.wrapNode(node, editor.selection || editor.rememberedSelection)  
  }
  
  editor.syncComments = (commentsToKeep) => {
    editor.syncExternalNodes('comment', commentsToKeep)
  }

  return editor
}
export default withComments
