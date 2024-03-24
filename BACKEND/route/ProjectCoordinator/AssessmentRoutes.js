const express = require('express');
const router = express.Router();
const assessmentController = require('../../controller/ProjectCoordinator/AssessmentController');

// Create a new assessment
router.post('/add', assessmentController.createAssessment);

// Get all assessments
router.get('/get-all', assessmentController.getAllAssessments);

// Get a single assessment by ID
router.get('/:id', assessmentController.getAssessmentById);

// Update an assessment by ID
router.put('/update-assessment/:id', assessmentController.updateAssessment);

// Delete an assessment
router.delete('/delete-assessment/:id', assessmentController.deleteAssessment);

module.exports = router;
