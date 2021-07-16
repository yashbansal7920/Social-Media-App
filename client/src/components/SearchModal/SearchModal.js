import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Backdrop, Fade, Grid } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import useStyles from './styles';
import UserList from '../userList/UserList';

const SearchModal = ({ children, userId }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setUsers([]);
  };

  const fetchUsers = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user?name=${query}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const newData = data.filter((d) => d._id !== userId);
    setUsers(newData);
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <SearchBar
              value={query}
              onChange={(newValue) => setQuery(newValue)}
              placeholder="Search User"
              autoFocus
              onRequestSearch={fetchUsers}
              style={{ marginBottom: '20px' }}
            />
            {users.map((user) => {
              return <UserList key={user._id} user={user} />;
            })}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default SearchModal;
