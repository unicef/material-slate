import React, { useCallback } from 'react'
import { Transforms } from 'slate'
import { Editable, useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import isHotkey from 'is-hotkey'
import { styled } from '@mui/material'

import defaultRenderElement from './defaultRenderElement'
import defaultRenderLeaf from './defaultRenderLeaf'
import defaultHotkeys from './defaultHotkeys'

const StyledEditor = styled(Editable)(({ theme }) => ({
  padding: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  outline: 'none',
}))

/**
 * Wrapper of Slate Editable
 *
 */

export default function MaterialEditable({
  renderElement,
  renderLeaf,
  placeholder = 'Type some text...',
  hotkeys = defaultHotkeys,
  onHotkey,
  children,
  className,
  ...props
}) {
  const editor = useSlate()

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
    for (const pressedKeys in hotkeys) {
      if (isHotkey(pressedKeys, event)) {
        const hotkey = hotkeys[pressedKeys]
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
          onHotkey && onHotkey({ event, editor, hotkey, pressedKeys, hotkeys })
        )
      }
    }
  }
  return (
    <StyledEditor
      renderElement={handleRenderElement}
      renderLeaf={handleRenderLeaf}
      onKeyDown={event => handleOnKeyDown(event)}
      placeholder={placeholder}
      className={className}
      {...props}
    >
      {children}
    </StyledEditor>
  )
}

MaterialEditable.propTypes = {
  /** To style and override the existing class  */
  className: PropTypes.string,
  /** Called when an element needs to be rendered */
  renderElement: PropTypes.func,
  /** Called when a leaf needs to be rendered */
  renderLeaf: PropTypes.func,
  /** Text/component to display when there are no contents on the editor. Default" "Type some text..." */
  placeholder: PropTypes.any,
  /**
   * Additional hotkeys to be added other than default. Object of the form `{'mod+k': {type: 'mark', value: 'italic'}
   * defaultHotkeys can be disallowed by passing hotkeys as null
   */
  hotkeys: PropTypes.object,
  /**
   * Event tht will be triggered in case a hotkey is detected
   * It has one single argument that can be deconstructed in `{event, editor, hotkey, pressedKeys, hotkeys}`
   */
  onHotKey: PropTypes.func,
}
