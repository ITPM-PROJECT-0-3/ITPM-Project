import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Placeholder data for projects
const initialProjects = [
  { id: 1, name: 'Project Alpha', description: 'A project about...', status: 'Active' },
  { id: 2, name: 'Project Beta', description: 'The project focuses on...', status: 'Completed' },
  // Add more projects as needed
];

const ProjectPage = () => {
  const [projects, setProjects] = useState(initialProjects);
  const navigate = useNavigate();

  // Functions to handle project actions
  const handleAddProject = () => navigate('/projects/new');
  const handleViewProject = (id) => navigate(`/projects/${id}`);
  const handleEditProject = (id) => navigate(`/projects/edit/${id}`);
  const handleDeleteProject = (id) => setProjects(projects.filter(project => project.id !== id));

  return (
    <>
      <AppBarComponent />
      <Sidebar handleNavigation={(path) => navigate(path)} />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Projects</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddProject} sx={{ mb: 2 }}>
          Add Project
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="Project table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewProject(project.id)}><VisibilityIcon /></IconButton>
                    <IconButton onClick={() => handleEditProject(project.id)} color="primary"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDeleteProject(project.id)} color="secondary"><DeleteIcon /></IconButton>
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

export default ProjectPage;
