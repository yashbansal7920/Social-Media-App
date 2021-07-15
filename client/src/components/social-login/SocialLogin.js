import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import GoogleLogin from 'react-google-login';

const SocialLogin = () => {
  const history = useHistory();

  const responseGoogle = async (response) => {
    console.log(response);
    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/social-login',
      response.profileObj
    );
    localStorage.setItem('token', data.token);
    history.push('/');
  };

  const errorGoogle = (err) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_LOGIN_ID}`}
      buttonText="Google"
      onSuccess={responseGoogle}
      onFailure={errorGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default SocialLogin;
