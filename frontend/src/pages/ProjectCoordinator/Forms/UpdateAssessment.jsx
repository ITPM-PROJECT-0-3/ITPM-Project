import React, { useState, useEffect } from 'react';
import { Button, TextField, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateAssessmentForm = ({ closeForm, assessmentToUpdate, refreshAssessments }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [assignmentUploadLink, setAssignmentUploadLink] = useState('');
    const navigate = useNavigate();

    // Pre-populate form fields when the component receives the assessment to update
    useEffect(() => {
        if (assessmentToUpdate) {
            setTitle(assessmentToUpdate.title);
            setDescription(assessmentToUpdate.description);
            // Formatting dueDate for the date input field (YYYY-MM-DD)
            setDueDate(assessmentToUpdate.dueDate.slice(0, 10));
            setTotalMarks(assessmentToUpdate.totalMarks);
            setAssignmentUploadLink(assessmentToUpdate.assignmentUploadLink);
        }
    }, [assessmentToUpdate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedAssessmentData = {
            title,
            description,
            dueDate,
            totalMarks: parseInt(totalMarks, 10),
            assignmentUploadLink,
        };

        try {
            // Make sure to replace `/api/assessments/update/:id` with your actual API endpoint
            await axios.put(`http://localhost:8000/api/assessments/update-assessment/${assessmentToUpdate._id}`, updatedAssessmentData, {
                headers: { 'Content-Type': 'application/json' },
            });
            refreshAssessments(); // Refresh the list of assessments in the parent component
            closeForm(); // Close the update form dialog
            navigate('/assessments'); // Optionally navigate to the assessments list page
        } catch (error) {
            console.error('Failed to update assessment:', error?.response?.data || error.message);
            // Implement appropriate error handling here
        }
    };

    return (
        <>
            <DialogTitle>Update Assessment</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
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
                    <Button onClick={() => { closeForm(); }} color="primary">Cancel</Button>

                        <Button type="submit" color="primary">Update</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </>
    );
};

export default UpdateAssessmentForm;
