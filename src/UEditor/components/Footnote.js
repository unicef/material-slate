import React, { useState } from 'react'
import { Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { Menu, TextField, Button, Box } from '@material-ui/core'
// import { unwrapFormat } from './ToolbarButtons'

export default function Footnote(props) {
  const { attributes, children, element } = props
  const editor = useSlate()

  const [value, setValue] = useState(element.footnoteText)
  const [anchorEl, setAnchorEl] = useState(false)
  const [editMode, setEditMode] = useState(!element.footnoteText)

  function toggleEditMode() {
    setEditMode(!editMode)
    setAnchorEl(true)
  }

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleRemove(event) {
    setTimeout(() => {
      Transforms.unwrapNodes(editor, {
        match: n => n.type === 'footnote',
        split: true,
      })
    }, [500])

    toggleEditMode()
  }

  return (
    <React.Fragment>
      <span {...attributes}>
        <a
          contentEditable={true}
          role="link"
          tabIndex={0}
          onClick={toggleEditMode}
        >
          <sup>{element.number}</sup>
        </a>
        {children}
      </span>
      {editMode && (
        <Menu
          id="footnote-menu"
          anchorEl={anchorEl}
          style={{ left: 250 }}
          MenuListProps={{ component: 'div', style: { display: 'block' } }}
          open={anchorEl}
          onClose={toggleEditMode}
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
            <Button color="primary" variant="contained" type="submit">
              Update
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              color="default"
              variant="contained"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Box>
        </Menu>
      )}
    </React.Fragment>
  )
}
