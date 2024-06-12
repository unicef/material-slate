import React from 'react'
import { Box } from '@mui/material'

/**
 * Toolbar button separator.
 *
 * Displays an horizontal line. Use it for separating groups of buttons.
 *
 */

export default function ButtonSeparator({ borderColor, ...other }) {
  return (
    <Box display="inline" {...other}>
      <Box
        borderLeft={1}
        borderColor={borderColor ? borderColor : 'grey.400'}
        marginLeft="2px"
        marginRight="2px"
        display="inline"
      ></Box>
    </Box>
  )
}
