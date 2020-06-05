import React from 'react'
import { Box, Typography } from '@material-ui/core'
import HighLighOff from '@material-ui/icons/HighlightOffRounded'

const EmptyData = (props) => {
    return(
        <Box display="flex" alignItems="center" justifyContent="center" height={props.height} flexDirection='column'>
            {props.children}
            <Typography variant="h5" component="h4">{props.message}</Typography>
        </Box>
    )
}

export default EmptyData