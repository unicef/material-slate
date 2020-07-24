import React, { useCallback } from 'react'
import { Transforms } from 'slate'
import { Editable, useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import isHotkey from 'is-hotkey'
import { makeStyles } from '@material-ui/core/styles'

import defaultRenderElement from './defaultRenderElement'
import defaultRenderLeaf from './defaultRenderLeaf'

const useStyles = makeStyles(theme => ({
  editable: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily,
  },
}))

/**
 * Wrapper of Slate Editable
 *
 */
export default function MaterialEditable({
  renderElement,
  renderLeaf,
  placeholder,
  hotkeys,
  onHotkey,
  children,
  className,
  allowHotKeys,
  ...props
}) {
  const editor = useSlate()

  const defaultHotKeys = {
    'mod+b': {
      type: 'mark',
      value: 'bold',
    },
    'mod+i': {
      type: 'mark',
      value: 'italic',
    },
    'mod+u': {
      type: 'mark',
      value: 'underlined',
    },
    'mod+`': {
      type: 'mark',
      value: 'code',
    },
    'shift+enter': {
      type: 'newline',
      value: '',
    },
  }

  const allHotkeys = {
    ...defaultHotKeys,
    ...hotkeys,
  }
  const classes = useStyles()

  // Define a rendering function based on the element passed to `props`.
  // Props is deconstructed in the {element, attributes, children, rest (any other prop)
  // We use `useCallback` here to memoize the function for subsequent renders.
  const handleRenderElement = useCallback(props => {
    return renderElement ? renderElement(props) : defaultRenderElement(props)
  }, [])

  const handleRenderLeaf = useCallback(props => {
    return renderLeaf ? renderLeaf(props) : defaultRenderLeaf(props)
  }, [])

  const handleOnKeyDown = event => {
    for (const pressedKeys in allHotkeys) {
      if (isHotkey(pressedKeys, event)) {
        const hotkey = allHotkeys[pressedKeys]
        //console.log(hotkey)
        event.preventDefault()
        if (hotkey.type === 'mark') {
          editor.toggleMark(hotkey.value)
        }
        if (hotkey.type === 'block') {
          editor.toggleBlock(hotkey.value)
        }
        if (hotkey.type === 'newline') {
          editor.insertText('\n')
          //The following line updates the cursor
          Transforms.move(editor, { distance: 0, unit: 'offset' })
        }
        return (
          onHotkey &&
          onHotkey({ event, editor, hotkey, pressedKeys, allHotkeys })
        )
      }
    }
  }
  return (
    <Editable
      renderElement={handleRenderElement}
      renderLeaf={handleRenderLeaf}
      onKeyDown={event => allowHotKeys && handleOnKeyDown(event)}
      placeholder={placeholder}
      className={`${classes.editable} ${className}`}
      {...props}
    >
      {children}
    </Editable>
  )
}

// Specifies the default values for props:
MaterialEditable.defaultProps = {
  placeholder: 'Type some text...',
  allowHotKeys: true,
}

// TODO add info about arguments in functions

MaterialEditable.propTypes = {
  /** To style and override the existing class  */
  className: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
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
  onHotKey: PropTypes.func,
  /** To allow hot keys in the editor. It is true by default*/
  allowHotKeys: PropTypes.bool,
}
