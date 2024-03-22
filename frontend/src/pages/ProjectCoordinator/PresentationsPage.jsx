import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Placeholder data for presentations
const initialPresentations = [
  { id: 1, title: 'Design Review', date: '2023-04-15', presenter: 'John Doe' },
  { id: 2, title: 'Project Milestone 1', date: '2023-05-20', presenter: 'Jane Smith' },
  // Add more presentations as needed
];

const PresentationPage = () => {
  const [presentations, setPresentations] = useState(initialPresentations);
  const navigate = useNavigate();

  
  const handleNavigation = (path) => {
    navigate(path);
};
  const handleAddPresentation = () => {
    navigate('/presentations/new');
  };

  const handleEditPresentation = (id) => {
    navigate(`/presentations/edit/${id}`);
  };

  const handleDeletePresentation = (id) => {
    setPresentations(presentations.filter(presentation => presentation.id !== id));
  };

  return (
    <>
      <AppBarComponent />
      <Sidebar handleNavigation={handleNavigation} />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Presentations</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddPresentation} sx={{ mb: 2 }}>
          Add Presentation
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="Presentation table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Presenter</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {presentations.map((presentation) => (
                <TableRow key={presentation.id}>
                  <TableCell>{presentation.title}</TableCell>
                  <TableCell>{presentation.date}</TableCell>
                  <TableCell>{presentation.presenter}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEditPresentation(presentation.id)} color="primary"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDeletePresentation(presentation.id)} color="secondary"><DeleteIcon /></IconButton>
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

export default PresentationPage;
