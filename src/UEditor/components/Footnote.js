import React, { useState } from 'react'
import { Editor, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { Menu, TextField, Button, Box } from '@material-ui/core'

export default function Footnote(props) {
  const { attributes, children, element, footnotes, onChangeFootnote } = props
  const editor = useSlate()

  const [value, setValue] = useState(
    element.footnoteText ? element.footnoteText : ''
  )
  const canRemove = element.footnoteText
  const [editMode, setEditMode] = useState(!element.footnoteText)

  const currentFootnote =
    footnotes &&
    footnotes.filter(item => {
      return item.id === element.id
    })

  function toggleEditMode(e, type) {
    if (type === 'remove') {
      handleRemove()
    }
    setEditMode(!editMode)
  }

  function handleChange(e) {
    // console.log(e.target.value, value)
    setValue(e.target.value)
  }

  function handleRemove(event) {
    Transforms.removeNodes(editor, {
      at: [],
      match: n => n.id === element.id,
    })

    const list = Editor.nodes(editor, {
      match: n => n.type === 'footnote',
      at: [],
    })

    const footnoteList = Array.from(list)
    // console.log('afteRemove', footnoteList)
    onChangeFootnote({
      type: 'remove',
      footnoteList: footnoteList,
      footnote: element,
    })

    setEditMode(false)
  }

  function handleSubmit() {
    if (value !== element.footnoteText) {
      // get the path of your node
      const [nodeEntry] = Editor.nodes(editor, {
        at: [], // if you want to search the whole document instead of the selection (where the cursor is)
        match: n => n.id === element.id, // predicate function
      })
      // if you found the node
      if (nodeEntry) {
        const [node, path] = nodeEntry
        // update the node
        Transforms.setNodes(
          editor,
          { footnoteText: value, ...element },
          { at: path }
        )
      }
      // console.log({ footnoteText: value})
      onChangeFootnote({
        type: 'update',
        footnoteText: value,
        footnote: { footnoteText: value, ...currentFootnote[0] },
      })
    }
    setEditMode(false)
  }

  return (
    <React.Fragment>
      <span {...attributes}>
        <a
          contentEditable={false}
          role="link"
          tabIndex={0}
          onClick={toggleEditMode}
        >
          <sup>{currentFootnote.length !== 0 && currentFootnote[0].number}</sup>
        </a>
        {children}
      </span>
      <Menu
        id="footnote-menu"
        anchorEl={editMode}
        style={{ left: 250 }}
        MenuListProps={{ component: 'div', style: { display: 'block' } }}
        open={editMode}
        onClose={e => {
          e.preventDefault()
          toggleEditMode(e, canRemove ? 'close' : 'remove')
        }}
        PaperProps={{ style: { padding: 16, maxWidth: 300 } }}
      >
        <TextField
          label="footnote"
          name="text"
          value={value}
          variant="outlined"
          fullWidth
          multiline
          onChange={handleChange}
        />
        <Box style={{ float: 'right', margin: 8 }}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </Button>
          {canRemove && (
            <Button
              style={{ marginLeft: 8 }}
              color="default"
              variant="contained"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </Box>
      </Menu>
    </React.Fragment>
  )
}
