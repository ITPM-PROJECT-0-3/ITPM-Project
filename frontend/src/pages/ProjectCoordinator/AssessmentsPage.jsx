import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Button, Typography, IconButton, Dialog, DialogContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import Swal from 'sweetalert2';
import AssessmentForm from './Forms/AssessmentForm';
import AssessmentUpdateForm from './Forms/UpdateAssessment' // Ensure this component is correctly implemented
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar'; // Placeholder, ensure the correct import path
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar'; // Placeholder, ensure the correct import path

const AssessmentPage = () => {
    const [assessments, setAssessments] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const navigate = useNavigate();
    const [currentAssessment, setCurrentAssessment] = useState(null);


    useEffect(() => {
        fetchAssessments();
    }, []);

    const fetchAssessments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/assessments/get-all');
            setAssessments(response.data);
        } catch (error) {
            console.error('Failed to fetch assessments:', error);
            setAssessments([]);
        }
    };

    const DeleteAssessment = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/assessments/delete-assessment/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The assessment has been deleted.', 'success');
                        fetchAssessments(); // Refetch the list after deletion
                    })
                    .catch(error => {
                        console.error('Failed to delete assessment:', error);
                        Swal.fire('Error!', 'Failed to delete the assessment.', 'error');
                    });
            }
        });
    };

    const toggleForm = () => setOpenForm(!openForm);

    const toggleUpdateForm = (assessment) => {
        setCurrentAssessment(assessment);
        setOpenUpdateForm(!openUpdateForm);
    };
    

    return (
        <>
            {/* AppBarComponent and Sidebar components would go here */}
            <AppBarComponent />
            <Sidebar handleNavigation={navigate} />
            <Container sx={{ paddingTop: '100px' }}>
                <Typography variant="h4" sx={{ margin: '20px 0' }}>Assessments</Typography>
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
                    <Table aria-label="Assessment Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Deadline</TableCell>
                                <TableCell>Total Marks</TableCell>
                                <TableCell>Upload Link</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assessments.map((assessment) => (
                                <TableRow key={assessment._id}>
                                    <TableCell>{assessment.title}</TableCell>
                                    <TableCell>{assessment.description}</TableCell>
                                    <TableCell>{new Date(assessment.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{assessment.totalMarks}</TableCell>
                                    <TableCell>
                                        <a href={assessment.assignmentUploadLink} target="_blank" rel="noopener noreferrer">Upload Link</a>
                                    </TableCell>
                                    <TableCell>
                                    
                                    
                                        <IconButton onClick={() => toggleUpdateForm(assessment)}><EditIcon /></IconButton>

                                        <IconButton onClick={() => DeleteAssessment(assessment._id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Dialog open={openForm} onClose={toggleForm} fullWidth maxWidth="sm">
                <DialogContent>
                    <AssessmentForm closeForm={toggleForm} setAssessments={setAssessments} />
                </DialogContent>
            </Dialog>
            <Dialog open={openUpdateForm} onClose={toggleUpdateForm} fullWidth maxWidth="sm">
                <DialogContent>
                    {currentAssessment && <AssessmentUpdateForm assessmentToUpdate={currentAssessment} closeForm={toggleUpdateForm} refreshAssessments={fetchAssessments} />}
                </DialogContent>
            </Dialog>

        </>
    );
};

export default AssessmentPage;
