import React from 'react'
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
} from '../src'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import  ListItem from '@material-ui/core/ListItem'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import IconButton from '@material-ui/core/IconButton'

// Initial content of the editor 
import initialValue from './initialValue'

const useStyles = makeStyles(theme => ({
  comment: {
    backgroundColor: "#1CABE2"
  }
}))

/**
 * Example of advanced usage of the editor
 */
export default function Advanced() {

  const classes = useStyles()

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createMaterialEditor(), [])
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  const [openEndnoteDialog, setOpenEndnoteDialog] = useState(false)

  const [comments, setComments] = useState([])


  const onCustomButtonDown = ({ event, type, format, editor }) => {
    switch (format) {
      case 'comment':
        //Setup the dialog
        console.log('selection', editor.selection)
        editor.rememberCurrentSelection()
        setOpenCommentDialog(true)
        return
      case 'endnote':
        editor.startEndNote()
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
        //update the comment array and add comment in editor
        setComments([...comments, {id: id, body: dialogValue}])
        editor.addComment(id, {body: dialogValue })

        return
      case 'endnote':
        setOpenCommentDialog(false)
        console.log('save Endnote:' + value)
        //editor.addEndnote(id, {endnote: value})
        return
    }
  }

  const handleRenderElement = useCallback(({ element, children, attributes, ...rest }) => {
    switch (element.type) {
      case 'comment':
        console.log('render comment')
        console.log('element', element)
        return  <CommentElement element={element} attributes={attributes}>{children}</CommentElement>
    }
    return <p {...attributes} {...rest}>{children}</p>
  }, [])

  return (
    <>
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
      <h3>Comments </h3>
      <List>
        {comments.map( comment => (<ListItem>{comment.body} <IconButton><DeleteOutline /></IconButton></ListItem>))}
      </List>
    </>
  );
}



