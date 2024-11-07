import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'checked':
      return { color: 'green' };
    case 'pending':
      return { color: 'red' };
    default:
      return {};
  }
};

const HrIndex = () => {
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch('http://localhost:8080/hr/evaluations/index');
        const data = await response.json();
        console.log('Fetched Responses:', data);
        setResponses(data.responses || []);
      } catch (error) {
        console.error('Error fetching Responses:', error);
      }
    };

    fetchResponses();
  }, []);

  return (
    <div>
      <h1>ตรวจสอบแบบประเมิน</h1>
      <Navbar />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}> {/* Added marginTop for spacing */}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ width: '5%' }}>ไอดี</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '15%' }}>ชื่อผู้ใช้</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '20%' }}>ชื่อเรื่อง</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '15%' }}>สถานะ</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '15%' }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.length > 0 ? (
              responses.map((response) => (
                <StyledTableRow key={response.id}>
                  <StyledTableCell align="center">{response.id}</StyledTableCell>
                  <StyledTableCell align="center">{response.username}</StyledTableCell>
                  <StyledTableCell align="center">{response.title}</StyledTableCell>
                  <StyledTableCell align="center" style={getStatusColor(response.status)}>
                    {response.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ width: '100%' }}>
                      <Button
                        onClick={() => navigate(`/hr/evaluations/show/${response.id}`)} // Navigate to evaluation detail page
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ width: '100%', padding: '10px 0' }} // Full width with consistent padding
                      >
                        ตรวจสอบ
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={6}>
                  ไม่มีการประเมินผล
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HrIndex;
