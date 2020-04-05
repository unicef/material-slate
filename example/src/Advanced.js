import React, { useEffect } from 'react'
import { useState, useMemo, useCallback } from 'react'
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  HoveringToolbar,
  ToolbarButton,
  ButtonSeparator,
  BoldButton,
  ItalicButton,
  CodeButton,
  UnderlinedButton,
  StrikethroughButton,
  BulletedListButton,
  NumberedListButton,
  AddCommentButton,
  EndnoteButton,
  SimpleDialog,

  CommentElement,
  EndnoteElement
} from '@unicef/material-slate'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Box from '@material-ui/core/Box'

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Initial content of the editor
import initialValue from './initialValue'


/**
 * Example of advanced usage of the editor
 * 
 * It shows how to create an editor that supports inline comments and endnotes, both of them
 * with the possibility to be handled as external lists (ie you can edit or delete comments/endnotes outside
 * the editor and sync them)
 */
export default function Advanced() {

  const [value, setValue] = useState(initialValue)

  const editor = useMemo(() => createMaterialEditor(), [])
  // Handles the dialog that is opened upon clicking the Comment Toolbar/HoveringBar button
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  // Handles the dialog that is opened upon clicking the Endnote Toolbar/HoveringBar button
  const [openEndnoteDialog, setOpenEndnoteDialog] = useState(false)

  // External list of comments
  const [comments, setComments] = useState([])
  // External list of endnotes
  const [endnotes, setEndnotes] = useState([])

  // Handles custom buttons click
  const onCustomButtonDown = ({ event, type, format, editor }) => {
    switch (format) {
      case 'comment':
        // When the dialog box is opened, the focus is lost as well as current selected text.
        // We need to save it for later on.
        editor.rememberCurrentSelection()
        setOpenCommentDialog(true)
        return
      case 'endnote':
        editor.rememberCurrentSelection()
        setOpenEndnoteDialog(true)
        return
    }
  }

  // Handle User clicked the cancel button of the dialog box.
  // Just closes the dialogs
  const handleDialogCancel = () => {
    console.log('Dialog cancelled')
    setOpenCommentDialog(false)
    setOpenEndnoteDialog(false)
  }

  const handleDialogSave = (format, dialogValue) => {
    // In a real app, is in this function where we could call an API to store the comment/endnote
    switch (format) {
      case 'comment':
        setOpenCommentDialog(false)
        console.log('save Comment:' + dialogValue)
        // In this example we only save the value and an id
        // But we could add user information, date, resolved or not,...
        const comment = {
            id: new Date().getTime(),
            body: dialogValue
        }
        // Adds the comment to the editor.
        // The comment will wrap the selected text when `rememberCurrentSelection()` was called
        editor.addComment(comment.id, comment)
        // Updates the comment array and add comment in editor
        setComments([...comments, comment])
        return
      case 'endnote':
        setOpenEndnoteDialog(false)
        console.log('save Endnote:' + dialogValue)
        let endnote = {
          id: new Date().getTime(),
          body: dialogValue,
          index: -1
        }
        // Add the endnote to the editor in the point the cursor was when the button was clicked
        editor.addEndnote(endnote.id, endnote)
        // Update the external list. First get previous endnote in the editor
        const previousNode = editor.previousEndnoteNode(endnote.id)
        // Then get the position of the previous endnote in the endnotes array
        const position = previousNode ? (endnotes.map(e => (e.id)).indexOf(previousNode.id) + 1) : 0
        // Add the endnote in the position
        let newEndnotes = [...endnotes]
        newEndnotes.splice(position, 0, endnote)
        // Renumber all endnotes
        const newEndnotes2 = newEndnotes.map((endnote, index) => { 
          index = index + 1
          return {...endnote, index}
        })
        setEndnotes(newEndnotes2)
        return
    }
  }

   // Deletes a comment that is in the comment list
  const handleDeleteComment = commentId => {
    const newList = comments.filter(comment => comment.id !== commentId)
    console.log('deleteComment', newList)
    setComments(newList) 
  }

  // Deletes an endnote that is in the endnote list
  const handleDeleteEndnote = endnoteId => {
    const newList = endnotes.filter(endnote => endnote.id !== endnoteId)
    console.log('deleteEndnote', newList)
    setEndnotes(newList) 
  }

  // This is a key element of the external lists.
  // Whenever the comment list is changed, this effect is triggered.
  useEffect( () => {
    console.log('updated comments', comments)
    // It syncs the external list with the comments within the editor.
    // For each comment in the list it will update the data attribute of the comment
    // It will also unwrap (ie remove) the comments that are in the editor but not in the list.
    editor.syncComments(comments)
  } , [comments])

  // Same as the function above, but for the endnotes
  useEffect( () => {
    console.log('updated endnotes', endnotes)
    editor.syncEndnotes(endnotes)
  } , [endnotes])

  // All the basic buttons are handled within the MaterialEditable, but custom toolbar buttons
  // shall be handled in this function.
  //
  // Always render the children.
  const handleRenderElement = useCallback(({ element, children, attributes, ...rest }) => {
    switch (element.type) {
      case 'comment':
        return  <CommentElement element={element} attributes={attributes}>{children}</CommentElement>
      case 'endnote':
        return <EndnoteElement element={element} attributes={attributes}>{children}</EndnoteElement>
    }
    return <p {...attributes} {...rest}>{children}</p>
  }, [])

  return (
    <>
    <Grid container spacing={3}>
      <Grid item sm={8}>
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)} onBlur={() => console.log('blur')}>
        { /* By passing Buttons as children of the Toolbar you can customize it */}
        <Toolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlinedButton />
          <StrikethroughButton />
          <CodeButton />
          <ButtonSeparator />
          <BulletedListButton />
          <NumberedListButton />

            {/* Disabled button.
            you can also use disableOnCollapse and disableOnSelection */}
          <ToolbarButton type="block" format="blockquote" disabled />

          {/* These two buttons require actions to be handled onMouseDown */}
          <AddCommentButton onMouseDown={(event) => onCustomButtonDown(event)} />
          <EndnoteButton onMouseDown={(event) => onCustomButtonDown(event)} />
        </Toolbar>
        <HoveringToolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlinedButton />
          <StrikethroughButton />
          <AddCommentButton onMouseDown={(event) => onCustomButtonDown(event)} />
        </HoveringToolbar>
        <MaterialEditable
          renderElement={(props) => handleRenderElement(props)}
        ></MaterialEditable>
      </MaterialSlate>
      <SimpleDialog
        open={openCommentDialog}
        title="Add comment"
        label="Comment"
        defaultValue=''
        format='comment'
        onCancel={() => handleDialogCancel()}
        onSave={({ format, value }) => handleDialogSave(format, value)}
      />
      <SimpleDialog
        open={openEndnoteDialog}
        title="Add endnote"
        label="Endnote"
        defaultValue=''
        format='endnote'
        onCancel={() => handleDialogCancel()}
        onSave={({ format, value }) => handleDialogSave(format, value)}
      />
      </Grid>
      <Grid>
      <Typography variant='caption'>External Comments List</Typography>
      { comments.length === 0 ? ( 
      <Typography>No comments</Typography> 
      ) : (
        <List dense>
        {comments.map( comment => (
          <ListItem key={comment.id}>
              <ListItemText>{comment.body}</ListItemText> 
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment.id)}>
                <DeleteOutline />
                </IconButton>
            </ListItemSecondaryAction>
          </ListItem>))}
        </List>
      )}
      <Box marginTop={2}>
        <Typography variant='caption'>External Endnotes List</Typography>
        {endnotes.length === 0 ? 
        (<Typography>No endnotes</Typography>)
        : ( 
          <List dense>
            {endnotes.map( endnote => (
              <ListItem key={endnote.id}>
                  <ListItemText>[{endnote.index}] {endnote.body}</ListItemText> 
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEndnote(endnote.id)}>
                    <DeleteOutline />
                    </IconButton>
                </ListItemSecondaryAction>
              </ListItem>))}
          </List>
        )}
      </Box>
      </Grid>
    </Grid>
    </>
  );
}