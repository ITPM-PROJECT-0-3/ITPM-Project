const Assessment = require('../../model/ProjectCoordinator/Assessment'); // Adjust the path as necessary

// Create a new assessment
exports.createAssessment = async (req, res) => {
    try {
        const { title, description, dueDate, totalMarks, assignmentUploadLink } = req.body;
        const newAssessment = new Assessment({
            title,
            description,
            dueDate,
            totalMarks,
            assignmentUploadLink
        });

        await newAssessment.save();
        res.status(201).json(newAssessment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all assessments
exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.status(200).json(assessments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a single assessment by ID
exports.getAssessmentById = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });
        res.status(200).json(assessment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an assessment by ID
exports.updateAssessment = async (req, res) => {
    try {
        const updatedAssessment = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAssessment) return res.status(404).json({ message: "Assessment not found" });
        res.status(200).json(updatedAssessment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an assessment
exports.deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findByIdAndDelete(req.params.id);
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });
        res.status(200).json({ message: "Assessment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
