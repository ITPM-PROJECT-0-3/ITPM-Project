const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const upload = require('../config/multerConfig');

// Create a new assessment with optional PDF file upload
router.post('/assessments', upload.single('pdfFile'), assessmentController.createAssessment);

// Get all assessments
router.get('/assessments', assessmentController.getAllAssessments);

// Get a single assessment by ID
router.get('/assessments/:id', assessmentController.getAssessmentById);

// Update an assessment, potentially with a new PDF file
router.put('/assessments/:id', upload.single('pdfFile'), assessmentController.updateAssessment);

// Delete an assessment
router.delete('/assessments/:id', assessmentController.deleteAssessment);

module.exports = router;
