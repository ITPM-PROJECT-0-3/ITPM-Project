const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Adjust path as necessary
const AssessmentController = require('../controllers/AssessmentController'); // Adjust path as necessary

const router = express.Router();

// Create a new assessment (Protected route)
router.post('/', authenticate, AssessmentController.createAssessment);

// Get all assessments (Protected route)
router.get('/', authenticate, AssessmentController.getAllAssessments);

// Get a single assessment by ID (Protected route)
router.get('/:id', authenticate, AssessmentController.getAssessmentById);

// Update an assessment (Protected route)
router.put('/:id', authenticate, AssessmentController.updateAssessment);

// Delete an assessment (Protected route)
router.delete('/:id', authenticate, AssessmentController.deleteAssessment);

module.exports = router;
