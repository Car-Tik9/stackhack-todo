import React from 'react';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import history from './utils/history'
import SignIn from './components/SignIn'
const theme = createMuiTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router history={history}>
        <Switch>
            <Route  exact path="/signin" component={SignIn}></Route>
            <Route  path="/signup" component={SignIn}></Route>
            <Route  path="/" component={SignIn}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
