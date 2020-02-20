import React, { useState } from 'react'
import isUrl from 'is-url'
import {
  RichSlate,
  RichEditable,
  createRichEditor,
  RichToolbar,
  RichSlateButton,
} from '@unicef/material-ui-texteditor'
import { Editor, Transforms, Range } from 'slate'
import { useSlate } from 'slate-react'
import LinkIcon from '@material-ui/icons/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  slate: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}))

export default function LinksExample() {
  const classes = useStyles()
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
      createRichEditor={withLinks(createRichEditor())}
      value={value}
      onChangeValue={handleChangeValue}
    >
      <RichToolbar
        className={classes.toolbar}
        editorId={1}
        toolbarButtons={toolbarButtons}
      >
        {/** Add custom util button like below */}
        <LinkButton key="link">
          <LinkIcon />
        </LinkButton>
      </RichToolbar>
      <RichEditable extendRenderElement={props => Element(props)} />
    </RichSlate>
  )
}

/** To add blocks
 * Enable it in toolbarButtons
 * Ex:  {
 *      type: 'Block',
 *      format: 'blue',
 *       icon: <FormatColorTextIcon color="primary" />,
 *     },
 * If it is not in RichToolbarButtons list
 * Wrap the Button inside the RichToolbar like above
 * Ex: <RichToolbar>
 *  <LinkButton key="link">
 *    <LinkIcon />
 *  </LinkButton>
 * </RichToolbar>
 *
 * Then add element with format below
 */
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

// With Links
// Look slate js for how to add new hook(new utils) // https://github.com/ianstormtaylor/slate/blob/master/site/examples/links.js
const withLinks = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

// Insert Link
const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

// To check link button active or not
const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
  return !!link
}

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}

// Wrap link from slate
const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

// Link  Button
const LinkButton = ({ children, ...props }) => {
  const editor = useSlate()
  return (
    // Use RichSlateButton
    <RichSlateButton
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      {children}
    </RichSlateButton>
  )
}

const initialValue = [
  {
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes, like ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlinks' }],
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
          'This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.',
      },
    ],
  },
]
