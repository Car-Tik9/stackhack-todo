import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import AccountDetails from "./AccountDetails";
import PasswordDetails from "./PasswordDetails";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
    },
    marginTop:{
        marginTop:theme.spacing(2)
    }
  }));
const Account = (props) => {
    const classes = useStyles();
  return (
    <Container className={classes.marginTop}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
            <AccountDetails/>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
            <PasswordDetails></PasswordDetails>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
