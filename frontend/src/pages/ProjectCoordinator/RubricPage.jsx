import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Placeholder data for rubrics
const initialRubrics = [
  { id: 1, title: 'Rubric A', description: 'Description for Rubric A', criteriaCount: 5 },
  { id: 2, title: 'Rubric B', description: 'Description for Rubric B', criteriaCount: 4 },
  // Add more rubrics as needed
];

const RubricPage = () => {
  const [rubrics, setRubrics] = useState(initialRubrics);
  const navigate = useNavigate();

  const handleAddRubric = () => navigate('/rubrics/new');
  const handleViewRubric = (id) => navigate(`/rubrics/${id}`);
  const handleEditRubric = (id) => navigate(`/rubrics/edit/${id}`);
  const handleDeleteRubric = (id) => setRubrics(rubrics.filter(rubric => rubric.id !== id));

  return (
    <>
      <AppBarComponent />
      <Sidebar handleNavigation={(path) => navigate(path)} />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Rubrics</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddRubric} sx={{ mb: 2 }}>
          Add Rubric
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="Rubric table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Criteria Count</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rubrics.map((rubric) => (
                <TableRow key={rubric.id}>
                  <TableCell>{rubric.title}</TableCell>
                  <TableCell>{rubric.description}</TableCell>
                  <TableCell align="right">{rubric.criteriaCount}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewRubric(rubric.id)}><VisibilityIcon /></IconButton>
                    <IconButton onClick={() => handleEditRubric(rubric.id)} color="primary"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDeleteRubric(rubric.id)} color="secondary"><DeleteIcon /></IconButton>
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

export default RubricPage;
