const Assessment = require('../../model/ProjectCoordinator/Assessment');
const fs = require('fs'); // For file operations, like deleting files on update/delete

// Create a new assessment with optional PDF file upload
exports.createAssessment = async (req, res) => {
    const { title, description, dueDate, totalMarks, rubric, assignmentUploadLink } = req.body;
    let pdfUrl = req.file ? req.file.path : ''; // Use the uploaded file's path for the PDF URL

    try {
        const newAssessment = await Assessment.create({
            title,
            description,
            dueDate,
            totalMarks,
            rubric: JSON.parse(rubric || '[]'), // Assuming `rubric` is sent as a JSON string
            pdfUrl,
            assignmentUploadLink
        });
        res.status(201).json(newAssessment);
    } catch (error) {
        console.error('Error creating assessment:', error);
        res.status(500).json({ message: 'Server error while creating assessment' });
    }
};

// Get all assessments
exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.json(assessments);
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ message: 'Server error while fetching assessments' });
    }
};

// Get a single assessment by ID
exports.getAssessmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const assessment = await Assessment.findById(id);
        if (!assessment) return res.status(404).json({ message: 'Assessment not found' });

        res.json(assessment);
    } catch (error) {
        console.error('Error fetching assessment:', error);
        res.status(500).json({ message: 'Server error while fetching assessment' });
    }
};

// Update an assessment, including changing the PDF file
exports.updateAssessment = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    if (req.file) {
        updateData.pdfUrl = req.file.path; // Update PDF URL if a new file is uploaded

        // Optionally delete the old PDF file from storage
        const assessment = await Assessment.findById(id);
        if (assessment && assessment.pdfUrl) {
            fs.unlinkSync(assessment.pdfUrl); // Be cautious with synchronous operation
        }
    }

    try {
        const updatedAssessment = await Assessment.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAssessment) return res.status(404).json({ message: 'Assessment not found' });

        res.json(updatedAssessment);
    } catch (error) {
        console.error('Error updating assessment:', error);
        res.status(500).json({ message: 'Server error while updating assessment' });
    }
};

// Delete an assessment
exports.deleteAssessment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAssessment = await Assessment.findByIdAndDelete(id);
        if (!deletedAssessment) return res.status(404).json({ message: 'Assessment not found' });

        // Optionally delete the PDF file from storage
        if (deletedAssessment.pdfUrl) {
            fs.unlinkSync(deletedAssessment.pdfUrl); // Be cautious with synchronous operation
        }

        res.json({ message: 'Assessment successfully deleted' });
    } catch (error) {
        console.error('Error deleting assessment:', error);
        res.status(500).json({ message: 'Server error while deleting assessment' });
    }
};
