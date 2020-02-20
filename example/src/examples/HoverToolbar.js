import React, { useState } from 'react'
import {
  RichSlate,
  RichEditable,
  createRichEditor,
  RichHoveringToolbar,
} from '@unicef/material-ui-texteditor'
import FormatColorTextIcon from '@material-ui/icons/FormatColorText'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  slate: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}))

export default function HoveringToolbarExample() {
  const classes = useStyles()
  const [value, setValue] = useState(initialValue)
  const [comments, setComments] = useState([])

  // Toolbar Buttons
  const toolbarButtons = [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Comment', format: 'comment' },
    {
      type: 'Mark',
      format: 'blue',
      icon: <FormatColorTextIcon />,
    },
  ]

  //On change of value
  function handleChangeValue(value) {
    setValue(value)
  }

  //On change of comments
  function handleChangeComment(value) {
    const comment = value.comment
    if (value.type === 'add') {
      setComments([...comments, comment])
    } else if (value.type === 'update') {
      let updatedComments = comments.map(element => {
        if (element.id === comment.id) {
          element.commentText = value.commentText
        }
        return element
      })
      setComments(updatedComments)
    } else {
      let updatedComments = comments.filter(element => {
        return element.id === comment.id
      })
      setComments(updatedComments)
    }
  }

  return (
    <RichSlate
      className={classes.slate}
      createRichEditor={createRichEditor()}
      value={value}
      onChangeValue={handleChangeValue}
    >
      <RichHoveringToolbar
        editorId={2}
        toolbarButtons={toolbarButtons}
        comments={comments}
        onChangeComment={handleChangeComment}
      ></RichHoveringToolbar>
      <RichEditable
        // Extend the renderLeaf to add more utils
        extendRenderLeaf={props => Leaf(props)}
        comments={comments}
        onChangeComment={handleChangeComment}
      />
    </RichSlate>
  )
}

// To add marks and use your own Marks
// Enable it in toolbarButtons
// Ex:  {
//       type: 'Mark',
//       format: 'blue',
//       icon: <FormatColorTextIcon color="primary" />,
//     },
// Extend the renderLeaf to add more utils
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.blue) {
    children = (
      <span {...attributes} style={{ backgroundColor: 'blue' }}>
        {children}
      </span>
    )
  }
  return <span {...attributes}>{children}</span>
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]
