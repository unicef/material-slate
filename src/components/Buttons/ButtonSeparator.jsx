import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import {useTheme} from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

export default function ButtonSeparator({borderColor, ...other}) {
  const theme = useTheme()
  return(
    <Box display="inline"  {...other}>
        <Box borderLeft={1} borderColor={borderColor ? borderColor : "grey.400"} marginLeft="2px" marginRight="2px" display="inline"></Box>
    </Box>
  )
}

