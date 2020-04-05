
import React from "react"
import { useState, useMemo} from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  HoveringToolbar
} from '@unicef/material-slate'

//Initial contents of the editor
import initialValue from './hoveringInitialValue'

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
