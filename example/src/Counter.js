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
  defaultHotkeys,
} from '@unicef/material-slate'
import { Box, Divider } from '@mui/material'
//Initial contents of the editor
import initialValue from './initialValue'

/**
 * Words and characters counter example for Material Slate
 */
export default function Counter() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => withCounter(createMaterialEditor()), [])

  // all hot keys, including default and custom hotkeys
  const allHotKeys = {
    ...defaultHotkeys,
    'mod+k': {
      type: 'mark',
      value: 'strikethrough',
    },
    'mod+h': {
      type: 'block',
      value: 'heading-one',
    },
  }

  return (
    <>
      <MaterialSlate
        editor={editor}
        value={value}
        onChange={value => setValue(value)}
      >
        <Toolbar />
        <MaterialEditable hotkeys={allHotKeys} />
        <Divider />
        <Box display="flex" justifyContent="space-between" mr={1}>
          <WordCounter maxWords={42} />
          <CharCounter maxChars={200} />
        </Box>
      </MaterialSlate>
    </>
  )
}
