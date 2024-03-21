const mongoose = require('mongoose');

const researchPaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for authors
        required: true
    }],
    conferenceName: {
        type: String,
        required: false, // Make required as per your need
        trim: true
    },
    submissionDate: {
        type: Date,
        required: false
    },
    publicationDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['Submitted', 'Accepted', 'Rejected', 'Published'],
        required: true
    },
    documentLink: {
        type: String,
        required: false // Adjust based on whether you're storing files internally or linking externally
    }
}, {
    timestamps: true // Automatically generate createdAt and updatedAt timestamps
});

module.exports = mongoose.model('ResearchPaper', researchPaperSchema);
