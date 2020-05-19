import { Button, Container, CssBaseline, Grid, InputLabel, Link, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import TodoApi from "../api/TodoApi";
import history from "../utils/history";
import Image from "../images/todo_image2.jpg";


const styles = (theme) => ({
  body: {
    backgroundColor: theme.palette.common.white,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
  },
  paper: {
    paddingTop: theme.spacing(18),
    display: "flex",
    alignItems: "center",
  },
  paperconatiner: {
    padding: theme.spacing(4, 2),
    opacity: 0.8,
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

class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    submitted: false,
    errorMessage: "",
  };

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { name, email, password } = this.state;
    if (name && email && password) {
      TodoApi.post("/user/register", { name, email, password })
        .then((res) => {
          if (res.status === 200) {
            history.push({pathname:"/signin",message:res.data.message});
          }
        })
        .catch((err) => {
          const { error } = err.response.data;
          this.setState({ errorMessage: error });
        });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <Container component="main" maxWidth="xs">
          <CssBaseline></CssBaseline>
          <div className={classes.paper}>
            <Paper elevation={2} className={classes.paperconatiner}>
              <Typography component="h1" variant="h5" align="center">
                Sign up
              </Typography>
              <ValidatorForm
                className={classes.form}
                onSubmit={this.handleOnSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextValidator
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Name"
                      value={this.state.name}
                      onChange={this.handleOnChange}
                      autoFocus
                      validators={["required"]}
                    errorMessages={["please enter your name"]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      name="email"
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      value={this.state.email}
                      onChange={this.handleOnChange}
                      validators={['required', 'isEmail']}
                     errorMessages={['Please Enter your Email', 'Please enter valid Email']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      name="password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      id="password"
                      label="Password"
                      value={this.state.password}
                      onChange={this.handleOnChange}
                      validators={["required"]}
                    errorMessages={["please enter the password"]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className={classes.errorString} error={true}>
                      {this.state.submitted && this.state.errorMessage}
                    </InputLabel>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/signin">Already have an account? Sign In</Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Paper>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);
