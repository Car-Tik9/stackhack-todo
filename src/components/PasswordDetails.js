import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));
const PasswordDetails = () => {
  const classes = useStyles();
  return (
    <Paper elevation={4} className={classes.paper}>
      <Typography gutterBottom variant="h5" component="h1">
        Update Password
      </Typography>
      <Divider />
      <Grid className={classes.marginTop} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Current Password"
            size="small"
            id="currentpassword"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="New Password"
            size="small"
            id="newpassword"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            size="small"
            id="confirmpassword"
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="contained" color="secondary">
              {" "}
              Update Password{" "}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PasswordDetails;
