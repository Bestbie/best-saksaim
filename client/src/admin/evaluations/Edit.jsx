import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

export default function Edit() {

  const { id } = useParams(); // Get the ID from the URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error message state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Fetch evaluation data when the component mounts
  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/evaluations/edit/${id}`); // Correct GET endpoint
        if (!response.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลการประเมินผลได้');
        }
        const data = await response.json();
        setTitle(data.evaluation.title);
        setDescription(data.evaluation.description);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการประเมินผล:', error);
        setErrorMessage('ไม่สามารถดึงข้อมูลการประเมินได้ โปรดลองอีกครั้งในภายหลัง');
      }
    };

    fetchEvaluation();
  }, [id]); // Dependency array includes id

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh

    // Basic validation
    if (!title.trim() || !description.trim()) {
      setErrorMessage('ชื่อเรื่องและคำอธิบายไม่สามารถว่างเปล่าได้');
      return;
    }

    setLoading(true); // Start loading
    setErrorMessage(null); // Clear previous error messages
    setSuccessMessage(null); // Clear previous success messages

    const evaluation = {
      title: title,
      description: description,
    };

    const requestOptions = {
      method: 'POST', // Use PUT method for updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evaluation), // Correctly stringify the evaluation object
    };

    fetch(`http://localhost:8080/admin/evaluations/update/${id}`, requestOptions) // Update endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(result => {
        setLoading(false); // Stop loading
        if (result.status === 'success') {
          setSuccessMessage('การอัปเดตสำเร็จแล้ว!'); // Success message
          window.location.href = '/admin/evaluations/index'; // Redirect to evaluations index
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
            แก้ไขแบบประเมิน
          </Typography>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>} {/* Error message display */}
          {successMessage && <Typography color="success.main">{successMessage}</Typography>} {/* Success message display */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="title"
                        type="text"
                        name="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title} // The form field will display the fetched title
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        type="text"
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description} // The form field will display the fetched description
                    />
                </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'อัพเดท'} {/* Change button text to 'Update' */}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
