import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Button } from '@material-ui/core';
import CreatePost from './CreatePost/CreatePost';
import { Link } from 'react-router-dom';

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const [createPost, setCreatePost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/post`,
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
  }, [createPost]);

  return (
    <>
      <Grid item xs={6} />
      <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={6}>
        <CreatePost setCreatePost={setCreatePost}>
          <Button
            style={{ marginBottom: '20px' }}
            color="primary"
            variant="contained"
          >
            Feed Post
          </Button>
        </CreatePost>
      </Grid>
      {posts.length ? (
        posts.map((post) => (
          <Grid
            component={Link}
            to={`/post/${post._id}`}
            key={post._id}
            item
            xs={6}
            md={4}
          >
            <img style={{ width: '70%' }} src={`/${post.image}`} alt="post" />
          </Grid>
        ))
      ) : (
        <Typography variant="h4" align="center">
          No Posts
        </Typography>
      )}
    </>
  );
};

export default ProfilePosts;
