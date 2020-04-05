
import React from "react"
import { useState, useMemo} from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  HoveringToolbar
} from '@unicef/material-slate'

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

/**
 * Instance of a Material Slate with hovering toolbar, that is, a toolbar that appears only when a text is 
 * selected and hovering that selection. 
 */
export default function Hovering() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue)

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), [])

  return (
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <HoveringToolbar />
        <MaterialEditable />
      </MaterialSlate>
  );
  }
