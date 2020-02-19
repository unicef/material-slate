```jsx static
import React, { useState } from 'react'
import isUrl from 'is-url'
import {
  RichSlate,
  RichEditable,
  createRichEditor,
  RichHoveringToolbar,
  RichToolbar,
  RichSlateButton,
} from '../index.js' // '@unicef/material-ui-texteditor'

function App() {

  const [value, setValue] = useState(initialValue)

  // Toolbar Buttons
  const toolbarButtons = [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
  ]

  //On change of value
  function handleChangeValue(value) {
    setValue(value)
  }

  return (
        <RichSlate
          className={classes.slate}
          createRichEditor={createRichEditor()}
          value={value}
          onChangeValue={handleChangeValue}
        >
          <RichToolbar
            className={classes.toolbar}
            editorId={1}
            toolbarButtons={toolbarButtons}
          >
          </RichToolbar>
          <RichEditable/>
        </RichSlate>
  )
}

const initialValue = [
  {
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes, like ',
      },
      {
        text: '!',
      },
    ],
  },
  {
    children: [
      {
        text:
          'This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above.',
      },
    ],
  },
]

```