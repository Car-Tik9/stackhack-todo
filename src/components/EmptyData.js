import React from 'react'
import { Box, Typography } from '@material-ui/core'
import HighLighOff from '@material-ui/icons/HighlightOffRounded'

const EmptyData = (props) => {
    const {icon:Icon} = props;
    return(
        <Box display="flex" alignItems="center" justifyContent="center" height={props.height} flexDirection='column'>
            <Icon style={{fontSize:150}}>
            </Icon>
            <Typography variant="h5" component="h4">{props.message}</Typography>
        </Box>
    )
}

export default EmptyData