const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Adjust path as necessary
const ResearchPaperController = require('../controllers/ResearchPaperController'); // Adjust path as necessary

const router = express.Router();

// Route to submit a new research paper (Protected)
router.post('/', authenticate, ResearchPaperController.submitResearchPaper);

// Route to get all research papers (Protected)
router.get('/', authenticate, ResearchPaperController.getAllResearchPapers);

// Route to get a single research paper by ID (Protected)
router.get('/:id', authenticate, ResearchPaperController.getResearchPaperById);

// Route to update a research paper (Protected)
router.put('/:id', authenticate, ResearchPaperController.updateResearchPaper);

// Route to delete a research paper (Protected)
router.delete('/:id', authenticate, ResearchPaperController.deleteResearchPaper);

module.exports = router;
