const mongoose = require('mongoose');

const rubricSchema = new mongoose.Schema({
    assessmentType: {
        type: String,
        enum: ['Report', 'Presentation', 'Assignment', 'Other'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    criteria: [{
        description: {
            type: String,
            required: true
        },
        maxScore: {
            type: Number,
            required: true
        }
    }],
    totalScore: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Rubric', rubricSchema);
