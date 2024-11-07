import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import Navbar from '../layouts/Navbar';

export default function HrShow() {
  const { id } = useParams(); // Get the evaluation ID from the URL
  const [response, setResponse] = useState(null); // Initialize as null
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Fetch evaluation from backend
    const fetchResponse = async () => {
      try {
        const res = await fetch(`http://localhost:8080/hr/evaluations/show/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Ensure that the response is ok and parse the JSON
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json(); // Parse the JSON response
        console.log('Fetched response data:', data); // Log the fetched data

        // Check if the evaluation data is an object
        if (data && typeof data.response === 'object') {
          setResponse(data.response); // Set the evaluation data if it is an object
        } else {
          console.error('รูปแบบข้อมูลที่ได้รับไม่ถูกต้อง:', data);
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียกการประเมินผล:', error);
      }
    };

    fetchResponse();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the response is available
    if (!response) {
      console.error('ไม่มีข้อมูลการประเมินที่จะส่ง');
      return; // Optionally, show an alert here
    }

    try {
      const res = await fetch(`http://localhost:8080/hr/evaluations/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluation_response_id: response.id, // Send the evaluation response ID
          status: 'checked', // Add status if needed
        }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Parse JSON error response
        console.error('Error:', errorData.error); // Log the error message
      } else {
        const result = await res.json();
        console.log('Success:', result);

        // Redirect to /hr/evaluations/index after successful submission
        navigate('/hr/evaluations/index');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          ตรวจสอบแบบประเมิน
          </Typography>

          <form onSubmit={handleSubmit}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ไอดี</TableCell>
                  <TableCell align="center">คำอธิบาย</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {response ? (
                  <TableRow key={response.id}>
                    <TableCell align="center">{response.id}</TableCell>
                    <TableCell align="center">{response.description}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ mb: 2, mt: 2 }}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        ตรวจสอบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">กำลังโหลดข้อมูล...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
