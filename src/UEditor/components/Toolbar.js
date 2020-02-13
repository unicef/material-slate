import React from 'react'
import { Toolbar as ToolbarMenu } from './sharedComponents'
import { ToolbarButtons } from './ToolbarButtons'

export const Toolbar = ({
  toolbarButtons,
  customToolbarButtons,
  onChangeComment,
  ...props
}) => {
  // On comment change to pass value to parent
  function handleComments(value) {
    return onChangeComment(value)
  }

  return (
    <ToolbarMenu>
      <ToolbarButtons
        toolbarButtons={toolbarButtons}
        customToolbarButtons={customToolbarButtons}
        onChangeComment={value => handleComments(value)}
        {...props}
      />
    </ToolbarMenu>
  )
}
