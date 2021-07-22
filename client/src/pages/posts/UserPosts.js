import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setPosts(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPosts();
  }, [userId]);

  return posts ? (
    posts.map((post) => (
      <Grid
        component={Link}
        to={`/post/${post._id}`}
        key={post._id}
        item
        xs={6}
        md={4}
      >
        <img style={{ width: '80%' }} src={`/${post.image}`} alt="post" />
      </Grid>
    ))
  ) : (
    <Typography variant="h4" align="center">
      No Posts
    </Typography>
  );
};

export default UserPosts;
