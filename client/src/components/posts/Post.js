import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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

const Post = ({
  userData,
  isLiked,
  postData,
  postId,
  setIsLiked,
  setPostData,
}) => {
  const history = useHistory();

  const [expand, setExpand] = useState(false);
  const [comment, setComment] = useState('');

  const handleExpandClick = () => {
    setExpand((prev) => !prev);
  };

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

  const handleLikePost = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/post/like`,
        { postId: postData._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // console.log(data);
      setPostData(data);
      setIsLiked(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUnlikePost = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/post/unlike`,
        { postId: postData._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // console.log(data);
      setPostData(data);
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
        { postId: postData._id, comment: { text: comment } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPostData(data);
      setComment('');
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
              Likes {postData.likes?.length}
            </Typography>
            <Button onClick={handleExpandClick}>View Comments</Button>
          </CardActions>

          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Comments
              comments={postData.comments}
              currentUserId={userData._id}
              setPostData={setPostData}
              postData={postData}
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
