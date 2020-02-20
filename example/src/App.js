import React from 'react'
import LinksExample from './examples/Links'
import HoveringToolbarExample from './examples/HoverToolbar'
import RichTextExample from './examples/RichText.js'
import { Grid, Typography, Link } from '@material-ui/core'

export default function App() {
  return (
    <Grid container spacing={3}>
      <Grid item direction="column">
        <Typography variant="h6" style={{ paddingLeft: 8 }}>
          RichText{' '}
          <Link
            variant="body1"
            href="https://github.com/unicef/material-ui-richeditor/blob/master/example/src/examples/RichText.js"
          >
            [View source]
          </Link>
        </Typography>
        <RichTextExample />
      </Grid>
      <Grid item direction="column">
        <Typography variant="h6" style={{ paddingLeft: 8 }}>
          Hovering Toolbar{' '}
          <Link
            variant="body1"
            href="https://github.com/unicef/material-ui-richeditor/blob/master/example/src/examples/HoverToolbar.js"
          >
            [View source]
          </Link>
        </Typography>
        <HoveringToolbarExample />
      </Grid>
      <Grid item direction="column">
        <Typography variant="h6" style={{ paddingLeft: 8 }}>
          Custom Hook (Links){' '}
          <Link
            variant="body1"
            href="https://github.com/unicef/material-ui-richeditor/blob/master/example/src/examples/Links.js"
          >
            [View source]
          </Link>
        </Typography>
        <LinksExample />
      </Grid>
    </Grid>
  )
}
