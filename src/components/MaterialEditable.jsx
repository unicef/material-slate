import React, { useCallback } from 'react'
import { Editable, useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import isHotkey from 'is-hotkey'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily

  }
}))

/**
 * Wrapper of Slate Editable
 *  
 */
export default function RichEditable({ renderElement, renderLeaf, placeholder, hotkeys, onHotkey, children }) {

  const editor = useSlate()

  const defaultHotKeys = {
    'mod+b': {
      type: 'mark',
      value: 'bold'
    },
    'mod+i': {
      type: 'mark',
      value: 'italic',
    },
    'mod+u': {
      type: 'mark',
      value: 'underlined'
    },
    'mod+`': {
      type: 'mark',
      value: 'code'
    },
    'shift+enter':  {
      type: 'newline',
      value: ''
    }
  }

  const allHotkeys = {
    ...defaultHotKeys,
    ...hotkeys,
  }
  const classes = useStyles()

  // Define a rendering function based on the element passed to `props`. 
  // Props is deconstructed in the {element, attributes, children, rest (any other prop)
  // We use `useCallback` here to memoize the function for subsequent renders.
  const handleRenderElement = useCallback(({ element, children, attributes, ...rest }) => {
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return renderElement({ element, attributes, children, rest })
    }
  }, [])

  const handleRenderLeaf = useCallback(({ leaf, attributes, children, ...rest }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
    if (leaf.code) {
      children = <code>{children}</code>
    }
    if (leaf.italic) {
      children = <em>{children}</em>
    }
    if (leaf.strikethrough) {
      children = <del>{children}</del>
    }
    if (leaf.underlined) {
      children = <u>{children}</u>
    }
    return renderLeaf({ leaf, attributes, children, rest })
  }, [])

  const handleOnKeyDown = (event) => {
     for (const pressedKeys in allHotkeys) {
      if (isHotkey(pressedKeys, event)) {
        const hotkey = allHotkeys[pressedKeys]
        console.log(hotkey)
        event.preventDefault()
        if (hotkey.type === 'mark') {
          editor.toggleMark(hotkey.value)
        }
        if (hotkey.type === 'block') {
          editor.toggleBlock(hotkey.value)
        }
        if (hotkey.type === 'newline') {
          editor.insertText('\n')
        }
        return onHotkey && onHotkey({ event, editor, hotkey, pressedKeys, allHotkeys })
      }
    }
  }
    return (
      <Box className={classes.root}>
        <Editable
          renderElement={props => handleRenderElement(props)}
          renderLeaf={props => handleRenderLeaf(props)}
          onKeyDown={event => handleOnKeyDown(event)}
          placeholder={placeholder}
        >{children}</Editable>
      </Box>
    )
  }

  // Specifies the default values for props:
  RichEditable.defaultProps = {
    renderElement: ({ element, attributes, children, ...rest }) => { return <p {...attributes}>{children}</p> },
    renderLeaf: ({ leaf, attributes, children, ...rest }) => { return <span {...attributes}>{children}</span> },
    placeholder: "Type some text..."
  };

  // TODO add info about arguments in functions

  RichEditable.propTypes = {
    /** Called when an element needs to be rendered */
    renderElement: PropTypes.func,
    /** Called when a leaf needs to be rendered */
    renderLeaf: PropTypes.func,
    /** Text to display when there are no contents on the editor. Default" "Type some text..." */
    placeholder: PropTypes.string,
    /** 
     * Additional hotkeys to be added other than default. Object of the form `{'mod+k': {type: 'mark', value: 'italic'}  
     */
    hotkeys: PropTypes.object,
    /** 
     * Event tht will be triggered in case a hotkey is detected 
     * It has one single argument that can be deconstructed in `{event, editor, hotkey, pressedKeys, allHotkeys}`
     */
    onHotKey: PropTypes.func
  }