import React from 'react'
import { Box } from '@material-ui/core'


export default function Toolbar({children, className, ...props}) {

    return (
        <Box {...props}>
            {children}
        </Box>
    )
    
}