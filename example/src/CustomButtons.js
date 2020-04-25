
import React from "react"
import { useState, useMemo } from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  ToolbarButton, 
  defaultRenderElement,
  defaultRenderLeaf
} from '@unicef/material-slate' 

import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import { makeStyles } from '@material-ui/core/styles'

//Initial contents of the editor
import initialValue from './initialValue'

const useStyles = makeStyles( theme => ({
  highlighted: {
    display: 'inline-block',
    backgroundColor: 'yellow',
    color: 'red'
  }
}))

/**
 * Custom buttons material slate example
 */
export default function CustomButtons() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), [])

  const classes = useStyles()

  const handleRenderElement = ({ element, children, attributes, ...rest }) => {
   
    return defaultRenderElement({ element, children, attributes, ...rest })
  }

  // Add leaf handler to handle marks
  const handleRenderLeaf = ({leaf, attributes, children, text }) => {
    if (leaf.highlighted) {
      children = <span className={classes.highlighted}>{children}</span>
    }
  return defaultRenderLeaf({leaf, children, attributes, text})
  }

  return (
      <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
        {/* By default toolbars display a set of default buttons if no children
            but if childrens are added you have to specified all toolbar buttons
            List of available buttons is in /src/components/Buttons 
          */}
        <Toolbar >
          <ToolbarButton icon={<FormatColorFillIcon /> } type="mark" format="highlighted" />     
        </Toolbar>
        <MaterialEditable 
        renderElement={handleRenderElement}
        renderLeaf={handleRenderLeaf}
        />
      </MaterialSlate>
  )
}
