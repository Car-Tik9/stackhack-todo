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
            <Route exact path="/signin" component={SignIn}></Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;
