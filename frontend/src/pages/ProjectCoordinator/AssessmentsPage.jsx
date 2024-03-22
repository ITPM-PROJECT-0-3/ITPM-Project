import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Mock API call for fetching assessments
const fetchAssessments = async () => {
    // This would be replaced with a real API call
    return Promise.resolve([
        { id: 1, title: 'Assessment 1', score: 85, description: 'Description for Assessment 1' },
        { id: 2, title: 'Assessment 2', score: 75, description: 'Description for Assessment 2' },
    ]);
};

// Mock API call for deleting an assessment
const deleteAssessmentApi = async (assessmentId) => {
    // This would be replaced with a real API call
    console.log(`Deleting assessment with ID: ${assessmentId}`);
    return Promise.resolve();
};

const AssessmentPage = () => {
    const [assessments, setAssessments] = useState([]);
    const navigate = useNavigate();


    const handleNavigation = (path) => {
        navigate(path);
    };

    useEffect(() => {
        fetchAssessments().then(setAssessments);
    }, []);

    const handleEdit = (assessmentId) => {
        // Navigate to the edit page with the assessmentId
        navigate(`/assessments/edit/${assessmentId}`);
    };

    const handleDelete = (assessmentId) => {
        deleteAssessmentApi(assessmentId).then(() => {
            setAssessments(assessments.filter(assessment => assessment.id !== assessmentId));
        }).catch(error => {
            console.error('Failed to delete assessment:', error);
        });
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
                    onClick={() => navigate('/assessments/new')}
                >
                    Add New Assessment
                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Score</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assessments.map((assessment) => (
                                <TableRow
                                    key={assessment.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {assessment.title}
                                    </TableCell>
                                    <TableCell align="right">{assessment.score}</TableCell>
                                    <TableCell align="right">{assessment.description}</TableCell>
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
        </>
    );
};

export default AssessmentPage;
