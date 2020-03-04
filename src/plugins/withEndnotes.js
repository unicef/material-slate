
const withEndnotes = editor => {
  const { isInline, isVoid } = editor

  editor.isInline = element => {
    return element.type === 'endnote' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'endnote' ? true : isVoid(element)
  }

  return editor
}

export default withEndnotes


