import React, { useState } from 'react';
import { Button, TextField, DialogActions, Typography, Grid, DialogTitle, DialogContent } from '@mui/material';
import axios from 'axios';

const AssessmentForm = ({ closeForm, setAssessments }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [rubric, setRubric] = useState(''); // Could be expanded to a more complex structure
    const [pdfFile, setPdfFile] = useState(null);
    const [assignmentUploadLink, setAssignmentUploadLink] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dueDate', dueDate);
        formData.append('totalMarks', totalMarks);
        formData.append('rubric', rubric); // Ensure your backend knows how to parse this
        formData.append('pdfFile', pdfFile); // Ensure your backend endpoint supports file uploads
        formData.append('assignmentUploadLink', assignmentUploadLink);

        try {
            // Adjust with your actual API endpoint
            const response = await axios.post('/api/assessments', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAssessments(prev => [...prev, response.data]);
            closeForm();
        } catch (error) {
            console.error('Failed to create assessment:', error);
            // Handle error more gracefully here
        }
    };

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    return (
        <>
            <DialogTitle>Add New Assessment</DialogTitle>
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
                                value={description}
                                multiline
                                rows={4}
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
                                label="Rubric Details"
                                variant="outlined"
                                value={rubric}
                                onChange={(e) => setRubric(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload PDF
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                            </Button>
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
                        <Button onClick={closeForm} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </>
    );
};

export default AssessmentForm;
