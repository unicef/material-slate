
import React from "react"
import { useState, useMemo, useCallback } from "react"
import { hot } from "react-hot-loader" //Auto refresh load
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  HoveringToolbar
} from '../src' //Replace '../src/' with '@unicef/material-ui-slate'

// Initial text content of the editor 
import initialValue from './initialValue'

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

