const mongoose = require('mongoose');

const markSheetSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model exists and is used for students
        required: true
    },
    assessments: [{
        assessmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assessment',
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
    totalMarks: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('MarkSheet', markSheetSchema);
