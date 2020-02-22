import React from 'react'
import { Box } from '@material-ui/core'


export default function RichToolbar({children, className, ...props}) {

    return (
        <Box>
            {children}
        </Box>
    )
    
}