const express = require('express');
const authenticate = require('../middlewares/authenticate'); // Ensure correct path as per your project structure
const ScheduleController = require('../controllers/ScheduleController'); // Ensure correct path as per your project structure

const router = express.Router();

// Route to create a new schedule (Protected)
router.post('/', authenticate, ScheduleController.createSchedule);

// Route to get all schedules (Protected)
router.get('/', authenticate, ScheduleController.getAllSchedules);

// Route to get a single schedule by ID (Protected)
router.get('/:id', authenticate, ScheduleController.getScheduleById);

// Route to update a schedule (Protected)
router.put('/:id', authenticate, ScheduleController.updateSchedule);

// Route to delete a schedule (Protected)
router.delete('/:id', authenticate, ScheduleController.deleteSchedule);

module.exports = router;
