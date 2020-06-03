import React from 'react';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import history from './utils/history'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';
import RouteWithLayout from './utils/RouteWithLayout';
import Main from './layout/Main'
import Account from './components/Account';
import ArchievedTodosMain from './components/ArchievedTodos/ArchievedTodosMain'

import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router history={history}>
        <Switch>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <RouteWithLayout
              exact
              path="/dashboard"
              component={Dashboard} layout={Main}
            ></RouteWithLayout>
            <RouteWithLayout
              exact
              path="/account"
              component={Account} layout={Main}
            ></RouteWithLayout>
            <RouteWithLayout
              exact
              path="/view-archieved"
              component={ArchievedTodosMain} layout={Main}
            ></RouteWithLayout>
            <Redirect exact from="/" to="/dashboard" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
