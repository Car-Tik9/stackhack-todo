import React, { useState } from 'react'
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from '@material-ui/core';
import {makeStyles } from '@material-ui/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green } from '@material-ui/core/colors';
import ClassNames from 'classnames';

const styles = makeStyles( theme => ({
    success: {
        backgroundColor: green[600],
      },
      error: {
        backgroundColor: theme.palette.error.dark,
      },
      info: {
        backgroundColor: theme.palette.primary.main,
      },
      warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
}))
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};
const TodoSnackBar = (props) => {
    const Icon = variantIcon[props.variant]    
    const classes= styles();
    return (
        <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={props.open}
        autoHideDuration={2000}
        onClose={props.handleClose}
        TransitionComponent="Slide"
      >
        <SnackbarContent
          className={classes[props.variant]}
          message={
            <span id="aasya-snackbar" className={classes.message}>
              <Icon className={classes.icon} />
              {props.message}
            </span>
          }
        ></SnackbarContent>
      </Snackbar>
    )
}

TodoSnackBar.defaultProps ={
    open:false,
    variant:'success'
}
export default TodoSnackBar