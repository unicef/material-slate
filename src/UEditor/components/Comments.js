import React, { useState } from 'react'
import { useSlate } from 'slate-react'
import {
  Menu as CommentMenu,
  Button,
  Box,
  Avatar,
  Typography,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core'
// import { unwrapFormat } from './ToolbarButtons'
import { Editor, Transforms } from 'slate'

export function CommentElement({
  attributes,
  comments,
  children,
  element,
  ...props
}) {
  const editor = useSlate()
  const { node } = children.props
  // const { commentText, time } = node
  const [value, setValue] = useState(
    element.commentText ? element.commentText : ''
  )
  const [editMode, setEditMode] = useState(!element.commentText)

  const handleSubmit = event => {
    setEditMode(!editMode)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  function handlChangeValue(e) {
    setValue(e.target.value)
  }

  function handleRemove(event) {
    Transforms.unwrapNodes(editor, {
      at: [],
      match: n => n.id === element.id,
    })

    onChangeComment({
      type: 'remove',
      element,
    })
    setEditMode(false)
  }

  // function handleSubmit(event) {
  //   // let comment = element
  //   console.log(Transforms.setNodes(editor, { ...element, commentText: value }))
  //   Transforms.wrapNodes(editor, { ...element, commentText: value })
  //   setOpenForm(false)
  // }

  return (
    <React.Fragment>
      <span
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={toggleEditMode}
        style={{ backgroundColor: 'yellow' }}
      >
        {children}
      </span>
      <CommentMenu
        id="comments-menu"
        anchorEl={editMode}
        style={{ left: 100 }}
        MenuListProps={{ component: 'div', style: { display: 'block' } }}
        open={Boolean(editMode)}
        onClose={toggleEditMode}
        PaperProps={{ style: { padding: 16, maxWidth: 500 } }}
      >
        <Typography variant="h6">Comment</Typography>
        <TextField
          variant="outlined"
          margin="dense"
          id="year"
          value={value}
          onChange={handlChangeValue}
          fullWidth
          placeholder="Comment"
          multiline
        />
        <Box style={{ float: 'right', margin: 8 }}>
          <Button name="cancel" onClick={toggleEditMode} color="default">
            Cancel
          </Button>
          <Button
            type="submit"
            name="reply"
            color="primary"
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </Box>
      </CommentMenu>
      {/* <CommentMenu
        id="comments-menu"
        anchorEl={editMode}
        style={{ left: 100 }}
        MenuListProps={{ component: 'div', style: { display: 'block' } }}
        open={Boolean(editMode)}
        onClose={toggleEditMode}
        PaperProps={{ style: { padding: 16, maxWidth: 500 } }}
      >
        <Typography variant="h6">Comment</Typography>
        <List key={1}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={''} />
            </ListItemAvatar>
            <ListItemText primary={1} secondary={time} />
            <Button
              onClick={handleRemove}
              style={{ marginLeft: 8 }}
              color="primary"
              variant="contained"
            >
              Resolve
            </Button>
          </ListItem>
          <ListItem>{commentText}</ListItem>
        </List>
        <TextField
          variant="outlined"
          margin="dense"
          id="year"
          fullWidth
          placeholder="Reply..."
          multiline
        />
        <Box style={{ float: 'right', margin: 8 }}>
          <Button name="cancel" onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button type="submit" name="reply" color="primary">
            Reply
          </Button>
        </Box>
      </CommentMenu> */}
    </React.Fragment>
  )
}

{
}
