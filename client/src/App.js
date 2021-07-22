import React from 'react';
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import createTheme from '@material-ui/core/styles/createTheme';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './pages/signup/SignUp';
import Login from './pages/Login/Login';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import UserProfile from './pages/User/userProfile/UserProfile';
import UpdateUser from './pages/User/update/UpdateUser';
import User from './pages/User/User';
import Post from './pages/posts/Post';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact component={SignUp} path="/signup" />
          <Route exact component={Login} path="/login" />
          <>
            <Navbar />
            <Route component={Home} exact path="/" />
            <Route exact path="/me" component={UserProfile} />
            <Route exact component={UpdateUser} path="/updateMe" />
            <Route component={User} exact path="/user/:userId" />
            <Route component={Post} exact path="/post/:postId" />
          </>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
