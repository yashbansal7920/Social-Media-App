import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Container,
  Avatar,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import useStyles from './styles';
import { useParams } from 'react-router';
import avatar from '../../assets/avatar.png';
import UserPosts from '../posts/UserPosts';
import PostModal from '../../components/PostModal/PostModal';

const User = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isFollow, setIsFollow] = useState(false);

  const { userId } = useParams();

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
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUserData(data);

        setIsFollow(
          data?.followers?.filter((f) => f._id !== currentUser._id).length !==
            data?.followers.length
        );
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUser();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/follow`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCurrentUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUnFollow = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/unfollow`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCurrentUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

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
              Posts {userData.posts} &nbsp;
            </Typography>
            <PostModal users={userData?.followers}>
              <Typography variant="body1" display="inline">
                &nbsp; Followers {userData.followers?.length} &nbsp;
              </Typography>
            </PostModal>
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
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {isFollow ? (
              <Button
                onClick={handleUnFollow}
                variant="contained"
                color="primary"
              >
                UnFollow
              </Button>
            ) : (
              <Button
                onClick={handleFollow}
                variant="contained"
                color="primary"
              >
                Follow
              </Button>
            )}
          </Grid>
          <Divider />
          <Grid item container xs={12}>
            <UserPosts userId={userId} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default User;
