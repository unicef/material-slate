
import React from "react"
import { useState, useMemo, useCallback } from "react"
import { hot } from "react-hot-loader" //Auto refresh load
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
  ToolbarButton,
  SimpleDialog
} from '../src'

import { makeStyles } from '@material-ui/core/styles'

import AddCommentIcon from '@material-ui/icons/AddComment'
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined';


const useStyles = makeStyles(theme => ({
  comment: {
    backgroundColor: "#1CABE2"
  }
}))

export default hot(module)(function App() {

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
      <h1>Basic Editor</h1>
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Toolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlinedButton />
          <StrikethroughButton />
          <CodeButton />
          <BulletedListButton />
          <NumberedListButton />
          <ToolbarButton
            icon={<AddCommentIcon />}
            tooltip="Add comment"
            format='comment'
            onMouseDown={(event) => onCustomButtonDown(event)} />

          <ToolbarButton
            icon={<CallToActionOutlinedIcon />}
            tooltip="Add endnote"
            format='endnote'
            onMouseDown={(event) => onCustomButtonDown(event)} />
        </Toolbar>
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
})

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'comment',
        id: '1234',
        children: [
          { text: 'This is editable ' }
        ]
      },
      { text: 'rich text much better than a ', },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },


  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  }
]


