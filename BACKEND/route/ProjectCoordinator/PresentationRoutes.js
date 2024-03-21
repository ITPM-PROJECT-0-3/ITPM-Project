const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Ensure the path matches your project structure
const PresentationController = require('../controllers/PresentationController'); // Ensure the path matches your project structure

const router = express.Router();

// Route to schedule a new presentation (Protected)
router.post('/', authenticate, PresentationController.schedulePresentation);

// Route to get all presentations (Protected)
router.get('/', authenticate, PresentationController.getAllPresentations);

// Route to get a single presentation by ID (Protected)
router.get('/:id', authenticate, PresentationController.getPresentationById);

// Route to update a presentation (Protected)
router.put('/:id', authenticate, PresentationController.updatePresentation);

// Route to delete a presentation (Protected)
router.delete('/:id', authenticate, PresentationController.deletePresentation);

module.exports = router;
