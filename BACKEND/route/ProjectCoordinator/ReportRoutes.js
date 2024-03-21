const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Ensure the path matches your project structure
const ReportController = require('../controllers/ReportController'); // Ensure the path matches your project structure

const router = express.Router();

// Route to submit a new report (Protected)
router.post('/', authenticate, ReportController.submitReport);

// Route to get all reports (Protected)
router.get('/', authenticate, ReportController.getAllReports);

// Route to get a single report by ID (Protected)
router.get('/:id', authenticate, ReportController.getReportById);

// Route to update a report (Protected)
router.put('/:id', authenticate, ReportController.updateReport);

// Route to delete a report (Protected)
router.delete('/:id', authenticate, ReportController.deleteReport);

module.exports = router;
