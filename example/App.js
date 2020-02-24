
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




export default hot(module)(function App() {

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createMaterialEditor(), [])
  const [openCommentDialog, setOpenCommentDialog] = useState(false)


  const onCommentButton = ({event, mark, editor}) => {
    console.log('buttonComment')
    setOpenCommentDialog(true)
  }

  const handleCommentCancel = () => {
    console.log('comment cancelled')
    setOpenCommentDialog(false)
  }

  const handleCommentSave = (value) => {
    console.log('comment Save:' + value)
    setOpenCommentDialog(false)
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
          <ToolbarButton mark='comment' fullButtonControl onMouseDown={(event) => onCommentButton(event)} />
        </Toolbar>
        <MaterialEditable

        ></MaterialEditable>
      </MaterialSlate>
      { /*Comment dialog */}
      <SimpleDialog 
        open={openCommentDialog}
        title='Add comment' 
        label='Comment' 
        defaultValue=''
        onCancel={ () => handleCommentCancel()}
        onSave={ (value) => handleCommentSave(value)}
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


