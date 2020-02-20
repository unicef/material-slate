import React, { useState } from 'react'
import LinksExample from './examples/Links'
import HoveringToolbarExample from './examples/HoverToolbar'
import RichTextExample from './examples/RichText.js'
import { Grid } from '@material-ui/core'

export default function App() {
  return (
    <Grid mt={8} container>
      {/* <Button onClick={e => setComments([])}>Reset</Button> */}

      <RichTextExample />
      <HoveringToolbarExample />
      <LinksExample />
    </Grid>
  )
}
