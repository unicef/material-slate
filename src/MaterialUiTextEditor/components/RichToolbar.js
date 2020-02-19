import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar as ToolbarMenu } from './sharedComponents'
import { ToolbarButtons } from './ToolbarButtons'

const RichToolbar = ({
  toolbarButtons,
  customToolbarButtons,
  onChangeComment,
  onChangeFootnote,
  children,
  ...props
}) => {
  console.log({
    toolbarButtons,
    onChangeComment,
    onChangeFootnote,
    children,
    ...props,
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
    <ToolbarMenu>
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
  /** unique id of the editor */
  editorId: PropTypes.number,
  /** format Buttons to display on toolbar  */
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
    { type: 'Mark', format: 'underline' },
    { type: 'Mark', format: 'code' },
    { type: 'Comment', format: 'comment' },
    { type: 'Footnote', format: 'footnote' },
  ],
}
