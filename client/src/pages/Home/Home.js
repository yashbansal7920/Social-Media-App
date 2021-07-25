import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import Post from '../../components/posts/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/followedPosts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

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

  return !isLoading ? (
    <Container maxWidth="sm">
      {posts.length ? (
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              userData={userData}
              postData={post}
              setPostData={setPosts}
              postId={post._id}
            />
          );
        })
      ) : (
        <Typography variant="h3">You all Caught up</Typography>
      )}
    </Container>
  ) : (
    <CircularProgress />
  );
};

export default Home;
