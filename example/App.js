
import React from "react"
import { useState, useMemo } from "react"
import { hot } from "react-hot-loader" //Auto refresh load
import { MaterialSlate, 
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
  
import AddCommentIcon from '@material-ui/icons/AddComment'
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined';



export default hot(module)(function App() {

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createMaterialEditor(), [])
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Title')
  const [dialogLabel, setDialogLabel] = useState('Label')
  const [dialogFormat, setDialogFormat] = useState('Format')
  
  

  const onCustomButtonDown = ({event,type, format, editor}) => {
    switch(format) {
      case 'comment':
        //Setup the dialog
        setDialogTitle('Add comment')
        setDialogLabel('Comment')
        setDialogFormat('comment')
        setOpenDialog(true)
        return
      case 'endnote':
        setDialogTitle('Add endnote')
        setDialogLabel('Endnote')
        setDialogFormat('endnote')
        setOpenDialog(true)
        return
    }
  }

  const handleDialogCancel = () => {
    console.log('Dialog cancelled')
    setOpenDialog(false)
  }

  const handleDialogSave = (format, value) => {
    setOpenDialog(false)
    //Here you could call an API to store the comment
    switch(format) { 
      case 'comment':
        console.log('save Comment:' + value)
        //editor.addComment(id, {comment: value})
        return
      case 'endnote': 
        console.log('save Endnote:' + value)
        //editor.addEndnote(id, {endnote: value})
        return
    }
    
  }

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

        ></MaterialEditable>
      </MaterialSlate>
      { /* A simple dialog box that displays a field */}
      <SimpleDialog 
        open={openDialog}
        title={dialogTitle} 
        label={dialogLabel} 
        defaultValue=''
        format={dialogFormat}
        onCancel={ () => handleDialogCancel()}
        onSave={ ({format, value}) => handleDialogSave(format, value)}
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


