const mongoose = require('mongoose');

const presentationSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Assuming a Project model exists
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String, // Format: 'HH:MM' or use Date if you prefer to include date and time together
        required: true
    },
    panelMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model exists and is used for panel members
        required: true
    }],
    marks: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming a User model exists and is used for students
            required: true
        },
        mark: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: false
        }
    }],
    presentationType: {
        type: String,
        enum: ['Proposal', 'Midterm', 'Final'],
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Presentation', presentationSchema);
