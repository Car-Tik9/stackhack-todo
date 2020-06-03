import React, { Fragment } from 'react'
import EmptyData from '../../EmptyData'
import HappyIcon from '@material-ui/icons/MoodRounded'
import { Box, Button } from '@material-ui/core'

const Summary = (props) => {
    return (
        <Fragment>
            <EmptyData icon={HappyIcon} message="Todos has been successfully added" ></EmptyData>
            <Box>
                <Button variant="contained" color="primary">Go to dashboard </Button>
                <Button variant="contained" >Upload Image</Button>
            </Box>
        </Fragment>
    )
}
export default Summary