
import React from "react"
import { useState, useMemo } from "react"
import { hot } from "react-hot-loader" //Auto refresh load
import { RichSlate, 
  RichEditable, 
  createRichEditor, 
  Toolbar, 
  BoldButton, 
  ItalicButton, 
  CodeButton, 
  UnderlinedButton, 
  StrikethroughButton,
  BulletedListButton,
  NumberedListButton
  } from '../src'



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
  },
]

export default hot(module)(function App() {

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createRichEditor(), [])

  return (
    <div className="App">
      <h1>Basic Editor</h1>
      <RichSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Toolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlinedButton />
          <StrikethroughButton /> 
          <CodeButton />
          <BulletedListButton />
          <NumberedListButton />
       
        </Toolbar>
        <RichEditable></RichEditable>
      </RichSlate>
    </div>
  );
})

