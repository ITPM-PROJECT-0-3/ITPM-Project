const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Assuming a Project model exists
        required: true
    },
    presentationType: {
        type: String,
        enum: ['Proposal', 'Midterm Review', 'Final Presentation', 'Other'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String, // Could also consider using Date type if including date with time
        required: true
    },
    location: {
        type: String,
        required: true
    },
    panelMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model for panel members or examiners
        required: true
    }],
    additionalNotes: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Schedule', scheduleSchema);
