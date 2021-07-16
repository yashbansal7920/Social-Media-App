import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Card, CardContent } from '@material-ui/core';
import useStyles from './styles';

const UserList = ({ user, setIsCliked }) => {
  const classes = useStyles();

  return (
    <Link to={`/user/${user._id}`}>
      <Card onClick={(e) => setIsCliked(true)} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar} src={`/${user.profilePhoto}`} />
          <div>
            <Typography style={{ borderBottom: 'none' }} variant="h6">
              {user.username}
            </Typography>
            <Typography style={{ textDecoration: 'none' }} variant="subtitle1">
              {user.name}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default UserList;
