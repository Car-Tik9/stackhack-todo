import  React from 'react'
import { Box, Avatar, Card, CardMedia } from '@material-ui/core'
import PlainImage from '../../../images/todo_image_tobeconverted.png'
import Converted from '../../../images/converted_image.png'
import ArrowForward from '@material-ui/icons/ArrowForward'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    
    imageConatiner: {
        height:100,
        width:400,
        borderRadius:8,
        borderColor:'black',
        borderWidth:2,
        padding:8,
        borderStyle:'groove'
    },
    image:{
        height:'100%',
        width:'100%'
    }

  }));
const UsageDisplay = () => {
    const classes = useStyles();
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center">
            <div className={classes.imageConatiner}>
           <img  alt ="image_screenshot" src={PlainImage} className={classes.image}/>
           </div>
           <ArrowForward color="primary" />
           <div className={classes.imageConatiner}>
           <img  alt ="converted_image" src={Converted} className={classes.image}/>
           </div>
        </Box>
    )
}

export default UsageDisplay