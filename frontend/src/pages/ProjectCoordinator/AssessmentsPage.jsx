import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';
import axios from 'axios';
import AssessmentForm from './Forms/AssessmentForm'; // Assume this component exists

const AssessmentPage = () => {
    const [assessments, setAssessments] = useState([]);
    const [openForm, setOpenForm] = useState(false); // State to control popup form visibility
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    useEffect(() => {
        axios.get('/api/assessments')
    .then(response => {
        if (Array.isArray(response.data)) {
            // Directly an array
            setAssessments(response.data);
        } else if (Array.isArray(response.data.data)) {
            // Nested array
            setAssessments(response.data.data);
        } else {
            console.error('Unexpected response format:', response.data);
            setAssessments([]); // Setting to empty array as a fallback
        }
    })
    .catch(error => {
        console.error('Failed to fetch assessments:', error);
        setAssessments([]); // Handling error by setting to empty array
    });

    }, []);

    const handleEdit = (assessmentId) => {
        navigate(`/assessments/edit/${assessmentId}`);
    };

    const handleDelete = (assessmentId) => {
        // Replace with your actual endpoint URL
        axios.delete(`/api/assessments/${assessmentId}`)
            .then(() => setAssessments(assessments.filter(assessment => assessment.id !== assessmentId)))
            .catch(error => console.error('Failed to delete assessment:', error));
    };

    const toggleForm = () => {
        setOpenForm(!openForm);
    };

    return (
        <>
            <AppBarComponent />
            <Sidebar handleNavigation={handleNavigation} />
            <Container sx={{ paddingTop: '100px' }}>
                <Typography variant="h4" sx={{ margin: '20px 0' }}>
                    Assessments
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ marginBottom: 2 }}
                    onClick={toggleForm}
                >
                    Add New Assessment
                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Deadline</TableCell>
                                <TableCell align="right">Total Marks</TableCell>
                                <TableCell align="right">Rubric</TableCell>
                                <TableCell align="right">PDF</TableCell>
                                <TableCell align="right">Upload Link</TableCell>
                                
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assessments.map((assessment) => (
                                <TableRow key={assessment.id}>
                                    <TableCell>{assessment.title}</TableCell>
                                    <TableCell align="right">{assessment.description}</TableCell>
                                    <TableCell align="right">{assessment.dueDate}</TableCell>
                                    <TableCell align="right">{assessment.totalMarks}</TableCell>
                                    <TableCell align="right">{assessment.rubric}</TableCell>
                                    <TableCell align="right">{assessment.pdfUrl}</TableCell>
                                    <TableCell align="right">{assessment.assignmentUploadLink}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEdit(assessment.id)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => handleDelete(assessment.id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            {/* Popup Form for Adding New Assessment */}
            <Dialog open={openForm} onClose={toggleForm} fullWidth maxWidth="sm">
                <DialogContent>
                    <AssessmentForm closeForm={toggleForm} setAssessments={setAssessments} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AssessmentPage;
