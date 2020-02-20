import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar as ToolbarMenu } from './sharedComponents'
import { ToolbarButtons } from './ToolbarButtons'

/**
 * RichToolbar is the container of the rich util buttons.
 */
const RichToolbar = ({
  toolbarButtons,
  customToolbarButtons,
  onChangeComment,
  onChangeFootnote,
  children,
  ...props
}) => {
  // On comment change to pass value to parent
  function handleComments(value) {
    return onChangeComment(value)
  }

  // On footnote change to pass value to parent
  function handleChangeFootnotes(value) {
    return onChangeFootnote(value)
  }

  return (
    <ToolbarMenu {...props}>
      <ToolbarButtons
        toolbarButtons={toolbarButtons}
        onChangeComment={value => handleComments(value)}
        onChangeFootnote={value => handleChangeFootnotes(value)}
        {...props}
      >
        {children}
      </ToolbarButtons>
    </ToolbarMenu>
  )
}
export default RichToolbar

// PropTypes
RichToolbar.propTypes = {
  /** To override and style toolbar */
  className: PropTypes.object,
  /** To override and add styles of toolbar buttons */
  buttonClasses: PropTypes.object,
  /** unique id of the editor */
  editorId: PropTypes.number,
  /** 
   * format Buttons to display on toolbar 
   * 
   * Ex: Availble buttons 
   * 
   * [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Mark', format: 'underline' },
    { type: 'Mark', format: 'code' },
    { type: 'Block', format: 'bulleted-list' },
    { type: 'Block', format: 'numbered-list' },
    { type: 'Block', format: 'heading-one' },
    { type: 'Block', format: 'heading-two' },
    { type: 'Comment', format: 'comment' },
    { type: 'Footnote', format: 'footnote' }
  ]
   */
  toolbarButtons: PropTypes.arrayOf(PropTypes.object),
  /** on comment change */
  onChangeComment: PropTypes.func,
  /** on footnote change */
  onChangeFootnote: PropTypes.func,
}

// Default props
RichToolbar.defaultProps = {
  toolbarButtons: [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
  ],
}
