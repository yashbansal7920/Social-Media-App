import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Avatar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import avatar from '../../../assets/avatar.png';
import ProfilePosts from '../../posts/ProfilePosts';
import PostModal from '../../../components/PostModal/PostModal';

const UserProfile = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMe();
  }, []);

  return (
    <div className={classes.container}>
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
              Posts {userData.posts} &nbsp;
            </Typography>{' '}
            <PostModal users={userData?.followers}>
              <Typography variant="body1" display="inline">
                &nbsp; Followers {userData.followers?.length} &nbsp;
              </Typography>
            </PostModal>{' '}
            <PostModal users={userData?.following}>
              <Typography variant="body1" display="inline">
                &nbsp; Following {userData.following?.length}
              </Typography>
            </PostModal>
            <br />
            <br />
            <Typography variant="h6">{userData.name}</Typography>
            <Typography variant="subtitle1">{userData.bio}</Typography>
          </Grid>
          <Grid></Grid>
          <Grid item xs={12}>
            <Button
              component={Link}
              to="/updateMe"
              color="primary"
              variant="outlined"
              fullWidth
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid container justifyContent="center" item xs={12}>
            <ProfilePosts />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default UserProfile;
