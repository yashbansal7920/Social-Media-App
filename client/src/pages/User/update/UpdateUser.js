import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Paper } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const UpdateUser = () => {
  const [formdata, setFormdata] = useState({ name: '', bio: '', photo: '' });
  const history = useHistory();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formdata.name);
    formData.append('bio', formdata.bio);
    formData.append('photo', formdata.photo);

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/user/updateMe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      history.push('/me');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Container maxWidth="sm">
      <div style={{ marginTop: '32px' }} />
      <Paper style={{ padding: '20px' }}>
        <form encType="multipart/form-data" onSubmit={handleUpdate}>
          <TextField
            onChange={(e) =>
              setFormdata((prev) => ({ ...prev, photo: e.target.files[0] }))
            }
            type="file"
            label="Profile photo"
            name="photo"
          />
          <TextField
            label="Name"
            name="name"
            onChange={(e) =>
              setFormdata((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            fullWidth
          />
          <TextField
            style={{ marginBottom: '20px' }}
            label="Bio"
            required
            fullWidth
            name="bio"
            onChange={(e) =>
              setFormdata((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
          <Button
            component={Link}
            to="/me"
            style={{ marginRight: '10px' }}
            variant="outlined"
          >
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateUser;
