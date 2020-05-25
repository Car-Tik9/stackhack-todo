import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton , Hidden} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import InputIcon from '@material-ui/icons/Input'
import MenuIcon from '@material-ui/icons/Menu'
import { Cookies } from 'react-cookie';
import history from "../../utils/history";
const cookie = new Cookies();
const styles = theme  => ({
    root: {
        boxShadow: 'none'
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    },
    linkText :{
        color:'white',
        textDecoration:'none'
    }
});

class TopBar extends React.Component{
    handleSignout = () => {
        cookie.remove("token");
        history.push({pathname:"/signin",message:"You have been logged out successfully"});
      }
    render(){
        const {classes , onSidebarOpen} = this.props
        return(
            <AppBar 
            className ={classes.root}>
                <Toolbar>
                    <RouterLink to="/" className ={classes.linkText}>
                        <Typography gutterBottom = {false}  component="h1" variant="h4">
                            Memoranda
                        </Typography>
                    </RouterLink>
                    <div className ={classes.flexGrow} />
                        <Hidden mdDown>
                            <IconButton className ={classes.signOutButton}
                            color="inherit" onClick ={this.handleSignout}>
                                <InputIcon></InputIcon>
                            </IconButton>
                        </Hidden>
                        <Hidden lgUp>
                            <IconButton className ={classes.signOutButton}
                                color="inherit"
                                onClick = {onSidebarOpen}>
                                    <MenuIcon></MenuIcon>
                            </IconButton>
                        </Hidden>
                </Toolbar>
            </AppBar>
        )
    }    
}

export default withStyles(styles)(TopBar)