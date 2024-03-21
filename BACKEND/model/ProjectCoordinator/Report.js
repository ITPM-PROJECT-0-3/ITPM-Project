const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Assuming a Project model exists
        required: true
    },
    type: {
        type: String,
        enum: ['Initial Proposal', 'Progress Update', 'Final Report', 'Other'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    documentPath: {
        type: String, // Path to the document if stored in the server or a URL if stored externally
        required: true
    },
    marks: {
        type: Number,
        required: false // Not all reports may receive marks
    },
    comments: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Report', reportSchema);
