import React, { useState } from 'react'
import { Transforms, Editor } from 'slate'
import { useSlate } from 'slate-react'
import { Button as MenuButton } from './components'
import {
  Dialog,
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
import getDateAndTime from './getDateAndTime'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { UTextField, UValidatorForm } from '@unicef/material-ui'

function CommentElement({ children, ...props }) {
  // const { editor, commentData, children } = props
  // const { comments, onComment } = editor.props
  // const { comment, commentId, userName, time } = commentData
  // const [anchorEl, setAnchorEl] = useState(null)

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  // function handleResolve(event, comment) {
  //   event.preventDefault()

  //   editor.unwrapInline('comment')

  //   setTimeout(() => {
  //     const filteredComments = comments.filter(e => {
  //       return e.commentId !== commentId
  //     })

  //     onComment(filteredComments)
  //   }, 100)
  // }

  // console.log('props', props)

  return (
    <React.Fragment>
      <span
        aria-controls="simple-menu"
        aria-haspopup="true"
        // onClick={handleClick}
        style={{ backgroundColor: 'yellow' }}
      >
        {children}
      </span>
      {/* <CommentMenu
        id="comments-menu"
        anchorEl={anchorEl}
        style={{ left: 250 }}
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
              onClick={e => handleResolve(e, comment)}
              style={{ marginLeft: 8 }}
              color="primary"
              variant="contained"
            >
              Resolve
            </Button>
          </ListItem>
          <ListItem>{comment}</ListItem>
        </List>
        <UValidatorForm
          onSubmit={e => handleClose(e, 'comment')}
          instantValidate={true}
        >
          <UTextField
            variant="outlined"
            margin="dense"
            id="year"
            fullWidth
            placeholder="Reply..."
            validators={['required']}
            errorMessages={['this field is required']}
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
        </UValidatorForm>
      </CommentMenu> */}
    </React.Fragment>
  )
}

const isActive = editor => {
  const { selection } = editor
  return !!(
    selection && Editor.isInline(editor, selection, { type: 'comment' })
  )
}

const unwrapLink = editor => {
  Editor.unwrapNodes(editor, { match: { type: 'comment' } })
}

export function wrapLinkComments(editor, comment) {
  if (isActive(editor)) {
    return unwrapLink(editor)
  }
  // console.log('called')
  const link = { type: 'comment', data: { comment } }
  Transforms.wrapNodes(editor, link, { split: true })
  Transforms.move(editor, { edge: 'end' })
}

function CommentButton({ format, ...props }) {
  // console.log({ format, ...props })
  const form = React.useRef('form')
  const editor = useSlate()
  // const { editor, type } = props

  const { comments } = props
  const [openComment, setOpenComment] = useState(false)
  const [currentComment, setCurrentComment] = useState('')
  // const { value } = editor

  const handleClickOpen = () => {
    setOpenComment(true)
  }

  function handleClose(e, name) {
    if (name === 'comment') {
      const newCommentId = getDateAndTime(new Date(), 'timestamp')
      const newDate = new Date()
      const date = getDateAndTime(newDate, 'date-time')
      const newCommentObject = {
        // editorId: editor.props.editorId,
        time: date,
        // userName: userName,
        commentId: newCommentId,
        key: newCommentId,
        comment: currentComment,
      }
      // const commentsArray = [...comments, newCommentObject]
      // onComment(commentsArray)
      editor.exec({ type: 'insert_comment', newCommentObject })
    }
    setCurrentComment(null)
    setOpenComment(false)
  }

  const handleComments = e => {
    const value = e.target.value
    setCurrentComment(value)
  }

  return (
    <React.Fragment>
      <MenuButton
        onClick={handleClickOpen}
        reversed
        active={isActive}
        onMouseDown={event => {
          event.preventDefault()
        }}
      >
        {props.children}
      </MenuButton>
      <Dialog
        classes={{ paperWidthSm: 400 }}
        PaperProps={{ style: { minWidth: 400 } }}
        open={openComment}
        onClose={e => handleClose(e, 'comment')}
        aria-labelledby="form-dialog-title"
      >
        <TextField
          label="Comments"
          value={currentComment}
          onChange={handleComments}
        />
      </Dialog>
    </React.Fragment>
  )
}

export { CommentElement, CommentButton }
