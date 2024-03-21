const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Adjust the path as necessary
const ProjectController = require('../controllers/ProjectController'); // Adjust the path as necessary

const router = express.Router();

// Route to create a new project (Protected)
router.post('/', authenticate, ProjectController.createProject);

// Route to get all projects (Protected)
router.get('/', authenticate, ProjectController.getAllProjects);

// Route to get a single project by ID (Protected)
router.get('/:id', authenticate, ProjectController.getProjectById);

// Route to update a project (Protected)
router.put('/:id', authenticate, ProjectController.updateProject);

// Route to delete a project (Protected)
router.delete('/:id', authenticate, ProjectController.deleteProject);

module.exports = router;
