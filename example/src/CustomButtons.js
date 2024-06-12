import React from 'react'
import { useState, useMemo } from 'react'
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  ToolbarButton,
  defaultRenderElement,
  defaultRenderLeaf,
} from '@unicef/material-slate'
import { Box, styled } from '@mui/material'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import FormatSizeIcon from '@mui/icons-material/FormatSize'

//Initial contents of the editor
import initialValue from './initialValue'

const classes = {
  highlighted: 'highlighted',
  bigger: 'bigger',
  customSlate: 'customSlate',
  focused: 'focused',
  customEditable: 'customEditable',
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.highlighted}`]: {
    display: 'inline-block',
    backgroundColor: 'yellow',
    color: 'red',
  },
  [`& .${classes.bigger}`]: {
    fontSize: '125%',
  },
  [`& .${classes.customSlate}`]: {
    backgroundColor: theme.palette.grey[800],
    color: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
    '&:hover': {
      borderWidth: 1,
    },
  },
  [`& .${classes.focused}`]: {
    borderWidth: 1,
    borderColor: theme.palette.grey[400],
    '&:hover': {
      borderColor: theme.palette.grey[400],
    },
  },
  [`& .${classes.customEditable}`]: {
    fontFamily: 'Courier',
  },
}))

/**
 * Custom buttons material slate example
 */
export default function CustomButtons() {
  // Holds the value of the editor
  const [value, setValue] = useState(initialValue())

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), [])

  // handles block button renders
  const handleRenderElement = ({ element, children, attributes, ...rest }) => {
    if (element && element.type && element.type === 'bigger') {
      return (
        <p className={classes.bigger} {...attributes}>
          {children}
        </p>
      )
    } else {
      // Include a call to defaultRenderElement if you want to include
      return defaultRenderElement({ element, children, attributes, ...rest })
    }
  }

  // Add leaf handler to handle marks
  const handleRenderLeaf = ({ leaf, attributes, children, text }) => {
    //For each mark add a leaf with the same
    if (leaf.highlighted) {
      children = <span className={classes.highlighted}>{children}</span>
    }
    //You can also overwrite

    // Include a call to defaultRenderLeaf if you want to render marks that come out of the box
    // in material-slate
    // If you don't want to use them just return this
    // ```
    //  return <span {...attributes}>{children}</span>
    //
    // ```
    return defaultRenderLeaf({ leaf, children, attributes, text })
  }

  return (
    <StyledBox>
      <MaterialSlate
        editor={editor}
        value={value}
        onChange={value => setValue(value)}
        className={classes.customSlate}
        focusClassName={classes.focused}
      >
        {/* By default toolbars display a set of default buttons if no children
            but if childrens are added you have to specified all toolbar buttons
            List of available buttons is in /src/components/Buttons 
          */}
        <Toolbar>
          {/* Mark buttons are useful for inline stuff like bold, italic, etc. */}
          <ToolbarButton
            icon={<FormatColorFillIcon />}
            type="mark"
            format="highlighted"
          />
          {/* Block type buttons are useful for block content such as headings */}
          <ToolbarButton
            icon={<FormatSizeIcon />}
            type="block"
            format="bigger"
          />
        </Toolbar>
        <MaterialEditable
          renderElement={handleRenderElement}
          renderLeaf={handleRenderLeaf}
          className={classes.customEditable}
        />
      </MaterialSlate>
    </StyledBox>
  )
}
