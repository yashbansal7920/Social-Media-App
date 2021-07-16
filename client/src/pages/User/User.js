import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, Avatar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useParams } from 'react-router';
import avatar from '../../assets/avatar.png';

const User = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});

  const { userId } = useParams();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        data.profilePhoto = data.profilePhoto.replace('/user', '');
        setUserData(data);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    fetchMe();
  }, [userId]);

  return (
    <Container maxWidth="sm">
      <div className={classes.toolbar} />
      {userData && (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Avatar
              className={classes.avatar}
              src={`/${userData.profilePhoto}` || avatar}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5">{userData.username}</Typography>
            <Typography variant="body1" display="inline">
              Posts 0
            </Typography>{' '}
            <Typography variant="body1" display="inline">
              Followers 0
            </Typography>{' '}
            <Typography variant="body1" display="inline">
              Following 0
            </Typography>
            <br />
            <br />
            <Typography variant="h6">{userData.name}</Typography>
            <Typography variant="subtitle1">{userData.bio}</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default User;
