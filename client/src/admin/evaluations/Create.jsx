import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import Navbar from '../layouts/Navbar';

export default function Create() {
    
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Use null instead of empty string
  const [successMessage, setSuccessMessage] = useState(null); // Use null instead of empty string

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh

    // Basic validation
    if (!title.trim() || !description.trim()) {
        setErrorMessage('Title and description cannot be empty.');
        return;
    }

    setLoading(true); // Start loading
    setErrorMessage(null); // Clear previous error messages
    setSuccessMessage(null); // Clear previous success messages

    const evaluation = {
        title: title,
        description: description,
        created_at: new Date().toISOString(), // If you want to include the creation date
    };

    console.log("Evaluation Object:", evaluation); // Log the evaluation object

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluation), // Correctly stringify the evaluation object
    };

    fetch("http://localhost:8080/admin/evaluations/store", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            console.log("API Response:", result); // Log the API response
            setLoading(false); // Stop loading
            if (result.message) {
                alert(result.message); // Show alert with response message
            }
            if (result.status === 'success') {
                setSuccessMessage('สร้างการประเมินสำเร็จแล้ว!'); // Success message
                window.location.href = '/admin/evaluations/Index'; // Redirect to evaluations index
            } else {
                setErrorMessage(result.message || 'An error occurred.'); // Show error message
            }
        })
        .catch(error => {
            setLoading(false); // Stop loading
            console.error('Error:', error);
            setErrorMessage('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
        });
  };

  return (
    <React.Fragment>
    <Navbar />
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom component="div">
            สร้างแบบประเมิน
          </Typography>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>} {/* Error message display */}
          {successMessage && <Typography color="success.main">{successMessage}</Typography>} {/* Success message display */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  type='text'
                  name='title'
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  type='text'
                  name='description'
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'บันทึก'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
