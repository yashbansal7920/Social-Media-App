import React from 'react';
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import createTheme from '@material-ui/core/styles/createTheme';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './pages/signup/SignUp';
import Login from './pages/Login/Login';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import User from './pages/User/User';
import UpdateUser from './pages/User/update/UpdateUser';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Route component={Home} exact path="/" />
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/me">
            <User />
          </Route>
          <Route exact path="/updateMe">
            <UpdateUser />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
