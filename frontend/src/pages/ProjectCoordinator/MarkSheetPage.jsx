import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Placeholder data for marksheets
const initialMarksheets = [
  { id: 1, studentName: 'John Doe', projectName: 'Project A', mark: 85 },
  { id: 2, studentName: 'Jane Smith', projectName: 'Project B', mark: 90 },
  // Add more marksheets as needed
];

const MarksheetPage = () => {
  const [marksheets, setMarksheets] = useState(initialMarksheets);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
};

  const handleAddMarksheet = () => {
    // Navigate to the form for adding a new marksheet
    console.log('Navigate to add marksheet form');
    // navigate('/marksheets/new');
  };

  const handleEditMarksheet = (id) => {
    // Navigate to the form for editing a marksheet
    console.log(`Navigate to edit marksheet form for ID: ${id}`);
    // navigate(`/marksheets/edit/${id}`);
  };

  const handleDeleteMarksheet = (id) => {
    // Logic to delete a marksheet
    console.log(`Delete marksheet with ID: ${id}`);
    setMarksheets(marksheets.filter(marksheet => marksheet.id !== id));
  };

  return (
    <>
      <AppBarComponent />
      <Sidebar handleNavigation={handleNavigation} />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Marksheets</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddMarksheet} sx={{ mb: 2 }}>
          Add Marksheet
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="Marksheet table">
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Mark</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marksheets.map((marksheet) => (
                <TableRow key={marksheet.id}>
                  <TableCell>{marksheet.studentName}</TableCell>
                  <TableCell>{marksheet.projectName}</TableCell>
                  <TableCell>{marksheet.mark}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditMarksheet(marksheet.id)}><EditIcon /></Button>
                    <Button onClick={() => handleDeleteMarksheet(marksheet.id)}><DeleteIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default MarksheetPage;
