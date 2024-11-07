import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography, CircularProgress, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function UserEdit() {
  const { user_id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role_name_eng, setRoleNameEng] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/user/edit/${user_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.user) {
          setUsername(data.user.username);
          setEmail(data.user.email);
          setRoleNameEng(data.user.role_name_eng);
        } else {
          setErrorMessage('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Could not fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate input
    if (!username.trim() || !email.trim() || !password.trim() || !role_name_eng.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const user = {
      username,
      email,
      password,
      role_name_eng,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    fetch(`http://localhost:8080/admin/user/update/${user_id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(result => {
        setLoading(false);
        if (result.status === 'success') {
          setSuccessMessage('User updated successfully!');
          window.location.href = '/admin/user/index';
        } else {
          setErrorMessage(result.message || 'An error occurred.');
        }
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage('An error occurred, please try again.');
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom component="div">
            Edit User
          </Typography>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          {successMessage && <Typography color="success.main">{successMessage}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  type='email'
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  type='password'
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="role_name_eng"
                  select
                  label="Role"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setRoleNameEng(e.target.value)}
                  value={role_name_eng}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Update User'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
