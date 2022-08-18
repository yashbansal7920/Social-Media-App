import React, { useContext, useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import avatar from '../../assets/avatar.png';
import SearchModal from '../SearchModal/SearchModal';

import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <AppBar className={classes.root} color="inherit" position="sticky">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          className={classes.title}
          variant="h3"
          color="primary"
        >
          Socios
        </Typography>
        {localStorage.getItem('token') ? (
          <>
            {' '}
            <SearchModal userId={user?._id}>
              <IconButton className={classes.icon} size="medium">
                <SearchIcon fontSize="large" />
              </IconButton>
            </SearchModal>
            <Avatar
              src={`/${user?.profilePhoto}` || avatar}
              component={Link}
              to="/me"
              className={classes.avatar}
            />
            <Button
              onClick={handleLogout}
              component={Link}
              to="/login"
              color="primary"
              variant="outlined"
            >
              Log out
            </Button>{' '}
          </>
        ) : (
          <>
            {' '}
            <Button
              component={Link}
              to="/signup"
              className={classes.signup}
              variant="contained"
              color="primary"
            >
              SignUp
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
            >
              Login
            </Button>{' '}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
