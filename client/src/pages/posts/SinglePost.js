import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../../components/posts/Post';

const SinglePost = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [userData, setUserData] = useState({});
  const [isLiked, setIsLiked] = useState(false);

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
        setIsLiked(data.likes.includes(userData._id));
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPost();
  }, [postId, userData]);

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
    <>
      <Post
        userData={userData}
        postData={postData}
        setPostData={setPostData}
        setIsLiked={setIsLiked}
        postId={postId}
        isLiked={isLiked}
      />
    </>
  );
};

export default SinglePost;
