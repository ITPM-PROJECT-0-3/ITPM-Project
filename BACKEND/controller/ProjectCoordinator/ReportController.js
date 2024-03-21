const Report = require('../models/Report');

// Submit a new report
exports.submitReport = async (req, res) => {
    const { projectId, type, submissionDate, documentPath, marks, comments } = req.body;

    try {
        const newReport = new Report({
            projectId,
            type,
            submissionDate,
            documentPath,
            marks,
            comments
        });

        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        console.error('Error submitting report:', error);
        res.status(500).json({ message: 'Server error while submitting report' });
    }
};

// Get all reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Server error while fetching reports' });
    }
};

// Get a single report by ID
exports.getReportById = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json(report);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ message: 'Server error while fetching report' });
    }
};

// Update a report
exports.updateReport = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedReport = await Report.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json(updatedReport);
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Server error while updating report' });
    }
};

// Delete a report
exports.deleteReport = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReport = await Report.findByIdAndDelete(id);

        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report successfully deleted' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: 'Server error while deleting report' });
    }
};
