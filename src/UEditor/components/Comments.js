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
  onChangeComment,
  ...props
}) {
  const editor = useSlate()
  const [value, setValue] = useState(
    element.commentText ? element.commentText : ''
  )
  const [editMode, setEditMode] = useState(!element.commentText)
  const [replyMode, setReplyMode] = useState(false)

  const { time, commentText } = element

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const toggleReplyMode = () => {
    if (commentText) {
      setReplyMode(!replyMode)
    } else {
      setEditMode(!editMode)
    }
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
      comment: element,
    })

    setReplyMode(false)
    setEditMode(false)
  }

  function handleSubmit() {
    if (value !== element.commentText) {
      // get the path of your node
      const [nodeEntry] = Editor.nodes(editor, {
        at: [], // if you want to search the whole document instead of the selection (where the cursor is)
        match: n => n.id === element.id, // predicate function
      })

      // let commentText = value
      // if you found the node
      if (nodeEntry) {
        const [node, path] = nodeEntry
        // update the node
        Transforms.setNodes(
          editor,
          { commentText: value, ...element },
          { at: path }
        )
      }

      onChangeComment({
        type: 'update',
        commentText: value,
        comment: { commentText: value, ...element },
      })
    }
    setEditMode(false)
  }

  return (
    <React.Fragment>
      <span
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={toggleReplyMode}
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
          <Button
            name="cancel"
            onClick={toggleEditMode}
            variant="contained"
            color="default"
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            name="reply"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </Box>
      </CommentMenu>
      <CommentMenu
        id="comments-menu"
        anchorEl={replyMode}
        style={{ left: 100 }}
        MenuListProps={{ component: 'div', style: { display: 'block' } }}
        open={Boolean(replyMode)}
        onClose={toggleReplyMode}
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
          <Button name="cancel" color="default" onClick={toggleReplyMode}>
            Cancel
          </Button>
          <Button type="submit" name="reply" color="primary">
            Reply
          </Button>
        </Box>
      </CommentMenu>
    </React.Fragment>
  )
}
