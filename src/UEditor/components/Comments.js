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
import { unwrapFormat } from './ToolbarButtons'

export function CommentElement({ attributes, children, element, ...props }) {
  console.log(element)
  const editor = useSlate()
  const { node } = children.props
  const { commentText, time } = node
  const [value, setValue] = useState('')
  const [openForm, setOpenForm] = useState(element.commentText === '')
  const [anchorEl, setAnchorEl] = useState(false)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleResolve(event) {
    // event.preventDefault()
    unwrapFormat(editor, 'comment')
  }

  return (
    <React.Fragment>
      <span
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ backgroundColor: 'yellow' }}
      >
        {children}
      </span>
      <CommentMenu
        id="comments-menu"
        anchorEl={openForm}
        style={{ left: 100 }}
        MenuListProps={{ component: 'div', style: { display: 'block' } }}
        open={Boolean(openForm)}
        onClose={handleClose}
        PaperProps={{ style: { padding: 16, maxWidth: 500 } }}
      >
        <Typography variant="h6">Comment</Typography>
        <TextField
          variant="outlined"
          margin="dense"
          id="year"
          value={value}
          // onChange={handleChange}
          fullWidth
          placeholder="Comment"
          multiline
        />
        <Box style={{ float: 'right', margin: 8 }}>
          <Button name="cancel" onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button
            type="submit"
            name="reply"
            color="primary"
            // onClick={handleSubmit}
          >
            Comment
          </Button>
        </Box>
      </CommentMenu>
      <CommentMenu
        id="comments-menu"
        anchorEl={anchorEl}
        style={{ left: 100 }}
        MenuListProps={{ component: 'div', style: { display: 'block' } }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
              onClick={e => handleResolve(e, 'comment')}
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
      </CommentMenu>
    </React.Fragment>
  )
}
