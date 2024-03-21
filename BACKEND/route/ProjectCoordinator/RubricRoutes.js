const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Adjust the path as necessary
const RubricController = require('../controllers/RubricController'); // Adjust the path as necessary

const router = express.Router();

// Route to create a new rubric (Protected)
router.post('/', authenticate, RubricController.createRubric);

// Route to get all rubrics (Protected)
router.get('/', authenticate, RubricController.getAllRubrics);

// Route to get a single rubric by ID (Protected)
router.get('/:id', authenticate, RubricController.getRubricById);

// Route to update a rubric (Protected)
router.put('/:id', authenticate, RubricController.updateRubric);

// Route to delete a rubric (Protected)
router.delete('/:id', authenticate, RubricController.deleteRubric);

module.exports = router;
