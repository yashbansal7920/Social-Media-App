import React, { useState, useContext } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import signup from '../../assets/signup.jpg';
import useStyles from './styles';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import SocialLogin from '../../components/social-login/SocialLogin';
import { AuthContext } from '../../Context/AuthContext';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
};
axios.defaults.withCredentials = true;

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const { setCurrentUser } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords are not same');
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/signUp`,
        formData
      );
      setCurrentUser(data);
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
            src={signup}
            alt="signup"
          />
        </Grid>

        <Grid
          // className={classes.form}
          style={{ paddingRight: '10%' }}
          item
          xs={12}
          sm={5}
        >
          <Typography variant="h3" color="primary" gutterBottom>
            SignUp
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              size="medium"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              label="Username"
            />
            <TextField
              fullWidth
              size="medium"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              label="Name"
            />
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
              size="medium"
              required
              type="password"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              label="Password"
            />
            <TextField
              className={classes.lastInput}
              fullWidth
              size="medium"
              required
              type="password"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              label="Confirm Password"
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
              SignUp
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              Or Login
            </Button>
            <SocialLogin />
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SignUp;
