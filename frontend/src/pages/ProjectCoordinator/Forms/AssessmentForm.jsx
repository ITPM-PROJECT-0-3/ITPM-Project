import React, { useState } from 'react';
import { Button, TextField, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const AssessmentForm = ({ closeForm, setAssessments }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [assignmentUploadLink, setAssignmentUploadLink] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (event) => {
        event.preventDefault();
        const assessmentData = {
            title,
            description,
            dueDate,
            totalMarks: parseInt(totalMarks, 10), // Ensuring totalMarks is an integer
            assignmentUploadLink,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/assessments/add', assessmentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setAssessments(prev => [...prev, response.data]);
            closeForm(); // Close the form dialog
            navigate('/assessments'); // Navigate to the assessments page
        } catch (error) {
            console.error('Failed to create assessment:', error?.response?.data || error.message);
            // Implement error handling logic here
        }
    };

    return (
        <>
            <DialogTitle>Add New Assessment</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Form fields */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Due Date"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Total Marks"
                                type="number"
                                variant="outlined"
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Assignment Upload Link"
                                variant="outlined"
                                value={assignmentUploadLink}
                                onChange={(e) => setAssignmentUploadLink(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button onClick={closeForm} color="primary">Cancel</Button>
                        <Button type="submit" color="primary">Add</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </>
    );
};

export default AssessmentForm;
