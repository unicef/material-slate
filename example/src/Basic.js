
import React from "react"
import { useState, useMemo } from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar
} from '@unicef/material-ui-slate' 

// Initial text content of the editor
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'Basic example. This is editable ' },
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
  }
]
/**
 * Basic Material Slate example
 */
export default function Basic() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue)
  
  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), [])

  return (
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Toolbar />
        <MaterialEditable />
      </MaterialSlate>
  );
  }
