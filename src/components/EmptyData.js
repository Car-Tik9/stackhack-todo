import React from 'react'
import { Box, Typography } from '@material-ui/core'
import HighLighOff from '@material-ui/icons/HighlightOffRounded'

const EmptyData = (props) => {
    return(
        <Box display="flex" alignItems="center" justifyContent="center" height="500px" flexDirection='column'>
            <HighLighOff style={{fontSize:150}}>
            </HighLighOff>
            <Typography variant="h5" component="h4">{props.message}</Typography>
        </Box>
    )
}

export default EmptyData