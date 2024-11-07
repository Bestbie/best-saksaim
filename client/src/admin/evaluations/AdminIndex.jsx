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
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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

const AdminIndex = () => {
  const [evaluation, setEvaluation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/evaluations/Index');
        const data = await response.json();
        setEvaluation(data.evaluation);
      } catch (error) {
        console.error('Error fetching evaluation:', error);
      }
    };

    fetchEvaluation();
  }, []);

  const UserDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบการประเมินนี้")) {
      try {
        const response = await fetch(`http://localhost:8080/admin/evaluations/delete/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setEvaluation(evaluation.filter(evaluation => evaluation.id !== id));
          alert('ลบการประเมินเรียบร้อยแล้ว!');
        } else {
          alert('เกิดข้อผิดพลาดในการลบการประเมินผล');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบการประเมินผล:', error);
        alert('เกิดข้อผิดพลาด โปรดลองอีกครั้ง.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>แบบประเมิน</h1>
        <Link href="create" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="success" size="medium">
            สร้างแบบประเมิน
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ width: '10%' }}>ไอดี</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '30%' }}>ชื่อเรื่อง</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '40%' }}>คำอธิบาย</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '20%' }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluation.map((evaluation, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{evaluation.id}</StyledTableCell>
                <StyledTableCell align="center">{evaluation.title}</StyledTableCell>
                <StyledTableCell align="center">{evaluation.description}</StyledTableCell>
                <StyledTableCell align="center">
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      onClick={() => navigate(`/admin/evaluations/edit/${evaluation.id}`)}
                      variant="contained"
                      color="warning"
                      size="small"
                    >
                      แก้ไข
                    </Button>
                    <Button
                      onClick={() => UserDelete(evaluation.id)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      ลบ
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminIndex;
