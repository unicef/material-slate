
import React from "react"
import { useState, useMemo } from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar
} from '@unicef/material-slate' 

//Initial contents of the editor
import initialValue from './initialValue'

/**
 * Basic Material Slate example
 */
export default function Basic() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), [])

  return (
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Toolbar />
        <MaterialEditable />
      </MaterialSlate>
  )
}
