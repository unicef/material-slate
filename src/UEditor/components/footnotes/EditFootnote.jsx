import React from 'react'
import FootnoteForm from './FootnoteForm'

function EditFootnote(props) {
  const {
    footnoteId,
    onFootnoteChange,
    editor,
    node,
    existingFootnote,
    closeDialog,
  } = props

  const isEdit = existingFootnote.type !== undefined
  // get all the footnotes in the editor

  function onClose() {
    closeDialog()
  }

  function handleRemove(data) {
    if (node) {
      editor.removeNodeByKey(node.key)
      const { value } = editor
      const { document } = value
      onFootnoteChange(
        {
          data: data,
          document: document,
          editorId: editor.props.editorId,
        },
        'remove'
      )
      closeDialog()
    }
  }

  function handleSave(data) {
    const key = existingFootnote.key ? existingFootnote.key : node.key
    editor.setNodeByKey(node.key, { data })
    let { value, props } = editor
    const { document } = value
    let { onChange } = props

    setTimeout(() => {
      onChange({ value })
    }, 100)

    data.key = key

    if (existingFootnote.text) {
      // data.key = existingFootnote.key
      if (node.key !== existingFootnote.key) {
        data.newKey = node.key
      }
      onFootnoteChange(
        {
          data: data,
          document: document,
          editorId: editor.props.editorId,
        },
        'update'
      )
    } else {
      // console.log(JSON.stringify(value.toJSON()))
      onFootnoteChange(
        {
          data: data,
          document: document,
          editorId: editor.props.editorId,
        },
        'add'
      )
    }
    closeDialog()
  }

  return (
    <FootnoteForm
      onClose={onClose}
      node={node}
      editorId={1}
      footnoteId={footnoteId}
      footnote={existingFootnote}
      isEdit={isEdit}
      onRemove={handleRemove}
      onSave={handleSave}
    />
  )
}

export default EditFootnote
