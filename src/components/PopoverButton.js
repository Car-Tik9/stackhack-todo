import React from 'react'
import { Button, Tooltip} from '@material-ui/core'


const PopoverButton = (props) => {
    return (
        <Tooltip  title="Import your todos hassle free" arrow >
        <Button
            variant="contained"
            size="small"
            style={{marginRight:8}}
            onClick={() => props.handleOpen(true)}
            color="primary"
          >
            Auto Import
          </Button>
        </Tooltip>
    )
}

export default PopoverButton