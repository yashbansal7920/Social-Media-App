import React from 'react';
import axios from 'axios';
import { Grid, Container, Avatar, Typography } from '@material-ui/core';
import useStyles from './styles';

const User = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
      ></Grid>
    </Container>
  );
};

export default User;
