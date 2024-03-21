const Schedule = require('../models/Schedule');

// Create a new schedule
exports.createSchedule = async (req, res) => {
    const { date, time, projectId, presentationType, examiners, location } = req.body;

    try {
        const newSchedule = new Schedule({
            date,
            time,
            projectId,
            presentationType,
            examiners, // Assume this is an array of user IDs for the examiners
            location
        });

        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ message: 'Server error while creating schedule' });
    }
};

// Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('projectId').populate('examiners', 'name');
        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ message: 'Server error while fetching schedules' });
    }
};

// Get a single schedule by ID
exports.getScheduleById = async (req, res) => {
    const { id } = req.params;

    try {
        const schedule = await Schedule.findById(id).populate('projectId').populate('examiners', 'name');

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.json(schedule);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ message: 'Server error while fetching schedule' });
    }
};

// Update a schedule
exports.updateSchedule = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.json(updatedSchedule);
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ message: 'Server error while updating schedule' });
    }
};

// Delete a schedule
exports.deleteSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.json({ message: 'Schedule successfully deleted' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ message: 'Server error while deleting schedule' });
    }
};
