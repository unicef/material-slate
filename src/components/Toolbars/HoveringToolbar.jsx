import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Editor, Range } from 'slate'
import { useFocused, useSlate } from 'slate-react'
import { Box, styled } from '@mui/material'

import BoldButton from '../Buttons/BoldButton'
import ItalicButton from '../Buttons/ItalicButton'
import UnderlinedButton from '../Buttons/UnderlinedButton'
import StrikethroughButton from '../Buttons/StrikethroughButton'
import CodeButton from '../Buttons/CodeButton'

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body)
}

const classes = {
  hoveringToolbar: 'hoveringToolbar',
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.hoveringToolbar}`]: {
    position: 'absolute',
    padding: theme.spacing(1 / 4),
    zIndex: 1,
    top: '-10000px',
    left: '-10000px',
    opacity: 0,
    backgroundColor: theme.palette.grey[200],
    transition: 'opacity 0.75s',
  },
}))

/**
 * A hovering toolbar that is, a toolbar that appears over a selected text, and only when there is
 * a selection.
 *
 * If no children are provided it displays the following buttons:
 * Bold, italic, underlined, strike through and code.
 *
 * Children will typically be `ToolbarButton`.
 */
export default function HoveringToolbar({ children, className, ...props }) {
  const ref = useRef()
  const editor = useSlate()
  const inFocus = useFocused()

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !inFocus ||
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
    el.style.top = `${rect.top + window.scrollY - el.offsetHeight - 4}px`
    const left =
      rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2
    el.style.left = `${left < 0 ? 4 : left}px`
  })

  return (
    <Portal>
      <StyledBox
        borderRadius="borderRadius"
        ref={ref}
        className={className ? className : classes.hoveringToolbar}
        {...props}
      >
        {children ? (
          children
        ) : (
          <React.Fragment>
            <BoldButton />
            <ItalicButton />
            <UnderlinedButton />
            <StrikethroughButton />
            <CodeButton />
          </React.Fragment>
        )}
      </StyledBox>
    </Portal>
  )
}
