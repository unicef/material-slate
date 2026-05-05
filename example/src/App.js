import React from 'react'

import { Box, Typography, styled } from '@mui/material'
import Basic from './Basic'
import Hovering from './Hovering'
import CustomButtons from './CustomButtons'
import Counter from './Counter'
import ReadOnly from './ReadOnly'
import Advanced from './Advanced'
import Link from './Link'

const classes = {
  intro: 'intro',
  air: 'air',
  readable: 'readable',
}

const Root = styled(Box)(({ theme }) => ({
  [`& .${classes.intro}`]: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  [`& .${classes.air}`]: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  [`& .${classes.readable}`]: {
    maxWidth: 800,
  },
}))

export default function App() {
  return (
    <Root>
      <Box className={classes.intro}>
        <Typography variant="h1">UNICEF Material Slate</Typography>
        <Typography>
          A simple rich text editor for React that uses Material UI and Slate
        </Typography>
      </Box>
      <Box className={classes.air}>
        <Typography variant="h4">
          <a href="https://github.com/unicef/material-slate/">
            View README on Github
          </a>
        </Typography>
      </Box>
      <Box className={`${classes.air} ${classes.readable} `}>
        <Typography variant="h2">Basic Editor Example</Typography>
        <a href="https://github.com/unicef/material-slate/blob/master/example/src/Basic.js">
          View source code
        </a>
        <Basic />
      </Box>

      <Box className={`${classes.air} ${classes.readable} `}>
        <Typography variant="h2">Hover toolbar</Typography>
        <Typography>Toolbar appears on selecting a text</Typography>
        <a href="https://github.com/unicef/material-slate/blob/master/example/src/Hovering.js">
          View source code
        </a>
        <Hovering />
      </Box>

      <Box className={`${classes.air} ${classes.readable} `}>
        <Typography variant="h2">Custom Buttons & Styles</Typography>
        <Typography>Create custom buttons and custom style</Typography>
        <a href="https://github.com/unicef/material-slate/blob/master/example/src/CustomButtons.js">
          View source code
        </a>
        <CustomButtons />
      </Box>

      <Box className={`${classes.air} ${classes.readable} `}>
        <Typography variant="h2">Word and character counter</Typography>
        <a href="https://github.com/unicef/material-slate/blob/master/example/src/Counter.js">
          View source code
        </a>
        <Counter />
      </Box>

      <Box className={`${classes.air} ${classes.readable} `}>
        <Typography variant="h2">Link Example</Typography>
        <a href="https://github.com/unicef/material-slate/blob/master/example/src/Link.js">
          View source code
        </a>
        <Link />
      </Box>

      <Box className={`${classes.air} ${classes.readable} `}>
        <Typography variant="h2">Read only mode</Typography>
        <a href="https://github.com/unicef/material-slate/blob/master/example/src/ReadOnly.js">
          View source code
        </a>
        <ReadOnly />
      </Box>

      <Box className={classes.air}>
        <Typography variant="h2">Advanced usage </Typography>
        <a href="https://github.com/unicef/material-slate/blob/master/example/src/Advanced.js">
          View source code
        </a>
        <Advanced />
      </Box>
    </Root>
  )
}
