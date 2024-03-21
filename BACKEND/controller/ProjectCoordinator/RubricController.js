const Rubric = require('../models/Rubric');

// Create a new rubric
exports.createRubric = async (req, res) => {
    const { assessmentType, criteria, totalScore } = req.body;

    try {
        const newRubric = new Rubric({
            assessmentType,
            criteria, // Assume criteria is an array of { description, maxScore }
            totalScore
        });

        await newRubric.save();
        res.status(201).json(newRubric);
    } catch (error) {
        console.error('Error creating rubric:', error);
        res.status(500).json({ message: 'Server error while creating rubric' });
    }
};

// Get all rubrics
exports.getAllRubrics = async (req, res) => {
    try {
        const rubrics = await Rubric.find();
        res.json(rubrics);
    } catch (error) {
        console.error('Error fetching rubrics:', error);
        res.status(500).json({ message: 'Server error while fetching rubrics' });
    }
};

// Get a single rubric by ID
exports.getRubricById = async (req, res) => {
    const { id } = req.params;

    try {
        const rubric = await Rubric.findById(id);

        if (!rubric) {
            return res.status(404).json({ message: 'Rubric not found' });
        }

        res.json(rubric);
    } catch (error) {
        console.error('Error fetching rubric:', error);
        res.status(500).json({ message: 'Server error while fetching rubric' });
    }
};

// Update a rubric
exports.updateRubric = async (req, res) => {
    const { id } = req.params;
    const { assessmentType, criteria, totalScore } = req.body;

    try {
        const updatedRubric = await Rubric.findByIdAndUpdate(id, {
            assessmentType,
            criteria,
            totalScore
        }, { new: true });

        if (!updatedRubric) {
            return res.status(404).json({ message: 'Rubric not found' });
        }

        res.json(updatedRubric);
    } catch (error) {
        console.error('Error updating rubric:', error);
        res.status(500).json({ message: 'Server error while updating rubric' });
    }
};

// Delete a rubric
exports.deleteRubric = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRubric = await Rubric.findByIdAndDelete(id);

        if (!deletedRubric) {
            return res.status(404).json({ message: 'Rubric not found' });
        }

        res.json({ message: 'Rubric successfully deleted' });
    } catch (error) {
        console.error('Error deleting rubric:', error);
        res.status(500).json({ message: 'Server error while deleting rubric' });
    }
};
