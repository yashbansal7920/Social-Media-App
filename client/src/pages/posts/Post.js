import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  Button,
  Avatar,
  TextField,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Moment from 'react-moment';
import avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setPostData(data);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPost();
  }, [postId]);

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
        setUserData(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchMe();
  }, []);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      history.goBack();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    postData && (
      <Container maxWidth="sm">
        <div style={{ marginTop: '32px' }} />

        <Card>
          <CardHeader
            component={Link}
            to={
              userData._id === postData.postedBy?._id
                ? '/me'
                : `/user/${postData.postedBy?._id}`
            }
            style={{ textDecoration: 'none', color: 'black' }}
            title={postData?.postedBy?.username}
            subheader={<Moment fromNow>{postData.createdAt}</Moment>}
            avatar={
              <Avatar
                src={
                  postData.postedBy?.profilePhoto
                    ? `/${postData.postedBy?.profilePhoto}`
                    : avatar
                }
                alt={postData.postedBy?.name}
              />
            }
          />

          <CardMedia component="img" image={`/${postData.image}`} />
          <CardContent>
            <Typography display="inline" variant="body2" component="p">
              {postData.body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton size="medium" color="secondary">
              <FavoriteIcon />
            </IconButton>
            <Typography style={{ flexGrow: 1 }} variant="subtitle2">
              Likes 0
            </Typography>
            <Button>View Comments</Button>
          </CardActions>
          <TextField fullWidth label="Write Comment" />
          <CardActions>
            {userData._id === postData.postedBy?._id && (
              <Button
                onClick={handleDeletePost}
                variant="outlined"
                style={{ marginLeft: 'auto' }}
              >
                Delete Post
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
    )
  );
};

export default Post;
