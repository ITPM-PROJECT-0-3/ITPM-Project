const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Ensure the path matches your project structure
const TeamController = require('../controllers/TeamController'); // Ensure the path matches your project structure

const router = express.Router();

// Route to create a new team (Protected)
router.post('/', authenticate, TeamController.createTeam);

// Route to get all teams (Protected)
router.get('/', authenticate, TeamController.getAllTeams);

// Route to get a single team by ID (Protected)
router.get('/:id', authenticate, TeamController.getTeamById);

// Route to update team details (Protected)
router.put('/:id', authenticate, TeamController.updateTeam);

// Route to delete a team (Protected)
router.delete('/:id', authenticate, TeamController.deleteTeam);

module.exports = router;
