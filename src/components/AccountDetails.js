import React, { useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { userContext } from "../utils/userContext";
import { useContext } from "react";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));
const AccountDetails = (props) => {
  const classes = useStyles();
  const value = useContext(userContext);
  const [user, setUserDetails] = useState(value);
  const handleUserDataChange = (event) => {
    setUserDetails({ ...user, [event.target.id]: event.target.value });
  };
  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography gutterBottom variant="h5" component="h1">
        Account Details
      </Typography>
      <Divider />
      <Grid className={classes.marginTop} container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            size="small"
            value={user.name}
            id="name"
            onChange={handleUserDataChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            size="small"
            value={user.email}
            id="email"
            onChange={handleUserDataChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="outlined" color="primary">
              {" "}
              Update Deatails{" "}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountDetails;
