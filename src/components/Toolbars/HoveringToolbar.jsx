import React from 'react'
import { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import BoldButton from '../Buttons/BoldButton'
import ItalicButton from '../Buttons/ItalicButton'
import UnderlinedButton from '../Buttons/UnderlinedButton'
import StrikethroughButton from '../Buttons/StrikethroughButton'
import CodeButton from '../Buttons/CodeButton'



const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body)
}

const useStyles = makeStyles(theme => ({
  hoveringToolbar: {
    position: 'absolute',
    padding: theme.spacing(1 / 4),
    zIndex: 1,
    top: "-10000px",
    left: "-10000px",
    opacity: 0,
    backgroundColor: theme.palette.grey[200],
    transition: "opacity 0.75s"
  }

}))
export default function HoveringToolbar({ children, className, ...props }) {

  const classes = useStyles()
  const ref = useRef()
  const editor = useSlate()

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
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - 4}px`
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`
  })

  return (
    <Portal>
      <Box
        borderRadius="borderRadius"
        ref={ref}
        className={className ? className : classes.hoveringToolbar}
        {...props}
      >
        {!children && <>
          <BoldButton />
          <ItalicButton />
          <UnderlinedButton />
          <StrikethroughButton />
          <CodeButton />
        </>
        }
        {children && children}
      </Box>
    </Portal>
  )
}
