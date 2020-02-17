import React, { useState } from 'react'
import { initialValue } from 'data'
import UEditor from '@unicef/material-ui-texteditor'
import { Box, Button } from '@material-ui/core'
import FormatColorTextIcon from '@material-ui/icons/FormatColorText'
import { Transforms, Editor, Range } from 'slate'
import { useSlate } from 'slate-react'

function App() {
  const [value, setValue] = useState(initialValue)

  const [footnotes, setFootnotes] = useState([])
  const [comments, setComments] = useState([])

  // function createRichEditor() {
  //   withComments(withFootnotes(withHistory(withReact(createEditor()))))
  // }

  // const editor = useMemo(withLinks(createRichEditor()))
  // Toolbar Buttons
  const toolbarButtons = [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Comment', format: 'comment' },
    { type: 'Footnote', format: 'footnote' },
    {
      type: 'Mark',
      format: 'blue',
      icon: <FormatColorTextIcon color="primary" />,
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
    <Box mt={5}>
      <UEditor
        editorId={1}
        value={value}
        displayToolbar
        displayHoverToolbar={false}
        comments={comments}
        footnotes={footnotes}
        onChangeValue={handleChangeValue}
        toolbarButtons={toolbarButtons}
        onChangeComment={handleChangeComment}
        onChangeFootnote={handleChangeFootnote}
        extendRenderElement={props => Element(props)}
        extendRenderLeaf={props => Leaf(props)}
      />
      <Button onClick={e => setComments([])}>Reset</Button>
    </Box>
  )
}

// To add blocks and use your own Marks
// Enable it in toolbarButtons
// Ex:  {
//       type: 'Block',
//       format: 'blue',
//       icon: <FormatColorTextIcon color="primary" />,
//     },

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

// To add marks and use your own Marks
// Enable it in toolbarButtons
// Ex:  {
//       type: 'Mark',
//       format: 'blue',
//       icon: <FormatColorTextIcon color="primary" />,
//     },

const Leaf = ({ attributes, children, leaf }) => {
  const editor = useSlate()
  // console.log('editorValues', editor, Editor, Transforms)
  if (leaf.blue) {
    children = (
      <span {...attributes} style={{ backgroundColor: 'blue' }}>
        {children}
      </span>
    )
  }
  return <span {...attributes}>{children}</span>
}

export default App
