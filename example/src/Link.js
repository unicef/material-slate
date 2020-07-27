import React from 'react'
import { useState, useMemo } from 'react'
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  withLinks,
  LinkButton,
  defaultHotKeys,
} from '@unicef/material-slate'

//Initial contents of the editor
import initialValue from './initialValue'

/**
 * Material Slate example for link
 */
export default function Link() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())
  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => withLinks(createMaterialEditor()), [])

  return (
    <>
      <MaterialSlate
        editor={editor}
        value={value}
        onChange={value => setValue(value)}
      >
        <Toolbar>
          <LinkButton />
        </Toolbar>
        <MaterialEditable hotkeys={null} />
      </MaterialSlate>
    </>
  )
}
