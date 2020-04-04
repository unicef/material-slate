const withComments = editor => {

  const { isInline } = editor

  const COMMENT_TYPE = 'comment'
  /**
   * Set comment type not to be a 
   */
  editor.isInline = element => {
    return element.type === COMMENT_TYPE ? true : isInline(element)
  }

  /**
   * If the editor loses focus upon pressing the `AddCommentButton`, you need to call 
   * editor.rememberCurrentSelection() before the editor loses the focus  
   * 
   * `data` cannot contain the following items: id, type or children.
   */ 
  editor.addComment = (id, data) => {
    const node = {
      id: id,
      type: COMMENT_TYPE,
      children: [], 
      data //any data of the comment will be an attribute.
    } 
    editor.wrapNode(node, editor.selection || editor.rememberedSelection)  
  }
  
  editor.syncComments = (commentsToKeep) => {
    editor.syncExternalNodes(COMMENT_TYPE, commentsToKeep)
  }

  return editor
}
export default withComments
