const withComments= editor => {

  const { isInline} = editor

  editor.isInline = element => {
    return element.type === 'comment' ? true : isInline(element)
  }
  
  editor.addComment = (id, data) => {
    
  }
  
  return editor
}
export default withComments
