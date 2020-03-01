import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Box} from '@material-ui/core'
import BoldButton from '../Buttons/BoldButton'
import ItalicButton from '../Buttons/ItalicButton'
import UnderlinedButton from '../Buttons/UnderlinedButton'
import StrikethroughButton from '../Buttons/StrikethroughButton'
import CodeButton from '../Buttons/CodeButton'
import BulletedListButton from '../Buttons/BulletedListButton'
import NumberedListButton from '../Buttons/NumberedListButton'


const useStyles = makeStyles( theme => ({
  toolbar: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(1/4)
  }
  }))

export default function Toolbar({children, className, ...props}) {
  
  const classes = useStyles()
    return (
        <Box className={classes.toolbar}  borderRadius="borderRadius" {...props}>
            {!children && <> 
            <BoldButton />
            <ItalicButton />
            <UnderlinedButton />
            <StrikethroughButton />
            <CodeButton />
            <BulletedListButton />
            <NumberedListButton />
            </>
            }
            {children && children}
        </Box>
    )   
}