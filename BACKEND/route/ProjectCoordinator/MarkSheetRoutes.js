const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Adjust path as necessary
const MarkSheetController = require('../controllers/MarkSheetController'); // Adjust path as necessary

const router = express.Router();

// Route to create a new mark sheet (Protected route)
router.post('/', authenticate, MarkSheetController.createMarkSheet);

// Route to get all mark sheets (Protected route)
router.get('/', authenticate, MarkSheetController.getAllMarkSheets);

// Route to get a single mark sheet by ID (Protected route)
router.get('/:id', authenticate, MarkSheetController.getMarkSheetById);

// Route to update a mark sheet (Protected route)
router.put('/:id', authenticate, MarkSheetController.updateMarkSheet);

// Route to delete a mark sheet (Protected route)
router.delete('/:id', authenticate, MarkSheetController.deleteMarkSheet);

module.exports = router;
