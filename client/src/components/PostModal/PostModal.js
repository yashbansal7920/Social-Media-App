import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import useStyles from './styles';
import UserList from '../userList/UserList';

const PostModal = ({ children, users }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [isClicked, setIsCliked] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{ display: 'inline', cursor: 'pointer' }}
        onClick={handleOpen}
      >
        {children}
      </div>
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
            {users &&
              users.map((user) => {
                return (
                  <UserList
                    // setIsCliked={setIsCliked}
                    key={user._id}
                    user={user}
                  />
                );
              })}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default PostModal;
