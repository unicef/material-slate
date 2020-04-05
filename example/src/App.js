
import React  from "react"

import { makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Basic from './Basic'
import Hovering from './Hovering'
import Advanced from './Advanced'

const useStyles = makeStyles(theme => ({
  intro: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  example: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  readable: {
    maxWidth: 800
  }
}))

export default function App() {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.intro}>
       <Typography variant="h1">UNICEF Material Slate</Typography>
       <Typography>A simple rich text editor for React that uses Material UI and Slate</Typography>
       <Typography variant="h4"><a href='https://github.com/unicef/material-slate/'>View on Github</a></Typography>
       </Box>
      <Box className={`${classes.example} ${classes.readable} ` }>
      <Typography variant="h2">Basic Editor Example</Typography>
          <a href="https://github.com/unicef/material-slate/blob/master/example/src/Basic.js">View source code</a>
          <Basic />
      </Box>

      <Box className={`${classes.example} ${classes.readable} ` }>
      <Typography variant="h2">Hover toolbar</Typography>
      <Typography>Toolbar appears on selecting a text</Typography>
          <a href="https://github.com/unicef/material-slate/blob/master/example/src/Hovering.js">View source code</a>
          <Hovering />
      </Box>

      <Box className={classes.example}></Box>
      <Typography variant="h2">Advanced usage </Typography>
       <a href="https://github.com/unicef/material-slate/blob/master/example/src/Advanced.js">View source code</a>
       <Advanced />
      </>
   );
}
