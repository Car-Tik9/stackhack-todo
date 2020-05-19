import React from 'react';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import history from './utils/history'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';
import RouteWithLayout from './utils/RouteWithLayout';
import Main from './layout/Main'
const theme = createMuiTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router history={history}>
        <Switch>
            <Route  exact path="/signin" component={SignIn}></Route>
            <Route  exact path="/signup" component={SignUp}></Route>
            <RouteWithLayout
              exact
              path="/dashboard"
              component={Dashboard} layout={Main}
            ></RouteWithLayout>
            <Redirect exact from="/" to="/dashboard" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
