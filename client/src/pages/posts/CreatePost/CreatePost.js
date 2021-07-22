import React, { useState } from 'react';
import { Modal, Backdrop, Fade, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';

const CreatePost = ({ children, setCreatePost }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [isClicked, setIsCliked] = useState(false);
  const [postData, setPostData] = useState({ body: '', photo: '' });
  const [imgPreview, setImgPreview] = useState('');

  const handleOpen = () => {
    setOpen(true);
    // setIsCliked(false);
  };

  const handleClose = () => {
    setOpen(false);
    // setIsCliked(false);
  };

  const handlePhoto = (e) => {
    setPostData((prev) => ({ ...prev, photo: e.target.files[0] }));

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImgPreview(fileReader.result);
    };
    if (!e.target.files[0]) {
      setImgPreview('');
      return;
    }
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('body', postData.body);
    formData.append('photo', postData.photo);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(data);
      setOpen(false);
      setCreatePost(true);
    } catch (error) {
      console.log(error.response);
    }
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
            <form onSubmit={handlePost}>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhoto}
                required
                style={{ marginBottom: '20px' }}
              />
              {imgPreview && (
                <img className={classes.img} src={imgPreview} alt="Preview" />
              )}
              <TextField
                label="Caption"
                name="body"
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, body: e.target.value }))
                }
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <Button type="submit" variant="contained" color="primary">
                Create a Post
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CreatePost;
