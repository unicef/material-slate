import React from 'react'
import { useState, useMemo } from 'react'
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  WordCounter,
  CharCounter,
} from '@unicef/material-slate'
import Box from '@material-ui/core/Box'

//Initial contents of the editor
import initialValue from './initialValue'

/**
 * Words and characters counter example for Material Slate
 */
export default function Counter() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), [])
  // words length
  const wordsLength = editor.getWordsLength(value)
  // char length
  const charLength = editor.getCharLength(value)

  return (
    <>
      <MaterialSlate
        editor={editor}
        value={value}
        onChange={value => setValue(value)}
      >
        <Toolbar />
        <MaterialEditable />
      </MaterialSlate>
      <Box display="flex" justifyContent="space-between">
        <WordCounter wordsLength={wordsLength} maxWords={42} />
        <CharCounter charLength={charLength} maxChars={200} />
      </Box>
    </>
  )
}
