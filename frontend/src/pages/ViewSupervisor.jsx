import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function ViewSupervisor() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await fetch('http://localhost:8000/supervisor/get-all-supervisors');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSupervisors(data.allSupervisors);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchSupervisors();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container>
      <Grid container>
        <Grid item xs={0} sm={0} md={1} lg={2} xl={2}></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={8}>
          <Box component="form" className="form__body">
            <p className='form__heading'>Supervisors</p>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Engaged Groups Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supervisors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supervisor) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={supervisor._id}>
                      <TableCell>{supervisor.name}</TableCell>
                      <TableCell>{supervisor.email}</TableCell>
                      <TableCell>{supervisor.engagedGroups.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={supervisors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
        <Grid item xs={0} sm={0} md={1} lg={2} xl={2}></Grid>
      </Grid>

      {/* <Grid container>
        <Grid item xs={0} sm={0} md={5} lg={5} xl={5}></Grid>
        <Button variant="text">Text</Button>
      </Grid> */}
    </Grid>
  );
}
