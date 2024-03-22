import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Placeholder data for research papers
const initialResearchPapers = [
  { id: 1, title: 'Research Paper A', author: 'Author One', year: 2023 },
  { id: 2, title: 'Research Paper B', author: 'Author Two', year: 2023 },
  // Add more research papers as needed
];

const ResearchPaperPage = () => {
  const [researchPapers, setResearchPapers] = useState(initialResearchPapers);
  const navigate = useNavigate();

  const handleAddResearchPaper = () => navigate('/research-papers/new');
  const handleViewResearchPaper = (id) => navigate(`/research-papers/${id}`);
  const handleEditResearchPaper = (id) => navigate(`/research-papers/edit/${id}`);
  const handleDeleteResearchPaper = (id) => setResearchPapers(researchPapers.filter(paper => paper.id !== id));

  return (
    <>
      <AppBarComponent />
      <Sidebar handleNavigation={(path) => navigate(path)} />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Research Papers</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddResearchPaper} sx={{ mb: 2 }}>
          Add Research Paper
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="Research Paper table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Year</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {researchPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>{paper.title}</TableCell>
                  <TableCell>{paper.author}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewResearchPaper(paper.id)}><VisibilityIcon /></IconButton>
                    <IconButton onClick={() => handleEditResearchPaper(paper.id)} color="primary"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDeleteResearchPaper(paper.id)} color="secondary"><DeleteIcon /></IconButton>
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

export default ResearchPaperPage;
