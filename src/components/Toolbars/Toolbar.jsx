import React from 'react'
import { Box, styled } from '@mui/material'
import BoldButton from '../Buttons/BoldButton'
import ItalicButton from '../Buttons/ItalicButton'
import UnderlinedButton from '../Buttons/UnderlinedButton'
import StrikethroughButton from '../Buttons/StrikethroughButton'
import CodeButton from '../Buttons/CodeButton'
import BulletedListButton from '../Buttons/BulletedListButton'
import NumberedListButton from '../Buttons/NumberedListButton'

const RootBox = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
}))

/**
 * Toolbar that appears on the top of the editor.
 *
 * It accepts any content as children. If no children are set it displays by default the following buttons:
 * Bold, italic, underline, strike through, code, bulleted list and numbered list
 */
export default function Toolbar({ children, className, ...props }) {
  return (
    <RootBox borderRadius="1px" {...props}>
      {!children && (
        <React.Fragment>
          <BoldButton />
          <ItalicButton />
          <UnderlinedButton />
          <StrikethroughButton />
          <CodeButton />
          <BulletedListButton />
          <NumberedListButton />
        </React.Fragment>
      )}
      {children && <React.Fragment>{children}</React.Fragment>}
    </RootBox>
  )
}
