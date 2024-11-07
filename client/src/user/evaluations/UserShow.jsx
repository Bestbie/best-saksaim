import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
} from '@mui/material';
import Navbar from '../../user/layouts/Navbar';

export default function UserShow() {
  const { id } = useParams(); // Get the evaluation ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [evaluation, setEvaluation] = useState(null); // Initialize as null
  const [evaluations_responses, setEvaluations_Responses] = useState({}); // Store user responses
  const [userId, setUserId] = useState(3); // Replace with actual logged-in user ID logic
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if evaluation is already submitted
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  useEffect(() => {
    // Fetch evaluation from backend
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/evaluations/show/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Ensure that the response is ok and parse the JSON
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON response
        console.log('Fetched evaluation data:', data); // Log the fetched data

        // Check if the evaluation data is an object
        if (data && typeof data.evaluation === 'object') {
          setEvaluation(data.evaluation); // Set the evaluation data if it is an object
          setIsSubmitted(data.isSubmitted); // Set if the user already submitted the evaluation
        } else {
          console.error('รูปแบบข้อมูลที่ได้รับไม่ถูกต้อง:', data);
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียกการประเมินผล:', error);
      }
    };

    fetchEvaluation();
  }, [id]);

  const handleRadioChange = (evaluationId, value) => {
    setEvaluations_Responses((prevResponses) => ({
      ...prevResponses,
      [evaluationId]: value, // Update the specific evaluation response
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitted) {
      alert('กรอกข้อมูลแล้ว ไม่สามารถกรอกข้อมูลได้อีก'); // Inform the user that they cannot submit again
      return;
    }

    const evaluationIds = Object.keys(evaluations_responses);
    const ratings = Object.values(evaluations_responses);

    console.log({ evaluation_ids: evaluationIds, responses: ratings });

    if (evaluationIds.length === 0 || ratings.length === 0) {
      console.error('ไม่มีข้อมูลการประเมินที่จะส่ง');
      return; // Optionally show an alert here
    }

    try {
      const response = await fetch(`http://localhost:8080/user/evaluations/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId, // Send the user_id
          evaluation_id: evaluationIds,
          response: ratings,
        }),
      });

      const responseData = await response.json(); // Parse the JSON response
      console.log('Response Data:', responseData);

      if (!response.ok) {
        // Handle error response
        console.error('Error response:', responseData);
        setErrorMessage(responseData.error || 'เกิดข้อผิดพลาดในการส่งข้อมูล'); // Set the error message state
      } else {
        // alert('ส่งการประเมินสำเร็จแล้ว!'); // Success message
        setIsSubmitted(true); // Mark the evaluation as submitted after success
        
        // Redirect to the evaluation list page
        navigate(`/user/evaluations/Index`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล'); // Show error to user
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            การประเมินด้วยการเลือกคะแนน
          </Typography>

          {isSubmitted ? (
            // Display this message if the evaluation has been submitted
            <Typography variant="h6" color="secondary" align="center">
              กรอกข้อมูลแล้ว
            </Typography>
          ) : (
            // Display the form if the evaluation has not been submitted
            <form onSubmit={handleSubmit}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">คำอธิบาย</TableCell>
                    <TableCell align="center">ตัวเลือก</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evaluation ? (
                    <TableRow key={evaluation.id}>
                      <TableCell align="center">{evaluation.id}</TableCell>
                      <TableCell align="center">{evaluation.description}</TableCell>
                      <TableCell align="center">
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby={`rating-radio-${evaluation.id}`}
                            name={`rating-group-${evaluation.id}`}
                            onChange={(e) => handleRadioChange(evaluation.id, e.target.value)}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="แย่มาก" />
                            <FormControlLabel value="2" control={<Radio />} label="แย่" />
                            <FormControlLabel value="3" control={<Radio />} label="ปานกลาง" />
                            <FormControlLabel value="4" control={<Radio />} label="ดี" />
                            <FormControlLabel value="5" control={<Radio />} label="ดีมาก" />
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        กำลังโหลดข้อมูล...
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {errorMessage && ( // Display error message if exists
                <Typography variant="body2" color="error" align="center">
                  {errorMessage}
                </Typography>
              )}

              <Button sx={{ mb: 2, mt: 2 }} variant="contained" color="primary" type="submit">
                ส่งแบบประเมิน
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
