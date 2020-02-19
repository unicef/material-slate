import React from 'react'
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
