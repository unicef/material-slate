import React from 'react'
import { Toolbar as ToolbarMenu } from './components'
import { ToolbarButtons } from './SlateRendering'

export const Toolbar = ({ toolbarButtons }) => {
  return (
    <ToolbarMenu>
      <ToolbarButtons toolbarButtons={toolbarButtons} />
    </ToolbarMenu>
  )
}
