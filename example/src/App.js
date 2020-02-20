import React, { useState } from 'react'
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
          <Link variant="body1" href="/">
            [View source]
          </Link>
        </Typography>
        {/* <Button onClick={e => setComments([])}>Reset</Button> */}

        <RichTextExample />
      </Grid>
      <Grid item direction="column">
        <Typography variant="h6" style={{ paddingLeft: 8 }}>
          Hovering Toolbar{' '}
          <Link variant="body1" href="/">
            [View source]
          </Link>
        </Typography>
        {/* <Button onClick={e => setComments([])}>Reset</Button> */}

        <HoveringToolbarExample />
      </Grid>
      <Grid item direction="column">
        <Typography variant="h6" style={{ paddingLeft: 8 }}>
          Custom Hook (Links){' '}
          <Link variant="body1" href="/">
            [View source]
          </Link>
        </Typography>
        {/* <Button onClick={e => setComments([])}>Reset</Button> */}

        <LinksExample />
      </Grid>
    </Grid>
  )
}
