import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/VpnKey";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Image from "../images/todo_image1.jpg";
import TodoApi from "../api/TodoApi";
import history from '../utils/history';

import ClipLoader from "react-spinners/ClipLoader";

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  body: {
    backgroundColor: theme.palette.common.white,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition:'center'
  },
  paper: {
    margin: theme.spacing(16, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorString: {
    textAlign: "center",
  },
});

class SignIn extends React.Component {
  state = {
    password: "",
    submitted: false,
    email: "",
    errorMessage: "",
    isLoading: false
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    this.setState({ isLoading: true });
    this.setState({ submitted: true });

    if (email === "" || password === "") {
      this.setState({ isLoading: false });
      return;
    }

    TodoApi.post("/user/login", { email, password },{withCredentials: true})
      .then((response) => {
        if (response.status === 200) {
          history.push({pathname:"/dashboard",user:response.data});
          this.setState({ isLoading: false });
        } else {
          const error = new Error(response.error);
          this.setState({ isLoading: false });
          throw error;
        }
      })
      .catch((err) => {
        const { error } = err.response.data;
        this.setState({ isLoading: false });
        this.setState({ errorMessage: error });
      });
  };

  render() {
    const { classes } = this.props;
    const message = this.props.location.message;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={false} md={8} className={classes.body} />
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h3" align="left">
              Sign in
            </Typography>
            <ValidatorForm
              className={classes.form}
              onSubmit={this.handleOnSubmit}
            >
              <TextValidator
                id="email"
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
                value={this.state.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "this field is required",
                  "Please enter valid Email",
                ]}
              />
              <TextValidator
                id="password"
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                type="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <PasswordIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
                value={this.state.password}
                validators={["required"]}
                errorMessages={["please enter the password"]}
              />
              <InputLabel className={classes.errorString} error={true}>
                {this.state.submitted && this.state.errorMessage}
              </InputLabel>
              {message && (
                <Typography variant="body1" color="secondary" align="center">
                  {message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {
                  !this.state.isLoading ? `SignIn` : <ClipLoader color="#FFF" size="20"/> 
                } 
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Sign Up ?
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SignIn);
