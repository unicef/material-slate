import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactEditor, useSlate } from 'slate-react'
import { Editor } from 'slate'
import { css,cx } from 'emotion'
import { Menu, Portal } from './sharedComponents'
import { Range } from 'slate'
import { ToolbarButtons } from './ToolbarButtons'

const RichHoveringToolbar = ({
  toolbarButtons,
  customToolbarButtons,
  onChangeComment,
  onChangeFootnote,
  children,
  className,
  ...props,
}) => {
  const ref = useRef()
  const editor = useSlate()

  // hover toolbar reference to selected text
  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = 1
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`
  })

  // On comment change to pass value to parent
  function handleComments(value) {
    return onChangeComment(value)
  }

   // On footnote change to pass value to parent
   function handleChangeFootnotes(value) {
    return onChangeFootnote(value)
  }

  return (
    <Portal>
      <Menu
        ref={ref}
        className={cx(className, css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1200;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          border: 1px solid rgba(0,103,181,1);
          background-color: #fff;
          border-radius: 4px;
          transition: opacity 0.75s;
        `)}
      >
        <ToolbarButtons
          toolbarButtons={toolbarButtons}
          onChangeComment={value => handleComments(value)}
          onChangeFootnote={value => handleChangeFootnotes(value)}
          {...props}
        >
          {children}
        </ToolbarButtons>
      </Menu>
    </Portal>
  )
}

export default RichHoveringToolbar

// PropTypes
RichHoveringToolbar.propTypes = {
  /** To override and style toolbar */
  className: PropTypes.object,
  /** unique id of the editor */
  editorId: PropTypes.number,
  /** To override and add styles of toolbar buttons */
  buttonClasses: PropTypes.object,
  /** format Buttons to display on toolbar  */
  toolbarButtons: PropTypes.arrayOf(PropTypes.object),
  /** on comment change */
  onChangeComment: PropTypes.func,
  /** on footnote change */
  onChangeFootnote: PropTypes.func,
}

// Default props
RichHoveringToolbar.defaultProps = {
  toolbarButtons: [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Mark', format: 'underline' },
    { type: 'Mark', format: 'code' },
    { type: 'Comment', format: 'comment' },
  ],
}
