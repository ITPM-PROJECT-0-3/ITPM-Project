const Assessment = require('../models/Assessment');

// Create a new assessment
exports.createAssessment = async (req, res) => {
    const { title, description, dueDate, totalMarks, rubric } = req.body;

    try {
        const newAssessment = new Assessment({
            title,
            description,
            dueDate,
            totalMarks,
            rubric
        });

        await newAssessment.save();
        res.status(201).json(newAssessment);
    } catch (error) {
        console.error('Error creating assessment:', error);
        res.status(500).json({ message: 'Server error while creating assessment' });
    }
};

// Get all assessments
exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.json(assessments);
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ message: 'Server error while fetching assessments' });
    }
};

// Get a single assessment by ID
exports.getAssessmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const assessment = await Assessment.findById(id);

        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.json(assessment);
    } catch (error) {
        console.error('Error fetching assessment:', error);
        res.status(500).json({ message: 'Server error while fetching assessment' });
    }
};

// Update an assessment
exports.updateAssessment = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, totalMarks, rubric } = req.body;

    try {
        const assessment = await Assessment.findByIdAndUpdate(id, { title, description, dueDate, totalMarks, rubric }, { new: true });

        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.json(assessment);
    } catch (error) {
        console.error('Error updating assessment:', error);
        res.status(500).json({ message: 'Server error while updating assessment' });
    }
};

// Delete an assessment
exports.deleteAssessment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAssessment = await Assessment.findByIdAndDelete(id);

        if (!deletedAssessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.json({ message: 'Assessment successfully deleted' });
    } catch (error) {
        console.error('Error deleting assessment:', error);
        res.status(500).json({ message: 'Server error while deleting assessment' });
    }
};
