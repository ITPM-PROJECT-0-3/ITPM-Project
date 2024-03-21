const Team = require('../models/Team');

// Create a new team
exports.createTeam = async (req, res) => {
    const { teamName, projectTitle, members, projectStatus } = req.body;

    try {
        const newTeam = new Team({
            teamName,
            projectTitle,
            members, // Assume this is an array of user IDs
            projectStatus
        });

        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Server error while creating team' });
    }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'name email');
        res.json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Server error while fetching teams' });
    }
};

// Get a single team by ID
exports.getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        const team = await Team.findById(id).populate('members', 'name email');

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json(team);
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({ message: 'Server error while fetching team' });
    }
};

// Update a team
exports.updateTeam = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedTeam = await Team.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json(updatedTeam);
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({ message: 'Server error while updating team' });
    }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTeam = await Team.findByIdAndDelete(id);

        if (!deletedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json({ message: 'Team successfully deleted' });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({ message: 'Server error while deleting team' });
    }
};
