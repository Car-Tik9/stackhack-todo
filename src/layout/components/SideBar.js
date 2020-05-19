import { Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import SidebarNav from './SidebarNav';



const styles = theme => ({

    drawer :{
        width:240,
        [theme.breakpoints.up('lg')]:{
            marginTop :64,
            height:'calc(100% - 64px)'
        }
    },
    root:{
        backgroundColor:theme.palette.white,
        display:'flex',
        flexDirection: 'column',
        height:'100%',
        padding:theme.spacing(2)
    },
    divider:{
        margin : theme.spacing(2,0)
    },
    nav :{
        marginBottom:theme.spacing(2)
    },
})


class Sidebar extends React.Component{
    render(){
        const {open , variant , onClose ,classes} = this.props;
        return(
            <Drawer anchor="left" open ={open} variant ={variant} 
            classes ={{ paper : classes.drawer}} onClose ={onClose}>
                <div className = {classes.root}>
                    <SidebarNav className ={classes.nav}></SidebarNav>
                </div>
            </Drawer>
        );
        
    }
}

export default withStyles(styles)(Sidebar)