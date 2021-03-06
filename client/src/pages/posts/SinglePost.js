import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import Post from '../../components/posts/Post';

const SinglePost = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
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
      } catch (error) {
        console.log(error.response);
      } finally {
        setIsLoading(false);
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

  return (
    <Container maxWidth="sm">
      {!isLoading ? (
        <Post userData={userData} postData={postData} />
      ) : (
        <Typography>Loading..</Typography>
      )}
    </Container>
  );
};

export default SinglePost;
