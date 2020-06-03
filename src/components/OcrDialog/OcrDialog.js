import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import Main from './components/Main'

const OcrDialog = (props) => {
    return (
        <Dialog maxWidth="md" fullWidth={true} open={props.open}>
            <DialogContent>
                <Main setReload={props.setReload} handleDialogClose={props.handleDialogClose}/>
            </DialogContent>
        </Dialog>
    )
}

export default OcrDialog