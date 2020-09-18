import React from 'react'
import { useState, useMemo } from 'react'
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  withLinks,
  LinkButton,
  SimpleDialog,
} from '@unicef/material-slate'

//Initial contents of the editor
import initialValue from './initialValue'

/**
 * Material Slate example for link
 */
export default function Link() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())
  // Handles the dialog that is opened upon clicking the Link Toolbar/HoveringBar button
  const [openLinkDialog, setOpenLinkDialog] = useState(false)
  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => withLinks(createMaterialEditor()), [])

  // Handles custom buttons click
  const onLinkButtonDown = ({ editor }) => {
    // When the dialog box is opened, the focus is lost as well as current selected text.
    // We need to save it for later on.
    editor.rememberCurrentSelection()
    setOpenLinkDialog(true)
  }

  const handleDialogSave = url => {
    setOpenLinkDialog(false)
    // Adds the link to the editor.
    // The link will wrap the selected text when `rememberCurrentSelection()` was called
    editor.insertLink(url)
  }

  return (
    <>
      <MaterialSlate
        editor={editor}
        value={value}
        onChange={value => setValue(value)}
      >
        <Toolbar>
          <LinkButton onMouseDown={event => onLinkButtonDown(event)} />
        </Toolbar>
        <MaterialEditable hotkeys={null} />
      </MaterialSlate>
      <SimpleDialog
        open={openLinkDialog}
        title="Add Link"
        label="Link"
        format="link"
        onCancel={() => setOpenLinkDialog(false)}
        onSave={({ value }) => handleDialogSave(value)}
      />
    </>
  )
}
