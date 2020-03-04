
import React from "react"
import { useState, useMemo } from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar
} from '@unicef/material-ui-slate' 

// Initial text content of the editor
import initialValue from './initialValue'

export default function Basic() {

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createMaterialEditor(), [])

  return (
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Toolbar />
        <MaterialEditable />
      </MaterialSlate>
  );
  }
