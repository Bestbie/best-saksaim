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
import Navbar from '../../user/layouts/Navbar';

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

const UserIndex = () => {
  const [evaluations, setEvaluations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/evaluations/index');
        const data = await response.json();
        console.log('Fetched Evaluations:', data);
        setEvaluations(data.evaluations || []);
      } catch (error) {
        console.error('Error fetching evaluations:', error);
      }
    };

    fetchEvaluations();
  }, []);

  return (
    <div>
      <h1>แบบประเมิน</h1>
      <Navbar />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}> {/* Added marginTop for spacing */}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ width: '10%' }}>ไอดี</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '30%' }}>ชื่อเรื่อง</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '30%' }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluations.length > 0 ? (
              evaluations.map((evaluation) => (
                <StyledTableRow key={evaluation.id}>
                  <StyledTableCell align="center">{evaluation.id}</StyledTableCell>
                  <StyledTableCell align="center">{evaluation.title}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ width: '100%' }}>
                      <Button
                        onClick={() => navigate(`/user/evaluations/show/${evaluation.id}`)} // Navigate to evaluation detail page
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ width: '100%', padding: '10px 0' }} // Full width with consistent padding
                        disabled={evaluation.isSubmitted} // Disable button if already submitted
                      >
                        แบบประเมิน
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={3}>
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

export default UserIndex;
