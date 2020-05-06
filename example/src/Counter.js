import React from 'react'
import { useState, useMemo } from 'react'
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  WordCounter,
  CharCounter,
  withCounter,
} from '@unicef/material-slate'
import Box from '@material-ui/core/Box'
//Initial contents of the editor
import initialValue from './initialValue'
import { Divider } from '@material-ui/core'

/**
 * Words and characters counter example for Material Slate
 */
export default function Counter() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => withCounter(createMaterialEditor()), [])

  return (
    <>
      <MaterialSlate
        editor={editor}
        value={value}
        onChange={value => setValue(value)}
      >
        <Toolbar />
        <MaterialEditable />
        <Divider />
        <Box display="flex" justifyContent="space-between" mr={1}>
          <WordCounter maxWords={42} />
          <CharCounter maxChars={200} />
        </Box>
      </MaterialSlate>
    </>
  )
}
