import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const Navbar = () => {
  const classes = useStyles();
  const [isLogout, setIsLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogout(true);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) return;

    const fetchUser = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setCurrentUser(data);
    };
    fetchUser();
  }, []);

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
            <SearchModal userId={currentUser?._id}>
              <IconButton className={classes.icon} size="medium">
                <SearchIcon fontSize="large" />
              </IconButton>
            </SearchModal>
            <Avatar
              src={`/${currentUser?.profilePhoto}` || avatar}
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
