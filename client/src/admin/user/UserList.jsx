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
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/user/index');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched Users:', data);
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching Users:', error);
        alert('Failed to fetch users. Please try again later.'); // User feedback
      }
    };

    fetchUsers();
  }, []);

    // Function to handle deletion of an evaluation
    const UserDelete = async (user_id) => {
      if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบการประเมินนี้")) {
        try {
          const response = await fetch(`http://localhost:8080/admin/user/delete/${user_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            // Remove the deleted evaluation from the state
            setUsers(users.filter(users => users.user_id !== user_id));
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
      <h1>Users</h1>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Link href="create">
          <Button variant="contained" color="success" size="medium">
            สร้างแบบประเมิน
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <StyledTableRow key={user.user_id}>
                  <StyledTableCell align="center">{user.user_id}</StyledTableCell>
                  <StyledTableCell align="center">{user.username}</StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">{user.role_name_eng}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        onClick={() => navigate(`/admin/user/edit/${user.user_id}`)}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={user.isSubmitted}
                      >
                        แก้ไข
                      </Button>
                      <Button
                      onClick={() => UserDelete(user.user_id)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      ลบ
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
