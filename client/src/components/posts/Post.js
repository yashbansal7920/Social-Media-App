import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
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
  Collapse,
  InputAdornment,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendIcon from '@material-ui/icons/Send';
import Moment from 'react-moment';
import avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const Post = ({ userData, postData }) => {
  const history = useHistory();

  const [expand, setExpand] = useState(false);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState(postData);

  const handleExpandClick = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    setIsLiked(post.likes?.includes(userData?._id));
  }, [post, userData]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/post/${post._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      history.goBack();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleLikePost = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/post/like`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPost(data);
      setIsLiked(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUnlikePost = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/post/unlike`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPost(data);
      setIsLiked(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/post/comment`,
        { postId: post._id, comment: { text: comment } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPost(data);
      setComment('');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    post && (
      <>
        <div style={{ marginTop: '32px' }} />

        <Card>
          <CardHeader
            component={Link}
            to={
              userData._id === post.postedBy?._id
                ? '/me'
                : `/user/${post.postedBy?._id}`
            }
            style={{ textDecoration: 'none', color: 'black' }}
            title={post?.postedBy?.username}
            subheader={<Moment fromNow>{post.createdAt}</Moment>}
            avatar={
              <Avatar
                src={
                  post.postedBy?.profilePhoto
                    ? `/${post.postedBy?.profilePhoto}`
                    : avatar
                }
                alt={post.postedBy?.name}
              />
            }
          />

          <CardMedia component="img" image={`/${post.image}`} />

          <CardContent>
            <Typography display="inline" variant="body2" component="p">
              {post.body}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            {isLiked ? (
              <IconButton
                onClick={handleUnlikePost}
                size="medium"
                color="secondary"
              >
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleLikePost}
                size="medium"
                color="secondary"
              >
                <FavoriteBorderIcon />
              </IconButton>
            )}

            <Typography style={{ flexGrow: 1 }} variant="subtitle2">
              Likes {post.likes?.length}
            </Typography>
            <Button onClick={handleExpandClick}>View Comments</Button>
          </CardActions>

          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Comments
              comments={post.comments}
              currentUserId={userData._id}
              setPostData={setPost}
              postData={post}
            />
          </Collapse>

          <form onSubmit={handleComment}>
            <TextField
              style={{ marginLeft: '10px', marginBottom: '10px' }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" color="primary">
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Write Comment"
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
            />
          </form>

          <CardActions>
            {userData._id === post.postedBy?._id && (
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
      </>
    )
  );
};

export default Post;
