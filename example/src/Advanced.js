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

  CommentElement
} from '@unicef/material-ui-slate'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Initial content of the editor
import initialValue from './initialValue'


/**
 * Example of advanced usage of the editor
 * 
 * It shows an example of comments and endnotes handled as an external list
 */
export default function Advanced() {

  
  const [value, setValue] = useState(initialValue)

  const editor = useMemo(() => createMaterialEditor(), [])
  // State variable that handles the dialog that is opened upon clicking the Toolbar/Hoveringbar button
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  // State variable that handles the dialog that is opened upon clicking the Toolbar/Hoveringbar button
  const [openEndnoteDialog, setOpenEndnoteDialog] = useState(false)

  // External list of comments
  const [comments, setComments] = useState([])
  // External list of endnotes
  const [endnotes, setEndnotes] = useState([])

  // Handles custom butons click
  const onCustomButtonDown = ({ event, type, format, editor }) => {
    switch (format) {
      case 'comment':
        //Setup the dialog
        editor.rememberCurrentSelection()
        setOpenCommentDialog(true)
        return
      case 'endnote':
        editor.rememberCurrentSelection()
        setOpenEndnoteDialog(true)
        return
    }
  }

  const handleDialogCancel = () => {
    console.log('Dialog cancelled')
    setOpenCommentDialog(false)
    setOpenEndnoteDialog(false)
  }

  const handleDialogSave = (format, dialogValue) => {
    //Here you could call an API to store the comment
    switch (format) {
      case 'comment':
        setOpenCommentDialog(false)
        console.log('save Comment:' + dialogValue)
        const id = new Date().getTime();
        //see withComments Plugin
        editor.addComment(id, {body: dialogValue })
        //update the comment array and add comment in editor
        setComments([...comments, {id: id, body: dialogValue}])
        return
      case 'endnote':
        setOpenEndnoteDialog(false)
        console.log('save Endnote:' + value)
        editor.addEndnote(id, {endnote: value})
        return
    }
  }
  /**
   * 
   */
  const handleDeleteComment = commentId => {
    const newList = comments.filter(comment => comment.id !== commentId)
    console.log('deleteComment', newList)
    setComments(newList) 
  }

  useEffect( () => {
    console.log('updated comments')
    editor.syncComments(comments)
  } , [comments])

  useEffect( () => {}, [endnotes])

  const handleRenderElement = useCallback(({ element, children, attributes, ...rest }) => {
    switch (element.type) {
      case 'comment':
        console.log('render comment', element)
        return  <CommentElement element={element} attributes={attributes}>{children}</CommentElement>
    }
    return <p {...attributes} {...rest}>{children}</p>
  }, [])

  return (
    <>
    <Grid container spacing={3}>
      <Grid item sm={8}>
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
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
          <ToolbarButton type="block" format="blockquote" />

          {/*These buttons require actions to be handled as they are not */}
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
      </Grid>
    </Grid>
    </>
  );
}