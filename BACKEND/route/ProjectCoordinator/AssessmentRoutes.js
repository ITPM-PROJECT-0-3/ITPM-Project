const express = require('express');
const router = express.Router();
const assessmentController = require('../../controller/ProjectCoordinator/AssessmentController');
const upload = require('../../middleware/ProjectCoordinator/uploadFile');

// Create a new assessment with optional PDF file upload
router.post('/assessments', upload.single('pdfFile'), async (req, res, next) => {
    try {
        await assessmentController.createAssessment(req, res);
    } catch (error) {
        next(error);
    }
});

// Get all assessments
router.get('/assessments', async (req, res, next) => {
    try {
        await assessmentController.getAllAssessments(req, res);
    } catch (error) {
        next(error);
    }
});

// Get a single assessment by ID
router.get('/assessments/:id', async (req, res, next) => {
    try {
        await assessmentController.getAssessmentById(req, res);
    } catch (error) {
        next(error);
    }
});

// Update an assessment, potentially with a new PDF file
router.put('/assessments/:id', upload.single('pdfFile'), async (req, res, next) => {
    try {
        await assessmentController.updateAssessment(req, res);
    } catch (error) {
        next(error);
    }
});

// Delete an assessment
router.delete('/assessments/:id', async (req, res, next) => {
    try {
        await assessmentController.deleteAssessment(req, res);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware should be added as the last middleware
router.use((err, req, res, next) => {
    console.error("Error in AssessmentRoutes: ", err);
    res.status(500).json({ error: 'Internal server error' });
});

module.exports = router;
