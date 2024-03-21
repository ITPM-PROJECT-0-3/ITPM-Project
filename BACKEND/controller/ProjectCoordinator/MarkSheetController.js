const MarkSheet = require('../models/MarkSheet');

// Create a new mark sheet
exports.createMarkSheet = async (req, res) => {
    const { studentId, assessments, totalMarks, grade } = req.body;

    try {
        const newMarkSheet = new MarkSheet({
            studentId,
            assessments, // Assume assessments is an array of { assessmentId, mark, comment }
            totalMarks,
            grade
        });

        await newMarkSheet.save();
        res.status(201).json(newMarkSheet);
    } catch (error) {
        console.error('Error creating mark sheet:', error);
        res.status(500).json({ message: 'Server error while creating mark sheet' });
    }
};

// Retrieve a mark sheet by studentId
exports.getMarkSheetByStudentId = async (req, res) => {
    const { studentId } = req.params;

    try {
        const markSheet = await MarkSheet.findOne({ studentId });
        if (!markSheet) {
            return res.status(404).json({ message: 'Mark sheet not found' });
        }
        res.json(markSheet);
    } catch (error) {
        console.error('Error retrieving mark sheet:', error);
        res.status(500).json({ message: 'Server error while retrieving mark sheet' });
    }
};

// Update a mark sheet
exports.updateMarkSheet = async (req, res) => {
    const { studentId } = req.params;
    const { assessments, totalMarks, grade } = req.body;

    try {
        const updatedMarkSheet = await MarkSheet.findOneAndUpdate({ studentId }, {
            assessments,
            totalMarks,
            grade
        }, { new: true });

        if (!updatedMarkSheet) {
            return res.status(404).json({ message: 'Mark sheet not found' });
        }

        res.json(updatedMarkSheet);
    } catch (error) {
        console.error('Error updating mark sheet:', error);
        res.status(500).json({ message: 'Server error while updating mark sheet' });
    }
};

// Delete a mark sheet
exports.deleteMarkSheet = async (req, res) => {
    const { studentId } = req.params;

    try {
        const deletedMarkSheet = await MarkSheet.findOneAndDelete({ studentId });

        if (!deletedMarkSheet) {
            return res.status(404).json({ message: 'Mark sheet not found' });
        }

        res.json({ message: 'Mark sheet successfully deleted' });
    } catch (error) {
        console.error('Error deleting mark sheet:', error);
        res.status(500).json({ message: 'Server error while deleting mark sheet' });
    }
};
