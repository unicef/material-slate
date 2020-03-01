import { useState, useMemo, useCallback } from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  BoldButton,
  ItalicButton,
  CodeButton,
  UnderlinedButton,
  StrikethroughButton,
  BulletedListButton,
  NumberedListButton,
  AddCommentButton,
  EndnoteButton,
  ToolbarButton,
  SimpleDialog,
  HoveringToolbar
} from '../src'

import { makeStyles } from '@material-ui/core/styles'

// Initial content of the editor 
import initialValue from './initialValue'

const useStyles = makeStyles(theme => ({
  comment: {
    backgroundColor: "#1CABE2"
  }
}))

export default function Advanced() {

  const classes = useStyles()

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createMaterialEditor(), [])
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  const [openEndnoteDialog, setOpenEndnoteDialog] = useState(false)

  const onCustomButtonDown = ({ event, type, format, editor }) => {
    switch (format) {
      case 'comment':
        //Setup the dialog
        console.log('selection', editor.selection)
        editor.startAddComment()
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
        editor.addComment(id, { comment: dialogValue })

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
        return <span className={classes.comment} {...attributes}>{children}</span>
    }
    return <p {...attributes} {...rest}>{children}</p>
  }, [])

  return (
    <div className="App">
      <h1>Basic Editor Example</h1>
      <a href="http://url">See code</a> 
      <Basic></Basic>

      <h1>Full charged editor</h1>
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Toolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlinedButton />
          <StrikethroughButton />
          <CodeButton />
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
        </HoveringToolbar>
        <MaterialEditable
          renderElement={(props) => handleRenderElement(props)}
        ></MaterialEditable>
      </MaterialSlate>
      { /* A simple dialog box that displays a field */}
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
    </div>
  );
}



