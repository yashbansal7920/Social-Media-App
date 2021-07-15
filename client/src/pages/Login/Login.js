import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import login from '../../assets/login.jpg';
import useStyles from './styles';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SocialLogin from '../../components/social-login/SocialLogin';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        formData
      );

      localStorage.setItem('token', data.token);

      history.push('/');
      setFormData(initialState);
    } catch (error) {
      if (error.response) {
        setTimeout(() => {
          setError('');
        }, 5000);
        setError(error.response.data);
      }
      console.log(error);
    }
  };

  return (
    <Paper>
      <Grid
        className={classes.root}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item xs={12} sm={7}>
          <img
            style={{ width: '70%', objectFit: 'contain' }}
            src={login}
            alt="login"
          />
        </Grid>
        <Grid
          // className={classes.form}
          style={{ paddingRight: '10%' }}
          item
          xs={12}
          sm={5}
        >
          <Typography variant="h3" color="primary">
            Welcome back
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              size="medium"
              required
              type="email"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              label="Email"
            />
            <TextField
              fullWidth
              className={classes.lastInput}
              size="medium"
              required
              type="password"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              label="Password"
            />

            {error && (
              <Typography display="block" color="error" variant="subtitle1">
                {error}
              </Typography>
            )}

            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              color="primary"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="secondary"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              Or Create one
            </Button>
            <SocialLogin />
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
