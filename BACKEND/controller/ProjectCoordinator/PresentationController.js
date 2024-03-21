const Presentation = require('../models/Presentation');

// Schedule a new presentation
exports.schedulePresentation = async (req, res) => {
    const { projectId, date, panelMembers, type } = req.body;

    try {
        const newPresentation = new Presentation({
            projectId,
            date,
            panelMembers, // Assume this is an array of user IDs
            type
        });

        await newPresentation.save();
        res.status(201).json(newPresentation);
    } catch (error) {
        console.error('Error scheduling presentation:', error);
        res.status(500).json({ message: 'Server error while scheduling presentation' });
    }
};

// Get all presentations
exports.getAllPresentations = async (req, res) => {
    try {
        const presentations = await Presentation.find();
        res.json(presentations);
    } catch (error) {
        console.error('Error fetching presentations:', error);
        res.status(500).json({ message: 'Server error while fetching presentations' });
    }
};

// Get a single presentation by ID
exports.getPresentationById = async (req, res) => {
    const { id } = req.params;

    try {
        const presentation = await Presentation.findById(id);

        if (!presentation) {
            return res.status(404).json({ message: 'Presentation not found' });
        }

        res.json(presentation);
    } catch (error) {
        console.error('Error fetching presentation:', error);
        res.status(500).json({ message: 'Server error while fetching presentation' });
    }
};

// Update a presentation
exports.updatePresentation = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedPresentation = await Presentation.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPresentation) {
            return res.status(404).json({ message: 'Presentation not found' });
        }

        res.json(updatedPresentation);
    } catch (error) {
        console.error('Error updating presentation:', error);
        res.status(500).json({ message: 'Server error while updating presentation' });
    }
};

// Delete a presentation
exports.deletePresentation = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPresentation = await Presentation.findByIdAndDelete(id);

        if (!deletedPresentation) {
            return res.status(404).json({ message: 'Presentation not found' });
        }

        res.json({ message: 'Presentation successfully deleted' });
    } catch (error) {
        console.error('Error deleting presentation:', error);
        res.status(500).json({ message: 'Server error while deleting presentation' });
    }
};
