import React, { useState } from 'react'
import { initialValue } from 'comp/data'
import UEditor from '@unicef/material-ui-texteditor'
import { Box } from '@material-ui/core'

function App() {
  const [value, setValue] = useState(initialValue)

  const [footnotes, setFootnotes] = useState([])
  const [comments, setComments] = useState([{ type: 'footnote' }])

  const toolbarButtons = [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Comment', format: 'comment' },
    { type: 'Footnote', format: 'footnote' },
  ]

  function handleChangeValue(value) {
    // console.log('value', value)
    setValue(value)
  }

  function handleChangeComment(value) {
    console.log('comment in example app', value)
  }

  function handleChangeFootnote(value) {
    value.number = Math.floor(Math.random() * 1000)
    setFootnotes([...footnotes, value])
  }

  return (
    <Box mt={5}>
      <UEditor
        editorId={1}
        value={value}
        toolbar
        // hoveringToolbar={false}
        comments={comments}
        footnotes={footnotes}
        onChangeValue={handleChangeValue}
        toolbarButtons={toolbarButtons}
        onChangeComment={handleChangeComment}
        onChangeFootnote={handleChangeFootnote}
        parentRenderElement={props => Element(props)}
        parentRenderLeaf={props => Leaf(props)}
      />
    </Box>
  )
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-blue':
      return (
        <p {...attributes} style={{ backgroundColor: 'blue' }}>
          {children}
        </p>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  switch (leaf.type) {
    case 'blue':
      return (
        <span {...attributes} style={{ backgroundColor: 'blue' }}>
          {children}
        </span>
      )
    default:
      return <span {...attributes}>{children}</span>
  }
}

export default App
