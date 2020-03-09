
import React from "react"
import { useState, useMemo} from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  HoveringToolbar
} from '@unicef/material-ui-slate'

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
          "Hovering example. Since it's rich text, you can do things like turn a selection of text ",
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
  }
]



export default function Basic() {

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createMaterialEditor(), [])

  return (
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <HoveringToolbar />
        <MaterialEditable />
      </MaterialSlate>
  );
  }
