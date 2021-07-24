import React from 'react';
import axios from 'axios';
import { CardContent, Typography, IconButton } from '@material-ui/core';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const Comments = ({ comments, currentUserId, setPostData, postData }) => {
  const handleDeleteComment = async (commentId) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/post/deleteComment`,
        { postId: postData._id, commentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPostData(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return comments.length ? (
    comments.map((comment) => (
      <React.Fragment key={comment._id}>
        <CardContent>
          <Typography
            component={Link}
            to={
              currentUserId === comment.postedBy?._id
                ? '/me'
                : `/user/${comment.postedBy?._id}`
            }
            style={{
              fontWeight: 'bold',
              marginRight: '10px',
              textDecoration: 'none',
              color: 'black',
            }}
            display="inline"
            variant="body2"
          >
            {comment.postedBy?.username}
          </Typography>
          <Typography style={{ flex: 1 }} variant="caption" display="inline">
            <Moment fromNow>{comment.created}</Moment>
          </Typography>

          {currentUserId === comment.postedBy?._id ||
          postData.postedBy?._id === currentUserId ? (
            <IconButton
              onClick={(e) => handleDeleteComment(comment._id)}
              style={{ display: 'inline' }}
            >
              <DeleteIcon />
            </IconButton>
          ) : null}

          <Typography variant="subtitle2">{comment.text}</Typography>
        </CardContent>
      </React.Fragment>
    ))
  ) : (
    <CardContent>
      <Typography variant="subtitle1">No comments</Typography>
    </CardContent>
  );
};

export default Comments;
