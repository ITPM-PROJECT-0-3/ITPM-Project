const ResearchPaper = require('../models/ResearchPaper');

// Submit a new research paper
exports.submitResearchPaper = async (req, res) => {
    const { title, authors, conferenceName, submissionDate, status, documentLink } = req.body;

    try {
        const newResearchPaper = new ResearchPaper({
            title,
            authors, // This could be an array of user IDs or names
            conferenceName,
            submissionDate,
            status,
            documentLink
        });

        await newResearchPaper.save();
        res.status(201).json(newResearchPaper);
    } catch (error) {
        console.error('Error submitting research paper:', error);
        res.status(500).json({ message: 'Server error while submitting research paper' });
    }
};

// Get all research papers
exports.getAllResearchPapers = async (req, res) => {
    try {
        const researchPapers = await ResearchPaper.find();
        res.json(researchPapers);
    } catch (error) {
        console.error('Error fetching research papers:', error);
        res.status(500).json({ message: 'Server error while fetching research papers' });
    }
};

// Get a single research paper by ID
exports.getResearchPaperById = async (req, res) => {
    const { id } = req.params;

    try {
        const researchPaper = await ResearchPaper.findById(id);

        if (!researchPaper) {
            return res.status(404).json({ message: 'Research paper not found' });
        }

        res.json(researchPaper);
    } catch (error) {
        console.error('Error fetching research paper:', error);
        res.status(500).json({ message: 'Server error while fetching research paper' });
    }
};

// Update a research paper
exports.updateResearchPaper = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedResearchPaper = await ResearchPaper.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedResearchPaper) {
            return res.status(404).json({ message: 'Research paper not found' });
        }

        res.json(updatedResearchPaper);
    } catch (error) {
        console.error('Error updating research paper:', error);
        res.status(500).json({ message: 'Server error while updating research paper' });
    }
};

// Delete a research paper
exports.deleteResearchPaper = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedResearchPaper = await ResearchPaper.findByIdAndDelete(id);

        if (!deletedResearchPaper) {
            return res.status(404).json({ message: 'Research paper not found' });
        }

        res.json({ message: 'Research paper successfully deleted' });
    } catch (error) {
        console.error('Error deleting research paper:', error);
        res.status(500).json({ message: 'Server error while deleting research paper' });
    }
};
