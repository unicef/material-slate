import React, { useState } from 'react'
import {
  RichSlate,
  RichEditable,
  createRichEditor,
  RichToolbar,
} from '@unicef/material-ui-texteditor'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  slate: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}))

export default function RichTextExample() {
  const classes = useStyles()
  const [value, setValue] = useState(initialValue)

  const [footnotes, setFootnotes] = useState([])
  const [comments, setComments] = useState([])

  // Toolbar Buttons
  const toolbarButtons = [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Mark', format: 'underline' },
    { type: 'Mark', format: 'code' },
    { type: 'Block', format: 'bulleted-list' },
    { type: 'Block', format: 'numbered-list' },
    { type: 'Block', format: 'heading-one' },
    { type: 'Block', format: 'heading-two' },
    { type: 'Comment', format: 'comment' },
    { type: 'Footnote', format: 'footnote' },
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

  // On change of footnotes
  function handleChangeFootnote(value) {
    let updatedList = []

    // update footnote
    if (value.type === 'update') {
      let footnote = value.footnote
      updatedList = footnotes.map(element => {
        if (element.id === footnote.id) {
          element.footnoteText = value.footnoteText
        }
        return element
      })
    } else {
      // add and remove with order
      const list = value.footnoteList
      updatedList = list.map((footnote, index) => {
        const footnoteWithNumber = {
          ...footnote[0],
          number: index + 1,
        }
        return footnoteWithNumber
      })
    }

    setFootnotes(updatedList)
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
        comments={comments}
        footnotes={footnotes}
        onChangeComment={handleChangeComment}
        onChangeFootnote={handleChangeFootnote}
      ></RichToolbar>
      <RichEditable
        comments={comments}
        footnotes={footnotes}
        onChangeComment={handleChangeComment}
        onChangeFootnote={handleChangeFootnote}
      />
    </RichSlate>
  )
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
