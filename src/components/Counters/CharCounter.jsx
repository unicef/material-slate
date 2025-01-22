import React from 'react'
import { useSlate } from 'slate-react'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { styled } from '@mui/material'

const classes = {
  textError: 'text-error',
}

const RootTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1),
  [`&.${classes.textError}`]: {
    color: theme.palette.error.main,
  },
}))

/**
 *
 * CharCounter for editor
 * It displays the number characters in the editor
 *  - If maxChars = 200, charLength = 90  `Ex: 90/200 characters` will display in the counter
 *  - When maxChars is undefined, charLength = 90 `Ex: 90 characters` will be displayed
 * Char counter will be displayed with error color, when CharLength exceeds maxChars
 */
export default function CharCounter({ maxChars }) {
  const editor = useSlate()
  const { children } = editor
  // Char length
  const charLength = editor.getCharLength(children)
  // Error based on chars length limit
  const errorExceedCharsLimit = charLength > maxChars

  return (
    <RootTypography
      variant="subtitle2"
      color="textSecondary"
      className={`${errorExceedCharsLimit && classes.textError}`}
    >
      {maxChars ? `${charLength} / ${maxChars}` : charLength} characters
    </RootTypography>
  )
}

CharCounter.propTypes = {
  /**
   * To display maximum characters in counter
   * - If maxChars = 200, charLength = 90  `Ex: 90/200 characters` will display in the counter
   * - When maxChars is undefined, charLength = 90 `Ex: 90 characters` will be displayed
   */
  maxChars: PropTypes.number,
}
